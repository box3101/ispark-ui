import type {Meta,StoryObj} from '@storybook/vue3'
import ArtworkWindow from './ArtworkWindow.vue'
import IllustrationIcon from './IllustrationIcon.vue'
const meta={title:'Presentation/Illustrated Assets',component:IllustrationIcon,tags:['autodocs'],parameters:{layout:'centered',docs:{description:{component:'개별 투명 PNG. 공통 목록은 Presentation / Asset Library에서 검색·다운로드할 수 있습니다.'}}},args:{name:'legacy-server',size:280}} satisfies Meta<typeof IllustrationIcon>
export default meta
type Story=StoryObj<typeof meta>
export const Server:Story={name:'서버 · 데이터'}
export const System:Story={name:'제도 · 시스템',args:{name:'system-blocks'}}
export const Analytics:Story={name:'성과 · 분석',args:{name:'analytics-review'}}
export const Wave:Story={name:'카드 하단 물결 · 밝은 배경용',render:()=>({components:{ArtworkWindow},template:'<div style="width:438px"><ArtworkWindow src="/presentation/illustrated/artwork-atlas.png" :x="65" :y="641" :width="438" :height="178" /></div>'})}
