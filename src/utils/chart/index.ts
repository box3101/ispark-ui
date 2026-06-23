/**
 * 차트 모듈 통합 export + Chart.js 플러그인 등록
 *
 * 경량 버전: horizontalBar(가로 막대)는 사용처가 없어 제외했다.
 * 지원 타입 — bar / line / pie / mixed / radar
 */
import { Chart } from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// 플러그인 1회 등록
Chart.register(ChartDataLabels)

// datalabels 기본값: 표시 안 함 (각 차트에서 필요 시 활성화)
Chart.defaults.set('plugins.datalabels', { display: false })

export { ChartColors } from './chart-colors'
export { ChartConfig } from './chart-config'
export { BarChartModule } from './chart-bar'
export { LineChartModule } from './chart-line'
export { PieChartModule } from './chart-pie'
export { MixedChartModule } from './chart-mixed'
export { RadarChartModule } from './chart-radar'
