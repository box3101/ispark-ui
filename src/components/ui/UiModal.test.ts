import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiModal from './UiModal.vue'

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
  // jsdom에서 radix-vue ESC 이벤트 dispatch 시점 한계 가능 — Storybook play로 보충
  it.skip('closeOnEscape=false 시 ESC 닫히지 않음', async () => {
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
})
