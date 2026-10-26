import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import ProposalIcon from './ProposalIcon.vue'
import { proposalIcons, byKey, fromLucide } from '../../presentation/icons/icon-map'
import { phosphorGlyphs } from '../../presentation/icons/phosphor-glyphs'

describe('제안 아이콘 — 어휘와 글리프 정합', () => {
  it('모든 개념의 글리프가 생성되어 있다', () => {
    for (const c of proposalIcons) {
      expect(phosphorGlyphs[c.glyph], `${c.key} → ${c.glyph} 미생성. npm run build:proposal-icons`).toBeDefined()
    }
  })

  it('글리프가 전부 256 정사각 그리드다 — 배지에 나란히 놓아도 크기가 고르다', () => {
    for (const [name, g] of Object.entries(phosphorGlyphs)) {
      expect(g.viewBox, name).toBe('0 0 256 256')
      expect(g.paths.length, name).toBeGreaterThan(0)
    }
  })

  it('개념 key가 중복되지 않는다', () => {
    expect(Object.keys(byKey)).toHaveLength(proposalIcons.length)
  })

  it('덱에서 쓰던 lucide 이름 11종이 모두 개념으로 옮겨졌다', () => {
    const migrated = [
      'database', 'users', 'shield-check', 'workflow', 'calendar-days',
      'chart-no-axes-combined', 'check-circle-2', 'arrow-right',
      'monitor-cog', 'database-zap', 'git-compare-arrows',
    ]
    for (const name of migrated) {
      expect(fromLucide[name], `${name} 매핑 없음`).toBeDefined()
    }
  })
})

describe('제안 아이콘 — 렌더링', () => {
  it('개념을 주면 배지와 글리프를 그린다', () => {
    const { container } = render(ProposalIcon, { props: { concept: 'data-migration' } })
    const badge = container.querySelector('.proposal-icon')
    expect(badge).not.toBeNull()
    expect(badge?.classList.contains('variant-hero')).toBe(true)
    // data-migration 의 기본 톤은 blue
    expect(badge?.classList.contains('tone-blue')).toBe(true)
    expect(container.querySelectorAll('svg path').length).toBeGreaterThan(0)
  })

  it('tone을 넘기면 개념의 기본 톤을 덮어쓴다', () => {
    const { container } = render(ProposalIcon, { props: { concept: 'data-migration', tone: 'orange' } })
    expect(container.querySelector('.proposal-icon')?.classList.contains('tone-orange')).toBe(true)
  })

  it('모르는 개념이면 아무것도 그리지 않는다 — 깨진 배지를 남기지 않는다', () => {
    const { container } = render(ProposalIcon, { props: { concept: 'no-such-concept' } })
    expect(container.querySelector('.proposal-icon')).toBeNull()
  })

  it('size에 따라 글리프가 비례해 커진다', () => {
    const { container } = render(ProposalIcon, { props: { concept: 'quality', size: 100 } })
    // hero 비율 0.46 → 46
    expect(container.querySelector('svg')?.getAttribute('width')).toBe('46')
  })
})

describe('제안 아이콘 — inline은 CSS가 크기·색을 잡는다', () => {
  it('래퍼 없이 글리프만 내보낸다', () => {
    const { container } = render(ProposalIcon, { props: { concept: 'next', variant: 'inline' } })
    // 감싸는 span에 인라인 style로 크기가 박히면 바깥 CSS가 이길 수 없다
    expect(container.querySelector('.proposal-icon')).toBeNull()
    expect(container.querySelector('svg.proposal-glyph')).not.toBeNull()
  })

  it('size가 곧 글리프 크기다 — UiIcon과 같은 감각', () => {
    const { container } = render(ProposalIcon, { props: { concept: 'next', variant: 'inline', size: 28 } })
    const svg = container.querySelector('svg.proposal-glyph')
    expect(svg?.getAttribute('width')).toBe('28')
    expect(svg?.getAttribute('height')).toBe('28')
  })

  it('크기를 인라인 style로 박지 않는다 — CSS가 덮어쓸 수 있어야 한다', () => {
    const { container } = render(ProposalIcon, { props: { concept: 'next', variant: 'inline', size: 28 } })
    expect(container.querySelector('svg.proposal-glyph')?.getAttribute('style')).toBeNull()
  })

  it('글리프는 currentColor로 칠한다 — 부모가 색을 정한다', () => {
    const { container } = render(ProposalIcon, { props: { concept: 'next', variant: 'inline' } })
    for (const path of container.querySelectorAll('svg.proposal-glyph path')) {
      expect(path.getAttribute('fill')).toBe('currentColor')
    }
  })
})
