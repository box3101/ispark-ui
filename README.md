<div align="center">

# ispark-ui

**Vue 3 기반 디자인 시스템 UI 라이브러리**

[![npm](https://img.shields.io/npm/v/@leechanyong/ispark-ui?style=flat-square&color=6366f1)](https://www.npmjs.com/package/@leechanyong/ispark-ui)
[![Vue3](https://img.shields.io/badge/Vue_3-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white)](https://box3101.github.io/ispark-ui/)

</div>

---

## Overview

실무 어드민 화면에 필요한 컴포넌트를 접근성 프리미티브(radix-vue) 위에 올려 만든 디자인 시스템입니다.  
33개 컴포넌트, 280개+ 스토리, npm 퍼블리시로 사내 프로젝트에 공통 적용합니다.

## Tech Stack

| 영역 | 기술 |
|------|------|
| **Framework** | Vue 3 |
| **Primitive** | radix-vue |
| **Language** | TypeScript |
| **Docs** | Storybook 8 |
| **Build** | Vite (Library Mode) |
| **Publish** | npm |

## Key Features

- **33개 컴포넌트** — Button, Input, Modal, Table, Tab, Badge 등
- **280개+ 스토리** — Storybook 기반 문서화 및 인터랙티브 데모
- **접근성 내장** — radix-vue 프리미티브로 WAI-ARIA 준수
- **테마 커스터마이징** — CSS 변수 기반 다크/라이트 모드
- **Nuxt 3 지원** — 자동 컴포넌트 등록 플러그인

## Install

```bash
npm install @leechanyong/ispark-ui
```

```ts
// main.ts
import { createApp } from 'vue'
import IsparkUI from '@leechanyong/ispark-ui'
import '@leechanyong/ispark-ui/style'

createApp(App).use(IsparkUI).mount('#app')
```

## Links

- **Storybook** — [box3101.github.io/ispark-ui](https://box3101.github.io/ispark-ui/)
- **npm** — [@leechanyong/ispark-ui](https://www.npmjs.com/package/@leechanyong/ispark-ui)

---

<div align="center">
  <sub>Built by <a href="https://github.com/box3101">@box3101</a></sub>
</div>
