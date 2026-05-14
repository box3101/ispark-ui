import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiRadio from './UiRadio.vue'

describe('UiRadio', () => {
  // 1. modelValue === value 시 checked
  it('modelValue === value 시 checked + is-checked 클래스', () => {
    const { container } = render(UiRadio, {
      props: { modelValue: 'pro', value: 'pro', label: 'Pro' },
    })
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.checked).toBe(true)
    expect(container.querySelector('.ui-radio')!.classList.contains('is-checked')).toBe(true)
  })

  // 2. modelValue !== value 시 unchecked
  it('modelValue !== value 시 unchecked', () => {
    const { container } = render(UiRadio, {
      props: { modelValue: 'free', value: 'pro', label: 'Pro' },
    })
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.checked).toBe(false)
    expect(container.querySelector('.ui-radio')!.classList.contains('is-checked')).toBe(false)
  })

  // 3. 클릭(change) 시 update:modelValue + change emit (각자 value)
  it('change 시 update:modelValue + change emit (해당 라디오의 value)', async () => {
    const onUpdate = vi.fn()
    const onChange = vi.fn()
    const { container } = render(UiRadio, {
      props: {
        modelValue: '',
        value: 'team',
        'onUpdate:modelValue': onUpdate,
        onChange,
      },
    })
    const input = container.querySelector('input')!
    await fireEvent.click(input)
    expect(onUpdate).toHaveBeenCalledWith('team')
    expect(onChange).toHaveBeenCalledWith('team')
  })

  // 4. disabled — native disabled
  it('disabled=true: native disabled 적용', () => {
    const { container } = render(UiRadio, {
      props: { modelValue: '', value: 'x', disabled: true },
    })
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  // 5. label htmlFor 매칭 (useId 자동)
  it('label htmlFor가 input id와 자동 매칭', () => {
    const { container } = render(UiRadio, {
      props: { modelValue: '', value: 'x', label: '옵션' },
    })
    const label = container.querySelector('label')!
    const input = container.querySelector('input')!
    expect(label.getAttribute('for')).toBe(input.id)
  })

  // 6. 같은 name 그룹 — 2개 라디오가 동일 name 공유 시 native single-select 동작
  it('동일 name 그룹: 한 라디오 선택 시 다른 라디오는 자동 unchecked (v-model 단일성)', async () => {
    const Wrapper = defineComponent({
      setup() {
        const v = ref('a')
        return () => h('div', [
          h(UiRadio, { modelValue: v.value, value: 'a', name: 'g', label: 'A', 'onUpdate:modelValue': (x: any) => (v.value = x) }),
          h(UiRadio, { modelValue: v.value, value: 'b', name: 'g', label: 'B', 'onUpdate:modelValue': (x: any) => (v.value = x) }),
        ])
      },
    })
    const { container } = render(Wrapper)
    const [inputA, inputB] = container.querySelectorAll('input')
    expect((inputA as HTMLInputElement).checked).toBe(true)
    expect((inputB as HTMLInputElement).checked).toBe(false)

    // B 클릭 → v-model 변경 → A unchecked, B checked
    await fireEvent.click(inputB)
    await nextTick()
    expect((inputA as HTMLInputElement).checked).toBe(false)
    expect((inputB as HTMLInputElement).checked).toBe(true)
  })

  // 7. name prop이 같은 그룹의 input.name으로 적용
  it('name prop이 input[name]에 반영', () => {
    const { container } = render(UiRadio, {
      props: { modelValue: '', value: 'x', name: 'plan' },
    })
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.name).toBe('plan')
  })

  // 8. labelHidden=true: .is-hidden 클래스 (DOM에는 존재 — SR 노출)
  it('labelHidden=true: is-hidden 클래스 적용 + 텍스트 DOM 존재', () => {
    const { container } = render(UiRadio, {
      props: { modelValue: '', value: 'x', label: '숨김', labelHidden: true },
    })
    const label = container.querySelector('.ui-radio-label')!
    expect(label.classList.contains('is-hidden')).toBe(true)
    expect(screen.getByText('숨김')).toBeTruthy()
  })
})
