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
  parameters: {
    docs: {
      description: {
        component: `
## 핵심 props

- **\`columns\`** \`TableColumn[]\` — 컬럼 정의 (key/label/width/align/headerAlign/sortable/sortType)
- **\`data\`** \`Record<string, any>[]\` — 행 데이터 배열
- **\`stickyHeader\`** \`boolean\` — \`maxHeight\`과 함께 사용해 헤더 고정
- **\`maxHeight\`** \`string\` — 예: \`"200px"\`. 초과 시 세로 스크롤 + 커스텀 스크롤바
- **\`emptyText\`** \`string\` — 빈 상태 메시지 (기본 \`'데이터가 없습니다.'\`)
- **\`clickable\`** \`boolean\` — 행 hover 배경 + cursor pointer (\`row-click\` 이벤트는 항상 emit)
- **\`size\`** \`'md'\`(기본 42px) | \`'sm'\`(28px 컴팩트)
- **\`selectedRowKey\`** + **\`selectedRowValue\`** — 둘 다 지정 시 매칭 행에 primary 색 배경

---

## TableColumn 인터페이스

\`\`\`ts
interface TableColumn {
  key: string                                          // 데이터 객체의 키
  label: string                                        // 헤더 텍스트
  width?: string                                       // '320px', '150px' 등 (미지정 시 auto)
  align?: 'left' | 'center' | 'right'                  // 바디 셀 정렬 (기본 'center')
  headerAlign?: 'left' | 'center' | 'right'            // 헤더 정렬 (기본 'center')
  sortable?: boolean                                   // 헤더 클릭 정렬 사용 여부
  sortType?: 'auto' | 'string' | 'number' | 'date'    // 정렬 비교 타입 (기본 'auto')
}
\`\`\`

---

## 슬롯 / 이벤트

- **\`#header-{key}\`** — 헤더 셀 커스텀. 슬롯 props: \`{ column, isSortable, sortOrder, onSort }\`
- **\`#cell-{key}\`** — 바디 셀 커스텀. 슬롯 props: \`{ row, value, index }\`
- **\`@row-click\`** — \`(row, index)\` 페이로드. \`clickable\` 여부와 무관하게 항상 발생

---

## 정렬 동작

\`sortable: true\` 컬럼 헤더 클릭 시: **asc → desc → 해제** 3단 토글.
\`sortType\` 비교 방식:
- \`'auto'\`(기본): 숫자 변환 → 날짜 변환 → 문자열(한국어 \`localeCompare\`) 순 폴백
- \`'number'\`: 쉼표 제거 후 숫자 비교 (예: \`"44,865,368,290"\` → \`44865368290\`)
- \`'date'\`: \`Date.parse\` ms
- \`'string'\`: 한국어 \`localeCompare\`

\`columns\`에서 정렬 중인 컬럼이 사라지면 sortState는 자동 리셋된다.

---

## 테스트 현황

자동 테스트 3개(엣지 케이스) + Storybook play 함수 3개로 동작 보장.

- **엣지** — 쉼표 포함 number 정렬, columns 변경 시 sortState 리셋, emptyText 커스텀
- **play** — Empty(메시지), Clickable(row-click 호출), Sortable(asc/desc/해제)
        `,
      },
    },
  },
  argTypes: {
    // ===== Data =====
    columns: {
      control: 'object',
      description: '컬럼 정의 배열. `key`/`label` 필수, `width`/`align`/`headerAlign`/`sortable`/`sortType` 선택.',
      table: {
        category: 'Data',
        type: { summary: 'TableColumn[]' },
      },
    },
    data: {
      control: 'object',
      description: '행 데이터 배열. 각 행은 `columns[].key`를 키로 갖는 객체.',
      table: {
        category: 'Data',
        type: { summary: 'Record<string, any>[]' },
      },
    },

    // ===== Appearance =====
    size: {
      control: 'inline-radio',
      options: ['md', 'sm'],
      description: '`md`(기본 42px) / `sm`(28px 컴팩트).',
      table: {
        category: 'Appearance',
        type: { summary: "'md' | 'sm'" },
        defaultValue: { summary: "'md'" },
      },
    },
    stickyHeader: {
      control: 'boolean',
      description: '`maxHeight`과 함께 사용. 스크롤 중에도 헤더가 상단에 고정된다.',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxHeight: {
      control: 'text',
      description: '예: `"200px"`. 초과 시 세로 스크롤 + 커스텀 스크롤바 적용.',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },

    // ===== Behavior =====
    clickable: {
      control: 'boolean',
      description: '행 hover 배경 + cursor pointer 적용. ⚠️ `row-click` 이벤트는 이 prop과 무관하게 **항상** emit된다.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    emptyText: {
      control: 'text',
      description: '`data`가 빈 배열일 때 표시할 메시지. 빈 상태 UI 전체를 교체하려면 컴포넌트 바깥에서 `UiEmpty` 사용 권장.',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
        defaultValue: { summary: "'데이터가 없습니다.'" },
      },
    },

    // ===== Selection =====
    selectedRowKey: {
      control: 'text',
      description: '선택 행 강조용 키. `selectedRowValue`와 함께 지정 시 `row[selectedRowKey] === selectedRowValue` 행에 `is-selected` 클래스 + primary 색 배경.',
      table: {
        category: 'Selection',
        type: { summary: 'string' },
      },
    },
    selectedRowValue: {
      control: 'text',
      description: '선택 행 강조용 값. `selectedRowKey`와 짝으로 사용. 둘 중 하나만 지정하면 강조 효과 없음.',
      table: {
        category: 'Selection',
        type: { summary: 'string' },
      },
    },

    // ===== Events =====
    onRowClick: {
      name: 'row-click',
      action: 'row-click',
      description: '행 클릭 시 emit. payload: `(row: Record<string, any>, index: number)`. `clickable` prop 여부와 무관하게 항상 발생.',
      table: {
        category: 'Events',
        type: { summary: '(row, index) => void' },
      },
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

// ===== 1. Playground — 모든 props를 Controls로 조작 =====
// columns/data는 baseColumns/baseData 고정. size/stickyHeader/maxHeight/
// clickable/emptyText/selectedRowKey·Value를 패널에서 토글
export const Playground: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    size: 'md',
    stickyHeader: false,
    maxHeight: '',
    clickable: false,
    emptyText: '데이터가 없습니다.',
    selectedRowKey: '',
    selectedRowValue: '',
  },
  argTypes: {
    emptyText: {
      control: 'text',
      description: '빈 상태 메시지 (기본 "데이터가 없습니다.")',
    },
    selectedRowKey: {
      control: 'text',
      description: '예: "region" — selectedRowValue와 매칭되는 행 강조',
    },
    selectedRowValue: {
      control: 'text',
      description: '예: "부산" — selectedRowKey와 함께 사용',
    },
  } as never,
  render: (args) => ({
    components: { UiTable },
    setup: () => ({ args }),
    template: '<UiTable v-bind="args" />',
  }),
}

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
    // UiBadge 미존재 — 임시 span. 라이트 틴트 + 짙은 텍스트로 테이블 톤에 맞춤
    template: `
      <UiTable v-bind="args">
        <template #cell-status="{ value }">
          <span :style="{
            display: 'inline-block',
            padding: '2px 10px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 600,
            color: value === '정상' ? '#15803d' : '#b91c1c',
            background: value === '정상' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
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

export const Clickable: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    clickable: true,
  },
  render: (args) => ({
    components: { UiTable },
    setup: () => ({ args }),
    template: '<UiTable v-bind="args" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // 첫 번째 데이터 행 — 통계명 셀 텍스트로 행 찾기
    const firstRowCell = canvas.getAllByText('BF.총매출액.케이블플랫폼매출액')[0]
    const tr = firstRowCell.closest('tr')!
    await userEvent.click(tr)
    // onRowClick(row, index) 호출 검증 — 첫 행 = index 0
    await expect(args.onRowClick).toHaveBeenCalledWith(
      expect.objectContaining({ region: '대전' }),
      0,
    )
  },
}

export const SmallSize: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    size: 'sm',
  },
  render: (args) => ({
    components: { UiTable },
    setup: () => ({ args }),
    template: '<UiTable v-bind="args" />',
  }),
}

export const SelectedRow: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    selectedRowKey: 'region',
    selectedRowValue: '부산',
  },
  render: (args) => ({
    components: { UiTable },
    setup: () => ({ args }),
    template: '<UiTable v-bind="args" />',
  }),
}

export const Sortable: Story = {
  args: {
    columns: [
      { key: 'name', label: '이름', width: '200px', align: 'left', sortable: true, sortType: 'string' },
      { key: 'score', label: '점수', align: 'right', sortable: true, sortType: 'number' },
      { key: 'joined', label: '가입일', align: 'center', sortable: true, sortType: 'date' },
    ],
    data: [
      { name: '김철수', score: '1,234', joined: '2025-03-15' },
      { name: '이영희', score: '890', joined: '2024-11-20' },
      { name: '박민수', score: '2,567', joined: '2025-07-01' },
      { name: '최지원', score: '456', joined: '2024-08-10' },
    ],
  },
  render: (args) => ({
    components: { UiTable },
    setup: () => ({ args }),
    template: '<UiTable v-bind="args" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // 점수 컬럼 헤더 버튼 + 해당 <th>
    const scoreBtn = canvas.getByRole('button', { name: /점수/ })
    const scoreTh = scoreBtn.closest('th')!
    const sortMark = scoreBtn.querySelector('.ui-table-sort-mark')!

    // 초기 상태: aria-sort="none" — 정렬 가능 컬럼이지만 미정렬
    await expect(scoreTh.getAttribute('aria-sort')).toBe('none')

    // 1차 클릭: asc — is-active 적용, is-desc 미적용, aria-sort="ascending"
    await userEvent.click(scoreBtn)
    await expect(sortMark.classList.contains('is-active')).toBe(true)
    await expect(sortMark.classList.contains('is-desc')).toBe(false)
    await expect(scoreTh.getAttribute('aria-sort')).toBe('ascending')

    // 정렬 결과 확인 — 첫 행이 가장 낮은 점수(456)
    const firstRow = canvasElement.querySelector('tbody tr')!
    await expect(firstRow.textContent).toContain('최지원')

    // 2차 클릭: desc — is-desc 적용, aria-sort="descending"
    await userEvent.click(scoreBtn)
    await expect(sortMark.classList.contains('is-desc')).toBe(true)
    await expect(scoreTh.getAttribute('aria-sort')).toBe('descending')
    const firstRowDesc = canvasElement.querySelector('tbody tr')!
    await expect(firstRowDesc.textContent).toContain('박민수') // 2,567

    // 3차 클릭: 해제 — is-active 미적용, aria-sort="none"
    await userEvent.click(scoreBtn)
    await expect(sortMark.classList.contains('is-active')).toBe(false)
    await expect(scoreTh.getAttribute('aria-sort')).toBe('none')

    // 비정렬 컬럼은 aria-sort 속성 자체가 없어야 함 — 같은 스토리에는 sortable 3개뿐이므로 검증 생략
  },
}
