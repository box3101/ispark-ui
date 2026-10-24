#!/usr/bin/env node
/** GenOffice-inspired spec check: deterministic, zero external dependencies. */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
const deck = resolve(process.argv[2] || 'presentation/decks/jdc')
const problems = []
const issue = (where, code, message) => problems.push({ where, code, message })
function read(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')) }
  catch (e) { issue(path, 'READ', String(e.message)); return null }
}
const stylePath = join(deck, 'style.md')
if (!existsSync(stylePath)) issue('style.md', 'MISSING', 'Style specification required')
const style = existsSync(stylePath) ? readFileSync(stylePath, 'utf8') : ''
const palette = [...style.matchAll(/#[0-9a-fA-F]{6}\b/g)].map(m => m[0].toUpperCase())
const outline = read(join(deck, 'outline.json'))
const allowed = new Set(['cover_split_image','section_minimal','three_column_cards','two_column_comparison','timeline_horizontal','architecture_flow','evidence_grid'])
if (!outline?.core_hook?.trim()) issue('outline', 'HOOK', 'Deck must have a core hook')
if (!Array.isArray(outline?.pages) || !outline.pages.length) issue('outline', 'PAGES', 'Deck needs pages')
let previous = ''
for (const [index, entry] of (outline?.pages || []).entries()) {
  const id = String(index + 1).padStart(2, '0')
  const path = join(deck, 'pages', id + '.json')
  const page = read(path)
  if (!allowed.has(entry.layout)) issue(id, 'LAYOUT', 'Unsupported layout')
  if (entry.layout === previous && entry.type === 'content') issue(id, 'REPEAT', 'Avoid repeated content layout')
  previous = entry.layout
  if (!page) continue
  for (const field of ['title','type','layout'])
    if (entry[field] !== page[field]) issue(id, 'OUTLINE_MISMATCH', field + ' differs')
  const words = JSON.stringify(page)
  if (/lorem|XX%|TODO|TBD|임의 수치/i.test(words)) issue(id, 'PLACEHOLDER', 'Unverified placeholder')
  for (const m of words.matchAll(/#[0-9a-fA-F]{6}\b/g))
    if (!palette.includes(m[0].toUpperCase()) && !['#FFFFFF','#000000'].includes(m[0].toUpperCase()))
      issue(id, 'OFF_PALETTE', m[0])
  if (page.imageRatio > (page.type === 'cover' ? .4 : page.type === 'section' ? .3 : .12))
    issue(id, 'IMAGE_RATIO', 'Too much image content')
  for (const claim of page.claims || [])
    if (!claim.verified || !claim.source) issue(id, 'UNVERIFIED', claim.text)
}
const actual = existsSync(join(deck, 'pages')) ? readdirSync(join(deck, 'pages')).filter(x=>/^\d\d\.json$/.test(x)) : []
if (actual.length !== (outline?.pages?.length || 0)) issue('pages', 'COUNT', 'Page specs differ from outline')
const report = { valid: problems.length === 0, issues: problems, pages: outline?.pages?.length || 0 }
console.log(JSON.stringify(report,null,2))
if (!report.valid) process.exitCode = 1
