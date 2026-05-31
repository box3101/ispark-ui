<template>
  <component
    :is="as"
    ref="rootEl"
    class="ui-button"
    :class="[
      `variant-${variant}`,
      `size-${size}`,
      `shape-${shape}`,
      iconSize ? `icon-size-${iconSize}` : null,
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-full': fullWidth,
        'is-icon-only': iconOnly,
      },
    ]"
    :type="as === 'button' ? type : undefined"
    :href="as === 'a' ? safeHref : undefined"
    :target="as === 'a' ? target : undefined"
    :rel="as === 'a' && target === '_blank' ? 'noopener noreferrer' : undefined"
    :disabled="as === 'button' && (disabled || loading) ? true : undefined"
    :aria-disabled="as === 'a' && (disabled || loading) ? 'true' : undefined"
    :tabindex="as === 'a' && (disabled || loading) ? -1 : undefined"
    :aria-busy="loading || undefined"
    :aria-label="ariaLabel"
    @click="onClick"
  >
    <!-- 로딩 스피너 (왼쪽 아이콘 자리에 대체) -->
    <span
      v-if="loading"
      class="ui-button-spinner"
      aria-hidden="true"
    />
    <!-- 왼쪽 아이콘 (loading 중에는 스피너로 대체) -->
    <span
      v-else-if="$slots['icon-left']"
      class="ui-button-icon"
    >
      <slot name="icon-left" />
    </span>
    <!-- 텍스트 -->
    <span
      v-if="$slots.default && !iconOnly"
      class="ui-button-text"
    >
      <slot />
    </span>
    <!-- 오른쪽 아이콘 -->
    <span
      v-if="$slots['icon-right'] && !loading"
      class="ui-button-icon"
    >
      <slot name="icon-right" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import type { Size, Shape } from '@/design-tokens'

// XSS 방어 — href에 위험한 URL scheme 차단 (javascript:, data:, vbscript:, file:)
// 안전 스킴(http(s)/mailto/tel/sms/상대 경로/해시 등)은 그대로 통과
const DANGEROUS_SCHEME_RE = /^\s*(?:javascript|data|vbscript|file):/i
const sanitizeHref = (raw?: string): string | undefined => {
  if (!raw) return undefined
  const trimmed = raw.trim()
  if (DANGEROUS_SCHEME_RE.test(trimmed)) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        `[UiButton] 차단된 위험 URL scheme: "${trimmed.slice(0, 40)}…" → href 비움 (XSS 방어)`,
      )
    }
    return undefined
  }
  return trimmed
}

interface Props {
  /**
   * 시멘틱 variant — primary(강조) / secondary(보조) / ghost(트리거) / danger(파괴)
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
  /**
   * 사이즈 — xs(24px) / sm(28px) / md(32px·기본) / lg(40px)
   */
  size?: Size
  /**
   * 아이콘 사이즈 — 미지정 시 size 따라감. 명시 시 override.
   */
  iconSize?: Size
  /**
   * 모서리 모양 — rounded(기본 6px) / pill(완전 라운드) / circle(iconOnly FAB)
   */
  shape?: Shape
  /**
   * 렌더링 태그 — button(기본) / a(링크)
   */
  as?: 'button' | 'a'
  /**
   * button 태그일 때만 적용. form 안 의도치 않은 submit 방지로 기본 'button'.
   */
  type?: 'button' | 'submit'
  /**
   * as='a'일 때 링크 경로
   */
  href?: string
  /**
   * as='a'일 때 link target. '_blank'이면 rel="noopener noreferrer" 자동 부여.
   */
  target?: '_blank' | '_self' | '_parent' | '_top'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  iconOnly?: boolean
  /**
   * 접근성 라벨 — iconOnly=true일 때 필수
   */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  shape: 'rounded',
  as: 'button',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  iconOnly: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// dev 환경 접근성/사용성 검증 — props 변경에도 반응 (reactive)
if (import.meta.env.DEV) {
  watchEffect(() => {
    if (props.iconOnly && !props.ariaLabel) {
      // eslint-disable-next-line no-console
      console.warn(
        '[UiButton] iconOnly=true 시 ariaLabel prop이 필수입니다. 스크린리더가 버튼 용도를 인지할 수 없습니다.',
      )
    }
    if (props.as === 'a' && !props.href) {
      // eslint-disable-next-line no-console
      console.warn(
        '[UiButton] as="a" 사용 시 href prop이 필요합니다. (현재 페이지로 새로고침될 수 있음)',
      )
    }
    if (props.shape === 'circle' && !props.iconOnly) {
      // eslint-disable-next-line no-console
      console.warn(
        '[UiButton] shape="circle"은 iconOnly와 함께 사용하세요. 텍스트 버튼에 정원 모양은 어색합니다.',
      )
    }
  })
}

// href XSS sanitize — computed로 reactive (props.href 변경 시 자동 재계산)
const safeHref = computed(() => sanitizeHref(props.href))

// disabled/loading 시 click 이벤트 방어
const onClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  emit('click', e)
}

// 외부에서 focus/blur 호출 가능하도록 노출
const rootEl = ref<HTMLButtonElement | HTMLAnchorElement | null>(null)
defineExpose({
  focus: () => rootEl.value?.focus(),
  blur: () => rootEl.value?.blur(),
  el: rootEl,
})
</script>

<style lang="scss" scoped>
// 데스크탑(마우스) 환경에서만 hover 적용 — 모바일 hover stuck 방어
@mixin desktop-hover {
  @media (hover: hover) {
    &:hover:not(:disabled):not([aria-disabled='true']) {
      @content;
    }
  }
}

.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  // 명시적 속성만 transition (성능 최적화)
  transition:
    background-color $transition-base,
    border-color $transition-base,
    color $transition-base;
  white-space: nowrap;
  letter-spacing: -0.02em;
  text-decoration: none; // a 태그 underline 제거
  // 타이포 프리셋 — font-weight/line-height 통일 (font-size는 size 블록에서 별도 지정)
  font-weight: $font-weight-bold;
  line-height: $line-height-base;

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  // ===== size — 공용 토큰 (height/padding-x/font + 자동 icon size) =====
  &.size-xs {
    height: $size-xs-height;
    padding: 0 $size-xs-padding-x;
    font-size: $size-xs-font;

    .ui-button-icon :deep(i:not([class*='size-'])) {
      width: $size-xs-icon;
      height: $size-xs-icon;
    }
    .ui-button-spinner {
      width: $size-xs-icon;
      height: $size-xs-icon;
      border-width: 1.5px;
    }
  }

  &.size-sm {
    height: $size-sm-height;
    padding: 0 $size-sm-padding-x;
    font-size: $size-sm-font;

    .ui-button-icon :deep(i:not([class*='size-'])) {
      width: $size-sm-icon;
      height: $size-sm-icon;
    }
    .ui-button-spinner {
      width: $size-sm-icon;
      height: $size-sm-icon;
      border-width: 1.5px;
    }
  }

  &.size-md {
    height: $size-md-height;
    padding: 0 $size-md-padding-x;
    font-size: $size-md-font;

    .ui-button-icon :deep(i:not([class*='size-'])) {
      width: $size-md-icon;
      height: $size-md-icon;
    }
    .ui-button-spinner {
      width: $size-md-icon;
      height: $size-md-icon;
      border-width: 1.5px;
    }
  }

  &.size-lg {
    height: $size-lg-height;
    padding: 0 $size-lg-padding-x;
    font-size: $size-lg-font;

    .ui-button-icon :deep(i:not([class*='size-'])) {
      width: $size-lg-icon;
      height: $size-lg-icon;
    }
    .ui-button-spinner {
      width: $size-lg-icon;
      height: $size-lg-icon;
      border-width: 2px;
    }
  }

  // ===== iconSize override — size 클래스보다 후행 → 동일 specificity에서 후행 승 =====
  &.icon-size-xs .ui-button-icon :deep(i:not([class*='size-'])) {
    width: $size-xs-icon;
    height: $size-xs-icon;
  }
  &.icon-size-sm .ui-button-icon :deep(i:not([class*='size-'])) {
    width: $size-sm-icon;
    height: $size-sm-icon;
  }
  &.icon-size-md .ui-button-icon :deep(i:not([class*='size-'])) {
    width: $size-md-icon;
    height: $size-md-icon;
  }
  &.icon-size-lg .ui-button-icon :deep(i:not([class*='size-'])) {
    width: $size-lg-icon;
    height: $size-lg-icon;
  }

  // ===== shape — 공용 토큰 =====
  &.shape-rounded {
    border-radius: $shape-rounded;
  }
  &.shape-pill {
    border-radius: $shape-pill;
  }
  &.shape-circle {
    border-radius: $shape-circle;
  }

  // ===== component-local: button 고유 min-width =====
  &.size-xs {
    min-width: 52px;
  }
  &.size-sm {
    min-width: 60px;
  }
  &.size-md {
    min-width: 68px;
  }
  &.size-lg {
    min-width: 84px;
  }

  // ===== component-local: iconOnly 정사각 (size별 height와 동일) =====
  &.is-icon-only {
    padding: 0;
    min-width: auto;

    &.size-xs {
      width: $size-xs-height;
      min-width: $size-xs-height;
    }
    &.size-sm {
      width: $size-sm-height;
      min-width: $size-sm-height;
    }
    &.size-md {
      width: $size-md-height;
      min-width: $size-md-height;
    }
    &.size-lg {
      width: $size-lg-height;
      min-width: $size-lg-height;
    }
  }

  // ===== variant (4종) — 모두 CSS 변수, hover는 desktop-hover로 보호 =====
  &.variant-primary {
    background-color: var(--color-primary);
    color: #fff;

    @include desktop-hover {
      background-color: var(--color-primary-hover);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      background-color: var(--color-primary-dark);
    }
  }

  &.variant-secondary {
    background-color: #fff;
    border-color: var(--color-border);
    color: var(--color-text-primary);

    @include desktop-hover {
      background-color: var(--color-background);
      border-color: var(--color-text-primary);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      background-color: var(--color-border-light);
      border-color: var(--color-text-primary);
    }
  }

  &.variant-ghost {
    background-color: transparent;
    color: var(--color-text-secondary);
    min-width: auto; // ghost는 트리거 용도가 많아 min-width 해제

    @include desktop-hover {
      background-color: var(--color-background);
      color: var(--color-text-heading-sub);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      background-color: var(--color-border-light);
    }
  }

  &.variant-danger {
    background-color: var(--color-danger);
    color: #fff;

    &:focus-visible {
      outline-color: var(--color-danger);
    }

    @include desktop-hover {
      background-color: var(--color-danger-hover);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      background-color: var(--color-danger-dark);
    }
  }

  &.variant-outline {
    background-color: #fff;
    border-color: var(--color-border);
    color: #2d3139;

    @include desktop-hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
  }

  // ===== 상태 =====
  &.is-disabled,
  &[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.is-loading {
    cursor: wait;
  }

  &.is-full {
    width: 100%;
  }
}

.ui-button-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

// 로딩 스피너 — 사이즈는 size-{key} 안에서 결정
.ui-button-spinner {
  display: inline-block;
  flex-shrink: 0;
  border-style: solid;
  border-color: currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ui-button-spin 0.6s linear infinite;
}

@keyframes ui-button-spin {
  to {
    transform: rotate(360deg);
  }
}

// 사용자가 모션 감소 선호 시 — spinner 회전 매우 천천히 (정지 시 의도 전달 불가)
@media (prefers-reduced-motion: reduce) {
  .ui-button-spinner {
    animation-duration: 3s; // 5배 느림 — 정지 대신 최소 시각 신호 유지
  }
}
</style>
