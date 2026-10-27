import type {Meta,StoryObj} from '@storybook/vue3'
import IllustrationLibrary from './IllustrationLibrary.vue'
const meta={title:'Presentation/Asset Library',component:IllustrationLibrary,parameters:{layout:'fullscreen'}} satisfies Meta<typeof IllustrationLibrary>
export default meta
type Story=StoryObj<typeof meta>
export const Gallery:Story={name:'공통 에셋 · 검색과 다운로드'}
