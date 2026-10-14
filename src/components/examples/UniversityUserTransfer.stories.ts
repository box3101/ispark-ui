import type { Meta, StoryObj } from '@storybook/vue3'
import UniversityUserTransfer from './UniversityUserTransfer.vue'

const meta = {
  title: 'Patterns/UniversityUserTransfer',
  component: UniversityUserTransfer,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: '대학 목록 + 공통 UiTransfer를 조합한 3열 사용자 지정 예시입니다. 전체 사용자 데이터를 items로 유지하고 sourceFilter로 왼쪽 후보만 대학별로 좁힙니다. 오른쪽 목록은 대학을 바꿔도 유지되며 중복 추가되지 않습니다. 저장·취소는 화면 내 상태만 변경하는 데모입니다.' } } },
} satisfies Meta<typeof UniversityUserTransfer>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { name: '대학 목록 + 사용자 선택' }
