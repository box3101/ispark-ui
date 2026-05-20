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
