<template>
  <Teleport to="body">
    <DialogRoot :open="confirmState.open" @update:open="onUpdateOpen">
      <DialogPortal>
        <DialogOverlay class="ui-confirm-overlay" />
        <DialogContent class="ui-confirm-content" @escape-key-down.prevent="onCancel">
          <div class="ui-confirm-body">
          <span v-if="confirmState.variant === 'danger'" class="ui-confirm-icon" aria-hidden="true"><UiIcon name="trash-2" :size="22" /></span>
          <div class="ui-confirm-copy">
          <DialogTitle class="ui-confirm-title">{{ confirmState.title }}</DialogTitle>
          <!-- v-html로 줄바꿈(<br>), 볼드(<strong>) 지원 -->
          <!-- DialogDescription as-child: radix aria-describedby 등록(접근성) + 기존 p/v-html 유지 -->
          <DialogDescription as-child>
            <p class="ui-confirm-message" v-html="confirmState.message" />
          </DialogDescription>
          </div>
          </div>
          <div class="ui-confirm-actions">
            <button
              type="button"
              class="ui-confirm-btn ui-confirm-btn--cancel"
              @click="onCancel"
            >
              {{ confirmState.cancelText }}
            </button>
            <button
              type="button"
              class="ui-confirm-btn"
              :class="`ui-confirm-btn--${confirmState.variant}`"
              @click="onConfirm"
            >
              {{ confirmState.confirmText }}
            </button>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </Teleport>
</template>

<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from 'radix-vue'
import { useConfirmState, resolveConfirm } from '../../composables/useConfirm'
import UiIcon from './UiIcon.vue'

const { confirmState } = useConfirmState()

function onUpdateOpen(val: boolean) {
  if (!val) resolveConfirm(false)
}

function onCancel() {
  resolveConfirm(false)
}

function onConfirm() {
  resolveConfirm(true)
}
</script>

<style lang="scss" scoped>
.ui-confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  background: rgba(15, 23, 42, 0.35);
  animation: confirm-fade-in 150ms ease-out;
}

.ui-confirm-content {
  position: fixed;
  z-index: $z-modal + 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(440px, calc(100vw - 32px));
  box-sizing: border-box;
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  background: var(--color-bg-elevated);
  border-radius: 12px;
  border: 1px solid $color-border-light;
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.16);
  padding: 24px;
  animation: confirm-scale-in 150ms ease-out;

  &:focus {
    outline: none;
  }
}

.ui-confirm-body { display: flex; align-items: flex-start; gap: 16px; }
.ui-confirm-copy { flex: 1; min-width: 0; overflow-wrap: anywhere; }
.ui-confirm-icon { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; background: rgba($color-error, .1); color: $color-error; }
.ui-confirm-title {
  margin: 0 0 $spacing-sm;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 600;
  color: $color-text-heading;
}

.ui-confirm-message {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: $color-text-muted;
  white-space: pre-line;
}

.ui-confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: $spacing-sm;
  margin-top: 24px;
  flex-wrap: wrap;
}

.ui-confirm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  min-width: 72px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background $transition-fast, opacity $transition-fast;
  &:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 3px; }

  &--cancel {
    background: var(--color-bg-elevated);
    border-color: $color-border;
    color: $color-text-primary;

    &:hover {
      background: $color-border-light;
    }
  }

  &--danger {
    background: $color-error;
    color: #fff;

    &:hover {
      opacity: 0.9;
    }
  }

  &--primary {
    background: var(--color-primary);
    color: #fff;

    &:hover {
      opacity: 0.9;
    }
  }
}

@keyframes confirm-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes confirm-scale-in {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .ui-confirm-overlay, .ui-confirm-content { animation: none; }
}
</style>
