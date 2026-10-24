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
    <template v-else-if="page === 'content'">
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

    <template v-else-if="page === 'content012'">
      <main class="ppt-detail">
        <div class="ppt-detail-heading"><span>01-2 / 재구축 필요성</span><h1>변화한 제도와 노후 기술 사이,<br><em>하나의 운영체계</em>가 필요합니다.</h1><p>단순 화면 개선을 넘어 인사·성과 업무 흐름을 다시 연결합니다.</p></div>
        <div class="ppt-gap-grid">
          <article><UiIcon name="monitor-cog" :size="36"/><span>현재 과제 01</span><h2>기술 기반</h2><p>노후 시스템 구조와 사용자 경험 개선 필요</p></article>
          <article><UiIcon name="workflow" :size="36"/><span>현재 과제 02</span><h2>제도·업무</h2><p>인사·성과 컨설팅 결과의 실제 업무 반영</p></article>
          <article><UiIcon name="database-zap" :size="36"/><span>현재 과제 03</span><h2>평가자산</h2><p>누적 평가데이터·산식의 검증과 안전한 전환</p></article>
        </div>
        <div class="ppt-insight"><b>재구축 방향</b><span>기술 고도화 + 제도 구현 + 데이터 검증을 하나의 과제로 통합</span></div>
      </main>
    </template>
    <template v-else-if="page === 'content013'">
      <main class="ppt-detail">
        <div class="ppt-detail-heading"><span>01-3 / 핵심 추진 방향</span><h1>인사에서 성과까지,<br><em>끊김 없는 업무 연결</em></h1><p>분절된 기능을 사용자의 업무 여정을 중심으로 정렬합니다.</p></div>
        <div class="ppt-flow">
          <div><UiIcon name="contact-round" :size="42"/><b>인사·직무</b><small>인사정보·직무관리</small></div><UiIcon class="ppt-flow-arrow" name="arrow-right" :size="28"/>
          <div><UiIcon name="graduation-cap" :size="42"/><b>성장·역량</b><small>교육·경력개발</small></div><UiIcon class="ppt-flow-arrow" name="arrow-right" :size="28"/>
          <div><UiIcon name="chart-no-axes-combined" :size="42"/><b>성과관리</b><small>개인·조직 평가</small></div><UiIcon class="ppt-flow-arrow" name="arrow-right" :size="28"/>
          <div><UiIcon name="bar-chart-3" :size="42"/><b>성과 활용</b><small>지표·분석·환류</small></div>
        </div>
        <div class="ppt-insight"><b>설계 원칙</b><span>연계 업무의 데이터 흐름과 권한·이력을 함께 고려</span></div>
      </main>
    </template>
    <template v-else-if="page === 'content014'">
      <main class="ppt-detail">
        <div class="ppt-detail-heading"><span>01-4 / 기존 평가자산 계승</span><h1>쌓아 온 평가자산은,<br><em>검증하고 이어갑니다.</em></h1><p>전환의 핵심은 데이터 복사가 아니라 의미와 결과의 보존입니다.</p></div>
        <div class="ppt-migration">
          <div class="ppt-migration-step"><UiIcon name="database" :size="34"/><strong>01 현황 파악</strong><p>평가항목·산식·이력 확인</p></div>
          <div class="ppt-migration-step"><UiIcon name="git-compare-arrows" :size="34"/><strong>02 매핑·정비</strong><p>기준정보와 구조 매핑</p></div>
          <div class="ppt-migration-step"><UiIcon name="shield-check" :size="34"/><strong>03 전환 검증</strong><p>건수·값·산출 결과 대조</p></div>
          <div class="ppt-migration-step"><UiIcon name="check-check" :size="34"/><strong>04 안정화</strong><p>오류 보정·운영 확인</p></div>
        </div>
        <div class="ppt-insight"><b>품질 게이트</b><span>검증 기준과 승인 절차는 착수 후 JDC와 협의하여 확정</span></div>
      </main>
    </template>
    <footer class="ppt-footer"><strong>ISPark</strong><span>사람이 있는 디지털 변화</span><i>{{ page === 'cover' ? '' : page === 'section' ? '01' : page === 'content' ? '01-1' : page === 'content012' ? '01-2' : page === 'content013' ? '01-3' : '01-4' }}</i></footer>
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
export const Content012: Story = { name: '04 Content 01-2', args: { page: 'content012' } }
export const Content013: Story = { name: '05 Content 01-3', args: { page: 'content013' } }
export const Content014: Story = { name: '06 Content 01-4', args: { page: 'content014' } }
