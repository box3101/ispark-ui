import{w as B,u as ie,e as y,f as E}from"./index-CpO9RqPZ.js";import{e as ue,f as l,q as D,k as c,t as p,l as V,F as q,m as pe,c as f,o as s,n as de,r as d}from"./vue.esm-bundler-UBndlgVH.js";import{_ as ge}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{U as ce,a as me}from"./UiTable-DPL9AmJl.js";import"./UiSelect-0m-Wx2_9.js";import"./index-yTw_IPk6.js";const ve={class:"ui-pagination",role:"navigation","aria-label":"페이지네이션"},be={key:0,class:"ui-pagination-total"},fe={class:"ui-pagination-point"},ye={class:"ui-pagination-controls"},he=["disabled"],Ve=["disabled"],Ce={class:"ui-pagination-pages"},Ue={key:0,class:"ui-pagination-ellipsis","aria-hidden":"true"},Pe=["aria-current","aria-label","onClick"],Se=["disabled"],xe=["disabled"],we={key:1,class:"ui-pagination-range","aria-live":"polite"},le=ue({__name:"UiPagination",props:{modelValue:{},totalCount:{},pageSize:{default:10},totalLabel:{default:"개"},prevLabel:{default:"이전"},nextLabel:{default:"다음"},showTotal:{type:Boolean,default:!0},showRange:{type:Boolean,default:!0},showFirstLast:{type:Boolean,default:!1}},emits:["update:modelValue","change"],setup(e,{emit:a}){const n=e,i=a,g=f(()=>Math.max(1,Math.ceil(n.totalCount/n.pageSize))),v=f(()=>n.totalCount===0?0:(n.modelValue-1)*n.pageSize+1),m=f(()=>Math.min(n.modelValue*n.pageSize,n.totalCount)),se=f(()=>{const u=g.value,t=n.modelValue;if(u<=7)return Array.from({length:u},(h,re)=>re+1);const o=[1];t>4&&o.push("...");const L=Math.max(2,t-1),T=Math.min(u-1,t+1);for(let h=L;h<=T;h++)o.push(h);return t<u-3&&o.push("..."),o.push(u),o}),b=u=>{const t=Math.max(1,Math.min(u,g.value));t!==n.modelValue&&(i("update:modelValue",t),i("change",t))};return(u,t)=>(s(),l("div",ve,[e.showTotal?(s(),l("p",be,[t[4]||(t[4]=D(" 총 ",-1)),c("strong",fe,p(e.totalCount),1),D(p(e.totalLabel),1)])):V("",!0),c("div",ye,[e.showFirstLast?(s(),l("button",{key:0,type:"button",class:"ui-pagination-btn ui-pagination-btn--edge",disabled:e.modelValue<=1,"aria-label":"처음 페이지",onClick:t[0]||(t[0]=o=>b(1))},[...t[5]||(t[5]=[c("span",{"aria-hidden":"true"},"«",-1)])],8,he)):V("",!0),c("button",{type:"button",class:"ui-pagination-btn",disabled:e.modelValue<=1,"aria-label":"이전 페이지",onClick:t[1]||(t[1]=o=>b(e.modelValue-1))},p(e.prevLabel),9,Ve),c("div",Ce,[(s(!0),l(q,null,pe(se.value,(o,L)=>(s(),l(q,{key:L},[o==="..."?(s(),l("span",Ue,"…")):(s(),l("button",{key:1,type:"button",class:de(["ui-pagination-page",{"is-active":o===e.modelValue}]),"aria-current":o===e.modelValue?"page":void 0,"aria-label":`${o} 페이지`,onClick:T=>b(o)},p(o),11,Pe))],64))),128))]),c("button",{type:"button",class:"ui-pagination-btn",disabled:e.modelValue>=g.value,"aria-label":"다음 페이지",onClick:t[2]||(t[2]=o=>b(e.modelValue+1))},p(e.nextLabel),9,Se),e.showFirstLast?(s(),l("button",{key:1,type:"button",class:"ui-pagination-btn ui-pagination-btn--edge",disabled:e.modelValue>=g.value,"aria-label":"마지막 페이지",onClick:t[3]||(t[3]=o=>b(g.value))},[...t[6]||(t[6]=[c("span",{"aria-hidden":"true"},"»",-1)])],8,xe)):V("",!0)]),e.showRange?(s(),l("span",we,p(v.value)+"-"+p(m.value)+" / "+p(e.totalCount),1)):V("",!0)]))}}),r=ge(le,[["__scopeId","data-v-3d5d3cfb"]]);le.__docgenInfo={exportName:"default",displayName:"UiPagination",description:"",tags:{},props:[{name:"modelValue",description:"현재 페이지 (1-indexed). v-model",required:!0,type:{name:"number"}},{name:"totalCount",description:"전체 항목 수",required:!0,type:{name:"number"}},{name:"pageSize",description:"페이지당 항목 수. 기본 10",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"10"}},{name:"totalLabel",description:"총 N{label} — 예: '개', '건', '명'",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'개'"}},{name:"prevLabel",description:"이전/다음 버튼 라벨",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'이전'"}},{name:"nextLabel",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'다음'"}},{name:"showTotal",description:"좌측 '총 N개' 표시. 기본 true",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"showRange",description:"우측 'n-m / total' 표시. 기본 true",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"showFirstLast",description:"양 끝 처음/마지막 페이지 «/» 버튼 표시. 페이지 많은 케이스 권장. 기본 false",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"update:modelValue",type:{names:["number"]}},{name:"change",type:{names:["number"]}}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiPagination.vue"]};const De={title:"Components/Display/UiPagination",component:r,tags:["autodocs"],args:{"onUpdate:modelValue":E(),onChange:E()},parameters:{docs:{description:{component:"\nispark-ui 표준 페이지네이션. UiTable과 짝으로 자주 쓰이는 리스트 네비게이션.\n\n## API\n- **`modelValue`** `number` — 현재 페이지(1-indexed). v-model\n- **`totalCount`** `number` — 전체 항목 수\n- **`pageSize`** `number` — 페이지당 항목 수 (기본 10)\n- **`totalLabel`** `string` — 좌측 '총 N개'의 단위 ('개'/'건'/'명' 등)\n- **`prevLabel`** / **`nextLabel`** — 이전/다음 버튼 라벨\n- **`showTotal`** `boolean` — '총 N개' 좌측 표시 (기본 true)\n- **`showRange`** `boolean` — 'n-m / total' 우측 표시 (기본 true)\n\n## 페이지 번호 표시 규칙\n- 총 7페이지 이하: 전체 번호 표시\n- 8페이지 이상: `[1, ..., cur-1, cur, cur+1, ..., total]` 패턴, 끝쪽으로 가면 ... 사라짐\n\n## 이벤트\n- `update:modelValue` — v-model 양방향\n- `change` — 동일 payload 별도 emit\n\n## 접근성\n- 루트 `<nav aria-label=\"페이지네이션\">`\n- 현재 페이지: `aria-current=\"page\"`\n- 이전/다음 버튼: `aria-label`\n- 페이지 번호 버튼: `aria-label=\"N 페이지\"`\n- 범위 표시: `aria-live=\"polite\"` — 페이지 변경 시 SR이 안내\n- `prefers-reduced-motion: reduce` 시 transition 정지\n        "}}}},C={args:{modelValue:3,totalCount:247,pageSize:10,totalLabel:"개"},render:e=>({components:{UiPagination:r},setup:()=>{const a=d(e.modelValue);return{args:e,page:a}},template:'<UiPagination v-bind="args" v-model="page" />'})},U={args:{totalCount:100,pageSize:10},render:e=>({components:{UiPagination:r},setup:()=>{const a=d(1);return{args:e,page:a}},template:'<UiPagination v-bind="args" v-model="page" />'}),play:async({canvasElement:e,args:a})=>{const i=B(e).getByLabelText("다음 페이지");await ie.click(i),await y(a["onUpdate:modelValue"]).toHaveBeenCalledWith(2),await y(a.onChange).toHaveBeenCalledWith(2)}},P={args:{modelValue:2,totalCount:35,pageSize:10},render:e=>({components:{UiPagination:r},setup:()=>{const a=d(e.modelValue);return{args:e,page:a}},template:'<UiPagination v-bind="args" v-model="page" />'})},S={args:{modelValue:5,totalCount:500,pageSize:10},render:e=>({components:{UiPagination:r},setup:()=>{const a=d(e.modelValue);return{args:e,page:a}},template:'<UiPagination v-bind="args" v-model="page" />'}),play:async({canvasElement:e})=>{const n=B(e).getAllByText("…");await y(n.length).toBeGreaterThan(0);const i=e.querySelectorAll('[aria-current="page"]');await y(i.length).toBe(1)}},x={args:{modelValue:1,totalCount:247,pageSize:10},render:e=>({components:{UiPagination:r},setup:()=>{const a=d(e.modelValue);return{args:e,page:a}},template:'<UiPagination v-bind="args" v-model="page" />'}),play:async({canvasElement:e})=>{const n=B(e).getByLabelText("이전 페이지");await y(n.disabled).toBe(!0)}},w={args:{modelValue:25,totalCount:247,pageSize:10},render:e=>({components:{UiPagination:r},setup:()=>{const a=d(e.modelValue);return{args:e,page:a}},template:'<UiPagination v-bind="args" v-model="page" />'})},k={args:{modelValue:1,totalCount:0},render:e=>({components:{UiPagination:r},setup:()=>{const a=d(e.modelValue);return{args:e,page:a}},template:'<UiPagination v-bind="args" v-model="page" />'})},z={render:()=>({components:{UiPagination:r,UiTable:me,UiEmpty:ce},setup:()=>{const e=d(1),a=5,n=Array.from({length:100},(v,m)=>({id:m+1,name:`항목 #${m+1}`,region:["서울","부산","대구","인천","대전"][m%5],total:((m+1)*1234567).toLocaleString()})),i=[{key:"id",label:"ID",width:"80px"},{key:"name",label:"이름",align:"left"},{key:"region",label:"지역"},{key:"total",label:"금액",align:"right"}],g=f(()=>{const v=(e.value-1)*a;return n.slice(v,v+a)});return{page:e,pagedData:g,columns:i,totalCount:n.length,pageSize:a}},template:`
      <div>
        <UiTable v-if="pagedData.length > 0" :columns="columns" :data="pagedData" />
        <UiEmpty v-else />
        <div style="margin-top: 16px;">
          <UiPagination
            v-model="page"
            :total-count="totalCount"
            :page-size="pageSize"
            total-label="건"
          />
        </div>
      </div>
    `})};var F,M,N;C.parameters={...C.parameters,docs:{...(F=C.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    modelValue: 3,
    totalCount: 247,
    pageSize: 10,
    totalLabel: '개'
  },
  render: args => ({
    components: {
      UiPagination
    },
    setup: () => {
      const page = ref(args.modelValue);
      return {
        args,
        page
      };
    },
    template: '<UiPagination v-bind="args" v-model="page" />'
  })
}`,...(N=(M=C.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};var A,$,I;U.parameters={...U.parameters,docs:{...(A=U.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    totalCount: 100,
    pageSize: 10
  },
  render: args => ({
    components: {
      UiPagination
    },
    setup: () => {
      const page = ref(1);
      return {
        args,
        page
      };
    },
    template: '<UiPagination v-bind="args" v-model="page" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    // 다음 버튼 클릭 → page 2로
    const next = canvas.getByLabelText('다음 페이지');
    await userEvent.click(next);
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith(2);
    await expect(args.onChange).toHaveBeenCalledWith(2);
  }
}`,...(I=($=U.parameters)==null?void 0:$.docs)==null?void 0:I.source}}};var W,H,R;P.parameters={...P.parameters,docs:{...(W=P.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    modelValue: 2,
    totalCount: 35,
    pageSize: 10
  },
  render: args => ({
    components: {
      UiPagination
    },
    setup: () => {
      const page = ref(args.modelValue);
      return {
        args,
        page
      };
    },
    template: '<UiPagination v-bind="args" v-model="page" />'
  })
}`,...(R=(H=P.parameters)==null?void 0:H.docs)==null?void 0:R.source}}};var G,O,j;S.parameters={...S.parameters,docs:{...(G=S.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    modelValue: 5,
    totalCount: 500,
    pageSize: 10
  },
  render: args => ({
    components: {
      UiPagination
    },
    setup: () => {
      const page = ref(args.modelValue);
      return {
        args,
        page
      };
    },
    template: '<UiPagination v-bind="args" v-model="page" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // 말줄임 (...) 존재
    const ellipses = canvas.getAllByText('…');
    await expect(ellipses.length).toBeGreaterThan(0);
    // aria-current=page 버튼이 하나 있어야 함
    const current = canvasElement.querySelectorAll('[aria-current="page"]');
    await expect(current.length).toBe(1);
  }
}`,...(j=(O=S.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var J,K,Q;x.parameters={...x.parameters,docs:{...(J=x.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    modelValue: 1,
    totalCount: 247,
    pageSize: 10
  },
  render: args => ({
    components: {
      UiPagination
    },
    setup: () => {
      const page = ref(args.modelValue);
      return {
        args,
        page
      };
    },
    template: '<UiPagination v-bind="args" v-model="page" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const prev = canvas.getByLabelText('이전 페이지') as HTMLButtonElement;
    await expect(prev.disabled).toBe(true);
  }
}`,...(Q=(K=x.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Y,Z;w.parameters={...w.parameters,docs:{...(X=w.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    modelValue: 25,
    totalCount: 247,
    pageSize: 10
  },
  render: args => ({
    components: {
      UiPagination
    },
    setup: () => {
      const page = ref(args.modelValue);
      return {
        args,
        page
      };
    },
    template: '<UiPagination v-bind="args" v-model="page" />'
  })
}`,...(Z=(Y=w.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var _,ee,ae;k.parameters={...k.parameters,docs:{...(_=k.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    modelValue: 1,
    totalCount: 0
  },
  render: args => ({
    components: {
      UiPagination
    },
    setup: () => {
      const page = ref(args.modelValue);
      return {
        args,
        page
      };
    },
    template: '<UiPagination v-bind="args" v-model="page" />'
  })
}`,...(ae=(ee=k.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var te,ne,oe;z.parameters={...z.parameters,docs:{...(te=z.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiPagination,
      UiTable,
      UiEmpty
    },
    setup: () => {
      const page = ref(1);
      const pageSize = 5;
      // 가상 데이터 100건
      const allData = Array.from({
        length: 100
      }, (_, i) => ({
        id: i + 1,
        name: \`항목 #\${i + 1}\`,
        region: ['서울', '부산', '대구', '인천', '대전'][i % 5],
        total: ((i + 1) * 1234567).toLocaleString()
      }));
      const columns: TableColumn[] = [{
        key: 'id',
        label: 'ID',
        width: '80px'
      }, {
        key: 'name',
        label: '이름',
        align: 'left'
      }, {
        key: 'region',
        label: '지역'
      }, {
        key: 'total',
        label: '금액',
        align: 'right'
      }];
      const pagedData = computed(() => {
        const start = (page.value - 1) * pageSize;
        return allData.slice(start, start + pageSize);
      });
      return {
        page,
        pagedData,
        columns,
        totalCount: allData.length,
        pageSize
      };
    },
    template: \`
      <div>
        <UiTable v-if="pagedData.length > 0" :columns="columns" :data="pagedData" />
        <UiEmpty v-else />
        <div style="margin-top: 16px;">
          <UiPagination
            v-model="page"
            :total-count="totalCount"
            :page-size="pageSize"
            total-label="건"
          />
        </div>
      </div>
    \`
  })
}`,...(oe=(ne=z.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};const qe=["Playground","Default","FewPages","ManyPages","FirstPage","LastPage","Empty","WithUiTable"];export{U as Default,k as Empty,P as FewPages,x as FirstPage,w as LastPage,S as ManyPages,C as Playground,z as WithUiTable,qe as __namedExportsOrder,De as default};
