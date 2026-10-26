#!/usr/bin/env node
/**
 * 제안 자료 정합 검사 — 결정적, 외부 의존 없음.
 *
 * 두 가지를 본다.
 *  1) 덱 사양  — outline/pages 구조, 근거 미확인 주장, 이미지 비중
 *  2) 팔레트   — 덱 JSON뿐 아니라 렌더러·컴포넌트·CSS까지 토큰 밖 색이 없는지
 *
 * 팔레트의 출처는 presentation/tokens.ts 하나다. style.md 는 사람이 읽는 사본이라
 * 둘이 어긋나면 그것도 문제로 잡는다.
 *
 * 한계: hex 표기만 읽는다. rgb()/hsl()/색 이름으로 쓴 값은 못 잡으므로
 * 스캔 대상 파일에서는 hex(알파 포함 8자리까지)만 쓴다.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const deck = resolve(process.argv[2] || join(root, 'presentation/decks/jdc'))

const problems = []
const debts = []
const issue = (where, code, message) => problems.push({ where, code, message })

function read(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')) }
  catch (e) { issue(path, 'READ', String(e.message)); return null }
}

// ============================================
// 팔레트 — presentation/tokens.ts 가 단일 출처
// ============================================
const tokensPath = join(root, 'presentation/tokens.ts')
const tokensSrc = existsSync(tokensPath) ? readFileSync(tokensPath, 'utf8') : ''
if (!tokensSrc) issue('tokens.ts', 'MISSING', 'presentation/tokens.ts required')

/** colors 블록 안의 hex만 — jdcCI 상수와 섞이지 않게 범위를 좁힌다 */
const colorsBlock = tokensSrc.match(/colors:\s*\{([\s\S]*?)\n\s{2}\}/)?.[1] ?? ''
const palette = new Set([...colorsBlock.matchAll(/#([0-9a-fA-F]{6})\b/g)].map((m) => m[1].toUpperCase()))
if (palette.size < 5) issue('tokens.ts', 'PALETTE', 'Could not read the colors block')

/** 3자리 축약과 8자리 알파를 6자리 기준으로 정규화 */
const normalize = (hex) => {
  const h = hex.replace('#', '').toUpperCase()
  if (h.length === 3) return h.split('').map((c) => c + c).join('')
  return h.slice(0, 6)
}
const inPalette = (hex) => palette.has(normalize(hex))

// style.md 는 사람이 읽는 사본 — tokens.ts 와 같은 집합이어야 한다
const stylePath = join(deck, 'style.md')
if (!existsSync(stylePath)) issue('style.md', 'MISSING', 'Style specification required')
else {
  const listed = new Set([...readFileSync(stylePath, 'utf8').matchAll(/#([0-9a-fA-F]{6})\b/g)].map((m) => m[1].toUpperCase()))
  for (const hex of palette) if (!listed.has(hex)) issue('style.md', 'PALETTE_DRIFT', `#${hex} is in tokens.ts but not documented`)
  for (const hex of listed) if (!palette.has(hex)) issue('style.md', 'PALETTE_DRIFT', `#${hex} is documented but not a token`)
}

// ============================================
// 팔레트 스캔 — 렌더러·컴포넌트·CSS
// ============================================
/**
 * `debt`가 붙은 항목은 교체 예정이라 실패로 올리지 않고 따로 보고한다.
 * 교체가 끝나면 debt를 지워서 정식 검사 대상으로 되돌린다.
 * 지금은 비어 있다 — ProposalIcon 의 Phosphor 전환으로 미상환 17건이 해소됐다.
 */
const SCAN = [
  { path: 'presentation/renderer/build.mjs', style: 'bare' },
  { path: 'src/presentation/ProposalIcon.vue', style: 'hex' },
]

for (const target of SCAN) {
  const abs = join(root, target.path)
  if (!existsSync(abs)) { issue(target.path, 'MISSING', 'Scan target not found'); continue }
  const src = readFileSync(abs, 'utf8')
  // bare: pptxgenjs 가 쓰는 '#' 없는 따옴표 안 hex / hex: 보통의 #RGB·#RRGGBB·#RRGGBBAA
  const found = target.style === 'bare'
    ? [...src.matchAll(/'([0-9a-fA-F]{6})'/g)].map((m) => m[1])
    : [...src.matchAll(/#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)].map((m) => m[1])

  const off = [...new Set(found.filter((h) => !inPalette(h)))]
  for (const hex of off) {
    const entry = { where: relative(root, abs).replace(/\\/g, '/'), code: 'OFF_PALETTE', message: `#${hex}` }
    if (target.debt) debts.push({ ...entry, reason: target.debt })
    else problems.push(entry)
  }
}

// ============================================
// 덱 사양
// ============================================
const outline = read(join(deck, 'outline.json'))
// 레이아웃 목록도 layouts.ts 하나에서 읽는다 — 손으로 복사해 두면 또 어긋난다
const layoutsSrc = existsSync(join(root, 'presentation/layouts.ts')) ? readFileSync(join(root, 'presentation/layouts.ts'), 'utf8') : ''
const allowed = new Set([...layoutsSrc.matchAll(/^\s{2}(\w+):\s*\{\s*id:/gm)].map((m) => m[1]))
if (allowed.size < 5) issue('layouts.ts', 'LAYOUTS', 'Could not read the layout catalog')
if (!outline?.core_hook?.trim()) issue('outline', 'HOOK', 'Deck must have a core hook')
if (!Array.isArray(outline?.pages) || !outline.pages.length) issue('outline', 'PAGES', 'Deck needs pages')

let previous = ''
for (const [index, entry] of (outline?.pages || []).entries()) {
  const id = String(index + 1).padStart(2, '0')
  const page = read(join(deck, 'pages', id + '.json'))
  if (!allowed.has(entry.layout)) issue(id, 'LAYOUT', 'Unsupported layout')
  if (entry.layout === previous && entry.type === 'content') issue(id, 'REPEAT', 'Avoid repeated content layout')
  previous = entry.layout
  if (!page) continue
  for (const field of ['title', 'type', 'layout'])
    if (entry[field] !== page[field]) issue(id, 'OUTLINE_MISMATCH', field + ' differs')
  const words = JSON.stringify(page)
  if (/lorem|XX%|TODO|TBD|임의 수치/i.test(words)) issue(id, 'PLACEHOLDER', 'Unverified placeholder')
  for (const m of words.matchAll(/#([0-9a-fA-F]{6})\b/g))
    if (!inPalette(m[1])) issue(id, 'OFF_PALETTE', '#' + m[1])
  if (page.imageRatio > (page.type === 'cover' ? .4 : page.type === 'section' ? .3 : .12))
    issue(id, 'IMAGE_RATIO', 'Too much image content')
  for (const claim of page.claims || [])
    if (!claim.verified || !claim.source) issue(id, 'UNVERIFIED', claim.text)
}

const actual = existsSync(join(deck, 'pages')) ? readdirSync(join(deck, 'pages')).filter((x) => /^\d\d\.json$/.test(x)) : []
if (actual.length !== (outline?.pages?.length || 0)) issue('pages', 'COUNT', 'Page specs differ from outline')

const report = {
  valid: problems.length === 0,
  palette: [...palette].map((h) => '#' + h).sort(),
  scanned: SCAN.map((t) => t.path),
  issues: problems,
  debts,
  pages: outline?.pages?.length || 0,
}
console.log(JSON.stringify(report, null, 2))
if (!report.valid) process.exitCode = 1
