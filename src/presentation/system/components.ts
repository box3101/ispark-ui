import {presentationAssetUrl} from './asset-url'
import { defineComponent, h, type PropType } from 'vue'
import ProposalIcon from '../ProposalIcon.vue'
import { byKey } from '../../../presentation/icons/icon-map'
import { themeVariables, assertCount, assertText } from './tokens'

export interface ComparisonRow { label: string; current: string; result: string; detail?: string; icon?: string }
export interface TraceRow { label: string; design: string; verify: string }
export interface ProcessItem { title: string; body: string; icon: string }
export interface StrategyItem { title: string; body: string; result: string; icon: string }
export interface Track { label: string; start: number; end: number; text: string }

export const SlideTitle = defineComponent({name:'SlideTitle',props:{text:{type:String,required:true}},setup:p=>()=>{
  assertText('SlideTitle',p.text,55);return h('h1',{class:'ds-title','data-fit':'title'},p.text)
}})
export const SlideSubtitle = defineComponent({name:'SlideSubtitle',props:{text:{type:String,required:true}},setup:p=>()=>h('p',{class:'ds-subtitle','data-fit':'subtitle'},p.text)})
export const SlideText = defineComponent({name:'SlideText',props:{text:{type:String,required:true},emphasis:Boolean},setup:p=>()=>h('p',{class:['ds-text',{'is-emphasis':p.emphasis}],'data-fit':'body'},p.text)})
export const SectionLabel = defineComponent({name:'SectionLabel',props:{text:{type:String,required:true}},setup:p=>()=>h('p',{class:'ds-section-label','data-fit':'label'},p.text)})
export const SlideHeader = defineComponent({name:'SlideHeader',props:{section:String,title:{type:String,required:true},subtitle:String},setup:p=>()=>h('header',{class:'ds-header'},[
  p.section?h(SectionLabel,{text:p.section}):null,h(SlideTitle,{text:p.title}),p.subtitle?h(SlideSubtitle,{text:p.subtitle}):null,
])})
export const EvidenceFooter = defineComponent({name:'EvidenceFooter',props:{source:{type:String,required:true},page:{type:Number,required:true}},setup:p=>()=>{
  assertText('source',p.source,130);return h('footer',{class:'ds-footer'},[h('span',{'data-fit':'source'},p.source),h('span',String(p.page).padStart(2,'0'))])
}})
export const TakeawayBar = defineComponent({name:'TakeawayBar',props:{text:{type:String,required:true}},setup:p=>()=>{
  assertText('takeaway',p.text,45);return h('aside',{class:'ds-takeaway','data-fit':'takeaway'},p.text)
}})
export const StepBadge = defineComponent({name:'StepBadge',props:{number:{type:Number,required:true}},setup:p=>()=>h('span',{class:'ds-step'},String(p.number).padStart(2,'0'))})
export const SemanticIcon = defineComponent({name:'SemanticIcon',props:{concept:{type:String,required:true},tone:{type:String as PropType<'primary'|'accent'>,default:'primary'}},setup:p=>()=>{
  if(!byKey[p.concept])throw new Error(`Unknown semantic icon: ${p.concept}`)
  return h('span',{class:['ds-icon',`tone-${p.tone}`],role:'img','aria-label':byKey[p.concept].label},[h(ProposalIcon,{concept:p.concept,variant:'inline',size:34})])
}})
export const FlowConnector = defineComponent({name:'FlowConnector',props:{direction:{type:String as PropType<'right'|'down'|'up'>,default:'right'}},setup:p=>()=>h('span',{class:'ds-connector','aria-hidden':'true'},{right:'→',down:'↓',up:'↑'}[p.direction])})
export const SlideCanvas = defineComponent({name:'SlideCanvas',props:{background:String,tone:{type:String as PropType<'light'|'dark'|'split'>,default:'light'},source:{type:String,required:true},page:{type:Number,required:true},takeaway:String,kind:String,profile:{type:String as PropType<'proposal'|'enterprise'|'scenic'>,default:'proposal'}},setup:(p,{slots})=>()=>h('section',{class:['ds-slide',`ds-tone-${p.tone}`,p.kind&&`ds-kind-${p.kind}`,`ds-${p.profile}`],style:themeVariables},[
  p.background?h('img',{class:'ds-background',src:presentationAssetUrl(p.background),alt:''}):null,h('div',{class:'ds-wash','aria-hidden':'true'}),
  slots.header?.(),h('main',{class:'ds-main'},slots.default?.()),p.takeaway?h(TakeawayBar,{text:p.takeaway}):null,h(EvidenceFooter,{source:p.source,page:p.page}),
])})
export const ComparisonDiagram = defineComponent({name:'ComparisonDiagram',props:{rows:{type:Array as PropType<ComparisonRow[]>,required:true}},setup:p=>()=>{
 assertCount('ComparisonDiagram',p.rows,1,3)
 return h('div',{class:'ds-comparison'},[
 h('div',{class:'ds-comparison-head'},[h('span','연결 대상'),h('span','현재'),h('span'),h('strong','재구축 결과')]),
 ...p.rows.map((r,i)=>h('article',{class:'ds-comparison-row'},[
 h('div',{class:'ds-comparison-label'},[r.icon?h(SemanticIcon,{concept:r.icon}):h(StepBadge,{number:i+1}),h('h2',{'data-fit':'label'},r.label)]),
 h(SlideText,{text:r.current}),h(FlowConnector),h('div',{class:'ds-result'},[h('h3',{'data-fit':'result'},r.result),r.detail?h('p',{'data-fit':'supporting'},r.detail):null]),
 ]))])
}})
export const TraceabilityTable = defineComponent({name:'TraceabilityTable',props:{rows:{type:Array as PropType<TraceRow[]>,required:true}},setup:p=>()=>{
 assertCount('TraceabilityTable',p.rows,1,3)
 return h('table',{class:'ds-trace'},[
 h('thead',[h('tr',['제도 원문','설계 반영','검증 확인'].map((x,i)=>h('th',{scope:'col'},[h('span',`0${i+1}`),x])))]),
 h('tbody',p.rows.map((r,i)=>h('tr',[
 h('th',{scope:'row'},[h('div',{class:'ds-table-label'},[h(StepBadge,{number:i+1}),h('span',{'data-fit':'body'},r.label)])]),
 ...[r.design,r.verify].map(x=>h('td',[h('div',{class:'ds-table-cell'},[h(FlowConnector),h(SlideText,{text:x})])])),
 ])))])
}})
export const ProcessDiagram = defineComponent({name:'ProcessDiagram',props:{items:{type:Array as PropType<ProcessItem[]>,required:true}},setup:p=>()=>{
 assertCount('ProcessDiagram',p.items,3,4)
 return h('div',{class:'ds-process',style:{'--items':p.items.length}},p.items.map((r,i)=>h('article',{class:'ds-process-step'},[
 h(SemanticIcon,{concept:r.icon,tone:i===0?'accent':'primary'}),h('div',{class:'ds-stage-number'},`0${i+1}`),
 h('h2',{'data-fit':'heading'},r.title),h(SlideText,{text:r.body}),i<p.items.length-1?h(FlowConnector):null,
 ])))
}})
export const StrategyCard = defineComponent({name:'StrategyCard',props:{item:{type:Object as PropType<StrategyItem>,required:true},number:{type:Number,required:true}},setup:p=>()=>h('article',{class:'ds-strategy-card'},[
 h('div',{class:'ds-strategy-top'},[h(StepBadge,{number:p.number}),h(SemanticIcon,{concept:p.item.icon})]),
 h('h2',{'data-fit':'heading'},p.item.title),h(SlideText,{text:p.item.body}),h('strong',{class:'ds-strategy-result','data-fit':'result'},p.item.result),
])})
export const StrategyGroup = defineComponent({name:'StrategyGroup',props:{items:{type:Array as PropType<StrategyItem[]>,required:true}},setup:p=>()=>{
 assertCount('StrategyGroup',p.items,3,3);return h('div',{class:'ds-strategies'},p.items.map((item,i)=>h(StrategyCard,{item,number:i+1})))
}})
export const TimelineDiagram = defineComponent({name:'TimelineDiagram',props:{tracks:{type:Array as PropType<Track[]>,required:true}},setup:p=>()=>{
 assertCount('TimelineDiagram',p.tracks,1,5)
 for(const t of p.tracks)if(!Number.isInteger(t.start)||!Number.isInteger(t.end)||t.start<1||t.end>8||t.start>t.end)throw new Error('TimelineDiagram: invalid month interval')
 return h('div',{class:'ds-timeline'},[h('span'),...Array.from({length:8},(_,i)=>h('b',{class:'ds-month'},`M${i+1}`)),
 ...p.tracks.flatMap((t,i)=>[h('strong',{class:'ds-track-label',style:{gridRow:i+2,gridColumn:1},'data-fit':'label'},t.label),h('div',{class:['ds-track',i%2?'secondary':''],style:{gridRow:i+2,gridColumn:`${t.start+1} / span ${t.end-t.start+1}`},'data-fit':'label'},t.text)])])
}})
export const HierarchyDiagram = defineComponent({name:'HierarchyDiagram',props:{items:{type:Array as PropType<string[][]>,required:true}},setup:p=>()=>{
 assertCount('HierarchyDiagram',p.items,3,4)
 return h('div',{class:'ds-hierarchy'},[h('aside',{class:'ds-flow-rail'},[h('strong','목표'),h(FlowConnector,{direction:'down'}),h('span','개인까지')]),
 h('div',{class:'ds-levels'},p.items.map((r,i)=>h('article',{class:'ds-level'},[h(StepBadge,{number:i+1}),h('div',[h('h2',{'data-fit':'heading'},r[0]),h('p',{'data-fit':'supporting'},r[1])])]))),
 h('aside',{class:'ds-flow-rail accent'},[h('strong','실적'),h(FlowConnector,{direction:'up'}),h('span','경영평가로')])])
}})
export const AgendaList = defineComponent({name:'AgendaList',props:{items:{type:Array as PropType<string[][]>,required:true}},setup:p=>()=>{
 assertCount('AgendaList',p.items,3,7);return h('div',{class:'ds-agenda-list'},p.items.map((r,i)=>h('article',[h(StepBadge,{number:i+1}),h('div',[h('h2',{'data-fit':'heading'},r[0]),h('p',{'data-fit':'supporting'},r[1])])])))
}})
