import { describe, it, expect } from 'vitest'
import { presentationTokens } from '../../presentation/tokens'
import {
  enterprisePalette,
  ciTokenMapping,
  contrastRatio,
} from './enterprise-palette'

describe('제안 팔레트 — 발주처 CI 정합', () => {
  it('CI 원본 4색이 토큰에 그대로 들어가 있다', () => {
    for (const { ci, token, hex } of ciTokenMapping) {
      expect(hex.toUpperCase(), `${token}은 CI ${ci}와 같아야 한다`).toBe(ci.toUpperCase())
    }
  })

  it('폐기한 ivory·copper 값이 남아 있지 않다', () => {
    const hexes = Object.values(presentationTokens.colors).map((h) => h.toUpperCase())
    for (const dead of ['#F7F5F0', '#C65B35', '#13263F', '#83909B', '#DDE1DF']) {
      expect(hexes).not.toContain(dead)
    }
  })

  it('팔레트가 토큰만 쓴다 — 설명용 배열에 토큰 밖 색이 섞이지 않는다', () => {
    const hexes = Object.values(presentationTokens.colors).map((h) => h.toUpperCase())
    for (const s of enterprisePalette) {
      expect(hexes, `${s.token}`).toContain(s.hex.toUpperCase())
    }
  })
})

describe('제안 팔레트 — 투사 대비', () => {
  const C = presentationTokens.colors

  it('본문·제목은 흰 배경에서 AA(4.5) 이상이다', () => {
    for (const hex of [C.gray900, C.navy900, C.navy700, C.blue600, C.orange700]) {
      expect(contrastRatio(hex, C.white)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('흰 글리프를 얹는 배지 바탕은 비텍스트 3:1을 넘는다', () => {
    for (const hex of [C.orange500, C.blue600, C.navy900, C.navy700]) {
      expect(contrastRatio(hex, C.white)).toBeGreaterThanOrEqual(3)
    }
  })

  it('orange400은 장식 전용 — 흰 글리프 바탕으로 쓰면 안 되는 값임을 고정한다', () => {
    // 이 단계가 3:1을 넘도록 바뀌면 orange500과 역할이 겹친다. 의도적으로 낮게 둔 값이다.
    expect(contrastRatio(C.orange400, C.white)).toBeLessThan(3)
  })

  it('blue300(CI 메인)은 배경 전용 — 텍스트 대비를 만족하지 않는다', () => {
    expect(contrastRatio(C.blue300, C.white)).toBeLessThan(3)
  })
})
