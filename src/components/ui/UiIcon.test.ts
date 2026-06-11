import { render } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import UiIcon from './UiIcon.vue'

describe('UiIcon', () => {
  // 1. 유효한 아이콘 렌더링
  it('유효한 name으로 SVG를 렌더링한다', () => {
    const { container } = render(UiIcon, {
      props: { name: 'search' },
    })
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
    expect(svg!.classList.contains('ui-icon')).toBe(true)
    expect(svg!.getAttribute('aria-hidden')).toBe('true')
  })

  // 2. 존재하지 않는 아이콘 — 콘솔 경고 + 빈 렌더링
  it('존재하지 않는 name은 경고 + 빈 렌더링', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { container } = render(UiIcon, {
      props: { name: 'nonexistent-icon-xyz' },
    })
    expect(container.querySelector('svg')).toBeNull()
    expect(warnSpy).toHaveBeenCalledWith(
      '[UiIcon] Unknown icon: "nonexistent-icon-xyz"',
    )
    warnSpy.mockRestore()
  })

  // 3. 사이즈 토큰 — sm → 16px
  it('size="sm"이면 width/height가 16', () => {
    const { container } = render(UiIcon, {
      props: { name: 'search', size: 'sm' },
    })
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('16')
    expect(svg.getAttribute('height')).toBe('16')
  })

  // 4. 사이즈 숫자 — 32px
  it('size=32이면 width/height가 32', () => {
    const { container } = render(UiIcon, {
      props: { name: 'search', size: 32 },
    })
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('32')
    expect(svg.getAttribute('height')).toBe('32')
  })

  // 5. 색상 프리셋 — color="primary" → class
  it('color="primary"이면 color-primary 클래스 적용', () => {
    const { container } = render(UiIcon, {
      props: { name: 'search', color: 'primary' },
    })
    const svg = container.querySelector('svg')!
    expect(svg.classList.contains('color-primary')).toBe(true)
  })

  // 6. 색상 미지정 — color 클래스 없음 (currentColor)
  it('color 미지정이면 color-* 클래스 없음', () => {
    const { container } = render(UiIcon, {
      props: { name: 'search' },
    })
    const svg = container.querySelector('svg')!
    const hasColorClass = Array.from(svg.classList).some((c) =>
      c.startsWith('color-'),
    )
    expect(hasColorClass).toBe(false)
  })

  // 7. strokeWidth 전달
  it('strokeWidth가 SVG에 전달된다', () => {
    const { container } = render(UiIcon, {
      props: { name: 'search', strokeWidth: 1.5 },
    })
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('stroke-width')).toBe('1.5')
  })

  // 8. kebab-case → PascalCase 변환 (multi-word)
  it('kebab-case name을 올바르게 resolve한다', () => {
    const { container } = render(UiIcon, {
      props: { name: 'arrow-right' },
    })
    expect(container.querySelector('svg')).not.toBeNull()
  })
})
