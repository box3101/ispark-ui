import{j as t,M as i}from"./index-BHMKMgKN.js";import{useMDXComponents as r}from"./index-BYsBzsiC.js";import"./iframe-B9VwwiXa.js";import"./index-8_2S3kac.js";import"./index-DrFu-skq.js";function n(e){const s={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(i,{title:"Get Started/Philosophy"}),`
`,t.jsx(s.h1,{id:"철학",children:"철학"}),`
`,t.jsxs(s.p,{children:["라이브러리를 설계할 때 두 가지를 지킨다 — ",t.jsx(s.strong,{children:"중복을 만들지 않는다"}),", ",t.jsx(s.strong,{children:"세 파일 세트로 관리한다"}),". 아래는 그 두 원칙이 왜 그렇게 정해졌는지에 대한 설명."]}),`
`,t.jsx(s.h2,{id:"한-스토리-세-가지-역할",children:"한 스토리, 세 가지 역할"}),`
`,t.jsx(s.p,{children:"컴포넌트마다 스토리 파일을 하나 쓴다. 그 한 파일이 세 가지 일을 동시에 한다."}),`
`,t.jsxs("table",{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"역할"}),t.jsx("th",{children:"작동 방식"})]})}),t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{children:"문서"}),t.jsx("td",{children:"Storybook autodocs 로 자동 변환되어 사이드바에 노출"})]}),t.jsxs("tr",{children:[t.jsx("td",{children:"시각 회귀"}),t.jsx("td",{children:"스토리 화면이 곧 디자인 검증 대상 (Chromatic 연동은 선택)"})]}),t.jsxs("tr",{children:[t.jsx("td",{children:"단위 테스트"}),t.jsxs("td",{children:[t.jsx("code",{children:"composeStories"})," 로 Vitest 에 그대로 import 하면 play 함수 상호작용이 테스트가 됨"]})]})]})]}),`
`,t.jsx(s.p,{children:"같은 시나리오를 테스트 코드로 다시 쓰지 않는다. 중복이 사라진다."}),`
`,t.jsx(s.h2,{id:"컴포넌트--세-파일-세트",children:"컴포넌트 = 세 파일 세트"}),`
`,t.jsx(s.p,{children:"새 컴포넌트는 항상 세 파일을 같이 만든다."}),`
`,t.jsx(s.pre,{children:t.jsx(s.code,{children:`src/components/ui/\r
├── UiButton.vue          컴포넌트 본체\r
├── UiButton.stories.ts   CSF3 스토리 + play (문서 + 상호작용)\r
└── UiButton.test.ts      composeStories 재사용 (엣지 케이스만)
`})}),`
`,t.jsxs(s.p,{children:["스토리가 최소 테스트 케이스다. 일반 동작은 스토리로 충분하고, ",t.jsx(s.code,{children:".test.ts"})," 는 엣지 케이스·클래스 검증·분기 로직처럼 스토리가 못 잡는 것만 맡는다. play 함수가 길어지면 E2E 신호다. 그때는 Playwright 이전을 검토한다."]}),`
`,t.jsx(s.h2,{id:"다음-단계",children:"다음 단계"}),`
`,t.jsxs(s.ul,{children:[`
`,t.jsxs(s.li,{children:[t.jsx("a",{target:"_top",href:"/?path=/docs/get-started-install--docs",children:"Install"})," — 설치·기본 사용"]}),`
`,t.jsxs(s.li,{children:[t.jsx("a",{target:"_top",href:"/?path=/docs/get-started-stack--docs",children:"Stack"})," — 패키지·명령어"]}),`
`,t.jsxs(s.li,{children:[t.jsx("a",{target:"_top",href:"/?path=/docs/get-started-theming--docs",children:"Theming"})," — 색상·구조 커스터마이즈"]}),`
`,t.jsxs(s.li,{children:[t.jsx("a",{target:"_top",href:"/?path=/docs/get-started-migration--docs",children:"Migration"})," — 무엇이 옮겨졌나"]}),`
`]})]})}function x(e={}){const{wrapper:s}={...r(),...e.components};return s?t.jsx(s,{...e,children:t.jsx(n,{...e})}):n(e)}export{x as default};
