import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import UiEmpty from './UiEmpty.vue'

describe('UiEmpty', () => {
  // 1. props 미지정 시 기본 title 노출 + icon/desc/action 미렌더
  it('기본 title 렌더 + 옵션 요소 미렌더', () => {
    const { container } = render(UiEmpty)
    expect(screen.getByText('데이터가 없습니다.')).toBeTruthy()
    expect(container.querySelector('.ui-empty-icon')).toBeNull()
    expect(container.querySelector('.ui-empty-desc')).toBeNull()
    expect(container.querySelector('.ui-empty-action')).toBeNull()
  })

  // 2. icon prop 시 i.size-24 + class 적용
  it('icon prop 지정 시 아이콘 i 태그 렌더 (클래스 합쳐짐)', () => {
    const { container } = render(UiEmpty, {
      props: { icon: 'icon-search' },
    })
    const i = container.querySelector('.ui-empty-icon')
    expect(i).not.toBeNull()
    expect(i?.classList.contains('icon-search')).toBe(true)
    expect(i?.classList.contains('size-24')).toBe(true)
    // 장식 아이콘 → aria-hidden
    expect(i?.getAttribute('aria-hidden')).toBe('true')
  })

  // 3. description 조건부 + default slot 조건부
  it('description prop / default slot 조건부 렌더', () => {
    const { container } = render(UiEmpty, {
      props: {
        title: '커스텀 제목',
        description: '보조 설명',
      },
      slots: {
        default: () => h('button', '액션'),
      },
    })
    expect(screen.getByText('커스텀 제목')).toBeTruthy()
    expect(screen.getByText('보조 설명')).toBeTruthy()
    expect(container.querySelector('.ui-empty-action')).not.toBeNull()
    expect(screen.getByText('액션')).toBeTruthy()
  })
})
