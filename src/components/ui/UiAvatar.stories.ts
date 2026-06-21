import type { Meta, StoryObj } from '@storybook/vue3'
import UiAvatar from './UiAvatar.vue'
import UiAvatarGroup from './UiAvatarGroup.vue'

const meta = {
  title: 'Components/Display/UiAvatar',
  component: UiAvatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
사용자 프로필 이미지 또는 이니셜을 원형/사각형으로 표시하는 컴포넌트.

## Fallback 계층
1. \`src\` 이미지 로드 성공 → 이미지 표시
2. 이미지 실패/미제공 + \`name\` 있음 → 이니셜 + DJB2 해시 기반 배경색
3. \`name\`도 없음 → 기본 사용자 아이콘

## API
- **\`src\`** \`string\` — 이미지 URL
- **\`name\`** \`string\` — 이니셜 추출 + 배경색 결정에 사용
- **\`alt\`** \`string\` — 접근성 라벨 (없으면 name 사용)
- **\`size\`** \`'xs' | 'sm' | 'md' | 'lg' | number\` — 24 / 28 / 32 / 40px 또는 커스텀
- **\`shape\`** \`'circle' | 'square'\` — 기본 circle
- **\`color\`** \`string\` — 배경색 수동 지정
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'xs(24px) / sm(28px) / md(32px·기본) / lg(40px) 또는 숫자(px)',
      table: {
        category: 'Appearance',
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | number" },
        defaultValue: { summary: "'md'" },
      },
    },
    shape: {
      control: 'inline-radio',
      options: ['circle', 'square'],
      description: '아바타 형태',
      table: {
        category: 'Appearance',
        type: { summary: "'circle' | 'square'" },
        defaultValue: { summary: "'circle'" },
      },
    },
    name: {
      control: 'text',
      description: '이니셜 추출 + 배경색 결정용 사용자 이름',
      table: { category: 'Content' },
    },
    src: {
      control: 'text',
      description: '프로필 이미지 URL',
      table: { category: 'Content' },
    },
    alt: {
      control: 'text',
      description: '접근성 라벨 (alt)',
      table: { category: 'Accessibility' },
    },
    color: {
      control: 'color',
      description: '배경색 수동 지정 (hex)',
      table: { category: 'Appearance' },
    },
  },
} satisfies Meta<typeof UiAvatar>

export default meta
type Story = StoryObj<typeof meta>

// 기본: 이니셜
export const Default: Story = {
  args: {
    name: '이찬용',
    size: 'md',
    shape: 'circle',
  },
}

// 이미지
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=avatar1',
    name: 'John Doe',
    size: 'md',
  },
}

// 이미지 실패 → 이니셜 폴백
export const ImageFallback: Story = {
  args: {
    src: 'https://invalid-url.test/broken.jpg',
    name: 'Jane Smith',
    size: 'md',
  },
  parameters: {
    docs: {
      description: { story: '이미지 로드 실패 시 이니셜로 폴백됩니다.' },
    },
  },
}

// name 없음 → 기본 아이콘
export const NoName: Story = {
  args: {
    size: 'md',
  },
  parameters: {
    docs: {
      description: { story: 'name과 src 모두 없으면 기본 사용자 아이콘이 표시됩니다.' },
    },
  },
}

// 사이즈 비교
export const Sizes: Story = {
  render: () => ({
    components: { UiAvatar },
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <UiAvatar name="XS" size="xs" />
        <UiAvatar name="SM" size="sm" />
        <UiAvatar name="MD" size="md" />
        <UiAvatar name="LG" size="lg" />
        <UiAvatar name="Custom" :size="56" />
      </div>
    `,
  }),
}

// 사각형
export const Square: Story = {
  args: {
    name: '김철수',
    size: 'lg',
    shape: 'square',
  },
}

// 색상 일관성 데모
export const ColorConsistency: Story = {
  render: () => ({
    components: { UiAvatar },
    template: `
      <div style="display: flex; align-items: center; gap: 8px;">
        <UiAvatar name="이찬용" />
        <UiAvatar name="김민수" />
        <UiAvatar name="박지연" />
        <UiAvatar name="John Doe" />
        <UiAvatar name="Jane Smith" />
        <UiAvatar name="Alex" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: { story: '같은 이름은 항상 같은 색상을 가집니다 (DJB2 해시 기반).' },
    },
  },
}

// 아바타 그룹
export const Group: Story = {
  render: () => ({
    components: { UiAvatar, UiAvatarGroup },
    template: `
      <UiAvatarGroup :max="3" size="md">
        <UiAvatar name="이찬용" />
        <UiAvatar name="김민수" />
        <UiAvatar name="박지연" />
        <UiAvatar name="John Doe" />
        <UiAvatar name="Jane Smith" />
      </UiAvatarGroup>
    `,
  }),
  parameters: {
    docs: {
      description: { story: 'UiAvatarGroup으로 감싸면 겹침 + "+N" 표시가 됩니다.' },
    },
  },
}

// 수동 색상
export const CustomColor: Story = {
  args: {
    name: '관리자',
    color: '#1d4ed8',
    size: 'lg',
  },
}
