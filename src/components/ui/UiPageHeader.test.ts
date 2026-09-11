import { render, screen } from '@testing-library/vue'
import { it, expect } from 'vitest'
import UiPageHeader from './UiPageHeader.vue'
it('uses the requested heading level and preserves a zero count', () => {
  render(UiPageHeader, { props: { title: '목록', heading: 'h2', count: 0, description: '설명' }, slots: { actions: '<button>추가</button>' } })
  expect(screen.getByRole('heading', { level: 2, name: '목록' })).toBeTruthy()
  expect(screen.getByText('0')).toBeTruthy()
  expect(screen.getByRole('button', { name: '추가' })).toBeTruthy()
})
