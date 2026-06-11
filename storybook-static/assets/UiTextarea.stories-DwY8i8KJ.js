import{w as B,u as pe,e as u,f as fe}from"./index-CpO9RqPZ.js";import{e as ve,y as be,w as ge,f as i,n as U,q as xe,t as m,l as b,k as L,c as p,r as l,H as S,z as ye,o as c}from"./vue.esm-bundler-UBndlgVH.js";import{_ as he}from"./_plugin-vue_export-helper-DlAUqK2U.js";const we=["for"],Te={key:0,class:"ui-textarea-required","aria-hidden":"true"},Re={class:"ui-textarea-wrap"},Ve=["id","value","placeholder","disabled","readonly","rows","maxlength","spellcheck","required","aria-invalid","aria-describedby"],ze={key:0,class:"ui-textarea-counter","aria-hidden":"true"},qe=["id"],Ue=["id"],le=ve({__name:"UiTextarea",props:{modelValue:{default:""},placeholder:{default:""},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},rows:{default:1},autoResize:{type:Boolean,default:!0},maxLength:{default:void 0},maxRows:{default:10},radius:{default:"base"},border:{type:Boolean,default:!0},size:{default:"md"},spellcheck:{type:Boolean,default:!0},label:{default:""},labelHidden:{type:Boolean,default:!1},required:{type:Boolean,default:!1},error:{type:Boolean,default:!1},errorMessage:{default:""},desc:{default:""},id:{default:void 0},showCounter:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(e,{expose:a,emit:o}){const t=e,f=o,oe=ye(),v=p(()=>t.id||`ui-textarea-${oe}`),C=p(()=>t.errorMessage?`${v.value}-error`:void 0),M=p(()=>t.desc&&!t.errorMessage?`${v.value}-desc`:void 0),z=p(()=>t.error||!!t.errorMessage),se=p(()=>C.value||M.value),d=l(null),ne=()=>{const r=d.value;if(!r)return 20;const n=window.getComputedStyle(r);return parseFloat(n.lineHeight)||20},q=()=>{const r=d.value;if(!r||!t.autoResize)return;r.style.height="auto";let n=r.scrollHeight;if(t.maxRows){const de=ne(),H=window.getComputedStyle(r),ie=parseFloat(H.paddingTop)||0,ce=parseFloat(H.paddingBottom)||0,me=de*t.maxRows+ie+ce;n=Math.min(n,me)}r.style.height=`${n}px`},ue=r=>{const n=r.target;f("update:modelValue",n.value),S(q)};return be(()=>{t.autoResize&&q()}),ge(()=>t.modelValue,()=>{t.autoResize&&S(q)}),a({focus:()=>{var r;return(r=d.value)==null?void 0:r.focus()},blur:()=>{var r;return(r=d.value)==null?void 0:r.blur()},el:d}),(r,n)=>(c(),i("div",{class:U(["ui-textarea-outer",{"has-label":!!e.label,"has-error":z.value,"has-desc":!!e.desc&&!e.errorMessage}])},[e.label?(c(),i("label",{key:0,for:v.value,class:U(["ui-textarea-label",{"is-hidden":e.labelHidden}])},[xe(m(e.label)+" ",1),e.required?(c(),i("span",Te,"*")):b("",!0)],10,we)):b("",!0),L("div",Re,[L("textarea",{id:v.value,ref_key:"textareaRef",ref:d,class:U(["ui-textarea",[`radius-${e.radius}`,`size-${e.size}`,{"has-border":e.border,"is-error":z.value,"has-counter":e.showCounter}]]),value:e.modelValue,placeholder:e.placeholder,disabled:e.disabled,readonly:e.readonly,rows:e.rows,maxlength:e.maxLength,spellcheck:e.spellcheck,required:e.required||void 0,"aria-invalid":z.value||void 0,"aria-describedby":se.value,onInput:ue},null,42,Ve),e.showCounter&&e.maxLength?(c(),i("span",ze,m(e.modelValue.length)+" / "+m(e.maxLength),1)):b("",!0)]),e.errorMessage?(c(),i("p",{key:1,id:C.value,class:"ui-textarea-error",role:"alert"},m(e.errorMessage),9,qe)):e.desc?(c(),i("p",{key:2,id:M.value,class:"ui-textarea-desc"},m(e.desc),9,Ue)):b("",!0)],2))}}),s=he(le,[["__scopeId","data-v-33d05b8b"]]);le.__docgenInfo={exportName:"default",displayName:"UiTextarea",description:"",tags:{},expose:[{name:"focus"},{name:"blur"},{name:"el"}],props:[{name:"modelValue",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"placeholder",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"rows",description:"초기 표시 rows. autoResize=true면 입력 따라 자동 확장 (기본 1 → autoResize로 콘텐츠 맞춤)",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"autoResize",description:"입력에 따라 scrollHeight로 자동 높이 조절. 기본 true",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"maxLength",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"undefined"}},{name:"maxRows",description:"autoResize 한계 — N줄 초과 시 scroll. 기본 10",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"10"}},{name:"radius",required:!1,type:{name:"union",elements:[{name:'"sm"'},{name:'"base"'},{name:'"lg"'}]},defaultValue:{func:!1,value:"'base'"}},{name:"border",description:"테두리 표시 (기본 false — 외부에서 wrap 스타일 입히는 경우 대비)",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"size",required:!1,type:{name:"union",elements:[{name:'"sm"'},{name:'"md"'},{name:'"lg"'}]},defaultValue:{func:!1,value:"'md'"}},{name:"spellcheck",description:"브라우저 맞춤법 밑줄. 기본 true",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"label",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"labelHidden",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"required",description:"필수 표시 — 라벨에 * 표기 + HTML required",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"error",description:"에러 상태. errorMessage가 있으면 자동 true",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"errorMessage",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"desc",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"id",description:"id 명시 — 미지정 시 useId() 자동 (SSR 안전)",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"showCounter",description:"maxLength 지정 시 우하단 'n / max' 카운터 표시. 기본 false",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"update:modelValue",type:{names:["string"]}}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiTextarea.vue"]};const He={title:"Components/Form/UiTextarea",component:s,tags:["autodocs"],args:{"onUpdate:modelValue":fe()},parameters:{docs:{description:{component:"\nispark-ui 표준 멀티라인 입력 컴포넌트. 자동 높이 조절(autoResize) + 글자수 카운터 + 폼 필드 패턴(label/error/desc).\n\n## Input vs Textarea\n- **Input** (`UiInput`) — 한 줄 텍스트. 이메일/이름/검색 등.\n- **Textarea** (이 컴포넌트) — 여러 줄. 메모/메시지/설명/주소 등. autoResize로 콘텐츠 맞춤.\n\n## API — 핵심\n- **`modelValue`** `string` — v-model\n- **`placeholder`** `string`\n- **`disabled`** / **`readonly`** `boolean`\n- **`rows`** `number` — 초기 표시 줄 수 (기본 1). autoResize=true면 콘텐츠 따라 자동 확장\n- **`autoResize`** `boolean` — 입력 따라 scrollHeight로 높이 조절 (기본 true)\n- **`maxRows`** `number` — autoResize 한계. 초과 시 scroll (기본 10)\n- **`maxLength`** `number` — 최대 글자수 (HTML maxlength)\n- **`showCounter`** `boolean` — `maxLength`와 함께 사용 시 우하단 'n / max' 카운터\n- **`size`** `'sm' | 'md' | 'lg'` — font-size + min-height\n- **`radius`** `'sm' | 'base' | 'lg'` — 4/6/8px\n- **`border`** `boolean` — 테두리 표시 (기본 true)\n- **`spellcheck`** `boolean` — 브라우저 맞춤법 밑줄 (기본 true)\n\n## API — 폼 필드 (UiInput 일관성)\n- **`label`** `string` — 라벨 텍스트. `<label htmlFor>` ↔ textarea id 자동 매칭\n- **`labelHidden`** `boolean` — 시각만 숨김(SR 노출)\n- **`required`** `boolean` — 라벨에 * + HTML required\n- **`error`** + **`errorMessage`** — 에러 상태 + role=\"alert\" 메시지 + aria-invalid\n- **`desc`** `string` — 보조 설명(errorMessage 없을 때만)\n- **`id`** `string` — 미지정 시 `useId()` 자동 (SSR 안전)\n\n## 외부 메서드\n`textareaRef.value.focus()` / `.blur()` / `.el` — `defineExpose`로 노출.\n\n## 접근성\n- `<label for>` ↔ `<textarea id>` 자동 매칭\n- `errorMessage` 시 `role=\"alert\"` + `aria-invalid=\"true\"` + `aria-describedby={errorId}`\n- `desc` 시 `aria-describedby={descId}`\n- `required` 시 HTML `required` 부여 + 라벨 별표\n- `prefers-reduced-motion: reduce` 시 transition 정지\n        "}}},argTypes:{size:{control:"inline-radio",options:["sm","md","lg"],table:{category:"Appearance",defaultValue:{summary:"'md'"}}},radius:{control:"inline-radio",options:["sm","base","lg"],table:{category:"Appearance",defaultValue:{summary:"'base'"}}},border:{control:"boolean",table:{category:"Appearance",defaultValue:{summary:"true"}}},autoResize:{control:"boolean",table:{category:"Behavior",defaultValue:{summary:"true"}}},maxRows:{control:{type:"number",min:1,max:30},table:{category:"Behavior",defaultValue:{summary:"10"}}},rows:{control:{type:"number",min:1,max:20},table:{category:"Behavior",defaultValue:{summary:"1"}}},maxLength:{control:{type:"number",min:0,max:5e3},table:{category:"Behavior"}},showCounter:{control:"boolean",table:{category:"Behavior",defaultValue:{summary:"false"}}},disabled:{control:"boolean",table:{category:"State",defaultValue:{summary:"false"}}},readonly:{control:"boolean",table:{category:"State",defaultValue:{summary:"false"}}},label:{control:"text",table:{category:"Form Field"}},labelHidden:{control:"boolean",table:{category:"Form Field"}},required:{control:"boolean",table:{category:"Form Field"}},desc:{control:"text",table:{category:"Form Field"}},errorMessage:{control:"text",table:{category:"Form Field"}},placeholder:{control:"text",table:{category:"Content"}}}},g={args:{placeholder:"내용을 입력하세요",label:"메시지",border:!0,size:"md",radius:"base",autoResize:!0,maxRows:6},render:e=>({components:{UiTextarea:s},setup:()=>{const a=l("");return{args:e,value:a}},template:'<UiTextarea v-bind="args" v-model="value" />'})},x={args:{placeholder:"여기에 입력... (입력에 따라 높이 자동 확장)",border:!0},render:e=>({components:{UiTextarea:s},setup:()=>{const a=l("");return{args:e,value:a}},template:'<UiTextarea v-bind="args" v-model="value" />'}),play:async({canvasElement:e,args:a})=>{const t=B(e).getByRole("textbox");await pe.type(t,"안녕하세요"),await u(a["onUpdate:modelValue"]).toHaveBeenCalled();const f=a["onUpdate:modelValue"].mock.calls;await u(f[f.length-1][0]).toBe("안녕하세요")}},y={args:{label:"자기소개",required:!0,desc:"본인을 소개하는 글을 자유롭게 작성해 주세요.",placeholder:"예: 안녕하세요, 5년차 프론트엔드 개발자입니다...",border:!0,maxLength:500,showCounter:!0,maxRows:8},render:e=>({components:{UiTextarea:s},setup:()=>{const a=l("");return{args:e,value:a}},template:'<UiTextarea v-bind="args" v-model="value" />'}),play:async({canvasElement:e})=>{const a=B(e),o=a.getByText(/자기소개/),t=a.getByRole("textbox");await u(o.getAttribute("for")).toBe(t.getAttribute("id")),await u(o.textContent).toContain("*"),await u(t.hasAttribute("required")).toBe(!0)}},h={args:{label:"제목",required:!0,placeholder:"제목을 입력하세요",errorMessage:"제목은 필수 항목입니다.",border:!0,desc:"이 설명은 errorMessage가 있어서 표시되지 않습니다"},render:e=>({components:{UiTextarea:s},setup:()=>{const a=l("");return{args:e,value:a}},template:'<UiTextarea v-bind="args" v-model="value" />'}),play:async({canvasElement:e})=>{const a=B(e),o=a.getByRole("textbox");await u(o.getAttribute("aria-invalid")).toBe("true");const t=a.getByRole("alert");await u(t.textContent).toContain("제목은 필수 항목입니다.")}},w={args:{label:"한 줄 소개",placeholder:"최대 100자",maxLength:100,showCounter:!0,border:!0},render:e=>({components:{UiTextarea:s},setup:()=>{const a=l("자기소개를 작성해보세요. 카운터가 입력에 따라 갱신됩니다.");return{args:e,value:a}},template:'<UiTextarea v-bind="args" v-model="value" />'})},T={args:{placeholder:"엔터로 줄을 늘려보세요",border:!0,autoResize:!0,maxRows:4},render:e=>({components:{UiTextarea:s},setup:()=>{const a=l(`한 줄 입력입니다.
두 번째 줄.
세 번째 줄.
네 번째 줄 — 여기까지 maxRows 한계.
다섯 번째 줄 → 스크롤 발생`);return{args:e,value:a}},template:'<UiTextarea v-bind="args" v-model="value" />'})},R={render:()=>({components:{UiTextarea:s},setup:()=>{const e=l("size: sm (12px font, 64px min)"),a=l("size: md (14px font, 84px min) — 기본"),o=l("size: lg (16px font, 104px min)");return{v1:e,v2:a,v3:o}},template:`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <UiTextarea v-model="v1" size="sm" border label="sm" />
        <UiTextarea v-model="v2" size="md" border label="md (기본)" />
        <UiTextarea v-model="v3" size="lg" border label="lg" />
      </div>
    `})},V={render:()=>({components:{UiTextarea:s},setup:()=>{const e=l("readonly — 선택/복사는 가능, 수정 불가"),a=l("disabled — 포커스/선택 모두 차단");return{v1:e,v2:a}},template:`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <UiTextarea v-model="v1" readonly border label="readonly" />
        <UiTextarea v-model="v2" disabled border label="disabled" />
      </div>
    `})};var k,F,A;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    placeholder: '내용을 입력하세요',
    label: '메시지',
    border: true,
    size: 'md',
    radius: 'base',
    autoResize: true,
    maxRows: 6
  },
  render: args => ({
    components: {
      UiTextarea
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiTextarea v-bind="args" v-model="value" />'
  })
}`,...(A=(F=g.parameters)==null?void 0:F.docs)==null?void 0:A.source}}};var I,E,N;x.parameters={...x.parameters,docs:{...(I=x.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    placeholder: '여기에 입력... (입력에 따라 높이 자동 확장)',
    border: true
  },
  render: args => ({
    components: {
      UiTextarea
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiTextarea v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const ta = canvas.getByRole('textbox') as HTMLTextAreaElement;
    await userEvent.type(ta, '안녕하세요');
    await expect(args['onUpdate:modelValue']).toHaveBeenCalled();
    // 마지막 콜 인자 = 누적 값
    const calls = (args['onUpdate:modelValue'] as any).mock.calls as string[][];
    await expect(calls[calls.length - 1][0]).toBe('안녕하세요');
  }
}`,...(N=(E=x.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var $,P,D;y.parameters={...y.parameters,docs:{...($=y.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    label: '자기소개',
    required: true,
    desc: '본인을 소개하는 글을 자유롭게 작성해 주세요.',
    placeholder: '예: 안녕하세요, 5년차 프론트엔드 개발자입니다...',
    border: true,
    maxLength: 500,
    showCounter: true,
    maxRows: 8
  },
  render: args => ({
    components: {
      UiTextarea
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiTextarea v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText(/자기소개/);
    const ta = canvas.getByRole('textbox');
    // label htmlFor ↔ textarea id 매칭
    await expect(label.getAttribute('for')).toBe(ta.getAttribute('id'));
    // required 별표 + HTML required
    await expect(label.textContent).toContain('*');
    await expect(ta.hasAttribute('required')).toBe(true);
  }
}`,...(D=(P=y.parameters)==null?void 0:P.docs)==null?void 0:D.source}}};var W,j,O;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: '제목',
    required: true,
    placeholder: '제목을 입력하세요',
    errorMessage: '제목은 필수 항목입니다.',
    border: true,
    desc: '이 설명은 errorMessage가 있어서 표시되지 않습니다'
  },
  render: args => ({
    components: {
      UiTextarea
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiTextarea v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const ta = canvas.getByRole('textbox');
    await expect(ta.getAttribute('aria-invalid')).toBe('true');
    const alert = canvas.getByRole('alert');
    await expect(alert.textContent).toContain('제목은 필수 항목입니다.');
  }
}`,...(O=(j=h.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var G,J,K;w.parameters={...w.parameters,docs:{...(G=w.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    label: '한 줄 소개',
    placeholder: '최대 100자',
    maxLength: 100,
    showCounter: true,
    border: true
  },
  render: args => ({
    components: {
      UiTextarea
    },
    setup: () => {
      const value = ref('자기소개를 작성해보세요. 카운터가 입력에 따라 갱신됩니다.');
      return {
        args,
        value
      };
    },
    template: '<UiTextarea v-bind="args" v-model="value" />'
  })
}`,...(K=(J=w.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Y;T.parameters={...T.parameters,docs:{...(Q=T.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    placeholder: '엔터로 줄을 늘려보세요',
    border: true,
    autoResize: true,
    maxRows: 4
  },
  render: args => ({
    components: {
      UiTextarea
    },
    setup: () => {
      const value = ref('한 줄 입력입니다.\\n두 번째 줄.\\n세 번째 줄.\\n네 번째 줄 — 여기까지 maxRows 한계.\\n다섯 번째 줄 → 스크롤 발생');
      return {
        args,
        value
      };
    },
    template: '<UiTextarea v-bind="args" v-model="value" />'
  })
}`,...(Y=(X=T.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,_,ee;R.parameters={...R.parameters,docs:{...(Z=R.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiTextarea
    },
    setup: () => {
      const v1 = ref('size: sm (12px font, 64px min)');
      const v2 = ref('size: md (14px font, 84px min) — 기본');
      const v3 = ref('size: lg (16px font, 104px min)');
      return {
        v1,
        v2,
        v3
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <UiTextarea v-model="v1" size="sm" border label="sm" />
        <UiTextarea v-model="v2" size="md" border label="md (기본)" />
        <UiTextarea v-model="v3" size="lg" border label="lg" />
      </div>
    \`
  })
}`,...(ee=(_=R.parameters)==null?void 0:_.docs)==null?void 0:ee.source}}};var ae,te,re;V.parameters={...V.parameters,docs:{...(ae=V.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiTextarea
    },
    setup: () => {
      const v1 = ref('readonly — 선택/복사는 가능, 수정 불가');
      const v2 = ref('disabled — 포커스/선택 모두 차단');
      return {
        v1,
        v2
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <UiTextarea v-model="v1" readonly border label="readonly" />
        <UiTextarea v-model="v2" disabled border label="disabled" />
      </div>
    \`
  })
}`,...(re=(te=V.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};const Le=["Playground","Default","WithFormField","Error","MaxLengthCounter","AutoResize","AllSizes","StateVariants"];export{R as AllSizes,T as AutoResize,x as Default,h as Error,w as MaxLengthCounter,g as Playground,V as StateVariants,y as WithFormField,Le as __namedExportsOrder,He as default};
