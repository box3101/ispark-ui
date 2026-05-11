import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import UiTable from './UiTable.vue'
import type { TableColumn } from './UiTable.vue'

const meta = {
  title: 'Components/UiTable',
  component: UiTable,
  tags: ['autodocs'],
  args: {
    onRowClick: fn(),
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['md', 'sm'],
      description: 'md(기본 42px) / sm(28px 컴팩트)',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'maxHeight과 함께 사용',
    },
    maxHeight: {
      control: 'text',
      description: '예: "200px" — 초과 시 스크롤',
    },
    clickable: {
      control: 'boolean',
      description: '행 hover/cursor 스타일 (row-click 이벤트는 항상 발생)',
    },
  },
} satisfies Meta<typeof UiTable>

export default meta
type Story = StoryObj<typeof meta>

// ===== 공통 fixture =====
const baseColumns: TableColumn[] = [
  { key: 'name', label: '통계명', width: '320px', align: 'left' },
  { key: 'region', label: '지역', width: '150px' },
  { key: 'total', label: '합계', align: 'right' },
  { key: 'average', label: '평균', align: 'right' },
]

const baseData = [
  { name: 'BF.총매출액.케이블플랫폼매출액', region: '대전', total: '44,865,368,290', average: '3,738,780,690.83' },
  { name: 'BF.총매출액.케이블플랫폼매출액', region: '서울', total: '52,341,200,100', average: '4,361,766,675.00' },
  { name: 'BF.총매출액.SO매출액', region: '부산', total: '31,256,890,450', average: '2,604,740,870.83' },
  { name: 'BF.총매출액.SO매출액', region: '대구', total: '28,904,112,300', average: '2,408,676,025.00' },
]

const longData = [
  ...baseData,
  { name: 'BF.영업이익.케이블영업이익', region: '인천', total: '15,230,450,000', average: '1,269,204,166.67' },
  { name: 'BF.영업이익.SO영업이익', region: '광주', total: '12,890,330,200', average: '1,074,194,183.33' },
  { name: 'BF.영업이익.SO영업이익', region: '울산', total: '9,456,780,100', average: '788,065,008.33' },
  { name: 'BF.당기순이익.케이블당기순이익', region: '세종', total: '7,234,560,000', average: '602,880,000.00' },
  { name: 'BF.당기순이익.SO당기순이익', region: '경기', total: '65,432,100,500', average: '5,452,675,041.67' },
  { name: 'BF.당기순이익.SO당기순이익', region: '강원', total: '4,567,890,300', average: '380,657,525.00' },
]

// ===== Stories =====
export const Default: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
  },
  render: (args) => ({
    components: { UiTable },
    setup: () => ({ args }),
    template: '<UiTable v-bind="args" />',
  }),
}

export const StickyHeader: Story = {
  args: {
    columns: baseColumns,
    data: longData,
    stickyHeader: true,
    maxHeight: '200px',
  },
  render: (args) => ({
    components: { UiTable },
    setup: () => ({ args }),
    template: '<UiTable v-bind="args" />',
  }),
}

export const CustomCell: Story = {
  args: {
    columns: [
      { key: 'service', label: '서비스명', width: '200px', align: 'left' },
      { key: 'region', label: '지역', width: '120px' },
      { key: 'count', label: '건수', align: 'right' },
      { key: 'status', label: '상태', width: '120px' },
    ],
    data: [
      { service: '케이블 인터넷', region: '서울', count: '1,234', status: '정상' },
      { service: 'IPTV 서비스', region: '부산', count: '567', status: '점검' },
      { service: '유선전화', region: '대구', count: '890', status: '정상' },
    ],
  },
  render: (args) => ({
    components: { UiTable },
    setup: () => ({ args }),
    // UiBadge 미존재 — 임시로 색상 입힌 span으로 대체
    template: `
      <UiTable v-bind="args">
        <template #cell-status="{ value }">
          <span :style="{
            display: 'inline-block',
            padding: '2px 10px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff',
            background: value === '정상' ? '#22c55e' : '#ef4444',
          }">{{ value }}</span>
        </template>
      </UiTable>
    `,
  }),
}

export const Empty: Story = {
  args: {
    columns: baseColumns,
    data: [],
  },
  render: (args) => ({
    components: { UiTable },
    setup: () => ({ args }),
    template: '<UiTable v-bind="args" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // 기본 emptyText 노출 검증
    await expect(canvas.getByText('데이터가 없습니다.')).toBeTruthy()
  },
}
