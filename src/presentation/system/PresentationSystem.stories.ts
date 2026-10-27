import type {Meta,StoryObj} from '@storybook/vue3'
import {ComparisonDiagram,TraceabilityTable,ProcessDiagram,StrategyGroup,SlideCanvas,SlideHeader,SemanticIcon,SlideTitle,SlideText} from './components'
import {comparisonExample,traceExample,processExample,strategyExample} from './examples'
import SystemGuide from './SystemGuide.vue'
import {themeVariables} from './tokens'
import './system.css'

const meta={title:'Presentation/System v0.3/Components',component:ComparisonDiagram,parameters:{layout:'fullscreen'},tags:['autodocs']} satisfies Meta<typeof ComparisonDiagram>
export default meta
type Story=StoryObj<typeof meta>
export const Comparison: Story={args:{rows:comparisonExample},render:args=>({components:{ComparisonDiagram,SlideCanvas,SlideHeader},setup:()=>({args}),template:'<SlideCanvas source="Storybook 예시 데이터" :page="1"><template #header><SlideHeader section="COMPARISON" title="결과 중심 비교 도식" /></template><ComparisonDiagram v-bind="args" /></SlideCanvas>'})}
export const Trace: Story={args:{rows:comparisonExample},render:()=>({components:{TraceabilityTable,SlideCanvas,SlideHeader},setup:()=>({rows:traceExample}),template:'<SlideCanvas source="Storybook 예시 데이터" :page="1"><template #header><SlideHeader title="원문에서 검증까지" /></template><TraceabilityTable :rows="rows" /></SlideCanvas>'})}
export const Process: Story={args:{rows:comparisonExample},render:()=>({components:{ProcessDiagram,SlideCanvas,SlideHeader},setup:()=>({items:processExample}),template:'<SlideCanvas source="Storybook 예시 데이터" :page="1"><template #header><SlideHeader title="연결된 수행 절차" /></template><ProcessDiagram :items="items" /></SlideCanvas>'})}
export const Strategy: Story={args:{rows:comparisonExample},render:()=>({components:{StrategyGroup,SlideCanvas,SlideHeader},setup:()=>({items:strategyExample}),template:'<SlideCanvas source="Storybook 예시 데이터" :page="1"><template #header><SlideHeader title="세 가지 추진 방향" /></template><StrategyGroup :items="items" /></SlideCanvas>'})}
export const TypographyAndIcons: Story={args:{rows:comparisonExample},render:()=>({components:{SlideTitle,SlideText,SemanticIcon},setup:()=>({themeVariables}),template:'<div :style="themeVariables" style="padding:40px;background:white"><SlideTitle text="핵심 결과부터 읽힙니다"/><SlideText text="본문은 24px, 글자 크기를 줄이지 않고 내용을 조절합니다."/><div style="display:flex;gap:24px;margin-top:30px"><SemanticIcon concept="data-migration"/><SemanticIcon concept="mapping"/><SemanticIcon concept="quality" tone="accent"/></div></div>'})}
export const SystemGuidePages: Story={args:{rows:comparisonExample},render:()=>({components:{SystemGuide},template:'<SystemGuide />'})}
export const EnterpriseComparison: Story={args:{rows:comparisonExample},render:args=>({components:{ComparisonDiagram,SlideCanvas,SlideHeader},setup:()=>({args}),template:'<SlideCanvas profile="enterprise" source="공개 기업 IR 구조 참고 / 가상 예시 데이터" :page="1"><template #header><SlideHeader section="ENTERPRISE / 비교" title="현재와 결과를 같은 기준선에서 비교" /></template><ComparisonDiagram v-bind="args" /></SlideCanvas>'})}
export const EnterpriseTrace: Story={args:{rows:comparisonExample},render:()=>({components:{TraceabilityTable,SlideCanvas,SlideHeader},setup:()=>({rows:traceExample}),template:'<SlideCanvas profile="enterprise" source="삼성SDS 공개 IR 표 구조 참고 / 가상 예시 데이터" :page="1" takeaway="원문·설계·검증을 같은 행에서 확인"><template #header><SlideHeader section="ENTERPRISE / 추적표" title="원문에서 설계와 검증까지" /></template><TraceabilityTable :rows="rows" /></SlideCanvas>'})}
