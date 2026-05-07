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

export const Error: Story = {
  args: {
    options: sampleOptions,
    label: '카테고리',
    error: true,
    placeholder: '선택해주세요',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    // border 색상은 시각 확인이지만 클래스 적용은 검증 가능
    await expect(trigger.className).toContain('is-error')
    await expect(trigger.getAttribute('aria-invalid')).toBe('true')
    // errorMessage 없으면 aria-describedby 없어야 함 (radix-vue 자동 부여 외)
    // radix-vue가 listbox 연결로 aria-describedby를 자체 부여할 수 있음 → 우리 errorId가 포함되지 않는지 검증
    const ariaDesc = trigger.getAttribute('aria-describedby') || ''
    await expect(ariaDesc.includes('-error')).toBe(false)
    await expect(ariaDesc.includes('-desc')).toBe(false)
  },
}

export const ErrorMessage: Story = {
  args: {
    options: sampleOptions,
    label: '카테고리',
    errorMessage: '필수 입력입니다',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const errorEl = canvas.getByRole('alert')
    await expect(errorEl.textContent).toContain('필수 입력입니다')
    const trigger = canvas.getByRole('combobox')
    await expect(trigger.getAttribute('aria-invalid')).toBe('true')
    await expect(trigger.getAttribute('aria-describedby')).toBe(errorEl.getAttribute('id'))
  },
}

export const Desc: Story = {
  args: {
    options: sampleOptions,
    label: '카테고리',
    desc: '하나만 선택할 수 있습니다',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const descEl = canvas.getByText('하나만 선택할 수 있습니다')
    const trigger = canvas.getByRole('combobox')
    await expect(trigger.getAttribute('aria-describedby')).toBe(descEl.getAttribute('id'))
  },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { UiSelect },
    setup: () => ({ args, sampleOptions }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiSelect v-bind="args" :options="sampleOptions" size="sm" placeholder="sm 28px" />
        <UiSelect v-bind="args" :options="sampleOptions" size="md" placeholder="md 32px" />
        <UiSelect v-bind="args" :options="sampleOptions" size="lg" placeholder="lg 40px" />
        <UiSelect v-bind="args" :options="sampleOptions" size="auth" placeholder="auth 44px" />
      </div>
    `,
  }),
}

export const Shapes: Story = {
  render: (args) => ({
    components: { UiSelect },
    setup: () => ({ args, sampleOptions }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiSelect v-bind="args" :options="sampleOptions" shape="rounded" placeholder="rounded" />
        <UiSelect v-bind="args" :options="sampleOptions" shape="pill" placeholder="pill" />
      </div>
    `,
  }),
}
