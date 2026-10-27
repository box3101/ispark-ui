/**
 * 결정론 QA — 그린 기록을 받아 넘침·여백·대비를 센다.
 *
 * 보고서의 render-and-inspect 중 "결정론 검사" 부분이다.
 * 원래는 PPTX → PDF → PNG 로 렌더해서 보려 했지만 이 환경엔 LibreOffice 가 없다.
 * 그래서 **렌더 전에** 같은 질문에 답한다 — 어차피 넘친 PPTX 를 만들고 나서
 * 찾는 것보다 만들기 전에 막는 쪽이 낫다.
 *
 * 여기서 못 보는 것: 자동 맞춤(fit:'shrink')이 실제로 줄인 결과, 한글 줄바꿈의
 * 뷰어별 차이, 이미지 위 텍스트. 그건 최종 PowerPoint 렌더 1회 육안 확인 몫이다.
 */
import { CANVAS, COLOR, SAFE } from './theme.mjs'
import { fitsBox, fontAvailable } from './measure.mjs'

const IN_TO_PT = 72

/** 캔버스 % → pt */
const wPt = (pct) => (CANVAS.w * pct / 100) * IN_TO_PT
const hPt = (pct) => (CANVAS.h * pct / 100) * IN_TO_PT

// ── 대비 (presentation/contrast.ts 와 같은 공식. 렌더러는 .ts 를 못 읽어 다시 적는다) ──
function luminance(hex) {
  const h = hex.replace('#', '')
  const ch = [0, 2, 4]
    .map((i) => parseInt(h.substr(i, 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]
}
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const isLarge = (pt, bold) => pt >= 18 || (bold && pt >= 14)

/** 사각형 겹침 넓이 비율 (a 기준) */
function overlapRatio(a, b) {
  const x = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x))
  const y = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y))
  const area = a.w * a.h
  return area > 0 ? (x * y) / area : 0
}

/** 텍스트 뒤에 깔린 면 색 — 가장 많이 덮는 rect, 없으면 흰색 */
function backgroundOf(t, drawn) {
  let best = null
  let bestCover = 0.5 // 절반 이상 덮어야 "배경"으로 본다
  for (const d of drawn) {
    if (d.kind !== 'rect') continue
    const cover = overlapRatio(t, d)
    if (cover >= bestCover) { bestCover = cover; best = d }
  }
  return best?.fill ?? COLOR.white
}

/**
 * 슬라이드 한 장을 검사한다.
 * drawn: theme.mjs 가 기록한 배열. 좌표는 캔버스 %.
 */
export function inspectSlide(drawn, { page } = {}) {
  const issues = []
  const add = (code, message, extra = {}) => issues.push({ page, code, message, ...extra })
  const texts = drawn.filter((d) => d.kind === 'text' && d.text.trim())

  for (const t of texts) {
    const label = t.text.slice(0, 22)

    // 1) 캔버스 이탈
    if (t.x < -0.1 || t.y < -0.1 || t.x + t.w > 100.1 || t.y + t.h > 100.1)
      add('OUT_OF_CANVAS', `"${label}" 가 캔버스를 벗어납니다`)

    // 2) 안전 여백
    else if (t.x < SAFE.x - 0.1 || t.x + t.w > 100 - SAFE.x + 0.1)
      add('SAFE_MARGIN', `"${label}" 가 좌우 안전 여백(${SAFE.x}%)을 침범합니다`)

    // 3) 넘침 — 실제 Pretendard 메트릭으로 줄 수를 센다
    const fit = t.contrastOnly ? { fits: null } : fitsBox(t.text, wPt(t.w), hPt(t.h), t.size, t.bold)
    if (fit.fits === false)
      add('TEXT_OVERFLOW',
        `"${label}" 가 상자를 넘칩니다 — ${fit.lines}줄 필요 ${fit.neededPt.toFixed(1)}pt > 상자 ${fit.boxPt.toFixed(1)}pt`)

    // 4) 대비 — 뒤에 깔린 면 기준
    if (t.measureOnly) continue
    const bg = backgroundOf(t, drawn)
    const ratio = contrast(t.color, bg)
    const need = isLarge(t.size, t.bold) ? 3 : 4.5
    if (ratio < need)
      add('CONTRAST', `"${label}" ${t.color} on ${bg} 대비 ${ratio.toFixed(2)} — ${need} 이상 필요`)
  }

  // 5) 텍스트끼리 겹침 — 면 위의 텍스트는 정상이므로 text×text 만 본다
  const placed = texts.filter((t) => !t.contrastOnly)
  for (let i = 0; i < placed.length; i++) {
    for (let j = i + 1; j < placed.length; j++) {
      const r = overlapRatio(placed[i], placed[j])
      if (r > 0.3)
        add('TEXT_OVERLAP',
          `"${placed[i].text.slice(0, 14)}" 와 "${placed[j].text.slice(0, 14)}" 가 ${(r * 100).toFixed(0)}% 겹칩니다`)
    }
  }

  return issues
}

/** 전체 덱 리포트 */
export function report(perSlide) {
  const issues = perSlide.flatMap((s, i) => inspectSlide(s, { page: i + 1 }))
  const byCode = {}
  for (const x of issues) byCode[x.code] = (byCode[x.code] || 0) + 1
  return {
    fontMeasured: fontAvailable(),
    slides: perSlide.length,
    textsChecked: perSlide.reduce((n, s) => n + s.filter((d) => d.kind === 'text').length, 0),
    valid: issues.length === 0,
    byCode,
    issues,
  }
}
