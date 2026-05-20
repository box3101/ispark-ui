import { ref } from 'vue'

/** Toast 시멘틱 타입 */
export type ToastType = 'success' | 'error' | 'warning' | 'info'

/** Toast 표시 위치 — 4 placement별로 별도 stack */
export type ToastPlacement =
  | 'top-center'
  | 'top-right'
  | 'bottom-center'
  | 'bottom-right'

/** openToast 호출 옵션 */
export interface ToastOptions {
  message: string
  type?: ToastType
  /** 표시 시간(ms). 기본 2500. 0 이하면 자동 닫기 비활성 (수동 close만) */
  duration?: number
  placement?: ToastPlacement
}

/** 내부 toast 항목 — UiToast.vue 렌더용 */
export interface ToastItem {
  id: number
  message: string
  type: ToastType
  duration: number
  placement: ToastPlacement
}

/** 최대 동시 표시 개수 (placement별) */
const MAX_TOASTS_PER_PLACEMENT = 5

/** 모듈 싱글톤 — 모든 openToast 호출이 같은 list 공유 */
const toastList = ref<ToastItem[]>([])
let toastId = 0

/**
 * 화면에 Toast 표시 (placement별 stack).
 *
 * @example
 * openToast('저장되었습니다.')
 * openToast({ message: '저장 완료', type: 'success' })
 * openToast({ message: '에러', type: 'error', placement: 'bottom-right' })
 * openToast({ message: '오래 유지', duration: 0 })  // 수동 close만
 */
export function openToast(options: ToastOptions | string): number {
  const opts = typeof options === 'string' ? { message: options } : options
  const id = ++toastId
  const item: ToastItem = {
    id,
    message: opts.message,
    type: opts.type ?? 'info',
    duration: opts.duration ?? 2500,
    placement: opts.placement ?? 'top-center',
  }

  // 같은 placement 항목이 MAX 초과면 가장 오래된 1개 제거
  const sameStack = toastList.value.filter((t) => t.placement === item.placement)
  if (sameStack.length >= MAX_TOASTS_PER_PLACEMENT) {
    const oldest = sameStack[0]
    if (oldest) closeToast(oldest.id)
  }

  toastList.value.push(item)

  // duration > 0 일 때만 자동 닫기
  if (item.duration > 0) {
    setTimeout(() => closeToast(id), item.duration)
  }

  return id
}

/** 토스트 수동 닫기 */
export function closeToast(id: number): void {
  const index = toastList.value.findIndex((t) => t.id === id)
  if (index > -1) toastList.value.splice(index, 1)
}

/** UiToast.vue 내부 전용 — 리스트 reactive ref 노출 */
export function useToastState() {
  return { toastList }
}
