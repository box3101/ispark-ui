import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, watch } from 'vue'
import UiStepper from './UiStepper.vue'

const steps = [
  { id: 'input', label: '자료 입력' },
  { id: 'analysis', label: '요구사항 분석' },
  { id: 'strategy', label: '제안 전략' },
  { id: 'slides', label: '장표 구성' },
  { id: 'preview', label: '작성·미리보기' },
  { id: 'export', label: '검수·내보내기' },
]

const meta = {
  title: 'UI/UiStepper',
  component: UiStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: '단계 ID를 v-model로 제어합니다. variant: basic / line / tab / card. 이전 단계는 자동으로 완료 처리됩니다. steps의 completed로 개별 지정하거나 autoComplete=false로 자동 처리를 끌 수 있습니다. disabled 단계는 선택할 수 없으며 interactive=false는 읽기 전용입니다. change 이벤트는 (id, step)을 전달합니다. label 슬롯으로 라벨을 변경하고 --stepper-primary / --stepper-soft / --stepper-border CSS 변수로 색상을 지정할 수 있습니다.' } },
  },
  args: { steps, modelValue: 'analysis', variant: 'basic', interactive: true, autoComplete: true },
  argTypes: { variant: { control: 'inline-radio', options: ['basic', 'line', 'tab', 'card'] } },
  render: (args) => ({
    components: { UiStepper },
    setup() {
      const current = ref(args.modelValue)
      watch(() => args.modelValue, value => { current.value = value })
      return { args, current }
    },
    template: '<UiStepper v-bind="args" v-model="current" />',
  }),
} satisfies Meta<typeof UiStepper>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = { name: '기본형', args: { variant: 'basic' } }
export const Line: Story = { name: '연결선형', args: { variant: 'line' } }
export const Tab: Story = { name: '탭형', args: { variant: 'tab' } }
export const Card: Story = { name: '카드형', args: { variant: 'card' } }
export const AllVariants: Story = {
  name: '4종 비교',
  render: () => ({
    components: { UiStepper },
    setup: () => ({ steps, current: ref('analysis'), variants: [
      { value: 'basic', label: '01 · 기본형' },
      { value: 'line', label: '02 · 연결선형' },
      { value: 'tab', label: '03 · 탭형' },
      { value: 'card', label: '04 · 카드형' },
    ] }),
    template: `<div style="display:grid;gap:32px;padding:24px;background:#f6f8fc">
      <section v-for="variant in variants" :key="variant.value" style="min-width:0">
        <h3 style="margin:0 0 16px">{{ variant.label }}</h3>
        <UiStepper v-model="current" :steps="steps" :variant="variant.value" :aria-label="variant.label" />
      </section>
    </div>`,
  }),
}
export const Disabled: Story = {
  name: '완료·비활성·설명',
  args: { variant: 'card', autoComplete: false, steps: [
    { id: 'input', label: '자료 입력', completed: true, description: '입력 완료' },
    { id: 'analysis', label: '요구사항 분석', description: '내용을 확인해 주세요' },
    { id: 'export', label: '내보내기', disabled: true, description: '분석 완료 후 진행' },
  ] },
}
export const ReadOnly: Story = { name: '읽기 전용', args: { interactive: false, variant: 'line' } }
