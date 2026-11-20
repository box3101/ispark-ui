<template>
  <div
    class="ui-loading"
    :class="{ 'is-overlay': overlay }"
    role="status"
    aria-live="polite"
    :aria-label="text ? undefined : '로딩 중'"
  >
    <!-- bars: 막대 12개가 시계 방향으로 진해졌다 옅어지는 스피너 -->
    <div
      v-if="variant === 'bars'"
      class="ui-loading-bars"
      :class="`size-${size}`"
      aria-hidden="true"
    >
      <i
        v-for="n in 12"
        :key="n"
        :style="{ '--ui-loading-bar': n - 1 }"
      />
    </div>
    <div
      v-else
      class="ui-loading-spinner"
      :class="`size-${size}`"
      aria-hidden="true"
    />
    <p
      v-if="text"
      class="ui-loading-text"
    >
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /** 로딩 텍스트. 빈 문자열이면 텍스트 미렌더 + aria-label='로딩 중'로 SR 안내 */
  text?: string
  /** 오버레이(dim) 모드 — viewport 전체 fixed + 반투명 dim */
  overlay?: boolean
  /** 스피너 모양 — ring: 원형 테두리(기본) / bars: 막대 12개 */
  variant?: 'ring' | 'bars'
  /** 스피너 크기 — md(기본) / lg. ring 32→48px, bars 48→72px */
  size?: 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  text: '불러오는 중...',
  overlay: false,
  variant: 'ring',
  size: 'md',
})
</script>

<style lang="scss" scoped>
.ui-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex: 1;
  min-height: 200px;
  width: 100%;

  // 오버레이 모드 — 전체 화면 dim
  &.is-overlay {
    position: fixed;
    inset: 0;
    min-height: 0;
    flex: none;
    z-index: $z-toast;
    background: rgba(0, 0, 0, 0.3);

    .ui-loading-spinner {
      width: 48px;
      height: 48px;
      border-width: 4px;
      border-color: rgba(255, 255, 255, 0.3);
      border-top-color: var(--color-primary);
    }

    .ui-loading-text {
      @include typo($body-medium-bold);
      color: #fff;
    }
  }
}

.ui-loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #ecf0f3;
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: ui-spin 0.8s linear infinite;

  &.size-lg {
    width: 48px;
    height: 48px;
    border-width: 4px;
  }
}

// bars — 가운데를 지름의 절반만큼 비워 막대끼리 멀리 떨어져 보이게 한다 (굵기 7.5%, 길이 25%)
.ui-loading-bars {
  --ui-loading-bars-size: 48px;

  position: relative;
  flex-shrink: 0;
  width: var(--ui-loading-bars-size);
  height: var(--ui-loading-bars-size);
  color: var(--color-primary);

  &.size-lg {
    --ui-loading-bars-size: 72px;
  }

  i {
    position: absolute;
    top: 0;
    left: calc(50% - var(--ui-loading-bars-size) * 0.0375);
    width: calc(var(--ui-loading-bars-size) * 0.075);
    height: 25%;
    border-radius: 999px;
    background: currentColor;
    transform-origin: 50% calc(var(--ui-loading-bars-size) / 2);
    transform: rotate(calc(var(--ui-loading-bar) * 30deg));
    opacity: 0.15;
    // 막대 번호만큼 늦게 시작 → 가장 진한 막대가 시계 방향으로 돈다
    animation: ui-loading-bar-fade 1s linear infinite;
    animation-delay: calc((var(--ui-loading-bar) - 12) * 1s / 12);
  }
}

.ui-loading-text {
  @include typo($body-small);
  color: $color-text-muted;
}

@keyframes ui-loading-bar-fade {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.15;
  }
}

@keyframes ui-spin {
  to {
    transform: rotate(360deg);
  }
}

// 사용자가 'reduce motion' 환경일 때 스피너 정지 — a11y
@media (prefers-reduced-motion: reduce) {
  .ui-loading-spinner {
    animation: none;
  }

  // bars는 멈춘 채 진하기 차이만 남긴다
  .ui-loading-bars i {
    animation: none;
    opacity: calc(0.15 + 0.85 * (var(--ui-loading-bar) + 1) / 12);
  }
}
</style>
