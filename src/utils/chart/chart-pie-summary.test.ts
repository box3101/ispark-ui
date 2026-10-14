import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPieCenterTextPlugin, formatPiePercentage, getPieAmount, getPiePercentage, getPieSummary } from './chart-pie-summary'
import { PieChartModule } from './chart-pie'
import { ChartConfig } from './chart-config'
import type { Chart } from 'chart.js'

const chartMocks = vi.hoisted(() => ({ configs: [] as any[] }))
vi.mock('chart.js/auto', () => ({
  Chart: class {
    data: any
    options: any
    hidden = new Set<number>()
    destroy = vi.fn()
    update = vi.fn()

    constructor(_canvas: HTMLCanvasElement, config: any) {
      this.data = config.data
      this.options = config.options
      chartMocks.configs.push(config)
    }

    getDataVisibility(index: number) { return !this.hidden.has(index) }
    toggleDataVisibility(index: number) {
      if (this.hidden.has(index)) this.hidden.delete(index)
      else this.hidden.add(index)
    }
  },
}))

const items = [
  { name: '대졸', value: 221, count: 221 },
  { name: '원졸', value: 45, count: 45 },
  { name: '전졸', value: 62, count: 62 },
]

// 캔버스 픽셀 대신 표시 숫자·위치·폭과 실제 모듈의 Chart.js 옵션을 검증한다.
function drawCenter(config: Record<string, any>, hidden: number[] = [], radius = 40, themeColors: Record<string, string> = {}) {
  const texts: { text: string; x: number; y: number; font: string; color: string }[] = []
  const ctx = {
    font: '',
    save: vi.fn(),
    restore: vi.fn(),
    textAlign: '',
    textBaseline: '',
    fillStyle: '',
    measureText(text: string) {
      const size = Number(this.font.match(/([\d.]+)px/)?.[1])
      return { width: text.length * size * 0.6 }
    },
    fillText(text: string, x: number, y: number) { texts.push({ text, x, y, font: this.font, color: this.fillStyle }) },
  }
  const canvas = document.createElement('canvas')
  Object.entries(themeColors).forEach(([name, value]) => canvas.style.setProperty(name, value))
  const chart = {
    ctx,
    canvas,
    getDatasetMeta: () => ({ data: [{ x: 73, y: 64, innerRadius: radius }] }),
    getDataVisibility: (index: number) => !hidden.includes(index),
  } as unknown as Chart<'pie'>
  const plugin = createPieCenterTextPlugin(items, config)
  plugin.afterDraw!(chart, {}, {})
  return { texts, ctx }
}

describe('원차트 합계와 비율', () => {
  it('count가 모두 있으면 수량을 합산하고, 일부 count가 없으면 value를 합산한다', () => {
    expect(getPieSummary([{ value: 67.4, count: 221 }, { value: 13.7, count: 45 }, { value: 18.9, count: 62 }])).toMatchObject({ total: 328, valueTotal: 100, percent: 100, usesCounts: true })
    expect(getPieSummary([{ value: 75, count: 300 }, { value: 25 }])).toMatchObject({ total: 100, usesCounts: false })
  })

  it('숨긴 조각을 제외한 수량과 원래 전체 대비 비율을 계산한다', () => {
    const summary = getPieSummary(items, (index) => index !== 0)
    expect(summary.visibleTotal).toBe(107)
    expect(summary.percent).toBeCloseTo(107 / 328 * 100)
    expect(formatPiePercentage(summary.percent)).toBe('32.6')
  })

  it('빈 데이터, 전체 숨김과 합계 0은 0%이며 NaN·Infinity를 남기지 않는다', () => {
    expect(getPieSummary([])).toMatchObject({ total: 0, percent: 0 })
    expect(getPieSummary(items, () => false)).toMatchObject({ visibleTotal: 0, percent: 0 })
    expect(getPieSummary([{ value: 0 }, { value: NaN }, { value: Infinity }])).toMatchObject({ total: 0, percent: 0 })
    expect(getPiePercentage(0, 0)).toBe(0)
    expect(getPieAmount(-4)).toBe(4)
    expect(getPieAmount('12')).toBe(12)
    expect(getPieSummary([{ value: Number.MAX_VALUE }, { value: Number.MAX_VALUE }]).total).toBe(Number.MAX_VALUE)
  })

  it('총합+비율을 단위가 붙은 두 문장으로 중심 정렬하고 숨김 합계를 반영한다', () => {
    const { texts, ctx } = drawCenter({ centerText: 'total-percent' }, [0])
    expect(texts.map(({ text }) => text)).toEqual(['107개', '(32.6%)'])
    texts.forEach(({ text, x, font }) => {
      const size = Number(font.match(/([\d.]+)px/)?.[1])
      expect(x + text.length * size * 0.6 / 2).toBeCloseTo(73)
    })
    const totalSize = Number(texts[0].font.match(/([\d.]+)px/)?.[1])
    const percentSize = Number(texts[1].font.match(/([\d.]+)px/)?.[1])
    expect(totalSize).toBeGreaterThan(percentSize)
    expect(texts[1].y - texts[0].y).toBeGreaterThan(20)
    expect((texts[0].y - totalSize * 0.8 + texts[1].y + percentSize * 0.2) / 2).toBeCloseTo(64)
    expect(ctx.save).toHaveBeenCalledOnce()
    expect(ctx.restore).toHaveBeenCalledOnce()
  })

  it('두 줄 중앙은 총합을 더 크고 굵게 표시하고 단독 모드의 작은 단위를 유지한다', () => {
    const { texts } = drawCenter({ centerText: 'total-percent' }, [], 80, {
      '--color-text-heading': '#123456', '--color-text-secondary': '#789abc',
    })
    expect(texts[0].font).toMatch(/^800 19px /)
    expect(texts[1].font).toMatch(/^500 16px /)
    expect(texts.map(({ color }) => color)).toEqual(['#123456', '#123456'])
    const overridden = drawCenter({ centerText: 'percent', centerTextColor: '#ff0000' }, [], 80)
    expect(overridden.texts[0].color).toBe('#ff0000')
    expect(overridden.texts[1].color).toBe('#64748b')
  })

  it('total 모드는 큰 총합과 작은 단위만 한 행에 표시하며 숨김·0·사용자 단위를 보존한다', () => {
    const total = drawCenter({ centerText: 'total', centerPercent: 42 }, [], 80).texts
    expect(total.map(({ text }) => text)).toEqual(['328', '개'])
    expect(total[0].y).toBe(total[1].y)
    expect(total[0].font).toMatch(/^700 28px /)
    expect(total[1].font).toMatch(/^400 12px /)
    const rowWidth = 3 * 28 * 0.6 + 4 + 12 * 0.6
    expect(total[0].x + rowWidth / 2).toBeCloseTo(73)
    expect(drawCenter({ centerText: 'total' }, [0]).texts.map(({ text }) => text)).toEqual(['107', '개'])
    expect(drawCenter({ centerText: 'total' }, [0, 1, 2]).texts.map(({ text }) => text)).toEqual(['0', '개'])
    expect(drawCenter({ centerText: 'total', centerTotalSuffix: '명' }).texts.map(({ text }) => text)).toEqual(['328', '명'])
    expect(drawCenter({ centerText: 'total', centerTotalSuffix: '' }).texts.map(({ text }) => text)).toEqual(['328'])
  })

  it('percent 모드는 큰 숫자와 작은 %만 한 행에 그리고 지정 퍼센트 0을 보존한다', () => {
    const percent = drawCenter({ centerText: 'percent', centerPercent: 0 }, [], 80).texts
    expect(percent.map(({ text }) => text)).toEqual(['0', '%'])
    expect(percent[0].y).toBe(percent[1].y)
    expect(percent[0].font).toMatch(/^700 28px /)
    expect(percent[1].font).toMatch(/^400 12px /)
    expect(drawCenter({ centerText: 'total-percent', centerTotalSuffix: '명' }).texts.map(({ text }) => text)).toEqual(['328명', '(100%)'])
    expect(drawCenter({ centerText: 'total-percent', centerTotalSuffix: '' }).texts.map(({ text }) => text)).toEqual(['328', '(100%)'])
    expect(drawCenter({ centerText: 'total-percent' }, [0, 1, 2]).texts.map(({ text }) => text)).toEqual(['0개', '(0%)'])
  })

  it.each(['total', 'percent', 'total-percent'])('작은 도넛과 긴 사용자 단위는 %s 모드에서도 같은 비율로 축소하여 원 구멍 안에 표시한다', (centerText) => {
    for (const suffix of ['개', '명 (총 인원)']) {
      const { texts } = drawCenter({ centerText, centerTotalSuffix: suffix }, [], 10)
      texts.forEach(({ text, font, x, y }) => {
        const size = Number(font.match(/([\d.]+)px/)?.[1])
        const width = text.length * size * 0.6
        expect(size).toBeLessThan(16)
        const horizontalExtent = Math.max(Math.abs(x - 73), Math.abs(x + width - 73))
        const verticalExtent = Math.max(Math.abs(y - size * 0.8 - 64), Math.abs(y + size * 0.2 - 64))
        expect(Math.hypot(horizontalExtent, verticalExtent)).toBeLessThanOrEqual(10.000001)
      })
      expect(Number(texts[0].font.match(/([\d.]+)px/)?.[1]) / Number(texts[1].font.match(/([\d.]+)px/)?.[1])).toBeCloseTo(centerText === 'total-percent' ? 19 / 16 : 28 / 12)
    }
    expect(drawCenter({ centerText }, [], 0).texts).toHaveLength(0)
  })
})

describe('PieChartModule 새 옵션과 기존 동작', () => {
  beforeEach(() => {
    chartMocks.configs.length = 0
    Reflect.deleteProperty(ChartConfig.instances, 'pie-test')
    document.body.innerHTML = '<div id="pie-legend"></div><canvas id="pie-test"></canvas>'
  })

  function create(config: Record<string, any> = {}) {
    PieChartModule.create({ id: 'pie-test', legendId: 'pie-legend', items, ...config })
    return chartMocks.configs.at(-1)
  }

  it('중앙 옵션을 사용하면 기본 도넛 구멍과 지역 플러그인을 설정하며 기본 pie는 유지한다', () => {
    const plain = create()
    expect(plain.options.cutout).toBe(0)
    expect(plain.plugins).toHaveLength(0)
    const donut = create({ centerText: 'total-percent' })
    expect(donut.options.cutout).toBe('48%')
    expect(donut.plugins[0].id).toBe('pieCenterText')
    expect(create({ style: 'taskStatus', centerText: 'total-percent' }).options.cutout).toBe('48%')
    expect(create({ style: 'taskStatus' }).options.cutout).toBe('48%')
  })

  it.each(['none', 'total', 'percent', 'total-percent'])('%s 중앙 모드를 선택하면 해당 플러그인과 구멍을 적용한다', (centerText) => {
    const config = create({ centerText })
    expect(config.plugins).toHaveLength(centerText === 'none' ? 0 : 1)
    expect(config.options.cutout).toBe(centerText === 'none' ? 0 : '48%')
    expect(create({ centerText, cutout: '65%' }).options.cutout).toBe('65%')
  })

  it.each(['total', 'percent'])('taskStatus 스타일은 %s 중앙 모드에서도 48% 구멍을 유지한다', (centerText) => {
    expect(create({ style: 'taskStatus', centerText }).options.cutout).toBe('48%')
  })

  it('중앙 문구가 없으면 꽉 찬 파이, shape=donut이면 도넛이 된다', () => {
    expect(create({ centerText: 'none' }).options.cutout).toBe(0)
    expect(create({ centerText: 'none', shape: 'pie' }).options.cutout).toBe(0)
    expect(create({ centerText: 'none', shape: 'donut' }).options.cutout).toBe('48%')
    expect(create({ centerText: 'none', shape: 'donut' }).plugins).toHaveLength(0)
  })

  it('shape=pie는 taskStatus 구멍도 닫고, 중앙 문구가 있으면 도넛을 유지한다', () => {
    expect(create({ style: 'taskStatus', centerText: 'none', shape: 'pie' }).options.cutout).toBe(0)
    expect(create({ style: 'taskStatus', centerText: 'none', shape: 'donut' }).options.cutout).toBe('48%')
    expect(create({ centerText: 'total', shape: 'pie' }).options.cutout).toBe('48%')
    expect(create({ centerText: 'total', shape: 'pie' }).plugins).toHaveLength(1)
  })

  it.each([0, '0%', -1, '잘못된 값', NaN, Infinity])('중앙 문구 사용 중 잘못된 cutout %s는 기본 구멍으로 보정한다', (cutout) => {
    const config = create({ centerText: 'percent', cutout })
    expect(config.options.cutout).toBe('48%')
  })

  it('사용자 cutout과 도넛 내부 데이터 라벨을 지원한다', () => {
    const config = create({ centerText: 'percent', cutout: '65%', showDataLabels: true, valueMode: 'ratio' })
    expect(config.options.cutout).toBe('65%')
    expect(config.options.plugins.datalabels.display).toBe(true)
    expect(config.options.plugins.datalabels.formatter(221)).toBe('67.4%')
    expect(config.options.plugins.tooltip.callbacks.label({ label: '대졸', parsed: 221 })).toBe('대졸: 67.4%')
  })

  it('기존 raw와 percent 툴팁·라벨 포맷을 보존한다', () => {
    const raw = create({ valueMode: 'raw', showDataLabels: true })
    expect(raw.options.plugins.tooltip.callbacks.label({ label: '대졸', parsed: 1200 })).toBe('대졸: 1,200')
    expect(raw.options.plugins.datalabels.formatter(1200)).toBe('1,200')
    const percent = create({ valueMode: 'percent', showDataLabels: true })
    expect(percent.options.plugins.tooltip.callbacks.label({ label: '대졸', parsed: 67.4 })).toBe('대졸: 67.4%')
    expect(percent.options.plugins.datalabels.formatter(67.4)).toBe('67.4%')
  })

  it('범례는 실제 비율과 수량, 비율만, 이름만을 선택하며 legacy count 표시도 유지한다', () => {
    create({ legendValue: 'value-percent' })
    expect(document.querySelector('.legend-item__info')?.textContent).toBe('221개 (67.4%)')
    create({ legendValue: 'percent' })
    expect(document.querySelector('.legend-item__info')?.textContent).toBe('67.4%')
    create({ legendValue: 'none' })
    expect(document.querySelector('.legend-item__info')).toBeNull()
    create()
    expect(document.querySelector('.legend-item__info')?.textContent).toBe('221개(221%)')
  })

  it('범례 단위는 중앙 총합 단위와 같고 빈 단위는 생략한다', () => {
    create({ legendValue: 'value-percent', centerTotalSuffix: '명' })
    expect(document.querySelector('.legend-item__info')?.textContent).toBe('221명 (67.4%)')
    create({ legendValue: 'value', centerTotalSuffix: '' })
    expect(document.querySelector('.legend-item__info')?.textContent).toBe('221')
    PieChartModule.update('pie-test', [{ name: '산업', value: 56, count: 56 }, { name: '대학원', value: 42, count: 42 }])
    expect(document.querySelector('.legend-item')?.textContent).toBe('산업56')
  })

  it('수량 전용 범례와 항목별 수량·비율 모드를 지원한다', () => {
    create({ legendValue: 'value' })
    expect(document.querySelector('.legend-item__info')?.textContent).toBe('221개')
    create({ legendValue: 'value-percent', items: [
      { name: '일반', value: 156 },
      { name: '산업', value: 56, legendValue: 'value' },
      { name: '대학원', value: 42, legendValue: 'percent' },
      { name: '기타', value: 74, legendValue: 'none' },
    ] })
    const legends = document.querySelectorAll('.legend-item')
    expect(legends[0].textContent).toBe('일반156개 (47.6%)')
    expect(legends[1].textContent).toBe('산업56개')
    expect(legends[2].textContent).toBe('대학원12.8%')
    expect(legends[3].textContent).toBe('기타')
  })

  it('조각 비율 모드는 raw 툴팁과 독립적으로 실제 비율을 계산하고 수량 모드는 원값을 표시한다', () => {
    const percentage = create({ dataLabelMode: 'percent', showDataLabels: false, valueMode: 'raw' })
    expect(percentage.options.plugins.datalabels.formatter(221)).toBe('67.4%')
    expect(percentage.options.plugins.tooltip.callbacks.label({ label: '대졸', parsed: 221 })).toBe('대졸: 221')
    const dataLabels = percentage.options.plugins.datalabels
    expect(dataLabels.display({ dataset: { data: [0, 221] }, dataIndex: 0 })).toBe(false)
    expect(dataLabels.display({ dataset: { data: [0, 221] }, dataIndex: 1 })).toBe(true)
    const value = create({ dataLabelMode: 'value', valueMode: 'ratio' })
    expect(value.options.plugins.datalabels.formatter(1200)).toBe('1,200')
    expect(create({ dataLabelMode: 'none', showDataLabels: true }).options.plugins.datalabels.display).toBe(false)
  })

  it('새 조각 비율 모드는 툴팁도 비율로 표시하고 갱신 후 새 합계를 사용한다', () => {
    const config = create({ dataLabelMode: 'percent', legendValue: 'value' })
    expect(config.options.plugins.tooltip.callbacks.label({ label: '대졸', parsed: 221 })).toBe('대졸: 67.4%')
    PieChartModule.update('pie-test', [{ name: '산업', value: 56 }, { name: '대학원', value: 42 }])
    expect(config.options.plugins.datalabels.formatter(56)).toBe('57.1%')
    expect(document.querySelector('.legend-item')?.textContent).toBe('산업56개')
  })

  it('비율 value와 수량 count를 함께 받은 데이터의 범례·라벨을 구분한다', () => {
    const rateItems = [
      { name: '2년제', value: 24.4, count: 80 },
      { name: '3년제', value: 28.7, count: 94 },
      { name: '4년제', value: 46.9, count: 154 },
    ]
    const percent = create({ items: rateItems, dataLabelMode: 'percent', legendValue: 'value-percent' })
    expect(document.querySelectorAll('.legend-item')[2].textContent).toBe('4년제154개 (46.9%)')
    expect(percent.options.plugins.datalabels.formatter(46.9, { dataIndex: 2 })).toBe('46.9%')
    const value = create({ items: rateItems, dataLabelMode: 'value', legendValue: 'value' })
    expect(value.options.plugins.datalabels.formatter(46.9, { dataIndex: 2 })).toBe('154')
    expect(value.options.plugins.tooltip.callbacks.label({ label: '4년제', parsed: 46.9, dataIndex: 2 })).toBe('4년제: 154')
    expect(getPieSummary(rateItems).total).toBe(328)
  })

  it('작은 조각은 라벨 글자를 축소하고 지정 색상을 보존한다', () => {
    const config = create({ dataLabelMode: 'percent', dataLabelColor: '#ffffff' })
    const ctx = { font: '', save: vi.fn(), restore: vi.fn(), measureText: () => ({ width: 28 }) }
    const context = { dataset: { data: [221] }, dataIndex: 0, datasetIndex: 0,
      chart: { ctx, getDatasetMeta: () => ({ data: [{ outerRadius: 50, innerRadius: 24, startAngle: 0, endAngle: 0.3 }] }) } }
    expect(config.options.plugins.datalabels.font(context).size).toBeLessThan(12)
    expect(config.options.plugins.datalabels.font(context).size).toBeGreaterThan(0)
    expect(config.options.plugins.datalabels.color(context)).toBe('#ffffff')
  })

  it('범례를 숨기거나 복원하면 수량·비율 정보에도 같은 상태를 적용한다', () => {
    create({ legendValue: 'value-percent' })
    const legend = document.querySelector('.legend-item') as HTMLElement
    const info = legend.querySelector('.legend-item__info') as HTMLElement
    legend.click()
    expect(info.style.opacity).toBe('0.5')
    expect(info.style.textDecoration).toBe('line-through')
    expect(ChartConfig.instances['pie-test'].getDataVisibility(0)).toBe(false)
    legend.click()
    expect(info.style.opacity).toBe('1')
    expect(info.style.textDecoration).toBe('none')
    expect(ChartConfig.instances['pie-test'].getDataVisibility(0)).toBe(true)
  })

  it('공개 update는 중앙·툴팁·조각 라벨·범례를 최신 데이터로 갱신하고 숨김 상태를 유지한다', () => {
    const config = create({ centerText: 'total-percent', legendValue: 'value-percent', valueMode: 'ratio', showDataLabels: true })
    const chart = ChartConfig.instances['pie-test']
    chart.toggleDataVisibility(0)
    const drawing = drawCenter({ centerText: 'total-percent' })
    drawing.texts.length = 0
    Object.assign(chart, { ctx: drawing.ctx, getDatasetMeta: () => ({ data: [{ x: 73, y: 64, innerRadius: 40 }] }) })

    PieChartModule.update('pie-test', [{ name: '신규 A', value: 30, count: 300 }, { name: '신규 B', value: 70, count: 700 }])
    expect(chart.data.datasets[0].data).toEqual([30, 70])
    expect(chart.data.labels).toEqual(['신규 A', '신규 B'])
    expect(chart.getDataVisibility(0)).toBe(false)
    expect(config.options.plugins.datalabels.formatter(70)).toBe('70%')
    expect(config.options.plugins.tooltip.callbacks.label({ label: '신규 B', parsed: 70 })).toBe('신규 B: 70%')
    const legend = document.querySelector('.legend-item') as HTMLElement
    const info = legend.querySelector('.legend-item__info') as HTMLElement
    expect(info.textContent).toBe('300개 (30%)')
    expect(info.style.opacity).toBe('0.5')
    expect(info.style.textDecoration).toBe('line-through')
    config.plugins[0].afterDraw(chart)
    expect(drawing.texts.map(({ text }) => text)).toEqual(['700개', '(70%)'])

    legend.click()
    drawing.texts.length = 0
    config.plugins[0].afterDraw(chart)
    expect(drawing.texts.map(({ text }) => text)).toEqual(['1,000개', '(100%)'])
    expect(info.style.opacity).toBe('1')
  })

  it('빈 데이터는 차트를 생성하지 않고 범례를 비우며 0 데이터의 비율은 0%다', () => {
    create({ items: [] })
    expect(chartMocks.configs).toHaveLength(0)
    expect(document.getElementById('pie-legend')?.childElementCount).toBe(0)
    const config = create({ items: [{ name: '없음', value: 0 }], legendValue: 'percent', valueMode: 'ratio', showDataLabels: true })
    expect(document.querySelector('.legend-item__info')?.textContent).toBe('0%')
    expect(config.options.plugins.datalabels.formatter(0)).toBe('0%')
  })
})
