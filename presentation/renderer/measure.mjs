/**
 * Pretendard 메트릭으로 텍스트가 상자에 들어가는지 미리 잰다.
 *
 * PowerPoint 는 파일을 열 때 자동 맞춤을 계산하므로, 넘치는지는 만든 쪽에서
 * 알 수 없다. 렌더해서 눈으로 보는 방법도 있지만 이 환경엔 LibreOffice 가 없고,
 * 무엇보다 **빌드 시점에 막는 편이 낫다** — 넘친 PPTX 를 만들고 나서 찾는 것보다.
 *
 * 한글은 대부분 전각이라 글자 수로 어림잡아도 되지만, 숫자·영문이 섞이면
 * 20% 넘게 틀린다. 그래서 실제 폰트 advance 를 쓴다.
 */
import * as fontkit from 'fontkit'
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const WEIGHTS = { regular: 'Pretendard-Regular.otf', bold: 'Pretendard-SemiBold.otf' }

/** 설치 위치가 환경마다 달라 몇 군데를 본다 */
const FONT_DIRS = [
  join(homedir(), 'AppData/Local/Microsoft/Windows/Fonts'),
  'C:/Windows/Fonts',
  '/usr/share/fonts/opentype/pretendard',
  '/Library/Fonts',
]

const cache = new Map()

function load(weight) {
  if (cache.has(weight)) return cache.get(weight)
  const file = WEIGHTS[weight]
  for (const dir of FONT_DIRS) {
    const p = join(dir, file)
    if (existsSync(p)) {
      const f = fontkit.openSync(p)
      cache.set(weight, f)
      return f
    }
  }
  cache.set(weight, null)
  return null
}

/** 폰트를 못 찾으면 측정을 건너뛴다 — 없다고 빌드를 막지는 않는다 */
export function fontAvailable() {
  return load('regular') !== null
}

/** 문자열의 가로폭(pt). 폰트가 없으면 null */
export function textWidthPt(str, sizePt, bold = false) {
  const font = load(bold ? 'bold' : 'regular')
  if (!font) return null
  let units = 0
  // layout() 은 문자열 전체를 한 번에 성형한다. 줄바꿈 문자는 따로 끊는다
  for (const line of String(str).split('\n')) {
    units = Math.max(units, font.layout(line).advanceWidth)
  }
  return (units / font.unitsPerEm) * sizePt
}

/**
 * 상자 폭에 맞춰 줄바꿈했을 때 몇 줄이 되는지.
 * 한글은 어절 단위로도, 글자 단위로도 끊긴다. 최악(글자 단위 아님)을 피하려고
 * 공백 기준으로 끊되, 한 어절이 상자보다 길면 그 어절은 글자 단위로 끊는다.
 */
export function lineCount(str, boxWidthPt, sizePt, bold = false) {
  const font = load(bold ? 'bold' : 'regular')
  if (!font || boxWidthPt <= 0) return null
  const em = font.unitsPerEm
  const w = (s) => (font.layout(s).advanceWidth / em) * sizePt

  let lines = 0
  for (const para of String(str).split('\n')) {
    const words = para.split(/(\s+)/).filter((t) => t !== '')
    let cur = ''
    lines += 1
    for (const token of words) {
      const next = cur + token
      if (w(next) <= boxWidthPt) { cur = next; continue }
      if (w(token) > boxWidthPt) {
        // 한 어절이 상자보다 길다 — 글자 단위로 흘린다
        for (const ch of token) {
          if (w(cur + ch) > boxWidthPt) { lines += 1; cur = ch } else cur += ch
        }
      } else {
        lines += 1
        cur = token.trimStart()
      }
    }
  }
  return lines
}

/** 기본 행간 — PowerPoint 기본값에 가깝게 */
export const LINE_HEIGHT = 1.2

/**
 * 상자에 들어가는가.
 * 반환: { fits, lines, neededPt, boxPt } — 폰트가 없으면 fits: null
 */
export function fitsBox(str, boxWPt, boxHPt, sizePt, bold = false) {
  const lines = lineCount(str, boxWPt, sizePt, bold)
  if (lines === null) return { fits: null, lines: null, neededPt: null, boxPt: boxHPt }
  const neededPt = lines * sizePt * LINE_HEIGHT
  return { fits: neededPt <= boxHPt, lines, neededPt, boxPt: boxHPt }
}
