import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import UiTreeMenu from './UiTreeMenu.vue'

const items = [{ id: 'root', label: '전체 메뉴', children: [
  { id: 'group', label: '대학별관리', children: [{ id: 'leaf', label: '대학 및 담당자' }] },
  { id: 'disabled', label: '접근 불가', disabled: true },
  { id: 'other', label: '공지사항' },
] }]

describe('UiTreeMenu', () => {
  it('검색 시 부모 경로를 유지하고 검색 해제 시 원래 접힘 상태를 복원한다', async () => {
    render(UiTreeMenu, { props: { items } })
    const input = screen.getByRole('searchbox', { name: '메뉴 검색' })
    await fireEvent.update(input, '담당자')
    expect(screen.getAllByRole('treeitem')).toHaveLength(3)
    expect(screen.getByRole('treeitem', { name: '대학별관리' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '전체 접기' }).hasAttribute('disabled')).toBe(true)
    await fireEvent.update(input, '')
    expect(screen.getAllByRole('treeitem')).toHaveLength(1)
  })
  it('전체 펼치기와 접기가 동작하고 말단 선택만 emit한다', async () => {
    const { emitted } = render(UiTreeMenu, { props: { items } })
    await fireEvent.click(screen.getByRole('button', { name: '전체 펼치기' }))
    await fireEvent.click(screen.getByRole('treeitem', { name: '접근 불가' }))
    expect(emitted()['update:modelValue']).toBeUndefined()
    await fireEvent.click(screen.getByRole('treeitem', { name: '대학 및 담당자' }))
    expect(emitted()['update:modelValue']).toEqual([['leaf']])
    await fireEvent.click(screen.getByRole('button', { name: '전체 접기' }))
    expect(screen.getAllByRole('treeitem')).toHaveLength(1)
    expect(screen.getByRole('treeitem').tabIndex).toBe(0)
  })
  it('방향키로 펼침과 포커스 이동을 처리하며 비활성 항목을 건너뛴다', async () => {
    render(UiTreeMenu, { props: { items } })
    const root = screen.getByRole('treeitem', { name: '전체 메뉴' })
    root.focus()
    await fireEvent.keyDown(root, { key: 'ArrowRight' })
    await fireEvent.keyDown(root, { key: 'ArrowRight' })
    const group = screen.getByRole('treeitem', { name: '대학별관리' })
    expect(document.activeElement).toBe(group)
    await fireEvent.keyDown(group, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(screen.getByRole('treeitem', { name: '공지사항' }))
  })
})
