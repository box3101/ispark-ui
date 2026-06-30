import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { computed, ref } from 'vue'
import UiPagination from './UiPagination.vue'
import UiTable from './UiTable.vue'
import UiEmpty from './UiEmpty.vue'
import type { TableColumn } from './UiTable.vue'

const meta = {
  title: 'Components/Display/UiPagination',
  component: UiPagination,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: `
ispark-ui 표준 페이지네이션. UiTable과 짝으로 자주 쓰이는 리스트 네비게이션.

## API
- **\`modelValue\`** \`number\` — 현재 페이지(1-indexed). v-model
- **\`totalCount\`** \`number\` — 전체 항목 수
- **\`pageSize\`** \`number\` — 페이지당 항목 수 (기본 10)
- **\`totalLabel\`** \`string\` — 좌측 '총 N개'의 단위 ('개'/'건'/'명' 등)
- **\`prevLabel\`** / **\`nextLabel\`** — 이전/다음 버튼 라벨
- **\`showTotal\`** \`boolean\` — '총 N개' 좌측 표시 (기본 true)
- **\`showRange\`** \`boolean\` — 'n-m / total' 우측 표시 (기본 true)
- **\`align\`** \`'left' | 'center' | 'right' | 'between'\` — 가로 정렬 (기본 'between' = 양끝 분배). 컨트롤만 가운데 두려면 \`align="center"\` + \`showTotal\`/\`showRange\` false

## 페이지 번호 표시 규칙
- 총 7페이지 이하: 전체 번호 표시
- 8페이지 이상: \`[1, ..., cur-1, cur, cur+1, ..., total]\` 패턴, 끝쪽으로 가면 ... 사라짐

## 이벤트
- \`update:modelValue\` — v-model 양방향
- \`change\` — 동일 payload 별도 emit

## 접근성
- 루트 \`<nav aria-label="페이지네이션">\`
- 현재 페이지: \`aria-current="page"\`
- 이전/다음 버튼: \`aria-label\`
- 페이지 번호 버튼: \`aria-label="N 페이지"\`
- 범위 표시: \`aria-live="polite"\` — 페이지 변경 시 SR이 안내
- \`prefers-reduced-motion: reduce\` 시 transition 정지
        `,
      },
    },
  },
} satisfies Meta<typeof UiPagination>

export default meta
type Story = StoryObj<typeof meta>

// ===== Stories =====

export const Playground: Story = {
  args: {
    modelValue: 3,
    totalCount: 247,
    pageSize: 10,
    totalLabel: '개',
  },
  render: (args) => ({
    components: { UiPagination },
    setup: () => {
      const page = ref(args.modelValue)
      return { args, page }
    },
    template: '<UiPagination v-bind="args" v-model="page" />',
  }),
}

// 가운데 정렬 — 컨트롤만 중앙 (총개수/range 숨김)
export const Centered: Story = {
  args: {
    modelValue: 1,
    totalCount: 100,
    pageSize: 10,
    align: 'center',
    showTotal: false,
    showRange: false,
  },
  render: (args) => ({
    components: { UiPagination },
    setup: () => {
      const page = ref(args.modelValue)
      return { args, page }
    },
    template: '<UiPagination v-bind="args" v-model="page" />',
  }),
}

// 기본 — 총 100개 / 10페이지
export const Default: Story = {
  args: {
    totalCount: 100,
    pageSize: 10,
  },
  render: (args) => ({
    components: { UiPagination },
    setup: () => {
      const page = ref(1)
      return { args, page }
    },
    template: '<UiPagination v-bind="args" v-model="page" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // 다음 버튼 클릭 → page 2로
    const next = canvas.getByLabelText('다음 페이지')
    await userEvent.click(next)
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith(2)
    await expect(args.onChange).toHaveBeenCalledWith(2)
  },
}

// 7페이지 이하 — 전체 번호 표시
export const FewPages: Story = {
  args: {
    modelValue: 2,
    totalCount: 35,
    pageSize: 10,
  },
  render: (args) => ({
    components: { UiPagination },
    setup: () => {
      const page = ref(args.modelValue)
      return { args, page }
    },
    template: '<UiPagination v-bind="args" v-model="page" />',
  }),
}

// 많은 페이지 — 말줄임 패턴
export const ManyPages: Story = {
  args: {
    modelValue: 5,
    totalCount: 500,
    pageSize: 10,
  },
  render: (args) => ({
    components: { UiPagination },
    setup: () => {
      const page = ref(args.modelValue)
      return { args, page }
    },
    template: '<UiPagination v-bind="args" v-model="page" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // 말줄임 (...) 존재
    const ellipses = canvas.getAllByText('…')
    await expect(ellipses.length).toBeGreaterThan(0)
    // aria-current=page 버튼이 하나 있어야 함
    const current = canvasElement.querySelectorAll('[aria-current="page"]')
    await expect(current.length).toBe(1)
  },
}

// 첫 페이지 — '이전' 비활성
export const FirstPage: Story = {
  args: {
    modelValue: 1,
    totalCount: 247,
    pageSize: 10,
  },
  render: (args) => ({
    components: { UiPagination },
    setup: () => {
      const page = ref(args.modelValue)
      return { args, page }
    },
    template: '<UiPagination v-bind="args" v-model="page" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prev = canvas.getByLabelText('이전 페이지') as HTMLButtonElement
    await expect(prev.disabled).toBe(true)
  },
}

// 마지막 페이지 — '다음' 비활성
export const LastPage: Story = {
  args: {
    modelValue: 25,
    totalCount: 247,
    pageSize: 10,
  },
  render: (args) => ({
    components: { UiPagination },
    setup: () => {
      const page = ref(args.modelValue)
      return { args, page }
    },
    template: '<UiPagination v-bind="args" v-model="page" />',
  }),
}

// 빈 상태 — totalCount 0
export const Empty: Story = {
  args: {
    modelValue: 1,
    totalCount: 0,
  },
  render: (args) => ({
    components: { UiPagination },
    setup: () => {
      const page = ref(args.modelValue)
      return { args, page }
    },
    template: '<UiPagination v-bind="args" v-model="page" />',
  }),
}

// UiTable + UiPagination + UiEmpty 통합 — 실 사용 패턴
export const WithUiTable: Story = {
  render: () => ({
    components: { UiPagination, UiTable, UiEmpty },
    setup: () => {
      const page = ref(1)
      const pageSize = 5
      // 가상 데이터 100건
      const allData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `항목 #${i + 1}`,
        region: ['서울', '부산', '대구', '인천', '대전'][i % 5],
        total: ((i + 1) * 1234567).toLocaleString(),
      }))
      const columns: TableColumn[] = [
        { key: 'id', label: 'ID', width: '80px' },
        { key: 'name', label: '이름', align: 'left' },
        { key: 'region', label: '지역' },
        { key: 'total', label: '금액', align: 'right' },
      ]
      const pagedData = computed(() => {
        const start = (page.value - 1) * pageSize
        return allData.slice(start, start + pageSize)
      })
      return { page, pagedData, columns, totalCount: allData.length, pageSize }
    },
    template: `
      <div>
        <UiTable v-if="pagedData.length > 0" :columns="columns" :data="pagedData" />
        <UiEmpty v-else />
        <div style="margin-top: 16px;">
          <UiPagination
            v-model="page"
            :total-count="totalCount"
            :page-size="pageSize"
            total-label="건"
          />
        </div>
      </div>
    `,
  }),
}
