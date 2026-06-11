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
import { computed, inject, useId, watchEffect } from 'vue'

type RadioValue = string | number | boolean

// UiRadioGroup 등 부모가 provide할 수 있는 그룹 name 키 — 같은 키를 공유하는 라디오들이
// 네이티브 radio group(브라우저 상호배제 + 화살표 키 그룹 이동)으로 동작.
const RADIO_GROUP_NAME = Symbol('ui-radio-group-name')

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

const uid = useId()
const resolvedId = computed(() => props.id || `ui-radio-${uid}`)

// 그룹 name 우선순위: props.name > 부모 provide > 인스턴스별 fallback
// 인스턴스별 fallback이면 native group으로 동작하지 않으므로 dev 환경에서 안내.
const injectedGroupName = inject<string | undefined>(RADIO_GROUP_NAME, undefined)
const resolvedName = computed(() => props.name || injectedGroupName || `ui-radio-${uid}`)

if (import.meta.env.DEV) {
  watchEffect(() => {
    if (!props.name && !injectedGroupName) {
      // eslint-disable-next-line no-console
      console.warn(
        '[UiRadio] name prop 또는 부모의 provide("ui-radio-group-name", "공유이름")이 없습니다. ' +
        '같은 v-model을 공유해도 native radio group으로 동작하지 않아 화살표 키 그룹 이동 + 브라우저 상호배제가 끊깁니다. ' +
        '같은 그룹의 모든 UiRadio에 동일한 name을 명시하세요.',
      )
    }
  })
}

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

  // hover — box border 강조 (Checkbox와 동일 패턴)
  @media (hover: hover) {
    &:hover:not(.is-disabled) .ui-radio-box {
      border-color: var(--color-primary);
    }
  }

  // active — 살짝 누름
  &:active:not(.is-disabled) .ui-radio-box {
    transform: scale(0.95);
  }

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
  border: 1.5px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-bg-elevated);
  flex-shrink: 0;
  // 모션 토큰 — Button/Input과 동일 + active 시 transform
  transition: border-color $transition-base, background-color $transition-base, transform $transition-fast;

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
