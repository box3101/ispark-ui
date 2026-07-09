<template>
  <DialogRoot :open="effectiveOpen" @update:open="onUpdateOpen">
    <DialogPortal>
      <DialogOverlay v-if="showOverlay" class="ui-modal-overlay" />
      <DialogContent
        class="ui-modal-content"
        :class="[`ui-modal-size-${size}`, customClass, { 'is-fullscreen': isFullscreen }]"
        :style="contentStyle"
        @escape-key-down="onEscapeKeyDown"
        @pointer-down-outside="onPointerDownOutside"
        @interact-outside="onInteractOutside"
      >
        <header v-if="$slots.header || title || showClose || showFullscreen" class="ui-modal-header">
          <slot name="header">
            <DialogTitle v-if="title" class="ui-modal-title">{{ title }}</DialogTitle>
            <DialogTitle v-else class="ui-modal-sr-only">모달</DialogTitle>
            <div class="ui-modal-header-actions">
              <button
                v-if="showFullscreen"
                type="button"
                class="ui-modal-fullscreen-toggle"
                :aria-label="isFullscreen ? '축소' : '전체화면'"
                @click="toggleFullscreen"
              >
                <svg v-if="!isFullscreen" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <DialogClose
                v-if="showClose"
                class="ui-modal-close"
                aria-label="닫기"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
              </DialogClose>
            </div>
          </slot>
        </header>
        <DialogTitle v-if="!$slots.header && !title && !showClose && !showFullscreen" class="ui-modal-sr-only">모달</DialogTitle>

        <div class="ui-modal-body">
          <slot />
        </div>

        <footer v-if="$slots.footer" class="ui-modal-footer">
          <slot name="footer" />
        </footer>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'radix-vue'

interface Props {
  open?: boolean
  /** [호환] 레거시 단방향 :is-open 지원. open 미지정 시 사용. v-model:open 전환 후 제거 예정 */
  isOpen?: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showClose?: boolean
  showOverlay?: boolean
  showFullscreen?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  customClass?: string
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  title: '',
  size: 'md',
  showClose: true,
  showOverlay: true,
  showFullscreen: false,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  customClass: '',
  maxWidth: '',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  close: []
}>()

// [호환] open(양방향 v-model) 또는 isOpen(레거시 단방향) 중 하나로 열림 상태 결정
const effectiveOpen = computed(() => Boolean(props.open || props.isOpen))

const onUpdateOpen = (value: boolean) => {
  emit('update:open', value)
  if (!value) emit('close')
}

// fullscreen state — 외부에서 직접 제어 안 함, 헤더 토글 버튼으로만
const isFullscreen = ref(false)

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

// 닫힐 때 fullscreen reset — 다시 열면 원래 size로
watch(
  effectiveOpen,
  (open) => {
    if (!open) isFullscreen.value = false
  },
)

const onEscapeKeyDown = (e: KeyboardEvent) => {
  if (!props.closeOnEscape) e.preventDefault()
}

const onPointerDownOutside = (e: Event) => {
  if (!props.closeOnOverlayClick) e.preventDefault()
}

// interactOutside는 pointer + focus 두 케이스 통합 — focus도 차단해야 일관
const onInteractOutside = (e: Event) => {
  if (!props.closeOnOverlayClick) e.preventDefault()
}

// maxWidth 명시 시 size 토큰 max-width override — fullscreen 시 무시
const contentStyle = computed(() => {
  if (isFullscreen.value || !props.maxWidth) return {}
  return { maxWidth: props.maxWidth }
})
</script>

<style lang="scss">
// Portal 안 — global
.ui-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: $z-modal;

  // radix-vue 애니메이션 hook
  &[data-state='open'] {
    animation: ui-modal-overlay-in 150ms ease-out forwards;
  }
  &[data-state='closed'] {
    animation: ui-modal-overlay-out 100ms ease-in forwards;
  }
}

.ui-modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background: var(--color-bg-elevated);
  border-radius: $shape-rounded;
  box-shadow: $shadow-md;
  z-index: $z-modal + 1;

  // 반응형 max-width — viewport 안전 여백 보장
  // 프리픽스(ui-modal-size-*): 호스트 앱의 레거시 글로벌 .size-md 등과 충돌 방지 (teleport로 언스코프드이므로)
  &.ui-modal-size-sm { max-width: min(400px, calc(100vw - 40px)); }
  &.ui-modal-size-md { max-width: min(560px, calc(100vw - 40px)); }
  &.ui-modal-size-lg { max-width: min(800px, calc(100vw - 40px)); }
  &.ui-modal-size-xl { max-width: min(1080px, calc(100vw - 40px)); }

  max-height: calc(100vh - 40px);
  overflow-y: auto;

  &[data-state='open'] {
    animation: ui-modal-content-in 200ms ease-out forwards;
  }
  &[data-state='closed'] {
    animation: ui-modal-content-out 150ms ease-in forwards;
  }

  // fullscreen은 animation 이후 와서 transform 등을 짓밟음
  // (animation forwards가 마지막 keyframe 값을 강제해서 specificity와 별개로 덮음)
  &.is-fullscreen,
  &.is-fullscreen[data-state='open'],
  &.is-fullscreen[data-state='closed'] {
    max-width: 100vw !important;
    max-height: 100vh !important;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    transform: none !important;
    border-radius: 0;
    animation: none !important;
  }
}

.ui-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-md;
  padding: $spacing-md $spacing-lg;
  border-bottom: 1px solid var(--color-border);
}

.ui-modal-body {
  padding: $spacing-lg;
  // header/footer가 sticky가 아니라 단순 영역. 본문 길면 .ui-modal-content가 스크롤
}

.ui-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: $spacing-sm;
  padding: $spacing-md $spacing-lg;
  border-top: 1px solid var(--color-border);
}

.ui-modal-title {
  margin: 0;
  @include typo($body-large-bold, var(--color-text-heading));
  flex: 1;
  min-width: 0;
}

.ui-modal-close {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-text-secondary);
  border-radius: $shape-rounded;
  cursor: pointer;
  transition: background-color $transition-base, color $transition-base;

  @media (hover: hover) {
    &:hover {
      background-color: var(--color-background);
      color: var(--color-text-primary);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.ui-modal-header-actions {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  // title 없을 때(sr-only)도 항상 우측 정렬 — space-between이 자식 1개로 인식되어 좌측 정렬되는 버그 방지
  margin-left: auto;
}

.ui-modal-fullscreen-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-text-secondary);
  border-radius: $shape-rounded;
  cursor: pointer;
  transition: background-color $transition-base, color $transition-base;

  @media (hover: hover) {
    &:hover {
      background-color: var(--color-background);
      color: var(--color-text-primary);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

@keyframes ui-modal-overlay-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes ui-modal-overlay-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes ui-modal-content-in {
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
@keyframes ui-modal-content-out {
  from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  to   { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
}

.ui-modal-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// 모션 감소 선호 시 — overlay/content animation 즉시 표시 (transform/opacity 없이)
@media (prefers-reduced-motion: reduce) {
  .ui-modal-overlay,
  .ui-modal-content {
    &[data-state='open'],
    &[data-state='closed'] {
      animation: none;
    }
  }
}
</style>
