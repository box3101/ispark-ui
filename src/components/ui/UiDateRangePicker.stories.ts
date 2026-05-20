import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { CalendarDate } from '@internationalized/date'
import UiDateRangePicker, { type DateRange } from './UiDateRangePicker.vue'

const meta = {
  title: 'Components/Form/UiDateRangePicker',
  component: UiDateRangePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
radix-vue \`DateRangePicker\` + \`@internationalized/date\` 기반. 시작일~종료일 범위 선택.

## API

\`\`\`ts
import { UiDateRangePicker, type DateRange } from 'ispark-ui'
import { CalendarDate } from '@internationalized/date'

const range = ref<DateRange>({
  start: new CalendarDate(2026, 5, 20),
  end: new CalendarDate(2026, 5, 27),
})
\`\`\`

\`\`\`vue
<UiDateRangePicker v-model="range" />
<UiDateRangePicker v-model="range" size="md" :min-value="..." :max-value="..." disabled />
\`\`\`

## 동작
- 한 줄 input field에 [시작 segments] ~ [종료 segments] 형태
- 트리거 클릭 → 단일 month 캘린더
- 첫 클릭 = 시작일, 두 번째 클릭 = 종료일 (사이 범위 자동 하이라이트)
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    locale: { control: 'text', description: '기본 ko-KR' },
  },
} satisfies Meta<typeof UiDateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

const WRAP = 'padding: 0 20px 320px; max-width: 460px;'

// ===== Playground =====
export const Playground: Story = {
  args: { size: 'sm', disabled: false },
  render: (args) => ({
    components: { UiDateRangePicker },
    setup: () => {
      const value = ref<DateRange>({ start: undefined, end: undefined })
      return { args, value }
    },
    template: `<div style="${WRAP}"><UiDateRangePicker v-bind="args" v-model="value" /></div>`,
  }),
}

// ===== Default — 값 있음 =====
export const Default: Story = {
  render: () => ({
    components: { UiDateRangePicker },
    setup: () => {
      const value = ref<DateRange>({
        start: new CalendarDate(2026, 5, 20),
        end: new CalendarDate(2026, 5, 27),
      })
      return { value }
    },
    template: `<div style="${WRAP}"><UiDateRangePicker v-model="value" /></div>`,
  }),
}

// ===== AllSizes =====
export const AllSizes: Story = {
  name: '사이즈 (xs/sm/md/lg)',
  render: () => ({
    components: { UiDateRangePicker },
    setup: () => {
      const mk = () =>
        ref<DateRange>({
          start: new CalendarDate(2026, 5, 20),
          end: new CalendarDate(2026, 5, 27),
        })
      return { a: mk(), b: mk(), c: mk(), d: mk() }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 0 20px 320px; max-width: 460px;">
        <UiDateRangePicker v-model="a" size="xs" />
        <UiDateRangePicker v-model="b" size="sm" />
        <UiDateRangePicker v-model="c" size="md" />
        <UiDateRangePicker v-model="d" size="lg" />
      </div>
    `,
  }),
}

// ===== Disabled =====
export const Disabled: Story = {
  render: () => ({
    components: { UiDateRangePicker },
    setup: () => ({
      value: ref<DateRange>({
        start: new CalendarDate(2026, 5, 20),
        end: new CalendarDate(2026, 5, 27),
      }),
    }),
    template: `<div style="${WRAP}"><UiDateRangePicker v-model="value" disabled /></div>`,
  }),
}

// ===== MinMax =====
export const MinMax: Story = {
  name: '범위 제한 (min/max)',
  render: () => ({
    components: { UiDateRangePicker },
    setup: () => {
      const value = ref<DateRange>({ start: undefined, end: undefined })
      const now = new Date()
      const min = new CalendarDate(now.getFullYear(), now.getMonth() + 1, 1)
      const max = new CalendarDate(now.getFullYear(), now.getMonth() + 1, 28)
      return { value, min, max }
    },
    template: `
      <div style="${WRAP}">
        <p style="margin: 0 0 8px; font-size: 13px; color: #6f7a93;">이번 달 1~28일만 선택 가능</p>
        <UiDateRangePicker v-model="value" :min-value="min" :max-value="max" />
      </div>
    `,
  }),
}

// ===== Showcase — Introduction 카드 임베드용 =====
export const Showcase: Story = {
  name: 'Showcase (preview)',
  render: () => ({
    components: { UiDateRangePicker },
    setup: () => ({
      value: ref<DateRange>({
        start: new CalendarDate(2026, 5, 20),
        end: new CalendarDate(2026, 5, 27),
      }),
    }),
    template: `
      <div style="display: flex; justify-content: center; align-items: center; padding: 16px;">
        <UiDateRangePicker v-model="value" size="sm" />
      </div>
    `,
  }),
  parameters: {
    docs: { disable: true },
  },
}
