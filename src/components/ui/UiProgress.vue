<template>
  <div :class="['ui-progress', `size-${size}`, `variant-${variant}`]">
    <!-- 헤더: 라벨(좌) + 퍼센트(우). 라벨 없이 show-value만이면 퍼센트를 크게 단독 표시 -->
    <div
      v-if="hasLabel || showValue"
      :class="['ui-progress__header', { 'is-value-only': !hasLabel && showValue }]"
    >
      <span
        v-if="hasLabel"
        class="ui-progress__label"
      >
        <slot name="label">{{ label }}</slot>
      </span>
      <span
        v-if="showValue"
        class="ui-progress__value"
      >{{ percent }}%</span>
    </div>

    <!-- 바: track + fill -->
    <div
      class="ui-progress__track"
      role="progressbar"
      :aria-valuenow="clampedValue"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-label="label || undefined"
    >
      <div
        class="ui-progress__fill"
        :style="{ width: `${percent}%` }"
      />
    </div>

    <!-- 하단 caption (default 슬롯) -->
    <div
      v-if="$slots.default"
      class="ui-progress__caption"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger'
export type ProgressSize = 'sm' | 'md' | 'lg'

interface Props {
  /** 현재 값 */
  value: number
  /** 최대값 (기본 100) */
  max?: number
  /** 상단 라벨 텍스트 (#label 슬롯으로도 가능) */
  label?: string
  /** 퍼센트 텍스트 표시 */
  showValue?: boolean
  /** 색상 변형 */
  variant?: ProgressVariant
  /** 바 두께 — sm 6 / md 8 / lg 12px */
  size?: ProgressSize
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  label: '',
  showValue: false,
  variant: 'primary',
  size: 'md',
})

const slots = useSlots()
const hasLabel = computed(() => !!props.label || !!slots.label)

// 값 클램프 (0 ~ max) + 퍼센트 계산
const clampedValue = computed(() => Math.min(Math.max(props.value, 0), props.max))
const percent = computed(() => {
  if (props.max <= 0) return 0
  return Math.round((clampedValue.value / props.max) * 100)
})
</script>

<style lang="scss" scoped>
.ui-progress {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;

  // ===== 헤더 (라벨 + 퍼센트) =====
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-sm;

    // 라벨 없이 퍼센트만 → 크게 단독 표시 (이미지 레이아웃)
    &.is-value-only {
      justify-content: flex-start;

      .ui-progress__value {
        @include typo($body-2xlarge-bold);
      }
    }
  }

  &__label {
    @include typo($body-small, $color-text-secondary);
  }

  &__value {
    @include typo($body-small-bold);
    color: var(--color-progress);
  }

  // ===== 바 =====
  &__track {
    width: 100%;
    background-color: $color-border-light;
    border-radius: $border-radius-100;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background-color: var(--color-progress);
    border-radius: $border-radius-100;
    transition: width $transition-base;
  }

  // ===== 하단 caption =====
  &__caption {
    @include typo($body-small, $color-text-muted);
  }

  // ===== 사이즈 (바 두께) =====
  &.size-sm .ui-progress__track { height: 6px; }
  &.size-md .ui-progress__track { height: 8px; }
  &.size-lg .ui-progress__track { height: 12px; }

  // ===== variant (fill·퍼센트 색) — 로컬 변수로 통일 =====
  &.variant-primary { --color-progress: var(--color-primary); }
  &.variant-success { --color-progress: var(--color-success); }
  &.variant-warning { --color-progress: var(--color-warning); }
  &.variant-danger { --color-progress: var(--color-danger); }
}
</style>
