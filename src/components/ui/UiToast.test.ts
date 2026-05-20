import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { openToast, closeToast, useToastState } from '../../composables/useToast'

describe('useToast composable', () => {
  beforeEach(() => {
    // 모듈 싱글톤 list reset
    useToastState().toastList.value = []
    vi.useRealTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('문자열 입력 → message로 항목 추가 + 기본값(info / top-center)', () => {
    const { toastList } = useToastState()
    openToast('hello')
    expect(toastList.value).toHaveLength(1)
    expect(toastList.value[0]).toMatchObject({
      message: 'hello',
      type: 'info',
      placement: 'top-center',
    })
  })

  it('객체 옵션 — type / duration / placement 반영', () => {
    const { toastList } = useToastState()
    openToast({ message: 'saved', type: 'success', placement: 'bottom-right', duration: 0 })
    expect(toastList.value[0]).toMatchObject({
      message: 'saved',
      type: 'success',
      placement: 'bottom-right',
      duration: 0,
    })
  })

  it('같은 placement 5개 초과 시 가장 오래된 항목 제거', () => {
    const { toastList } = useToastState()
    for (let i = 1; i <= 6; i++) {
      openToast({ message: `t${i}`, duration: 0 })
    }
    expect(toastList.value).toHaveLength(5)
    expect(toastList.value[0].message).toBe('t2') // t1 제거됨
    expect(toastList.value[4].message).toBe('t6')
  })

  it('placement가 다르면 독립 stack — 각각 5개까지 보유', () => {
    const { toastList } = useToastState()
    for (let i = 1; i <= 5; i++) openToast({ message: `tc${i}`, placement: 'top-center', duration: 0 })
    for (let i = 1; i <= 5; i++) openToast({ message: `tr${i}`, placement: 'top-right', duration: 0 })
    expect(toastList.value).toHaveLength(10)
  })

  it('duration > 0이면 setTimeout 후 자동 닫기', () => {
    vi.useFakeTimers()
    const { toastList } = useToastState()
    openToast({ message: 'auto', duration: 1000 })
    expect(toastList.value).toHaveLength(1)
    vi.advanceTimersByTime(999)
    expect(toastList.value).toHaveLength(1) // 아직
    vi.advanceTimersByTime(2)
    expect(toastList.value).toHaveLength(0) // 자동 제거됨
  })

  it('duration: 0이면 자동 닫기 안 함', () => {
    vi.useFakeTimers()
    const { toastList } = useToastState()
    openToast({ message: 'manual', duration: 0 })
    vi.advanceTimersByTime(10000)
    expect(toastList.value).toHaveLength(1)
  })

  it('closeToast(id) — 즉시 제거', () => {
    const { toastList } = useToastState()
    const id = openToast({ message: 'close me', duration: 0 })
    expect(toastList.value).toHaveLength(1)
    closeToast(id)
    expect(toastList.value).toHaveLength(0)
  })

  it('closeToast(unknown id) — 예외 없이 무시', () => {
    const { toastList } = useToastState()
    expect(() => closeToast(99999)).not.toThrow()
    expect(toastList.value).toHaveLength(0)
  })

  it('openToast — 반환값이 새 토스트 id', () => {
    const { toastList } = useToastState()
    const id = openToast({ message: 'with id', duration: 0 })
    expect(typeof id).toBe('number')
    expect(toastList.value[0].id).toBe(id)
  })
})
