import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { ref } from 'vue'
import UiTab from './UiTab.vue'
import type { TabItem } from './UiTab.vue'

const meta = {
  title: 'Components/UiTab',
  component: UiTab,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: `
ispark-ui 표준 탭 — 페이지/모달 내부 콘텐츠 네비게이션. underline 스타일 + 키보드 화살표 네비.

## API
- **\`modelValue\`** \`string\` — 현재 선택된 탭 value (v-model)
- **\`tabs\`** \`TabItem[]\` — 탭 정의 배열
- **\`size\`** \`'sm' | 'md' | 'lg'\` — sm(36px) / md(40px·기본) / lg(48px)
- **\`align\`** \`'left' | 'center' | 'right' | 'stretch'\` — center(기본 max-width 800)/left/right/stretch(균등 분할)
- **\`ariaLabel\`** \`string\` — \`<div role="tablist">\`의 aria-label

## TabItem
\`\`\`ts
interface TabItem {
  label: string
  value: string
  icon?: string       // ispark-ui 아이콘 클래스 (예: 'icon-edit')
  count?: number      // 우측 카운트 배지 (미확인 N건 등)
  disabled?: boolean
}
\`\`\`

## 이벤트
- \`update:modelValue\` — v-model
- \`change\` — 동일 payload 별도 emit

## 접근성
- \`role="tablist"\` + 각 탭에 \`role="tab"\` + \`aria-selected\` 자동
- \`disabled\` 시 \`aria-disabled\` + native disabled
- **키보드 네비**: ←/→/Home/End — 비활성 탭 자동 skip, 포커스+선택 동시 변경 (자동 활성화 패턴)
- \`tabindex\`: 활성 0 / 비활성 -1 (roving tabindex)
- \`:focus-visible\` outline 2px primary
- \`prefers-reduced-motion: reduce\` 시 transition 정지

## 디자인 토큰
- 하단 underline 2px primary 색
- count 배지: 활성 시 primary 색조, 비활성 시 회색 — Badge primary 0.12 alpha와 동일
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    align: { control: 'inline-radio', options: ['left', 'center', 'right', 'stretch'] },
    ariaLabel: { control: 'text' },
  },
} satisfies Meta<typeof UiTab>

export default meta
type Story = StoryObj<typeof meta>

const baseTabs: TabItem[] = [
  { label: '개요', value: 'overview' },
  { label: '활동', value: 'activity' },
  { label: '설정', value: 'settings' },
]

// ===== Stories =====

export const Playground: Story = {
  args: {
    tabs: baseTabs,
    modelValue: 'overview',
    size: 'md',
    align: 'left',
  },
  render: (args) => ({
    components: { UiTab },
    setup: () => {
      const cur = ref(args.modelValue)
      return { args, cur }
    },
    template: '<UiTab v-bind="args" v-model="cur" />',
  }),
}

// 기본 — center align (max-width 800px)
export const Default: Story = {
  args: {
    tabs: baseTabs,
    modelValue: 'overview',
  },
  render: (args) => ({
    components: { UiTab },
    setup: () => {
      const cur = ref(args.modelValue)
      return { args, cur }
    },
    template: '<UiTab v-bind="args" v-model="cur" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const tab = canvas.getByRole('tab', { name: '활동' })
    await userEvent.click(tab)
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('activity')
  },
}

// 아이콘 + 카운트 배지
export const WithIconAndCount: Story = {
  args: {
    tabs: [
      { label: '받은편지함', value: 'inbox', icon: 'icon-download', count: 12 },
      { label: '보낸편지함', value: 'sent', icon: 'icon-arrow-right', count: 3 },
      { label: '휴지통', value: 'trash', icon: 'icon-trashcan' },
    ],
    modelValue: 'inbox',
    align: 'left',
  },
  render: (args) => ({
    components: { UiTab },
    setup: () => {
      const cur = ref(args.modelValue)
      return { args, cur }
    },
    template: '<UiTab v-bind="args" v-model="cur" />',
  }),
}

// disabled 항목 + 키보드 네비
export const WithDisabledItem: Story = {
  args: {
    tabs: [
      { label: '개요', value: 'overview' },
      { label: '활동 (잠금)', value: 'activity', disabled: true },
      { label: '설정', value: 'settings' },
      { label: '권한 (잠금)', value: 'perm', disabled: true },
      { label: '로그', value: 'log' },
    ],
    modelValue: 'overview',
    align: 'left',
  },
  render: (args) => ({
    components: { UiTab },
    setup: () => {
      const cur = ref(args.modelValue)
      return { args, cur }
    },
    template: '<UiTab v-bind="args" v-model="cur" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const tablist = canvas.getByRole('tablist')
    // 첫 탭 클릭 → ArrowRight → 비활성 'activity' skip → 'settings'
    const first = canvas.getByRole('tab', { name: '개요' })
    await userEvent.click(first)
    await userEvent.keyboard('{ArrowRight}')
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('settings')
    // disabled 항목 클릭 무시
    const disabled = canvas.getByRole('tab', { name: /활동/ })
    await userEvent.click(disabled)
    const calls = (args['onUpdate:modelValue'] as any).mock.calls as string[][]
    // 마지막 호출이 'activity'가 아니어야 함
    await expect(calls[calls.length - 1][0]).not.toBe('activity')
  },
}

// 3가지 size 비교
export const AllSizes: Story = {
  render: () => ({
    components: { UiTab },
    setup: () => {
      const v1 = ref('a')
      const v2 = ref('a')
      const v3 = ref('a')
      const tabs = [
        { label: 'Alpha', value: 'a' },
        { label: 'Beta', value: 'b' },
        { label: 'Gamma', value: 'g' },
      ]
      return { v1, v2, v3, tabs }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: sm</h4><UiTab v-model="v1" :tabs="tabs" size="sm" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: md (기본)</h4><UiTab v-model="v2" :tabs="tabs" size="md" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: lg</h4><UiTab v-model="v3" :tabs="tabs" size="lg" align="left" /></div>
      </div>
    `,
  }),
}

// align 4종 비교
export const AllAlignments: Story = {
  render: () => ({
    components: { UiTab },
    setup: () => {
      const v = ref('a')
      const tabs = [
        { label: 'One', value: 'a' },
        { label: 'Two', value: 'b' },
        { label: 'Three', value: 'c' },
      ]
      return { v, tabs }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">left</h4><UiTab v-model="v" :tabs="tabs" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">center (기본, max-width 800)</h4><UiTab v-model="v" :tabs="tabs" align="center" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">right</h4><UiTab v-model="v" :tabs="tabs" align="right" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">stretch — 균등 분할</h4><UiTab v-model="v" :tabs="tabs" align="stretch" /></div>
      </div>
    `,
  }),
}

// 콘텐츠 영역과 연동 — 실 사용 패턴 (tabpanel)
export const WithContent: Story = {
  render: () => ({
    components: { UiTab },
    setup: () => {
      const cur = ref('overview')
      const tabs: TabItem[] = [
        { label: '개요', value: 'overview' },
        { label: '활동', value: 'activity', count: 5 },
        { label: '설정', value: 'settings' },
      ]
      return { cur, tabs }
    },
    template: `
      <div>
        <UiTab v-model="cur" :tabs="tabs" align="left" aria-label="프로필 섹션" />
        <div role="tabpanel" style="padding: 16px; min-height: 120px;">
          <div v-if="cur === 'overview'">
            <h3 style="margin: 0 0 8px;">개요</h3>
            <p style="color: #4d5462; font-size: 14px;">사용자 프로필 요약 정보가 표시됩니다.</p>
          </div>
          <div v-else-if="cur === 'activity'">
            <h3 style="margin: 0 0 8px;">최근 활동 (5건)</h3>
            <p style="color: #4d5462; font-size: 14px;">로그인, 문서 편집, 댓글 등 활동 내역.</p>
          </div>
          <div v-else>
            <h3 style="margin: 0 0 8px;">설정</h3>
            <p style="color: #4d5462; font-size: 14px;">알림, 비밀번호, 권한 등 환경 설정.</p>
          </div>
        </div>
      </div>
    `,
  }),
}
