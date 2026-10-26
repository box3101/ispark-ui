/**
 * 레이아웃 계산 — 순수 함수만 둔다. 컴포넌트에서 분리해 두면 단위 테스트가 쉽다.
 * (Slidev 테마들이 layoutHelper 를 따로 두는 것과 같은 이유)
 */

/**
 * 기준 캔버스 — A4 가로(10.83 × 7.5 in)를 96dpi 로 환산한 값.
 *
 * 실측: ISPark 제안서 pptx 는 9906000 × 6858000 EMU, JDC·우체국 PDF 는 780 × 540 pt.
 * 셋 다 비율 1.444 다. 16:9 가 아니라 A4 가로인 이유는 심사위원이 인쇄본으로도
 * 보기 때문이다. 16:9 로 만들면 4:3 프로젝터에서 축소돼 가뜩이나 빽빽한 내용이 더 작아진다.
 */
export const CANVAS = { width: 1040, height: 720, ratio: 1040 / 720 } as const

/** 실측에서 나온 격자 범위 — 이 밖이면 레이아웃을 잘못 고른 것이다 */
export const GRID_LIMITS = { minCols: 2, maxCols: 8, minRows: 1, maxRows: 9 } as const

export type Density = 'sparse' | 'normal' | 'dense' | 'overloaded'

/**
 * 셀 개수로 밀도를 판정한다.
 * 실측 본문 슬라이드는 도형 중앙값 23개(텍스트 9 + 구조 14), 세로 평균 6행이었다.
 * 그보다 성기면 "장표가 비어 보이고", 훨씬 넘기면 투사 거리에서 못 읽는다.
 */
export function gridDensity(cols: number, rows: number): Density {
  const cells = cols * rows
  if (cells <= 4) return 'sparse'
  if (cells <= 18) return 'normal'
  if (cells <= 36) return 'dense'
  return 'overloaded'
}

/** 격자 크기가 실측 범위 안인지 */
export function validateGrid(cols: number, rows: number): string | null {
  if (!Number.isInteger(cols) || !Number.isInteger(rows)) return '열·행은 정수여야 합니다.'
  if (cols < GRID_LIMITS.minCols || cols > GRID_LIMITS.maxCols)
    return `열은 ${GRID_LIMITS.minCols}~${GRID_LIMITS.maxCols} 사이여야 합니다. (현재 ${cols})`
  if (rows < GRID_LIMITS.minRows || rows > GRID_LIMITS.maxRows)
    return `행은 ${GRID_LIMITS.minRows}~${GRID_LIMITS.maxRows} 사이여야 합니다. (현재 ${rows})`
  if (gridDensity(cols, rows) === 'overloaded')
    return `셀이 ${cols * rows}개입니다. 투사 거리에서 읽히지 않습니다 — 장을 나누세요.`
  return null
}

/**
 * 열 폭 지정을 CSS grid-template-columns 로 바꾼다.
 * 숫자면 균등 분할, 'is-1-3' 같은 12분할 표기면 그 비율로.
 */
export function columnTemplate(spec: number | string): string {
  if (typeof spec === 'number') return `repeat(${spec}, minmax(0, 1fr))`
  const parts = spec.replace(/^is-/, '').split('-').map(Number)
  if (parts.some((n) => !Number.isFinite(n) || n <= 0)) return 'repeat(2, minmax(0, 1fr))'
  return parts.map((n) => `minmax(0, ${n}fr)`).join(' ')
}

/**
 * 셀이 많아질수록 글자를 줄인다. 단위는 cqw — 캔버스 폭에 비례한다.
 * 고정 px 로 두면 미리보기와 실제 투사 크기가 어긋난다.
 */
export function cellFontSize(cols: number): number {
  if (cols <= 2) return 1.5
  if (cols <= 3) return 1.35
  if (cols <= 4) return 1.2
  if (cols <= 6) return 1.05
  return 0.95
}
