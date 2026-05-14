import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiCheckbox from './UiCheckbox.vue'

describe('UiCheckbox', () => {
  // 1. 클릭(change) 시 update:modelValue + change emit
  it('change 시 update:modelValue + change emit', async () => {
    const onUpdate = vi.fn()
    const onChange = vi.fn()
    const { container } = render(UiCheckbox, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': onUpdate,
        onChange,
      },
    })
    const input = container.querySelector('input[type="checkbox"]')!
    await fireEvent.click(input)
    expect(onUpdate).toHaveBeenCalledWith(true)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  // 2. disabled — native disabled 부여 + 클릭 시 브라우저가 change 차단
  it('disabled=true: native disabled 적용', () => {
    const { container } = render(UiCheckbox, {
      props: { modelValue: false, disabled: true },
    })
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  // 3. label htmlFor와 input id 매칭 (useId 자동 생성)
  it('label htmlFor가 input id와 자동 매칭', () => {
    const { container } = render(UiCheckbox, {
      props: { modelValue: false, label: '동의' },
    })
    const label = container.querySelector('label')!
    const input = container.querySelector('input')!
    expect(label.getAttribute('for')).toBeTruthy()
    expect(label.getAttribute('for')).toBe(input.id)
  })

  // 4. modelValue prop 변경 → checked + is-checked 동기화
  it('modelValue 변경 시 checked + is-checked 클래스 동기화', async () => {
    const Wrapper = defineComponent({
      setup() {
        const v = ref(false)
        return () => h('div', [
          h(UiCheckbox, { modelValue: v.value, label: 'T' }),
          h('button', { onClick: () => (v.value = true), id: 'on' }, 'on'),
        ])
      },
    })
    const { container } = render(Wrapper)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.checked).toBe(false)
    expect(container.querySelector('.ui-checkbox')!.classList.contains('is-checked')).toBe(false)

    ;(document.getElementById('on') as HTMLButtonElement).click()
    await nextTick()
    expect(input.checked).toBe(true)
    expect(container.querySelector('.ui-checkbox')!.classList.contains('is-checked')).toBe(true)
  })

  // 5. indeterminate DOM property — HTML attribute 아닌 property라 직접 세팅 검증
  it('indeterminate prop이 input.indeterminate DOM property에 반영', async () => {
    const { container, rerender } = render(UiCheckbox, {
      props: { modelValue: false, indeterminate: true },
    })
    const input = container.querySelector('input') as HTMLInputElement
    // 마운트 직후 onMounted 훅으로 설정
    expect(input.indeterminate).toBe(true)
    // is-indeterminate 클래스(시각 dash)도 적용
    expect(container.querySelector('.ui-checkbox')!.classList.contains('is-indeterminate')).toBe(true)

    // false로 변경 시 watch로 따라감
    await rerender({ modelValue: false, indeterminate: false })
    expect(input.indeterminate).toBe(false)
  })

  // 6. indeterminate + modelValue=true: 시각은 체크가 우선 (is-indeterminate 클래스 안 붙음)
  it('modelValue=true + indeterminate=true: 체크 시각 우선', () => {
    const { container } = render(UiCheckbox, {
      props: { modelValue: true, indeterminate: true },
    })
    const cb = container.querySelector('.ui-checkbox')!
    expect(cb.classList.contains('is-checked')).toBe(true)
    expect(cb.classList.contains('is-indeterminate')).toBe(false)
  })

  // 7. labelHidden=true: .is-hidden 클래스
  it('labelHidden=true 시 label에 is-hidden 클래스', () => {
    const { container } = render(UiCheckbox, {
      props: { modelValue: false, label: '숨김', labelHidden: true },
    })
    const label = container.querySelector('.ui-checkbox-label')!
    expect(label.classList.contains('is-hidden')).toBe(true)
    // 텍스트는 DOM에 존재 (SR 노출)
    expect(screen.getByText('숨김')).toBeTruthy()
  })
})
