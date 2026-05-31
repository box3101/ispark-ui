<template>
  <div
    class="ui-textarea-outer"
    :class="{
      'has-label': !!label,
      'has-error': isError,
      'has-desc': !!desc && !errorMessage,
    }"
  >
    <!-- 라벨 -->
    <label
      v-if="label"
      :for="resolvedId"
      class="ui-textarea-label"
      :class="{ 'is-hidden': labelHidden }"
    >
      {{ label }}
      <span
        v-if="required"
        class="ui-textarea-required"
        aria-hidden="true"
      >*</span>
    </label>

    <!-- 본체 -->
    <div class="ui-textarea-wrap">
      <textarea
        :id="resolvedId"
        ref="textareaRef"
        class="ui-textarea"
        :class="[
          `radius-${radius}`,
          `size-${size}`,
          { 'has-border': border, 'is-error': isError, 'has-counter': showCounter },
        ]"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :maxlength="maxLength"
        :spellcheck="spellcheck"
        :required="required || undefined"
        :aria-invalid="isError || undefined"
        :aria-describedby="describedBy"
        @input="onInput"
      />

      <!-- 글자수 카운터 — maxLength 지정 + showCounter=true 시만 -->
      <span
        v-if="showCounter && maxLength"
        class="ui-textarea-counter"
        aria-hidden="true"
      >
        {{ modelValue.length }} / {{ maxLength }}
      </span>
    </div>

    <!-- 에러 메시지 (있으면 desc 대신 노출) -->
    <p
      v-if="errorMessage"
      :id="errorId"
      class="ui-textarea-error"
      role="alert"
    >
      {{ errorMessage }}
    </p>
    <!-- 설명 (errorMessage 없을 때만) -->
    <p
      v-else-if="desc"
      :id="descId"
      class="ui-textarea-desc"
    >
      {{ desc }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, useId } from 'vue'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  /** 초기 표시 rows. autoResize=true면 입력 따라 자동 확장 (기본 1 → autoResize로 콘텐츠 맞춤) */
  rows?: number
  /** 입력에 따라 scrollHeight로 자동 높이 조절. 기본 true */
  autoResize?: boolean
  maxLength?: number
  /** autoResize 한계 — N줄 초과 시 scroll. 기본 10 */
  maxRows?: number
  radius?: 'sm' | 'base' | 'lg'
  /** 테두리 표시 (기본 false — 외부에서 wrap 스타일 입히는 경우 대비) */
  border?: boolean
  size?: 'sm' | 'md' | 'lg'
  /** 브라우저 맞춤법 밑줄. 기본 true */
  spellcheck?: boolean

  // ===== 폼 필드 (UiInput 패턴 일관성) =====
  label?: string
  labelHidden?: boolean
  /** 필수 표시 — 라벨에 * 표기 + HTML required */
  required?: boolean
  /** 에러 상태. errorMessage가 있으면 자동 true */
  error?: boolean
  errorMessage?: string
  desc?: string
  /** id 명시 — 미지정 시 useId() 자동 (SSR 안전) */
  id?: string
  /** maxLength 지정 시 우하단 'n / max' 카운터 표시. 기본 false */
  showCounter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  rows: 1,
  autoResize: true,
  maxLength: undefined,
  maxRows: 10,
  radius: 'base',
  border: true,
  size: 'md',
  spellcheck: true,
  label: '',
  labelHidden: false,
  required: false,
  error: false,
  errorMessage: '',
  desc: '',
  id: undefined,
  showCounter: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const uid = useId()
const resolvedId = computed(() => props.id || `ui-textarea-${uid}`)
const errorId = computed(() => (props.errorMessage ? `${resolvedId.value}-error` : undefined))
const descId = computed(() => (props.desc && !props.errorMessage ? `${resolvedId.value}-desc` : undefined))
const isError = computed(() => props.error || !!props.errorMessage)
const describedBy = computed(() => errorId.value || descId.value)

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const getLineHeight = (): number => {
  const el = textareaRef.value
  if (!el) return 20
  const cs = window.getComputedStyle(el)
  return parseFloat(cs.lineHeight) || 20
}

const adjustHeight = () => {
  const el = textareaRef.value
  if (!el || !props.autoResize) return

  el.style.height = 'auto'
  let newHeight = el.scrollHeight

  if (props.maxRows) {
    const lineHeight = getLineHeight()
    const cs = window.getComputedStyle(el)
    const paddingTop = parseFloat(cs.paddingTop) || 0
    const paddingBottom = parseFloat(cs.paddingBottom) || 0
    const maxHeight = lineHeight * props.maxRows + paddingTop + paddingBottom
    newHeight = Math.min(newHeight, maxHeight)
  }

  el.style.height = `${newHeight}px`
}

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  nextTick(adjustHeight)
}

onMounted(() => {
  if (props.autoResize) adjustHeight()
})

watch(
  () => props.modelValue,
  () => {
    if (props.autoResize) nextTick(adjustHeight)
  },
)

// 외부에서 ref로 focus/blur 접근 — UiInput 패턴
defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  el: textareaRef,
})
</script>

<style lang="scss" scoped>
@use 'sass:map';

.ui-textarea-outer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.ui-textarea-label {
  @include typo($body-small-bold);
  color: $color-text-primary;

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

.ui-textarea-required {
  color: var(--color-danger);
  margin-left: 2px;
}

.ui-textarea-wrap {
  position: relative;
  width: 100%;
}

.ui-textarea {
  font-family: inherit;
  color: var(--color-text-primary);
  background-color: var(--color-bg-elevated);
  resize: none;
  // Input과 동일한 가로 패딩 토큰 사용 — size별 padding 토큰을 size 블록에서 적용
  padding: $spacing-sm map.get($sizes, 'md', padding-x);
  width: 100%;
  min-height: 84px;
  display: block;
  border: 0;
  outline: none;
  @include typo($body-medium);
  transition: border-color $transition-base, outline-color $transition-base;

  // ===== Radius — 공용 shape 토큰과 정렬 =====
  &.radius-sm {
    border-radius: $border-radius-sm;
  }
  &.radius-base {
    border-radius: $border-radius-base;
  }
  &.radius-lg {
    border-radius: $border-radius-lg;
  }

  // ===== Size — 공용 size 토큰의 font·padding-x 사용 (Input과 일관) =====
  // 높이는 콘텐츠 기반 (min-height만 지정)
  @each $key in (sm md lg) {
    $vals: map.get($sizes, $key);
    &.size-#{$key} {
      font-size: map.get($vals, font);
      padding: $spacing-sm map.get($vals, padding-x);
    }
  }
  &.size-sm { min-height: 64px; }
  &.size-md { min-height: 84px; }
  &.size-lg { min-height: 104px; }

  &::placeholder {
    // UiInput과 동일 토큰 — WCAG AA 대비(~5.2:1) 보장
    color: var(--color-text-disabled);
    opacity: 1; // Firefox 기본 opacity 0.5 무시
  }

  &:disabled {
    color: var(--color-text-disabled);
    background: var(--color-background);
    cursor: not-allowed;
  }

  &[readonly] {
    background: var(--color-surface);
  }

  // border 모드 — 외부 wrap 없이 단독으로 쓸 때
  &.has-border {
    border: 1px solid var(--color-border);

    &:hover:not(:disabled):not([readonly]) {
      border-color: var(--color-primary);
    }

    &:focus:not(:disabled):not([readonly]),
    &:focus-visible:not(:disabled):not([readonly]) {
      border-color: var(--color-primary);
      // Input/Button/Select와 동일한 outline ring — 폼 키보드 포커스 통일
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  // 에러 상태 — border 모드일 때 빨강 처리
  &.is-error {
    &.has-border,
    &.has-border:hover,
    &.has-border:focus {
      border-color: var(--color-danger);
    }
    // 포커스 ring도 danger 색으로
    &.has-border:focus,
    &.has-border:focus-visible {
      outline-color: var(--color-danger);
    }
  }

  // counter가 있으면 우하단 공간 확보
  &.has-counter {
    padding-bottom: 22px;
  }
}

.ui-textarea-counter {
  position: absolute;
  right: 10px;
  bottom: 6px;
  @include typo($body-xsmall);
  color: $color-text-muted;
  pointer-events: none;
  user-select: none;
}

.ui-textarea-error {
  @include typo($body-xsmall);
  color: #b91c1c;
}

.ui-textarea-desc {
  @include typo($body-xsmall);
  color: $color-text-muted;
}

@media (prefers-reduced-motion: reduce) {
  .ui-textarea {
    transition: none;
  }
}
</style>
