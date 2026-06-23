import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import UiProgress from './UiProgress.vue'

const meta = {
  title: 'Components/Feedback/UiProgress',
  component: UiProgress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
가로 진행률 바. \`value\`/\`max\`로 채움 비율을 표시한다.

## API
- **\`value\`** \`number\` — 현재 값 (0~max로 클램프)
- **\`max\`** \`number\` — 최대값. 기본 \`100\`
- **\`label\`** \`string\` — 상단 라벨 (\`#label\` 슬롯으로도 가능)
- **\`showValue\`** \`boolean\` — 퍼센트 텍스트 표시. 기본 \`false\`
- **\`variant\`** \`'primary' | 'success' | 'warning' | 'danger'\` — 색. 기본 \`primary\`
- **\`size\`** \`'sm' | 'md' | 'lg'\` — 바 두께 6 / 8 / 12px. 기본 \`md\`
- **default 슬롯** — 바 하단 caption (예: \`완료 28건 / 전체 36건\`)

## 레이아웃
- \`label\` + \`showValue\` → 헤더 한 줄에 라벨(좌) + 퍼센트(우)
- \`showValue\`만 (라벨 없음) → 퍼센트를 크게 단독 표시
- default 슬롯 → 바 아래 보조 텍스트

## 접근성
\`role="progressbar"\` + \`aria-valuenow/min/max\` 자동 바인딩.
        `,
      },
    },
  },
  decorators: [
    () => ({ template: '<div style="width: 320px;"><story /></div>' }),
  ],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 }, description: '현재 값' },
    max: { control: 'number', description: '최대값' },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'success', 'warning', 'danger'],
      description: '색상 변형',
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: '바 두께' },
    showValue: { control: 'boolean', description: '퍼센트 표시' },
    label: { control: 'text', description: '상단 라벨' },
  },
} satisfies Meta<typeof UiProgress>

export default meta
type Story = StoryObj<typeof meta>

// ===== Playground =====
export const Playground: Story = {
  args: {
    value: 62,
    max: 100,
    variant: 'primary',
    size: 'md',
    showValue: true,
    label: '진행률',
  },
}

// ===== Showcase — 이미지 재현 (78%, 완료 28건 / 전체 36건) =====
export const Showcase: Story = {
  args: {
    value: 28,
    max: 36,
    variant: 'success',
    size: 'md',
    showValue: true,
  },
  render: (args) => ({
    components: { UiProgress },
    setup: () => ({ args }),
    template: `
      <UiProgress v-bind="args">완료 {{ args.value }}건 / 전체 {{ args.max }}건</UiProgress>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // 퍼센트 = round(28/36*100) = 78
    expect(canvas.getByText('78%')).toBeTruthy()
    expect(canvas.getByText('완료 28건 / 전체 36건')).toBeTruthy()
    const bar = canvasElement.querySelector('[role="progressbar"]') as HTMLElement
    expect(bar.getAttribute('aria-valuenow')).toBe('28')
    expect(bar.getAttribute('aria-valuemax')).toBe('36')
  },
}

// ===== Variants (4색) =====
export const Variants: Story = {
  render: () => ({
    components: { UiProgress },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <UiProgress :value="80" variant="primary" show-value label="Primary" />
        <UiProgress :value="65" variant="success" show-value label="Success" />
        <UiProgress :value="45" variant="warning" show-value label="Warning" />
        <UiProgress :value="25" variant="danger" show-value label="Danger" />
      </div>
    `,
  }),
}

// ===== Sizes (두께) =====
export const Sizes: Story = {
  render: () => ({
    components: { UiProgress },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <UiProgress :value="60" size="sm" label="sm (6px)" show-value />
        <UiProgress :value="60" size="md" label="md (8px)" show-value />
        <UiProgress :value="60" size="lg" label="lg (12px)" show-value />
      </div>
    `,
  }),
}

// ===== 라벨 + 퍼센트 헤더 (DocDatasetCard 패턴) =====
export const WithLabel: Story = {
  args: {
    value: 62,
    max: 100,
    variant: 'primary',
    showValue: true,
    label: '벡터 생성 진행',
  },
  render: (args) => ({
    components: { UiProgress },
    setup: () => ({ args }),
    template: `<UiProgress v-bind="args">청크 임베딩 처리 중…</UiProgress>`,
  }),
}
