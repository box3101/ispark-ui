import { describe, it, expect } from 'vitest'
// @ts-expect-error — 렌더러는 빌드 단계 없는 plain ESM 이라 타입 선언이 없다
import { inspectSlide, report } from '../../presentation/renderer/qa.mjs'
// @ts-expect-error — 위와 같음
import { textWidthPt, lineCount, fitsBox, fontAvailable } from '../../presentation/renderer/measure.mjs'

/** 캔버스 % 좌표로 텍스트 기록 하나를 만든다 */
const T = (over: Record<string, unknown> = {}) => ({
  kind: 'text', text: '테스트', x: 10, y: 10, w: 40, h: 8,
  size: 12, bold: false, color: '1F2937', ...over,
})
const R = (over: Record<string, unknown> = {}) => ({ kind: 'rect', x: 0, y: 0, w: 100, h: 100, fill: 'FFFFFF', ...over })

describe('폰트 메트릭', () => {
  it('Pretendard 를 찾는다', () => {
    // 못 찾으면 넘침 검사가 통째로 꺼지므로, 꺼진 사실 자체를 알아야 한다
    expect(fontAvailable()).toBe(true)
  })

  it('한글이 영문보다 넓다 — 글자 수로 어림잡으면 안 되는 이유', () => {
    const ko = textWidthPt('가나다라마', 12)
    const en = textWidthPt('abcde', 12)
    expect(ko).toBeGreaterThan(en * 1.5)
  })

  it('상자가 좁으면 줄 수가 늘어난다', () => {
    const wide = lineCount('무결점 데이터 이관과 무중단 전환', 300, 12)
    const narrow = lineCount('무결점 데이터 이관과 무중단 전환', 80, 12)
    expect(narrow).toBeGreaterThan(wide)
  })

  it('한 어절이 상자보다 길면 글자 단위로 끊는다 — 무한루프 없이', () => {
    const n = lineCount('가'.repeat(60), 40, 12)
    expect(n).toBeGreaterThan(1)
    expect(Number.isFinite(n)).toBe(true)
  })

  it('들어가는지 판정한다', () => {
    expect(fitsBox('짧은 글', 300, 40, 12).fits).toBe(true)
    expect(fitsBox('아주 긴 문장을 '.repeat(12), 120, 20, 12).fits).toBe(false)
  })
})

describe('결정론 QA — 잡아야 할 것을 잡는가', () => {
  it('문제가 없으면 조용하다', () => {
    expect(inspectSlide([R(), T({ text: '짧은 제목', size: 18, bold: true, color: '092E49' })])).toHaveLength(0)
  })

  it('상자를 넘치는 텍스트를 잡는다', () => {
    const issues = inspectSlide([R(), T({ text: '아주 긴 문장을 넣어서 반드시 넘치게 만든다 '.repeat(6), w: 20, h: 3 })])
    expect(issues.some((i: { code: string }) => i.code === 'TEXT_OVERFLOW')).toBe(true)
  })

  it('캔버스를 벗어난 텍스트를 잡는다', () => {
    const issues = inspectSlide([R(), T({ x: 85, w: 30 })])
    expect(issues.some((i: { code: string }) => i.code === 'OUT_OF_CANVAS')).toBe(true)
  })

  it('안전 여백을 침범하면 잡는다', () => {
    const issues = inspectSlide([R(), T({ x: 0.5, w: 20 })])
    expect(issues.some((i: { code: string }) => i.code === 'SAFE_MARGIN')).toBe(true)
  })

  it('뒤에 깔린 면 기준으로 대비를 잰다', () => {
    // gray900 는 흰 배경에서 14.68 이지만 navy900 면 위에서는 1.05 다
    const clean = inspectSlide([R(), T({ color: '1F2937' })])
    expect(clean.some((i: { code: string }) => i.code === 'CONTRAST')).toBe(false)

    const onDark = inspectSlide([R({ fill: '092E49' }), T({ color: '1F2937' })])
    expect(onDark.some((i: { code: string }) => i.code === 'CONTRAST')).toBe(true)
  })

  it('큰 텍스트는 3:1, 본문은 4.5:1 을 적용한다', () => {
    // orange500(3.63 on white): 12pt 는 실패, 18pt 는 통과
    const small = inspectSlide([R(), T({ color: 'D9641A', size: 12 })])
    expect(small.some((i: { code: string }) => i.code === 'CONTRAST')).toBe(true)

    const large = inspectSlide([R(), T({ color: 'D9641A', size: 18 })])
    expect(large.some((i: { code: string }) => i.code === 'CONTRAST')).toBe(false)
  })

  it('텍스트끼리 겹치면 잡는다 — 면 위의 텍스트는 정상이다', () => {
    const issues = inspectSlide([R(), T({ text: '앞', x: 10, y: 10 }), T({ text: '뒤', x: 12, y: 11 })])
    expect(issues.some((i: { code: string }) => i.code === 'TEXT_OVERLAP')).toBe(true)
  })

  it('서식 조각은 대비만, 합친 문자열은 넘침만 본다 — 거짓 양성 방지', () => {
    // 결론 바처럼 한 상자에 흰 글자와 연한 글자가 섞이는 경우
    const drawn = [
      R({ fill: '092E49', x: 5, y: 40, w: 90, h: 8 }),
      T({ text: '핵심   세 축을 하나로', x: 6, y: 41, w: 88, h: 4, color: '1F2937', measureOnly: true }),
      T({ text: '핵심', x: 6, y: 41, w: 88, h: 4, color: 'FFFFFF', contrastOnly: true }),
      T({ text: '세 축을 하나로', x: 6, y: 41, w: 88, h: 4, color: 'DFEDF6', contrastOnly: true }),
    ]
    const issues = inspectSlide(drawn)
    expect(issues.filter((i: { code: string }) => i.code === 'CONTRAST')).toHaveLength(0)
    expect(issues.filter((i: { code: string }) => i.code === 'TEXT_OVERLAP')).toHaveLength(0)
  })
})

describe('리포트', () => {
  it('페이지 번호와 코드별 집계를 담는다', () => {
    const r = report([[R(), T({ x: 0.5 })], [R(), T()]])
    expect(r.slides).toBe(2)
    expect(r.valid).toBe(false)
    expect(r.byCode.SAFE_MARGIN).toBe(1)
    expect(r.issues[0].page).toBe(1)
  })
})
