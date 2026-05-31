<template>
  <Teleport to="body">
    <Transition name="ui-drawer-overlay">
      <div
        v-if="open && overlay"
        class="ui-drawer-overlay"
        @click="onOverlayClick"
      />
    </Transition>
    <Transition :name="`ui-drawer-slide-${position}`">
      <aside
        v-if="open"
        ref="drawerRef"
        class="ui-drawer"
        :class="[`position-${position}`]"
        :style="drawerStyle"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        @keydown.escape="onEscape"
        @keydown.tab="onTabKeyDown"
      >
        <!-- 리사이즈 핸들 -->
        <div
          v-if="resizable"
          class="ui-drawer-resize-handle"
          :class="{ 'is-dragging': isDragging }"
          @mousedown="onResizeStart"
        />

        <!-- 헤더 -->
        <header v-if="$slots.header || title" class="ui-drawer-header">
          <slot name="header">
            <h3 class="ui-drawer-title">{{ title }}</h3>
          </slot>
          <button
            class="ui-drawer-close"
            aria-label="닫기"
            @click="close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </header>

        <!-- 본문 (스크롤) -->
        <div class="ui-drawer-body">
          <slot />
        </div>

        <!-- 푸터 -->
        <footer v-if="$slots.footer" class="ui-drawer-footer">
          <slot name="footer" />
        </footer>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  open?: boolean
  title?: string
  width?: string
  minWidth?: string
  maxWidth?: string
  position?: 'right' | 'left'
  overlay?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  resizable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  title: '',
  width: '420px',
  minWidth: '320px',
  maxWidth: '100vw',
  position: 'right',
  overlay: true,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  resizable: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const drawerRef = ref<HTMLElement | null>(null)
const currentWidth = ref<number | null>(null)
const isDragging = ref(false)
const isMobile = ref(false)
/** 열기 전 포커스되어 있던 요소 — 닫힐 때 복원 */
let previousActiveElement: HTMLElement | null = null

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function checkMobile() {
  isMobile.value = window.innerWidth <= 640
}

const drawerStyle = computed(() => {
  // 모바일: 전체 너비
  if (isMobile.value) {
    return { width: '100%', maxWidth: '100vw' }
  }
  return {
    width: currentWidth.value ? `${currentWidth.value}px` : props.width,
    maxWidth: props.maxWidth ? `min(${props.maxWidth}, 100vw)` : '100vw',
  }
})

function close() {
  emit('update:open', false)
}

function onOverlayClick() {
  if (props.closeOnOverlayClick) close()
}

function onEscape() {
  if (props.closeOnEscape) close()
}

/** Tab 키 focus-trap — Drawer 안에서만 포커스 순환 */
function onTabKeyDown(e: KeyboardEvent) {
  if (!drawerRef.value) return
  const focusable = Array.from(
    drawerRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  )
  if (focusable.length === 0) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (e.shiftKey) {
    // Shift+Tab: 첫 번째에서 → 마지막으로
    if (document.activeElement === first || document.activeElement === drawerRef.value) {
      e.preventDefault()
      last.focus()
    }
  } else {
    // Tab: 마지막에서 → 첫 번째로
    if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

// 열릴 때 포커스 + body 스크롤 잠금
watch(() => props.open, (val) => {
  if (val) {
    // 열기 전 포커스 저장
    previousActiveElement = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      // 첫 포커스 가능 요소로 이동 (없으면 drawer 자체)
      const firstFocusable = drawerRef.value?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      if (firstFocusable) {
        firstFocusable.focus()
      } else {
        drawerRef.value?.focus()
      }
    })
  } else {
    document.body.style.overflow = ''
    currentWidth.value = null
    // 닫힐 때 이전 포커스 복원
    requestAnimationFrame(() => {
      previousActiveElement?.focus()
      previousActiveElement = null
    })
  }
})

// 리사이즈 핸들
function onResizeStart(e: MouseEvent) {
  e.preventDefault()
  isDragging.value = true
  const startX = e.clientX
  const startWidth = drawerRef.value?.offsetWidth || parseInt(props.width)

  function onMouseMove(ev: MouseEvent) {
    const diff = props.position === 'right'
      ? startX - ev.clientX
      : ev.clientX - startX
    const newWidth = startWidth + diff
    const min = parseInt(props.minWidth)
    const max = window.innerWidth * (parseInt(props.maxWidth) / 100 || 0.8)
    currentWidth.value = Math.max(min, Math.min(max, newWidth))
  }

  function onMouseUp() {
    isDragging.value = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

// 모바일 감지
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

// 컴포넌트 언마운트 시 body 스크롤 복원 + 리스너 제거
onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('resize', checkMobile)
})
</script>

<style lang="scss" scoped>
.ui-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: $z-overlay;
}

.ui-drawer {
  position: fixed;
  top: 0;
  height: 100vh;
  max-width: 100%;
  background: $color-bg-elevated;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  z-index: $z-modal;
  display: flex;
  flex-direction: column;
  outline: none;

  &.position-right { right: 0; }
  &.position-left { left: 0; }

  // 모바일: 전체 너비로 열기
  @media (max-width: 640px) {
    width: 100% !important;
    max-width: 100% !important;
  }
}

.ui-drawer-resize-handle {
  position: absolute;
  top: 0;
  width: 6px;
  height: 100%;
  cursor: col-resize;
  z-index: 1;
  transition: background 0.15s;

  .position-right & { left: -3px; }
  .position-left & { right: -3px; }

  &:hover, &.is-dragging {
    background: var(--color-primary, #4f6af6);
    opacity: 0.3;
  }
}

.ui-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid $color-border;
  flex-shrink: 0;
}

.ui-drawer-title {
  font-size: 16px;
  font-weight: 700;
  color: $color-text-heading;
  margin: 0;
}

.ui-drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  color: $color-text-muted;
  transition: background $transition-fast, color $transition-fast;

  &:hover {
    background: $color-border-light;
    color: $color-text-dark;
  }
}

.ui-drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

.ui-drawer-footer {
  flex-shrink: 0;
  padding: 16px 24px;
  border-top: 1px solid $color-border;
}

// 오버레이 애니메이션
.ui-drawer-overlay-enter-active,
.ui-drawer-overlay-leave-active {
  transition: opacity 0.25s ease;
}
.ui-drawer-overlay-enter-from,
.ui-drawer-overlay-leave-to {
  opacity: 0;
}

// 슬라이드 애니메이션 (right)
.ui-drawer-slide-right-enter-active,
.ui-drawer-slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.ui-drawer-slide-right-enter-from,
.ui-drawer-slide-right-leave-to {
  transform: translateX(100%);
}

// 슬라이드 애니메이션 (left)
.ui-drawer-slide-left-enter-active,
.ui-drawer-slide-left-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.ui-drawer-slide-left-enter-from,
.ui-drawer-slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
