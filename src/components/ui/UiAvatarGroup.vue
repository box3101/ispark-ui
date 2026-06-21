<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'
import type { Size } from '@/design-tokens'

const AVATAR_GROUP_SIZE_KEY = Symbol('avatar-group-size')

interface Props {
  /** 최대 표시 수 (초과분 "+N") */
  max?: number
  /** 자식에 전파할 사이즈 */
  size?: Size | number
  /** 겹침 정도 (px) */
  overlap?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  overlap: 8,
})

// 자식 UiAvatar에 사이즈 전파
provide(AVATAR_GROUP_SIZE_KEY, computed(() => props.size))

const slots = useSlots()

// 자식 수 계산
const childCount = computed(() => {
  const children = slots.default?.({}) ?? []
  let count = 0
  for (const vnode of children) {
    if (Array.isArray(vnode.children)) {
      count += vnode.children.length
    } else {
      count++
    }
  }
  return count
})

const overflowCount = computed(() => {
  if (!props.max || childCount.value <= props.max) return 0
  return childCount.value - props.max
})

const overlapStyle = computed(() => ({
  '--avatar-overlap': `-${props.overlap}px`,
}))

// "+N" 원의 사이즈
const counterSizeClass = computed(() => {
  if (typeof props.size === 'number') return null
  return `size-${props.size}`
})

const counterCustomStyle = computed(() => {
  if (typeof props.size !== 'number') return null
  const px = `${props.size}px`
  return { width: px, height: px, fontSize: `${Math.round(props.size * 0.35)}px` }
})
</script>

<template>
  <div
    class="ui-avatar-group"
    :style="overlapStyle"
    role="group"
    aria-label="멤버 목록"
  >
    <slot />
    <span
      v-if="overflowCount > 0"
      class="ui-avatar-group__counter"
      :class="counterSizeClass"
      :style="counterCustomStyle"
      aria-label="`그 외 ${overflowCount}명`"
    >
      +{{ overflowCount }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.ui-avatar-group {
  display: inline-flex;
  align-items: center;

  :deep(.ui-avatar + .ui-avatar),
  :deep(.ui-avatar + .ui-avatar-group__counter) {
    margin-left: var(--avatar-overlap, -8px);
  }

  :deep(.ui-avatar) {
    border: 2px solid #fff;
    box-sizing: content-box;
  }
}

.ui-avatar-group__counter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: $border-radius-full;
  background: $color-border;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
  font-size: $size-xs-font;
  border: 2px solid #fff;
  box-sizing: content-box;
  margin-left: var(--avatar-overlap, -8px);
  user-select: none;

  &.size-xs { width: $size-xs-height; height: $size-xs-height; font-size: 10px; }
  &.size-sm { width: $size-sm-height; height: $size-sm-height; font-size: 11px; }
  &.size-md { width: $size-md-height; height: $size-md-height; font-size: 12px; }
  &.size-lg { width: $size-lg-height; height: $size-lg-height; font-size: 13px; }
}
</style>
