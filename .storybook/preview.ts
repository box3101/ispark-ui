import type { Preview } from '@storybook/vue3'
import '../src/styles/main.scss'

// docs 테마(타이포·색)는 .storybook/preview-head.html 의 CSS 로 처리한다.
// @storybook/theming 의 create() 를 preview.ts 에서 import 하면 이 프로젝트
// Storybook 8.6.x CSF 인덱서가 깨지고, create() 없이 부분 ThemeVars 객체를
// docs.theme 로 넘기면 polished 색 함수가 크래시한다. 그래서 docs.theme 미사용.
const preview: Preview = {
  parameters: {
    // 스토리 기본 레이아웃 — 컴포넌트를 캔버스 중앙에 배치
    // (Introduction 카드 미리보기 iframe에서도 적용되어 시각적으로 균일)
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 사이드바 정렬 — 알파벳 대신 읽기 흐름 순서
    options: {
      storySort: {
        order: [
          'Get Started',
          [
            'Introduction',
            'Install',
            'Philosophy',
            'Stack',
            'Theming',
            'Migration',
          ],
          'Icons',
          ['Gallery'],
          'Components',
          [
            'Form',
            'Display',
            'Feedback',
            'Overlay',
            'Navigation',
            'Data',
          ],
        ],
      },
    },
  },
  // Vitest의 setProjectAnnotations에서 재사용됨
  tags: ['autodocs'],
}

export default preview
