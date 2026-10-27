# 공개 기업 발표 PDF의 측정과 적용

2026-10-27 확인. 기업의 비공개 내부 디자인 시스템을 복원했다는 뜻이 아니다. 공개된 두 IR PDF의 실제 장표를 렌더링하고 텍스트 bbox·서체 크기를 측정해 재사용할 규칙을 추출했다. 회사 규모별 관행이나 수주 효과의 증거로 사용하지 않는다.

## 출처와 측정

| 출처 | 직접 확인 범위 | 측정값 또는 시각 관찰 |
|---|---|---|
| [Samsung SDS 2Q25 Earnings Release](https://image.samsungsds.com/en/investor/ir_events/ear_rele/__icsFiles/afieldfile/2025/07/24/Samsung%20SDS%202Q25%20Earnings%20Release_1.pdf) | PDF p.3~5 | 780×540pt. 제목 21pt, 본문/표 span 다수 11~12pt. p.4의 텍스트 x범위 약 28.9~749.4pt. 파란 머리글, 가는 행선, 같은 기준선 위의 표와 도표. |
| [NHN 1Q25 Earnings Release](https://www.nhn.com/en_/ir/EarningsRelease/2025/1Q25_NHN_Earnings%20Release_ENG.pdf) | PDF p.3~5 | 720×405pt. 목차 p.3 주요 항목 약 16pt, 목록 번호 x≈331.4pt(폭의 약 46%). p.5 강조 수치 21pt, 설명 소제목 약 13pt. 설명 영역과 도표 영역 분리. |

수치는 PDF 텍스트 span에서 추출한 값이다. 텍스트의 좌우 범위는 페이지 여백 전체를 뜻하지 않으며, 이미지·도형의 위치는 포함하지 않는다. 출처별 판형이 달라 pt 숫자만 단순 비교하지 않는다.

## 추출 규칙 → 컴포넌트

| 원본에서 관찰한 규칙 | 구현 | JDC 적용을 위해 바꾼 점 |
|---|---|---|
| 진한 머리글 + 얇은 행 구분 + 제한된 열 강조 | ComparisonDiagram, TraceabilityTable | 사실·원문·검증 구조로 데이터 교체. 결과 열만 연한 블루로 강조 |
| 목차의 큰 왼쪽 제목 + 오른쪽 선형 목록 | AgendaList + SlideCanvas enterprise | 오른쪽 7항목을 읽기 위해 설명을 숨기고 제목만 표시. 큰 07 장식 삭제 |
| 본문은 흰 바탕, 숫자·핵심에만 색 부여 | enterprise 테마 | JDC 블루·네이비 유지. 본문 배경 사진 제거, 표지·간지는 유지 |
| 단순한 구획과 기준선, 과한 카드·그림자 없음 | enterprise CSS variant | 카드 그림자·둥근 일정 막대 최소화 |
| 제목과 본문의 위계 | type tokens | 원본 IR의 8~12pt 표 글자는 복제하지 않음. 한글 발표 본문 18pt 기준으로 확대 |

기업 로고, 사진, 금융 수치, 원본 문구는 JDC 산출물에 복사하지 않았다. 이 결과물은 **공개 기업 발표자료의 구조를 참고해 만든 별도 디자인 프로필**이다.

## 재현

`SlideCanvas profile="enterprise"`를 사용한다. PDF 입력의 각 장표에 `profile: "enterprise"`를 지정하면 Storybook과 같은 Vue 컴포넌트·CSS가 적용된다. 별도 PNG 장표를 붙여 넣지 않는다.

v0.4에서도 JDC 특정 간지와 코스명은 DeckSlide 어댑터에 남아 있다. 이를 모든 기업의 제안서에 바로 적용되는 범용 완성품이라고 보지 않는다.
