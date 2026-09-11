import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UiAlert from './UiAlert.vue'
import UiButton from './UiButton.vue'
const meta = {
  title: 'Components/Feedback/UiAlert', component: UiAlert, tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: '페이지 안에 표시하는 안내 배너입니다. variant: info·success·warning·error·neutral. title·description 또는 기본 슬롯으로 내용을 구성합니다. dismissible로 닫기 버튼, v-model로 표시 상태, actions 슬롯으로 액션을 제어합니다. 기본 role은 status이며 긴급 알림만 alert로 지정하세요.' } } },
  args: { title: '안내', description: '데이터는 매일 장 마감 후 갱신됩니다.', variant: 'info', dismissible: false },
} satisfies Meta<typeof UiAlert>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
export const AllVariants: Story = {
  render: () => ({ components: { UiAlert }, template: `<div style="display: grid; gap: 12px;">
    <UiAlert title="안내" description="데이터는 매일 장 마감 후 갱신됩니다." />
    <UiAlert variant="success" title="완료" description="변경사항을 저장했습니다." />
    <UiAlert variant="warning" title="주의" description="아직 검증되지 않은 데이터입니다." />
    <UiAlert variant="error" title="오류" description="데이터를 불러오지 못했습니다." />
    <UiAlert variant="neutral" description="서비스 점검 일정을 확인해 주세요." />
  </div>` }),
}
export const Dismissible: Story = {
  render: () => ({
    components: { UiAlert, UiButton },
    setup() { const visible = ref(true); return { visible } },
    template: `<div style="display: grid; gap: 12px;"><UiAlert v-model="visible" dismissible title="안내" description="닫은 후 다시 표시할 수 있습니다." /><UiButton v-if="!visible" variant="outline" @click="visible = true">다시 표시</UiButton></div>`,
  }),
}
