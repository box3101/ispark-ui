import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UiDrawer from './UiDrawer.vue'
import UiButton from './UiButton.vue'

/**
 * # UiDrawer
 *
 * 오른쪽(또는 왼쪽)에서 슬라이드로 열리는 사이드 패널.
 * 노션 스타일 상세 보기, 설정 패널 등에 사용.
 *
 * ## Props
 *
 * - **`open`** `boolean` — v-model로 열림/닫힘 제어
 * - **`title`** `string` — 헤더 제목
 * - **`width`** `string` — 기본 너비 (default: `420px`)
 * - **`minWidth`** `string` — 최소 너비 (default: `320px`)
 * - **`maxWidth`** `string` — 최대 너비 (default: `80vw`)
 * - **`position`** `'right' | 'left'` — 방향 (default: `right`)
 * - **`overlay`** `boolean` — 배경 오버레이 (default: `true`)
 * - **`resizable`** `boolean` — 드래그 리사이즈 (default: `true`)
 * - **`closeOnOverlayClick`** `boolean` — 오버레이 클릭으로 닫기 (default: `true`)
 * - **`closeOnEscape`** `boolean` — ESC 키로 닫기 (default: `true`)
 *
 * ## Slots
 *
 * - **`default`** — 본문 콘텐츠
 * - **`header`** — 커스텀 헤더
 * - **`footer`** — 푸터 (액션 버튼 등)
 */
const meta: Meta<typeof UiDrawer> = {
  title: 'Components/Overlay/UiDrawer',
  component: UiDrawer,
}
export default meta

type Story = StoryObj<typeof UiDrawer>

export const Default: Story = {
  render: () => ({
    components: { UiDrawer, UiButton },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <UiButton @click="open = true">Drawer 열기</UiButton>
        <UiDrawer v-model:open="open" title="이슈 상세">
          <p>Drawer 본문 내용입니다.</p>
        </UiDrawer>
      </div>
    `,
  }),
}

export const WithFooter: Story = {
  render: () => ({
    components: { UiDrawer, UiButton },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <UiButton @click="open = true">Drawer 열기</UiButton>
        <UiDrawer v-model:open="open" title="이슈 편집">
          <p>폼 내용</p>
          <template #footer>
            <div style="display:flex;justify-content:flex-end;gap:8px">
              <UiButton variant="ghost" @click="open = false">취소</UiButton>
              <UiButton variant="primary" @click="open = false">저장</UiButton>
            </div>
          </template>
        </UiDrawer>
      </div>
    `,
  }),
}

export const LeftPosition: Story = {
  render: () => ({
    components: { UiDrawer, UiButton },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <UiButton @click="open = true">왼쪽 Drawer</UiButton>
        <UiDrawer v-model:open="open" title="설정" position="left">
          <p>왼쪽에서 열립니다.</p>
        </UiDrawer>
      </div>
    `,
  }),
}
