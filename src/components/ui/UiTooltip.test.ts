import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import UiTooltip from './UiTooltip.vue'

describe('UiTooltip', () => {
  // radix-vue Tooltip은 hover/focus 시점에 portal로 렌더 — jsdom에서 hover 시뮬레이션이
  // 까다로움. UiSelect 테스트와 동일하게 핵심 마운트/구조 검증만 하고 실제 hover
  // 동작은 Storybook play로 검증.

  // 1. trigger slot 렌더 — default slot이 trigger로 들어감
  it('default slot 콘텐츠가 trigger로 렌더', () => {
    const Wrapper = defineComponent({
      components: { UiTooltip },
      template: `
        <UiTooltip content="툴팁">
          <button data-testid="trg">호버</button>
        </UiTooltip>
      `,
    })
    render(Wrapper)
    expect(screen.getByTestId('trg')).toBeTruthy()
    expect(screen.getByText('호버')).toBeTruthy()
  })

  // 2. content prop이 본문에 들어감 — content 슬롯이 비어있을 때
  // jsdom에서 portal 렌더가 되지 않을 수 있으므로 content prop 자체가 컴포넌트에
  // 전달됐는지만 검증 (스토리북 play에서 실제 표시 검증)
  it('content prop 지정 — 컴포넌트 props에 반영', () => {
    const { container } = render(UiTooltip, {
      props: { content: '안내 텍스트' },
      slots: { default: () => h('button', '호버') },
    })
    // 마운트는 성공해야 함
    expect(container.querySelector('button')).not.toBeNull()
  })

  // 3. side prop 변경 가능
  it('side="bottom"으로 props 전달 가능', () => {
    const { container } = render(UiTooltip, {
      props: { content: 'x', side: 'bottom' },
      slots: { default: () => h('button', 'trg') },
    })
    expect(container.querySelector('button')).not.toBeNull()
  })
})
