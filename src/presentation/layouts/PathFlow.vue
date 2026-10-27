<script setup lang="ts">
import { computed } from 'vue'
import ProposalIcon from '../ProposalIcon.vue'

/**
 * 곡선 경로 위에 노드를 얹고, 카드를 세로로 어긋나게 배치하는 레이아웃.
 *
 * JDC 제안요약서 PDF 6쪽(네 갈래 길을 하나의 코스로)을 PyMuPDF 로 실측해서 옮겼다.
 * 좌표·크기·색은 전부 그 장에서 잰 값이다 (캔버스 780×540pt 기준 %).
 *
 *   코스 라벨  x 12.0 / 35.8 / 59.5 / 83.6 %   y 27.7 / 31.8 / 32.9 / 28.8 %  16pt #FD734D
 *   아이콘     x  9.7 / 33.8 / 57.6 / 81.6 %   y 44.7 / 48.1 / 50.0 / 46.5 %  8.1 × 11.5 %
 *   카드 제목  x  7.2 / 29.7 / 55.4 / 77.2 %   y 57.7 / 61.0 / 62.9 / 59.1 %  18pt #0A2E3D
 *   태그라인                                    y 67.6 / 70.7 / 72.6 / 69.0 %  12pt #000099
 *   본문                                        y 71.7 / 74.9 / 76.7 / 73.1 %  12pt #595959
 *
 * 카드 y 가 57.7 → 61.0 → 62.9 → 59.1 로 움직인다. 일렬이 아니라 곡선을 따라
 * 내려갔다 올라온다. 이 어긋남이 리듬을 만든다 — 우리가 빠뜨렸던 것이다.
 *
 * 원본에서 곡선과 카드는 **이미지 한 장**이었다 (PDF 드로잉에 베지어 연산자가 0개).
 * 여기서는 같은 노드 좌표를 지나는 SVG 로 다시 그려서 고쳐 쓸 수 있게 했다.
 */
export type PathItem = {
  step: string
  no: string
  title: string
  tagline: string
  note: string
  icon: string
}

const props = defineProps<{ items: PathItem[] }>()

/** 실측 좌표 — 4칸 기준. 항목 수가 다르면 균등 분할로 떨어뜨린다 */
const MEASURED = {
  nodeX: [12.0, 35.8, 59.5, 83.6],
  nodeY: [32.2, 36.3, 37.4, 33.3],
  cardX: [4.6, 27.4, 51.8, 74.4],
  cardTop: [35.5, 38.8, 40.7, 36.9],
  cardW: 21.8,
  cardH: 48,
}

const geo = computed(() => {
  const n = props.items.length
  if (n === 4) return MEASURED
  // 4칸이 아니면 측정값의 리듬(내려갔다 올라오기)만 유지하고 가로는 균등 분할
  const gap = 2
  const w = (100 - gap * (n + 1)) / n
  const wave = (i: number) => Math.sin((i / Math.max(1, n - 1)) * Math.PI) * 5
  return {
    nodeX: Array.from({ length: n }, (_, i) => gap + w * (i + 0.5) + gap * i),
    nodeY: Array.from({ length: n }, (_, i) => 32 + wave(i)),
    cardX: Array.from({ length: n }, (_, i) => gap + (w + gap) * i),
    cardTop: Array.from({ length: n }, (_, i) => 35.5 + wave(i)),
    cardW: w,
    cardH: 48,
  }
})

/** 노드를 지나는 부드러운 곡선 — Catmull-Rom 을 베지어로 변환 */
const curve = computed(() => {
  const xs = geo.value.nodeX
  const ys = geo.value.nodeY
  const pts: [number, number][] = xs.map((x, i) => [x, ys[i]])
  // 양 끝으로 살짝 연장해 화면 밖에서 들어오고 나가는 느낌을 준다
  pts.unshift([Math.max(0, pts[0][0] - 10), pts[0][1] + 2])
  pts.push([Math.min(100, pts[pts.length - 1][0] + 10), pts[pts.length - 1][1] - 2])

  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`
  }
  return d
})
</script>

<template>
  <div class="path-flow">
    <!-- 경로: 좌표계를 100×100 으로 두고 비율 무시(none)로 늘려 캔버스 %와 일치시킨다 -->
    <svg class="track" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker id="pf-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,1 L9,5 L0,9 z" fill="#d9641a" />
        </marker>
      </defs>
      <path class="curve" :d="curve" fill="none" stroke="#d9641a" stroke-width="0.45" marker-end="url(#pf-arrow)" />
    </svg>

    <!-- 경로 위 노드 -->
    <template v-for="(it, i) in items" :key="'n' + i">
      <span class="step" :style="{ left: geo.nodeX[i] + '%', top: (geo.nodeY[i] - 7.5) + '%' }">{{ it.step }}</span>
      <i class="dot" :style="{ left: geo.nodeX[i] + '%', top: geo.nodeY[i] + '%' }" />
    </template>

    <!-- 카드: 세로 오프셋이 리듬을 만든다 -->
    <article
      v-for="(it, i) in items" :key="'c' + i"
      class="card"
      :style="{
        left: geo.cardX[i] + '%',
        top: geo.cardTop[i] + '%',
        width: geo.cardW + '%',
        height: geo.cardH + '%',
      }"
    >
      <span class="watermark">{{ it.no }}</span>
      <ProposalIcon :concept="it.icon" variant="hero" :tone="i === 2 ? 'orange' : 'blue'" :size="54" />
      <strong class="title">{{ it.title }}</strong>
      <span class="tagline">{{ it.tagline }} <i>–</i></span>
      <p class="note">{{ it.note }}</p>
    </article>
  </div>
</template>

<style lang="scss" scoped>
/* 색은 JDC PDF 6쪽 실측값. presentation/tokens.ts 의 CI 팔레트와 같은 계열이다 */
.path-flow {
  position: relative;
  flex: 1;
  min-height: 0;
}

.track {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* 라벨과 점을 따로 둔다. 한 덩어리로 흘리면 점이 카드 위로 내려가 가려진다 */
.step {
  position: absolute;
  z-index: 3;
  transform: translateX(-50%);
  font-size: 2.05cqw;   /* 실측 16pt */
  font-weight: 700;
  color: #fd734d;
  white-space: nowrap;
  text-shadow: 0 0.1cqw 0.3cqw #ffffffcc;
}

.dot {
  position: absolute;
  z-index: 3;
  transform: translate(-50%, -50%);
  width: 1.3cqw;
  height: 1.3cqw;
  border-radius: 50%;
  background: #ffffff;
  border: 0.32cqw solid #d9641a;
  box-shadow: 0 0.2cqw 0.5cqw #0a2e3d33;
}

/* 반투명 유리 카드 — 배경 사진 위에 얹히는 전제 */
.card {
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35cqw;
  padding: 1.9cqw 1.15cqw 1.2cqw;
  border-radius: 1cqw;
  background: #ffffffd9;
  backdrop-filter: blur(6px);
  border: 1px solid #ffffff;
  box-shadow: 0 1cqw 2.4cqw #0a2e3d1f;
  overflow: hidden;
}

/* 카드 안 대형 워터마크 번호 */
.watermark {
  position: absolute;
  top: 0.4cqw;
  left: 1.4cqw;
  font-size: 4.2cqw;
  font-weight: 800;
  line-height: 1;
  color: #a1b7cf59;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}

.card > .proposal-icon { margin-top: 2.2cqw; }

.title {
  margin-top: 0.5cqw;
  font-size: 2.2cqw;      /* 실측 18pt. 국문 폭이 더 넓어 소폭 축소 */
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.25;
  color: #0a2e3d;
  white-space: nowrap;
}

.tagline {
  margin-top: 0.45cqw;
  font-size: 1.54cqw;     /* 실측 12pt */
  font-weight: 650;
  color: #000099;
  word-break: keep-all;

  i { font-style: normal; }
}

.note {
  margin: 0.2cqw 0 0;
  font-size: 1.54cqw;     /* 실측 12pt */
  line-height: 1.45;
  color: #595959;
  word-break: keep-all;
}
</style>
