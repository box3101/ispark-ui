import type { Meta, StoryObj } from '@storybook/vue3'
import UiBadgeGroup from './UiBadgeGroup.vue'
import UiBadge from './UiBadge.vue'

const meta = {
  title: 'Components/Display/UiBadgeGroup',
  component: UiBadgeGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
여러 \`UiBadge\`를 묶는 wrapper. \`gap\` prop으로 badge 사이 간격 제어.

- **gap**: number(px) 또는 string ('8px', '0.5rem' 등)
- **direction**: 'row'(기본) / 'column'
- **wrap**: 한 줄 넘으면 wrap (기본 true)
- **ariaLabel**: 그룹 스크린리더 라벨 (예: '상태 라벨 그룹')
        `,
      },
    },
  },
  argTypes: {
    gap: {
      control: { type: 'number', min: 0, max: 24, step: 1 },
      description: 'badge 사이 간격 — number는 px, string은 그대로 사용',
      table: { defaultValue: { summary: '8' } },
    },
    direction: {
      control: 'inline-radio',
      options: ['row', 'column'],
      table: { defaultValue: { summary: "'row'" } },
    },
    wrap: {
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    ariaLabel: {
      control: 'text',
      description: '스크린리더용 그룹 라벨',
    },
  },
} satisfies Meta<typeof UiBadgeGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { gap: 8 },
  render: (args) => ({
    components: { UiBadgeGroup, UiBadge },
    setup: () => ({ args }),
    template: `
      <UiBadgeGroup v-bind="args" aria-label="상태 라벨 그룹">
        <UiBadge variant="success">완료</UiBadge>
        <UiBadge variant="warning">대기</UiBadge>
        <UiBadge variant="danger">실패</UiBadge>
        <UiBadge variant="info">정보</UiBadge>
      </UiBadgeGroup>
    `,
  }),
}

export const TightGap: Story = {
  name: '좁은 간격 (gap=4)',
  args: { gap: 4 },
  render: (args) => ({
    components: { UiBadgeGroup, UiBadge },
    setup: () => ({ args }),
    template: `
      <UiBadgeGroup v-bind="args">
        <UiBadge variant="primary">Vue 3</UiBadge>
        <UiBadge variant="primary">TypeScript</UiBadge>
        <UiBadge variant="primary">Vite</UiBadge>
        <UiBadge variant="primary">Pinia</UiBadge>
      </UiBadgeGroup>
    `,
  }),
}

export const WideGap: Story = {
  name: '넓은 간격 (gap=16)',
  args: { gap: 16 },
  render: (args) => ({
    components: { UiBadgeGroup, UiBadge },
    setup: () => ({ args }),
    template: `
      <UiBadgeGroup v-bind="args">
        <UiBadge variant="success" size="md">활성</UiBadge>
        <UiBadge variant="default" size="md">보관</UiBadge>
        <UiBadge variant="warning" size="md">검토중</UiBadge>
      </UiBadgeGroup>
    `,
  }),
}

export const Column: Story = {
  name: '세로 배치 (column)',
  args: { gap: 6, direction: 'column' },
  render: (args) => ({
    components: { UiBadgeGroup, UiBadge },
    setup: () => ({ args }),
    template: `
      <UiBadgeGroup v-bind="args">
        <UiBadge variant="success">완료 12건</UiBadge>
        <UiBadge variant="warning">진행중 3건</UiBadge>
        <UiBadge variant="danger">실패 1건</UiBadge>
      </UiBadgeGroup>
    `,
  }),
}

export const Wrap: Story = {
  name: '자동 줄바꿈 (wrap)',
  args: { gap: 8 },
  render: (args) => ({
    components: { UiBadgeGroup, UiBadge },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 280px;">
        <UiBadgeGroup v-bind="args">
          <UiBadge variant="info">JavaScript</UiBadge>
          <UiBadge variant="info">TypeScript</UiBadge>
          <UiBadge variant="info">Vue</UiBadge>
          <UiBadge variant="info">React</UiBadge>
          <UiBadge variant="info">Svelte</UiBadge>
          <UiBadge variant="info">Solid</UiBadge>
          <UiBadge variant="info">Angular</UiBadge>
        </UiBadgeGroup>
      </div>
    `,
  }),
}
