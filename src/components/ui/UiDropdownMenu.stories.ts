import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import { ref } from 'vue'
import UiDropdownMenu from './UiDropdownMenu.vue'
import UiButton from './UiButton.vue'
import type { DropdownMenuItemDef } from './UiDropdownMenu.vue'

const meta = {
  title: 'Components/UiDropdownMenu',
  component: UiDropdownMenu,
  tags: ['autodocs'],
  args: {
    onSelect: fn(),
    'onUpdate:open': fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ispark-ui 표준 드롭다운 메뉴 — radix-vue \`DropdownMenu\` 프리미티브 래핑. 카드/행의 액션 트리거, 사이드바 메뉴, 컨텍스트 메뉴 등에 사용.

## API
- **\`items\`** \`DropdownMenuItemDef[]\` — 메뉴 항목 배열 (\`{ label, value, icon?, color?, disabled? }\`)
- **\`title\`** \`string\` — 상단 비클릭 라벨 (구역 안내)
- **\`open\`** \`boolean\` — v-model:open으로 외부 제어
- **\`side\`** / **\`align\`** / **\`sideOffset\`** / **\`collisionPadding\`** — radix 포지셔닝
- **\`openOnHover\`** + **\`hoverCloseDelay\`** — hover로 자동 오픈/닫기
- **\`contentClass\`** — 포털 콘텐츠에 추가 클래스 (글로벌 SCSS override 진입점)

## DropdownMenuItemDef
\`\`\`ts
interface DropdownMenuItemDef {
  label: string
  value: string                       // @select payload
  icon?: string                       // 'icon-edit' 등 ispark-ui 아이콘 클래스
  color?: 'default' | 'danger'        // danger는 빨강
  disabled?: boolean
}
\`\`\`

## 슬롯
- **trigger** (필수) — 트리거 영역. radix의 \`as-child\` 패턴으로 wrap

## 이벤트
- \`select\` — \`(value: string)\`. 메뉴 항목 클릭 시 payload는 \`item.value\`
- \`update:open\` — v-model:open

## 접근성
- radix-vue 처리: role=menu / aria-orientation / 화살표 키 / Home/End / Esc / 포커스 트랩 / typeahead
- \`disabled\` 항목은 \`data-disabled\` 자동 + 키보드 skip
- \`prefers-reduced-motion: reduce\` 시 진입/퇴장 애니메이션 정지
        `,
      },
    },
  },
  argTypes: {
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    sideOffset: { control: { type: 'number', min: 0, max: 20 } },
    collisionPadding: { control: { type: 'number', min: 0, max: 30 } },
    openOnHover: { control: 'boolean' },
    hoverCloseDelay: { control: { type: 'number', min: 0, max: 1000, step: 50 } },
  },
} satisfies Meta<typeof UiDropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

const baseItems: DropdownMenuItemDef[] = [
  { label: '편집', value: 'edit', icon: 'icon-edit' },
  { label: '복사', value: 'copy', icon: 'icon-check' },
  { label: '다운로드', value: 'download', icon: 'icon-download' },
  { label: '삭제', value: 'delete', icon: 'icon-trashcan', color: 'danger' },
]

// ===== Stories =====

export const Playground: Story = {
  args: {
    items: baseItems,
    side: 'bottom',
    align: 'end',
    sideOffset: 5,
    openOnHover: false,
  },
  render: (args) => ({
    components: { UiDropdownMenu, UiButton },
    setup: () => ({ args }),
    template: `
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="outline">메뉴 열기 ▾</UiButton>
        </template>
      </UiDropdownMenu>
    `,
  }),
}

// 기본 — 4개 항목 + danger
export const Default: Story = {
  args: {
    items: baseItems,
  },
  render: (args) => ({
    components: { UiDropdownMenu, UiButton },
    setup: () => ({ args }),
    template: `
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="outline">⋯</UiButton>
        </template>
      </UiDropdownMenu>
    `,
  }),
}

// title — 구역 안내 라벨
export const WithTitle: Story = {
  args: {
    title: '계정',
    items: [
      { label: '프로필 설정', value: 'profile', icon: 'icon-edit' },
      { label: '비밀번호 변경', value: 'pwd', icon: 'icon-check' },
      { label: '로그아웃', value: 'logout', icon: 'icon-close', color: 'danger' },
    ],
    align: 'start',
  },
  render: (args) => ({
    components: { UiDropdownMenu, UiButton },
    setup: () => ({ args }),
    template: `
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="ghost">👤 사용자</UiButton>
        </template>
      </UiDropdownMenu>
    `,
  }),
}

// 비활성 항목 — disabled 키 skip
export const WithDisabledItem: Story = {
  args: {
    items: [
      { label: '편집', value: 'edit', icon: 'icon-edit' },
      { label: '복사 (잠금)', value: 'copy', icon: 'icon-check', disabled: true },
      { label: '내보내기', value: 'export', icon: 'icon-download' },
      { label: '삭제', value: 'delete', icon: 'icon-trashcan', color: 'danger' },
    ],
  },
  render: (args) => ({
    components: { UiDropdownMenu, UiButton },
    setup: () => ({ args }),
    template: `
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="outline">액션</UiButton>
        </template>
      </UiDropdownMenu>
    `,
  }),
}

// hover로 오픈 — 사이드바/내비게이션 패턴
export const OpenOnHover: Story = {
  args: {
    items: baseItems,
    openOnHover: true,
    hoverCloseDelay: 120,
    side: 'right',
    align: 'start',
  },
  render: (args) => ({
    components: { UiDropdownMenu, UiButton },
    setup: () => ({ args }),
    template: `
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="ghost">📁 폴더 (호버)</UiButton>
        </template>
      </UiDropdownMenu>
    `,
  }),
}

// 선택 결과 라이브 표시 — @select 이벤트 시연
export const SelectionLive: Story = {
  render: () => ({
    components: { UiDropdownMenu, UiButton },
    setup: () => {
      const lastSelect = ref<string | null>(null)
      const onSelect = (value: string) => {
        lastSelect.value = value
      }
      return { items: baseItems, lastSelect, onSelect }
    },
    template: `
      <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px;">
        <UiDropdownMenu :items="items" @select="onSelect">
          <template #trigger>
            <UiButton variant="primary">메뉴 ▾</UiButton>
          </template>
        </UiDropdownMenu>
        <div style="padding: 10px 14px; background: #f4f7f9; border-radius: 6px; font-size: 13px; color: #4d5462;">
          <strong>마지막 선택:</strong>
          <span v-if="lastSelect" style="margin-left: 8px; color: #3c69db;">{{ lastSelect }}</span>
          <span v-else style="margin-left: 8px; color: #6f7a93;">(아직 없음)</span>
        </div>
      </div>
    `,
  }),
}
