<template>
  <DialogRoot :open="open" @update:open="onUpdateOpen">
    <DialogPortal>
      <DialogOverlay class="ui-modal-overlay" />
      <DialogContent class="ui-modal-content" :class="[`size-${size}`]">
        <header v-if="title || showClose" class="ui-modal-header">
          <DialogTitle v-if="title" class="ui-modal-title">{{ title }}</DialogTitle>
          <DialogTitle v-else class="ui-modal-sr-only">모달</DialogTitle>
          <DialogClose
            v-if="showClose"
            class="ui-modal-close"
            aria-label="닫기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </DialogClose>
        </header>
        <DialogTitle v-if="!title && !showClose" class="ui-modal-sr-only">모달</DialogTitle>
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'radix-vue'

interface Props {
  open?: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  title: '',
  size: 'md',
  showClose: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  close: []
}>()

const onUpdateOpen = (value: boolean) => {
  emit('update:open', value)
  if (!value) emit('close')
}
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
  background: #fff;
  border-radius: $shape-rounded;
  box-shadow: $shadow-md;
  z-index: $z-modal + 1;

  // 반응형 max-width — viewport 안전 여백 보장
  &.size-sm { max-width: min(400px, calc(100vw - 40px)); }
  &.size-md { max-width: min(560px, calc(100vw - 40px)); }
  &.size-lg { max-width: min(800px, calc(100vw - 40px)); }
  &.size-xl { max-width: min(1080px, calc(100vw - 40px)); }

  max-height: calc(100vh - 40px);
  overflow-y: auto;

  &[data-state='open'] {
    animation: ui-modal-content-in 200ms ease-out forwards;
  }
  &[data-state='closed'] {
    animation: ui-modal-content-out 150ms ease-in forwards;
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
</style>
