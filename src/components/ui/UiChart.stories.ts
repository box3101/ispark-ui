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
Chart.js 기반 차트 컴포넌트. \`type\` + \`config\` 두 prop으로 5종 차트를 그린다.

## 지원 타입 (경량 버전)
- **\`bar\`** — 세로 막대
- **\`line\`** — 라인
- **\`pie\`** — 파이/도넛 (\`config.style: 'taskStatus'\`면 도넛)
- **\`mixed\`** — 막대 + 라인 혼합 (이중 축)
- **\`radar\`** — 방사형

> 원본(team_agent_front)의 \`horizontalBar\`는 사용처가 없어 제외했다.

## API
- **\`type\`** \`'bar' | 'line' | 'pie' | 'mixed' | 'radar'\` — 차트 종류
- **\`config\`** \`object\` — 타입별 데이터/옵션. 변경 시 차트 재생성(참조 비교)
- **\`showLegend\`** \`boolean\` — 커스텀 범례(HTML) 표시. 기본 \`false\`

## config 형태 (타입별)
- **bar** — \`{ categories, data, colorKey, maxValue? }\`
- **line** — \`{ categories, datasets: [{ label, data, colorKey }] }\`
- **pie** — \`{ items: [{ name, value }], style? }\` (\`items\` 배열, \`name\`=라벨/범례 · \`value\`=조각 크기)
- **mixed** — \`{ categories, datasets: [{ type:'bar'|'line', label, data, colorKey, colorIndex, yAxisID? }], maxValue?, maxValue2? }\`
- **radar** — \`{ categories, data, colorKey, maxValue? }\`

## 색상
색상은 \`colorKey\`(예: \`'bar.set1'\`, \`'radar.set1'\`)로 \`ChartColors\` 팔레트를 참조한다.
팔레트는 ispark-ui 디자인 토큰(primary/orange/success...) 기반 범용 색으로 구성됐다.

## 컨테이너
차트는 부모 높이를 채운다(\`min-height: 260px\`). 카드/패널에 넣을 땐 부모에 높이를 지정하라.
        `,
      },
    },
  },
  // 차트는 부모 높이 필요 — 모든 스토리를 고정 높이 박스로 감싼다
  decorators: [
    () => ({
      template: '<div style="width: 480px; height: 320px; padding: 12px;"><story /></div>',
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['bar', 'line', 'pie', 'mixed', 'radar'],
      description: '차트 종류',
    },
    showLegend: { control: 'boolean', description: '커스텀 범례 표시' },
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
export const Pie: Story = {
  args: {
    type: 'pie',
    showLegend: true,
    config: {
      style: 'taskStatus',
      items: [
        { name: '완료', value: 42 },
        { name: '진행중', value: 28 },
        { name: '대기', value: 18 },
        { name: '보류', value: 12 },
      ],
    },
  },
  play: async ({ canvasElement }) => {
    await expectCanvas(canvasElement)
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
