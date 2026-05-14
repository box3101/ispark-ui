import type { Meta, StoryObj } from '@storybook/vue3'
import UiTooltip from './UiTooltip.vue'
import UiButton from './UiButton.vue'

const meta = {
  title: 'Components/UiTooltip',
  component: UiTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ispark-ui 표준 툴팁 — radix-vue \`Tooltip\` 프리미티브 래핑. 접근성/포커스/ESC 닫기/포지셔닝 위임.

## 언제 사용하나
- 아이콘 버튼의 의미 안내 (icon-only)
- 짧은 부가 설명 (긴 글은 모달/패널 사용)
- 비활성 요소의 비활성 사유 안내

## API
- **\`content\`** \`string\` — 본문 텍스트. \`#content\` 슬롯 지정 시 무시
- **\`side\`** \`'top' | 'right' | 'bottom' | 'left'\` — 표시 위치 (기본 top). 공간 부족 시 radix 자동 flip
- **\`sideOffset\`** \`number\` — trigger와의 간격 (기본 6px)
- **\`align\`** \`'start' | 'center' | 'end'\` — 정렬 (기본 center)
- **\`delayDuration\`** \`number\` — hover 표시 지연 ms (기본 200)
- **\`showArrow\`** \`boolean\` — 화살표 표시 (기본 true)
- **\`fontSize\`** \`string\` — 본문 글자 크기 override (예: \`'11px'\`)
- **\`contentClass\`** \`string\` — radix portal 박스에 추가 클래스 (페이지 스타일 override)

## 슬롯
- **default** — trigger 영역 (호버 대상). \`as-child\` 패턴 — 자식 1개를 그대로 trigger로
- **content** — 본문 커스텀. 텍스트만 필요하면 \`content\` prop 사용

## 접근성
- radix-vue가 처리: role="tooltip" + aria-describedby + 포커스 시 표시 + ESC 닫기
- \`prefers-reduced-motion: reduce\` 시 fade-in 정지

## 디자인 토큰
- 배경: \`$color-text-dark\` (#5c6677) — 짙은 회색 토속
- z-index: \`$z-toast\` (500) — 모달 위에 표시 가능
        `,
      },
    },
  },
  argTypes: {
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    delayDuration: { control: { type: 'number', min: 0, max: 1000, step: 50 } },
    sideOffset: { control: { type: 'number', min: 0, max: 20 } },
    showArrow: { control: 'boolean' },
  },
} satisfies Meta<typeof UiTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    content: '저장하지 않은 변경 사항이 있습니다.',
    side: 'top',
    align: 'center',
    sideOffset: 6,
    delayDuration: 200,
    showArrow: true,
  },
  render: (args) => ({
    components: { UiTooltip, UiButton },
    setup: () => ({ args }),
    template: `
      <UiTooltip v-bind="args">
        <UiButton variant="primary">호버 해보세요</UiButton>
      </UiTooltip>
    `,
  }),
}

export const Default: Story = {
  args: {
    content: '편집하기',
  },
  render: (args) => ({
    components: { UiTooltip, UiButton },
    setup: () => ({ args }),
    template: `
      <UiTooltip v-bind="args">
        <UiButton variant="ghost" icon-only aria-label="편집">✏️</UiButton>
      </UiTooltip>
    `,
  }),
}

// 4방향 비교
export const FourSides: Story = {
  render: () => ({
    components: { UiTooltip, UiButton },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, auto); gap: 60px; padding: 40px;">
        <UiTooltip content="top 방향" side="top">
          <UiButton variant="outline">Top</UiButton>
        </UiTooltip>
        <UiTooltip content="right 방향" side="right">
          <UiButton variant="outline">Right</UiButton>
        </UiTooltip>
        <UiTooltip content="bottom 방향" side="bottom">
          <UiButton variant="outline">Bottom</UiButton>
        </UiTooltip>
        <UiTooltip content="left 방향" side="left">
          <UiButton variant="outline">Left</UiButton>
        </UiTooltip>
      </div>
    `,
  }),
}

// content 슬롯 — rich text (아이콘, 줄바꿈, 강조 등)
export const RichContent: Story = {
  render: () => ({
    components: { UiTooltip, UiButton },
    template: `
      <UiTooltip side="right">
        <UiButton variant="primary">상세 안내</UiButton>
        <template #content>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">📝 변경 사항</div>
            <div style="font-size: 11px; opacity: 0.9; line-height: 1.6;">
              저장 시 자동 백업이 생성됩니다.<br/>
              <span style="color: #fbbf24;">⚠ 충돌 시 수동 병합 필요</span>
            </div>
          </div>
        </template>
      </UiTooltip>
    `,
  }),
}

// 비활성 버튼에 사유 안내 — 가장 흔한 패턴
export const DisabledHint: Story = {
  render: () => ({
    components: { UiTooltip, UiButton },
    template: `
      <UiTooltip content="관리자 권한이 필요합니다." side="top">
        <span style="display: inline-block;">
          <UiButton variant="primary" disabled>삭제</UiButton>
        </span>
      </UiTooltip>
    `,
  }),
}

// 짧은 지연 vs 긴 지연 비교
export const DelayVariants: Story = {
  render: () => ({
    components: { UiTooltip, UiButton },
    template: `
      <div style="display: flex; gap: 16px; padding: 40px;">
        <UiTooltip content="즉시 표시" :delay-duration="0">
          <UiButton variant="outline">delay 0ms</UiButton>
        </UiTooltip>
        <UiTooltip content="기본 200ms" :delay-duration="200">
          <UiButton variant="outline">delay 200ms</UiButton>
        </UiTooltip>
        <UiTooltip content="긴 호버 후 표시" :delay-duration="800">
          <UiButton variant="outline">delay 800ms</UiButton>
        </UiTooltip>
      </div>
    `,
  }),
}
