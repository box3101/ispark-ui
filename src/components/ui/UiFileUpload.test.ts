import { render, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import UiFileUpload from './UiFileUpload.vue'

describe('UiFileUpload', () => {
  // 1. 기본 렌더링 — 라벨 표시
  it('기본 라벨 "파일 추가" 렌더', () => {
    const { container } = render(UiFileUpload)
    const label = container.querySelector('.ui-file-upload')
    expect(label?.textContent?.trim()).toBe('파일 추가')
  })

  // 2. 커스텀 라벨
  it('label prop으로 커스텀 라벨 표시', () => {
    const { container } = render(UiFileUpload, {
      props: { label: '+ 이미지 추가' },
    })
    expect(container.querySelector('.ui-file-upload')?.textContent?.trim()).toBe('+ 이미지 추가')
  })

  // 3. loading 상태 — "업로드 중..." 표시 + disabled
  it('loading=true이면 "업로드 중..." 표시 + input disabled', () => {
    const { container } = render(UiFileUpload, {
      props: { loading: true },
    })
    expect(container.querySelector('.ui-file-upload')?.textContent?.trim()).toBe('업로드 중...')
    expect(container.querySelector('.ui-file-upload--disabled')).not.toBeNull()
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  // 4. disabled 상태
  it('disabled=true이면 disabled 클래스 + input disabled', () => {
    const { container } = render(UiFileUpload, {
      props: { disabled: true },
    })
    expect(container.querySelector('.ui-file-upload--disabled')).not.toBeNull()
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  // 5. accept prop 전달
  it('accept prop이 input에 전달됨', () => {
    const { container } = render(UiFileUpload, {
      props: { accept: 'image/*' },
    })
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input.accept).toBe('image/*')
  })

  // 6. 파일 선택 시 upload 이벤트 emit
  it('파일 선택 시 upload 이벤트로 File 객체 emit', async () => {
    const { container, emitted } = render(UiFileUpload)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement

    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' })
    Object.defineProperty(input, 'files', { value: [file], writable: false })

    await fireEvent.change(input)
    expect(emitted().upload).toBeTruthy()
    expect(emitted().upload[0][0]).toBeInstanceOf(File)
    expect((emitted().upload[0][0] as File).name).toBe('test.pdf')
  })

  // 7. input이 hidden 상태
  it('input[type="file"]이 hidden', () => {
    const { container } = render(UiFileUpload)
    const input = container.querySelector('input[type="file"]')
    expect(input?.hasAttribute('hidden')).toBe(true)
  })

  // 8. 파일 선택 후 input 초기화 (같은 파일 재선택 가능)
  it('파일 선택 후 input.value 초기화', async () => {
    const { container } = render(UiFileUpload)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement

    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    Object.defineProperty(input, 'files', { value: [file], configurable: true })

    await fireEvent.change(input)
    expect(input.value).toBe('')
  })
})


describe('UiFileUpload dropzone validation', () => {
  const pdf = new File(['pdf'], 'report.PDF', { type: 'application/pdf' })
  it('accepts a dropped file and emits the original File', async () => {
    const { getByRole, emitted } = render(UiFileUpload, { props: { variant: 'dropzone', accept: '.pdf' } })
    await fireEvent.drop(getByRole('button'), { dataTransfer: { files: [pdf] } })
    expect(emitted().upload).toEqual([[pdf]])
  })
  it('validates both file picker and drop using the same size and type rules', async () => {
    const { container, getByRole, emitted } = render(UiFileUpload, { props: { variant: 'dropzone', accept: '.pdf', maxSize: 2 } })
    await fireEvent.drop(getByRole('button'), { dataTransfer: { files: [pdf] } })
    expect(emitted().upload).toBeUndefined()
    expect(getByRole('alert').textContent).toContain('초과')
    const input = container.querySelector('input')!
    Object.defineProperty(input, 'files', { value: [new File(['a'], 'bad.txt', { type: 'text/plain' })] })
    await fireEvent.change(input)
    expect(getByRole('alert').textContent).toContain('파일 형식')
    expect(emitted().reject).toHaveLength(2)
  })
  it.each([{ disabled: true }, { loading: true }])('blocks drop and synthetic change while blocked: %o', async state => {
    const { container, getByRole, emitted } = render(UiFileUpload, { props: { variant: 'dropzone', ...state } })
    await fireEvent.drop(getByRole('button'), { dataTransfer: { files: [pdf] } })
    const input = container.querySelector('input')!
    Object.defineProperty(input, 'files', { value: [pdf] })
    await fireEvent.change(input)
    expect(emitted().upload).toBeUndefined()
  })
  it('rejects multiple files and clears the error after a valid retry at the size limit', async () => {
    const { getByRole, queryByRole, emitted } = render(UiFileUpload, { props: { variant: 'dropzone', accept: 'application/pdf', maxSize: 3 } })
    await fireEvent.drop(getByRole('button'), { dataTransfer: { files: [pdf, pdf] } })
    expect(getByRole('alert').textContent).toContain('하나씩')
    await fireEvent.drop(getByRole('button'), { dataTransfer: { files: [pdf] } })
    expect(queryByRole('alert')).toBeNull()
    expect(emitted().upload).toEqual([[pdf]])
  })
  it('supports image MIME wildcards and an accessible native button', async () => {
    const { getByRole, emitted } = render(UiFileUpload, { props: { variant: 'dropzone', accept: 'image/*' } })
    const file = new File(['image'], 'photo.png', { type: 'image/png' })
    await fireEvent.drop(getByRole('button'), { dataTransfer: { files: [file] } })
    expect(emitted().upload).toEqual([[file]])
    expect(getByRole('button').tagName).toBe('BUTTON')
  })
})
