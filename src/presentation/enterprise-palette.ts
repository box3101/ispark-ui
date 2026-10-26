/**
 * JDC 제안 발표용 팔레트 — 발주처 CI를 주조로 삼아 도출.
 *
 * 근거 1. JDC 공식 CI (jdcenter.com/about/symbolsystem/symbol.cs) — 아래 ciReference
 * 근거 2. 제안서 3종 실측 색 분포 (아래 deckEvidence)
 * 근거 3. 배색 통념 — 주조 60% / 보조 30% / 강조 10% 이내, 한 장에 3색 이하
 * 근거 4. WCAG 대비 — 투사 환경이라 본문 4.5:1, 흰 글리프 배지는 비텍스트 3:1
 *
 * 설계 원칙: CI 값은 **그대로** 쓰고, CI에 없는 단계만 CI 색상환(H=205°)에서 파생한다.
 * 강조색은 CI 블루의 보색(H=25°)에서 가져왔다 — CI 밖이지만 임의값은 아니다.
 *
 * 색 값의 출처는 presentation/tokens.ts 하나뿐이다. 이 파일은 거기에 역할·근거 설명을 붙인다.
 * 이전 ivory·copper 팔레트는 폐기했고, 그 돌담·현무암 톤은 CI 서브3 taupe500 #918976이 잇는다.
 */

import { presentationTokens, jdcCI } from '../../presentation/tokens'

const C = presentationTokens.colors

export type Swatch = {
  token: string
  hex: string
  role: string
  /** 이 값이 어디서 나왔는지 — CI 원본인지 파생인지 구분한다 */
  source: string
  /** CI 문서에 그대로 실린 값인가 */
  fromCI: boolean
}

/** JDC 공식 CI — 공식 사이트에 실린 값 그대로 */
export const ciReference = [
  { role: '메인', hex: '#76B1E1', cmyk: '51.18.0.0', rgb: '118.177.225' },
  { role: '서브1', hex: '#0290D5', cmyk: '78.31.0.0', rgb: '2.144.213' },
  { role: '서브2', hex: '#006FBD', cmyk: '88.54.0.0', rgb: '0.111.189' },
  { role: '서브3', hex: '#918976', cmyk: '44.39.54.7', rgb: '145.137.118' },
  { role: '서브4', hex: '#000000', cmyk: '75.68.67.90', rgb: '0.0.0' },
]

/**
 * 실제 제안서가 CI를 따랐는지 대조한 결과.
 * CI 값과 정확히 일치하는 색은 220색 중 하나도 없었다.
 */
export const ciComplianceFindings = [
  { ci: '#76B1E1', note: '정확히 일치 0회. 가장 가까운 값 #8FAADC(9회, Δ26)' },
  { ci: '#0290D5', note: '정확히 일치 0회. 거리 30 이내 근사값도 없음' },
  { ci: '#006FBD', note: '정확히 일치 0회. #016EBC(6회, Δ2)·#0070C0(5회, Δ3) — 스포이드로 뜬 흔적' },
  { ci: '#918976', note: '정확히 일치 0회. 근사값도 없음 — 웜 그레이 계열 자체를 안 씀' },
]

/** 실제 제안서에서 센 색상 계열 분포 */
export const deckEvidence = [
  {
    deck: 'JDC 제안요약서 v1.1 (PDF)',
    unique: 220,
    families: [
      ['남색·네이비', 57.9], ['파랑·하늘', 25.3], ['무채색', 6.6],
      ['주황·호박', 4.7], ['빨강', 3.9], ['기타', 1.6],
    ] as [string, number][],
  },
  {
    deck: '우체국시설관리단 제안요약서 v1.0 (PDF)',
    unique: 111,
    families: [
      ['파랑·하늘', 25.8], ['남색·네이비', 24.1], ['무채색', 20.7],
      ['주황·호박', 12.8], ['빨강', 10.7], ['기타', 5.9],
    ] as [string, number][],
  },
  {
    deck: '성과관리(BSC) 제안요약서 v1.4 (PPTX)',
    unique: 140,
    families: [
      ['무채색', 72.9], ['파랑·하늘', 9.4], ['남색·네이비', 9.2],
      ['주황·호박', 3.3], ['빨강', 2.9], ['기타', 2.2],
    ] as [string, number][],
  },
]

/**
 * 색 값은 presentation/tokens.ts 에서 가져온다 — 여기서 다시 적지 않는다.
 * 이 배열은 토큰에 "역할"과 "출처" 설명을 붙여 문서화하는 용도다.
 */
export const enterprisePalette: Swatch[] = [
  // ===== 주조 — CI 색상환에서 파생, 제목·짙은 면 =====
  { token: 'navy900', hex: C.navy900, role: '제목, 짙은 배경', source: 'CI H205°에서 파생 (L 16%) — CI에 짙은 단계가 없어 보충', fromCI: false },
  { token: 'navy700', hex: C.navy700, role: '카드 헤더, 보조 배경', source: 'CI H205°에서 파생 (L 24%)', fromCI: false },

  // ===== 보조 — CI 원본 그대로 =====
  { token: 'blue600', hex: C.blue600, role: '주 강조, 링크, 차트 1계열', source: 'CI 서브2 원본 — 본문 대비 통과하는 유일한 CI 블루', fromCI: true },
  { token: 'blue500', hex: C.blue500, role: '차트 2계열, 아이콘', source: 'CI 서브1 원본', fromCI: true },
  { token: 'blue300', hex: C.blue300, role: '보조 면, 연한 강조', source: 'CI 메인 원본 — 대비 2.30이라 배경 전용', fromCI: true },
  { token: 'blue100', hex: C.blue100, role: '연한 카드 배경', source: 'CI H205°에서 파생 (L 92%)', fromCI: false },

  // ===== 중립 강조 — CI 서브3 =====
  { token: 'taupe500', hex: C.taupe500, role: '현무암·돌담 톤, 사진 위 캡션 면', source: 'CI 서브3 원본 — 폐기한 ivory·copper 계열의 출처로 추정', fromCI: true },

  // ===== 강조 — CI 블루의 보색, 10% 이내로만 =====
  { token: 'orange700', hex: C.orange700, role: '강조 텍스트', source: 'CI 보색 H25° — 본문 크기에서 AA(4.80)를 넘는 유일한 주황', fromCI: false },
  { token: 'orange500', hex: C.orange500, role: '배지 바탕(흰 글리프), 보더·면', source: 'CI 블루 보색 H25° (차이 1.5°) + 비텍스트 대비 3:1 충족', fromCI: false },
  { token: 'orange400', hex: C.orange400, role: '그라디언트 밝은 쪽 — 장식 전용', source: 'JDC 덱 실측. 흰 글리프 얹으면 2.59라 바탕 금지', fromCI: false },
  { token: 'orange100', hex: C.orange100, role: '강조 카드 배경', source: 'orange500에서 파생', fromCI: false },

  // ===== 무채색 =====
  { token: 'gray900', hex: C.gray900, role: '본문', source: 'JDC 덱 #3B3838 계열 정리', fromCI: false },
  { token: 'gray500', hex: C.gray500, role: '캡션, 출처 표기', source: '파생', fromCI: false },
  { token: 'gray200', hex: C.gray200, role: '보더, 구분선', source: '파생', fromCI: false },
  { token: 'white', hex: C.white, role: '카드, 본문 배경', source: '-', fromCI: false },
]

/** CI 원본 값이 토큰에 그대로 들어갔는지 — 어긋나면 테스트가 잡는다 */
export const ciTokenMapping = [
  { ci: jdcCI.main, token: 'blue300', hex: C.blue300 },
  { ci: jdcCI.sub1, token: 'blue500', hex: C.blue500 },
  { ci: jdcCI.sub2, token: 'blue600', hex: C.blue600 },
  { ci: jdcCI.sub3, token: 'taupe500', hex: C.taupe500 },
]

/** WCAG 상대 휘도 */
const luminance = (hex: string) => {
  const ch = [1, 3, 5]
    .map((i) => parseInt(hex.substr(i, 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]
}

/** 두 색의 대비비 — 1~21 */
export const contrastRatio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** 투사 환경 기준 판정 */
export const contrastVerdict = (ratio: number) =>
  ratio >= 7 ? { label: 'AAA', tone: 'pass' as const }
  : ratio >= 4.5 ? { label: 'AA', tone: 'pass' as const }
  : ratio >= 3 ? { label: '큰 글씨·아이콘', tone: 'warn' as const }
  : { label: '배경 전용', tone: 'fail' as const }
