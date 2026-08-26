<p align="center">
<br>
<a href="https://box3101.github.io/ispark-ui/"><img src="https://img.shields.io/badge/ispark--ui-Design_System-6366f1?style=for-the-badge" /></a>
<br><br>
<strong>만들고 끝이 아니라, 실제 제품에 적용되는 디자인 시스템.</strong>
<br><br>
<a href="https://www.npmjs.com/package/@leechanyong/ispark-ui"><img src="https://img.shields.io/npm/v/@leechanyong/ispark-ui?style=flat-square&colorA=18181B&colorB=6366f1" /></a>
<a href="https://www.npmjs.com/package/@leechanyong/ispark-ui"><img src="https://img.shields.io/npm/dm/@leechanyong/ispark-ui?style=flat-square&colorA=18181B&colorB=6366f1" /></a>
<a href="https://box3101.github.io/ispark-ui/"><img src="https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white" /></a>
<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue_3-4FC08D?style=flat-square&logo=vue.js&logoColor=white" /></a>
</p>

---

### Why ispark-ui?

사내 프로젝트마다 버튼 하나, 모달 하나를 매번 새로 만들고 있었습니다.  
ispark-ui는 그 반복을 끝내기 위해 만든 **실전 디자인 시스템**입니다.

접근성 프리미티브 [radix-vue](https://www.radix-vue.com/) 위에 올려  
**WAI-ARIA를 기본 준수**하면서도, CSS 변수 하나로 테마를 바꿀 수 있습니다.

현재 [SGATE 성과관리 솔루션](https://github.com/box3101/ispark-sgate),  
[TaskFlow](https://github.com/box3101/taskflow),  
[포트폴리오](https://github.com/box3101/cy-portfolio) 등 **3개 이상의 실서비스에 적용** 중입니다.

> [!TIP]
> 📖 **[Storybook 문서](https://box3101.github.io/ispark-ui/)** 에서 모든 컴포넌트를 인터랙티브하게 확인할 수 있습니다.

### Numbers

```
33   컴포넌트       Button · Modal · Table · Tab · Drawer · Toast …
280+ 스토리         variant × size × state 조합별 문서화
3+   적용 서비스    SGATE · TaskFlow · Portfolio
```

### Install

```bash
npm install @leechanyong/ispark-ui
```

```ts
import IsparkUI from '@leechanyong/ispark-ui'
import '@leechanyong/ispark-ui/style'

createApp(App).use(IsparkUI).mount('#app')
```

### Architecture

| Layer | Stack | Role |
|-------|-------|------|
| **Primitive** | radix-vue | 접근성 동작 (WAI-ARIA) |
| **Component** | Vue 3 + TypeScript | 33개 UI 컴포넌트 |
| **Token** | CSS Variables | 다크/라이트 테마 |
| **Docs** | Storybook 8 | 280+ 인터랙티브 스토리 |
| **Build** | Vite Library Mode | Tree-shakeable 번들 |
| **Publish** | npm | 시맨틱 버저닝 릴리즈 |

### Components

`UiButton` `UiInput` `UiSelect` `UiModal` `UiDrawer` `UiTab` `UiTable` `UiBadge` `UiToggle` `UiProgress` `UiTooltip` `UiToast` `UiCalendar` `UiAccordion` `UiCheckbox` `UiRadio` `UiSwitch` `UiPagination` `UiEmpty` `UiIcon` …

### Setup

```bash
npm install && npm run dev        # 개발
npm run storybook                 # 문서
npm run build:lib                 # 빌드
```

---

<sub>이찬용 · <a href="https://github.com/box3101">@box3101</a></sub>
