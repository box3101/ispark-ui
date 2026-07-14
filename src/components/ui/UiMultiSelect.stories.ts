import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, screen, userEvent, within } from '@storybook/test'
import { ref } from 'vue'
import UiMultiSelect from './UiMultiSelect.vue'
import { SELECT_SIZES } from '@/design-tokens'

const meta = {
  title: 'Components/Form/UiMultiSelect',
  component: UiMultiSelect,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: `
ispark-ui 표준 **다중 선택** 드롭다운. radix-vue \`Popover\` 위에 체크박스형 옵션 리스트와 디자인 토큰(\`SelectSize\` / \`shape\`)을 얹은 폼 컴포넌트.

## 언제 사용하나
- 옵션 약 5~30개 규모의 **다중 선택** 필드 (필터 / 태그 / 권한 등)
- 선택값이 여러 개라 \`UiSelect\`(단일 선택)로 표현할 수 없는 경우

## 동작
- 옵션 클릭/Enter/Space로 토글 — 선택 시 체크 표시 + primary 강조
- trigger 라벨은 선택 개수가 \`maxLabels\`(기본 2) 이하면 \`,\`로 나열, 초과하면 \`"첫번째 외 N건"\`으로 축약
- 패널은 선택해도 닫히지 않음 (여러 개 연속 선택)

## 값
- \`modelValue\`는 \`Array<string | number>\` — \`options[].value\`와 매칭
- \`update:modelValue\` / \`change\`는 토글 후 **새 배열**을 emit (원본 타입 유지)

## 접근성
- trigger: \`aria-haspopup="listbox"\` + \`aria-expanded\`
- 패널: \`role="listbox"\` + \`aria-multiselectable="true"\`, 각 옵션 \`role="option"\` + \`aria-selected\`
- \`id\` 미지정 시 \`useId()\`로 자동 부여 (SSR 안전)

## MultiSelectOption 인터페이스
\`\`\`ts
interface MultiSelectOption {
  label: string           // 옵션 표시 텍스트
  value: string | number  // 선택 시 배열에 담기는 값
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    // ===== Data =====
    modelValue: {
      control: 'object',
      description: 'v-model 바인딩 값 배열. `options[].value`와 매칭.',
      table: {
        category: 'Data',
        type: { summary: 'Array<string | number>' },
        defaultValue: { summary: '[]' },
      },
    },
    options: {
      control: 'object',
      description: '선택 가능한 옵션 배열. `{ label, value }`.',
      table: {
        category: 'Data',
        type: { summary: 'MultiSelectOption[]' },
      },
    },
    placeholder: {
      control: 'text',
      description: '아무것도 선택되지 않았을 때 표시할 안내 텍스트.',
      table: {
        category: 'Data',
        type: { summary: 'string' },
        defaultValue: { summary: "'선택'" },
      },
    },
    maxLabels: {
      control: 'number',
      description: '선택 개수가 이 값을 초과하면 "첫번째 외 N건"으로 축약 표시.',
      table: {
        category: 'Data',
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },

    // ===== Field =====
    id: {
      control: 'text',
      description: 'trigger의 명시적 `id`. 미지정 시 `useId()`로 자동 생성.',
      table: { category: 'Field', type: { summary: 'string' } },
    },
    name: {
      control: 'text',
      description: '폼 필드 name.',
      table: { category: 'Field', type: { summary: 'string' } },
    },

    // ===== Appearance =====
    size: {
      control: 'inline-radio',
      options: SELECT_SIZES,
      description: '`xs`(26) / `sm`(30) / `md`(32 · 기본) / `lg`(34) / `xlg`(36) / `auth`(44) — 공용 토큰 `SelectSize`.',
      table: {
        category: 'Appearance',
        type: { summary: 'SelectSize' },
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
      description: '비활성 상태. trigger에 `disabled` 부여, 드롭다운 열리지 않음.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // ===== Events =====
    'onUpdate:modelValue': {
      name: 'update:modelValue',
      action: 'update:modelValue',
      description: 'v-model 업데이트 이벤트. 토글 시 새 배열 emit.',
      table: {
        category: 'Events',
        type: { summary: '(value: Array<string | number>) => void' },
      },
    },
    onChange: {
      name: 'change',
      action: 'change',
      description: '선택 변경 이벤트. `update:modelValue`와 동시 emit.',
      table: {
        category: 'Events',
        type: { summary: '(value: Array<string | number>) => void' },
      },
    },
  },
} satisfies Meta<typeof UiMultiSelect>

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions = [
  { label: '옵션 A', value: 'a' },
  { label: '옵션 B', value: 'b' },
  { label: '옵션 C', value: 'c' },
  { label: '옵션 D', value: 'd' },
]

// ===== 1. Playground — 모든 props를 Controls로 조작 =====
export const Playground: Story = {
  args: {
    options: sampleOptions,
    modelValue: [],
    placeholder: '선택해주세요',
    maxLabels: 2,
    id: '',
    name: '',
    disabled: false,
    size: 'md',
    shape: 'rounded',
  },
  render: (args) => ({
    components: { UiMultiSelect },
    setup: () => {
      const value = ref<Array<string | number>>(args.modelValue ?? [])
      return { args, value }
    },
    template: '<UiMultiSelect v-bind="args" v-model="value" />',
  }),
}

// 기본 — 열고 옵션 2개 선택, 패널 유지 확인
export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: '선택해주세요',
  },
  render: (args) => ({
    components: { UiMultiSelect },
    setup: () => {
      const value = ref<Array<string | number>>([])
      return { args, value }
    },
    template: '<UiMultiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')

    // 초기 상태: aria-expanded="false"
    await expect(trigger.getAttribute('aria-expanded')).toBe('false')

    // 열기
    await userEvent.click(trigger)
    await expect(trigger.getAttribute('aria-expanded')).toBe('true')

    // Portal mount 보장 + 옵션 A 선택
    const optA = await screen.findByRole('option', { name: '옵션 A' })
    await userEvent.click(optA)
    await expect(args.onChange).toHaveBeenCalledWith(['a'])

    // 다중 선택은 선택해도 닫히지 않음 → 옵션 C 추가 선택
    const optC = await screen.findByRole('option', { name: '옵션 C' })
    await userEvent.click(optC)
    await expect(args.onChange).toHaveBeenCalledWith(['a', 'c'])

    // 패널 유지
    await expect(trigger.getAttribute('aria-expanded')).toBe('true')
  },
}

// 토글 해제 — 이미 선택된 옵션을 다시 클릭하면 배열에서 제거
export const Toggle: Story = {
  args: {
    options: sampleOptions,
    modelValue: ['a', 'b'],
  },
  render: (args) => ({
    components: { UiMultiSelect },
    setup: () => {
      const value = ref<Array<string | number>>(args.modelValue ?? [])
      return { args, value }
    },
    template: '<UiMultiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')
    await userEvent.click(trigger)

    // 이미 선택된 A를 클릭 → 제거되어 ['b']
    const optA = await screen.findByRole('option', { name: '옵션 A' })
    await expect(optA.getAttribute('aria-selected')).toBe('true')
    await userEvent.click(optA)
    await expect(args.onChange).toHaveBeenCalledWith(['b'])
  },
}

// 축약 라벨 — maxLabels(2) 초과 시 "첫번째 외 N건"
export const TruncatedLabel: Story = {
  args: {
    options: sampleOptions,
    modelValue: ['a', 'b', 'c'],
    maxLabels: 2,
  },
  render: (args) => ({
    components: { UiMultiSelect },
    setup: () => {
      const value = ref<Array<string | number>>(args.modelValue ?? [])
      return { args, value }
    },
    template: '<UiMultiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')
    // 3개 선택 + maxLabels=2 → "옵션 A 외 2건"
    await expect(trigger.textContent).toContain('옵션 A 외 2건')
  },
}

// 숫자 value — 토글 payload가 number 배열로 유지
export const NumericValues: Story = {
  args: {
    options: [
      { label: '월', value: 1 },
      { label: '화', value: 2 },
      { label: '수', value: 3 },
    ],
    placeholder: '요일 선택',
  },
  render: (args) => ({
    components: { UiMultiSelect },
    setup: () => {
      const value = ref<Array<string | number>>([])
      return { args, value }
    },
    template: '<UiMultiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')
    await userEvent.click(trigger)
    const opt = await screen.findByRole('option', { name: '화' })
    await userEvent.click(opt)
    // payload가 string '2'가 아닌 number 2여야 함
    await expect(args.onChange).toHaveBeenCalledWith([2])
  },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { UiMultiSelect },
    setup: () => {
      const vSm = ref<Array<string | number>>([])
      const vMd = ref<Array<string | number>>([])
      const vLg = ref<Array<string | number>>([])
      const vXlg = ref<Array<string | number>>([])
      return { args, sampleOptions, vSm, vMd, vLg, vXlg }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiMultiSelect v-bind="args" v-model="vSm" :options="sampleOptions" size="sm" placeholder="sm 30px" />
        <UiMultiSelect v-bind="args" v-model="vMd" :options="sampleOptions" size="md" placeholder="md 32px" />
        <UiMultiSelect v-bind="args" v-model="vLg" :options="sampleOptions" size="lg" placeholder="lg 34px" />
        <UiMultiSelect v-bind="args" v-model="vXlg" :options="sampleOptions" size="xlg" placeholder="xlg 36px" />
      </div>
    `,
  }),
}

export const Shapes: Story = {
  render: (args) => ({
    components: { UiMultiSelect },
    setup: () => {
      const vRounded = ref<Array<string | number>>([])
      const vPill = ref<Array<string | number>>([])
      return { args, sampleOptions, vRounded, vPill }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiMultiSelect v-bind="args" v-model="vRounded" :options="sampleOptions" shape="rounded" placeholder="rounded" />
        <UiMultiSelect v-bind="args" v-model="vPill" :options="sampleOptions" shape="pill" placeholder="pill" />
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
    components: { UiMultiSelect },
    setup: () => {
      const value = ref<Array<string | number>>([])
      return { args, value }
    },
    template: '<UiMultiSelect v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')
    await expect(trigger.hasAttribute('disabled')).toBe(true)
  },
}
