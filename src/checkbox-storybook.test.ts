import { render, fireEvent } from '@testing-library/vue'
import { it, expect, vi } from 'vitest'
import UiCheckbox from './components/ui/UiCheckbox.vue'
import { configureStoryIds } from '../.storybook/vue-id-prefix'

it('keeps checkbox labels independent across inline Storybook roots', async () => {
  const first = vi.fn()
  const second = vi.fn()
  const global = { plugins: [configureStoryIds] }
  const a = render(UiCheckbox, { global, props: { modelValue: false, label: 'First', 'onUpdate:modelValue': first } })
  const b = render(UiCheckbox, { global, props: { modelValue: false, label: 'Second', 'onUpdate:modelValue': second } })
  expect(a.container.querySelector('input')?.id).not.toBe(b.container.querySelector('input')?.id)
  await fireEvent.click(b.container.querySelector('label')!)
  expect(second).toHaveBeenCalledWith(true)
  expect(first).not.toHaveBeenCalled()
})
