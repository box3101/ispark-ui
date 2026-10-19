import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import UiStepper from './UiStepper.vue'

const steps = [{ id: 'a', label: '입력' }, { id: 'b', label: '분석' }, { id: 'c', label: '완료', disabled: true }]

describe('UiStepper', () => {
  it.each(['basic', 'line', 'tab', 'card'] as const)('%s: 현재 단계 및 선택 이벤트', async variant => {
    const update = vi.fn()
    render(UiStepper, { props: { steps, modelValue: 'b', variant, 'onUpdate:modelValue': update } })
    expect(screen.getByRole('button', { name: '분석' }).getAttribute('aria-current')).toBe('step')
    await fireEvent.click(screen.getByRole('button', { name: '입력 완료' }))
    expect(update).toHaveBeenCalledWith('a')
    await fireEvent.click(screen.getByRole('button', { name: '분석' }))
    await fireEvent.click(screen.getByRole('button', { name: '완료' }))
    expect(update).toHaveBeenCalledTimes(1)
  })
  it('완료 상태를 명시하면 자동 완료보다 우선한다', () => {
    render(UiStepper, { props: { steps: [{ id: 'a', label: '입력', completed: false }, steps[1]], modelValue: 'b' } })
    expect(screen.getByRole('button', { name: '입력' })).toBeTruthy()
  })
  it('읽기 전용에서는 조작 버튼을 만들지 않는다', () => {
    render(UiStepper, { props: { steps, modelValue: 'b', interactive: false } })
    expect(screen.queryAllByRole('button')).toHaveLength(0)
    expect(screen.getByRole('navigation')).toBeTruthy()
  })
})
