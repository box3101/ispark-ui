import type { Meta, StoryObj } from '@storybook/vue3'
import SlideFrame from './SlideFrame.vue'
import TabbedPanels from './TabbedPanels.vue'
import NestedBlocks from './NestedBlocks.vue'
import BadgeSteps from './BadgeSteps.vue'
import FigurePanel from './FigurePanel.vue'
import DenseTable from './DenseTable.vue'
import PathFlow from './PathFlow.vue'
import { CANVAS, gridDensity } from './layoutHelper'

const stage = 'padding:24px;background:#eef1f4;display:flex;justify-content:center'

const meta = {
  title: 'Presentation/Layouts',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          '제안 장표 레이아웃의 **HTML 쪽**이다. 같은 레이아웃의 PPTX 구현은 `presentation/renderer/layouts.mjs` 에 있다.',
          '',
          '둘을 따로 두는 이유는 쓰임이 다르기 때문이다. HTML 은 시안을 빨리 보고 고치는 자리,',
          'PPTX 는 심사위원에게 가는 산출물이다. 색과 캔버스는 `presentation/tokens.ts` 하나를 공유한다.',
          '',
          `**캔버스** — A4 가로 ${CANVAS.width}×${CANVAS.height}px (비율 ${CANVAS.ratio.toFixed(3)}).`,
          '실측한 제안서 3종이 전부 이 비율이었다. `tokens.ts` 의 인치 값을 96dpi 로 환산해 쓰므로',
          '여기에 숫자를 따로 적지 않는다.',
          '',
          '**구조는 측정에서 나왔다** — 실제 제안서 pptx 43장의 도형 1280개를 python-pptx 로 읽은 결과다.',
          '사각 47.5% + 둥근사각 28.1% + 원 12.2% 로 88%, 그룹 중첩 최대 깊이 5, 탭 도형 35개(폭 38.2%),',
          '원 67개(지름 11.2%), 표 최대 16×10. 화려한 도형이 아니라 **중첩**이 밀도를 만든다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

// ============================================
// SlideFrame — 모든 레이아웃이 올라가는 캔버스
// ============================================
export const Frame: Story = {
  name: 'SlideFrame (캔버스)',
  parameters: {
    docs: {
      description: {
        story:
          '머리 칩 · 제목 · 영문 서브헤드 · 우상단 브랜드 · 하단 결론 바 · 푸터. 치수는 JDC PDF 6쪽 실측값이다. 결론 바는 실측 31장 중 1장에서만 쓰였으니 아껴 쓸 것.',
      },
    },
  },
  render: () => ({
    components: { SlideFrame },
    template: `<div style="${stage}">
      <SlideFrame
        chip-accent="시점" chip-main="제안 개요"
        title="캔버스 하나에 모든 레이아웃이 올라갑니다"
        subhead-en="A NOW PATH FOR A BETTER TOMORROW"
        subtitle="머리·꼬리는 공통이고 본문 슬롯만 레이아웃마다 다릅니다."
        :brand-lines="['JEJU','FOR A','SUSTAINABLE','TOMORROW']"
        conclusion="결론 바는 실측 31장 중 1장뿐이었다 — 매 장에 붙이면 강조가 죽는다"
        conclusion-label="사용 지침"
        footer-left="JEJU FREE INTERNATIONAL CITY DEVELOPMENT CENTER"
        footer-right="PEOPLE · SYSTEM · SUSTAINABLE TOMORROW"
      >
        <div style="flex:1;border:1px dashed #b9c1ca;display:flex;align-items:center;justify-content:center;color:#6b7684;font-size:1.3cqw">
          본문 슬롯
        </div>
      </SlideFrame>
    </div>`,
  }),
}

// ============================================
// TabbedPanels — 실측 11/43장
// ============================================
export const Tabbed: Story = {
  name: 'TabbedPanels',
  parameters: {
    docs: {
      description: {
        story:
          '탭은 `ROUND_2_SAME_RECTANGLE`(위 두 모서리만 둥근 사각) 35개로 실측됐고 폭 중앙값이 캔버스의 38.2% 였다. 폭 38%면 가로로 2~3개가 들어가므로 패널도 2~3개가 기본이다.',
      },
    },
  },
  render: () => ({
    components: { SlideFrame, TabbedPanels },
    setup: () => ({
      panels: [
        { tab: '데이터의 단절', icon: 'data-migration', tone: 'navy', items: [
          { title: '별도 솔루션에 쌓인 평가 데이터', note: '신규 포털과 이어지지 않음' },
          { title: '테이블 구조·코드체계 상이', note: '이력 데이터 품질 편차' },
          { title: '무결점 직결', note: '현행 운영사로서 구조를 이미 파악' }] },
        { tab: '제도와 시스템의 단절', icon: 'workflow', tone: 'navy', items: [
          { title: '직무컨설팅 결과 미반영', note: '제도가 시스템에 없음' },
          { title: '보고서를 해석하는 사업자', note: '해석 오차 발생 지점' },
          { title: '원설계자 직접 투입', note: '수행 당사자가 본 사업 참여' }] },
        { tab: '현재와 미래의 단절', icon: 'platform', tone: 'orange', items: [
          { title: '단순 운영에 머문 현실', note: '지능형으로 가는 경로 부재' },
          { title: '직무·역량 데이터 표준 부재', note: '적용의 전제조건 미충족' },
          { title: 'AI 인사배치 PoC', note: '본 과업 범위 외 추가제안' }] },
      ],
    }),
    template: `<div style="${stage}">
      <SlideFrame chip-accent="시점" chip-main="사업 이해" title="끊어진 세 개의 길을 잇습니다" page-no="01">
        <TabbedPanels :panels="panels" />
      </SlideFrame>
    </div>`,
  }),
}

// ============================================
// NestedBlocks — 밀도의 정체
// ============================================
export const Nested: Story = {
  name: 'NestedBlocks',
  parameters: {
    docs: {
      description: {
        story:
          '실측 덱의 밀도는 그룹 중첩(162개, 최대 깊이 5)에서 나왔다. 블록 머리 + 항목 + 결론 세 겹을 쌓아 지면을 채운다. 우리 장표가 비어 보였던 이유는 카드 한 겹에서 멈췄기 때문이다.',
      },
    },
  },
  render: () => ({
    components: { SlideFrame, NestedBlocks },
    setup: () => ({
      blocks: [
        { label: '방향 01', title: '끊김 없는 재구축', icon: 'data-migration', tone: 'navy',
          items: [{ text: '현행 데이터 구조를 아는 운영사' }, { text: '이관 검증이 아닌 이관 보증', strong: true }, { text: '평가 시즌 회피 전환' }],
          takeaway: '걷던 길을 멈추지 않게' },
        { label: '방향 02', title: '제도와 시스템의 일체화', icon: 'strategy', tone: 'navy',
          items: [{ text: '컨설팅 원저자 참여' }, { text: '제도 해석 오차 구조적으로 0', strong: true }, { text: '요구사항 추적 매트릭스' }],
          takeaway: '설계도 대로 길을 낸다' },
        { label: '방향 03', title: '검증된 성과관리', icon: 'performance', tone: 'orange',
          items: [{ text: '전사전략→조직→개인' }, { text: '공공기관 최다 구축 솔루션', strong: true }, { text: '경영평가 모니터링 특화' }],
          takeaway: '가장 많이 안내해 본 길' },
        { label: '방향 04', title: '함께 만드는 인사포털', icon: 'organization', tone: 'navy',
          items: [{ text: '프로토타입 조기 공개' }, { text: 'JDC 제도에 맞춘 백지 설계', strong: true }, { text: '현업 워크숍 검증' }],
          takeaway: '새 구간은 걷는 사람과 함께' },
      ],
    }),
    template: `<div style="${stage}">
      <SlideFrame chip-accent="1코스" chip-main="제안방향" title="네 갈래 길을 하나의 코스로" page-no="02">
        <NestedBlocks :blocks="blocks" />
      </SlideFrame>
    </div>`,
  }),
}

// ============================================
// BadgeSteps — 화살표보다 원
// ============================================
export const Steps: Story = {
  name: 'BadgeSteps',
  parameters: {
    docs: {
      description: {
        story:
          '실측 덱은 화살표가 12개뿐인데 원은 67개였고 지름 중앙값이 캔버스 폭의 11.2% 였다. 단계를 화살표로 잇기보다 큰 번호 원으로 순서를 읽게 하고, 아래에 레일(직선 36개)을 깐다.',
      },
    },
  },
  render: () => ({
    components: { SlideFrame, BadgeSteps },
    setup: () => ({
      steps: [
        { title: '사전 클렌징', icon: 'data-migration', note: '중복 · 결측 · 코드 불일치 정비', outputs: ['이관 대상 데이터 맵', '정비 대상 목록'] },
        { title: '이관 후 대사', icon: 'mapping', note: '건수 · 금액 · 이력 리콘실리에이션', outputs: ['대사 결과서', '차이 원인 분석'] },
        { title: '현업 검증 승인', icon: 'quality', note: '오류 시 롤백 시나리오 가동', outputs: ['검증 확인서', '롤백 시나리오'] },
      ],
    }),
    template: `<div style="${stage}">
      <SlideFrame
        chip-accent="1코스" chip-main="전략 1"
        title="이관 검증이 아니라, 이관 보증입니다"
        conclusion="전환 시점은 평가 시즌과 겹치지 않게 설계합니다"
        conclusion-label="무중단 전환"
        page-no="03"
      >
        <BadgeSteps :steps="steps" rail-label="3단계 이관 검증 체계" />
      </SlideFrame>
    </div>`,
  }),
}

// ============================================
// FigurePanel — 대형 이미지 18개
// ============================================
export const Figure: Story = {
  name: 'FigurePanel',
  parameters: {
    docs: {
      description: {
        story:
          '실측 이미지 151개 중 아이콘·소형이 79.5%, 대형(면적 12~35%)이 18개였다. 아이콘은 SVG 로 대응되지만 이 대형 한 장이 없었다. 그림만 놓으면 뭘 볼지 모르니 오른쪽에 읽는 법을 번호로 붙인다.',
      },
    },
  },
  render: () => ({
    components: { SlideFrame, FigurePanel },
    setup: () => ({
      notes: [
        { title: '경영평가 지표 트리', note: '전사전략에서 개인성과까지 4계층' },
        { title: '실적 진척 신호등', note: '지표별 달성률을 색으로 표시' },
        { title: '증빙자료 연계', note: '지표마다 근거 문서를 바로 열람' },
        { title: '담당자 알림', note: '반기 마감과 담당자 변경 관리' },
      ],
    }),
    template: `<div style="${stage}">
      <SlideFrame
        chip-accent="3코스" chip-main="전략 3"
        title="요구사항 문장이 아니라 화면으로 설명합니다"
        page-no="04"
      >
        <FigurePanel
          figure-label="경영평가 모니터링 화면 시안"
          :notes="notes"
          caption="화면 시안은 제안 단계 산출물이며, 최종 화면은 분석·설계 단계에서 협의해 확정합니다."
          icon="performance"
        />
      </SlideFrame>
    </div>`,
  }),
}

// ============================================
// DenseTable — 실측 최대 16×10
// ============================================
export const Table: Story = {
  name: 'DenseTable',
  parameters: {
    docs: {
      description: {
        story:
          '실측 표 9개의 크기는 16×9, 10×3, 16×10 등이었다. 행이 많아지면 글자와 여백을 함께 줄이고, 묶음 경계에 굵은 선을 넣어 눈이 미끄러지지 않게 한다.',
      },
    },
  },
  render: () => ({
    components: { SlideFrame, DenseTable },
    setup: () => ({
      columns: ['전략', '세부과제', '활용 강점', '겨냥 평가요소'],
      rows: [
        ['1. 무결점 이관', '현행 데이터 사전 진단', '강점 1', { text: '데이터 요구사항', emphasis: true }],
        ['', '3단계 이관 검증 체계', '강점 1', { text: '데이터 오류 처리 방안', emphasis: true }],
        ['', '무중단 전환 시나리오', '강점 1', '사업 이해도'],
        ['2. 컨설팅-시스템 원팀', '원저자 참여 체계', '강점 2', { text: '전략 및 방법론', emphasis: true }],
        ['', '제도→요구사항 추적 매트릭스', '강점 2', 'CSR-001'],
        ['', '컨설팅-개발 병행 거버넌스', '강점 2', '일정 리스크 흡수'],
        ['3. 성과관리 검증', '요구사항 커버리지 매트릭스', '강점 4', { text: 'SFR 충족률', emphasis: true }],
        ['', '정부경영평가 모니터링', '강점 4', 'SFR-028'],
        ['', '4-계층 성과 연계 모델', '강점 4', '통합 성과체계'],
        ['4. 신규 구간 조성', '백지 설계 프레임 선점', '약점 대응', '수행실적'],
        ['', '조기 프로토타이핑', '약점 대응', '현업 검증 확대'],
        ['5. 다음 코스', 'AI 직무기반 인사배치 PoC', '강점 3', '과업 범위 외 추가제안'],
      ],
      breaks: [3, 6, 9, 11],
    }),
    template: `<div style="${stage}">
      <SlideFrame chip-accent="전체" chip-main="전략 요약" title="다섯 전략, 열두 과제가 어느 평가에 답하는가" page-no="05">
        <DenseTable
          :columns="columns" :rows="rows" :highlight-column="3" :group-breaks="breaks"
          caption="평가요소 항목명과 배점은 RFP 원문과 대조해 확정 후 반영합니다."
        />
      </SlideFrame>
    </div>`,
  }),
}

// ============================================
// PathFlow — PDF 6쪽 실측 좌표
// ============================================
export const Path: Story = {
  name: 'PathFlow (곡선 경로)',
  parameters: {
    docs: {
      description: {
        story: [
          'JDC 제안요약서 PDF 6쪽을 PyMuPDF 로 실측해 옮긴 레이아웃이다.',
          '',
          '카드 y 가 **57.7 → 61.0 → 62.9 → 59.1%** 로 일렬이 아니다. 곡선을 따라 내려갔다 올라온다.',
          '이 어긋남이 리듬을 만든다 — 우리가 빠뜨렸던 부분이다.',
          '',
          '원본에서 곡선과 카드는 벡터가 아니라 **이미지 한 장**이었다(PDF 드로잉에 베지어 연산자 0개).',
          '여기서는 같은 노드 좌표를 지나는 SVG 로 다시 그려 고쳐 쓸 수 있게 했다.',
          '배경은 원본 사진 대신 같은 장에서 잰 색 범위로 CSS 재구성한 것이다.',
        ].join('\n'),
      },
    },
  },
  render: () => ({
    components: { SlideFrame, PathFlow },
    setup: () => ({
      items: [
        { step: '1코스', no: '01', icon: 'data-migration', title: '끊김 없는 재구축', tagline: '걷던 길을 멈추지 않게', note: '무결점 데이터 이관과 무중단 전환' },
        { step: '2코스', no: '02', icon: 'strategy', title: '제도 · 시스템 일체화', tagline: '설계도대로 길을 낸다', note: '컨설팅 원저자가 참여하는 제도 반영' },
        { step: '3코스', no: '03', icon: 'performance', title: '검증된 성과관리', tagline: '가장 많이 안내한 길', note: '공공 최다 구축 솔루션 및 경험 기반 통합 성과체계' },
        { step: '4코스', no: '04', icon: 'organization', title: '함께 만드는 인사포털', tagline: '새 구간은 걷는 사람과 함께', note: '조기 프로토타입과 현업 참여 설계' },
      ],
    }),
    template: `<div style="${stage}">
      <SlideFrame
        backdrop="coast"
        chip-accent="시점" chip-main="제안 개요"
        title="네 갈래 길을 하나의 코스로 - 4대 추진 방향"
        subhead-en="A NOW PATH FOR A BETTER TOMORROW"
        :brand-lines="['JEJU','FOR A','SUSTAINABLE','TOMORROW']"
        footer-left="JEJU FREE INTERNATIONAL CITY DEVELOPMENT CENTER"
        footer-right="PEOPLE · SYSTEM · SUSTAINABLE TOMORROW"
      >
        <PathFlow :items="items" />
      </SlideFrame>
    </div>`,
  }),
}

// ============================================
// 제약 위반 — 조용히 깨지지 않는다
// ============================================
export const GridLimits: Story = {
  name: '제약 위반 (밀도 상한)',
  parameters: {
    docs: {
      description: {
        story:
          '`layoutHelper` 의 `gridDensity` 는 셀 수로 밀도를 판정한다. 실측 본문 슬라이드가 도형 중앙값 23개에 세로 평균 6행이었으니, 그보다 성기면 비어 보이고 훨씬 넘기면 투사 거리에서 못 읽는다.',
      },
    },
  },
  render: () => ({
    setup: () => ({
      cases: [
        [2, 2], [3, 4], [4, 4], [5, 5], [6, 6], [7, 6], [8, 9],
      ].map(([c, r]) => ({ c, r, cells: c * r, density: gridDensity(c, r) })),
    }),
    template: `<div style="padding:28px;background:#fff;font-family:Pretendard Variable,Pretendard,sans-serif;color:#1f2937">
      <table style="border-collapse:collapse;font-size:13px">
        <thead><tr>
          <th style="padding:8px 14px;text-align:left;color:#6b7684">격자</th>
          <th style="padding:8px 14px;text-align:right;color:#6b7684">셀</th>
          <th style="padding:8px 14px;text-align:left;color:#6b7684">판정</th>
        </tr></thead>
        <tbody>
          <tr v-for="x in cases" :key="x.c + 'x' + x.r" style="border-top:1px solid #e5e8eb">
            <td style="padding:8px 14px">{{ x.c }}열 × {{ x.r }}행</td>
            <td style="padding:8px 14px;text-align:right;font-variant-numeric:tabular-nums">{{ x.cells }}</td>
            <td style="padding:8px 14px;font-weight:700"
                :style="{ color: x.density === 'overloaded' ? '#b91c1c' : x.density === 'sparse' ? '#b45309' : '#1f7a4d' }">
              {{ x.density }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>`,
  }),
}
