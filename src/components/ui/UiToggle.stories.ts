import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { ref } from 'vue'
import UiToggle from './UiToggle.vue'

const meta = {
  title: 'Components/UiToggle',
  component: UiToggle,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: `
ispark-ui 표준 on/off 스위치 컴포넌트. \`role="switch"\` + \`aria-checked\` 기반의 접근 가능한 토글.

## 언제 사용하나
- 설정 화면의 on/off 옵션 (알림/다크모드/공개여부 등)
- 폼 안의 단일 boolean 입력 (한 줄 라벨 + 토글 패턴)

## Checkbox vs Toggle
- **Checkbox** — 폼 제출 시점에 함께 적용되는 선택 (예: 약관 동의)
- **Toggle** — 토글 즉시 효과가 적용되는 옵션 (예: 알림 켜기/끄기)

## API
- **\`modelValue\`** \`boolean\` — v-model 바인딩 (required)
- **\`disabled\`** \`boolean\` — 비활성. 클릭/포커스/키보드 모두 차단
- **\`label\`** \`string\` — 라벨 텍스트. \`<label htmlFor>\`로 button과 자동 연결
- **\`labelHidden\`** \`boolean\` — 라벨을 시각적으로만 숨김(SR에는 노출). a11y 보장하면서 컴팩트 UI 가능
- **\`id\`** \`string\` — 명시 id. 미지정 시 \`useId()\` 자동 생성 (SSR 안전)

## 이벤트
- \`update:modelValue\` — v-model 양방향
- \`change\` — 동일 payload 별도 emit (편의)

## 접근성
- \`role="switch"\` + \`aria-checked\` 동기화 — SR이 "스위치, 켜짐/꺼짐"으로 announce
- \`disabled\` 시 \`aria-disabled\` + native \`disabled\` 둘 다 부여
- \`<label htmlFor>\` 자동 매칭 — 라벨 클릭으로도 토글
- \`:focus-visible\`에 outline 2px primary — 키보드 사용자 명확
- \`prefers-reduced-motion: reduce\` 시 thumb 트랜지션 정지

## 디자인 토큰
- 트랙 크기: 32×20px 고정 (사용처가 단일 사이즈로 충분)
- off bg: \`$color-border\` / on bg: \`var(--color-primary)\` — 테마 전환 대응
        `,
      },
    },
  },
} satisfies Meta<typeof UiToggle>

export default meta
type Story = StoryObj<typeof meta>

// ===== Stories =====

export const Playground: Story = {
  args: {
    modelValue: false,
    disabled: false,
    label: '알림 받기',
  },
  render: (args) => ({
    components: { UiToggle },
    setup: () => {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<UiToggle v-bind="args" v-model="value" />',
  }),
}

// 라벨 없는 단독 토글 — 부모가 텍스트를 별도로 그리는 경우
export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { UiToggle },
    setup: () => {
      const value = ref(false)
      return { args, value }
    },
    template: '<UiToggle v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const sw = canvas.getByRole('switch')
    // 초기 aria-checked=false
    await expect(sw.getAttribute('aria-checked')).toBe('false')
    // 클릭 → emit + aria-checked=true
    await userEvent.click(sw)
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith(true)
    await expect(args.onChange).toHaveBeenCalledWith(true)
  },
}

// 라벨 + 토글 한 줄 — 가장 흔한 사용 패턴
export const WithLabel: Story = {
  args: {
    label: '이메일 알림',
  },
  render: (args) => ({
    components: { UiToggle },
    setup: () => {
      const value = ref(true)
      return { args, value }
    },
    template: '<UiToggle v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('이메일 알림')
    const sw = canvas.getByRole('switch')
    // label htmlFor와 switch id 매칭
    await expect(label.getAttribute('for')).toBe(sw.getAttribute('id'))
    // 라벨 클릭으로도 토글 가능 (htmlFor 매칭 검증)
    await userEvent.click(label)
    await expect(sw.getAttribute('aria-checked')).toBe('false')
  },
}

// labelHidden — 시각적으로 숨기되 SR에는 노출
export const LabelHidden: Story = {
  args: {
    label: '다크 모드 켜기',
    labelHidden: true,
  },
  render: (args) => ({
    components: { UiToggle },
    setup: () => {
      const value = ref(false)
      return { args, value }
    },
    template: '<UiToggle v-bind="args" v-model="value" />',
  }),
}

// disabled — 비활성 시 클릭/keyboard 모두 차단
export const Disabled: Story = {
  args: {
    disabled: true,
    label: '관리자 전용 (잠금)',
  },
  render: (args) => ({
    components: { UiToggle },
    setup: () => {
      const value = ref(true)
      return { args, value }
    },
    template: '<UiToggle v-bind="args" v-model="value" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const sw = canvas.getByRole('switch')
    await expect(sw.hasAttribute('disabled')).toBe(true)
    await expect(sw.getAttribute('aria-disabled')).toBe('true')
    // disabled 클릭은 emit 발생 안 함
    await userEvent.click(sw)
    await expect(args['onUpdate:modelValue']).not.toHaveBeenCalled()
  },
}

// 실제 설정 페이지 패턴 — 여러 토글 row 스택
export const SettingsList: Story = {
  render: () => ({
    components: { UiToggle },
    setup: () => {
      const settings = ref({
        emailNotify: true,
        pushNotify: false,
        marketing: false,
        darkMode: true,
      })
      return { settings }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">이메일 알림</span>
          <UiToggle v-model="settings.emailNotify" label="이메일 알림" label-hidden />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">푸시 알림</span>
          <UiToggle v-model="settings.pushNotify" label="푸시 알림" label-hidden />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">마케팅 정보 수신</span>
          <UiToggle v-model="settings.marketing" label="마케팅" label-hidden />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">다크 모드</span>
          <UiToggle v-model="settings.darkMode" label="다크 모드" label-hidden />
        </div>
        <pre style="margin-top: 8px; padding: 10px; background: #f4f7f9; border-radius: 6px; font-size: 11px; color: #4d5462;">{{ JSON.stringify(settings, null, 2) }}</pre>
      </div>
    `,
  }),
}
