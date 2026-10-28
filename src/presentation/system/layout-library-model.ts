import {chapterLayouts} from './chapter-layout-library'
import {sectionCoverLayouts} from './section-cover-layouts'
import {detailedLayouts} from './detailed-layout-library'
import type {IllustrationId} from './illustration-assets'
import {processLayoutRules} from './process-layout-rules'

export type DiagramKind = 'process'|'architecture'|'timeline'|'cover'|'section'|'closing'|'metrics'|'trace'|'organization'|'risk'|'evidence'|'table'|'screen'
export interface DiagramItem { title:string; body:string; detail?:string; icon?:IllustrationId; value?:string; highlight?:string; stageLabel?:string; category?:string; question?:string; accent?:string; outcome?:string; footerLabel?:string }
export interface DiagramData {
  processVariant?:'cards'|'rows';
  continuesProcess?:boolean;
  optionSubtitles?:string[]; optionVisuals?:('sequence'|'single'|'none')[];
  primaryMetricIndex?:number;
  highlightLast?:boolean; outputLabel?:string; criteriaLabel?:string;
  traceVariant?:'flow'|'cards'; emphasisColor?:string; takeawayHighlight?:string;
  kind:DiagramKind; title:string; section:string; subtitle:string; takeaway:string;
  items:DiagramItem[]; headers?:string[]; number?:string;
  layers?:{label:string; nodes:{id:string;label:string;icon:IllustrationId}[]}[];
  connections?:{from:string;to:string;label:string}[];
  months?:string[]; tracks?:{label:string;start:number;end:number;milestone:string;icon?:IllustrationId}[];
  screen?:{src:string;alt:string};
}
export type LibraryGroup='공통 프레임'|'시작·전환'|'핵심 설명'|'수행 방법'|'수행 관리'|'근거 제시'
export interface LayoutEntry {
  id:string; name:string; group:LibraryGroup; relation:string; purpose:string;
  capacity:string; required:string[]; optional:string[]; rules:string[];
  renderer:'agenda'|'strategy'|'comparison'|'diagram'|'detailed'|'chapter'|'section-cover'; height:number;
  props:Record<string,unknown>;
}
export const sampleSource='디자인 검토용 가상 예시 · 실제 RFP 근거 아님'
const entry=(id:string,name:string,group:LibraryGroup,relation:string,purpose:string,capacity:string,required:string[],rules:string[],data:DiagramData):LayoutEntry=>({
  id,name,group,relation,purpose,capacity,required,optional:['부제','핵심 메시지','배경 이미지'],rules,renderer:'diagram',height:720,props:{data},
})
const common={section:'제안발표 / 디자인 예시',subtitle:'내용과 그래픽을 분리한 재사용 레이아웃',takeaway:'',items:[]}
export const layoutLibrary:LayoutEntry[]=[
 {id:'parallel-message-cards',name:'병렬 메시지 카드 · 하단 강조형',group:'핵심 설명',relation:'병렬',purpose:'전략·기능·추진 방향·기대 효과처럼 동등한 세 항목의 핵심 내용을 설명합니다.',capacity:'3개 항목 · 핵심 문구 2줄',required:['항목명(title)','핵심 문구(detail)','설명(body)'],optional:['분류(category)','하단 문구(outcome)','하단 라벨(footerLabel 또는 criteriaLabel)','아이콘(icon)','강조색(accent)'],rules:['하단 문구는 효과·산출물·적용 기준 등 용도에 맞게 작성합니다.','하단 문구가 없으면 해당 영역을 표시하지 않습니다.','순서·일정·수치 비교는 전용 레이아웃을 사용합니다.'],renderer:'diagram',height:720,props:{data:{kind:'evidence',section:'추진 방향 / 핵심 메시지',title:'세 가지 방향을 하나의 실행으로',subtitle:'정보·업무·성과를 같은 기준으로 연결합니다.',takeaway:'각 항목의 핵심 내용과 기대 효과를 함께 전달합니다.',takeawayHighlight:'핵심 내용과 기대 효과',criteriaLabel:'기대 효과',items:[{title:'정보의 통합',category:'데이터',detail:'흩어진 정보를\n하나의 기준으로',body:'자료와 이력을 정리해\n같은 기준으로 조회합니다.',outcome:'일관된 정보 활용',icon:'data-migration'},{title:'업무의 연결',category:'프로세스',detail:'복잡한 업무를\n자연스러운 흐름으로',body:'단계별 역할과 절차를 연결해\n업무 처리를 지원합니다.',outcome:'명확한 업무 흐름',icon:'workflow-design'},{title:'성과의 확인',category:'성과',detail:'실행의 결과를\n다음 개선으로',body:'목표와 결과를 함께 살펴\n개선 방향을 확인합니다.',outcome:'근거에 따른 개선',icon:'performance-target'}]}}},
 {id:'strategy-sources',name:'자료·근거 카드 · 역할 강조',group:'근거 제시',relation:'병렬',purpose:'동등한 자료의 역할과 전략에 연결할 기준을 비교합니다.',capacity:'3개 자료 · 핵심 문구 2줄',required:['자료명(title)','핵심 역할(detail)','설명(body)'],optional:['관점(category)','연결 기준(question)','카드 색상(accent)','아이콘(icon)','요약 강조(takeawayHighlight)'],rules:['자료 간 순서가 없으므로 화살표를 사용하지 않습니다.','핵심 문구는 두 줄 이내로 작성합니다.','세 자료는 동등한 비중으로 표시합니다.'],renderer:'diagram',height:720,props:{data:{kind:'evidence',title:'전략 수립에 사용하는 세 가지 자료',section:'02 / 전략 수립',subtitle:'선택한 중점과 채택한 과제를 중심으로 관련 자료를 묶습니다.',takeaway:'제공 자료의 주장과 입증된 수행 역량을 구분합니다.',takeawayHighlight:'주장과 입증된 수행 역량',items:[{title:'고객 과제',category:'고객 관점',detail:'해결해야 할\n문제',body:'채택·조건부 채택한\n니즈와 리스크',question:'무엇을 해결할 것인가',icon:'understanding'},{title:'사업 기준',category:'사업 관점',detail:'지켜야 할\n범위',body:'관련 요구사항·평가기준\n작성지침과 원문 근거',question:'어떤 기준을 충족할 것인가',icon:'deliverable'},{title:'자사와 경쟁사',category:'경쟁 관점',detail:'차별화의\n근거',body:'등록 자료의 관련 구절\n강점·약점과 확인 조건',question:'무엇으로 차별화할 것인가',icon:'strategy'}]}}},
 {id:'focus-process',name:'단계형 프로세스 · 최종 판단 강조',group:'수행 방법',relation:'순서',purpose:'자료 준비부터 검증과 최종 판단까지의 흐름을 보여줍니다.',capacity:'3–4단계',required:['단계명','본문','산출물'],optional:['단계 라벨(stageLabel)','마지막 단계 강조(highlightLast)','요약 강조 구절(takeawayHighlight)'],rules:['단계 라벨은 짧게 작성합니다.','마지막 단계 강조가 필요 없으면 highlightLast를 false로 지정합니다.','병렬 자료 비교에는 화살표가 없는 카드 레이아웃을 사용합니다.'],renderer:'diagram',height:720,props:{data:{kind:'process',section:'01 / 중점 찾기',title:'중점 찾기: 고객의 변화를 먼저 찾습니다',subtitle:'RFP 전체를 주자료로 읽고, 기존 분석 결과를 참고합니다.',highlightLast:true,takeaway:'중점 찾기에는 자사 강점·약점과 창작 규칙을 넣지 않습니다.',takeawayHighlight:'자사 강점·약점과 창작 규칙',items:[{title:'자료 준비',stageLabel:'INPUT',body:'RFP 전체 본문과\n기존 분석 결과',detail:'페이지·근거 ID',icon:'deliverable'},{title:'AI 분석',stageLabel:'ANALYSIS',body:'사업 범위와\n핵심 변화 도출',detail:'중점 후보 2~3개',icon:'understanding'},{title:'코드 검증',stageLabel:'VALIDATION',body:'형식·근거·인용문과\n범위 설명 확인',detail:'검증된 후보',icon:'quality'},{title:'담당자 선택',stageLabel:'DECISION',body:'선정 이유와 원문을\n대조해 중점 선택',detail:'다음 단계의 기준',icon:'verified'}]}}},
 ...sectionCoverLayouts,
 {id:'course-agenda',name:'풍경 분할 목차',group:'시작·전환',relation:'목록',purpose:'발표의 전체 흐름과 장 구성을 안내합니다.',capacity:'3–8개 장',required:['장 제목','장별 이름·설명'],optional:['장 번호','항목 수 표시','배경'],rules:['장 수는 입력 데이터에서 계산합니다.','장명은 두 줄 이내로 작성합니다.','홀수인 마지막 항목은 전체 폭을 사용합니다.'],renderer:'agenda',height:720,props:{title:'오늘 함께 걸을\n일곱 구간의 길',sectionLabel:'코스 안내',background:'/presentation/jeju-horizon-v1.png',source:sampleSource,page:1,items:[{section:'시점',title:'사업의 이해',description:'현황과 추진 방향'},{section:'1코스',title:'재구축 전략·방법론',description:'수행 전략과 단계별 접근'},{section:'2코스',title:'컨설팅·제도 반영',description:'제도의 취지를 시스템으로'},{section:'3코스',title:'성과관리 구현',description:'목표와 실적의 연결'},{section:'4코스',title:'인사포털 구현',description:'업무 기준에 맞춘 설계'},{section:'5코스',title:'조직·일정·품질·운영',description:'수행 계획과 운영 지원'},{section:'종점',title:'요약과 추가 제안',description:'핵심 제안의 정리'}]}},
 {id:'strategy-cards',name:'입체 전략 카드',group:'핵심 설명',relation:'병렬',purpose:'동등한 중요도의 세 가지 전략을 설명합니다.',capacity:'3개 카드',required:['제목','카드별 주제·본문·결과'],optional:['입체 아이콘','하단 메시지'],rules:['동등한 전략 사이에는 진행 화살표를 사용하지 않습니다.','본문은 카드당 두 줄을 권장합니다.','4개 이상이면 별도 장표로 나눕니다.'],renderer:'strategy',height:1040*1042/1510,props:{width:1040,section:'추진 방향 / 핵심 전략',titleBefore:'세 가지',titleEmphasis:'추진 방향',titleAfter:'',subtitle:'데이터 · 업무 · 성과를 같은 기준으로 연결',takeaway:'정보와 업무를 연결해 실행 결과를 확인합니다',takeawayLabel:'추진 방향',source:sampleSource,page:2,showConnectors:false,items:[{category:'데이터 기반',headline:'신뢰할 수 있는 정보',body:'분산된 정보를 모아\n같은 기준으로 관리',outcome:'판단을 돕는 정보',artwork:'server',outcomeIcon:'data-migration'},{category:'업무의 연결',headline:'일관된 업무 흐름',body:'부서 간 절차를 연결해\n협업의 기반 마련',outcome:'함께 일하는 방식',artwork:'system',outcomeIcon:'workflow'},{category:'성과의 확인',headline:'실행 결과의 가시화',body:'목표와 결과를 비교해\n개선 방향을 확인',outcome:'다음 실행의 근거',artwork:'analytics',outcomeIcon:'performance'}]}},
 {id:'current-target',name:'현재 → 목표 비교',group:'핵심 설명',relation:'대비',purpose:'같은 대상의 현재 상태와 목표를 나란히 비교합니다.',capacity:'3개 비교 행',required:['대상','현재','목표','목표 설명'],optional:['열 이름','아이콘','색상 테마'],rules:['한 행에는 같은 대상의 현재와 목표를 넣습니다.','현재와 목표의 비교 기준을 일치시킵니다.','3행을 넘으면 분할합니다.'],renderer:'comparison',height:1040*1024/1536,props:{width:1040,section:'추진 방향 / 업무 개선',title:'현재의 과제와',emphasis:'목표 상태',subtitle:'정보 · 업무 · 성과를 같은 기준으로 비교',headers:['개선 대상','현재','목표'],source:sampleSource,page:3,takeawayLabel:'목표 상태',takeaway:'같은 정보와 기준으로 업무를 연결합니다',rows:[{label:'정보',current:'부서별로 분산된\n업무 자료와 이력',result:'정보의 통합 관리',detail:'같은 기준으로 조회',artwork:'data'},{label:'업무',current:'담당자마다 다른\n처리 절차와 방식',result:'표준 절차의 적용',detail:'업무 단계별 기준 정립',artwork:'system'},{label:'성과',current:'수작업으로 집계하는\n주요 업무 지표',result:'성과 현황의 공유',detail:'지표 기반 개선점 확인',artwork:'performance'}]}},
 entry('delivery-process','단계형 프로세스','수행 방법','순서','활동과 산출물을 단계별로 연결합니다.','3–4단계',['단계명','활동','산출물'],['화살표는 실행 순서를 뜻합니다.','단계별 산출물은 한 줄로 작성합니다.'],{...common,kind:'process',title:'설계부터 검증까지',subtitle:'단계별 활동과 산출물을 연결한 수행 절차',takeaway:'각 단계의 결과를 다음 단계의 입력으로 연결합니다',items:[{title:'분석',body:'현황과 요구사항\n확인',detail:'요구사항 목록',icon:'understanding'},{title:'설계',body:'화면·데이터·절차\n상세 설계',detail:'상세 설계서',icon:'workflow-design'},{title:'구현',body:'기능 구현과\n단위 시험',detail:'구현 결과',icon:'integration'},{title:'검증',body:'요구사항별\n충족 여부 확인',detail:'검증 결과서',icon:'quality'}]}),
 entry('system-architecture','시스템 구성도','수행 방법','구조','계층별 구성요소와 명시적인 연결 관계를 보여줍니다.','3계층 · 계층당 2–4노드',['계층','노드 ID·이름','연결 출발·도착'],['연결선은 입력한 관계만 표시합니다.','연결 라벨은 10자 이내로 작성합니다.','복잡한 연결은 상세 구성도로 분리합니다.'],{...common,kind:'architecture',title:'연결된 시스템 구조',subtitle:'채널 · 서비스 · 데이터의 구성과 연결',layers:[{label:'채널',nodes:[{id:'portal',label:'업무 포털',icon:'legacy-server'},{id:'mobile',label:'모바일 업무',icon:'people'},{id:'admin',label:'관리자',icon:'staffing'}]},{label:'서비스',nodes:[{id:'hr',label:'인사 서비스',icon:'organization'},{id:'performance',label:'성과 서비스',icon:'performance-target'},{id:'link',label:'연계 서비스',icon:'integration'}]},{label:'data',nodes:[{id:'db',label:'업무 데이터',icon:'data-migration'},{id:'history',label:'이력·증빙',icon:'deliverable'},{id:'external',label:'연계 데이터',icon:'converted-data'}]}],connections:[{from:'portal',to:'hr',label:'업무 요청'},{from:'mobile',to:'performance',label:'실적 조회'},{from:'admin',to:'link',label:'연계 관리'},{from:'hr',to:'db',label:'저장·조회'},{from:'performance',to:'history',label:'증빙 조회'},{from:'link',to:'external',label:'데이터 교환'}]}),
 entry('delivery-schedule','수행 일정 · 간트','수행 관리','시간','작업 기간과 완료 지점을 시간축으로 표시합니다.','4–8개월 · 1–5개 작업',['월 목록','작업명','시작·종료 월'],['시작·종료는 1부터 세는 월 번호입니다.','막대 너비는 기간에 비례합니다.','예시 일정은 실제 수행 기간이 아닙니다.'],{...common,kind:'timeline',title:'단계별 수행 일정',subtitle:'작업의 기간과 완료 지점을 함께 확인',months:['1개월','2개월','3개월','4개월','5개월','6개월'],tracks:[{label:'분석',start:1,end:2,milestone:'분석 완료'},{label:'설계',start:2,end:3,milestone:'설계 완료'},{label:'구현',start:3,end:5,milestone:'개발 완료'},{label:'검증',start:5,end:6,milestone:'검증 완료'}],takeaway:'단계별 완료 기준과 전체 일정을 함께 관리합니다'}),
 entry('scenic-cover','풍경 표지','시작·전환','표지','사업명과 제안의 핵심 방향을 전달합니다.','제목 2줄',['사업명','제안 제목'],['제목은 최대 두 줄을 권장합니다.','제출용 로고·문서 구분은 사업 규정에 맞춰 추가합니다.'],{...common,kind:'cover',title:'사람과 성과를\n하나의 흐름으로',section:'JDC · 제안발표 디자인 예시',subtitle:'인사포털 및 성과관리 시스템 재구축',takeaway:'데이터 · 제도 · 성과의 연결'}),
 entry('chapter-divider','장 구분','시작·전환','전환','새로운 장의 주제와 범위를 안내합니다.','주제 1개',['장 번호','장명','설명'],['긴 설명은 다음 본문 장표로 이동합니다.'],{...common,kind:'section',number:'01',title:'재구축 전략과 방법론',section:'첫 번째 코스',subtitle:'수행 단계와 주요 산출물을 연결합니다'}),
 entry('closing-promises','핵심 제안 요약','시작·전환','요약','앞에서 설명한 핵심 방향을 정리합니다.','3개 메시지',['메시지','설명'],['새로운 실적이나 검증하지 않은 약속을 추가하지 않습니다.'],{...common,kind:'closing',title:'제안의 핵심을 다시 확인합니다',items:[{title:'데이터의 연결',body:'업무 이력을 같은 기준으로 관리',icon:'data-migration'},{title:'제도의 구현',body:'기준을 화면과 절차에 반영',icon:'workflow-design'},{title:'성과의 확인',body:'목표와 실행 결과를 연결',icon:'performance-target'}]}),
 entry('key-metrics','핵심 수치','핵심 설명','지표','핵심 달성률과 보조 수치 2개를 함께 제시합니다.','핵심 1개 · 보조 2개',['값·단위','지표명','산정 근거'],['숫자는 근거 확인 후 사용합니다.','예시의 숫자를 실제 제안 수치로 사용하지 않습니다.','primaryMetricIndex로 핵심 지표를 선택합니다(기본 2). 0~100% 값에만 달성률 링을 표시합니다.'],{...common,kind:'metrics',primaryMetricIndex:2,title:'수치로 확인하는 수행 현황',subtitle:'가상 데이터로 보는 지표 배치 예시',takeaway:'검토 대상과 반영 결과를 같은 기준으로 확인합니다',items:[{title:'검토 요구사항',value:'120건',body:'검토 목록 기준 · 예시',icon:'deliverable'},{title:'반영 완료',value:'96건',body:'설계 반영 기준 · 예시',icon:'verified'},{title:'검증 완료',value:'80%',body:'96 ÷ 120 · 예시'}]}),
 entry('requirement-trace','요구사항 추적표','수행 방법','추적','원문·설계·검증을 같은 행에서 추적합니다.','3개 행',['원문 항목','설계 반영','검증 방법'],['각 행에 실제 근거 식별자를 함께 기록합니다.','설계와 검증이 동일한 요구사항을 다뤄야 합니다.'],{...common,kind:'trace',title:'원문에서 설계와 검증까지',headers:['요구사항','설계 반영','검증 방법'],items:[{title:'업무 기준',body:'화면·처리 절차에 반영',detail:'원문과 결과 대조'},{title:'데이터 기준',body:'항목·코드 정의에 반영',detail:'정의와 데이터 비교'},{title:'승인 기준',body:'승인 단계·역할 설정',detail:'시나리오별 처리 확인'}],takeaway:'반영 위치와 검증 결과를 같은 기록으로 관리합니다'}),
 entry('delivery-team','수행조직','수행 관리','위계','책임자와 수행팀의 역할을 설명합니다.','책임자 1명 · 팀 3개',['책임자','팀명','역할'],['선은 보고 관계를 뜻합니다.','인력 실명은 해당 제출 규정에 따라 표시합니다.'],{...common,kind:'organization',title:'역할과 책임이 명확한 수행조직',subtitle:'프로젝트 책임자를 중심으로 분야별 역할을 배분',items:[{title:'프로젝트 책임자',body:'통합 관리 · 의사결정',icon:'staffing'},{title:'업무·설계팀',body:'요구사항 분석\n업무·화면 설계',icon:'workflow-design'},{title:'개발·연계팀',body:'기능 구현\n데이터·시스템 연계',icon:'integration'},{title:'품질·검증팀',body:'시험 계획\n결함·품질 관리',icon:'quality'}]}),
 entry('risk-response','위험과 대응','수행 관리','대응','위험별 영향과 대응 방안을 연결합니다.','3개 위험',['위험','영향','대응'],['위험과 대응을 일대일로 연결합니다.','추정 영향은 확정 사실과 구분합니다.'],{...common,kind:'risk',title:'주요 위험과 대응 방향',headers:['위험 요인','예상 영향','대응 방향'],items:[{title:'원천 데이터 누락',body:'이관 결과 불일치',detail:'사전 진단·대사 검증'},{title:'요구사항 변경',body:'범위·일정 변동',detail:'변경 영향 검토·승인'},{title:'연계 지연',body:'통합 시험 지연',detail:'연계 일정 사전 협의'}]}),
 entry('project-evidence','실적 · 근거 카드','근거 제시','근거','프로젝트 경험과 적용 가능한 근거를 정리합니다.','3개 사례',['사업명','수행 범위','근거'],['실제 수행 실적만 입력합니다.','발주처 공개 범위와 블라인드 규정을 확인합니다.'],{...common,kind:'evidence',title:'경험과 근거를 함께 제시합니다',subtitle:'아래 사례는 레이아웃 검토를 위한 가상 예시',items:[{title:'업무 포털 구축',body:'화면·승인 절차 설계',detail:'근거: 실적 증빙 ID',icon:'legacy-server'},{title:'데이터 통합',body:'기준 정비·이관 검증',detail:'근거: 실적 증빙 ID',icon:'data-migration'},{title:'성과관리 구축',body:'목표·실적 관리 구현',detail:'근거: 실적 증빙 ID',icon:'performance-target'}]}),
 entry('option-table','대안 비교표','근거 제시','비교','동일한 평가 기준으로 대안을 비교합니다.','3개 기준 · 2개 대안',['비교 기준','대안 A','대안 B'],['같은 단위·범위로 비교합니다.','선정 이유는 근거와 함께 설명합니다.'],{...common,kind:'table',title:'같은 기준으로 비교하는 대안',headers:['비교 기준','대안 A','대안 B'],items:[{title:'전환 방식',body:'단계별 전환',detail:'일괄 전환'},{title:'운영 방식',body:'기존·신규 병행',detail:'전환 시점 일원화'},{title:'확인 사항',body:'단계 간 연계 관리',detail:'전환 시점 집중 검증'}]}),
 entry('screen-explanation','화면 · 기능 설명','근거 제시','주석','화면 이미지와 주요 기능 설명을 함께 배치합니다.','화면 1개 · 설명 3개',['화면 이미지·대체 텍스트','기능 설명'],['현재 예시는 화면을 넣을 자리만 표시합니다.','실제 화면 이미지를 입력하면 원본 비율을 유지합니다.'],{...common,kind:'screen',title:'화면과 기능을 함께 설명합니다',items:[{title:'조회 조건',body:'사용자 기준에 맞춰 조회'},{title:'처리 현황',body:'업무의 진행 상태 확인'},{title:'상세 정보',body:'관련 이력과 증빙 확인'}]}),
]
layoutLibrary.forEach((entry,index)=>{entry.props.page=index+1})
export const libraryGroups:LibraryGroup[]=['공통 프레임','시작·전환','핵심 설명','수행 방법','수행 관리','근거 제시']

export function validateDiagram(data:DiagramData) {
 const count=data.items.length
 if(!data.title.trim()||data.title.length>48)throw Error('제목은 1–48자로 작성하세요.')
 const bounds:Partial<Record<DiagramKind,[number,number]>>={process:[3,4],closing:[3,3],metrics:[3,3],trace:[3,3],organization:[4,4],risk:[3,3],evidence:[3,3],table:[3,3],screen:[3,3]}
 const range=data.kind==='process'&&data.processVariant==='rows'?[3,6]:bounds[data.kind];if(range&&(count<range[0]||count>range[1]))throw Error(`${data.kind}: ${range.join('–')}개 항목이 필요합니다.`)
 for(const item of data.items){if(!item.title.trim()||item.title.length>20||item.body.length>60||(item.detail?.length??0)>35)throw Error('항목의 제목·본문·설명 길이를 줄이거나 장표를 나누세요.')}
 if(data.kind==='timeline'){
  const months=data.months?.length??0
  if(months<4||months>8||!data.tracks?.length||data.tracks.length>5)throw Error('일정은 4–8개월, 1–5개 작업을 지원합니다.')
  for(const t of data.tracks){
   if(!Number.isInteger(t.start)||!Number.isInteger(t.end)||t.start<1||t.end>months||t.start>t.end)throw Error('시작·종료 월이 유효하지 않습니다.')
   if(!t.label.trim()||t.label.length>8||t.milestone.length>5)throw Error('작업명은 8자, 완료 라벨은 5자 이내로 작성하세요.')
  }
 }
 if(data.kind==='architecture'){
  if(data.layers?.length!==3||data.layers.some(l=>l.nodes.length<2||l.nodes.length>4))throw Error('구성도는 3계층, 계층당 2–4노드를 지원합니다.')
  const ids=data.layers.flatMap(l=>l.nodes.map(n=>n.id));if(new Set(ids).size!==ids.length)throw Error('노드 ID는 중복될 수 없습니다.')
  for(const c of data.connections??[]){const a=data.layers.findIndex(l=>l.nodes.some(n=>n.id===c.from)),b=data.layers.findIndex(l=>l.nodes.some(n=>n.id===c.to));if(a<0||b!==a+1||c.label.length>10)throw Error('연결은 인접한 아래 계층으로 지정하고 라벨은 10자 이내로 작성하세요.')}
 }
}

layoutLibrary.push(...detailedLayouts)

layoutLibrary.push(...chapterLayouts)

// Two registered variants share the same requirement-to-design-to-validation schema.
const traceBase=layoutLibrary.find(e=>e.id==='requirement-trace')!
traceBase.name='요구사항 추적 · 연결 흐름형'
traceBase.optional.push('traceVariant: flow | cards','행별 highlight','고객사 강조색 emphasisColor')
traceBase.rules.push('연결 흐름형이 기본이며 화살표는 같은 요구사항의 설계·검증만 연결합니다.','강조는 고객사 테마의 글자색과 굵기로만 표시합니다.','설명이 긴 경우 요구사항별 카드형을 선택합니다.')
const traceData=traceBase.props.data as DiagramData
traceData.section='수행 방법 / 요구사항 추적'
traceData.subtitle='요구사항별 반영 위치와 검증 방법을 연결합니다.'
traceData.traceVariant='flow'
traceData.takeawayHighlight='같은 기록'
traceData.items.forEach((item,i)=>{item.highlight=['원문과 결과','정의와 데이터','시나리오별'][i];item.icon=(['deliverable','data-migration','people'] as IllustrationId[])[i]})
layoutLibrary.push({...traceBase,id:'requirement-trace-cards',name:'요구사항 추적 · 요구사항별 카드형',props:{...traceBase.props,data:{...traceData,traceVariant:'cards'}}})

const optionTable=layoutLibrary.find(entry=>entry.id==='option-table')!
;(layoutLibrary.find(entry=>entry.id==='strategy-sources')!.props.data as DiagramData).criteriaLabel='전략에 연결할 기준'
const riskLayout=layoutLibrary.find(entry=>entry.id==='risk-response')!
riskLayout.name='위험과 대응 · 연결형'
riskLayout.optional.push('열 이름(headers)','요약 강조 구절(takeawayHighlight)')
Object.assign(riskLayout.props.data as DiagramData,{
 section:'수행 관리 / 위험 대응',subtitle:'위험 요인과 예상 영향을 확인하고, 대응 기준으로 연결합니다.',
 takeaway:'위험을 사전에 확인하고, 대응 기준을 함께 관리합니다.',takeawayHighlight:'사전에 확인',
})
optionTable.name='대안 비교표 · 양쪽 패널형'
optionTable.optional.push('대안별 부제(optionSubtitles)','대안별 도식(optionVisuals)','요약 강조 구절(takeawayHighlight)')
Object.assign(optionTable.props.data as DiagramData,{
 section:'근거 제시 / 대안 비교',subtitle:'전환 방식과 운영 조건을 같은 기준에서 나란히 검토합니다.',
 optionSubtitles:['단계별 전환','일괄 전환'],optionVisuals:['sequence','single'],
 takeaway:'대안의 우열보다 사업 조건과 전환 기준을 먼저 확인합니다.',takeawayHighlight:'사업 조건과 전환 기준',
})

// Retain legacy deck IDs for export; omit duplicate cover/divider samples from browsing.
for(const layout of layoutLibrary.filter(e=>(e.props.data as DiagramData)?.kind==='process')){
 layout.rules.push(...processLayoutRules)
 layout.optional.push('processVariant: cards | rows','continuesProcess: 前 장 절차 이어짐')
}
layoutLibrary.push(entry('process-rows','단계형 프로세스 · 가로 행형','수행 방법','순서','실행 내용과 산출물을 가로로 비교하고 단계는 위에서 아래로 읽습니다.','3–6단계',['단계명','실행 내용','산출물'],processLayoutRules,{...common,kind:'process',processVariant:'rows',section:'02 / 전략 정리',title:'전략 초안을 통합하고 실행 내용을 보존합니다',subtitle:'고객 과제 → 접근 방식 → 실행 과제 → 고객 효익을 연결합니다.',highlightLast:true,takeaway:'전략 수를 맞추기 위해 서로 다른 실행을 억지로 합치지 않습니다.',takeawayHighlight:'서로 다른 실행',items:[{title:'묶음별 생성',body:'관련 자료를 분할해\n전략 초안 작성',detail:'실행·산출물·검증',icon:'strategy'},{title:'중복 통합',body:'유사 전략을 묶고\n고유 실행은 보존',detail:'통합 전략과 원본',icon:'integration'},{title:'핵심 정리',body:'고객 변화 중심으로\n상위 전략 구성',detail:'핵심 메시지·세부안',icon:'performance-target'},{title:'담당자 검토',body:'실행 가능성과\n근거·연결 확인',detail:'테마에 전달할 전략',icon:'verified'}]}))
export const galleryLayouts=layoutLibrary.filter(entry=>!['detailed-cover','detailed-section'].includes(entry.id))
