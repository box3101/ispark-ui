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
  padding: 6px 10px;
  background: $color-text-dark;
  color: #fff;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
  line-height: 1.5;
  max-width: 240px;
  word-break: keep-all;
  z-index: $z-toast;
  box-shadow: $shadow-md;

  animation: ui-tooltip-fade-in 150ms ease-out;
}

.ui-tooltip-arrow {
  fill: $color-text-dark;
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
