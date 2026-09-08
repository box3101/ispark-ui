<template>
  <TooltipProvider :delay-duration="delayDuration">
    <TooltipRoot :default-open="defaultOpen">
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
            :width="arrowWidth"
            :height="arrowHeight"
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
  /** 화살표 너비 (기본 14). CSS transform 으로 키우면 radix 의 방향 회전이 덮여 뒤집힌다 */
  arrowWidth?: number
  /** 화살표 높이 (기본 7) */
  arrowHeight?: number
  /** 처음부터 열린 상태로 — 문서/시각 회귀 테스트용 */
  defaultOpen?: boolean
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
  arrowWidth: 14,
  arrowHeight: 7,
  defaultOpen: false,
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
  // radix 화살표는 points="0,0 30,0 15,10" 폴리곤(viewBox 0 0 30 10)이다.
  // 첫 변 (0,0)→(30,0) 이 툴팁과 맞닿는 밑변. 여기엔 선이 그려지면 안 되므로
  // dasharray 로 밑변 30 만큼 건너뛰고 두 빗변(각 √(15²+10²)≈18.03)만 그린다.
  stroke-dasharray: 0 30 36.06;
}

// 밑변에 보이는 선의 정체는 화살표 stroke 가 아니라 "툴팁 본체의 보더" 다.
// 화살표는 툴팁 바깥에 붙는데 그 자리에도 보더가 그대로 지나가기 때문.
// 폴리곤을 툴팁 쪽으로 밀어 넣어 흰 채움으로 그 보더 구간을 덮는다.
// transform 을 svg 가 아니라 폴리곤에 주는 이유: svg 의 transform 은 radix 가
// 방향 회전에 쓰고 있고, 폴리곤 transform 은 이미 회전된 좌표계 안에서 적용되므로
// 4방향 모두에서 "툴팁 쪽"으로 정확히 움직인다.
.ui-tooltip-arrow polygon {
  transform: translateY(-1.5px); // user unit 기준 (viewBox 10 → 7px 이므로 약 1px)
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
