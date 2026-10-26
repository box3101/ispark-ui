/**
 * 제안 장표 아이콘 어휘 — 의미가 먼저, 글리프는 그 다음.
 *
 * 장표에서 필요한 것은 "database 아이콘"이 아니라 "데이터 이관"이다.
 * 그래서 개념(key)을 고정하고 글리프는 갈아끼울 수 있게 둔다.
 * Font Awesome 이 svgs/ 와 metadata/icons.json 을 나눠 두는 것과 같은 이유다.
 *
 * 글리프는 Phosphor Icons(MIT)의 fill 웨이트를 쓴다. 고른 이유:
 *  - 전 아이콘이 256 정사각 그리드라 원형 배지에 나란히 놓아도 크기가 고르다
 *    (Font Awesome 은 높이 512 / 폭 448~640 가변이라 최대 1.43배까지 벌어진다)
 *  - path 명령 수 평균 34로 가장 단순해 투사 거리에서 덜 뭉개진다
 *    (Material Symbols 56, Font Awesome 35)
 *
 * 실제 path 데이터는 phosphor-glyphs.ts 에 있다 — `npm run build:proposal-icons` 로 생성한다.
 */

export type ProposalTone = 'orange' | 'blue'

export type ProposalConcept = {
  /** 장표에서 이 아이콘이 맡는 의미 */
  key: string
  label: string
  /** Phosphor fill 글리프 이름 */
  glyph: string
  /** orange=실행·강점 / blue=이해·검증 */
  tone: ProposalTone
  /** 검색어 */
  terms: string[]
  /** 전환 전 lucide 이름 — 추적용. 없으면 이번에 새로 들인 개념 */
  was?: string
}

export const proposalIcons: ProposalConcept[] = [
  // ===== 덱에서 이미 쓰던 11종 =====
  { key: 'data-migration', label: '데이터 이관', glyph: 'database', tone: 'blue', terms: ['데이터', '이관', '적재'], was: 'database' },
  { key: 'people', label: '인사·직무', glyph: 'users', tone: 'blue', terms: ['인사', '직무', '구성원'], was: 'users' },
  { key: 'quality', label: '품질 검증', glyph: 'shield-check', tone: 'orange', terms: ['품질', '검증', '보증'], was: 'shield-check' },
  { key: 'workflow', label: '업무 연계', glyph: 'flow-arrow', tone: 'blue', terms: ['업무', '연계', '흐름'], was: 'workflow' },
  { key: 'schedule', label: '수행 일정', glyph: 'calendar-dots', tone: 'blue', terms: ['일정', '기간', '마일스톤'], was: 'calendar-days' },
  { key: 'performance', label: '성과 지표', glyph: 'chart-line-up', tone: 'orange', terms: ['성과', '지표', 'KPI'], was: 'chart-no-axes-combined' },
  { key: 'verified', label: '확인 완료', glyph: 'check-circle', tone: 'orange', terms: ['확인', '완료', '점검'], was: 'check-circle-2' },
  { key: 'next', label: '다음 단계', glyph: 'arrow-right', tone: 'orange', terms: ['다음', '이행', '전환'], was: 'arrow-right' },
  { key: 'platform', label: '기술 기반', glyph: 'desktop-tower', tone: 'blue', terms: ['기술', '시스템', '기반'], was: 'monitor-cog' },
  { key: 'converted-data', label: '전환 데이터', glyph: 'arrows-clockwise', tone: 'blue', terms: ['전환', '변환', '동기화'], was: 'database-zap' },
  { key: 'mapping', label: '구조 매핑', glyph: 'git-diff', tone: 'blue', terms: ['매핑', '대조', '비교'], was: 'git-compare-arrows' },

  // ===== 제안서 표준 목차에서 필요한 13종 =====
  { key: 'understanding', label: '사업 이해', glyph: 'lightbulb', tone: 'orange', terms: ['이해', '배경', '통찰'] },
  { key: 'strategy', label: '추진 전략', glyph: 'strategy', tone: 'orange', terms: ['전략', '방향', '추진'] },
  { key: 'organization', label: '수행 조직', glyph: 'users-three', tone: 'blue', terms: ['조직', '팀', '체계'] },
  { key: 'staffing', label: '투입 인력', glyph: 'identification-badge', tone: 'blue', terms: ['인력', '투입', '이력'] },
  { key: 'risk', label: '위험 관리', glyph: 'warning-octagon', tone: 'orange', terms: ['위험', '리스크', '대응'] },
  { key: 'security', label: '보안', glyph: 'lock-key', tone: 'blue', terms: ['보안', '권한', '접근'] },
  { key: 'training', label: '교육', glyph: 'graduation-cap', tone: 'orange', terms: ['교육', '이관', '숙련'] },
  { key: 'deliverable', label: '산출물', glyph: 'files', tone: 'blue', terms: ['산출물', '문서', '제출'] },
  { key: 'stabilization', label: '안정화', glyph: 'heartbeat', tone: 'orange', terms: ['안정화', '운영', '모니터링'] },
  { key: 'maintenance', label: '하자 보수', glyph: 'wrench', tone: 'blue', terms: ['하자', '보수', '유지'] },
  { key: 'integration', label: '시스템 연계', glyph: 'plugs-connected', tone: 'blue', terms: ['연계', '인터페이스', '연동'] },
  { key: 'infrastructure', label: '인프라', glyph: 'hard-drives', tone: 'blue', terms: ['인프라', '서버', '자원'] },
  { key: 'testing', label: '테스트', glyph: 'test-tube', tone: 'orange', terms: ['테스트', '시험', '검사'] },
]

/** 개념 key → 정의 */
export const byKey = Object.fromEntries(proposalIcons.map((c) => [c.key, c])) as Record<string, ProposalConcept>

/** 전환 전 lucide 이름 → 개념 key. 옛 이름으로 쓰인 자리를 찾을 때 쓴다 */
export const fromLucide = Object.fromEntries(
  proposalIcons.filter((c) => c.was).map((c) => [c.was as string, c.key]),
) as Record<string, string>
