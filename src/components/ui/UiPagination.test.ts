import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiPagination from './UiPagination.vue'

describe('UiPagination', () => {
  // 1. 총 페이지 7 이하 — 전체 번호 표시, 말줄임 없음
  it('총 페이지 ≤ 7: 전체 번호 표시 + 말줄임 없음', () => {
    const { container } = render(UiPagination, {
      props: { modelValue: 1, totalCount: 35, pageSize: 10 }, // 4 페이지
    })
    const pageButtons = container.querySelectorAll('.ui-pagination-page')
    expect(pageButtons.length).toBe(4)
    expect(container.querySelector('.ui-pagination-ellipsis')).toBeNull()
  })

  // 2. 총 페이지 > 7 + 중간 페이지 — 양쪽 말줄임
  it('총 페이지 > 7 + 중간 페이지: 양쪽 말줄임', () => {
    const { container } = render(UiPagination, {
      props: { modelValue: 10, totalCount: 200, pageSize: 10 }, // 20 페이지, 현재 10
    })
    const ellipses = container.querySelectorAll('.ui-pagination-ellipsis')
    expect(ellipses.length).toBe(2)
    // 첫 페이지 1, 마지막 페이지 20 표시
    expect(screen.getByLabelText('1 페이지')).toBeTruthy()
    expect(screen.getByLabelText('20 페이지')).toBeTruthy()
  })

  // 3. 첫 페이지 — '이전' 비활성, 'A' 말줄임 없음
  it('첫 페이지: 이전 비활성', () => {
    const { container } = render(UiPagination, {
      props: { modelValue: 1, totalCount: 100, pageSize: 10 },
    })
    const prev = container.querySelector('[aria-label="이전 페이지"]') as HTMLButtonElement
    expect(prev.disabled).toBe(true)
  })

  // 4. 마지막 페이지 — '다음' 비활성
  it('마지막 페이지: 다음 비활성', () => {
    const { container } = render(UiPagination, {
      props: { modelValue: 10, totalCount: 100, pageSize: 10 },
    })
    const next = container.querySelector('[aria-label="다음 페이지"]') as HTMLButtonElement
    expect(next.disabled).toBe(true)
  })

  // 5. 페이지 번호 클릭 → update:modelValue + change emit
  it('페이지 번호 클릭: update:modelValue + change emit', async () => {
    const onUpdate = vi.fn()
    const onChange = vi.fn()
    const { container } = render(UiPagination, {
      props: {
        modelValue: 1,
        totalCount: 50,
        pageSize: 10,
        'onUpdate:modelValue': onUpdate,
        onChange,
      },
    })
    const btn = container.querySelector('[aria-label="3 페이지"]') as HTMLButtonElement
    await fireEvent.click(btn)
    expect(onUpdate).toHaveBeenCalledWith(3)
    expect(onChange).toHaveBeenCalledWith(3)
  })

  // 6. 다음 버튼 클릭 → modelValue + 1
  it('다음 버튼: modelValue + 1 emit', async () => {
    const onUpdate = vi.fn()
    const { container } = render(UiPagination, {
      props: {
        modelValue: 3,
        totalCount: 50,
        pageSize: 10,
        'onUpdate:modelValue': onUpdate,
      },
    })
    const next = container.querySelector('[aria-label="다음 페이지"]')!
    await fireEvent.click(next)
    expect(onUpdate).toHaveBeenCalledWith(4)
  })

  // 7. 현재 페이지 클릭 — 같은 값이므로 emit 안 됨
  it('현재 페이지 클릭: 같은 값이라 emit 미발생', async () => {
    const onUpdate = vi.fn()
    const { container } = render(UiPagination, {
      props: {
        modelValue: 2,
        totalCount: 50,
        pageSize: 10,
        'onUpdate:modelValue': onUpdate,
      },
    })
    const cur = container.querySelector('[aria-current="page"]')!
    await fireEvent.click(cur)
    expect(onUpdate).not.toHaveBeenCalled()
  })

  // 8. 범위 표시 — 'n-m / total' (3페이지 / pageSize 10 → 21-30 / 100)
  it('우측 범위 표시: pageStart-pageEnd / totalCount', () => {
    const { container } = render(UiPagination, {
      props: { modelValue: 3, totalCount: 100, pageSize: 10 },
    })
    const range = container.querySelector('.ui-pagination-range')!
    expect(range.textContent?.replace(/\s/g, '')).toBe('21-30/100')
  })

  // 9. 빈 상태 — totalCount 0 시 pageStart=0
  it('totalCount=0: pageStart=0', () => {
    const { container } = render(UiPagination, {
      props: { modelValue: 1, totalCount: 0 },
    })
    const range = container.querySelector('.ui-pagination-range')!
    expect(range.textContent?.replace(/\s/g, '')).toBe('0-0/0')
  })

  // 10. modelValue 외부 변경 → 화면 동기화 (aria-current 위치 이동)
  it('modelValue 외부 변경 시 aria-current=page 동기화', async () => {
    const Wrapper = defineComponent({
      setup() {
        const v = ref(1)
        return () => h('div', [
          h(UiPagination, { modelValue: v.value, totalCount: 100, pageSize: 10 }),
          h('button', { id: 'goto5', onClick: () => (v.value = 5) }, 'goto'),
        ])
      },
    })
    const { container } = render(Wrapper)
    const initial = container.querySelector('[aria-current="page"]')!
    expect(initial.textContent?.trim()).toBe('1')

    ;(document.getElementById('goto5') as HTMLButtonElement).click()
    await nextTick()
    const after = container.querySelector('[aria-current="page"]')!
    expect(after.textContent?.trim()).toBe('5')
  })
})
