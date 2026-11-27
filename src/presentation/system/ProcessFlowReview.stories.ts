import type {Meta,StoryObj} from '@storybook/vue3'
import ProposalDiagramSlide from './ProposalDiagramSlide.vue'
import CourseAgendaSlide from './CourseAgendaSlide.vue'
import './system.css'
import './jdc-opening.css'
const meta={title:'Presentation/Process Flow Review',component:ProposalDiagramSlide,parameters:{layout:'fullscreen'}} satisfies Meta<typeof ProposalDiagramSlide>
export default meta
type Story=StoryObj<typeof meta>
// Source of truth: FigJam selected theme 548:118 and 30-slide outline 556:304.
// The landscape is an AI-generated thematic illustration, not site evidence.
const background='/presentation/illustrated/jeju-batdam-jdc.png'
const source='JDC 인사포털 및 성과관리시스템 재구축 · 제안발표'
export const Theme:Story={name:'01 테마 · 제주밭담',args:{background,source,page:1,data:{kind:'cover',section:'JDC 인사포털 및 성과관리시스템 재구축',title:'제주 밭담',subtitle:'일한 기록을 차곡차곡 쌓다',subtitleHighlight:'차곡차곡 쌓다',takeaway:'직원은 업무 기록을 바탕으로 희망 직무를 준비하고,\nJDC는 성과를 근거로 경영 의사결정을 내립니다.',items:[]}},render:(args)=>({components:{ProposalDiagramSlide},setup:()=>({args}),template:'<ProposalDiagramSlide v-bind="args" class="jdc-batdam-cover"/>'}),parameters:{controls:{disable:true}}}
export const Agenda:StoryObj<typeof CourseAgendaSlide>={name:'02 목차',args:{title:'기록을 쌓아,\n경력과 성과로',sectionLabel:'발표 목차',countLabel:'발표 구성',showCount:true,background,source,page:2,items:[
{section:'사업의 이해',title:'업무의 터를 살피고\n쌓아야 할 돌을 찾다',description:'재구축의 범위와 목표'},
{section:'제안 개요',title:'네 전략을 엮어\n밭담의 짜임을 잡다',description:'전략의 연결과 추진 계획'},
{section:'전략 1 · 전환',title:'지난 평가 이력을\n새 체계의 돌로 고르다',description:'단절 없는 이력 전환'},
{section:'전략 2 · 제도',title:'직무 제도를\n시스템의 밑돌로 놓다',description:'제도·시스템 일체화'},
{section:'전략 3 · 경력',title:'경력과 교육을\n희망 직무로 쌓아 올리다',description:'직원 주도 경력설계'},
{section:'전략 4 · 성과',title:'개인의 성과를\n경영목표로 이어 두르다',description:'4계층 성과 연계'},
{section:'사업관리·검증',title:'함께 쌓고 검증해\n밭담을 단단히 완성하다',description:'일정·품질·보안·운영 인계'},
{section:'마무리',title:'차곡차곡 쌓은 기록을\n경력 선택과 경영 판단으로',description:'직원과 JDC의 다음 선택'}]},render:(args)=>({components:{CourseAgendaSlide},setup:()=>({args}),template:'<CourseAgendaSlide v-bind="args" class="jdc-batdam-agenda"/>'}),parameters:{controls:{disable:true}}}
