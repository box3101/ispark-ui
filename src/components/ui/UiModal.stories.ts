import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, screen, userEvent, within } from '@storybook/test'
import { ref } from 'vue'
import UiModal from './UiModal.vue'

const meta = {
  title: 'Components/UiModal',
  component: UiModal,
  tags: ['autodocs'],
  args: {
    'onUpdate:open': fn(),
    onClose: fn(),
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'sm(400) / md(560·기본) / lg(800) / xl(1080) — 반응형 min(px, calc(100vw - 40px))',
    },
    showClose: {
      control: 'boolean',
      description: '우상단 X 버튼 표시 (default true)',
    },
    maxWidth: {
      control: 'text',
      description: '예: "720px" — size 토큰 max-width override',
    },
    customClass: {
      control: 'text',
      description: '추가 클래스명',
    },
    showOverlay: {
      control: 'boolean',
      description: '오버레이 배경 표시 (default true)',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: '오버레이 클릭 시 닫기 (default true)',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'ESC 키 닫기 (default true)',
    },
  },
} satisfies Meta<typeof UiModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
  },
  render: (args) => ({
    components: { UiModal },
    setup: () => {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <div>
            <h2 style="margin: 0 0 12px;">Default Modal</h2>
            <p>radix-vue Dialog 기반 빈 골격. ESC / overlay 클릭으로 닫힘 (radix 기본).</p>
          </div>
        </UiModal>
      </div>
    `,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: '모달 열기' })
    await userEvent.click(trigger)
    // Portal 이라 screen 사용 — DialogContent에 role=dialog
    const dialog = await screen.findByRole('dialog')
    await expect(dialog).toBeTruthy()
    await expect(args['onUpdate:open']).toHaveBeenCalledWith(true)
    // ESC 키로 닫기
    await userEvent.keyboard('{Escape}')
    await expect(args['onUpdate:open']).toHaveBeenCalledWith(false)
    await expect(args.onClose).toHaveBeenCalled()
  },
}

export const WithTitle: Story = {
  args: {
    title: '회원 정보',
    size: 'md',
  },
  render: (args) => ({
    components: { UiModal },
    setup: () => {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>title prop과 X 닫기 버튼이 헤더에 자동 배치.</p>
        </UiModal>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '모달 열기' }))
    const dialog = await screen.findByRole('dialog')
    await expect(dialog.textContent).toContain('회원 정보')
    // X 버튼 존재 확인 (aria-label='닫기')
    await expect(screen.getByRole('button', { name: '닫기' })).toBeTruthy()
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { UiModal },
    setup: () => {
      const size = ref<'sm' | 'md' | 'lg' | 'xl'>('sm')
      const open = ref(false)
      const openSize = (s: 'sm' | 'md' | 'lg' | 'xl') => { size.value = s; open.value = true }
      return { size, open, openSize }
    },
    template: `
      <div style="display: flex; gap: 8px;">
        <button type="button" @click="openSize('sm')" style="padding: 6px 12px;">sm 400</button>
        <button type="button" @click="openSize('md')" style="padding: 6px 12px;">md 560</button>
        <button type="button" @click="openSize('lg')" style="padding: 6px 12px;">lg 800</button>
        <button type="button" @click="openSize('xl')" style="padding: 6px 12px;">xl 1080</button>
        <UiModal v-model:open="open" :size="size" :title="\`size = \${size}\`">
          <p>현재 사이즈: <strong>{{ size }}</strong></p>
          <p>모바일에서 max-width: calc(100vw - 40px) 로 자동 축소.</p>
        </UiModal>
      </div>
    `,
  }),
}

export const NoCloseButton: Story = {
  args: {
    title: '닫기 버튼 없음',
    showClose: false,
  },
  render: (args) => ({
    components: { UiModal },
    setup: () => {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>showClose=false. ESC 또는 overlay 클릭으로만 닫힘.</p>
        </UiModal>
      </div>
    `,
  }),
}

export const WithFooter: Story = {
  args: {
    title: '저장하시겠습니까?',
    size: 'sm',
  },
  render: (args) => ({
    components: { UiModal },
    setup: () => {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          확인 모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p style="margin: 0;">변경사항이 즉시 반영됩니다.</p>
          <template #footer>
            <button type="button" @click="open = false" style="padding: 6px 14px;">취소</button>
            <button type="button" @click="open = false" style="padding: 6px 14px; background: var(--color-primary); color: #fff; border: 0; border-radius: 6px;">저장</button>
          </template>
        </UiModal>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '확인 모달 열기' }))
    await screen.findByRole('dialog')
    // footer의 저장 버튼 존재 확인
    await expect(screen.getByRole('button', { name: '저장' })).toBeTruthy()
    await expect(screen.getByRole('button', { name: '취소' })).toBeTruthy()
  },
}

export const CustomMaxWidth: Story = {
  args: {
    title: '커스텀 max-width = 720px',
    maxWidth: '720px',
  },
  render: (args) => ({
    components: { UiModal },
    setup: () => {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>maxWidth='720px' prop이 size 토큰을 override.</p>
        </UiModal>
      </div>
    `,
  }),
}

export const NoOverlay: Story = {
  args: {
    title: '오버레이 없음',
    showOverlay: false,
  },
  render: (args) => ({
    components: { UiModal },
    setup: () => {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>showOverlay=false. 배경 어두워지지 않음.</p>
        </UiModal>
      </div>
    `,
  }),
}

export const StrictNoEscape: Story = {
  args: {
    title: '엄격 모드 — ESC/overlay 무시',
    closeOnEscape: false,
    closeOnOverlayClick: false,
  },
  render: (args) => ({
    components: { UiModal },
    setup: () => {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>ESC 키와 overlay 클릭 모두 무시. X 버튼만 닫기 가능. 작업 중 실수 방지용.</p>
        </UiModal>
      </div>
    `,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '모달 열기' }))
    await screen.findByRole('dialog')
    // ESC 시도 — 닫히지 않아야
    await userEvent.keyboard('{Escape}')
    // dialog 여전히 존재
    await expect(screen.queryByRole('dialog')).toBeTruthy()
    // update:open(false) emit 안 됨
    const calls = (args['onUpdate:open'] as ReturnType<typeof fn>).mock.calls
    const closeCalls = calls.filter(([v]: [boolean]) => v === false)
    await expect(closeCalls.length).toBe(0)
  },
}

export const CustomHeaderSlot: Story = {
  args: {
    size: 'md',
  },
  render: (args) => ({
    components: { UiModal },
    setup: () => {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <template #header>
            <div style="display: flex; align-items: center; gap: 12px; padding: 16px 24px; border-bottom: 1px solid #eee;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #6366f1;"></div>
              <div style="flex: 1;">
                <div style="font-weight: 600;">커스텀 헤더</div>
                <div style="font-size: 12px; color: #888;">아바타 + 이름 형태</div>
              </div>
            </div>
          </template>
          <p style="margin: 0;">header slot 사용 시 title/showClose 자동 헤더 비활성.</p>
        </UiModal>
      </div>
    `,
  }),
}
