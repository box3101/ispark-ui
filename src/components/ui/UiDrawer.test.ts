import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import UiDrawer from './UiDrawer.vue'

describe('UiDrawer', () => {
  it('open=false일 때 렌더링하지 않는다', () => {
    const { queryByRole } = render(UiDrawer, {
      props: { open: false, title: '테스트' },
    })
    expect(queryByRole('dialog')).toBeNull()
  })

  it('open=true일 때 렌더링한다', () => {
    const { getByRole } = render(UiDrawer, {
      props: { open: true, title: '테스트' },
    })
    expect(getByRole('dialog')).toBeTruthy()
  })

  it('title이 표시된다', () => {
    const { getByText } = render(UiDrawer, {
      props: { open: true, title: '이슈 상세' },
    })
    expect(getByText('이슈 상세')).toBeTruthy()
  })

  it('닫기 버튼 클릭 시 update:open 이벤트를 발생시킨다', async () => {
    const { getByLabelText, emitted } = render(UiDrawer, {
      props: { open: true, title: '테스트' },
    })
    await fireEvent.click(getByLabelText('닫기'))
    expect(emitted()['update:open']).toBeTruthy()
    expect(emitted()['update:open'][0]).toEqual([false])
  })
})
