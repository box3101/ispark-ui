import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  // .mdx 포함 — Introduction 같은 문서 페이지 지원
  stories: [
    '../src/**/*.mdx',
    // 개별 데모는 메뉴에서 제외하고 Asset / Layout Library를 중심으로 제공합니다.
    '../src/**/!(ProposalIcon|Layouts|PresentationSystem|CourseAgenda|IllustratedAssets|IllustratedComparison|IllustratedStrategy).stories.@(ts|js)',
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
  // GitHub Pages 배포 시 base path 처리 (https://box3101.github.io/ispark-ui/)
  // 환경변수 BASE_URL이 있으면 그 값, 없으면 dev에선 '/' 사용
  viteFinal: async (config) => {
    if (process.env.BASE_URL) {
      config.base = process.env.BASE_URL
    }
    return config
  },
}

export default config
