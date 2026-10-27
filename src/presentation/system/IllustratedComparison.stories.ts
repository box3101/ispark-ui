import type {Meta,StoryObj} from '@storybook/vue3'
import IllustratedComparisonSlide from './IllustratedComparisonSlide.vue'
const meta={title:'Presentation/Illustrated Comparison',component:IllustratedComparisonSlide,tags:['autodocs'],parameters:{layout:'fullscreen',docs:{description:{component:'3행 현재→결과 비교. 글자·표·화살표는 코드이며 입체 아이콘은 저장된 자산입니다. 다른 RFP는 rows, 제목, 배경, theme을 바꿔 재사용합니다. 기본 색은 기존 JDC 토큰입니다.'}}},
 args:{width:1040,section:'시점 / 재구축 목표',title:'다시 이어야 할',emphasis:'세 개의 길',subtitle:'데이터 · 제도 · 성과의 단절을 하나의 흐름으로 연결',takeawayLabel:'재구축 목표',takeaway:'이력은 자산으로, 제도는 업무로, 성과는 하나로',source:'원본 p.4 재구성 / 현황·범위는 RFP 대조 필요',page:4,
 rows:[
 {label:'데이터',current:'노후 시스템에\n축적된 인사·평가 이력',result:'이력의 자산화',detail:'단절 없는 데이터 이관',artwork:'data'},
 {label:'제도',current:'보고서에 담긴\n직무기반 제도 설계',result:'제도의 업무 구현',detail:'화면·프로세스에 반영',artwork:'system'},
 {label:'성과',current:'전략·조직·개인의\n분절된 성과관리',result:'목표부터 개인까지',detail:'연결된 성과체계',artwork:'performance'},
 ]},argTypes:{rows:{control:'object'},headers:{control:'object'},theme:{control:'object'},background:{control:'text'}},
} satisfies Meta<typeof IllustratedComparisonSlide>
export default meta
type Story=StoryObj<typeof meta>
export const Jdc:Story={name:'JDC · 재구축 목표'}
export const OtherRfp:Story={name:'다른 RFP · 재사용 예시',args:{background:'',section:'추진 방향 / 업무 개선',title:'흩어진 업무를',emphasis:'하나의 흐름으로',subtitle:'정보 · 절차 · 지표를 연결하는 업무 개선 방향',headers:['개선 대상','현재의 과제','목표 상태'],takeawayLabel:'추진 방향',takeaway:'같은 정보와 기준으로 업무를 연결합니다',source:'재사용 예시 / 실제 RFP 근거 아님',rows:[
 {label:'정보',current:'부서별로 분산된\n업무 자료와 이력',result:'정보의 통합 관리',detail:'같은 기준으로 조회',artwork:'data'},
 {label:'업무',current:'담당자별로 다른\n처리 절차와 방식',result:'표준 절차의 적용',detail:'업무 단계별 기준 정립',artwork:'system'},
 {label:'지표',current:'수작업으로 집계하는\n주요 업무 지표',result:'성과 현황의 공유',detail:'지표 기반 개선점 확인',artwork:'performance'},
 ]}}
