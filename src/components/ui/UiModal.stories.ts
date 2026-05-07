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
