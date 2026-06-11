import{w as pe,u as ge,e as ve,f as B}from"./index-CpO9RqPZ.js";import{e as Ve,p as f,j as n,n as S,u as l,c as y,o as d,s as c,f as D,F as E,m as $,g as u,k as o,q as b,t as A,r as Ue}from"./vue.esm-bundler-UBndlgVH.js";import{g as N,h as P,l as W,m as F,o as H}from"./index-yTw_IPk6.js";import{_ as qe}from"./_plugin-vue_export-helper-DlAUqK2U.js";const xe={class:"ui-accordion-title"},ze={class:"ui-accordion-content-inner"},ke={class:"ui-accordion-title"},Ce={class:"ui-accordion-content-inner"},fe=Ve({__name:"UiAccordion",props:{items:{default:()=>[]},type:{default:"single"},modelValue:{default:void 0},defaultValue:{default:void 0},collapsible:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},size:{default:"md"}},emits:["update:modelValue","change"],setup(e,{emit:p}){const a=e,r=p,ye=y(()=>typeof a.modelValue=="string"?a.modelValue:void 0),be=y(()=>Array.isArray(a.modelValue)?a.modelValue:void 0),Ae=y(()=>typeof a.defaultValue=="string"?a.defaultValue:void 0),he=y(()=>Array.isArray(a.defaultValue)?a.defaultValue:void 0),I=s=>{r("update:modelValue",s),r("change",s)};return(s,v)=>e.type==="multiple"?(d(),f(l(H),{key:0,class:S(["ui-accordion",[`size-${e.size}`,{"is-disabled":e.disabled}]]),type:"multiple","model-value":be.value,"default-value":he.value,disabled:e.disabled,"onUpdate:modelValue":I},{default:n(()=>{var g;return[(g=e.items)!=null&&g.length?(d(!0),D(E,{key:1},$(e.items,t=>(d(),f(l(N),{key:t.value,value:t.value,disabled:t.disabled,class:"ui-accordion-item"},{default:n(()=>[u(l(P),{class:"ui-accordion-header"},{default:n(()=>[u(l(W),{class:"ui-accordion-trigger"},{default:n(()=>[o("span",xe,[c(s.$slots,"header",{item:t},()=>[b(A(t.title),1)],!0)]),v[0]||(v[0]=o("svg",{class:"ui-accordion-chevron",width:"16",height:"16",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true"},[o("path",{d:"M4 6l4 4 4-4",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1))]),_:2},1024)]),_:2},1024),u(l(F),{class:"ui-accordion-content"},{default:n(()=>[o("div",ze,[c(s.$slots,"content",{item:t},()=>[b(A(t.content),1)],!0)])]),_:2},1024)]),_:2},1032,["value","disabled"]))),128)):c(s.$slots,"default",{key:0},void 0,!0)]}),_:3},8,["class","model-value","default-value","disabled"])):(d(),f(l(H),{key:1,class:S(["ui-accordion",[`size-${e.size}`,{"is-disabled":e.disabled}]]),type:"single","model-value":ye.value,"default-value":Ae.value,collapsible:e.collapsible,disabled:e.disabled,"onUpdate:modelValue":I},{default:n(()=>{var g;return[(g=e.items)!=null&&g.length?(d(!0),D(E,{key:0},$(e.items,t=>(d(),f(l(N),{key:t.value,value:t.value,disabled:t.disabled,class:"ui-accordion-item"},{default:n(()=>[u(l(P),{class:"ui-accordion-header"},{default:n(()=>[u(l(W),{class:"ui-accordion-trigger"},{default:n(()=>[o("span",ke,[c(s.$slots,"header",{item:t},()=>[b(A(t.title),1)],!0)]),v[1]||(v[1]=o("svg",{class:"ui-accordion-chevron",width:"16",height:"16",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true"},[o("path",{d:"M4 6l4 4 4-4",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1))]),_:2},1024)]),_:2},1024),u(l(F),{class:"ui-accordion-content"},{default:n(()=>[o("div",Ce,[c(s.$slots,"content",{item:t},()=>[b(A(t.content),1)],!0)])]),_:2},1024)]),_:2},1032,["value","disabled"]))),128)):c(s.$slots,"default",{key:1},void 0,!0)]}),_:3},8,["class","model-value","default-value","collapsible","disabled"]))}}),i=qe(fe,[["__scopeId","data-v-2b2c2fa9"]]);fe.__docgenInfo={exportName:"default",displayName:"UiAccordion",description:"",tags:{},props:[{name:"items",description:"items 배열로 간단하게 렌더 (없으면 기본 슬롯 사용)",required:!1,type:{name:"Array",elements:[{name:"AccordionItemDef"}]},defaultValue:{func:!1,value:"() => []"}},{name:"type",description:"single: 하나만 열림 / multiple: 여러 개 동시 열림",required:!1,type:{name:"union",elements:[{name:'"single"'},{name:'"multiple"'}]},defaultValue:{func:!1,value:"'single'"}},{name:"modelValue",description:"v-model — single이면 string, multiple이면 string[]",required:!1,type:{name:"union",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}]}]},defaultValue:{func:!1,value:"undefined"}},{name:"defaultValue",description:"초기 열림 상태 (uncontrolled)",required:!1,type:{name:"union",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}]}]},defaultValue:{func:!1,value:"undefined"}},{name:"collapsible",description:"single 모드에서 열린 항목 다시 클릭 시 닫을 수 있는지",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"disabled",description:"전체 비활성",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",description:"크기 — sm / md(기본) / lg",required:!1,type:{name:"union",elements:[{name:'"sm"'},{name:'"md"'},{name:'"lg"'}]},defaultValue:{func:!1,value:"'md'"}}],events:[{name:"update:modelValue",type:{names:["union"],elements:[{name:"string"},{name:"Array",elements:[{name:"string"}]},{name:"undefined"}]}},{name:"change",type:{names:["union"],elements:[{name:"string"},{name:"Array",elements:[{name:"string"}]},{name:"undefined"}]}}],slots:[{name:"default"},{name:"header",scoped:!0,bindings:[{name:"item",title:"binding"}]},{name:"content",scoped:!0,bindings:[{name:"item",title:"binding"}]}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiAccordion.vue"]};const De={title:"Components/Display/UiAccordion",component:i,tags:["autodocs"],args:{"onUpdate:modelValue":B(),onChange:B()},parameters:{layout:"padded",docs:{description:{component:"\nispark-ui 표준 아코디언 — radix-vue 기반. FAQ/설정 그룹/긴 콘텐츠 접기에 사용.\n\n## API\n- **`items`** `AccordionItemDef[]` — 항목 배열 (간편 사용)\n- **`type`** `'single' | 'multiple'` — single(기본·하나만 열림) / multiple(여러 개 동시)\n- **`modelValue`** `string | string[]` — v-model (single=string, multiple=string[])\n- **`defaultValue`** `string | string[]` — 초기 열림 상태 (uncontrolled)\n- **`collapsible`** `boolean` — single에서 열린 항목 다시 클릭 시 닫기 가능 (기본 true)\n- **`disabled`** `boolean` — 전체 비활성\n- **`size`** `'sm' | 'md' | 'lg'` — md 기본\n\n## AccordionItemDef\n```ts\ninterface AccordionItemDef {\n  value: string      // 고유 식별자\n  title: string      // 헤더 텍스트\n  content?: string   // 본문 (커스텀은 #content 슬롯)\n  disabled?: boolean\n}\n```\n\n## 슬롯\n- `#header=\"{ item }\"` — 헤더 커스터마이즈 (chevron은 유지)\n- `#content=\"{ item }\"` — 본문 커스터마이즈\n- `#default` — items 미사용 시 `<AccordionItem>` 직접 작성\n\n## 이벤트\n- `update:modelValue` — v-model\n- `change` — 동일 payload 별도 emit\n\n## 접근성 (radix-vue 자동)\n- 헤더 `<h3>` + `role=\"button\"` + `aria-expanded` / `aria-controls`\n- 키보드: `Space`/`Enter` 토글, `↓`/`↑` 항목 이동, `Home`/`End` 처음/끝\n- `disabled` 항목 키보드 skip\n- `prefers-reduced-motion: reduce` 시 애니메이션 정지\n\n## 디자인 토큰\n- 상단·항목 사이 `1px solid $color-border` 구분선\n- 열린 헤더 `var(--color-primary)` + bold\n- chevron 180° 회전 + slide down/up 애니메이션\n        "}}},argTypes:{type:{control:"inline-radio",options:["single","multiple"]},size:{control:"inline-radio",options:["sm","md","lg"]},collapsible:{control:"boolean"},disabled:{control:"boolean"}}},m=[{value:"q1",title:"ispark-ui는 어디서 시작됐나요?",content:"team_agent_front 프로젝트에서 10회 이상 사용된 핵심 UI 컴포넌트를 분리해 만든 디자인 시스템 라이브러리입니다."},{value:"q2",title:"왜 적게 가져가나요?",content:'"라이브러리는 적게, 강하게." 5회 미만 사용되는 컴포넌트는 옮기지 않습니다. 라이브러리 부담만 늘기 때문입니다.'},{value:"q3",title:"스토리북은 어떻게 쓰나요?",content:"CSF3 + play 함수로 작성합니다. 스토리 하나가 문서 + 시각 회귀 + 단위 테스트 3역할을 합니다."}],h={args:{items:m,type:"single",defaultValue:"q1",collapsible:!0,size:"md"},render:e=>({components:{UiAccordion:i},setup:()=>({args:e}),template:'<UiAccordion v-bind="args" />'})},V={args:{items:m,type:"single",defaultValue:"q1"},render:e=>({components:{UiAccordion:i},setup:()=>({args:e}),template:'<UiAccordion v-bind="args" />'}),play:async({canvasElement:e,args:p})=>{const r=pe(e).getByRole("button",{name:/왜 적게/});await ge.click(r),await ve(p["onUpdate:modelValue"]).toHaveBeenCalledWith("q2")}},U={args:{items:m,type:"single",defaultValue:"q1",collapsible:!1},render:e=>({components:{UiAccordion:i},setup:()=>({args:e}),template:'<UiAccordion v-bind="args" />'})},q={args:{items:m,type:"multiple",defaultValue:["q1","q3"]},render:e=>({components:{UiAccordion:i},setup:()=>({args:e}),template:'<UiAccordion v-bind="args" />'}),play:async({canvasElement:e,args:p})=>{const r=pe(e).getByRole("button",{name:/왜 적게/});await ge.click(r),await ve(p["onUpdate:modelValue"]).toHaveBeenCalled()}},x={args:{items:[{value:"a",title:"활성 항목 A",content:"A 본문"},{value:"b",title:"비활성 항목 B (잠금)",content:"B 본문",disabled:!0},{value:"c",title:"활성 항목 C",content:"C 본문"}],type:"single"},render:e=>({components:{UiAccordion:i},setup:()=>({args:e}),template:'<UiAccordion v-bind="args" />'})},z={args:{items:m,type:"single",disabled:!0},render:e=>({components:{UiAccordion:i},setup:()=>({args:e}),template:'<UiAccordion v-bind="args" />'})},k={render:()=>({components:{UiAccordion:i},setup:()=>({items:[{value:"one",title:"첫 번째 질문",content:"첫 번째 답변입니다."},{value:"two",title:"두 번째 질문",content:"두 번째 답변입니다."}]}),template:`
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: sm</h4><UiAccordion :items="items" size="sm" default-value="one" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: md (기본)</h4><UiAccordion :items="items" size="md" default-value="one" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: lg</h4><UiAccordion :items="items" size="lg" default-value="one" /></div>
      </div>
    `})},C={render:()=>({components:{UiAccordion:i},setup:()=>({opened:Ue("q1"),faqItems:m}),template:`
      <div>
        <div style="margin-bottom: 12px; font-size: 13px; color: #6f7a93;">
          현재 열린 항목: <strong style="color: #3c69db;">{{ opened ?? '(없음)' }}</strong>
        </div>
        <UiAccordion v-model="opened" :items="faqItems" />
      </div>
    `})},w={render:()=>({components:{UiAccordion:i},setup:()=>({items:[{value:"plan",title:"플랜",content:""},{value:"team",title:"팀",content:""},{value:"billing",title:"결제",content:""}]}),template:`
      <UiAccordion :items="items" type="single" default-value="plan">
        <template #header="{ item }">
          <span style="display: inline-flex; align-items: center; gap: 8px;">
            <span style="width: 6px; height: 6px; border-radius: 999px; background: #3c69db;"></span>
            {{ item.title }}
          </span>
        </template>
        <template #content="{ item }">
          <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
            <li v-if="item.value === 'plan'">현재 플랜: Pro</li>
            <li v-if="item.value === 'plan'">다음 결제일: 2026-06-12</li>
            <li v-if="item.value === 'team'">구성원 5명</li>
            <li v-if="item.value === 'team'">초대 대기 2명</li>
            <li v-if="item.value === 'billing'">VISA •••• 4242</li>
          </ul>
        </template>
      </UiAccordion>
    `})};var M,R,j;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    items: faqItems,
    type: 'single',
    defaultValue: 'q1',
    collapsible: true,
    size: 'md'
  },
  render: args => ({
    components: {
      UiAccordion
    },
    setup: () => ({
      args
    }),
    template: '<UiAccordion v-bind="args" />'
  })
}`,...(j=(R=h.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var T,L,O;V.parameters={...V.parameters,docs:{...(T=V.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    items: faqItems,
    type: 'single',
    defaultValue: 'q1'
  },
  render: args => ({
    components: {
      UiAccordion
    },
    setup: () => ({
      args
    }),
    template: '<UiAccordion v-bind="args" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    // q2 클릭 → q1 닫히고 q2 열림
    const q2 = canvas.getByRole('button', {
      name: /왜 적게/
    });
    await userEvent.click(q2);
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('q2');
  }
}`,...(O=(L=V.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};var Q,_,G;U.parameters={...U.parameters,docs:{...(Q=U.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    items: faqItems,
    type: 'single',
    defaultValue: 'q1',
    collapsible: false
  },
  render: args => ({
    components: {
      UiAccordion
    },
    setup: () => ({
      args
    }),
    template: '<UiAccordion v-bind="args" />'
  })
}`,...(G=(_=U.parameters)==null?void 0:_.docs)==null?void 0:G.source}}};var J,K,X;q.parameters={...q.parameters,docs:{...(J=q.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    items: faqItems,
    type: 'multiple',
    defaultValue: ['q1', 'q3']
  },
  render: args => ({
    components: {
      UiAccordion
    },
    setup: () => ({
      args
    }),
    template: '<UiAccordion v-bind="args" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    // q2 추가로 열기 → 3개 모두 열림
    const q2 = canvas.getByRole('button', {
      name: /왜 적게/
    });
    await userEvent.click(q2);
    await expect(args['onUpdate:modelValue']).toHaveBeenCalled();
  }
}`,...(X=(K=q.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var Y,Z,ee;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    items: [{
      value: 'a',
      title: '활성 항목 A',
      content: 'A 본문'
    }, {
      value: 'b',
      title: '비활성 항목 B (잠금)',
      content: 'B 본문',
      disabled: true
    }, {
      value: 'c',
      title: '활성 항목 C',
      content: 'C 본문'
    }],
    type: 'single'
  },
  render: args => ({
    components: {
      UiAccordion
    },
    setup: () => ({
      args
    }),
    template: '<UiAccordion v-bind="args" />'
  })
}`,...(ee=(Z=x.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,ae,ne;z.parameters={...z.parameters,docs:{...(te=z.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    items: faqItems,
    type: 'single',
    disabled: true
  },
  render: args => ({
    components: {
      UiAccordion
    },
    setup: () => ({
      args
    }),
    template: '<UiAccordion v-bind="args" />'
  })
}`,...(ne=(ae=z.parameters)==null?void 0:ae.docs)==null?void 0:ne.source}}};var le,ie,se;k.parameters={...k.parameters,docs:{...(le=k.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiAccordion
    },
    setup: () => {
      const items: AccordionItemDef[] = [{
        value: 'one',
        title: '첫 번째 질문',
        content: '첫 번째 답변입니다.'
      }, {
        value: 'two',
        title: '두 번째 질문',
        content: '두 번째 답변입니다.'
      }];
      return {
        items
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: sm</h4><UiAccordion :items="items" size="sm" default-value="one" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: md (기본)</h4><UiAccordion :items="items" size="md" default-value="one" /></div>
        <div><h4 style="margin: 0 0 6px; color: #6f7a93; font-size: 12px;">size: lg</h4><UiAccordion :items="items" size="lg" default-value="one" /></div>
      </div>
    \`
  })
}`,...(se=(ie=k.parameters)==null?void 0:ie.docs)==null?void 0:se.source}}};var oe,re,de;C.parameters={...C.parameters,docs:{...(oe=C.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiAccordion
    },
    setup: () => {
      const opened = ref<string | undefined>('q1');
      return {
        opened,
        faqItems
      };
    },
    template: \`
      <div>
        <div style="margin-bottom: 12px; font-size: 13px; color: #6f7a93;">
          현재 열린 항목: <strong style="color: #3c69db;">{{ opened ?? '(없음)' }}</strong>
        </div>
        <UiAccordion v-model="opened" :items="faqItems" />
      </div>
    \`
  })
}`,...(de=(re=C.parameters)==null?void 0:re.docs)==null?void 0:de.source}}};var ce,ue,me;w.parameters={...w.parameters,docs:{...(ce=w.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiAccordion
    },
    setup: () => {
      const items: AccordionItemDef[] = [{
        value: 'plan',
        title: '플랜',
        content: ''
      }, {
        value: 'team',
        title: '팀',
        content: ''
      }, {
        value: 'billing',
        title: '결제',
        content: ''
      }];
      return {
        items
      };
    },
    template: \`
      <UiAccordion :items="items" type="single" default-value="plan">
        <template #header="{ item }">
          <span style="display: inline-flex; align-items: center; gap: 8px;">
            <span style="width: 6px; height: 6px; border-radius: 999px; background: #3c69db;"></span>
            {{ item.title }}
          </span>
        </template>
        <template #content="{ item }">
          <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
            <li v-if="item.value === 'plan'">현재 플랜: Pro</li>
            <li v-if="item.value === 'plan'">다음 결제일: 2026-06-12</li>
            <li v-if="item.value === 'team'">구성원 5명</li>
            <li v-if="item.value === 'team'">초대 대기 2명</li>
            <li v-if="item.value === 'billing'">VISA •••• 4242</li>
          </ul>
        </template>
      </UiAccordion>
    \`
  })
}`,...(me=(ue=w.parameters)==null?void 0:ue.docs)==null?void 0:me.source}}};const Ee=["Playground","Default","SingleNotCollapsible","Multiple","WithDisabledItem","AllDisabled","AllSizes","Controlled","WithCustomContent"];export{z as AllDisabled,k as AllSizes,C as Controlled,V as Default,q as Multiple,h as Playground,U as SingleNotCollapsible,w as WithCustomContent,x as WithDisabledItem,Ee as __namedExportsOrder,De as default};
