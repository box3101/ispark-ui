import { describe, it, expect } from 'vitest'
import {
  presentationTokens,
  colorUsage,
  roles,
  chartSeries,
  roleNames,
  type ColorToken,
} from '../../presentation/tokens'
import { contrastRatio, isLargeText, THRESHOLD } from '../../presentation/contrast'
import { validateRoleUsage, validateChartSeries, validatePresentationSlide } from '../../presentation/validator'

const C = presentationTokens.colors

describe('캔버스 — A4 가로', () => {
  it('실측 비율 1.444 다 (16:9 아님)', () => {
    const { width, height, ratio } = presentationTokens.canvas
    expect(width / height).toBeCloseTo(1.444, 2)
    expect(ratio).toBeCloseTo(1.444, 3)
    expect(width / height).not.toBeCloseTo(16 / 9, 2)
  })

  it('pptxgenjs LAYOUT_WIDE 치수가 아니다', () => {
    // LAYOUT_WIDE = 13.333 x 7.5. 이 값으로 되돌아가면 실측 덱과 어긋난다
    expect(presentationTokens.canvas.width).not.toBeCloseTo(13.333, 2)
  })
})

describe('역할 토큰', () => {
  it('모든 역할의 fg·bg·border 가 실재하는 색 토큰이다', () => {
    for (const name of roleNames) {
      const spec = roles[name]
      for (const key of ['fg', 'bg', 'border'] as const) {
        const token = spec[key as keyof typeof spec] as ColorToken | undefined
        if (token) expect(C, `${name}.${key}`).toHaveProperty(token)
      }
    }
  })

  it('모든 색 토큰에 허용 용도가 정의돼 있다', () => {
    for (const token of Object.keys(C) as ColorToken[]) {
      expect(colorUsage[token], token).toBeDefined()
      expect(colorUsage[token].length, token).toBeGreaterThan(0)
    }
  })

  it('역할마다 자기 기본 크기에서 대비를 만족한다', () => {
    for (const name of roleNames) {
      const spec = roles[name]
      if (!spec.fg) continue
      const sizePt = spec.minPt ?? presentationTokens.typography.bodyPt
      const bold = spec.bold ?? false
      const ratio = contrastRatio(C[spec.fg], C[spec.bg ?? 'white'])
      const need = isLargeText(sizePt, bold) ? THRESHOLD.largeText : THRESHOLD.bodyText
      expect(ratio, `${name} (${spec.fg} on ${spec.bg ?? 'white'})`).toBeGreaterThanOrEqual(need)
    }
  })

  it('badge.emphasis 는 bold 14pt 강제로만 성립한다', () => {
    // #D9641A + 흰 글자 = 3.63. 큰 텍스트 기준(3.0)은 넘지만 본문 기준(4.5)은 미달
    const ratio = contrastRatio(C.orange500, C.white)
    expect(ratio).toBeGreaterThanOrEqual(THRESHOLD.largeText)
    expect(ratio).toBeLessThan(THRESHOLD.bodyText)
    expect(roles['badge.emphasis'].minPt).toBe(14)
    expect(roles['badge.emphasis'].bold).toBe(true)
  })
})

describe('대비 린트', () => {
  it('본문 크기에 largeText 전용 색을 쓰면 막는다', () => {
    const issues = validateRoleUsage({ role: 'text.link', sizePt: 12 })
    expect(issues).toHaveLength(0) // blue600 5.24 — 통과

    // blue500(3.53)을 본문으로 쓰려는 상황을 역할로 흉내낸다
    const bad = validateRoleUsage({ role: 'badge.emphasis', sizePt: 10, bold: false })
    expect(bad.some((i) => i.code === 'ROLE_MIN_SIZE')).toBe(true)
    expect(bad.some((i) => i.code === 'CONTRAST')).toBe(true)
  })

  it('모르는 역할 이름은 오류다', () => {
    const issues = validateRoleUsage({ role: 'text.whatever' })
    expect(issues[0].code).toBe('UNKNOWN_ROLE')
  })

  it('짙은 면 위 흰 글자는 통과한다', () => {
    expect(validateRoleUsage({ role: 'surface.dark', sizePt: 12 })).toHaveLength(0)
    expect(validateRoleUsage({ role: 'surface.cardHeader', sizePt: 12 })).toHaveLength(0)
  })

  it('on 으로 배경을 바꾸면 그 배경으로 다시 계산한다', () => {
    // gray900(14.68 on white)도 navy900 위에서는 읽히지 않는다
    const issues = validateRoleUsage({ role: 'text.body', sizePt: 12, on: 'surface.dark' })
    expect(issues.some((i) => i.code === 'CONTRAST')).toBe(true)
  })
})

describe('스펙 린트', () => {
  it('원시 HEX 를 쓰면 막는다 — 역할 토큰만 허용', () => {
    const issues = validatePresentationSlide({
      layout: 'section_minimal', title: '#D9641A 로 강조',
    })
    expect(issues.some((i) => i.code === 'RAW_HEX')).toBe(true)
  })

  it('역할 토큰만 쓰면 통과한다', () => {
    const issues = validatePresentationSlide({
      layout: 'section_minimal',
      title: '끊어진 길을 다시 잇는 법',
      roles: [{ role: 'text.title', sizePt: 24 }, { role: 'text.body', sizePt: 12 }],
    })
    expect(issues).toHaveLength(0)
  })
})

describe('차트 시리즈', () => {
  it('지정된 색 수를 넘으면 장을 나누라고 한다', () => {
    expect(validateChartSeries(chartSeries.length)).toHaveLength(0)
    expect(validateChartSeries(chartSeries.length + 1)[0].code).toBe('CHART_SERIES')
  })
})
