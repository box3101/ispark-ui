/**
 * ISPark 제안 발표 토큰 — Vue 런타임과 독립. 색과 캔버스의 단일 출처다.
 *
 * ── 캔버스
 * A4 가로(10.83 × 7.5 in, 비율 1.444)다. 16:9 가 아니다.
 * 실측: JDC·우체국 PDF 780 × 540 pt, 제안서 pptx 9906000 × 6858000 EMU — 셋 다 1.444.
 * 심사위원이 인쇄본으로도 보기 때문이고, 16:9 로 만들면 4:3 프로젝터에서 축소된다.
 * pptxgenjs 의 LAYOUT_WIDE(13.333 × 7.5 = 1.778)를 쓰면 안 된다.
 *
 * ── 색
 * 발주처 JDC 공식 CI 를 주조로 삼는다 (jdcenter.com/about/symbolsystem/symbol.cs).
 * CI 원본 값은 그대로 쓰고, 없는 단계만 CI 색상환 H=205° 에서 파생한다.
 * 강조는 CI 블루의 보색 H=25° 에서 가져왔다 (차이 1.5°).
 *
 * 스펙 JSON 은 `colors` 의 원시값이 아니라 `roles` 의 역할 이름만 쓴다.
 * 원시 HEX 를 직접 쓰면 "왜 이 색인지"가 사라지고, 대비 검사도 걸 수 없다.
 */

/** JDC 공식 CI — 공식 사이트에 실린 값 그대로 */
export const jdcCI = {
  main: '#76B1E1',
  sub1: '#0290D5',
  sub2: '#006FBD',
  sub3: '#918976',
  sub4: '#000000',
} as const

export const presentationTokens = {
  /** A4 가로. pptxgenjs 는 defineLayout 으로 직접 잡아야 한다 */
  canvas: { width: 10.83, height: 7.5, unit: 'in', ratio: 1.444, aspectRatio: 'A4-landscape' },
  typography: { family: 'Pretendard', fallback: 'Arial', titlePt: 24, headingPt: 18, bodyPt: 12, footnotePt: 7 },
  spacing: { marginXIn: 0.65, marginYIn: 0.45, gapIn: 0.22 },
  colors: {
    navy900: '#092E49',
    navy700: '#124568',
    blue600: '#006FBD',
    blue500: '#0290D5',
    blue300: '#76B1E1',
    blue100: '#DFEDF6',
    taupe500: '#918976',
    orange700: '#B85610',
    orange500: '#D9641A',
    orange400: '#F58220',
    orange100: '#FDE3CA',
    gray900: '#1F2937',
    gray500: '#6B7684',
    gray200: '#E5E8EB',
    white: '#FFFFFF',
  },
  imageRules: { coverMaxRatio: 0.4, sectionMaxRatio: 0.3, contentMaxRatio: 0.12 },
} as const

export type PresentationTokens = typeof presentationTokens
export type ColorToken = keyof typeof presentationTokens.colors

/**
 * 색마다 허용되는 쓰임.
 * 흰 배경 대비를 재서 정한 것이고, 실제 통과 여부는 validator 가 배경까지 보고 다시 계산한다.
 * 여기 목록은 "의도"이고, 대비 계산이 "판정"이다.
 */
export type ColorUsage = 'text' | 'largeText' | 'icon' | 'fill' | 'border' | 'decorative' | 'chart'

export const colorUsage: Record<ColorToken, ColorUsage[]> = {
  navy900: ['text', 'largeText', 'icon', 'fill'],      // 14.01
  navy700: ['text', 'largeText', 'icon', 'fill'],      // 10.11
  blue600: ['text', 'largeText', 'icon', 'chart', 'border'], // 5.24
  blue500: ['largeText', 'icon', 'chart'],             // 3.53 — 본문 불가
  blue300: ['fill', 'decorative'],                     // 2.30 — 배경 전용
  blue100: ['fill'],                                   // 1.19
  taupe500: ['largeText', 'icon', 'chart'],            // 3.47
  orange700: ['text', 'largeText'],                    // 4.80
  orange500: ['largeText', 'icon', 'fill', 'border'],  // 3.63 — 본문 불가
  orange400: ['decorative'],                           // 2.59 — 장식 전용
  orange100: ['fill'],                                 // 1.23
  gray900: ['text', 'largeText'],                      // 14.68
  gray500: ['text', 'largeText', 'icon'],              // 4.62
  gray200: ['border', 'fill'],
  white: ['text', 'largeText', 'fill'],
}

/**
 * 역할 토큰 — 스펙 JSON 이 쓰는 유일한 색 어휘.
 * fg/bg 는 ColorToken 이름이고, minPt·bold 는 대비 하한을 낮추기 위한 조건이다.
 */
export type RoleSpec = {
  fg?: ColorToken
  bg?: ColorToken
  border?: ColorToken
  /** 이 역할로 찍는 글자의 최소 크기 — 큰 텍스트 기준(3:1)을 쓰려면 필요 */
  minPt?: number
  bold?: boolean
}

export const roles = {
  'text.title': { fg: 'navy900', minPt: 18 },
  'text.heading': { fg: 'navy900', minPt: 14, bold: true },
  'text.body': { fg: 'gray900', minPt: 12 },
  'text.footnote': { fg: 'gray500', minPt: 7 },
  'text.emphasis': { fg: 'orange700', minPt: 12 },
  'text.link': { fg: 'blue600', minPt: 12 },
  'surface.page': { bg: 'white' },
  'surface.dark': { bg: 'navy900', fg: 'white', minPt: 12 },
  'surface.cardHeader': { bg: 'navy700', fg: 'white', minPt: 12 },
  'surface.neutralCard': { bg: 'blue100', fg: 'gray900', minPt: 12 },
  'surface.emphasisCard': { bg: 'orange100', fg: 'gray900', border: 'orange500', minPt: 12 },
  /**
   * 흰 글자 배지. orange500 과 흰색의 대비는 3.63 이라 본문 크기로는 안 된다.
   * bold 14pt 이상으로 강제해야 '큰 텍스트' 기준 3.0 을 적용할 수 있다.
   */
  'badge.emphasis': { bg: 'orange500', fg: 'white', minPt: 14, bold: true },
  'border.subtle': { border: 'gray200' },
} as const satisfies Record<string, RoleSpec>

export type RoleToken = keyof typeof roles

/** 차트 시리즈 순서 — 5개 이상이면 장을 나눈다 */
export const chartSeries: ColorToken[] = ['blue600', 'blue500', 'navy700', 'taupe500']

export const allowedHexes = Object.values(presentationTokens.colors) as readonly string[]
export const roleNames = Object.keys(roles) as RoleToken[]
