import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import UiInput from './UiInput.vue'

describe('UiInput', () => {
  it('input 시 update:modelValue emit', async () => {
    const onUpdate = vi.fn()
    render(UiInput, { props: { 'onUpdate:modelValue': onUpdate } })
    const input = screen.getByRole('textbox') as HTMLInputElement
    await fireEvent.update(input, '안녕')
    expect(onUpdate).toHaveBeenCalledWith('안녕')
  })

  it('Enter 키 시 enter 이벤트 emit', async () => {
    const onEnter = vi.fn()
    render(UiInput, {
      props: { modelValue: 'test value', onEnter },
    })
    const input = screen.getByRole('textbox')
    await fireEvent.keyDown(input, { key: 'Enter' })
    expect(onEnter).toHaveBeenCalledWith('test value')
  })

  // ===== 정책: numberOnly — 한글 IME 환경 대비 =====
  it('numberOnly=true 면 숫자 외 입력 제거 후 emit', async () => {
    const onUpdate = vi.fn()
    render(UiInput, { props: { numberOnly: true, 'onUpdate:modelValue': onUpdate } })
    const input = screen.getByRole('textbox') as HTMLInputElement
    await fireEvent.update(input, 'abc123def')
    expect(onUpdate).toHaveBeenCalledWith('123')
  })

  it('numberOnly + allowDecimal 면 소수점 허용', async () => {
    const onUpdate = vi.fn()
    render(UiInput, {
      props: { numberOnly: true, allowDecimal: true, 'onUpdate:modelValue': onUpdate },
    })
    const input = screen.getByRole('textbox') as HTMLInputElement
    await fireEvent.update(input, '1.5abc')
    expect(onUpdate).toHaveBeenCalledWith('1.5')
  })

  it('decimals=2 면 입력 즉시 소수점 2자리로 잘라냄', async () => {
    const onUpdate = vi.fn()
    render(UiInput, {
      props: { numberOnly: true, allowDecimal: true, decimals: 2, 'onUpdate:modelValue': onUpdate },
    })
    const input = screen.getByRole('textbox') as HTMLInputElement
    await fireEvent.update(input, '0.12345')
    expect(onUpdate).toHaveBeenCalledWith('0.12')
  })

  it('소수점 여러 개 입력 시 첫 번째만 유지', async () => {
    const onUpdate = vi.fn()
    render(UiInput, {
      props: { numberOnly: true, allowDecimal: true, 'onUpdate:modelValue': onUpdate },
    })
    const input = screen.getByRole('textbox') as HTMLInputElement
    await fireEvent.update(input, '1.2.3.4')
    expect(onUpdate).toHaveBeenCalledWith('1.234')
  })

  // ===== 안전성: type=search 일 때 native type은 text =====
  it('type="search" 시 native input type은 text (검색 아이콘은 별도 렌더)', () => {
    const { container } = render(UiInput, { props: { type: 'search' } })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    expect(input.type).toBe('text')
    expect(container.querySelector('.ui-input-icon.is-search')).not.toBeNull()
  })

  it('type="password" 시 native input type 적용', () => {
    const { container } = render(UiInput, { props: { type: 'password' } })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    expect(input.type).toBe('password')
  })

  // ===== 상태 =====
  it('disabled 시 native disabled 적용 + 클래스 부여', () => {
    const { container } = render(UiInput, { props: { disabled: true } })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    expect(input.disabled).toBe(true)
    expect(container.querySelector('.is-disabled')).not.toBeNull()
  })

  // ===== 부가: desc prop =====
  it('desc prop 시 설명 텍스트 렌더', () => {
    const { container } = render(UiInput, { props: { desc: '아이디는 영문/숫자 4~20자' } })
    expect(container.querySelector('.ui-input-desc')?.textContent).toContain('아이디는 영문/숫자 4~20자')
  })

  // ===== shape =====
  it('shape 기본값은 "rounded" (shape-rounded 클래스)', () => {
    const { container } = render(UiInput)
    expect(container.querySelector('.ui-input-wrap.shape-rounded')).not.toBeNull()
  })

  it('shape="pill" 시 shape-pill 클래스 적용', () => {
    const { container } = render(UiInput, { props: { shape: 'pill' } })
    expect(container.querySelector('.ui-input-wrap.shape-pill')).not.toBeNull()
  })

  // ===== size 토큰 (auth 포함 4단계) =====
  it('size 기본값은 "md" (size-md 클래스)', () => {
    const { container } = render(UiInput)
    expect(container.querySelector('.ui-input-wrap.size-md')).not.toBeNull()
  })

  it('size="auth" 시 size-auth 클래스 적용 (로그인 폼)', () => {
    const { container } = render(UiInput, { props: { size: 'auth' } })
    expect(container.querySelector('.ui-input-wrap.size-auth')).not.toBeNull()
  })

  // ===== iconSize override =====
  it('iconSize 미지정 시 icon-size-* 클래스 부재 (size 따라감)', () => {
    const { container } = render(UiInput, { props: { size: 'md' } })
    const wrap = container.querySelector('.ui-input-wrap') as HTMLElement
    expect(wrap.className).not.toMatch(/\bicon-size-/)
  })

  it('iconSize="lg" 명시 시 icon-size-lg 클래스 부여', () => {
    const { container } = render(UiInput, { props: { size: 'md', iconSize: 'lg' } })
    const wrap = container.querySelector('.ui-input-wrap') as HTMLElement
    expect(wrap.classList.contains('size-md')).toBe(true)
    expect(wrap.classList.contains('icon-size-lg')).toBe(true)
  })

  // ===== Codex P1.1 회귀 방지: IME composition 안전성 =====
  it('composition 중에는 input 이벤트로 emit 안 함 (한글 IME 안전)', async () => {
    const onUpdate = vi.fn()
    const { container } = render(UiInput, {
      props: { numberOnly: true, 'onUpdate:modelValue': onUpdate },
    })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    await fireEvent.compositionStart(input)
    // composition 중 — input 이벤트 발생해도 emit 안 됨
    input.value = '한'
    await fireEvent.input(input)
    expect(onUpdate).not.toHaveBeenCalled()
  })

  it('compositionend 시 한 번 sync — numberOnly면 한글이 모두 제거됨', async () => {
    const onUpdate = vi.fn()
    const { container } = render(UiInput, {
      props: { numberOnly: true, 'onUpdate:modelValue': onUpdate },
    })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    await fireEvent.compositionStart(input)
    input.value = '한글123'
    await fireEvent.compositionEnd(input)
    // numberOnly로 한글 제거 → '123'
    expect(onUpdate).toHaveBeenCalledWith('123')
  })

  // ===== Codex P1.2 회귀 방지: blur step 반올림이 max를 넘지 않음 =====
  it('blur 시 step 반올림 후에도 max를 초과하지 않음', async () => {
    const onUpdate = vi.fn()
    const { container } = render(UiInput, {
      props: {
        numberOnly: true,
        allowDecimal: true,
        min: 0,
        max: 1,
        step: 0.6,
        modelValue: '1',
        'onUpdate:modelValue': onUpdate,
      },
    })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    input.value = '1'
    await fireEvent.blur(input)
    // round(1/0.6)*0.6 = 1.2 → 재-clamp → 1
    // (구현 버그였다면 1.2 emit; 수정 후 1 또는 emit 안 함)
    const calls = onUpdate.mock.calls
    if (calls.length > 0) {
      const last = parseFloat(String(calls[calls.length - 1][0]))
      expect(last).toBeLessThanOrEqual(1)
    }
  })

  // ===== Codex P2.5: 검색 버튼 키보드 접근 + disabled 차단 =====
  it('type="search" 시 검색 아이콘은 <button> 으로 렌더 (키보드 접근)', () => {
    const { container } = render(UiInput, { props: { type: 'search' } })
    const btn = container.querySelector('.ui-input-icon.is-search')
    expect(btn?.tagName).toBe('BUTTON')
    expect(btn?.getAttribute('type')).toBe('button')
  })

  it('disabled + type="search" 시 검색 버튼 disabled + click emit 안 됨', async () => {
    const onSearch = vi.fn()
    const { container } = render(UiInput, {
      props: { type: 'search', disabled: true, onSearch },
    })
    const btn = container.querySelector('.ui-input-icon.is-search') as HTMLButtonElement
    expect(btn.disabled).toBe(true)
    await fireEvent.click(btn)
    expect(onSearch).not.toHaveBeenCalled()
  })

  // ===== Codex P2.4: aria-describedby로 desc 연결 =====
  it('desc 있을 때 input.aria-describedby가 desc <p>의 id와 연결', () => {
    const { container } = render(UiInput, { props: { desc: '필수 입력', id: 'my-input' } })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    const desc = container.querySelector('.ui-input-desc') as HTMLElement
    expect(desc.id).toBe('my-input-desc')
    expect(input.getAttribute('aria-describedby')).toBe('my-input-desc')
  })

  it('desc 없으면 aria-describedby 부재', () => {
    const { container } = render(UiInput)
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    expect(input.hasAttribute('aria-describedby')).toBe(false)
  })

  // ===== Codex P2.7: number 타입 prop이면 number로 emit =====
  it('modelValue가 number일 때 update:modelValue도 number로 emit', async () => {
    const onUpdate = vi.fn()
    const { container } = render(UiInput, {
      props: { modelValue: 0, numberOnly: true, 'onUpdate:modelValue': onUpdate },
    })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    await fireEvent.update(input, '42')
    expect(onUpdate).toHaveBeenCalledWith(42)
    expect(typeof onUpdate.mock.calls[0][0]).toBe('number')
  })

  it('modelValue가 string일 때는 string으로 emit (기존 호환)', async () => {
    const onUpdate = vi.fn()
    const { container } = render(UiInput, {
      props: { modelValue: '', numberOnly: true, 'onUpdate:modelValue': onUpdate },
    })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    await fireEvent.update(input, '42')
    expect(onUpdate).toHaveBeenCalledWith('42')
    expect(typeof onUpdate.mock.calls[0][0]).toBe('string')
  })

  // ===== Codex P2.3: native input attrs forward =====
  it('aria-label / required 같은 native attrs는 input으로 forward됨 (wrapper 누수 X)', () => {
    const { container } = render(UiInput, {
      props: { required: true },
      attrs: { 'aria-label': '검색어', 'aria-invalid': 'true' },
    })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    expect(input.getAttribute('aria-label')).toBe('검색어')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.required).toBe(true)
    // 외부 div가 aria-label을 가지지 않아야 함 (API 누수 방지)
    const outer = container.querySelector('.ui-input-outer') as HTMLElement
    expect(outer.hasAttribute('aria-label')).toBe(false)
  })

  // ===== Codex P2.6: inputmode가 allow* 조합에 맞게 =====
  it('numberOnly + allowDecimal 시 inputmode="decimal"', () => {
    const { container } = render(UiInput, {
      props: { numberOnly: true, allowDecimal: true },
    })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    expect(input.getAttribute('inputmode')).toBe('decimal')
  })

  it('numberOnly only면 inputmode="numeric" (정수만)', () => {
    const { container } = render(UiInput, {
      props: { numberOnly: true },
    })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    expect(input.getAttribute('inputmode')).toBe('numeric')
  })

  // ===== Codex P2.12: type=search → role=searchbox =====
  it('type="search" 시 input의 role="searchbox" (semantic 보존)', () => {
    const { container } = render(UiInput, { props: { type: 'search' } })
    const input = container.querySelector('input.ui-input') as HTMLInputElement
    expect(input.getAttribute('role')).toBe('searchbox')
  })
})
