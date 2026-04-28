import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import UiButton from './UiButton.vue'

describe('UiButton', () => {
  // ===== 동작 계약 =====
  it('클릭 시 click 1회 emit', async () => {
    const onClick = vi.fn()
    render(UiButton, { props: { onClick }, slots: { default: '저장' } })
    await fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it.each([
    { state: 'disabled', props: { disabled: true } },
    { state: 'loading', props: { loading: true } },
  ])('$state 면 click emit 차단', async ({ props }) => {
    const onClick = vi.fn()
    render(UiButton, { props: { ...props, onClick }, slots: { default: '저장' } })
    await fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  // ===== 안전성: form 안에서 의도치 않은 submit 방지 =====
  it('type 기본값은 "button" (form 안에서 submit 방지)', () => {
    render(UiButton, { slots: { default: '저장' } })
    expect(screen.getByRole('button').getAttribute('type')).toBe('button')
  })

  it('type="submit" 명시 시 submit 적용', () => {
    render(UiButton, { props: { type: 'submit' }, slots: { default: '저장' } })
    expect(screen.getByRole('button').getAttribute('type')).toBe('submit')
  })

  // ===== 접근성: iconOnly + aria-label =====
  it('iconOnly + ariaLabel 시 aria-label 속성 적용', () => {
    render(UiButton, {
      props: { iconOnly: true, ariaLabel: '삭제' },
      slots: { 'icon-left': '<i class="icon-trashcan size-16" />' },
    })
    expect(screen.getByRole('button').getAttribute('aria-label')).toBe('삭제')
  })

  // ===== 확장성: as polymorphic =====
  it('as="a" 시 anchor 태그로 렌더 + href 적용', () => {
    const { container } = render(UiButton, {
      props: { as: 'a', href: '/agent/list' },
      slots: { default: '목록 보기' },
    })
    const anchor = container.querySelector('a.ui-button')
    expect(anchor).not.toBeNull()
    expect(anchor?.getAttribute('href')).toBe('/agent/list')
  })

  it('as="a" + disabled 시 aria-disabled + tabindex=-1 적용', () => {
    const { container } = render(UiButton, {
      props: { as: 'a', href: '/x', disabled: true },
      slots: { default: '비활성 링크' },
    })
    const anchor = container.querySelector('a.ui-button')
    expect(anchor?.getAttribute('aria-disabled')).toBe('true')
    expect(anchor?.getAttribute('tabindex')).toBe('-1')
  })
})
