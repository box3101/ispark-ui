import type { Meta, StoryObj } from '@storybook/vue3'
import { within, userEvent, expect, fn } from '@storybook/test'
import UiButton from './UiButton.vue'
import { SIZES, SHAPES } from '@/design-tokens'

const meta = {
  title: 'Components/Form/UiButton',
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
- **\`size\`** \`xs\` | \`sm\` | \`md\` | \`lg\` — 24 / 28 / 32 / 40px (공용 토큰)
- **\`iconSize\`** \`xs\` | \`sm\` | \`md\` | \`lg\` — 미지정 시 size 따라감, 명시 시 override
- **\`shape\`** \`rounded\`(6px) | \`pill\`(완전 라운드) | \`circle\`(iconOnly FAB)
- **\`as\`** \`button\` | \`a\` — 링크로 사용 시 \`as="a"\` + \`href\`
- **\`target\`** \`_blank\` 등 — \`as="a"\` 전용. \`_blank\`이면 \`rel="noopener noreferrer"\` 자동 부여
- **\`type\`** \`button\` | \`submit\` — 기본 \`button\` (form 안 의도치 않은 submit 방지)
- **\`iconOnly\`** + **\`ariaLabel\`** — 아이콘 전용 버튼은 ariaLabel 필수 (스크린리더)
- **\`disabled\`** / **\`loading\`** / **\`fullWidth\`**

> **외부 메서드**: 외부에서 \`buttonRef.value.focus()\` / \`.blur()\` / \`.el\` 호출 가능 (defineExpose).

---

## 디자인 토큰

size/shape는 \`src/styles/tokens/_size.scss\`, \`_shape.scss\` 공용 토큰 참조.
같은 토큰을 UiInput, UiSelect 등도 공유하여 \`<UiInput size="md"> + <UiButton size="md">\` 검색바 자동 정렬.

---

## 테스트 현황

이 컴포넌트는 **자동 테스트 17개**로 동작이 보장됩니다.

**동작 계약** — 클릭 emit, disabled/loading 차단
**안전성** — type 기본값 button (form submit 방지), type="reset" 제거
**접근성** — iconOnly + ariaLabel 시 aria-label 적용
**확장성 (polymorphic)** — as="a" + href, disabled 시 aria-disabled+tabindex
**보안** — as="a" + target="\\_blank" 시 rel="noopener noreferrer" 자동 부여
**shape** — rounded(기본) / pill / circle 클래스 적용
**iconSize** — 미지정 시 size 따라감, override 가능

> 테스트 코드: \`src/components/ui/UiButton.test.ts\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'primary-dark',
        'primary-line',
        'secondary',
        'line-secondary',
        'outline',
        'ghost',
        'dark',
        'danger',
        'success',
        'warning',
        'info',
      ],
      description:
        'variant 12종 — primary(강조) / primary-dark / primary-line / secondary / line-secondary / outline / ghost / dark / danger / success / warning / info',
    },
    size: {
      control: 'inline-radio',
      options: SIZES,
      description: 'xs(24px) / sm(28px) / md(32px·기본) / lg(40px) — 공용 토큰',
    },
    shape: {
      control: 'inline-radio',
      options: SHAPES,
      description: 'rounded(기본 6px) / pill(완전 라운드) / circle(iconOnly FAB)',
    },
    as: {
      control: 'inline-radio',
      options: ['button', 'a'],
      description: '렌더링 태그 — button(기본) / a(링크)',
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit'],
      description: 'button 태그일 때만 적용. 기본 "button" (form 안 의도치 않은 submit 방지)',
    },
    target: {
      control: 'inline-radio',
      options: ['(없음)', '_self', '_blank'],
      // Storybook mapping — '(없음)' 라벨을 보여주지만 실제 prop 값은 undefined
      mapping: { '(없음)': undefined },
      description: 'as="a"일 때만 적용. _blank이면 rel="noopener noreferrer" 자동',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    ariaLabel: { control: 'text', description: 'iconOnly=true 시 필수 (접근성)' },
    href: { control: 'text', description: 'as="a"일 때 링크 경로' },
  },
} satisfies Meta<typeof UiButton>

// 데모용 아이콘 옵션 (실제 사용 시는 slot으로 직접 전달)
const ICON_OPTIONS = ['(없음)', 'plus', 'edit', 'trashcan', 'close', 'search', 'check', 'arrow-right', 'download', 'chevron-down', 'refresh']

export default meta

type Story = StoryObj<typeof meta>

// ===== 1. Playground — 모든 props를 Controls로 조작 + 클릭 자동 테스트 =====
// iconLeft/iconRight/label은 데모 편의용 (실제 API는 slot)
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
      description: '🧪 데모 전용 (실제 API 아님). 실제는 #icon-right slot 사용',
    },
    label: {
      control: 'text',
      description: '🧪 데모 전용 버튼 텍스트',
    },
    iconSize: {
      control: 'inline-radio',
      options: ['(자동)', ...SIZES],
      // '(자동)' 라벨 → 실제 prop은 undefined (size 자동 따라감)
      mapping: { '(자동)': undefined },
      description: '아이콘 사이즈 — (자동) 시 size 따라감, 명시 시 override',
    },
  } as never,
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'rounded',
    iconLeft: '(없음)',
    iconRight: '(없음)',
    label: '버튼',
    iconSize: '(자동)',
  } as never,
  parameters: {
    docs: {
      source: {
        language: 'html',
        // Controls 값을 그대로 반영한 실제 사용 코드 동적 생성
        // - 실제 props는 기본값과 다를 때만 출력 (노이즈 제거)
        // - iconLeft / iconRight / label은 데모 전용 control → slot 패턴으로 변환
        // - target="_blank" 시 rel은 런타임 처리이므로 코드 표시 안 함
        transform: (_src: string, storyContext: { args: Record<string, unknown> }) => {
          const a = storyContext.args || {}

          const attrs: string[] = []
          if (a.variant && a.variant !== 'primary') attrs.push(`variant="${a.variant}"`)
          if (a.size && a.size !== 'md') attrs.push(`size="${a.size}"`)
          if (a.shape && a.shape !== 'rounded') attrs.push(`shape="${a.shape}"`)
          if (a.iconSize && a.iconSize !== '(자동)') attrs.push(`icon-size="${a.iconSize}"`)
          if (a.as && a.as !== 'button') attrs.push(`as="${a.as}"`)
          // a 태그에는 type 속성 의미 없음 → 생략
          if (a.as !== 'a' && a.type && a.type !== 'button') attrs.push(`type="${a.type}"`)
          if (a.href) attrs.push(`href="${a.href}"`)
          if (a.as === 'a' && a.target) attrs.push(`target="${a.target}"`)
          if (a.disabled) attrs.push('disabled')
          if (a.loading) attrs.push('loading')
          if (a.fullWidth) attrs.push('full-width')
          if (a.iconOnly) attrs.push('icon-only')
          if (a.ariaLabel) attrs.push(`aria-label="${a.ariaLabel}"`)

          const head = attrs.length ? `<UiButton ${attrs.join(' ')}` : '<UiButton'

          const hasL = a.iconLeft && a.iconLeft !== '(없음)'
          const hasR = a.iconRight && a.iconRight !== '(없음)'
          // iconOnly일 땐 텍스트 출력 안 함 (접근성: ariaLabel이 대체)
          const labelText = !a.iconOnly ? (a.label || '버튼') : ''
          const children: string[] = []
          if (hasL) {
            children.push(
              `  <template #icon-left>\n    <i class="icon-${a.iconLeft}" />\n  </template>`,
            )
          }
          if (labelText) children.push(`  ${labelText}`)
          if (hasR) {
            children.push(
              `  <template #icon-right>\n    <i class="icon-${a.iconRight}" />\n  </template>`,
            )
          }

          if (children.length === 0) return `${head} />`
          return `${head}>\n${children.join('\n')}\n</UiButton>`
        },
      },
    },
  },
  render: (args: Record<string, unknown>) => ({
    components: { UiButton },
    setup: () => ({ args }),
    template: `
      <UiButton v-bind="args">
        <template v-if="args.iconLeft && args.iconLeft !== '(없음)'" #icon-left>
          <i :class="['icon-' + args.iconLeft]" />
        </template>
        {{ !args.iconOnly ? (args.label || '버튼') : '' }}
        <template v-if="args.iconRight && args.iconRight !== '(없음)'" #icon-right>
          <i :class="['icon-' + args.iconRight]" />
        </template>
      </UiButton>
    `,
  }),
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

// ===== 3. AllSizes — 4단계 사이즈 비교 =====
export const AllSizes: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <UiButton size="xs">XS (24px)</UiButton>
        <UiButton size="sm">SM (28px)</UiButton>
        <UiButton size="md">MD (32px)</UiButton>
        <UiButton size="lg">LG (40px)</UiButton>
      </div>
    `,
  }),
}

// ===== 4. AllShapes — rounded / pill / circle =====
export const AllShapes: Story = {
  name: '모서리 모양 (shape)',
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">rounded</span>
          <UiButton variant="primary" shape="rounded">기본 6px</UiButton>
          <UiButton variant="secondary" shape="rounded">취소</UiButton>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">pill</span>
          <UiButton variant="primary" shape="pill">완전 라운드</UiButton>
          <UiButton variant="secondary" shape="pill">필터</UiButton>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">circle</span>
          <UiButton variant="primary" shape="circle" iconOnly aria-label="추가">
            <template #icon-left><i class="icon-plus icon-white" /></template>
          </UiButton>
          <UiButton variant="ghost" shape="circle" iconOnly aria-label="닫기">
            <template #icon-left><i class="icon-close" /></template>
          </UiButton>
          <UiButton variant="danger" shape="circle" iconOnly aria-label="삭제">
            <template #icon-left><i class="icon-trashcan icon-white" /></template>
          </UiButton>
        </div>
      </div>
    `,
  }),
}

// ===== 5. WithIcon — icon-left / icon-right / iconOnly 한 화면 =====
export const WithIcon: Story = {
  name: '아이콘 사용',
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">icon-left</span>
          <UiButton variant="primary">
            <template #icon-left><i class="icon-plus" /></template>
            Agent 추가
          </UiButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">icon-right</span>
          <UiButton variant="secondary">
            다음
            <template #icon-right><i class="icon-arrow-right" /></template>
          </UiButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">iconOnly</span>
          <UiButton variant="ghost" iconOnly aria-label="편집">
            <template #icon-left><i class="icon-edit" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly aria-label="삭제">
            <template #icon-left><i class="icon-trashcan" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly aria-label="다운로드">
            <template #icon-left><i class="icon-download" /></template>
          </UiButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">iconSize</span>
          <UiButton variant="primary" size="md" icon-size="xs">
            <template #icon-left><i class="icon-plus" /></template>
            작은 아이콘
          </UiButton>
          <UiButton variant="primary" size="md" icon-size="lg">
            <template #icon-left><i class="icon-plus" /></template>
            큰 아이콘
          </UiButton>
        </div>
      </div>
    `,
  }),
}

// ===== 6. AsLink — polymorphic (button → a 태그) + target/rel =====
export const AsLink: Story = {
  name: '확장: 링크로 사용',
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <UiButton as="a" href="/agent/list" variant="primary">
          <template #icon-left><i class="icon-arrow-right" /></template>
          내부 링크 (target 없음)
        </UiButton>
        <UiButton as="a" href="https://anthropic.com" target="_blank" variant="secondary">
          외부 링크 (_blank — rel 자동 적용)
          <template #icon-right><i class="icon-arrow-right" /></template>
        </UiButton>
        <UiButton as="a" href="/x" variant="secondary" disabled>
          비활성 링크 (aria-disabled + tabindex=-1)
        </UiButton>
        <p style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">
          target="_blank"인 경우 자동으로 <code>rel="noopener noreferrer"</code> 부여 (브라우저 inspect로 확인)
        </p>
      </div>
    `,
  }),
}

// ===== 7. AccessibilityIconOnly — iconOnly + ariaLabel =====
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
            <template #icon-left><i class="icon-edit" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly aria-label="삭제">
            <template #icon-left><i class="icon-trashcan" /></template>
          </UiButton>
          <UiButton variant="danger" iconOnly aria-label="모두 삭제">
            <template #icon-left><i class="icon-trashcan icon-white" /></template>
          </UiButton>
        </div>
      </div>
    `,
  }),
}

// ===== 8. SubmitInForm — type 동작 데모 (form submit 방어) =====
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

// ===== 9. ModalFooter — 실전 사용 예 =====
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
