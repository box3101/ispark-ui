// presentation/icons/icon-map.ts 에 적힌 글리프를 Phosphor 저장소에서 받아
// presentation/icons/phosphor-glyphs.ts 를 생성한다.
//
// npm 의존성을 늘리지 않으려고 패키지 대신 path 데이터만 가져온다.
// presentation/ 은 npm 배포 대상이 아니고, 같은 데이터를 Vue 컴포넌트와
// PPTX 렌더러가 함께 써야 하므로 Vue 전용 패키지보다 이쪽이 맞다.
//
// 실행: npm run build:proposal-icons
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mapPath = join(root, 'presentation/icons/icon-map.ts')
const outPath = join(root, 'presentation/icons/phosphor-glyphs.ts')

// icon-map.ts 를 그대로 읽어 glyph 이름만 추출한다 (ts 파서 없이)
const mapSrc = readFileSync(mapPath, 'utf8')
const glyphs = [...new Set([...mapSrc.matchAll(/glyph:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]))].sort()
if (!glyphs.length) throw new Error('icon-map.ts 에서 glyph 이름을 찾지 못했습니다')

const url = (name) => `https://raw.githubusercontent.com/phosphor-icons/core/main/assets/fill/${name}-fill.svg`

const entries = []
const failed = []
for (const name of glyphs) {
  const res = await fetch(url(name))
  if (!res.ok) { failed.push(`${name} (HTTP ${res.status})`); continue }
  const svg = await res.text()
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1]
  const paths = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1])
  if (!viewBox || !paths.length) { failed.push(`${name} (파싱 실패)`); continue }
  // 그리드가 어긋나면 배지에서 크기가 들쭉날쭉해진다 — 받는 시점에 막는다
  if (viewBox !== '0 0 256 256') { failed.push(`${name} (예상 밖 viewBox: ${viewBox})`); continue }
  entries.push({ name, viewBox, paths })
}

if (failed.length) {
  console.error('받지 못한 글리프:\n  ' + failed.join('\n  '))
  process.exit(1)
}

const body = entries
  .map((e) => `  '${e.name}': { viewBox: '${e.viewBox}', paths: [\n${e.paths.map((d) => `    '${d}',`).join('\n')}\n  ] },`)
  .join('\n')

writeFileSync(outPath, `/**
 * 자동 생성 파일 — scripts/build-proposal-icons.mjs 로 생성.
 * 직접 고치지 말고 presentation/icons/icon-map.ts 를 바꾼 뒤 다시 생성할 것.
 *
 * 출처: Phosphor Icons (MIT) — https://github.com/phosphor-icons/core
 * 웨이트: fill · 그리드: 256 정사각 고정
 */

export type PhosphorGlyph = { viewBox: string; paths: string[] }

export const phosphorGlyphs: Record<string, PhosphorGlyph> = {
${body}
}
`)

mkdirSync(dirname(outPath), { recursive: true })
console.log(`Created: ${outPath} (${entries.length} glyphs)`)
