import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { ref, watch } from 'vue'
import UiRate from './UiRate.vue'

const meta = {
  title: 'Components/Form/UiRate',
  component: UiRate,
  tags: ['autodocs'],
  args: { modelValue: 3, max: 5, size: 'md', label: '평점', showValue: true, 'onUpdate:modelValue': fn(), onChange: fn() },
  argTypes: {
    modelValue: { control: 'number', description: '현재 평점. v-model로 갱신하며 외부 소수값도 비율대로 표시합니다.' },
    max: { control: { type: 'number', min: 1, max: 10 }, description: '별 개수. 양의 정수, 기본 5. 유효하지 않으면 5로 표시합니다.' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: '별 크기: 16 / 24 / 32px' },
    allowHalf: { control: 'boolean', description: '0.5점 단위 선택 (기본 false)' },
    allowClear: { control: 'boolean', description: '같은 점수를 다시 클릭하면 0점 (기본 false)' },
    readonly: { control: 'boolean', description: '입력 없이 평점 표시 (기본 false)' },
    disabled: { control: 'boolean', description: '입력과 폼 전송 비활성화 (기본 false)' },
    showValue: { control: 'boolean', description: '현재 평점 / 최대값 표시 (기본 false)' },
    label: { control: 'text', description: '스크린 리더용 이름 (기본 평점)' },
    name: { control: 'text', description: '네이티브 폼 전송용 필드 이름 (선택)' },
  },
  parameters: { docs: { description: { component: `
별점 입력과 리뷰 평균 표시에 사용하는 UiRate입니다.

\`<UiRate v-model="rating" allow-half show-value label="리뷰 평점" />\`

### 동작
- update:modelValue와 change는 선택값이 바뀔 때 같은 숫자를 전달합니다. 호버는 미리보기만 합니다.
- 방향키: 1점/0.5점 증감, Home: 0점, End: 최대값. Tab 한 번으로 진입합니다.
- readonly는 이미지 역할로 점수를 읽어주고, disabled는 변경 및 폼 전송을 막습니다.
- 읽기 전용 평균값은 allowHalf 없이도 4.5처럼 소수로 표시됩니다.
- 0 미만/최대값 초과는 표시 범위로 제한하며 NaN/Infinity는 0으로 표시합니다. 자동 이벤트는 발생하지 않습니다.
- default 슬롯에 평가 개수 등의 보조 정보를 넣을 수 있습니다.

### 디자인 토큰
기본 별 색상은 --color-warning, 포커스는 --color-primary, 빈 별은 --color-text-muted를 사용합니다.
--rate-color / --rate-empty-color로 별 색상을 개별 재정의할 수 있습니다. 별 크기는 sm 16 / md 24 / lg 32px이며 터치 입력 영역은 최소 44px입니다.
` } } },
  render: (args) => ({
    components: { UiRate },
    setup() {
      const rating = ref(args.modelValue)
      watch(() => args.modelValue, next => { rating.value = next })
      return { args, rating }
    },
    template: '<UiRate v-bind="args" v-model="rating" />',
  }),
} satisfies Meta<typeof UiRate>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Half: Story = { args: { modelValue: 3.5, allowHalf: true } }
export const Readonly: Story = { args: { modelValue: 4.5, readonly: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Clearable: Story = {
  args: { allowClear: true },
  play: async ({ canvasElement }) => {
    const slider = within(canvasElement).getByRole('slider')
    await userEvent.click(slider.querySelectorAll('.star')[2])
    await expect(slider).toHaveAttribute('aria-valuenow', '0')
  },
}
export const Keyboard: Story = {
  args: { modelValue: 3, allowHalf: true },
  play: async ({ canvasElement, args }) => {
    const slider = within(canvasElement).getByRole('slider')
    slider.focus()
    await userEvent.keyboard('{ArrowRight}')
    await expect(slider).toHaveAttribute('aria-valuenow', '3.5')
    await expect(args.onChange).toHaveBeenCalledWith(3.5)
    await userEvent.keyboard('{End}')
    await expect(slider).toHaveAttribute('aria-valuenow', '5')
    await userEvent.keyboard('{Home}')
    await expect(slider).toHaveAttribute('aria-valuenow', '0')
  },
}
export const Showcase: Story = {
  render: () => ({
    components: { UiRate },
    setup: () => ({ basic: ref(3), half: ref(3.5), keyboard: ref(4) }),
    template: `
      <section style="padding:32px;max-width:1060px;background:#101215;color:#f1f3f5;border-radius:12px;--color-warning:#ffb300;--color-text-muted:#929baa;--color-text-primary:#f1f3f5;--color-primary:#1684ff">
        <header style="margin-bottom:28px"><small>ispark-ui</small><h2 style="font-size:32px;margin:8px 0">Rate</h2><p>별점 입력과 평가 표시</p></header>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px">
          <article v-for="item in ['기본','반별','읽기 전용','크기','포커스','비활성']" :key="item" style="padding:24px;background:#1b1e23;border:1px solid #393e47;border-radius:8px;min-height:150px">
            <h3 style="margin:0 0 20px;font-size:18px">{{ item }}</h3>
            <UiRate v-if="item === '기본'" v-model="basic" show-value label="기본 평점" />
            <UiRate v-else-if="item === '반별'" v-model="half" allow-half show-value label="반별 평점" />
            <UiRate v-else-if="item === '읽기 전용'" :model-value="4.5" readonly show-value>(128개 평가)</UiRate>
            <div v-else-if="item === '크기'" style="display:grid;gap:12px"><UiRate v-for="size in ['sm','md','lg']" :key="size" :size="size" :model-value="3" readonly>{{ size }}</UiRate></div>
            <div v-else-if="item === '포커스'"><UiRate v-model="keyboard" label="키보드 평점" /><p style="margin-top:12px;font-size:14px">Tab과 방향키로 선택</p></div>
            <UiRate v-else :model-value="3" disabled />
          </article>
        </div>
        <footer style="margin-top:16px;padding:24px;background:#1b1e23;border:1px solid #393e47;border-radius:8px;display:flex;align-items:center;gap:20px;flex-wrap:wrap"><strong>사용자 평점</strong><span style="font-size:32px">4.5</span><UiRate :model-value="4.5" readonly size="lg">(128개 평가)</UiRate></footer>
      </section>`,
  }),
}
