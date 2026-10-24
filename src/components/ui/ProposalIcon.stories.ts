import type { Meta, StoryObj } from '@storybook/vue3'
import ProposalIcon from './ProposalIcon.vue'
const meta = { title:'Presentation/Proposal Icon System', component: ProposalIcon, args:{ name:'database',variant:'hero',tone:'blue',size:72 }, argTypes:{variant:{control:'select',options:['hero','diagram','inline']},tone:{control:'select',options:['navy','blue','orange','teal']}} } satisfies Meta<typeof ProposalIcon>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
export const IconLanguage: Story = { render:()=>({components:{ProposalIcon},template:`<div style="padding:24px;background:#f7f5f0;display:flex;gap:30px;flex-wrap:wrap;font-family:Pretendard,sans-serif"><div v-for="(x,i) in [{name:'database',label:'데이터 이관'},{name:'users',label:'인사·직무'},{name:'shield-check',label:'품질 검증'},{name:'workflow',label:'업무 연계'}]" :key="x.name" style="text-align:center;color:#13263f"><ProposalIcon :name="x.name" variant="hero" :tone="i===2?'orange':'blue'" :size="82"/><p>{{x.label}}</p></div></div>`}) }
export const DiagramAndInline: Story = { render:()=>({components:{ProposalIcon},template:`<div style="padding:24px;display:flex;gap:26px;align-items:center"><ProposalIcon name="database" variant="diagram" :size="62"/><ProposalIcon name="arrow-right" variant="inline" :size="48"/><ProposalIcon name="shield-check" variant="diagram" tone="teal" :size="62"/></div>`}) }
