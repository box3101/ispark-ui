import { describe, it, expect } from 'vitest'
import { composeStories } from '@storybook/vue3'
import { render, fireEvent } from '@testing-library/vue'
import * as stories from './UiAccordion.stories'

const { Default, Multiple, WithDisabledItem, AllDisabled } = composeStories(stories)

describe('UiAccordion', () => {
  // 1. 기본 렌더 — items 개수만큼 헤더 생성
  it('items 개수만큼 trigger 버튼 생성', () => {
    const { container } = render(Default())
    const triggers = container.querySelectorAll('[data-radix-collection-item], button[aria-expanded]')
    expect(triggers.length).toBeGreaterThanOrEqual(3)
  })

  // 2. defaultValue 항목이 펼쳐진 상태로 렌더
  it('defaultValue="q1" — q1이 aria-expanded=true로 시작', () => {
    const { container } = render(Default())
    const triggers = container.querySelectorAll('button[aria-expanded]')
    expect(triggers[0].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[1].getAttribute('aria-expanded')).toBe('false')
  })

  // 3. 다른 trigger 클릭 시 single 모드에서 이전 항목 닫히고 새 항목 열림
  it('single 모드: 다른 trigger 클릭 시 이전 닫히고 새로 열림', async () => {
    const { container } = render(Default())
    const triggers = container.querySelectorAll('button[aria-expanded]')
    await fireEvent.click(triggers[1])
    expect(triggers[0].getAttribute('aria-expanded')).toBe('false')
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true')
  })

  // 4. multiple 모드 — 여러 항목 동시 열림 유지
  it('multiple 모드: 여러 항목 동시 열림', async () => {
    const { container } = render(Multiple())
    const triggers = container.querySelectorAll('button[aria-expanded]')
    // defaultValue=['q1', 'q3']
    expect(triggers[0].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[2].getAttribute('aria-expanded')).toBe('true')
    // q2 추가로 열기
    await fireEvent.click(triggers[1])
    expect(triggers[0].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true')
    expect(triggers[2].getAttribute('aria-expanded')).toBe('true')
  })

  // 5. disabled 항목 — 클릭해도 열리지 않음
  it('item.disabled=true: 클릭 무반응 + aria-disabled', async () => {
    const { container } = render(WithDisabledItem())
    const triggers = container.querySelectorAll('button[aria-expanded]')
    const disabled = triggers[1]
    expect(disabled.getAttribute('data-disabled')).not.toBeNull()
    await fireEvent.click(disabled)
    expect(disabled.getAttribute('aria-expanded')).toBe('false')
  })

  // 6. disabled=true 전체 — 모든 trigger 비활성
  it('disabled=true: 모든 trigger 비활성 클래스', () => {
    const { container } = render(AllDisabled())
    expect(container.querySelector('.ui-accordion.is-disabled')).toBeTruthy()
    const triggers = container.querySelectorAll('button[aria-expanded]')
    triggers.forEach((t) => {
      expect(t.getAttribute('data-disabled')).not.toBeNull()
    })
  })
})
