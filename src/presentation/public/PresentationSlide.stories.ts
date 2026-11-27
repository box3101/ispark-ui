import type {Meta,StoryObj} from '@storybook/vue3'
import {expect,within} from '@storybook/test'
import PresentationSlide from './PresentationSlide.vue'
import {presentationLayoutById} from './catalog'

const meta={
  title:'Presentation/Public Slide',
  component:PresentationSlide,
  parameters:{layout:'padded',docs:{description:{component:'`@leechanyong/ispark-ui/presentation`로 공개하는 장표. 1040×720 캔버스를 컨테이너 폭에 맞춰 그리고, 내용 검사에 실패하면 장표 대신 문제 목록을 보여줍니다.'}}},
  render:args=>({components:{PresentationSlide},setup:()=>({args}),template:'<div style="max-width:960px"><PresentationSlide v-bind="args"/></div>'}),
} satisfies Meta<typeof PresentationSlide>
export default meta
type Story=StoryObj<typeof meta>

const sample=(id:string)=>structuredClone(presentationLayoutById[id].sample)

export const SectionCover:Story={name:'장별 표지 · 1040×720',args:{layoutId:'section-cover',content:sample('section-cover')}}
export const ParallelCards:Story={name:'병렬 메시지 카드',args:{layoutId:'parallel-message-cards',content:{...sample('parallel-message-cards'),source:'예시 출처 · 실제 RFP 근거 아님'}}}
export const FocusProcess:Story={name:'단계형 프로세스',args:{layoutId:'focus-process',content:{...sample('focus-process'),source:'예시 출처 · 실제 RFP 근거 아님'},page:3}}

export const InvalidContent:Story={
  name:'잘못된 내용 → 문제 목록',
  args:{layoutId:'focus-process',content:{data:{title:'',section:'',subtitle:'',takeaway:'',items:[{title:'단계 하나',body:'본문'}]}}},
  play:async({canvasElement})=>{
    const canvas=within(canvasElement)
    await expect(canvas.getByRole('alert')).toHaveTextContent('장표를 그릴 수 없습니다')
    await expect(canvas.getByRole('alert')).toHaveTextContent('3–4개')
  },
}
