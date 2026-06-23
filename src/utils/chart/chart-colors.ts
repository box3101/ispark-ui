/**
 * 차트 색상 팔레트 (ispark-ui 디자인 토큰 기반 범용 버전)
 *
 * team_agent_front 원본의 도메인 특화 세트(지역별·재무·심리분석 등)를 걷어내고,
 * ispark-ui 색상 토큰(primary/orange/success/error/warning/info)에 맞춘
 * 범용 카테고리 팔레트로 재구성했다.
 *
 * ⚠️ 키 경로(pie.secondary, pie.regionRatio, bar.set1, radar.set1 ...)는
 *    차트 모듈이 기본값으로 참조하므로 형태(배열/단색)를 그대로 유지한다.
 * @module ChartColors
 */

// ===== 기본 카테고리 팔레트 (8색) — var(--color-*) 톤과 조화 =====
const CATEGORY = [
  '#3c69db', // primary
  '#22c55e', // success
  '#ff7518', // orange
  '#a855f7', // purple
  '#06b6d4', // cyan
  '#f59e0b', // warning
  '#ec4899', // pink
  '#64748b', // secondary(gray)
]

// 연한 톤 (막대/파이 보조용)
const CATEGORY_SOFT = [
  '#9cc3f4', // soft blue
  '#a0e5bc', // soft green
  '#ffca80', // soft orange
  '#d6bbfb', // soft purple
  '#99ddff', // soft cyan
  '#cdd1d5', // soft gray
]

export const ChartColors = {
  // ===== 파이 차트 색상 =====
  pie: {
    primary: ['#3c69db', '#22c55e'], // 2색 (파랑·초록)
    secondary: ['#9cc3f4', '#ffca80'], // 2색 보조 (연파랑·연주황)
    taskStatus: ['#3c69db', '#22c55e', '#ff7518', '#a855f7', '#cdd1d5'], // 도넛 기본 5색
    empty: ['#cdd1d5'], // 빈값
    regionRatio: CATEGORY, // 다색 카테고리 (8색)
    workProgress: ['#cdd1d5', '#3c69db', '#22c55e', '#ef4444'], // 진행 상태 4색
  },

  // ===== 막대 차트 색상 =====
  bar: {
    set1: CATEGORY_SOFT.slice(0, 4), // 소프트 4색
    set2: ['#9cc3f4', '#ffb4a1'], // 2색
    set3: ['#ffca80', '#99ddff', '#a0e5bc', '#cdd1d5'], // 4색
    single: {
      primary: 'rgba(60, 105, 219, 0.3)', // 투명 파랑
      success: 'rgba(34, 197, 94, 0.3)', // 투명 초록
      warning: 'rgba(245, 158, 11, 0.3)', // 투명 주황
    },
  },

  // ===== 라인 차트 색상 =====
  line: {
    primary: 'rgba(60, 105, 219, 1)', // 파랑
    secondary: '#cdd1d5', // 회색
    success: '#22c55e', // 초록
    multi: ['#3c69db', '#ff7518', '#22c55e', '#a855f7'], // 다중 라인 4색
    compare: ['#3c69db', '#cdd1d5'], // 현재·이전 비교
  },

  // ===== 혼합 차트 색상 (바 + 라인) =====
  mixed: {
    set1: ['#9cc3f4', '#ff7518'], // 바: 연파랑, 라인: 주황
    set2: ['#ffca80', '#22c55e'], // 바: 주황, 라인: 초록
    set3: ['#99ddff', '#a855f7'], // 바: 하늘, 라인: 보라
  },

  // ===== 방사형(Radar) 차트 색상 =====
  radar: {
    primary: '#ff7518', // 주황 (강조)
    secondary: '#3c69db', // 파랑
    success: '#22c55e', // 초록
    danger: '#ef4444', // 빨강
    purple: '#a855f7', // 보라
    set1: ['#ff7518', '#3c69db'], // 본인 vs 평균
    set2: ['#a855f7', '#ff7518', '#22c55e'], // 3자 비교
    multi: CATEGORY, // 다중 8색
  },

  // ===== 상태 색상 (ispark 시멘틱 토큰) =====
  status: {
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#3b82f6',
  },

  // ===== 데이터 라벨 색상 =====
  label: {
    default: '#6f7a93', // 기본 (text-muted)
    highlight: '#3c69db', // 강조 (primary)
    dark: '#4d5462', // 진한 (text-primary)
  },
} as const
