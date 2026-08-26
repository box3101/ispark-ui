# @leechanyong/ispark-ui

Vue 3 기반 디자인 시스템 UI 라이브러리. 실무 어드민 화면에 필요한 컴포넌트를 접근성 프리미티브(radix-vue) 위에 올려 만들었습니다.

[![npm](https://img.shields.io/npm/v/@leechanyong/ispark-ui)](https://www.npmjs.com/package/@leechanyong/ispark-ui)
[![license](https://img.shields.io/npm/l/@leechanyong/ispark-ui)](./LICENSE)

📖 **[Storybook 문서](https://box3101.github.io/ispark-ui/)** — 전체 컴포넌트의 props·슬롯·이벤트

**컴포넌트 33개 · 스토리 280개 이상 · TypeScript 타입 제공 · MIT**

---

## 설치

```bash
npm install @leechanyong/ispark-ui
```

peer dependency를 함께 설치합니다.

```bash
npm install vue radix-vue @lucide/vue @internationalized/date vuedraggable
```

| 패키지 | 필요한 이유 |
| --- | --- |
| `radix-vue` | 접근성 프리미티브 (Modal·Dropdown·Tooltip·Select 등) |
| `@lucide/vue` | 아이콘 |
| `@internationalized/date` | `UiDatePicker` / `UiDateRangePicker` |
| `vuedraggable` | `UiTable`의 draggable 모드 (미사용 시에도 설치 필요) |

<details>
<summary>Git URL로 직접 설치 (미배포 커밋을 써야 할 때)</summary>

```bash
npm install git+https://github.com/box3101/ispark-ui.git
npm install git+https://github.com/box3101/ispark-ui.git#v0.6.12
```

설치 시 `prepare` 훅이 자동으로 빌드합니다.
</details>

---

## 사용

### 컴포넌트 import

```vue
<script setup lang="ts">
import { UiButton } from '@leechanyong/ispark-ui'
</script>

<template>
  <UiButton variant="primary" @click="onSave">저장</UiButton>
</template>
```

### 글로벌 스타일은 앱 진입점에서 1회만

```ts
// main.ts (Vue) 또는 app.vue (Nuxt)
import '@leechanyong/ispark-ui/style.css'
```

이 1줄로 다음이 적용됩니다.

- CSS 변수 (`--color-primary` 등 — 테마 오버라이드 가능)
- 아이콘 클래스 (`.icon-plus`, `.icon-upload` 등 13종, base64 인라인)
- 기본 reset

### Nuxt 3

`nuxt.config.ts`에 트랜스파일 설정을 추가합니다.

```ts
export default defineNuxtConfig({
  build: {
    transpile: ['@leechanyong/ispark-ui'],
  },
  // 로드 순서 중요: 라이브러리 스타일 → 앱의 토큰 오버라이드
  css: [
    '@leechanyong/ispark-ui/style.css',
    '~/assets/css/tokens.css',
  ],
})
```

**SSR 주의사항** — 대부분의 컴포넌트는 SSR에서 정상 동작합니다. 다음 2개는 `<ClientOnly>`로 감싸세요.

| 컴포넌트 | 이유 |
| --- | --- |
| `UiChart` | Chart.js가 `<canvas>` 2D 컨텍스트에 의존 |
| `UiMarkdownEditor` | TipTap이 DOM에 의존 |

```vue
<ClientOnly>
  <UiChart type="bar" :data="chartData" />
  <template #fallback><div>차트 로딩 중…</div></template>
</ClientOnly>
```

명령형 API(`openToast` / `openConfirm`)는 **반드시 이벤트 핸들러 안에서만** 호출합니다.
`setup()` 최상단에서 부르면 서버에서 DOM에 접근하려다 실패합니다.

---

## UiButton

```vue
<UiButton variant="primary" size="md" @click="onSave">저장</UiButton>
```

**variant** (10종)

| 값 | 용도 |
| --- | --- |
| `primary` | 기본 강조 액션 |
| `primary-line` | 파란 테두리 — 리스트 헤더의 추가 버튼 등 |
| `secondary` | 보조 액션 |
| `outline` | 테두리형 |
| `ghost` | 배경 없음 — 아이콘 버튼 등 |
| `danger` | 삭제 등 파괴적 액션 |
| `danger-line` | 빨간 테두리 — 인라인 삭제 액션 |
| `dark` | 어두운 배경 |
| `solid-muted` | 채도 낮은 솔리드 |
| `line-secondary` | 보조 테두리형 |

**size** — `xxs`(24) · `xs`(26) · `sm`(30) · `md`(32, 기본) · `lg`(34) · `xlg`(36), 단위 px

```vue
<!-- 아이콘 -->
<UiButton variant="primary">
  <template #icon-left><i class="icon-plus size-16" /></template>
  항목 추가
</UiButton>

<!-- 아이콘만 (aria-label 필수) -->
<UiButton variant="ghost" iconOnly aria-label="삭제">
  <template #icon-left><i class="icon-trashcan size-16" /></template>
</UiButton>

<!-- 링크로 렌더 -->
<UiButton as="a" href="/agent/list" variant="secondary">목록 보기</UiButton>

<!-- ref로 메서드 호출 -->
<script setup>
import { ref } from 'vue'
const btnRef = ref()
btnRef.value.focus() // defineExpose된 메서드
</script>
<UiButton ref="btnRef">포커스 대상</UiButton>
```

나머지 32개 컴포넌트의 props는 **[Storybook 문서](https://box3101.github.io/ispark-ui/)**를 참고하세요.

---

## 테마 오버라이드

CSS 변수만 덮으면 됩니다. `primary` 계열은 6개가 한 세트이므로 **함께 바꿔야** hover·투명도가 어긋나지 않습니다.

```css
/* 소비측 앱의 글로벌 CSS */
:root {
  --color-primary: #ff7518;
  --color-primary-hover: #e5660f;
  --color-primary-dark: #c73e07;
  --color-primary-dark-hover: #a63305;
  --color-primary-bg: #fff1e6;
  --color-primary-rgb: 255, 117, 24; /* rgba() 계산용 — 빠뜨리면 투명도 효과가 이전 색으로 남음 */
}
```

전체 변수는 `--color-*` 27개입니다. 중성색(`--color-background` `--color-surface` `--color-border` `--color-text-*`)과
시맨틱색(`--color-danger` `--color-success` `--color-warning` `--color-info`)도 같은 방식으로 덮을 수 있습니다.

> **다크 테마는 아직 제공하지 않습니다.** 27개 변수 전부 라이트 팔레트 값이므로,
> 다크 모드가 필요하면 소비측에서 `@media (prefers-color-scheme: dark)` 블록에 재정의해야 합니다.

---

## 개발 환경

```bash
npm install
npm run storybook       # Storybook (포트 6006)
npm test                # Vitest
npm run typecheck       # vue-tsc
npm run build           # 라이브러리 빌드 (dist/)
npm run build:icons     # SVG → base64 인라인 재생성 (아이콘 추가 시)
npm run release         # 버전 범프 + 빌드 + publish
```

## 아이콘 추가하기

1. `public/icons/svg/{name}.svg` 에 SVG 추가
2. `npm run build:icons` 실행
3. `<i class="icon-{name} size-16" />` 로 사용

## 라이선스

MIT — 자유롭게 사용·수정·배포 가능합니다.
