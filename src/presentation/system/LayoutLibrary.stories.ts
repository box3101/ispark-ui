import type {Meta,StoryObj} from '@storybook/vue3'
import LayoutLibrary from './LayoutLibrary.vue'
import LayoutPreview from './LayoutPreview.vue'
import {galleryLayouts as layoutLibrary} from './layout-library-model'
const meta={title:'Presentation/Layout Library',component:LayoutLibrary,parameters:{layout:'fullscreen'}} satisfies Meta<typeof LayoutLibrary>
export default meta
type Story=StoryObj<typeof meta>
export const Gallery:Story={name:'레이아웃 갤러리'}
export const ParallelCards:Story={name:'병렬 메시지 카드 · 하단 강조형',render:()=>({components:{LayoutPreview},setup:()=>({entry:layoutLibrary.find(entry=>entry.id==='parallel-message-cards')!}),template:'<div style="max-width:1040px;margin:auto"><LayoutPreview :entry="entry"/></div>'})}
export const RiskResponse:Story={name:'위험과 대응 · 연결형',render:()=>({components:{LayoutPreview},setup:()=>({entry:layoutLibrary.find(entry=>entry.id==='risk-response')!}),template:'<div style="max-width:1040px;margin:auto"><LayoutPreview :entry="entry"/></div>'})}
export const AlternativeComparison:Story={name:'대안 비교표 · 양쪽 패널형',render:()=>({components:{LayoutPreview},setup:()=>({entry:layoutLibrary.find(entry=>entry.id==='option-table')!}),template:'<div style="max-width:1040px;margin:auto"><LayoutPreview :entry="entry"/></div>'})}
export const AllSlides:Story={name:'전체 장표 · 원본 크기',render:()=>({components:{LayoutPreview},setup:()=>({entries:layoutLibrary}),template:'<div style="padding:24px;background:#dce6ee;display:grid;gap:24px;justify-content:center"><div v-for="entry in entries" :key="entry.id" style="width:1040px"><LayoutPreview :entry="entry"/></div></div>'})}
