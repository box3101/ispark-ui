<template>
  <!--
    modal=false: 드롭다운은 모달 스크롤 잠금이 불필요.
    modal=true(기본값)면 body에 overflow:hidden + padding-right를 강제해 레이아웃 밀림 발생.
  -->
  <DropdownMenuRoot
    v-model:open="openState"
    :modal="false"
  >
    <!--
      as-child는 첫 자식을 Radix trigger로 사용한다.
      일반(click) 모드: trigger 그대로 slot 전달 → aria-haspopup/expanded/focus 정확.
      hover 모드: trigger 외부 wrap div에서 hover 추적. trigger 자체에 hover 두면 open 시
      radix가 trigger에 pointer-events:none을 강제로 적용 → mouseleave 발화 → close → 재오픈
      깜빡임 사이클 발생. wrap div는 radix가 건드리지 않아 안전.
    -->
    <div
      v-if="openOnHover"
      class="ui-dropdown-hover-wrap"
      :style="hoverBridgeStyle"
      @mouseenter="onTriggerMouseEnter"
      @mouseleave="onTriggerMouseLeave"
    >
      <DropdownMenuTrigger as-child>
        <slot name="trigger" />
      </DropdownMenuTrigger>
    </div>
    <DropdownMenuTrigger
      v-else
      as-child
    >
      <slot name="trigger" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        :class="[
          'ui-dropdown-content',
          { 'ui-dropdown-content--titled': Boolean(title) },
          contentClass || undefined,
        ]"
        :side="side"
        :side-offset="effectiveSideOffset"
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
  /** hover 해제 후 닫힘 지연 ms. 너무 짧으면 trigger→content 이동 중 깜빡임 발생. 기본 300 */
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
  hoverCloseDelay: 300,
  contentClass: '',
})

// openOnHover 모드에서는 trigger ↔ 메뉴 사이 sideOffset gap이 mouse가 어디
// element에 있는지 모호하게 만들어 깜박임을 유발한다. gap 자체를 제거 —
// 메뉴를 trigger에 딱 붙여 표시. hover 메뉴 패턴(네비게이션 등)에 일반적.
const effectiveSideOffset = computed(() =>
  props.openOnHover ? 0 : props.sideOffset,
)

// hover wrap div의 hover 영역 확장 — trigger와 content 사이 gap을 wrap padding으로 흡수
// (mouse가 빈 영역 거쳐 close 발화하는 것 방지)
const hoverBridgeStyle = computed<Record<string, string>>(() => {
  if (!props.openOnHover) return {}
  const pad = `${props.sideOffset + 4}px`
  const sideMap: Record<NonNullable<Props['side']>, string> = {
    top: 'paddingTop',
    bottom: 'paddingBottom',
    left: 'paddingLeft',
    right: 'paddingRight',
  }
  return { display: 'inline-block', [sideMap[props.side]]: pad }
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

// trigger 벗어나면 닫힘 schedule.
// content.mouseenter가 timeout을 cancel하므로 메뉴로 이동하면 유지됨.
// trigger ↔ content 사이 gap은 hover bridge(trigger-wrap padding +
// content ::before)와 충분한 hoverCloseDelay(200ms)가 흡수.
const onTriggerMouseLeave = () => {
  if (!props.openOnHover) return
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
  background: var(--color-bg-elevated);
  border: 1px solid rgba(45, 49, 57, 0.2);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  z-index: $z-dropdown;

  // openOnHover hover bridge — trigger와 content 사이 invisible overlay로 mouse leave 방지
  // (side별로 trigger 방향에 두께 14px의 hover-friendly zone)
  &[data-side='bottom']::before {
    content: '';
    position: absolute;
    inset: -14px 0 auto 0;
    height: 14px;
  }
  &[data-side='top']::before {
    content: '';
    position: absolute;
    inset: auto 0 -14px 0;
    height: 14px;
  }
  &[data-side='right']::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 -14px;
    width: 14px;
  }
  &[data-side='left']::before {
    content: '';
    position: absolute;
    inset: 0 -14px 0 auto;
    width: 14px;
  }

  // radix data-state 기반 진입/퇴장
  &[data-state='open'] {
    animation: ui-dropdown-in 0.15s ease;
  }
  &[data-state='closed'] {
    animation: ui-dropdown-out 0.1s ease forwards;
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
