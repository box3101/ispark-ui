# PDF proposal design system 0.1

JDC 원본과 같은 **780 × 540 pt** PDF를 생성하는 독립적인 디자인 프로필입니다. 이 비율은 ISO A4가 아닙니다. 기존 PPTX 생성기는 유지하며 PDF 우선 제작 경로를 추가했습니다.

## 실행

저장소의 Playwright와 Windows의 Edge(Chromium)를 사용합니다. 다른 브라우저 실행 파일은 `PROPOSAL_BROWSER_PATH`로 지정할 수 있습니다. Windows 외 환경의 기본값은 Playwright Chromium입니다. Pretendard Regular/Bold OTF가 로컬 Windows 글꼴 폴더에 필요합니다. 다른 환경은 `PROPOSAL_FONT_DIR`로 경로를 지정합니다.

```powershell
node presentation/pdf-system/build.mjs
node presentation/pdf-system/build.mjs presentation/pdf-system/local/jdc-review.json output/pdf/JDC-Design-Review-v0.1.pdf
```

PDF와 같은 위치에 HTML 미리보기, 페이지 PNG, QA JSON을 생성합니다. HTML은 로컬 글꼴 경로를 참조하므로 공유용은 PDF를 사용하세요. PDF 출력은 로컬에서만 이루어지며 렌더링 중 외부 네트워크 요청을 차단합니다.

`python presentation/pdf-system/inspect_pdf.py`로 실제 PDF 페이지를 다시 렌더링합니다. Python 패키지 `pymupdf`, `Pillow`가 필요합니다. 현재 Edge는 OTF를 Type3 글리프로 PDF에 포함하므로 검사기는 CharProcs도 검사합니다. 이 단계의 이미지와 접촉 시트는 `tmp/pdfs/final/`에 저장합니다.

## 구조

- `theme.css`: 고정 캔버스, 서체, 여백, 레이아웃. 현재 CSS px는 PDF에서 0.75 pt로 변환됩니다.
- `build.mjs`: 슬롯 렌더링, HTML 이스케이프, 레이아웃·출처·일정 범위·오버플로 검사, PDF 출력.
- `guide.json`: 디자인 규칙과 공개 1차 자료 분석. 비기밀 샘플이자 스펙 예시입니다.
- `local/`: JDC 검토 입력. Git에서 제외됩니다. 외부에 배포하지 않습니다.
- 팔레트는 `../tokens.ts`의 colors 블록에서 읽습니다. 파서가 기대하는 형식이 바뀌면 빌드가 실패합니다. 폰트 크기는 PDF 전용 프로필입니다.

### 배경 프로필

장표의 `backgroundAsset`에 입력 JSON 기준 로컬 PNG/JPEG/WebP 경로를 지정할 수 있습니다. 표지는 짙은 네이비 오버레이, 간지는 왼쪽 밝은 오버레이, 본문은 중앙을 밝게 처리한 배경, 마무리는 오른쪽 풍경을 살리는 구성을 사용합니다. 이미지에 문자를 합성하지 않고 텍스트는 별도로 렌더합니다. 이미지 디코딩 실패 시 빌드를 중단합니다. 사용자가 요청한 전면 배경 시안에 적용하며 기존 이미지 면적 제한을 통과했다는 의미는 아닙니다.

### v0.2: 길·코스·연결 프로필

덱 JSON에 `designProfile: "route"`를 지정하면 `route-layouts.mjs`와 `route-theme.css`가 적용됩니다. 기존 기본형은 유지합니다. 밝고 어두운 영역을 나눈 목차, 연결된 전략 지점, AS-IS/TO-BE 전환 도식, 현재 코스 표시, 산출물-매핑-설계-검증 흐름, 목표 하향/실적 상향 도식, 요구사항 추적표가 포함됩니다. 절차 아이콘은 저장소의 Phosphor 글리프(MIT)를 재사용합니다. TypeScript 글리프를 직접 읽으므로 Node 24 환경을 기준으로 합니다.

```powershell
node presentation/pdf-system/build.mjs presentation/pdf-system/local/jdc-route-review.json output/pdf/JDC-Design-Review-v0.2.pdf
```

## 디자인 결정과 조사 근거

기업 비공개 제안서 대신 공개 IR와 디자인 가이드를 분석했습니다. IR 디자인과 제안서 수주 효과를 동일시하지 않습니다. 아래 관찰은 해당 페이지의 시각 검토와 코드 열람에 근거한 설계 판단입니다.

| 자료 | 확인 범위 | 적용 |
|---|---|---|
| [IBM layout](https://www.ibm.com/design/language/layout/tips-and-techniques/) | 그리드·여백·타이포 위계 설명 | 공통 시작선, 짧고 큰 제목, 반복 장식 축소 |
| [Samsung SDS 2Q25](https://image.samsungsds.com/en/investor/ir_events/ear_rele/__icsFiles/afieldfile/2025/07/24/Samsung%20SDS%202Q25%20Earnings%20Release_1.pdf) | PDF p.4·p.5 렌더링 | 표와 차트 정렬, 머리글 중심의 색상 사용 |
| [NHN 1Q25](https://www.nhn.com/en_/ir/EarningsRelease/2025/1Q25_NHN_Earnings%20Release_ENG.pdf) | PDF p.4·p.5 렌더링 | 설명/도표 분할, 핵심 수치 강조 |
| [Slidev cover.vue](https://github.com/slidevjs/themes/blob/main/packages/theme-seriph/layouts/cover.vue) | 코드 열람 | 레이아웃과 콘텐츠 슬롯 분리 |
| [Marp default.scss](https://github.com/marp-team/marp-core/blob/main/themes/default.scss) | 코드 1~130행 | 캔버스·제목·출처를 테마에서 고정 |

공개 코드와 기업 자료의 자산을 복사하지 않고 구조 원칙을 차용했습니다. 원문 라이선스나 상표에 관한 권리를 주장하지 않습니다.

## 레이아웃 계약

공통 필수: `layout`, `title`, `source`. 선택: `kicker`, `subtitle`, `takeaway`. 색·좌표는 코드에서 고정합니다.

| layout | 슬롯 |
|---|---|
| cover | subtitle, end |
| section | number, subtitle |
| agenda | items: [제목, 설명][] |
| pillars | items: [제목, 설명][] / 정확히 3개 |
| comparison | headers, rows / 3열 비교 |
| process | items: [단계, 설명, 산출물][] / 정확히 4개 |
| timeline | tracks: {label, start, end, text}[] / 1~8개월 |
| hierarchy | items: [계층, 설명][], notes: [제목, 설명][] |
| trace | headers, rows |
| closing | items: string[] |

검토판은 대표 장표 10장입니다. 원본 47장의 내용 전체를 옮긴 제출본이 아닙니다. 원본의 1위·최다·유일·무결점 주장은 증빙 검토 없이 재사용하지 않았습니다. 일정 월 경계와 추적표의 해석은 각 페이지에 표시했습니다.

## 검증과 남은 범위

구조 검사는 출처의 진실성을 증명하지 않습니다. 현재 범위는 기본 슬롯, 일정 범위, 레이아웃, 영역 이탈, 본문과 하단 결론의 충돌입니다. 임의의 모든 요소 간 겹침, RFP 사실 검증, 자동 블라인드 처리, 사진 위 대비, 자동 승인, 47장 전체 변환은 구현하지 않았습니다.

최종 검토는 출력된 PDF를 다시 PNG로 렌더하여 수행합니다. 기업 로고는 공식 자산 미확인 상태에서 새로 그리지 않았습니다. JDC 제출본의 로고·실명 허용 여부는 해당 RFP로 확인해야 합니다.
