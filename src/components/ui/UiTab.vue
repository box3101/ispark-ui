<template>
  <div
    class="ui-tab"
    :class="[`size-${size}`, `align-${align}`]"
  >
    <div
      class="ui-tab-inner"
      role="tablist"
      :aria-label="ariaLabel || undefined"
      @keydown="onKeydown"
    >
      <button
        v-for="(tab, idx) in tabs"
        :key="tab.value"
        :ref="(el) => setTabRef(el as HTMLButtonElement | null, idx)"
        type="button"
        role="tab"
        class="ui-tab-item"
        :class="{ 'is-active': modelValue === tab.value, 'is-disabled': tab.disabled }"
        :aria-selected="modelValue === tab.value"
        :aria-disabled="tab.disabled || undefined"
        :tabindex="modelValue === tab.value ? 0 : -1"
        :disabled="tab.disabled"
        @click="onSelect(tab)"
      >
        <i
          v-if="tab.icon"
          :class="[tab.icon, 'size-16']"
          aria-hidden="true"
        />
        <span class="ui-tab-item-label">{{ tab.label }}</span>
        <span
          v-if="tab.count != null"
          class="ui-tab-item-count"
          aria-hidden="true"
        >{{ tab.count }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

export interface TabItem {
  /** 탭 라벨 */
  label: string
  /** 고유 식별자 — v-model 값과 매칭 */
  value: string
  /** 아이콘 클래스명 (예: 'icon-edit') */
  icon?: string
  /** 우측 카운트 배지 (예: 미확인 개수) */
  count?: number | string
  /** 비활성 — 클릭/키보드 모두 차단 */
  disabled?: boolean
}

interface Props {
  modelValue: string
  tabs: TabItem[]
  /** 탭 크기 — sm(36px) / md(40px·기본) / lg(48px) */
  size?: 'sm' | 'md' | 'lg'
  /** 정렬 — left / center(기본 max-width 800px) / right / stretch(균등 분할) */
  align?: 'left' | 'center' | 'right' | 'stretch'
  /** role="tablist"의 aria-label */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  align: 'center',
  ariaLabel: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

// 각 탭 button DOM ref — 키보드 네비용
const tabRefs = ref<Array<HTMLButtonElement | null>>([])
const setTabRef = (el: HTMLButtonElement | null, idx: number) => {
  tabRefs.value[idx] = el
}

const onSelect = (tab: TabItem) => {
  if (tab.disabled) return
  if (tab.value === props.modelValue) return
  emit('update:modelValue', tab.value)
  emit('change', tab.value)
}

// 키보드 네비 (ArrowLeft/Right + Home/End)
//  - 비활성 탭은 자동 skip
const focusTabAt = (idx: number) => {
  const target = tabRefs.value[idx]
  if (target) target.focus()
}

const findNextEnabled = (from: number, direction: 1 | -1): number => {
  const len = props.tabs.length
  for (let i = 1; i <= len; i++) {
    const next = (from + direction * i + len) % len
    if (!props.tabs[next]?.disabled) return next
  }
  return from
}

const onKeydown = (e: KeyboardEvent) => {
  const currentIdx = props.tabs.findIndex((t) => t.value === props.modelValue)
  if (currentIdx < 0) return

  let nextIdx = currentIdx
  switch (e.key) {
    case 'ArrowRight':
      nextIdx = findNextEnabled(currentIdx, 1)
      break
    case 'ArrowLeft':
      nextIdx = findNextEnabled(currentIdx, -1)
      break
    case 'Home': {
      const first = props.tabs.findIndex((t) => !t.disabled)
      if (first >= 0) nextIdx = first
      break
    }
    case 'End': {
      for (let i = props.tabs.length - 1; i >= 0; i--) {
        if (!props.tabs[i].disabled) {
          nextIdx = i
          break
        }
      }
      break
    }
    default:
      return
  }

  if (nextIdx !== currentIdx) {
    e.preventDefault()
    const target = props.tabs[nextIdx]
    emit('update:modelValue', target.value)
    emit('change', target.value)
    nextTick(() => focusTabAt(nextIdx))
  }
}
</script>

<style lang="scss" scoped>
.ui-tab {
  width: 100%;
  border-bottom: 1px solid $color-border;
}

.ui-tab-inner {
  display: flex;
  align-items: center;

  // align variants — justify-content로 탭 자체를 정렬 (이전: max-width만 적용해 inner는 가운데지만 탭은 좌측에 붙음)
  .ui-tab.align-left & {
    justify-content: flex-start;
  }
  .ui-tab.align-center & {
    justify-content: center;
  }
  .ui-tab.align-right & {
    justify-content: flex-end;
  }
  .ui-tab.align-stretch & {
    .ui-tab-item {
      flex: 1;
      justify-content: center;
    }
  }
}

.ui-tab-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: $color-text-secondary;
  transition: color 0.15s ease;

  // ===== size =====
  .ui-tab.size-sm & {
    padding: 8px 12px;
    @include typo($body-medium);
  }
  .ui-tab.size-md & {
    @include typo($body-large);
  }
  .ui-tab.size-lg & {
    padding: 14px 18px;
    @include typo($body-xlarge);
  }

  &:hover:not(:disabled):not(.is-disabled) {
    color: $color-text-dark;
  }

  &.is-active {
    color: $color-text-dark;
    font-weight: $font-weight-bold;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--color-primary);
    }
  }

  &.is-disabled,
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
  }
}

.ui-tab-item-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: $color-background;
  color: $color-text-muted;
  font-size: $font-size-xs;
  font-weight: 600;

  .is-active & {
    background: rgba(var(--color-primary-rgb, 60, 105, 219), 0.12);
    color: var(--color-primary);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-tab-item {
    transition: none;
  }
}
</style>
