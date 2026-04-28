import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

// Storybook 좌상단 브랜딩 + 페이지 타이틀
const theme = create({
  base: 'light',
  brandTitle: 'ispark-ui',
  brandUrl: '/',
  brandTarget: '_self',
  // 색상 — 우리 디자인 토큰 primary 매칭
  colorPrimary: '#3c69db',
  colorSecondary: '#3c69db',
})

addons.setConfig({
  theme,
})
