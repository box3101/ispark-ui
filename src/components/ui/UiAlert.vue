<script setup lang="ts">
import { computed, useSlots } from 'vue'
import UiIcon from './UiIcon.vue'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral'
const props = withDefaults(defineProps<{
  title?: string
  description?: string
  variant?: AlertVariant
  dismissible?: boolean
  /** 긴급 알림만 alert 사용. 기본은 일반 안내 status */
  role?: 'status' | 'alert'
  /**
   * 액션 버튼 위치
   * - end(기본): 오른쪽 끝, 첫 줄(제목 줄)과 가운데 맞춤
   * - bottom: 글자 아래, 글자 시작선에 맞춤 — 본문이 길거나 버튼이 여러 개일 때
   * 알럿 폭이 480px 이하로 좁으면 end 여도 자동으로 아래로 내려간다.
   */
  actionsPlacement?: 'end' | 'bottom'
  /** 화면 위에 떠 있는 알럿(상단 고정 배너 등)용 그림자 */
  elevated?: boolean
}>(), { variant: 'info', dismissible: false, role: 'status', actionsPlacement: 'end', elevated: false })
const visible = defineModel<boolean>({ default: true })
const emit = defineEmits<{ close: [] }>()
const slots = useSlots()
const icon = computed(() => ({ info: 'info', success: 'circle-check', warning: 'triangle-alert', error: 'circle-alert', neutral: 'info' })[props.variant])
const hasActions = computed(() => !!slots.actions)
function close() { visible.value = false; emit('close') }
</script>

<template>
  <div
    v-if="visible"
    class="ui-alert"
    :class="[`variant-${variant}`, `actions-${actionsPlacement}`, { 'has-actions': hasActions, 'is-dismissible': dismissible, 'is-elevated': elevated }]"
    :role="role"
    aria-atomic="true"
  >
    <div class="ui-alert-body">
      <span class="ui-alert-icon-box"><UiIcon :name="icon" :size="20" class="ui-alert-icon" /></span>
      <div class="ui-alert-content">
        <strong v-if="title" class="ui-alert-title">{{ title }}</strong>
        <div v-if="description || $slots.default" class="ui-alert-description"><slot>{{ description }}</slot></div>
      </div>
      <div v-if="hasActions" class="ui-alert-actions"><slot name="actions" /></div>
      <button v-if="dismissible" type="button" class="ui-alert-close" aria-label="안내 닫기" @click="close"><UiIcon name="x" :size="16" /></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
// ── 정렬 원칙: "첫 줄 기준"
// 아이콘·제목 줄·액션·닫기 버튼을 모두 같은 높이(--alert-line)의 첫 줄 안에서 가운데로 맞춘다.
// 한 줄 알럿은 전부 가운데 정렬로 보이고, 여러 줄 알럿은 첫 줄에 나란히 선 뒤 설명이 아래로 이어진다.
// (단순 중앙 정렬은 긴 문구에서 아이콘·버튼이 문단 가운데로 떠 버린다)
.ui-alert {
  --alert-color: #3e63dd;
  --alert-bg: #f3f7ff;
  --alert-border: #d5e1fa;
  --alert-text-line: 21px; // 14px × 1.5
  --alert-line: var(--alert-text-line);
  container-type: inline-size;
  box-sizing: border-box;
  width: 100%;
  padding: 13px 16px;
  border: 1px solid var(--alert-border);
  border-radius: 8px;
  background: var(--alert-bg);
  color: $color-text-primary;
  box-shadow: none;
  font-size: 14px;
  line-height: 1.5;
  &.variant-success { --alert-color: #15803d; --alert-bg: #f1faf4; --alert-border: #cce8d5; }
  &.variant-warning { --alert-color: #b77908; --alert-bg: #fffbef; --alert-border: #f0dfb7; }
  &.variant-error { --alert-color: #dc3545; --alert-bg: #fff4f5; --alert-border: #f4ccd1; }
  &.variant-neutral { --alert-color: #64748b; --alert-bg: #f5f7fa; --alert-border: #dce3ec; }

  // 닫기 버튼(28px)·액션 버튼이 있으면 첫 줄 높이를 그 버튼에 맞춘다
  &.is-dismissible { --alert-line: 28px; }
  &.has-actions.actions-end {
    --alert-line: 32px; // UiButton md
    padding-top: 10px;
    padding-bottom: 10px;
    &:has(.ui-alert-actions .size-xs) { --alert-line: 26px; }
    &:has(.ui-alert-actions .size-sm) { --alert-line: 30px; }
    &:has(.ui-alert-actions .size-lg) { --alert-line: 34px; }
    &:has(.ui-alert-actions .size-xlg) { --alert-line: 36px; }
  }

  &.is-elevated { box-shadow: 0 8px 28px rgba(36, 51, 76, 0.15); }
}

.ui-alert-body {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.ui-alert-icon-box {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: var(--alert-line);
}
.ui-alert-icon { color: var(--alert-color); }

.ui-alert-content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
  min-width: 0;
  // 첫 줄 글자를 --alert-line 높이의 가운데에 둔다
  padding-top: calc((var(--alert-line) - var(--alert-text-line)) / 2);
}
.ui-alert-title { color: var(--alert-color); font-weight: 600; overflow-wrap: anywhere; }
.ui-alert-description { min-width: 0; overflow-wrap: anywhere; }

.ui-alert-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  min-height: var(--alert-line);
  margin-left: 6px;
}
.ui-alert-close {
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0; width: 28px; height: 28px;
  margin: calc((var(--alert-line) - 28px) / 2) -6px 0 0;
  border: 0; border-radius: 4px; background: transparent; color: #64748b; cursor: pointer;
  &:hover { background: rgba(15, 23, 42, 0.05); }
  &:focus-visible { outline: 2px solid var(--alert-color); outline-offset: 2px; }
}

// 버튼을 글자 아래 줄로 — 아이콘 폭(20px)+간격(10px)만큼 들여 글자 시작선에 맞춘다.
// 닫기 버튼은 첫 줄 오른쪽에 남도록 순서를 앞으로 당긴다.
@mixin actions-below {
  flex-wrap: wrap;
  .ui-alert-close { order: 1; }
  .ui-alert-actions {
    order: 2;
    flex-basis: 100%;
    justify-content: flex-start;
    min-height: 0;
    margin: 0;
    padding-left: 30px;
  }
}
.ui-alert.actions-bottom .ui-alert-body { @include actions-below; }

// 알럿 자체가 좁으면(모달·사이드 패널·모바일) 버튼을 자동으로 아래로
@container (max-width: 480px) {
  .ui-alert-body { @include actions-below; }
  .ui-alert.has-actions .ui-alert-body { --alert-line: var(--alert-text-line); }
}
</style>
