import { ref } from 'vue'

/** openConfirm 호출 옵션 */
export interface ConfirmOptions {
  /** 모달 제목 (기본: '확인') */
  title?: string
  /** 확인 메시지 */
  message: string
  /** 확인 버튼 텍스트 (기본: '확인') */
  confirmText?: string
  /** 취소 버튼 텍스트 (기본: '취소') */
  cancelText?: string
  /** 확인 버튼 variant (기본: 'danger') */
  variant?: 'primary' | 'danger'
}

/** 내부 상태 — UiConfirm.vue 렌더용 */
export interface ConfirmState {
  open: boolean
  title: string
  message: string
  confirmText: string
  cancelText: string
  variant: 'primary' | 'danger'
}

/** 모듈 싱글톤 — 모든 openConfirm 호출이 같은 state 공유 */
const confirmState = ref<ConfirmState>({
  open: false,
  title: '확인',
  message: '',
  confirmText: '확인',
  cancelText: '취소',
  variant: 'danger',
})

let resolvePromise: ((value: boolean) => void) | null = null

/**
 * 확인/취소 다이얼로그 표시. Promise<boolean> 반환.
 *
 * @example
 * const confirmed = await openConfirm({
 *   title: '삭제',
 *   message: '삭제하시겠습니까?',
 * })
 * if (!confirmed) return
 *
 * @example
 * const ok = await openConfirm({
 *   title: '저장',
 *   message: '변경사항을 저장하시겠습니까?',
 *   variant: 'primary',
 *   confirmText: '저장',
 * })
 */
export function openConfirm(options: ConfirmOptions): Promise<boolean> {
  confirmState.value = {
    open: true,
    title: options.title ?? '확인',
    message: options.message,
    confirmText: options.confirmText ?? '확인',
    cancelText: options.cancelText ?? '취소',
    variant: options.variant ?? 'danger',
  }

  return new Promise<boolean>((resolve) => {
    resolvePromise = resolve
  })
}

/** 내부 전용 — UiConfirm.vue에서 호출 */
export function resolveConfirm(value: boolean): void {
  confirmState.value.open = false
  if (resolvePromise) {
    resolvePromise(value)
    resolvePromise = null
  }
}

/** UiConfirm.vue 내부 전용 — 상태 reactive ref 노출 */
export function useConfirmState() {
  return { confirmState }
}
