<template>
  <component
    :is="as"
    ref="rootEl"
    class="ui-button"
    :class="[
      `variant-${variant}`,
      `size-${size}`,
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-full': fullWidth,
        'is-icon-only': iconOnly,
      },
    ]"
    :type="as === 'button' ? type : undefined"
    :href="as === 'a' ? href : undefined"
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
import { ref, watchEffect } from 'vue'

interface Props {
  /**
   * 시멘틱 variant — primary(강조) / secondary(보조) / ghost(트리거) / danger(파괴)
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  /**
   * 사이즈 — sm(28px) / md(32px·기본) / lg(40px)
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * 렌더링 태그 — button(기본) / a(링크)
   */
  as?: 'button' | 'a'
  /**
   * button 태그일 때만 적용. form 안에서 의도치 않은 submit 방지를 위해 기본 'button'.
   */
  type?: 'button' | 'submit' | 'reset'
  /**
   * as='a'일 때 링크 경로
   */
  href?: string
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  iconOnly?: boolean
  /**
   * 접근성 라벨 — iconOnly=true일 때 필수 (스크린리더가 무엇을 위한 버튼인지 인지)
   */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
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
  })
}

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
  border-radius: $border-radius-base;
  cursor: pointer;
  // 명시적 속성만 transition (성능 최적화)
  transition:
    background-color $transition-base,
    border-color $transition-base,
    color $transition-base;
  white-space: nowrap;
  letter-spacing: -0.02em;
  text-decoration: none; // a 태그 underline 제거
  // font-weight는 @include typo가 사이즈별로 결정 (정책 통일)

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  // ===== 사이즈 (3단계) =====
  &.size-sm {
    @include typo($body-small-bold);
    height: $height-sm; // 28px
    min-width: 60px;
    padding: 0 10px;

    .ui-button-spinner {
      width: 12px;
      height: 12px;
      border-width: 1.5px;
    }
  }

  &.size-md {
    @include typo($body-medium-bold);
    height: $height-md; // 32px
    min-width: 68px;
    padding: 0 12px;

    .ui-button-spinner {
      width: 14px;
      height: 14px;
      border-width: 1.5px;
    }
  }

  &.size-lg {
    @include typo($body-medium-bold);
    height: $height-lg; // 40px
    min-width: 84px;
    padding: 0 16px;

    .ui-button-spinner {
      width: 18px;
      height: 18px;
      border-width: 2px;
    }
  }

  // ===== 아이콘 온리 =====
  &.is-icon-only {
    padding: 0;
    min-width: auto;

    &.size-sm {
      width: $height-sm;
    }
    &.size-md {
      width: $height-md;
    }
    &.size-lg {
      width: $height-lg;
    }
  }

  // ===== variant (4종) — 모두 CSS 변수, hover는 desktop-hover로 보호 =====
  // variant cascade: default → :hover → :active (한 단계씩 진해짐)
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

    // hover 시 primary blue로 변하던 문제 해결 — 보조 액션은 보조답게
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
    min-width: auto;

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
  flex-shrink: 0;
}

// ===== 로딩 스피너 — 사이즈는 .size-{N} 안에서 결정 =====
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
</style>
