import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, screen, userEvent, within } from '@storybook/test'
import { ref } from 'vue'
import UiSelect from './UiSelect.vue'
import { INPUT_SIZES } from '@/design-tokens'

const meta = {
  title: 'Components/Form/UiSelect',
  component: UiSelect,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: `
ispark-ui 표준 단일 선택 드롭다운. radix-vue \`Select\` 위에 디자인 토큰(\`InputSize\` / \`shape\`)과 라벨·에러·설명 영역을 얹은 폼 셀렉트.

## 언제 사용하나
- 옵션 약 5~30개 규모의 **단일 선택** 필드 (필터 / 카테고리 / 상태 등)
- 폼 안에서 라벨 · 필수 · 에러 메시지가 일관된 스타일로 필요한 경우
- 키보드 접근성 + SSR-safe id가 필요한 경우 (radix-vue + \`useId\`로 자동)

## 제약
- **단일 선택만** — 다중 선택은 미지원
- **커스텀 아이템 슬롯 없음** — \`options[].label\` 텍스트로 고정 렌더 (배지·아이콘이 필요한 셀은 별도 컴포넌트 검토)
- **검색·필터 미지원** — 옵션 30개를 크게 넘으면 검색형 컴포넌트를 권장
- 드롭다운 패널 \`max-height: 240px\` 스크롤

## 값 정규화
- \`options[].value\`는 \`string | number\` 허용 — 내부적으로 string으로 normalize 해 radix-vue에 전달
- \`change\` / \`update:modelValue\` payload는 **원본 타입으로 복원** (number 옵션이면 number 복원)
- 빈 문자열 옵션이 존재하면 내부 토큰으로 우회 (radix-vue가 \`:value=""\` 거부) — 외부로는 \`''\` 그대로 노출

## 접근성
- \`role="combobox"\` trigger + \`<label htmlFor>\` 자동 연결 (\`id\` prop 미지정 시 \`useId()\` 자동 부여)
- 키보드: Space/Enter로 열기, ArrowUp/Down 옵션 이동, Enter 선택, Esc 닫기 (radix-vue 기본)
- 에러: \`aria-invalid="true"\` + \`aria-describedby\`로 \`role="alert"\` 메시지 연결
- 필수: \`aria-required="true"\` + 라벨 \`*\` (장식용, \`aria-hidden\`)

## API 한눈에 보기
- **Props**: 아래 Args 테이블 — Data / Field / Appearance / Behavior / Validation 그룹
- **Slots**: 없음 (옵션 텍스트는 \`options[].label\`로 고정)
- **Events**: \`update:modelValue(value)\` + \`change(value)\` 동시 emit, payload 동일

## SelectOption 인터페이스
\`\`\`ts
interface SelectOption {
  label: string           // 옵션 표시 텍스트
  value: string | number  // 선택 시 emit 값 (number이면 number 복원)
  disabled?: boolean      // 개별 옵션 비활성
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    // ===== Data =====
    modelValue: {
      control: 'text',
      description: 'v-model 바인딩 값. `options[].value`와 매칭. 빈 문자열/undefined일 때 placeholder 표시.',
      table: {
        category: 'Data',
        type: { summary: 'string | number' },
        defaultValue: { summary: "''" },
      },
    },
    options: {
      control: 'object',
      description: '선택 가능한 옵션 배열. `{ label, value, disabled? }`. 숫자 `value`는 자동 round-trip(`change` payload에서 number 복원).',
      table: {
        category: 'Data',
        type: { summary: 'SelectOption[]' },
      },
    },
    placeholder: {
      control: 'text',
      description: '`modelValue`가 비어있을 때 표시할 안내 텍스트.',
      table: {
        category: 'Data',
        type: { summary: 'string' },
        defaultValue: { summary: "'선택'" },
      },
    },

    // ===== Field (라벨 / 식별) =====
    label: {
      control: 'text',
      description: '폼 라벨 텍스트. 지정 시 `<label for>`이 trigger의 `id`와 자동 연결.',
      table: {
        category: 'Field',
        type: { summary: 'string' },
      },
    },
    labelHidden: {
      control: 'boolean',
      description: 'label은 DOM에 유지하되 시각적으로만 숨김 (스크린리더 접근성 보존).',
      table: {
        category: 'Field',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: '필수 필드 표시. 라벨 옆 `*` 추가 + trigger에 `aria-required="true"`. 검증 로직은 부모가 담당.',
      table: {
        category: 'Field',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    id: {
      control: 'text',
      description: 'trigger의 명시적 `id`. 미지정 시 `useId()`로 자동 생성 (SSR 안전).',
      table: {
        category: 'Field',
        type: { summary: 'string' },
      },
    },
    desc: {
      control: 'text',
      description: '필드 하단 보조 설명 (`aria-describedby`로 trigger와 연결). `errorMessage`가 있으면 숨김.',
      table: {
        category: 'Field',
        type: { summary: 'string' },
      },
    },

    // ===== Appearance =====
    size: {
      control: 'inline-radio',
      options: INPUT_SIZES,
      description: '`sm`(28px) / `md`(32px · 기본) / `lg`(40px) / `auth`(44px · 로그인 화면 전용) — 공용 토큰 `InputSize`.',
      table: {
        category: 'Appearance',
        type: { summary: 'InputSize' },
        defaultValue: { summary: "'md'" },
      },
    },
    shape: {
      control: 'inline-radio',
      options: ['rounded', 'pill'],
      description: '`rounded`(기본 6px) / `pill`(완전 라운드).',
      table: {
        category: 'Appearance',
        type: { summary: "'rounded' | 'pill'" },
        defaultValue: { summary: "'rounded'" },
      },
    },

    // ===== Behavior =====
    disabled: {
      control: 'boolean',
      description: '비활성 상태. trigger에 `disabled` + `aria-disabled` 부여, 드롭다운 열리지 않음.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // ===== Validation =====
    error: {
      control: 'boolean',
      description: '에러 상태 강제. trigger에 `is-error` + `aria-invalid="true"`. `errorMessage`가 비어있어도 시각/접근성 에러 표시 가능.',
      table: {
        category: 'Validation',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지. 비어있지 않으면 `error: true` 자동 + 빨간 텍스트(`role="alert"`)로 렌더 + `aria-describedby`로 trigger와 연결. `desc`보다 우선.',
      table: {
        category: 'Validation',
        type: { summary: 'string' },
      },
    },

    // ===== Events =====
    'onUpdate:modelValue': {
      name: 'update:modelValue',
      action: 'update:modelValue',
      description: 'v-model 업데이트 이벤트. 옵션 선택 시 emit. payload: `(value: string | number)` — 숫자 옵션이면 number 복원.',
      table: {
        category: 'Events',
        type: { summary: '(value: string | number) => void' },
      },
    },
    onChange: {
      name: 'change',
      action: 'change',
      description: '선택 변경 이벤트. `update:modelValue`와 동시 emit. payload는 동일.',
      table: {
        category: 'Events',
        type: { summary: '(value: string | number) => void' },
      },
    },
  },
} satisfies Meta<typeof UiSelect>

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions = [
  { label: '옵션 A', value: 'a' },
  { label: '옵션 B', value: 'b' },
  { label: '옵션 C', value: 'c' },
]

// ===== 1. Playground — 모든 props를 Controls로 조작 =====
// options는 sampleOptions 고정. 나머지(modelValue/placeholder/label/labelHidden/
// required/id/disabled/size/shape/error/errorMessage/desc)를 패널에서 토글
export const Playground: Story = {
  args: {
    options: sampleOptions,
    modelValue: '',
    placeholder: '선택해주세요',
    label: '',
    labelHidden: false,
    required: false,
    id: '',
    disabled: false,
    size: 'md',
    shape: 'rounded',
    error: false,
    errorMessage: '',
    desc: '',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref<string | number>(args.modelValue ?? '')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
}

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: '선택해주세요',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // radix-vue Trigger는 role=combobox
    const trigger = canvas.getByRole('combobox')

    // 초기 상태: aria-expanded="false"
    await expect(trigger.getAttribute('aria-expanded')).toBe('false')

    // 클릭으로 열기 → aria-expanded="true"
    await userEvent.click(trigger)
    await expect(trigger.getAttribute('aria-expanded')).toBe('true')

    // Portal은 body 직속 → screen 사용 필수
    const optB = await screen.findByRole('option', { name: '옵션 B' })
    await userEvent.click(optB)
    await expect(args.onChange).toHaveBeenCalledWith('b')
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('b')

    // 선택 후 자동 닫힘 → aria-expanded="false"
    await expect(trigger.getAttribute('aria-expanded')).toBe('false')
  },
}

// 초기 modelValue 지정 — placeholder 대신 선택된 옵션 label 표시
export const Preselected: Story = {
  args: {
    options: sampleOptions,
    placeholder: '선택해주세요',
    modelValue: 'b',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref<string | number>(args.modelValue ?? '')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    // trigger에 placeholder 대신 선택된 옵션 label("옵션 B")이 표시되어야 함
    await expect(trigger.textContent).toContain('옵션 B')
    await expect(trigger.textContent).not.toContain('선택해주세요')
  },
}

// 숫자 value 옵션 — change/update:modelValue payload가 number 타입으로 복원되는지 검증
export const NumericValues: Story = {
  args: {
    options: [
      { label: '1주일', value: 7 },
      { label: '1개월', value: 30 },
      { label: '3개월', value: 90 },
    ],
    placeholder: '기간 선택',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref<string | number>('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)
    const opt = await screen.findByRole('option', { name: '1개월' })
    await userEvent.click(opt)

    // ⚠️ 핵심: payload가 string '30'이 아닌 number 30이어야 함 (denormalize round-trip)
    await expect(args.onChange).toHaveBeenCalledWith(30)
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith(30)
  },
}

// 키보드 네비게이션 — ArrowDown으로 이동, Enter로 선택, Esc로 닫기
export const KeyboardNav: Story = {
  args: {
    options: sampleOptions,
    placeholder: '키보드로 선택',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')

    // 포커스 → Space로 열기
    trigger.focus()
    await expect(trigger).toHaveFocus
    await userEvent.keyboard('[Space]')
    await expect(trigger.getAttribute('aria-expanded')).toBe('true')

    // listbox 등장 확인 (Portal → screen)
    await screen.findByRole('listbox')

    // ArrowDown 2회 → 옵션 B로 이동, Enter로 선택
    await userEvent.keyboard('[ArrowDown][ArrowDown]')
    await userEvent.keyboard('[Enter]')

    await expect(args.onChange).toHaveBeenCalledWith('b')
    await expect(trigger.getAttribute('aria-expanded')).toBe('false')

    // 다시 열고 Esc로 닫기 — change 추가 호출 없어야 함
    const prevCallCount = (args.onChange as ReturnType<typeof fn>).mock.calls.length
    await userEvent.keyboard('[Space]')
    await expect(trigger.getAttribute('aria-expanded')).toBe('true')
    await userEvent.keyboard('[Escape]')
    await expect(trigger.getAttribute('aria-expanded')).toBe('false')
    await expect((args.onChange as ReturnType<typeof fn>).mock.calls.length).toBe(prevCallCount)
  },
}

export const WithLabel: Story = {
  args: {
    options: sampleOptions,
    label: '카테고리',
    placeholder: '카테고리 선택',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('카테고리')
    const trigger = canvas.getByRole('combobox')
    // label htmlFor와 trigger id 매칭
    await expect(label.getAttribute('for')).toBe(trigger.getAttribute('id'))
  },
}

// labelHidden — 라벨은 DOM에 유지되지만 시각적으로만 숨김 (스크린리더 접근성 보존)
export const LabelHidden: Story = {
  args: {
    options: sampleOptions,
    label: '검색 카테고리',
    labelHidden: true,
    placeholder: '카테고리 선택',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // 라벨은 DOM에는 존재 (스크린리더 접근 가능)
    const label = canvas.getByText('검색 카테고리')
    await expect(label).toBeTruthy()
    // 시각적으로 숨김 처리 클래스
    await expect(label.className).toContain('is-hidden')
    // 그래도 trigger와 연결은 유지
    const trigger = canvas.getByRole('combobox')
    await expect(label.getAttribute('for')).toBe(trigger.getAttribute('id'))
  },
}

export const Required: Story = {
  args: {
    options: sampleOptions,
    label: '필수 항목',
    required: true,
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // label은 "필수 항목" 텍스트 + 별도 <span>에 *. label 전체를 textContent로 검증
    const labelEl = canvas.getByText(/필수 항목/)
    await expect(labelEl.textContent).toContain('*')
    const trigger = canvas.getByRole('combobox')
    await expect(trigger.getAttribute('aria-required')).toBe('true')
  },
}

export const Error: Story = {
  args: {
    options: sampleOptions,
    label: '카테고리',
    error: true,
    placeholder: '선택해주세요',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    // border 색상은 시각 확인이지만 클래스 적용은 검증 가능
    await expect(trigger.className).toContain('is-error')
    await expect(trigger.getAttribute('aria-invalid')).toBe('true')
    // errorMessage 없으면 aria-describedby 없어야 함 (radix-vue 자동 부여 외)
    // radix-vue가 listbox 연결로 aria-describedby를 자체 부여할 수 있음 → 우리 errorId가 포함되지 않는지 검증
    const ariaDesc = trigger.getAttribute('aria-describedby') || ''
    await expect(ariaDesc.includes('-error')).toBe(false)
    await expect(ariaDesc.includes('-desc')).toBe(false)
  },
}

export const ErrorMessage: Story = {
  args: {
    options: sampleOptions,
    label: '카테고리',
    errorMessage: '필수 입력입니다',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const errorEl = canvas.getByRole('alert')
    await expect(errorEl.textContent).toContain('필수 입력입니다')
    const trigger = canvas.getByRole('combobox')
    await expect(trigger.getAttribute('aria-invalid')).toBe('true')
    await expect(trigger.getAttribute('aria-describedby')).toBe(errorEl.getAttribute('id'))
  },
}

export const Desc: Story = {
  args: {
    options: sampleOptions,
    label: '카테고리',
    desc: '하나만 선택할 수 있습니다',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const descEl = canvas.getByText('하나만 선택할 수 있습니다')
    const trigger = canvas.getByRole('combobox')
    await expect(trigger.getAttribute('aria-describedby')).toBe(descEl.getAttribute('id'))
  },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const vSm = ref('')
      const vMd = ref('')
      const vLg = ref('')
      const vAuth = ref('')
      return { args, sampleOptions, vSm, vMd, vLg, vAuth }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiSelect v-bind="args" v-model="vSm" :options="sampleOptions" size="sm" placeholder="sm 28px" />
        <UiSelect v-bind="args" v-model="vMd" :options="sampleOptions" size="md" placeholder="md 32px" />
        <UiSelect v-bind="args" v-model="vLg" :options="sampleOptions" size="lg" placeholder="lg 40px" />
        <UiSelect v-bind="args" v-model="vAuth" :options="sampleOptions" size="auth" placeholder="auth 44px" />
      </div>
    `,
  }),
}

export const Shapes: Story = {
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const vRounded = ref('')
      const vPill = ref('')
      return { args, sampleOptions, vRounded, vPill }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiSelect v-bind="args" v-model="vRounded" :options="sampleOptions" shape="rounded" placeholder="rounded" />
        <UiSelect v-bind="args" v-model="vPill" :options="sampleOptions" shape="pill" placeholder="pill" />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    placeholder: '비활성',
    disabled: true,
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    await expect(trigger.hasAttribute('disabled') || trigger.getAttribute('aria-disabled') === 'true').toBe(true)
  },
}

export const DisabledOption: Story = {
  args: {
    options: [
      { label: '활성', value: 'on' },
      { label: '비활성', value: 'off', disabled: true },
    ],
    placeholder: '선택',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)
    const disabledOpt = await screen.findByRole('option', { name: '비활성' })
    // radix-vue가 [data-disabled] 속성 부여
    await expect(disabledOpt.hasAttribute('data-disabled')).toBe(true)
  },
}

// 30개 옵션 — 드롭다운 max-height(240px) 초과로 스크롤 발생, offscreen 옵션 선택 검증
export const LongList: Story = {
  args: {
    options: Array.from({ length: 30 }, (_, i) => ({
      label: `옵션 ${i + 1}`,
      value: `opt-${i + 1}`,
    })),
    placeholder: '30개 중 선택',
  },
  render: (args) => ({
    components: { UiSelect },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)

    // 30개 옵션 모두 listbox에 마운트되어 있어야 함 (radix-vue는 가상화 미사용)
    const listbox = await screen.findByRole('listbox')
    const options = listbox.querySelectorAll('[role="option"]')
    await expect(options.length).toBe(30)

    // offscreen 옵션(25번) 선택 — payload 검증
    const opt25 = await screen.findByRole('option', { name: '옵션 25' })
    await userEvent.click(opt25)
    await expect(args.onChange).toHaveBeenCalledWith('opt-25')
  },
}
