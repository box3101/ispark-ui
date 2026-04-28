# @box3101/ispark-ui

Vue 3 + Vite + Storybook 기반 디자인 시스템 UI 라이브러리.

## 설치

GitHub Packages registry에서 받습니다. 두 단계 필요.

### 1. `.npmrc` 설정 (소비측 프로젝트 루트)

```ini
@box3101:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. GitHub Personal Access Token 발급

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. **Generate new token (classic)**
3. **Scopes**: `read:packages` 만 체크 (설치만 할 거면 충분)
4. 발급된 토큰을 환경 변수로 등록:

```bash
# .env (git에 올리지 않음)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx

# 또는 ~/.bashrc / ~/.zshrc / Windows 환경변수
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
```

### 3. 설치

```bash
npm install @box3101/ispark-ui
```

## 사용

### 컴포넌트 import

```vue
<script setup lang="ts">
import { UiButton } from '@box3101/ispark-ui'
import '@box3101/ispark-ui/style.css' // 글로벌 스타일 1회 import (앱 진입점에서)
</script>

<template>
  <UiButton variant="primary" @click="handleSave">저장</UiButton>
</template>
```

### 글로벌 스타일은 앱 진입점에서 1회만

```ts
// main.ts (Vue) 또는 app.vue (Nuxt)
import '@box3101/ispark-ui/style.css'
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

UNLICENSED — 사내 전용
