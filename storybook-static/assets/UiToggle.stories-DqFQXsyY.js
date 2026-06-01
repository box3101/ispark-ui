import{w as b,e as s,u as f,f as h}from"./index-CpO9RqPZ.js";import{e as P,f as w,n as m,t as J,l as $,k as x,c as G,z as K,o as k,r as o}from"./vue.esm-bundler-UBndlgVH.js";import{_ as Q}from"./_plugin-vue_export-helper-DlAUqK2U.js";const X=["for"],Y=["id","aria-checked","aria-disabled","disabled"],D=P({__name:"UiToggle",props:{modelValue:{type:Boolean},disabled:{type:Boolean,default:!1},label:{default:""},labelHidden:{type:Boolean,default:!1},id:{default:void 0}},emits:["update:modelValue","change"],setup(e,{emit:a}){const l=e,t=a,M=K(),v=G(()=>l.id||`ui-toggle-${M}`),O=()=>{if(l.disabled)return;const p=!l.modelValue;t("update:modelValue",p),t("change",p)};return(p,y)=>(k(),w("div",{class:m(["ui-toggle-wrap",{"has-label":!!e.label}])},[e.label?(k(),w("label",{key:0,for:v.value,class:m(["ui-toggle-label",{"is-hidden":e.labelHidden}])},J(e.label),11,X)):$("",!0),x("button",{id:v.value,type:"button",class:m(["ui-toggle",{"is-active":e.modelValue,"is-disabled":e.disabled}]),role:"switch","aria-checked":e.modelValue,"aria-disabled":e.disabled||void 0,disabled:e.disabled,onClick:O},[...y[0]||(y[0]=[x("span",{class:"ui-toggle-thumb","aria-hidden":"true"},null,-1)])],10,Y)],2))}}),n=Q(D,[["__scopeId","data-v-740076d0"]]);D.__docgenInfo={exportName:"default",displayName:"UiToggle",description:"",tags:{},props:[{name:"modelValue",required:!0,type:{name:"boolean"}},{name:"disabled",description:"비활성 — 클릭/키보드 토글 차단",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"label",description:"라벨 텍스트 (label htmlFor → button id 자동 매칭)",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"labelHidden",description:"라벨을 시각적으로만 숨김 (SR에는 노출)",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"id",description:"id 명시 — 미지정 시 useId() 자동 생성 (SSR 안전)",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"update:modelValue",type:{names:["boolean"]}},{name:"change",type:{names:["boolean"]}}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiToggle.vue"]};const ae={title:"Components/Form/UiToggle",component:n,tags:["autodocs"],args:{"onUpdate:modelValue":h(),onChange:h()},parameters:{docs:{description:{component:'\nispark-ui 표준 on/off 스위치 컴포넌트. `role="switch"` + `aria-checked` 기반의 접근 가능한 토글.\n\n## 언제 사용하나\n- 설정 화면의 on/off 옵션 (알림/다크모드/공개여부 등)\n- 폼 안의 단일 boolean 입력 (한 줄 라벨 + 토글 패턴)\n\n## Checkbox vs Toggle\n- **Checkbox** — 폼 제출 시점에 함께 적용되는 선택 (예: 약관 동의)\n- **Toggle** — 토글 즉시 효과가 적용되는 옵션 (예: 알림 켜기/끄기)\n\n## API\n- **`modelValue`** `boolean` — v-model 바인딩 (required)\n- **`disabled`** `boolean` — 비활성. 클릭/포커스/키보드 모두 차단\n- **`label`** `string` — 라벨 텍스트. `<label htmlFor>`로 button과 자동 연결\n- **`labelHidden`** `boolean` — 라벨을 시각적으로만 숨김(SR에는 노출). a11y 보장하면서 컴팩트 UI 가능\n- **`id`** `string` — 명시 id. 미지정 시 `useId()` 자동 생성 (SSR 안전)\n\n## 이벤트\n- `update:modelValue` — v-model 양방향\n- `change` — 동일 payload 별도 emit (편의)\n\n## 접근성\n- `role="switch"` + `aria-checked` 동기화 — SR이 "스위치, 켜짐/꺼짐"으로 announce\n- `disabled` 시 `aria-disabled` + native `disabled` 둘 다 부여\n- `<label htmlFor>` 자동 매칭 — 라벨 클릭으로도 토글\n- `:focus-visible`에 outline 2px primary — 키보드 사용자 명확\n- `prefers-reduced-motion: reduce` 시 thumb 트랜지션 정지\n\n## 디자인 토큰\n- 트랙 크기: 32×20px 고정 (사용처가 단일 사이즈로 충분)\n- off bg: `$color-border` / on bg: `var(--color-primary)` — 테마 전환 대응\n        '}}}},i={args:{modelValue:!1,disabled:!1,label:"알림 받기"},render:e=>({components:{UiToggle:n},setup:()=>{const a=o(e.modelValue);return{args:e,value:a}},template:'<UiToggle v-bind="args" v-model="value" />'})},r={args:{},render:e=>({components:{UiToggle:n},setup:()=>{const a=o(!1);return{args:e,value:a}},template:'<UiToggle v-bind="args" v-model="value" />'}),play:async({canvasElement:e,args:a})=>{const t=b(e).getByRole("switch");await s(t.getAttribute("aria-checked")).toBe("false"),await f.click(t),await s(a["onUpdate:modelValue"]).toHaveBeenCalledWith(!0),await s(a.onChange).toHaveBeenCalledWith(!0)}},d={args:{label:"이메일 알림"},render:e=>({components:{UiToggle:n},setup:()=>{const a=o(!0);return{args:e,value:a}},template:'<UiToggle v-bind="args" v-model="value" />'}),play:async({canvasElement:e})=>{const a=b(e),l=a.getByText("이메일 알림"),t=a.getByRole("switch");await s(l.getAttribute("for")).toBe(t.getAttribute("id")),await f.click(l),await s(t.getAttribute("aria-checked")).toBe("false")}},c={args:{label:"다크 모드 켜기",labelHidden:!0},render:e=>({components:{UiToggle:n},setup:()=>{const a=o(!1);return{args:e,value:a}},template:'<UiToggle v-bind="args" v-model="value" />'})},u={args:{disabled:!0,label:"관리자 전용 (잠금)"},render:e=>({components:{UiToggle:n},setup:()=>{const a=o(!0);return{args:e,value:a}},template:'<UiToggle v-bind="args" v-model="value" />'}),play:async({canvasElement:e,args:a})=>{const t=b(e).getByRole("switch");await s(t.hasAttribute("disabled")).toBe(!0),await s(t.getAttribute("aria-disabled")).toBe("true"),await f.click(t),await s(a["onUpdate:modelValue"]).not.toHaveBeenCalled()}},g={render:()=>({components:{UiToggle:n},setup:()=>({settings:o({emailNotify:!0,pushNotify:!1,marketing:!1,darkMode:!0})}),template:`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">이메일 알림</span>
          <UiToggle v-model="settings.emailNotify" label="이메일 알림" label-hidden />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">푸시 알림</span>
          <UiToggle v-model="settings.pushNotify" label="푸시 알림" label-hidden />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">마케팅 정보 수신</span>
          <UiToggle v-model="settings.marketing" label="마케팅" label-hidden />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">다크 모드</span>
          <UiToggle v-model="settings.darkMode" label="다크 모드" label-hidden />
        </div>
        <pre style="margin-top: 8px; padding: 10px; background: #f4f7f9; border-radius: 6px; font-size: 11px; color: #4d5462;">{{ JSON.stringify(settings, null, 2) }}</pre>
      </div>
    `})};var U,T,B;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    modelValue: false,
    disabled: false,
    label: '알림 받기'
  },
  render: args => ({
    components: {
      UiToggle
    },
    setup: () => {
      const value = ref(args.modelValue);
      return {
        args,
        value
      };
    },
    template: '<UiToggle v-bind="args" v-model="value" />'
  })
}`,...(B=(T=i.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var V,S,C;r.parameters={...r.parameters,docs:{...(V=r.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {},
  render: args => ({
    components: {
      UiToggle
    },
    setup: () => {
      const value = ref(false);
      return {
        args,
        value
      };
    },
    template: '<UiToggle v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const sw = canvas.getByRole('switch');
    // 초기 aria-checked=false
    await expect(sw.getAttribute('aria-checked')).toBe('false');
    // 클릭 → emit + aria-checked=true
    await userEvent.click(sw);
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith(true);
    await expect(args.onChange).toHaveBeenCalledWith(true);
  }
}`,...(C=(S=r.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var H,N,A;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    label: '이메일 알림'
  },
  render: args => ({
    components: {
      UiToggle
    },
    setup: () => {
      const value = ref(true);
      return {
        args,
        value
      };
    },
    template: '<UiToggle v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('이메일 알림');
    const sw = canvas.getByRole('switch');
    // label htmlFor와 switch id 매칭
    await expect(label.getAttribute('for')).toBe(sw.getAttribute('id'));
    // 라벨 클릭으로도 토글 가능 (htmlFor 매칭 검증)
    await userEvent.click(label);
    await expect(sw.getAttribute('aria-checked')).toBe('false');
  }
}`,...(A=(N=d.parameters)==null?void 0:N.docs)==null?void 0:A.source}}};var z,E,R;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: '다크 모드 켜기',
    labelHidden: true
  },
  render: args => ({
    components: {
      UiToggle
    },
    setup: () => {
      const value = ref(false);
      return {
        args,
        value
      };
    },
    template: '<UiToggle v-bind="args" v-model="value" />'
  })
}`,...(R=(E=c.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var j,I,F;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: '관리자 전용 (잠금)'
  },
  render: args => ({
    components: {
      UiToggle
    },
    setup: () => {
      const value = ref(true);
      return {
        args,
        value
      };
    },
    template: '<UiToggle v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const sw = canvas.getByRole('switch');
    await expect(sw.hasAttribute('disabled')).toBe(true);
    await expect(sw.getAttribute('aria-disabled')).toBe('true');
    // disabled 클릭은 emit 발생 안 함
    await userEvent.click(sw);
    await expect(args['onUpdate:modelValue']).not.toHaveBeenCalled();
  }
}`,...(F=(I=u.parameters)==null?void 0:I.docs)==null?void 0:F.source}}};var q,L,W;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiToggle
    },
    setup: () => {
      const settings = ref({
        emailNotify: true,
        pushNotify: false,
        marketing: false,
        darkMode: true
      });
      return {
        settings
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">이메일 알림</span>
          <UiToggle v-model="settings.emailNotify" label="이메일 알림" label-hidden />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">푸시 알림</span>
          <UiToggle v-model="settings.pushNotify" label="푸시 알림" label-hidden />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">마케팅 정보 수신</span>
          <UiToggle v-model="settings.marketing" label="마케팅" label-hidden />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: #4d5462;">다크 모드</span>
          <UiToggle v-model="settings.darkMode" label="다크 모드" label-hidden />
        </div>
        <pre style="margin-top: 8px; padding: 10px; background: #f4f7f9; border-radius: 6px; font-size: 11px; color: #4d5462;">{{ JSON.stringify(settings, null, 2) }}</pre>
      </div>
    \`
  })
}`,...(W=(L=g.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};const te=["Playground","Default","WithLabel","LabelHidden","Disabled","SettingsList"];export{r as Default,u as Disabled,c as LabelHidden,i as Playground,g as SettingsList,d as WithLabel,te as __namedExportsOrder,ae as default};
