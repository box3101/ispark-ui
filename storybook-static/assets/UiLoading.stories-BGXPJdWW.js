import{w as R,e as p}from"./index-CpO9RqPZ.js";import{e as P,f as m,k as q,t as F,l as M,n as j,o as u,r as A}from"./vue.esm-bundler-UBndlgVH.js";import{_ as G}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{a as H,U as J}from"./UiTable-DPL9AmJl.js";import{U as O}from"./UiButton-Cb1n7GIR.js";import"./UiSelect-0m-Wx2_9.js";import"./index-yTw_IPk6.js";const K=["aria-label"],Q={key:0,class:"ui-loading-text"},I=P({__name:"UiLoading",props:{text:{default:"불러오는 중..."},overlay:{type:Boolean,default:!1}},setup(t){return(s,a)=>(u(),m("div",{class:j(["ui-loading",{"is-overlay":t.overlay}]),role:"status","aria-live":"polite","aria-label":t.text?void 0:"로딩 중"},[a[0]||(a[0]=q("div",{class:"ui-loading-spinner","aria-hidden":"true"},null,-1)),t.text?(u(),m("p",Q,F(t.text),1)):M("",!0)],10,K))}}),e=G(I,[["__scopeId","data-v-68d603e4"]]);I.__docgenInfo={exportName:"default",displayName:"UiLoading",description:"",tags:{},props:[{name:"text",description:"로딩 텍스트. 빈 문자열이면 텍스트 미렌더 + aria-label='로딩 중'로 SR 안내",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'불러오는 중...'"}},{name:"overlay",description:"오버레이(dim) 모드 — viewport 전체 fixed + 반투명 dim",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiLoading.vue"]};const it={title:"Components/Feedback/UiLoading",component:e,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:'\nispark-ui 표준 로딩 인디케이터. 응답 대기 중인 비동기 상태를 시각화한다.\n\n## Empty vs Loading vs Error — 비동기 상태 3종\n- **Loading** (이 컴포넌트) — 응답 대기 중. 결과를 알 수 없는 transient 상태.\n- **Empty** (`UiEmpty`) — 정상 응답이지만 데이터가 0건.\n- **Error** — 서버/네트워크 실패. 에러 컴포넌트 + 재시도 버튼.\n\n세 상태를 한 영역에서 `v-if`로 분기하는 패턴은 `EmptyVsLoading` 스토리 참고.\n\n## 모드\n- **inline** (기본) — 영역 안 `flex: 1; min-height: 200px` 자리표시. 페이지/패널 안에서 사용.\n- **overlay** (`overlay: true`) — viewport 전체 `position: fixed` + 반투명 dim. 작업 전체 차단 시 사용 (저장/업로드 등).\n\n## 접근성\n- 루트 `<div role="status" aria-live="polite">` — 스크린리더가 로딩 시작/끝을 polite하게 announce\n- spinner는 장식 → `aria-hidden="true"` 자동\n- `text`가 비면 `aria-label="로딩 중"` fallback으로 SR 보장\n- `prefers-reduced-motion: reduce` 시 spinner 애니메이션 정지 (vestibular 안전)\n\n## API\n- **`text`** `string` — 표시 텍스트. 기본 `\'불러오는 중...\'`. 빈 문자열이면 미렌더 + aria-label 자동\n- **`overlay`** `boolean` — 전체 화면 dim 모드. 기본 `false`\n        '}}},argTypes:{text:{control:"text",description:"표시 텍스트. 빈 문자열이면 미렌더 + aria-label fallback.",table:{category:"Content",type:{summary:"string"},defaultValue:{summary:"'불러오는 중...'"}}},overlay:{control:"boolean",description:"viewport 전체 fixed + dim 모드. 작업 전체 차단 시 사용.",table:{category:"Mode",type:{summary:"boolean"},defaultValue:{summary:"false"}}}}},i={args:{text:"불러오는 중...",overlay:!1},render:t=>({components:{UiLoading:e},setup:()=>({args:t}),template:'<UiLoading v-bind="args" />'})},o={args:{},render:t=>({components:{UiLoading:e},setup:()=>({args:t}),template:'<UiLoading v-bind="args" />'}),play:async({canvasElement:t})=>{const s=R(t),a=s.getByRole("status");await p(a.getAttribute("aria-live")).toBe("polite"),await p(s.getByText("불러오는 중...")).toBeTruthy()}},n={args:{text:"데이터를 저장하는 중입니다..."},render:t=>({components:{UiLoading:e},setup:()=>({args:t}),template:'<UiLoading v-bind="args" />'})},r={args:{text:""},render:t=>({components:{UiLoading:e},setup:()=>({args:t}),template:'<UiLoading v-bind="args" />'}),play:async({canvasElement:t})=>{const a=R(t).getByRole("status");await p(a.getAttribute("aria-label")).toBe("로딩 중")}},l={render:()=>({components:{UiLoading:e,UiButton:O},setup:()=>{const t=A(!1);return{isLoading:t,start:()=>{t.value=!0,setTimeout(()=>{t.value=!1},2e3)}}},template:`
      <div style="padding: 40px; text-align: center;">
        <UiButton variant="primary" @click="start">2초 동안 오버레이 표시</UiButton>
        <p style="margin-top: 12px; color: #6f7a93; font-size: 13px;">
          전체 화면을 dim으로 가리고 spinner 표시.<br/>
          저장/업로드 등 작업 전체 차단 시 사용.
        </p>
        <UiLoading v-if="isLoading" text="처리 중..." overlay />
      </div>
    `})},c={render:()=>({components:{UiLoading:e,UiEmpty:J,UiTable:H,UiButton:O},setup:()=>{const t=A("empty");return{state:t,columns:[{key:"name",label:"이름",align:"left"},{key:"region",label:"지역"},{key:"total",label:"합계",align:"right"}],data:[{name:"케이블 플랫폼 매출",region:"대전",total:"44,865,368,290"},{name:"SO 매출",region:"부산",total:"31,256,890,450"}],fetchData:()=>{t.value="loading",setTimeout(()=>{t.value="data"},1500)},reset:()=>{t.value="empty"}}},template:`
      <div>
        <div style="margin-bottom: 16px; display: flex; gap: 8px; align-items: center;">
          <span style="font-size: 13px; color: #4d5462;">현재 상태:</span>
          <strong style="font-size: 13px; color: #3c69db;">{{ state }}</strong>
          <UiButton size="sm" variant="ghost" @click="state = 'empty'">empty</UiButton>
          <UiButton size="sm" variant="ghost" @click="state = 'loading'">loading</UiButton>
          <UiButton size="sm" variant="ghost" @click="state = 'data'">data</UiButton>
        </div>

        <UiLoading v-if="state === 'loading'" text="조회 중..." />
        <UiTable v-else-if="state === 'data'" :columns="columns" :data="data" />
        <UiEmpty
          v-else
          icon="icon-search"
          title="조회된 데이터가 없습니다."
          description="조회 버튼을 눌러 데이터를 불러오세요."
        >
          <UiButton variant="primary" size="sm" @click="fetchData">데이터 불러오기 (1.5초)</UiButton>
        </UiEmpty>

        <div v-if="state !== 'empty'" style="margin-top: 12px;">
          <UiButton variant="ghost" size="sm" @click="reset">초기화</UiButton>
        </div>
      </div>
    `})},d={parameters:{layout:"centered"},render:()=>({components:{UiLoading:e},template:'<UiLoading style="min-height: 120px;" />'})};var g,v,y;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    text: '불러오는 중...',
    overlay: false
  },
  render: args => ({
    components: {
      UiLoading
    },
    setup: () => ({
      args
    }),
    template: '<UiLoading v-bind="args" />'
  })
}`,...(y=(v=i.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var f,U,x;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {},
  render: args => ({
    components: {
      UiLoading
    },
    setup: () => ({
      args
    }),
    template: '<UiLoading v-bind="args" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // a11y: role=status + aria-live=polite
    const status = canvas.getByRole('status');
    await expect(status.getAttribute('aria-live')).toBe('polite');
    await expect(canvas.getByText('불러오는 중...')).toBeTruthy();
  }
}`,...(x=(U=o.parameters)==null?void 0:U.docs)==null?void 0:x.source}}};var b,B,L;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    text: '데이터를 저장하는 중입니다...'
  },
  render: args => ({
    components: {
      UiLoading
    },
    setup: () => ({
      args
    }),
    template: '<UiLoading v-bind="args" />'
  })
}`,...(L=(B=n.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var h,k,E;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    text: ''
  },
  render: args => ({
    components: {
      UiLoading
    },
    setup: () => ({
      args
    }),
    template: '<UiLoading v-bind="args" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByRole('status');
    // 텍스트 없으면 aria-label로 fallback
    await expect(status.getAttribute('aria-label')).toBe('로딩 중');
  }
}`,...(E=(k=r.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var T,z,S;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiLoading,
      UiButton
    },
    setup: () => {
      const isLoading = ref(false);
      const start = () => {
        isLoading.value = true;
        setTimeout(() => {
          isLoading.value = false;
        }, 2000);
      };
      return {
        isLoading,
        start
      };
    },
    template: \`
      <div style="padding: 40px; text-align: center;">
        <UiButton variant="primary" @click="start">2초 동안 오버레이 표시</UiButton>
        <p style="margin-top: 12px; color: #6f7a93; font-size: 13px;">
          전체 화면을 dim으로 가리고 spinner 표시.<br/>
          저장/업로드 등 작업 전체 차단 시 사용.
        </p>
        <UiLoading v-if="isLoading" text="처리 중..." overlay />
      </div>
    \`
  })
}`,...(S=(z=l.parameters)==null?void 0:z.docs)==null?void 0:S.source}}};var w,_,C;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiLoading,
      UiEmpty,
      UiTable,
      UiButton
    },
    setup: () => {
      type State = 'empty' | 'loading' | 'data';
      const state = ref<State>('empty');
      const columns: TableColumn[] = [{
        key: 'name',
        label: '이름',
        align: 'left'
      }, {
        key: 'region',
        label: '지역'
      }, {
        key: 'total',
        label: '합계',
        align: 'right'
      }];
      const data = [{
        name: '케이블 플랫폼 매출',
        region: '대전',
        total: '44,865,368,290'
      }, {
        name: 'SO 매출',
        region: '부산',
        total: '31,256,890,450'
      }];
      const fetchData = () => {
        state.value = 'loading';
        setTimeout(() => {
          state.value = 'data';
        }, 1500);
      };
      const reset = () => {
        state.value = 'empty';
      };
      return {
        state,
        columns,
        data,
        fetchData,
        reset
      };
    },
    template: \`
      <div>
        <div style="margin-bottom: 16px; display: flex; gap: 8px; align-items: center;">
          <span style="font-size: 13px; color: #4d5462;">현재 상태:</span>
          <strong style="font-size: 13px; color: #3c69db;">{{ state }}</strong>
          <UiButton size="sm" variant="ghost" @click="state = 'empty'">empty</UiButton>
          <UiButton size="sm" variant="ghost" @click="state = 'loading'">loading</UiButton>
          <UiButton size="sm" variant="ghost" @click="state = 'data'">data</UiButton>
        </div>

        <UiLoading v-if="state === 'loading'" text="조회 중..." />
        <UiTable v-else-if="state === 'data'" :columns="columns" :data="data" />
        <UiEmpty
          v-else
          icon="icon-search"
          title="조회된 데이터가 없습니다."
          description="조회 버튼을 눌러 데이터를 불러오세요."
        >
          <UiButton variant="primary" size="sm" @click="fetchData">데이터 불러오기 (1.5초)</UiButton>
        </UiEmpty>

        <div v-if="state !== 'empty'" style="margin-top: 12px;">
          <UiButton variant="ghost" size="sm" @click="reset">초기화</UiButton>
        </div>
      </div>
    \`
  })
}`,...(C=(_=c.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};var D,V,N;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    layout: 'centered'
  },
  render: () => ({
    components: {
      UiLoading
    },
    template: '<UiLoading style="min-height: 120px;" />'
  })
}`,...(N=(V=d.parameters)==null?void 0:V.docs)==null?void 0:N.source}}};const ot=["Playground","Default","CustomText","NoText","Overlay","EmptyVsLoading","Showcase"];export{n as CustomText,o as Default,c as EmptyVsLoading,r as NoText,l as Overlay,i as Playground,d as Showcase,ot as __namedExportsOrder,it as default};
