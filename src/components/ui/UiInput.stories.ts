import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import { ref } from 'vue'
import UiInput from './UiInput.vue'

const meta = {
  title: 'Components/UiInput',
  component: UiInput,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onEnter: fn(),
    onSearch: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: `
## 핵심 props

- **\`modelValue\`** — v-model 양방향 바인딩
- **\`type\`** \`text\` | \`search\` | \`password\` | \`email\` | \`tel\`
- **\`size\`** \`sm\`(28px·기본) | \`md\`(32px) | \`lg\`(40px) | \`auth\`(44px·로그인 전용)
- **\`disabled\`** / **\`readonly\`**
- **\`numberOnly\`** + \`allowDecimal\` / \`allowNegative\` — 숫자 전용 (한글 IME 대응)
- **\`min\`** / **\`max\`** / **\`step\`** — numberOnly와 함께 사용 시 blur 보정
- **\`maxLength\`** / **\`placeholder\`** / **\`desc\`**

> **외부 메서드**: \`inputRef.value.focus()\` / \`.blur()\` / \`.el\`
>
> **이벤트**: \`update:modelValue\` / \`enter\` (Enter 키) / \`search\` (검색 아이콘 클릭)

---

## 정책

- \`type="number"\` 사용 금지 — 한글 IME 환경에서 자음이 깜빡이는 브라우저 버그 → **\`numberOnly\` prop** 사용
- 설명 텍스트는 \`<p class="hint">\` 등 별도 태그 대신 **\`desc\` prop** 사용
- \`auth\` 사이즈는 로그인/회원가입 전용 (44px, autofill 흰 배경 강제)

---

## 테스트 현황

\`npm test\` 로 실행되는 자동 테스트 **10가지** (\`src/components/ui/UiInput.test.ts\`).

**동작 계약**
- ✅ input 시 update:modelValue emit
- ✅ Enter 키 시 enter 이벤트 emit

**숫자 정책**
- ✅ numberOnly 시 숫자 외 입력 제거
- ✅ allowDecimal 시 소수점 허용
- ✅ decimals=2 시 소수점 자릿수 즉시 제한
- ✅ 소수점 여러 개 입력 시 첫 번째만 유지

**type / 상태 / 부가**
- ✅ type="search" 시 native input은 text + 검색 아이콘 별도 렌더
- ✅ type="password" 시 native input type 적용
- ✅ disabled 시 native disabled + 클래스
- ✅ desc prop 시 설명 텍스트 렌더
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['text', 'search', 'password', 'email', 'tel'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'auth'],
      description: 'sm(28px·기본) / md(32px) / lg(40px) / auth(44px·로그인 전용)',
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    numberOnly: { control: 'boolean' },
    allowDecimal: { control: 'boolean' },
    allowNegative: { control: 'boolean' },
    decimals: { control: 'number', description: 'allowDecimal=true 일 때 소수점 자릿수 제한' },
    placeholder: { control: 'text' },
    desc: { control: 'text' },
    maxLength: { control: 'number' },
  },
} satisfies Meta<typeof UiInput>

// 데모용 아이콘 옵션 (실제 사용 시는 slot으로 직접 전달)
const ICON_OPTIONS = ['(없음)', 'plus', 'edit', 'trashcan', 'close', 'search', 'check', 'arrow-right', 'download', 'chevron-down', 'refresh']

export default meta

type Story = StoryObj<typeof meta>

// ===== 1. Playground — 모든 props 토글, v-model로 라이브 프리뷰 =====
// 입력 동작 자동 테스트는 src/components/ui/UiInput.test.ts 에서 처리 (10 tests)
export const Playground: Story = {
  argTypes: {
    iconLeft: {
      control: 'select',
      options: ICON_OPTIONS,
      description: '🧪 데모 전용 (실제 API 아님). 실제는 #icon-left slot 사용',
    },
    iconRight: {
      control: 'select',
      options: ICON_OPTIONS,
      description: '🧪 데모 전용 (실제 API 아님). type=search 면 자동 검색 아이콘',
    },
  } as never,
  args: {
    placeholder: '값을 입력하세요',
    size: 'sm',
    iconLeft: '(없음)',
    iconRight: '(없음)',
  } as never,
  parameters: {
    docs: {
      source: {
        code: `<!-- 실제 사용법 -->
<UiInput v-model="value" placeholder="값 입력" />

<!-- 좌측 아이콘 -->
<UiInput v-model="value" placeholder="검색">
  <template #icon-left>
    <i class="icon-search size-16" />
  </template>
</UiInput>

<!-- 숫자 전용 + 소수점 2자리 -->
<UiInput v-model="temp" number-only allow-decimal :decimals="2" placeholder="0.7" />`,
      },
    },
  },
  render: (args: Record<string, unknown>) => ({
    components: { UiInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div style="max-width: 320px;">
        <UiInput v-bind="args" v-model="value">
          <template v-if="args.iconLeft && args.iconLeft !== '(없음)'" #icon-left>
            <i :class="['icon-' + args.iconLeft, 'size-16']" />
          </template>
          <template v-if="args.iconRight && args.iconRight !== '(없음)' && args.type !== 'search'" #icon-right>
            <i :class="['icon-' + args.iconRight, 'size-16']" />
          </template>
        </UiInput>
        <p style="margin-top: 8px; font-size: 12px; color: #6f7a93;">value: "{{ value }}"</p>
      </div>
    `,
  }),
}

// ===== 2. AllSizes — 4종 사이즈 비교 =====
export const AllSizes: Story = {
  render: () => ({
    components: { UiInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiInput size="sm" placeholder="Small (28px) — 기본" />
        <UiInput size="md" placeholder="Medium (32px)" />
        <UiInput size="lg" placeholder="Large (40px)" />
        <UiInput size="auth" placeholder="Auth (44px) — 로그인 전용" />
      </div>
    `,
  }),
}

// ===== 3. Types — 5종 type 시연 =====
export const Types: Story = {
  render: () => ({
    components: { UiInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiInput type="text" placeholder="text — 일반 텍스트" />
        <UiInput type="search" placeholder="search — 자동 검색 아이콘" />
        <UiInput type="password" placeholder="password — 비밀번호" />
        <UiInput type="email" placeholder="email — 이메일" />
        <UiInput type="tel" placeholder="tel — 전화번호" />
      </div>
    `,
  }),
}

// ===== 4. NumberOnly — 한글 IME 깜빡임 방지 =====
export const NumberOnly: Story = {
  name: '숫자 전용 (numberOnly)',
  render: () => ({
    components: { UiInput },
    setup() {
      const intValue = ref('')
      const decimalValue = ref('')
      const negativeValue = ref('')
      const constrainedValue = ref('')
      return { intValue, decimalValue, negativeValue, constrainedValue }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div>
          <UiInput v-model="intValue" number-only placeholder="정수만" />
          <p style="margin-top: 4px; font-size: 12px; color: #6f7a93;">value: "{{ intValue }}"</p>
        </div>
        <div>
          <UiInput v-model="decimalValue" number-only allow-decimal placeholder="소수 허용" desc="temperature 같은 0~1 값" />
        </div>
        <div>
          <UiInput v-model="negativeValue" number-only allow-negative placeholder="음수 허용" />
        </div>
        <div>
          <UiInput v-model="constrainedValue" number-only allow-decimal :min="0" :max="1" :step="0.1" placeholder="0~1, 0.1 단위" desc="blur 시 자동 보정" />
        </div>
        <div>
          <UiInput number-only allow-decimal :decimals="2" placeholder="소수점 2자리만 (decimals=2)" desc="입력 즉시 초과 자릿수 제거" />
        </div>
      </div>
    `,
  }),
}

// ===== 5. LoginForm — 실전: auth 사이즈 사용 =====
export const LoginForm: Story = {
  name: '실전: 로그인 폼 (auth 사이즈)',
  render: () => ({
    components: { UiInput },
    setup() {
      const id = ref('')
      const pw = ref('')
      return { id, pw }
    },
    template: `
      <form style="display: flex; flex-direction: column; gap: 12px; padding: 24px; background: #f4f7f9; border-radius: 8px; max-width: 360px;">
        <UiInput v-model="id" size="auth" placeholder="아이디" />
        <UiInput v-model="pw" size="auth" type="password" placeholder="비밀번호" />
      </form>
    `,
  }),
}
