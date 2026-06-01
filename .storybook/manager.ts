import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

// Storybook manager(사이드바/툴바) — warm light 테마
const theme = create({
  base: 'light',

  // 브랜드 영역 (좌상단)
  brandTitle: 'ispark-ui',
  brandUrl: './?path=/docs/get-started-introduction--docs',
  brandTarget: '_self',

  // 컬러 토큰 — warm orange accent
  colorPrimary: '#d97757',
  colorSecondary: '#d97757',

  // 앱 배경 — 깨끗한 라이트
  appBg: '#f8f9fa',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e6e8ec',
  appBorderRadius: 6,

  // 폰트
  fontBase:
    '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

  // 텍스트
  textColor: '#2d3142',
  textMutedColor: '#6b7280',
  textInverseColor: '#ffffff',

  // 상단 탭바 (Canvas/Docs 탭)
  barTextColor: '#6b7280',
  barHoverColor: '#d97757',
  barSelectedColor: '#d97757',
  barBg: '#ffffff',

  // 입력(검색바 포함)
  inputBg: '#f4f5f7',
  inputBorder: '#e0e3e8',
  inputTextColor: '#2d3142',
  inputBorderRadius: 8,
})

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
})
