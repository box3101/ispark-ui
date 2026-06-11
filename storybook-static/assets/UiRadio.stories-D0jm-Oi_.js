import{w as M,e as u,f as U}from"./index-CpO9RqPZ.js";import{e as J,f as c,k as h,l as k,n as V,s as K,c as v,z as Q,I as X,o as b,q as Y,t as Z,r as i}from"./vue.esm-bundler-UBndlgVH.js";import{_ as ee}from"./_plugin-vue_export-helper-DlAUqK2U.js";const ae=["for"],le=["id","name","value","checked","disabled"],ne={class:"ui-radio-box","aria-hidden":"true"},ie={key:0,class:"ui-radio-dot"},F=J({__name:"UiRadio",props:{modelValue:{type:[String,Number,Boolean]},value:{type:[String,Number,Boolean]},name:{default:void 0},label:{default:""},labelHidden:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},id:{default:void 0}},emits:["update:modelValue","change"],setup(e,{emit:l}){const f=Symbol("ui-radio-group-name"),a=e,g=l,y=Q(),x=v(()=>a.id||`ui-radio-${y}`),O=X(f,void 0),L=v(()=>a.name||O||`ui-radio-${y}`),m=v(()=>a.modelValue===a.value),j=()=>{a.disabled||(g("update:modelValue",a.value),g("change",a.value))};return(R,de)=>(b(),c("label",{class:V(["ui-radio",{"is-checked":m.value,"is-disabled":e.disabled}]),for:x.value},[h("input",{id:x.value,type:"radio",class:"ui-radio-input",name:L.value,value:e.value,checked:m.value,disabled:e.disabled,onChange:j},null,40,le),h("span",ne,[m.value?(b(),c("span",ie)):k("",!0)]),e.label||R.$slots.default?(b(),c("span",{key:0,class:V(["ui-radio-label",{"is-hidden":e.labelHidden}])},[K(R.$slots,"default",{},()=>[Y(Z(e.label),1)],!0)],2)):k("",!0)],10,ae))}}),n=ee(F,[["__scopeId","data-v-8c86b71a"]]);F.__docgenInfo={exportName:"default",displayName:"UiRadio",description:"",tags:{},props:[{name:"modelValue",description:"그룹 공유 v-model 값. 이 라디오의 value와 일치하면 checked",required:!0,type:{name:"RadioValue"}},{name:"value",description:"이 라디오 고유 값 — 선택 시 modelValue에 이 값이 emit됨",required:!0,type:{name:"RadioValue"}},{name:"name",description:"같은 그룹 라디오는 동일 name 공유 (브라우저 native toggle). 미지정 시 자동 생성",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"label",description:"라벨 텍스트 (slot도 가능, slot 우선)",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"labelHidden",description:"시각만 숨김(SR 노출)",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"비활성",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"id",description:"input id 명시. 미지정 시 useId() 자동 (SSR 안전)",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"update:modelValue",type:{names:["RadioValue"]}},{name:"change",type:{names:["RadioValue"]}}],slots:[{name:"default"}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiRadio.vue"]};const re={title:"Components/Form/UiRadio",component:n,tags:["autodocs"],args:{"onUpdate:modelValue":U(),onChange:U()},parameters:{docs:{description:{component:'\nispark-ui 표준 라디오 버튼. 같은 그룹 라디오 중 **하나만** 선택 가능. 네이티브 `<input type="radio">`를 래핑.\n\n## Radio vs Checkbox vs Select\n- **Radio** (이 컴포넌트) — 2~5개 옵션 중 한 개 선택. 옵션이 한 눈에 다 보여야 할 때.\n- **Checkbox** (`UiCheckbox`) — 다중 선택, 또는 단일 boolean(약관 동의 등).\n- **Select** (`UiSelect`) — 6개 이상 옵션, 또는 폼 공간 절약 시.\n\n## API\n- **`modelValue`** `string | number | boolean` — 그룹의 현재 선택 값 (v-model)\n- **`value`** `string | number | boolean` — 이 라디오 고유 값. `modelValue === value` 일 때 checked\n- **`name`** `string` — 같은 그룹은 동일 name을 명시 권장. 미지정 시 컴포넌트당 자동 생성됨(독립 그룹)\n- **`label`** `string` 또는 default slot\n- **`labelHidden`** `boolean` — 시각만 숨김(SR 노출)\n- **`disabled`** `boolean`\n- **`id`** `string` — 명시 id. 미지정 시 `useId()` 자동\n\n## 이벤트\n- `update:modelValue` — v-model 양방향 (이 라디오의 value emit)\n- `change` — 동일 payload 별도 emit\n\n## 그룹 패턴\n같은 `v-model`을 공유하는 라디오들은 **동일한 `name` prop을 명시**하는 것을 권장한다:\n\n```vue\n<UiRadio v-model="plan" value="free"  name="plan" label="Free" />\n<UiRadio v-model="plan" value="pro"   name="plan" label="Pro" />\n<UiRadio v-model="plan" value="team"  name="plan" label="Team" />\n```\n\n`name`을 생략하면 각 라디오가 독립 그룹으로 동작(자동 name) — Vue v-model이 단일 선택을 보장하지만, 브라우저 native 그룹 동작(키보드 화살표 등)은 동일 name이 있어야 작동한다.\n\n## 접근성\n- 네이티브 `<input type="radio">` 사용 — role/포커스/스페이스/화살표 키 자동\n- `<label for>` ↔ `<input id>` 자동 매칭 (useId)\n- `:focus-visible` 시 box outline 2px primary\n- `prefers-reduced-motion: reduce` 시 트랜지션 정지\n\n## 디자인 토큰\n- 박스: 16×16px 원형 (Checkbox 16×16 사각형과 시각 구분)\n- 내부 dot: 8×8 `var(--color-primary)`\n        '}}}},d={args:{disabled:!1,labelHidden:!1},argTypes:{modelValue:{table:{disable:!0}},value:{table:{disable:!0}},label:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}}},render:e=>({components:{UiRadio:n},setup:()=>{const l=i("a");return{args:e,selected:l}},template:`
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiRadio v-model="selected" value="a" name="playground" label="옵션 A" :disabled="args.disabled" :label-hidden="args.labelHidden" />
        <UiRadio v-model="selected" value="b" name="playground" label="옵션 B" :disabled="args.disabled" :label-hidden="args.labelHidden" />
        <UiRadio v-model="selected" value="c" name="playground" label="옵션 C" :disabled="args.disabled" :label-hidden="args.labelHidden" />
        <pre style="margin-top: 8px; padding: 10px; background: #f4f7f9; border-radius: 6px; font-size: 11px; color: #4d5462;">선택: {{ selected }}</pre>
      </div>
    `})},o={args:{value:"pro",label:"Pro 플랜"},render:e=>({components:{UiRadio:n},setup:()=>{const l=i("");return{args:e,selected:l}},template:'<UiRadio v-bind="args" v-model="selected" />'}),play:async({canvasElement:e,args:l})=>{const a=M(e).getByRole("radio");await u(a.checked).toBe(!1),a.click(),await u(l["onUpdate:modelValue"]).toHaveBeenCalledWith("pro"),await u(l.onChange).toHaveBeenCalledWith("pro")}},t={render:()=>({components:{UiRadio:n},setup:()=>({payment:i("card")}),template:`
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiRadio v-model="payment" value="card" name="payment" label="신용/체크카드" />
        <UiRadio v-model="payment" value="bank" name="payment" label="계좌이체" />
        <UiRadio v-model="payment" value="kakao" name="payment" label="카카오페이" />
        <UiRadio v-model="payment" value="naver" name="payment" label="네이버페이" />
        <pre style="margin-top: 8px; padding: 10px; background: #f4f7f9; border-radius: 6px; font-size: 11px; color: #4d5462;">선택: {{ payment }}</pre>
      </div>
    `})},s={render:()=>({components:{UiRadio:n},setup:()=>({visibility:i("team")}),template:`
      <div style="display: flex; gap: 20px; align-items: center;">
        <UiRadio v-model="visibility" value="public" name="vis" label="전체 공개" />
        <UiRadio v-model="visibility" value="team" name="vis" label="팀 공개" />
        <UiRadio v-model="visibility" value="private" name="vis" label="비공개" />
      </div>
    `})},r={render:()=>({components:{UiRadio:n},setup:()=>({plan:i("free")}),template:`
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiRadio v-model="plan" value="free" name="plan" label="Free — 개인" />
        <UiRadio v-model="plan" value="pro" name="plan" label="Pro — 개인 ($9/월)" />
        <UiRadio v-model="plan" value="team" name="plan" :disabled="true">
          Team ($29/월) — <span style="color: #b91c1c; font-size: 12px;">관리자 권한 필요</span>
        </UiRadio>
      </div>
    `})},p={render:()=>({components:{UiRadio:n},setup:()=>({choice:i("paid")}),template:`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <UiRadio v-model="choice" value="paid" name="c">
          유료 플랜 <span style="color: #15803d; font-weight: 600; font-size: 12px; padding: 1px 8px; background: rgba(34,197,94,0.12); border-radius: 999px; margin-left: 6px;">추천</span>
        </UiRadio>
        <UiRadio v-model="choice" value="free" name="c">
          무료 플랜 <span style="color: #6f7a93; font-size: 12px; margin-left: 6px;">제한 기능</span>
        </UiRadio>
      </div>
    `})};var C,S,H;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    disabled: false,
    labelHidden: false
  },
  argTypes: {
    // 그룹 데모라 단일 라디오 props는 Controls에서 숨김
    modelValue: {
      table: {
        disable: true
      }
    },
    value: {
      table: {
        disable: true
      }
    },
    label: {
      table: {
        disable: true
      }
    },
    name: {
      table: {
        disable: true
      }
    },
    id: {
      table: {
        disable: true
      }
    }
  } as never,
  render: args => ({
    components: {
      UiRadio
    },
    setup: () => {
      const selected = ref<string>('a');
      return {
        args,
        selected
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiRadio v-model="selected" value="a" name="playground" label="옵션 A" :disabled="args.disabled" :label-hidden="args.labelHidden" />
        <UiRadio v-model="selected" value="b" name="playground" label="옵션 B" :disabled="args.disabled" :label-hidden="args.labelHidden" />
        <UiRadio v-model="selected" value="c" name="playground" label="옵션 C" :disabled="args.disabled" :label-hidden="args.labelHidden" />
        <pre style="margin-top: 8px; padding: 10px; background: #f4f7f9; border-radius: 6px; font-size: 11px; color: #4d5462;">선택: {{ selected }}</pre>
      </div>
    \`
  })
}`,...(H=(S=d.parameters)==null?void 0:S.docs)==null?void 0:H.source}}};var w,B,z;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    value: 'pro',
    label: 'Pro 플랜'
  },
  render: args => ({
    components: {
      UiRadio
    },
    setup: () => {
      const selected = ref<string>('');
      return {
        args,
        selected
      };
    },
    template: '<UiRadio v-bind="args" v-model="selected" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole('radio') as HTMLInputElement;
    await expect(radio.checked).toBe(false);
    radio.click();
    // update:modelValue에 value('pro') emit
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('pro');
    await expect(args.onChange).toHaveBeenCalledWith('pro');
  }
}`,...(z=(B=o.parameters)==null?void 0:B.docs)==null?void 0:z.source}}};var I,_,N;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiRadio
    },
    setup: () => {
      const payment = ref('card');
      return {
        payment
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiRadio v-model="payment" value="card" name="payment" label="신용/체크카드" />
        <UiRadio v-model="payment" value="bank" name="payment" label="계좌이체" />
        <UiRadio v-model="payment" value="kakao" name="payment" label="카카오페이" />
        <UiRadio v-model="payment" value="naver" name="payment" label="네이버페이" />
        <pre style="margin-top: 8px; padding: 10px; background: #f4f7f9; border-radius: 6px; font-size: 11px; color: #4d5462;">선택: {{ payment }}</pre>
      </div>
    \`
  })
}`,...(N=(_=t.parameters)==null?void 0:_.docs)==null?void 0:N.source}}};var P,q,$;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiRadio
    },
    setup: () => {
      const visibility = ref<'public' | 'private' | 'team'>('team');
      return {
        visibility
      };
    },
    template: \`
      <div style="display: flex; gap: 20px; align-items: center;">
        <UiRadio v-model="visibility" value="public" name="vis" label="전체 공개" />
        <UiRadio v-model="visibility" value="team" name="vis" label="팀 공개" />
        <UiRadio v-model="visibility" value="private" name="vis" label="비공개" />
      </div>
    \`
  })
}`,...($=(q=s.parameters)==null?void 0:q.docs)==null?void 0:$.source}}};var T,D,E;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiRadio
    },
    setup: () => {
      const plan = ref('free');
      return {
        plan
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiRadio v-model="plan" value="free" name="plan" label="Free — 개인" />
        <UiRadio v-model="plan" value="pro" name="plan" label="Pro — 개인 ($9/월)" />
        <UiRadio v-model="plan" value="team" name="plan" :disabled="true">
          Team ($29/월) — <span style="color: #b91c1c; font-size: 12px;">관리자 권한 필요</span>
        </UiRadio>
      </div>
    \`
  })
}`,...(E=(D=r.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var G,W,A;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiRadio
    },
    setup: () => {
      const choice = ref('paid');
      return {
        choice
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <UiRadio v-model="choice" value="paid" name="c">
          유료 플랜 <span style="color: #15803d; font-weight: 600; font-size: 12px; padding: 1px 8px; background: rgba(34,197,94,0.12); border-radius: 999px; margin-left: 6px;">추천</span>
        </UiRadio>
        <UiRadio v-model="choice" value="free" name="c">
          무료 플랜 <span style="color: #6f7a93; font-size: 12px; margin-left: 6px;">제한 기능</span>
        </UiRadio>
      </div>
    \`
  })
}`,...(A=(W=p.parameters)==null?void 0:W.docs)==null?void 0:A.source}}};const pe=["Playground","Default","VerticalGroup","HorizontalGroup","WithDisabledOption","SlotLabel"];export{o as Default,s as HorizontalGroup,d as Playground,p as SlotLabel,t as VerticalGroup,r as WithDisabledOption,pe as __namedExportsOrder,re as default};
