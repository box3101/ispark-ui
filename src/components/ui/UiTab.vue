<template>
  <div
    class="ui-tab"
    :class="[`variant-${variant}`, `size-${size}`, `align-${align}`]"
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
      <span
        v-if="variant === 'slide'"
        class="ui-tab-indicator"
        :class="{ 'is-ready': indicatorReady }"
        :style="indicatorStyle"
        aria-hidden="true"
      />
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
  /**
   * 모양
   * - line(기본): 탭마다 밑줄
   * - slide: 밑줄 하나가 선택 탭으로 미끄러지며 폭도 맞춰 바뀜
   * - pill: 떨어진 알약 버튼, 선택은 primary 채움
   * - segment: 둥근 회색 트랙 안에서 선택 칩만 진하게 채움
   * - toggle: 사각 트랙 안 같은 폭 버튼, 선택은 primary 채움
   * - card: 브라우저 탭처럼 위만 둥근 상자. 선택 탭은 흰색으로 아래 패널과 이어짐
   * - button: 배경 없는 글자 탭, 선택만 각진 둥근 사각형으로 primary 채움
   * - ghost: button 과 같은 모양, 선택은 옅은 primary 배경 + primary 글자
   */
  variant?: 'line' | 'slide' | 'pill' | 'segment' | 'toggle' | 'card' | 'button' | 'ghost'
  /** 탭 크기 — sm(약 33px·14px 글자) / md(약 38px·15px·기본) / lg(약 44px·16px) */
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
  variant: 'line',
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

// ===== slide 인디케이터 =====
// 밑줄을 탭마다 그리지 않고 하나만 두고 선택 탭의 위치·폭으로 옮긴다.
// 인디케이터는 스크롤 컨테이너(.ui-tab-inner) 안에 있어 가로 스크롤 시 탭과 함께 움직인다.
const indicatorStyle = ref<Record<string, string>>({ width: '0px', transform: 'translateX(0px)' })
const indicatorReady = ref(false)

const updateIndicator = async () => {
  if (props.variant !== 'slide') return
  await nextTick()
  const active = innerRef.value?.querySelector('.ui-tab-item.is-active') as HTMLElement | null
  if (!active) {
    indicatorStyle.value = { width: '0px', transform: 'translateX(0px)' }
    return
  }
  indicatorStyle.value = {
    width: `${active.offsetWidth}px`,
    transform: `translateX(${active.offsetLeft}px)`,
  }
  // 첫 배치는 애니메이션 없이 — 0 에서 미끄러져 들어오는 모습이 보이지 않게
  if (!indicatorReady.value) requestAnimationFrame(() => { indicatorReady.value = true })
}

const onResize = () => {
  syncEdges()
  updateIndicator()
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  const el = innerRef.value
  if (!el) return
  syncEdges()
  updateIndicator()
  // 웹폰트가 늦게 적용되면 탭 폭이 바뀌므로 한 번 더 맞춘다
  if (typeof document !== 'undefined' && document.fonts?.ready) document.fonts.ready.then(updateIndicator)
  el.addEventListener('scroll', syncEdges, { passive: true })
  window.addEventListener('pointerup', onWindowPointerUp)
  window.addEventListener('pointercancel', onWindowPointerUp)
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(onResize)
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

watch(() => props.modelValue, () => {
  revealActive()
  updateIndicator()
})
watch(() => props.tabs, () => nextTick(() => {
  syncEdges()
  updateIndicator()
}), { deep: true })
watch(() => [props.variant, props.size], updateIndicator)

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
  padding: 8px 16px;
  border: none;
  background: transparent;
  cursor: pointer;

  .ui-tab-inner.is-scrollable &:not(:disabled) {
    cursor: grab;
  }
  .ui-tab-inner.is-dragging &:not(:disabled) {
    cursor: grabbing;
  }
  white-space: nowrap;
  color: $color-text-muted;
  font-weight: $font-weight-medium;
  transition: color $transition-fast, background-color $transition-fast, box-shadow $transition-fast;

  // ===== size =====
  // 글자 크기: sm 14px / md 15px(기본) / lg 16px
  .ui-tab.size-sm & {
    padding: 6px 12px;
    @include typo($body-medium);
  }
  .ui-tab.size-md & {
    @include typo($body-medium);
    font-size: 15px;
  }
  .ui-tab.size-lg & {
    padding: 10px 20px;
    @include typo($body-large);
  }

  // 밑줄 하나로 hover(회색 프리뷰)와 선택(accent)을 함께 표현한다.
  // hover 가 선택 상태와 같은 자리에 한 단계 약하게 뜨므로 "누르면 이렇게 된다"가 예측된다.
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background: $color-placeholder;
    opacity: 0;
    transition: opacity $transition-fast;
  }

  // hover 는 포인터가 있는 기기에서만.
  // 없으면 모바일에서 탭한 뒤 hover 가 눌러붙어 선택도 아닌데 강조된 탭이 남는다.
  @media (hover: hover) {
    &:hover:not(:disabled):not(.is-disabled):not(.is-active) {
      color: $color-text-heading-sub;

      &::after {
        opacity: 1;
      }
    }
  }

  &.is-active {
    color: var(--color-primary);

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
  // 모든 탭을 같은 굵기(600)로 두고 선택은 색으로만 구분한다 — 선택이 바뀌어도 탭 폭이 흔들리지 않는다.
  // 사이즈 typo 믹스인이 부모 font-weight 를 덮으므로 라벨에 직접 지정
  font-weight: $font-weight-semibold;
}

.ui-tab-item-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  margin-left: -2px;
  padding: 0 6px;
  border-radius: 999px;
  // 선택 안 된 탭도 옅은 칩을 깔아 글자와 숫자가 한 묶음으로 보이게 한다 (선택 시 색만 바뀌어 폭도 그대로)
  background: #eef2f6;
  color: #8796a8;
  font-size: 11px;
  font-weight: $font-weight-bold;
  line-height: 1;
  transition: color $transition-fast, background-color $transition-fast;

  .is-active & {
    background: rgba(var(--color-primary-rgb, 60, 105, 219), 0.12);
    color: var(--color-primary);
  }
}

// ===== variant: pill — 떨어진 알약 버튼. 선택은 primary 채움, 나머지는 옅은 회색 =====
.ui-tab.variant-pill {
  border-bottom: 0;

  .ui-tab-inner {
    gap: 8px;
    padding: 2px 0;
  }
  .ui-tab-item {
    padding: 6px 16px;
    border-radius: 999px;
    background: $color-background;

    &::after {
      display: none;
    }
    @media (hover: hover) {
      &:hover:not(:disabled):not(.is-disabled):not(.is-active) {
        background: $color-border-light;
      }
    }
    &.is-active {
      background: var(--color-primary);
      color: #fff;
    }
  }
  &.size-sm .ui-tab-item {
    padding: 4px 16px;
  }
  &.size-lg .ui-tab-item {
    padding: 8px 20px;
  }
  .ui-tab-item-count {
    background: $color-bg-elevated;
  }
  .ui-tab-item.is-active .ui-tab-item-count {
    background: rgba(255, 255, 255, 0.22);
    color: #fff;
  }
}

// ===== variant: segment — 회색 트랙 하나 안에서 선택 칩만 진하게 채운다 =====
.ui-tab.variant-segment {
  display: flex;
  border-bottom: 0;

  &.align-left { justify-content: flex-start; }
  &.align-center { justify-content: center; }
  &.align-right { justify-content: flex-end; }

  .ui-tab-inner {
    width: max-content;
    max-width: 100%;
    gap: 2px;
    padding: 4px;
    border-radius: 999px;
    background: $color-background;
  }
  &.align-stretch .ui-tab-inner {
    width: 100%;
  }
  // 트랙이 내용 폭만큼만 잡히므로 align 은 바깥 정렬로 처리 — 아이템 auto 여백은 끈다
  &.align-center .ui-tab-item:first-child,
  &.align-center .ui-tab-item:last-child,
  &.align-right .ui-tab-item:first-child {
    margin-inline: 0;
  }
  .ui-tab-item {
    padding: 6px 18px;
    border-radius: 999px;

    &::after {
      display: none;
    }
    &.is-active {
      background: $color-text-heading;
      color: #fff;
      box-shadow: 0 1px 3px rgba(30, 33, 36, 0.18);
    }
  }
  &.size-sm .ui-tab-item {
    padding: 4px 14px;
  }
  &.size-lg .ui-tab-item {
    padding: 8px 22px;
  }
  .ui-tab-item-count {
    background: $color-bg-elevated;
  }
  .ui-tab-item.is-active .ui-tab-item-count {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
}

// ===== variant: slide — 밑줄 하나가 선택 탭으로 미끄러진다 =====
.ui-tab.variant-slide {
  border-bottom: 0;

  .ui-tab-inner {
    position: relative;
    // 기준선을 스크롤 컨테이너 안에 그려 인디케이터가 그 위에 정확히 겹치게 한다
    box-shadow: inset 0 -1px 0 $color-border;
  }
  .ui-tab-item::after {
    display: none;
  }
  .ui-tab-indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    background: var(--color-primary);
    pointer-events: none;

    &.is-ready {
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1), width 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
}

// ===== variant: toggle — 사각 트랙 안 같은 폭 버튼, 선택은 primary 채움 =====
.ui-tab.variant-toggle {
  display: flex;
  border-bottom: 0;

  &.align-left { justify-content: flex-start; }
  &.align-center { justify-content: center; }
  &.align-right { justify-content: flex-end; }

  .ui-tab-inner {
    // 같은 폭 버튼 — 가장 긴 라벨 기준으로 칸을 똑같이 나눈다
    display: inline-grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    width: max-content;
    max-width: 100%;
    gap: 4px;
    padding: 4px;
    border: 1px solid $color-border-light;
    border-radius: 10px;
    background: $color-background;
  }
  &.align-stretch .ui-tab-inner {
    width: 100%;
  }
  &.align-center .ui-tab-item:first-child,
  &.align-center .ui-tab-item:last-child,
  &.align-right .ui-tab-item:first-child {
    margin-inline: 0;
  }
  .ui-tab-item {
    justify-content: center;
    padding: 5px 22px;
    border-radius: 7px;

    &::after {
      display: none;
    }
    @media (hover: hover) {
      &:hover:not(:disabled):not(.is-disabled):not(.is-active) {
        background: rgba(255, 255, 255, 0.7);
      }
    }
    &.is-active {
      background: var(--color-primary);
      color: #fff;
      box-shadow: 0 1px 3px rgba(30, 33, 36, 0.16);
    }
  }
  &.size-sm .ui-tab-item {
    padding: 3px 16px;
  }
  &.size-lg .ui-tab-item {
    padding: 8px 28px;
  }
  .ui-tab-item-count {
    background: $color-bg-elevated;
  }
  .ui-tab-item.is-active .ui-tab-item-count {
    background: rgba(255, 255, 255, 0.22);
    color: #fff;
  }
}

// ===== variant: card — 브라우저 탭. 선택 탭은 흰 상자로 아래 패널과 이어진다 =====
//  아래에 붙는 패널은 사용하는 쪽에서 흰 배경으로 둔다 (탭 바로 밑, 위쪽 모서리만 각지게 하면 자연스럽다)
.ui-tab.variant-card {
  border-bottom: 0;

  .ui-tab-inner {
    align-items: flex-end;
    gap: 6px;
  }
  .ui-tab-item {
    padding: 7px 16px 6px;
    border-radius: 8px 8px 0 0;
    background: $color-border;

    &::after {
      display: none;
    }
    @media (hover: hover) {
      &:hover:not(:disabled):not(.is-disabled):not(.is-active) {
        background: #e6ecf0;
      }
    }
    &.is-active {
      background: $color-bg-elevated;
      color: $color-text-heading;
    }
  }
  &.size-sm .ui-tab-item {
    padding: 5px 12px 4px;
  }
  &.size-lg .ui-tab-item {
    padding: 10px 20px 9px;
  }
  .ui-tab-item-count {
    background: rgba(255, 255, 255, 0.6);
  }
  .ui-tab-item.is-active .ui-tab-item-count {
    background: $color-background;
    color: $color-text-secondary;
  }
}

// ===== variant: button / ghost — 트랙 없이 글자만, 선택 탭만 둥근 사각형 배경 =====
.ui-tab.variant-button,
.ui-tab.variant-ghost {
  border-bottom: 0;

  .ui-tab-inner {
    gap: 4px;
    padding: 2px 0;
  }
  .ui-tab-item {
    padding: 6px 16px;
    border-radius: 6px;

    &::after {
      display: none;
    }
    @media (hover: hover) {
      &:hover:not(:disabled):not(.is-disabled):not(.is-active) {
        background: $color-background;
      }
    }
  }
  &.size-sm .ui-tab-item {
    padding: 4px 12px;
  }
  &.size-lg .ui-tab-item {
    padding: 8px 20px;
  }
}
.ui-tab.variant-button {
  .ui-tab-item.is-active {
    background: var(--color-primary);
    color: #fff;
  }
  .ui-tab-item.is-active .ui-tab-item-count {
    background: rgba(255, 255, 255, 0.22);
    color: #fff;
  }
}
.ui-tab.variant-ghost {
  .ui-tab-item.is-active {
    background: rgba(var(--color-primary-rgb, 60, 105, 219), 0.1);
    color: var(--color-primary);
  }
  .ui-tab-item.is-active .ui-tab-item-count {
    background: $color-bg-elevated;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-tab-item,
  .ui-tab-item::after,
  .ui-tab-indicator.is-ready {
    transition: none;
  }
}
</style>
