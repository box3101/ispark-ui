import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import UiAvatar from './UiAvatar.vue'

describe('UiAvatar', () => {
  // 1. 이니셜 추출 — 영문 풀네임은 앞+뒤 첫글자
  it('영문 풀네임에서 이니셜 2자 추출 (John Doe → JD)', () => {
    render(UiAvatar, { props: { name: 'John Doe' } })
    expect(screen.getByText('JD')).toBeTruthy()
  })

  // 2. 이니셜 추출 — 한글 단일 이름은 첫 글자만
  it('한글 단일 이름은 첫 글자만 (이찬용 → 이)', () => {
    render(UiAvatar, { props: { name: '이찬용' } })
    expect(screen.getByText('이')).toBeTruthy()
  })

  // 3. 색상 일관성 — 같은 이름은 항상 같은 배경색 (DJB2 해시)
  it('같은 이름은 동일한 배경색', () => {
    const { container: c1 } = render(UiAvatar, { props: { name: '김민수' } })
    const { container: c2 } = render(UiAvatar, { props: { name: '김민수' } })
    const bg1 = (c1.querySelector('.ui-avatar') as HTMLElement).style.backgroundColor
    const bg2 = (c2.querySelector('.ui-avatar') as HTMLElement).style.backgroundColor
    expect(bg1).toBeTruthy()
    expect(bg1).toBe(bg2)
  })

  // 4. color prop이 name 해시보다 우선
  it('color prop 지정 시 배경색 수동 적용', () => {
    const { container } = render(UiAvatar, { props: { name: '관리자', color: '#1d4ed8' } })
    const el = container.querySelector('.ui-avatar') as HTMLElement
    // rgb(29, 78, 216) === #1d4ed8
    expect(el.style.backgroundColor).toBe('rgb(29, 78, 216)')
  })

  // 5. name·src 모두 없으면 기본 아이콘(svg) 표시
  it('name과 src 모두 없으면 기본 아이콘 표시', () => {
    const { container } = render(UiAvatar, {})
    expect(container.querySelector('.ui-avatar__icon')).toBeTruthy()
    expect(container.querySelector('.ui-avatar__initials')).toBeNull()
  })

  // 6. src 있으면 img 렌더
  it('src 지정 시 img 렌더', () => {
    const { container } = render(UiAvatar, {
      props: { src: 'https://example.test/a.jpg', name: 'A B' },
    })
    expect(container.querySelector('img')).toBeTruthy()
    expect(container.querySelector('.ui-avatar__initials')).toBeNull()
  })

  // 7. 이미지 로드 실패 → 이니셜 폴백
  it('이미지 로드 실패 시 이니셜로 폴백', async () => {
    const { container } = render(UiAvatar, {
      props: { src: 'https://invalid.test/broken.jpg', name: 'Jane Smith' },
    })
    const img = container.querySelector('img') as HTMLImageElement
    expect(img).toBeTruthy()
    await fireEvent.error(img)
    expect(container.querySelector('img')).toBeNull()
    expect(screen.getByText('JS')).toBeTruthy()
  })

  // 8. shape / size 클래스 적용
  it('shape, size 클래스 적용', () => {
    const { container } = render(UiAvatar, {
      props: { name: '김철수', shape: 'square', size: 'lg' },
    })
    const el = container.querySelector('.ui-avatar') as HTMLElement
    expect(el.classList.contains('shape-square')).toBe(true)
    expect(el.classList.contains('size-lg')).toBe(true)
  })

  // 9. 숫자 size → 클래스 대신 인라인 width/height
  it('숫자 size는 인라인 스타일로 적용', () => {
    const { container } = render(UiAvatar, { props: { name: 'C', size: 56 } })
    const el = container.querySelector('.ui-avatar') as HTMLElement
    expect(el.className).not.toContain('size-')
    expect(el.style.width).toBe('56px')
    expect(el.style.height).toBe('56px')
  })

  // 10. 접근성 — role=img + aria-label (alt > name > 기본)
  it('alt 우선, 없으면 name으로 aria-label', () => {
    render(UiAvatar, { props: { name: '이찬용', alt: '프로필 사진' } })
    const el = screen.getByRole('img')
    expect(el.getAttribute('aria-label')).toBe('프로필 사진')
  })

  it('alt 없으면 name이 aria-label', () => {
    render(UiAvatar, { props: { name: '이찬용' } })
    expect(screen.getByRole('img').getAttribute('aria-label')).toBe('이찬용')
  })
})
