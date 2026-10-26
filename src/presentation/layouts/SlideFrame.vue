<script setup lang="ts">
import { CANVAS } from './layoutHelper'

/**
 * 모든 레이아웃이 올라가는 캔버스.
 *
 * 비율은 A4 가로(1.444)다 — 16:9 가 아니다. JDC·우체국 PDF 가 780×540pt,
 * 제안서 pptx 가 9906000×6858000 EMU 로 셋 다 이 비율이었다.
 * 심사위원이 인쇄본으로도 보기 때문이고, 16:9 로 만들면 4:3 프로젝터에서 축소된다.
 *
 * 머리·꼬리 치수와 글자 크기는 JDC 제안요약서 PDF 6쪽을 PyMuPDF 로 잰 값이다.
 * pt → cqw 환산은 캔버스 폭 780pt 기준 (pt / 780 × 100).
 *
 *   헤더 칩      18pt → 2.31cqw   x 6.5% / y 3.8%
 *   제목         24pt → 3.08cqw   x 3.4% / y 13.8%
 *   영문 서브헤드  8pt → 1.03cqw   x 3.5% / y 20.8%
 *   우상단 브랜드  8pt → 1.03cqw   x 90%  / y 2.2% 부터 2.3%씩
 *   푸터          7pt → 0.90cqw   y 96.3%
 *
 * container-type: inline-size 라서 내부 치수를 cqw 로 쓰면 캔버스에 비례해 따라온다.
 */
withDefaults(
  defineProps<{
    /** 배경. 'coast' 는 JDC 덱의 제주 해안 톤을 CSS 로 재구성한 것 */
    backdrop?: 'none' | 'coast'
    /** 헤더 칩 앞머리 — 원본은 주황 */
    chipAccent?: string
    /** 헤더 칩 뒷머리 — 원본은 파랑 */
    chipMain?: string
    title?: string
    /** 제목 아래 영문 한 줄 */
    subheadEn?: string
    subtitle?: string
    /** 우상단 세로 영문 블록 */
    brandLines?: string[]
    /** 하단 전폭 결론 바. 실측 31장 중 1장뿐이니 아껴 쓸 것 */
    conclusion?: string
    conclusionLabel?: string
    footerLeft?: string
    footerRight?: string
    pageNo?: string
    /** 레거시 호출부 호환 */
    eyebrow?: string
    client?: string
  }>(),
  {
    backdrop: 'none',
    conclusionLabel: '핵심',
    brandLines: () => [],
  },
)
</script>

<template>
  <section class="slide-frame" :class="`backdrop-${backdrop}`" :style="{ '--canvas-ratio': CANVAS.ratio }">
    <div v-if="backdrop === 'coast'" class="backdrop" aria-hidden="true">
      <span class="sky" /><span class="sea" /><span class="shore" /><span class="hill" />
    </div>

    <header class="slide-head">
      <p v-if="chipAccent || chipMain || eyebrow" class="chip">
        <span v-if="chipAccent" class="accent">{{ chipAccent }}</span>
        <span v-if="chipAccent && chipMain" class="dot">·</span>
        <span v-if="chipMain" class="main">{{ chipMain }}</span>
        <span v-if="!chipAccent && !chipMain" class="main">{{ eyebrow }}</span>
      </p>
      <p v-if="client" class="client">{{ client }}</p>
    </header>

    <aside v-if="brandLines.length" class="brand" aria-hidden="true">
      <span v-for="l in brandLines" :key="l">{{ l }}</span>
    </aside>

    <div v-if="title" class="slide-heading">
      <h1>{{ title }}</h1>
      <p v-if="subheadEn" class="subhead-en">{{ subheadEn }}<i /></p>
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    </div>

    <div class="slide-body"><slot /></div>

    <div v-if="conclusion" class="slide-conclusion">
      <b>{{ conclusionLabel }}</b><span>{{ conclusion }}</span>
    </div>

    <footer class="slide-footer">
      <slot name="footer">
        <span class="f-left">{{ footerLeft ?? 'ISPark · 사람이 있는 디지털 변화' }}</span>
        <span class="f-right">{{ footerRight }}</span>
      </slot>
      <i v-if="pageNo">{{ pageNo }}</i>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
.slide-frame {
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: min(1040px, 96vw);
  aspect-ratio: var(--canvas-ratio);
  display: flex;
  flex-direction: column;
  padding: 2.6cqw 3.4cqw 2cqw;
  background: #ffffff;
  color: #1f2937;
  font-family: Pretendard, 'Noto Sans KR', Arial, sans-serif;
  box-shadow: 0 12px 35px #092e4926;
  overflow: hidden;
}

/**
 * 제주 해안 배경을 CSS 로 재구성한 것.
 * 원본은 사진 한 장(PDF xref 244)이지만 클라이언트 산출물이라 가져오지 않았다.
 * 색은 같은 장에서 잰 값 범위(#768ED2 · #A1B7CF · #9AD4F8 · #B7D1E3)를 쓴다.
 */
.backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;

  .sky {
    position: absolute;
    inset: 0;
    background: linear-gradient(170deg, #ffffff 0%, #eaf4fc 38%, #cfe6f7 68%, #b7d1e3 100%);
  }

  .sea {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 46%;
    background: linear-gradient(185deg, #9ad4f8 0%, #76b1e1 55%, #5f9ed4 100%);
    clip-path: ellipse(90% 100% at 70% 100%);
    opacity: 0.85;
  }

  .shore {
    position: absolute;
    left: -5%;
    right: -5%;
    bottom: 0;
    height: 34%;
    background: linear-gradient(180deg, #ffffff 0%, #f4f9fd 60%, #eaf2f8 100%);
    clip-path: ellipse(70% 100% at 22% 108%);
  }

  .hill {
    position: absolute;
    right: 4%;
    bottom: 36%;
    width: 26%;
    height: 22%;
    background: linear-gradient(180deg, #a1b7cf 0%, #86a2c2 100%);
    clip-path: ellipse(50% 100% at 50% 100%);
    opacity: 0.55;
  }
}

/* 배경 위 내용은 모두 그 위로 */
.slide-head,
.brand,
.slide-heading,
.slide-body,
.slide-conclusion,
.slide-footer {
  position: relative;
  z-index: 1;
}

.slide-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

/* 실측 18pt → 2.31cqw */
.chip {
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 0.5cqw;
  font-size: 2.31cqw;
  font-weight: 700;

  .accent { color: #fc5528; }
  .dot { color: #000000; }
  .main { color: #03379e; }
}

.client {
  margin: 0;
  font-size: 1.3cqw;
  font-weight: 700;
  color: #006fbd;
}

/* 우상단 세로 영문 — 실측 8pt, 행간 2.3% */
.brand {
  position: absolute;
  top: 2.2%;
  right: 3.4cqw;
  display: flex;
  flex-direction: column;
  gap: 0.55cqw;
  text-align: right;
  font-size: 1.03cqw;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #768ed2;
}

.slide-heading {
  margin-top: 2.6cqw;

  /* 실측 24pt → 3.08cqw */
  h1 {
    margin: 0;
    font-size: 3.08cqw;
    font-weight: 700;
    line-height: 1.3;
    color: #0a2e3d;
    word-break: keep-all;
  }

  /* 실측 8pt. 원본은 뒤에 가는 선이 붙는다 */
  .subhead-en {
    display: flex;
    align-items: center;
    gap: 1cqw;
    margin: 1.1cqw 0 0;
    font-size: 1.03cqw;
    letter-spacing: 0.14em;
    color: #86a2c2;

    i { display: block; width: 5cqw; height: 1px; background: #a1b7cf; }
  }

  .subtitle {
    margin: 0.8cqw 0 0;
    font-size: 1.3cqw;
    color: #6b7684;
  }
}

.slide-body {
  flex: 1;
  min-height: 0;
  margin-top: 1.8cqw;
  display: flex;
  flex-direction: column;
}

.slide-conclusion {
  flex: none;
  margin-top: 1.6cqw;
  padding: 1.1cqw 1.6cqw;
  background: #092e49;
  color: #ffffff;
  display: flex;
  align-items: baseline;
  gap: 1.4cqw;

  b { font-size: 1.22cqw; }
  span { font-size: 1.18cqw; color: #dfedf6; }
}

/* 실측 7pt → 0.90cqw, y 96.3% */
.slide-footer {
  flex: none;
  margin-top: 1.2cqw;
  display: flex;
  align-items: baseline;
  gap: 0.8cqw;
  font-size: 0.9cqw;
  letter-spacing: 0.08em;
  color: #a1b7cf;

  .f-right { margin-left: auto; }
  i { margin-left: 1.2cqw; font-style: normal; }
}
</style>
