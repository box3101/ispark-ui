import { render, screen, fireEvent } from '@testing-library/vue'
import { it, expect, vi } from 'vitest'
import UiAlert from './UiAlert.vue'
it('closes without a v-model binding and emits close', async () => {
  const onClose = vi.fn()
  render(UiAlert, { props: { title: '안내', dismissible: true, onClose } })
  expect(screen.getByRole('status')).toBeTruthy()
  await fireEvent.click(screen.getByRole('button', { name: '안내 닫기' }))
  expect(screen.queryByRole('status')).toBeNull()
  expect(onClose).toHaveBeenCalledOnce()
})
it('supports controlled visibility and an explicit urgent role', async () => {
  const { rerender } = render(UiAlert, { props: { modelValue: false, role: 'alert', description: '오류' } })
  expect(screen.queryByRole('alert')).toBeNull()
  await rerender({ modelValue: true })
  expect(screen.getByRole('alert').textContent).toContain('오류')
})
it('applies actions placement and elevated classes', () => {
  const { container } = render(UiAlert, {
    props: { title: '안내', actionsPlacement: 'bottom', elevated: true },
    slots: { actions: '<button>다시 시도</button>' },
  })
  const el = container.querySelector('.ui-alert')!
  expect(el.classList.contains('actions-bottom')).toBe(true)
  expect(el.classList.contains('has-actions')).toBe(true)
  expect(el.classList.contains('is-elevated')).toBe(true)
  expect(screen.getByRole('button', { name: '다시 시도' })).toBeTruthy()
})
