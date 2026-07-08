# Changelog

본 프로젝트는 [Keep a Changelog](https://keepachangelog.com/ko/) 형식과 [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

## [0.6.1] - 2026-07-08

### Fixed
- UiTable draggable — vuedraggable externalize(peerDep 전환), 소비 앱 지연 로드 청크 미해결 수정

## [0.6.0] - 2026-07-08

### Added
- UiTable draggable 모드 추가 (행 드래그 재정렬, vuedraggable 지연 로드)

## [0.5.25] - 2026-07-08

### Added
- UiButton primary-line variant 추가 (파란 테두리 — 리스트 헤더 추가 버튼용)

## [0.5.24] - 2026-07-08

### Changed
- UiTab active 라벨 볼드 + UiInput 포커스 outline 제거

## [0.5.23] - 2026-07-07

### Changed
- UiDrawer width 변경

## [0.5.22] - 2026-07-07

### Changed — UiDrawer 타이틀 크기
- **`.ui-drawer-title` font-size `16px` → `18px`** — 드로어 헤더 타이틀 위계 강화. UiModal 등 다른 오버레이 타이틀과 시각 크기 정합.

## [0.5.21] - 2026-07-06

### Fixed — UiModal size 클래스 충돌
- **UiModal size 클래스 `size-*` → `ui-modal-size-*` 프리픽스** — Radix teleport로 `<body>`에 언스코프드로 렌더되어 바 `.size-md` 등이 호스트 앱의 레거시 글로벌 `.size-md`(예: 입력 높이 유틸)와 충돌해 모달이 찌부러지던 문제 해결. 충돌 없는 컴포넌트 프리픽스 클래스로 변경.

## [0.5.20] - 2026-06-30

### Added — team_agent_front 마이그레이션 호환
- **UiButton `dark` variant** — 진회색 solid(#58616a) 중립 강조 버튼. 기존 로컬 `variant="dark"` 이전 대응.
- **UiModal `isOpen` prop (한시 호환 alias)** — 레거시 단방향 `:is-open` 바인딩 지원. `open` 미지정 시 `isOpen`으로 열림 상태 결정. `v-model:open` 정식 전환 후 제거 예정.

## [0.5.19] - 2026-06-30

### Added — UiPagination `align` prop
- **`align`** `'left' | 'center' | 'right' | 'between'` (기본 `'between'`) — 가로 정렬. `justify-content` 매핑(left=flex-start / center=center / right=flex-end / between=space-between).
  - 기본값 `'between'`으로 기존 동작 유지(하위호환). 컨트롤만 가운데 두려면 `align="center"` + `show-total`/`show-range` false 조합.
  - 신규 `Centered` 스토리 추가.

## [0.5.18] - 2026-06-30

### Changed — UiPagination
- **`이전`/`다음`/`처음`/`끝` 버튼 border 제거** — 텍스트형 스타일로 변경. 페이지 번호 버튼은 기존 border 유지, active 페이지는 primary 채움 유지.
  - hover 시 `--color-primary-bg` 배경 + primary 텍스트로 어포던스 제공.
  - border-width(1px)는 투명으로 남겨 페이지 번호 버튼과 높이·정렬 일치(레이아웃 시프트 없음).

## [0.5.0] - 2026-05-07

### Added — UiModal 신규 컴포넌트
- **`UiModal`** — radix-vue Dialog 기반 center 모달 폼 필드. 31회 사용처 핵심 Tier.
  - **a11y 자동**: radix-vue가 포커스 트랩 / ESC / role=dialog / aria-labelledby 처리.
  - **size 토큰**: sm(400) / md(560·기본) / lg(800) / xl(1080) — `min(px, calc(100vw - 40px))` 반응형 자동 축소 (별도 미디어쿼리 없음).
  - **3-슬롯 구조**: `header` (title prop fallback) / default(body) / `footer`. header slot 명시 시 default header 자동 비활성.
  - **`title`** prop — DialogTitle 자동 연결.
  - **`showClose`** (default true) — 우상단 X 버튼.
  - **`showOverlay`** (default true) — 어두운 배경.
  - **`closeOnOverlayClick`** / **`closeOnEscape`** (default true) — radix-vue 이벤트 preventDefault로 차단.
  - **`showFullscreen`** (default false) — 헤더에 expand/collapse 토글 버튼. fullscreen 시 size 토큰 무시 + viewport 100% + border-radius 0. 닫힐 때 자동 reset.
  - **`customClass`** / **`maxWidth`** — 추가 클래스 / size 토큰 override.
  - 본문 길 때 `max-height: calc(100vh - 40px)` + `overflow-y: auto` (모달 내부 스크롤).
  - overlay/content fade+scale 애니메이션 (`animation-fill-mode: forwards` 적용 — 닫힘 깜빡임 없음).

### Storybook
- 10 시나리오 — `Default` / `WithTitle` / `Sizes` (sm/md/lg/xl 시각 비교) / `NoCloseButton` / `WithFooter` (저장/취소 액션) / `CustomMaxWidth` (720px override) / `CustomHeaderSlot` (아바타+이름) / `NoOverlay` / `StrictNoEscape` (ESC/overlay 무시) / `Fullscreen` (토글 검증).

### Tests
- 자동 테스트 60 → 64 (UiModal 4개, 1개 it.skip — closeOnEscape는 jsdom radix-vue 한계로 Storybook play 검증).

### 마이그레이션 (v0.4.x → v0.5.0)
- breaking 없음.
- `radix-vue` peerDependency는 v0.4.0(UiSelect)에서 이미 추가됨 — 추가 설치 불필요.
- 원본 `team_agent_front`의 `position='right'` 사이드 모달은 미포함 — 추후 `UiDrawer` 별도 컴포넌트로.

## [0.4.0] - 2026-05-07

### Added — UiSelect 신규 컴포넌트
- **`UiSelect`** — radix-vue 기반 단일 선택 드롭다운 폼 필드. 32회 사용처 핵심 Tier.
  - 폼 필드 풀세트: `label` / `labelHidden` / `required` / `error` / `errorMessage` / `desc` (UiInput과 동일 인터페이스).
  - **a11y 자동**: `aria-required` / `aria-invalid` / `aria-describedby` 자동 연결, errorMessage는 `role="alert"`. radix-vue가 키보드 내비게이션 / 포커스 트랩 / ESC 닫기 처리.
  - **size 토큰**: `sm`(28px) / `md`(32px·기본) / `lg`(40px) / `auth`(44px) — UiInput과 동일 토큰 → 검색바·필터에서 자동 정렬.
  - **shape 토큰**: `rounded`(기본 6px) / `pill`(완전 라운드).
  - **option.disabled** 지원 — radix-vue Item에 그대로 전달, `[data-disabled]` CSS로 흐림 처리.
  - **빈 문자열 value 처리** — radix-vue가 `value=""` 미허용 → 내부 `__ui_select_empty__` 토큰으로 round-trip.
  - **dev 검증** (`import.meta.env.DEV`) — 빈 옵션 / `required + label` 누락 / 중복 `option.value` 시 콘솔 경고.
  - **`focus()` 외부 메서드** — `defineExpose`로 노출.
  - Trigger는 scoped, Portal Content는 global SCSS로 분리 (radix-vue Portal 특성).
- **`SelectOption`** 타입 export — `{ label, value, disabled? }`.

### Storybook
- 11 시나리오 — `Default` (옵션 클릭 + change emit) / `WithLabel` / `Required` / `Error` / `ErrorMessage` (aria-invalid + describedby) / `Desc` (aria-describedby) / `Disabled` / `DisabledOption` (data-disabled) / `Sizes` (sm/md/lg/auth 정렬) / `Shapes` (rounded/pill) / `LongList` (30개 + 240px max-height 스크롤).

### Tests
- 자동 테스트 39 → 60개 (UiSelect 5개 추가, 1개 it.skip — emit round-trip은 jsdom Portal 한계로 Storybook play에서 검증).

### Changed
- `peerDependencies`에 `radix-vue ^1.9.0` 추가 — UiSelect 사용 시 사용자가 함께 설치 필요.

### 마이그레이션 (v0.3.x → v0.4.0)
- breaking 없음.
- UiSelect 사용 프로젝트는 `npm i radix-vue` 추가 필요 (peerDependencies).

## [0.3.0] - 2026-05-06

### Added — UiInput a11y/UX 1순위 누락 보강
- **`label`** prop + **label slot** + 자동 `id` 연결 — `<label for>` ↔ `<input id>` 매핑을 컴포넌트가 자동 처리. `id` 미지정 시 Vue 3.5 `useId`로 인스턴스별 unique id 생성 (SSR 안전).
- **`labelHidden`** prop — DOM에는 있지만 시각 숨김 (스크린리더만 인지). search input 등에서 placeholder 단독 노출 시.
- **`required`** prop과 결합 시 label 옆 빨간 별표(`*`) 자동 표시 (`aria-hidden`).
- **`error`** prop — input 빨간 테두리 + `aria-invalid="true"` 자동.
- **`errorMessage`** prop — 비어있지 않으면 `error: true` 자동 + `<p role="alert">` 빨간 텍스트로 desc 자리에 표시. input의 `aria-describedby`로 자동 연결 (desc보다 우선).
- **`type='url'`** 추가 — 기존 5종(text/search/password/email/tel)에 더해 6종.
- aria-invalid: 외부에서 attrs로 명시한 값도 존중 (내부 error 상태 우선).

### Storybook
- `WithLabel` 신규 스토리 — label / required / labelHidden 데모.
- `ErrorState` 신규 스토리 — error / errorMessage / 메시지 없는 error만 데모.
- `Types` 스토리에 `url` 추가.
- Playground argTypes에 label/labelHidden/error/errorMessage/required 추가, transform이 v-model 코드에 포함.

### Tests
- 자동 테스트 29 → 39개 (label 자동 id, required *, labelHidden, error/aria-invalid, errorMessage role=alert + describedby 우선순위, type=url 등).

### 마이그레이션 (v0.2.x → v0.3.0)
- breaking 없음. 기존 prop 시그니처 그대로.
- 기존 `<UiInput desc="...">` 사용처는 변동 없음. `errorMessage` 사용 시에만 desc가 자동으로 hidden.

## [0.2.0] - 2026-05-06

### Added
- **공용 디자인 토큰 시스템** — `src/styles/tokens/_size.scss`, `_shape.scss`. 폼/액션 컴포넌트가 공유하므로 `<UiInput size="md">` + `<UiButton size="md">`가 검색바에서 자동 정렬.
  - `$size-{xs,sm,md,lg,auth}-{height,icon,font,padding-x}` 변수.
  - `$shape-{rounded,pill,circle}` 변수.
  - `$sizes`, `$shapes` SCSS map (반복 처리용).
- **TS 타입 export** — `SIZES`, `INPUT_SIZES`, `SHAPES` 키 배열 + `Size`, `InputSize`, `Shape` 타입을 라이브러리 entry에서 export.

### UiButton v0.2.0
- **size 4단계** — `xs`(24px) 추가 (기존 sm/md/lg 유지).
- **`shape`** 신규 prop — `rounded` / `pill` / `circle`. circle은 iconOnly 전용.
- **`iconSize`** 신규 prop — 미지정 시 size 따라가고, 명시 시 override.
- **`as="a"` + `target="_blank"`** 시 `rel="noopener noreferrer"` 자동 부여 (보안).
- **type prop에서 `'reset'` 제거** — 사용처 0건. `'button' | 'submit'`만 유지.
- 슬롯 아이콘 사이즈를 컴포넌트 size에 맞춰 자동 적용 (`:deep()` + `:not([class*='size-'])`).
- shape="circle" + iconOnly=false 조합 시 dev 경고.
- 자동 테스트 8 → 17개.

### UiInput v0.2.0 + v0.2.1 fix
- **size 4단계** sm/md/lg/auth — 모두 공용 토큰 사용.
- padding-x 토큰화 — 기존 모든 size 10px 통일에서 sm 10/md 12/lg 16/auth 10 차등.
- **`shape`** 신규 prop — `rounded` / `pill` (검색바). circle은 입력에 어색하여 제외.
- **`iconSize`** 신규 prop — UiButton과 동일 패턴.
- **`required`**, **`autocomplete`**, **`searchAriaLabel`** 신규 prop.
- **IME composition 안전 처리** — `compositionupdate` 직접 sanitize 제거. `compositionstart/end` + `isComposing` 플래그로 한글 자음 분리/stale value/중복 emit 방지.
- **blur clamp+step 순서 수정** — step 반올림 후 min/max 재-clamp. 예: min=0 max=1 step=0.6 value=1 → 1.2 emit되던 버그 → 1로 정정.
- **a11y 강화**:
  - `inheritAttrs: false` + `useAttrs`로 native attrs(`aria-*`, `data-*`, `role` 등)를 input에 forward (wrapper 누수 차단).
  - `desc` → input의 `aria-describedby`로 자동 연결 (Vue 3.5 `useId` 사용, SSR 안전).
  - 검색 아이콘 `<span @click>` → `<button type="button" :disabled>` (키보드 접근).
  - `type="search"` 시 input에 `role="searchbox"` 부여.
- **inputmode 분기**: `numberOnly` 단독이면 `numeric`, `allowDecimal`/`allowNegative` 시 `decimal`.
- **타입 정합 강화**: `update:modelValue` 타입을 `string` → `string | number`로 확장. `modelValue`가 number면 number로 emit.
- enter / search emit 시 `props.modelValue` 대신 DOM의 `input.value` 사용 (stale 방지).
- `decimals` validation — 0 이상 정수 외엔 무시 + dev 경고.
- `min/max/step` + `numberOnly=false` 조합 시 dev 경고.
- autofill 흰 배경 강제 모든 size 적용 (기존 auth-only).
- 자동 테스트 10 → 29개.

### Storybook 개선
- **Playground source.transform 도입** — Controls 변경 시 Show Code 실시간 동기. 기본값과 다른 prop만 출력. iconLeft/iconRight/label 데모 control은 slot 패턴으로 변환.
- argTypes에 `mapping` 사용으로 `'(자동)'`/`'(없음)'` 라벨이 reactive prop change 보장.
- UiButton: AllShapes 신규 / AllSizes 4단계 / AsLink target=\_blank 데모.
- UiInput: AllShapes 신규 / Playground transform 적용.
- 모든 props에 JSDoc — Storybook Controls 패널 설명 자동 추출.

### Migration notes
- `UiButton type="reset"` 제거 — 사용처 0건이라 사실상 무영향.
- `UiInput` md/lg 사용처는 padding-x가 좌우 4-6px씩 늘어남 — 검색바 톤 개선.
- emit 타입 `string | number`로 확장 — number prop을 쓰던 부모는 자동 number 수신.

## [Unreleased]

### Changed
- **scope `@box3101` → `@leechanyong`** 으로 변경 (GitHub은 box3101, npmjs는 leechanyong username). 패키지 import 경로 변경됨.
- **registry: GitHub Packages → npmjs.com** 으로 전환. 진짜 anonymous install 가능 (`.npmrc` 설정 불필요).
- GitHub Actions 워크플로우: `NPM_TOKEN` 시크릿 사용.
- README 설치 가이드 1줄로 단순화 (`npm install @leechanyong/ispark-ui`).
- **public 전환** — repo + package 모두 public.
- 라이센스 `UNLICENSED` → **`MIT`** 변경. `LICENSE` 파일 추가.

## [0.1.0] - 2026-04-28

### Added
- 초기 라이브러리 셋업 (Vue 3 + Vite + Storybook + Vitest)
- **UiButton** 컴포넌트
  - variant 4종: `primary` / `secondary` / `ghost` / `danger`
  - size 3종: `sm` (28px) / `md` (32px) / `lg` (40px)
  - states: `disabled` / `loading` (스피너 사이즈 자동) / `fullWidth` / `iconOnly`
  - polymorphic: `as="button" | "a"` (링크로 사용 가능)
  - 안전성: `type="button"` 기본값, `as="a"` + `disabled` 시 `aria-disabled` + `tabindex=-1`
  - 접근성: `iconOnly` + `ariaLabel` 강제 (dev 콘솔 경고)
  - 외부 메서드: `defineExpose({ focus, blur, el })`
- 디자인 토큰 시스템 — CSS 변수로 런타임 테마 오버라이드 가능
- 아이콘 시스템 — 10종 SVG (plus/edit/trashcan/close/search/check/arrow-right/download/chevron-down/refresh), base64 인라인으로 self-contained
- 자동 테스트 8개 (vitest) + Storybook 8 stories + autodocs
