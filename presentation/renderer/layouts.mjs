/**
 * 레이아웃 레지스트리 — presentation/layouts.ts 의 id 하나당 그리기 함수 하나.
 *
 * 전에는 build.mjs 안의 if-chain 이었고 3종만 있었다. 나머지 8종은 throw 였다.
 * 레지스트리로 바꿔서 id 와 구현이 1:1 로 맞물리게 했다 — 빠지면 테스트가 잡는다.
 *
 * 좌표는 전부 캔버스 % 다. 실측(JDC PDF 6쪽 등)이 % 로 나와 있어서 그대로 옮기려는 것이고,
 * A4 가로든 다른 비율이든 theme.mjs 의 CANVAS 만 바꾸면 따라온다.
 */
import { COLOR as C, PT, SAFE, text, rect, circle } from './theme.mjs'

// ── 공통 크롬 ─────────────────────────────────────────────
/** 머리 칩 + 우상단 브랜드. 실측 본문 31장 중 28장(90%)이 상단 밴드를 갖고 있었다 */
function chrome(slide, spec) {
  const eyebrow = spec.eyebrow ?? ''
  if (eyebrow) {
    const [accent, main] = eyebrow.includes('·') ? eyebrow.split('·').map((s) => s.trim()) : [eyebrow, '']
    const parts = [{ text: accent, options: { color: C.orange500, bold: true } }]
    if (main) parts.push({ text: '  ·  ', options: { color: C.gray900 } }, { text: main, options: { color: C.blue600, bold: true } })
    text(slide, parts, { x: SAFE.x, y: SAFE.top, w: 60, h: 4 }, { size: PT.chip })
  }
  for (const [i, line] of (spec.brandLines ?? []).entries()) {
    text(slide, line, { x: 72, y: 2.2 + i * 2.3, w: 24.6, h: 2.2 }, { size: PT.subheadEn, color: C.blue300, align: 'right', bold: true })
  }
}

/** 제목 + 영문 서브헤드. 실측 제목 y 13.8%, 서브헤드 y 20.8% */
function heading(slide, spec) {
  if (spec.title) text(slide, spec.title, { x: SAFE.x, y: 13.2, w: 82, h: 7 }, { size: PT.title, bold: true, color: C.navy900 })
  if (spec.subheadEn) text(slide, spec.subheadEn, { x: SAFE.x + 0.1, y: 20.6, w: 50, h: 3 }, { size: PT.subheadEn, color: C.taupe500, charSpacing: 2 })
  if (spec.subtitle) text(slide, spec.subtitle, { x: SAFE.x, y: 24, w: 70, h: 4 }, { size: PT.body, color: C.gray500 })
}

/** 하단 결론 바. 실측은 31장 중 1장뿐 — 아껴 쓸 것 */
function conclusion(slide, pptx, spec) {
  if (!spec.conclusion) return
  rect(slide, pptx, { x: SAFE.x, y: 84, w: 100 - SAFE.x * 2, h: 6 }, C.navy900)
  text(slide, [
    { text: (spec.conclusionLabel ?? '핵심') + '   ', options: { bold: true, color: C.white } },
    { text: spec.conclusion, options: { color: C.blue100 } },
  ], { x: SAFE.x + 1.2, y: 85.6, w: 92, h: 3 }, { size: PT.tagline, valign: 'mid' })
}

function footer(slide, spec, index) {
  text(slide, spec.footerLeft ?? 'ISPark · 사람이 있는 디지털 변화', { x: SAFE.x, y: 95.2, w: 50, h: 3 },
    { size: PT.footer, color: C.gray500, charSpacing: 1 })
  if (spec.footerRight)
    text(slide, spec.footerRight, { x: 50, y: 95.2, w: 100 - SAFE.x - 50, h: 3 },
      { size: PT.footer, color: C.gray500, align: 'right', charSpacing: 1 })
  else
    text(slide, String(index).padStart(2, '0'), { x: 90, y: 95.2, w: 100 - SAFE.x - 90, h: 3 },
      { size: PT.footer, color: C.gray500, align: 'right' })
}

/** 본문 영역 — 머리와 꼬리를 뺀 나머지 */
const BODY = (spec) => ({ top: spec.title ? 29 : 22, bottom: spec.conclusion ? 82 : 92 })

// ── 레이아웃 ──────────────────────────────────────────────
const L = {}

L.cover_split_image = (slide, pptx, spec) => {
  rect(slide, pptx, { x: 62, y: 0, w: 38, h: 100 }, C.blue100)
  chrome(slide, spec)
  const el = (k) => spec.elements?.find((e) => e.kind === k)?.text ?? ''
  text(slide, el('project') || spec.title, { x: SAFE.x, y: 10, w: 55, h: 5 }, { size: PT.body, bold: true, color: C.navy900 })
  text(slide, el('headline') || spec.title, { x: SAFE.x, y: 32, w: 55, h: 18 }, { size: PT.title + 10, bold: true, color: C.navy900 })
  rect(slide, pptx, { x: SAFE.x, y: 54, w: 8, h: 0.5 }, C.orange500)
  if (el('subtitle')) text(slide, el('subtitle'), { x: SAFE.x, y: 59, w: 55, h: 10 }, { size: PT.cardTitle, color: C.gray900 })
  footer(slide, spec, 1)
}

L.section_minimal = (slide, pptx, spec, i) => {
  chrome(slide, spec)
  text(slide, spec.index ?? String(i).padStart(2, '0'), { x: SAFE.x, y: 30, w: 18, h: 22 },
    { size: PT.sectionNo, bold: true, color: C.orange500 })
  rect(slide, pptx, { x: SAFE.x, y: 54, w: 5, h: 0.5 }, C.navy900)
  text(slide, spec.title, { x: 22, y: 36, w: 72, h: 14 }, { size: PT.title + 6, bold: true, color: C.navy900 })
  if (spec.subtitle) text(slide, spec.subtitle, { x: 22, y: 52, w: 72, h: 5 }, { size: PT.cardTitle, color: C.gray500 })
  footer(slide, spec, i)
}

L.agenda_list = (slide, pptx, spec, i) => {
  chrome(slide, spec); heading(slide, spec)
  const items = spec.elements ?? []
  const b = BODY(spec)
  const cols = 2, rows = Math.ceil(items.length / cols)
  const cw = (100 - SAFE.x * 2 - 2) / cols
  const rh = Math.min(8, (b.bottom - b.top) / rows - 1)
  items.forEach((it, n) => {
    const cx = SAFE.x + (cw + 2) * (n % cols)
    const cy = b.top + (rh + 1) * Math.floor(n / cols)
    rect(slide, pptx, { x: cx, y: cy, w: 0.4, h: rh }, C.orange500)
    text(slide, String(n + 1).padStart(2, '0'), { x: cx + 1.4, y: cy + 0.6, w: 6, h: rh - 1 },
      { size: PT.cardTitle, bold: true, color: C.blue300, valign: 'mid' })
    text(slide, it.title, { x: cx + 7, y: cy + 0.4, w: cw - 16, h: rh / 2 },
      { size: PT.tagline, bold: true, color: C.navy900, valign: 'mid' })
    if (it.note) text(slide, it.note, { x: cx + 7, y: cy + rh / 2, w: cw - 16, h: rh / 2 },
      { size: PT.small, color: C.gray500, valign: 'mid' })
    if (it.rfpRef) text(slide, it.rfpRef, { x: cx + cw - 9, y: cy, w: 8.5, h: rh },
      { size: PT.footer, color: C.gray500, align: 'right', valign: 'mid' })
  })
  footer(slide, spec, i)
}

L.three_column_cards = (slide, pptx, spec, i) => {
  chrome(slide, spec); heading(slide, spec)
  const cards = (spec.elements ?? []).filter((e) => e.kind === 'pillar')
  if (cards.length !== 3) throw new Error(`three_column_cards 는 pillar 3개가 필요합니다 (현재 ${cards.length})`)
  const b = BODY(spec)
  const cw = (100 - SAFE.x * 2 - 4) / 3
  cards.forEach((card, n) => {
    const cx = SAFE.x + (cw + 2) * n
    rect(slide, pptx, { x: cx, y: b.top, w: cw, h: b.bottom - b.top }, C.white, C.gray200)
    rect(slide, pptx, { x: cx, y: b.top, w: cw, h: 0.6 }, n === 2 ? C.orange500 : C.blue600)
    text(slide, '0' + (n + 1), { x: cx + 2, y: b.top + 3, w: 8, h: 5 }, { size: PT.cardTitle, bold: true, color: C.orange700 })
    text(slide, card.title, { x: cx + 2, y: b.top + 10, w: cw - 4, h: 8 }, { size: PT.cardTitle, bold: true, color: C.navy900 })
    text(slide, card.description ?? '', { x: cx + 2, y: b.top + 20, w: cw - 4, h: 16 }, { size: PT.body, color: C.gray500 })
  })
  conclusion(slide, pptx, spec); footer(slide, spec, i)
}

/** 실측 최다 구조 — 열 머리 + 행 라벨 격자 */
L.matrix_grid = (slide, pptx, spec, i) => {
  chrome(slide, spec); heading(slide, spec)
  const cols = spec.columns ?? []
  const rows = spec.rows ?? []
  const b = BODY(spec)
  const labelW = 18
  const cw = (100 - SAFE.x * 2 - labelW - cols.length) / cols.length
  const headH = 4
  const rh = (b.bottom - b.top - headH - rows.length) / rows.length

  cols.forEach((c, n) => {
    text(slide, c, { x: SAFE.x + labelW + 1 + (cw + 1) * n, y: b.top, w: cw, h: headH },
      { size: PT.tagline, bold: true, color: C.blue600, align: 'center', valign: 'mid' })
  })
  rows.forEach((row, r) => {
    const ry = b.top + headH + (rh + 1) * r
    rect(slide, pptx, { x: SAFE.x, y: ry, w: labelW, h: rh }, C.navy900)
    text(slide, row.label, { x: SAFE.x + 1, y: ry, w: labelW - 2, h: rh },
      { size: PT.tagline, bold: true, color: C.white, valign: 'mid' })
    ;(row.cells ?? []).forEach((cell, n) => {
      const cx = SAFE.x + labelW + 1 + (cw + 1) * n
      const tone = cell.tone === 'orange' ? C.orange100 : cell.tone === 'blue' ? C.blue100 : C.white
      rect(slide, pptx, { x: cx, y: ry, w: cw, h: rh }, tone, C.gray200)
      text(slide, cell.text ?? String(cell), { x: cx + 1, y: ry + 0.8, w: cw - 2, h: rh / 2 },
        { size: PT.body, bold: true, color: cell.tone === 'orange' ? C.orange700 : C.navy900 })
      if (cell.note) text(slide, cell.note, { x: cx + 1, y: ry + rh / 2, w: cw - 2, h: rh / 2 - 0.5 },
        { size: PT.small, color: C.gray500 })
    })
  })
  conclusion(slide, pptx, spec); footer(slide, spec, i)
}

L.two_column_comparison = (slide, pptx, spec, i) => {
  chrome(slide, spec); heading(slide, spec)
  const pairs = spec.pairs ?? []
  const b = BODY(spec)
  const sideW = (100 - SAFE.x * 2 - 8) / 2
  const rightX = SAFE.x + sideW + 8
  const headH = 4
  text(slide, spec.beforeLabel ?? 'AS-IS', { x: SAFE.x, y: b.top, w: sideW, h: headH }, { size: PT.tagline, bold: true, color: C.gray500 })
  text(slide, spec.afterLabel ?? 'TO-BE', { x: rightX, y: b.top, w: sideW, h: headH }, { size: PT.tagline, bold: true, color: C.orange700 })
  const rh = (b.bottom - b.top - headH - pairs.length) / pairs.length
  pairs.forEach((p, n) => {
    const ry = b.top + headH + (rh + 1) * n
    rect(slide, pptx, { x: SAFE.x, y: ry, w: sideW, h: rh }, C.white, C.gray200)
    text(slide, p.before.title, { x: SAFE.x + 1.2, y: ry + 0.8, w: sideW - 2.4, h: rh / 2 }, { size: PT.body, bold: true, color: C.gray500 })
    if (p.before.note) text(slide, p.before.note, { x: SAFE.x + 1.2, y: ry + rh / 2, w: sideW - 2.4, h: rh / 2 - 0.5 }, { size: PT.small, color: C.gray500 })
    text(slide, '▶', { x: SAFE.x + sideW + 1, y: ry, w: 6, h: rh }, { size: PT.tagline, color: C.orange500, align: 'center', valign: 'mid' })
    rect(slide, pptx, { x: rightX, y: ry, w: sideW, h: rh }, C.orange100)
    text(slide, p.after.title, { x: rightX + 1.2, y: ry + 0.8, w: sideW - 2.4, h: rh / 2 }, { size: PT.body, bold: true, color: C.navy900 })
    if (p.after.note) text(slide, p.after.note, { x: rightX + 1.2, y: ry + rh / 2, w: sideW - 2.4, h: rh / 2 - 0.5 }, { size: PT.small, color: C.gray500 })
  })
  conclusion(slide, pptx, spec); footer(slide, spec, i)
}

/** 번호 원 + 레일. 실측은 화살표(12개)보다 원(67개)을 훨씬 많이 썼다 */
L.timeline_horizontal = (slide, pptx, spec, i) => {
  chrome(slide, spec); heading(slide, spec)
  const steps = spec.steps ?? []
  const b = BODY(spec)
  const cw = (100 - SAFE.x * 2 - (steps.length - 1) * 2) / steps.length
  const railY = b.top + 6
  rect(slide, pptx, { x: SAFE.x + cw / 2, y: railY, w: 100 - SAFE.x * 2 - cw, h: 0.3 }, C.blue100)
  steps.forEach((s, n) => {
    const cx = SAFE.x + (cw + 2) * n
    circle(slide, pptx, cx + cw / 2, railY + 0.15, 5.6, C.white, n === steps.length - 1 ? C.orange500 : C.blue600)
    text(slide, String(n + 1).padStart(2, '0'), { x: cx + cw / 2 - 4, y: railY - 1.8, w: 8, h: 4 },
      { size: PT.stepLabel, bold: true, color: n === steps.length - 1 ? C.orange700 : C.blue600, align: 'center', valign: 'mid' })
    const cy = railY + 6
    rect(slide, pptx, { x: cx, y: cy, w: cw, h: b.bottom - cy }, C.white, C.gray200)
    text(slide, s.title, { x: cx + 1, y: cy + 2, w: cw - 2, h: 6 }, { size: PT.cardTitle, bold: true, color: C.navy900, align: 'center' })
    if (s.note) text(slide, s.note, { x: cx + 1, y: cy + 9, w: cw - 2, h: 10 }, { size: PT.body, color: C.gray500, align: 'center' })
  })
  conclusion(slide, pptx, spec); footer(slide, spec, i)
}

/** 계층 구조 — 채널 / 서비스 / 데이터 / 인프라 같은 가로 띠 */
L.architecture_flow = (slide, pptx, spec, i) => {
  chrome(slide, spec); heading(slide, spec)
  const tiers = spec.tiers ?? []
  const b = BODY(spec)
  const th = (b.bottom - b.top - tiers.length) / tiers.length
  tiers.forEach((t, n) => {
    const ty = b.top + (th + 1) * n
    rect(slide, pptx, { x: SAFE.x, y: ty, w: 16, h: th }, C.navy700)
    text(slide, t.label, { x: SAFE.x + 1, y: ty, w: 14, h: th }, { size: PT.body, bold: true, color: C.white, valign: 'mid' })
    const boxes = t.boxes ?? []
    const bw = (100 - SAFE.x * 2 - 17 - boxes.length) / boxes.length
    boxes.forEach((bx, m) => {
      const x = SAFE.x + 17 + (bw + 1) * m
      rect(slide, pptx, { x, y: ty, w: bw, h: th }, n === 0 ? C.blue100 : C.white, C.gray200)
      text(slide, bx, { x: x + 0.8, y: ty, w: bw - 1.6, h: th }, { size: PT.body, color: C.navy900, align: 'center', valign: 'mid' })
    })
  })
  conclusion(slide, pptx, spec); footer(slide, spec, i)
}

/** 근거 격자 — 주장 + 검증 가능한 증거 */
L.evidence_grid = (slide, pptx, spec, i) => {
  chrome(slide, spec); heading(slide, spec)
  const items = spec.elements ?? []
  const b = BODY(spec)
  const cols = items.length <= 4 ? 2 : 3
  const rows = Math.ceil(items.length / cols)
  const cw = (100 - SAFE.x * 2 - (cols - 1) * 2) / cols
  const ch = (b.bottom - b.top - (rows - 1) * 2) / rows
  items.forEach((it, n) => {
    const x = SAFE.x + (cw + 2) * (n % cols)
    const y = b.top + (ch + 2) * Math.floor(n / cols)
    rect(slide, pptx, { x, y, w: cw, h: ch }, C.white, C.gray200)
    rect(slide, pptx, { x, y, w: 0.4, h: ch }, C.blue600)
    text(slide, it.title, { x: x + 1.6, y: y + 1.5, w: cw - 3, h: ch * 0.35 }, { size: PT.body, bold: true, color: C.navy900 })
    if (it.note) text(slide, it.note, { x: x + 1.6, y: y + ch * 0.4, w: cw - 3, h: ch * 0.35 }, { size: PT.small, color: C.gray500 })
    if (it.proof) text(slide, it.proof, { x: x + 1.6, y: y + ch - 4, w: cw - 3, h: 3 }, { size: PT.small, bold: true, color: C.orange700 })
  })
  conclusion(slide, pptx, spec); footer(slide, spec, i)
}

/** 표 — 실측 9개 중 최대가 16행 10열이었다. 네이티브 table 로 넣어 편집 가능하게 */
L.data_table = (slide, pptx, spec, i) => {
  chrome(slide, spec); heading(slide, spec)
  const b = BODY(spec)
  const cols = spec.columns ?? []
  const body = spec.rows ?? []
  const n = body.length
  const fs = n <= 6 ? PT.body : n <= 10 ? PT.small : n <= 14 ? 9 : 8
  const head = cols.map((c, ci) => ({
    text: c,
    options: { bold: true, color: C.white, fill: ci === spec.highlightColumn ? C.orange700 : C.navy900, align: 'center' },
  }))
  const rows = body.map((row) => row.map((cell, ci) => {
    const v = typeof cell === 'string' ? { text: cell } : cell
    return {
      text: v.text,
      options: {
        bold: ci === 0 || v.emphasis,
        color: v.emphasis ? C.orange700 : ci === 0 ? C.navy900 : C.gray900,
        fill: ci === spec.highlightColumn ? C.orange100 : ci === 0 ? C.blue100 : C.white,
      },
    }
  }))
  slide.addTable([head, ...rows], {
    x: (10.83 * SAFE.x) / 100, y: (7.5 * b.top) / 100,
    w: (10.83 * (100 - SAFE.x * 2)) / 100, h: (7.5 * (b.bottom - b.top)) / 100,
    fontFace: 'Pretendard', fontSize: fs, border: { type: 'solid', color: C.gray200, pt: 0.5 },
    valign: 'middle', margin: 4,
  })
  if (spec.caption) text(slide, spec.caption, { x: SAFE.x, y: b.bottom + 1, w: 80, h: 3 }, { size: PT.footer, color: C.gray500 })
  conclusion(slide, pptx, spec); footer(slide, spec, i)
}

L.closing = (slide, pptx, spec, i) => {
  rect(slide, pptx, { x: 0, y: 0, w: 100, h: 100 }, C.navy900)
  text(slide, spec.title, { x: SAFE.x + 4, y: 34, w: 80, h: 16 }, { size: PT.title + 8, bold: true, color: C.white })
  rect(slide, pptx, { x: SAFE.x + 4, y: 54, w: 8, h: 0.5 }, C.orange500)
  if (spec.subtitle) text(slide, spec.subtitle, { x: SAFE.x + 4, y: 59, w: 70, h: 8 }, { size: PT.cardTitle, color: C.blue300 })
  text(slide, spec.footerLeft ?? 'ISPark', { x: SAFE.x + 4, y: 88, w: 50, h: 3 }, { size: PT.footer, color: C.blue300, charSpacing: 1 })
  void i
}

export const layouts = L
export const layoutIds = Object.keys(L)
