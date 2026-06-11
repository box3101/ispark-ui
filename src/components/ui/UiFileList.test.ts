import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import UiFileList from './UiFileList.vue'
import type { FileItem } from './UiFileList.vue'

const mockGetUrl = (path: string) => `https://example.com/${path}`

const sampleFiles: FileItem[] = [
  { id: 1, filename: '보고서.pdf', path: 'report.pdf', mimetype: 'application/pdf' },
  { id: 2, filename: '사진.jpg', path: 'photo.jpg', mimetype: 'image/jpeg' },
  { id: 3, filename: '메모.txt', path: 'memo.txt', mimetype: 'text/plain' },
]

describe('UiFileList', () => {
  // 1. 빈 목록 — 아무것도 렌더하지 않음
  it('빈 파일 목록이면 렌더하지 않음', () => {
    const { container } = render(UiFileList, {
      props: { files: [], getUrl: mockGetUrl },
    })
    expect(container.querySelector('.ui-file-list')).toBeNull()
  })

  // 2. 파일 목록 렌더링 — 파일 수만큼 아이템 렌더
  it('파일 수만큼 아이템을 렌더함', () => {
    const { container } = render(UiFileList, {
      props: { files: sampleFiles, getUrl: mockGetUrl },
    })
    const items = container.querySelectorAll('.ui-file-item')
    expect(items.length).toBe(3)
  })

  // 3. 이미지 파일 — 미리보기 img 렌더
  it('이미지 파일은 img 태그로 미리보기 렌더', () => {
    const imageFile: FileItem[] = [
      { id: 1, filename: '사진.jpg', path: 'photo.jpg', mimetype: 'image/jpeg' },
    ]
    const { container } = render(UiFileList, {
      props: { files: imageFile, getUrl: mockGetUrl },
    })
    const img = container.querySelector('.ui-file-item__img') as HTMLImageElement
    expect(img).not.toBeNull()
    expect(img.src).toBe('https://example.com/photo.jpg')
    expect(img.alt).toBe('사진.jpg')
    // image 클래스 적용
    expect(container.querySelector('.ui-file-item--image')).not.toBeNull()
  })

  // 4. 일반 파일 — 📎 아이콘 + 링크 렌더
  it('일반 파일은 📎 아이콘과 링크로 렌더', () => {
    const textFile: FileItem[] = [
      { id: 1, filename: '보고서.pdf', path: 'report.pdf', mimetype: 'application/pdf' },
    ]
    const { container } = render(UiFileList, {
      props: { files: textFile, getUrl: mockGetUrl },
    })
    // 📎 아이콘
    const icon = container.querySelector('.ui-file-item__icon')
    expect(icon).not.toBeNull()
    expect(icon?.getAttribute('aria-hidden')).toBe('true')
    // 파일명 링크
    const link = container.querySelector('a.ui-file-item__name') as HTMLAnchorElement
    expect(link).not.toBeNull()
    expect(link.href).toBe('https://example.com/report.pdf')
    expect(link.textContent).toBe('보고서.pdf')
  })

  // 5. 삭제 버튼 클릭 — delete 이벤트 emit
  it('삭제 버튼 클릭 시 delete 이벤트 emit', async () => {
    const textFile: FileItem[] = [
      { id: 1, filename: '보고서.pdf', path: 'report.pdf', mimetype: 'application/pdf' },
    ]
    const { container, emitted } = render(UiFileList, {
      props: { files: textFile, getUrl: mockGetUrl },
    })
    const deleteBtn = container.querySelector('.ui-file-item__delete') as HTMLButtonElement
    expect(deleteBtn).not.toBeNull()
    await fireEvent.click(deleteBtn)
    expect(emitted().delete).toBeTruthy()
    expect(emitted().delete[0]).toEqual([textFile[0]])
  })

  // 6. deletable=false — 삭제 버튼 미렌더
  it('deletable=false이면 삭제 버튼 미렌더', () => {
    const { container } = render(UiFileList, {
      props: { files: sampleFiles, getUrl: mockGetUrl, deletable: false },
    })
    expect(container.querySelector('.ui-file-item__delete')).toBeNull()
  })

  // 7. 삭제 버튼 접근성 — aria-label 확인
  it('삭제 버튼에 aria-label="파일 삭제" 존재', () => {
    const textFile: FileItem[] = [
      { id: 1, filename: '메모.txt', path: 'memo.txt', mimetype: 'text/plain' },
    ]
    const { container } = render(UiFileList, {
      props: { files: textFile, getUrl: mockGetUrl },
    })
    const deleteBtn = container.querySelector('.ui-file-item__delete')
    expect(deleteBtn?.getAttribute('aria-label')).toBe('파일 삭제')
  })

  // 8. getUrl 함수 호출 검증
  it('getUrl 함수가 파일 경로로 호출됨', () => {
    const getUrlSpy = vi.fn((path: string) => `https://cdn.test/${path}`)
    const textFile: FileItem[] = [
      { id: 1, filename: '보고서.pdf', path: 'docs/report.pdf', mimetype: 'application/pdf' },
    ]
    render(UiFileList, {
      props: { files: textFile, getUrl: getUrlSpy },
    })
    expect(getUrlSpy).toHaveBeenCalledWith('docs/report.pdf')
  })

  // 9. 다양한 이미지 MIME type 처리
  it('image/* MIME type은 모두 이미지로 처리', () => {
    const imageFiles: FileItem[] = [
      { id: 1, filename: 'a.png', path: 'a.png', mimetype: 'image/png' },
      { id: 2, filename: 'b.gif', path: 'b.gif', mimetype: 'image/gif' },
      { id: 3, filename: 'c.svg', path: 'c.svg', mimetype: 'image/svg+xml' },
    ]
    const { container } = render(UiFileList, {
      props: { files: imageFiles, getUrl: mockGetUrl },
    })
    const imageItems = container.querySelectorAll('.ui-file-item--image')
    expect(imageItems.length).toBe(3)
  })
})
