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

  // 4. aria-sort — sortable 컬럼은 'none' 기본, 비정렬 컬럼은 속성 자체가 없음
  it('aria-sort 접근성 속성: 비정렬 컬럼은 미렌더, 정렬 가능 컬럼은 토글에 따라 ascending/descending/none', async () => {
    const columns: TableColumn[] = [
      { key: 'name', label: '이름', align: 'left' },
      { key: 'score', label: '점수', align: 'right', sortable: true, sortType: 'number' },
    ]
    const data = [
      { name: 'A', score: '30' },
      { name: 'B', score: '10' },
    ]
    render(UiTable, { props: { columns, data } })
    await nextTick()

    const ths = document.querySelectorAll('thead th')
    // 비정렬 컬럼: aria-sort 속성 자체가 없어야 함 (undefined 바인딩 → 미렌더)
    expect(ths[0].hasAttribute('aria-sort')).toBe(false)
    // 정렬 가능 컬럼: 초기 'none'
    expect(ths[1].getAttribute('aria-sort')).toBe('none')

    // 1차 클릭 → ascending
    const btn = screen.getByRole('button', { name: /점수/ })
    await fireEvent.click(btn)
    await nextTick()
    expect(ths[1].getAttribute('aria-sort')).toBe('ascending')

    // 2차 클릭 → descending
    await fireEvent.click(btn)
    await nextTick()
    expect(ths[1].getAttribute('aria-sort')).toBe('descending')

    // 3차 클릭 → 다시 none
    await fireEvent.click(btn)
    await nextTick()
    expect(ths[1].getAttribute('aria-sort')).toBe('none')
  })

  // 5. uncontrolled selection — clickable=true 시 클릭한 행 자동 is-selected
  it('uncontrolled selection: clickable=true 시 클릭한 행 자동 is-selected', async () => {
    const columns: TableColumn[] = [
      { key: 'name', label: '이름', align: 'left' },
      { key: 'score', label: '점수', align: 'right' },
    ]
    const data = [
      { name: 'A', score: 1 },
      { name: 'B', score: 2 },
      { name: 'C', score: 3 },
    ]
    render(UiTable, { props: { columns, data, clickable: true } })
    await nextTick()

    const rows = document.querySelectorAll('tbody tr')
    // 초기엔 어느 행도 is-selected 아님
    expect(rows[0].classList.contains('is-selected')).toBe(false)
    expect(rows[1].classList.contains('is-selected')).toBe(false)

    // 두 번째 행(B) 클릭
    await fireEvent.click(rows[1])
    await nextTick()
    expect(rows[1].classList.contains('is-selected')).toBe(true)
    expect(rows[0].classList.contains('is-selected')).toBe(false)

    // 첫 행(A) 클릭 → A로 이동, B 해제
    await fireEvent.click(rows[0])
    await nextTick()
    expect(rows[0].classList.contains('is-selected')).toBe(true)
    expect(rows[1].classList.contains('is-selected')).toBe(false)
  })

  // 6. clickable=false면 클릭해도 uncontrolled selection 비활성
  it('clickable=false면 uncontrolled selection도 비활성', async () => {
    const columns: TableColumn[] = [{ key: 'name', label: '이름' }]
    const data = [{ name: 'A' }, { name: 'B' }]
    render(UiTable, { props: { columns, data, clickable: false } })
    await nextTick()

    const rows = document.querySelectorAll('tbody tr')
    await fireEvent.click(rows[0])
    await nextTick()
    expect(rows[0].classList.contains('is-selected')).toBe(false)
  })
})
