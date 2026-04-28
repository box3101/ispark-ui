# @leechanyong/ispark-ui

Vue 3 + Vite + Storybook 기반 디자인 시스템 UI 라이브러리.

> ⚠️ **테스트 단계 (v0.1.x)** — API가 자주 바뀔 수 있습니다. 프로덕션에서 사용 시 버전 고정 권장.

## 설치

### Git URL 직접 설치 (현재 권장 — 인증 불필요)

```bash
# 최신 main 브랜치
npm install git+https://github.com/box3101/ispark-ui.git

# 또는 특정 태그 (안정 버전 고정)
npm install git+https://github.com/box3101/ispark-ui.git#v0.1.4

# package.json에 명시
# "@leechanyong/ispark-ui": "github:box3101/ispark-ui#v0.1.4"
```

설치 시 자동으로 빌드(`prepare` 훅)되어 바로 사용 가능합니다.

### npm registry 설치 (예정 — 미정)

```bash
# 향후 npmjs.com 또는 GitHub Packages publish 후 가능
npm install @leechanyong/ispark-ui
```

## 사용

### 컴포넌트 import

```vue
<script setup lang="ts">
import { UiButton } from '@leechanyong/ispark-ui'
import '@leechanyong/ispark-ui/style.css' // 글로벌 스타일 1회 import (앱 진입점에서)
</script>

<template>
  <UiButton variant="primary" @click="handleSave">저장</UiButton>
</template>
```

### 글로벌 스타일은 앱 진입점에서 1회만

```ts
// main.ts (Vue) 또는 app.vue (Nuxt)
import '@leechanyong/ispark-ui/style.css'
```

이 1줄로 다음이 한 번에 적용됩니다:
- CSS 변수 (`--color-primary` 등 — 테마 오버라이드 가능)
- 아이콘 클래스 (`.icon-plus`, `.icon-edit` 등 — 10종 base64 인라인)
- 기본 reset

## 컴포넌트

### UiButton

```vue
<UiButton variant="primary" size="md" @click="...">저장</UiButton>

<!-- variant: primary | secondary | ghost | danger -->
<!-- size: sm(28px) | md(32px) | lg(40px) -->

<!-- 아이콘 -->
<UiButton variant="primary">
  <template #icon-left><i class="icon-plus size-16" /></template>
  Agent 추가
</UiButton>

<!-- 아이콘만 (ariaLabel 필수) -->
<UiButton variant="ghost" iconOnly aria-label="삭제">
  <template #icon-left><i class="icon-trashcan size-16" /></template>
</UiButton>

<!-- 링크로 -->
<UiButton as="a" href="/agent/list" variant="secondary">목록 보기</UiButton>

<!-- 외부 ref -->
<script setup>
import { ref } from 'vue'
const btnRef = ref()
btnRef.value.focus() // defineExpose된 메서드
</script>
<UiButton ref="btnRef">포커스 대상</UiButton>
```

전체 props는 Storybook 문서를 참고하세요.

## 테마 오버라이드

CSS 변수만 덮으면 됩니다:

```css
/* 소비측 앱의 글로벌 CSS */
:root {
  --color-primary: #ff7518; /* 오렌지 테마로 */
  --color-primary-hover: #e5660f;
  --color-primary-dark: #c73e07;
}
```

## 개발 환경

```bash
npm install
npm run storybook       # Storybook (포트 6006)
npm test                # Vitest
npm run build           # 라이브러리 빌드 (dist/)
npm run build:icons     # SVG → base64 inline 재생성 (아이콘 추가 시)
```

## 아이콘 추가하기

1. `public/icons/svg/{name}.svg` 에 SVG 추가
2. `npm run build:icons` 실행
3. `<i class="icon-{name} size-16" />` 로 사용

## 라이센스

MIT — 자유롭게 사용·수정·배포 가능.
