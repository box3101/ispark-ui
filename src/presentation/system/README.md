# 발표 컴포넌트 시스템 v0.3

기존 `src/presentation/layouts/`의 문서 중심 레이아웃과 별도로, 발표 화면에서 핵심 결과를 읽기 위한 Vue 컴포넌트 계층입니다. 기존 `ProposalIcon`과 색상 토큰은 재사용합니다. 기존 컴포넌트를 삭제하거나 UI 라이브러리 공개 API에 임의로 추가하지 않았습니다.

## 실제 단일 렌더 경로

Storybook → Vue 컴포넌트 + `system.css`

PDF → **같은 Vue 컴포넌트**를 Vue SSR로 렌더 → 같은 `system.css` → 로컬 Chromium PDF

`presentation/pdf-system/build-components.mjs`가 이 경로를 담당합니다. 예전 `build.mjs`의 문자열 레이아웃은 v0.1/v0.2 재현용이며 v0.3 PDF에는 사용하지 않습니다.

## 컴포넌트 목록

| 계층 | 컴포넌트 | 계약 |
|---|---|---|
| 기본 | SlideTitle | 제목 최대 55자. 실제 렌더 영역 검사도 수행 |
| 기본 | SlideSubtitle, SlideText | 부연 20px, 본문 24px. 개별 색·좌표 지정 대신 역할 사용 |
| 기본 | SectionLabel, StepBadge | 장 구분과 순서 표시 |
| 기본 | SemanticIcon | 기존 의미 키 사용. 잘못된 키는 오류 |
| 기본 | FlowConnector | 우측·아래·위 방향의 정보 관계 |
| 조합 | SlideHeader | 장 구분 + 제목 + 선택 부연 |
| 조합 | EvidenceFooter | 출처 필수, 최대 130자, 페이지 번호 |
| 조합 | TakeawayBar | 최대 45자, 한 문장의 결론 |
| 컨테이너 | SlideCanvas | 1040×720 CSS px / 780×540 PDF pt, 밝음·어두움·분할 배경 |
| 도식 | ComparisonDiagram | 1~3행. 대상·현재·핵심 결과·선택 보조설명 |
| 표 | TraceabilityTable | 1~3행, 실제 HTML table과 행·열 머리글 |
| 도식 | ProcessDiagram | 3~4단계, 의미 아이콘·제목·설명 |
| 조합 | StrategyCard, StrategyGroup | 카드 단독 사용 가능 / 그룹은 3개 |
| 도식 | TimelineDiagram | 최대 5작업, 1~8개월, 구간 역전 금지 |
| 도식 | HierarchyDiagram | 3~4계층, 목표 하향·실적 상향 |
| 조합 | AgendaList | 3~7항목 |
| 장표 | DeckSlide | 컴포넌트 조합. 현재 JDC 10개 유형 어댑터 |

## 사용 예

```vue
<script setup lang="ts">
import { SlideCanvas, SlideHeader, ComparisonDiagram } from './components'
const rows = [{
  label: '데이터', current: '분산된 업무 이력',
  result: '업무 이력의 통합', detail: '같은 기준으로 조회', icon: 'data-migration'
}]
</script>
<template>
  <SlideCanvas source="검토한 원문의 페이지·문서 ID" :page="1">
    <template #header><SlideHeader section="사업 이해" title="핵심 결과를 먼저 읽습니다" /></template>
    <ComparisonDiagram :rows="rows" />
  </SlideCanvas>
</template>
```

사용하는 페이지 또는 Storybook에서 `system.css`를 한 번 가져옵니다. `SlideCanvas`가 색과 타이포 CSS 변수를 제공합니다. 독립 기본 요소를 Canvas 밖에서 사용한다면 `tokens.ts`의 `themeVariables`를 상위 요소에 지정합니다.

## 글자·배경 규칙

- 제목 42px = 31.5pt, 결과 28px = 21pt, 소제목 26px = 19.5pt, 본문 24px = 18pt.
- 출처 12px = 9pt. 발표 본문의 대체물이 아닙니다.
- 조밀한 일정 라벨은 18~20px, 절차 본문 23px, 목차 부연 18px로 별도 정의합니다. 모든 텍스트가 18pt 이상인 것은 아닙니다.
- 자동 축소하지 않습니다. 항목 수가 넘치면 오류, 실제 텍스트 영역이 넘치면 PDF 빌드 실패.
- 본문 도식 뒤는 흰색. 표지·간지·마무리는 사진을 보여주되 글자 뒤는 오버레이로 보호합니다.
- 제목의 임의 크기 변경이나 페이지별 HEX를 입력하지 않습니다. 새 고객사는 테마 토큰과 배경으로 분리하는 확장이 필요합니다.

## 확인과 실행

```powershell
npm run storybook -- --no-open
npx vitest run src/presentation/system/system.test.ts
npx vue-tsc --noEmit
node presentation/pdf-system/build-components.mjs --guide output/pdf/Presentation-Component-System-v0.3.pdf
node presentation/pdf-system/build-components.mjs presentation/pdf-system/local/jdc-components.json output/pdf/JDC-Design-Review-v0.3.pdf
python presentation/pdf-system/inspect_pdf.py
```

Storybook 경로: `Presentation/System v0.3/Components`. 예시 데이터는 가상 일반 업무이며 JDC 기밀 자료는 Storybook에 포함하지 않습니다. JDC 입력은 Git 제외된 `presentation/pdf-system/local/`에만 있습니다.

환경은 Node 24, 기존 Vue/Vite/Playwright, Windows Edge, 설치된 Pretendard Regular/Bold OTF 기준입니다. 글꼴 경로는 `PROPOSAL_FONT_DIR`, 브라우저는 `PROPOSAL_BROWSER_PATH`로 바꿀 수 있습니다. PDF 생성 시 외부 네트워크는 차단합니다.

## 검사 범위와 한계

내용 개수·의미 아이콘·출처·일정 범위, HTML 이스케이프와 고정 역할 대비를 테스트합니다. PDF 빌드는 영역 이탈·글자 넘침·본문/결론/푸터 충돌을 검사합니다. 이미지 재렌더링과 육안 확인을 추가합니다.

일반적인 모든 요소 사이의 겹침이나 RFP 사실관계, 블라인드 규정, 실제 평가장 프로젝터 가독성은 자동으로 검증하지 않습니다. JDC 장표의 간지 코스명과 계층 방향 등 일부 도메인 구조는 DeckSlide에 남아 있습니다. 현재 결과물은 대표 장표 검토판이고 47장 전체 제출본이 아닙니다.
# 풍경 배경 목차와 공통 배경

## 공통 에셋 라이브러리

Storybook `Presentation / Asset Library / Gallery`에서 24개 의미에 대응하는 입체 이미지 25개를 검색하고 투명 PNG를 내려받습니다. 배경은 투명 격자/흰색/남색으로 전환할 수 있습니다. 배경 이미지와 기존 밝은 카드용 물결 장식은 별도 구역에 있습니다.

```vue
<!-- 같은 의미의 기본 SVG 또는 입체 이미지 선택 -->
<ProposalVisualIcon concept="data-migration" variant="illustrated" :size="180" />
<ProposalVisualIcon concept="data-migration" variant="flat" />
<!-- 분석/목표처럼 같은 의미에 여러 표현이 있으면 ID로 선택 -->
<IllustrationIcon name="analytics-review" :size="180" />
```

`illustration-assets.ts`가 ID·한국어 이름·검색어·기본 SVG 의미 키·파일명 목록입니다. `IllustrationIcon`의 독립 PNG는 알파 투명도와 원본 비율을 유지합니다. 배경과 무관한 공통 자산이며 특정 RFP 문구를 포함하지 않습니다. 기본 SVG 24종 모두에 입체 표현이 연결되어 있습니다. 성과 분석용 추가 표현을 포함해 이미지는 25개입니다. 대응표는 Presentation / Asset Library / Semantic Pairs에서 봅니다.

현재 전략/비교 장표의 주 아이콘은 독립 PNG를 참조합니다. 카드 물결과 옅은 결과 워터마크는 기존 아트워크 영역을 사용합니다. 입체 PNG의 색은 CSS 토큰으로 재색칠되지 않습니다. 자산 추가 시 `public/presentation/illustrated/icons/`에 파일과 생성 기록을 넣고 목록을 추가합니다. 검사: `python presentation/pdf-system/check-illustration-assets.py`, `node presentation/pdf-system/capture-asset-library.mjs`.

## 재사용 가능한 입체 비교 장표

`IllustratedComparisonSlide.vue` + `IllustratedComparisonRow.vue`는 3행 비교용입니다. `rows`의 각 항목은 `{label,current,result,detail,artwork,iconSrc?}`이고 `artwork`는 `data`, `system`, `performance` 중 선택합니다. 열 이름은 `headers`, 표제는 `title`와 `emphasis`, 배경은 `background`로 바꿉니다. 빈 배경 문자열이면 사진이 없는 흰 배경입니다. 다른 RFP의 문구와 근거는 사용자가 별도로 제공합니다.

기본 CSS 색은 `slideTokens.colors`에서 navy900/blue600/blue100/orange500을 참조합니다. 다른 브랜드는 `theme: {navy,blue,light,accent}`로 명시적으로 교체할 수 있습니다. 이미지 안의 색은 토큰으로 변경되지 않습니다. 전체 크기는 `width`로 비례 축소합니다. 1536×1024 시안 재현 프로필이며 기존 1040×720 PDF 캔버스와 비율이 다릅니다. 현재 전체 덱 빌드에 자동 삽입하지 않습니다.

Storybook `Presentation / Illustrated Comparison`에 JDC 및 다른 RFP 예시가 있습니다. `node presentation/pdf-system/capture-comparison.mjs`로 두 예시 PNG 및 넘침·표/결론 바 충돌·색상 검증 결과를 생성합니다. 한 줄 결과 제목과 두 줄 현재 문구를 기준으로 하며 긴 문구를 자동 축소하지 않습니다.

## 이미지 시안 기반 3카드 장표

`IllustratedStrategySlide.vue`는 1510×1042 기준 디자인을 `width`에 맞춰 비례 축소합니다. 제목은 `titleBefore`, `titleEmphasis`, `titleAfter`로 강조 구간을 바꿉니다. `section`, `subtitle`, `takeawayLabel`, `takeaway`, `source`, `page`는 모두 실제 텍스트입니다.

`items`는 정확히 3개이며 `IllustratedStrategyCard.vue`를 재사용합니다. 각 항목에는 `category`, `headline`, `body`, `outcome`, `artwork` (`server`/`system`/`analytics`), `outcomeIcon` (기존 의미 아이콘 키)을 지정합니다. `iconSrc`를 넣으면 외부 아이콘 파일로 대체합니다. 배경은 `background`, 아트워크는 `atlas`로 교체합니다. 긴 문구는 자동 축소하지 않습니다. 핵심 제목 한 줄, 설명 두 줄에 맞춰 편집하고 렌더 후 검사합니다.

입체 아이콘/물결은 텍스트 없는 이미지 영역이고 카드 경계, 번호, 연결 화살표, 모든 글자와 결론 바는 HTML/CSS/SVG입니다. 저장된 자산을 쓰므로 재사용할 때 생성 API를 호출하지 않습니다. 현재 아트워크는 밝은 카드 표면용이며 투명 아이콘은 아닙니다. 자세한 자산 출처와 생성 프롬프트는 `public/presentation/illustrated/README.md`에 있습니다.

Storybook: `Presentation / Illustrated Strategy` (시안 구현 및 다른 내용 재사용), `Presentation / Illustrated Assets` (아이콘·물결 개별 보기). 검증/PNG 캡처: Storybook 실행 후 `node presentation/pdf-system/capture-illustrated.mjs`.

`CourseAgendaSlide.vue`는 배경 이미지, 좌측 제목과 자동 항목 수, 우측 코스 목록을 조합합니다. `items`는 3–8개이며 각 항목에 `section`, `title`, `description`을 지정합니다. `background`, `sectionLabel`, `countLabel`, `showCount`로 배경과 라벨을 바꿀 수 있습니다. Storybook의 `Presentation / System v0.3 / Course Agenda`에서 7개·4개 항목 및 숫자 숨기기를 확인할 수 있습니다.

덱 스펙에서는 `layout: 'agenda'`, `agendaVariant: 'course'`, `courses`로 사용합니다. 일반 본문에 `profile: 'scenic'`과 같은 `backgroundAsset`을 지정하면 밝은 오버레이, 카드 면, 남색 결론 바를 공유합니다. 표지에는 어두운 오버레이가 적용됩니다. 텍스트는 이미지에 합성하지 않고 Vue 컴포넌트로 유지합니다.
