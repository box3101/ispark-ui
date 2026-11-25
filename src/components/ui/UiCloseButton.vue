<script setup lang="ts">
import UiIcon from './UiIcon.vue'

/**
 * 공통 닫기(X) 아이콘 버튼 — 알럿·배너·패널 등 닫을 수 있는 영역의 오른쪽 위에 둔다.
 * - tone neutral(기본): 검회색 X. 어떤 배경색(경고 노랑·안내 파랑 등) 위에서도 튀지 않고 잘 보인다.
 * - tone inherit: 부모 글자색(currentColor)을 따른다. 오류 알럿의 빨간 X처럼 상태 색을 강조할 때.
 */
export type CloseButtonTone = 'neutral' | 'inherit'
export type CloseButtonSize = 'sm' | 'md'
const props = withDefaults(defineProps<{
  tone?: CloseButtonTone
  /** sm 24px(아이콘 16) · md 28px(아이콘 18) */
  size?: CloseButtonSize
  ariaLabel?: string
  disabled?: boolean
}>(), { tone: 'neutral', size: 'md', ariaLabel: '닫기', disabled: false })
const emit = defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <button
    type="button"
    class="ui-close-button"
    :class="[`tone-${tone}`, `size-${size}`]"
    :aria-label="ariaLabel"
    :disabled="disabled"
    @click="!props.disabled && emit('click', $event)"
  >
    <UiIcon name="x" :size="size === 'sm' ? 16 : 18" :stroke-width="2.5" />
  </button>
</template>

<style scoped lang="scss">
.ui-close-button {
  --close-size: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--close-size);
  height: var(--close-size);
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
  &.size-sm { --close-size: 24px; }
  &.tone-neutral { color: $color-text-dark; }
  &.tone-neutral:hover:not(:disabled) { color: #2f3747; }
  &.tone-inherit { color: inherit; }
  &:hover:not(:disabled) { background: rgba(15, 23, 42, 0.07); }
  &:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
}
</style>
