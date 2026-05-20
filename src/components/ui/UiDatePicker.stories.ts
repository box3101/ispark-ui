import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { CalendarDate, CalendarDateTime, type DateValue } from '@internationalized/date'
import UiDatePicker from './UiDatePicker.vue'

const meta = {
  title: 'Components/Form/UiDatePicker',
  component: UiDatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
radix-vue \`DatePicker\` + \`@internationalized/date\` 기반.

## type

- **\`date\`** — 날짜만 (기본)
- **\`datetime\`** — 날짜 + 시간 (HH:MM, 화살표 키 증감)
- **\`month\`** — 연/월만 (월 grid 패널)

## modelValue

\`DateValue\` (CalendarDate 또는 CalendarDateTime). v-model 양방향.

\`\`\`ts
import { CalendarDate, CalendarDateTime } from '@internationalized/date'
const date = ref<DateValue>(new CalendarDate(2026, 5, 20))
const dt = ref<DateValue>(new CalendarDateTime(2026, 5, 20, 14, 30))
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['date', 'datetime', 'month'],
      description: 'date(기본) / datetime(날짜+시간) / month(연/월만)',
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'xs(24) / sm(28·기본) / md(32) / lg(40)',
    },
    disabled: { control: 'boolean' },
    locale: { control: 'text', description: '기본 ko-KR' },
  },
} satisfies Meta<typeof UiDatePicker>

export default meta
type Story = StoryObj<typeof meta>

// 캘린더 팝오버 공간 확보용 wrapper
const WRAP = 'padding: 0 20px 280px; max-width: 360px;'

// ===== Playground =====
export const Playground: Story = {
  args: { type: 'date', size: 'sm', disabled: false },
  render: (args) => ({
    components: { UiDatePicker },
    setup: () => {
      const value = ref<DateValue>()
      return { args, value }
    },
    template: `<div style="${WRAP}"><UiDatePicker v-bind="args" v-model="value" /></div>`,
  }),
}

// ===== Date — 기본 (값 있음) =====
export const DateOnly: Story = {
  name: '날짜 (date)',
  render: () => ({
    components: { UiDatePicker },
    setup: () => {
      const value = ref<DateValue>(new CalendarDate(2026, 5, 20))
      return { value }
    },
    template: `<div style="${WRAP}"><UiDatePicker v-model="value" type="date" /></div>`,
  }),
}

// ===== DateTime =====
export const DateTime: Story = {
  name: '날짜+시간 (datetime)',
  render: () => ({
    components: { UiDatePicker },
    setup: () => {
      const value = ref<DateValue>(new CalendarDateTime(2026, 5, 20, 14, 30))
      return { value }
    },
    template: `<div style="${WRAP}; max-width: 480px;"><UiDatePicker v-model="value" type="datetime" /></div>`,
  }),
}

// ===== Month =====
export const Month: Story = {
  name: '연/월 (month)',
  render: () => ({
    components: { UiDatePicker },
    setup: () => {
      const value = ref<DateValue>(new CalendarDate(2026, 5, 1))
      return { value }
    },
    template: `<div style="${WRAP}"><UiDatePicker v-model="value" type="month" /></div>`,
  }),
}

// ===== All Sizes =====
export const AllSizes: Story = {
  name: '사이즈 (xs/sm/md/lg)',
  render: () => ({
    components: { UiDatePicker },
    setup: () => {
      const a = ref<DateValue>(new CalendarDate(2026, 5, 20))
      const b = ref<DateValue>(new CalendarDate(2026, 5, 20))
      const c = ref<DateValue>(new CalendarDate(2026, 5, 20))
      const d = ref<DateValue>(new CalendarDate(2026, 5, 20))
      return { a, b, c, d }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 0 20px 280px; max-width: 300px;">
        <UiDatePicker v-model="a" size="xs" />
        <UiDatePicker v-model="b" size="sm" />
        <UiDatePicker v-model="c" size="md" />
        <UiDatePicker v-model="d" size="lg" />
      </div>
    `,
  }),
}

// ===== Disabled =====
export const Disabled: Story = {
  render: () => ({
    components: { UiDatePicker },
    setup: () => ({ value: ref<DateValue>(new CalendarDate(2026, 5, 20)) }),
    template: `<div style="${WRAP}"><UiDatePicker v-model="value" disabled /></div>`,
  }),
}

// ===== MinMax — 선택 가능 범위 제한 =====
export const MinMax: Story = {
  name: '범위 제한 (min/max)',
  render: () => ({
    components: { UiDatePicker },
    setup: () => {
      const value = ref<DateValue>()
      // 이번 달 1일 ~ 이번 달 말일만 선택 가능
      const now = new Date()
      const min = new CalendarDate(now.getFullYear(), now.getMonth() + 1, 1)
      const max = new CalendarDate(now.getFullYear(), now.getMonth() + 1, 28)
      return { value, min, max }
    },
    template: `
      <div style="${WRAP}">
        <p style="margin: 0 0 8px; font-size: 13px; color: #6f7a93;">이번 달 1~28일만 선택 가능</p>
        <UiDatePicker v-model="value" :min-value="min" :max-value="max" />
      </div>
    `,
  }),
}

// ===== Showcase — Introduction 카드 임베드용 (값 있음, 작게) =====
export const Showcase: Story = {
  name: 'Showcase (preview)',
  render: () => ({
    components: { UiDatePicker },
    setup: () => ({ value: ref<DateValue>(new CalendarDate(2026, 5, 20)) }),
    template: `
      <div style="display: flex; justify-content: center; align-items: center; padding: 16px; max-width: 260px; margin: 0 auto;">
        <UiDatePicker v-model="value" size="sm" />
      </div>
    `,
  }),
  parameters: {
    docs: { disable: true },
  },
}
