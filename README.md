<p align="center">
<br>
<a href="https://box3101.github.io/ispark-ui/"><img src="https://img.shields.io/badge/ispark--ui-Design_System-6366f1?style=for-the-badge" alt="ispark-ui" /></a>
<br><br>
</p>

# ispark-ui

> Vue 3 + radix-vue 기반 디자인 시스템 — 33개 컴포넌트, 280+ 스토리

<p>
<a href="https://www.npmjs.com/package/@leechanyong/ispark-ui"><img src="https://img.shields.io/npm/v/@leechanyong/ispark-ui?style=flat-square&colorA=18181B&colorB=6366f1" /></a>
<a href="https://www.npmjs.com/package/@leechanyong/ispark-ui"><img src="https://img.shields.io/npm/dm/@leechanyong/ispark-ui?style=flat-square&colorA=18181B&colorB=6366f1" /></a>
<a href="https://box3101.github.io/ispark-ui/"><img src="https://img.shields.io/badge/Storybook-docs-FF4785?style=flat-square&logo=storybook&logoColor=white" /></a>
</p>

---

실무 어드민 화면에 필요한 컴포넌트를 접근성 프리미티브(radix-vue) 위에 올려 만들었습니다.  
CSS 변수 기반 테마 커스터마이징과 다크/라이트 모드를 지원합니다.

### Links

🔗 **[Storybook 문서](https://box3101.github.io/ispark-ui/)** · **[npm](https://www.npmjs.com/package/@leechanyong/ispark-ui)**

### Install

```bash
npm install @leechanyong/ispark-ui
```

```ts
import IsparkUI from '@leechanyong/ispark-ui'
import '@leechanyong/ispark-ui/style'

createApp(App).use(IsparkUI).mount('#app')
```

### Components

Button · Input · Select · Modal · Drawer · Tab · Table · Badge · Toggle · Progress · Tooltip · Toast · Calendar · Accordion · Checkbox · Radio · Switch · Pagination · Empty · Icon …

### Features

| | |
|---|---|
| **33개 컴포넌트** | Button, Modal, Table, Tab, Badge 등 |
| **280+ 스토리** | Storybook 기반 인터랙티브 문서 |
| **접근성** | radix-vue 프리미티브로 WAI-ARIA 준수 |
| **테마** | CSS 변수 기반 다크/라이트 모드 |
| **Nuxt 3** | 자동 컴포넌트 등록 플러그인 |

### Setup

```bash
npm install && npm run dev        # 개발
npm run storybook                 # Storybook
```

---

<sub>Built by <a href="https://github.com/box3101">@box3101</a> · 이찬용</sub>
