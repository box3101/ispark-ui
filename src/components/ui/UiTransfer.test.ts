import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import UiTransfer from './UiTransfer.vue'

const items = [
  { id: 'a', label: '관리자' }, { id: 'b', label: '담당자' },
  { id: 'locked', label: '고정 권한', disabled: true },
]
describe('UiTransfer', () => {
  it('대학 필터를 바꿔도 오른쪽 사용자는 유지하고 숨겨진 체크는 이동하지 않는다', async () => {
    const { rerender, emitted } = render(UiTransfer, { props: { items, modelValue: ['locked'], sourceFilter: (item: { id: string }) => item.id === 'a' } })
    await fireEvent.click(screen.getByRole('checkbox', { name: '관리자' }))
    await rerender({ sourceFilter: (item: { id: string }) => item.id === 'b' })
    expect(screen.queryByRole('checkbox', { name: '관리자' })).toBeNull()
    expect(screen.getByRole('checkbox', { name: '고정 권한' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '선택 항목 추가' }).hasAttribute('disabled')).toBe(true)
    await fireEvent.click(screen.getByRole('checkbox', { name: '담당자' }))
    await fireEvent.click(screen.getByRole('button', { name: '선택 항목 추가' }))
    expect(emitted()['update:modelValue']).toEqual([[['locked', 'b']]])
  })
  it('체크만으로는 이동하지 않고 추가 후 오른쪽에서 제외할 수 있다', async () => {
    const { emitted, rerender } = render(UiTransfer, { props: { items, modelValue: [] } })
    await fireEvent.click(screen.getByRole('checkbox', { name: '관리자' }))
    expect(emitted()['update:modelValue']).toBeUndefined()
    await fireEvent.click(screen.getByRole('button', { name: '선택 항목 추가' }))
    expect(emitted()['update:modelValue']).toEqual([[['a']]])
    await rerender({ modelValue: ['a'] })
    await fireEvent.click(screen.getByRole('checkbox', { name: '관리자' }))
    await fireEvent.click(screen.getByRole('button', { name: '선택 항목 제외' }))
    expect(emitted()['update:modelValue']).toEqual([[['a']], [[]]])
  })
  it('검색으로 숨겨진 체크 항목과 비활성 항목을 전체 이동에서 제외한다', async () => {
    const { emitted } = render(UiTransfer, { props: { items, modelValue: [], searchable: true, showAllControls: true } })
    await fireEvent.click(screen.getByRole('checkbox', { name: '관리자' }))
    await fireEvent.update(screen.getByRole('searchbox', { name: '추가 가능한 항목 검색' }), '담당자')
    expect(screen.getByRole('button', { name: '선택 항목 추가' }).hasAttribute('disabled')).toBe(true)
    await fireEvent.click(screen.getByRole('button', { name: '검색 결과 전체 추가' }))
    expect(emitted()['update:modelValue']).toEqual([[['b']]])
  })
  it('전체 이동은 비활성 항목을 유지하고 외부 선택 ID를 보존한다', async () => {
    const { emitted } = render(UiTransfer, { props: { items, modelValue: ['external'], showAllControls: true } })
    await fireEvent.click(screen.getByRole('button', { name: '전체 추가' }))
    expect(emitted()['update:modelValue']).toEqual([[['external', 'a', 'b']]])
  })
})
