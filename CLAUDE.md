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

## 마이그레이션 출처

원본: `C:\team_agent_front\components\ui\` (29개 컴포넌트)

| Tier | 컴포넌트 |
|---|---|
| 시범 | UiButton |
| 1 - 폼 | UiInput, UiTextarea, UiCheckbox, UiToggle, UiSelect |
| 2 - 표시 | UiBadge, UiTag, UiStatusBadge, UiTooltip, UiLoading, UiEmpty |
| 3 - 레이아웃 | UiTab, UiPagination, UiFormField, UiSettingSection |
| 4 - 모달 | UiModal, UiConfirmModal, UiDialogModal, UiToast, UiDropdownMenu |
| 5 - 데이터 | UiTable, UiDragTable, UiMultiSelect, UiDatePicker, UiStatCard |
| 6 - 외부 의존 | UiChart, UiCodeBlock, UiFileUpload, TmplFormPanel, TmplListSections |

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
