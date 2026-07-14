<template>
  <div
    class="ui-input-outer"
    :class="[outerClass, {
      'has-desc': !!desc && !errorMessage,
      'has-error': isError,
      'has-label': !!(label || $slots.label),
    }]"
    :style="outerStyle"
  >
    <!-- Label — text prop 또는 slot. for=resolvedId로 자동 연결 -->
    <label
      v-if="label || $slots.label"
      :for="resolvedId"
      class="ui-input-label"
      :class="{ 'is-hidden': labelHidden }"
    >
      <slot name="label">{{ label }}</slot>
      <span
        v-if="required"
        class="ui-input-required"
        aria-hidden="true"
      >*</span>
    </label>

    <div
      class="ui-input-wrap"
      :class="[
        `size-${size}`,
        `shape-${shape}`,
        iconSize ? `icon-size-${iconSize}` : null,
        {
          'is-disabled': disabled,
          'is-focused': isFocused,
          'is-error': isError,
          'has-icon-left': !!$slots['icon-left'],
          'has-icon-right': !!$slots['icon-right'] || type === 'search' || showClearButton || showPasswordToggleButton,
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
        v-bind="forwardedAttrs"
        :id="resolvedId"
        ref="inputRef"
        class="ui-input"
        :type="resolvedType"
        :role="type === 'search' ? 'searchbox' : undefined"
        :inputmode="inputMode"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required || undefined"
        :autocomplete="autocomplete"
        :name="name"
        :maxlength="maxLength"
        :aria-describedby="ariaDescribedby"
        :aria-invalid="ariaInvalid"
        @input="onInput"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.enter="onEnterKey"
      />

      <!-- clearable X: 값이 있을 때 표시 (search 타입은 자동 clearable) -->
      <button
        v-if="showClearButton"
        type="button"
        class="ui-input-icon is-right is-clear"
        aria-label="입력 삭제"
        @click="onClearClick"
      >
        <!-- circle은 currentColor (부모 .is-clear 토큰), X는 흰색 대비 유지 -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="currentColor"/>
          <path d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- search 타입: 돋보기 검색 버튼 (X 옆에 항상 표시) -->
      <button
        v-if="type === 'search'"
        type="button"
        class="ui-input-icon is-right is-search"
        :disabled="disabled"
        :aria-label="searchAriaLabel"
        @click="onSearchClick"
      >
        <i class="icon-search" />
      </button>

      <!-- password toggle: 비밀번호 표시/숨김 (search가 아닐 때) -->
      <button
        v-else-if="showPasswordToggleButton"
        type="button"
        class="ui-input-icon is-right is-password-toggle"
        :aria-label="passwordVisible ? '비밀번호 숨기기' : '비밀번호 표시'"
        @click="onPasswordToggle"
      >
        <i :class="passwordVisible ? 'icon-eye-off' : 'icon-eye'" />
      </button>

      <!-- 우측 커스텀 아이콘 (위 기능 아이콘이 없을 때만) -->
      <span
        v-else-if="$slots['icon-right']"
        class="ui-input-icon is-right"
      >
        <slot name="icon-right" />
      </span>
    </div>

    <!-- 에러 메시지 (desc보다 우선) — role=alert로 변경 즉시 스크린리더 안내 -->
    <p
      v-if="errorMessage"
      :id="errorId"
      class="ui-input-error"
      role="alert"
    >
      {{ errorMessage }}
    </p>
    <!-- 설명 텍스트 (errorMessage 없을 때만, input의 aria-describedby와 연결) -->
    <p
      v-else-if="desc"
      :id="descId"
      class="ui-input-desc"
    >
      {{ desc }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, useId, watchEffect } from 'vue'
import type { StyleValue } from 'vue'
import type { Size, InputSize } from '@/design-tokens'

interface Props {
  /** v-model 양방향 바인딩 값 */
  modelValue?: string | number
  /**
   * input HTML type — `search`는 내부적으로 text + 우측 검색 아이콘 자동.
   * `number`는 사용 금지 (한글 IME 깜빡임) → `numberOnly` prop 사용.
   */
  type?: 'text' | 'search' | 'password' | 'email' | 'tel' | 'url'
  /**
   * label 텍스트 — `<label for>` 자동 연결. label slot이 있으면 그것을 우선.
   * `id` prop이 없어도 자동 생성된 id로 연결됨.
   */
  label?: string
  /**
   * label 시각적 숨김 — DOM에는 있지만 CSS로 숨김. 스크린리더는 인지.
   * search input에서 placeholder만 노출하고 싶을 때.
   */
  labelHidden?: boolean
  /**
   * 에러 상태 — input에 빨간 테두리 + `aria-invalid="true"` 자동.
   * `errorMessage`가 있으면 별도 지정 안 해도 자동 true.
   */
  error?: boolean
  /**
   * 에러 메시지 — 비어있지 않으면 `error: true` 자동 + 빨간 텍스트로 표시.
   * input의 `aria-describedby`가 이 메시지로 연결 (desc보다 우선).
   */
  errorMessage?: string
  /** 입력 영역 플레이스홀더 텍스트 */
  placeholder?: string
  /** 비활성화 — 입력 차단 + opacity 0.5 */
  disabled?: boolean
  /** 읽기 전용 — 표시는 정상, 입력만 차단 */
  readonly?: boolean
  /** 필수 입력 (HTML required) */
  required?: boolean
  /** autocomplete HTML 속성 (e.g., "email", "current-password", "off") */
  autocomplete?: string
  /** form submit 시 사용할 input name 속성 */
  name?: string
  /** label htmlFor와 연결할 input id 속성 */
  id?: string
  /** 입력 가능한 최대 글자 수 (HTML 표준 maxlength) */
  maxLength?: number
  /**
   * 최솟값 — `numberOnly=true` 필수. blur 시점에 자동 보정.
   * type=text 사용으로 HTML native 제약 없음.
   */
  min?: string | number
  /**
   * 최댓값 — `numberOnly=true` 필수. blur 시점에 자동 보정.
   */
  max?: string | number
  /**
   * 단위 — `numberOnly=true` 필수. blur 시 step 단위로 반올림.
   * 예: `step=0.1` → 0.05 입력 시 0.1로 보정.
   */
  step?: string | number
  /**
   * 사이즈 — `sm`(30) / `md`(32·기본) / `lg`(34) / `xlg`(36) / `auth`(44·로그인 전용)
   * UiButton과 동일 토큰 사용 → 검색바에서 자동 정렬.
   */
  size?: InputSize
  /**
   * 아이콘 사이즈 — 미지정 시 `size` 따라감, 명시 시 override (xxs~xlg).
   * 슬롯 내 `<i>`에 `size-N` 클래스 안 붙였을 때만 적용.
   */
  iconSize?: Size
  /**
   * 모서리 모양 — `rounded`(기본 6px) / `pill`(완전 라운드 — 검색바·필터)
   */
  shape?: 'rounded' | 'pill'
  /**
   * 입력 아래 설명 텍스트 — 별도 `<p class="hint">` 사용 금지, 이 prop 사용
   * input의 `aria-describedby`와 자동 연결.
   */
  desc?: string
  /**
   * 숫자만 허용 — `type="number"` 사용 금지 정책 대신 사용 (한글 IME 깜빡임 방지).
   * `min/max/step`은 이 prop이 true일 때만 동작.
   */
  numberOnly?: boolean
  /** `numberOnly=true`일 때 소수점 허용 (예: 0.5) */
  allowDecimal?: boolean
  /** `numberOnly=true`일 때 음수 부호(-) 허용 */
  allowNegative?: boolean
  /**
   * 소수점 자릿수 제한 — `allowDecimal=true`일 때만 의미.
   * 입력 즉시 초과 자릿수 제거. 예: `decimals=2` → "0.123" 입력 시 "0.12"로 자동 보정.
   */
  decimals?: number
  /**
   * 천 단위 콤마 — `numberOnly=true`일 때 자동 적용.
   * 입력/표시 시 "1,234,567" 형태로 포맷. emit 값은 숫자(콤마 제거).
   * 기본값: `numberOnly=true`이면 자동 true.
   */
  useComma?: boolean
  /**
   * 입력값 삭제 버튼 — 값이 비어있지 않고 disabled/readonly 아닐 때 우측 X 표시.
   * 클릭 시 값 비움 + input re-focus + `clear` 이벤트 발생.
   */
  clearable?: boolean
  /**
   * 비밀번호 표시/숨김 토글 — `type="password"`일 때만 동작.
   * 눈 아이콘 클릭으로 text↔password 전환.
   */
  showPasswordToggle?: boolean
  /** 검색 버튼 aria-label (type="search"일 때만, 기본 "검색") */
  searchAriaLabel?: string
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  required: false,
  autocomplete: undefined,
  name: undefined,
  id: undefined,
  maxLength: undefined,
  min: undefined,
  max: undefined,
  step: undefined,
  size: 'md',
  shape: 'rounded',
  desc: '',
  label: '',
  labelHidden: false,
  error: false,
  errorMessage: '',
  numberOnly: false,
  allowDecimal: false,
  allowNegative: false,
  decimals: undefined,
  useComma: undefined,
  clearable: false,
  showPasswordToggle: false,
  searchAriaLabel: '검색',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  enter: [value: string | number]
  search: [value: string | number]
  clear: []
}>()

const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)
const isComposing = ref(false)
const passwordVisible = ref(false)

// input type 결정 — search는 text, password toggle 시 text↔password 전환
const resolvedType = computed(() => {
  if (props.type === 'search') return 'text'
  if (props.type === 'password' && passwordVisible.value) return 'text'
  return props.type
})

// clearable X 버튼 표시 조건: 값이 있고 disabled/readonly 아닐 때
// search 타입은 clearable prop 없이도 자동 적용
const showClearButton = computed(() =>
  (props.clearable || props.type === 'search') && !!props.modelValue && !props.disabled && !props.readonly,
)

// password toggle 버튼 표시 조건: type="password" + prop 켜짐 + disabled 아닐 때
const showPasswordToggleButton = computed(() =>
  props.showPasswordToggle && props.type === 'password' && !props.disabled,
)

// $attrs에서 class/style을 제외하고 input으로 전달 (aria-*, data-*, role, autocomplete 등)
// inheritAttrs: false라서 명시적 forward 필요
const attrs = useAttrs()
const forwardedAttrs = computed(() => {
  const { class: _c, style: _s, ...rest } = attrs as Record<string, unknown>
  return rest
})
// outer wrapper로 forward되는 class/style — useAttrs() 반환은 unknown이라 명시 cast
const outerClass = computed(() => attrs.class as unknown)
const outerStyle = computed<StyleValue | undefined>(() => (attrs.style as StyleValue | undefined) ?? undefined)

// id 자동 생성 (Vue 3.5+ useId — SSR 안전, 인스턴스별 unique).
// 외부에서 id prop을 안 주면 label/aria 연결을 위해 내부 id 사용.
const uid = useId()
const resolvedId = computed(() => props.id || `ui-input-${uid}`)

// desc id — input의 aria-describedby로 연결
const descId = computed(() => props.desc ? `${resolvedId.value}-desc` : undefined)
// error message id — desc보다 우선해 aria-describedby 연결
const errorId = computed(() => props.errorMessage ? `${resolvedId.value}-error` : undefined)

// 에러 상태: error prop 또는 errorMessage 중 하나라도 있으면 true
const isError = computed(() => props.error || !!props.errorMessage)

// aria-describedby 우선순위: errorMessage > desc
const ariaDescribedby = computed(() => errorId.value || descId.value)
// aria-invalid: error 상태에서만 'true'. 외부에서 attrs로 명시한 값도 존중.
// HTML attr 타입에 맞춰 Booleanish | 'grammar' | 'spelling' | undefined로 좁힘.
type AriaInvalid = boolean | 'true' | 'false' | 'grammar' | 'spelling' | undefined
const ariaInvalid = computed<AriaInvalid>(() => {
  if (isError.value) return 'true'
  const fromAttrs = attrs['aria-invalid']
  if (fromAttrs === undefined || fromAttrs === null) return undefined
  // attrs는 unknown — 알려진 값만 통과시키고 그 외엔 truthy → 'true' 폴백
  if (typeof fromAttrs === 'boolean') return fromAttrs
  if (fromAttrs === 'true' || fromAttrs === 'false' || fromAttrs === 'grammar' || fromAttrs === 'spelling') {
    return fromAttrs
  }
  return fromAttrs ? 'true' : 'false'
})

// inputmode — numberOnly + allow* 조합에 따라 모바일 키보드 결정
const inputMode = computed<'numeric' | 'decimal' | undefined>(() => {
  if (!props.numberOnly) return undefined
  return props.allowDecimal || props.allowNegative ? 'decimal' : 'numeric'
})

// decimals 검증 — 0 이상 정수만 유효
const validDecimals = computed(() => {
  const d = props.decimals
  if (d === undefined) return undefined
  if (Number.isInteger(d) && d >= 0) return d
  return undefined
})

// 콤마 활성 여부 — useComma 명시 안 하면 numberOnly일 때 자동 true
const isCommaEnabled = computed(() => {
  if (props.useComma !== undefined) return props.useComma
  return props.numberOnly
})

// 콤마 포맷 유틸
const addCommas = (val: string): string => {
  if (!val || val === '-') return val
  const parts = val.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

const removeCommas = (val: string): string => val.replace(/,/g, '')

// 표시용 값 — 콤마 포맷 적용
const displayValue = computed(() => {
  if (!isCommaEnabled.value) return props.modelValue
  const raw = String(props.modelValue ?? '')
  return addCommas(raw)
})

// emit 값 타입 정합 — modelValue가 number면 number로 emit
const emitValue = (raw: string): string | number => {
  const cleaned = removeCommas(raw)
  if (typeof props.modelValue === 'number') {
    if (cleaned === '' || cleaned === '-') return cleaned
    const n = parseFloat(cleaned)
    if (!Number.isNaN(n)) return n
  }
  return cleaned
}

// dev 환경 — props 검증 / 사용성 안내
if (import.meta.env.DEV) {
  watchEffect(() => {
    const hasNumericConstraint =
      props.min !== undefined || props.max !== undefined || props.step !== undefined
    if (hasNumericConstraint && !props.numberOnly) {
      // eslint-disable-next-line no-console
      console.warn(
        '[UiInput] min/max/step은 numberOnly=true일 때만 blur 시점에 적용됩니다. ' +
          '한글 IME 호환을 위해 native type="number" 대신 numberOnly prop을 사용하세요.',
      )
    }
    const hasDecimalConstraint = [props.min, props.max, props.step].some(
      (v) => v !== undefined && String(v).includes('.'),
    )
    if (props.numberOnly && hasDecimalConstraint && !props.allowDecimal) {
      // eslint-disable-next-line no-console
      console.warn(
        '[UiInput] min/max/step에 소수가 있는데 allowDecimal=false. allowDecimal=true도 함께 설정해야 정상 보정됩니다.',
      )
    }
    if (props.decimals !== undefined && validDecimals.value === undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        `[UiInput] decimals는 0 이상의 정수여야 합니다 (현재: ${props.decimals}).`,
      )
    }
  })
}

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
      if (validDecimals.value !== undefined) {
        decPart = decPart.slice(0, validDecimals.value)
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

    // step 반올림 후 min/max 재-clamp — round가 max를 초과시키는 케이스 방지
    // 예: min=0 max=1 step=0.6 value=1 → round(1/0.6)*0.6=1.2 → re-clamp → 1
    if (minV !== undefined && !Number.isNaN(minV)) num = Math.max(num, minV)
    if (maxV !== undefined && !Number.isNaN(maxV)) num = Math.min(num, maxV)

    // 소수점 자릿수 결정 — step/min에서 유추 + props.decimals 상한 존중
    const stepDecimals = (String(props.step).split('.')[1] || '').length
    const minDecimals = (String(props.min ?? '').split('.')[1] || '').length
    const naturalDecimals = Math.max(stepDecimals, minDecimals, props.allowDecimal ? 2 : 0)
    const userMax = validDecimals.value
    const decimals = userMax !== undefined ? Math.min(naturalDecimals, userMax) : naturalDecimals
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

  const raw = removeCommas(input.value)

  if (props.min !== undefined || props.max !== undefined || props.step !== undefined) {
    const next = applyNumericConstraints(raw)
    if (isCommaEnabled.value) {
      input.value = addCommas(next)
    } else if (next !== input.value) {
      input.value = next
    }
    emit('update:modelValue', emitValue(next))
  } else if (isCommaEnabled.value) {
    // min/max/step 없어도 blur 시 콤마 포맷 정리
    const cleaned = stripNonNumeric(raw)
    input.value = addCommas(cleaned)
    emit('update:modelValue', emitValue(cleaned))
  }
}

// 입력값 동기화 — IME 안전성 위해 syncValue 함수로 분리
const syncValue = (input: HTMLInputElement) => {
  if (props.numberOnly) {
    const raw = removeCommas(input.value)
    const cleaned = stripNonNumeric(raw)
    // 콤마 포맷 적용 후 DOM에 반영
    if (isCommaEnabled.value) {
      const formatted = addCommas(cleaned)
      if (input.value !== formatted) {
        // 커서 위치 보정
        const cursorPos = input.selectionStart ?? 0
        const beforeCommas = input.value.slice(0, cursorPos).replace(/,/g, '').length
        input.value = formatted
        // 콤마 개수 차이만큼 커서 보정
        let newPos = 0
        let count = 0
        for (let i = 0; i < formatted.length; i++) {
          if (formatted[i] !== ',') count++
          if (count > beforeCommas) break
          newPos = i + 1
        }
        input.setSelectionRange(newPos, newPos)
      }
    } else if (cleaned !== input.value) {
      input.value = cleaned
    }
    emit('update:modelValue', emitValue(cleaned))
  } else {
    emit('update:modelValue', emitValue(input.value))
  }
}

const onInput = (e: Event) => {
  // IME composition 중에는 sync 보류 — compositionend에서 처리
  if (isComposing.value) return
  syncValue(e.target as HTMLInputElement)
}

const onCompositionStart = () => {
  isComposing.value = true
}

const onCompositionEnd = (e: CompositionEvent) => {
  isComposing.value = false
  // composition 종료 후 한 번 sync. (Chrome은 추가 input 이벤트 발생 → 동일 결과 idempotent emit)
  syncValue(e.target as HTMLInputElement)
}

const onEnterKey = (e: KeyboardEvent) => {
  // 현재 DOM 값 사용 (props.modelValue는 부모 reactivity 지연으로 stale 가능)
  const input = e.target as HTMLInputElement
  const value = emitValue(input.value)
  emit('enter', value)
  // search 타입: Enter = 검색 실행 (기존 검색 버튼 클릭 대체)
  if (props.type === 'search') {
    emit('search', value)
  }
}

const onSearchClick = () => {
  if (props.disabled) return
  emit('search', emitValue(inputRef.value?.value ?? ''))
}

const onClearClick = () => {
  emit('update:modelValue', '')
  emit('clear')
  nextTick(() => inputRef.value?.focus())
}

const onPasswordToggle = () => {
  passwordVisible.value = !passwordVisible.value
  nextTick(() => inputRef.value?.focus())
}

// 외부에서 focus/blur 호출 가능
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  el: inputRef,
})
</script>

<style lang="scss" scoped>
@use 'sass:map';

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

// ===== label =====
.ui-input-label {
  display: block;
  // 타이포 프리셋 — body-small + medium weight (13px 직접값 대체, 토큰은 12/14 갭이라 small medium으로 가까운 톤)
  @include typo($body-small);
  font-weight: $font-weight-medium;
  color: var(--color-text-primary);
  margin-bottom: 4px;

  // labelHidden — 시각적 숨김 + 스크린리더는 인지
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

.ui-input-required {
  color: var(--color-danger);
  margin-left: 2px;
  font-weight: 600;
}

.ui-input-wrap {
  display: inline-flex;
  align-items: center;
  width: 100%;
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: border-color $transition-base;

  @include desktop-hover {
    border-color: var(--color-primary);
  }

  &.is-focused:not(.is-disabled) {
    border-color: var(--color-primary);
  }

  // ===== size — 공용 토큰 (height/padding-x/font + 자동 icon size) =====
  @each $key in (sm md lg xlg auth) {
    $vals: map.get($sizes, $key);
    &.size-#{$key} {
      height: map.get($vals, height);
      font-size: map.get($vals, font);

      .ui-input {
        padding: 0 map.get($vals, padding-x);
      }
      .ui-input-icon.is-left {
        padding-left: map.get($vals, padding-x);
      }
      .ui-input-icon.is-right {
        padding-right: map.get($vals, padding-x);
      }
      // 아이콘 있을 때 입력 영역의 인접 패딩은 4px로 줄여 시각적 간격 확보
      &.has-icon-left .ui-input {
        padding-left: 4px;
      }
      &.has-icon-right .ui-input {
        padding-right: 4px;
      }

      // iconSize 미지정 시 size 따라감 (slot 내 <i>에 size-N 명시 안 했을 때만)
      .ui-input-icon :deep(i:not([class*='size-'])) {
        width: map.get($vals, icon);
        height: map.get($vals, icon);
      }
    }
  }

  // ===== iconSize override — size 클래스보다 후행 (specificity 동일 시 후행 승) =====
  @each $key in (xxs xs sm md lg xlg) {
    $vals: map.get($sizes, $key);
    &.icon-size-#{$key} .ui-input-icon :deep(i:not([class*='size-'])) {
      width: map.get($vals, icon);
      height: map.get($vals, icon);
    }
  }

  // ===== shape — 공용 토큰 (rounded 기본, pill 검색바) =====
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

  // ===== 에러 상태 — error / errorMessage prop =====
  // disabled보다 후행이라 disabled 일 땐 회색 우선, 활성 상태에서만 빨강
  &.is-error:not(.is-disabled) {
    border-color: var(--color-danger);

    &.is-focused {
      border-color: var(--color-danger);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
    }
  }
}

.ui-input {
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;
  border: 0;
  background: transparent;
  font: inherit;
  font-weight: $font-weight-medium;
  // line-height 명시 — UiButton과 시각 정렬
  line-height: 1.5;
  color: var(--color-text-primary);
  outline: none;

  &::placeholder {
    color: $color-placeholder;
    font-weight: $font-weight-normal;
    opacity: 1; // Firefox 기본 opacity 0.5 무시
  }

  &:disabled {
    cursor: not-allowed;
  }

  // autofill 시 흰 배경 강제 (브라우저 노란 배경 방지) — 모든 size 일관 적용
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px var(--color-bg-elevated) inset;
    -webkit-text-fill-color: var(--color-text-primary);
    transition: background-color 5000s ease-in-out 0s;
  }
}

.ui-input-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--color-text-secondary);

  // 기능 버튼 (search / clear / password-toggle) — native button 리셋 + 키보드 접근
  &.is-search,
  &.is-clear,
  &.is-password-toggle {
    border: 0;
    background: transparent;
    padding: 0;
    color: inherit;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  &.is-clear {
    // circle 배경색 — disabled 토큰으로 톤 통일 (이전 하드코딩 #949494 대체)
    color: var(--color-text-disabled, #{$color-text-disabled});
    opacity: 0.7;
    transition: opacity $transition-base, color $transition-base;

    &:hover {
      opacity: 1;
      color: var(--color-text-secondary, #{$color-text-secondary});
    }
  }
}

.ui-input-desc {
  margin-top: 4px;
  @include typo($body-small, var(--color-text-secondary));
}

// ===== 에러 메시지 (errorMessage prop) — desc보다 우선 표시 =====
.ui-input-error {
  margin-top: 4px;
  @include typo($body-small, var(--color-danger));
  font-weight: $font-weight-medium;
}
</style>
