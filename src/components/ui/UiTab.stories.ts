import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { ref } from 'vue'
import UiTab from './UiTab.vue'
import type { TabItem } from './UiTab.vue'

const meta = {
  title: 'Components/Navigation/UiTab',
  component: UiTab,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ispark-ui 표준 탭 — 페이지/모달 내부 콘텐츠 네비게이션. underline 스타일 + 키보드 화살표 네비.

## API
- **\`modelValue\`** \`string\` — 현재 선택된 탭 value (v-model)
- **\`tabs\`** \`TabItem[]\` — 탭 정의 배열
- **\`size\`** \`'sm' | 'md' | 'lg'\` — sm(36px) / md(40px·기본) / lg(48px)
- **\`align\`** \`'left' | 'center' | 'right' | 'stretch'\` — left/center/right/stretch(균등 분할)
- **\`contentMaxWidth\`** \`string\` — \`.ui-tab-inner\` max-width (예: \`'800px'\`). 빈 값이면 full-width
- **\`contentPaddingX\`** \`string\` — contentMaxWidth 사용 시 좌우 padding (기본 \`'16px'\`)
- **\`ariaLabel\`** \`string\` — \`<div role="tablist">\`의 aria-label

## TabItem
\`\`\`ts
interface TabItem {
  label: string
  value: string
  icon?: string       // ispark-ui 아이콘 클래스 (예: 'icon-edit')
  count?: number      // 우측 카운트 배지 (미확인 N건 등)
  disabled?: boolean
}
\`\`\`

## 이벤트
- \`update:modelValue\` — v-model
- \`change\` — 동일 payload 별도 emit

## 넘칠 때 동작 (반응형)
컨테이너 폭이 모자라면 **줄바꿈 대신 가로 스크롤**로 넘어간다.
뷰포트가 아니라 컨테이너 기준이라 미디어쿼리를 쓰지 않는다 — 데스크탑 1920px 에서도
480px 모달 안에 넣으면 똑같이 좁기 때문이다.

- \`flex-wrap: nowrap\` + \`overflow-x: auto\` + \`@include hide-scrollbar\`
- **페이드 마스크**: 넘치는 쪽에만 32px \`mask-image\`. 끝에 닿으면 그쪽 페이드가 사라진다
  (배경색과 무관하게 동작하도록 오버레이가 아닌 mask 사용)
- **선택 탭 자동 스크롤**: \`modelValue\` 변경 시 해당 탭이 가운데로 (\`inline: 'center'\`)
- **드래그 스크롤**: 스크롤바를 숨기면 데스크탑 마우스는 조작 수단이 사라진다
  (세로 휠은 가로로 매핑되지 않는다) → pointer 이벤트로 직접 구현
- \`align="center"/"right"\` 는 \`justify-content\` 가 아니라 **auto 여백**으로 구현했다.
  \`justify-content: center\` 는 넘쳤을 때 앞으로 삐져나간 탭을 \`scrollLeft\` 로 되돌릴 수 없어
  첫 탭이 영구히 잘린다. auto 여백은 남는 공간이 있을 때만 먹으므로 넘치면 자동으로 flex-start 가 된다
- \`align="stretch"\` 는 균등 분할이라 넘칠 일이 없다 → 스크롤 대신 라벨 말줄임

## hover
밑줄 하나로 hover 와 선택을 함께 표현한다. hover 는 **회색 프리뷰**, 선택은 **accent**.
같은 자리에 한 단계 약하게 뜨므로 "여기 누르면 이렇게 되겠구나"가 예측된다.

- \`@media (hover: hover)\` 로 감쌌다. 없으면 모바일에서 탭한 뒤 hover 가 눌러붙어
  선택도 아닌데 강조된 탭이 남는다
- 선택된 탭(\`.is-active\`)과 비활성 탭(\`:disabled\`)은 hover 대상에서 제외
- \`:focus-visible\` 은 hover 와 **별개**다. 키보드 사용자에겐 hover 가 발생하지 않는다

## 접근성
- \`role="tablist"\` + 각 탭에 \`role="tab"\` + \`aria-selected\` 자동
- \`disabled\` 시 \`aria-disabled\` + native disabled
- **키보드 네비**: ←/→/Home/End — 비활성 탭 자동 skip, 포커스+선택 동시 변경 (자동 활성화 패턴)
- \`tabindex\`: 활성 0 / 비활성 -1 (roving tabindex)
- \`:focus-visible\` outline 2px primary
- \`prefers-reduced-motion: reduce\` 시 transition 정지 (\`::after\` 밑줄 포함),
  자동 스크롤도 \`behavior: 'auto'\` 로 전환

## 디자인 토큰
- 밑줄 2px — 선택 \`var(--color-primary)\` / hover \`$color-placeholder\`
- 페이드 폭 \`--ui-tab-fade: 32px\`
- transition \`$transition-fast\`
- count 배지: 활성 시 primary 색조, 비활성 시 회색 — Badge primary 0.12 alpha와 동일
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    align: { control: 'inline-radio', options: ['left', 'center', 'right', 'stretch'] },
    contentMaxWidth: { control: 'text' },
    contentPaddingX: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
} satisfies Meta<typeof UiTab>

export default meta
type Story = StoryObj<typeof meta>

const baseTabs: TabItem[] = [
  { label: '개요', value: 'overview' },
  { label: '활동', value: 'activity' },
  { label: '설정', value: 'settings' },
]

// ===== Stories =====

export const Playground: Story = {
  args: {
    tabs: baseTabs,
    modelValue: 'overview',
    size: 'md',
    align: 'left',
  },
  render: (args) => ({
    components: { UiTab },
    setup: () => {
      const cur = ref(args.modelValue)
      return { args, cur }
    },
    template: '<UiTab v-bind="args" v-model="cur" />',
  }),
}

// 기본 — center align
export const Default: Story = {
  args: {
    tabs: baseTabs,
    modelValue: 'overview',
  },
  render: (args) => ({
    components: { UiTab },
    setup: () => {
      const cur = ref(args.modelValue)
      return { args, cur }
    },
    template: '<UiTab v-bind="args" v-model="cur" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const tab = canvas.getByRole('tab', { name: '활동' })
    await userEvent.click(tab)
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('activity')
  },
}

// 아이콘 + 카운트 배지
export const WithIconAndCount: Story = {
  args: {
    tabs: [
      { label: '받은편지함', value: 'inbox', icon: 'icon-download', count: 12 },
      { label: '보낸편지함', value: 'sent', icon: 'icon-arrow-right', count: 3 },
      { label: '휴지통', value: 'trash', icon: 'icon-trashcan' },
    ],
    modelValue: 'inbox',
    align: 'left',
  },
  render: (args) => ({
    components: { UiTab },
    setup: () => {
      const cur = ref(args.modelValue)
      return { args, cur }
    },
    template: '<UiTab v-bind="args" v-model="cur" />',
  }),
}

// disabled 항목 + 키보드 네비
export const WithDisabledItem: Story = {
  args: {
    tabs: [
      { label: '개요', value: 'overview' },
      { label: '활동 (잠금)', value: 'activity', disabled: true },
      { label: '설정', value: 'settings' },
      { label: '권한 (잠금)', value: 'perm', disabled: true },
      { label: '로그', value: 'log' },
    ],
    modelValue: 'overview',
    align: 'left',
  },
  render: (args) => ({
    components: { UiTab },
    setup: () => {
      const cur = ref(args.modelValue)
      return { args, cur }
    },
    template: '<UiTab v-bind="args" v-model="cur" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const tablist = canvas.getByRole('tablist')
    // 첫 탭 클릭 → ArrowRight → 비활성 'activity' skip → 'settings'
    const first = canvas.getByRole('tab', { name: '개요' })
    await userEvent.click(first)
    await userEvent.keyboard('{ArrowRight}')
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('settings')
    // disabled 항목 클릭 무시
    const disabled = canvas.getByRole('tab', { name: /활동/ })
    await userEvent.click(disabled)
    const calls = (args['onUpdate:modelValue'] as any).mock.calls as string[][]
    // 마지막 호출이 'activity'가 아니어야 함
    await expect(calls[calls.length - 1][0]).not.toBe('activity')
  },
}

// 3가지 size 비교
export const AllSizes: Story = {
  render: () => ({
    components: { UiTab },
    setup: () => {
      const v1 = ref('a')
      const v2 = ref('a')
      const v3 = ref('a')
      const tabs = [
        { label: 'Alpha', value: 'a' },
        { label: 'Beta', value: 'b' },
        { label: 'Gamma', value: 'g' },
      ]
      return { v1, v2, v3, tabs }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: sm</h4><UiTab v-model="v1" :tabs="tabs" size="sm" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: md (기본)</h4><UiTab v-model="v2" :tabs="tabs" size="md" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: lg</h4><UiTab v-model="v3" :tabs="tabs" size="lg" align="left" /></div>
      </div>
    `,
  }),
}

// align 4종 비교
export const AllAlignments: Story = {
  render: () => ({
    components: { UiTab },
    setup: () => {
      const v = ref('a')
      const tabs = [
        { label: 'One', value: 'a' },
        { label: 'Two', value: 'b' },
        { label: 'Three', value: 'c' },
      ]
      return { v, tabs }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">left</h4><UiTab v-model="v" :tabs="tabs" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">center (기본)</h4><UiTab v-model="v" :tabs="tabs" align="center" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">right</h4><UiTab v-model="v" :tabs="tabs" align="right" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">stretch — 균등 분할</h4><UiTab v-model="v" :tabs="tabs" align="stretch" /></div>
      </div>
    `,
  }),
}

// contentMaxWidth — 프롬프트 페이지 패턴 (800px 컨테이너 내 left 정렬)
export const ContentConstrained: Story = {
  render: () => ({
    components: { UiTab },
    setup: () => {
      const cur = ref('system')
      const tabs: TabItem[] = [
        { label: '시스템 프롬프트', value: 'system' },
        { label: '금지어/필터링', value: 'filter' },
        { label: '토큰/응답 제한', value: 'limit' },
      ]
      return { cur, tabs }
    },
    template: `
      <div style="background: #f4f7f9; padding: 16px 0;">
        <UiTab
          v-model="cur"
          :tabs="tabs"
          align="left"
          content-max-width="800px"
        />
        <div style="max-width: 800px; margin: 0 auto; padding: 16px; background: #fff;">
          <p style="margin: 0; color: #4d5462; font-size: 14px;">탭과 본문이 동일한 800px 컨테이너 기준선에 맞춰집니다.</p>
        </div>
      </div>
    `,
  }),
}

// 콘텐츠 영역과 연동 — 실 사용 패턴 (tabpanel)
export const WithContent: Story = {
  render: () => ({
    components: { UiTab },
    setup: () => {
      const cur = ref('overview')
      const tabs: TabItem[] = [
        { label: '개요', value: 'overview' },
        { label: '활동', value: 'activity', count: 5 },
        { label: '설정', value: 'settings' },
      ]
      return { cur, tabs }
    },
    template: `
      <div>
        <UiTab v-model="cur" :tabs="tabs" align="left" aria-label="프로필 섹션" />
        <div role="tabpanel" style="padding: 16px; min-height: 120px;">
          <div v-if="cur === 'overview'">
            <h3 style="margin: 0 0 8px;">개요</h3>
            <p style="color: #4d5462; font-size: 14px;">사용자 프로필 요약 정보가 표시됩니다.</p>
          </div>
          <div v-else-if="cur === 'activity'">
            <h3 style="margin: 0 0 8px;">최근 활동 (5건)</h3>
            <p style="color: #4d5462; font-size: 14px;">로그인, 문서 편집, 댓글 등 활동 내역.</p>
          </div>
          <div v-else>
            <h3 style="margin: 0 0 8px;">설정</h3>
            <p style="color: #4d5462; font-size: 14px;">알림, 비밀번호, 권한 등 환경 설정.</p>
          </div>
        </div>
      </div>
    `,
  }),
}

// 탭이 컨테이너를 넘칠 때 — 가로 스크롤 + 페이드 + 선택 탭 자동 스크롤
export const ManyTabsScrollable: Story = {
  parameters: {
    docs: {
      description: {
        story: `
컨테이너 폭이 모자라면 줄바꿈 대신 **가로 스크롤**로 넘어간다. 폭을 바꿔가며 확인해보자.

- 넘치는 쪽에만 페이드가 뜬다 (양 끝에 닿으면 그쪽 페이드가 사라짐)
- 탭을 선택하면 그 탭이 가운데로 따라온다 — 키보드 ←/→/Home/End 도 동일
- 탭바를 **마우스로 잡아끌 수 있다**. 5px 이상 끌면 그 직후의 클릭은 삼켜져 탭이 잘못 선택되지 않는다
        `,
      },
    },
  },
  render: () => ({
    components: { UiTab },
    setup: () => {
      const tabs: TabItem[] = [
        { label: '개요', value: 'overview' },
        { label: '활동 내역', value: 'activity' },
        { label: '설정', value: 'settings' },
        { label: '알림', value: 'noti' },
        { label: '권한 관리', value: 'perm' },
        { label: '결제 정보', value: 'billing' },
        { label: '연동 앱', value: 'apps' },
        { label: '감사 로그', value: 'audit' },
      ]
      const width = ref(360)
      const presets = [280, 360, 480, 600, 900]
      const cur = ref('activity')
      return { tabs, width, presets, cur }
    },
    template: `
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; font-size: 13px; flex-wrap: wrap;">
          <b>컨테이너 폭</b>
          <input type="range" min="240" max="900" step="10" v-model.number="width" style="width: 300px;" />
          <b style="font-family: ui-monospace, monospace; color: #3c69db; min-width: 56px;">{{ width }}px</b>
          <button
            v-for="p in presets"
            :key="p"
            type="button"
            style="padding: 6px 12px; font-size: 12px; border: 1px solid #cfd6e4; background: #fff; border-radius: 6px; cursor: pointer;"
            :style="width === p ? 'border-color:#3c69db;color:#3c69db;font-weight:700;' : ''"
            @click="width = p"
          >{{ p }}</button>
        </div>

        <div :style="{ width: width + 'px', background: '#fff', border: '1px dashed #cfd6e4', borderRadius: '6px' }">
          <UiTab v-model="cur" :tabs="tabs" align="left" aria-label="넘치는 탭 예시" />
        </div>

        <p style="margin: 12px 0 0; font-size: 13px; color: #4d5462;">
          선택됨: <b>{{ cur }}</b>
        </p>
      </div>
    `,
  }),
}
