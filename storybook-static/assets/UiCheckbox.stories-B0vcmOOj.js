import{w as C,e as d,f as w}from"./index-CpO9RqPZ.js";import{e as Y,y as Z,w as _,f as u,k as m,l as B,n as S,s as ee,c as y,r as o,z as ae,o as p,q as te,t as le}from"./vue.esm-bundler-UBndlgVH.js";import{_ as ne}from"./_plugin-vue_export-helper-DlAUqK2U.js";const oe=["for"],se=["id","checked","disabled"],ce={class:"ui-checkbox-box","aria-hidden":"true"},de={key:0,class:"ui-checkbox-icon",width:"12",height:"12",viewBox:"0 0 12 12",fill:"none"},re={key:1,class:"ui-checkbox-icon",width:"12",height:"12",viewBox:"0 0 12 12",fill:"none"},Q=Y({__name:"UiCheckbox",props:{modelValue:{type:Boolean},label:{default:""},labelHidden:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},indeterminate:{type:Boolean,default:!1},id:{default:void 0}},emits:["update:modelValue","change"],setup(e,{emit:a}){const t=e,l=a,U=ae(),c=y(()=>t.id||`ui-checkbox-${U}`),r=o(null),V=n=>{r.value&&(r.value.indeterminate=n)};Z(()=>V(t.indeterminate)),_(()=>t.indeterminate,n=>V(n));const X=()=>{if(t.disabled)return;const n=!t.modelValue;l("update:modelValue",n),l("change",n)};return(n,i)=>(p(),u("label",{class:S(["ui-checkbox",{"is-checked":e.modelValue,"is-indeterminate":e.indeterminate&&!e.modelValue,"is-disabled":e.disabled}]),for:c.value},[m("input",{id:c.value,ref_key:"inputRef",ref:r,type:"checkbox",class:"ui-checkbox-input",checked:e.modelValue,disabled:e.disabled,onChange:X},null,40,se),m("span",ce,[e.modelValue&&!e.indeterminate?(p(),u("svg",de,[...i[0]||(i[0]=[m("path",{d:"M2.5 6L5 8.5L9.5 3.5",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)])])):e.indeterminate?(p(),u("svg",re,[...i[1]||(i[1]=[m("path",{d:"M2.5 6H9.5",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},null,-1)])])):B("",!0)]),e.label||n.$slots.default?(p(),u("span",{key:0,class:S(["ui-checkbox-label",{"is-hidden":e.labelHidden}])},[ee(n.$slots,"default",{},()=>[te(le(e.label),1)],!0)],2)):B("",!0)],10,oe))}}),s=ne(Q,[["__scopeId","data-v-a7725066"]]);Q.__docgenInfo={exportName:"default",displayName:"UiCheckbox",description:"",tags:{},props:[{name:"modelValue",required:!0,type:{name:"boolean"}},{name:"label",description:"라벨 텍스트. slot도 가능.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"labelHidden",description:"시각만 숨김(SR에는 노출)",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"비활성 — 클릭 차단",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"indeterminate",description:`부분 체크(mixed) 상태. modelValue=false일 때만 시각적으로 dash 표시.
주로 트리/리스트의 부분 선택 헤더 체크박스에 사용 (예: UiTable 전체 선택 컬럼).`,required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"id",description:"id 명시 — 미지정 시 useId() 자동 생성 (SSR 안전)",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"update:modelValue",type:{names:["boolean"]}},{name:"change",type:{names:["boolean"]}}],slots:[{name:"default"}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiCheckbox.vue"]};const pe={title:"Components/Form/UiCheckbox",component:s,tags:["autodocs"],args:{"onUpdate:modelValue":w(),onChange:w()},parameters:{docs:{description:{component:'\nispark-ui 표준 체크박스. 네이티브 `<input type="checkbox">`를 시각 박스로 래핑한 폼 필드.\n\n## Checkbox vs Toggle\n- **Checkbox** (이 컴포넌트) — 폼 제출/적용 시점이 별도. 약관 동의·다중 선택·필터 조건 등.\n- **Toggle** (`UiToggle`) — 즉시 효과. 알림 켜기/끄기 등 설정 옵션.\n\n## API\n- **`modelValue`** `boolean` — v-model. true=체크, false=언체크\n- **`indeterminate`** `boolean` — 부분 체크(mixed). `modelValue=false`일 때만 시각적으로 dash 표시. 예: UiTable 헤더 \'전체 선택\' 컬럼 — 일부만 선택된 상태\n- **`disabled`** `boolean` — 비활성\n- **`label`** `string` 또는 default `slot` — 라벨. label prop과 slot 둘 다 가능 (slot 우선)\n- **`labelHidden`** `boolean` — 시각만 숨김(SR 노출)\n- **`id`** `string` — 명시 id. 미지정 시 `useId()` 자동\n\n## 이벤트\n- `update:modelValue` — v-model 양방향\n- `change` — 동일 payload 별도 emit\n\n## 접근성\n- 네이티브 `<input type="checkbox">` 사용 → 역할/포커스/키보드(Space) 자동\n- `indeterminate`는 HTML attribute가 아닌 **DOM property** — 내부에서 `watch`로 `el.indeterminate` 설정\n- `<label for>` ↔ `<input id>` 자동 매칭 (useId)\n- 키보드 포커스 시 box에 outline 2px primary (`:focus-visible`)\n- `prefers-reduced-motion: reduce` 시 트랜지션 정지\n\n## 디자인 토큰\n- 박스: 16×16px / border 1.5px / radius 4px (Toggle 트랙 32×20과 시각 구분)\n- on bg: `var(--color-primary)` — 테마 전환 대응\n        '}}}},b={args:{modelValue:!1,label:"동의합니다",disabled:!1,indeterminate:!1,labelHidden:!1},render:e=>({components:{UiCheckbox:s},setup:()=>{const a=o(e.modelValue);return{args:e,value:a}},template:'<UiCheckbox v-bind="args" v-model="value" />'})},v={args:{label:"약관에 동의합니다"},render:e=>({components:{UiCheckbox:s},setup:()=>{const a=o(!1);return{args:e,value:a}},template:'<UiCheckbox v-bind="args" v-model="value" />'}),play:async({canvasElement:e,args:a})=>{const l=C(e).getByRole("checkbox");await d(l.checked).toBe(!1),l.click(),await d(a["onUpdate:modelValue"]).toHaveBeenCalledWith(!0),await d(a.onChange).toHaveBeenCalledWith(!0)}},h={render:()=>({components:{UiCheckbox:s},setup:()=>({value:o(!1)}),template:`
      <UiCheckbox v-model="value">
        <span>
          <a href="#" style="color: #3c69db; text-decoration: underline;">이용약관</a> 및
          <a href="#" style="color: #3c69db; text-decoration: underline;">개인정보처리방침</a>에 동의합니다
        </span>
      </UiCheckbox>
    `})},f={args:{label:"잠긴 옵션 (관리자만 변경 가능)",disabled:!0},render:e=>({components:{UiCheckbox:s},setup:()=>{const a=o(!0);return{args:e,value:a}},template:'<UiCheckbox v-bind="args" v-model="value" />'}),play:async({canvasElement:e,args:a})=>{const l=C(e).getByRole("checkbox");await d(l.disabled).toBe(!0),l.click(),await d(a["onUpdate:modelValue"]).not.toHaveBeenCalled()}},k={args:{label:"부분 선택 (mixed)",modelValue:!1,indeterminate:!0},render:e=>({components:{UiCheckbox:s},setup:()=>{const a=o(e.modelValue);return{args:e,value:a}},template:'<UiCheckbox v-bind="args" v-model="value" />'}),play:async({canvasElement:e})=>{const t=C(e).getByRole("checkbox");await d(t.indeterminate).toBe(!0)}},g={render:()=>({components:{UiCheckbox:s},setup:()=>{const e=o([{id:1,label:"이메일 #1",checked:!1},{id:2,label:"이메일 #2",checked:!1},{id:3,label:"이메일 #3",checked:!1},{id:4,label:"이메일 #4",checked:!1}]),a=y(()=>e.value.filter(c=>c.checked).length),t=y(()=>a.value===e.value.length),l=y(()=>a.value>0&&a.value<e.value.length);return{items:e,allChecked:t,indeterminate:l,checkedCount:a,onSelectAll:c=>{e.value.forEach(r=>r.checked=c)}}},template:`
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 320px;">
        <div style="padding-bottom: 8px; border-bottom: 1px solid #ecf0f3;">
          <UiCheckbox
            :model-value="allChecked"
            :indeterminate="indeterminate"
            @update:model-value="onSelectAll"
          >
            <strong>전체 선택</strong>
            <span style="color: #6f7a93; margin-left: 6px;">({{ checkedCount }}/{{ items.length }})</span>
          </UiCheckbox>
        </div>
        <UiCheckbox
          v-for="item in items"
          :key="item.id"
          v-model="item.checked"
          :label="item.label"
        />
      </div>
    `})},x={args:{label:"이메일 알림 수신 동의",labelHidden:!0},render:e=>({components:{UiCheckbox:s},setup:()=>{const a=o(!1);return{args:e,value:a}},template:`
      <div style="display: inline-flex; align-items: center; gap: 8px;">
        <span style="color: #4d5462; font-size: 13px;">이메일 알림 (라벨은 SR에만 노출)</span>
        <UiCheckbox v-bind="args" v-model="value" />
      </div>
    `})};var H,I,E;b.parameters={...b.parameters,docs:{...(H=b.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    modelValue: false,
    label: '동의합니다',
    disabled: false,
    indeterminate: false,
    labelHidden: false
  },
  render: args => ({
    components: {
      UiCheckbox
    },
    setup: () => {
      const value = ref(args.modelValue);
      return {
        args,
        value
      };
    },
    template: '<UiCheckbox v-bind="args" v-model="value" />'
  })
}`,...(E=(I=b.parameters)==null?void 0:I.docs)==null?void 0:E.source}}};var R,T,L;v.parameters={...v.parameters,docs:{...(R=v.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: '약관에 동의합니다'
  },
  render: args => ({
    components: {
      UiCheckbox
    },
    setup: () => {
      const value = ref(false);
      return {
        args,
        value
      };
    },
    template: '<UiCheckbox v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const cb = canvas.getByRole('checkbox');
    await expect((cb as HTMLInputElement).checked).toBe(false);
    cb.click();
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith(true);
    await expect(args.onChange).toHaveBeenCalledWith(true);
  }
}`,...(L=(T=v.parameters)==null?void 0:T.docs)==null?void 0:L.source}}};var A,M,q;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiCheckbox
    },
    setup: () => {
      const value = ref(false);
      return {
        value
      };
    },
    template: \`
      <UiCheckbox v-model="value">
        <span>
          <a href="#" style="color: #3c69db; text-decoration: underline;">이용약관</a> 및
          <a href="#" style="color: #3c69db; text-decoration: underline;">개인정보처리방침</a>에 동의합니다
        </span>
      </UiCheckbox>
    \`
  })
}`,...(q=(M=h.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var D,N,P;f.parameters={...f.parameters,docs:{...(D=f.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: '잠긴 옵션 (관리자만 변경 가능)',
    disabled: true
  },
  render: args => ({
    components: {
      UiCheckbox
    },
    setup: () => {
      const value = ref(true);
      return {
        args,
        value
      };
    },
    template: '<UiCheckbox v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const cb = canvas.getByRole('checkbox') as HTMLInputElement;
    await expect(cb.disabled).toBe(true);
    cb.click();
    // disabled native — 브라우저가 change 자체를 발생 안 시킴
    await expect(args['onUpdate:modelValue']).not.toHaveBeenCalled();
  }
}`,...(P=(N=f.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var z,W,O;k.parameters={...k.parameters,docs:{...(z=k.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: '부분 선택 (mixed)',
    modelValue: false,
    indeterminate: true
  },
  render: args => ({
    components: {
      UiCheckbox
    },
    setup: () => {
      const value = ref(args.modelValue);
      return {
        args,
        value
      };
    },
    template: '<UiCheckbox v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const cb = canvas.getByRole('checkbox') as HTMLInputElement;
    // indeterminate는 DOM property — attribute 아님
    await expect(cb.indeterminate).toBe(true);
  }
}`,...(O=(W=k.parameters)==null?void 0:W.docs)==null?void 0:O.source}}};var $,F,j;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiCheckbox
    },
    setup: () => {
      const items = ref([{
        id: 1,
        label: '이메일 #1',
        checked: false
      }, {
        id: 2,
        label: '이메일 #2',
        checked: false
      }, {
        id: 3,
        label: '이메일 #3',
        checked: false
      }, {
        id: 4,
        label: '이메일 #4',
        checked: false
      }]);
      const checkedCount = computed(() => items.value.filter(i => i.checked).length);
      const allChecked = computed(() => checkedCount.value === items.value.length);
      const indeterminate = computed(() => checkedCount.value > 0 && checkedCount.value < items.value.length);
      const onSelectAll = (next: boolean) => {
        items.value.forEach(i => i.checked = next);
      };
      return {
        items,
        allChecked,
        indeterminate,
        checkedCount,
        onSelectAll
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 320px;">
        <div style="padding-bottom: 8px; border-bottom: 1px solid #ecf0f3;">
          <UiCheckbox
            :model-value="allChecked"
            :indeterminate="indeterminate"
            @update:model-value="onSelectAll"
          >
            <strong>전체 선택</strong>
            <span style="color: #6f7a93; margin-left: 6px;">({{ checkedCount }}/{{ items.length }})</span>
          </UiCheckbox>
        </div>
        <UiCheckbox
          v-for="item in items"
          :key="item.id"
          v-model="item.checked"
          :label="item.label"
        />
      </div>
    \`
  })
}`,...(j=(F=g.parameters)==null?void 0:F.docs)==null?void 0:j.source}}};var G,J,K;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    label: '이메일 알림 수신 동의',
    labelHidden: true
  },
  render: args => ({
    components: {
      UiCheckbox
    },
    setup: () => {
      const value = ref(false);
      return {
        args,
        value
      };
    },
    template: \`
      <div style="display: inline-flex; align-items: center; gap: 8px;">
        <span style="color: #4d5462; font-size: 13px;">이메일 알림 (라벨은 SR에만 노출)</span>
        <UiCheckbox v-bind="args" v-model="value" />
      </div>
    \`
  })
}`,...(K=(J=x.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const be=["Playground","Default","SlotLabel","Disabled","Indeterminate","SelectAllPattern","LabelHidden"];export{v as Default,f as Disabled,k as Indeterminate,x as LabelHidden,b as Playground,g as SelectAllPattern,h as SlotLabel,be as __namedExportsOrder,pe as default};
