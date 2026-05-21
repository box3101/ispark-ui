<template>
  <div
    class="ui-badge-group"
    :class="[`direction-${direction}`, { 'is-wrap': wrap }]"
    :style="{ gap: gapValue }"
    role="group"
    :aria-label="ariaLabel"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** badge 사이 간격 — number는 px, string은 그대로 (예: '8px', '0.5rem'). 기본 8 */
  gap?: number | string
  /** 배치 방향. 기본 'row' */
  direction?: 'row' | 'column'
  /** 한 줄을 넘으면 다음 줄로 wrap. 기본 true */
  wrap?: boolean
  /** 그룹 라벨 (스크린리더용). 예: '상태', '카테고리' */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  gap: 8,
  direction: 'row',
  wrap: true,
  ariaLabel: undefined,
})

const gapValue = computed(() =>
  typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
)
</script>

<style lang="scss" scoped>
.ui-badge-group {
  display: inline-flex;
  align-items: center;

  &.direction-row {
    flex-direction: row;
  }
  &.direction-column {
    flex-direction: column;
    align-items: flex-start;
  }

  &.is-wrap {
    flex-wrap: wrap;
  }
}
</style>
