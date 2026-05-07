<template>
  <div
    class="ui-select-outer"
    :class="{ 'has-label': !!label }"
  >
    <label
      v-if="label"
      :for="resolvedId"
      class="ui-select-label"
      :class="{ 'is-hidden': labelHidden }"
    >
      {{ label }}
      <span
        v-if="required"
        class="ui-select-required"
        aria-hidden="true"
      >*</span>
    </label>

    <SelectRoot
      :model-value="resolvedModelValue"
      :disabled="disabled"
      @update:model-value="onUpdate"
    >
      <SelectTrigger
        :id="resolvedId"
        class="ui-select-trigger"
        :class="[`size-${size}`, `shape-${shape}`, { 'is-disabled': disabled }]"
        :aria-required="required || undefined"
      >
        <SelectValue :placeholder="placeholder" class="ui-select-value" />
        <SelectIcon class="ui-select-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent class="ui-select-content" position="popper" side="bottom" :side-offset="4">
          <SelectViewport>
            <SelectItem
              v-for="opt in options"
              :key="opt.value"
              :value="normalizeValue(opt.value)"
              :disabled="opt.disabled"
              class="ui-select-item"
            >
              <SelectItemText>{{ opt.label }}</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
import type { InputSize } from '@/design-tokens'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface Props {
  modelValue?: string | number
  options: SelectOption[]
  placeholder?: string
  // === 폼 필드 ===
  label?: string
  labelHidden?: boolean
  required?: boolean
  // === HTML ===
  id?: string
  // === 기존 ===
  disabled?: boolean
  size?: InputSize
  shape?: 'rounded' | 'pill'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '선택',
  label: '',
  labelHidden: false,
  required: false,
  id: undefined,
  disabled: false,
  size: 'md',
  shape: 'rounded',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

// id 자동 생성 (Vue 3.5+ useId — SSR 안전)
const uid = useId()
const resolvedId = computed(() => props.id || `ui-select-${uid}`)

const EMPTY_VALUE_TOKEN = '__ui_select_empty__'

const normalizeValue = (value: string | number | undefined) => {
  if (value === '' || value === undefined) return EMPTY_VALUE_TOKEN
  return String(value)
}

const denormalizeValue = (value: string): string | number => {
  if (value === EMPTY_VALUE_TOKEN) return ''
  // 숫자 옵션이면 number로 복원
  const matched = props.options.find((o) => String(o.value) === value)
  return matched ? matched.value : value
}

const resolvedModelValue = computed(() => normalizeValue(props.modelValue))

const onUpdate = (val: string) => {
  const v = denormalizeValue(val)
  emit('update:modelValue', v)
  emit('change', v)
}
</script>

<style lang="scss" scoped>
.ui-select-outer {
  flex: 1;
  min-width: 0;
}

.ui-select-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 4px;
  line-height: 1.5;

  &.is-hidden {
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
}

.ui-select-required {
  color: var(--color-danger);
  margin-left: 2px;
  font-weight: 600;
}

.ui-select-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  padding: 0 12px;
  gap: 4px;
  background-color: #fff;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  cursor: pointer;
  outline: none;

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &.shape-rounded { border-radius: $shape-rounded; }
  &.shape-pill    { border-radius: $shape-pill; }

  &[data-placeholder] {
    color: #aebccb;
  }
}

.ui-select-value {
  @include ellipsis(1);
  min-width: 0;
}

.ui-select-icon {
  flex-shrink: 0;
  color: var(--color-text-secondary);
}
</style>

<style lang="scss">
.ui-select-content {
  min-width: var(--radix-select-trigger-width);
  max-height: 240px;
  overflow-y: auto;
  padding: $spacing-xs 0;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: $shape-rounded;
  box-shadow: $shadow-md;
  z-index: $z-dropdown;
}

.ui-select-item {
  display: flex;
  align-items: center;
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-base;
  color: var(--color-text-primary);
  cursor: pointer;
  outline: none;

  &[data-highlighted] {
    background: var(--color-background);
  }

  &[data-state='checked'] {
    color: var(--color-primary);
    font-weight: 600;
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
