import type {Meta,StoryObj} from '@storybook/vue3'
import CourseAgendaSlide from './CourseAgendaSlide.vue'
import './system.css'

const meta={
 title:'Presentation/System v0.3/Course Agenda',component:CourseAgendaSlide,tags:['autodocs'],
 parameters:{layout:'fullscreen',docs:{description:{component:'풍경 배경 위에 왼쪽 제목·항목 수와 오른쪽 코스 목록을 배치합니다. 3~8항목, 홀수 마지막 항목은 전체 폭. 항목 수는 자동 계산하고 왼쪽 정렬은 제목과 같은 48px입니다. 배경은 AI 생성 예시이며 특정 장소의 실사 증빙이 아닙니다.'}}},
 argTypes:{title:{control:'text'},sectionLabel:{control:'text'},background:{control:'text'},countLabel:{control:'text'},showCount:{control:'boolean'},items:{control:'object'}},
 args:{title:'오늘 함께 걸을\n일곱 구간의 길',sectionLabel:'코스 안내',countLabel:'COURSE GUIDE',showCount:true,page:2,source:'Storybook 일반 예시 / 배경: AI 생성 해안 풍경',background:'/presentation/jeju-horizon-v1.png',items:[
  {section:'시점',title:'사업의 이해',description:'현재의 과제와 추진 방향'},
  {section:'1코스',title:'재구축 전략·방법론',description:'수행 전략과 단계별 접근'},
  {section:'2코스',title:'컨설팅·제도 반영',description:'제도의 취지를 시스템으로'},
  {section:'3코스',title:'성과관리 구현',description:'전략에서 개인까지 연결'},
  {section:'4코스',title:'인사포털 구현',description:'업무 기준에 맞춘 설계'},
  {section:'5코스',title:'조직·일정·품질·운영',description:'튼튼하게, 제때, 끝까지'},
  {section:'종점',title:'요약과 추가 제안',description:'다음 코스를 위한 준비'},
 ]},
} satisfies Meta<typeof CourseAgendaSlide>
export default meta
type Story=StoryObj<typeof meta>
export const WithBackground:Story={name:'풍경 배경 + 코스 목차'}
export const WithoutCounter:Story={name:'큰 숫자 숨기기',args:{showCount:false}}
export const FourSections:Story={name:'다른 내용으로 재사용',args:{title:'함께 완성할\n네 가지 과제',countLabel:'PROJECT OUTLINE',items:[
 {section:'01',title:'현황 분석',description:'문제와 요구사항 확인'},
 {section:'02',title:'실행 계획',description:'일정과 수행 범위 수립'},
 {section:'03',title:'구현과 검증',description:'설계 반영과 결과 확인'},
 {section:'04',title:'운영과 지원',description:'안정화와 지속적인 개선'},
]}}
