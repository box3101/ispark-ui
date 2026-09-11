import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import UiBadge from './UiBadge.vue'
import UiIcon from './UiIcon.vue'

const meta = {
  title: 'Components/Display/UiBadge',
  component: UiBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
짧은 라벨/상태 표시 컴포넌트. 시맨틱 6종 variant + 동적 \`colorHex\`로 도메인 특수 색까지 커버.

## 시맨틱 variant 6종
- **\`default\`** — 중립/카테고리 표기 (회색)
- **\`primary\`** — 정보/일반 강조 (테마 primary 색)
- **\`info\`** — 정보 상태 (파랑)
- **\`success\`** — 정상/완료 (초록)
- **\`warning\`** — 점검/주의 (주황)
- **\`danger\`** — 에러/위험 (빨강)

도메인 특수 색(브랜드/카테고리별 컬러칩 등)은 시맨틱 대신 \`colorHex\` prop 사용.

## API
- **\`variant\`** \`BadgeVariant\` — 6종 시맨틱. 기본 \`default\`
- **\`size\`** \`'xs' | 'sm' | 'md' | 'lg'\` — 20 / 22 / 24 / 26px. 기본 \`md\`
- **\`iconOnly\`** \`boolean\` — 텍스트 미렌더, 정사각형. \`#icon-left\` 또는 \`#icon-right\` 슬롯과 조합
- **\`colorHex\`** \`string\` — 6/3자리 hex(\`#22c55e\` 등). variant 색 무시하고 동적 컬러 (text + light tint bg)
- **\`bgAlpha\`** \`number\` — \`colorHex\` 사용 시 배경 투명도. 기본 \`0.12\`
- **Slots** — \`default\`(텍스트) / \`icon-left\`, \`icon-right\`(아이콘, aria-hidden 자동)

## 디자인 패턴
- 기본은 24px 높이·12px 글자·6px 모서리. shape="pill"로 알약형 선택.
- dot은 상태 점 표시. 왼쪽 아이콘 슬롯이 있으면 아이콘을 우선합니다.
- 아이콘 전용 배지는 의미를 전달하도록 aria-label과 role=img를 지정하세요.
- 연한 배경과 짙은 글자로 상태를 구분합니다. colorHex는 bgAlpha로 배경 투명도를 조절합니다.
        `,
      },
    },
  },
  argTypes: {
    shape: { control: 'inline-radio', options: ['rounded', 'pill'] },
    dot: { control: 'boolean' },
    variant: {
      control: 'inline-radio',
      options: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
      description: '시맨틱 variant. 도메인 특수 색은 colorHex 사용.',
      table: {
        category: 'Appearance',
        type: { summary: "'default' | 'primary' | 'success' | 'warning' | 'danger'" },
        defaultValue: { summary: "'default'" },
      },
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'xs(20px) / sm(22px) / md(24px·기본) / lg(26px)',
      table: {
        category: 'Appearance',
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    iconOnly: {
      control: 'boolean',
      description: '아이콘 only 모드 — 정사각형, 텍스트 미렌더. icon-left/icon-right 슬롯과 조합.',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    colorHex: {
      control: 'color',
      description: '6/3자리 hex. variant 무시하고 동적 컬러 적용 (text + light tint bg).',
      table: {
        category: 'Custom Color',
        type: { summary: 'string' },
      },
    },
    bgAlpha: {
      control: { type: 'number', min: 0, max: 1, step: 0.02 },
      description: 'colorHex 사용 시 배경 투명도. 0~1.',
      table: {
        category: 'Custom Color',
        type: { summary: 'number' },
        defaultValue: { summary: '0.12' },
      },
    },
  },
} satisfies Meta<typeof UiBadge>

export default meta
type Story = StoryObj<typeof meta>

// ===== Stories =====

export const Playground: Story = {
  args: {
    variant: 'success',
    size: 'md',
    iconOnly: false,
  },
  render: (args) => ({
    components: { UiBadge, UiIcon },
    setup: () => ({ args }),
    template: '<UiBadge v-bind="args">정상</UiBadge>',
  }),
}

// 5종 variant 한 줄 비교
export const AllVariants: Story = {
  render: () => ({
    components: { UiBadge, UiIcon },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiBadge variant="default">기본</UiBadge>
        <UiBadge variant="primary">강조</UiBadge><UiBadge variant="info">정보</UiBadge>
        <UiBadge variant="success">정상</UiBadge>
        <UiBadge variant="warning">점검</UiBadge>
        <UiBadge variant="danger">오류</UiBadge>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('기본')).toBeTruthy()
    await expect(canvas.getByText('정상')).toBeTruthy()
    await expect(canvas.getByText('오류')).toBeTruthy()
  },
}

// size 4종 비교
export const AllSizes: Story = {
  render: () => ({
    components: { UiBadge, UiIcon },
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <UiBadge variant="primary" size="xs">xs (20)</UiBadge>
        <UiBadge variant="primary" size="sm">sm (22)</UiBadge>
        <UiBadge variant="primary" size="md">md (24)</UiBadge>
        <UiBadge variant="primary" size="lg">lg (26)</UiBadge>
      </div>
    `,
  }),
}

// 아이콘 + 텍스트 조합
export const WithIcon: Story = {
  render: () => ({
    components: { UiBadge, UiIcon },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiBadge variant="success">
          <template #icon-left><UiIcon name="check" :size="14" /></template>
          완료
        </UiBadge>
        <UiBadge variant="warning">
          <template #icon-left><UiIcon name="loader-circle" :size="14" /></template>
          진행 중
        </UiBadge>
        <UiBadge variant="danger">
          <template #icon-left><UiIcon name="x" :size="14" /></template>
          실패
        </UiBadge>
      </div>
    `,
  }),
}

// icon-only — 텍스트 없이 작은 정사각형 표시 (알림 도트 등)
export const IconOnly: Story = {
  render: () => ({
    components: { UiBadge, UiIcon },
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <UiBadge variant="success" role="img" aria-label="완료" icon-only size="sm">
          <template #icon-left><UiIcon name="check" :size="14" /></template>
        </UiBadge>
        <UiBadge variant="danger" role="img" aria-label="실패" icon-only size="md">
          <template #icon-left><UiIcon name="x" :size="14" /></template>
        </UiBadge>
        <UiBadge variant="primary" role="img" aria-label="추가" icon-only size="lg">
          <template #icon-left><UiIcon name="plus" :size="14" /></template>
        </UiBadge>
      </div>
    `,
  }),
}

// colorHex — 동적 색상으로 도메인 특수 컬러칩
export const CustomColorHex: Story = {
  render: () => ({
    components: { UiBadge, UiIcon },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiBadge color-hex="#4589e0">data-line</UiBadge>
        <UiBadge color-hex="#ac5e00">basic-chat</UiBadge>
        <UiBadge color-hex="#8f4fdf">manual-ai</UiBadge>
        <UiBadge color-hex="#0d8a5b">category</UiBadge>
        <UiBadge color-hex="#dd6b20" :bg-alpha="0.18">강조 (alpha 0.18)</UiBadge>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // colorHex 적용 검증 — inline style에 color 적용됨
    const badge = canvas.getByText('data-line')
    const styleAttr = badge.closest('.ui-badge')?.getAttribute('style') ?? ''
    await expect(styleAttr.toLowerCase()).toContain('color: #4589e0')
    await expect(styleAttr.toLowerCase()).toContain('rgba(69, 137, 224')
  },
}

// 잘못된 hex(빈/유효 X) → variant fallback
export const InvalidHexFallback: Story = {
  args: {
    variant: 'success',
    colorHex: 'not-a-color',
  },
  render: (args) => ({
    components: { UiBadge, UiIcon },
    setup: () => ({ args }),
    template: '<UiBadge v-bind="args">잘못된 hex → default로 폴백</UiBadge>',
  }),
}


export const StatusDots: Story = {
  render: () => ({ components: { UiBadge }, template: `<div style="display:flex;gap:12px;flex-wrap:wrap"><UiBadge dot>대기</UiBadge><UiBadge variant="info" dot>진행 중</UiBadge><UiBadge variant="success" dot>정상</UiBadge><UiBadge variant="warning" dot>점검</UiBadge><UiBadge variant="danger" dot>오류</UiBadge></div>` }),
}
export const PillShape: Story = {
  render: () => ({ components: { UiBadge, UiIcon }, template: `<div style="display:flex;gap:12px;flex-wrap:wrap"><UiBadge shape="pill" variant="success"><template #icon-left><UiIcon name="check" :size="14" /></template>완료</UiBadge><UiBadge shape="pill" variant="info" dot>진행 중</UiBadge><UiBadge shape="pill" variant="warning" dot>주의</UiBadge><UiBadge shape="pill" variant="danger"><template #icon-left><UiIcon name="x" :size="14" /></template>실패</UiBadge></div>` }),
}
export const InTable: Story = {
  parameters: { layout: 'padded' },
  render: () => ({
    components: { UiBadge },
    setup: () => ({ rows: [
      { task: '월간 보고서 작성', owner: '김민수', status: '완료', variant: 'success', time: '방금 전' },
      { task: '첨부파일 검수', owner: '이지은', status: '진행 중', variant: 'info', time: '5분 전' },
      { task: '서버 상태 확인', owner: '박서준', status: '점검', variant: 'warning', time: '10분 전' },
    ] }),
    template: `<div style="max-width:800px;margin:24px auto;overflow-x:auto"><table style="width:100%;border-collapse:collapse;text-align:left;font-size:14px;white-space:nowrap"><thead style="background:#f8fafc;color:#64748b"><tr><th v-for="label in ['작업명','담당자','상태','최근 업데이트']" :key="label" style="padding:12px 16px;font-weight:500">{{ label }}</th></tr></thead><tbody><tr v-for="row in rows" :key="row.task" style="border-bottom:1px solid #e2e8f0"><td style="padding:14px 16px">{{ row.task }}</td><td style="padding:14px 16px">{{ row.owner }}</td><td style="padding:14px 16px"><UiBadge :variant="row.variant" dot>{{ row.status }}</UiBadge></td><td style="padding:14px 16px;color:#64748b">{{ row.time }}</td></tr></tbody></table></div>`,
  }),
}
