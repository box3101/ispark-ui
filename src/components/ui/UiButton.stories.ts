import type { Meta, StoryObj } from '@storybook/vue3'
import { within, userEvent, expect, fn } from '@storybook/test'
import UiButton from './UiButton.vue'

const meta = {
  title: 'Components/UiButton',
  component: UiButton,
  tags: ['autodocs'],
  args: {
    onClick: fn(), // play 함수에서 호출 추적용 spy
  },
  parameters: {
    docs: {
      description: {
        component: `
## 핵심 props

- **\`variant\`** \`primary\` | \`secondary\` | \`ghost\` | \`danger\` — 시멘틱 4종
- **\`size\`** \`sm\` | \`md\` | \`lg\` — 28 / 32 / 40px
- **\`as\`** \`button\` | \`a\` — 링크로 사용 시 \`as="a"\` + \`href\`
- **\`type\`** \`button\` | \`submit\` | \`reset\` — 기본 \`button\` (form 안 의도치 않은 submit 방지)
- **\`iconOnly\`** + **\`ariaLabel\`** — 아이콘 전용 버튼은 ariaLabel 필수 (스크린리더)
- **\`disabled\`** / **\`loading\`** / **\`fullWidth\`**

> **외부 메서드**: 외부에서 \`buttonRef.value.focus()\` / \`.blur()\` / \`.el\` 호출 가능 (defineExpose).

---

## 테스트 현황

이 컴포넌트는 **자동 테스트 8가지**로 동작이 보장됩니다.

**동작 계약**
- ✅ 클릭 → click 1회 emit — Playground 스토리의 play 함수로 자동 실행 (아래 **Interactions** 패널)
- ✅ disabled → click emit 차단
- ✅ loading → click emit 차단

**안전성**
- ✅ type 기본값 \`button\` (form 안에서 submit 방지)
- ✅ type="submit" 명시 시 submit 적용

**접근성**
- ✅ iconOnly + ariaLabel 시 aria-label 속성 적용

**확장성 (polymorphic)**
- ✅ as="a" 시 anchor 태그 + href 적용
- ✅ as="a" + disabled 시 aria-disabled + tabindex=-1 적용

> **검증 분담**: 시각은 사이드바 스토리에서, 동작은 \`npm test\` + Storybook Interactions 패널에서.
>
> 테스트 코드: \`src/components/ui/UiButton.test.ts\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: '시멘틱 variant — primary(강조) / secondary(보조) / ghost(트리거) / danger(파괴)',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'sm(28px) / md(32px·기본) / lg(40px)',
    },
    as: {
      control: 'inline-radio',
      options: ['button', 'a'],
      description: '렌더링 태그 — button(기본) / a(링크)',
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
      description: 'button 태그일 때만 적용. 기본 "button" (form 안 의도치 않은 submit 방지)',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    ariaLabel: { control: 'text', description: 'iconOnly=true 시 필수 (접근성)' },
    href: { control: 'text', description: 'as="a"일 때 링크 경로' },
  },
} satisfies Meta<typeof UiButton>

export default meta

type Story = StoryObj<typeof meta>

// ===== 1. Playground — 모든 props를 Controls로 조작 + 클릭 자동 테스트 =====
export const Playground: Story = {
  args: { variant: 'primary', size: 'md' },
  render: (args) => ({
    components: { UiButton },
    setup: () => ({ args }),
    template: '<UiButton v-bind="args">버튼</UiButton>',
  }),
  // Storybook Interactions 패널에서 단계별 실행 결과 확인 가능
  play: async ({ canvasElement, args }) => {
    const btn = within(canvasElement).getByRole('button')
    await userEvent.click(btn)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

// ===== 2. AllVariants — 4종 시멘틱 한눈에 비교 =====
export const AllVariants: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <UiButton variant="primary">Primary</UiButton>
        <UiButton variant="secondary">Secondary</UiButton>
        <UiButton variant="ghost">Ghost</UiButton>
        <UiButton variant="danger">Danger</UiButton>
      </div>
    `,
  }),
}

// ===== 3. AllSizes — 3단계 사이즈 비교 =====
export const AllSizes: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <UiButton size="sm">Small (28px)</UiButton>
        <UiButton size="md">Medium (32px)</UiButton>
        <UiButton size="lg">Large (40px)</UiButton>
      </div>
    `,
  }),
}

// ===== 4. WithIcon — icon-left / icon-right / iconOnly 한 화면 =====
export const WithIcon: Story = {
  name: '아이콘 사용',
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">icon-left</span>
          <UiButton variant="primary">
            <template #icon-left><i class="icon-plus size-16" /></template>
            Agent 추가
          </UiButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">icon-right</span>
          <UiButton variant="secondary">
            다음
            <template #icon-right><i class="icon-arrow-right size-16" /></template>
          </UiButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">iconOnly</span>
          <UiButton variant="ghost" iconOnly>
            <template #icon-left><i class="icon-edit size-16" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly>
            <template #icon-left><i class="icon-trashcan size-16" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly>
            <template #icon-left><i class="icon-download size-16" /></template>
          </UiButton>
        </div>
      </div>
    `,
  }),
}

// ===== 5. AsLink — polymorphic (button → a 태그) =====
export const AsLink: Story = {
  name: '확장: 링크로 사용',
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <UiButton as="a" href="/agent/list" variant="primary">
          <template #icon-left><i class="icon-arrow-right size-16" /></template>
          목록 페이지로
        </UiButton>
        <UiButton as="a" href="/x" variant="secondary" disabled>
          비활성 링크 (aria-disabled + tabindex=-1)
        </UiButton>
      </div>
    `,
  }),
}

// ===== 6. AccessibilityIconOnly — iconOnly + ariaLabel =====
export const AccessibilityIconOnly: Story = {
  name: '접근성: iconOnly + ariaLabel',
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <p style="margin: 0; font-size: 13px; color: #4d5462;">
          iconOnly=true 시 <code>ariaLabel</code> 필수 — 스크린리더가 버튼 용도를 인지.
          미지정 시 dev 콘솔 경고 출력.
        </p>
        <div style="display: flex; gap: 8px;">
          <UiButton variant="ghost" iconOnly aria-label="편집">
            <template #icon-left><i class="icon-edit size-16" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly aria-label="삭제">
            <template #icon-left><i class="icon-trashcan size-16" /></template>
          </UiButton>
          <UiButton variant="danger" iconOnly aria-label="모두 삭제">
            <template #icon-left><i class="icon-trashcan size-16" /></template>
          </UiButton>
        </div>
      </div>
    `,
  }),
}

// ===== 7. SubmitInForm — type 동작 데모 (form submit 방어) =====
export const SubmitInForm: Story = {
  name: '안전성: form 안 type 동작',
  render: () => ({
    components: { UiButton },
    setup() {
      const onSubmit = (e: Event) => {
        e.preventDefault()
        // eslint-disable-next-line no-alert
        alert('form submit 발생!')
      }
      return { onSubmit }
    },
    template: `
      <form @submit="onSubmit" style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background: #f4f7f9; border-radius: 8px; max-width: 360px;">
        <input type="text" placeholder="검색어" style="padding: 8px; border: 1px solid #dce4e9; border-radius: 6px;" />
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <UiButton variant="secondary">취소 (type=button 기본)</UiButton>
          <UiButton variant="primary" type="submit">검색 (type=submit)</UiButton>
        </div>
        <p style="margin: 0; font-size: 12px; color: #6f7a93;">
          취소 버튼은 type=button 기본값으로 submit이 발생하지 않습니다. 검색만 alert 발생.
        </p>
      </form>
    `,
  }),
}

// ===== 8. ModalFooter — 실전 사용 예 =====
export const ModalFooter: Story = {
  name: '실전: 모달 푸터',
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div style="display: flex; gap: 8px; justify-content: flex-end; padding: 16px; background: #f4f7f9; border-radius: 8px;">
          <UiButton variant="secondary">취소</UiButton>
          <UiButton variant="primary">저장</UiButton>
        </div>
        <div style="display: flex; gap: 8px; justify-content: flex-end; padding: 16px; background: #f4f7f9; border-radius: 8px;">
          <UiButton variant="secondary">취소</UiButton>
          <UiButton variant="danger">삭제</UiButton>
        </div>
      </div>
    `,
  }),
}
