import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // .d.ts 자동 생성 (vue-tsc 기반)
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.stories.ts',
        'src/main.ts',
        'src/App.vue',
        'src/Introduction.mdx',
      ],
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true, // 단일 .d.ts로 번들
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/utils/variables" as *;
          @use "@/styles/utils/mixins" as *;
        `,
      },
    },
  },
  build: {
    lib: {
      entry: resolve(fileURLToPath(new URL('./src', import.meta.url)), 'index.ts'),
      name: 'IsparkUi',
      fileName: (format) => (format === 'es' ? 'ispark-ui.js' : 'ispark-ui.cjs'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // peerDependencies는 번들 제외
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        // CSS 단일 파일로 (consumer가 ./style.css로 import)
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'ispark-ui.css'
          return assetInfo.name || 'asset'
        },
      },
    },
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
  },
})
