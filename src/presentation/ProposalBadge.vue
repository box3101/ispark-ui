<script setup lang="ts">
import { computed } from 'vue'
import type { IconGlyph } from './icon-sets.data'

/**
 * 제안 장표용 아이콘 배지 — 채도 높은 원형 배경 + 흰 솔리드 글리프.
 * 기존 ProposalIcon(연한 배경 + 진한 선 글리프)과 명암이 반대다.
 *
 * 글리프는 세트마다 좌표계가 달라서 원본 viewBox를 그대로 쓴다.
 * preserveAspectRatio 기본값(xMidYMid meet)에 맡겨야 세트별 비율 차이가
 * 그대로 드러나고, 그래야 비교에 의미가 있다.
 */
const props = withDefaults(
  defineProps<{
    glyph: IconGlyph
    /** hero=카드 헤더 / path=소형 배지 / inline=배경 없는 미니 */
    variant?: 'hero' | 'path' | 'inline'
    /** orange=실행·강점 / blue=이해·검증 */
    tone?: 'orange' | 'blue'
    size?: number
  }>(),
  { variant: 'hero', tone: 'orange', size: 82 },
)

/** 배지 지름 대비 글리프 비율 — inline은 배경이 없어 더 크게 */
const GLYPH_RATIO = { hero: 0.46, path: 0.48, inline: 0.8 } as const

const glyphSize = computed(() => Math.round(props.size * GLYPH_RATIO[props.variant]))
</script>

<template>
  <span
    class="proposal-badge"
    :class="[`variant-${variant}`, `tone-${tone}`]"
    :style="{ '--badge-size': size + 'px' }"
  >
    <svg
      :viewBox="glyph.viewBox"
      :width="glyphSize"
      :height="glyphSize"
      focusable="false"
      aria-hidden="true"
    >
      <path v-for="(d, i) in glyph.paths" :key="i" :d="d" fill="currentColor" />
    </svg>
  </span>
</template>

<style lang="scss" scoped>
/**
 * 색은 presentation/tokens.ts 와 같은 값이다. 바꿀 때 양쪽을 함께 고친다.
 * orange500 #D9641A · blue600 #006FBD 위에서만 흰 글리프가 비텍스트 대비 3:1을 넘는다.
 * 그라디언트 밝은 쪽(orange400 #F58220 / blue500 #0290D5)은 장식이라 단독 바탕으로 쓰지 않는다.
 */
.proposal-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  box-sizing: border-box;
  width: var(--badge-size);
  height: var(--badge-size);
  border-radius: 50%;
  color: #fff;

  // 그림자도 토큰 색의 알파 변형으로 둔다 — rgb()로 쓰면 팔레트 검사가 못 읽는다
  &.tone-orange {
    background-image: linear-gradient(145deg, #f58220, #d9641a);
    box-shadow: 0 6px 14px #d9641a47;
  }

  &.tone-blue {
    background-image: linear-gradient(145deg, #0290d5, #006fbd);
    box-shadow: 0 6px 14px #092e4947;
  }

  // 상단 하이라이트 — 장표의 광택 질감
  &.variant-hero,
  &.variant-path {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-image: linear-gradient(180deg, rgb(255 255 255 / 28%), rgb(255 255 255 / 0%) 55%);
      pointer-events: none;
    }
  }

  // 배경 없이 글리프만 — 본문 안에 섞여 들어가는 용도
  &.variant-inline {
    background-image: none;
    box-shadow: none;

    // 배경이 없으니 글리프 자체가 대비를 책임진다 — 텍스트 안전 단계를 쓴다
    &.tone-orange { color: #b85610; }
    &.tone-blue   { color: #006fbd; }
  }
}
</style>
