# 공통 입체 아이콘 v2 · 24종 의미 대응

기존 6개 + 추가 19개 = 25개 독립 PNG입니다. 기존 SVG의 24개 의미 모두에 기본 입체 표현이 연결되어 있고, 성과 분석 표현 1개가 추가로 있습니다. 투명 알파 배경이며 제목·사명·RFP 문구를 포함하지 않습니다. `illustration-assets.ts`에서 의미 이름과 검색어를 관리합니다. 원본의 청색·은색 입체 표현을 유지하며 개별 생성했으므로 승인 시안의 픽셀을 그대로 잘라낸 결과는 아닙니다.

| 파일 ID | 용도 |
|---|---|
| legacy-server | 노후 시스템·서버·이력 |
| system-blocks | 제도·시스템 구현 |
| analytics-review | 성과 분석·검토 |
| data-migration | 데이터 이관·통합 |
| workflow-design | 업무·제도 설계 |
| performance-target | 성과·목표 달성 |
| people | 인사·직무 |
| quality | 품질 검증 |
| schedule | 수행 일정 |
| verified | 확인 완료 |
| next | 다음 단계 |
| converted-data | 전환 데이터 |
| understanding | 사업 이해 |
| strategy | 추진 전략 |
| organization | 수행 조직 |
| staffing | 투입 인력 |
| risk | 위험 관리 |
| security | 보안 |
| training | 교육 |
| deliverable | 산출물 |
| stabilization | 안정화 |
| maintenance | 하자 보수 |
| integration | 시스템 연계 |
| infrastructure | 인프라 |
| testing | 테스트 |
| project-lead | 프로젝트 책임자 |
| business-design-team | 업무·설계팀 |
| development-integration-team | 개발·연계팀 |
| quality-assurance-team | 품질·검증팀 |
| cloud-service | 클라우드 서비스 |
| api-connection | API 연계 |
| document-search | 문서 검색 |
| approval-workflow | 결재 승인 |

2026-10-28: 역할 및 범용 아이콘 8개를 추가해 총 33개입니다. 기존 의미별 기본 아이콘은 유지하고 새 아이콘은 명시적인 ID로 선택합니다. 내장 imagegen으로 개별 생성했으며 프롬프트와 원본 경로는 `roles-common-generation.json`에 기록합니다.

생성 방식: built-in `image_gen`, `transparent_background: true`. 재사용 시 생성 호출 없음. 초기 프롬프트는 `generation.json`, 추가 19종의 참조 이미지와 최종 프롬프트는 `expansion-generation.json`에 기록합니다. 기본 SVG 색상 토큰과 달리 입체 PNG 내부 명암·색은 고정입니다. 임의의 CSS 필터로 재색칠하지 않습니다. 물결/배경은 상위 폴더에서 별도로 관리합니다.
