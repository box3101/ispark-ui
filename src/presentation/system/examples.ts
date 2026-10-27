import type { ComparisonRow, TraceRow, ProcessItem, StrategyItem } from './components'
export const comparisonExample: ComparisonRow[]=[
 {label:'데이터',current:'여러 시스템에\n흩어진 업무 이력',result:'업무 이력의 통합',detail:'연결된 기준으로 조회',icon:'data-migration'},
 {label:'업무',current:'문서와 실제 업무의\n분리된 관리',result:'절차의 시스템화',detail:'화면과 승인 흐름에 반영',icon:'workflow'},
 {label:'성과',current:'목표와 실적의\n개별 관리',result:'목표·실적 연결',detail:'같은 기준으로 추적',icon:'performance'},
]
export const traceExample: TraceRow[]=[
 {label:'업무 기준',design:'화면·절차에\n기준 반영',verify:'원문과\n반영 결과 대조'},
 {label:'데이터 기준',design:'항목·코드에\n정의 반영',verify:'정의와\n데이터 일치 확인'},
 {label:'승인 기준',design:'승인 단계와\n역할 설정',verify:'시나리오별\n처리 결과 확인'},
]
export const processExample: ProcessItem[]=[
 {title:'원문 확인',body:'기준과 범위를\n원문에서 확인',icon:'deliverable'},
 {title:'요구사항 연결',body:'반영할 항목과\n설계 위치 연결',icon:'mapping'},
 {title:'설계 반영',body:'화면·데이터·\n절차에 반영',icon:'workflow'},
 {title:'검증 확인',body:'시나리오로\n반영 여부 확인',icon:'quality'},
]
export const strategyExample: StrategyItem[]=[
 {title:'기술 기반',body:'업무를 지원하는\n안정적인 기반을\n구성합니다.',result:'안정적인 업무 환경',icon:'platform'},
 {title:'업무 기준',body:'규정과 절차를\n현장의 업무에\n반영합니다.',result:'일관된 업무 처리',icon:'workflow'},
 {title:'성과 확인',body:'목표와 실적을\n같은 기준으로\n확인합니다.',result:'추적 가능한 성과',icon:'performance'},
]
