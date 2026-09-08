import { render, screen } from '@testing-library/vue'
import { composeStories } from '@storybook/vue3'
import { describe, it, expect, vi } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiModal from './UiModal.vue'
import * as stories from './UiModal.stories'

const { Default, WithTitle, WithFooter, Fullscreen } = composeStories(stories)

async function waitPortal() {
  await nextTick()
  await new Promise((r) => setTimeout(r, 0))
}

describe('UiModal', () => {
  // 1. v-model:open prop → DialogContent (role=dialog) 렌더 동기화
  it('open=true → role="dialog" 렌더, open=false → 미렌더', async () => {
    const Wrapper = defineComponent({
      setup() {
        const open = ref(false)
        return () => h('div', [
          h(UiModal, { open: open.value, title: 'T1', 'onUpdate:open': (v: boolean) => (open.value = v) }, () => h('p', 'body')),
          h('button', { onClick: () => (open.value = true), id: 'opener' }, 'open'),
        ])
      },
    })
    render(Wrapper)
    await nextTick()
    // 닫혀 있을 때 dialog 역할 미존재
    expect(screen.queryByRole('dialog')).toBeNull()
    // 열기
    ;(document.getElementById('opener') as HTMLButtonElement).click()
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))
    // Portal 안 dialog 존재
    expect(screen.queryByRole('dialog')).not.toBeNull()
  })

  // 2. title prop 렌더 — 헤더에 텍스트
  it('title prop 시 헤더에 텍스트 렌더', async () => {
    render(UiModal, {
      props: { open: true, title: '회원 정보' },
      slots: { default: '<p>본문</p>' },
    })
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))
    const dialog = screen.getByRole('dialog')
    expect(dialog.textContent).toContain('회원 정보')
  })

  // 3. showClose=false 시 X 버튼 없음
  it('showClose=false 시 닫기 버튼 미렌더', async () => {
    render(UiModal, {
      props: { open: true, title: '제목', showClose: false },
      slots: { default: '<p>본문</p>' },
    })
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))
    expect(screen.queryByRole('button', { name: '닫기' })).toBeNull()
  })

  // 4. closeOnEscape=false 시 ESC 막기
  // jsdom 환경에서 radix-vue의 escape key 핸들러가 document/dialog 어느 쪽 dispatch도 받지 못함
  // (DismissableLayer 내부 keydown listener가 jsdom 이벤트 전파 모델과 호환 안 됨)
  //
  // 실제 검증 위치:
  //   - UiModal.stories.ts `StrictNoEscape` play: open=true 상태에서 ESC → dialog 유지 + update:open(false) 미호출 확인 (line ~290)
  //
  // CI 통합: Phase 2의 @storybook/test-runner 도입 시 자동 회귀 검증
  it.skip('closeOnEscape=false 시 ESC 닫히지 않음 (Storybook StrictNoEscape play로 검증)', async () => {
    const onUpdate = vi.fn()
    render(UiModal, {
      props: {
        open: true,
        title: '제목',
        closeOnEscape: false,
        'onUpdate:open': onUpdate,
      },
    })
    await nextTick()
    // ESC 키 dispatch — radix-vue가 받는 이벤트
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    // closeOnEscape=false니까 update:open(false) 호출 안 돼야
    const closeCalls = onUpdate.mock.calls.filter(([v]) => v === false)
    expect(closeCalls.length).toBe(0)
  })

  // 5. footer 슬롯 렌더
  it('footer slot 렌더', async () => {
    render(UiModal, {
      props: { open: true, title: '제목' },
      slots: {
        default: '<p>body</p>',
        footer: '<button>저장</button>',
      },
    })
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))
    expect(screen.queryByRole('button', { name: '저장' })).not.toBeNull()
  })

  // 6. 헤더/푸터 고정 — content는 스크롤하지 않고 body만 overflow
  it('content overflow hidden + body overflow-y auto, header/footer shrink 0', async () => {
    render(UiModal, {
      props: { open: true, title: '긴 본문', description: '설명' },
      slots: {
        default: '<p>본문</p>',
        footer: '<button>저장</button>',
      },
    })
    await waitPortal()
    const dialog = screen.getByRole('dialog')
    const header = dialog.querySelector('.ui-modal-header') as HTMLElement
    const desc = dialog.querySelector('.ui-modal-desc') as HTMLElement
    const body = dialog.querySelector('.ui-modal-body') as HTMLElement
    const footer = dialog.querySelector('.ui-modal-footer') as HTMLElement

    expect(header).not.toBeNull()
    expect(desc).not.toBeNull()
    expect(body).not.toBeNull()
    expect(footer).not.toBeNull()

    const contentStyle = getComputedStyle(dialog)
    expect(contentStyle.display).toBe('flex')
    expect(contentStyle.flexDirection).toBe('column')
    expect(contentStyle.overflow).toBe('hidden')

    expect(getComputedStyle(body).overflowY).toBe('auto')
    expect(getComputedStyle(header).flexShrink).toBe('0')
    expect(getComputedStyle(desc).flexShrink).toBe('0')
    expect(getComputedStyle(footer).flexShrink).toBe('0')
  })

  // 7. 스토리 play 회귀
  it('Default play: 열기 후 ESC로 닫힘', async () => {
    const { container } = render(Default())
    await Default.play?.({ canvasElement: container })
  })

  it('WithTitle play: 제목 + 닫기 버튼', async () => {
    const { container } = render(WithTitle())
    await WithTitle.play?.({ canvasElement: container })
  })

  it('WithFooter play: 저장/취소 버튼', async () => {
    const { container } = render(WithFooter())
    await WithFooter.play?.({ canvasElement: container })
  })

  it('Fullscreen play: 전체화면 토글', async () => {
    const { container } = render(Fullscreen())
    await Fullscreen.play?.({ canvasElement: container })
  })
})
