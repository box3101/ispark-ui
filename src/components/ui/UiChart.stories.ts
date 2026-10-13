import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, waitFor } from '@storybook/test'
import UiChart from './UiChart.vue'

const meta = {
  title: 'Components/Data/UiChart',
  component: UiChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Chart.js 기반 차트 컴포넌트. 데이터 라벨 플러그인은 차트 생성 시 등록하여 소비 앱의 프로덕션 빌드에서도 유지한다. \`type\`과 \`config\`로 5종 차트를 그리고 표시 옵션을 선택한다.

## 지원 타입 (경량 버전)
- **\`bar\`** — 세로 막대
- **\`line\`** — 라인
- **\`pie\`** — 파이/도넛 (\`shape\` 또는 중앙 문구로 선택)
- **\`mixed\`** — 막대 + 라인 혼합 (이중 축)
- **\`radar\`** — 방사형

> 원본(team_agent_front)의 \`horizontalBar\`는 사용처가 없어 제외했다.

## API
- **\`type\`** \`'bar' | 'line' | 'pie' | 'mixed' | 'radar'\` — 차트 종류
- **\`config\`** \`object\` — 타입별 데이터/옵션. 변경 시 차트 재생성(참조 비교)
- **\`showLegend\`** \`boolean\` — 커스텀 범례(HTML) 표시. 기본 \`false\`
- **\`legendPosition\`** \`'top' | 'bottom' | 'left' | 'right'\` — 범례 위치. 기본 \`'top'\`
- **\`shape\`** \`'pie' | 'donut'\` — 원형 형태. 중앙 문구가 있으면 도넛이 기본이다. 중앙 문구가 없을 때 꽉 찬 파이와 도넛을 고른다.
- **\`centerText\`** \`'none' | 'total' | 'percent' | 'total-percent'\` — 원형 차트 중앙 표시. 미지정하면 \`config.centerText\`를 사용한다.

- **\`dataLabelMode\`** \`'none' | 'value' | 'percent'\` — 원형 조각 내부 표시. 미지정하면 기존 config 설정을 사용한다.
- **\`legendValue\`** \`'none' | 'value' | 'percent' | 'value-percent'\` — 원형 범례 정보. 미지정하면 기존 config 설정을 사용한다.

## config 형태 (타입별)
- **bar** — \`{ categories, data, colorKey, maxValue? }\`
- **line** — \`{ categories, datasets: [{ label, data, colorKey }] }\`
- **pie** — \`{ items: [{ name, value }], style? }\` (\`items\` 배열, \`name\`=라벨/범례 · \`value\`=조각 크기)
- **mixed** — \`{ categories, datasets: [{ type:'bar'|'line', label, data, colorKey, colorIndex, yAxisID? }], maxValue?, maxValue2? }\`
- **radar** — \`{ categories, data, colorKey, maxValue? }\`

## 색상
색상은 \`colorKey\`(예: \`'bar.set1'\`, \`'radar.set1'\`)로 \`ChartColors\` 팔레트를 참조한다.
팔레트는 ispark-ui 디자인 토큰(primary/orange/success...) 기반 범용 색으로 구성됐다.

## 디자인 토큰 — 범례와 중앙 텍스트
> 중앙 숫자를 먼저 읽고 단위·비율을 보조 정보로 읽도록 크기와 굵기를 나눈다.

- 범례 이름: \`$body-medium\` — 14px / 400. 수량·비율: \`$body-small\` — 12px / 400(루트 16px 기준).
- 총합만·퍼센트만은 숫자 28px / 700 + 작은 단위 12px / 400을 유지한다. 두 줄 모드는 단위 포함 총합 19px / 800, 괄호 포함 비율 16px / 500을 같은 제목 색상으로 표시한다.
- 단독 모드는 숫자·단위를 따로 측정하고, 두 줄 모드는 각 문장 전체를 가운데 정렬한다. 작은 구멍에서는 영역 안에 맞춰 비례 축소한다.
- 중앙 표시를 켜거나 \`shape="donut"\`이면 구멍은 48%다. \`shape="pie"\`는 중앙 문구가 없을 때 구멍을 닫는다. 직접 지정한 \`cutout\`이 있으면 그것을 우선한다.

- 원 수량은 \`items.value\`로 전달한다. 이미 계산된 비율을 쓰는 데이터는 \`{ value: 46.9, count: 154 }\`처럼 비율과 수량을 함께 전달할 수 있다. 수량 표시는 count를 우선하고 비율은 value 합계를 기준으로 계산한다.

## 컨테이너
막대·라인·혼합·방사형은 부모 높이를 채우며 캔버스 \`min-height: 260px\`를 유지한다. 원형 차트는 범례 배치를 위해 최소 높이를 두지 않으므로 카드/패널에 넣을 땐 부모에 높이를 지정하라.
좌우 범례는 세로 목록, 상하 범례는 줄바꿈 가능한 가로 목록으로 표시한다. 항목이 많으면 처음부터 스크롤할 수 있으며 상하 범례는 부모 높이의 절반까지만 사용한다.

## 원형 차트 중앙·범례 옵션
- \`dataLabelMode='percent'\` — 조각 값의 실제 비율을 계산해 해당 조각 안에 표시한다. \`'value'\`는 원 수치, \`'none'\`은 숨김이다. \`config.dataLabelMode\`로도 설정할 수 있다.
- \`config.dataLabelColor\` / \`config.dataLabelFontSize\` — 조각 라벨 색상과 기준 크기(기본 12px). 작은 조각·얇은 링은 자동 축소하며 0인 조각에는 라벨을 표시하지 않는다.
- \`items[].legendValue\` — 항목별 범례 모드를 지정하면 차트 전체 모드보다 우선한다. 같은 범례 안에서 \`산업 56개\`와 \`대학원 12.8%\`를 섞을 수 있다.

> 작은 카드에서도 원형 차트의 총합과 비율을 함께 읽을 수 있도록 중앙 표시와 범례 위치를 선택한다.

- \`centerText="total-percent"\` — \`328개\`를 조금 더 크고 굵게, \`(100%)\`는 아래에 간격을 두고 표시한다.
- \`centerText="total"\` — 중앙에 큰 총합 숫자와 작고 가벼운 단위만 표시한다.
- \`centerText="percent"\` — 중앙에 큰 비율 숫자와 작은 % 기호를 한 줄로 표시한다.
- 중앙 표시를 켜면 도넛이 기본이며, \`percent\` / \`total\` / \`total-percent\` 모두 같은 굵기다. 중앙 문구가 없을 때는 \`shape="pie"\`(꽉 찬 원) 또는 \`shape="donut"\`을 고른다. \`config.cutout\`으로 구멍 크기를 조절한다.
- 총합은 \`items.value\` 합계다. 모든 항목에 \`count\`가 있으면 \`count\` 합계를 사용한다.
- 범례로 숨긴 항목은 중앙 합계에서 제외하고, 퍼센트는 원래 총합 대비 표시 중인 수량의 비율이다. 합계가 0이면 \`0%\`다.
- \`config.centerPercent\` — 중앙 퍼센트를 직접 지정(예: 완료율 \`67.4\`). \`0\`도 유효하다.
- \`config.centerTotalSuffix\` — 중앙 총합과 범례 수량 단위. 기본 \`'개'\`; 빈 문자열이면 단위를 생략한다.
- \`config.centerTextColor\` — 주요 숫자와 두 줄 중앙 문구 색상. 기본은 테마 제목 색상이며 단독 모드의 작은 단위는 보조색이다.
- \`config.legendValue: 'none' | 'value' | 'percent' | 'value-percent'\` — 이름만 / \`산업 56개\` / \`대학원 12.8%\` / \`일반 156개 (47.6%)\`를 선택한다. top-level \`legendValue\`를 지정하면 config 값보다 우선한다. 기존 count 범례는 새 옵션을 생략하면 유지한다.
- \`config.valueMode: 'ratio'\` — 조각 라벨·툴팁을 \`value / 전체 value 합계 × 100\`으로 계산한다. 기존 \`'percent'\`(입력값에 %를 붙임)와 \`'raw'\`(수치 표시)도 유지한다.
- \`config.showDataLabels: true\` — 도넛 내부에도 조각 라벨을 표시한다.
- 중앙 옵션은 기본 Chart.js 파이·도넛에 적용한다. \`config.useSvgDonut\`과 \`config.type: 'outerLabel'\`은 기존 전용 렌더링을 사용한다.

### 사용 예시
~~~vue
<UiChart
  type="pie"
  show-legend
  legend-position="right"
  shape="donut"
  center-text="total-percent"
  data-label-mode="percent"
  legend-value="value-percent"
  :config="{
    items: [
      { name: '대졸', value: 221 },
      { name: '원졸', value: 45 },
      { name: '전문', value: 62 },
    ],
    dataLabelColor: '#ffffff',
    dataLabelFontSize: 12,
  }"
/>
~~~
        `,
      },
    },
  },
  // 차트는 부모 높이 필요 — 모든 스토리를 고정 높이 박스로 감싼다
  decorators: [
    () => ({
      template: '<div style="width:480px; height:320px; padding:12px;"><story /></div>',
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['bar', 'line', 'pie', 'mixed', 'radar'],
      description: '차트 종류',
    },
    showLegend: { control: 'boolean', description: '커스텀 범례 표시', table: { defaultValue: { summary: 'false' } } },
    legendPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: '범례 위치 — 상하 가로 목록 / 좌우 세로 목록',
      table: { defaultValue: { summary: 'top' } },
    },
    shape: {
      control: 'select',
      options: ['pie', 'donut'],
      description: '원형 형태 — 꽉 찬 파이 / 도넛. 중앙 문구가 있으면 도넛이 기본',
      table: { defaultValue: { summary: 'centerText 있으면 donut, 없으면 pie' } },
    },
    centerText: {
      control: 'select',
      options: ['none', 'total', 'percent', 'total-percent'],
      description: '기본 원형 차트의 중앙 표시. 표시 시 자동으로 도넛 형태 적용. 미지정하면 config.centerText를 사용',
      table: { defaultValue: { summary: 'config 또는 없음' } },
    },
    dataLabelMode: {
      control: 'select', options: ['none', 'value', 'percent'],
      description: '원형 조각 내부 표시 — 숨김 / 수량 / 실제 비율. config보다 우선',
      table: { defaultValue: { summary: 'config 또는 기존 설정' } },
    },
    legendValue: {
      control: 'select', options: ['none', 'value', 'percent', 'value-percent'],
      description: '원형 범례 — 이름만 / 수량만 / 비율만 / 수량과 비율. config보다 우선',
      table: { defaultValue: { summary: 'config 또는 기존 설정' } },
    },
    config: { control: 'object', description: '타입별 데이터/옵션' },
  },
} satisfies Meta<typeof UiChart>

export default meta
type Story = StoryObj<typeof meta>

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월']

// 마운트 후 canvas가 렌더되는지 검증 (jsdom·브라우저 공용)
const expectCanvas = async (canvasElement: HTMLElement) => {
  await waitFor(() => {
    expect(canvasElement.querySelector('canvas')).toBeTruthy()
  })
}

// ===== 막대 =====
export const Bar: Story = {
  args: {
    type: 'bar',
    showLegend: false,
    config: {
      categories: MONTHS,
      // datasets 형태 → x축 카테고리 라벨 표시 (단일 data 모드는 x축 숨김)
      datasets: [{ label: '문의 건수', data: [320, 450, 380, 510, 470, 600], colorKey: 'bar.set1' }],
      maxValue: 700,
      tooltipValueSuffix: '건',
    },
  },
  play: async ({ canvasElement }) => {
    await expectCanvas(canvasElement)
  },
}

// ===== 라인 =====
export const Line: Story = {
  args: {
    type: 'line',
    showLegend: true,
    config: {
      categories: MONTHS,
      datasets: [
        { label: '방문자', data: [120, 200, 180, 260, 240, 320], colorKey: 'line.primary' },
        { label: '가입자', data: [40, 80, 70, 120, 110, 160], colorKey: 'line.success' },
      ],
    },
  },
  play: async ({ canvasElement }) => {
    await expectCanvas(canvasElement)
  },
}

// ===== 파이 (도넛) =====
// 🔽 더미 데이터 — 백엔드 연결 시 API로 교체
const EDUCATION_CONFIG = {
  items: [
    { name: '대졸', value: 221 },
    { name: '원졸', value: 45 },
    { name: '전문', value: 62 },
  ],
  labelColor: ['#3281ff', '#95c9ff', '#25beba'],
  dataLabelColor: '#ffffff',
  valueMode: 'ratio',
  showDataLabels: true,
  legendValue: 'value-percent',
}

const expectSummaryLegend = async (canvasElement: HTMLElement, position: string) => {
  await expectCanvas(canvasElement)
  await waitFor(() => {
    expect(canvasElement.querySelector(`.ui-chart.is-legend-${position}`)).toBeTruthy()
    expect(canvasElement.querySelectorAll('.legend-item')).toHaveLength(3)
    expect(canvasElement.querySelector('.legend-item__info')?.textContent).toContain('67.4%')
  })
}

export const Pie: Story = {
  args: {
    type: 'pie',
    showLegend: true,
    legendPosition: 'right',
    centerText: 'total-percent',
    dataLabelMode: 'percent',
    legendValue: 'value-percent',
    config: EDUCATION_CONFIG,
  },
  play: async ({ canvasElement }) => {
    await expectSummaryLegend(canvasElement, 'right')
  },
}

export const PieSolid: Story = {
  name: '원형 · 꽉 찬 파이',
  args: {
    ...Pie.args,
    centerText: 'none',
    shape: 'pie',
    legendValue: 'percent',
    config: { ...EDUCATION_CONFIG, legendValue: 'percent' },
  },
  play: async ({ canvasElement }) => {
    await expectSummaryLegend(canvasElement, 'right')
  },
}

export const PieDonut: Story = {
  name: '원형 · 도넛 (중앙 없음)',
  args: {
    ...Pie.args,
    centerText: 'none',
    shape: 'donut',
    legendValue: 'percent',
    config: { ...EDUCATION_CONFIG, legendValue: 'percent' },
  },
  play: async ({ canvasElement }) => {
    await expectSummaryLegend(canvasElement, 'right')
  },
}

// ===== 혼합 (막대 + 라인) =====
export const Mixed: Story = {
  args: {
    type: 'mixed',
    showLegend: true,
    config: {
      categories: MONTHS,
      maxValue: 700,
      maxValue2: 100,
      datasets: [
        { type: 'bar', label: '토큰 사용량', data: [320, 450, 380, 510, 470, 600], colorKey: 'mixed.set1', colorIndex: 0 },
        { type: 'line', label: '평균 응답(점)', data: [60, 72, 68, 85, 80, 92], colorKey: 'mixed.set1', colorIndex: 1, yAxisID: 'y1' },
      ],
    },
  },
  play: async ({ canvasElement }) => {
    await expectCanvas(canvasElement)
  },
}

// ===== 방사형 =====
export const Radar: Story = {
  args: {
    type: 'radar',
    showLegend: false,
    config: {
      categories: ['논리', '공감', '추진력', '안정성', '창의성', '협업'],
      data: [80, 65, 90, 70, 85, 75],
      colorKey: 'radar.primary',
      maxValue: 100,
      showDataLabels: true,
    },
  },
  play: async ({ canvasElement }) => {
    await expectCanvas(canvasElement)
  },
}
