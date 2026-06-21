<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Size } from '@/design-tokens'

export type AvatarShape = 'circle' | 'square'

/** DJB2 해시 기반 아바타 색상 팔레트 */
const AVATAR_PALETTE = [
  '#4f6af6', '#22c55e', '#f59e0b', '#ef4444',
  '#8b5cf6', '#ec4899', '#06b6d4', '#f97316',
]

interface Props {
  /** 이미지 URL */
  src?: string
  /** 접근성 라벨 */
  alt?: string
  /** 사용자 이름 (이니셜 추출 + 배경색 결정) */
  name?: string
  /** 크기: 디자인 토큰 또는 커스텀 px */
  size?: Size | number
  /** 형태 (기본: circle) */
  shape?: AvatarShape
  /** 배경색 수동 지정 (없으면 name 해시 기반) */
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  shape: 'circle',
})

// 이미지 로드 실패 감지
const imgFailed = ref(false)

watch(() => props.src, () => {
  imgFailed.value = false
})

function onImgError() {
  imgFailed.value = true
}

// 이미지 표시 여부
const showImage = computed(() => props.src && !imgFailed.value)

// 이니셜 추출: "John Doe" → "JD", "이찬용" → "이"
const initials = computed(() => {
  if (!props.name) return ''
  const parts = props.name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
})

// DJB2 해시 → 색상
function nameToColor(name: string): string {
  let hash = 5381
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) + hash) + name.charCodeAt(i)
  }
  return AVATAR_PALETTE[(hash >>> 0) % AVATAR_PALETTE.length]
}

const bgColor = computed(() => {
  if (props.color) return props.color
  if (props.name) return nameToColor(props.name)
  return '#94a3b8' // 기본 회색
})

// 사이즈 처리
const sizeClass = computed(() => {
  if (typeof props.size === 'number') return null
  return `size-${props.size}`
})

const customSizeStyle = computed(() => {
  if (typeof props.size !== 'number') return null
  const px = `${props.size}px`
  return { width: px, height: px, fontSize: `${Math.round(props.size * 0.4)}px` }
})

// 접근성 라벨
const ariaLabel = computed(() => props.alt || props.name || 'User avatar')
</script>

<template>
  <span
    class="ui-avatar"
    :class="[sizeClass, `shape-${shape}`]"
    :style="[
      !showImage ? { backgroundColor: bgColor } : null,
      customSizeStyle,
    ]"
    role="img"
    :aria-label="ariaLabel"
  >
    <img
      v-if="showImage"
      :src="src"
      :alt="ariaLabel"
      @error="onImgError"
    />
    <span v-else-if="initials" class="ui-avatar__initials">{{ initials }}</span>
    <svg
      v-else
      class="ui-avatar__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </span>
</template>

<style lang="scss" scoped>
.ui-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  color: #fff;
  font-weight: $font-weight-semibold;
  vertical-align: middle;

  // Shape
  &.shape-circle { border-radius: $border-radius-full; }
  &.shape-square { border-radius: $border-radius-base; }

  // Size 토큰
  &.size-xs { width: $size-xs-height; height: $size-xs-height; font-size: $size-xs-font; }
  &.size-sm { width: $size-sm-height; height: $size-sm-height; font-size: $size-sm-font; }
  &.size-md { width: $size-md-height; height: $size-md-height; font-size: $size-md-font; }
  &.size-lg { width: $size-lg-height; height: $size-lg-height; font-size: $size-lg-font; }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.ui-avatar__initials {
  line-height: 1;
  user-select: none;
}

.ui-avatar__icon {
  width: 60%;
  height: 60%;
}
</style>
