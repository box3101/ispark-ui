import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { CANVAS, gridDensity, validateGrid, columnTemplate, cellFontSize } from './layoutHelper'
import { presentationTokens } from '../../../presentation/tokens'
import SlideFrame from './SlideFrame.vue'
import TabbedPanels from './TabbedPanels.vue'
import NestedBlocks from './NestedBlocks.vue'
import BadgeSteps from './BadgeSteps.vue'
import FigurePanel from './FigurePanel.vue'
import DenseTable from './DenseTable.vue'
import PathFlow from './PathFlow.vue'

describe('layoutHelper — 캔버스', () => {
  it('tokens.ts 에서 파생한다 — 숫자를 두 군데 적지 않는다', () => {
    expect(CANVAS.width).toBe(Math.round(presentationTokens.canvas.width * 96))
    expect(CANVAS.height).toBe(Math.round(presentationTokens.canvas.height * 96))
  })

  it('A4 가로 비율이다 (16:9 아님)', () => {
    expect(CANVAS.ratio).toBeCloseTo(1.444, 2)
    expect(CANVAS.ratio).not.toBeCloseTo(16 / 9, 2)
  })
})

describe('layoutHelper — 격자', () => {
  it('셀 수로 밀도를 나눈다', () => {
    expect(gridDensity(2, 2)).toBe('sparse')
    expect(gridDensity(4, 4)).toBe('normal')
    expect(gridDensity(6, 6)).toBe('dense')
    expect(gridDensity(8, 9)).toBe('overloaded')
  })

  it('실측 범위를 벗어난 격자를 거른다', () => {
    expect(validateGrid(4, 5)).toBeNull()
    expect(validateGrid(1, 5)).toMatch(/열은/)
    expect(validateGrid(9, 5)).toMatch(/열은/)
    expect(validateGrid(4, 10)).toMatch(/행은/)
    expect(validateGrid(2.5, 4)).toMatch(/정수/)
    expect(validateGrid(8, 8)).toMatch(/장을 나누세요/)
  })

  it('열 지정을 grid-template-columns 로 바꾼다', () => {
    expect(columnTemplate(3)).toBe('repeat(3, minmax(0, 1fr))')
    expect(columnTemplate('is-1-3')).toBe('minmax(0, 1fr) minmax(0, 3fr)')
    expect(columnTemplate('is-bad')).toBe('repeat(2, minmax(0, 1fr))')
  })

  it('열이 늘면 글자가 작아진다', () => {
    expect(cellFontSize(2)).toBeGreaterThan(cellFontSize(4))
    expect(cellFontSize(4)).toBeGreaterThan(cellFontSize(8))
  })
})

describe('SlideFrame', () => {
  it('머리 칩을 강조색과 주조색으로 나눠 그린다', () => {
    const { container, getByText } = render(SlideFrame, {
      props: { chipAccent: '시점', chipMain: '제안 개요', title: '제목' },
    })
    expect(getByText('시점').className).toContain('accent')
    expect(getByText('제안 개요').className).toContain('main')
    expect(container.querySelector('.slide-frame')).not.toBeNull()
  })

  it('결론 바는 넘겼을 때만 그린다 — 실측 31장 중 1장뿐이었다', () => {
    const without = render(SlideFrame, { props: { title: 'x' } })
    expect(without.container.querySelector('.slide-conclusion')).toBeNull()

    const withBar = render(SlideFrame, { props: { title: 'x', conclusion: '핵심' } })
    expect(withBar.container.querySelector('.slide-conclusion')).not.toBeNull()
  })

  it('backdrop=coast 일 때만 배경 레이어를 깐다', () => {
    expect(render(SlideFrame, { props: {} }).container.querySelector('.backdrop')).toBeNull()
    expect(render(SlideFrame, { props: { backdrop: 'coast' } }).container.querySelector('.backdrop')).not.toBeNull()
  })
})

describe('레이아웃 렌더', () => {
  it('TabbedPanels — 탭과 항목을 그린다', () => {
    const { container } = render(TabbedPanels, {
      props: { panels: [{ tab: '데이터', items: [{ title: 'a' }, { title: 'b' }] }] },
    })
    expect(container.querySelectorAll('.tab')).toHaveLength(1)
    expect(container.querySelectorAll('.panel article')).toHaveLength(2)
  })

  it('NestedBlocks — 블록 안에 항목이 중첩된다', () => {
    const { container } = render(NestedBlocks, {
      props: { blocks: [{ label: 'A', title: 'T', items: [{ text: '1' }, { text: '2', strong: true }], takeaway: 'K' }] },
    })
    expect(container.querySelectorAll('li')).toHaveLength(2)
    expect(container.querySelectorAll('li.is-strong')).toHaveLength(1)
    expect(container.querySelector('.takeaway')?.textContent).toBe('K')
  })

  it('BadgeSteps — 번호 원과 레일을 그린다', () => {
    const { container } = render(BadgeSteps, {
      props: { steps: [{ title: 'a' }, { title: 'b' }, { title: 'c' }], railLabel: '3단계' },
    })
    expect(container.querySelectorAll('.badge')).toHaveLength(3)
    expect(container.querySelector('.rail')).not.toBeNull()
    expect(container.querySelector('.rail-label')?.textContent).toBe('3단계')
  })

  it('FigurePanel — 이미지가 없으면 자리틀을 그린다', () => {
    const { container } = render(FigurePanel, { props: { notes: [{ title: 'n1' }, { title: 'n2' }] } })
    expect(container.querySelector('.placeholder')).not.toBeNull()
    expect(container.querySelectorAll('.notes li')).toHaveLength(2)
  })

  it('DenseTable — 강조 열과 묶음 경계를 표시한다', () => {
    const { container } = render(DenseTable, {
      props: {
        columns: ['구분', '값', '제안'],
        rows: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']],
        highlightColumn: 2, groupBreaks: [2],
      },
    })
    // 머리 1칸 + 본문 3칸
    expect(container.querySelectorAll('.is-highlight')).toHaveLength(4)
    expect(container.querySelectorAll('tr.is-break')).toHaveLength(1)
    expect(container.querySelector('tbody th[scope="row"]')?.textContent).toBe('a')
  })

  it('PathFlow — 노드가 곡선 위에 놓이고 카드가 어긋난다', () => {
    const items = ['01', '02', '03', '04'].map((no, i) => ({
      step: `${i + 1}코스`, no, title: `T${i}`, tagline: `g${i}`, note: `n${i}`, icon: 'data-migration',
    }))
    const { container } = render(PathFlow, { props: { items } })
    expect(container.querySelectorAll('.card')).toHaveLength(4)
    expect(container.querySelectorAll('.dot')).toHaveLength(4)
    // defs 안의 화살표 마커가 아니라 곡선 자체를 본다
    expect(container.querySelector('svg.track path.curve')?.getAttribute('d')).toMatch(/^M .* C /)

    // 실측 카드 y: 57.7 → 61.0 → 62.9 → 59.1. 일렬이 아니어야 한다
    const tops = [...container.querySelectorAll<HTMLElement>('.card')].map((el) => parseFloat(el.style.top))
    expect(new Set(tops).size).toBeGreaterThan(1)
    expect(tops[2]).toBeGreaterThan(tops[0])
    expect(tops[3]).toBeLessThan(tops[2])
  })
})
