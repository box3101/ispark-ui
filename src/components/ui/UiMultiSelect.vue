<template>
  <div class="ui-multi-select-outer">
    <PopoverRoot v-model:open="isOpen">
      <PopoverTrigger as-child>
        <!-- as-child → Radix가 data-state="open|closed" 주입 -->
        <button
          :id="resolvedId"
          type="button"
          class="ui-multi-select-trigger"
          :class="[`size-${size}`, `shape-${shape}`, { 'is-disabled': disabled }]"
          :disabled="disabled"
          :aria-label="triggerLabel"
          :aria-haspopup="'listbox'"
          :aria-expanded="isOpen"
        >
          <span
            class="ui-multi-select-value"
            :class="{ 'is-placeholder': !modelValue.length }"
          >
            {{ triggerLabel }}
          </span>
          <span
            class="ui-multi-select-icon"
            :class="{ 'is-open': isOpen }"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          class="ui-multi-select-content"
          side="bottom"
          :side-offset="4"
          align="start"
          role="listbox"
          aria-multiselectable="true"
        >
          <div
            v-for="opt in options"
            :key="opt.value"
            class="ui-multi-select-item"
            :class="{ 'is-checked': isSelected(opt.value) }"
            tabindex="0"
            role="option"
            :aria-selected="isSelected(opt.value)"
            @click="toggleOption(opt.value)"
            @keydown.enter.prevent="toggleOption(opt.value)"
            @keydown.space.prevent="toggleOption(opt.value)"
          >
            <span class="ui-multi-select-checkbox-box">
              <svg
                v-if="isSelected(opt.value)"
                class="ui-multi-select-checkbox-icon"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 6L5 8.5L9.5 3.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span class="ui-multi-select-item-label">{{ opt.label }}</span>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'
import type { SelectSize } from '@/design-tokens'

export interface MultiSelectOption {
  label: string
  value: string | number
}

interface Props {
  // === 데이터 ===
  modelValue?: Array<string | number>
  options: MultiSelectOption[]
  placeholder?: string
  // === HTML ===
  id?: string
  name?: string
  // === 상태 ===
  disabled?: boolean
  // === 스타일 ===
  size?: SelectSize
  shape?: 'rounded' | 'pill'
  /** 선택 개수가 이 값을 초과하면 "첫번째 외 N건"으로 축약 표시 (기본 2) */
  maxLabels?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  placeholder: '',
  id: undefined,
  name: undefined,
  disabled: false,
  size: 'md',
  shape: 'rounded',
  maxLabels: 2,
})

const emit = defineEmits<{
  'update:modelValue': [value: Array<string | number>]
  change: [value: Array<string | number>]
}>()

// id 자동 생성 (Vue 3.5+ useId — SSR 안전)
const uid = useId()
const resolvedId = computed(() => props.id || `ui-multi-select-${uid}`)

const isOpen = ref(false)

const isSelected = (value: string | number) =>
  props.modelValue.some((v) => String(v) === String(value))

const toggleOption = (value: string | number) => {
  const next = isSelected(value)
    ? props.modelValue.filter((v) => String(v) !== String(value))
    : [...props.modelValue, value]
  emit('update:modelValue', next)
  emit('change', next)
}

const selectedLabels = computed(() =>
  props.modelValue.map(
    (v) => props.options.find((o) => String(o.value) === String(v))?.label ?? String(v),
  ),
)

const triggerLabel = computed(() => {
  const labels = selectedLabels.value
  if (!labels.length) return props.placeholder || '선택'
  if (labels.length <= props.maxLabels) return labels.join(', ')
  return `${labels[0]} 외 ${labels.length - 1}건`
})

// 외부에서 focus 호출 가능하도록 trigger DOM 직접 접근 helper
defineExpose({
  focus: () => {
    const el = document.getElementById(resolvedId.value)
    el?.focus()
  },
})
</script>

<!-- 트리거: scoped -->
<style lang="scss" scoped>
@use 'sass:map';

// 데스크탑(마우스) 환경에서만 hover — 모바일 hover stuck 방어
@mixin desktop-hover {
  @media (hover: hover) {
    &:hover:not(.is-disabled) {
      @content;
    }
  }
}

.ui-multi-select-outer {
  flex: 1;
  min-width: 0;
}

.ui-multi-select-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  gap: 4px;

  font-weight: $font-weight-medium;
  color: var(--color-text-primary);

  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);

  cursor: pointer;
  outline: none;
  transition: border-color $transition-base;

  @include desktop-hover {
    border-color: var(--color-primary);
  }

  &:focus,
  &[data-state='open'] {
    border-color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  // ===== size — 공용 토큰 =====
  @each $key in (xs sm md lg xlg auth) {
    $vals: map.get($sizes, $key);
    &.size-#{$key} {
      min-height: map.get($vals, height);
      font-size: map.get($vals, font);
      padding: 4px map.get($vals, padding-x);

      .ui-multi-select-icon {
        width: map.get($vals, icon);
        height: map.get($vals, icon);
      }
    }
  }

  // ===== shape — 공용 토큰 =====
  &.shape-rounded {
    border-radius: $shape-rounded;
  }
  &.shape-pill {
    border-radius: $shape-pill;
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.ui-multi-select-value {
  @include ellipsis(1);
  min-width: 0;

  &.is-placeholder {
    color: $color-text-disabled;
    font-weight: $font-weight-normal;
  }
}

.ui-multi-select-icon {
  flex-shrink: 0;
  color: var(--color-text-secondary);
  transition: transform $transition-base;

  &.is-open {
    transform: rotate(180deg);
  }
}
</style>

<!-- 드롭다운(Portal): 글로벌 -->
<style lang="scss">
// Radix-vue가 popper wrapper에 inline z-index를 넣으므로 오버라이드
[data-radix-popper-content-wrapper]:has(.ui-multi-select-content) {
  z-index: 1100 !important;
}

.ui-multi-select-content {
  min-width: var(--radix-popover-trigger-width);
  max-height: 240px;
  overflow-y: auto;

  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: $shape-rounded;
  box-shadow: $shadow-md;
  padding: $spacing-xs 0;
  z-index: 1100;
}

.ui-multi-select-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-base;
  color: var(--color-text-primary);
  cursor: pointer;
  outline: none;
  transition: background-color $transition-fast;
  user-select: none;

  &:hover,
  &:focus {
    background: var(--color-background);
  }

  &.is-checked {
    .ui-multi-select-item-label {
      color: var(--color-primary);
      font-weight: $font-weight-medium;
    }

    .ui-multi-select-checkbox-box {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
}

.ui-multi-select-checkbox-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--color-border);
  border-radius: 4px;
  background: #fff;
  transition: all $transition-fast;
  color: #fff;
}

.ui-multi-select-checkbox-icon {
  display: block;
}

.ui-multi-select-item-label {
  @include ellipsis(1);
  min-width: 0;
  transition: color $transition-fast;
}
</style>
