import { describe, it, expect } from 'vitest'
import { composeStories } from '@storybook/vue3'
import { render } from '@testing-library/vue'
import * as stories from './UiDateRangePicker.stories'

const { Playground, Default, Disabled, MinMax } = composeStories(stories)

describe('UiDateRangePicker — smoke', () => {
  it('Playground 렌더링 — field + 트리거 + range 구분자', () => {
    const { container } = render(Playground())
    expect(container.querySelector('.ui-datepicker-wrap')).toBeTruthy()
    expect(container.querySelector('.ui-datepicker-field')).toBeTruthy()
    expect(container.querySelector('.ui-datepicker-trigger')).toBeTruthy()
    expect(container.querySelector('.ui-datepicker-range-sep')?.textContent).toBe('~')
  })

  it('Default — start/end 세그먼트 둘 다 존재', () => {
    const { container } = render(Default())
    // type="start"와 type="end" 각각 최소 1개 이상 segment
    const allSegments = container.querySelectorAll('.ui-datepicker-segment')
    expect(allSegments.length).toBeGreaterThanOrEqual(6) // year/month/day × 2
  })

  it('Disabled — is-disabled 클래스', () => {
    const { container } = render(Disabled())
    expect(container.querySelector('.ui-datepicker-field.is-disabled')).toBeTruthy()
  })

  it('MinMax — 정상 마운트', () => {
    const { container } = render(MinMax())
    expect(container.querySelector('.ui-datepicker-wrap')).toBeTruthy()
  })
})

import { fireEvent, screen } from '@testing-library/vue'
import UiDateRangePicker from './UiDateRangePicker.vue'
import { CalendarDate } from '@internationalized/date'

it('PC는 두 달, 좁은 화면은 한 달로 전환한다', async () => {
  const original = window.innerWidth
  Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true })
  const { getByRole } = render(UiDateRangePicker, { props: { mode: 'range' } })
  try {
    await fireEvent.click(getByRole('button', { name: '기간 선택' }))
    await screen.findByRole('button', { name: '최근 7일' })
    expect(document.querySelectorAll('.ui-daterangepicker-months table')).toHaveLength(2)
    Object.defineProperty(window, 'innerWidth', { value: 390, configurable: true })
    await fireEvent(window, new Event('resize'))
    expect(document.querySelectorAll('.ui-daterangepicker-months table')).toHaveLength(1)
  } finally { Object.defineProperty(window, 'innerWidth', { value: original, configurable: true }) }
})
it('빠른 선택은 범위를 전달하고 초기화는 양쪽 날짜를 비운다', async () => {
  const { getByRole, emitted, rerender } = render(UiDateRangePicker, { props: { mode: 'range' } })
  await fireEvent.click(getByRole('button', { name: '기간 선택' }))
  await fireEvent.click(await screen.findByRole('button', { name: '최근 7일' }))
  const selected = emitted()['update:modelValue'][0]![0] as { start: CalendarDate; end: CalendarDate }
  expect(selected.start.add({ days: 6 }).toString()).toBe(selected.end.toString())
  await rerender({ modelValue: selected })
  await fireEvent.click(getByRole('button', { name: '기간 선택' }))
  await fireEvent.click(await screen.findByRole('button', { name: '초기화' }))
  expect(emitted()['update:modelValue']).toContainEqual([{ start: undefined, end: undefined }])
})
it('허용 범위를 벗어난 빠른 선택은 비활성화한다', async () => {
  const { getByRole } = render(UiDateRangePicker, { props: { mode: 'range', minValue: new CalendarDate(2100, 1, 1) } })
  await fireEvent.click(getByRole('button', { name: '기간 선택' }))
  expect((await screen.findByRole('button', { name: '최근 7일' }) as HTMLButtonElement).disabled).toBe(true)
})

it('첫 날짜 이후 안내를 갱신하고 두 번째 날짜에서 기간을 확정한다', async () => {
  const { getByRole, emitted } = render(UiDateRangePicker, { props: { mode: 'range' } })
  await fireEvent.click(getByRole('button', { name: '기간 선택' }))
  await screen.findByRole('button', { name: '최근 7일' })
  const days = () => Array.from(document.querySelectorAll('.ui-daterangepicker-months table:first-child .ui-datepicker-cell-trigger:not([data-outside-month])'))
  await fireEvent.click(days().find(el => el.textContent?.trim() === '10')!)
  expect(screen.getByRole('status').textContent).toContain('종료일을 선택')
  expect(getByRole('button', { name: '기간 선택' }).getAttribute('aria-expanded')).toBe('true')
  await fireEvent.click(days().find(el => el.textContent?.trim() === '15')!)
  const values = emitted()['update:modelValue'].map(event => event[0] as { start: CalendarDate; end: CalendarDate })
  expect(values.some(value => value.start?.day === 10 && value.end?.day === 15)).toBe(true)
  expect(getByRole('button', { name: '기간 선택' }).getAttribute('aria-expanded')).toBe('false')
})

it('기본 모드는 시작일과 종료일 달력을 각각 연다', async () => {
  const { getByRole } = render(UiDateRangePicker)
  await fireEvent.click(getByRole('button', { name: '시작일 선택' }))
  await screen.findByRole('button', { name: '오늘' })
  expect(document.querySelectorAll('.ui-datepicker-popover--single')).toHaveLength(1)
  await fireEvent.keyDown(screen.getByRole('button', { name: '오늘' }), { key: 'Escape' })
  await fireEvent.click(getByRole('button', { name: '종료일 선택' }))
  expect(getByRole('button', { name: '종료일 선택' }).getAttribute('aria-expanded')).toBe('true')
  expect(document.querySelectorAll('.ui-datepicker-popover--single')).toHaveLength(1)
})
it('시작일 개별 초기화는 종료일을 유지한다', async () => {
  const end = new CalendarDate(2027, 6, 15)
  const { getByRole, emitted } = render(UiDateRangePicker, { props: { modelValue: { start: new CalendarDate(2024, 1, 1), end } } })
  await fireEvent.click(getByRole('button', { name: '시작일 선택' }))
  await fireEvent.click(await screen.findByRole('button', { name: '초기화', exact: true }))
  expect(emitted()['update:modelValue']).toContainEqual([{ start: undefined, end }])
})
it('독립 모드의 빠른 선택과 전체 초기화', async () => {
  const { getByRole, emitted, rerender } = render(UiDateRangePicker)
  expect(screen.queryByRole('button', { name: '최근 7일' })).toBeNull()
  await fireEvent.click(getByRole('button', { name: '시작일 선택' }))
  await fireEvent.click(await screen.findByRole('button', { name: '최근 7일' }))
  const value = emitted()['update:modelValue'][0]![0] as { start: CalendarDate; end: CalendarDate }
  expect(value.start.add({ days: 6 }).toString()).toBe(value.end.toString())
  await rerender({ modelValue: value })
  expect(getByRole('button', { name: '시작일 선택' }).getAttribute('aria-expanded')).toBe('false')
  await fireEvent.click(getByRole('button', { name: '종료일 선택' }))
  await fireEvent.click(await screen.findByRole('button', { name: '전체 초기화' }))
  expect(emitted()['update:modelValue']).toContainEqual([{ start: undefined, end: undefined }])
})
