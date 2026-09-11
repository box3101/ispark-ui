<script setup lang="ts">
import { computed } from 'vue'
import UiIcon from './UiIcon.vue'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral'
const props = withDefaults(defineProps<{
  title?: string
  description?: string
  variant?: AlertVariant
  dismissible?: boolean
  /** 긴급 알림만 alert 사용. 기본은 일반 안내 status */
  role?: 'status' | 'alert'
}>(), { variant: 'info', dismissible: false, role: 'status' })
const visible = defineModel<boolean>({ default: true })
const emit = defineEmits<{ close: [] }>()
const icon = computed(() => ({ info: 'info', success: 'circle-check', warning: 'triangle-alert', error: 'circle-alert', neutral: 'info' })[props.variant])
function close() { visible.value = false; emit('close') }
</script>

<template>
  <div v-if="visible" class="ui-alert" :class="`variant-${variant}`" :role="role" aria-atomic="true">
    <UiIcon :name="icon" :size="20" class="ui-alert-icon" />
    <div class="ui-alert-content">
      <strong v-if="title" class="ui-alert-title">{{ title }}</strong>
      <div v-if="description || $slots.default" class="ui-alert-description"><slot>{{ description }}</slot></div>
    </div>
    <div v-if="$slots.actions" class="ui-alert-actions"><slot name="actions" /></div>
    <button v-if="dismissible" type="button" class="ui-alert-close" aria-label="안내 닫기" @click="close"><UiIcon name="x" :size="16" /></button>
  </div>
</template>

<style scoped lang="scss">
.ui-alert {
  --alert-color: #3e63dd;
  --alert-bg: #f3f7ff;
  --alert-border: #d5e1fa;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  padding: 13px 16px;
  border: 1px solid var(--alert-border);
  border-radius: 8px;
  background: var(--alert-bg);
  color: $color-text-primary;
  box-shadow: none;
  font-size: 14px;
  line-height: 1.5;
  &.variant-success { --alert-color: #15803d; --alert-bg: #f1faf4; --alert-border: #cce8d5; }
  &.variant-warning { --alert-color: #b77908; --alert-bg: #fffbef; --alert-border: #f0dfb7; }
  &.variant-error { --alert-color: #dc3545; --alert-bg: #fff4f5; --alert-border: #f4ccd1; }
  &.variant-neutral { --alert-color: #64748b; --alert-bg: #f5f7fa; --alert-border: #dce3ec; }
}
.ui-alert-icon { color: var(--alert-color); margin-top: 1px; }
.ui-alert-content { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; flex: 1; min-width: 0; }
.ui-alert-title { color: var(--alert-color); font-weight: 600; overflow-wrap: anywhere; }
.ui-alert-description { min-width: 0; overflow-wrap: anywhere; }
.ui-alert-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.ui-alert-close {
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0; width: 28px; height: 28px; margin: -3px -5px -3px 0;
  border: 0; border-radius: 4px; background: transparent; color: #64748b; cursor: pointer;
  &:hover { background: rgba(15, 23, 42, 0.05); }
  &:focus-visible { outline: 2px solid var(--alert-color); outline-offset: 2px; }
}
@media (max-width: 480px) {
  .ui-alert { flex-wrap: wrap; }
  .ui-alert-actions { order: 1; flex-basis: 100%; padding-left: 30px; }
}
</style>
