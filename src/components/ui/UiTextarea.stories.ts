import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { ref } from 'vue'
import UiTextarea from './UiTextarea.vue'

const meta = {
  title: 'Components/Form/UiTextarea',
  component: UiTextarea,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
  },
  parameters: {
    docs: {
      description: {
        component: `
ispark-ui 표준 멀티라인 입력 컴포넌트. 자동 높이 조절(autoResize) + 글자수 카운터 + 폼 필드 패턴(label/error/desc).

## Input vs Textarea
- **Input** (\`UiInput\`) — 한 줄 텍스트. 이메일/이름/검색 등.
- **Textarea** (이 컴포넌트) — 여러 줄. 메모/메시지/설명/주소 등. autoResize로 콘텐츠 맞춤.

## API — 핵심
- **\`modelValue\`** \`string\` — v-model
- **\`placeholder\`** \`string\`
- **\`disabled\`** / **\`readonly\`** \`boolean\`
- **\`rows\`** \`number\` — 초기 표시 줄 수 (기본 1). autoResize=true면 콘텐츠 따라 자동 확장
- **\`autoResize\`** \`boolean\` — 입력 따라 scrollHeight로 높이 조절 (기본 true)
- **\`maxRows\`** \`number\` — autoResize 한계. 초과 시 scroll (기본 10)
- **\`maxLength\`** \`number\` — 최대 글자수 (HTML maxlength)
- **\`showCounter\`** \`boolean\` — \`maxLength\`와 함께 사용 시 우하단 'n / max' 카운터
- **\`size\`** \`'sm' | 'md' | 'lg'\` — font-size + min-height
- **\`radius\`** \`'sm' | 'base' | 'lg'\` — 4/6/8px
- **\`border\`** \`boolean\` — 테두리 표시 (기본 true)
- **\`spellcheck\`** \`boolean\` — 브라우저 맞춤법 밑줄 (기본 true)

## API — 폼 필드 (UiInput 일관성)
- **\`label\`** \`string\` — 라벨 텍스트. \`<label htmlFor>\` ↔ textarea id 자동 매칭
- **\`labelHidden\`** \`boolean\` — 시각만 숨김(SR 노출)
- **\`required\`** \`boolean\` — 라벨에 * + HTML required
- **\`error\`** + **\`errorMessage\`** — 에러 상태 + role="alert" 메시지 + aria-invalid
- **\`desc\`** \`string\` — 보조 설명(errorMessage 없을 때만)
- **\`id\`** \`string\` — 미지정 시 \`useId()\` 자동 (SSR 안전)

## 외부 메서드
\`textareaRef.value.focus()\` / \`.blur()\` / \`.el\` — \`defineExpose\`로 노출.

## 접근성
- \`<label for>\` ↔ \`<textarea id>\` 자동 매칭
- \`errorMessage\` 시 \`role="alert"\` + \`aria-invalid="true"\` + \`aria-describedby={errorId}\`
- \`desc\` 시 \`aria-describedby={descId}\`
- \`required\` 시 HTML \`required\` 부여 + 라벨 별표
- \`prefers-reduced-motion: reduce\` 시 transition 정지
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: "'md'" },
      },
    },
    radius: {
      control: 'inline-radio',
      options: ['sm', 'base', 'lg'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: "'base'" },
      },
    },
    border: {
      control: 'boolean',
      table: { category: 'Appearance', defaultValue: { summary: 'true' } },
    },
    autoResize: {
      control: 'boolean',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    maxRows: {
      control: { type: 'number', min: 1, max: 30 },
      table: { category: 'Behavior', defaultValue: { summary: '10' } },
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
    maxLength: {
      control: { type: 'number', min: 0, max: 5000 },
      table: { category: 'Behavior' },
    },
    showCounter: {
      control: 'boolean',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    readonly: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    label: { control: 'text', table: { category: 'Form Field' } },
    labelHidden: { control: 'boolean', table: { category: 'Form Field' } },
    required: { control: 'boolean', table: { category: 'Form Field' } },
    desc: { control: 'text', table: { category: 'Form Field' } },
    errorMessage: { control: 'text', table: { category: 'Form Field' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
  },
} satisfies Meta<typeof UiTextarea>

export default meta
type Story = StoryObj<typeof meta>

// ===== Stories =====

export const Playground: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    label: '메시지',
    border: true,
    size: 'md',
    radius: 'base',
    autoResize: true,
    maxRows: 6,
  },
  render: (args) => ({
    components: { UiTextarea },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiTextarea v-bind="args" v-model="value" />',
  }),
}

// 기본 — placeholder + autoResize 동작 시연
export const Default: Story = {
  args: {
    placeholder: '여기에 입력... (입력에 따라 높이 자동 확장)',
    border: true,
  },
  render: (args) => ({
    components: { UiTextarea },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiTextarea v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const ta = canvas.getByRole('textbox') as HTMLTextAreaElement
    await userEvent.type(ta, '안녕하세요')
    await expect(args['onUpdate:modelValue']).toHaveBeenCalled()
    // 마지막 콜 인자 = 누적 값
    const calls = (args['onUpdate:modelValue'] as any).mock.calls as string[][]
    await expect(calls[calls.length - 1][0]).toBe('안녕하세요')
  },
}

// 라벨 + 필수 + 설명
export const WithFormField: Story = {
  args: {
    label: '자기소개',
    required: true,
    desc: '본인을 소개하는 글을 자유롭게 작성해 주세요.',
    placeholder: '예: 안녕하세요, 5년차 프론트엔드 개발자입니다...',
    border: true,
    maxLength: 500,
    showCounter: true,
    maxRows: 8,
  },
  render: (args) => ({
    components: { UiTextarea },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiTextarea v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText(/자기소개/)
    const ta = canvas.getByRole('textbox')
    // label htmlFor ↔ textarea id 매칭
    await expect(label.getAttribute('for')).toBe(ta.getAttribute('id'))
    // required 별표 + HTML required
    await expect(label.textContent).toContain('*')
    await expect(ta.hasAttribute('required')).toBe(true)
  },
}

// 에러 상태 — errorMessage가 desc 자리 차지 + role="alert"
export const Error: Story = {
  args: {
    label: '제목',
    required: true,
    placeholder: '제목을 입력하세요',
    errorMessage: '제목은 필수 항목입니다.',
    border: true,
    desc: '이 설명은 errorMessage가 있어서 표시되지 않습니다',
  },
  render: (args) => ({
    components: { UiTextarea },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiTextarea v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const ta = canvas.getByRole('textbox')
    await expect(ta.getAttribute('aria-invalid')).toBe('true')
    const alert = canvas.getByRole('alert')
    await expect(alert.textContent).toContain('제목은 필수 항목입니다.')
  },
}

// maxLength + Counter
export const MaxLengthCounter: Story = {
  args: {
    label: '한 줄 소개',
    placeholder: '최대 100자',
    maxLength: 100,
    showCounter: true,
    border: true,
  },
  render: (args) => ({
    components: { UiTextarea },
    setup: () => {
      const value = ref('자기소개를 작성해보세요. 카운터가 입력에 따라 갱신됩니다.')
      return { args, value }
    },
    template: '<UiTextarea v-bind="args" v-model="value" />',
  }),
}

// autoResize 시연 — 텍스트 양에 따라 높이 자동 확장. maxRows 4 한계
export const AutoResize: Story = {
  args: {
    placeholder: '엔터로 줄을 늘려보세요',
    border: true,
    autoResize: true,
    maxRows: 4,
  },
  render: (args) => ({
    components: { UiTextarea },
    setup: () => {
      const value = ref('한 줄 입력입니다.\n두 번째 줄.\n세 번째 줄.\n네 번째 줄 — 여기까지 maxRows 한계.\n다섯 번째 줄 → 스크롤 발생')
      return { args, value }
    },
    template: '<UiTextarea v-bind="args" v-model="value" />',
  }),
}

// size 3종 비교
export const AllSizes: Story = {
  render: () => ({
    components: { UiTextarea },
    setup: () => {
      const v1 = ref('size: sm (12px font, 64px min)')
      const v2 = ref('size: md (14px font, 84px min) — 기본')
      const v3 = ref('size: lg (16px font, 104px min)')
      return { v1, v2, v3 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <UiTextarea v-model="v1" size="sm" border label="sm" />
        <UiTextarea v-model="v2" size="md" border label="md (기본)" />
        <UiTextarea v-model="v3" size="lg" border label="lg" />
      </div>
    `,
  }),
}

// readonly + disabled 비교
export const StateVariants: Story = {
  render: () => ({
    components: { UiTextarea },
    setup: () => {
      const v1 = ref('readonly — 선택/복사는 가능, 수정 불가')
      const v2 = ref('disabled — 포커스/선택 모두 차단')
      return { v1, v2 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <UiTextarea v-model="v1" readonly border label="readonly" />
        <UiTextarea v-model="v2" disabled border label="disabled" />
      </div>
    `,
  }),
}
