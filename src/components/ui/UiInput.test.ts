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
})
