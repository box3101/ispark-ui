import type {LayoutEntry} from './layout-library-model'
export const detailedLayouts:LayoutEntry[] = ['cover','section','cards','comparison','migration','roadmap','portal'].map(kind=>({
 id:`detailed-${kind}`,name:({cover:'브랜드 표지',section:'코스 구분',cards:'다항목 설명 카드',comparison:'상세 현재·목표 비교',migration:'이관 실행·검증',roadmap:'병행 트랙 일정',portal:'상세 포털 구성도'} as Record<string,string>)[kind],
 group:'수행 방법',relation:kind,purpose:'원문 정보량을 유지하는 상세 제안발표 레이아웃',capacity:'1040×720 고정 캔버스',required:['제목','구조화된 내용'],optional:['입체 아이콘','핵심 문구'],rules:['내용을 생략하지 않고 정보 위계를 구분합니다.','출력 후 글자 잘림과 연결 관계를 확인합니다.'],renderer:'detailed',height:720,
 props:{data:{kind,section:'상세 레이아웃',title:'구조화된 내용을 연결합니다',items:kind==='cards'?[{title:'정보의 연결',body:'입력 데이터에 따라 내용을 표시합니다.',icon:'data-migration'},{title:'업무의 연결',body:'공통 규칙으로 업무를 표현합니다.',icon:'workflow-design'},{title:'성과의 연결',body:'결과를 같은 기준으로 확인합니다.',icon:'performance-target'}]:[]}}
}))
const sampleItems=[{title:'정보의 연결',body:'부서별 정보를 같은 기준으로 정리합니다.',icon:'data-migration'},{title:'업무의 연결',body:'기준을 업무 절차와 화면에 반영합니다.',icon:'workflow-design'},{title:'성과의 확인',body:'검증 기준에 따라 결과를 확인합니다.',icon:'quality'}]
for(const entry of detailedLayouts){
 const d=entry.props.data as Record<string,any>
 if(!['cover','section'].includes(d.kind))d.course={label:'1코스',heading:'구성 예시',active:1}
 entry.rules.push('코스 배지와 현재 위치를 함께 표시합니다. 경로의 현재 코스만 강조합니다.','문장당 핵심 강조는 1곳, 배경 강조는 장표당 2~3곳을 기본으로 합니다.','강조는 marker(옅은 배경), bold(굵기), inverse(어두운 배경용 밑줄)로 구분합니다.','하단 메시지 전체를 굵게 하지 않고 takeawayHighlight로 지정한 구절만 강조합니다.')
 entry.rules.push('세로 카드: 아이콘·주제는 중앙, 본문은 왼쪽 정렬. 제목은 공통 2줄 영역을 사용합니다.','가로 항목: 왼쪽 아이콘과 오른쪽 텍스트를 묶습니다.','강조는 단계별 핵심 행동 1곳에만 적용하며 원문은 유지합니다.','구성도는 상위 역할에 SVG 아이콘을 쓰고 세부 기능명은 생략하지 않습니다.')
 if(d.kind==='comparison')d.items=sampleItems.map(x=>({...x,eyebrow:'같은 기준으로 연결',label:'통합된 업무 기준',detail:'결과 확인',body:'부서별로 분리된 업무 정보'}))
 if(d.kind==='migration'){d.items=[{title:'단계별 실행·검증'}];d.panels=[{title:'선제 진단',body:'현행 구조와 운영 조건을 확인합니다.',detail:'분석 기준 확정',icon:'understanding'},{title:'대상과 기준',items:['업무 데이터','이력과 증빙','권한과 연계']}];d.steps=Array.from({length:5},(_,i)=>({title:['분석','정제','모의 실행','전환','검증'][i],body:'단계별 활동 후 검증 결과를 확인합니다.',highlight:'검증 결과',icon:'quality'}));d.assurances=sampleItems}
 if(d.kind==='roadmap'){d.months=Array.from({length:8},(_,i)=>`M${i+1}`);d.tracks=[{title:'기준 수립',body:'정책과 업무 기준',icon:'strategy'},{title:'분석·설계',body:'현행 분석과 설계',icon:'understanding'}];d.stages=sampleItems;d.items=[{title:'통합 착수'},...sampleItems]}
 if(d.kind==='portal'){d.title='';d.users=[{title:'사용자',items:['업무 담당자','승인자']},{title:'관리자',items:['업무 관리자','시스템 관리자']}];d.access=['업무포털','통합인증','계정권한'];d.systems=['업무 시스템','성과 시스템'].map(title=>({title,groups:Array.from({length:5},(_,i)=>({title:`업무 영역 ${i+1}`,items:['기준 관리','실적 관리','결과 확인','이력 조회']}))}));d.exchange='데이터 연계';d.common={title:'공통 시스템 관리',items:['메뉴','권한','공통코드','조직','운영']};d.integrations=[{title:'기존 시스템',groups:[{title:'업무 연계',body:'업무 데이터'},{title:'전자결재',body:'결재 정보'}]},{title:'공통 도구',groups:[{title:'리포팅',body:'보고서 생성'},{title:'문서 편집',body:'문서 작성'}]}]}
}
detailedLayouts.push({...detailedLayouts.find(x=>x.id==='detailed-cards')!,id:'detailed-course',name:'코스형 전략 카드',relation:'병렬 전략',props:{data:{kind:'cards',variant:'course',section:'추진 방향',title:'네 가지 방향을 하나의 여정으로',items:[...sampleItems,{title:'운영의 지속',body:'운영 기준으로 업무를 지원합니다.',icon:'maintenance'}].map((x,i)=>({...x,eyebrow:`${i+1}코스`,label:'일관된 기준으로 연결'}))}},rules:['코스 연결선은 여정의 은유이며 일정이나 선후 의존성을 뜻하지 않습니다.','아이콘·전략명·슬로건은 중앙 정렬, 설명은 왼쪽 정렬합니다.','기간이 있는 병행 일정은 별도의 병행 트랙 레이아웃을 사용합니다.']})

const explanation=detailedLayouts.find(entry=>entry.id==='detailed-cards')!
Object.assign(explanation.props.data as object,{variant:'split',featureMessage:'정보에서 업무로,\n업무에서 성과로',featureCaption:'연결의 세 가지 기준',subtitle:'정보·업무·성과를 하나의 흐름으로 연결합니다'})
