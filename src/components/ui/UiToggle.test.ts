import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiToggle from './UiToggle.vue'

describe('UiToggle', () => {
  // 1. 클릭 시 update:modelValue + change emit (둘 다 같은 payload)
  it('클릭 시 update:modelValue + change emit', async () => {
    const onUpdate = vi.fn()
    const onChange = vi.fn()
    const { container } = render(UiToggle, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': onUpdate,
        onChange,
      },
    })
    const btn = container.querySelector('[role="switch"]')!
    await fireEvent.click(btn)
    expect(onUpdate).toHaveBeenCalledWith(true)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  // 2. disabled 시 클릭 무시 (emit 안 함)
  it('disabled=true 시 클릭해도 emit 안 됨', async () => {
    const onUpdate = vi.fn()
    const { container } = render(UiToggle, {
      props: {
        modelValue: false,
        disabled: true,
        'onUpdate:modelValue': onUpdate,
      },
    })
    const btn = container.querySelector('[role="switch"]')!
    expect(btn.hasAttribute('disabled')).toBe(true)
    expect(btn.getAttribute('aria-disabled')).toBe('true')
    await fireEvent.click(btn)
    expect(onUpdate).not.toHaveBeenCalled()
  })

  // 3. label htmlFor와 button id 매칭 (id 미지정 → useId 자동 생성)
  it('label htmlFor가 button id와 자동 매칭 (id 미지정)', () => {
    const { container } = render(UiToggle, {
      props: { modelValue: false, label: '알림' },
    })
    const label = screen.getByText('알림')
    const btn = container.querySelector('[role="switch"]')!
    expect(label.getAttribute('for')).toBeTruthy()
    expect(label.getAttribute('for')).toBe(btn.getAttribute('id'))
  })

  // 4. modelValue prop 변경 → aria-checked 동기화 (단방향: prop → display)
  it('modelValue 변경 시 aria-checked + is-active 클래스 동기화', async () => {
    const Wrapper = defineComponent({
      setup() {
        const v = ref(false)
        return () => h('div', [
          h(UiToggle, { modelValue: v.value, label: 'T' }),
          h('button', { onClick: () => (v.value = !v.value), id: 'flip' }, 'flip'),
        ])
      },
    })
    const { container } = render(Wrapper)
    const sw = container.querySelector('[role="switch"]')!
    expect(sw.getAttribute('aria-checked')).toBe('false')
    expect(sw.classList.contains('is-active')).toBe(false)

    // 외부에서 modelValue 뒤집기
    ;(document.getElementById('flip') as HTMLButtonElement).click()
    await nextTick()
    expect(sw.getAttribute('aria-checked')).toBe('true')
    expect(sw.classList.contains('is-active')).toBe(true)
  })

  // 5. labelHidden=true 시 .is-hidden 클래스 적용 (시각만 숨김 — DOM은 존재)
  it('labelHidden=true 시 .is-hidden 클래스 적용 + label DOM은 존재', () => {
    const { container } = render(UiToggle, {
      props: { modelValue: false, label: '숨김 라벨', labelHidden: true },
    })
    const label = screen.getByText('숨김 라벨')
    expect(label.classList.contains('is-hidden')).toBe(true)
  })
})
