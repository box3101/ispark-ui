<template>
  <TooltipProvider :delay-duration="delayDuration">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          class="ui-tooltip-content"
          :class="contentClass"
          :style="fontSize ? { fontSize } : undefined"
          :side="side"
          :side-offset="sideOffset"
          :align="align"
        >
          <slot name="content">
            {{ content }}
          </slot>
          <TooltipArrow
            v-if="showArrow"
            class="ui-tooltip-arrow"
          />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'radix-vue'

interface Props {
  /** 툴팁 본문 텍스트. content 슬롯 지정 시 무시 */
  content?: string
  /** radix portal 콘텐츠 박스 추가 클래스 (페이지별 스타일 오버라이드) */
  contentClass?: string
  /** 본문 글자 크기 (예: '11px'). 비우면 SCSS 기본($font-size-xs) */
  fontSize?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  /** hover 후 표시 지연 (ms). 기본 200 */
  delayDuration?: number
  /** 화살표 표시 (기본 true) */
  showArrow?: boolean
}

withDefaults(defineProps<Props>(), {
  content: '',
  contentClass: '',
  fontSize: '',
  side: 'top',
  sideOffset: 6,
  align: 'center',
  delayDuration: 200,
  showArrow: true,
})
</script>

<style lang="scss">
// 글로벌: radix-vue Portal이 <body>에 렌더링되므로 scoped 적용 불가.
// UiSelect와 동일 패턴.
.ui-tooltip-content {
  // 배경을 변수 하나로 두면 화살표 fill 이 자동으로 따라온다.
  // 화살표는 TooltipContent 의 자식이라 커스텀 프로퍼티를 상속받는다.
  --ui-tooltip-bg: #{$color-bg-elevated};
  // 화살표 stroke — 본체 보더(0.5px)와 광학적으로 맞춘 값. 공용 토큰이 아니라 로컬 유지
  --ui-tooltip-arrow-stroke: #c4cfdb;
  // 라이트 툴팁은 페이지 배경과 명도가 가까워 $shadow-md(0.08)로는 떠 보이지 않는다
  --ui-tooltip-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

  padding: 8px 12px;
  background: var(--ui-tooltip-bg);
  color: $color-text-heading;
  border: 0.5px solid $color-border;
  border-radius: $border-radius-base;
  font-size: $font-size-sm;
  line-height: 1.5;
  max-width: 240px;
  word-break: keep-all;
  z-index: $z-toast;
  box-shadow: var(--ui-tooltip-shadow);

  animation: ui-tooltip-fade-in 150ms ease-out;
}

// ⚠️ 화살표에 transform 을 직접 주면 안 된다.
// radix 가 방향을 rotate(180deg)/rotate(±90deg) 로 잡는데 그게 덮여서 화살표가 뒤집힌다.
// 크기를 바꿔야 하면 TooltipArrow 의 width/height prop 을 쓴다.
.ui-tooltip-arrow {
  fill: var(--ui-tooltip-bg);
  // svg 기본 overflow:hidden 이라 stroke 바깥 절반이 잘려 사실상 안 보인다
  overflow: visible;
  stroke: var(--ui-tooltip-arrow-stroke);
  stroke-width: 1;
}

@keyframes ui-tooltip-fade-in {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-tooltip-content {
    animation: none;
  }
}
</style>
