import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import UiProgress from './UiProgress.vue'

describe('UiProgress', () => {
  // 1. 기본 — value/max로 퍼센트·fill width 계산
  it('value/max로 퍼센트와 fill width를 계산한다', () => {
    const { container } = render(UiProgress, { props: { value: 28, max: 36, showValue: true } })
    // round(28/36*100) = 78
    expect(container.querySelector('.ui-progress__value')!.textContent).toBe('78%')
    const fill = container.querySelector('.ui-progress__fill') as HTMLElement
    expect(fill.style.width).toBe('78%')
  })

  // 2. value 클램프 — max 초과 시 100%, 음수는 0%
  it('value가 max를 넘으면 100%로, 음수면 0%로 클램프한다', () => {
    const over = render(UiProgress, { props: { value: 200, max: 100, showValue: true } })
    expect(over.container.querySelector('.ui-progress__value')!.textContent).toBe('100%')
    expect((over.container.querySelector('.ui-progress__fill') as HTMLElement).style.width).toBe('100%')

    const neg = render(UiProgress, { props: { value: -10, max: 100, showValue: true } })
    expect(neg.container.querySelector('.ui-progress__value')!.textContent).toBe('0%')
  })

  // 3. max=0 방어 — 0으로 나누지 않고 0%
  it('max가 0이면 0%로 처리한다(0 나눗셈 방어)', () => {
    const { container } = render(UiProgress, { props: { value: 5, max: 0, showValue: true } })
    expect(container.querySelector('.ui-progress__value')!.textContent).toBe('0%')
  })

  // 4. variant/size 클래스
  it('variant·size 클래스를 적용한다', () => {
    const { container } = render(UiProgress, { props: { value: 50, variant: 'success', size: 'lg' } })
    const el = container.querySelector('.ui-progress')!
    expect(el.classList.contains('variant-success')).toBe(true)
    expect(el.classList.contains('size-lg')).toBe(true)
  })

  // 5. aria — progressbar 값 바인딩
  it('role=progressbar + aria-value* 를 바인딩한다', () => {
    const { container } = render(UiProgress, { props: { value: 28, max: 36 } })
    const bar = container.querySelector('[role="progressbar"]')!
    expect(bar.getAttribute('aria-valuenow')).toBe('28')
    expect(bar.getAttribute('aria-valuemin')).toBe('0')
    expect(bar.getAttribute('aria-valuemax')).toBe('36')
  })

  // 6. showValue=false → 퍼센트 미표시 / default 슬롯 → caption 렌더
  it('showValue=false면 퍼센트 숨김, default 슬롯은 caption으로 렌더', () => {
    const { container } = render(UiProgress, {
      props: { value: 50 },
      slots: { default: '완료 5건 / 전체 10건' },
    })
    expect(container.querySelector('.ui-progress__value')).toBeNull()
    expect(container.querySelector('.ui-progress__caption')!.textContent).toContain('완료 5건 / 전체 10건')
  })
})
