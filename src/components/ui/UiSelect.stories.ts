import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, screen, userEvent, within } from '@storybook/test'
import UiSelect from './UiSelect.vue'

const meta = {
  title: 'Components/UiSelect',
  component: UiSelect,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
  },
} satisfies Meta<typeof UiSelect>

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions = [
  { label: '옵션 A', value: 'a' },
  { label: '옵션 B', value: 'b' },
  { label: '옵션 C', value: 'c' },
]

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: '선택해주세요',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // radix-vue Trigger는 role=combobox
    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)
    // Portal은 body 직속 → screen 사용 필수
    const optB = await screen.findByRole('option', { name: '옵션 B' })
    await userEvent.click(optB)
    await expect(args.onChange).toHaveBeenCalledWith('b')
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('b')
  },
}

export const WithLabel: Story = {
  args: {
    options: sampleOptions,
    label: '카테고리',
    placeholder: '카테고리 선택',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('카테고리')
    const trigger = canvas.getByRole('combobox')
    // label htmlFor와 trigger id 매칭
    await expect(label.getAttribute('for')).toBe(trigger.getAttribute('id'))
  },
}

export const Required: Story = {
  args: {
    options: sampleOptions,
    label: '필수 항목',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // label은 "필수 항목" 텍스트 + 별도 <span>에 *. label 전체를 textContent로 검증
    const labelEl = canvas.getByText(/필수 항목/)
    await expect(labelEl.textContent).toContain('*')
    const trigger = canvas.getByRole('combobox')
    await expect(trigger.getAttribute('aria-required')).toBe('true')
  },
}
