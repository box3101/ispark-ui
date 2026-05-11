import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiTable from './UiTable.vue'
import type { TableColumn } from './UiTable.vue'

describe('UiTable', () => {
  // 1. sortType:'number' — 쉼표 포함 문자열을 숫자로 비교
  it('sortType:number — 쉼표 포함 문자열 숫자 정렬', async () => {
    const columns: TableColumn[] = [
      { key: 'name', label: '이름', align: 'left' },
      { key: 'amount', label: '금액', align: 'right', sortable: true, sortType: 'number' },
    ]
    const data = [
      { name: 'A', amount: '1,000' },
      { name: 'B', amount: '500' },
      { name: 'C', amount: '12,500' },
    ]
    render(UiTable, { props: { columns, data } })
    await nextTick()

    // 금액 헤더 클릭 → asc
    const btn = screen.getByRole('button', { name: /금액/ })
    await fireEvent.click(btn)
    await nextTick()

    // tbody 첫 행 = 가장 작은 값(500 = B)
    const rows = document.querySelectorAll('tbody tr')
    expect(rows[0].textContent).toContain('B')
    expect(rows[1].textContent).toContain('A')
    expect(rows[2].textContent).toContain('C')
  })

  // 2. columns 갱신 시 정렬 컬럼이 사라지면 sortState 리셋
  it('columns에서 정렬 컬럼 제거 시 sortState 자동 리셋', async () => {
    const Wrapper = defineComponent({
      setup() {
        const columns = ref<TableColumn[]>([
          { key: 'name', label: '이름' },
          { key: 'score', label: '점수', sortable: true, sortType: 'number' },
        ])
        const data = [
          { name: 'A', score: 30 },
          { name: 'B', score: 10 },
          { name: 'C', score: 20 },
        ]
        return () =>
          h('div', [
            h(UiTable, { columns: columns.value, data }),
            h('button', { id: 'shrink', onClick: () => (columns.value = [{ key: 'name', label: '이름' }]) }, 'shrink'),
          ])
      },
    })
    render(Wrapper)
    await nextTick()

    // 점수 헤더 클릭 → asc 적용 (B,C,A 순)
    const sortBtn = screen.getByRole('button', { name: /점수/ })
    await fireEvent.click(sortBtn)
    await nextTick()
    let rows = document.querySelectorAll('tbody tr')
    expect(rows[0].textContent).toContain('B')

    // columns 축소 → 점수 컬럼 제거 → sortState 리셋되어 원본 순서
    ;(document.getElementById('shrink') as HTMLButtonElement).click()
    await nextTick()
    rows = document.querySelectorAll('tbody tr')
    // 원본 순서: A, B, C
    expect(rows[0].textContent).toContain('A')
    expect(rows[1].textContent).toContain('B')
    expect(rows[2].textContent).toContain('C')
  })

  // 3. emptyText prop 커스텀 메시지
  it('data 빈 배열 + 커스텀 emptyText 렌더', async () => {
    render(UiTable, {
      props: {
        columns: [{ key: 'name', label: '이름' }],
        data: [],
        emptyText: '조회 결과가 없습니다.',
      },
    })
    await nextTick()
    expect(screen.getByText('조회 결과가 없습니다.')).toBeTruthy()
  })
})
