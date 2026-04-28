<template>
  <div
    class="ui-input-outer"
    :class="{ 'has-desc': !!desc }"
  >
    <div
      class="ui-input-wrap"
      :class="[
        `size-${size}`,
        {
          'is-disabled': disabled,
          'is-focused': isFocused,
          'has-icon-left': !!$slots['icon-left'],
          'has-icon-right': !!$slots['icon-right'] || type === 'search',
        },
      ]"
    >
      <!-- 왼쪽 아이콘 -->
      <span
        v-if="$slots['icon-left']"
        class="ui-input-icon is-left"
      >
        <slot name="icon-left" />
      </span>

      <input
        :id="id"
        ref="inputRef"
        class="ui-input"
        :type="type === 'search' ? 'text' : type"
        :inputmode="numberOnly ? 'numeric' : undefined"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :name="name"
        :maxlength="maxLength"
        :min="min"
        :max="max"
        :step="step"
        @input="onInput"
        @compositionupdate="onCompositionUpdate"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.enter="emit('enter', modelValue)"
      />

      <!-- 우측 아이콘: search 타입이면 검색 아이콘 자동 표시 -->
      <span
        v-if="type === 'search'"
        class="ui-input-icon is-right is-search"
        @click="emit('search', modelValue)"
      >
        <i class="icon-search size-20" />
      </span>

      <!-- 우측 커스텀 아이콘 -->
      <span
        v-else-if="$slots['icon-right']"
        class="ui-input-icon is-right"
      >
        <slot name="icon-right" />
      </span>
    </div>
    <!-- 설명 텍스트 -->
    <p
      v-if="desc"
      class="ui-input-desc"
    >
      {{ desc }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue?: string | number
  /**
   * input HTML type. `search`는 내부적으로 text + 검색 아이콘.
   */
  type?: 'text' | 'search' | 'password' | 'email' | 'tel'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  name?: string
  id?: string
  maxLength?: number
  /** number-only일 때 blur 시 보정 (type=text라 native 제약 없음) */
  min?: string | number
  max?: string | number
  step?: string | number
  /**
   * 사이즈 — sm(28px·기본) / md(32px) / lg(40px) / auth(44px·로그인 전용)
   */
  size?: 'sm' | 'md' | 'lg' | 'auth'
  desc?: string
  /**
   * 숫자만 입력 — type="number" 사용 금지 정책 대신 사용 (한글 IME 깜빡임 방지)
   */
  numberOnly?: boolean
  allowDecimal?: boolean
  allowNegative?: boolean
  /**
   * 소수점 자릿수 제한 (allowDecimal=true일 때만 의미). 입력 즉시 초과 자릿수 제거.
   * 예: decimals=2 면 "0.123" 입력 시 "0.12"로 자동 보정.
   */
  decimals?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  name: undefined,
  id: undefined,
  maxLength: undefined,
  min: undefined,
  max: undefined,
  step: undefined,
  size: 'sm',
  desc: '',
  numberOnly: false,
  allowDecimal: false,
  allowNegative: false,
  decimals: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  enter: [value: string | number | undefined]
  search: [value: string | number | undefined]
}>()

const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)

// ===== 숫자 전용 처리 =====
const stripNonNumeric = (val: string): string => {
  let pattern = '0-9'
  if (props.allowDecimal) pattern += '.'
  if (props.allowNegative) pattern += '-'
  const regex = new RegExp(`[^${pattern}]`, 'g')
  let cleaned = val.replace(regex, '')

  // 음수: 맨 앞에 1개만 허용
  if (props.allowNegative) {
    const isNeg = cleaned.startsWith('-')
    cleaned = cleaned.replace(/-/g, '')
    if (isNeg) cleaned = '-' + cleaned
  }

  // 소수점: 최대 1개 + decimals로 자릿수 제한
  if (props.allowDecimal) {
    const firstDot = cleaned.indexOf('.')
    if (firstDot !== -1) {
      const intPart = cleaned.slice(0, firstDot)
      let decPart = cleaned.slice(firstDot + 1).replace(/\./g, '')
      if (props.decimals !== undefined && props.decimals >= 0) {
        decPart = decPart.slice(0, props.decimals)
      }
      cleaned = decPart === '' && intPart === '' ? '' : intPart + '.' + decPart
    }
  }

  return cleaned
}

// number-only + min/max/step 보정 (blur 시점)
const applyNumericConstraints = (raw: string): string => {
  const trimmed = raw.trim()
  if (trimmed === '') return ''
  const cleaned = stripNonNumeric(trimmed)
  if (cleaned === '' || cleaned === '-') return cleaned

  let num = parseFloat(cleaned)
  if (Number.isNaN(num)) return cleaned

  const minV = props.min !== undefined ? Number(props.min) : undefined
  const maxV = props.max !== undefined ? Number(props.max) : undefined
  const stepV = props.step !== undefined ? Number(props.step) : undefined

  if (minV !== undefined && !Number.isNaN(minV)) num = Math.max(num, minV)
  if (maxV !== undefined && !Number.isNaN(maxV)) num = Math.min(num, maxV)

  if (stepV !== undefined && stepV > 0 && !Number.isNaN(stepV)) {
    const base = minV !== undefined && !Number.isNaN(minV) ? minV : 0
    num = base + Math.round((num - base) / stepV) * stepV
    const stepDecimals = (String(props.step).split('.')[1] || '').length
    const minDecimals = (String(props.min ?? '').split('.')[1] || '').length
    const decimals = Math.max(stepDecimals, minDecimals, props.allowDecimal ? 2 : 0)
    num = Number(num.toFixed(decimals))
  }

  return String(num)
}

const onFocus = () => {
  isFocused.value = true
}

const onBlur = (e: FocusEvent) => {
  isFocused.value = false
  const input = e.target as HTMLInputElement
  if (!props.numberOnly) return
  if (props.min === undefined && props.max === undefined && props.step === undefined) return

  const next = applyNumericConstraints(input.value)
  if (next !== input.value) {
    input.value = next
    emit('update:modelValue', next)
  }
}

const onInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (props.numberOnly) {
    const cleaned = stripNonNumeric(input.value)
    input.value = cleaned
    emit('update:modelValue', cleaned)
  } else {
    emit('update:modelValue', input.value)
  }
}

// 한글 IME 조합 중 즉시 제거
const onCompositionUpdate = (e: CompositionEvent) => {
  if (props.numberOnly) {
    const input = e.target as HTMLInputElement
    const cleaned = stripNonNumeric(input.value)
    input.value = cleaned
    emit('update:modelValue', cleaned)
  }
}

// 외부에서 focus/blur 호출 가능
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  el: inputRef,
})
</script>

<style lang="scss" scoped>
@mixin desktop-hover {
  @media (hover: hover) {
    &:hover:not(.is-disabled) {
      @content;
    }
  }
}

.ui-input-outer {
  flex: 1;
  min-width: 0;
}

.ui-input-wrap {
  display: inline-flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--color-border);
  border-radius: $border-radius-base;
  overflow: hidden;
  transition: border-color $transition-base;

  @include desktop-hover {
    border-color: var(--color-primary);
  }

  &.is-focused:not(.is-disabled) {
    border-color: var(--color-primary);
  }

  // ===== 사이즈 (UiButton과 통일된 토큰) =====
  &.size-sm {
    height: $height-sm; // 28px
    @include typo($body-small);
  }

  &.size-md {
    height: $height-md; // 32px
    @include typo($body-medium);
  }

  &.size-lg {
    height: $height-lg; // 40px
    @include typo($body-medium);
  }

  // 로그인·회원가입 전용 — 다른 사이즈와 별개 사양
  &.size-auth {
    height: $height-auth; // 44px
    @include typo($body-large);

    .ui-input {
      padding: 6px 8px;
      font-weight: $font-weight-normal;
      color: var(--color-text-primary);
      background-color: #fff;

      &::placeholder {
        color: #94a3b8;
      }

      // autofill 시 흰 배경 강제 (브라우저 노란 배경 방지)
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px #fff inset;
        -webkit-text-fill-color: var(--color-text-primary);
      }
    }

    &.has-icon-left .ui-input {
      padding-left: 4px;
    }

    &.has-icon-right .ui-input {
      padding-right: 4px;
    }
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.ui-input {
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;
  border: 0;
  background: transparent;
  padding: 0 10px;
  font: inherit;
  font-weight: $font-weight-medium;
  color: var(--color-text-primary);
  outline: none;

  &::placeholder {
    color: #aebccb;
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.ui-input-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--color-text-secondary);

  &.is-left {
    padding-left: 10px;

    & + .ui-input {
      padding-left: 4px;
    }
  }

  &.is-right {
    padding-right: 10px;
  }

  &.is-search {
    cursor: pointer;
  }
}

.ui-input-desc {
  margin-top: 4px;
  @include typo($body-small);
  color: var(--color-text-secondary);
  line-height: 1.5;
}
</style>
