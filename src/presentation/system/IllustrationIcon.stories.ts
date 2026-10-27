import type {Meta,StoryObj} from '@storybook/vue3'
import ProposalVisualIcon from './ProposalVisualIcon.vue'
import {illustrationAssets} from './illustration-assets'
import {proposalIcons} from '../../../presentation/icons/icon-map'
const meta={title:'Presentation/Visual Icon',component:ProposalVisualIcon,tags:['autodocs'],parameters:{layout:'centered'},args:{concept:'data-migration',variant:'illustrated',size:240},argTypes:{variant:{control:'radio',options:['flat','illustrated']},concept:{control:'select',options:proposalIcons.map(c=>c.key)},illustration:{control:'select',options:illustrationAssets.map(a=>a.id)}}} satisfies Meta<typeof ProposalVisualIcon>
export default meta
type Story=StoryObj<typeof meta>
export const Illustrated:Story={name:'입체 PNG'}
export const Flat:Story={name:'같은 의미 · 기본 SVG',args:{variant:'flat'}}
