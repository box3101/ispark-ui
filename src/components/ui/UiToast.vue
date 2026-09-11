<template>
  <Teleport to="body">
    <div
      v-for="placement in PLACEMENTS"
      :key="placement"
      :class="['ui-toast-container', `placement-${placement}`]"
    >
      <TransitionGroup
        name="toast"
        tag="div"
        class="ui-toast-stack"
      >
        <div
          v-for="toast in toastsByPlacement(placement)"
          :key="toast.id"
          :class="['ui-toast', `type-${toast.type}`]"
          role="status"
          aria-live="polite"
        >
          <!-- 타입별 아이콘 (인라인 SVG — icon system 의존 없음) -->
          <span class="ui-toast-symbol" aria-hidden="true">
          <svg
            class="ui-toast-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <!-- 모든 색상은 currentColor — 부모 .ui-toast의 type 클래스가 color 토큰 지정 -->
            <template v-if="toast.type === 'success'">
              <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
              <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.2" fill="none" />
              <path
                d="M6.5 10.5L9 13L13.5 7.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </template>
            <template v-else-if="toast.type === 'error'">
              <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
              <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.2" fill="none" />
              <path
                d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </template>
            <template v-else-if="toast.type === 'warning'">
              <path d="M8.7 2.8a1.5 1.5 0 0 1 2.6 0l7 12.2a1.5 1.5 0 0 1-1.3 2.25H3a1.5 1.5 0 0 1-1.3-2.25Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
              <path d="M10 6.5V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <circle cx="10" cy="13.5" r="0.75" fill="currentColor" />
            </template>
            <template v-else>
              <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
              <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.2" fill="none" />
              <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
              <path d="M10 9V13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </template>
          </svg>
          </span>

          <p class="ui-toast-message">{{ toast.message }}</p>

          <button
            class="ui-toast-close"
            type="button"
            aria-label="닫기"
            @click="closeToast(toast.id)"
          >
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M3 3L9 9M9 3L3 9"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToastState, closeToast, type ToastPlacement } from '../../composables/useToast'

const { toastList } = useToastState()

const PLACEMENTS: ToastPlacement[] = ['top-center', 'top-right', 'bottom-center', 'bottom-right']

// placement별로 항목 필터 (각 placement가 자기 stack 렌더)
const toastsByPlacement = computed(() => (placement: ToastPlacement) =>
  toastList.value.filter((t) => t.placement === placement),
)
</script>

<style lang="scss" scoped>
.ui-toast-container {
  position: fixed;
  z-index: $z-toast;
  pointer-events: none;

  // 위치별 anchor
  &.placement-top-center {
    top: $spacing-md;
    left: 50%;
    transform: translateX(-50%);
  }
  &.placement-top-right {
    top: $spacing-md;
    right: $spacing-md;
  }
  &.placement-bottom-center {
    bottom: $spacing-md;
    left: 50%;
    transform: translateX(-50%);
  }
  &.placement-bottom-right {
    bottom: $spacing-md;
    right: $spacing-md;
  }
}

.ui-toast-stack {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;

  // bottom placement는 새 항목이 위로 쌓이는 느낌 위해 reverse
  .placement-bottom-center &,
  .placement-bottom-right & {
    flex-direction: column-reverse;
  }
}

.ui-toast {
  display: flex;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  width: min(380px, calc(100vw - 32px));
  min-height: 64px;
  padding: 12px 14px;
  background: var(--color-bg-elevated);
  border: 1px solid $color-border;
  border-radius: 8px;
  box-shadow: none;
  pointer-events: auto;

  // 상태는 아이콘으로 구분하고 외곽선은 동일하게 유지한다.
  &.type-success {
    .ui-toast-symbol { color: $color-success; background: rgba($color-success, 0.08); }
  }
  &.type-error {
    .ui-toast-symbol { color: $color-error; background: rgba($color-error, 0.08); }
  }
  &.type-warning {
    .ui-toast-symbol { color: $color-warning; background: rgba($color-warning, 0.08); }
  }
  &.type-info {
    .ui-toast-symbol { color: $color-primary; background: rgba($color-primary, 0.08); }
  }
}

.ui-toast-symbol {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
}

.ui-toast-message {
  flex: 1;
  min-width: 0;
  margin: 0;
  @include typo($body-medium, $color-text-heading);
  word-break: keep-all;
  overflow-wrap: anywhere;
  font-size: 14px;
  line-height: 1.5;
}

.ui-toast-close {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: none;
  color: $color-text-disabled;
  cursor: pointer;
  border-radius: $border-radius-sm;
  transition: color $transition-fast, background $transition-fast;

  &:hover {
    color: $color-text-primary;
    background: $color-border-light;
  }
  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }
}
</style>

<style lang="scss">
// 전역 — TransitionGroup이 :scoped 안에서 동작이 까다로워 global로
// placement별 enter/leave 방향 다르게
.ui-toast-container.placement-top-center,
.ui-toast-container.placement-top-right {
  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
.ui-toast-container.placement-bottom-center,
.ui-toast-container.placement-bottom-right {
  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
}
.ui-toast-container .toast-enter-active {
  transition: opacity 250ms ease-out, transform 250ms ease-out;
}
.ui-toast-container .toast-leave-active {
  transition: opacity 200ms ease-in, transform 200ms ease-in;
  position: absolute; // leave 시 자리 차지 안 함 (자연스러운 collapse)
}
.ui-toast-container .toast-move {
  transition: transform 250ms ease;
}

// 모션 감소 선호 시 — 페이드/translate/move 모두 즉시 (opacity만 유지해 등장 인지)
@media (prefers-reduced-motion: reduce) {
  .ui-toast-container .toast-enter-from,
  .ui-toast-container .toast-leave-to {
    transform: none;
  }
  .ui-toast-container .toast-enter-active,
  .ui-toast-container .toast-leave-active,
  .ui-toast-container .toast-move {
    transition-duration: 0ms;
  }
}
</style>
