import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent } from 'vue'

const css = `
.ppt { aspect-ratio:16/9; width:min(1100px,94vw); background:#F7F5F0; color:#13263F; box-sizing:border-box; padding:5%; position:relative; overflow:hidden; font-family:Pretendard,Arial,sans-serif; box-shadow:0 8px 30px #0002 }
.ppt .head {display:flex; justify-content:space-between; font-size:clamp(11px,1.4vw,18px); font-weight:650}
.ppt h1 {font-size:clamp(30px,4.8vw,65px); line-height:1.2; letter-spacing:-.04em; margin:0}
.ppt h2 {font-size:clamp(22px,3vw,40px); line-height:1.3; letter-spacing:-.04em}
.ppt .sub {font-size:clamp(12px,1.7vw,23px);margin-top:20px}
.ppt .accent {color:#C65B35}
.ppt .footer {position:absolute;bottom:5%;left:5%;font-size:clamp(12px,1.5vw,20px);font-weight:700;color:#168AC9}
.ppt .stone {position:absolute;right:0;top:0;width:34%;height:100%;background:repeating-radial-gradient(ellipse at 40% 40%,#65716c 0 5px,#343c3c 9px 17px,#171e22 19px 24px);opacity:.92}
.ppt .cards {display:grid;grid-template-columns:repeat(3,1fr);gap:2%;margin-top:5%}
.ppt .card {background:white;border:1px solid #dbe1e2;padding:8%;min-height:150px}
.ppt .card strong {font-size:clamp(15px,1.8vw,25px)}
.ppt .card p {font-size:clamp(10px,1.1vw,16px);line-height:1.5}
`
const Preview = defineComponent({
  props: { page: { type: String, default: 'cover' } },
  data: () => ({ css }),
  template: `<div class="ppt"><style v-text="css"></style>
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
