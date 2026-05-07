import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
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
}
