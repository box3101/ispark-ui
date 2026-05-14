import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import { ref } from 'vue'
import UiLoading from './UiLoading.vue'
import UiEmpty from './UiEmpty.vue'
import UiTable from './UiTable.vue'
import UiButton from './UiButton.vue'
import type { TableColumn } from './UiTable.vue'

const meta = {
  title: 'Components/UiLoading',
  component: UiLoading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
ispark-ui 표준 로딩 인디케이터. 응답 대기 중인 비동기 상태를 시각화한다.

## Empty vs Loading vs Error — 비동기 상태 3종
- **Loading** (이 컴포넌트) — 응답 대기 중. 결과를 알 수 없는 transient 상태.
- **Empty** (\`UiEmpty\`) — 정상 응답이지만 데이터가 0건.
- **Error** — 서버/네트워크 실패. 에러 컴포넌트 + 재시도 버튼.

세 상태를 한 영역에서 \`v-if\`로 분기하는 패턴은 \`EmptyVsLoading\` 스토리 참고.

## 모드
- **inline** (기본) — 영역 안 \`flex: 1; min-height: 200px\` 자리표시. 페이지/패널 안에서 사용.
- **overlay** (\`overlay: true\`) — viewport 전체 \`position: fixed\` + 반투명 dim. 작업 전체 차단 시 사용 (저장/업로드 등).

## 접근성
- 루트 \`<div role="status" aria-live="polite">\` — 스크린리더가 로딩 시작/끝을 polite하게 announce
- spinner는 장식 → \`aria-hidden="true"\` 자동
- \`text\`가 비면 \`aria-label="로딩 중"\` fallback으로 SR 보장
- \`prefers-reduced-motion: reduce\` 시 spinner 애니메이션 정지 (vestibular 안전)

## API
- **\`text\`** \`string\` — 표시 텍스트. 기본 \`'불러오는 중...'\`. 빈 문자열이면 미렌더 + aria-label 자동
- **\`overlay\`** \`boolean\` — 전체 화면 dim 모드. 기본 \`false\`
        `,
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: '표시 텍스트. 빈 문자열이면 미렌더 + aria-label fallback.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: "'불러오는 중...'" },
      },
    },
    overlay: {
      control: 'boolean',
      description: 'viewport 전체 fixed + dim 모드. 작업 전체 차단 시 사용.',
      table: {
        category: 'Mode',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof UiLoading>

export default meta
type Story = StoryObj<typeof meta>

// ===== Stories =====

export const Playground: Story = {
  args: {
    text: '불러오는 중...',
    overlay: false,
  },
  render: (args) => ({
    components: { UiLoading },
    setup: () => ({ args }),
    template: '<UiLoading v-bind="args" />',
  }),
}

// 기본 inline
export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { UiLoading },
    setup: () => ({ args }),
    template: '<UiLoading v-bind="args" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // a11y: role=status + aria-live=polite
    const status = canvas.getByRole('status')
    await expect(status.getAttribute('aria-live')).toBe('polite')
    await expect(canvas.getByText('불러오는 중...')).toBeTruthy()
  },
}

// 커스텀 텍스트
export const CustomText: Story = {
  args: {
    text: '데이터를 저장하는 중입니다...',
  },
  render: (args) => ({
    components: { UiLoading },
    setup: () => ({ args }),
    template: '<UiLoading v-bind="args" />',
  }),
}

// 텍스트 없는 컴팩트 모드 — spinner만, aria-label로 SR 안내
export const NoText: Story = {
  args: {
    text: '',
  },
  render: (args) => ({
    components: { UiLoading },
    setup: () => ({ args }),
    template: '<UiLoading v-bind="args" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const status = canvas.getByRole('status')
    // 텍스트 없으면 aria-label로 fallback
    await expect(status.getAttribute('aria-label')).toBe('로딩 중')
  },
}

// overlay 모드 — 토글 버튼으로 시연 (계속 켜져있으면 다른 스토리 가린)
export const Overlay: Story = {
  render: () => ({
    components: { UiLoading, UiButton },
    setup: () => {
      const isLoading = ref(false)
      const start = () => {
        isLoading.value = true
        setTimeout(() => {
          isLoading.value = false
        }, 2000)
      }
      return { isLoading, start }
    },
    template: `
      <div style="padding: 40px; text-align: center;">
        <UiButton variant="primary" @click="start">2초 동안 오버레이 표시</UiButton>
        <p style="margin-top: 12px; color: #6f7a93; font-size: 13px;">
          전체 화면을 dim으로 가리고 spinner 표시.<br/>
          저장/업로드 등 작업 전체 차단 시 사용.
        </p>
        <UiLoading v-if="isLoading" text="처리 중..." overlay />
      </div>
    `,
  }),
}

// Empty ↔ Loading ↔ Data 3-state 사이클 — UiTable + UiEmpty + UiLoading 통합 데모
// CLAUDE.md '비동기 상태 패턴': v-if 분기로 세 상태 자연스럽게 교체
export const EmptyVsLoading: Story = {
  render: () => ({
    components: { UiLoading, UiEmpty, UiTable, UiButton },
    setup: () => {
      type State = 'empty' | 'loading' | 'data'
      const state = ref<State>('empty')
      const columns: TableColumn[] = [
        { key: 'name', label: '이름', align: 'left' },
        { key: 'region', label: '지역' },
        { key: 'total', label: '합계', align: 'right' },
      ]
      const data = [
        { name: '케이블 플랫폼 매출', region: '대전', total: '44,865,368,290' },
        { name: 'SO 매출', region: '부산', total: '31,256,890,450' },
      ]
      const fetchData = () => {
        state.value = 'loading'
        setTimeout(() => {
          state.value = 'data'
        }, 1500)
      }
      const reset = () => {
        state.value = 'empty'
      }
      return { state, columns, data, fetchData, reset }
    },
    template: `
      <div>
        <div style="margin-bottom: 16px; display: flex; gap: 8px; align-items: center;">
          <span style="font-size: 13px; color: #4d5462;">현재 상태:</span>
          <strong style="font-size: 13px; color: #3c69db;">{{ state }}</strong>
          <UiButton size="sm" variant="ghost" @click="state = 'empty'">empty</UiButton>
          <UiButton size="sm" variant="ghost" @click="state = 'loading'">loading</UiButton>
          <UiButton size="sm" variant="ghost" @click="state = 'data'">data</UiButton>
        </div>

        <UiLoading v-if="state === 'loading'" text="조회 중..." />
        <UiTable v-else-if="state === 'data'" :columns="columns" :data="data" />
        <UiEmpty
          v-else
          icon="icon-search"
          title="조회된 데이터가 없습니다."
          description="조회 버튼을 눌러 데이터를 불러오세요."
        >
          <UiButton variant="primary" size="sm" @click="fetchData">데이터 불러오기 (1.5초)</UiButton>
        </UiEmpty>

        <div v-if="state !== 'empty'" style="margin-top: 12px;">
          <UiButton variant="ghost" size="sm" @click="reset">초기화</UiButton>
        </div>
      </div>
    `,
  }),
}
