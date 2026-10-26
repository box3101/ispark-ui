/**
 * 덱 스펙 → 편집 가능한 PPTX.
 *
 * 캔버스는 A4 가로(10.83 × 7.5 in). pptxgenjs 의 LAYOUT_WIDE(13.333 × 7.5)는
 * 16:9 라서 쓰면 실측 덱과 어긋난다 — JDC·우체국 PDF 780×540pt,
 * 제안서 pptx 9906000×6858000 EMU 모두 비율 1.444 였다.
 *
 * 레이아웃 구현은 layouts.mjs 의 레지스트리에 있다. 색·치수는 theme.mjs.
 * 전에는 이 파일 안의 if-chain 이었고 3종만 있었다 — 나머지는 throw 였다.
 *
 * 이미지로 굽지 않고 텍스트·도형을 개체로 넣는다. 열람자가 고칠 수 있어야 한다.
 *
 * 실행:
 *   cd presentation/renderer && npm install
 *   node build.mjs ../decks/jdc ../decks/jdc/deck.pptx
 */
import pptxgen from 'pptxgenjs'
import { readFileSync, mkdirSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { CANVAS } from './theme.mjs'
import { layouts } from './layouts.mjs'

const dir = resolve(process.argv[2] || 'presentation/decks/jdc')
const out = resolve(process.argv[3] || join(dir, 'deck.pptx'))
const outline = JSON.parse(readFileSync(join(dir, 'outline.json'), 'utf8'))

const pptx = new pptxgen()
pptx.defineLayout({ name: 'A4_LANDSCAPE', width: CANVAS.w, height: CANVAS.h })
pptx.layout = 'A4_LANDSCAPE'
pptx.author = 'ISPark Presentation System'
pptx.subject = outline.topic
pptx.lang = 'ko-KR'

const problems = []

for (const [i, entry] of outline.pages.entries()) {
  const id = String(i + 1).padStart(2, '0')
  const spec = JSON.parse(readFileSync(join(dir, 'pages', id + '.json'), 'utf8'))

  // outline 과 page 가 어긋나면 "목차에는 있는데 내용이 다른 장"이 된다
  for (const field of ['title', 'layout']) {
    if (entry[field] !== spec[field]) problems.push(`${id}: outline 의 ${field} 가 page 와 다릅니다`)
  }

  const draw = layouts[spec.layout]
  if (!draw) {
    problems.push(`${id}: 구현되지 않은 레이아웃 '${spec.layout}'`)
    continue
  }

  const slide = pptx.addSlide()
  slide.background = { color: 'FFFFFF' }
  try {
    draw(slide, pptx, spec, i + 1)
  } catch (e) {
    problems.push(`${id}: ${e.message}`)
  }
}

if (problems.length) {
  console.error('빌드 중단:\n  ' + problems.join('\n  '))
  process.exit(1)
}

mkdirSync(dirname(out), { recursive: true })
await pptx.writeFile({ fileName: out })
console.log(`Created: ${out}  (${outline.pages.length} slides, ${CANVAS.w}x${CANVAS.h}in)`)
