import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UiTransfer from './UiTransfer.vue'

const meta = {
  title: 'Components/Form/UiTransfer',
  component: UiTransfer,
  tags: ['autodocs'],
  args: {
    items: [
      { id: 'admin', label: '관리자' },
      { id: 'university', label: '대학별담당자' },
      { id: 'consultant', label: '컨설팅담당자' },
      { id: 'internal', label: '내부담당자' },
      { id: 'finance', label: '재정진단담당자' },
    ],
    modelValue: ['admin'], sourceTitle: '미선택 권한그룹', targetTitle: '선택된 권한그룹',
    searchable: false, showAllControls: false, disabled: false, listHeight: 240,
  },
  parameters: { docs: { description: { component: '공통 2열 선택 목록. v-model은 오른쪽 목록의 ID 배열이며 체크 상태와 구분됩니다. 가운데 아이콘 버튼으로 이동하고 툴팁으로 동작을 안내합니다. searchable는 양쪽 검색, showAllControls는 전체 이동 버튼을 표시합니다. 전체 선택·전체 이동은 현재 검색 결과의 활성 항목에만 적용되며 숨겨진 체크 항목은 이동하지 않습니다. items의 id는 고유해야 합니다. item 슬롯으로 행을 확장하고 change(ids, direction, movedIds) 이벤트로 이동 결과를 받을 수 있습니다. 저장은 사용하는 화면에서 처리합니다.' } } },
  render: args => ({
    components: { UiTransfer },
    setup() { const selected = ref(args.modelValue); return { args, selected } },
    template: '<div style="width: min(900px, calc(100vw - 64px));"><UiTransfer v-bind="args" v-model="selected" /></div>',
  }),
} satisfies Meta<typeof UiTransfer>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { name: '01 기본형 · 아이콘 이동' }
export const Searchable: Story = { name: '02 검색형 · 전체 이동', args: { searchable: true, showAllControls: true } }
export const Users: Story = {
  name: '03 사용자 목록',
  args: {
    sourceTitle: '추가 가능한 사용자', targetTitle: '선택한 사용자', searchable: true, showAllControls: true,
    modelValue: ['user-3'],
    items: [
      { id: 'user-1', label: '김민수', description: 'minsu@example.com · 가람대학교' },
      { id: 'user-2', label: '이서연', description: 'seoyeon@example.com · 나래대학교' },
      { id: 'user-3', label: '정하늘', description: 'haneul@example.com · 다온대학교' },
      { id: 'user-4', label: '변경 불가 사용자', description: 'locked@example.com', disabled: true },
    ],
  },
}
export const Disabled: Story = { name: '비활성', args: { disabled: true, searchable: true } }
export const Empty: Story = { name: '빈 목록', args: { items: [], modelValue: [] } }
