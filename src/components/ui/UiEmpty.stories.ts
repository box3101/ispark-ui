import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import { ref } from 'vue'
import UiEmpty from './UiEmpty.vue'
import UiButton from './UiButton.vue'
import UiTable from './UiTable.vue'
import type { TableColumn } from './UiTable.vue'

const meta = {
  title: 'Components/Feedback/UiEmpty',
  component: UiEmpty,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
ispark-ui 표준 빈 상태(Empty State) 컴포넌트. 데이터가 없거나, 검색·필터 결과가 0건이거나, 좌측 트리에서 항목이 미선택일 때 자리표시(placeholder)로 렌더한다.

## Empty vs Error vs Loading vs Permission
- **Empty (UiEmpty)** — 정상 응답이지만 데이터가 0건. "결과 없음" 상태.
- **Loading** — 응답 대기 중. \`UiLoading\` / 스켈레톤 사용. UiEmpty 금지.
- **Error** — 서버/네트워크 실패. 에러 컴포넌트 + 재시도 버튼. UiEmpty 금지(상태 오해 유발).
- **Permission** — 권한 부족. UiEmpty로 표현 가능하지만 copy를 명확히("권한이 없습니다" + 요청 액션).

## 컨텍스트별 사용 가이드
| 컨텍스트 | 권장 형태 | 비고 |
|---|---|---|
| **페이지/패널 (넓은 영역)** | icon + title + description (+ action) | 시각적 인지 명확 |
| **카드/섹션 (중간 영역)** | icon + title | description은 길이 따라 |
| **모달/좁은 영역** | title only | icon은 공간 낭비 |
| **UiTable 빈 행 (텍스트만)** | \`UiTable\`의 \`emptyText\` prop | 내부에서 UiEmpty의 title로 전달 |
| **UiTable 빈 행 (아이콘+설명)** | \`UiTable\`의 \`emptyText\` + \`emptyIcon\` + \`emptyDescription\` | 추가 prop 전달, 외부 렌더 불필요 |
| **UiTable 빈 상태 완전 커스텀** | \`UiTable\`의 \`#empty\` 슬롯 | 액션 버튼 등 자유 마크업 |

## Copy 가이드
- **Title**: 12자 이내, 상태 명사형 ("검색 결과가 없습니다.", "등록된 항목이 없습니다.")
- **Description**: 다음 액션 제안 ("다른 키워드로 검색해 보세요.", "필터를 초기화해 보세요.")
- **금지**: 모호한 "데이터 없음", 부정적 "실패했습니다"(에러로 오해), 기술 용어 "null", "[]"
- **Action 버튼 라벨**: 동사 명령형 ("다시 시도", "필터 초기화", "항목 추가")

## 접근성
- 루트 \`<div role="status" aria-live="polite">\` — 데이터가 비동기로 비워질 때(검색어 변경 등) 스크린리더가 "결과 없음"을 polite하게 announce (사용자 작업 끊지 않음)
- 아이콘은 장식용 → \`aria-hidden="true"\` 자동 부여
- 타이틀은 \`<p>\` (heading 아님 — empty state는 문서 구조가 아닌 transient 상태 메시지)

## API 한눈에 보기
- **Props**: 아래 Args 테이블 — Content(\`title\`, \`description\`) / Visual(\`icon\`) 그룹
- **Slots**: \`default\` 한 개 — 액션 영역(버튼 등). 미사용 시 wrapper(\`.ui-empty-action\`) 자체가 렌더 안 됨
- **Events**: 없음

## 디자인 토큰
- color: \`$color-text-primary\`(title), \`$color-text-secondary\`(desc), \`$color-text-disabled\`(icon)
- typo: \`$body-large-bold\`(title, 16px), \`$body-medium\`(desc, 14px)
- icon 크기: \`size-24\` 클래스(24px) 고정

> **왜 본문보다 크게 두나** — 빈 상태는 그 순간 사용자가 읽어야 하는 유일한 내용이다.
> 이전에는 title \`$body-small\`(12px) / desc \`$body-xsmall\`(10px) 로 본문(14px)보다 작았고,
> 두 줄 모두 \`#6f7a93\` 이라 제목과 설명이 색으로 구분되지 않았다.
> 크기로 위계를, 색으로 주/보조를 나눈다.
        `,
      },
    },
  },
  argTypes: {
    // ===== Content =====
    title: {
      control: 'text',
      description: '메인 상태 텍스트. 12자 이내 명사형 권장.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: "'데이터가 없습니다.'" },
      },
    },
    description: {
      control: 'text',
      description: '보조 설명. 다음 액션 제안 형태 권장 ("다른 키워드로 검색해 보세요."). 미지정 시 미렌더.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // ===== Visual =====
    icon: {
      control: 'select',
      options: ['(없음)', 'icon-search', 'icon-plus', 'icon-refresh', 'icon-trashcan', 'icon-close'],
      // '(없음)' 라벨 → 실제 prop은 undefined
      mapping: { '(없음)': undefined },
      description: '아이콘 클래스명. ispark-ui에 등록된 `icon-*` 클래스 중 선택. 좁은 영역(모달 등)에서는 미사용 권장.',
      table: {
        category: 'Visual',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // ===== Slots (autodocs 미감지 → 수동 노출) =====
    default: {
      description: '액션 영역. `<UiButton>` 등 액션 요소 1~2개. 미사용 시 `.ui-empty-action` wrapper 자체 미렌더. 슬롯 props 없음.',
      table: {
        category: 'Slots',
        type: { summary: 'VNode' },
      },
      control: false,
    },
  } as never,
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

// title만 — 가장 단순한 형태 (모달/카드 등 좁은 영역에서 권장)
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

    // a11y: 루트가 role="status" + aria-live="polite"여야 비동기 빈 상태 announce 됨
    const status = canvas.getByRole('status')
    await expect(status.getAttribute('aria-live')).toBe('polite')
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

// default slot에 액션 버튼 — first-use 온보딩 컨텍스트 ('첫 번째 항목 만들기' 등)
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // action 슬롯 wrapper + 버튼 렌더 검증
    const action = canvasElement.querySelector('.ui-empty-action')
    await expect(action).toBeTruthy()
    const btn = canvas.getByRole('button', { name: '항목 추가' })
    await expect(btn).toBeTruthy()
    // 클릭 가능 (disabled 아님)
    await expect(btn.hasAttribute('disabled')).toBe(false)
  },
}

// 필터 결과 없음 — search-empty와 구분되는 별도 컨텍스트 (사용자가 적용한 필터 → 초기화 액션)
export const FilterEmpty: Story = {
  args: {
    icon: 'icon-refresh',
    title: '필터에 해당하는 결과가 없습니다.',
    description: '필터를 초기화하거나 조건을 완화해 보세요.',
  },
  render: (args) => ({
    components: { UiEmpty, UiButton },
    setup: () => ({ args }),
    template: `
      <UiEmpty v-bind="args">
        <UiButton variant="ghost" size="sm">필터 초기화</UiButton>
      </UiEmpty>
    `,
  }),
}

// 모달/카드 등 좁은 영역 — title only, 아이콘 미사용 (공간 절약)
export const CompactModal: Story = {
  args: {
    title: '선택된 항목이 없습니다.',
  },
  render: (args) => ({
    components: { UiEmpty },
    setup: () => ({ args }),
    // 모달 본문 가로 폭(예: 360px) 시뮬레이션
    template: `
      <div style="width: 360px; padding: 16px; background: #fafafa; border: 1px dashed #ddd; border-radius: 8px;">
        <UiEmpty v-bind="args" />
      </div>
    `,
  }),
}

// UiTable과 통합 (대안 패턴) — 테이블 자체를 숨기고 외부 UiEmpty 렌더
// 권장: UiTable의 emptyIcon/emptyText/emptyDescription 또는 #empty 슬롯 사용
// (이 예제는 테이블 frame 자체를 숨기고 싶을 때만)
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
