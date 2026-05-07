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
          <div style="padding: 24px;">
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
          <div style="padding: 20px 24px;">
            <p>title prop과 X 닫기 버튼이 헤더에 자동 배치.</p>
          </div>
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
          <div style="padding: 20px 24px;">
            <p>현재 사이즈: <strong>{{ size }}</strong></p>
            <p>모바일에서 max-width: calc(100vw - 40px) 로 자동 축소.</p>
          </div>
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
          <div style="padding: 20px 24px;">
            <p>showClose=false. ESC 또는 overlay 클릭으로만 닫힘.</p>
          </div>
        </UiModal>
      </div>
    `,
  }),
}
