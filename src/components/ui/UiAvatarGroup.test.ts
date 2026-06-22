import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import UiAvatarGroup from './UiAvatarGroup.vue'
import UiAvatar from './UiAvatar.vue'

// default 슬롯에 UiAvatar n개를 넣어 렌더하는 헬퍼
function renderGroup(count: number, props: Record<string, unknown> = {}) {
  const avatars = Array.from({ length: count }, (_, i) =>
    h(UiAvatar, { name: `U${i}`, key: i }),
  )
  return render(UiAvatarGroup, {
    props,
    slots: { default: () => avatars },
  })
}

describe('UiAvatarGroup', () => {
  // 1. max 초과 시 "+N" 카운터 표시
  it('max 초과분을 "+N"으로 표시', () => {
    const { container } = renderGroup(5, { max: 3 })
    const counter = container.querySelector('.ui-avatar-group__counter') as HTMLElement
    expect(counter).toBeTruthy()
    expect(counter.textContent?.trim()).toBe('+2')
  })

  // 2. max 이하면 카운터 없음
  it('자식 수가 max 이하면 카운터 미표시', () => {
    const { container } = renderGroup(2, { max: 3 })
    expect(container.querySelector('.ui-avatar-group__counter')).toBeNull()
  })

  // 3. max 미지정이면 카운터 없음
  it('max 미지정 시 카운터 미표시', () => {
    const { container } = renderGroup(5)
    expect(container.querySelector('.ui-avatar-group__counter')).toBeNull()
  })

  // 4. 카운터 aria-label 바인딩 — 리터럴 백틱이 아닌 실제 값
  it('카운터 aria-label이 실제 값으로 바인딩 (백틱 리터럴 아님)', () => {
    const { container } = renderGroup(5, { max: 3 })
    const counter = container.querySelector('.ui-avatar-group__counter') as HTMLElement
    expect(counter.getAttribute('aria-label')).toBe('그 외 2명')
  })

  // 5. overlap prop → CSS 변수 반영
  it('overlap prop이 --avatar-overlap 변수로 반영', () => {
    const { container } = renderGroup(2, { overlap: 12 })
    const group = container.querySelector('.ui-avatar-group') as HTMLElement
    expect(group.style.getPropertyValue('--avatar-overlap')).toBe('-12px')
  })
})
