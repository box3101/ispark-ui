import { describe, it, expect } from 'vitest'
import { presentationTokens } from '../../presentation/tokens'
import { presentationLayouts, layoutIds } from '../../presentation/layouts'
// @ts-expect-error — 렌더러는 빌드 단계 없는 plain ESM 이라 타입 선언이 없다
import { CANVAS, COLOR, PT, px, py } from '../../presentation/renderer/theme.mjs'
// @ts-expect-error — 위와 같음
import { layouts as rendererLayouts } from '../../presentation/renderer/layouts.mjs'

/**
 * 렌더러는 .ts 를 import 할 수 없어 theme.mjs 에 값을 손으로 옮겨 적는다.
 * 어긋나면 조용히 색·치수가 달라지므로 여기서 대조한다.
 */
describe('렌더러 테마 — tokens.ts 미러', () => {
  it('캔버스가 tokens.ts 와 같다', () => {
    expect(CANVAS.w).toBe(presentationTokens.canvas.width)
    expect(CANVAS.h).toBe(presentationTokens.canvas.height)
  })

  it('색이 전부 tokens.ts 와 같다 — pptxgenjs 규칙상 # 없는 6자리', () => {
    const src = presentationTokens.colors as Record<string, string>
    const mirror = COLOR as Record<string, string>
    expect(Object.keys(mirror).sort()).toEqual(Object.keys(src).sort())
    for (const [k, v] of Object.entries(mirror)) {
      expect(v, k).toMatch(/^[0-9A-F]{6}$/)
      expect(v, k).toBe(src[k].replace('#', '').toUpperCase())
    }
  })

  it('본문·각주 크기가 tokens.ts 타이포와 같다', () => {
    expect(PT.body).toBe(presentationTokens.typography.bodyPt)
    expect(PT.footer).toBe(presentationTokens.typography.footnotePt)
    expect(PT.title).toBe(presentationTokens.typography.titlePt)
  })

  it('16:9 시절 글자 크기가 남아 있지 않다', () => {
    // 이전 렌더러는 42pt 제목을 썼다. 실측은 24pt 다
    for (const [k, v] of Object.entries(PT as Record<string, number>)) {
      if (k === 'sectionNo') continue // 장 번호만 예외적으로 크다
      expect(v, k).toBeLessThanOrEqual(34)
    }
  })

  it('% → 인치 변환이 캔버스를 벗어나지 않는다', () => {
    expect(px(0)).toBe(0)
    expect(px(100)).toBeCloseTo(CANVAS.w, 3)
    expect(py(100)).toBeCloseTo(CANVAS.h, 3)
  })
})

describe('레이아웃 레지스트리', () => {
  it('카탈로그의 모든 id 에 구현이 있다', () => {
    const missing = layoutIds.filter((id) => typeof rendererLayouts[id] !== 'function')
    expect(missing, `구현 없는 레이아웃: ${missing.join(', ')}`).toHaveLength(0)
  })

  it('구현만 있고 카탈로그에 없는 레이아웃은 없다', () => {
    const extra = Object.keys(rendererLayouts).filter((id) => !(id in presentationLayouts))
    expect(extra, `카탈로그에 없는 구현: ${extra.join(', ')}`).toHaveLength(0)
  })

  it('11종이 모두 있다 — 전에는 3종뿐이었고 나머지는 throw 였다', () => {
    expect(layoutIds.length).toBe(11)
    expect(Object.keys(rendererLayouts)).toHaveLength(11)
  })
})
