/**
 * 제안 장표 레이아웃 카탈로그 — 실제 제안서를 측정해서 정했다.
 *
 * id 는 snake_case 하나로 통일한다. 전에는 이 파일(camelCase), pipeline/check.mjs,
 * decks/*.json, 스토리가 저마다 다른 어휘를 써서 validator 가 실제 덱 페이지를
 * 영영 검증할 수 없었다 (겹치는 id 0개).
 *
 * 빈도는 ISPark 제안요약서 pptx 43장의 도형 좌표에서 센 값이다.
 * 본문 슬라이드 31장 기준: 도형 중앙값 23개(텍스트 9 + 구조 14), 세로 평균 6행.
 */

export type LayoutIntent =
  | 'single-message'
  | 'chapter-transition'
  | 'agenda'
  | 'parallel-concepts'
  | 'dense-matrix'
  | 'before-after'
  | 'sequence'
  | 'systems-and-data-flow'
  | 'claim-and-proof'
  | 'tabular'
  | 'closing'

export type LayoutSpec = {
  id: string
  intent: LayoutIntent
  /** 실측 빈도 (43장 중 몇 장) — 없으면 아직 덱에 안 나온 유형 */
  observed?: number
  /** 항목 수 제약 */
  items?: number
  itemsMin?: number
  itemsMax?: number
  maxHeadlineLines?: number
  maxBodyWords?: number
  /** 이미지가 차지할 수 있는 최대 면적 비율 */
  imageMax: number
}

export const presentationLayouts = {
  cover_split_image: { id: 'cover_split_image', intent: 'single-message', maxHeadlineLines: 2, maxBodyWords: 18, imageMax: 0.4 },
  section_minimal: { id: 'section_minimal', intent: 'chapter-transition', observed: 10, maxHeadlineLines: 2, maxBodyWords: 12, imageMax: 0.3 },
  agenda_list: { id: 'agenda_list', intent: 'agenda', itemsMin: 3, itemsMax: 8, imageMax: 0.12 },
  three_column_cards: { id: 'three_column_cards', intent: 'parallel-concepts', observed: 3, items: 3, imageMax: 0.12 },
  /** 실측 최다 구조 — 4~8열 × 4~9행. 본문 31장 중 12장이 5열 이상이었다 */
  matrix_grid: { id: 'matrix_grid', intent: 'dense-matrix', observed: 12, itemsMin: 4, itemsMax: 24, imageMax: 0.12 },
  two_column_comparison: { id: 'two_column_comparison', intent: 'before-after', observed: 7, items: 2, imageMax: 0.12 },
  timeline_horizontal: { id: 'timeline_horizontal', intent: 'sequence', itemsMin: 3, itemsMax: 6, imageMax: 0.12 },
  architecture_flow: { id: 'architecture_flow', intent: 'systems-and-data-flow', imageMax: 0.12 },
  evidence_grid: { id: 'evidence_grid', intent: 'claim-and-proof', imageMax: 0.12 },
  /** 실측 8장(19%)인데 레이아웃이 아예 없었다 */
  data_table: { id: 'data_table', intent: 'tabular', observed: 8, imageMax: 0 },
  closing: { id: 'closing', intent: 'closing', maxHeadlineLines: 2, maxBodyWords: 18, imageMax: 0.3 },
} as const satisfies Record<string, LayoutSpec>

export type PresentationLayoutId = keyof typeof presentationLayouts

export const layoutIds = Object.keys(presentationLayouts) as PresentationLayoutId[]
