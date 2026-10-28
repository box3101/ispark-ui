import type {LayoutEntry} from './layout-library-model'

const chapters=[{id:'understanding',title:'사업 이해'},{id:'strategy',title:'추진 전략'},{id:'implementation',title:'구현 방안'},{id:'delivery',title:'수행 계획'},{id:'outcomes',title:'기대 효과'}]
const base:LayoutEntry={
 id:'section-cover',name:'장별 표지 · 그라데이션',group:'시작·전환',relation:'장 전환',
 purpose:'각 장 시작에 핵심 메시지와 전체 발표에서의 현재 위치를 보여줍니다.',
 capacity:'핵심 문구 2줄 · 설명 2줄 · 목차 3–7개',
 required:['목차 목록(chapters: id·title)','현재 장 ID(activeId)','제목(title)'],
 optional:['강조 제목(emphasis)','설명(description)','배경 이미지(background)','이미지 위치(backgroundPosition)','상단 라벨(eyebrow)','하단 문구(footer)'],
 rules:['기본 배경은 파란 그라데이션입니다. 이미지가 없거나 로딩에 실패하면 기본 배경을 사용합니다.','장 번호와 하단 현재 위치는 목차 순서와 activeId로 계산합니다.','제목과 강조 제목은 각각 한 줄, 설명은 두 줄을 권장합니다.','목차 이름은 짧게 작성하고 activeId는 목록의 ID와 일치시킵니다.','이미지는 오른쪽에 주요 피사체가 있는 구도가 좋습니다.'],
 renderer:'section-cover',height:585,
 props:{chapters,activeId:'strategy',title:'방향은 명확하게,',emphasis:'실행은 단단하게.',description:'핵심 과제를 연결하고\n실행 가능한 변화의 구조를 만듭니다',footer:'STRATEGY & EXECUTION'},
}
export const sectionCoverLayouts:LayoutEntry[]=[base,{
 ...base,id:'section-cover-image',name:'장별 표지 · 프로젝트 이미지',
 props:{...base.props,background:'/presentation/illustrated/jeju-background.png'},
}]
