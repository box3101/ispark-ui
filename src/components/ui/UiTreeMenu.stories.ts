import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UiTreeMenu from './UiTreeMenu.vue'
import type { TreeMenuVariant } from './UiTreeMenu.vue'

const meta = {
  title: 'Components/Navigation/UiTreeMenu',
  component: UiTreeMenu,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['basic', 'minimal', 'hierarchy'], description: 'basic: 일반 업무 화면 / minimal: 가볍고 간결한 메뉴 / hierarchy: 하위 메뉴가 많은 화면' },
  },
  args: {
    variant: 'basic',
    title: '메뉴 목록',
    modelValue: 'university-contacts',
    defaultExpandedIds: ['all', 'university'],
    items: [{ id: 'all', label: '전체 메뉴', children: [
      { id: 'support', label: '지원사업관리', children: [{ id: 'support-list', label: '지원사업 목록' }] },
      { id: 'management', label: '관리정보', children: [{ id: 'users', label: '사용자 관리' }] },
      { id: 'notice', label: '공지및질의', children: [{ id: 'notice-list', label: '공지사항' }, { id: 'questions', label: '질의 목록' }] },
      { id: 'university', label: '대학별관리', children: [
        { id: 'university-contacts', label: '대학 및 담당자' },
        { id: 'university-progress', label: '진행 현황' },
        { id: 'university-assignment', label: '담당자 배정' },
      ] },
      { id: 'consultants', label: '컨설팅위원', children: [{ id: 'consultant-list', label: '위원 목록' }] },
    ] }],
  },
  parameters: { docs: { description: { component: '곡선 연결선으로 계층을 표현하는 검색형 트리 메뉴. items의 id는 전체 트리에서 고유해야 합니다. v-model은 선택 ID, select 이벤트는 선택한 말단 항목을 전달합니다. defaultExpandedIds는 최초 펼침 상태입니다. 검색은 부모 경로를 보존하며 일치 항목을 자동으로 펼칩니다. 검색 중 전체 펼치기·접기는 비활성화됩니다. 방향키·Home·End로 이동하고 Enter/Space로 선택 또는 펼침을 제어합니다.' } } },
  render: args => ({
    components: { UiTreeMenu },
    setup() { const selected = ref(args.modelValue); return { args, selected } },
    template: '<div style="width: 360px; max-width: 100%; height: 640px;"><UiTreeMenu v-bind="args" v-model="selected" /></div>',
  }),
} satisfies Meta<typeof UiTreeMenu>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { name: '01 기본형', args: { variant: 'basic' } }
export const Minimal: Story = { name: '02 미니멀형', args: { variant: 'minimal' } }
export const Hierarchy: Story = { name: '03 계층 강조형', args: { variant: 'hierarchy' } }
export const Comparison: Story = {
  name: '스타일 비교',
  parameters: { layout: 'fullscreen' },
  render: args => ({
    components: { UiTreeMenu },
    setup() {
      const variants: { value: TreeMenuVariant; title: string; description: string }[] = [
        { value: 'basic', title: '01 기본형 · 추천', description: '기존 업무 화면에 자연스럽게 적용' },
        { value: 'minimal', title: '02 미니멀형', description: '가볍고 간결한 메뉴' },
        { value: 'hierarchy', title: '03 계층 강조형', description: '하위 메뉴가 많을 때 · 곡선 연결선' },
      ]
      const selected = ref<Record<TreeMenuVariant, string | undefined>>({ basic: args.modelValue, minimal: args.modelValue, hierarchy: args.modelValue })
      return { args, variants, selected }
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 24px; padding: 24px; background: var(--color-background);">
        <div v-for="item in variants" :key="item.value" style="min-width: 0;">
          <h2 style="margin: 0 0 16px; font-size: 18px; color: var(--color-text-primary);">{{ item.title }}</h2>
          <div style="height: 600px;"><UiTreeMenu v-bind="args" :variant="item.value" v-model="selected[item.value]" /></div>
          <p style="margin: 16px 0 0; text-align: center; font-size: 13px; color: var(--color-text-secondary);">{{ item.description }}</p>
        </div>
      </div>
    `,
  }),
}
export const Empty: Story = { name: '빈 메뉴', args: { items: [] } }
