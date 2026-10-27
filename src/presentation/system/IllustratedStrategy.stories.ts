import type {Meta,StoryObj} from '@storybook/vue3'
import IllustratedStrategySlide from './IllustratedStrategySlide.vue'
const meta={
  title:'Presentation/Illustrated Strategy',component:IllustratedStrategySlide,tags:['autodocs'],parameters:{layout:'fullscreen'},
  args:{width:1040,section:'시점 / 사업의 이해',titleBefore:'재구축은',titleEmphasis:'제도 전환',titleAfter:'의 완성입니다',
    subtitle:'기술 · 제도 · 성과를 하나의 흐름으로 연결',takeaway:'기술·제도·성과를 하나의 방향으로 연결합니다',takeawayLabel:'핵심 방향',source:'원본 p.3 요약 / RFP 원문 대조 전',page:3,
    items:[
      {category:'시스템의 시간',headline:'노후 시스템의 재구축',body:'변화된 업무를 담는\n안정적인 업무 기반',outcome:'업무를 담는 기반',artwork:'server',outcomeIcon:'data-migration'},
      {category:'제도의 전환',headline:'직무성과 중심 제도 구현',body:'제도를 화면과 절차에\n온전히 반영',outcome:'현장에서 작동하는 제도',artwork:'system',outcomeIcon:'workflow'},
      {category:'평가의 대응력',headline:'상시 성과관리 체계',body:'지표·실적·증빙을 연결해\n경영평가 대응 지원',outcome:'근거가 이어지는 성과',artwork:'analytics',outcomeIcon:'performance'},
    ],
  },
  argTypes:{items:{control:'object'},width:{control:{type:'range',min:755,max:1510,step:5}},background:{control:'text'},atlas:{control:'text'}},
} satisfies Meta<typeof IllustratedStrategySlide>
export default meta
type Story=StoryObj<typeof meta>
export const ReferenceMatch:Story={name:'시안 구현 · 편집 가능한 텍스트'}
export const ReusedContent:Story={name:'다른 발표 내용으로 재사용',args:{section:'추진 전략 / 실행 방향',titleBefore:'혁신은',titleEmphasis:'연결된 실행',titleAfter:'에서 시작됩니다',subtitle:'데이터 · 업무 · 성과를 연결하는 실행 전략',takeaway:'일관된 기준으로 실행과 성과를 연결합니다',source:'재사용 동작 확인을 위한 예시',items:[
  {category:'데이터 기반',headline:'신뢰할 수 있는 데이터',body:'분산된 정보를 모아\n같은 기준으로 관리',outcome:'판단을 돕는 정보',artwork:'server',outcomeIcon:'data-migration'},
  {category:'업무의 연결',headline:'일관된 업무 흐름',body:'부서 간 절차를 연결해\n협업의 기반 마련',outcome:'함께 일하는 방식',artwork:'system',outcomeIcon:'workflow'},
  {category:'성과의 확인',headline:'실행 결과의 가시화',body:'목표와 결과를 비교해\n개선 방향을 확인',outcome:'다음 실행의 근거',artwork:'analytics',outcomeIcon:'performance'},
]}}
