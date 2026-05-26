import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

// Storybook manager(사이드바/툴바) — warm dark 테마
const theme = create({
  base: 'dark',

  // 브랜드 영역 (좌상단)
  brandTitle: 'ispark-ui',
  brandUrl: '/',
  brandTarget: '_self',

  // 컬러 토큰 — warm orange accent
  colorPrimary: '#d97757',
  colorSecondary: '#d97757',

  // 앱 배경 — 진한 warm dark + 살짝 elevated content
  appBg: '#1a1b1f',
  appContentBg: '#1f2026',
  appPreviewBg: '#ffffff', // 컴포넌트 데모 iframe은 라이트 유지
  appBorderColor: '#2a2c33',
  appBorderRadius: 6,

  // 폰트
  fontBase:
    '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

  // 텍스트 — warm light + 뮤트
  textColor: '#eaeae3',
  textMutedColor: '#8a8a82',
  textInverseColor: '#1a1b1f',

  // 상단 탭바 (Canvas/Docs 탭)
  barTextColor: '#8a8a82',
  barHoverColor: '#d97757',
  barSelectedColor: '#d97757',
  barBg: '#1f2026',

  // 입력(검색바 포함)
  inputBg: '#26282f',
  inputBorder: '#33363f',
  inputTextColor: '#eaeae3',
  inputBorderRadius: 8,
})

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
})
