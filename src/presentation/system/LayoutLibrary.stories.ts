import type {Meta,StoryObj} from '@storybook/vue3'
import LayoutLibrary from './LayoutLibrary.vue'
import LayoutPreview from './LayoutPreview.vue'
import {layoutLibrary} from './layout-library-model'
const meta={title:'Presentation/Layout Library',component:LayoutLibrary,parameters:{layout:'fullscreen'}} satisfies Meta<typeof LayoutLibrary>
export default meta
type Story=StoryObj<typeof meta>
export const Gallery:Story={name:'레이아웃 갤러리 · 16종'}
export const AllSlides:Story={name:'전체 장표 · 원본 크기',render:()=>({components:{LayoutPreview},setup:()=>({entries:layoutLibrary}),template:'<div style="padding:24px;background:#dce6ee;display:grid;gap:24px;justify-content:center"><div v-for="entry in entries" :key="entry.id" style="width:1040px"><LayoutPreview :entry="entry"/></div></div>'})}
