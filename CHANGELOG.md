# Changelog

본 프로젝트는 [Keep a Changelog](https://keepachangelog.com/ko/) 형식과 [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

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
