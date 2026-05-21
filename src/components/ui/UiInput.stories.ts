import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import { ref } from 'vue'
import UiInput from './UiInput.vue'
import { INPUT_SIZES, SIZES } from '@/design-tokens'

const meta = {
  title: 'Components/Form/UiInput',
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
- **\`type\`** \`text\` | \`search\` | \`password\` | \`email\` | \`tel\` | \`url\`
- **\`label\`** + **\`labelHidden\`** + **\`required\`** — \`<label for>\` 자동 연결 + 필수 표시(*) (v0.3.0)
- **\`error\`** + **\`errorMessage\`** — 에러 상태 + aria-invalid 자동, 메시지 role=alert (v0.3.0)
- **\`size\`** \`sm\`(28px) | \`md\`(32px·기본) | \`lg\`(40px) | \`auth\`(44px·로그인 전용) — 공용 토큰
- **\`iconSize\`** \`xs\` | \`sm\` | \`md\` | \`lg\` — 미지정 시 size 따라감, 명시 시 override
- **\`shape\`** \`rounded\`(기본 6px) | \`pill\`(완전 라운드, 검색바)
- **\`disabled\`** / **\`readonly\`**
- **\`numberOnly\`** + \`allowDecimal\` / \`allowNegative\` — 숫자 전용 (한글 IME 대응)
- **\`min\`** / **\`max\`** / **\`step\`** — **\`numberOnly=true\` 필수**. blur 시점 자동 보정 (native type=text 사용 → HTML 제약 없음)
- **\`maxLength\`** / **\`placeholder\`** / **\`desc\`**

> **외부 메서드**: \`inputRef.value.focus()\` / \`.blur()\` / \`.el\`
>
> **이벤트**: \`update:modelValue\` / \`enter\` (Enter 키) / \`search\` (검색 아이콘 클릭)

---

## 디자인 토큰

size/shape는 \`src/styles/tokens/_size.scss\`, \`_shape.scss\` 공용 토큰 참조.
\`<UiInput size="md"> + <UiButton size="md">\`가 검색바에서 height/font/padding 자동 정렬.

---

## 정책

- \`type="number"\` 사용 금지 — 한글 IME 환경 자음 깜빡임 → **\`numberOnly\` prop** 사용
- 설명 텍스트는 \`<p class="hint">\` 등 별도 태그 대신 **\`desc\` prop**
- \`auth\` 사이즈는 로그인/회원가입 전용 (44px)
- 슬롯 내 아이콘에 \`size-N\` 클래스 생략 시 size 토큰이 자동 적용

---

## 테스트 현황

\`npm test\` 자동 테스트 (\`src/components/ui/UiInput.test.ts\`).

**동작 계약** — input emit / enter 이벤트
**숫자 정책** — numberOnly / allowDecimal / decimals / 다중 점 처리
**type / 상태** — search / password / disabled / desc
**shape & iconSize** — pill 클래스 적용, iconSize override
**size auth** — 로그인 폼 토큰 적용
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['text', 'search', 'password', 'email', 'tel', 'url'],
    },
    size: {
      control: 'inline-radio',
      options: INPUT_SIZES,
      description: 'sm(28px) / md(32px·기본) / lg(40px) / auth(44px·로그인) — 공용 토큰',
    },
    shape: {
      control: 'inline-radio',
      options: ['rounded', 'pill'],
      description: 'rounded(기본 6px) / pill(완전 라운드, 검색바)',
    },
    iconSize: {
      control: 'inline-radio',
      options: ['(자동)', ...SIZES],
      // '(자동)' 라벨 → 실제 prop은 undefined (size 자동 따라감)
      mapping: { '(자동)': undefined },
      description: '아이콘 사이즈 — 미지정 시 size 따라감, 명시 시 override',
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    numberOnly: { control: 'boolean' },
    allowDecimal: { control: 'boolean' },
    allowNegative: { control: 'boolean' },
    decimals: { control: 'number', description: 'allowDecimal=true 일 때 소수점 자릿수 제한' },
    placeholder: { control: 'text' },
    desc: { control: 'text' },
    label: { control: 'text', description: 'label 텍스트 — `<label for>` 자동 연결' },
    labelHidden: { control: 'boolean', description: 'label 시각 숨김 (스크린리더는 인지)' },
    error: { control: 'boolean', description: '에러 상태 — 빨간 테두리 + aria-invalid' },
    errorMessage: { control: 'text', description: '에러 메시지 — 비어있지 않으면 error 자동 true' },
    required: { control: 'boolean', description: '필수 입력 — label 옆 * 표시' },
    clearable: { control: 'boolean', description: '입력 삭제 X 버튼 (값이 있을 때 표시)' },
    showPasswordToggle: { control: 'boolean', description: '비밀번호 표시/숨김 토글 (type=password일 때)' },
    maxLength: { control: 'number' },
    autocomplete: {
      control: 'select',
      options: ['off', 'on', 'email', 'username', 'current-password', 'new-password', 'tel', 'street-address'],
      description: 'autocomplete HTML 속성 (e.g., "email", "current-password", "off")',
    },
  },
} satisfies Meta<typeof UiInput>

// 데모용 아이콘 옵션 (실제 사용 시는 slot으로 직접 전달)
const ICON_OPTIONS = ['(없음)', 'plus', 'edit', 'trashcan', 'close', 'search', 'check', 'arrow-right', 'download', 'chevron-down', 'refresh']

export default meta

type Story = StoryObj<typeof meta>

// ===== 1. Playground — 모든 props 토글, v-model로 라이브 프리뷰 =====
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
    size: 'md',
    shape: 'rounded',
    iconLeft: '(없음)',
    iconRight: '(없음)',
    iconSize: '(자동)',
  } as never,
  parameters: {
    docs: {
      source: {
        language: 'html',
        // Controls 값을 그대로 반영한 실제 사용 코드 동적 생성
        // - 실제 props는 기본값과 다를 때만 출력 (노이즈 제거)
        // - iconLeft / iconRight는 데모 전용 control → slot 패턴으로 변환
        transform: (_src: string, storyContext: { args: Record<string, unknown> }) => {
          const a = storyContext.args || {}

          const attrs: string[] = ['v-model="value"']
          if (a.size && a.size !== 'md') attrs.push(`size="${a.size}"`)
          if (a.shape && a.shape !== 'rounded') attrs.push(`shape="${a.shape}"`)
          if (a.iconSize && a.iconSize !== '(자동)') attrs.push(`icon-size="${a.iconSize}"`)
          if (a.type && a.type !== 'text') attrs.push(`type="${a.type}"`)
          if (a.placeholder) attrs.push(`placeholder="${a.placeholder}"`)
          if (a.disabled) attrs.push('disabled')
          if (a.readonly) attrs.push('readonly')
          if (a.numberOnly) attrs.push('number-only')
          if (a.allowDecimal) attrs.push('allow-decimal')
          if (a.allowNegative) attrs.push('allow-negative')
          if (a.decimals !== undefined && a.decimals !== null) attrs.push(`:decimals="${a.decimals}"`)
          if (a.maxLength !== undefined && a.maxLength !== null && a.maxLength !== '') attrs.push(`:max-length="${a.maxLength}"`)
          if (a.min !== undefined && a.min !== null && a.min !== '') attrs.push(`:min="${a.min}"`)
          if (a.max !== undefined && a.max !== null && a.max !== '') attrs.push(`:max="${a.max}"`)
          if (a.step !== undefined && a.step !== null && a.step !== '') attrs.push(`:step="${a.step}"`)
          if (a.name) attrs.push(`name="${a.name}"`)
          if (a.id) attrs.push(`id="${a.id}"`)
          if (a.required) attrs.push('required')
          if (a.label) attrs.push(`label="${a.label}"`)
          if (a.labelHidden) attrs.push('label-hidden')
          if (a.error) attrs.push('error')
          if (a.errorMessage) attrs.push(`error-message="${a.errorMessage}"`)
          if (a.desc) attrs.push(`desc="${a.desc}"`)
          if (a.autocomplete) attrs.push(`autocomplete="${a.autocomplete}"`)

          const head = `<UiInput ${attrs.join(' ')}`

          const hasL = a.iconLeft && a.iconLeft !== '(없음)'
          // type=search이면 우측 아이콘 자동이므로 iconRight slot은 표시 안 함
          const hasR = a.iconRight && a.iconRight !== '(없음)' && a.type !== 'search'

          if (!hasL && !hasR) return `${head} />`

          const children: string[] = []
          if (hasL) {
            children.push(`  <template #icon-left>\n    <i class="icon-${a.iconLeft}" />\n  </template>`)
          }
          if (hasR) {
            children.push(`  <template #icon-right>\n    <i class="icon-${a.iconRight}" />\n  </template>`)
          }
          return `${head}>\n${children.join('\n')}\n</UiInput>`
        },
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
            <i :class="['icon-' + args.iconLeft]" />
          </template>
          <template v-if="args.iconRight && args.iconRight !== '(없음)' && args.type !== 'search'" #icon-right>
            <i :class="['icon-' + args.iconRight]" />
          </template>
        </UiInput>
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
        <UiInput size="sm" placeholder="Small (28px)" />
        <UiInput size="md" placeholder="Medium (32px) — 기본" />
        <UiInput size="lg" placeholder="Large (40px)" />
        <UiInput size="auth" placeholder="Auth (44px) — 로그인 전용" />
      </div>
    `,
  }),
}

// ===== 3. AllShapes — rounded vs pill =====
export const AllShapes: Story = {
  name: '모서리 모양 (shape)',
  render: () => ({
    components: { UiInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #6f7a93;">rounded — 기본 6px</p>
          <UiInput shape="rounded" placeholder="이름을 입력하세요" />
        </div>
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #6f7a93;">pill — 완전 라운드 (검색바 등)</p>
          <UiInput shape="pill" type="search" placeholder="검색..." />
        </div>
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #6f7a93;">pill + icon-left</p>
          <UiInput shape="pill" placeholder="필터">
            <template #icon-left><i class="icon-search" /></template>
          </UiInput>
        </div>
      </div>
    `,
  }),
}

// ===== 4. Types — 6종 type 시연 (url v0.3.0 추가) =====
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
        <UiInput type="url" placeholder="url — https://..." />
      </div>
    `,
  }),
}

// ===== 4-1. WithLabel — label + required + labelHidden =====
export const WithLabel: Story = {
  name: 'Label 사용 (필수 표시 / 숨김)',
  render: () => ({
    components: { UiInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput label="이메일" placeholder="example@anthropic.com" type="email" />
        <UiInput label="비밀번호" placeholder="6자 이상" type="password" required desc="6자 이상 영문/숫자" />
        <UiInput label-hidden label="검색" placeholder="검색어 입력 (label은 스크린리더에만)" type="search" />
      </div>
    `,
  }),
}

// ===== 4-2. ErrorState — error / errorMessage =====
export const ErrorState: Story = {
  name: '에러 상태 (error / errorMessage)',
  render: () => ({
    components: { UiInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput label="이메일" model-value="invalid@" error error-message="이메일 형식이 올바르지 않습니다." type="email" />
        <UiInput label="비밀번호" type="password" required error-message="필수 입력 항목입니다." />
        <UiInput label="이름" model-value="홍길동" error desc="error만 켜지면 빨간 테두리만 (메시지 없음)" />
      </div>
    `,
  }),
}

// ===== 5. NumberOnly — 한글 IME 깜빡임 방지 =====
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

// ===== 6. FormValidation — 실시간 검증으로 errorMessage 동작 시연 =====
export const FormValidation: Story = {
  name: '실전: 폼 검증 (실시간 에러)',
  render: () => ({
    components: { UiInput },
    setup() {
      const email = ref('')
      const emailError = ref('')
      const name = ref('')
      const nameError = ref('')

      const validateEmail = (val: string) => {
        if (!val) {
          emailError.value = '이메일을 입력해주세요.'
        } else if (!val.includes('@')) {
          emailError.value = '올바른 이메일 형식이 아닙니다.'
        } else {
          emailError.value = ''
        }
      }

      const validateName = (val: string) => {
        if (!val) {
          nameError.value = '이름을 입력해주세요.'
        } else if (val.length < 2) {
          nameError.value = '2자 이상 입력해주세요.'
        } else {
          nameError.value = ''
        }
      }

      return { email, emailError, validateEmail, name, nameError, validateName }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput
          v-model="name"
          label="이름"
          required
          placeholder="홍길동"
          :error-message="nameError"
          @update:model-value="validateName"
        />
        <UiInput
          v-model="email"
          label="이메일"
          required
          type="email"
          placeholder="example@email.com"
          :error-message="emailError"
          @update:model-value="validateEmail"
        />
        <p style="margin-top: 4px; font-size: 12px; color: #6f7a93;">
          💡 입력하면서 실시간 검증 — errorMessage가 비어있지 않으면 자동으로 에러 스타일 적용
        </p>
      </div>
    `,
  }),
}

// ===== 7. Clearable — 입력 삭제 버튼 =====
export const Clearable: Story = {
  name: '입력 삭제 (clearable)',
  render: () => ({
    components: { UiInput },
    setup() {
      const text = ref('삭제 가능한 텍스트')
      const search = ref('검색어')
      return { text, search }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput v-model="text" label="일반 입력" clearable placeholder="입력 후 X 버튼 확인" />
        <UiInput v-model="search" label="검색 (clearable 무시)" clearable type="search" placeholder="type=search는 검색 아이콘 우선" />
        <UiInput model-value="비활성" label="disabled" clearable disabled />
        <p style="margin-top: 4px; font-size: 12px; color: #6f7a93;">
          💡 값이 있을 때만 X 표시. disabled/readonly일 때는 숨김.
        </p>
      </div>
    `,
  }),
}

// ===== 8. PasswordToggle — 비밀번호 표시/숨김 =====
export const PasswordToggle: Story = {
  name: '비밀번호 토글 (showPasswordToggle)',
  render: () => ({
    components: { UiInput },
    setup() {
      const pw = ref('mySecret123')
      return { pw }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput v-model="pw" label="비밀번호" type="password" show-password-toggle placeholder="비밀번호 입력" />
        <UiInput model-value="disabled" label="disabled 상태" type="password" show-password-toggle disabled />
        <p style="margin-top: 4px; font-size: 12px; color: #6f7a93;">
          💡 눈 아이콘 클릭으로 비밀번호 표시/숨김 토글. type="password"일 때만 동작.
        </p>
      </div>
    `,
  }),
}

// ===== 9. LoginForm — 실전: auth 사이즈 사용 =====
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
        <UiInput v-model="id" size="auth" placeholder="아이디" clearable />
        <UiInput v-model="pw" size="auth" type="password" placeholder="비밀번호" show-password-toggle />
      </form>
    `,
  }),
}
