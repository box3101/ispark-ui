<template>
  <span
    class="ui-badge"
    :class="[
      `variant-${variant}`,
      `size-${size}`,
      { 'is-icon-only': iconOnly },
    ]"
    :style="badgeStyle"
  >
    <!-- 왼쪽 아이콘 -->
    <span
      v-if="$slots['icon-left']"
      class="ui-badge-icon"
      aria-hidden="true"
    >
      <slot name="icon-left" />
    </span>
    <!-- 텍스트 -->
    <span
      v-if="$slots.default && !iconOnly"
      class="ui-badge-text"
    >
      <slot />
    </span>
    <!-- 오른쪽 아이콘 -->
    <span
      v-if="$slots['icon-right']"
      class="ui-badge-icon"
      aria-hidden="true"
    >
      <slot name="icon-right" />
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

interface Props {
  /** 시맨틱 variant — 도메인 특화 색은 colorHex 사용 */
  variant?: BadgeVariant
  size?: BadgeSize
  /** 아이콘 only (정사각형, 텍스트 미렌더) */
  iconOnly?: boolean
  /** 지정 시 variant 색상 대신 이 컬러 기반(text + bg tinted)으로 표시. 6자리/3자리 hex 지원 */
  colorHex?: string
  /** 배경 투명도 (0~1). 기본 0.12 */
  bgAlpha?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
  iconOnly: false,
  colorHex: '',
  bgAlpha: 0.12,
})

const normalizeHex = (input: string): string => {
  const v = (input ?? '').trim()
  if (!v) return ''
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v
  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    const r = v[1]
    const g = v[2]
    const b = v[3]
    return `#${r}${r}${g}${g}${b}${b}`
  }
  return ''
}

const hexToRgba = (hex: string, alpha: number) => {
  const h = normalizeHex(hex)
  if (!h) return ''
  const r = Number.parseInt(h.slice(1, 3), 16)
  const g = Number.parseInt(h.slice(3, 5), 16)
  const b = Number.parseInt(h.slice(5, 7), 16)
  const a = Number.isFinite(alpha) ? Math.min(Math.max(alpha, 0), 1) : 0.12
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const badgeStyle = computed((): Record<string, string> => {
  const hex = normalizeHex(props.colorHex || '')
  if (!hex) return {}
  const bg = hexToRgba(hex, props.bgAlpha)
  return {
    color: hex,
    backgroundColor: bg || '',
  }
})
</script>

<style lang="scss" scoped>
.ui-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 24px;
  font-size: $font-size-sm;
  white-space: nowrap;
  font-weight: 600;

  // ===== Size =====
  &.size-xs {
    height: 20px;
    padding: 0 6px;
    font-size: $font-size-xs;
  }

  &.size-sm {
    height: 22px;
    padding: 0 8px;
    font-size: $font-size-sm;
  }

  &.size-md {
    height: 24px;
    padding: 0 10px;
    font-size: $font-size-sm;
  }

  &.size-lg {
    height: 26px;
    padding: 0 12px;
    font-size: $font-size-base;
  }

  // ===== Icon-only (정사각형) =====
  &.is-icon-only {
    justify-content: center;
    padding: 0;

    &.size-xs { width: 20px; }
    &.size-sm { width: 22px; }
    &.size-md { width: 24px; }
    &.size-lg { width: 26px; }
  }

  // ===== Variant — 시맨틱 5종 (light tint 패턴) =====
  &.variant-default {
    background: #f4f7f9;
    color: #5c6677;
  }

  &.variant-primary {
    background: rgba(var(--color-primary-rgb, 60, 105, 219), 0.12);
    color: var(--color-primary, #3c69db);
  }

  &.variant-success {
    background: rgba(34, 197, 94, 0.12);
    color: #15803d;
  }

  &.variant-warning {
    background: rgba(245, 158, 11, 0.14);
    color: #b45309;
  }

  &.variant-danger {
    background: rgba(239, 68, 68, 0.12);
    color: #b91c1c;
  }

  &.variant-info {
    background: rgba(143, 79, 223, 0.12);
    color: #6d28d9;
  }
}

.ui-badge-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.ui-badge-text {
  display: inline-flex;
  align-items: center;
}
</style>
