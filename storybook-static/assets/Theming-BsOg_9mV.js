import{j as r,M as s}from"./index-BHMKMgKN.js";import{useMDXComponents as n}from"./index-BYsBzsiC.js";import"./iframe-B9VwwiXa.js";import"./index-8_2S3kac.js";import"./index-DrFu-skq.js";function d(c){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...n(),...c.components};return r.jsxs(r.Fragment,{children:[r.jsx(s,{title:"Get Started/Theming"}),`
`,r.jsx(e.h1,{id:"테마-커스터마이즈",children:"테마 커스터마이즈"}),`
`,r.jsxs(e.p,{children:[r.jsx(e.code,{children:"ispark-ui"}),"는 두 종류의 변경 지점을 제공한다. ",r.jsx(e.strong,{children:"색상"}),"은 CSS 변수, ",r.jsx(e.strong,{children:"구조"}),"는 부모 클래스로 specificity 끌어올리기."]}),`
`,r.jsxs("table",{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"종류"}),r.jsx("th",{children:"변경 방법"}),r.jsx("th",{children:"자유도"}),r.jsx("th",{children:"런타임 전환"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"색상"})}),r.jsxs("td",{children:[r.jsx("code",{children:":root"})," CSS 변수 덮어쓰기"]}),r.jsx("td",{children:"무조건 OK"}),r.jsx("td",{children:"가능 (즉시 반영)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"구조 (간격·radius·border)"})}),r.jsx("td",{children:"부모 클래스로 selector 확장"}),r.jsx("td",{children:"가능, import 순서 주의"}),r.jsx("td",{children:"불가 (빌드 타임)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"폰트·shape·spacing 토큰"})}),r.jsx("td",{children:"SCSS 변수 (라이브러리 빌드 시점)"}),r.jsx("td",{children:"불가"}),r.jsx("td",{children:"불가"})]})]})]}),`
`,r.jsxs(e.p,{children:["라이브러리 컴포넌트는 모두 ",r.jsx(e.code,{children:"<style scoped>"}),"로 빌드되어 ",r.jsx(e.code,{children:".ui-accordion-trigger[data-v-xxxxx]"})," 형태로 hash 속성이 박힌다. 단순히 ",r.jsx(e.code,{children:".ui-accordion-trigger { ... }"}),"만 쓰면 specificity가 낮아 덮어쓰기 실패한다."]}),`
`,r.jsx(e.h2,{id:"빠른-시작--5줄로-브랜드-컬러-적용",children:"빠른 시작 — 5줄로 브랜드 컬러 적용"}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-scss",children:`// app.scss — ispark-ui style.css 뒤에 로드\r
:root {\r
  --color-primary: #ff7518;\r
  --color-primary-hover: #e5660f;\r
  --color-primary-bg: #fff4eb;\r
  --color-primary-rgb: 255, 117, 24; // tint 배경 계산용 (필수)\r
}
`})}),`
`,r.jsx(e.p,{children:"primary 한 톤만 바꿔도 Button/Select/Input focus ring/Tab indicator/Pagination active/Badge primary tint/Modal accent까지 일괄 반영. 다른 변수는 그대로 두고 시작해도 충돌 없음."}),`
`,r.jsxs(e.h2,{id:"1-색상--root-css-변수",children:["1. 색상 — ",r.jsx(e.code,{children:":root"})," CSS 변수"]}),`
`,r.jsxs(e.p,{children:[r.jsx(e.code,{children:"ispark-ui/style.css"}),"가 ",r.jsx(e.code,{children:":root"}),"에 모든 테마 변수를 노출한다. 컨슈머가 같은 ",r.jsx(e.code,{children:":root"})," 또는 더 specific한 selector(예: ",r.jsx(e.code,{children:".app-theme"}),")에서 덮어쓰면 즉시 반영."]}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-scss",children:`@import 'ispark-ui/style.css';\r
\r
:root {\r
  --color-primary: #ff7518;\r
  --color-primary-hover: #e5660f;\r
  --color-primary-bg: #fff4eb;\r
  --color-primary-rgb: 255, 117, 24;\r
\r
  --color-danger: #c73e07;\r
}
`})}),`
`,r.jsx(e.h3,{id:"노출된-css-변수-전체",children:"노출된 CSS 변수 (전체)"}),`
`,r.jsxs("table",{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"카테고리"}),r.jsx("th",{children:"변수"}),r.jsx("th",{children:"용도"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{rowspan:"3",children:r.jsx("strong",{children:"Primary"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-primary"})," · ",r.jsx("code",{children:"-hover"})," · ",r.jsx("code",{children:"-dark"})," · ",r.jsx("code",{children:"-dark-hover"})]}),r.jsx("td",{children:"브랜드 메인 + 4단계 상태"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"--color-primary-rgb"})}),r.jsxs("td",{children:["tint 배경 계산용 (예: ",r.jsx("code",{children:"rgba(var(--color-primary-rgb), 0.12)"}),")"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"--color-primary-bg"})}),r.jsx("td",{children:"primary 계열 옅은 배경 (Chat user message 등)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"Danger"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-danger"})," · ",r.jsx("code",{children:"-hover"})," · ",r.jsx("code",{children:"-dark"})]}),r.jsx("td",{children:"파괴적 액션 (삭제·에러)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"Success"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-success"})," · ",r.jsx("code",{children:"-hover"})]}),r.jsx("td",{children:"완료·확인"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"Warning"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-warning"})," · ",r.jsx("code",{children:"-hover"})]}),r.jsx("td",{children:"주의·검토 필요"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"Info"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-info"})," · ",r.jsx("code",{children:"-hover"})]}),r.jsx("td",{children:"안내·중립 정보"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"Border"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-border"})," · ",r.jsx("code",{children:"--color-border-light"})]}),r.jsx("td",{children:"일반 경계 / 옅은 구분선"})]}),r.jsxs("tr",{children:[r.jsx("td",{rowspan:"2",children:r.jsx("strong",{children:"Text"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-text-primary"})," · ",r.jsx("code",{children:"-secondary"})," · ",r.jsx("code",{children:"-dark"})]}),r.jsx("td",{children:"본문 / 보조 / 강조"})]}),r.jsxs("tr",{children:[r.jsxs("td",{children:[r.jsx("code",{children:"--color-text-heading"})," · ",r.jsx("code",{children:"-heading-sub"})," · ",r.jsx("code",{children:"-muted"})," · ",r.jsx("code",{children:"-disabled"})]}),r.jsx("td",{children:"제목 / 부제 / 뮤트 / 비활성"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"Surface"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-background"})," · ",r.jsx("code",{children:"--color-surface"})," · ",r.jsx("code",{children:"--color-bg-elevated"})]}),r.jsx("td",{children:"페이지 배경 / 카드 배경 / 모달·드롭다운 등 위로 떠 있는 표면"})]})]})]}),`
`,r.jsx(e.p,{children:"폰트·간격·shape는 빌드 타임 SCSS 변수라 런타임 변경 불가. (향후 SCSS API 노출 검토 — 마지막 섹션 참고)"}),`
`,r.jsx(e.h2,{id:"2-구조--부모-클래스로-덮어쓰기",children:"2. 구조 — 부모 클래스로 덮어쓰기"}),`
`,r.jsxs(e.p,{children:[r.jsx(e.code,{children:"<style scoped>"}),"의 hash specificity(",r.jsx(e.code,{children:"0,2,0"}),")에 맞추려면 부모 클래스를 한 칸 끼워 selector를 같은 specificity로 만든다."]}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-vue",children:`<!-- 컨슈머 App.vue 루트 -->\r
<template>\r
  <div class="app-theme">\r
    <!-- 모든 ispark-ui 컴포넌트는 이 안에서 렌더 -->\r
  </div>\r
</template>
`})}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-scss",children:`// 컨슈머 SCSS — ispark-ui 다음에 로드\r
.app-theme {\r
  .ui-accordion-trigger { padding: 20px 24px; }\r
  .ui-accordion-item    { border-bottom-style: dashed; }\r
  .ui-tab-item.is-active::after { height: 3px; }\r
  .ui-button { letter-spacing: 0.02em; }\r
}
`})}),`
`,r.jsxs(e.p,{children:[r.jsx(e.strong,{children:"왜 동작하나"})," — 라이브러리는 ",r.jsx(e.code,{children:".ui-accordion-trigger[data-v-xxxxx]"})," (specificity ",r.jsx(e.code,{children:"0,2,0"}),"), 컨슈머는 ",r.jsx(e.code,{children:".app-theme .ui-accordion-trigger"})," (specificity ",r.jsx(e.code,{children:"0,2,0"}),"). 동률일 땐 ",r.jsx(e.strong,{children:"뒤에 로드된 쪽이 이긴다"}),"."]}),`
`,r.jsx(e.h2,{id:"3-import-순서-중요",children:"3. Import 순서 (중요)"}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-ts",children:`// ❌ 잘못 — 라이브러리가 뒤에 와서 컨슈머 override를 덮어버림\r
import './app-theme.scss'\r
import 'ispark-ui/style.css'\r
\r
// ✅ 올바름\r
import 'ispark-ui/style.css'\r
import './app-theme.scss'
`})}),`
`,r.jsx(e.h2,{id:"4-실전-레시피",children:"4. 실전 레시피"}),`
`,r.jsx(e.h3,{id:"4-1-회사-톤-변경-한-파일에-모음",children:"4-1. 회사 톤 변경 (한 파일에 모음)"}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-scss",children:`// app-theme.scss — 한 파일에 색·폰트·미세 구조 다 담음\r
:root {\r
  // 브랜드 컬러 (오렌지 톤)\r
  --color-primary: #ff7518;\r
  --color-primary-hover: #e5660f;\r
  --color-primary-dark: #c73e07;\r
  --color-primary-dark-hover: #a83306;\r
  --color-primary-rgb: 255, 117, 24;\r
  --color-primary-bg: #fff4eb;\r
\r
  // semantic\r
  --color-danger: #dc2626;\r
  --color-success: #15803d;\r
\r
  // 텍스트 톤 (살짝 더 진하게)\r
  --color-text-primary: #1f2937;\r
  --color-text-heading: #0f172a;\r
}\r
\r
.app-theme {\r
  // 폰트\r
  font-family: 'Spoqa Han Sans Neo', sans-serif;\r
\r
  // 컴포넌트 미세 조정\r
  .ui-button { font-weight: 600; letter-spacing: 0.01em; }\r
  .ui-accordion-item { border-bottom-color: #eee; }\r
}
`})}),`
`,r.jsxs(e.h3,{id:"4-2-다크-모드-후크-data-themedark",children:["4-2. 다크 모드 후크 (",r.jsx(e.code,{children:'data-theme="dark"'}),")"]}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-html",children:`<!-- 컨슈머 root -->\r
<html data-theme="light">
`})}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-scss",children:`// 라이트 (기본 :root는 이미 라이브러리가 설정)\r
:root {\r
  --color-bg-elevated: #ffffff;\r
  --color-background: #f4f7f9;\r
  --color-text-primary: #4d5462;\r
  --color-text-heading: #1e2124;\r
  --color-border: #dce4e9;\r
  --color-border-light: #ecf0f3;\r
}\r
\r
// 다크\r
[data-theme="dark"] {\r
  --color-bg-elevated: #1f2026;\r
  --color-background: #1a1b1f;\r
  --color-surface: #25272d;\r
\r
  --color-text-primary: #d4d3ca;\r
  --color-text-heading: #f5f4ed;\r
  --color-text-secondary: #8a8a82;\r
  --color-text-muted: #6b6d75;\r
\r
  --color-border: #2a2c33;\r
  --color-border-light: #25272d;\r
\r
  // primary는 다크에서 살짝 더 밝게 (가독성)\r
  --color-primary: #6b8fe8;\r
  --color-primary-hover: #88a3eb;\r
}
`})}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-ts",children:`// 토글 트리거 (Pinia/composable 자유)\r
document.documentElement.dataset.theme =\r
  document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
`})}),`
`,r.jsx(e.h3,{id:"4-3-컴포넌트별-디테일-override-accordion-시각-차별화",children:"4-3. 컴포넌트별 디테일 override (Accordion 시각 차별화)"}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-scss",children:`.app-theme {\r
  // 더 굵은 좌측 인디케이터 + 부드러운 둥글기\r
  .ui-accordion-item {\r
    border-radius: 8px;\r
    margin-bottom: 4px;\r
    background: var(--color-surface);\r
  }\r
  .ui-accordion-trigger {\r
    padding: 18px 22px;\r
    font-weight: 700;\r
  }\r
  .ui-accordion-trigger[data-state='open'] {\r
    background: var(--color-primary-bg);\r
  }\r
  .ui-accordion-chevron {\r
    color: var(--color-primary);\r
  }\r
}
`})}),`
`,r.jsx(e.h2,{id:"5-컴포넌트별-css-변수-활용-매트릭스",children:"5. 컴포넌트별 CSS 변수 활용 매트릭스"}),`
`,r.jsxs(e.p,{children:["어떤 컴포넌트가 어떤 변수에 반응하는지. ",r.jsx(e.strong,{children:"primary 한 톤만 바꿔도 거의 모든 핵심 컴포넌트에 일괄 반영"}),"."]}),`
`,r.jsxs("table",{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"컴포넌트"}),r.jsx("th",{children:"주로 사용하는 변수"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"UiButton"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-primary"})," · ",r.jsx("code",{children:"-hover"})," · ",r.jsx("code",{children:"-dark"})," · ",r.jsx("code",{children:"--color-danger"})]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"UiInput · UiSelect · UiTextarea"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-primary"})," (focus ring/border) · ",r.jsx("code",{children:"--color-border"})," · ",r.jsx("code",{children:"--color-text-disabled"})," (placeholder) · ",r.jsx("code",{children:"--color-danger"})," (error)"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"UiCheckbox · UiRadio · UiToggle"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-primary"})," · ",r.jsx("code",{children:"-hover"})," · ",r.jsx("code",{children:"--color-border"})]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"UiTab"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-primary"})," (active indicator) · ",r.jsx("code",{children:"--color-text-dark"})]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"UiPagination"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-primary"})," · ",r.jsx("code",{children:"-hover"})," · ",r.jsx("code",{children:"--color-border"})]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"UiBadge"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-primary-rgb"})," · ",r.jsx("code",{children:"--color-success"})," · ",r.jsx("code",{children:"--color-warning"})," · ",r.jsx("code",{children:"--color-danger"})," · ",r.jsx("code",{children:"--color-info"})," · ",r.jsx("code",{children:"--color-background"})," (default tint)"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"UiToast"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-success"})," · ",r.jsx("code",{children:"--color-warning"})," · ",r.jsx("code",{children:"--color-danger"})," · ",r.jsx("code",{children:"--color-info"})," · ",r.jsx("code",{children:"--color-text-disabled"})," (close 버튼)"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"UiModal · UiDropdownMenu · UiSelect (Portal)"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-bg-elevated"})," · ",r.jsx("code",{children:"--color-border"})]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"UiTable"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-primary-rgb"})," (row hover/selected) · ",r.jsx("code",{children:"--color-bg-elevated"})," · ",r.jsx("code",{children:"--color-border"})," · ",r.jsx("code",{children:"--color-text-muted"})," (header)"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"UiDatePicker · UiDateRangePicker"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-primary"})," · ",r.jsx("code",{children:"--color-text-disabled"})," (placeholder) · ",r.jsx("code",{children:"--color-border"})]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:"UiAccordion"})}),r.jsxs("td",{children:[r.jsx("code",{children:"--color-primary"})," (open trigger) · ",r.jsx("code",{children:"--color-border"})," · ",r.jsx("code",{children:"--color-text-secondary"})]})]})]})]}),`
`,r.jsx(e.h2,{id:"6-트러블슈팅",children:"6. 트러블슈팅"}),`
`,r.jsxs("table",{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"증상"}),r.jsx("th",{children:"원인"}),r.jsx("th",{children:"해결"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:"CSS 변수 덮어쓰기가 안 먹힘"}),r.jsxs("td",{children:["컨슈머 SCSS가 ",r.jsx("code",{children:"ispark-ui/style.css"}),"보다 먼저 로드됨"]}),r.jsx("td",{children:"main entry에서 ispark-ui 먼저, 컨슈머 다음"})]}),r.jsxs("tr",{children:[r.jsxs("td",{children:["구조 override(",r.jsx("code",{children:".ui-button"}),")가 무시됨"]}),r.jsx("td",{children:"scoped hash와 specificity 동률 + 라이브러리가 뒤에 로드됨"}),r.jsxs("td",{children:["부모 클래스 추가 (",r.jsx("code",{children:".app-theme .ui-button"}),") + import 순서 확인"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:"Nuxt에서 일부 페이지만 적용 안 됨"}),r.jsx("td",{children:"Nuxt가 페이지별 CSS chunk 분리 → 컨슈머 CSS가 페이지 chunk 안에 들어가 라이브러리 글로벌보다 늦게 inject"}),r.jsxs("td",{children:[r.jsx("code",{children:"nuxt.config.ts"}),"의 ",r.jsx("code",{children:"css"})," 배열에 ",r.jsx("code",{children:"['ispark-ui/style.css', '~/assets/css/app-theme.scss']"})," 순서로 명시"]})]}),r.jsxs("tr",{children:[r.jsxs("td",{children:[r.jsx("code",{children:"--color-primary-rgb"}),"를 안 바꾸니 tint 배경(Table hover, Badge)이 안 따라옴"]}),r.jsxs("td",{children:["tint는 ",r.jsx("code",{children:"rgba(var(--color-primary-rgb), 0.x)"})," 패턴이라 RGB 값을 별도로 지정해야 함"]}),r.jsxs("td",{children:["primary 색 hex의 RGB 값을 ",r.jsx("code",{children:"255, 117, 24"})," 형태로 명시"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:"Portal 컴포넌트(Modal, Dropdown, Select)에만 override 안 먹음"}),r.jsxs("td",{children:["Portal로 ",r.jsx("code",{children:"body"})," 끝에 렌더 → ",r.jsx("code",{children:".app-theme"})," 자식이 아니라서 부모 클래스 selector 실패"]}),r.jsxs("td",{children:["CSS 변수는 OK (",r.jsx("code",{children:":root"})," 상속). 구조 override는 ",r.jsx("code",{children:"body"})," 또는 ",r.jsx("code",{children:":where(html)"})," 같은 글로벌 selector로"]})]}),r.jsxs("tr",{children:[r.jsxs("td",{children:["SCSS ",r.jsx("code",{children:"$color-*"})," 변수 직접 import해서 쓰고 싶음"]}),r.jsx("td",{children:"라이브러리 SCSS 소스는 빌드 시점에 컴파일됨 — 외부 export 안 함"}),r.jsx("td",{children:"현재는 CSS 변수만 사용. SCSS API 노출은 로드맵에 있음"})]})]})]}),`
`,r.jsx(e.h2,{id:"7-안-되는-것-의도된-한계",children:"7. 안 되는 것 (의도된 한계)"}),`
`,r.jsxs(e.ul,{children:[`
`,r.jsxs(e.li,{children:[r.jsxs(e.strong,{children:[r.jsx(e.code,{children:"<style scoped>"})," 내부의 미세 디테일"]}),"까지는 못 건드림. 예: ",r.jsx(e.code,{children:".ui-accordion-content"}),"의 ",r.jsx(e.code,{children:"animation"})," 이름. 필요하면 같은 keyframe을 부모 스코프에서 재정의."]}),`
`,r.jsxs(e.li,{children:[r.jsx(e.strong,{children:"컴포넌트 props로 노출되지 않은 동작"}),". 디자인 정책상 막아둔 것은 라이브러리에 요청."]}),`
`,r.jsxs(e.li,{children:[r.jsxs(e.strong,{children:[r.jsx(e.code,{children:"!important"}),"는 마지막 수단"]}),". 일단 부모 클래스 specificity로 해결되면 그쪽이 깨끗하다."]}),`
`]}),`
`,r.jsx(e.h2,{id:"8-다음-단계",children:"8. 다음 단계"}),`
`,r.jsxs(e.ul,{children:[`
`,r.jsxs(e.li,{children:[r.jsx(e.strong,{children:"디자인 토큰 export"})," — 현재 TS로 ",r.jsx(e.code,{children:"Size"}),", ",r.jsx(e.code,{children:"Shape"}),", ",r.jsx(e.code,{children:"SelectSize"})," 등 prop 타입은 export 중. 향후 컬러/spacing 토큰도 TS 객체로 export 검토."]}),`
`,r.jsxs(e.li,{children:[r.jsx(e.strong,{children:"SCSS API"})," — ",r.jsx(e.code,{children:"@use '@leechanyong/ispark-ui/styles' as ispark;"})," 형태로 ",r.jsx(e.code,{children:"$color-primary"}),", ",r.jsx(e.code,{children:"$spacing-md"})," 등을 직접 import할 수 있게 검토 중. 현 시점은 CSS 변수만."]}),`
`,r.jsxs(e.li,{children:[r.jsx(e.strong,{children:"다크 모드 빌트인"})," — 현재 ",r.jsx(e.code,{children:'[data-theme="dark"]'})," 패턴은 컨슈머 작성. 향후 라이브러리 차원에서 dark preset 옵션 제공 검토."]}),`
`]}),`
`,r.jsx(e.h2,{id:"참고",children:"참고"}),`
`,r.jsxs(e.ul,{children:[`
`,r.jsxs(e.li,{children:[r.jsx("a",{target:"_top",href:"/?path=/docs/get-started-install--docs",children:"Install"})," — 설치·기본 사용"]}),`
`,r.jsxs(e.li,{children:[r.jsx("a",{target:"_top",href:"/?path=/docs/get-started-stack--docs",children:"Stack"})," — 패키지·명령어"]}),`
`,r.jsxs(e.li,{children:[r.jsx("a",{target:"_top",href:"/?path=/docs/get-started-philosophy--docs",children:"Philosophy"})," — 한 스토리, 세 가지 역할"]}),`
`,r.jsxs(e.li,{children:[r.jsx("a",{target:"_top",href:"/?path=/docs/get-started-migration--docs",children:"Migration"})," — 마이그레이션 정책·현황"]}),`
`]})]})}function x(c={}){const{wrapper:e}={...n(),...c.components};return e?r.jsx(e,{...c,children:r.jsx(d,{...c})}):d(c)}export{x as default};
