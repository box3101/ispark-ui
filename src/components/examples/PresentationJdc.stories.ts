import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent } from 'vue'

import './presentation-jdc.css'
const Preview = defineComponent({
  props: { page: { type: String, default: 'cover' } },
  template: `<div class="ppt">
  <div v-if="page==='cover'" class="stone" aria-hidden="true"></div>
  <div class="head" style="position:relative"><span>JDC 인사포털 및 성과관리시스템 재구축 용역 · 제안발표</span><span>JDC</span></div>
  <template v-if="page==='cover'"><div style="position:relative;margin-top:14%;max-width:65%"><h1>제주 돌담,<br><span class="accent">다시</span> 쌓을 때</h1><div class="sub">평가자산은 검증해 잇고,<br>인사·성과는 새롭게</div></div></template>
  <template v-else-if="page==='section'"><div style="margin-top:11%"><h1 class="accent" style="font-size:clamp(70px,11vw,150px);font-weight:350">01</h1><h2>JDC 제주 돌담을 살피다</h2><div class="sub">사업 이해와 재구축 방향</div></div></template>
  <template v-else><div style="margin-top:6%"><h2>기술과 제도를 함께 바꾸고,<br>평가자산은 검증해 잇습니다.</h2><div class="sub">사업 이해와 재구축 방향</div></div><div class="cards"><div class="card" v-for="(x,i) in ['기술 기반 고도화','제도 변화 반영','평가자산 검증·계승']" :key="x"><div class="accent">0{{i+1}}</div><br><strong>{{x}}</strong><p>{{['노후 시스템 개선','컨설팅 결과 구현','기존 데이터와 산식 검증'][i]}}</p></div></div></template>
  <div class="footer">ISPark <small style="color:#83909B;font-weight:400">/ 로고 교체 예정</small></div></div>`
})
const meta = { title: 'Presentation/JDC Heritage Modern', component: Preview, parameters: { layout: 'fullscreen', docs: { description: { component: '16:9 시안 미리보기. 사진 질감은 CSS 임시 표현이며 로고는 공식 원본으로 교체해야 합니다. PPTX 생성은 지원하지 않습니다.' } } }, args: { page: 'cover' } } satisfies Meta<typeof Preview>
export default meta
type Story = StoryObj<typeof meta>
export const Cover: Story = { args: { page: 'cover' } }
export const Section: Story = { args: { page: 'section' } }
export const Content011: Story = { args: { page: 'content' } }
