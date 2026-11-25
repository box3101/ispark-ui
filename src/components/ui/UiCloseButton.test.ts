import { render, screen, fireEvent } from '@testing-library/vue'
import { it, expect, vi } from 'vitest'
import UiCloseButton from './UiCloseButton.vue'
it('renders a neutral close button and emits click', async () => {
  const onClick = vi.fn()
  const { container } = render(UiCloseButton, { props: { onClick } })
  const button = screen.getByRole('button', { name: '닫기' })
  expect(container.querySelector('.ui-close-button')!.classList.contains('tone-neutral')).toBe(true)
  await fireEvent.click(button)
  expect(onClick).toHaveBeenCalledOnce()
})
it('supports tone, size, label and disabled', async () => {
  const onClick = vi.fn()
  render(UiCloseButton, { props: { tone: 'inherit', size: 'sm', ariaLabel: '배너 닫기', disabled: true, onClick } })
  const button = screen.getByRole('button', { name: '배너 닫기' })
  expect(button.classList.contains('tone-inherit')).toBe(true)
  expect(button.classList.contains('size-sm')).toBe(true)
  await fireEvent.click(button)
  expect(onClick).not.toHaveBeenCalled()
})
