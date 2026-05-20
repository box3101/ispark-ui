import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import UiToast from './UiToast.vue'
import UiButton from './UiButton.vue'
import { openToast, closeToast, type ToastType, type ToastPlacement } from '../../composables/useToast'

const meta = {
  title: 'Components/Feedback/UiToast',
  component: UiToast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
\`UiToast\`는 모듈 싱글톤 기반 알림. \`openToast()\`로 어디서든 호출.

## 사용

\`\`\`vue
<script setup>
import { UiToast, openToast } from 'ispark-ui'
</script>

<template>
  <button @click="openToast({ message: '저장됨', type: 'success' })">저장</button>
  <UiToast />  <!-- 앱 루트에 한 번 -->
</template>
\`\`\`

## API

- **\`type\`** \`success\` | \`error\` | \`warning\` | \`info\` — 좌측 컬러 보더 + 아이콘
- **\`duration\`** ms — 기본 2500. \`0\`이면 자동 닫기 안 함 (수동 close)
- **\`placement\`** \`top-center\`(기본) | \`top-right\` | \`bottom-center\` | \`bottom-right\` — placement별 독립 stack
- 최대 동시 표시 5개 (placement별). 초과 시 가장 오래된 toast 제거.
        `,
      },
    },
  },
} satisfies Meta<typeof UiToast>

export default meta
type Story = StoryObj<typeof meta>

const fire = (
  message: string,
  type: ToastType = 'info',
  placement: ToastPlacement = 'top-center',
  duration?: number,
) => openToast({ message, type, placement, duration })

// ===== Playground — 4 type 한 화면 =====
export const Playground: Story = {
  render: () => ({
    components: { UiButton, UiToast },
    setup: () => ({ fire }),
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiButton variant="primary" @click="fire('저장되었습니다', 'success')">success</UiButton>
        <UiButton variant="ghost" @click="fire('새 메시지', 'info')">info</UiButton>
        <UiButton variant="secondary" @click="fire('확인이 필요합니다', 'warning')">warning</UiButton>
        <UiButton variant="danger" @click="fire('저장 실패', 'error')">error</UiButton>
        <UiToast />
      </div>
    `,
  }),
}

// ===== AllPlacements — 4 위치 시연 =====
export const AllPlacements: Story = {
  name: '위치 (placement)',
  render: () => ({
    components: { UiButton, UiToast },
    setup: () => ({ fire }),
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiButton variant="primary" @click="fire('top-center', 'info', 'top-center')">top-center</UiButton>
        <UiButton variant="primary" @click="fire('top-right', 'info', 'top-right')">top-right</UiButton>
        <UiButton variant="primary" @click="fire('bottom-center', 'info', 'bottom-center')">bottom-center</UiButton>
        <UiButton variant="primary" @click="fire('bottom-right', 'info', 'bottom-right')">bottom-right</UiButton>
        <UiToast />
      </div>
    `,
  }),
}

// ===== Multiple — overflow 동작 (6번째 띄울 때 첫 번째 제거) =====
export const Multiple: Story = {
  name: '동시 5개 (overflow)',
  render: () => ({
    components: { UiButton, UiToast },
    setup() {
      const spamSix = () => {
        for (let i = 1; i <= 6; i++) {
          openToast({ message: `토스트 ${i}/6`, type: 'info', duration: 8000 })
        }
      }
      return { spamSix }
    },
    template: `
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; color: #6f7a93;">
          6개 빠르게 띄우면 첫 번째가 자동 제거되어 5개만 남습니다.
        </p>
        <UiButton variant="primary" @click="spamSix">6개 빠르게 띄우기</UiButton>
        <UiToast />
      </div>
    `,
  }),
}

// ===== ManualClose — duration 0 + 수동 close =====
export const ManualClose: Story = {
  name: '수동 닫기 (duration 0)',
  render: () => ({
    components: { UiButton, UiToast },
    setup() {
      let lastId = 0
      const open = () => {
        lastId = openToast({
          message: '자동 닫기 안 함. X 또는 아래 버튼으로 닫기.',
          type: 'warning',
          duration: 0,
        })
      }
      const closeLast = () => {
        if (lastId) closeToast(lastId)
      }
      return { open, closeLast }
    },
    template: `
      <div style="display: flex; gap: 8px;">
        <UiButton variant="primary" @click="open">duration=0 띄우기</UiButton>
        <UiButton variant="secondary" @click="closeLast">마지막 토스트 닫기</UiButton>
        <UiToast />
      </div>
    `,
  }),
}

// ===== AutoFire — play 함수로 자동 검증 =====
export const AutoFire: Story = {
  name: '자동 검증 (play)',
  render: () => ({
    components: { UiToast },
    setup() {
      openToast({ message: '자동으로 띄운 토스트', type: 'success', duration: 5000 })
      return {}
    },
    template: '<UiToast />',
  }),
  play: async () => {
    // Teleport 대상은 body. screen 대신 document로 검사
    const toast = document.querySelector('.ui-toast.type-success')
    await expect(toast).toBeTruthy()
  },
}

// ===== Showcase — Introduction 카드 grid 임베드용 (자동 fire + 영구) =====
export const Showcase: Story = {
  name: 'Showcase (preview)',
  render: () => ({
    components: { UiToast },
    setup() {
      // 카드 안에 항상 보이도록 영구 (duration 0 = 자동 닫기 안 함)
      openToast({ message: '저장되었습니다', type: 'success', duration: 0 })
      return {}
    },
    template: '<UiToast />',
  }),
  parameters: {
    docs: { disable: true },
  },
}
