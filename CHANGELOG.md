# Changelog

본 프로젝트는 [Keep a Changelog](https://keepachangelog.com/ko/) 형식과 [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

## [Unreleased]

### Changed
- **registry: GitHub Packages → npmjs.com** 으로 전환. 진짜 anonymous install 가능 (`.npmrc` 설정 불필요).
- GitHub Actions 워크플로우: `NPM_TOKEN` 시크릿 사용.
- README 설치 가이드 1줄로 단순화 (`npm install @box3101/ispark-ui`).
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
