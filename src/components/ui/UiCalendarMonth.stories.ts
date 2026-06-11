import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import { ref } from 'vue'
import UiCalendarMonth, { type CalendarMonthEvent } from './UiCalendarMonth.vue'

const meta = {
  title: 'Components/Display/UiCalendarMonth',
  component: UiCalendarMonth,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
이벤트 표시용 **월간 캘린더**. 단일/여러 날 일정을 받아 그리드에 막대로 그린다.
폼 입력용 \`UiDatePicker\`와 달리, 일정/할일/이슈 등을 달력에 시각화하는 용도.

## 핵심 — 여러 날 일정 "레인 고정"
여러 날 일정은 걸친 **모든 날에서 같은 줄(레인)** 을 차지해 가로로 끊김 없이 이어진다.
다른 일정이 많은 날에도 막대가 밀리지 않고, 빈 레인은 placeholder로 높이를 유지한다.
span/레인 계산은 컴포넌트 내부에서 처리하므로 consumer는 원본 \`start\`/\`end\`만 넘기면 된다.

## 정규화 이벤트 모델
\`\`\`ts
interface CalendarMonthEvent {
  id: string | number   // 여러 소스 합칠 땐 'todo-5'처럼 충돌 없는 값
  start: string         // 'YYYY-MM-DD'
  end?: string | null   // 없으면 단일일, 있으면 여러 날
  title: string
  color?: string        // 기본 var(--color-primary)
  allDay?: boolean
  meta?: unknown        // 도메인 데이터 passthrough (#event 슬롯에서 사용)
}
\`\`\`

## API
- **\`year\` / \`month\`** — 표시 연·월. \`v-model:year\` / \`v-model:month\` 지원(스와이프·전환 시 갱신)
- **\`events\`** \`CalendarMonthEvent[]\`
- **\`selectedDate\`** \`string\` — 선택 강조
- **\`today\`** \`string\` — 오늘 주입(미지정 시 실제 오늘)
- **\`maxLanes\`** \`number\` — 칸당 최대 막대 수(기본 3, 초과 시 +N)
- **\`swipeable\`** \`boolean\` — 좌우 스와이프 월 전환(기본 true)
- **\`showWeekdays\`** \`boolean\` — 요일 헤더(기본 true)
- **Emits** — \`select-date\`, \`select-event\`, \`change-month\`, \`update:year\`, \`update:month\`
- **Slot \`#event="{ event, span }"\`** — 막대 내용 커스텀(기본은 제목)
        `,
      },
    },
  },
  argTypes: {
    year: { control: 'number', table: { category: 'Date' } },
    month: { control: { type: 'number', min: 1, max: 12 }, table: { category: 'Date' } },
    selectedDate: { control: 'text', table: { category: 'Date' } },
    today: { control: 'text', table: { category: 'Date' } },
    maxLanes: { control: { type: 'number', min: 1, max: 6 }, table: { category: 'Appearance', defaultValue: { summary: '3' } } },
    swipeable: { control: 'boolean', table: { category: 'Behavior', defaultValue: { summary: 'true' } } },
    showWeekdays: { control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'true' } } },
  },
} satisfies Meta<typeof UiCalendarMonth>

export default meta
type Story = StoryObj<typeof meta>

const SAMPLE: CalendarMonthEvent[] = [
  { id: 1, start: '2026-06-09', title: '코드 리뷰' },
  { id: 2, start: '2026-06-12', end: '2026-06-15', title: '워크숍 출장', color: '#3b82f6' },
  { id: 3, start: '2026-06-13', title: '점심 약속', color: '#22c55e' },
  { id: 4, start: '2026-06-13', title: '치과', color: '#f59e0b' },
  { id: 5, start: '2026-06-13', title: '장보기', color: '#8b5cf6' },
  { id: 6, start: '2026-06-18', end: '2026-06-22', title: '프로젝트 스프린트', color: '#ec4899' },
  { id: 7, start: '2026-06-20', end: '2026-06-21', title: '주말 여행', color: '#ef4444' },
]

// ===== Stories =====

export const Playground: Story = {
  args: {
    year: 2026,
    month: 6,
    today: '2026-06-15',
    selectedDate: '2026-06-13',
    maxLanes: 3,
    swipeable: true,
    showWeekdays: true,
    events: SAMPLE,
  },
  render: (args) => ({
    components: { UiCalendarMonth },
    setup: () => ({ args }),
    template: '<div style="max-width:920px"><UiCalendarMonth v-bind="args" /></div>',
  }),
}

// 단일 + 여러 날 혼합, 겹치는 일정 레인 분리
export const SingleAndMultiDay: Story = {
  render: () => ({
    components: { UiCalendarMonth },
    setup: () => ({ events: SAMPLE }),
    template: '<div style="max-width:920px"><UiCalendarMonth :year="2026" :month="6" today="2026-06-15" :events="events" /></div>',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // 여러 날 막대 — 시작 칸에 제목
    await expect(canvas.getByText('워크숍 출장')).toBeTruthy()
    // 단일 막대
    await expect(canvas.getByText('코드 리뷰')).toBeTruthy()
  },
}

// 스와이프/전환 — v-model로 월 이동
export const Navigable: Story = {
  render: () => ({
    components: { UiCalendarMonth },
    setup() {
      const year = ref(2026)
      const month = ref(6)
      const go = (d: number) => {
        let m = month.value + d
        if (m < 1) { year.value--; m = 12 } else if (m > 12) { year.value++; m = 1 }
        month.value = m
      }
      return { year, month, events: SAMPLE, go }
    },
    template: `
      <div style="max-width:920px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
          <button @click="go(-1)">‹</button>
          <strong>{{ year }}년 {{ month }}월</strong>
          <button @click="go(1)">›</button>
          <span style="color:#9ca3af;font-size:12px">(좌우로 드래그해도 전환)</span>
        </div>
        <UiCalendarMonth v-model:year="year" v-model:month="month" today="2026-06-15" :events="events" />
      </div>
    `,
  }),
}

// #event 슬롯 — 막대 내용 커스텀 (아이콘/배지 등 도메인 렌더)
export const CustomEventSlot: Story = {
  render: () => ({
    components: { UiCalendarMonth },
    setup: () => ({ events: SAMPLE }),
    template: `
      <div style="max-width:920px">
        <UiCalendarMonth :year="2026" :month="6" today="2026-06-15" :events="events">
          <template #event="{ event, span }">
            <span style="font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              <template v-if="span === 'single' || span === 'start'">● {{ event.title }}</template>
            </span>
          </template>
        </UiCalendarMonth>
      </div>
    `,
  }),
}

// 빈 캘린더
export const Empty: Story = {
  render: () => ({
    components: { UiCalendarMonth },
    template: '<div style="max-width:920px"><UiCalendarMonth :year="2026" :month="6" today="2026-06-15" :events="[]" /></div>',
  }),
}
