import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiTextarea from './UiTextarea.vue'

describe('UiTextarea', () => {
  // 1. input 시 update:modelValue emit (textarea value)
  it('input 시 update:modelValue emit', async () => {
    const onUpdate = vi.fn()
    const { container } = render(UiTextarea, {
      props: { modelValue: '', 'onUpdate:modelValue': onUpdate },
    })
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    await fireEvent.update(ta, '안녕하세요')
    expect(onUpdate).toHaveBeenCalledWith('안녕하세요')
  })

  // 2. label htmlFor ↔ textarea id 자동 매칭 (useId)
  it('id 미지정 시 label htmlFor가 textarea id와 매칭', () => {
    const { container } = render(UiTextarea, {
      props: { modelValue: '', label: '메시지' },
    })
    const label = container.querySelector('label')!
    const ta = container.querySelector('textarea')!
    expect(label.getAttribute('for')).toBeTruthy()
    expect(label.getAttribute('for')).toBe(ta.id)
  })

  // 3. errorMessage 시 role="alert" + aria-invalid=true + aria-describedby 연결
  it('errorMessage 시 role=alert + aria-invalid + describedby', () => {
    const { container } = render(UiTextarea, {
      props: { modelValue: '', errorMessage: '필수입니다.', label: '제목' },
    })
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    expect(ta.getAttribute('aria-invalid')).toBe('true')
    const alert = screen.getByRole('alert')
    expect(alert.textContent).toContain('필수입니다.')
    // describedby가 alert의 id를 가리킴
    expect(ta.getAttribute('aria-describedby')).toBe(alert.id)
  })

  // 4. desc는 errorMessage가 있으면 미렌더 (errorMessage 우선)
  it('errorMessage가 있으면 desc는 미렌더', () => {
    const { container } = render(UiTextarea, {
      props: {
        modelValue: '',
        errorMessage: 'err',
        desc: 'this should not render',
        label: 'T',
      },
    })
    expect(screen.queryByText('this should not render')).toBeNull()
    // desc id도 describedby에 안 들어감 — alert id만
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    const alert = screen.getByRole('alert')
    expect(ta.getAttribute('aria-describedby')).toBe(alert.id)
  })

  // 5. desc만 있을 때 — aria-describedby가 desc id를 가리킴
  it('desc만 있을 때 aria-describedby로 desc id 연결', () => {
    const { container } = render(UiTextarea, {
      props: { modelValue: '', desc: '설명 텍스트', label: 'T' },
    })
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    const descEl = container.querySelector('.ui-textarea-desc')!
    expect(descEl.textContent).toContain('설명 텍스트')
    expect(ta.getAttribute('aria-describedby')).toBe(descEl.id)
  })

  // 6. required — 라벨 별표 + HTML required + aria-required 자동(native)
  it('required=true: 라벨 * + HTML required attribute', () => {
    const { container } = render(UiTextarea, {
      props: { modelValue: '', label: '제목', required: true },
    })
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    expect(ta.hasAttribute('required')).toBe(true)
    const label = container.querySelector('label')!
    expect(label.textContent).toContain('*')
  })

  // 7. disabled — native + cursor 차단 검증
  it('disabled=true: native disabled 적용', () => {
    const { container } = render(UiTextarea, {
      props: { modelValue: '', disabled: true },
    })
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    expect(ta.disabled).toBe(true)
  })

  // 8. modelValue prop 변경 외부 동기화
  it('외부 modelValue 변경 시 textarea value 동기화', async () => {
    const Wrapper = defineComponent({
      setup() {
        const v = ref('initial')
        return () => h('div', [
          h(UiTextarea, { modelValue: v.value, label: 'T' }),
          h('button', { onClick: () => (v.value = 'updated'), id: 'flip' }, 'flip'),
        ])
      },
    })
    const { container } = render(Wrapper)
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    expect(ta.value).toBe('initial')
    ;(document.getElementById('flip') as HTMLButtonElement).click()
    await nextTick()
    expect(ta.value).toBe('updated')
  })

  // 9. labelHidden — .is-hidden 클래스 + 텍스트 DOM 존재
  it('labelHidden=true: is-hidden 클래스 + 텍스트 DOM 존재(SR 노출)', () => {
    const { container } = render(UiTextarea, {
      props: { modelValue: '', label: '숨김 라벨', labelHidden: true },
    })
    const label = container.querySelector('label')!
    expect(label.classList.contains('is-hidden')).toBe(true)
    expect(screen.getByText('숨김 라벨')).toBeTruthy()
  })

  // 10. counter 렌더 — showCounter + maxLength 둘 다 있을 때만
  it('showCounter + maxLength: counter 렌더 (n / max)', () => {
    const { container } = render(UiTextarea, {
      props: { modelValue: '안녕', maxLength: 10, showCounter: true },
    })
    const counter = container.querySelector('.ui-textarea-counter')!
    expect(counter).not.toBeNull()
    expect(counter.textContent?.replace(/\s/g, '')).toBe('2/10')
  })

  // 11. showCounter=true이지만 maxLength 없으면 counter 미렌더
  it('showCounter만 있고 maxLength 없으면 counter 미렌더', () => {
    const { container } = render(UiTextarea, {
      props: { modelValue: '안녕', showCounter: true },
    })
    expect(container.querySelector('.ui-textarea-counter')).toBeNull()
  })
})
