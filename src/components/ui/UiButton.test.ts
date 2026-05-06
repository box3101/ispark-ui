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

  // ===== 보안: as="a" + target="_blank" → rel 자동 부여 =====
  it('as="a" + target="_blank" 시 rel="noopener noreferrer" 자동', () => {
    const { container } = render(UiButton, {
      props: { as: 'a', href: 'https://example.com', target: '_blank' },
      slots: { default: '외부 링크' },
    })
    const anchor = container.querySelector('a.ui-button')
    expect(anchor?.getAttribute('target')).toBe('_blank')
    expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('as="a" + target 없음 시 rel 속성 없음', () => {
    const { container } = render(UiButton, {
      props: { as: 'a', href: '/x' },
      slots: { default: '내부 링크' },
    })
    const anchor = container.querySelector('a.ui-button')
    expect(anchor?.hasAttribute('rel')).toBe(false)
  })

  it('as="a" + target="_self" 시 rel 속성 없음 (_blank만 자동 부여)', () => {
    const { container } = render(UiButton, {
      props: { as: 'a', href: '/x', target: '_self' },
      slots: { default: 'self 링크' },
    })
    const anchor = container.querySelector('a.ui-button')
    expect(anchor?.getAttribute('target')).toBe('_self')
    expect(anchor?.hasAttribute('rel')).toBe(false)
  })

  // ===== shape =====
  it('shape="pill" 시 shape-pill 클래스 적용', () => {
    render(UiButton, { props: { shape: 'pill' }, slots: { default: '필터' } })
    expect(screen.getByRole('button').classList.contains('shape-pill')).toBe(true)
  })

  it('shape="circle" + iconOnly 시 shape-circle + is-icon-only 클래스 적용', () => {
    render(UiButton, {
      props: { shape: 'circle', iconOnly: true, ariaLabel: '추가' },
      slots: { 'icon-left': '<i class="icon-plus" />' },
    })
    const btn = screen.getByRole('button')
    expect(btn.classList.contains('shape-circle')).toBe(true)
    expect(btn.classList.contains('is-icon-only')).toBe(true)
  })

  it('shape 기본값은 "rounded"', () => {
    render(UiButton, { slots: { default: '버튼' } })
    expect(screen.getByRole('button').classList.contains('shape-rounded')).toBe(true)
  })

  // ===== iconSize override =====
  it('iconSize 미지정 시 icon-size-* 클래스 부재 (size 따라감)', () => {
    render(UiButton, { props: { size: 'md' }, slots: { default: '기본' } })
    const btn = screen.getByRole('button')
    expect(btn.className).not.toMatch(/\bicon-size-/)
  })

  it('iconSize 명시 시 icon-size-* override 클래스 부여', () => {
    render(UiButton, { props: { size: 'md', iconSize: 'xs' }, slots: { default: '오버라이드' } })
    const btn = screen.getByRole('button')
    expect(btn.classList.contains('size-md')).toBe(true)
    expect(btn.classList.contains('icon-size-xs')).toBe(true)
  })

  // ===== size 4단계 (xs 추가) =====
  it('size="xs" 클래스 적용', () => {
    render(UiButton, { props: { size: 'xs' }, slots: { default: '작게' } })
    expect(screen.getByRole('button').classList.contains('size-xs')).toBe(true)
  })
})
