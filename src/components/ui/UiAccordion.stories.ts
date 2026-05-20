import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { ref } from 'vue'
import UiAccordion from './UiAccordion.vue'
import type { AccordionItemDef } from './UiAccordion.vue'

const meta = {
  title: 'Components/Display/UiAccordion',
  component: UiAccordion,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: `
ispark-ui 표준 아코디언 — radix-vue 기반. FAQ/설정 그룹/긴 콘텐츠 접기에 사용.

## API
- **\`items\`** \`AccordionItemDef[]\` — 항목 배열 (간편 사용)
- **\`type\`** \`'single' | 'multiple'\` — single(기본·하나만 열림) / multiple(여러 개 동시)
- **\`modelValue\`** \`string | string[]\` — v-model (single=string, multiple=string[])
- **\`defaultValue\`** \`string | string[]\` — 초기 열림 상태 (uncontrolled)
- **\`collapsible\`** \`boolean\` — single에서 열린 항목 다시 클릭 시 닫기 가능 (기본 true)
- **\`disabled\`** \`boolean\` — 전체 비활성
- **\`size\`** \`'sm' | 'md' | 'lg'\` — md 기본

## AccordionItemDef
\`\`\`ts
interface AccordionItemDef {
  value: string      // 고유 식별자
  title: string      // 헤더 텍스트
  content?: string   // 본문 (커스텀은 #content 슬롯)
  disabled?: boolean
}
\`\`\`

## 슬롯
- \`#header="{ item }"\` — 헤더 커스터마이즈 (chevron은 유지)
- \`#content="{ item }"\` — 본문 커스터마이즈
- \`#default\` — items 미사용 시 \`<AccordionItem>\` 직접 작성

## 이벤트
- \`update:modelValue\` — v-model
- \`change\` — 동일 payload 별도 emit

## 접근성 (radix-vue 자동)
- 헤더 \`<h3>\` + \`role="button"\` + \`aria-expanded\` / \`aria-controls\`
- 키보드: \`Space\`/\`Enter\` 토글, \`↓\`/\`↑\` 항목 이동, \`Home\`/\`End\` 처음/끝
- \`disabled\` 항목 키보드 skip
- \`prefers-reduced-motion: reduce\` 시 애니메이션 정지

## 디자인 토큰
- 상단·항목 사이 \`1px solid $color-border\` 구분선
- 열린 헤더 \`var(--color-primary)\` + bold
- chevron 180° 회전 + slide down/up 애니메이션
        `,
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['single', 'multiple'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    collapsible: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof UiAccordion>

export default meta
type Story = StoryObj<typeof meta>

const faqItems: AccordionItemDef[] = [
  {
    value: 'q1',
    title: 'ispark-ui는 어디서 시작됐나요?',
    content: 'team_agent_front 프로젝트에서 10회 이상 사용된 핵심 UI 컴포넌트를 분리해 만든 디자인 시스템 라이브러리입니다.',
  },
  {
    value: 'q2',
    title: '왜 적게 가져가나요?',
    content: '"라이브러리는 적게, 강하게." 5회 미만 사용되는 컴포넌트는 옮기지 않습니다. 라이브러리 부담만 늘기 때문입니다.',
  },
  {
    value: 'q3',
    title: '스토리북은 어떻게 쓰나요?',
    content: 'CSF3 + play 함수로 작성합니다. 스토리 하나가 문서 + 시각 회귀 + 단위 테스트 3역할을 합니다.',
  },
]

// ===== Stories =====

export const Playground: Story = {
  args: {
    items: faqItems,
    type: 'single',
    defaultValue: 'q1',
    collapsible: true,
    size: 'md',
  },
  render: (args) => ({
    components: { UiAccordion },
    setup: () => ({ args }),
    template: '<UiAccordion v-bind="args" />',
  }),
}

// 기본 — single, collapsible, q1 펼침
export const Default: Story = {
  args: {
    items: faqItems,
    type: 'single',
    defaultValue: 'q1',
  },
  render: (args) => ({
    components: { UiAccordion },
    setup: () => ({ args }),
    template: '<UiAccordion v-bind="args" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // q2 클릭 → q1 닫히고 q2 열림
    const q2 = canvas.getByRole('button', { name: /왜 적게/ })
    await userEvent.click(q2)
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('q2')
  },
}

// Single — collapsible=false 시 한 번 열면 다른 항목으로만 전환됨
export const SingleNotCollapsible: Story = {
  args: {
    items: faqItems,
    type: 'single',
    defaultValue: 'q1',
    collapsible: false,
  },
  render: (args) => ({
    components: { UiAccordion },
    setup: () => ({ args }),
    template: '<UiAccordion v-bind="args" />',
  }),
}

// Multiple — 여러 항목 동시 열림
export const Multiple: Story = {
  args: {
    items: faqItems,
    type: 'multiple',
    defaultValue: ['q1', 'q3'],
  },
  render: (args) => ({
    components: { UiAccordion },
    setup: () => ({ args }),
    template: '<UiAccordion v-bind="args" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // q2 추가로 열기 → 3개 모두 열림
    const q2 = canvas.getByRole('button', { name: /왜 적게/ })
    await userEvent.click(q2)
    await expect(args['onUpdate:modelValue']).toHaveBeenCalled()
  },
}

// Disabled 개별 항목
export const WithDisabledItem: Story = {
  args: {
    items: [
      { value: 'a', title: '활성 항목 A', content: 'A 본문' },
      { value: 'b', title: '비활성 항목 B (잠금)', content: 'B 본문', disabled: true },
      { value: 'c', title: '활성 항목 C', content: 'C 본문' },
    ],
    type: 'single',
  },
  render: (args) => ({
    components: { UiAccordion },
    setup: () => ({ args }),
    template: '<UiAccordion v-bind="args" />',
  }),
}

// 전체 disabled
export const AllDisabled: Story = {
  args: {
    items: faqItems,
    type: 'single',
    disabled: true,
  },
  render: (args) => ({
    components: { UiAccordion },
    setup: () => ({ args }),
    template: '<UiAccordion v-bind="args" />',
  }),
}

// 3가지 size 비교
export const AllSizes: Story = {
  render: () => ({
    components: { UiAccordion },
    setup: () => {
      const items: AccordionItemDef[] = [
        { value: 'one', title: '첫 번째 질문', content: '첫 번째 답변입니다.' },
        { value: 'two', title: '두 번째 질문', content: '두 번째 답변입니다.' },
      ]
      return { items }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: sm</h4><UiAccordion :items="items" size="sm" default-value="one" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: md (기본)</h4><UiAccordion :items="items" size="md" default-value="one" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: lg</h4><UiAccordion :items="items" size="lg" default-value="one" /></div>
      </div>
    `,
  }),
}

// v-model controlled — 외부 상태 동기화
export const Controlled: Story = {
  render: () => ({
    components: { UiAccordion },
    setup: () => {
      const opened = ref<string | undefined>('q1')
      return { opened, faqItems }
    },
    template: `
      <div>
        <div style="margin-bottom: 12px; font-size: 13px; color: #6f7a93;">
          현재 열린 항목: <strong style="color: #3c69db;">{{ opened ?? '(없음)' }}</strong>
        </div>
        <UiAccordion v-model="opened" :items="faqItems" />
      </div>
    `,
  }),
}

// 슬롯 — 헤더/본문 커스터마이즈
export const WithCustomContent: Story = {
  render: () => ({
    components: { UiAccordion },
    setup: () => {
      const items: AccordionItemDef[] = [
        { value: 'plan', title: '플랜', content: '' },
        { value: 'team', title: '팀', content: '' },
        { value: 'billing', title: '결제', content: '' },
      ]
      return { items }
    },
    template: `
      <UiAccordion :items="items" type="single" default-value="plan">
        <template #header="{ item }">
          <span style="display: inline-flex; align-items: center; gap: 8px;">
            <span style="width: 6px; height: 6px; border-radius: 999px; background: #3c69db;"></span>
            {{ item.title }}
          </span>
        </template>
        <template #content="{ item }">
          <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
            <li v-if="item.value === 'plan'">현재 플랜: Pro</li>
            <li v-if="item.value === 'plan'">다음 결제일: 2026-06-12</li>
            <li v-if="item.value === 'team'">구성원 5명</li>
            <li v-if="item.value === 'team'">초대 대기 2명</li>
            <li v-if="item.value === 'billing'">VISA •••• 4242</li>
          </ul>
        </template>
      </UiAccordion>
    `,
  }),
}
