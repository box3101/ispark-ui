import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  // .mdx 포함 — Introduction 같은 문서 페이지 지원
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|js)',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  // public/ 폴더를 정적 자산으로 서빙 (아이콘 SVG 등)
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
    defaultName: 'Docs',
  },
}

export default config
