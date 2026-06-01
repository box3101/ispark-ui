import{w as Y,u as w,e as U,f as B}from"./index-CpO9RqPZ.js";import{e as se,f as u,k as A,F as ie,m as ne,n as z,o as m,l as C,t as I,H as re,r}from"./vue.esm-bundler-UBndlgVH.js";import{_ as oe}from"./_plugin-vue_export-helper-DlAUqK2U.js";const ce=["aria-label"],de=["aria-selected","aria-disabled","tabindex","disabled","onClick"],ue={class:"ui-tab-item-label"},me={key:1,class:"ui-tab-item-count","aria-hidden":"true"},Z=se({__name:"UiTab",props:{modelValue:{},tabs:{},size:{default:"md"},align:{default:"center"},ariaLabel:{default:""}},emits:["update:modelValue","change"],setup(e,{emit:t}){const s=e,o=t,v=r([]),b=(i,n)=>{v.value[n]=i},ae=i=>{i.disabled||i.value!==s.modelValue&&(o("update:modelValue",i.value),o("change",i.value))},te=i=>{const n=v.value[i];n&&n.focus()},V=(i,n)=>{var l;const a=s.tabs.length;for(let c=1;c<=a;c++){const k=(i+n*c+a)%a;if(!((l=s.tabs[k])!=null&&l.disabled))return k}return i},le=i=>{const n=s.tabs.findIndex(l=>l.value===s.modelValue);if(n<0)return;let a=n;switch(i.key){case"ArrowRight":a=V(n,1);break;case"ArrowLeft":a=V(n,-1);break;case"Home":{const l=s.tabs.findIndex(c=>!c.disabled);l>=0&&(a=l);break}case"End":{for(let l=s.tabs.length-1;l>=0;l--)if(!s.tabs[l].disabled){a=l;break}break}default:return}if(a!==n){i.preventDefault();const l=s.tabs[a];o("update:modelValue",l.value),o("change",l.value),re(()=>te(a))}};return(i,n)=>(m(),u("div",{class:z(["ui-tab",[`size-${e.size}`,`align-${e.align}`]])},[A("div",{class:"ui-tab-inner",role:"tablist","aria-label":e.ariaLabel||void 0,onKeydown:le},[(m(!0),u(ie,null,ne(e.tabs,(a,l)=>(m(),u("button",{key:a.value,ref_for:!0,ref:c=>b(c,l),type:"button",role:"tab",class:z(["ui-tab-item",{"is-active":e.modelValue===a.value,"is-disabled":a.disabled}]),"aria-selected":e.modelValue===a.value,"aria-disabled":a.disabled||void 0,tabindex:e.modelValue===a.value?0:-1,disabled:a.disabled,onClick:c=>ae(a)},[a.icon?(m(),u("i",{key:0,class:z([a.icon,"size-16"]),"aria-hidden":"true"},null,2)):C("",!0),A("span",ue,I(a.label),1),a.count!=null?(m(),u("span",me,I(a.count),1)):C("",!0)],10,de))),128))],40,ce)],2))}}),d=oe(Z,[["__scopeId","data-v-0e5c2c34"]]);Z.__docgenInfo={exportName:"default",displayName:"UiTab",description:"",tags:{},props:[{name:"modelValue",required:!0,type:{name:"string"}},{name:"tabs",required:!0,type:{name:"Array",elements:[{name:"TabItem"}]}},{name:"size",description:"탭 크기 — sm(36px) / md(40px·기본) / lg(48px)",required:!1,type:{name:"union",elements:[{name:'"sm"'},{name:'"md"'},{name:'"lg"'}]},defaultValue:{func:!1,value:"'md'"}},{name:"align",description:"정렬 — left / center(기본 max-width 800px) / right / stretch(균등 분할)",required:!1,type:{name:"union",elements:[{name:'"left"'},{name:'"center"'},{name:'"right"'},{name:'"stretch"'}]},defaultValue:{func:!1,value:"'center'"}},{name:"ariaLabel",description:'role="tablist"의 aria-label',required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}}],events:[{name:"update:modelValue",type:{names:["string"]}},{name:"change",type:{names:["string"]}}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiTab.vue"]};const ge={title:"Components/Navigation/UiTab",component:d,tags:["autodocs"],args:{"onUpdate:modelValue":B(),onChange:B()},parameters:{layout:"padded",docs:{description:{component:"\nispark-ui 표준 탭 — 페이지/모달 내부 콘텐츠 네비게이션. underline 스타일 + 키보드 화살표 네비.\n\n## API\n- **`modelValue`** `string` — 현재 선택된 탭 value (v-model)\n- **`tabs`** `TabItem[]` — 탭 정의 배열\n- **`size`** `'sm' | 'md' | 'lg'` — sm(36px) / md(40px·기본) / lg(48px)\n- **`align`** `'left' | 'center' | 'right' | 'stretch'` — center(기본 max-width 800)/left/right/stretch(균등 분할)\n- **`ariaLabel`** `string` — `<div role=\"tablist\">`의 aria-label\n\n## TabItem\n```ts\ninterface TabItem {\n  label: string\n  value: string\n  icon?: string       // ispark-ui 아이콘 클래스 (예: 'icon-edit')\n  count?: number      // 우측 카운트 배지 (미확인 N건 등)\n  disabled?: boolean\n}\n```\n\n## 이벤트\n- `update:modelValue` — v-model\n- `change` — 동일 payload 별도 emit\n\n## 접근성\n- `role=\"tablist\"` + 각 탭에 `role=\"tab\"` + `aria-selected` 자동\n- `disabled` 시 `aria-disabled` + native disabled\n- **키보드 네비**: ←/→/Home/End — 비활성 탭 자동 skip, 포커스+선택 동시 변경 (자동 활성화 패턴)\n- `tabindex`: 활성 0 / 비활성 -1 (roving tabindex)\n- `:focus-visible` outline 2px primary\n- `prefers-reduced-motion: reduce` 시 transition 정지\n\n## 디자인 토큰\n- 하단 underline 2px primary 색\n- count 배지: 활성 시 primary 색조, 비활성 시 회색 — Badge primary 0.12 alpha와 동일\n        "}}},argTypes:{size:{control:"inline-radio",options:["sm","md","lg"]},align:{control:"inline-radio",options:["left","center","right","stretch"]},ariaLabel:{control:"text"}}},ee=[{label:"개요",value:"overview"},{label:"활동",value:"activity"},{label:"설정",value:"settings"}],p={args:{tabs:ee,modelValue:"overview",size:"md",align:"left"},render:e=>({components:{UiTab:d},setup:()=>{const t=r(e.modelValue);return{args:e,cur:t}},template:'<UiTab v-bind="args" v-model="cur" />'})},g={args:{tabs:ee,modelValue:"overview"},render:e=>({components:{UiTab:d},setup:()=>{const t=r(e.modelValue);return{args:e,cur:t}},template:'<UiTab v-bind="args" v-model="cur" />'}),play:async({canvasElement:e,args:t})=>{const o=Y(e).getByRole("tab",{name:"활동"});await w.click(o),await U(t["onUpdate:modelValue"]).toHaveBeenCalledWith("activity")}},f={args:{tabs:[{label:"받은편지함",value:"inbox",icon:"icon-download",count:12},{label:"보낸편지함",value:"sent",icon:"icon-arrow-right",count:3},{label:"휴지통",value:"trash",icon:"icon-trashcan"}],modelValue:"inbox",align:"left"},render:e=>({components:{UiTab:d},setup:()=>{const t=r(e.modelValue);return{args:e,cur:t}},template:'<UiTab v-bind="args" v-model="cur" />'})},h={args:{tabs:[{label:"개요",value:"overview"},{label:"활동 (잠금)",value:"activity",disabled:!0},{label:"설정",value:"settings"},{label:"권한 (잠금)",value:"perm",disabled:!0},{label:"로그",value:"log"}],modelValue:"overview",align:"left"},render:e=>({components:{UiTab:d},setup:()=>{const t=r(e.modelValue);return{args:e,cur:t}},template:'<UiTab v-bind="args" v-model="cur" />'}),play:async({canvasElement:e,args:t})=>{const s=Y(e);s.getByRole("tablist");const o=s.getByRole("tab",{name:"개요"});await w.click(o),await w.keyboard("{ArrowRight}"),await U(t["onUpdate:modelValue"]).toHaveBeenCalledWith("settings");const v=s.getByRole("tab",{name:/활동/});await w.click(v);const b=t["onUpdate:modelValue"].mock.calls;await U(b[b.length-1][0]).not.toBe("activity")}},x={render:()=>({components:{UiTab:d},setup:()=>{const e=r("a"),t=r("a"),s=r("a");return{v1:e,v2:t,v3:s,tabs:[{label:"Alpha",value:"a"},{label:"Beta",value:"b"},{label:"Gamma",value:"g"}]}},template:`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: sm</h4><UiTab v-model="v1" :tabs="tabs" size="sm" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: md (기본)</h4><UiTab v-model="v2" :tabs="tabs" size="md" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: lg</h4><UiTab v-model="v3" :tabs="tabs" size="lg" align="left" /></div>
      </div>
    `})},y={render:()=>({components:{UiTab:d},setup:()=>({v:r("a"),tabs:[{label:"One",value:"a"},{label:"Two",value:"b"},{label:"Three",value:"c"}]}),template:`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">left</h4><UiTab v-model="v" :tabs="tabs" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">center (기본, max-width 800)</h4><UiTab v-model="v" :tabs="tabs" align="center" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">right</h4><UiTab v-model="v" :tabs="tabs" align="right" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">stretch — 균등 분할</h4><UiTab v-model="v" :tabs="tabs" align="stretch" /></div>
      </div>
    `})},T={render:()=>({components:{UiTab:d},setup:()=>({cur:r("overview"),tabs:[{label:"개요",value:"overview"},{label:"활동",value:"activity",count:5},{label:"설정",value:"settings"}]}),template:`
      <div>
        <UiTab v-model="cur" :tabs="tabs" align="left" aria-label="프로필 섹션" />
        <div role="tabpanel" style="padding: 16px; min-height: 120px;">
          <div v-if="cur === 'overview'">
            <h3 style="margin: 0 0 8px;">개요</h3>
            <p style="color: #4d5462; font-size: 14px;">사용자 프로필 요약 정보가 표시됩니다.</p>
          </div>
          <div v-else-if="cur === 'activity'">
            <h3 style="margin: 0 0 8px;">최근 활동 (5건)</h3>
            <p style="color: #4d5462; font-size: 14px;">로그인, 문서 편집, 댓글 등 활동 내역.</p>
          </div>
          <div v-else>
            <h3 style="margin: 0 0 8px;">설정</h3>
            <p style="color: #4d5462; font-size: 14px;">알림, 비밀번호, 권한 등 환경 설정.</p>
          </div>
        </div>
      </div>
    `})};var E,R,S;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    tabs: baseTabs,
    modelValue: 'overview',
    size: 'md',
    align: 'left'
  },
  render: args => ({
    components: {
      UiTab
    },
    setup: () => {
      const cur = ref(args.modelValue);
      return {
        args,
        cur
      };
    },
    template: '<UiTab v-bind="args" v-model="cur" />'
  })
}`,...(S=(R=p.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var W,_,H;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    tabs: baseTabs,
    modelValue: 'overview'
  },
  render: args => ({
    components: {
      UiTab
    },
    setup: () => {
      const cur = ref(args.modelValue);
      return {
        args,
        cur
      };
    },
    template: '<UiTab v-bind="args" v-model="cur" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getByRole('tab', {
      name: '활동'
    });
    await userEvent.click(tab);
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('activity');
  }
}`,...(H=(_=g.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};var L,N,D;f.parameters={...f.parameters,docs:{...(L=f.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    tabs: [{
      label: '받은편지함',
      value: 'inbox',
      icon: 'icon-download',
      count: 12
    }, {
      label: '보낸편지함',
      value: 'sent',
      icon: 'icon-arrow-right',
      count: 3
    }, {
      label: '휴지통',
      value: 'trash',
      icon: 'icon-trashcan'
    }],
    modelValue: 'inbox',
    align: 'left'
  },
  render: args => ({
    components: {
      UiTab
    },
    setup: () => {
      const cur = ref(args.modelValue);
      return {
        args,
        cur
      };
    },
    template: '<UiTab v-bind="args" v-model="cur" />'
  })
}`,...(D=(N=f.parameters)==null?void 0:N.docs)==null?void 0:D.source}}};var q,F,O;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    tabs: [{
      label: '개요',
      value: 'overview'
    }, {
      label: '활동 (잠금)',
      value: 'activity',
      disabled: true
    }, {
      label: '설정',
      value: 'settings'
    }, {
      label: '권한 (잠금)',
      value: 'perm',
      disabled: true
    }, {
      label: '로그',
      value: 'log'
    }],
    modelValue: 'overview',
    align: 'left'
  },
  render: args => ({
    components: {
      UiTab
    },
    setup: () => {
      const cur = ref(args.modelValue);
      return {
        args,
        cur
      };
    },
    template: '<UiTab v-bind="args" v-model="cur" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const tablist = canvas.getByRole('tablist');
    // 첫 탭 클릭 → ArrowRight → 비활성 'activity' skip → 'settings'
    const first = canvas.getByRole('tab', {
      name: '개요'
    });
    await userEvent.click(first);
    await userEvent.keyboard('{ArrowRight}');
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('settings');
    // disabled 항목 클릭 무시
    const disabled = canvas.getByRole('tab', {
      name: /활동/
    });
    await userEvent.click(disabled);
    const calls = (args['onUpdate:modelValue'] as any).mock.calls as string[][];
    // 마지막 호출이 'activity'가 아니어야 함
    await expect(calls[calls.length - 1][0]).not.toBe('activity');
  }
}`,...(O=(F=h.parameters)==null?void 0:F.docs)==null?void 0:O.source}}};var P,$,G;x.parameters={...x.parameters,docs:{...(P=x.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiTab
    },
    setup: () => {
      const v1 = ref('a');
      const v2 = ref('a');
      const v3 = ref('a');
      const tabs = [{
        label: 'Alpha',
        value: 'a'
      }, {
        label: 'Beta',
        value: 'b'
      }, {
        label: 'Gamma',
        value: 'g'
      }];
      return {
        v1,
        v2,
        v3,
        tabs
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: sm</h4><UiTab v-model="v1" :tabs="tabs" size="sm" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: md (기본)</h4><UiTab v-model="v2" :tabs="tabs" size="md" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: lg</h4><UiTab v-model="v3" :tabs="tabs" size="lg" align="left" /></div>
      </div>
    \`
  })
}`,...(G=($=x.parameters)==null?void 0:$.docs)==null?void 0:G.source}}};var K,j,J;y.parameters={...y.parameters,docs:{...(K=y.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiTab
    },
    setup: () => {
      const v = ref('a');
      const tabs = [{
        label: 'One',
        value: 'a'
      }, {
        label: 'Two',
        value: 'b'
      }, {
        label: 'Three',
        value: 'c'
      }];
      return {
        v,
        tabs
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">left</h4><UiTab v-model="v" :tabs="tabs" align="left" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">center (기본, max-width 800)</h4><UiTab v-model="v" :tabs="tabs" align="center" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">right</h4><UiTab v-model="v" :tabs="tabs" align="right" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">stretch — 균등 분할</h4><UiTab v-model="v" :tabs="tabs" align="stretch" /></div>
      </div>
    \`
  })
}`,...(J=(j=y.parameters)==null?void 0:j.docs)==null?void 0:J.source}}};var M,Q,X;T.parameters={...T.parameters,docs:{...(M=T.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiTab
    },
    setup: () => {
      const cur = ref('overview');
      const tabs: TabItem[] = [{
        label: '개요',
        value: 'overview'
      }, {
        label: '활동',
        value: 'activity',
        count: 5
      }, {
        label: '설정',
        value: 'settings'
      }];
      return {
        cur,
        tabs
      };
    },
    template: \`
      <div>
        <UiTab v-model="cur" :tabs="tabs" align="left" aria-label="프로필 섹션" />
        <div role="tabpanel" style="padding: 16px; min-height: 120px;">
          <div v-if="cur === 'overview'">
            <h3 style="margin: 0 0 8px;">개요</h3>
            <p style="color: #4d5462; font-size: 14px;">사용자 프로필 요약 정보가 표시됩니다.</p>
          </div>
          <div v-else-if="cur === 'activity'">
            <h3 style="margin: 0 0 8px;">최근 활동 (5건)</h3>
            <p style="color: #4d5462; font-size: 14px;">로그인, 문서 편집, 댓글 등 활동 내역.</p>
          </div>
          <div v-else>
            <h3 style="margin: 0 0 8px;">설정</h3>
            <p style="color: #4d5462; font-size: 14px;">알림, 비밀번호, 권한 등 환경 설정.</p>
          </div>
        </div>
      </div>
    \`
  })
}`,...(X=(Q=T.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};const fe=["Playground","Default","WithIconAndCount","WithDisabledItem","AllSizes","AllAlignments","WithContent"];export{y as AllAlignments,x as AllSizes,g as Default,p as Playground,T as WithContent,h as WithDisabledItem,f as WithIconAndCount,fe as __namedExportsOrder,ge as default};
