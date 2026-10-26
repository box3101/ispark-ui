<script setup lang="ts">
import { computed } from 'vue'
import { byKey, type ProposalTone } from '../../presentation/icons/icon-map'
import { phosphorGlyphs } from '../../presentation/icons/phosphor-glyphs'

/**
 * 제안 장표용 아이콘 배지 — 채도 높은 원형 바탕 + 흰 솔리드 글리프.
 *
 * 이름이 아니라 **개념**을 받는다. 장표에서 필요한 건 "database 아이콘"이 아니라
 * "데이터 이관"이고, 글리프는 갈아끼울 수 있어야 하기 때문이다.
 * 개념 목록은 presentation/icons/icon-map.ts 에 있다.
 *
 * 글리프는 Phosphor fill(256 정사각 고정)이라 여러 개를 나란히 놓아도 크기가 고르다.
 * 이전 구현은 lucide 선 아이콘에 연한 배경을 썼는데, 장표와 명암이 반대라
 * 투사하면 글리프가 날아갔다.
 */
const props = withDefaults(
  defineProps<{
    /** presentation/icons/icon-map.ts 의 개념 key */
    concept: string
    /**
     * hero = 카드 헤더 배지 / path = 소형 배지
     * inline = 배지 없이 글리프만. 다이어그램·본문용이라 크기와 색을 CSS가 잡는다
     */
    variant?: 'hero' | 'path' | 'inline'
    /** 생략하면 개념에 정해진 톤을 쓴다 */
    tone?: ProposalTone
    size?: number
  }>(),
  { variant: 'hero', size: 82 },
)

const entry = computed(() => {
  const found = byKey[props.concept]
  if (!found) console.warn(`[ProposalIcon] Unknown concept: "${props.concept}"`)
  return found
})

const glyph = computed(() => {
  if (!entry.value) return null
  const found = phosphorGlyphs[entry.value.glyph]
  if (!found) console.warn(`[ProposalIcon] Missing glyph: "${entry.value.glyph}" — npm run build:proposal-icons`)
  return found ?? null
})

const resolvedTone = computed(() => props.tone ?? entry.value?.tone ?? 'blue')

/**
 * 배지 지름 대비 글리프 비율.
 * inline은 배지가 없으므로 size가 곧 글리프 크기다 — UiIcon과 같은 감각으로 쓴다.
 */
const GLYPH_RATIO = { hero: 0.46, path: 0.48, inline: 1 } as const
const glyphSize = computed(() => Math.round(props.size * GLYPH_RATIO[props.variant]))
</script>

<template>
  <!--
    inline은 래퍼 없이 글리프만 내보낸다. 감싸는 span에 인라인 style로 크기를 박으면
    바깥 CSS가 이길 수 없어서, 다이어그램처럼 CSS가 크기를 잡는 자리에 못 쓴다.
    width/height는 표현 속성이라 CSS가 그대로 덮어쓸 수 있다.
  -->
  <svg
    v-if="glyph && variant === 'inline'"
    class="proposal-glyph"
    :viewBox="glyph.viewBox"
    :width="glyphSize"
    :height="glyphSize"
    focusable="false"
    aria-hidden="true"
  >
    <path v-for="(d, i) in glyph.paths" :key="i" :d="d" fill="currentColor" />
  </svg>

  <span
    v-else-if="glyph"
    class="proposal-icon"
    :class="[`variant-${variant}`, `tone-${resolvedTone}`]"
    :style="{ '--badge-size': size + 'px' }"
    :title="entry?.label"
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
 * 그라디언트 밝은 쪽(orange400 / blue500)은 장식이라 단독 바탕으로 쓰지 않는다.
 */
.proposal-icon {
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
      background-image: linear-gradient(180deg, #ffffff47, #ffffff00 55%);
      pointer-events: none;
    }
  }

}

/**
 * inline 글리프 — 색을 정하지 않는다. 부모가 color로 잡는다.
 * 여기서 색을 박으면 바깥 CSS보다 특이도가 높아 다이어그램에서 덮어쓸 수 없다.
 * 배경이 없으니 대비는 부모가 책임진다 — 본문 크기면 orange700/blue600 이상을 쓸 것.
 */
.proposal-glyph {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
