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
