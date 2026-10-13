import type { Meta, StoryObj } from '@storybook/vue3'
import UniversityList from './UniversityList.vue'

const meta = {
  title: 'Patterns/UniversityList',
  component: UniversityList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: '대학 및 담당자 목록의 검색·필터 영역 예시. 32px 입력과 버튼, 조회·초기화, 결과 개수와 목록 액션을 배치합니다. 샘플 3건으로 조회·초기화를 체험할 수 있습니다.' } },
  },
} satisfies Meta<typeof UniversityList>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { name: '검색 영역 + 목록' }
