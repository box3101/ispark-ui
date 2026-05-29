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
        @keydown.escape="onEscape"
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
  maxWidth: '80vw',
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

const drawerStyle = computed(() => ({
  width: currentWidth.value ? `${currentWidth.value}px` : props.width,
  maxWidth: props.maxWidth ? `min(${props.maxWidth}, 100vw)` : '100vw',
}))

function close() {
  emit('update:open', false)
}

function onOverlayClick() {
  if (props.closeOnOverlayClick) close()
}

function onEscape() {
  if (props.closeOnEscape) close()
}

// 열릴 때 포커스 + body 스크롤 잠금
watch(() => props.open, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      drawerRef.value?.focus()
    })
  } else {
    document.body.style.overflow = ''
    currentWidth.value = null
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

// 컴포넌트 언마운트 시 body 스크롤 복원
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>
.ui-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.ui-drawer {
  position: fixed;
  top: 0;
  height: 100vh;
  max-width: 100%;
  background: #fff;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  outline: none;

  &.position-right { right: 0; }
  &.position-left { left: 0; }
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
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.ui-drawer-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
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
  color: #9ca3af;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #f3f4f6;
    color: #374151;
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
  border-top: 1px solid #e5e7eb;
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
