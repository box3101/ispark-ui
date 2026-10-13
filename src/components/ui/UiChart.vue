<template>
  <div class="ui-chart" :class="[`is-legend-${legendPosition}`, { 'is-pie': type === 'pie' }]">
    <div
      v-if="showLegend"
      :id="legendId"
      class="ui-chart-legend"
    />
    <div class="ui-chart-canvas-wrap">
      <canvas :id="chartId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue'
import { useChart, type ChartType } from '../../composables/useChart'

interface Props {
  /** 차트 타입 — bar / line / pie / mixed / radar */
  type: ChartType
  /** 차트 설정 객체 (categories, data/datasets, colorKey, maxValue 등) */
  config: Record<string, any>
  /** 범례 표시 여부 */
  showLegend?: boolean
  /** 범례 위치 — 상단 / 하단 / 왼쪽 / 오른쪽 */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** 원형 차트 중앙 표시 — 없음 / 총합만 / 퍼센트만 / 총합과 퍼센트 */
  centerText?: 'none' | 'total' | 'percent' | 'total-percent'
  /** 원형 조각 내부 표시 — 숨김 / 수량 / 실제 비율 */
  dataLabelMode?: 'none' | 'value' | 'percent'
  /** 원형 범례 정보 — 이름만 / 수량만 / 비율만 / 수량과 비율 */
  legendValue?: 'none' | 'value' | 'percent' | 'value-percent'
}

const props = withDefaults(defineProps<Props>(), {
  showLegend: false,
  legendPosition: 'top',
  centerText: 'none',
})

const { chartId, legendId, createChart, destroyChart } = useChart()

/** 차트 렌더링 — 범례 DOM과 배치가 갱신된 후 생성 */
const renderChart = () => {
  destroyChart()
  nextTick(() => {
    createChart(props.type, {
      ...props.config,
      showLegend: props.showLegend,
      ...(props.type === 'pie' ? {
        centerText: props.centerText,
        dataLabelMode: props.dataLabelMode ?? props.config.dataLabelMode,
        legendValue: props.legendValue ?? props.config.legendValue,
      } : {}),
    })
  })
}

onMounted(() => {
  nextTick(() => {
    renderChart()
  })
})

// config는 참조 변경, 나머지 표시 옵션은 값 변경 시 재생성
watch(
  [
    () => props.config,
    () => props.type,
    () => props.showLegend,
    () => props.legendPosition,
    () => props.centerText,
    () => props.dataLabelMode,
    () => props.legendValue,
  ],
  renderChart,
)
</script>

<style lang="scss" scoped>
.ui-chart {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &.is-legend-bottom,
  &.is-legend-right {
    .ui-chart-legend {
      order: 2;
    }
  }

  &.is-legend-left,
  &.is-legend-right {
    flex-direction: row;

    .ui-chart-legend {
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: stretch;
      justify-content: flex-start;
      justify-content: safe center;
      max-width: 60%;
      max-height: 100%;
      overflow: auto;
    }

    .ui-chart-canvas-wrap {
      width: auto;
      flex-basis: 0;
    }

    :deep(.legend-item) {
      flex-shrink: 0;
    }

    :deep(.legend-item__text) {
      min-width: 0;
      white-space: normal;
      overflow-wrap: anywhere;
    }

    :deep(.legend-item__info) {
      margin-left: auto;
      padding-left: $spacing-sm;
    }
  }

  &.is-pie :deep(.legend-item__dot) {
    border-radius: 50%;
  }
}

.ui-chart-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  align-content: safe center;
  gap: 4px 8px;
  flex-shrink: 0;
  max-height: 50%;
  overflow: auto;

  :deep(.legend-item) {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    user-select: none;
    @include typo($body-medium);
    color: $color-text-secondary;

    &:hover {
      opacity: 0.8;
    }
  }

  :deep(.legend-item__dot) {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  :deep(.legend-item__text) {
    white-space: nowrap;
  }

  :deep(.legend-item__info) {
    @include typo($body-small);
    color: $color-text-disabled;
    margin-left: 2px;
    white-space: nowrap;
  }
}

.ui-chart-canvas-wrap {
  position: relative;
  width: 100%;
  flex: 1;
  min-width: 0;
  min-height: 0;
  order: 1;
}
</style>
