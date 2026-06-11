import{e as r,w as B,u as R,f as Se}from"./index-CpO9RqPZ.js";import{r as c}from"./vue.esm-bundler-UBndlgVH.js";import{a as s}from"./UiTable-DPL9AmJl.js";import{U as Te}from"./UiBadge-Co7Yw1JZ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./UiSelect-0m-Wx2_9.js";import"./index-yTw_IPk6.js";const Ae={title:"Components/Display/UiTable",component:s,tags:["autodocs"],args:{onRowClick:Se()},parameters:{layout:"padded",docs:{description:{component:"\nispark-ui 표준 데이터 테이블. 컬럼 정의 + 행 데이터를 받아 정렬·고정 헤더·스크롤·행 클릭·선택 강조를 지원한다.\n\n## 언제 사용하나\n- 정형 데이터(사용자, 통계, 내역 등)의 컬럼/행 표시\n- 컬럼 단위 **로컬 정렬**(asc → desc → 해제 3단)이 필요한 경우\n- 행 클릭으로 상세 진입 또는 선택 행 강조가 필요한 경우\n\n## 제약\n- `table-layout: fixed` — 컬럼 너비는 `columns[].width`로 명시 (미지정 시 균등 분할)\n- **로컬 정렬만 지원** — 서버 정렬은 부모에서 정렬 완료 후 `data`로 주입\n- 페이지네이션 / 다중 선택 / 셀 편집 미지원 (필요 시 외부 컴포넌트와 조합)\n- 빈 상태 UI 전체를 교체하려면 컴포넌트 바깥에서 `data.length === 0` 분기 후 `UiEmpty` 사용 권장\n\n## API 한눈에 보기\n- **Props**: 아래 Args 테이블 — Data / Appearance / Behavior / Selection 그룹\n- **Slots**: `#header-{key}` (헤더 셀 커스텀, props: `{ column, isSortable, sortOrder, onSort }`), `#cell-{key}` (바디 셀 커스텀, props: `{ row, value, index }`)\n- **Events**: `row-click(row, index)` — `clickable: true`일 때만 emit (단순 view 테이블에서는 클릭 핸들러 자체가 바인딩되지 않음)\n\n## TableColumn 인터페이스\n```ts\ninterface TableColumn {\n  key: string                                        // 데이터 객체의 키\n  label: string                                      // 헤더 텍스트\n  width?: string                                     // '320px' 등 (미지정 시 균등)\n  align?: 'left' | 'center' | 'right'                // 바디 셀 정렬 (기본 'center')\n  headerAlign?: 'left' | 'center' | 'right'          // 헤더 정렬 (기본 'center')\n  sortable?: boolean                                 // 헤더 클릭 정렬 사용 여부\n  sortType?: 'auto' | 'string' | 'number' | 'date'  // 정렬 비교 타입 (기본 'auto')\n}\n```\n\n## 정렬 동작\n`sortable: true` 컬럼 헤더 클릭 시 **asc → desc → 해제** 3단 토글. 접근성을 위해 `<th aria-sort>`가 `'ascending' | 'descending' | 'none'` 으로 동기화된다.\n\n`sortType` 비교 방식:\n- `'auto'`(기본): 숫자 변환 → 날짜 변환 → 문자열(한국어 `localeCompare`) 순 폴백\n- `'number'`: 쉼표 제거 후 숫자 비교 (예: `\"44,865,368,290\"` → `44865368290`)\n- `'date'`: `Date.parse` ms\n- `'string'`: 한국어 `localeCompare`\n\n`columns`에서 정렬 중인 컬럼이 사라지면 sortState는 자동 리셋된다.\n        "}}},argTypes:{columns:{control:"object",description:"컬럼 정의 배열. `key`/`label` 필수, `width`/`align`/`headerAlign`/`sortable`/`sortType` 선택.",table:{category:"Data",type:{summary:"TableColumn[]"}}},data:{control:"object",description:"행 데이터 배열. 각 행은 `columns[].key`를 키로 갖는 객체.",table:{category:"Data",type:{summary:"Record<string, any>[]"}}},size:{control:"inline-radio",options:["md","sm"],description:"`md`(기본 42px) / `sm`(28px 컴팩트).",table:{category:"Appearance",type:{summary:"'md' | 'sm'"},defaultValue:{summary:"'md'"}}},stickyHeader:{control:"boolean",description:"`maxHeight`과 함께 사용. 스크롤 중에도 헤더가 상단에 고정된다.",table:{category:"Appearance",type:{summary:"boolean"},defaultValue:{summary:"false"}}},maxHeight:{control:"text",description:'예: `"200px"`. 초과 시 세로 스크롤 + 커스텀 스크롤바 적용.',table:{category:"Appearance",type:{summary:"string"}}},clickable:{control:"boolean",description:"행 hover 배경 + cursor pointer + `row-click` 이벤트 활성화. `false`(기본)면 click 핸들러 자체가 바인딩되지 않아 단순 view 테이블에 안전.",table:{category:"Behavior",type:{summary:"boolean"},defaultValue:{summary:"false"}}},emptyText:{control:"text",description:"`data`가 빈 배열일 때 내부 `UiEmpty`의 title로 전달되는 메시지. 빈 상태 UI 전체를 교체하려면 `#empty` slot 사용.",table:{category:"Behavior",type:{summary:"string"},defaultValue:{summary:"'데이터가 없습니다.'"}}},emptyIcon:{control:"text",description:"빈 상태 아이콘 클래스. 내부 `UiEmpty`의 icon prop으로 전달 (예: `icon-search`).",table:{category:"Behavior",type:{summary:"string"}}},emptyDescription:{control:"text",description:"빈 상태 보조 설명. 내부 `UiEmpty`의 description prop으로 전달.",table:{category:"Behavior",type:{summary:"string"}}},bordered:{control:"boolean",description:"컬럼 세로 구분선 표시 여부. `false`로 설정하면 세로선 제거 + 패딩 확대 + 호버 강화.",table:{category:"Appearance",type:{summary:"boolean"},defaultValue:{summary:"true"}}},selectedRowKey:{control:"text",description:"**Controlled** 모드 키. `selectedRowValue`와 둘 다 값이 있으면 매칭 행에 `is-selected` 강조. 둘 다 비어있고 `clickable=true`면 **uncontrolled** — 컴포넌트가 마지막 클릭 행을 자체 추적.",table:{category:"Selection",type:{summary:"string"}}},selectedRowValue:{control:"text",description:"**Controlled** 모드 값. `selectedRowKey`와 짝으로 사용. 둘 다 비어있으면 uncontrolled 모드(clickable=true 시 클릭한 행 자동 강조).",table:{category:"Selection",type:{summary:"string"}}},onRowClick:{name:"row-click",action:"row-click",description:"행 클릭 시 emit. payload: `(row: TRow, index: number)` — `TRow`는 `data` 배열의 원소 타입. `clickable: true`일 때만 발생.",table:{category:"Events",type:{summary:"(row, index) => void"}}}}},l=[{key:"name",label:"통계명",width:"320px",align:"left"},{key:"region",label:"지역",width:"150px"},{key:"total",label:"합계",align:"right"},{key:"average",label:"평균",align:"right"}],i=[{name:"케이블 플랫폼 매출",region:"대전",total:"44,865,368,290",average:"3,738,780,690.83"},{name:"케이블 플랫폼 매출",region:"서울",total:"52,341,200,100",average:"4,361,766,675.00"},{name:"SO 매출",region:"부산",total:"31,256,890,450",average:"2,604,740,870.83"},{name:"SO 매출",region:"대구",total:"28,904,112,300",average:"2,408,676,025.00"}],Ue=[...i,{name:"케이블 영업이익",region:"인천",total:"15,230,450,000",average:"1,269,204,166.67"},{name:"SO 영업이익",region:"광주",total:"12,890,330,200",average:"1,074,194,183.33"},{name:"SO 영업이익",region:"울산",total:"9,456,780,100",average:"788,065,008.33"},{name:"케이블 당기순이익",region:"세종",total:"7,234,560,000",average:"602,880,000.00"},{name:"SO 당기순이익",region:"경기",total:"65,432,100,500",average:"5,452,675,041.67"},{name:"SO 당기순이익",region:"강원",total:"4,567,890,300",average:"380,657,525.00"}],p={args:{columns:l,data:i,size:"md",stickyHeader:!1,maxHeight:"",clickable:!1,emptyText:"데이터가 없습니다.",selectedRowKey:"",selectedRowValue:""},argTypes:{emptyText:{control:"text",description:'빈 상태 메시지 (기본 "데이터가 없습니다.")'},selectedRowKey:{control:"text",description:'예: "region" — selectedRowValue와 매칭되는 행 강조'},selectedRowValue:{control:"text",description:'예: "부산" — selectedRowKey와 함께 사용'}},render:e=>({components:{UiTable:s},setup:()=>({args:e}),template:'<UiTable v-bind="args" />'})},u={args:{columns:l,data:i},render:e=>({components:{UiTable:s},setup:()=>({args:e}),template:'<UiTable v-bind="args" />'})},m={args:{columns:l,data:Ue,stickyHeader:!0,maxHeight:"200px"},render:e=>({components:{UiTable:s},setup:()=>({args:e}),template:'<UiTable v-bind="args" />'})},g={args:{columns:l,data:Ue,maxHeight:"180px"},render:e=>({components:{UiTable:s},setup:()=>({args:e}),template:'<UiTable v-bind="args" />'})},b={args:{columns:[{key:"service",label:"서비스명",width:"200px",align:"left"},{key:"region",label:"지역",width:"120px"},{key:"count",label:"건수",align:"right"},{key:"status",label:"상태",width:"120px"}],data:[{service:"케이블 인터넷",region:"서울",count:"1,234",status:"정상"},{service:"IPTV 서비스",region:"부산",count:"567",status:"점검"},{service:"유선전화",region:"대구",count:"890",status:"정상"}]},render:e=>({components:{UiTable:s,UiBadge:Te},setup:()=>{const t=c(e.data.map(a=>({...a})));return{args:e,rows:t,toggleStatus:a=>{t.value[a].status=t.value[a].status==="정상"?"점검":"정상"}}},template:`
      <UiTable v-bind="args" :data="rows">
        <template #cell-status="{ value, index }">
          <button
            type="button"
            @click="toggleStatus(index)"
            style="border: 0; background: transparent; padding: 0; cursor: pointer;"
          >
            <UiBadge :variant="value === '정상' ? 'success' : 'danger'">{{ value }}</UiBadge>
          </button>
        </template>
      </UiTable>
    `})},y={args:{columns:[{key:"name",label:"제품명",width:"240px",align:"left"},{key:"price",label:"가격",align:"right",sortable:!0,sortType:"number"},{key:"stock",label:"재고",width:"120px"}],data:[{name:"케이블 모뎀 (3.1)",price:"89,000",stock:"정상"},{name:"무선 공유기 (Wi-Fi 6)",price:"129,000",stock:"품절"},{name:"IPTV 셋톱박스",price:"45,000",stock:"정상"}]},render:e=>({components:{UiTable:s},setup:()=>({args:e}),template:`
      <UiTable v-bind="args">
        <template #header-price="{ column, isSortable, sortOrder, onSort }">
          <button
            v-if="isSortable"
            type="button"
            @click="onSort"
            :style="{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              border: 0,
              background: 'transparent',
              color: sortOrder ? '#2563eb' : 'inherit',
              cursor: 'pointer',
              font: 'inherit',
            }"
          >
            <span>💰 {{ column.label }}</span>
            <span style="font-size: 10px;">{{ sortOrder === 'desc' ? '▼' : '▲' }}</span>
          </button>
        </template>
        <template #header-stock="{ column }">
          <span style="display:inline-flex; align-items:center; gap:4px;">
            {{ column.label }}
            <span style="font-size: 10px; color: #888;">(실시간)</span>
          </span>
        </template>
      </UiTable>
    `})},v={args:{columns:l,data:[]},render:e=>({components:{UiTable:s},setup:()=>{const t=c([]);return{args:e,data:t,toggle:()=>{t.value=t.value.length>0?[]:[...i]}}},template:`
      <div>
        <button
          @click="toggle"
          style="margin-bottom: 12px; padding: 6px 14px; border: 1px solid #dce4e9; border-radius: 6px; background: #fff; cursor: pointer; font-size: 13px;"
        >
          {{ data.length > 0 ? '데이터 비우기' : '데이터 채우기' }}
        </button>
        <UiTable v-bind="args" :data="data" />
      </div>
    `}),play:async({canvasElement:e})=>{const t=B(e);await r(t.getByText("데이터가 없습니다.")).toBeTruthy()}},w={args:{columns:l,data:[],emptyText:"조회 결과가 없습니다. 검색 조건을 변경해주세요."},render:e=>({components:{UiTable:s},setup:()=>({args:e}),template:'<UiTable v-bind="args" />'}),play:async({canvasElement:e})=>{const t=B(e);await r(t.getByText("조회 결과가 없습니다. 검색 조건을 변경해주세요.")).toBeTruthy()}},x={args:{columns:l,data:[],emptyIcon:"icon-search",emptyText:"검색 결과가 없습니다.",emptyDescription:"검색어를 변경하거나 필터를 초기화해보세요."},render:e=>({components:{UiTable:s},setup:()=>({args:e}),template:'<UiTable v-bind="args" />'})},k={args:{columns:l,data:[]},render:e=>({components:{UiTable:s},setup:()=>({args:e}),template:`
      <UiTable v-bind="args">
        <template #empty>
          <div style="padding: 32px; text-align: center; color: #6b7280;">
            <p style="margin-bottom: 8px; font-weight: 600;">데이터가 아직 없어요</p>
            <button style="padding: 6px 14px; border: 1px solid #dce4e9; border-radius: 6px; background: #fff; cursor: pointer;">
              첫 항목 추가하기
            </button>
          </div>
        </template>
      </UiTable>
    `})},h={args:{columns:l,data:i,clickable:!0},render:e=>({components:{UiTable:s},setup:()=>{const t=c(null);return{args:e,lastClick:t,onRowClick:(a,n)=>{var d;t.value={index:n,row:a},(d=e.onRowClick)==null||d.call(e,a,n)}}},template:`
      <div>
        <UiTable v-bind="args" @row-click="onRowClick" />
        <div style="margin-top: 12px; padding: 10px 14px; background: #f4f7f9; border-radius: 6px; font-size: 13px; color: #4d5462;">
          <strong style="margin-right: 8px;">마지막 클릭:</strong>
          <span v-if="lastClick">행 #{{ lastClick.index }} — {{ lastClick.row.region }} / {{ lastClick.row.name }}</span>
          <span v-else style="color: #6f7a93;">(행을 클릭해 보세요)</span>
        </div>
      </div>
    `}),play:async({canvasElement:e,args:t})=>{const n=B(e).getAllByText("케이블 플랫폼 매출")[0].closest("tr");await R.click(n),await r(t.onRowClick).toHaveBeenCalledWith(r.objectContaining({region:"대전"}),0)}},f={args:{columns:l,data:i,size:"sm"},render:e=>({components:{UiTable:s},setup:()=>{const t=c(e.size??"sm");return{args:e,size:t,toggle:()=>{t.value=t.value==="sm"?"md":"sm"}}},template:`
      <div>
        <button
          @click="toggle"
          style="margin-bottom: 12px; padding: 6px 14px; border: 1px solid #dce4e9; border-radius: 6px; background: #fff; cursor: pointer; font-size: 13px;"
        >
          size: <strong>{{ size }}</strong> — 클릭해서 토글
        </button>
        <UiTable v-bind="args" :size="size" />
      </div>
    `})},T={args:{columns:l,data:i,selectedRowKey:"region",selectedRowValue:"부산",clickable:!0},render:e=>({components:{UiTable:s},setup:()=>{const t=c(e.selectedRowValue??"");return{args:e,selectedRowValue:t,onRowClick:a=>{const n=e.selectedRowKey;n&&(t.value=String(a[n]??""))}}},template:`
      <UiTable
        v-bind="args"
        :selected-row-value="selectedRowValue"
        @row-click="onRowClick"
      />
    `})},U={args:{columns:[{key:"title",label:"제목",width:"300px",align:"left"},{key:"status",label:"상태",width:"150px",filterable:!0,filterOptions:[{label:"전체",value:""},{label:"할 일",value:"todo"},{label:"진행중",value:"doing"},{label:"완료",value:"done"}]},{key:"priority",label:"우선순위",width:"160px",filterable:!0,filterOptions:[{label:"전체",value:""},{label:"높음",value:"high"},{label:"보통",value:"mid"},{label:"낮음",value:"low"}]},{key:"assignee",label:"담당자",width:"120px"}],data:[{title:"KPI 보드 버튼 노출 수정",status:"done",priority:"high",assignee:"이찬용"},{title:"합의 상태 아이콘 표시",status:"done",priority:"high",assignee:"이찬용"},{title:"평가 점수 소수점 반올림",status:"doing",priority:"mid",assignee:"홍다래"},{title:"가중치 100% 초과 차단",status:"doing",priority:"high",assignee:"이찬용"},{title:"피드백 알림 발송",status:"todo",priority:"mid",assignee:"박현지"},{title:"부서별 달성률 차트",status:"todo",priority:"mid",assignee:"홍다래"},{title:"목표 드래그앤드롭",status:"todo",priority:"low",assignee:"이찬용"},{title:"자기평가 미작성 차단",status:"todo",priority:"high",assignee:"김정의"}],size:"sm"},render:e=>({components:{UiTable:s,UiBadge:Te},setup:()=>({args:e}),template:`
      <UiTable v-bind="args">
        <template #cell-status="{ value }">
          <UiBadge
            :variant="value === 'done' ? 'success' : value === 'doing' ? 'primary' : 'default'"
            size="sm"
          >{{ value === 'done' ? '완료' : value === 'doing' ? '진행중' : '할 일' }}</UiBadge>
        </template>
        <template #cell-priority="{ value }">
          <UiBadge
            :variant="value === 'high' ? 'danger' : value === 'mid' ? 'warning' : 'default'"
            size="sm"
          >{{ value === 'high' ? '높음' : value === 'mid' ? '보통' : '낮음' }}</UiBadge>
        </template>
      </UiTable>
    `})},C={args:{columns:[{key:"name",label:"이름",width:"200px",align:"left",sortable:!0,sortType:"string"},{key:"score",label:"점수",align:"right",sortable:!0,sortType:"number"},{key:"joined",label:"가입일",align:"center",sortable:!0,sortType:"date"}],data:[{name:"김철수",score:"1,234",joined:"2025-03-15"},{name:"이영희",score:"890",joined:"2024-11-20"},{name:"박민수",score:"2,567",joined:"2025-07-01"},{name:"최지원",score:"456",joined:"2024-08-10"}]},render:e=>({components:{UiTable:s},setup:()=>({args:e}),template:'<UiTable v-bind="args" />'}),play:async({canvasElement:e})=>{const o=B(e).getByRole("button",{name:/점수/}),a=o.closest("th"),n=o.querySelector(".ui-table-sort-mark");await r(a.getAttribute("aria-sort")).toBe("none"),await R.click(o),await r(n.classList.contains("is-active")).toBe(!0),await r(n.classList.contains("is-desc")).toBe(!1),await r(a.getAttribute("aria-sort")).toBe("ascending");const d=e.querySelector("tbody tr");await r(d.textContent).toContain("최지원"),await R.click(o),await r(n.classList.contains("is-desc")).toBe(!0),await r(a.getAttribute("aria-sort")).toBe("descending");const Ce=e.querySelector("tbody tr");await r(Ce.textContent).toContain("박민수"),await R.click(o),await r(n.classList.contains("is-active")).toBe(!1),await r(a.getAttribute("aria-sort")).toBe("none")}},S={args:{columns:l,data:i,bordered:!1,clickable:!0},render:e=>({components:{UiTable:s},setup:()=>({args:e}),template:'<UiTable v-bind="args" />'}),play:async({canvasElement:e})=>{const t=e.querySelector(".ui-table-wrap");await r(t.classList.contains("is-borderless")).toBe(!0);const o=e.querySelector("thead th"),a=getComputedStyle(o);await r(a.borderRightStyle).toBe("none")}};var z,E,V;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: baseData,
    size: 'md',
    stickyHeader: false,
    maxHeight: '',
    clickable: false,
    emptyText: '데이터가 없습니다.',
    selectedRowKey: '',
    selectedRowValue: ''
  },
  argTypes: {
    emptyText: {
      control: 'text',
      description: '빈 상태 메시지 (기본 "데이터가 없습니다.")'
    },
    selectedRowKey: {
      control: 'text',
      description: '예: "region" — selectedRowValue와 매칭되는 행 강조'
    },
    selectedRowValue: {
      control: 'text',
      description: '예: "부산" — selectedRowKey와 함께 사용'
    }
  } as never,
  render: args => ({
    components: {
      UiTable
    },
    setup: () => ({
      args
    }),
    template: '<UiTable v-bind="args" />'
  })
}`,...(V=(E=p.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var D,H,A;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: baseData
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => ({
      args
    }),
    template: '<UiTable v-bind="args" />'
  })
}`,...(A=(H=u.parameters)==null?void 0:H.docs)==null?void 0:A.source}}};var O,I,j;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: longData,
    stickyHeader: true,
    maxHeight: '200px'
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => ({
      args
    }),
    template: '<UiTable v-bind="args" />'
  })
}`,...(j=(I=m.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var K,P,q;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: longData,
    maxHeight: '180px'
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => ({
      args
    }),
    template: '<UiTable v-bind="args" />'
  })
}`,...(q=(P=g.parameters)==null?void 0:P.docs)==null?void 0:q.source}}};var L,M,W;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    columns: [{
      key: 'service',
      label: '서비스명',
      width: '200px',
      align: 'left'
    }, {
      key: 'region',
      label: '지역',
      width: '120px'
    }, {
      key: 'count',
      label: '건수',
      align: 'right'
    }, {
      key: 'status',
      label: '상태',
      width: '120px'
    }],
    data: [{
      service: '케이블 인터넷',
      region: '서울',
      count: '1,234',
      status: '정상'
    }, {
      service: 'IPTV 서비스',
      region: '부산',
      count: '567',
      status: '점검'
    }, {
      service: '유선전화',
      region: '대구',
      count: '890',
      status: '정상'
    }]
  },
  render: args => ({
    components: {
      UiTable,
      UiBadge
    },
    setup: () => {
      // 셀 클릭으로 상태 토글 — 슬롯 안에서도 인터랙션 가능함을 보여줌
      const rows = ref(args.data.map(r => ({
        ...r
      })));
      const toggleStatus = (idx: number) => {
        rows.value[idx].status = rows.value[idx].status === '정상' ? '점검' : '정상';
      };
      return {
        args,
        rows,
        toggleStatus
      };
    },
    // UiBadge로 정식 교체 — variant success/danger 시맨틱. 셀 클릭으로 상태 토글
    template: \`
      <UiTable v-bind="args" :data="rows">
        <template #cell-status="{ value, index }">
          <button
            type="button"
            @click="toggleStatus(index)"
            style="border: 0; background: transparent; padding: 0; cursor: pointer;"
          >
            <UiBadge :variant="value === '정상' ? 'success' : 'danger'">{{ value }}</UiBadge>
          </button>
        </template>
      </UiTable>
    \`
  })
}`,...(W=(M=b.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var F,_,G;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    columns: [{
      key: 'name',
      label: '제품명',
      width: '240px',
      align: 'left'
    }, {
      key: 'price',
      label: '가격',
      align: 'right',
      sortable: true,
      sortType: 'number'
    }, {
      key: 'stock',
      label: '재고',
      width: '120px'
    }],
    data: [{
      name: '케이블 모뎀 (3.1)',
      price: '89,000',
      stock: '정상'
    }, {
      name: '무선 공유기 (Wi-Fi 6)',
      price: '129,000',
      stock: '품절'
    }, {
      name: 'IPTV 셋톱박스',
      price: '45,000',
      stock: '정상'
    }]
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiTable v-bind="args">
        <template #header-price="{ column, isSortable, sortOrder, onSort }">
          <button
            v-if="isSortable"
            type="button"
            @click="onSort"
            :style="{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              border: 0,
              background: 'transparent',
              color: sortOrder ? '#2563eb' : 'inherit',
              cursor: 'pointer',
              font: 'inherit',
            }"
          >
            <span>💰 {{ column.label }}</span>
            <span style="font-size: 10px;">{{ sortOrder === 'desc' ? '▼' : '▲' }}</span>
          </button>
        </template>
        <template #header-stock="{ column }">
          <span style="display:inline-flex; align-items:center; gap:4px;">
            {{ column.label }}
            <span style="font-size: 10px; color: #888;">(실시간)</span>
          </span>
        </template>
      </UiTable>
    \`
  })
}`,...(G=(_=y.parameters)==null?void 0:_.docs)==null?void 0:G.source}}};var J,N,Q;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: []
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => {
      const data = ref<Record<string, any>[]>([]);
      const toggle = () => {
        data.value = data.value.length > 0 ? [] : [...baseData];
      };
      return {
        args,
        data,
        toggle
      };
    },
    template: \`
      <div>
        <button
          @click="toggle"
          style="margin-bottom: 12px; padding: 6px 14px; border: 1px solid #dce4e9; border-radius: 6px; background: #fff; cursor: pointer; font-size: 13px;"
        >
          {{ data.length > 0 ? '데이터 비우기' : '데이터 채우기' }}
        </button>
        <UiTable v-bind="args" :data="data" />
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // 초기 상태: 빈 배열 → emptyText 노출
    await expect(canvas.getByText('데이터가 없습니다.')).toBeTruthy();
  }
}`,...(Q=(N=v.parameters)==null?void 0:N.docs)==null?void 0:Q.source}}};var X,Y,Z;w.parameters={...w.parameters,docs:{...(X=w.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: [],
    emptyText: '조회 결과가 없습니다. 검색 조건을 변경해주세요.'
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => ({
      args
    }),
    template: '<UiTable v-bind="args" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('조회 결과가 없습니다. 검색 조건을 변경해주세요.')).toBeTruthy();
  }
}`,...(Z=(Y=w.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,te;x.parameters={...x.parameters,docs:{...($=x.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: [],
    emptyIcon: 'icon-search',
    emptyText: '검색 결과가 없습니다.',
    emptyDescription: '검색어를 변경하거나 필터를 초기화해보세요.'
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => ({
      args
    }),
    template: '<UiTable v-bind="args" />'
  })
}`,...(te=(ee=x.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,se,re;k.parameters={...k.parameters,docs:{...(ae=k.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: []
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiTable v-bind="args">
        <template #empty>
          <div style="padding: 32px; text-align: center; color: #6b7280;">
            <p style="margin-bottom: 8px; font-weight: 600;">데이터가 아직 없어요</p>
            <button style="padding: 6px 14px; border: 1px solid #dce4e9; border-radius: 6px; background: #fff; cursor: pointer;">
              첫 항목 추가하기
            </button>
          </div>
        </template>
      </UiTable>
    \`
  })
}`,...(re=(se=k.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};var oe,ne,le;h.parameters={...h.parameters,docs:{...(oe=h.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: baseData,
    clickable: true
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => {
      const lastClick = ref<{
        index: number;
        row: Record<string, any>;
      } | null>(null);
      const onRowClick = (row: Record<string, any>, index: number) => {
        lastClick.value = {
          index,
          row
        };
        // Playground args.onRowClick는 fn() spy — Actions 패널 + play 함수 호환 유지
        args.onRowClick?.(row, index);
      };
      return {
        args,
        lastClick,
        onRowClick
      };
    },
    template: \`
      <div>
        <UiTable v-bind="args" @row-click="onRowClick" />
        <div style="margin-top: 12px; padding: 10px 14px; background: #f4f7f9; border-radius: 6px; font-size: 13px; color: #4d5462;">
          <strong style="margin-right: 8px;">마지막 클릭:</strong>
          <span v-if="lastClick">행 #{{ lastClick.index }} — {{ lastClick.row.region }} / {{ lastClick.row.name }}</span>
          <span v-else style="color: #6f7a93;">(행을 클릭해 보세요)</span>
        </div>
      </div>
    \`
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    // 첫 번째 데이터 행 — 통계명 셀 텍스트로 행 찾기
    const firstRowCell = canvas.getAllByText('케이블 플랫폼 매출')[0];
    const tr = firstRowCell.closest('tr')!;
    await userEvent.click(tr);
    // onRowClick(row, index) 호출 검증 — 첫 행 = index 0
    await expect(args.onRowClick).toHaveBeenCalledWith(expect.objectContaining({
      region: '대전'
    }), 0);
  }
}`,...(le=(ne=h.parameters)==null?void 0:ne.docs)==null?void 0:le.source}}};var ie,ce,de;f.parameters={...f.parameters,docs:{...(ie=f.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: baseData,
    size: 'sm'
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => {
      const size = ref<'md' | 'sm'>(args.size ?? 'sm');
      const toggle = () => {
        size.value = size.value === 'sm' ? 'md' : 'sm';
      };
      return {
        args,
        size,
        toggle
      };
    },
    template: \`
      <div>
        <button
          @click="toggle"
          style="margin-bottom: 12px; padding: 6px 14px; border: 1px solid #dce4e9; border-radius: 6px; background: #fff; cursor: pointer; font-size: 13px;"
        >
          size: <strong>{{ size }}</strong> — 클릭해서 토글
        </button>
        <UiTable v-bind="args" :size="size" />
      </div>
    \`
  })
}`,...(de=(ce=f.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};var pe,ue,me;T.parameters={...T.parameters,docs:{...(pe=T.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: baseData,
    selectedRowKey: 'region',
    selectedRowValue: '부산',
    clickable: true
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => {
      const selectedRowValue = ref<string>(args.selectedRowValue ?? '');
      const onRowClick = (row: Record<string, any>) => {
        const key = args.selectedRowKey;
        if (key) selectedRowValue.value = String(row[key] ?? '');
      };
      return {
        args,
        selectedRowValue,
        onRowClick
      };
    },
    template: \`
      <UiTable
        v-bind="args"
        :selected-row-value="selectedRowValue"
        @row-click="onRowClick"
      />
    \`
  })
}`,...(me=(ue=T.parameters)==null?void 0:ue.docs)==null?void 0:me.source}}};var ge,be,ye;U.parameters={...U.parameters,docs:{...(ge=U.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    columns: [{
      key: 'title',
      label: '제목',
      width: '300px',
      align: 'left'
    }, {
      key: 'status',
      label: '상태',
      width: '150px',
      filterable: true,
      filterOptions: [{
        label: '전체',
        value: ''
      }, {
        label: '할 일',
        value: 'todo'
      }, {
        label: '진행중',
        value: 'doing'
      }, {
        label: '완료',
        value: 'done'
      }]
    }, {
      key: 'priority',
      label: '우선순위',
      width: '160px',
      filterable: true,
      filterOptions: [{
        label: '전체',
        value: ''
      }, {
        label: '높음',
        value: 'high'
      }, {
        label: '보통',
        value: 'mid'
      }, {
        label: '낮음',
        value: 'low'
      }]
    }, {
      key: 'assignee',
      label: '담당자',
      width: '120px'
    }],
    data: [{
      title: 'KPI 보드 버튼 노출 수정',
      status: 'done',
      priority: 'high',
      assignee: '이찬용'
    }, {
      title: '합의 상태 아이콘 표시',
      status: 'done',
      priority: 'high',
      assignee: '이찬용'
    }, {
      title: '평가 점수 소수점 반올림',
      status: 'doing',
      priority: 'mid',
      assignee: '홍다래'
    }, {
      title: '가중치 100% 초과 차단',
      status: 'doing',
      priority: 'high',
      assignee: '이찬용'
    }, {
      title: '피드백 알림 발송',
      status: 'todo',
      priority: 'mid',
      assignee: '박현지'
    }, {
      title: '부서별 달성률 차트',
      status: 'todo',
      priority: 'mid',
      assignee: '홍다래'
    }, {
      title: '목표 드래그앤드롭',
      status: 'todo',
      priority: 'low',
      assignee: '이찬용'
    }, {
      title: '자기평가 미작성 차단',
      status: 'todo',
      priority: 'high',
      assignee: '김정의'
    }],
    size: 'sm'
  },
  render: args => ({
    components: {
      UiTable,
      UiBadge
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiTable v-bind="args">
        <template #cell-status="{ value }">
          <UiBadge
            :variant="value === 'done' ? 'success' : value === 'doing' ? 'primary' : 'default'"
            size="sm"
          >{{ value === 'done' ? '완료' : value === 'doing' ? '진행중' : '할 일' }}</UiBadge>
        </template>
        <template #cell-priority="{ value }">
          <UiBadge
            :variant="value === 'high' ? 'danger' : value === 'mid' ? 'warning' : 'default'"
            size="sm"
          >{{ value === 'high' ? '높음' : value === 'mid' ? '보통' : '낮음' }}</UiBadge>
        </template>
      </UiTable>
    \`
  })
}`,...(ye=(be=U.parameters)==null?void 0:be.docs)==null?void 0:ye.source}}};var ve,we,xe;C.parameters={...C.parameters,docs:{...(ve=C.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    columns: [{
      key: 'name',
      label: '이름',
      width: '200px',
      align: 'left',
      sortable: true,
      sortType: 'string'
    }, {
      key: 'score',
      label: '점수',
      align: 'right',
      sortable: true,
      sortType: 'number'
    }, {
      key: 'joined',
      label: '가입일',
      align: 'center',
      sortable: true,
      sortType: 'date'
    }],
    data: [{
      name: '김철수',
      score: '1,234',
      joined: '2025-03-15'
    }, {
      name: '이영희',
      score: '890',
      joined: '2024-11-20'
    }, {
      name: '박민수',
      score: '2,567',
      joined: '2025-07-01'
    }, {
      name: '최지원',
      score: '456',
      joined: '2024-08-10'
    }]
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => ({
      args
    }),
    template: '<UiTable v-bind="args" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // 점수 컬럼 헤더 버튼 + 해당 <th>
    const scoreBtn = canvas.getByRole('button', {
      name: /점수/
    });
    const scoreTh = scoreBtn.closest('th')!;
    const sortMark = scoreBtn.querySelector('.ui-table-sort-mark')!;

    // 초기 상태: aria-sort="none" — 정렬 가능 컬럼이지만 미정렬
    await expect(scoreTh.getAttribute('aria-sort')).toBe('none');

    // 1차 클릭: asc — is-active 적용, is-desc 미적용, aria-sort="ascending"
    await userEvent.click(scoreBtn);
    await expect(sortMark.classList.contains('is-active')).toBe(true);
    await expect(sortMark.classList.contains('is-desc')).toBe(false);
    await expect(scoreTh.getAttribute('aria-sort')).toBe('ascending');

    // 정렬 결과 확인 — 첫 행이 가장 낮은 점수(456)
    const firstRow = canvasElement.querySelector('tbody tr')!;
    await expect(firstRow.textContent).toContain('최지원');

    // 2차 클릭: desc — is-desc 적용, aria-sort="descending"
    await userEvent.click(scoreBtn);
    await expect(sortMark.classList.contains('is-desc')).toBe(true);
    await expect(scoreTh.getAttribute('aria-sort')).toBe('descending');
    const firstRowDesc = canvasElement.querySelector('tbody tr')!;
    await expect(firstRowDesc.textContent).toContain('박민수'); // 2,567

    // 3차 클릭: 해제 — is-active 미적용, aria-sort="none"
    await userEvent.click(scoreBtn);
    await expect(sortMark.classList.contains('is-active')).toBe(false);
    await expect(scoreTh.getAttribute('aria-sort')).toBe('none');

    // 비정렬 컬럼은 aria-sort 속성 자체가 없어야 함 — 같은 스토리에는 sortable 3개뿐이므로 검증 생략
  }
}`,...(xe=(we=C.parameters)==null?void 0:we.docs)==null?void 0:xe.source}}};var ke,he,fe;S.parameters={...S.parameters,docs:{...(ke=S.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    columns: baseColumns,
    data: baseData,
    bordered: false,
    clickable: true
  },
  render: args => ({
    components: {
      UiTable
    },
    setup: () => ({
      args
    }),
    template: '<UiTable v-bind="args" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const wrap = canvasElement.querySelector('.ui-table-wrap')!;
    await expect(wrap.classList.contains('is-borderless')).toBe(true);

    // 세로 구분선 없음 확인
    const firstTh = canvasElement.querySelector('thead th')!;
    const thStyle = getComputedStyle(firstTh);
    await expect(thStyle.borderRightStyle).toBe('none');
  }
}`,...(fe=(he=S.parameters)==null?void 0:he.docs)==null?void 0:fe.source}}};const Oe=["Playground","Default","StickyHeader","MaxHeightScroll","CustomCell","HeaderSlot","Empty","EmptyTextCustom","EmptyWithIcon","EmptySlot","Clickable","SmallSize","SelectedRow","Filterable","Sortable","Borderless"];export{S as Borderless,h as Clickable,b as CustomCell,u as Default,v as Empty,k as EmptySlot,w as EmptyTextCustom,x as EmptyWithIcon,U as Filterable,y as HeaderSlot,g as MaxHeightScroll,p as Playground,T as SelectedRow,f as SmallSize,C as Sortable,m as StickyHeader,Oe as __namedExportsOrder,Ae as default};
