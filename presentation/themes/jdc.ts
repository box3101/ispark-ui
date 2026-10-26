import type { SlideSpec } from '../validator'
import { presentationTokens } from '../tokens'

export const jdcTheme = {
  id: 'jdc-ci-blue',
  name: 'JDC CI Blue',
  /** 주조 — CI 서브2 */
  primary: presentationTokens.colors.blue600,
  /** 강조 — CI 보색 */
  accent: presentationTokens.colors.orange500,
  photographicStyle: 'documentary close-up of Jeju basalt stone wall, natural neutral daylight, no artificial sunset',
  logoRules: { client: 'top-right', proposer: 'bottom-left', useOfficialAssetsOnly: true },
} as const
export const jdcExampleSlides: SlideSpec[] = [
  { layout: 'cover', title: '제주 돌담, 다시 쌓을 때', subtitle: '평가자산은 검증해 잇고, 인사·성과는 새롭게', imageRatio: 0.35 },
  { layout: 'section', title: 'JDC 제주 돌담을 살피다', subtitle: '사업 이해와 재구축 방향', imageRatio: 0.25 },
  { layout: 'threePillars', title: '기술과 제도를 함께 바꾸고, 평가자산은 검증해 잇습니다', items: ['기술 기반 고도화', '제도 변화 반영', '평가자산 검증·계승'], imageRatio: 0.05 },
]
