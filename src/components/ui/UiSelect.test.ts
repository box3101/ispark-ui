import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiSelect from './UiSelect.vue'

const opts = [
  { label: '옵션 A', value: 'a' },
  { label: '옵션 B', value: 'b' },
]

describe('UiSelect', () => {
  // 1. modelValue prop 변경 → trigger 표시 동기화 (단방향: prop → display)
  // 양방향 round-trip(emit → display)은 it.skip #4 / Storybook Default play로 검증
  it('외부 modelValue prop 변경 시 트리거 텍스트 동기화', async () => {
    const Wrapper = defineComponent({
      setup() {
        const v = ref<string>('a')
        return () => h('div', [
          h(UiSelect, { modelValue: v.value, options: opts }),
          h('button', { onClick: () => (v.value = 'b'), id: 'switch' }, 'switch'),
        ])
      },
    })
    render(Wrapper)
    await nextTick()
    expect(screen.getByRole('combobox').textContent).toContain('옵션 A')
    await screen.getByText('switch').click()
    // Vue의 nextTick 대기
    await new Promise((r) => setTimeout(r, 0))
    expect(screen.getByRole('combobox').textContent).toContain('옵션 B')
  })

  // 2. 빈 문자열 value — EMPTY_VALUE_TOKEN normalize 경로 (display side)
  // denormalize(emit) 경로는 jsdom Portal 한계로 it.skip #4 / Storybook play 검증
  it('빈 문자열 value 옵션도 정상 선택/표시', async () => {
    render(UiSelect, {
      props: {
        modelValue: '',
        options: [
          { label: '미선택', value: '' },
          { label: '선택됨', value: 'x' },
        ],
      },
    })
    await nextTick()
    // 빈 문자열도 정상 표시 (placeholder 아님)
    expect(screen.getByRole('combobox').textContent).toContain('미선택')
  })

  // 3. id 미지정 시 useId 자동 + label과 매칭
  it('id prop 없어도 label htmlFor가 trigger id와 매칭', () => {
    render(UiSelect, {
      props: { options: opts, label: '테스트' },
    })
    const label = screen.getByText('테스트')
    const trigger = screen.getByRole('combobox')
    expect(label.getAttribute('for')).toBeTruthy()
    expect(label.getAttribute('for')).toBe(trigger.getAttribute('id'))
  })

  // 4. update:modelValue와 change 둘 다 동일한 값으로 emit
  // jsdom에서 radix-vue Portal 트리거 시점 한계 — Storybook play 함수가 실 검증
  it.skip('옵션 선택 시 update:modelValue와 change 동시 emit', async () => {
    const onUpdate = vi.fn()
    const onChange = vi.fn()
    const { container } = render(UiSelect, {
      props: {
        options: opts,
        'onUpdate:modelValue': onUpdate,
        onChange,
      },
    })
    const trigger = container.querySelector('[role="combobox"]') as HTMLElement
    trigger.click()
    await new Promise((r) => setTimeout(r, 0))
    const itemA = document.body.querySelector('[role="option"]') as HTMLElement
    if (itemA) {
      itemA.click()
      await new Promise((r) => setTimeout(r, 0))
      expect(onUpdate).toHaveBeenCalled()
      expect(onChange).toHaveBeenCalled()
      expect(onUpdate.mock.calls[0]?.[0]).toEqual(onChange.mock.calls[0]?.[0])
    }
  })

  // 5. options: [] 시 dev warn 호출
  it('options 배열이 비어 있으면 dev warn 호출', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(UiSelect, { props: { options: [] } })
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('options 배열이 비어'))
    warn.mockRestore()
  })
})
