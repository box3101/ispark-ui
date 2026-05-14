import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { ref } from 'vue'
import UiRadio from './UiRadio.vue'

const meta = {
  title: 'Components/UiRadio',
  component: UiRadio,
  tags: ['autodocs'],
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: `
ispark-ui 표준 라디오 버튼. 같은 그룹 라디오 중 **하나만** 선택 가능. 네이티브 \`<input type="radio">\`를 래핑.

## Radio vs Checkbox vs Select
- **Radio** (이 컴포넌트) — 2~5개 옵션 중 한 개 선택. 옵션이 한 눈에 다 보여야 할 때.
- **Checkbox** (\`UiCheckbox\`) — 다중 선택, 또는 단일 boolean(약관 동의 등).
- **Select** (\`UiSelect\`) — 6개 이상 옵션, 또는 폼 공간 절약 시.

## API
- **\`modelValue\`** \`string | number | boolean\` — 그룹의 현재 선택 값 (v-model)
- **\`value\`** \`string | number | boolean\` — 이 라디오 고유 값. \`modelValue === value\` 일 때 checked
- **\`name\`** \`string\` — 같은 그룹은 동일 name을 명시 권장. 미지정 시 컴포넌트당 자동 생성됨(독립 그룹)
- **\`label\`** \`string\` 또는 default slot
- **\`labelHidden\`** \`boolean\` — 시각만 숨김(SR 노출)
- **\`disabled\`** \`boolean\`
- **\`id\`** \`string\` — 명시 id. 미지정 시 \`useId()\` 자동

## 이벤트
- \`update:modelValue\` — v-model 양방향 (이 라디오의 value emit)
- \`change\` — 동일 payload 별도 emit

## 그룹 패턴
같은 \`v-model\`을 공유하는 라디오들은 **동일한 \`name\` prop을 명시**하는 것을 권장한다:

\`\`\`vue
<UiRadio v-model="plan" value="free"  name="plan" label="Free" />
<UiRadio v-model="plan" value="pro"   name="plan" label="Pro" />
<UiRadio v-model="plan" value="team"  name="plan" label="Team" />
\`\`\`

\`name\`을 생략하면 각 라디오가 독립 그룹으로 동작(자동 name) — Vue v-model이 단일 선택을 보장하지만, 브라우저 native 그룹 동작(키보드 화살표 등)은 동일 name이 있어야 작동한다.

## 접근성
- 네이티브 \`<input type="radio">\` 사용 — role/포커스/스페이스/화살표 키 자동
- \`<label for>\` ↔ \`<input id>\` 자동 매칭 (useId)
- \`:focus-visible\` 시 box outline 2px primary
- \`prefers-reduced-motion: reduce\` 시 트랜지션 정지

## 디자인 토큰
- 박스: 16×16px 원형 (Checkbox 16×16 사각형과 시각 구분)
- 내부 dot: 8×8 \`var(--color-primary)\`
        `,
      },
    },
  },
} satisfies Meta<typeof UiRadio>

export default meta
type Story = StoryObj<typeof meta>

// ===== Stories =====

export const Playground: Story = {
  args: {
    modelValue: 'a',
    value: 'a',
    label: '옵션 A',
    disabled: false,
  },
  render: (args) => ({
    components: { UiRadio },
    setup: () => ({ args }),
    template: '<UiRadio v-bind="args" />',
  }),
}

// 단일 라디오 — modelValue === value 매칭 데모
export const Default: Story = {
  args: {
    value: 'pro',
    label: 'Pro 플랜',
  },
  render: (args) => ({
    components: { UiRadio },
    setup: () => {
      const selected = ref<string>('')
      return { args, selected }
    },
    template: '<UiRadio v-bind="args" v-model="selected" />',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole('radio') as HTMLInputElement
    await expect(radio.checked).toBe(false)
    await userEvent.click(radio)
    // update:modelValue에 value('pro') emit
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('pro')
    await expect(args.onChange).toHaveBeenCalledWith('pro')
  },
}

// 같은 v-model + 같은 name으로 묶인 옵션 그룹 — 세로 배치 (결제 방법 선택 등)
export const VerticalGroup: Story = {
  render: () => ({
    components: { UiRadio },
    setup: () => {
      const payment = ref('card')
      return { payment }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiRadio v-model="payment" value="card" name="payment" label="신용/체크카드" />
        <UiRadio v-model="payment" value="bank" name="payment" label="계좌이체" />
        <UiRadio v-model="payment" value="kakao" name="payment" label="카카오페이" />
        <UiRadio v-model="payment" value="naver" name="payment" label="네이버페이" />
        <pre style="margin-top: 8px; padding: 10px; background: #f4f7f9; border-radius: 6px; font-size: 11px; color: #4d5462;">선택: {{ payment }}</pre>
      </div>
    `,
  }),
}

// 가로 배치 — 짧은 옵션 2~3개 (예: 성별, 공개 범위)
export const HorizontalGroup: Story = {
  render: () => ({
    components: { UiRadio },
    setup: () => {
      const visibility = ref<'public' | 'private' | 'team'>('team')
      return { visibility }
    },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <UiRadio v-model="visibility" value="public" name="vis" label="전체 공개" />
        <UiRadio v-model="visibility" value="team" name="vis" label="팀 공개" />
        <UiRadio v-model="visibility" value="private" name="vis" label="비공개" />
      </div>
    `,
  }),
}

// disabled 옵션 — 그룹 안에 하나만 잠긴 케이스 (예: 권한 부족 플랜)
export const WithDisabledOption: Story = {
  render: () => ({
    components: { UiRadio },
    setup: () => {
      const plan = ref('free')
      return { plan }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiRadio v-model="plan" value="free" name="plan" label="Free — 개인" />
        <UiRadio v-model="plan" value="pro" name="plan" label="Pro — 개인 ($9/월)" />
        <UiRadio v-model="plan" value="team" name="plan" :disabled="true">
          Team ($29/월) — <span style="color: #b91c1c; font-size: 12px;">관리자 권한 필요</span>
        </UiRadio>
      </div>
    `,
  }),
}

// slot 라벨 — rich text/링크/배지 등
export const SlotLabel: Story = {
  render: () => ({
    components: { UiRadio },
    setup: () => {
      const choice = ref('paid')
      return { choice }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <UiRadio v-model="choice" value="paid" name="c">
          유료 플랜 <span style="color: #15803d; font-weight: 600; font-size: 12px; padding: 1px 8px; background: rgba(34,197,94,0.12); border-radius: 999px; margin-left: 6px;">추천</span>
        </UiRadio>
        <UiRadio v-model="choice" value="free" name="c">
          무료 플랜 <span style="color: #6f7a93; font-size: 12px; margin-left: 6px;">제한 기능</span>
        </UiRadio>
      </div>
    `,
  }),
}
