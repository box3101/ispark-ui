import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import UiBadgeGroup from './UiBadgeGroup.vue'
import UiBadge from './UiBadge.vue'

describe('UiBadgeGroup', () => {
  // 1. gap prop — number는 px로, string은 그대로
  it('gap number → px 단위로 적용', () => {
    const { container } = render(UiBadgeGroup, {
      props: { gap: 12 },
      slots: { default: () => [h(UiBadge, null, () => 'A'), h(UiBadge, null, () => 'B')] },
    })
    const group = container.querySelector('.ui-badge-group') as HTMLElement
    expect(group.style.gap).toBe('12px')
  })

  it('gap string → 그대로 적용', () => {
    const { container } = render(UiBadgeGroup, {
      props: { gap: '0.5rem' },
      slots: { default: () => h(UiBadge, null, () => 'A') },
    })
    const group = container.querySelector('.ui-badge-group') as HTMLElement
    expect(group.style.gap).toBe('0.5rem')
  })

  // 2. direction prop — class 토글
  it('direction column → direction-column 클래스', () => {
    const { container } = render(UiBadgeGroup, {
      props: { direction: 'column' },
      slots: { default: () => h(UiBadge, null, () => 'A') },
    })
    expect(container.querySelector('.direction-column')).toBeTruthy()
  })

  // 3. wrap prop — is-wrap 토글
  it('wrap=false면 is-wrap 클래스 미적용', () => {
    const { container } = render(UiBadgeGroup, {
      props: { wrap: false },
      slots: { default: () => h(UiBadge, null, () => 'A') },
    })
    expect(container.querySelector('.is-wrap')).toBeFalsy()
  })

  // 4. ariaLabel — 스크린리더 그룹 라벨
  it('ariaLabel 전달 시 role=group + aria-label 부여', () => {
    const { container } = render(UiBadgeGroup, {
      props: { ariaLabel: '상태 그룹' },
      slots: { default: () => h(UiBadge, null, () => 'A') },
    })
    const group = container.querySelector('.ui-badge-group')!
    expect(group.getAttribute('role')).toBe('group')
    expect(group.getAttribute('aria-label')).toBe('상태 그룹')
  })

  // 5. 기본값 — gap=8, direction=row, wrap=true
  it('기본값 검증 (gap=8 / direction=row / wrap=true)', () => {
    const { container } = render(UiBadgeGroup, {
      slots: { default: () => h(UiBadge, null, () => 'A') },
    })
    const group = container.querySelector('.ui-badge-group') as HTMLElement
    expect(group.style.gap).toBe('8px')
    expect(group.classList.contains('direction-row')).toBe(true)
    expect(group.classList.contains('is-wrap')).toBe(true)
  })
})
