<template>
  <label
    class="ui-radio"
    :class="{
      'is-checked': isChecked,
      'is-disabled': disabled,
    }"
    :for="resolvedId"
  >
    <input
      :id="resolvedId"
      type="radio"
      class="ui-radio-input"
      :name="resolvedName"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      @change="onChange"
    />
    <span
      class="ui-radio-box"
      aria-hidden="true"
    >
      <span
        v-if="isChecked"
        class="ui-radio-dot"
      />
    </span>
    <span
      v-if="label || $slots.default"
      class="ui-radio-label"
      :class="{ 'is-hidden': labelHidden }"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

type RadioValue = string | number | boolean

interface Props {
  /** 그룹 공유 v-model 값. 이 라디오의 value와 일치하면 checked */
  modelValue: RadioValue
  /** 이 라디오 고유 값 — 선택 시 modelValue에 이 값이 emit됨 */
  value: RadioValue
  /** 같은 그룹 라디오는 동일 name 공유 (브라우저 native toggle). 미지정 시 자동 생성 */
  name?: string
  /** 라벨 텍스트 (slot도 가능, slot 우선) */
  label?: string
  /** 시각만 숨김(SR 노출) */
  labelHidden?: boolean
  /** 비활성 */
  disabled?: boolean
  /** input id 명시. 미지정 시 useId() 자동 (SSR 안전) */
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: undefined,
  label: '',
  labelHidden: false,
  disabled: false,
  id: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: RadioValue]
  change: [value: RadioValue]
}>()

const uid = Math.random().toString(36).slice(2, 11)
const resolvedId = computed(() => props.id || `ui-radio-${uid}`)
// name 미지정 시 그룹은 fall back 자동 — 사용자가 명시하지 않으면 각 라디오가 독립 그룹
// 같은 v-model을 공유하는 라디오들은 같은 name을 명시하거나 외부 RadioGroup wrapper 패턴 사용 권장
const resolvedName = computed(() => props.name || `ui-radio-group-${uid}`)

const isChecked = computed(() => props.modelValue === props.value)

const onChange = () => {
  if (props.disabled) return
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style lang="scss" scoped>
.ui-radio {
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

.ui-radio-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;

  &:focus-visible + .ui-radio-box {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.ui-radio-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 1.5px solid #c6d2db;
  border-radius: 50%;
  background: #fff;
  flex-shrink: 0;
  transition: all 0.15s ease;

  .is-checked & {
    border-color: var(--color-primary);
  }
}

.ui-radio-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
}

.ui-radio-label {
  font-size: $font-size-sm;
  font-weight: $font-weight-normal;
  color: $color-text-primary;
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

@media (prefers-reduced-motion: reduce) {
  .ui-radio-box {
    transition: none;
  }
}
</style>
