import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Multi-entry library builds extract shared component CSS into its own file.
    // Consumers import either entry stylesheet, so both must load shared CSS.
    {
      name: 'include-shared-library-css',
      generateBundle(_options, bundle) {
        const entryStyles = ['ispark-ui.css', 'presentation.css']
        const sharedStyles = Object.keys(bundle).filter(name => name.endsWith('.css') && !entryStyles.includes(name))
        const imports = sharedStyles.map(name => `@import "./${name}";`).join('\n')
        if (!imports) return
        for (const name of entryStyles) {
          const asset = bundle[name]
          if (asset?.type === 'asset') {
            const source = String(asset.source)
            const charset = source.match(/^@charset\s+[^;]+;/)?.[0] ?? ''
            asset.source = `${charset}${imports}\n${source.slice(charset.length)}`
          }
        }
      },
    },
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
          @use "@/styles/tokens/size" as *;
          @use "@/styles/tokens/shape" as *;
        `,
      },
    },
  },
  build: {
    lib: {
      // index: 기본 UI 컴포넌트 / presentation: 발표 장표(@leechanyong/ispark-ui/presentation)
      entry: {
        index: resolve(fileURLToPath(new URL('./src', import.meta.url)), 'index.ts'),
        presentation: resolve(fileURLToPath(new URL('./src', import.meta.url)), 'presentation/public/index.ts'),
      },
      name: 'IsparkUi',
      fileName: (format, entryName) => {
        const base = entryName === 'index' ? 'ispark-ui' : entryName
        return format === 'es' ? `${base}.js` : `${base}.cjs`
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // peerDependencies는 번들 제외 (소비 앱과 중복 방지)
      external: ['vue', 'radix-vue', 'vuedraggable', /^@internationalized\/date/],
      output: {
        globals: {
          vue: 'Vue',
          'radix-vue': 'RadixVue',
          '@internationalized/date': 'InternationalizedDate',
        },
        // CSS 단일 파일로 (consumer가 ./style.css로 import)
        // 진입점별 CSS: 기본 UI → ispark-ui.css, 발표 장표(폰트 포함) → presentation.css
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css' || assetInfo.name === 'index.css') return 'ispark-ui.css'
          if (assetInfo.name === 'presentation.css') return 'presentation.css'
          return assetInfo.name || 'asset'
        },
      },
    },
    cssCodeSplit: true,
  },
  server: {
    port: 3000,
  },
})
