<template>
  <label
    class="ui-checkbox"
    :class="{
      'is-checked': modelValue,
      'is-indeterminate': indeterminate && !modelValue,
      'is-disabled': disabled,
    }"
    :for="resolvedId"
  >
    <input
      :id="resolvedId"
      ref="inputRef"
      type="checkbox"
      class="ui-checkbox-input"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <span
      class="ui-checkbox-box"
      aria-hidden="true"
    >
      <!-- 체크 — modelValue=true 일 때 -->
      <svg
        v-if="modelValue && !indeterminate"
        class="ui-checkbox-icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2.5 6L5 8.5L9.5 3.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- dash — indeterminate (mixed) 표시 -->
      <svg
        v-else-if="indeterminate"
        class="ui-checkbox-icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2.5 6H9.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>
    <span
      v-if="label || $slots.default"
      class="ui-checkbox-label"
      :class="{ 'is-hidden': labelHidden }"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, useId } from 'vue'

interface Props {
  modelValue: boolean
  /** 라벨 텍스트. slot도 가능. */
  label?: string
  /** 시각만 숨김(SR에는 노출) */
  labelHidden?: boolean
  /** 비활성 — 클릭 차단 */
  disabled?: boolean
  /**
   * 부분 체크(mixed) 상태. modelValue=false일 때만 시각적으로 dash 표시.
   * 주로 트리/리스트의 부분 선택 헤더 체크박스에 사용 (예: UiTable 전체 선택 컬럼).
   */
  indeterminate?: boolean
  /** id 명시 — 미지정 시 useId() 자동 생성 (SSR 안전) */
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  labelHidden: false,
  disabled: false,
  indeterminate: false,
  id: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const uid = useId()
const resolvedId = computed(() => props.id || `ui-checkbox-${uid}`)

// indeterminate는 HTML attribute가 아닌 DOM property — :indeterminate 바인딩 X
// ref + watch로 직접 설정
const inputRef = ref<HTMLInputElement | null>(null)
const applyIndeterminate = (v: boolean) => {
  if (inputRef.value) inputRef.value.indeterminate = v
}
onMounted(() => applyIndeterminate(props.indeterminate))
watch(() => props.indeterminate, (v) => applyIndeterminate(v))

const onChange = () => {
  if (props.disabled) return
  // indeterminate 상태에서 클릭 → checked=true로 전환 (Material/HIG 패턴)
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style lang="scss" scoped>
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.ui-checkbox-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;

  // 키보드 포커스 시 box에 outline (focus-within)
  &:focus-visible + .ui-checkbox-box {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.ui-checkbox-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 1.5px solid #c6d2db;
  border-radius: 4px;
  background: #fff;
  flex-shrink: 0;
  transition: all 0.15s ease;
  color: #fff;

  .is-checked &,
  .is-indeterminate & {
    background: var(--color-primary);
    border-color: var(--color-primary);
  }
}

.ui-checkbox-label {
  font-size: $font-size-sm;
  font-weight: $font-weight-normal;
  color: $color-text-primary;
  line-height: 1.5;

  // 시각만 숨김 (SR에는 노출)
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

// reduce-motion 시 box 트랜지션 정지
@media (prefers-reduced-motion: reduce) {
  .ui-checkbox-box {
    transition: none;
  }
}
</style>
