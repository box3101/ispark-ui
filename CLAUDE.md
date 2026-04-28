# ispark-ui — 디자인 시스템 UI 라이브러리

> Vue 3 + Vite + Storybook 기반 UI 컴포넌트 라이브러리
> `team_agent_front`의 UI 컴포넌트를 디자인 시스템화하여 재사용 가능한 라이브러리로 분리

## 프로젝트 정체성

| 항목 | 내용 |
|---|---|
| **타입** | UI 컴포넌트 라이브러리 (앱 아님) |
| **빌드** | Vite + Vue3 + TypeScript |
| **문서/플레이그라운드** | Storybook 9 (CSF3 + play 함수) |
| **테스트** | Vitest + @testing-library/vue + composeStories |
| **스타일** | SCSS (글로벌 변수/믹스인) + CSS Variables (테마) |

## 핵심 전략 (디자인 시스템 가이드)

> **"스토리 하나로 문서 + 시각 회귀 + 단위 테스트 3역할"**

- `composeStories`로 스토리를 테스트에서 재사용 → 중복 제거
- `play` 함수에 상호작용 작성 → Storybook UI에서도, Vitest에서도 실행됨
- **Phase 1 최소 7개 패키지로 시작**, Phase 2는 필요할 때만 추가

### Phase 1 패키지 (현재)

| 패키지 | 용도 |
|---|---|
| `@storybook/vue3-vite` | Storybook 본체 |
| `@storybook/test` | fn(), expect, userEvent, within |
| `@storybook/addon-essentials` | Controls, Docs, Viewport |
| `vitest` | 테스트 러너 |
| `@vitejs/plugin-vue` | Vue SFC 처리 |
| `@testing-library/vue` | render, screen |
| `jsdom` | 브라우저 환경 에뮬레이션 |

### Phase 2 (필요할 때만)

- `@testing-library/jest-dom` — toBeInTheDocument 매처
- `@testing-library/user-event` — 복잡한 상호작용
- `@storybook/addon-a11y` — 접근성 위반 감지
- `@storybook/test-runner` — CI에서 play 자동 실행
- `@vue/test-utils` — 컴포넌트 내부 상태 접근
- `@chromatic-com/storybook` — 픽셀 시각 회귀

## 컴포넌트 작성 3종 세트 원칙

UI 컴포넌트 1개 생성 시 **반드시 3개 파일** 함께 작성:

```
src/components/ui/
├── UiButton.vue          # 컴포넌트 본체
├── UiButton.stories.ts   # CSF3 스토리 + play 함수
└── UiButton.test.ts      # composeStories 재사용 (엣지케이스만)
```

- 스토리 = 최소 테스트 케이스, 엣지 케이스만 별도 `.test.ts`로
- play 함수가 길어지면 → E2E 신호 → Playwright로 이전 고려
- `@storybook/test`의 `fn()`은 `jest.fn()` 대체, play/Vitest 공용

## 폴더 구조

```
ispark-ui/
├── .claude/rules/        # team_agent_front에서 가져온 UI 규칙
├── .storybook/           # Storybook 설정
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── components/ui/    # Ui 접두사 컴포넌트 (UiButton 등)
│   ├── styles/
│   │   ├── utils/        # _variables.scss, _mixins.scss (글로벌)
│   │   ├── base/         # 리셋, 타이포 베이스
│   │   └── main.scss
│   └── index.ts          # 라이브러리 엔트리 (export)
├── vitest.config.ts
├── vitest.setup.ts
└── vite.config.ts
```

## 마이그레이션 정책 (기획팀장 결정)

> **"라이브러리는 적게, 강하게. 사용 안 되는 건 옮기지 않는다."**

### 핵심 룰

- **🔴 10회 이상 사용**: 즉시 마이그레이션 대상
- **🟡 5~9회 사용**: 보류. 다른 프로젝트에서 요청 들어오거나 디자인팀장 승인 시에만
- **⚪ 1~4회 사용**: 마이그레이션 **안 함**. 원본 프로젝트에 유지
- **⚫ 0회 사용 (현재 미사용)**: 마이그레이션 **안 함**. 사용처 없는 컴포넌트는 라이브러리 부담만

### 측정 방법

```bash
# team_agent_front 기준 사용 파일 수 측정
cd C:/team_agent_front/components
grep -r --include="*.vue" -l "<UiName\b" . | grep -v "^./ui/" | wc -l
```

### 데이터 기반 로드맵 (현재 측정값)

| Tier | 컴포넌트 (사용 횟수) | 상태 |
|---|---|---|
| 🔴 핵심 (10+) | **UiButton (71)**, **UiInput (46)**, UiSelect (32), UiModal (31), UiTextarea (20), UiEmpty (19), UiToggle (15), UiLoading (13), UiCheckbox (13), UiBadge (10) | UiButton/UiInput ✅ 완료 · 8개 남음 |
| 🟡 중간 (5~9) | UiTable (7) | 보류 |
| ⚪ 적음 (1~4) | UiTooltip, UiTag, UiDropdownMenu, UiDatePicker, UiChart, UiPagination, UiDialogModal, UiCodeBlock, UiMultiSelect, UiTab, UiStatCard, UiSettingSection, UiFormField, UiFileUpload | 마이그레이션 안 함 |
| ⚫ 미사용 (0) | UiToast, UiStatusBadge, UiDragTable, UiConfirmModal, TmplFormPanel, TmplListSections | 마이그레이션 안 함 |

### 새 컴포넌트 추가 시 체크리스트

1. **사용 빈도 측정** (위 명령) — 10회 미만이면 추가 안 함
2. **다른 프로젝트 요청** 있으면 5회까지도 검토
3. **이유 PR description에 명시** — "왜 추가하는지"
4. **마이그레이션 시 정리 적용** — variant/size 단순화 (UiButton 사례 참고: 8→4, 6→3)

### 원본은 살아있음

마이그레이션 안 한 컴포넌트는 `C:\team_agent_front\components\ui\` 그대로 존재 — 원본 프로젝트에서 계속 사용 가능. 라이브러리 분리는 **재사용 가치 있는 것만**.

## 세부 규칙

> 아래 파일들은 `team_agent_front/.claude/rules/`에서 그대로 가져왔습니다.
> 본 라이브러리에서도 동일하게 적용합니다.

- [`.claude/rules/components.md`](./.claude/rules/components.md) — 컴포넌트 분류, Ui 접두사, 다이얼로그, 폼 검증
- [`.claude/rules/scss.md`](./.claude/rules/scss.md) — SCSS 구조, BEM 미사용, 디자인 토큰, 타이포 프리셋
- [`.claude/rules/naming.md`](./.claude/rules/naming.md) — 파일/함수/변수 네이밍, Props 순서
- [`.claude/rules/project-conventions.md`](./.claude/rules/project-conventions.md) — Tech stack, 한국어 주석
- [`.claude/rules/strict-rules.md`](./.claude/rules/strict-rules.md) — 작업 원칙 (SEARCH FIRST, REUSE FIRST)

## 명령어

```bash
npm run storybook       # Storybook dev (포트 6006)
npm run build-storybook # Storybook 정적 빌드
npm test                # Vitest 단발
npm run test:watch      # Vitest watch 모드
```
