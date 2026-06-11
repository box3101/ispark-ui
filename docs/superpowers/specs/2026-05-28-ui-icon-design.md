# UiIcon 컴포넌트 설계

> Lucide 기반 아이콘 컴포넌트. 오픈소스 아이콘 세트를 `<UiIcon name="..." />` 형태로 사용.
> 기존 `<i class="icon-*">` 시스템과 공존하며 점진적으로 교체.

## 결정 사항

| 항목 | 결정 | 이유 |
|------|------|------|
| 아이콘 세트 | Lucide | 1,500+ 아이콘, 라인 스타일이 기존 12개와 톤 일치, Vue 공식 패키지 |
| 기존 시스템 관계 | 점진적 교체 (B) | 기존 `<i class>` 유지하면서 새 코드부터 `<UiIcon>` 사용 |
| size prop | 토큰 + 숫자 둘 다 (C) | 컴포넌트 내부는 토큰, 커스텀은 숫자로 유연하게 |
| color prop | 프리셋만 (A) | 디자인 시스템 통일감 유지, 기본은 currentColor |
| 패키지 전략 | peerDependency (A) | 소비자 쪽 tree-shaking 보장, 기존 radix-vue 패턴과 동일 |

## Props API

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `name` | `string` (필수) | — | Lucide 아이콘 이름, kebab-case (`"arrow-right"`, `"search"`) |
| `size` | `string \| number` | `24` | 토큰(`"xs"` `"sm"` `"md"` `"lg"`) 또는 숫자(px) |
| `color` | `string` | — | `"primary"` `"danger"` `"white"` `"black"` `"muted"`. 미지정 시 `currentColor` |
| `strokeWidth` | `number` | `2` | Lucide 선 두께 (1~3) |

## 사이즈 토큰 맵

기존 디자인 토큰(`src/styles/tokens/_size.scss`)과 일치:

```ts
const SIZE_MAP: Record<string, number> = {
  xs: 12,
  sm: 16,
  md: 18,
  lg: 20,
}
```

- 토큰 문자열 → SIZE_MAP에서 px 변환
- 숫자 → 그대로 사용
- 기본값 `24`는 Lucide 기본 사이즈와 동일

## 색상 프리셋

기존 `_icon.scss`의 색상 클래스와 1:1 대응:

```scss
.ui-icon {
  &.color-primary { color: var(--color-primary); }
  &.color-danger  { color: var(--color-danger); }
  &.color-white   { color: #fff; }
  &.color-black   { color: #000; }
  &.color-muted   { color: $color-text-muted; }
}
```

- `color` prop 미지정 → `currentColor` (부모 색상 상속)
- 프리셋 외 임의 색상은 지원하지 않음 (디자인 토큰 통일)

## 내부 구현

### 동적 아이콘 resolve

```vue
<template>
  <component
    :is="iconComponent"
    :size="resolvedSize"
    :stroke-width="strokeWidth"
    :class="['ui-icon', colorClass]"
    aria-hidden="true"
  />
</template>
```

- `lucide-vue-next`에서 아이콘 컴포넌트를 동적으로 가져옴
- kebab-case name → PascalCase 변환 (예: `"arrow-right"` → `ArrowRight`)
- 존재하지 않는 name → 콘솔 경고 + 빈 렌더링 (에러 발생시키지 않음)

### 아이콘 resolve 전략

`lucide-vue-next`는 named export로 아이콘을 제공:

```ts
import * as icons from 'lucide-vue-next'
```

name prop을 PascalCase로 변환 후 `icons[pascalName]`으로 컴포넌트를 가져온다.
이 방식은 소비자 쪽에서 tree-shaking이 안 될 수 있으므로, 대안으로 동적 import나
소비자가 사용할 아이콘을 등록하는 방식도 고려할 수 있다.

**선택한 방식:** `import * as icons`로 전체 가져오기. 이유:
- `<UiIcon name="..." />`의 핵심 가치가 "아무 아이콘이나 name만으로 바로 사용"
- 개별 등록 방식은 DX를 크게 해침
- Lucide의 전체 아이콘은 ~200KB (gzip ~50KB) 수준으로 수용 가능
- 번들 사이즈가 문제되면 소비자가 직접 Lucide 컴포넌트를 import해서 사용 가능

## 패키지 설정

```json
{
  "peerDependencies": {
    "lucide-vue-next": ">=0.400.0"
  }
}
```

- 소비자가 `npm install lucide-vue-next` 설치
- `vue`, `radix-vue`와 동일한 peerDependency 패턴

## 기존 시스템과의 공존

### 두 방식 모두 사용 가능

```html
<!-- 기존 방식 (유지) -->
<i class="icon-search size-16" />

<!-- 새 방식 -->
<UiIcon name="search" size="16" />
```

### 기존 컴포넌트 호환

- UiButton `#icon-left` / `#icon-right` 슬롯: 기존 `<i>`, 새 `<UiIcon>` 모두 사용 가능
- UiEmpty `icon` prop: 당장은 기존 class 방식 유지, 추후 `<UiIcon>` 내부 전환 가능
- 새 코드부터 `<UiIcon>` 사용 권장

### 점진적 마이그레이션 경로

1. **Phase 1 (이번 작업):** UiIcon 컴포넌트 + 스토리 + 테스트 추가
2. **Phase 2 (추후):** 기존 컴포넌트 내부에서 `<i class>` → `<UiIcon>` 전환
3. **Phase 3 (추후):** base64 SCSS 시스템 제거 검토

## 파일 구조

3종 세트 원칙:

```
src/components/ui/
├── UiIcon.vue            # 컴포넌트 본체
├── UiIcon.stories.ts     # CSF3 스토리 + play 함수
└── UiIcon.test.ts        # composeStories 재사용
```

## 스토리 구성

| 스토리 | 설명 |
|--------|------|
| Playground | name/size/color/strokeWidth Controls 전부 노출 |
| Size Variants | xs, sm, md, lg 토큰 + 숫자(14, 32) 비교 |
| Color Variants | primary, danger, white, black, muted 나열 |
| StrokeWidth | 1, 1.5, 2, 2.5, 3 비교 |
| Gallery | Lucide 주요 아이콘 격자 (카테고리별) |

## 에러 처리

- 존재하지 않는 name → `console.warn('[UiIcon] Unknown icon: ${name}')` + 렌더링 안 함
- lucide-vue-next 미설치 → import 시점에 에러 발생 (peerDependency 경고로 사전 방지)

## 접근성

- 장식용 아이콘: `aria-hidden="true"` (기본)
- 의미있는 아이콘(버튼 내 텍스트 없이 단독 사용)은 부모에서 `aria-label` 처리
