import { presentationLayouts, type PresentationLayoutId } from './layouts'
import {
  presentationTokens,
  colorUsage,
  roles,
  chartSeries,
  type RoleToken,
  type ColorToken,
} from './tokens'
import { contrastRatio, isLargeText, THRESHOLD } from './contrast'

const C = presentationTokens.colors

export type SlideSpec = {
  layout: PresentationLayoutId
  title: string
  subtitle?: string
  items?: unknown[]
  imageRatio?: number
  claims?: { text: string; verified: boolean; source?: string }[]
  /** 이 슬라이드가 쓰는 역할 토큰들. 색은 여기서만 들어온다 */
  roles?: { role: string; sizePt?: number; bold?: boolean; on?: string }[]
}

export type Issue = { code: string; severity: 'error' | 'warning'; message: string }

const HEX = /#?\b[0-9a-fA-F]{6}\b/

/**
 * 구조 제약 · 색 역할 · 대비를 본다.
 * 렌더 후의 시각적 넘침·겹침은 보지 않는다 — 그건 PNG 렌더 후 검사 몫이다.
 */
export function validatePresentationSlide(s: SlideSpec): Issue[] {
  const issues: Issue[] = []
  const layout = presentationLayouts[s.layout]

  if (!layout) {
    issues.push({ code: 'UNKNOWN_LAYOUT', severity: 'error', message: `알 수 없는 레이아웃: ${s.layout}` })
    return issues
  }
  if (!s.title?.trim()) {
    issues.push({ code: 'TITLE_REQUIRED', severity: 'error', message: '슬라이드 제목이 필요합니다.' })
  }

  // ===== 구조 =====
  if (s.imageRatio !== undefined) {
    const bad = !Number.isFinite(s.imageRatio) || s.imageRatio < 0 || s.imageRatio > layout.imageMax
    if (bad) {
      issues.push({
        code: 'IMAGE_RATIO', severity: 'warning',
        message: `이미지 비중이 레이아웃 상한(${layout.imageMax})을 넘습니다.`,
      })
    }
  }

  const count = s.items?.length ?? 0
  if ('items' in layout && count !== layout.items)
    issues.push({ code: 'ITEM_COUNT', severity: 'error', message: `항목이 ${layout.items}개여야 합니다. (현재 ${count})` })
  if ('itemsMin' in layout && count < layout.itemsMin)
    issues.push({ code: 'ITEM_MIN', severity: 'error', message: `항목이 최소 ${layout.itemsMin}개 필요합니다. (현재 ${count})` })
  if ('itemsMax' in layout && count > layout.itemsMax)
    issues.push({ code: 'ITEM_MAX', severity: 'error', message: `항목이 너무 많습니다. 최대 ${layout.itemsMax}개. (현재 ${count})` })

  // ===== 색: 원시 HEX 금지 =====
  // 스펙에 HEX 를 허용하면 "왜 이 색인지"가 사라지고 대비 검사를 걸 수 없다.
  for (const [key, val] of Object.entries(s)) {
    if (typeof val === 'string' && HEX.test(val))
      issues.push({ code: 'RAW_HEX', severity: 'error', message: `${key} 에 원시 HEX 가 있습니다. 역할 토큰 이름을 쓰세요.` })
  }

  // ===== 색: 역할 · 용도 · 대비 =====
  for (const use of s.roles ?? []) {
    issues.push(...validateRoleUsage(use))
  }

  // ===== 근거 =====
  for (const c of s.claims ?? []) {
    if (!c.verified) issues.push({ code: 'UNVERIFIED_CLAIM', severity: 'warning', message: `근거 미확인: ${c.text}` })
    else if (!c.source?.trim()) issues.push({ code: 'SOURCE_REQUIRED', severity: 'warning', message: `증빙 출처 미기재: ${c.text}` })
  }

  return issues
}

/** 역할 하나의 쓰임을 검사한다 — 존재 · 용도 · 대비 */
export function validateRoleUsage(use: { role: string; sizePt?: number; bold?: boolean; on?: string }): Issue[] {
  const issues: Issue[] = []
  const spec = roles[use.role as RoleToken]

  if (!spec) {
    issues.push({ code: 'UNKNOWN_ROLE', severity: 'error', message: `알 수 없는 역할 토큰: ${use.role}` })
    return issues
  }
  if (!spec.fg) return issues // 면·보더 전용 역할은 대비 검사 대상이 아니다

  const sizePt = use.sizePt ?? spec.minPt ?? presentationTokens.typography.bodyPt
  const bold = use.bold ?? spec.bold ?? false

  // 역할이 정한 최소 크기보다 작게 쓰면 대비 전제가 깨진다
  if (spec.minPt !== undefined && sizePt < spec.minPt)
    issues.push({
      code: 'ROLE_MIN_SIZE', severity: 'error',
      message: `${use.role} 은 ${spec.minPt}pt 이상이어야 합니다. (현재 ${sizePt}pt)`,
    })

  // 용도 검사 — 본문 크기인데 largeText 전용 색이면 막는다
  const allowed = colorUsage[spec.fg]
  const needs: 'text' | 'largeText' = isLargeText(sizePt, bold) ? 'largeText' : 'text'
  if (!allowed.includes(needs))
    issues.push({
      code: 'COLOR_USAGE', severity: 'error',
      message: `${spec.fg} 는 ${needs} 로 쓸 수 없습니다. 허용: ${allowed.join(', ')}`,
    })

  // 대비 계산 — 배경은 on(역할 또는 토큰) → 역할 자신의 bg → 페이지 흰색 순
  const bgToken = resolveBackground(use.on, spec.bg)
  const ratio = contrastRatio(C[spec.fg], C[bgToken])
  const need = isLargeText(sizePt, bold) ? THRESHOLD.largeText : THRESHOLD.bodyText
  if (ratio < need)
    issues.push({
      code: 'CONTRAST', severity: 'error',
      message: `${use.role} (${spec.fg} on ${bgToken}) 대비 ${ratio.toFixed(2)} — ${need} 이상 필요`,
    })

  return issues
}

/** 배경 토큰 해석: 역할 이름이면 그 역할의 bg, 토큰 이름이면 그대로, 없으면 흰색 */
function resolveBackground(on?: string, fallback?: ColorToken): ColorToken {
  if (on) {
    const asRole = roles[on as RoleToken]
    if (asRole?.bg) return asRole.bg
    if (on in C) return on as ColorToken
  }
  return fallback ?? 'white'
}

/** 차트 시리즈 수 검사 — 색이 모자라면 장을 나눠야 한다 */
export function validateChartSeries(n: number): Issue[] {
  if (n <= chartSeries.length) return []
  return [{
    code: 'CHART_SERIES',
    severity: 'error',
    message: `차트 시리즈가 ${n}개입니다. 지정된 색은 ${chartSeries.length}개뿐이니 장을 나누세요.`,
  }]
}
