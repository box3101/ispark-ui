import type { Meta, StoryObj } from '@storybook/vue3'
import { fn, expect, userEvent, within, waitFor } from '@storybook/test'
import { ref } from 'vue'
import UiDropdownMenu from './UiDropdownMenu.vue'
import UiButton from './UiButton.vue'
import UiIcon from './UiIcon.vue'
import type { DropdownMenuItemDef } from './UiDropdownMenu.vue'

const baseItems: DropdownMenuItemDef[] = [
  { label: '이름 변경', value: 'rename', icon: 'pencil', shortcut: 'F2' },
  { label: '복제', value: 'copy', icon: 'copy' },
  { label: '다운로드', value: 'download', icon: 'download' },
  { label: '이동', value: 'move', icon: 'folder' },
  { label: '삭제', value: 'delete', icon: 'trash-2', color: 'danger', separator: true },
]
const fileItems: DropdownMenuItemDef[] = [
  { label: '미리보기', value: 'preview', icon: 'eye' },
  { label: '공유', value: 'share', icon: 'share-2' },
  { label: '링크 복사', value: 'link', icon: 'link' },
  { label: '보관', value: 'archive', icon: 'archive', disabled: true, description: '권한 없음' },
  { label: '삭제', value: 'delete', icon: 'trash-2', color: 'danger', separator: true },
]
const meta = {
  title: 'Components/Overlay/UiDropdownMenu', component: UiDropdownMenu, tags: ['autodocs', 'dropdown'],
  args: { items: baseItems, onSelect: fn(), 'onUpdate:open': fn() },
  parameters: {
    layout: 'centered',
    docs: { description: { component: `아이콘과 액션을 정돈한 드롭다운 메뉴입니다. 기본 텍스트 버튼과 더보기 버튼을 제공하며 기존 trigger 슬롯도 지원합니다.

- **triggerVariant**: text (기본) / icon. **triggerLabel**: 버튼 텍스트 및 접근성 이름.
- **items**: label, value, icon?, color?, disabled?, separator?, description?, shortcut?.
- **icon**: Lucide 이름(pencil, copy 등). 기존 icon-edit 같은 CSS 클래스도 지원합니다.
- **separator**: 해당 항목 위 구분선. **description**: 우측 보조 문구. **shortcut**: 표시 전용이며 실제 단축키는 사용하는 화면에서 연결합니다.
- **title**: 상단 구역 이름. **open**: v-model:open으로 외부 제어.
- **side / align / sideOffset / collisionPadding**: 메뉴 위치 조절.
- **openOnHover / hoverCloseDelay**: 호버 열기와 닫힘 지연. **contentClass**: 콘텐츠 스타일 확장.
- **select(value)**: 선택한 항목을 전달합니다. 파일 작업 등 실제 액션은 부모 화면에서 처리합니다.
- 키보드 화살표 이동, Enter 선택, Escape 닫기 및 비활성 항목 건너뛰기는 Radix가 처리합니다.` } },
  },
  argTypes: {
    triggerVariant: { control: 'inline-radio', options: ['text', 'icon'] },
    triggerLabel: { control: 'text' },
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    sideOffset: { control: { type: 'number', min: 0, max: 20 } },
    collisionPadding: { control: { type: 'number', min: 0, max: 30 } },
    openOnHover: { control: 'boolean' },
    hoverCloseDelay: { control: { type: 'number', min: 0, max: 1000, step: 50 } },
  },
  render: args => ({ components: { UiDropdownMenu }, setup: () => ({ args }), template: '<div style="padding:24px;min-height:320px"><UiDropdownMenu v-bind="args" /></div>' }),
} satisfies Meta<typeof UiDropdownMenu>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { title: '파일 작업', align: 'start', triggerLabel: '메뉴 열기' } }
export const Default: Story = { args: { triggerVariant: 'icon', triggerLabel: '더보기' } }
export const WithTitle: Story = {
  args: { title: '계정', align: 'start', triggerLabel: '사용자', items: [
    { label: '프로필 설정', value: 'profile', icon: 'user' },
    { label: '비밀번호 변경', value: 'password', icon: 'key-round' },
    { label: '로그아웃', value: 'logout', icon: 'log-out', color: 'danger', separator: true },
  ] },
}
export const WithDisabledItem: Story = { args: { items: fileItems, triggerLabel: '액션' } }
export const OpenOnHover: Story = { args: { openOnHover: true, hoverCloseDelay: 300, side: 'right', align: 'start', triggerLabel: '폴더 (호버)' } }
export const Expanded: Story = {
  args: { open: true, title: '파일 작업', align: 'start' },
  parameters: { docs: { story: { inline: false, iframeHeight: 400 } } },
}
export const FileActions: Story = {
  args: { items: fileItems, triggerVariant: 'icon', triggerLabel: '프로젝트 보고서 메뉴', align: 'end' },
  render: args => ({
    components: { UiDropdownMenu, UiIcon }, setup: () => ({ args }),
    template: `<div style="width:min(480px,calc(100vw - 64px));min-height:360px;padding:24px 0">
      <div style="display:flex;align-items:center;gap:14px;padding:16px;border:1px solid #e2e8f0;border-radius:8px;background:#fff">
        <div style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:6px;background:#fff1f2;color:#dc2626;flex-shrink:0"><UiIcon name="file-text" :size="24" /></div>
        <div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">프로젝트 보고서.pdf</div><div style="margin-top:4px;font-size:12px;color:#64748b">PDF · 240 KB</div></div>
        <UiDropdownMenu v-bind="args" />
      </div>
    </div>`,
  }),
}
export const SelectionLive: Story = {
  render: args => ({
    components: { UiDropdownMenu },
    setup() { const lastSelect = ref('아직 없음'); return { args, lastSelect, onSelect: (value: string) => { lastSelect.value = value; args.onSelect?.(value) } } },
    template: `<div style="padding:24px;min-height:340px"><UiDropdownMenu v-bind="args" @select="onSelect" /><p role="status" style="margin-top:20px;font-size:13px;color:#64748b">마지막 선택: {{ lastSelect }}</p></div>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(canvas.getByRole('button', { name: '메뉴 열기' }))
    await userEvent.click(await body.findByRole('menuitem', { name: '다운로드' }))
    await expect(canvas.getByRole('status')).toHaveTextContent('download')
    await waitFor(() => expect(body.queryByRole('menu')).not.toBeInTheDocument())
  },
}
export const CustomTrigger: Story = {
  render: args => ({ components: { UiDropdownMenu, UiButton, UiIcon }, setup: () => ({ args }), template: '<div style="padding:24px;min-height:320px"><UiDropdownMenu v-bind="args"><template #trigger><UiButton variant="outline"><UiIcon name="user" :size="16" /> 사용자</UiButton></template></UiDropdownMenu></div>' }),
}
