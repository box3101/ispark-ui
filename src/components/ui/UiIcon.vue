<script setup lang="ts">
import { computed } from 'vue'
import * as icons from '@lucide/vue'

export type IconColor = 'primary' | 'danger' | 'white' | 'black' | 'muted'

const SIZE_MAP: Record<string, number> = {
  xs: 12,
  sm: 16,
  md: 18,
  lg: 20,
}

const props = withDefaults(
  defineProps<{
    /** Lucide 아이콘 이름 (kebab-case) */
    name: string
    /** 토큰('xs'|'sm'|'md'|'lg') 또는 숫자(px) */
    size?: string | number
    /** 색상 프리셋 */
    color?: IconColor
    /** Lucide 선 두께 (1~3) */
    strokeWidth?: number
  }>(),
  {
    size: 24,
    strokeWidth: 2,
  },
)

/**
 * kebab-case → PascalCase 변환
 * "arrow-right" → "ArrowRight"
 */
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

const iconComponent = computed(() => {
  const pascalName = toPascalCase(props.name)
  const icon = (icons as Record<string, unknown>)[pascalName]
  if (!icon) {
    console.warn(`[UiIcon] Unknown icon: "${props.name}"`)
    return null
  }
  return icon
})

const resolvedSize = computed(() => {
  if (typeof props.size === 'number') return props.size
  return SIZE_MAP[props.size] ?? Number(props.size) || 24
})

const colorClass = computed(() => {
  return props.color ? `color-${props.color}` : null
})
</script>

<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :size="resolvedSize"
    :stroke-width="strokeWidth"
    :class="['ui-icon', colorClass]"
    aria-hidden="true"
  />
</template>

<style lang="scss" scoped>
.ui-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;

  &.color-primary { color: var(--color-primary); }
  &.color-danger  { color: var(--color-danger); }
  &.color-white   { color: #fff; }
  &.color-black   { color: #000; }
  &.color-muted   { color: $color-text-muted; }
}
</style>
