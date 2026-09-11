import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UiPageHeader from './UiPageHeader.vue'
import UiAlert from './UiAlert.vue'
import UiButton from './UiButton.vue'
import UiIcon from './UiIcon.vue'

const meta = {
  title: 'Components/Display/UiPageHeader', component: UiPageHeader, tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: '페이지 제목과 설명, 개수, 액션을 구성합니다. title·description·count·heading props, description·meta·badge·actions 슬롯을 지원합니다. 제목 계층은 heading으로 지정하고, 안내 배너는 UiAlert를 별도로 조합합니다.' } } },
  args: { title: '통과 목록', description: '조건을 충족한 종목을 확인합니다.', count: 5, heading: 'h1' },
} satisfies Meta<typeof UiPageHeader>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
export const Simple: Story = { args: { title: '설정', description: '서비스 기본 설정을 관리합니다.', count: undefined } }
export const SectionHeader: Story = {
  name: '작은 섹션 헤더 · 한 줄 배치',
  args: {
    title: '통과 목록', count: 5, heading: 'h2', size: 'sm', layout: 'inline',
    description: '09.11 종가 기준 · 검사 677종 → 5종 · 장대양봉 6% · 5일선 +2% · 횡보 20일',
  },
  render: (args) => ({
    components: { UiPageHeader, UiButton, UiIcon },
    setup() {
      const exported = ref(false)
      return { args, exported }
    },
    template: `<div>
      <UiPageHeader v-bind="args">
        <template #actions><UiButton variant="outline" size="sm" @click="exported = true"><template #icon-left><UiIcon name="download" :size="16" /></template>내보내기</UiButton></template>
      </UiPageHeader>
      <p v-if="exported" role="status" style="margin-top: 12px; font-size: 12px;">내보내기 액션 예제입니다.</p>
    </div>`,
  }),
}
export const WithAlert: Story = {
  name: '제목 + 안내 배너',
  render: () => ({
    components: { UiPageHeader, UiAlert, UiButton, UiIcon },
    setup() { const refreshCount = ref(0); return { refreshCount } },
    template: `<div style="display: grid; gap: 20px;">
      <UiPageHeader title="5일선 눌림" description="횡보 후 첫 장대양봉 → 5일선 눌림">
        <template #meta><code>scan-ma5-pullback.py</code></template>
        <template #actions><UiButton variant="outline" @click="refreshCount++"><template #icon-left><UiIcon name="refresh-cw" :size="16" /></template>새로고침</UiButton></template>
      </UiPageHeader>
      <UiAlert variant="warning" title="검증 전 데이터">백테스트 0일 · 2차 자료 · 파라미터 추정치 · <strong>매수 추천 아님</strong></UiAlert>
      <p v-if="refreshCount" role="status" style="font-size: 13px;">새로고침 예제 실행 {{ refreshCount }}회</p>
    </div>`,
  }),
}
