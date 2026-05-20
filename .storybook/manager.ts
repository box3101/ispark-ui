import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

// Storybook manager(사이드바/툴바) 테마 — 디자인 시스템 톤에 맞춰 정돈
const theme = create({
  base: 'light',

  // 브랜드 영역 (좌상단)
  brandTitle: 'ispark-ui',
  brandUrl: '/',
  brandTarget: '_self',

  // 컬러 토큰 — primary 매칭
  colorPrimary: '#3c69db',
  colorSecondary: '#3c69db',

  // 앱 배경/보더 — 살짝 톤다운으로 본문과 분리감
  appBg: '#fafbfc',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#eef0f3',
  appBorderRadius: 6,

  // 폰트 — Pretendard / JetBrains Mono 통일 (preview-head와 동일)
  fontBase:
    '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

  // 텍스트 — 본문 진하기·뮤트 톤
  textColor: '#1a1f2b',
  textMutedColor: '#6b7280',
  textInverseColor: '#ffffff',

  // 상단 탭바 (Canvas/Docs 탭)
  barTextColor: '#6b7280',
  barHoverColor: '#3c69db',
  barSelectedColor: '#3c69db',
  barBg: '#ffffff',

  // 입력(검색바 포함)
  inputBg: '#ffffff',
  inputBorder: '#e6e8ec',
  inputTextColor: '#1a1f2b',
  inputBorderRadius: 8,
})

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
})
