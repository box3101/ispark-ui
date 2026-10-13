/**
 * 차트 모듈 통합 export + Chart.js 플러그인 등록
 *
 * 경량 버전: horizontalBar(가로 막대)는 사용처가 없어 제외했다.
 * 지원 타입 — bar / line / pie / mixed / radar
 */
import { Chart } from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

let pluginsRegistered = false

/** 소비 앱의 tree-shaking에서도 유지되도록 차트 생성 경로에서 등록한다. */
export function registerChartPlugins() {
  if (pluginsRegistered) return
  Chart.register(ChartDataLabels)
  // 각 차트가 필요 시 활성화하며 나머지는 기존 숨김 기본값을 유지한다.
  Chart.defaults.set('plugins.datalabels', { display: false })
  pluginsRegistered = true
}

export { ChartColors } from './chart-colors'
export { ChartConfig } from './chart-config'
export { BarChartModule } from './chart-bar'
export { LineChartModule } from './chart-line'
export { PieChartModule } from './chart-pie'
export { MixedChartModule } from './chart-mixed'
export { RadarChartModule } from './chart-radar'
