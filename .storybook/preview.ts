import type { Preview } from '@storybook/vue3'
import '../src/styles/main.scss'

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
