import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { nextTick, defineComponent, h } from 'vue'
import UiConfirm from './UiConfirm.vue'
import { openConfirm, resolveConfirm } from '../../composables/useConfirm'

// 매 테스트 전 열려있는 confirm 닫기
beforeEach(() => {
  resolveConfirm(false)
})

/** UiConfirm + openConfirm 래퍼 — Teleport 대상(body)에 렌더 */
function mountConfirm() {
  const Wrapper = defineComponent({
    setup() {
      return () => h(UiConfirm)
    },
  })
  render(Wrapper)
}

describe('UiConfirm', () => {
  // 1. openConfirm 호출 → 다이얼로그 렌더 (title, message)
  it('openConfirm 호출 시 title, message 렌더', async () => {
    mountConfirm()

    openConfirm({ title: '삭제', message: '삭제하시겠습니까?' })
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))

    const title = document.querySelector('.ui-confirm-title')
    const message = document.querySelector('.ui-confirm-message')
    expect(title?.textContent).toBe('삭제')
    expect(message?.textContent).toBe('삭제하시겠습니까?')
  })

  // 2. 확인 버튼 클릭 → Promise<true>
  it('확인 버튼 클릭 시 true resolve', async () => {
    mountConfirm()

    const promise = openConfirm({ message: '확인?' })
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))

    const buttons = document.querySelectorAll('.ui-confirm-btn')
    const confirmBtn = buttons[buttons.length - 1] as HTMLButtonElement
    confirmBtn.click()
    await nextTick()

    const result = await promise
    expect(result).toBe(true)
  })

  // 3. 취소 버튼 클릭 → Promise<false>
  it('취소 버튼 클릭 시 false resolve', async () => {
    mountConfirm()

    const promise = openConfirm({ message: '취소?' })
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))

    const cancelBtn = document.querySelector('.ui-confirm-btn--cancel') as HTMLButtonElement
    cancelBtn.click()
    await nextTick()

    const result = await promise
    expect(result).toBe(false)
  })

  // 4. variant='primary' → 확인 버튼에 primary 클래스
  it('variant="primary" 시 확인 버튼에 ui-confirm-btn--primary 클래스', async () => {
    mountConfirm()

    openConfirm({ message: '저장?', variant: 'primary' })
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))

    const primaryBtn = document.querySelector('.ui-confirm-btn--primary')
    expect(primaryBtn).toBeTruthy()
  })

  // 5. variant='danger' (기본값) → danger 클래스
  it('기본 variant는 danger', async () => {
    mountConfirm()

    openConfirm({ message: '삭제?' })
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))

    const dangerBtn = document.querySelector('.ui-confirm-btn--danger')
    expect(dangerBtn).toBeTruthy()
  })

  // 6. 커스텀 텍스트 반영
  it('confirmText, cancelText 커스텀 반영', async () => {
    mountConfirm()

    openConfirm({
      message: '로그아웃?',
      confirmText: '로그아웃',
      cancelText: '돌아가기',
    })
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))

    const buttons = document.querySelectorAll('.ui-confirm-btn')
    const cancelBtn = buttons[0]
    const confirmBtn = buttons[1]
    expect(cancelBtn?.textContent?.trim()).toBe('돌아가기')
    expect(confirmBtn?.textContent?.trim()).toBe('로그아웃')
  })

  // 7. 기본 title은 '확인'
  it('title 미지정 시 기본값 "확인"', async () => {
    mountConfirm()

    openConfirm({ message: '메시지' })
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))

    const title = document.querySelector('.ui-confirm-title')
    expect(title?.textContent).toBe('확인')
  })
})
