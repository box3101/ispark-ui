import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import UiIcon from './UiIcon.vue'

const meta = {
  title: 'Components/Display/UiIcon',
  component: UiIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Lucide 기반 아이콘 컴포넌트. \`name\` prop으로 1,500+ 아이콘을 자유롭게 사용.

## 기본 사용
\`\`\`html
<UiIcon name="search" />
<UiIcon name="arrow-right" size="sm" color="primary" />
\`\`\`

## Props
- **\`name\`** — Lucide 아이콘 이름 (kebab-case). <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer">전체 목록 ↗</a>
- **\`size\`** — 토큰(\`xs\` 12 / \`sm\` 16 / \`md\` 18 / \`lg\` 20) 또는 숫자(px). 기본 24
- **\`color\`** — \`primary\` \`danger\` \`white\` \`black\` \`muted\`. 미지정 시 currentColor
- **\`strokeWidth\`** — 선 두께 1~3. 기본 2
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Lucide 아이콘 이름 (kebab-case)',
      table: { category: 'Core', type: { summary: 'string' } },
    },
    size: {
      control: 'text',
      description: '토큰(xs/sm/md/lg) 또는 숫자(px)',
      table: {
        category: 'Appearance',
        type: { summary: 'string | number' },
        defaultValue: { summary: '24' },
      },
    },
    color: {
      control: 'inline-radio',
      options: [undefined, 'primary', 'danger', 'white', 'black', 'muted'],
      description: '색상 프리셋. 미지정 시 currentColor',
      table: {
        category: 'Appearance',
        type: { summary: "'primary' | 'danger' | 'white' | 'black' | 'muted'" },
      },
    },
    strokeWidth: {
      control: { type: 'number', min: 0.5, max: 3, step: 0.5 },
      description: 'Lucide 선 두께',
      table: {
        category: 'Appearance',
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
  },
} satisfies Meta<typeof UiIcon>

export default meta
type Story = StoryObj<typeof meta>

// ── Playground ──────────────────────────────────────
export const Playground: Story = {
  args: {
    name: 'search',
    size: 24,
    strokeWidth: 2,
  },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg')
    expect(svg).not.toBeNull()
    expect(svg!.getAttribute('aria-hidden')).toBe('true')
  },
}

// ── Size Variants ───────────────────────────────────
export const SizeVariants: Story = {
  render: () => ({
    components: { UiIcon },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="text-align: center;">
          <UiIcon name="heart" size="xs" /><br/>
          <small>xs (12)</small>
        </div>
        <div style="text-align: center;">
          <UiIcon name="heart" size="sm" /><br/>
          <small>sm (16)</small>
        </div>
        <div style="text-align: center;">
          <UiIcon name="heart" size="md" /><br/>
          <small>md (18)</small>
        </div>
        <div style="text-align: center;">
          <UiIcon name="heart" size="lg" /><br/>
          <small>lg (20)</small>
        </div>
        <div style="text-align: center;">
          <UiIcon name="heart" :size="32" /><br/>
          <small>32px</small>
        </div>
        <div style="text-align: center;">
          <UiIcon name="heart" :size="48" /><br/>
          <small>48px</small>
        </div>
      </div>
    `,
  }),
}

// ── Color Variants ──────────────────────────────────
export const ColorVariants: Story = {
  render: () => ({
    components: { UiIcon },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="text-align: center;">
          <UiIcon name="circle" :size="24" /><br/>
          <small>default</small>
        </div>
        <div style="text-align: center;">
          <UiIcon name="circle" :size="24" color="primary" /><br/>
          <small>primary</small>
        </div>
        <div style="text-align: center;">
          <UiIcon name="circle" :size="24" color="danger" /><br/>
          <small>danger</small>
        </div>
        <div style="text-align: center; background: #1a1b1f; padding: 8px; border-radius: 4px;">
          <UiIcon name="circle" :size="24" color="white" /><br/>
          <small style="color:#fff;">white</small>
        </div>
        <div style="text-align: center;">
          <UiIcon name="circle" :size="24" color="black" /><br/>
          <small>black</small>
        </div>
        <div style="text-align: center;">
          <UiIcon name="circle" :size="24" color="muted" /><br/>
          <small>muted</small>
        </div>
      </div>
    `,
  }),
}

// ── Stroke Width ────────────────────────────────────
export const StrokeWidthVariants: Story = {
  render: () => ({
    components: { UiIcon },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <div v-for="sw in [1, 1.5, 2, 2.5, 3]" :key="sw" style="text-align: center;">
          <UiIcon name="pen-tool" :size="24" :stroke-width="sw" /><br/>
          <small>{{ sw }}</small>
        </div>
      </div>
    `,
  }),
}

// ── Gallery (주요 아이콘) ───────────────────────────
const GALLERY_ICONS = [
  'search', 'plus', 'x', 'check', 'chevron-down', 'chevron-up',
  'chevron-left', 'chevron-right', 'arrow-right', 'arrow-left',
  'edit', 'trash-2', 'eye', 'eye-off', 'download', 'upload',
  'settings', 'user', 'users', 'mail', 'phone', 'calendar',
  'clock', 'star', 'heart', 'home', 'folder', 'file',
  'image', 'camera', 'bell', 'lock', 'unlock', 'link',
  'external-link', 'copy', 'clipboard', 'filter', 'refresh-cw',
  'log-out', 'log-in', 'alert-circle', 'info', 'help-circle',
]

export const Gallery: Story = {
  render: () => ({
    components: { UiIcon },
    setup() {
      return { icons: GALLERY_ICONS }
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 12px;">
        <div
          v-for="icon in icons"
          :key="icon"
          style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px; border: 1px solid #e5e7eb; border-radius: 6px;"
        >
          <UiIcon :name="icon" :size="20" />
          <small style="font-size: 10px; color: #6b7280; word-break: break-all; text-align: center;">{{ icon }}</small>
        </div>
      </div>
    `,
  }),
}
