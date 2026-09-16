import { render, fireEvent, cleanup } from '@testing-library/vue'
import { composeStories } from '@storybook/vue3'
import { afterEach, describe, expect, it, vi } from 'vitest'
import UiRate from './UiRate.vue'
import * as stories from './UiRate.stories'

const { Keyboard, Clearable } = composeStories(stories)
afterEach(() => { cleanup(); vi.restoreAllMocks() })

describe('UiRate', () => {
  it('Storybook 키보드 시나리오를 재사용한다', async () => {
    const { container } = render(Keyboard())
    await Keyboard.play!({ canvasElement: container })
  })
  it('같은 별을 다시 누르면 선택을 해제할 수 있다', async () => {
    const { container } = render(Clearable())
    await Clearable.play!({ canvasElement: container })
  })
  it('반별 포인터 미리보기는 값을 바꾸지 않고 클릭만 전달한다', async () => {
    const { container, emitted } = render(UiRate, { props: { modelValue: 1, allowHalf: true } })
    const star = container.querySelectorAll('.star')[3] as HTMLElement
    vi.spyOn(star, 'getBoundingClientRect').mockReturnValue({ left: 100, width: 32 } as DOMRect)
    // jsdom PointerEvent의 좌표 지원 차이를 피한다.
    await fireEvent(star, new MouseEvent('pointermove', { clientX: 105, bubbles: true }))
    expect((star.querySelector('.fill') as HTMLElement).style.width).toBe('50%')
    expect(emitted()['update:modelValue']).toBeUndefined()
    await fireEvent.pointerLeave(container.querySelector('.stars')!)
    expect((star.querySelector('.fill') as HTMLElement).style.width).toBe('0%')
    await fireEvent.click(star, { clientX: 105 })
    expect(emitted()['update:modelValue']).toEqual([[3.5]])
    expect(emitted().change).toEqual([[3.5]])
    await fireEvent.click(star, { clientX: 125 })
    expect(emitted().change[1]).toEqual([4])
  })
  it.each(['disabled', 'readonly'] as const)('%s 상태에서 입력과 Tab 진입을 막는다', async (state) => {
    const { container, emitted, getByRole } = render(UiRate, { props: { modelValue: 3, [state]: true } })
    const control = getByRole(state === 'readonly' ? 'img' : 'slider')
    expect(control.hasAttribute('tabindex')).toBe(false)
    await fireEvent.click(container.querySelector('.star')!)
    await fireEvent.keyDown(control, { key: 'ArrowRight' })
    expect(emitted()['update:modelValue']).toBeUndefined()
  })
  it('읽기 전용 평균과 외부 변경을 소수 비율로 표시한다', async () => {
    const { container, rerender, getByRole } = render(UiRate, { props: { modelValue: 4.5, readonly: true, label: '상품 평점' } })
    expect((container.querySelectorAll('.fill')[4] as HTMLElement).style.width).toBe('50%')
    expect(getByRole('img').getAttribute('aria-label')).toBe('상품 평점: 5점 만점에 4.5점')
    await rerender({ modelValue: 2.3 })
    expect(parseFloat((container.querySelectorAll('.fill')[2] as HTMLElement).style.width)).toBeCloseTo(30)
  })
  it.each([[10, 5], [-1, 0], [NaN, 0], [Infinity, 0]])('입력값 %s를 %s로 제한한다', (input, expected) => {
    const { getByRole, emitted } = render(UiRate, { props: { modelValue: input, max: 0 } })
    expect(getByRole('slider').getAttribute('aria-valuenow')).toBe(String(expected))
    expect(emitted()['update:modelValue']).toBeUndefined()
  })
  it('경계에서는 중복 이벤트가 없고 소수에서 올바른 단위로 이동한다', async () => {
    const { getByRole, emitted, rerender } = render(UiRate, { props: { modelValue: 5 } })
    await fireEvent.keyDown(getByRole('slider'), { key: 'ArrowRight' })
    expect(emitted().change).toBeUndefined()
    await rerender({ modelValue: 2.3, allowHalf: true })
    await fireEvent.keyDown(getByRole('slider'), { key: 'ArrowDown' })
    expect(emitted().change).toEqual([[2]])
  })
  it('name을 지정하면 폼 값을 전송하고 비활성 시 제외한다', async () => {
    const { container, rerender } = render(UiRate, { props: { name: 'rating', modelValue: 4.5, readonly: true } })
    const form = document.createElement('form')
    form.appendChild(container)
    expect(new FormData(form).get('rating')).toBe('4.5')
    await rerender({ disabled: true })
    expect(new FormData(form).has('rating')).toBe(false)
  })
})
