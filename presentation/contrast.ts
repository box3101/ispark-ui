/**
 * WCAG 대비 계산 — 순수 함수만. 토큰·검증기·스토리가 같은 구현을 쓴다.
 *
 * 투사 환경이라 기준을 느슨하게 잡지 않는다.
 *  - 본문 텍스트        4.5:1  (WCAG 1.4.3 AA)
 *  - 큰 텍스트·아이콘    3.0:1  (18pt 이상 또는 bold 14pt 이상 / 1.4.11 비텍스트)
 */

/** #RRGGBB · RRGGBB · #RGB · #RRGGBBAA 를 받아 6자리 대문자로 */
export function normalizeHex(hex: string): string {
  const h = hex.replace('#', '').toUpperCase()
  if (h.length === 3) return h.split('').map((c) => c + c).join('')
  return h.slice(0, 6)
}

/** WCAG 상대 휘도 */
export function luminance(hex: string): number {
  const h = normalizeHex(hex)
  const ch = [0, 2, 4]
    .map((i) => parseInt(h.substr(i, 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]
}

/** 두 색의 대비비 — 1 ~ 21 */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

export const THRESHOLD = { bodyText: 4.5, largeText: 3, nonText: 3 } as const

export type ContrastVerdict = {
  ratio: number
  label: 'AAA' | 'AA' | '큰 글씨·아이콘' | '배경 전용'
  tone: 'pass' | 'warn' | 'fail'
}

export function contrastVerdict(ratio: number): ContrastVerdict {
  if (ratio >= 7) return { ratio, label: 'AAA', tone: 'pass' }
  if (ratio >= THRESHOLD.bodyText) return { ratio, label: 'AA', tone: 'pass' }
  if (ratio >= THRESHOLD.largeText) return { ratio, label: '큰 글씨·아이콘', tone: 'warn' }
  return { ratio, label: '배경 전용', tone: 'fail' }
}

/** 이 글자 크기가 '큰 텍스트'인가 — WCAG: 18pt 이상, 또는 bold 14pt 이상 */
export function isLargeText(sizePt: number, bold = false): boolean {
  return sizePt >= 18 || (bold && sizePt >= 14)
}

/** 텍스트가 그 배경 위에서 읽히는가 */
export function meetsTextContrast(fg: string, bg: string, sizePt: number, bold = false): boolean {
  const need = isLargeText(sizePt, bold) ? THRESHOLD.largeText : THRESHOLD.bodyText
  return contrastRatio(fg, bg) >= need
}
