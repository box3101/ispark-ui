# UiTable Design Spec

- **작성일**: 2026-05-11
- **상태**: Draft (사용자 검토 대기)
- **범위**: ispark-ui 디자인 시스템 라이브러리에 `UiTable` 컴포넌트 신규 추가
- **원본**: `team_agent_front/components/ui/UiTable.vue`
- **사용 빈도**: 7회 (`team_agent_front` 기준) — 🟡 중간 Tier (보류였으나 사용자 명시 요청으로 진행)

---

## 1. 개요

`UiTable`은 컬럼 정의(columns) + 데이터 배열(data) 기반 데이터 테이블 컴포넌트다. 정렬, 고정 헤더(sticky), 셀/헤더 커스터마이징 슬롯, 빈 상태, 행 클릭, size 변형, 선택 행 강조까지 한 컴포넌트로 처리한다.

설계 원칙:

- **원본 풀포팅** — 사용처 7곳이 이미 의존하는 인터페이스 그대로 유지 (조용한 회귀 방지)
- **컬럼 정의 단일 진실** — 너비/정렬/정렬타입을 `TableColumn` 한 곳에서 선언
- **a11y 단순** — `<table>` 시맨틱 사용, 정렬은 button + sort mark 시각 표시
- **YAGNI** — 페이지네이션/체크박스 선택/리사이즈/드래그 정렬은 제외 (필요 시 별도 컴포넌트 또는 PR)

---

## 2. 핵심 결정 사항

| # | 결정 | 이유 |
|---|---|---|
| 1 | **원본 그대로 풀포팅** | team_agent_front 7곳 호환 + 기능을 깎지 않고 이전 (UiButton 8→4 단순화 사례와 다른 정책 — 이미 도메인 검증된 API) |
| 2 | `TableColumn` 타입을 **UiTable.vue 내부에 인라인 정의 + named export** | UiSelect의 `SelectOption` 패턴과 동일 — 별도 `types/` 폴더 신설 회피 |
| 3 | Nuxt `~/types/table` import 제거 → 컴포넌트 내부에서는 인터페이스 그대로 사용, 외부에서는 `import type { TableColumn } from 'ispark-ui'`로 사용 | ispark-ui엔 `~` alias 없음, 라이브러리 자체에서 타입 export |
| 4 | `ref/computed/watch` 명시 import 추가 | Nuxt auto-import 없음 (Vite 환경) |
| 5 | 가이드 페이지(`pages/guide/`) 작성 안 함 | ispark-ui엔 `pages/` 폴더 자체가 없음 (Storybook이 가이드 역할) |
| 6 | CLAUDE.md 표 업데이트 — UiTable을 🟡→🔴로 이동 + "완료" 표시 | 마이그레이션 정책 갱신 |
| 7 | 페이지네이션 / 행 체크박스 / 컬럼 리사이즈 / 드래그 정렬 — 미지원 | YAGNI. 별도 컴포넌트로 분리 (`UiDragTable` 등) |
| 8 | `UiBadge` 미존재 → Stories `CustomCell` 예시는 `<span>`으로 대체 | UiBadge가 라이브러리에 추가되면 스토리만 교체 |

---

## 3. 아키텍처 / 의존성

### 3.1 파일 구성 (3종 세트)

```
src/components/ui/
├── UiTable.vue          # 본체 (~200줄 — 원본과 동일 분량)
├── UiTable.stories.ts   # CSF3 스토리 8개 + 일부 play 함수
└── UiTable.test.ts      # composeStories 재사용 + 엣지 케이스 3개
src/index.ts              # UiTable + TableColumn 타입 export 추가
CLAUDE.md                 # 마이그레이션 표 업데이트
```

### 3.2 외부 의존성

- **0 신규 의존성** — Vue 3 + SCSS 토큰/mixin만 사용
- 사용하는 mixin/토큰 (ispark-ui에 존재 확인 완료):
  - `@include typo($body-medium)`, `@include typo($body-medium-bold)`
  - `@include custom-scrollbar`
  - `$color-background`, `$color-border`, `$color-border-light`, `$color-text-primary`, `$color-text-muted`, `$color-text-disabled`, `$color-primary`
- CSS 변수 `--color-primary-rgb` (선택 행 배경) — 부재 시 fallback `rgba(59, 130, 246, ...)` 자동 적용

### 3.3 컴포넌트 인터페이스

**Props** (원본 그대로):

| Prop | Type | Default | 설명 |
|---|---|---|---|
| `columns` | `TableColumn[]` | (required) | 컬럼 정의 |
| `data` | `Record<string, any>[]` | (required) | 행 데이터 |
| `stickyHeader` | `boolean` | `false` | 헤더 고정 |
| `maxHeight` | `string` | `undefined` | 테이블 최대 높이 |
| `emptyText` | `string` | `'데이터가 없습니다.'` | 빈 상태 메시지 |
| `clickable` | `boolean` | `false` | 행 hover/cursor |
| `size` | `'md' \| 'sm'` | `'md'` | 컴팩트 모드 |
| `selectedRowKey` | `string` | `undefined` | 선택 행 매칭 키 |
| `selectedRowValue` | `string` | `undefined` | 선택 행 매칭 값 |

**TableColumn**:

```ts
export interface TableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'         // default 'center'
  headerAlign?: 'left' | 'center' | 'right'   // default 'center'
  sortable?: boolean
  sortType?: 'auto' | 'string' | 'number' | 'date'  // default 'auto'
}
```

**Events**:

| Event | Payload | 설명 |
|---|---|---|
| `row-click` | `(row, index)` | 행 클릭 (always emit — clickable은 시각 스타일 전용) |

**Slots**:

| Slot | Props | 설명 |
|---|---|---|
| `header-{key}` | `{ column, isSortable, sortOrder, onSort }` | 헤더 커스터마이징 |
| `cell-{key}` | `{ row, value, index }` | 셀 커스터마이징 |

### 3.4 정렬 동작

- `sortable: true` 컬럼의 헤더 버튼 클릭 시: **asc → desc → 해제** 3단 토글
- 정렬 비교 (`sortType`):
  - `'auto'` (기본): 숫자 변환 시도 → 날짜 변환 시도 → 문자열 (한국어 `localeCompare`)
  - `'string'`: 문자열 (한국어 `localeCompare`)
  - `'number'`: 쉼표 제거 후 숫자 변환 (e.g. `"44,865,368,290"` → `44865368290`)
  - `'date'`: `Date.parse` 결과 ms
- `columns` 갱신 시 현재 정렬 컬럼이 사라지면 `sortState` 자동 리셋 (watch)

### 3.5 선택 행 강조

- `selectedRowKey + selectedRowValue` 동시 지정 시: `row[selectedRowKey] === selectedRowValue` 인 행에 `is-selected` 클래스 + primary 색 배경

---

## 4. 스토리 (8개)

| Story | 출처 | play 함수 |
|---|---|---|
| `Default` | 사용자 스펙 #1 | 없음 |
| `StickyHeader` | 사용자 스펙 #2 | 없음 |
| `CustomCell` | 사용자 스펙 #3 (UiBadge → `<span>`) | 없음 |
| `Empty` | 사용자 스펙 #4 | 빈 상태 텍스트 존재 검증 |
| `Clickable` | 사용자 스펙 #5 | 행 클릭 → `onRowClick` fn 호출 검증 |
| `SmallSize` | 원본 기능 | 없음 |
| `Sortable` | 원본 기능 | 헤더 클릭 3번 → asc → desc → 해제 시각 확인 |
| `SelectedRow` | 원본 기능 | 없음 |

---

## 5. 테스트 (엣지 케이스 전용)

스토리가 기본 케이스를 커버하므로 `composeStories`로 재사용. 별도 엣지 케이스 3개:

1. **정렬 `sortType: 'number'`** — 쉼표 포함 문자열(`"1,234"`, `"567"`) 숫자 비교 정확성
2. **정렬 컬럼 제거 시 sortState 리셋** — `columns` prop 변경 시 watch 동작
3. **`emptyText` prop 반영** — 커스텀 메시지 렌더

---

## 6. 라이브러리 export 변경

`src/index.ts` 추가:

```ts
export { default as UiTable } from './components/ui/UiTable.vue'
export type { TableColumn } from './components/ui/UiTable.vue'
```

---

## 7. CLAUDE.md 표 업데이트

현재:
```
| 🔴 핵심 (10+) | UiButton (71), UiInput (46), UiSelect (32), UiModal (31), ... | UiButton/UiInput/UiSelect/UiModal ✅ 완료 · 6개 남음 |
| 🟡 중간 (5~9) | UiTable (7) | 보류 |
```

변경 후:
```
| 🔴 핵심 (10+) | UiButton (71), UiInput (46), UiSelect (32), UiModal (31), ... | UiButton/UiInput/UiSelect/UiModal ✅ 완료 · 6개 남음 |
| 🟡 중간 (5~9) | UiTable (7) ✅ 완료 | 사용자 요청으로 라이브러리화 |
```

---

## 8. 범위 외 (Out of scope)

- team_agent_front 7개 사용처 마이그레이션 (별도 PR)
- 페이지네이션 / 행 체크박스 / 컬럼 리사이즈 / 드래그 정렬 (필요 시 별도 컴포넌트)
- UiBadge (Stories 예시는 `<span>`으로 대체)
- 다국어 `localeCompare` 로케일 옵션 (현재 `'ko'` 하드코딩 — 원본 그대로)

---

## 9. 검증 계획

- `npm test` — Vitest 통과 (스토리 + 엣지 3개)
- `npm run storybook` — 모든 스토리 렌더, play 함수 통과
- `npm run build-storybook` — 정적 빌드 성공
- 리그레션: 기존 UiButton/UiInput/UiSelect/UiModal 테스트 영향 없음
