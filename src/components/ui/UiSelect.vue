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
        :class="[
          `size-${size}`,
          `shape-${shape}`,
          {
            'is-disabled': disabled,
            'is-error': isError,
          },
        ]"
        :aria-required="required || undefined"
        :aria-invalid="isError ? 'true' : undefined"
        :aria-describedby="ariaDescribedby"
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
              :value="normalizeItemValue(opt.value)"
              :disabled="opt.disabled"
              class="ui-select-item"
            >
              <SelectItemText>{{ opt.label }}</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <p
      v-if="errorMessage"
      :id="errorId"
      class="ui-select-error"
      role="alert"
    >
      {{ errorMessage }}
    </p>
    <p
      v-else-if="desc"
      :id="descId"
      class="ui-select-desc"
    >
      {{ desc }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId, watchEffect } from 'vue'
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
import type { SelectSize } from '@/design-tokens'

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
  size?: SelectSize
  shape?: 'rounded' | 'pill'
  // === 에러/설명 ===
  error?: boolean
  /**
   * 에러 메시지 — 비어있지 않으면 `error: true` 자동 + 빨간 텍스트로 표시.
   */
  errorMessage?: string
  desc?: string
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
  error: false,
  errorMessage: '',
  desc: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

// id 자동 생성 (Vue 3.5+ useId — SSR 안전)
const uid = useId()
const resolvedId = computed(() => props.id || `ui-select-${uid}`)

const descId = computed(() => (props.desc ? `${resolvedId.value}-desc` : undefined))
const errorId = computed(() => (props.errorMessage ? `${resolvedId.value}-error` : undefined))

const isError = computed(() => props.error || !!props.errorMessage)
const ariaDescribedby = computed(() => errorId.value || descId.value)

// radix-vue는 SelectItem :value=""를 거부 → 옵션에 빈 값이 있을 때만 토큰으로 우회.
// 옵션에 빈 값 없는 일반 케이스에서 modelValue=''는 그대로 빈 문자열 유지 →
// radix-vue가 selected 없음으로 인식하고 placeholder 표시.
const EMPTY_VALUE_TOKEN = '__ui_select_empty__'

const hasEmptyOption = computed(() => props.options.some((o) => o.value === ''))

// SelectItem용 — 옵션 value가 ''이면 토큰으로 (radix-vue 제약 우회)
const normalizeItemValue = (value: string | number) => {
  if (value === '') return EMPTY_VALUE_TOKEN
  return String(value)
}

const denormalizeValue = (value: string): string | number => {
  if (value === EMPTY_VALUE_TOKEN) return ''
  // 숫자 옵션이면 number로 복원
  const matched = props.options.find((o) => String(o.value) === value)
  return matched ? matched.value : value
}

const resolvedModelValue = computed(() => {
  const v = props.modelValue
  if (v === '' || v === undefined) {
    // 빈 값 옵션이 있으면 토큰으로 매칭, 없으면 '' 그대로 → radix-vue가 placeholder 표시
    return hasEmptyOption.value ? EMPTY_VALUE_TOKEN : ''
  }
  return String(v)
})

const onUpdate = (val: string) => {
  const v = denormalizeValue(val)
  emit('update:modelValue', v)
  emit('change', v)
}

// dev 환경 검증
if (import.meta.env.DEV) {
  watchEffect(() => {
    if (props.options.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('[UiSelect] options 배열이 비어 있습니다.')
    }
    // labelHidden은 "시각적 숨김 + SR 노출"이므로 label이 있어야 의미가 있음
    if (props.labelHidden && !props.label) {
      // eslint-disable-next-line no-console
      console.warn(
        '[UiSelect] labelHidden=true인데 label prop이 없습니다. 숨길 라벨 자체가 없어 접근 가능 이름이 비어있게 됩니다.',
      )
    }
    // required 필수 필드는 접근 가능 이름이 반드시 필요 — label 없이는 SR이 필드 정체를 알 수 없음
    if (props.required && !props.label) {
      // eslint-disable-next-line no-console
      console.warn(
        '[UiSelect] required=true인데 label이 없습니다. 스크린리더가 필수 항목임을 인지할 수 없습니다. label prop을 반드시 지정하세요 (시각적으로 숨기려면 labelHidden=true와 함께).',
      )
    }
    const seen = new Set<string>()
    for (const opt of props.options) {
      const k = String(opt.value)
      if (seen.has(k)) {
        // eslint-disable-next-line no-console
        console.warn(`[UiSelect] 중복된 option.value 발견: "${k}"`)
      }
      seen.add(k)
    }
  })
}

// 외부에서 focus 호출 가능하도록 trigger DOM 직접 접근 helper
// (radix-vue Trigger는 ref 노출이 까다로워서 id로 querySelector)
defineExpose({
  focus: () => {
    const el = document.getElementById(resolvedId.value)
    el?.focus()
  },
})
</script>

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

.ui-select-outer {
  flex: 1;
  min-width: 0;
}

.ui-select-label {
  display: block;
  // UiInput과 동일 패턴 — body-small + medium weight
  @include typo($body-small);
  font-weight: $font-weight-medium;
  color: var(--color-text-primary);
  margin-bottom: 4px;

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
  font-weight: $font-weight-semibold;
}

.ui-select-desc {
  margin-top: 4px;
  @include typo($body-small, var(--color-text-secondary));
}

.ui-select-error {
  margin-top: 4px;
  @include typo($body-small, var(--color-danger));
  font-weight: $font-weight-medium;
}

.ui-select-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  cursor: pointer;
  outline: none;
  transition: border-color $transition-base;

  &[data-placeholder] {
    // 폼 전체 placeholder 톤 통일 — Input/Textarea와 동일 토큰
    color: $color-text-disabled;
  }

  @include desktop-hover {
    border-color: var(--color-primary);
  }

  &:focus,
  &[data-state='open'] {
    border-color: var(--color-primary);
  }

  &[data-state='open'] {
    .ui-select-icon {
      transform: rotate(180deg);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  // ===== size — 공용 토큰 =====
  // xs(24px)는 인라인/캘린더 헤더 등 좁은 영역용 (예: UiDatePicker 내부 셀렉트)
  @each $key in (xs sm md lg auth) {
    $vals: map.get($sizes, $key);
    &.size-#{$key} {
      min-height: map.get($vals, height);
      font-size:  map.get($vals, font);
      padding:    4px map.get($vals, padding-x);

      .ui-select-icon {
        width:  map.get($vals, icon);
        height: map.get($vals, icon);
      }
    }
  }

  // ===== shape — 공용 토큰 =====
  &.shape-rounded { border-radius: $shape-rounded; }
  &.shape-pill    { border-radius: $shape-pill; }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.is-error:not(.is-disabled) {
    border-color: var(--color-danger);

    &[data-state='open'] {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
    }
  }
}

.ui-select-value {
  @include ellipsis(1);
  min-width: 0;
}

.ui-select-icon {
  flex-shrink: 0;
  color: var(--color-text-secondary);
  transition: transform $transition-base;
}
</style>

<style lang="scss">
// Radix-vue가 popper wrapper에 inline z-index를 넣으므로 !important로 오버라이드
[data-radix-popper-content-wrapper]:has(.ui-select-content) {
  z-index: 1100 !important;
}

.ui-select-content {
  min-width: var(--radix-select-trigger-width);
  max-height: 240px;
  overflow-y: auto;
  padding: $spacing-xs 0;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: $shape-rounded;
  box-shadow: $shadow-md;
  // modal/drawer/popover 안에서 열릴 때도 보이도록
  z-index: 1100;
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
