# 발표 레이아웃 라이브러리

Storybook: `http://localhost:6006/?path=/story/presentation-layout-library--gallery`

현재 범위는 16개 실제 Vue 장표, 검색·분류, 확대 보기, 용도·입력 항목·사용 제한 안내와 예시 JSON 다운로드입니다. 내용 자동 분석, 파일 업로드, 자동 레이아웃 선택 UI, PPTX 변환은 포함하지 않습니다.

## 내용으로 장표 만들기

1. 제목, 세부목차, 본문, 근거, 표·일정 데이터, 배경·브랜드를 받습니다.
2. 내용의 관계를 보고 `layout-library-model.ts`에서 레이아웃을 선택합니다.
3. 해당 항목의 `props`를 복제해 내용을 교체합니다. 줄 수·항목 수를 넘으면 분할합니다.
4. `LayoutPreview`에 `LayoutEntry`를 전달합니다. 썸네일과 원본 보기는 같은 Vue 컴포넌트입니다.
5. 브라우저 PDF로 출력한 뒤 실제 PDF의 줄바꿈·잘림·근거를 검토합니다.

예: 병렬 전략 → strategy-cards, 현재·목표 → current-target, 실행 순서 → delivery-process, 기간 → delivery-schedule, 구성과 연결 → system-architecture.

배경과 아이콘은 기존 AI 생성 자산입니다. 예시 내용과 수치는 실제 JDC 요구사항·수행실적을 의미하지 않습니다. 화면 설명 장표는 실제 화면 대신 자리 표시를 사용하며 `data.screen: {src, alt}`로 교체합니다.

## 구현

- `src/presentation/system/layout-library-model.ts`: 카탈로그, 예시 데이터, 일정·구성도 검사
- `LayoutLibrary.vue`: 검색, 필터, 접근 가능한 확대 대화상자, JSON 다운로드
- `LayoutPreview.vue`: 원본 비율을 유지하는 반응형 미리보기
- `ProposalDiagramSlide.vue`: 프로세스·구성도·간트 등 13개 유형
- 기존 CourseAgendaSlide / IllustratedStrategySlide / IllustratedComparisonSlide: 3개 유형 재사용

구성도는 3계층, 계층당 2–4노드, 인접 하위 계층 연결을 지원합니다. 복잡한 임의 그래프의 자동 배치 엔진은 아닙니다. 간트는 4–8개월, 최대 5개 작업이며 시작·종료 월은 1부터 셉니다. 기존 일러스트 장표의 고유 비율은 유지하고 PDF에서는 1040×720 페이지에 맞춰 여백으로 수용합니다.

## 검증과 예시 PDF

Storybook 실행 상태에서:

```powershell
npm run typecheck
node presentation/pdf-system/check-layout-library.mjs
python presentation/pdf-system/inspect_pdf.py output/pdf/layout-library/ISPark-Layout-Library-v1.pdf
```

검증 스크립트는 16개 장표 렌더, 텍스트 경계, 필터·검색·다운로드·대화상자·모바일 폭과 잘못된 일정·연결 거부를 확인합니다. 사람의 디자인·근거 검토를 대체하지 않습니다.
