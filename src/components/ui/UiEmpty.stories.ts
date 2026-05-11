import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import { ref } from 'vue'
import UiEmpty from './UiEmpty.vue'
import UiButton from './UiButton.vue'
import UiTable from './UiTable.vue'
import type { TableColumn } from './UiTable.vue'

const meta = {
  title: 'Components/UiEmpty',
  component: UiEmpty,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
빈 상태(Empty State) UI 컴포넌트. 데이터 없음 / 검색 결과 없음 / 권한 없음 등 컨텍스트별 placeholder.

## 언제 사용하나
- 리스트 / 테이블 / 패널이 데이터를 못 채울 때
- 검색·필터 결과가 없을 때
- 좌측 트리에서 항목 미선택 상태일 때

## 정책
\`UiTable\`의 \`emptyText\` prop으로도 빈 상태를 표현할 수 있지만, **넓은 영역 / 액션 버튼 필요 / 아이콘 강조** 시에는 \`v-if="data.length === 0"\` 분기 후 \`UiEmpty\`를 컴포넌트 외부에서 렌더하는 것을 권장한다.

## API
- **\`icon\`** \`string\` — 아이콘 클래스명 (예: \`'icon-search'\`). 미지정 시 아이콘 미렌더.
- **\`title\`** \`string\` — 메인 텍스트. 기본값 \`'데이터가 없습니다.'\`.
- **\`description\`** \`string\` — 보조 설명. 미지정 시 미렌더.
- **default slot** — 액션 영역(다시 시도 / 등록 버튼 등). 미사용 시 wrapper 미렌더.

## 디자인 토큰
- \`color\`: \`$color-text-disabled\`(title/icon), \`$color-text-muted\`(desc)
- \`typo\`: \`$body-small\`(title), \`$body-xsmall\`(desc)
- icon 크기: \`size-24\` 클래스 (24px)
        `,
      },
    },
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ['(없음)', 'icon-search', 'icon-plus', 'icon-refresh', 'icon-trashcan', 'icon-close'],
      // '(없음)' 라벨 → 실제 prop은 undefined
      mapping: { '(없음)': undefined },
      description: '아이콘 클래스명. ispark-ui에 등록된 클래스만 사용 가능.',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: '메인 텍스트.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'데이터가 없습니다.'" },
      },
    },
    description: {
      control: 'text',
      description: '보조 설명.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof UiEmpty>

export default meta
type Story = StoryObj<typeof meta>

// ===== Stories =====

// 모든 props를 Controls로 조작
export const Playground: Story = {
  args: {
    icon: 'icon-search',
    title: '검색 결과가 없습니다.',
    description: '다른 키워드로 검색해 보세요.',
  },
  render: (args) => ({
    components: { UiEmpty },
    setup: () => ({ args }),
    template: '<UiEmpty v-bind="args" />',
  }),
}

// title만 — 가장 단순한 형태
export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { UiEmpty },
    setup: () => ({ args }),
    template: '<UiEmpty v-bind="args" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // 기본 title 검증
    await expect(canvas.getByText('데이터가 없습니다.')).toBeTruthy()
  },
}

// 아이콘 + title — 검색 결과 없음 등 컨텍스트별 데모
export const WithIcon: Story = {
  args: {
    icon: 'icon-search',
    title: '검색 결과가 없습니다.',
  },
  render: (args) => ({
    components: { UiEmpty },
    setup: () => ({ args }),
    template: '<UiEmpty v-bind="args" />',
  }),
}

// 아이콘 + title + description 3단 — 좌측 트리 미선택 안내 등
export const WithDescription: Story = {
  args: {
    icon: 'icon-search',
    title: '검색 결과가 없습니다.',
    description: '다른 키워드를 사용하거나 필터를 조정해 보세요.',
  },
  render: (args) => ({
    components: { UiEmpty },
    setup: () => ({ args }),
    template: '<UiEmpty v-bind="args" />',
  }),
}

// default slot에 액션 버튼 — '다시 시도', '새로 등록' 등
export const WithAction: Story = {
  args: {
    icon: 'icon-plus',
    title: '등록된 항목이 없습니다.',
    description: '첫 번째 항목을 만들어 보세요.',
  },
  render: (args) => ({
    components: { UiEmpty, UiButton },
    setup: () => ({ args }),
    template: `
      <UiEmpty v-bind="args">
        <UiButton variant="primary" size="sm">항목 추가</UiButton>
      </UiEmpty>
    `,
  }),
}

// UiTable과 통합 — data.length === 0 시 emptyText 대신 외부 UiEmpty 렌더
// CLAUDE.md 정책: '넓은 영역 / 아이콘 강조 시 UiEmpty 우선'
export const TableEmpty: Story = {
  args: {
    icon: 'icon-search',
    title: '조회된 데이터가 없습니다.',
    description: '검색 조건을 변경해 보세요.',
  },
  render: (args) => ({
    components: { UiEmpty, UiTable, UiButton },
    setup: () => {
      const columns: TableColumn[] = [
        { key: 'name', label: '이름', align: 'left' },
        { key: 'region', label: '지역' },
        { key: 'total', label: '합계', align: 'right' },
      ]
      const data = ref<Record<string, any>[]>([])
      const load = () => {
        data.value = [
          { name: '케이블 플랫폼 매출', region: '대전', total: '44,865,368,290' },
          { name: 'SO 매출', region: '부산', total: '31,256,890,450' },
        ]
      }
      const clear = () => {
        data.value = []
      }
      return { args, columns, data, load, clear }
    },
    template: `
      <div>
        <UiTable v-if="data.length > 0" :columns="columns" :data="data" />
        <UiEmpty v-else v-bind="args">
          <UiButton variant="primary" size="sm" @click="load">데이터 불러오기</UiButton>
        </UiEmpty>
        <div v-if="data.length > 0" style="margin-top: 12px;">
          <UiButton variant="ghost" size="sm" @click="clear">비우기</UiButton>
        </div>
      </div>
    `,
  }),
}
