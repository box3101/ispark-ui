<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import UiIcon from './UiIcon.vue'

export type RateSize = 'sm' | 'md' | 'lg'

interface Props {
  name?: string
  modelValue?: number
  max?: number
  disabled?: boolean
  readonly?: boolean
  allowHalf?: boolean
  allowClear?: boolean
  size?: RateSize
  label?: string
  showValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max: 5,
  disabled: false,
  readonly: false,
  allowHalf: false,
  allowClear: false,
  size: 'md',
  label: '평점',
  showValue: false,
})
const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()
const control = ref<HTMLElement>()
const preview = ref<number | null>(null)
const maximum = computed(() => Number.isFinite(props.max) && props.max >= 1 ? Math.floor(props.max) : 5)
const value = computed(() => Number.isFinite(props.modelValue) ? Math.min(maximum.value, Math.max(0, props.modelValue)) : 0)
const isLocked = computed(() => props.disabled || props.readonly)
const displayed = computed(() => preview.value ?? value.value)
const iconSize = computed(() => ({ sm: 16, md: 24, lg: 32 })[props.size])
const step = computed(() => props.allowHalf ? 0.5 : 1)

watch([value, isLocked, () => props.allowHalf], () => { preview.value = null })

// 외부 평균값은 그대로 표시하고, 사용자가 선택할 때만 1점/0.5점 단위를 적용한다.
function commit(next: number) {
  if (isLocked.value) return
  preview.value = null
  const normalized = Math.min(maximum.value, Math.max(0, next))
  if (normalized === value.value) return
  emit('update:modelValue', normalized)
  emit('change', normalized)
}

function pointerValue(event: MouseEvent, index: number) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  return props.allowHalf && event.clientX < rect.left + rect.width / 2 ? index - 0.5 : index
}

function onPreview(event: PointerEvent, index: number) {
  if (!isLocked.value && event.pointerType !== 'touch') preview.value = pointerValue(event, index)
}

function onSelect(event: MouseEvent, index: number) {
  if (isLocked.value) return
  const next = pointerValue(event, index)
  control.value?.focus({ preventScroll: true })
  commit(props.allowClear && next === value.value ? 0 : next)
}

function onKeydown(event: KeyboardEvent) {
  if (isLocked.value || event.altKey || event.ctrlKey || event.metaKey) return
  let next: number
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp': next = (Math.floor(value.value / step.value) + 1) * step.value; break
    case 'ArrowLeft':
    case 'ArrowDown': next = (Math.ceil(value.value / step.value) - 1) * step.value; break
    case 'Home': next = 0; break
    case 'End': next = maximum.value; break
    case 'Escape': preview.value = null; return
    default: return
  }
  event.preventDefault()
  commit(next)
}
</script>

<template>
  <div :class="['ui-rate', `size-${size}`, { 'is-disabled': disabled, 'is-readonly': readonly }]">
    <div
      ref="control"
      class="stars"
      :role="readonly ? 'img' : 'slider'"
      :tabindex="isLocked ? undefined : 0"
      :aria-label="readonly ? `${label}: ${maximum}점 만점에 ${value}점` : label"
      :aria-valuemin="readonly ? undefined : 0"
      :aria-valuemax="readonly ? undefined : maximum"
      :aria-valuenow="readonly ? undefined : value"
      :aria-valuetext="readonly ? undefined : `${maximum}점 만점에 ${value}점`"
      :aria-orientation="readonly ? undefined : 'horizontal'"
      :aria-disabled="disabled || undefined"
      @keydown="onKeydown"
      @pointerleave="preview = null"
      @pointercancel="preview = null"
      @blur="preview = null"
    >
      <span
        v-for="index in maximum"
        :key="index"
        class="star"
        :class="{ 'is-current': index === Math.max(1, Math.ceil(value)) }"
        aria-hidden="true"
        @pointermove="onPreview($event, index)"
        @click="onSelect($event, index)"
      >
        <span class="glyph">
          <UiIcon name="star" :size="iconSize" :stroke-width="1.5" class="outline" />
          <span class="fill" :style="{ width: `${Math.min(1, Math.max(0, displayed - index + 1)) * 100}%` }">
            <UiIcon name="star" :size="iconSize" :stroke-width="1.5" fill="currentColor" />
          </span>
        </span>
      </span>
    </div>
    <span v-if="showValue" class="value" aria-hidden="true">{{ value }} / {{ maximum }}</span>
    <span v-if="$slots.default" class="caption"><slot /></span>
    <input v-if="name" type="hidden" :name="name" :value="value" :disabled="disabled" />
  </div>
</template>

<style lang="scss" scoped>
.ui-rate {
  --rate-size: 24px;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: $spacing-sm;
  vertical-align: middle;

  &.size-sm { --rate-size: 16px; }
  &.size-lg { --rate-size: 32px; }

  .stars { display: inline-flex; outline: none; border-radius: $border-radius-sm; }
  .star {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: calc(var(--rate-size) + 8px);
    height: calc(var(--rate-size) + 8px);
    border-radius: $border-radius-sm;
    cursor: pointer;
    touch-action: manipulation;
  }
  .glyph { display: inline-flex; position: relative; width: var(--rate-size); height: var(--rate-size); }
  .outline { color: var(--rate-empty-color, var(--color-text-muted, #{$color-text-muted})); }
  .fill {
    position: absolute;
    inset: 0 auto 0 0;
    overflow: hidden;
    display: inline-flex;
    color: var(--rate-color, var(--color-warning, #{$color-warning}));
    pointer-events: none;
  }
  .stars:focus-visible .is-current { outline: 2px solid var(--color-primary); outline-offset: 1px; }
  .value { @include typo($body-small-bold); color: var(--color-text-primary, #{$color-text-primary}); }
  .caption { @include typo($body-small); color: var(--color-text-muted, #{$color-text-muted}); }
  &.is-readonly .star { cursor: default; }
  &.is-disabled {
    opacity: 0.5;
    .star { cursor: not-allowed; }
    .fill { color: var(--color-text-muted, #{$color-text-muted}); }
  }
  @media (pointer: coarse) {
    &:not(.is-readonly) .star { min-width: 44px; min-height: 44px; }
  }
  @media (forced-colors: active) {
    .outline, .fill { color: CanvasText; }
    .stars:focus-visible .is-current { outline-color: Highlight; }
  }
}
</style>
