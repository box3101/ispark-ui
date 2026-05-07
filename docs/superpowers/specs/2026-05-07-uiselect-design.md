# UiSelect Design Spec

- **작성일**: 2026-05-07
- **상태**: Draft (사용자 검토 대기)
- **범위**: ispark-ui 디자인 시스템 라이브러리에 `UiSelect` 컴포넌트 신규 추가
- **원본**: `team_agent_front/components/ui/UiSelect.vue` (radix-vue 기반)
- **사용 빈도**: 32회 (`team_agent_front` 기준) — 🔴 핵심 Tier

---

## 1. 개요

`UiSelect`는 단일 선택 드롭다운 폼 필드 컴포넌트다. radix-vue의 unstyled `Select` 프리미티브를 래핑해 키보드 내비게이션 / 포커스 트랩 / ARIA 처리를 위임하고, 본 라이브러리는 디자인 토큰과 폼 필드 패턴(label/error/desc)을 입힌다.

설계 원칙:

- **재사용 가능한 a11y는 위임** — 직접 구현 시 600~800줄 + a11y 버그 위험
- **UiInput과 폼 필드 일관성** — label/errorMessage/desc/required/labelHidden 동일 인터페이스
- **공용 토큰 사용** — `InputSize` (sm/md/lg/auth) + `Shape` 일부(rounded/pill)로 같은 행에서 자동 정렬
- **YAGNI** — 단일 선택만, multi/searchable/group은 요청 시 별도 PR

---

## 2. 핵심 결정 사항

| # | 결정 | 이유 |
|---|---|---|
| 1 | radix-vue를 **peerDependencies**로 도입 | 라이브러리 번들 가벼움 유지(UiButton/UiInput zero-dep 일관성), 사용자 측에서 다른 radix 컴포넌트와 버전 충돌 회피 |
| 2 | 폼 필드 풀세트 (label/errorMessage/desc/required/labelHidden) | UiInput과 동일 패턴 → 폼 화면에서 일관성 |
| 3 | size = `InputSize` (sm/md/lg/auth, 4개) | UiInput과 동일 토큰 → 검색바·필터에서 자동 정렬. 원본 5개(xs/sm/md/lg/xlg) → 4개로 단순화 (UiButton 8→4 사례와 동일 정책) |
| 4 | shape = rounded / pill (2개) | UiInput과 동일. circle은 select에 부적합 |
| 5 | option.disabled 지원 | radix-vue Item에 그대로 전달 — cost 0, 가치 큼 |
| 6 | multi-select / searchable / group / async — 미지원 | YAGNI. 요청 시 별도 PR |

---

## 3. 아키텍처 / 의존성

### 3.1 파일 구성 (3종 세트)

```
src/components/ui/
├── UiSelect.vue          # 본체 (radix-vue 래핑 + 폼 필드)
├── UiSelect.stories.ts   # CSF3 + play (Storybook = 최소 테스트)
└── UiSelect.test.ts      # composeStories 재사용 + 엣지케이스 5개
```

### 3.2 의존성 변경

```jsonc
// package.json
"peerDependencies": {
  "vue": "^3.5.0",
  "radix-vue": "^1.9.0"        // 신규
},
"devDependencies": {
  "radix-vue": "^1.9.0",       // Storybook/테스트용
  // ... 기존
}
```

설치 명령: `npm i -D radix-vue` (peerDeps + devDeps 동시 충족).

### 3.3 Style 블록 분리 (CLAUDE.md scss.md 룰 준수)

```vue
<style lang="scss" scoped>
  /* Trigger / Label / Error / Desc — scoped */
</style>

<style lang="scss">
  /* Portal 안 Content / Item — global (Portal은 <body> 직속이라 scoped 미적용) */
  .ui-select-content { ... }
  .ui-select-item { ... }
</style>
```

누수 방지는 `ui-select-` 클래스 prefix로만 충분. data attribute 추가는 과함.

---

## 4. Props 인터페이스

### 4.1 `SelectOption` 타입 (export)

```ts
export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean   // radix-vue Item disabled에 그대로 전달
}
```

### 4.2 Props (총 14개)

| 그룹 | Prop | 타입 | 기본 | 설명 |
|---|---|---|---|---|
| **v-model** | `modelValue` | `string \| number` | `''` | 선택값 |
| **옵션** | `options` | `SelectOption[]` | (필수) | 옵션 배열 |
| | `placeholder` | `string` | `''` | 미선택 표시 텍스트 |
| **폼 필드** | `label` | `string` | `''` | 라벨 (UiInput 동일) |
| | `labelHidden` | `boolean` | `false` | 시각 숨김 (SR 인지) |
| | `required` | `boolean` | `false` | * 표시 + `aria-required="true"` |
| | `error` | `boolean` | `false` | 에러 상태 (border 빨강) |
| | `errorMessage` | `string` | `''` | 에러 메시지 (자동 error=true + role=alert) |
| | `desc` | `string` | `''` | 설명 텍스트 (aria-describedby 연결) |
| **HTML** | `name` | `string` | `undefined` | form name |
| | `id` | `string` | `undefined` | label htmlFor 연결 (없으면 `useId()` 자동) |
| | `disabled` | `boolean` | `false` | 전체 비활성 |
| **토큰** | `size` | `InputSize` | `'md'` | sm/md/lg/auth |
| | `shape` | `'rounded' \| 'pill'` | `'rounded'` | rounded/pill |

### 4.3 Emits

```ts
'update:modelValue': [value: string | number]
'change': [value: string | number]   // 명시 시그널 (UiInput의 enter/search와 동일 결)
```

### 4.4 defineExpose

```ts
{ focus, blur, el }   // UiButton/UiInput과 동일
```

### 4.5 Dev 검증 (`watchEffect` + `import.meta.env.DEV`)

- `options.length === 0` → warn
- `required` + (`label` || `labelHidden`) 둘 다 없을 때 → warn (스크린리더가 필수 인지 못 함)
- `value` 중복 옵션 → warn

### 4.6 빈 문자열 value 처리

radix-vue가 `value=""` 허용 안 함 → `__ui_select_empty__` 토큰으로 변환/역변환 (원본 트릭 그대로).

```ts
const EMPTY_VALUE_TOKEN = '__ui_select_empty__'
const normalizeValue = (v) => (v === '' ? EMPTY_VALUE_TOKEN : String(v ?? ''))
const denormalizeValue = (v) => (v === EMPTY_VALUE_TOKEN ? '' : v)
```

---

## 5. 스타일 / 토큰 매핑

### 5.1 size 토큰 (`@each` map 순회 — UiInput 동일 패턴)

```scss
.ui-select-trigger {
  @each $key in (sm md lg auth) {
    $vals: map.get($sizes, $key);
    &.size-#{$key} {
      height:    map.get($vals, height);
      font-size: map.get($vals, font);
      padding:   0 map.get($vals, padding-x);

      .ui-select-icon {
        width:  map.get($vals, icon);
        height: map.get($vals, icon);
      }
    }
  }
}
```

### 5.2 shape 토큰

```scss
&.shape-rounded { border-radius: $shape-rounded; }
&.shape-pill    { border-radius: $shape-pill; }
```

### 5.3 색상 (CSS variable — 테마 호환)

| 상태 | Trigger | Content | Item |
|---|---|---|---|
| 기본 | `border: var(--color-border)` `bg: #fff` | `border: var(--color-border)` `shadow: $shadow-md` | `color: var(--color-text-primary)` |
| hover | `border: var(--color-primary)` | — | `bg: var(--color-background)` (`[data-highlighted]`) |
| focus / open | `border: var(--color-primary)` | — | — |
| 선택됨 | — | — | `color: var(--color-primary)` + bold (`[data-state=checked]`) |
| disabled (전체) | `opacity: 0.5` `cursor: not-allowed` | — | — |
| disabled (옵션) | — | — | `opacity: 0.5` (`[data-disabled]`) |
| error | `border: var(--color-danger)` `box-shadow: 0 0 0 3px rgba(239,68,68,.12)` | — | — |
| placeholder | `color: #aebccb` (`[data-placeholder]`) | — | — |

### 5.4 Content (드롭다운) 핵심 값

```scss
.ui-select-content {
  min-width: var(--radix-select-trigger-width);  // radix 자동 변수
  max-height: 240px;
  overflow-y: auto;
  padding: $spacing-xs 0;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: $shape-rounded;
  box-shadow: $shadow-md;
  z-index: $z-modal;
}
```

### 5.5 드롭다운 화살표

**기본은 인라인 SVG** (원본 SVG 그대로). 라이브러리는 사용자 측 아이콘 시스템 등록 여부를 가정할 수 없음 — 의존성 0으로 가는 게 안전. 추후 아이콘 시스템이 디자인 시스템 표준에 편입되면 재검토 (12절 참고).

```scss
.ui-select-icon {
  flex-shrink: 0;
  color: var(--color-text-secondary);
  transition: transform $transition-base;
  [data-state='open'] & { transform: rotate(180deg); }
}
```

---

## 6. Storybook 시나리오 (11개)

| 스토리 | play 검증 |
|---|---|
| `Default` | 트리거 클릭 → Content 열림 → 옵션 클릭 → 값 변경 + change emit |
| `WithLabel` | `<label for>`이 trigger id와 매칭 |
| `Required` | `*` 표시 + `aria-required="true"` |
| `Error` | `border: var(--color-danger)` 적용 |
| `ErrorMessage` | `aria-invalid="true"` + `role="alert"` 메시지 표시 |
| `Desc` | `aria-describedby`가 desc id로 연결 |
| `Disabled` | 트리거 클릭 무시, `aria-disabled="true"` |
| `DisabledOption` | 특정 옵션 클릭 시 값 변경 안 됨 |
| `Sizes` | sm/md/lg/auth 4개 한 줄 — UiInput·UiButton과 정렬 확인 |
| `Shapes` | rounded/pill 2개 |
| `LongList` | 옵션 30개 — Content 240px max-height + 스크롤 |

### 6.1 Portal 테스트 핵심 패턴

```ts
// Portal은 body 직속 → screen으로 접근
const trigger = canvas.getByRole('combobox')
await userEvent.click(trigger)
const optB = await screen.findByRole('option', { name: '옵션 B' })
await userEvent.click(optB)
await expect(args.onChange).toHaveBeenCalledWith('b')
```

`within(canvasElement)` 만으로는 Portal 내부 옵션을 못 찾음. `screen.*` 필수.

---

## 7. 단위 테스트 — 엣지케이스 5개 (`UiSelect.test.ts`)

`composeStories(stories)`로 스토리 재사용 + 추가 엣지케이스만 별도.

| # | 엣지케이스 | 검증 포인트 |
|---|---|---|
| 1 | v-model 양방향 | 외부 ref 변경 → trigger 표시 텍스트 동기화 |
| 2 | 빈 문자열 value | `value: ''` 옵션 + EMPTY_VALUE_TOKEN 변환 정상 작동 |
| 3 | label htmlFor 자동 생성 | `id` 미지정 → `useId()` 자동 + label과 매칭 |
| 4 | emit 일관성 | `update:modelValue`와 `change` 동일 값 emit |
| 5 | dev warn | `options: []` 시 `console.warn` 호출 (`vi.spyOn` 검증) |

스토리에서 검증된 시나리오는 `.test.ts`에서 재테스트하지 않음 — `await Default.run()` 한 줄 호출.

---

## 8. 의도적으로 뺀 것 (YAGNI)

요청이 들어오면 별도 PR로 추가:

- multi-select (`v-model: (string | number)[]`)
- searchable / 옵션 검색 (combobox)
- option group (radix-vue `SelectGroup` 활용)
- async loading
- 커스텀 옵션 렌더링 슬롯 (icon, badge 등)

---

## 9. 구현 순서 (의존 그래프 순)

1. `npm i -D radix-vue` + `package.json` peerDeps/devDeps 추가
2. `SelectOption` 타입 정의 (UiSelect.vue 안)
3. `UiSelect.vue` 본체 (~250줄)
4. `UiSelect.stories.ts` (CSF3 + play, ~150줄)
5. `UiSelect.test.ts` (composeStories + 엣지케이스 5개, ~120줄)
6. `src/index.ts`에 `UiSelect`, `SelectOption` export
7. chevron 아이콘은 인라인 SVG (의존성 0 정책)
8. `CLAUDE.md` Tier 표 — UiSelect 완료 표시
9. `CHANGELOG.md` — 0.4.0 항목 (새 컴포넌트는 minor)

---

## 10. 영향받는 파일

| 파일 | 변경 |
|---|---|
| **신규** `src/components/ui/UiSelect.vue` | ~250줄 |
| **신규** `src/components/ui/UiSelect.stories.ts` | ~150줄 |
| **신규** `src/components/ui/UiSelect.test.ts` | ~120줄 |
| **수정** `package.json` | radix-vue peerDeps + devDeps 추가 |
| **수정** `src/index.ts` | UiSelect, SelectOption export |
| **수정** `CLAUDE.md` | Tier 표 — UiSelect 완료 표시 |
| **수정** `CHANGELOG.md` | 0.4.0 항목 |

추정 라인 수 합계: **~520줄** (UiInput 763줄 < UiSelect — 폼 검증 로직 부재).

---

## 11. 사전 확인 필요 (구현 단계)

- chevron 아이콘 — 인라인 SVG로 시작 (5.5절 결정)
- `vitest.setup.ts` Vue Testing Library 셋업 — UiInput.test.ts 패턴 그대로면 OK
- Storybook Portal 표시 — `.storybook/preview.ts` 별도 설정 불필요 (radix-vue 기본 `<body>` 포탈)

---

## 12. 미해결 / 향후 결정

- 화살표 아이콘 표준: 1차는 인라인 SVG로 결정(5.5절). 추후 ispark-ui가 자체 아이콘 시스템을 표준화하면 그 시점에 일괄 전환.
- `SelectOption` 타입 export 위치: 현재는 `UiSelect.vue` 내부 export 의도. 다른 컴포넌트(MultiSelect 등) 추가 시 `src/types/select.ts`로 이동 검토.
