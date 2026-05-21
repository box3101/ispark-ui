import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import UiBadge from './UiBadge.vue'

describe('UiBadge', () => {
  // 1. 기본 — variant/size 미지정 시 default/sm 클래스
  it('기본값: variant=default, size=sm 클래스', () => {
    const { container } = render(UiBadge, {
      slots: { default: '라벨' },
    })
    const el = container.querySelector('.ui-badge')!
    expect(el.classList.contains('variant-default')).toBe(true)
    expect(el.classList.contains('size-sm')).toBe(true)
    expect(screen.getByText('라벨')).toBeTruthy()
  })

  // 2. colorHex — 6자리 hex → inline style에 color + rgba 배경
  // jsdom은 hex를 rgb()로 정규화하지만 rgba()는 보존
  it('colorHex(6자리): color와 rgba 배경이 inline style로 적용', () => {
    const { container } = render(UiBadge, {
      props: { colorHex: '#22C55E', bgAlpha: 0.12 },
      slots: { default: '커스텀' },
    })
    const el = container.querySelector('.ui-badge') as HTMLElement
    const style = el.style
    // jsdom 정규화: #22c55e → rgb(34, 197, 94)
    expect(style.color.replace(/\s/g, '')).toBe('rgb(34,197,94)')
    expect(style.backgroundColor).toBe('rgba(34, 197, 94, 0.12)')
  })

  // 3. colorHex — 3자리 hex 정규화 (#abc → #aabbcc)
  it('colorHex(3자리): 6자리로 정규화되어 rgba 변환', () => {
    const { container } = render(UiBadge, {
      props: { colorHex: '#abc', bgAlpha: 0.2 },
      slots: { default: 'x' },
    })
    const el = container.querySelector('.ui-badge') as HTMLElement
    // #aabbcc → rgba(170, 187, 204, 0.2)
    expect(el.style.backgroundColor).toBe('rgba(170, 187, 204, 0.2)')
  })

  // 4. 잘못된 colorHex — inline style 미적용 + variant 'default'로 안전 폴백
  // (이전: variant 그대로 사용 → 의도하지 않은 success/danger 색 노출 위험)
  it('잘못된 colorHex는 inline style 미적용 + variant default 강제 폴백', () => {
    const { container } = render(UiBadge, {
      props: { colorHex: 'not-a-color', variant: 'success' },
      slots: { default: 'x' },
    })
    const el = container.querySelector('.ui-badge') as HTMLElement
    expect(el.style.color).toBe('')
    expect(el.style.backgroundColor).toBe('')
    // 안전을 위해 variant는 default로 폴백 (사용자가 명시한 success는 무시)
    expect(el.classList.contains('variant-success')).toBe(false)
    expect(el.classList.contains('variant-default')).toBe(true)
  })

  // 5. iconOnly — default 슬롯 미렌더, is-icon-only 클래스
  it('iconOnly=true: 텍스트 슬롯 미렌더 + is-icon-only 클래스', () => {
    const { container } = render(UiBadge, {
      props: { iconOnly: true },
      slots: {
        default: '숨겨질 텍스트',
        'icon-left': () => h('span', { class: 'test-icon' }, '★'),
      },
    })
    const el = container.querySelector('.ui-badge')!
    expect(el.classList.contains('is-icon-only')).toBe(true)
    // 텍스트 슬롯의 wrapper(.ui-badge-text) 미렌더
    expect(container.querySelector('.ui-badge-text')).toBeNull()
    // icon은 렌더
    expect(container.querySelector('.test-icon')).not.toBeNull()
  })

  // 6. icon 슬롯 — aria-hidden 자동 부여 (장식 아이콘)
  it('icon 슬롯 wrapper에 aria-hidden="true" 자동 부여', () => {
    const { container } = render(UiBadge, {
      slots: {
        default: '라벨',
        'icon-left': () => h('span', '★'),
        'icon-right': () => h('span', '→'),
      },
    })
    const icons = container.querySelectorAll('.ui-badge-icon')
    expect(icons.length).toBe(2)
    icons.forEach((i) => expect(i.getAttribute('aria-hidden')).toBe('true'))
  })
})
