import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent } from 'vue'
import UiIcon from '../ui/UiIcon.vue'
import './presentation-jdc.css'

const Preview = defineComponent({
  components: { UiIcon },
  props: { page: { type: String, default: 'cover' } },
  template: `<div class="ppt premium-jdc" :class="'ppt--' + page">
    <div class="ppt-photo" v-if="page !== 'content'" aria-hidden="true"></div>
    <div class="ppt-wash" v-if="page !== 'content'" aria-hidden="true"></div>
    <header class="ppt-header">
      <span>{{ page === 'cover' ? 'JDC 인사포털 및 성과관리시스템 재구축 용역 · 제안발표' : '01  /  사업 이해와 재구축 방향' }}</span>
      <span class="ppt-client">JDC <small>제주국제자유도시개발센터</small></span>
    </header>
    <template v-if="page === 'cover'">
      <main class="ppt-cover-copy">
        <h1>제주 돌담,<br><em class="ppt-handwriting">다시</em> 쌓을 때</h1>
        <div class="ppt-rule"></div>
        <p>평가자산은 검증해 잇고,<br>인사·성과는 새롭게</p>
      </main>
    </template>
    <template v-else-if="page === 'section'">
      <main class="ppt-section-copy">
        <div class="ppt-section-index">01 <span></span></div>
        <div><h1>JDC 제주 돌담을 살피다</h1><p>사업 이해와 재구축 방향</p></div>
      </main>
    </template>
    <template v-else>
      <main class="ppt-content-copy">
        <div class="ppt-content-intro"><h1>사업 개요</h1><p>기존 자산을 검증해 잇고,<br>미래 인사·성과관리 기반을 새롭게 구축합니다.</p></div>
        <div class="ppt-content-grid">
          <div class="ppt-overview">
            <div class="ppt-orbit">
              <div class="ppt-orbit-center">JDC<br>인사포털 및<br>성과관리</div>
              <div class="ppt-orbit-node top"><UiIcon name="users" :size="28" :stroke-width="1.6" /><span>인사·직무<br>교육·경력개발</span></div>
              <div class="ppt-orbit-node left"><UiIcon name="chart-no-axes-combined" :size="28" :stroke-width="1.6" /><span>개인평가<br>조직성과</span></div>
              <div class="ppt-orbit-node right"><UiIcon name="shield-check" :size="28" :stroke-width="1.6" /><span>평가자산<br>검증·계승</span></div>
            </div>
          </div>
          <div class="ppt-facts">
            <div><UiIcon name="calendar-days" :size="20" /><b>사업기간</b><span>계약체결일로부터 240일</span></div>
            <div><UiIcon name="workflow" :size="20" /><b>제도 구현</b><span>인사·성과 컨설팅 결과 반영</span></div>
            <div><UiIcon name="database" :size="20" /><b>데이터</b><span>기존 데이터 이관·표준·연동</span></div>
            <div><UiIcon name="shield-check" :size="20" /><b>운영 기반</b><span>품질·보안·교육·안정화</span></div>
          </div>
        </div>
      </main>
    </template>
    <footer class="ppt-footer"><strong>ISPark</strong><span>사람이 있는 디지털 변화</span><i>{{ page === 'cover' ? '' : page === 'section' ? '01' : '01-1' }}</i></footer>
  </div>`
})
const meta = {
  title: 'Presentation/JDC Heritage Modern',
  component: Preview,
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Premium JDC layout preview. Scenic photo is a Creative Commons Wikimedia placeholder; the JDC and ISPark wordmarks are typographic placeholders, not official logo assets. No exported PPTX parity is claimed.' } } },
  args: { page: 'cover' },
} satisfies Meta<typeof Preview>
export default meta
type Story = StoryObj<typeof meta>
export const Cover: Story = { name: '01 Cover', args: { page: 'cover' } }
export const Section: Story = { name: '02 Section', args: { page: 'section' } }
export const Content011: Story = { name: '03 Content 01-1', args: { page: 'content' } }
