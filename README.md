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

```vue
<script setup lang="ts">
import { UiButton } from '@leechanyong/ispark-ui'
import '@leechanyong/ispark-ui/style.css'
</script>

<template>
  <UiButton>확인</UiButton>
</template>
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

#### UiChart — 재사용 가능한 차트

```vue
<script setup lang="ts">
import { UiChart } from '@leechanyong/ispark-ui'
import '@leechanyong/ispark-ui/style.css'

const config = {
  items: [
    { name: '대졸', value: 221 },
    { name: '원졸', value: 45 },
    { name: '전문', value: 62 },
  ],
  dataLabelColor: '#ffffff',
}
</script>

<template>
  <div style="height: 280px">
    <UiChart
      type="pie"
      :config="config"
      show-legend
      legend-position="right"
      center-text="total-percent"
      data-label-mode="percent"
      legend-value="value-percent"
    />
  </div>
</template>
```

중앙 표시는 `none / total / percent / total-percent`, 조각 라벨은 `none / value / percent`, 범례 정보는 `none / value / percent / value-percent`를 선택할 수 있습니다. 범례 위치는 `top / bottom / left / right`를 지원하며 `items[].legendValue`로 항목마다 표시 방식을 바꿀 수 있습니다.

차트의 부모에 높이를 지정하세요. 데이터 변경 시 `config`를 새 객체로 교체해야 갱신됩니다. 수량 데이터는 `value`로 전달하고, 이미 계산한 비율은 모든 항목에 `{ value: 비율, count: 수량 }`을 함께 전달하면 중앙 합계와 범례 수량을 구분해 표시합니다.

#### UiRate — 별점 입력과 표시

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { UiRate } from '@leechanyong/ispark-ui'
import '@leechanyong/ispark-ui/style.css'

const rating = ref(3.5)
</script>

<template>
  <UiRate v-model="rating" allow-half show-value label="리뷰 평점" />
  <UiRate :model-value="4.5" readonly size="sm">(128개 평가)</UiRate>
</template>
```

`xxs` / `xs` / `sm` / `md` / `lg` / `xlg` / `auth` (별 크기 12 / 14 / 16 / 24 / 32 / 40 / 48px), 반별 선택, 읽기 전용, 비활성화, 방향키·Home·End 조작을 지원합니다.
`allow-clear`를 켜면 같은 점수를 다시 클릭해 해제할 수 있습니다.
Storybook의 **Components → Form → UiRate → Showcase**에서 다크 테마 시안을 확인할 수 있습니다.

`UiButton` `UiInput` `UiSelect` `UiModal` `UiDrawer` `UiTab` `UiTable` `UiBadge` `UiToggle` `UiProgress` `UiTooltip` `UiToast` `UiCalendar` `UiAccordion` `UiCheckbox` `UiRadio` `UiSwitch` `UiPagination` `UiEmpty` `UiIcon` …

### Setup

```bash
npm install && npm run dev        # 개발
npm run storybook                 # 문서
npm run build                     # 빌드
```

---

<sub>이찬용 · <a href="https://github.com/box3101">@box3101</a></sub>


### UiFileUpload horizontal (local build)

```vue
<UiFileUpload
  variant="horizontal"
  multiple
  title="Supporting documents"
  label="Select files"
  hint="Drop files here or select files"
  accept=".pdf,.docx,.pptx,.txt"
  :loading="uploading"
  :error="uploadError"
  @upload="uploadFile"
  @reject="onRejected"
/>
```

`horizontal` is an opt-in layout containing an icon, title, hint and UiButton.
`multiple` defaults to false. With true, validation runs separately for each file:
valid files emit the existing `upload(file)` event, invalid files emit
`reject(message)` and do not prevent later valid files from uploading. The last
rejection is displayed until a new selection, changed validation rules or external
error replaces it. Selection and drop share accept/maxSize validation. The picker
resets after each selection to support retrying the same file. Loading/disabled
block both picker and drop. `error` represents a parent/server error. Server calls,
file lists and document classification remain the parent's responsibility.

Existing button/dropzone defaults and single-file event contracts are unchanged.
Storybook includes Horizontal, HorizontalLong, HorizontalNarrow, HorizontalLoading,
HorizontalDisabled, HorizontalError and HorizontalMultiple.

The horizontal upload area opens the picker when clicked anywhere. The existing
UiButton remains the keyboard entry point (Enter/Space); its click does not
bubble into a second picker request. Hover/focus feedback is disabled while
loading or disabled, and transitions respect reduced-motion preferences.
