import { render } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import UiChart from './UiChart.vue'

// ⚠️ chart.js는 jsdom canvas에서 의미있게 렌더/검증할 수 없다(픽셀 미지원).
//    따라서 useChart를 스텁해 "컴포넌트 책임" — prop→DOM 구조 + createChart 위임 — 만 검증한다.
//    실제 차트 시각은 Storybook play(브라우저)에서 확인한다.
const createChart = vi.fn()
const destroyChart = vi.fn()

vi.mock('../../composables/useChart', () => ({
  useChart: () => ({
    chartId: 'chart-test-id',
    legendId: 'legend-chart-test-id',
    createChart,
    destroyChart,
    updateChart: vi.fn(),
  }),
}))

describe('UiChart', () => {
  beforeEach(() => {
    createChart.mockClear()
    destroyChart.mockClear()
  })

  const barConfig = { categories: ['1월', '2월'], data: [1, 2], colorKey: 'bar.set1' }

  // 1. canvas 렌더 — chartId가 canvas id에 바인딩
  it('canvas 엘리먼트를 chartId로 렌더한다', () => {
    const { container } = render(UiChart, { props: { type: 'bar', config: barConfig } })
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeTruthy()
    expect(canvas!.id).toBe('chart-test-id')
  })

  // 2. showLegend=false(기본) → 범례 컨테이너 미렌더
  it('showLegend 기본값(false): 범례 컨테이너를 렌더하지 않는다', () => {
    const { container } = render(UiChart, { props: { type: 'bar', config: barConfig } })
    expect(container.querySelector('.ui-chart-legend')).toBeNull()
  })

  // 3. showLegend=true → 범례 컨테이너 렌더 + legendId 바인딩
  it('showLegend=true: 범례 컨테이너를 legendId로 렌더한다', () => {
    const { container } = render(UiChart, {
      props: { type: 'bar', config: barConfig, showLegend: true },
    })
    const legend = container.querySelector('.ui-chart-legend')
    expect(legend).toBeTruthy()
    expect(legend!.id).toBe('legend-chart-test-id')
  })

  // 4. 마운트 시 createChart가 type + (config + showLegend)로 호출된다
  it('마운트 시 createChart를 type·config로 위임 호출한다', async () => {
    render(UiChart, { props: { type: 'radar', config: { categories: ['a'], data: [1] }, showLegend: true } })
    await nextTick()
    await nextTick()
    expect(createChart).toHaveBeenCalled()
    const [type, config] = createChart.mock.calls[0]
    expect(type).toBe('radar')
    expect(config).toMatchObject({ categories: ['a'], data: [1], showLegend: true })
  })

  // 5. config 참조 변경 시 차트 재생성(destroy 후 createChart 재호출)
  it('config 참조가 바뀌면 차트를 재생성한다', async () => {
    const { rerender } = render(UiChart, { props: { type: 'bar', config: barConfig } })
    await nextTick()
    await nextTick()
    const callsAfterMount = createChart.mock.calls.length
    await rerender({ type: 'bar', config: { ...barConfig, data: [3, 4] } })
    await nextTick()
    await nextTick()
    expect(createChart.mock.calls.length).toBeGreaterThan(callsAfterMount)
  })

  it.each(['top', 'bottom', 'left', 'right'] as const)('범례 위치 %s를 레이아웃에 반영한다', (legendPosition) => {
    const { container } = render(UiChart, {
      props: { type: 'pie', config: { items: [{ name: '완료', value: 42 }] }, showLegend: true, legendPosition },
    })
    expect(container.querySelector('.ui-chart')?.classList.contains(`is-legend-${legendPosition}`)).toBe(true)
  })

  it.each(['none', 'total', 'percent', 'total-percent'] as const)('원형 중앙 표시 %s를 차트 모듈로 전달한다', async (centerText) => {
    render(UiChart, { props: { type: 'pie', config: { items: [{ name: '완료', value: 42 }] }, centerText } })
    await nextTick()
    await nextTick()
    expect(createChart).toHaveBeenLastCalledWith('pie', expect.objectContaining({ centerText }))
  })

  it('centerText prop이 없으면 config.centerText를 유지한다', async () => {
    render(UiChart, { props: { type: 'pie', config: { items: [], centerText: 'total-percent' } } })
    await nextTick()
    await nextTick()
    expect(createChart).toHaveBeenLastCalledWith('pie', expect.objectContaining({ centerText: 'total-percent' }))
  })

  it('새 라벨·범례 props가 없으면 기존 config 설정을 유지한다', async () => {
    render(UiChart, { props: { type: 'pie', config: { items: [], dataLabelMode: 'value', legendValue: 'percent' } } })
    await nextTick()
    await nextTick()
    expect(createChart).toHaveBeenLastCalledWith('pie', expect.objectContaining({ dataLabelMode: 'value', legendValue: 'percent' }))
  })

  it('shape prop이 없으면 config.shape를 유지한다', async () => {
    render(UiChart, { props: { type: 'pie', config: { items: [], shape: 'donut' } } })
    await nextTick()
    await nextTick()
    expect(createChart).toHaveBeenLastCalledWith('pie', expect.objectContaining({ shape: 'donut' }))
  })

  it('shape prop이 config.shape보다 우선한다', async () => {
    render(UiChart, { props: { type: 'pie', config: { items: [], shape: 'donut' }, shape: 'pie' } })
    await nextTick()
    await nextTick()
    expect(createChart).toHaveBeenLastCalledWith('pie', expect.objectContaining({ shape: 'pie' }))
  })

  it('다른 차트에는 원형 전용 옵션을 넘기지 않는다', async () => {
    render(UiChart, { props: { type: 'bar', config: barConfig, centerText: 'total-percent' } })
    await nextTick()
    await nextTick()
    expect(createChart).toHaveBeenLastCalledWith('bar', expect.not.objectContaining({ centerText: 'total-percent' }))
  })
})
