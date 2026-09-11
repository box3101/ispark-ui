<template>
  <div
    class="ui-tab"
    :class="[`size-${size}`, `align-${align}`]"
  >
    <div
      ref="innerRef"
      class="ui-tab-inner"
      :class="{
        'is-content-constrained': !!contentMaxWidth,
        'is-scrollable': isScrollable,
        'is-dragging': isDragging,
        'can-prev': canPrev,
        'can-next': canNext,
      }"
      :style="contentMaxWidth ? {
        '--ui-tab-content-max-width': contentMaxWidth,
        '--ui-tab-content-padding-x': contentPaddingX,
      } : undefined"
      role="tablist"
      :aria-label="ariaLabel || undefined"
      @keydown="onKeydown"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @click.capture="onClickCapture"
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
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

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
  /** 정렬 — left / center / right / stretch(균등 분할) */
  align?: 'left' | 'center' | 'right' | 'stretch'
  /** .ui-tab-inner max-width. 빈 값이면 full-width */
  contentMaxWidth?: string
  /** contentMaxWidth 사용 시 .ui-tab-inner 좌우 padding */
  contentPaddingX?: string
  /** role="tablist"의 aria-label */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  align: 'center',
  contentMaxWidth: '',
  contentPaddingX: '16px',
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

// ===== 가로 스크롤 =====
// 폭이 모자라면 줄바꿈 대신 옆으로 스크롤한다. 뷰포트가 아니라 "컨테이너" 기준이라
// 미디어쿼리를 쓰지 않는다 — 모달·드로어 안에서도 동일하게 동작해야 하기 때문.
const innerRef = ref<HTMLElement | null>(null)
const isScrollable = ref(false)
const canPrev = ref(false)
const canNext = ref(false)

const syncEdges = () => {
  const el = innerRef.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  isScrollable.value = max > 1
  canPrev.value = el.scrollLeft > 1
  canNext.value = el.scrollLeft < max - 1
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 선택된 탭을 항상 보이는 위치로 — 키보드 ←/→ 로 화면 밖 탭에 가도 따라간다
const revealActive = async () => {
  await nextTick()
  if (!isScrollable.value) return
  const active = innerRef.value?.querySelector('.ui-tab-item.is-active') as HTMLElement | null
  active?.scrollIntoView({
    inline: 'center',
    block: 'nearest',
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

// ===== 드래그 스크롤 =====
// overflow-x 는 마우스로 잡아끄는 조작을 지원하지 않으므로 pointer 이벤트로 직접 만든다.
const DRAG_THRESHOLD = 5
const isDragging = ref(false)
let dragStartX = 0
let dragStartScrollLeft = 0
let dragMoved = 0
let suppressClick = false

const onPointerDown = (e: PointerEvent) => {
  const el = innerRef.value
  if (!el || !isScrollable.value || e.button !== 0) return
  suppressClick = false
  isDragging.value = true
  dragMoved = 0
  dragStartX = e.clientX
  dragStartScrollLeft = el.scrollLeft
  // 여기서 setPointerCapture 를 걸면 click 이 버튼 대신 캡처 대상으로 가서
  // 탭 선택이 통째로 죽는다. 임계값을 넘겨 '드래그'로 확정된 뒤에만 캡처한다.
}

const onPointerMove = (e: PointerEvent) => {
  const el = innerRef.value
  if (!isDragging.value || !el) return
  const delta = e.clientX - dragStartX
  dragMoved = Math.max(dragMoved, Math.abs(delta))
  if (dragMoved <= DRAG_THRESHOLD) return
  if (!el.hasPointerCapture(e.pointerId)) el.setPointerCapture(e.pointerId)
  el.scrollLeft = dragStartScrollLeft - delta
}

const onPointerUp = (e: PointerEvent) => {
  const el = innerRef.value
  if (!isDragging.value) return
  isDragging.value = false
  if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
  // 끌었으면 뒤따르는 click(탭 선택)을 막고, 제자리 클릭이면 그대로 통과시킨다
  suppressClick = dragMoved > DRAG_THRESHOLD
}

// 임계값을 넘기기 전에는 포인터 캡처가 없어서 요소 밖에서 손을 떼면 pointerup 을 놓친다.
// 그대로 두면 is-dragging 이 영구히 남아 커서가 grabbing 에 고정되므로 window 에서 한 번 더 받는다.
const onWindowPointerUp = (e: PointerEvent) => {
  if (isDragging.value) onPointerUp(e)
}

const onClickCapture = (e: MouseEvent) => {
  if (!suppressClick) return
  suppressClick = false
  e.preventDefault()
  e.stopPropagation()
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  const el = innerRef.value
  if (!el) return
  syncEdges()
  el.addEventListener('scroll', syncEdges, { passive: true })
  window.addEventListener('pointerup', onWindowPointerUp)
  window.addEventListener('pointercancel', onWindowPointerUp)
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(syncEdges)
    resizeObserver.observe(el)
  }
})

onBeforeUnmount(() => {
  innerRef.value?.removeEventListener('scroll', syncEdges)
  window.removeEventListener('pointerup', onWindowPointerUp)
  window.removeEventListener('pointercancel', onWindowPointerUp)
  resizeObserver?.disconnect()
  resizeObserver = null
})

watch(() => props.modelValue, revealActive)
watch(() => props.tabs, () => nextTick(syncEdges), { deep: true })

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
  flex-wrap: nowrap;
  align-items: center;
  // 폭이 모자라면 줄바꿈 대신 가로 스크롤. 스크롤바는 숨기고 페이드로 대체한다
  overflow-x: auto;
  @include hide-scrollbar;

  // 페이드 마스크 — 배경색과 무관하게 동작하도록 mask 사용 (그라데이션 오버레이 X)
  --ui-tab-fade: 32px;

  &.can-prev.can-next {
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 var(--ui-tab-fade),
      #000 calc(100% - var(--ui-tab-fade)),
      transparent 100%
    );
  }
  &.can-prev:not(.can-next) {
    mask-image: linear-gradient(to right, transparent 0, #000 var(--ui-tab-fade));
  }
  &.can-next:not(.can-prev) {
    mask-image: linear-gradient(to left, transparent 0, #000 var(--ui-tab-fade));
  }

  // 넘칠 때만 잡아끌 수 있다는 신호를 준다
  &.is-scrollable {
    cursor: grab;
  }
  &.is-dragging {
    cursor: grabbing;
    user-select: none;
  }

  &.is-content-constrained {
    max-width: var(--ui-tab-content-max-width);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--ui-tab-content-padding-x, 16px);
    padding-right: var(--ui-tab-content-padding-x, 16px);
  }

  // align variants
  //  justify-content: center/right 는 넘쳤을 때 앞쪽으로 삐져나간 탭을 scrollLeft 로
  //  되돌릴 수 없어 첫 탭이 영구히 잘린다. auto 여백은 남는 공간이 있을 때만 먹으므로
  //  넘치는 순간 자동으로 flex-start 와 같아진다.
  .ui-tab.align-center & {
    .ui-tab-item:first-child {
      margin-inline-start: auto;
    }
    .ui-tab-item:last-child {
      margin-inline-end: auto;
    }
  }
  .ui-tab.align-right & {
    .ui-tab-item:first-child {
      margin-inline-start: auto;
    }
  }
  // 균등 분할은 넘칠 일이 없다 — 스크롤 대신 라벨 말줄임으로 처리
  .ui-tab.align-stretch & {
    overflow-x: hidden;
    cursor: default;

    .ui-tab-item {
      flex: 1 1 0;
      min-width: 0;
      justify-content: center;
    }
    .ui-tab-item-label {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.ui-tab-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 10px 16px;
  border: none;
  background: transparent;
  cursor: pointer;

  .ui-tab-inner.is-dragging & {
    cursor: grabbing;
  }
  white-space: nowrap;
  color: $color-text-secondary;
  transition: color $transition-fast;

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

  // 밑줄 하나로 hover(회색 프리뷰)와 선택(accent)을 함께 표현한다.
  // hover 가 선택 상태와 같은 자리에 한 단계 약하게 뜨므로 "누르면 이렇게 된다"가 예측된다.
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: $color-placeholder;
    opacity: 0;
    transition: opacity $transition-fast;
  }

  // hover 는 포인터가 있는 기기에서만.
  // 없으면 모바일에서 탭한 뒤 hover 가 눌러붙어 선택도 아닌데 강조된 탭이 남는다.
  @media (hover: hover) {
    &:hover:not(:disabled):not(.is-disabled):not(.is-active) {
      color: $color-text-dark;

      &::after {
        opacity: 1;
      }
    }
  }

  &.is-active {
    color: $color-text-dark;
    font-weight: $font-weight-bold;

    &::after {
      background: var(--color-primary);
      opacity: 1;
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

.ui-tab-item-label {
  // 활성 탭 라벨 볼드 — 사이즈 typo 믹스인이 부모 font-weight를 덮으므로 라벨에 직접 지정
  .is-active & {
    font-weight: $font-weight-bold;
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
  .ui-tab-item,
  .ui-tab-item::after {
    transition: none;
  }
}
</style>
