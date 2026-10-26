<script setup lang="ts">
import ProposalIcon from '../ProposalIcon.vue'

/**
 * 큰 도식·화면 시안 + 읽는 법. 실측 이미지 151개 중 대형(면적 12~35%)이 18개였다.
 *
 * 나머지 80%는 아이콘·소형이라 우리 쪽은 SVG 아이콘으로 이미 대응된다.
 * 없던 건 **이 대형 한 장**이다. 전략 문서에도 "실제 화면 시안으로 시연 수준 제시"가 있다.
 *
 * 그림만 놓으면 심사위원이 뭘 봐야 할지 모른다. 그래서 오른쪽에 '읽는 법'을 번호로 붙인다.
 */
export type ReadingNote = { title: string; note?: string }

withDefaults(
  defineProps<{
    /** 이미지 경로. 없으면 자리틀만 그린다 */
    src?: string
    caption?: string
    figureLabel?: string
    notes: ReadingNote[]
    icon?: string
  }>(),
  { figureLabel: '화면 시안' },
)
</script>

<template>
  <div class="figure-panel">
    <figure>
      <span class="figure-label">{{ figureLabel }}</span>
      <div class="frame" :style="src ? { backgroundImage: `url(${src})` } : undefined">
        <span v-if="!src" class="placeholder">
          <ProposalIcon :concept="icon ?? 'platform'" variant="inline" :size="40" />
          이미지 자리
        </span>
      </div>
      <figcaption v-if="caption">{{ caption }}</figcaption>
    </figure>

    <ol class="notes">
      <li v-for="(n, i) in notes" :key="n.title">
        <span class="no">{{ i + 1 }}</span>
        <div>
          <strong>{{ n.title }}</strong>
          <p v-if="n.note">{{ n.note }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.figure-panel {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1.65fr 1fr;
  gap: 1.2cqw;
}

figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.figure-label {
  flex: none;
  align-self: start;
  padding: 0.5cqw 1.1cqw;
  border-radius: 0.4cqw 0.4cqw 0 0;
  background: #092e49;
  color: #ffffff;
  font-size: 1cqw;
  font-weight: 700;
}

.frame {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e8eb;
  border-top: 0.22cqw solid #092e49;
  background-color: #f7f9fb;
  background-size: cover;
  background-position: top center;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6cqw;
  color: #8fb4db;
  font-size: 1.05cqw;
  font-weight: 650;
}

figcaption {
  flex: none;
  margin-top: 0.6cqw;
  font-size: 0.95cqw;
  color: #6b7684;
}

.notes {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6cqw;
  min-width: 0;

  li {
    flex: 1;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.8cqw;
    padding: 0.8cqw 1cqw;
    border: 1px solid #e5e8eb;
    border-left: 0.25cqw solid #d9641a;
    background: #ffffff;
    min-width: 0;
  }

  .no {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.1cqw;
    height: 2.1cqw;
    border-radius: 50%;
    background: #fde3ca;
    color: #b85610;
    font-size: 1.05cqw;
    font-weight: 800;
  }

  strong { display: block; font-size: 1.18cqw; font-weight: 700; color: #092e49; word-break: keep-all; }
  p { margin: 0.15cqw 0 0; font-size: 0.98cqw; color: #6b7684; line-height: 1.4; word-break: keep-all; }
}
</style>
