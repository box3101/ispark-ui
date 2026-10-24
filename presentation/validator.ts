import { presentationLayouts, type PresentationLayoutId } from './layouts'

export type SlideSpec = {
  layout: PresentationLayoutId
  title: string
  subtitle?: string
  items?: string[]
  imageRatio?: number
  claims?: { text: string; verified: boolean; source?: string }[]
}
export type Issue = { code: string; severity: 'error' | 'warning'; message: string }
const maxImage: Record<PresentationLayoutId, number> = {
  cover: 0.4, section: 0.3, threePillars: 0.12, comparison: 0.12,
  process: 0.12, architecture: 0.12, evidence: 0.12,
}
export function validatePresentationSlide(s: SlideSpec): Issue[] {
  const issues: Issue[] = []
  if (!s.title?.trim()) issues.push({ code: 'TITLE_REQUIRED', severity: 'error', message: '슬라이드 제목이 필요합니다.' })
  if (s.imageRatio !== undefined && (!Number.isFinite(s.imageRatio) || s.imageRatio < 0 || s.imageRatio > maxImage[s.layout]))
    issues.push({ code: 'IMAGE_RATIO', severity: 'warning', message: '레이아웃에 비해 이미지 비중이 큽니다.' })
  const layout = presentationLayouts[s.layout]
  if ('items' in layout && s.items?.length !== layout.items)
    issues.push({ code: 'ITEM_COUNT', severity: 'error', message: '레이아웃의 항목 개수를 확인하세요.' })
  if ('itemsMin' in layout && (s.items?.length ?? 0) < layout.itemsMin)
    issues.push({ code: 'ITEM_MIN', severity: 'error', message: '최소 프로세스 단계를 충족하지 못했습니다.' })
  if ('itemsMax' in layout && (s.items?.length ?? 0) > layout.itemsMax)
    issues.push({ code: 'ITEM_MAX', severity: 'error', message: '프로세스 항목이 너무 많습니다.' })
  for (const c of s.claims ?? []) {
    if (!c.verified) issues.push({ code: 'UNVERIFIED_CLAIM', severity: 'warning', message: `근거 미확인: ${c.text}` })
    else if (!c.source?.trim()) issues.push({ code: 'SOURCE_REQUIRED', severity: 'warning', message: `증빙 출처 미기재: ${c.text}` })
  }
  return issues
}
