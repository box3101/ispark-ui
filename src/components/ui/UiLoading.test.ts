import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import UiLoading from './UiLoading.vue'

describe('UiLoading', () => {
  // 1. 기본 — 기본 text + role=status + aria-live=polite
  it('기본값: text="불러오는 중..." + role=status + aria-live=polite', () => {
    const { container } = render(UiLoading)
    expect(screen.getByText('불러오는 중...')).toBeTruthy()
    const root = container.querySelector('.ui-loading')!
    expect(root.getAttribute('role')).toBe('status')
    expect(root.getAttribute('aria-live')).toBe('polite')
    // text 있으면 aria-label은 미부여 (텍스트가 직접 SR에 들어감)
    expect(root.hasAttribute('aria-label')).toBe(false)
  })

  // 2. text='' (빈 문자열) — text 미렌더 + aria-label fallback
  it('text 빈 문자열: <p> 미렌더 + aria-label="로딩 중" 자동', () => {
    const { container } = render(UiLoading, {
      props: { text: '' },
    })
    expect(container.querySelector('.ui-loading-text')).toBeNull()
    const root = container.querySelector('.ui-loading')!
    expect(root.getAttribute('aria-label')).toBe('로딩 중')
  })

  // 3. overlay=true — is-overlay 클래스 + fixed 모드
  it('overlay=true: is-overlay 클래스 적용 + spinner 렌더', () => {
    const { container } = render(UiLoading, {
      props: { overlay: true, text: '저장 중...' },
    })
    const root = container.querySelector('.ui-loading')!
    expect(root.classList.contains('is-overlay')).toBe(true)
    expect(container.querySelector('.ui-loading-spinner')).not.toBeNull()
    // spinner는 장식 → aria-hidden
    expect(container.querySelector('.ui-loading-spinner')!.getAttribute('aria-hidden')).toBe('true')
    expect(screen.getByText('저장 중...')).toBeTruthy()
  })
})
