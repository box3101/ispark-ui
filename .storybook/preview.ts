import type { Preview } from '@storybook/vue3'
import '../src/styles/main.scss'

// docs 테마(타이포·색)는 .storybook/preview-head.html 의 CSS 로 처리한다.
// @storybook/theming 의 create() 를 preview.ts 에서 import 하면 이 프로젝트
// Storybook 8.6.x CSF 인덱서가 깨지고, create() 없이 부분 ThemeVars 객체를
// docs.theme 로 넘기면 polished 색 함수가 크래시한다. 그래서 docs.theme 미사용.
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Vitest의 setProjectAnnotations에서 재사용됨
  tags: ['autodocs'],
}

export default preview
