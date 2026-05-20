<template>
  <div
    class="ui-toggle-wrap"
    :class="{ 'has-label': !!label }"
  >
    <label
      v-if="label"
      :for="resolvedId"
      class="ui-toggle-label"
      :class="{ 'is-hidden': labelHidden }"
    >
      {{ label }}
    </label>
    <button
      :id="resolvedId"
      type="button"
      class="ui-toggle"
      :class="{ 'is-active': modelValue, 'is-disabled': disabled }"
      role="switch"
      :aria-checked="modelValue"
      :aria-disabled="disabled || undefined"
      :disabled="disabled"
      @click="onClick"
    >
      <span
        class="ui-toggle-thumb"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

interface Props {
  modelValue: boolean
  /** 비활성 — 클릭/키보드 토글 차단 */
  disabled?: boolean
  /** 라벨 텍스트 (label htmlFor → button id 자동 매칭) */
  label?: string
  /** 라벨을 시각적으로만 숨김 (SR에는 노출) */
  labelHidden?: boolean
  /** id 명시 — 미지정 시 useId() 자동 생성 (SSR 안전) */
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  label: '',
  labelHidden: false,
  id: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const uid = Math.random().toString(36).slice(2, 11)
const resolvedId = computed(() => props.id || `ui-toggle-${uid}`)

const onClick = () => {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style lang="scss" scoped>
.ui-toggle-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &.has-label {
    // label + button 같은 라인
  }
}

.ui-toggle-label {
  @include typo($body-small);
  color: $color-text-primary;
  cursor: pointer;
  user-select: none;

  // 시각적으로 숨김 (SR에는 노출) — UiInput 패턴과 일치
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

.ui-toggle {
  position: relative;
  width: 32px;
  height: 20px;
  border: none;
  border-radius: 9999px;
  background: $color-border;
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;
  padding: 0;

  &.is-active {
    background: var(--color-primary);
  }

  &.is-disabled,
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .ui-toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 9999px;
    background: #fff;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  }

  &.is-active .ui-toggle-thumb {
    transform: translateX(12px);
  }
}

// reduce-motion 시 thumb 트랜지션 정지
@media (prefers-reduced-motion: reduce) {
  .ui-toggle,
  .ui-toggle .ui-toggle-thumb {
    transition: none;
  }
}
</style>
