/**
 * PPTX → PDF → PNG. 사람 눈과 VLM 리뷰에 쓸 썸네일을 만든다.
 *
 * 결정론 검사(넘침·여백·대비·겹침)는 qa.mjs 가 빌드 때 이미 끝낸다.
 * 여기서 보는 건 그걸로 못 잡는 것들이다 — 자동 맞춤이 실제로 줄인 결과,
 * 한글 줄바꿈이 어색한 자리, 전체적인 밀도와 위계.
 *
 * LibreOffice 가 필요하다. 없으면 설치 안내만 하고 조용히 끝낸다 —
 * 빌드를 막지 않는다. QA 본체는 LibreOffice 없이도 돌기 때문이다.
 *
 * 실행: node render.mjs <deck.pptx> [outDir]
 */
import { existsSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { basename, resolve, join } from 'node:path'

const CANDIDATES = [
  'soffice',
  'C:/Program Files/LibreOffice/program/soffice.exe',
  'C:/Program Files (x86)/LibreOffice/program/soffice.exe',
  '/usr/bin/soffice',
  '/Applications/LibreOffice.app/Contents/MacOS/soffice',
]

export function findSoffice() {
  for (const c of CANDIDATES) {
    if (c.includes('/') && existsSync(c)) return c
    if (!c.includes('/')) {
      try { execFileSync(c, ['--version'], { stdio: 'ignore' }); return c } catch { /* 다음 후보 */ }
    }
  }
  return null
}

const pptxPath = resolve(process.argv[2] || '')
const outDir = resolve(process.argv[3] || join(pptxPath, '..', 'preview'))

if (!existsSync(pptxPath)) {
  console.error(`PPTX 를 찾을 수 없습니다: ${pptxPath}`)
  process.exit(1)
}

const soffice = findSoffice()
if (!soffice) {
  console.log('LibreOffice 가 없어 미리보기 렌더를 건너뜁니다.')
  console.log('  설치하면 이 단계가 켜집니다: https://www.libreoffice.org/download/')
  console.log('  (넘침·대비·겹침 검사는 build.mjs 에서 이미 끝났습니다)')
  process.exit(0)
}

mkdirSync(outDir, { recursive: true })
execFileSync(soffice, ['--headless', '--convert-to', 'pdf', '--outdir', outDir, pptxPath], { stdio: 'inherit' })
const pdf = join(outDir, basename(pptxPath).replace(/\.pptx$/i, '.pdf'))
console.log(`PDF: ${pdf}`)

// PNG 는 있으면 쓰고 없으면 PDF 까지만 — pdftoppm 은 poppler 에 들어 있다
try {
  execFileSync('pdftoppm', ['-r', '110', '-png', pdf, join(outDir, 'slide')], { stdio: 'inherit' })
  console.log(`PNG: ${outDir}/slide-*.png`)
} catch {
  console.log('pdftoppm 이 없어 PNG 변환은 건너뜁니다 (PDF 는 생성됨).')
}
