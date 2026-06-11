import{j as e,M as d}from"./index-BHMKMgKN.js";import{useMDXComponents as t}from"./index-BYsBzsiC.js";import"./iframe-B9VwwiXa.js";import"./index-8_2S3kac.js";import"./index-DrFu-skq.js";function r(n){const s={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Get Started/Stack"}),`
`,e.jsx(s.h1,{id:"스택--패키지--명령어",children:"스택 · 패키지 · 명령어"}),`
`,e.jsx(s.p,{children:"ispark-ui가 어떤 패키지 위에서 어떻게 굴러가는지 한눈에. Phase 1은 7개, Phase 2는 필요할 때만 늘린다."}),`
`,e.jsx(s.h2,{id:"패키지-최소로-시작",children:"패키지: 최소로 시작"}),`
`,e.jsx(s.p,{children:"미리 다 깔지 않는다. 필요해지면 그때 추가한다. Phase 1은 7개로 출발한다."}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Storybook"})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"@storybook/vue3-vite"})," · Storybook 본체 (Vue 3 + Vite 빌더)"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"@storybook/test"})," · ",e.jsx(s.code,{children:"fn()"}),", ",e.jsx(s.code,{children:"expect"}),", ",e.jsx(s.code,{children:"userEvent"}),", ",e.jsx(s.code,{children:"within"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"@storybook/addon-essentials"})," · Controls, Docs, Viewport, Backgrounds"]}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"테스트"})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"vitest"})," · 러너"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"@vitejs/plugin-vue"})," · Vue SFC 처리"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"@testing-library/vue"})," · ",e.jsx(s.code,{children:"render"}),", ",e.jsx(s.code,{children:"screen"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"jsdom"})," · Node에서 DOM 에뮬레이션"]}),`
`]}),`
`,e.jsx(s.p,{children:"Phase 2는 문제가 생겼을 때 해결책으로만 추가한다."}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"패키지"}),e.jsx("th",{children:"추가 시점"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"@testing-library/jest-dom"})}),e.jsxs("td",{children:[e.jsx("code",{children:"toBeInTheDocument"})," 매처가 필요할 때"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"@testing-library/user-event"})}),e.jsx("td",{children:"타이핑·드래그 등 복잡한 상호작용"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"@storybook/addon-a11y"})}),e.jsx("td",{children:"접근성 위반이 릴리즈를 막아야 할 때"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"@storybook/test-runner"})}),e.jsx("td",{children:"CI에서 play 자동 실행"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"@vue/test-utils"})}),e.jsx("td",{children:"컴포넌트 내부 상태·메서드 접근"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"@chromatic-com/storybook"})}),e.jsx("td",{children:"픽셀 단위 시각 회귀 도입"})]})]})]}),`
`,e.jsx(s.p,{children:"패키지가 늘면 관리 부담과 빌드 시간도 같이 는다."}),`
`,e.jsx(s.h2,{id:"명령어",children:"명령어"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-bash",children:`npm run storybook         # dev 서버 (6006)\r
npm run build-storybook   # 정적 빌드 → storybook-static/\r
npm test                  # Vitest 1회\r
npm run test:watch        # Vitest watch
`})}),`
`,e.jsx(s.h2,{id:"다음-단계",children:"다음 단계"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx("a",{target:"_top",href:"/?path=/docs/get-started-install--docs",children:"Install"})," — 설치·기본 사용"]}),`
`,e.jsxs(s.li,{children:[e.jsx("a",{target:"_top",href:"/?path=/docs/get-started-philosophy--docs",children:"Philosophy"})," — 한 스토리, 세 가지 역할"]}),`
`,e.jsxs(s.li,{children:[e.jsx("a",{target:"_top",href:"/?path=/docs/get-started-theming--docs",children:"Theming"})," — 색상·구조 커스터마이즈"]}),`
`,e.jsxs(s.li,{children:[e.jsx("a",{target:"_top",href:"/?path=/docs/get-started-migration--docs",children:"Migration"})," — 무엇이 옮겨졌나"]}),`
`]})]})}function j(n={}){const{wrapper:s}={...t(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(r,{...n})}):r(n)}export{j as default};
