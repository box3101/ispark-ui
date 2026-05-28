<template>
  <Teleport to="body">
    <DialogRoot :open="confirmState.open" @update:open="onUpdateOpen">
      <DialogPortal>
        <DialogOverlay class="ui-confirm-overlay" />
        <DialogContent class="ui-confirm-content" @escape-key-down.prevent="onCancel">
          <DialogTitle class="ui-confirm-title">{{ confirmState.title }}</DialogTitle>
          <!-- v-html로 줄바꿈(<br>), 볼드(<strong>) 지원 -->
          <p class="ui-confirm-message" v-html="confirmState.message" />
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
} from 'radix-vue'
import { useConfirmState, resolveConfirm } from '../../composables/useConfirm'

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
  background: rgba(0, 0, 0, 0.45);
  animation: confirm-fade-in 150ms ease-out;
}

.ui-confirm-content {
  position: fixed;
  z-index: $z-modal + 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(400px, calc(100vw - 40px));
  background: #fff;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  padding: $spacing-lg;
  animation: confirm-scale-in 150ms ease-out;

  &:focus {
    outline: none;
  }
}

.ui-confirm-title {
  margin: 0 0 $spacing-sm;
  font-size: 16px;
  font-weight: 600;
  color: $color-text-heading;
}

.ui-confirm-message {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: $color-text-primary;
}

.ui-confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: $spacing-sm;
  margin-top: $spacing-lg;
}

.ui-confirm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: $border-radius-base;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background $transition-fast, opacity $transition-fast;

  &--cancel {
    background: none;
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
</style>
