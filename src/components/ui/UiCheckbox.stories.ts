import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { computed, ref } from 'vue'
import UiCheckbox from './UiCheckbox.vue'

const meta = {
  title: 'Components/UiCheckbox',
  component: UiCheckbox,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: `
ispark-ui 표준 체크박스. 네이티브 \`<input type="checkbox">\`를 시각 박스로 래핑한 폼 필드.

## Checkbox vs Toggle
- **Checkbox** (이 컴포넌트) — 폼 제출/적용 시점이 별도. 약관 동의·다중 선택·필터 조건 등.
- **Toggle** (\`UiToggle\`) — 즉시 효과. 알림 켜기/끄기 등 설정 옵션.

## API
- **\`modelValue\`** \`boolean\` — v-model. true=체크, false=언체크
- **\`indeterminate\`** \`boolean\` — 부분 체크(mixed). \`modelValue=false\`일 때만 시각적으로 dash 표시. 예: UiTable 헤더 '전체 선택' 컬럼 — 일부만 선택된 상태
- **\`disabled\`** \`boolean\` — 비활성
- **\`label\`** \`string\` 또는 default \`slot\` — 라벨. label prop과 slot 둘 다 가능 (slot 우선)
- **\`labelHidden\`** \`boolean\` — 시각만 숨김(SR 노출)
- **\`id\`** \`string\` — 명시 id. 미지정 시 \`useId()\` 자동

## 이벤트
- \`update:modelValue\` — v-model 양방향
- \`change\` — 동일 payload 별도 emit

## 접근성
- 네이티브 \`<input type="checkbox">\` 사용 → 역할/포커스/키보드(Space) 자동
- \`indeterminate\`는 HTML attribute가 아닌 **DOM property** — 내부에서 \`watch\`로 \`el.indeterminate\` 설정
- \`<label for>\` ↔ \`<input id>\` 자동 매칭 (useId)
- 키보드 포커스 시 box에 outline 2px primary (\`:focus-visible\`)
- \`prefers-reduced-motion: reduce\` 시 트랜지션 정지

## 디자인 토큰
- 박스: 16×16px / border 1.5px / radius 4px (Toggle 트랙 32×20과 시각 구분)
- on bg: \`var(--color-primary)\` — 테마 전환 대응
        `,
      },
    },
  },
} satisfies Meta<typeof UiCheckbox>

export default meta
type Story = StoryObj<typeof meta>

// ===== Stories =====

export const Playground: Story = {
  args: {
    modelValue: false,
    label: '동의합니다',
    disabled: false,
    indeterminate: false,
    labelHidden: false,
  },
  render: (args) => ({
    components: { UiCheckbox },
    setup: () => {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<UiCheckbox v-bind="args" v-model="value" />',
  }),
}

// 기본 — label prop
export const Default: Story = {
  args: {
    label: '약관에 동의합니다',
  },
  render: (args) => ({
    components: { UiCheckbox },
    setup: () => {
      const value = ref(false)
      return { args, value }
    },
    template: '<UiCheckbox v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const cb = canvas.getByRole('checkbox')
    await expect((cb as HTMLInputElement).checked).toBe(false)
    await userEvent.click(cb)
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith(true)
    await expect(args.onChange).toHaveBeenCalledWith(true)
  },
}

// label 자리에 slot — rich text/링크 등
export const SlotLabel: Story = {
  render: () => ({
    components: { UiCheckbox },
    setup: () => {
      const value = ref(false)
      return { value }
    },
    template: `
      <UiCheckbox v-model="value">
        <span>
          <a href="#" style="color: #3c69db; text-decoration: underline;">이용약관</a> 및
          <a href="#" style="color: #3c69db; text-decoration: underline;">개인정보처리방침</a>에 동의합니다
        </span>
      </UiCheckbox>
    `,
  }),
}

// disabled — 클릭 차단
export const Disabled: Story = {
  args: {
    label: '잠긴 옵션 (관리자만 변경 가능)',
    disabled: true,
  },
  render: (args) => ({
    components: { UiCheckbox },
    setup: () => {
      const value = ref(true)
      return { args, value }
    },
    template: '<UiCheckbox v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const cb = canvas.getByRole('checkbox') as HTMLInputElement
    await expect(cb.disabled).toBe(true)
    await userEvent.click(cb)
    // disabled native — 브라우저가 change 자체를 발생 안 시킴
    await expect(args['onUpdate:modelValue']).not.toHaveBeenCalled()
  },
}

// indeterminate — 부분 선택 mixed 상태
export const Indeterminate: Story = {
  args: {
    label: '부분 선택 (mixed)',
    modelValue: false,
    indeterminate: true,
  },
  render: (args) => ({
    components: { UiCheckbox },
    setup: () => {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<UiCheckbox v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const cb = canvas.getByRole('checkbox') as HTMLInputElement
    // indeterminate는 DOM property — attribute 아님
    await expect(cb.indeterminate).toBe(true)
  },
}

// 전체 선택 + 부분 선택 패턴 — 실 사용 (이메일/파일 목록 다중 선택 등)
export const SelectAllPattern: Story = {
  render: () => ({
    components: { UiCheckbox },
    setup: () => {
      const items = ref([
        { id: 1, label: '이메일 #1', checked: false },
        { id: 2, label: '이메일 #2', checked: false },
        { id: 3, label: '이메일 #3', checked: false },
        { id: 4, label: '이메일 #4', checked: false },
      ])
      const checkedCount = computed(() => items.value.filter((i) => i.checked).length)
      const allChecked = computed(() => checkedCount.value === items.value.length)
      const indeterminate = computed(
        () => checkedCount.value > 0 && checkedCount.value < items.value.length,
      )
      const onSelectAll = (next: boolean) => {
        items.value.forEach((i) => (i.checked = next))
      }
      return { items, allChecked, indeterminate, checkedCount, onSelectAll }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 320px;">
        <div style="padding-bottom: 8px; border-bottom: 1px solid #ecf0f3;">
          <UiCheckbox
            :model-value="allChecked"
            :indeterminate="indeterminate"
            @update:model-value="onSelectAll"
          >
            <strong>전체 선택</strong>
            <span style="color: #6f7a93; margin-left: 6px;">({{ checkedCount }}/{{ items.length }})</span>
          </UiCheckbox>
        </div>
        <UiCheckbox
          v-for="item in items"
          :key="item.id"
          v-model="item.checked"
          :label="item.label"
        />
      </div>
    `,
  }),
}

// labelHidden — 시각만 숨김, SR 노출
export const LabelHidden: Story = {
  args: {
    label: '이메일 알림 수신 동의',
    labelHidden: true,
  },
  render: (args) => ({
    components: { UiCheckbox },
    setup: () => {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <div style="display: inline-flex; align-items: center; gap: 8px;">
        <span style="color: #4d5462; font-size: 13px;">이메일 알림 (라벨은 SR에만 노출)</span>
        <UiCheckbox v-bind="args" v-model="value" />
      </div>
    `,
  }),
}
