import type { Meta, StoryObj } from '@storybook/vue3'
import { expect } from '@storybook/test'
import UiConfirm from './UiConfirm.vue'
import UiButton from './UiButton.vue'
import UiToast from './UiToast.vue'
import { openConfirm } from '../../composables/useConfirm'
import { openToast } from '../../composables/useToast'

const meta = {
  title: 'Components/Feedback/UiConfirm',
  component: UiConfirm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
\`UiConfirm\`은 모듈 싱글톤 기반 확인 다이얼로그. \`openConfirm()\`으로 어디서든 호출, \`Promise<boolean>\`을 반환.

## 사용

\`\`\`vue
<script setup>
import { UiConfirm, openConfirm, openToast } from 'ispark-ui'

async function onDelete() {
  const confirmed = await openConfirm({
    title: '삭제',
    message: '삭제하시겠습니까?',
  })
  if (!confirmed) return
  // 삭제 처리
  openToast({ message: '삭제되었습니다.', type: 'success' })
}
</script>

<template>
  <button @click="onDelete">삭제</button>
  <UiConfirm />  <!-- 앱 루트에 한 번 -->
</template>
\`\`\`

## API

- **\`title\`** 모달 제목 (기본: '확인')
- **\`message\`** 확인 메시지 (필수)
- **\`confirmText\`** 확인 버튼 텍스트 (기본: '확인')
- **\`cancelText\`** 취소 버튼 텍스트 (기본: '취소')
- **\`variant\`** \`'primary'\` | \`'danger'\` — 확인 버튼 색상 (기본: 'danger')
        `,
      },
    },
  },
} satisfies Meta<typeof UiConfirm>

export default meta
type Story = StoryObj<typeof meta>

// ===== Playground — 삭제 확인 =====
export const Playground: Story = {
  render: () => ({
    components: { UiButton, UiConfirm, UiToast },
    setup() {
      async function onDelete() {
        const confirmed = await openConfirm({
          title: '삭제',
          message: '이 항목을 삭제하시겠습니까?\n삭제된 항목은 복구할 수 없습니다.',
        })
        if (confirmed) {
          openToast({ message: '삭제되었습니다.', type: 'success' })
        } else {
          openToast({ message: '취소되었습니다.', type: 'info' })
        }
      }
      return { onDelete }
    },
    template: `
      <div>
        <UiButton variant="danger" @click="onDelete">삭제</UiButton>
        <UiConfirm />
        <UiToast />
      </div>
    `,
  }),
}

// ===== Primary variant — 저장 확인 =====
export const PrimaryVariant: Story = {
  name: 'Primary variant (저장)',
  render: () => ({
    components: { UiButton, UiConfirm, UiToast },
    setup() {
      async function onSave() {
        const confirmed = await openConfirm({
          title: '저장',
          message: '변경사항을 저장하시겠습니까?',
          variant: 'primary',
          confirmText: '저장',
        })
        if (confirmed) {
          openToast({ message: '저장되었습니다.', type: 'success' })
        }
      }
      return { onSave }
    },
    template: `
      <div>
        <UiButton variant="primary" @click="onSave">저장</UiButton>
        <UiConfirm />
        <UiToast />
      </div>
    `,
  }),
}

// ===== CustomText — 커스텀 버튼 텍스트 =====
export const CustomText: Story = {
  name: '커스텀 버튼 텍스트',
  render: () => ({
    components: { UiButton, UiConfirm, UiToast },
    setup() {
      async function onLogout() {
        const confirmed = await openConfirm({
          title: '로그아웃',
          message: '로그아웃 하시겠습니까?',
          confirmText: '로그아웃',
          cancelText: '돌아가기',
          variant: 'primary',
        })
        if (confirmed) {
          openToast({ message: '로그아웃 되었습니다.', type: 'info' })
        }
      }
      return { onLogout }
    },
    template: `
      <div>
        <UiButton variant="secondary" @click="onLogout">로그아웃</UiButton>
        <UiConfirm />
        <UiToast />
      </div>
    `,
  }),
}

// ===== AutoFire — play 함수로 자동 검증 =====
export const AutoFire: Story = {
  name: '자동 검증 (play)',
  render: () => ({
    components: { UiButton, UiConfirm },
    setup() {
      // 스토리 마운트 시 자동 호출
      openConfirm({
        title: '테스트',
        message: '자동으로 띄운 확인 다이얼로그',
      })
      return {}
    },
    template: '<UiConfirm />',
  }),
  play: async () => {
    // Teleport 대상은 body. document로 검사
    const dialog = document.querySelector('.ui-confirm-content')
    await expect(dialog).toBeTruthy()

    const title = document.querySelector('.ui-confirm-title')
    await expect(title?.textContent).toBe('테스트')
  },
}
