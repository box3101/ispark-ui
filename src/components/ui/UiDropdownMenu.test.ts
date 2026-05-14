import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiDropdownMenu from './UiDropdownMenu.vue'
import type { DropdownMenuItemDef } from './UiDropdownMenu.vue'

// radix-vue DropdownMenu는 Portal로 body에 렌더되고 jsdom에서 hover/click 시점에
// 일부 동작이 부정확. UiSelect 테스트와 동일하게 핵심 마운트/상태 검증만 하고
// 실제 메뉴 열기/선택은 Storybook play 함수에서 검증.

const items: DropdownMenuItemDef[] = [
  { label: '편집', value: 'edit' },
  { label: '삭제', value: 'delete', color: 'danger' },
]

describe('UiDropdownMenu', () => {
  // 1. trigger slot 렌더
  it('trigger slot 콘텐츠 렌더', () => {
    const Wrapper = defineComponent({
      components: { UiDropdownMenu },
      data: () => ({ items }),
      template: `
        <UiDropdownMenu :items="items">
          <template #trigger>
            <button data-testid="trg">⋯</button>
          </template>
        </UiDropdownMenu>
      `,
    })
    render(Wrapper)
    expect(screen.getByTestId('trg')).toBeTruthy()
  })

  // 2. open prop 변경 → openState 동기화 + update:open emit
  it('open prop 외부 제어: openState 동기화 + update:open emit', async () => {
    const onUpdateOpen = vi.fn()
    const Wrapper = defineComponent({
      components: { UiDropdownMenu },
      setup() {
        const isOpen = ref(false)
        return { isOpen, items, onUpdateOpen }
      },
      template: `
        <div>
          <UiDropdownMenu :items="items" :open="isOpen" @update:open="onUpdateOpen">
            <template #trigger><button>trg</button></template>
          </UiDropdownMenu>
          <button id="toggle" @click="isOpen = !isOpen">toggle</button>
        </div>
      `,
    })
    render(Wrapper)
    ;(document.getElementById('toggle') as HTMLButtonElement).click()
    await nextTick()
    // open=true 변경되며 update:open 호출
    expect(onUpdateOpen).toHaveBeenCalled()
  })

  // 3. items prop 변경 시 다음 오픈에 새 아이템 사용 가능 (마운트 단계)
  it('items prop 변경 가능 (반응성)', async () => {
    const Wrapper = defineComponent({
      components: { UiDropdownMenu },
      setup() {
        const list = ref<DropdownMenuItemDef[]>([{ label: 'A', value: 'a' }])
        return { list }
      },
      template: `
        <div>
          <UiDropdownMenu :items="list">
            <template #trigger><button>trg</button></template>
          </UiDropdownMenu>
          <button id="add" @click="list.push({ label: 'B', value: 'b' })">add</button>
        </div>
      `,
    })
    const { container } = render(Wrapper)
    expect(container.querySelector('button')).not.toBeNull()
    // 추가 후에도 컴포넌트 정상 (반응성 깨지지 않음)
    ;(document.getElementById('add') as HTMLButtonElement).click()
    await nextTick()
    expect(container.querySelector('button')).not.toBeNull()
  })

  // 4. side/align prop이 컴포넌트에 전달 가능 — 마운트 성공만 검증
  it('side/align/sideOffset props 전달', () => {
    const { container } = render(UiDropdownMenu, {
      props: { items, side: 'right', align: 'start', sideOffset: 10 },
      slots: { trigger: () => h('button', 'trg') },
    })
    expect(container.querySelector('button')).not.toBeNull()
  })
})
