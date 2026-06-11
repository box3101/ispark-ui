import{j as e,M as s}from"./index-BHMKMgKN.js";import{useMDXComponents as t}from"./index-BYsBzsiC.js";import"./iframe-B9VwwiXa.js";import"./index-8_2S3kac.js";import"./index-DrFu-skq.js";function i(r){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Get Started/Install"}),`
`,e.jsx(n.h1,{id:"설치",children:"설치"}),`
`,e.jsx(n.p,{children:"Vue 3 프로젝트에 ispark-ui를 붙이는 최소 3단계. peer dependency를 별도로 설치하는 이유는 Vue·radix-vue·date 패키지를 컨슈머 측 버전에 맞추기 위함이다."}),`
`,e.jsx(n.h2,{id:"1-패키지-설치",children:"1. 패키지 설치"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`# 본 패키지\r
npm install @leechanyong/ispark-ui\r
\r
# peer dependencies (이미 설치돼 있으면 생략 가능)\r
npm install vue radix-vue @internationalized/date
`})}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"peer"}),e.jsx("th",{children:"최소 버전"}),e.jsx("th",{children:"용도"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"vue"})}),e.jsx("td",{children:e.jsx("code",{children:"^3.5.0"})}),e.jsx("td",{children:"컴포넌트 런타임"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"radix-vue"})}),e.jsx("td",{children:e.jsx("code",{children:"^1.9.0"})}),e.jsx("td",{children:"Dialog / Dropdown / Tooltip 등 접근성 primitive"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"@internationalized/date"})}),e.jsx("td",{children:e.jsx("code",{children:"^3.5.0"})}),e.jsx("td",{children:"UiDatePicker / UiDateRangePicker"})]})]})]}),`
`,e.jsx(n.h2,{id:"2-글로벌-스타일-import",children:"2. 글로벌 스타일 import"}),`
`,e.jsxs(n.p,{children:["엔트리(보통 ",e.jsx(n.code,{children:"main.ts"}),")에 한 줄. CSS 변수·리셋·아이콘 클래스가 한 번에 들어온다."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// main.ts\r
import { createApp } from 'vue'\r
import App from './App.vue'\r
\r
import '@leechanyong/ispark-ui/style.css'  // ← 컨슈머 SCSS보다 먼저\r
\r
createApp(App).mount('#app')
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"import 순서가 중요하다."})," 컨슈머의 테마/override SCSS는 반드시 라이브러리 다음에 와야 specificity 동률에서 이긴다. 자세한 내용은 ",e.jsx("a",{target:"_top",href:"/?path=/docs/get-started-theming--docs",children:"Theming"}),"에서."]}),`
`]}),`
`,e.jsx(n.h2,{id:"3-컴포넌트-사용",children:"3. 컴포넌트 사용"}),`
`,e.jsx(n.p,{children:"필요한 컴포넌트만 named import. 트리쉐이킹이 동작해서 안 쓰는 건 번들에 안 들어간다."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<script setup lang="ts">\r
import { ref } from 'vue'\r
import { UiButton, UiInput, openToast } from '@leechanyong/ispark-ui'\r
\r
const email = ref('')\r
\r
const onSubmit = () => {\r
  openToast({ message: '저장되었습니다.' })\r
}\r
<\/script>\r
\r
<template>\r
  <UiInput v-model="email" placeholder="이메일" />\r
  <UiButton variant="primary" @click="onSubmit">저장</UiButton>\r
</template>
`})}),`
`,e.jsx(n.h2,{id:"typescript",children:"TypeScript"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"d.ts"}),"가 패키지에 포함돼 있어 별도 설정 불필요. 컴포넌트 타입은 자동으로 추론되며, ",e.jsx(n.code,{children:"SelectOption"}),"·",e.jsx(n.code,{children:"TableColumn"}),"·",e.jsx(n.code,{children:"DateRange"})," 등 데이터 타입도 named export로 제공한다."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import type { SelectOption, TableColumn, DateRange } from '@leechanyong/ispark-ui'
`})}),`
`,e.jsx(n.h2,{id:"검증",children:"검증"}),`
`,e.jsx(n.p,{children:"설치가 끝났는지 확인하려면:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm ls @leechanyong/ispark-ui
`})}),`
`,e.jsxs(n.p,{children:["브라우저에서 ",e.jsx(n.code,{children:"<UiButton>"}),"이 오렌지 톤 primary 색으로 렌더되면 글로벌 스타일까지 정상 적용된 것."]}),`
`,e.jsx(n.h2,{id:"다음-단계",children:"다음 단계"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx("a",{target:"_top",href:"/?path=/docs/get-started-philosophy--docs",children:"Philosophy"})," — 한 스토리, 세 가지 역할"]}),`
`,e.jsxs(n.li,{children:[e.jsx("a",{target:"_top",href:"/?path=/docs/get-started-stack--docs",children:"Stack"})," — 패키지·명령어"]}),`
`,e.jsxs(n.li,{children:[e.jsx("a",{target:"_top",href:"/?path=/docs/get-started-theming--docs",children:"Theming"})," — 색상·구조 커스터마이즈"]}),`
`,e.jsxs(n.li,{children:[e.jsx("a",{target:"_top",href:"/?path=/docs/get-started-migration--docs",children:"Migration"})," — 무엇이 옮겨졌나"]}),`
`]})]})}function h(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{h as default};
