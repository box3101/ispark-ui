import { render, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import UiCalendarMonth, { type CalendarMonthEvent } from './UiCalendarMonth.vue'

// 2026년 6월 기준 (6/1=월). 주(일~토): 5/31~6/6, 6/7~6/13, 6/14~6/20 ...
const BASE = { year: 2026, month: 6, today: '2026-06-15' }

function mount(events: CalendarMonthEvent[], extra: Record<string, unknown> = {}) {
  return render(UiCalendarMonth, { props: { ...BASE, events, ...extra } })
}

function cell(container: HTMLElement, date: string) {
  return container.querySelector(`[data-date="${date}"]`) as HTMLElement
}

describe('UiCalendarMonth', () => {
  // 1. 6주 그리드 + 요일 헤더
  it('42개 셀과 요일 헤더 7개를 렌더한다', () => {
    const { container } = mount([])
    expect(container.querySelectorAll('.ui-calendar-month__cell').length).toBe(42)
    expect(container.querySelectorAll('.ui-calendar-month__weekday').length).toBe(7)
  })

  // 2. 단일 일정 — single 막대 + 제목 표시
  it('단일 일정은 single 막대로 제목과 함께 표시된다', () => {
    const { container } = mount([{ id: 1, start: '2026-06-10', title: '회의' }])
    const c = cell(container, '2026-06-10')
    const bar = c.querySelector('.ui-calendar-month__bar--single')
    expect(bar).not.toBeNull()
    expect(bar!.textContent).toContain('회의')
  })

  // 3. 여러 날 일정 — 걸친 모든 날에 range 막대, span start/middle/end
  it('여러 날 일정은 걸친 모든 날에 range 막대로 표시된다', () => {
    const { container } = mount([{ id: 1, start: '2026-06-10', end: '2026-06-12', title: '출장' }])
    for (const d of ['2026-06-10', '2026-06-11', '2026-06-12']) {
      expect(cell(container, d).querySelector('.ui-calendar-month__bar--range')).not.toBeNull()
    }
    expect(cell(container, '2026-06-10').querySelector('.ui-calendar-month__bar--start')).not.toBeNull()
    expect(cell(container, '2026-06-11').querySelector('.ui-calendar-month__bar--middle')).not.toBeNull()
    expect(cell(container, '2026-06-12').querySelector('.ui-calendar-month__bar--end')).not.toBeNull()
    // 시작일에만 제목 (중간 칸은 제목 숨김)
    expect(cell(container, '2026-06-10').textContent).toContain('출장')
    expect(cell(container, '2026-06-11').textContent).not.toContain('출장')
  })

  // 4. 겹치는 여러 날 일정 → 서로 다른 레인 + 빈 레인 placeholder
  it('겹치는 여러 날 일정은 다른 레인에 배치되고 빈 레인은 placeholder로 채워진다', () => {
    const { container } = mount([
      { id: 'a', start: '2026-06-10', end: '2026-06-12', title: 'A' },
      { id: 'b', start: '2026-06-11', end: '2026-06-13', title: 'B' },
    ])
    // 겹치는 11일: range 막대 2개
    expect(cell(container, '2026-06-11').querySelectorAll('.ui-calendar-month__bar--range').length).toBe(2)
    // B만 있는 13일: A가 쓰던 위쪽 레인은 빈 placeholder로 유지
    expect(cell(container, '2026-06-13').querySelector('.ui-calendar-month__bar--empty')).not.toBeNull()
  })

  // 5. maxLanes 초과 시 +N
  it('maxLanes를 넘는 일정은 +N으로 표시된다', () => {
    const { container } = mount(
      [1, 2, 3, 4].map((n) => ({ id: n, start: '2026-06-10', title: `E${n}` })),
      { maxLanes: 3 },
    )
    const more = cell(container, '2026-06-10').querySelector('.ui-calendar-month__more')
    expect(more).not.toBeNull()
    expect(more!.textContent).toContain('+1')
  })

  // 6. 날짜 클릭 → select-date emit
  it('날짜 클릭 시 select-date를 emit한다', async () => {
    const { container, emitted } = mount([])
    await fireEvent.click(cell(container, '2026-06-15'))
    expect(emitted()['select-date'][0]).toEqual(['2026-06-15'])
  })

  // 7. 막대 클릭 → select-event emit (날짜 선택과 분리)
  it('막대 클릭 시 select-event를 emit한다', async () => {
    const ev: CalendarMonthEvent = { id: 7, start: '2026-06-10', title: '클릭' }
    const { container, emitted } = mount([ev])
    const bar = cell(container, '2026-06-10').querySelector('.ui-calendar-month__bar') as HTMLElement
    await fireEvent.click(bar)
    expect(emitted()['select-event'][0]).toEqual([ev])
  })

  // 8. 오늘 강조
  it('today에 해당하는 칸에 is-today 클래스가 붙는다', () => {
    const { container } = mount([])
    expect(cell(container, '2026-06-15').classList.contains('is-today')).toBe(true)
  })
})
