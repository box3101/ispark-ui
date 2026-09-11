import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Catalog from './IntroductionCatalog.vue'
import components from './introduction-components.json'

describe('Introduction catalog', () => {
  it('filters cards through UiTab and restores the full catalog', async () => {
    const { container } = render(Catalog)
    expect(container.querySelectorAll('.ispark-card')).toHaveLength(components.length)
    await fireEvent.click(screen.getByRole('tab', { name: 'Display' }))
    expect(screen.getByRole('tab', { name: 'Display' }).getAttribute('aria-selected')).toBe('true')
    expect(container.querySelectorAll('.ispark-card')).toHaveLength(components.filter(item => item.category === 'display').length)
    expect(container.querySelector('.ispark-card[href*="uibadge"]')).not.toBeNull()
    expect(container.querySelector('.ispark-card[href*="uibutton"]')).toBeNull()
    await fireEvent.click(screen.getByRole('tab', { name: '전체' }))
    expect(container.querySelectorAll('.ispark-card')).toHaveLength(components.length)
    expect(screen.getByRole('link', { name: '설치 및 사용법' }).getAttribute('href')).toContain('get-started-install--docs')
  })
})
