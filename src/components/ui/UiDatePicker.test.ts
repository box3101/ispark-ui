import { describe, it, expect } from 'vitest'
import { composeStories } from '@storybook/vue3'
import { render } from '@testing-library/vue'
import * as stories from './UiDatePicker.stories'

const { Playground, DateOnly, DateTime, Month, MinMax } = composeStories(stories)

describe('UiDatePicker — smoke', () => {
  it('Playground 렌더링', () => {
    const { container } = render(Playground())
    expect(container.querySelector('.ui-datepicker-wrap')).toBeTruthy()
    expect(container.querySelector('.ui-datepicker-field')).toBeTruthy()
  })

  it('type=date 기본 — has-time / is-month 클래스 없음', () => {
    const { container } = render(DateOnly())
    const wrap = container.querySelector('.ui-datepicker-wrap')!
    expect(wrap.classList.contains('has-time')).toBe(false)
    expect(wrap.classList.contains('is-month')).toBe(false)
  })

  it('type=datetime — has-time 클래스 + 시간 입력 2개', () => {
    const { container } = render(DateTime())
    const wrap = container.querySelector('.ui-datepicker-wrap')!
    expect(wrap.classList.contains('has-time')).toBe(true)
    expect(container.querySelectorAll('.ui-datepicker-time-input')).toHaveLength(2)
  })

  it('type=month — is-month 클래스', () => {
    const { container } = render(Month())
    const wrap = container.querySelector('.ui-datepicker-wrap')!
    expect(wrap.classList.contains('is-month')).toBe(true)
  })

  it('min/max — 정상 마운트', () => {
    const { container } = render(MinMax())
    expect(container.querySelector('.ui-datepicker-wrap')).toBeTruthy()
  })
})

import { fireEvent, screen } from '@testing-library/vue'
import UiDatePicker from './UiDatePicker.vue'
import { CalendarDate, CalendarDateTime } from '@internationalized/date'

it('초기화는 undefined를 전달하고 팝업을 닫는다', async () => {
  const { getByRole, emitted } = render(UiDatePicker, { props: { modelValue: new CalendarDateTime(2026, 9, 18, 14, 30), type: 'datetime' } })
  await fireEvent.click(getByRole('button', { name: '날짜·시간 선택' }))
  await fireEvent.click(await screen.findByRole('button', { name: '초기화' }))
  expect(emitted()['update:modelValue']).toContainEqual([undefined])
  expect(getByRole('button', { name: '날짜·시간 선택' }).getAttribute('aria-expanded')).toBe('false')
})
it('오늘을 선택하고 달력을 닫는다', async () => {
  const { getByRole, emitted } = render(UiDatePicker, { props: { modelValue: new CalendarDate(2020, 1, 1) } })
  await fireEvent.click(getByRole('button', { name: '날짜 선택' }))
  await fireEvent.click(await screen.findByRole('button', { name: '오늘' }))
  const today = new Date()
  const selected = emitted()['update:modelValue'][0]![0] as CalendarDate
  expect(selected.toString()).toBe(new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()).toString())
  expect(getByRole('button', { name: '날짜 선택' }).getAttribute('aria-expanded')).toBe('false')
})
it('범위 밖 오늘은 비활성화하고 초기화 숨김 옵션을 적용한다', async () => {
  const { getByRole } = render(UiDatePicker, { props: { minValue: new CalendarDate(2100, 1, 1), clearable: false } })
  await fireEvent.click(getByRole('button', { name: '날짜 선택' }))
  expect((await screen.findByRole('button', { name: '오늘' }) as HTMLButtonElement).disabled).toBe(true)
  expect(screen.queryByRole('button', { name: '초기화' })).toBeNull()
})
