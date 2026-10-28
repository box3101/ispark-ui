import type {Meta,StoryObj} from '@storybook/vue3'
import ProposalVisualIcon from './ProposalVisualIcon.vue'
import {proposalIcons} from '../../../presentation/icons/icon-map'
import './system.css'
import {themeVariables} from './tokens'
const meta={title:'Presentation/Asset Library',parameters:{layout:'fullscreen'}} satisfies Meta
export default meta
type Story=StoryObj<typeof meta>
export const SemanticPairs:Story={name:'24종 · SVG와 입체 대응표',render:()=>({components:{ProposalVisualIcon},setup:()=>({concepts:proposalIcons,themeVariables}),template:`<div :style="themeVariables" style="padding:28px;background:#f5f8fb;color:#092e49;font-family:Pretendard Variable,Pretendard,sans-serif"><h1>24종 의미 대응표</h1><p>같은 concept에서 variant만 flat / illustrated로 바꿉니다.</p><div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px"><article v-for="c in concepts" :key="c.key" style="background:white;border:1px solid #dfedf6;border-radius:10px;padding:15px"><div style="display:flex;align-items:center;justify-content:center;gap:12px"><ProposalVisualIcon :concept="c.key" variant="flat"/><ProposalVisualIcon :concept="c.key" variant="illustrated" :size="140"/></div><h2 style="font-size:18px">{{c.label}}</h2><code style="font-size:12px">{{c.key}}</code></article></div></div>`})}
