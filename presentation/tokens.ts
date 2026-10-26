/**
 * ISPark 제안 발표 토큰 — Vue 런타임과 독립. 팔레트의 단일 출처다.
 *
 * 색은 발주처 JDC의 공식 CI를 주조로 삼는다.
 * - CI 원본 값은 그대로 쓴다 (blue600 / blue500 / blue300 / taupe500)
 * - CI에 없는 짙은·옅은 단계만 CI 색상환 H=205°에서 파생한다
 * - 강조는 CI 블루의 보색 H=25°에서 가져온다 (차이 1.5°)
 *
 * 이전 팔레트(ivory #F7F5F0 / copper #C65B35)는 폐기했다.
 * 실제 제안서 3종 어디에도 그 계열이 없었고, 발주처 CI와도 무관한 값이었다.
 * 돌담·현무암 톤은 CI 서브3 taupe500 #918976이 대신한다.
 */

/** JDC 공식 CI — jdcenter.com/about/symbolsystem/symbol.cs */
export const jdcCI = {
  main: '#76B1E1',
  sub1: '#0290D5',
  sub2: '#006FBD',
  sub3: '#918976',
  sub4: '#000000',
} as const

export const presentationTokens = {
  canvas: { width: 13.333, height: 7.5, unit: 'in', aspectRatio: '16:9' },
  typography: { family: 'Pretendard', fallback: 'Arial', titlePt: 32, headingPt: 24, bodyPt: 18, footnotePt: 10 },
  spacing: { marginXIn: 0.65, marginYIn: 0.45, gapIn: 0.22 },
  colors: {
    /** 제목, 짙은 배경 — CI H205° 파생 (L 16%) · 흰 배경 대비 14.01 */
    navy900: '#092E49',
    /** 카드 헤더, 보조 배경 — CI H205° 파생 (L 24%) · 10.11 */
    navy700: '#124568',
    /** 주 강조·링크 — CI 서브2 원본 · 5.24 (본문 통과하는 유일한 CI 블루) */
    blue600: '#006FBD',
    /** 차트 2계열, 아이콘 — CI 서브1 원본 · 3.53 */
    blue500: '#0290D5',
    /** 보조 면 — CI 메인 원본 · 2.30 (배경 전용, 텍스트 금지) */
    blue300: '#76B1E1',
    /** 연한 카드 배경 — CI H205° 파생 (L 92%) */
    blue100: '#DFEDF6',
    /** 현무암·돌담 톤 — CI 서브3 원본 · 3.47 */
    taupe500: '#918976',
    /** 강조 텍스트 — 흰 배경 4.80 (AA). 본문 크기 강조는 반드시 이 단계로 */
    orange700: '#B85610',
    /** 배지 바탕(흰 글리프 가능), 보더·면 — CI 보색 H25° · 3.63 */
    orange500: '#D9641A',
    /** 그라디언트 밝은 쪽 — 장식 전용. 흰 글리프 얹으면 2.59라 바탕 금지 */
    orange400: '#F58220',
    /** 강조 카드 배경 */
    orange100: '#FDE3CA',
    /** 본문 */
    gray900: '#1F2937',
    /** 캡션, 출처 표기 */
    gray500: '#6B7684',
    /** 보더, 구분선 */
    gray200: '#E5E8EB',
    white: '#FFFFFF',
  },
  imageRules: { coverMaxRatio: 0.4, sectionMaxRatio: 0.3, contentMaxRatio: 0.12 },
} as const

export type PresentationTokens = typeof presentationTokens
export type PresentationColor = keyof typeof presentationTokens.colors

/** check.mjs·스토리에서 팔레트 정합을 검사할 때 쓰는 허용 목록 */
export const allowedHexes = Object.values(presentationTokens.colors) as readonly string[]
