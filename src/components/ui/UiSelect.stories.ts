import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, screen, userEvent, within } from '@storybook/test'
import { ref } from 'vue'
import UiSelect from './UiSelect.vue'
import { INPUT_SIZES } from '@/design-tokens'

const meta = {
  title: 'Components/UiSelect',
  component: UiSelect,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: INPUT_SIZES,
      description: 'sm(28px) / md(32px·기본) / lg(40px) / auth(44px·로그인) — 공용 토큰',
    },
    shape: {
      control: 'inline-radio',
      options: ['rounded', 'pill'],
      description: 'rounded(기본 6px) / pill(완전 라운드)',
    },
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
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
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
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
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
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
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
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
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
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
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
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
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
    setup: () => {
      const vSm = ref('')
      const vMd = ref('')
      const vLg = ref('')
      const vAuth = ref('')
      return { args, sampleOptions, vSm, vMd, vLg, vAuth }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiSelect v-bind="args" v-model="vSm" :options="sampleOptions" size="sm" placeholder="sm 28px" />
        <UiSelect v-bind="args" v-model="vMd" :options="sampleOptions" size="md" placeholder="md 32px" />
        <UiSelect v-bind="args" v-model="vLg" :options="sampleOptions" size="lg" placeholder="lg 40px" />
        <UiSelect v-bind="args" v-model="vAuth" :options="sampleOptions" size="auth" placeholder="auth 44px" />
      </div>
    `,
  }),
}

export const Shapes: Story = {
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const vRounded = ref('')
      const vPill = ref('')
      return { args, sampleOptions, vRounded, vPill }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiSelect v-bind="args" v-model="vRounded" :options="sampleOptions" shape="rounded" placeholder="rounded" />
        <UiSelect v-bind="args" v-model="vPill" :options="sampleOptions" shape="pill" placeholder="pill" />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    placeholder: '비활성',
    disabled: true,
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    await expect(trigger.hasAttribute('disabled') || trigger.getAttribute('aria-disabled') === 'true').toBe(true)
  },
}

export const DisabledOption: Story = {
  args: {
    options: [
      { label: '활성', value: 'on' },
      { label: '비활성', value: 'off', disabled: true },
    ],
    placeholder: '선택',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)
    const disabledOpt = await screen.findByRole('option', { name: '비활성' })
    // radix-vue가 [data-disabled] 속성 부여
    await expect(disabledOpt.hasAttribute('data-disabled')).toBe(true)
  },
}

export const LongList: Story = {
  args: {
    options: Array.from({ length: 30 }, (_, i) => ({
      label: `옵션 ${i + 1}`,
      value: `opt-${i + 1}`,
    })),
    placeholder: '30개 중 선택',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
}
