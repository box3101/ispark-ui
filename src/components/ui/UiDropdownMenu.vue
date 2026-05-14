<template>
  <DropdownMenuRoot v-model:open="openState">
    <DropdownMenuTrigger as-child>
      <span
        class="ui-dropdown-trigger-wrap"
        :style="hoverBridgeStyle"
        @mouseenter="onTriggerMouseEnter"
        @mouseleave="onTriggerMouseLeave"
      >
        <slot name="trigger" />
      </span>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        :class="[
          'ui-dropdown-content',
          { 'ui-dropdown-content--titled': Boolean(title), 'has-hover-bridge': openOnHover },
          contentClass || undefined,
        ]"
        :style="hoverBridgeContentVar"
        :side="side"
        :side-offset="sideOffset"
        :align="align"
        :collision-padding="collisionPadding"
        @mouseenter="onContentMouseEnter"
        @mouseleave="onContentMouseLeave"
      >
        <DropdownMenuLabel
          v-if="title"
          class="ui-dropdown-title"
        >
          {{ title }}
        </DropdownMenuLabel>
        <div class="ui-dropdown-content-list">
          <DropdownMenuItem
            v-for="item in items"
            :key="item.value"
            class="ui-dropdown-item"
            :class="{ 'is-danger': item.color === 'danger' }"
            :disabled="item.disabled"
            @select="onSelect(item)"
          >
            <i
              v-if="item.icon"
              :class="[item.icon, 'size-16']"
              aria-hidden="true"
            />
            <span class="ui-dropdown-item-label">{{ item.label }}</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'radix-vue'

export interface DropdownMenuItemDef {
  /** 메뉴 항목 레이블 */
  label: string
  /** ispark-ui 아이콘 클래스 (예: 'icon-edit'). 24·16 사이즈 클래스 자동(size-16) */
  icon?: string
  /** 고유 식별자 (필수) — @select 이벤트로 부모에 전달 */
  value: string
  /** 위험 액션 시맨틱 (삭제 등) — 빨강 텍스트 */
  color?: 'default' | 'danger'
  /** 항목 비활성 */
  disabled?: boolean
}

interface Props {
  items: DropdownMenuItemDef[]
  /** 상단 비클릭 라벨 (DropdownMenuLabel) — 구역 안내용 */
  title?: string
  /** 제어 모드: v-model:open */
  open?: boolean
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  /** 뷰포트 경계 최소 여백 (flip 기준) */
  collisionPadding?: number
  /** 트리거 hover 시 자동 오픈 */
  openOnHover?: boolean
  /** hover 해제 후 닫힘 지연 ms */
  hoverCloseDelay?: number
  /** 포털 콘텐츠에 추가 클래스 (글로벌 SCSS override 진입점) */
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  open: undefined,
  side: 'bottom',
  align: 'end',
  sideOffset: 5,
  collisionPadding: 8,
  openOnHover: false,
  hoverCloseDelay: 200,
  contentClass: '',
})

// openOnHover hover bridge — trigger와 메뉴 사이 sideOffset gap을 양쪽에서 흡수
// 1) trigger-wrap에 side 방향 padding → trigger 측 hover 영역 확장
// 2) content에 ::before invisible 영역 → portal(body 직속)인 메뉴 측 hover 영역 확장
//    두 영역이 겹쳐서 빈 공간 없이 hover 연속 보장.
const hoverBridgeStyle = computed<Record<string, string>>(() => {
  if (!props.openOnHover) return { display: 'inline-block' }
  const pad = `${props.sideOffset + 2}px`
  const sideMap: Record<NonNullable<Props['side']>, string> = {
    top: 'paddingTop',
    bottom: 'paddingBottom',
    left: 'paddingLeft',
    right: 'paddingRight',
  }
  return { display: 'inline-block', [sideMap[props.side]]: pad }
})

// content ::before 크기를 CSS 변수로 전달 — SCSS가 동적 sideOffset을 읽도록
const hoverBridgeContentVar = computed<Record<string, string>>(() => {
  if (!props.openOnHover) return {}
  return { '--ui-dropdown-bridge': `${props.sideOffset + 2}px` }
})

const emit = defineEmits<{
  select: [value: string]
  'update:open': [value: boolean]
}>()

const openState = ref(props.open ?? false)
let hoverCloseTimeoutId: ReturnType<typeof setTimeout> | null = null

const clearHoverCloseTimeout = () => {
  if (!hoverCloseTimeoutId) return
  clearTimeout(hoverCloseTimeoutId)
  hoverCloseTimeoutId = null
}

const scheduleHoverClose = () => {
  clearHoverCloseTimeout()
  hoverCloseTimeoutId = setTimeout(() => {
    openState.value = false
  }, props.hoverCloseDelay)
}

const onTriggerMouseEnter = () => {
  if (!props.openOnHover) return
  clearHoverCloseTimeout()
  openState.value = true
}

// 메뉴가 열린 후에는 trigger.mouseleave를 무시한다.
// 사유: 메뉴 열리면 radix가 portal 콘텐츠를 trigger 옆에 렌더하면서
// 마우스가 trigger 본체에서 패딩/메뉴로 이동하는 짧은 순간 잘못된 leave가
// 발생할 수 있음. 닫힘은 content.mouseleave에서만 트리거 (메뉴 위에 마우스
// 없으면 닫음). 메뉴가 아직 안 열렸을 때만 trigger leave가 의미 있음.
const onTriggerMouseLeave = () => {
  if (!props.openOnHover) return
  if (openState.value) return
  scheduleHoverClose()
}

const onContentMouseEnter = () => {
  if (!props.openOnHover) return
  clearHoverCloseTimeout()
}

const onContentMouseLeave = () => {
  if (!props.openOnHover) return
  scheduleHoverClose()
}

const onSelect = (item: DropdownMenuItemDef) => {
  if (item.disabled) return
  emit('select', item.value)
}

watch(
  () => props.open,
  (v) => {
    if (v !== undefined) openState.value = v
  },
  { immediate: true },
)
watch(openState, (v) => emit('update:open', v))
</script>

<!--
  radix Portal이 <body>에 렌더링되어 scoped 적용 불가.
  UiSelect/UiTooltip과 동일하게 전역 블록으로 정의.
-->
<style lang="scss">
.ui-dropdown-content {
  position: relative; // ::before 절대 배치 기준
  min-width: 140px;
  border-radius: $border-radius-base;
  background: #fff;
  border: 1px solid rgba(45, 49, 57, 0.2);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  z-index: $z-dropdown;

  // radix data-state 기반 진입/퇴장
  &[data-state='open'] {
    animation: ui-dropdown-in 0.15s ease;
  }
  &[data-state='closed'] {
    animation: ui-dropdown-out 0.1s ease forwards;
  }

  // ===== openOnHover hover bridge =====
  // radix portal이 body 직속이라 trigger-wrap padding과 별개로 끊기는
  // hover 영역을 ::before invisible 박스로 채워준다. data-side 기반으로
  // trigger 방향에 맞춰 박스 위치 결정. pointer-events auto가 핵심.
  &.has-hover-bridge {
    &::before {
      content: '';
      position: absolute;
      pointer-events: auto;
      background: transparent;
    }

    &[data-side='bottom']::before {
      top: calc(var(--ui-dropdown-bridge, 8px) * -1);
      left: 0;
      right: 0;
      height: var(--ui-dropdown-bridge, 8px);
    }
    &[data-side='top']::before {
      bottom: calc(var(--ui-dropdown-bridge, 8px) * -1);
      left: 0;
      right: 0;
      height: var(--ui-dropdown-bridge, 8px);
    }
    &[data-side='left']::before {
      right: calc(var(--ui-dropdown-bridge, 8px) * -1);
      top: 0;
      bottom: 0;
      width: var(--ui-dropdown-bridge, 8px);
    }
    &[data-side='right']::before {
      left: calc(var(--ui-dropdown-bridge, 8px) * -1);
      top: 0;
      bottom: 0;
      width: var(--ui-dropdown-bridge, 8px);
    }
  }
}

.ui-dropdown-title {
  padding: 8px 12px;
  font-size: $font-size-sm;
  font-weight: 600;
  line-height: 1.3;
  color: $color-text-primary;
  cursor: default;
  user-select: none;
  background: $color-background;
  border-bottom: 1px solid $color-border;
  border-radius: $border-radius-base $border-radius-base 0 0;
}

.ui-dropdown-content-list {
  padding: 4px;
}

.ui-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 10px;
  border-radius: $border-radius-sm;
  font-size: $font-size-sm;
  color: $color-text-primary;
  cursor: pointer;
  outline: none;
  transition: background 0.12s ease;
  user-select: none;

  &:hover:not([data-disabled]),
  &[data-highlighted]:not([data-disabled]) {
    background: $color-background;
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.is-danger {
    color: #b91c1c;

    &:hover:not([data-disabled]),
    &[data-highlighted]:not([data-disabled]) {
      background: rgba(239, 68, 68, 0.08);
    }
  }

  // 아이콘
  > i {
    flex-shrink: 0;
  }

  .ui-dropdown-item-label {
    flex: 1;
    @include ellipsis(1);
  }
}

@keyframes ui-dropdown-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ui-dropdown-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-dropdown-content {
    &[data-state='open'],
    &[data-state='closed'] {
      animation: none;
    }
  }
}
</style>
