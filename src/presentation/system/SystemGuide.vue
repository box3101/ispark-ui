<script setup lang="ts">
import {SlideCanvas,SlideHeader,SlideText,SemanticIcon,ComparisonDiagram,TraceabilityTable,ProcessDiagram} from './components'
import {slideTokens} from './tokens'
import {comparisonExample,traceExample,processExample} from './examples'
const swatches=[['navy900','제목 · 결론','흰 배경의 핵심 문장'],['blue600','관계 · 아이콘','순서와 연결을 표현'],['orange700','전환 · 강조','결과의 차이를 강조'],['blue100','결과 바탕','짙은 글자와 함께 사용']] as const
</script>
<template>
  <SlideCanvas source="ISPark 발표 컴포넌트 시스템 v0.4 / CSS px × 0.75 = PDF pt" :page="1">
    <template #header><SlideHeader section="01 / 타이포그래피" title="평가위원이 핵심을 바로 읽는 크기" subtitle="글자 크기를 줄이지 않고, 내용의 양을 조절합니다." /></template>
    <div class="ds-guide-grid">
      <div class="ds-guide-block">
        <div class="ds-spec-row"><b style="font-size:var(--type-title)">대제목</b><span>42 px / 31.5 pt</span></div>
        <div class="ds-spec-row"><b style="font-size:var(--type-heading)">핵심 결과</b><span>28 px / 21 pt</span></div>
        <div class="ds-spec-row"><b style="font-size:var(--type-heading)">소제목</b><span>26 px / 19.5 pt</span></div>
        <div class="ds-spec-row"><SlideText text="설명 본문" /><span>24 px / 18 pt</span></div>
        <div class="ds-spec-row"><span>출처 · 페이지</span><span>12 px / 9 pt</span></div>
      </div>
      <div class="ds-guide-block"><h2>읽는 순서를 고정합니다</h2><p>대제목 → 결과 → 설명 순으로<br>크기와 굵기를 구분합니다.<br><br>본문은 한 항목에 2~3행.<br>핵심 결과는 1~2행.<br><br>초과하면 요약하거나 분할합니다.<br>출처는 발표 본문과 분리합니다.</p></div>
    </div>
  </SlideCanvas>
  <SlideCanvas source="색상: presentation/tokens.ts / 아이콘: 기존 ProposalIcon·Phosphor(MIT) 재사용" :page="2" takeaway="색·아이콘·간격은 공통 규칙, 내용은 props로 전달">
    <template #header><SlideHeader section="02 / 색상과 기본 요소" title="의미가 같은 요소는 같은 모양으로" /></template>
    <div class="ds-swatches"><div v-for="[token,name,desc] in swatches" :key="token" class="ds-swatch"><div :style="{background:slideTokens.colors[token]}" /><h2>{{ name }}</h2><p>{{ desc }}<br>{{ slideTokens.colors[token] }}</p></div></div>
    <div style="display:flex;gap:45px;margin-top:42px"><SemanticIcon v-for="concept in ['data-migration','workflow','performance','deliverable','mapping','quality']" :key="concept" :concept="concept" /></div>
  </SlideCanvas>
  <SlideCanvas source="ComparisonDiagram / 예시 데이터 / 구성: 의미 아이콘 + 현재 + 연결 + 핵심 결과" :page="3">
    <template #header><SlideHeader section="03 / 비교 도식" title="결과가 먼저 읽히는 비교 컴포넌트" /></template>
    <ComparisonDiagram :rows="comparisonExample" />
  </SlideCanvas>
  <SlideCanvas source="TraceabilityTable / 예시 데이터 / 실제 table·thead·th·td로 구조화" :page="4" takeaway="최대 3행. 설명이 길어지면 다음 장으로 분할">
    <template #header><SlideHeader section="04 / 추적 표" title="원문·설계·검증을 같은 행에서 확인" /></template>
    <TraceabilityTable :rows="traceExample" />
  </SlideCanvas>
  <SlideCanvas source="ProcessDiagram / 예시 데이터 / 아이콘·소제목·본문·연결선 조합" :page="5" takeaway="3~4단계. 단계별 제목과 설명을 같은 위치에 배치">
    <template #header><SlideHeader section="05 / 절차 도식" title="아이콘과 연결선으로 흐름을 설명" /></template>
    <ProcessDiagram :items="processExample" />
  </SlideCanvas>
  <SlideCanvas source="구현 규칙 / 원문 사실 검증·평가장 프로젝터 실측·자동 블라인드 검사는 별도" :page="6">
    <template #header><SlideHeader section="06 / 조합과 품질 규칙" title="같은 Vue 컴포넌트로 Storybook과 PDF" /></template>
    <div class="ds-guide-grid">
      <div class="ds-guide-block"><h2>01 · 조합</h2><p>Canvas → Header → Diagram<br>→ Takeaway → Footer<br>각 요소를 독립적으로 재사용합니다.</p></div>
      <div class="ds-guide-block"><h2>02 · 배경</h2><p>표지·간지는 풍경을 살립니다.<br>본문 뒤는 흰색으로 고정해<br>사진과 글자가 경쟁하지 않습니다.</p></div>
      <div class="ds-guide-block"><h2>03 · 내용 계약</h2><p>비교·추적표는 최대 3행.<br>절차는 3~4단계, 전략은 3개.<br>출처 없는 장표는 출력하지 않습니다.</p></div>
      <div class="ds-guide-block"><h2>04 · 검수</h2><p>크기·넘침·하단 충돌을 검사하고<br>PDF를 이미지로 다시 확인합니다.<br>실제 평가장 가독성은 별도 확인합니다.</p></div>
    </div>
  </SlideCanvas>
  <SlideCanvas source="공개 IR p.3~5 실측 / 내부 디자인 시스템이나 비공개 제안서 원본을 확보한 것은 아님" :page="7" takeaway="원본의 정보 구조를 적용하되 한글 발표 본문은 확대">
    <template #header><SlideHeader section="07 / 기업 공개자료 역설계" title="측정한 규칙을 enterprise 테마로 적용" /></template>
    <div class="ds-guide-grid">
      <div class="ds-guide-block"><h2>삼성SDS · 표 구조</h2><p>780 × 540pt 판형<br>제목 21pt / 표 다수 11~12pt<br><br>진한 머리글과 얇은 행선,<br>같은 기준선 위의 표·도표.<br><br>JDC는 본문을 18pt로 확대하고<br>결과 열만 강조합니다.</p></div>
      <div class="ds-guide-block"><h2>NHN · 영역 분리</h2><p>720 × 405pt 판형<br>목차 항목 약 16pt<br><br>큰 왼쪽 제목과 오른쪽 목록,<br>설명과 도표를 나누는 구성.<br><br>JDC는 목차의 큰 07을 없애고<br>7개 항목을 선형으로 배치합니다.</p></div>
    </div>
  </SlideCanvas>
</template>
