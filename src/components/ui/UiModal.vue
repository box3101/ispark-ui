<template>
  <DialogRoot :open="open" @update:open="onUpdateOpen">
    <DialogPortal>
      <DialogOverlay class="ui-modal-overlay" />
      <DialogContent class="ui-modal-content" :class="[`size-${size}`]">
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent } from 'radix-vue'

interface Props {
  open?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  size: 'md',
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
    animation: ui-modal-overlay-in 150ms ease-out;
  }
  &[data-state='closed'] {
    animation: ui-modal-overlay-out 100ms ease-in;
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
  z-index: $z-modal;

  // 반응형 max-width — viewport 안전 여백 보장
  &.size-sm { max-width: min(400px, calc(100vw - 40px)); }
  &.size-md { max-width: min(560px, calc(100vw - 40px)); }
  &.size-lg { max-width: min(800px, calc(100vw - 40px)); }
  &.size-xl { max-width: min(1080px, calc(100vw - 40px)); }

  max-height: calc(100vh - 40px);
  overflow-y: auto;

  &[data-state='open'] {
    animation: ui-modal-content-in 200ms ease-out;
  }
  &[data-state='closed'] {
    animation: ui-modal-content-out 150ms ease-in;
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
</style>
