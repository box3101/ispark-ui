import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import { ref } from 'vue'
import UiInput from './UiInput.vue'
import { INPUT_SIZES, SIZES } from '@/design-tokens'

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
      options: ['text', 'search', 'password', 'email', 'tel'],
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
    maxLength: { control: 'number' },
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
          if (a.iconSize) attrs.push(`icon-size="${a.iconSize}"`)
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
          if (a.desc) attrs.push(`desc="${a.desc}"`)

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

// ===== 4. Types — 5종 type 시연 =====
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

// ===== 6. LoginForm — 실전: auth 사이즈 사용 =====
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
