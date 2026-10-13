import type { ArcElement, Chart, Plugin } from 'chart.js'
import { ChartConfig } from './chart-config'

export interface PieSummaryItem {
  value?: unknown
  count?: unknown
}

/** Chart.js의 조각 크기와 동일하게 유한 숫자의 절댓값을 사용한다. */
export function getPieAmount(value: unknown): number {
  if (value === null || value === undefined || value === '') return 0
  const amount = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : 0
  return Number.isFinite(amount) ? Math.abs(amount) : 0
}

/** 매우 큰 데이터도 합계에 Infinity를 남기지 않는다. */
function addAmount(total: number, amount: number): number {
  const sum = total + amount
  return Number.isFinite(sum) ? sum : Number.MAX_VALUE
}

export function getPiePercentage(value: unknown, total: number): number {
  return total > 0 ? (getPieAmount(value) / total) * 100 : 0
}

export function formatPieNumber(value: number): string {
  return value.toLocaleString('ko-KR')
}

export function formatPiePercentage(value: number): string {
  return (Number.isFinite(value) ? value : 0).toLocaleString('ko-KR', { maximumFractionDigits: 1 })
}

/** count가 모두 있으면 수량 합계, 그 외에는 조각 value 합계를 사용한다. */
export function getPieSummary(items: PieSummaryItem[], isVisible: (index: number) => boolean = () => true) {
  const usesCounts = items.length > 0 && items.every((item) => item.count !== undefined && item.count !== null)
  let total = 0
  let visibleTotal = 0
  let valueTotal = 0

  items.forEach((item, index) => {
    const amount = getPieAmount(usesCounts ? item.count : item.value)
    total = addAmount(total, amount)
    valueTotal = addAmount(valueTotal, getPieAmount(item.value))
    if (isVisible(index)) visibleTotal = addAmount(visibleTotal, amount)
  })

  return {
    usesCounts,
    total,
    visibleTotal,
    valueTotal,
    percent: total > 0 ? (visibleTotal / total) * 100 : 0,
  }
}

/** 실제 도넛의 중심/반지름을 사용하여 애니메이션·리사이즈·범례 토글에 맞춰 그린다. */
export function createPieCenterTextPlugin(items: PieSummaryItem[], config: Record<string, any>): Plugin<'pie'> {
  return {
    id: 'pieCenterText',
    afterDraw(chart: Chart<'pie'>) {
      const arc = chart.getDatasetMeta(0).data[0] as ArcElement | undefined
      if (!arc || !Number.isFinite(arc.innerRadius) || arc.innerRadius <= 0) return

      const summary = getPieSummary(items, (index) => chart.getDataVisibility(index))
      const percent = typeof config.centerPercent === 'number' && Number.isFinite(config.centerPercent)
        ? config.centerPercent
        : summary.percent
      const percentage = formatPiePercentage(percent)
      const { ctx } = chart
      const theme = chart.canvas && typeof getComputedStyle === 'function' ? getComputedStyle(chart.canvas) : undefined
      const primaryColor = config.centerTextColor || theme?.getPropertyValue('--color-text-heading').trim() || '#1e2124'
      const secondaryColor = theme?.getPropertyValue('--color-text-secondary').trim() || '#64748b'
      const isPercentOnly = config.centerText === 'percent'
      const hasPercentageRow = config.centerText === 'total-percent'
      const suffix = isPercentOnly ? '%' : String(config.centerTotalSuffix ?? '개')
      // 두 줄 모드는 수량·단위를 한 문장으로 묶어 사진처럼 자연스럽게 읽히게 한다.
      const rows = hasPercentageRow
        ? [
            [{ text: `${formatPieNumber(summary.visibleTotal)}${suffix}`, size: 16, weight: 700, color: primaryColor, gap: 0 }],
            [{ text: `(${percentage}%)`, size: 16, weight: 500, color: primaryColor, gap: 0 }],
          ]
        : [[
            { text: isPercentOnly ? percentage : formatPieNumber(summary.visibleTotal), size: 28, weight: 700, color: primaryColor, gap: 0 },
            ...(suffix ? [{ text: suffix, size: 12, weight: 400, color: secondaryColor, gap: isPercentOnly ? 2 : 4 }] : []),
          ]]
      const font = (size: number, weight: number) => `${weight} ${size}px ${ChartConfig.font.family}, sans-serif`

      ctx.save()
      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'

      // 숫자와 단위는 각각 측정하되 하나의 행으로 중심 정렬하고 같은 기준선에 둔다.
      const measuredRows = rows.map((runs) => {
        const measuredRuns = runs.map((run) => {
          ctx.font = font(run.size, run.weight)
          const metrics = ctx.measureText(run.text)
          return {
            ...run,
            width: metrics.width,
            ascent: metrics.actualBoundingBoxAscent ?? run.size * 0.8,
            descent: metrics.actualBoundingBoxDescent ?? run.size * 0.2,
          }
        })
        return {
          runs: measuredRuns,
          width: measuredRuns.reduce((sum, run) => sum + run.gap + run.width, 0),
          ascent: Math.max(...measuredRuns.map((run) => run.ascent)),
          descent: Math.max(...measuredRuns.map((run) => run.descent)),
        }
      })
      const rowGap = 4
      const height = measuredRows.reduce((sum, row) => sum + row.ascent + row.descent, 0) + rowGap * (rows.length - 1)
      const width = Math.max(...measuredRows.map((row) => row.width))
      let top = -height / 2
      let radius = 0
      const positionedRows = measuredRows.map((row) => {
        const baseline = top + row.ascent
        // 원 구멍의 모서리까지 확인하여 작은 카드나 긴 사용자 단위도 링에 걸치지 않게 한다.
        radius = Math.max(radius, Math.hypot(row.width / 2, Math.max(Math.abs(top), Math.abs(baseline + row.descent))))
        top = baseline + row.descent + rowGap
        return { ...row, baseline }
      })
      const scale = Math.min(1, arc.innerRadius * 1.5 / width, arc.innerRadius * 1.65 / height, arc.innerRadius / radius)

      positionedRows.forEach((row) => {
        let x = arc.x - row.width * scale / 2
        row.runs.forEach((run) => {
          x += run.gap * scale
          ctx.font = font(run.size * scale, run.weight)
          ctx.fillStyle = run.color
          ctx.fillText(run.text, x, arc.y + row.baseline * scale)
          x += run.width * scale
        })
      })
      ctx.restore()
    },
  }
}
