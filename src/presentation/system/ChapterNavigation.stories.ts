import type {Meta,StoryObj} from '@storybook/vue3'
import ChapterNavigation from './ChapterNavigation.vue'

const items=[{id:'focus',number:'01',label:'중점 찾기'},{id:'strategy',number:'02',label:'전략 수립'},{id:'theme',number:'03',label:'테마 생성'},{id:'story',number:'04',label:'스토리 생성'}]
const meta={title:'Presentation/Layouts/Chapter Header',component:ChapterNavigation,tags:['autodocs'],parameters:{layout:'padded',docs:{description:{component:'본문 장표의 공통 목차. 전체 폭 경로형을 기본으로 사용하고 한 덱 안에서 같은 형식을 유지합니다. 현재 항목만 고객사 테마의 강조색과 굵기로 표시하며 텍스트 배경·밑줄은 사용하지 않습니다. activeId는 0-based 숫자가 아닌 항목의 고유 ID입니다. PDF용 위치 표시이므로 클릭 동작은 없습니다. theme의 active/inactive/heading/divider 또는 상위 CSS 의미 토큰으로 고객사 색상을 지정합니다.'}}},args:{items,activeId:'strategy',variant:'full'},argTypes:{activeId:{control:'select',options:items.map(x=>x.id)},variant:{control:'radio',options:['full','compact']}}} satisfies Meta<typeof ChapterNavigation>
export default meta
type Story=StoryObj<typeof meta>
export const Full:Story={name:'전체 폭 경로형 · 기본'}
export const Compact:Story={name:'우측 압축형',args:{variant:'compact'}}
export const CustomerTheme:Story={name:'고객사 테마 변경',args:{theme:{active:'#006FBD',inactive:'#6B7684',heading:'#092E49',divider:'#DFEDF6'}}}
export const AllStages:Story={name:'현재 단계별 표시',render:args=>({components:{ChapterNavigation},setup:()=>({args,items}),template:'<div style="max-width:1040px;display:grid;gap:42px;padding:24px"><ChapterNavigation v-for="item in items" :key="item.id" v-bind="args" :active-id="item.id"/></div>'})}
export const SlideHeader:Story={name:'장표 헤더 적용',render:args=>({components:{ChapterNavigation},setup:()=>({args}),template:'<section style="max-width:1040px;padding:36px;background:linear-gradient(120deg,white,#f0f8fd);font-family:Pretendard Variable,Pretendard,sans-serif;color:#092e49;box-sizing:border-box"><ChapterNavigation v-bind="args"/><h1 style="font-size:34px;margin:28px 0 12px">전략 수립에 사용하는 세 가지 자료</h1><p style="font-size:20px;margin:0;color:#526c7e">선택한 중점과 채택한 과제를 중심으로 관련 자료를 묶습니다.</p><div style="height:200px;margin-top:32px;border:1px dashed #bdd5e7;border-radius:8px;display:grid;place-items:center;color:#526c7e">본문 레이아웃 영역</div></section>'})}
