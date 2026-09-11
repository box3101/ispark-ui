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
