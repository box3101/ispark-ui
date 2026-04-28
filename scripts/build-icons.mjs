// public/icons/svg/*.svg 를 읽어 base64 인라인된 _icons.custom.scss 생성
// → npm 배포 시 consumer가 SVG 별도 복사 안 해도 self-contained하게 동작
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svgDir = join(__dirname, '../public/icons/svg')
const outFile = join(__dirname, '../src/styles/icons/_icons.custom.scss')

const svgs = readdirSync(svgDir).filter((f) => f.endsWith('.svg'))

const lines = [
  '// 자동 생성 파일 — scripts/build-icons.mjs로 생성',
  '// SVG를 base64 인라인하여 npm 배포 시 self-contained하게 동작',
  '// 수정하려면 public/icons/svg/ 의 SVG를 변경하고 `npm run build:icons` 실행',
  '',
  '@mixin icon-svg-base64($data) {',
  '  display: inline-block;',
  '  vertical-align: middle;',
  '  flex-shrink: 0;',
  '  mask-image: url("data:image/svg+xml;base64,#{$data}");',
  '  mask-repeat: no-repeat;',
  '  mask-position: center;',
  '  mask-size: contain;',
  '  -webkit-mask-image: url("data:image/svg+xml;base64,#{$data}");',
  '  -webkit-mask-repeat: no-repeat;',
  '  -webkit-mask-position: center;',
  '  -webkit-mask-size: contain;',
  '  background-color: currentColor;',
  '}',
  '',
  '// ===== 등록된 아이콘 (자동 생성) =====',
]

for (const file of svgs) {
  const name = basename(file, '.svg')
  const content = readFileSync(join(svgDir, file))
  const b64 = content.toString('base64')
  lines.push(`.icon-${name} { @include icon-svg-base64('${b64}'); }`)
}

writeFileSync(outFile, lines.join('\n') + '\n', 'utf8')
// eslint-disable-next-line no-console
console.log(`✓ ${svgs.length}개 아이콘을 ${outFile}에 인라인 처리 완료`)
