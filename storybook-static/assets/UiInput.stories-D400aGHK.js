import{f as B}from"./index-CpO9RqPZ.js";import{e as aa,E as la,f as v,n as N,s as A,l as w,k as x,G as na,D as ta,t as H,v as ra,r as i,c as p,H as Y,z as ia,o as g,q as sa}from"./vue.esm-bundler-UBndlgVH.js";import{_ as oa}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{a as da,I as pa}from"./size-BPCnLhUJ.js";const ua=["for"],ca={key:0,class:"ui-input-required","aria-hidden":"true"},ma={key:0,class:"ui-input-icon is-left"},fa=["id","type","role","inputmode","value","placeholder","disabled","readonly","required","autocomplete","name","maxlength","aria-describedby","aria-invalid"],ha=["disabled","aria-label"],va=["aria-label"],ga={key:4,class:"ui-input-icon is-right"},ya=["id"],ba=["id"],Oe=aa({inheritAttrs:!1,__name:"UiInput",props:{modelValue:{default:""},type:{default:"text"},label:{default:""},labelHidden:{type:Boolean,default:!1},error:{type:Boolean,default:!1},errorMessage:{default:""},placeholder:{default:""},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},autocomplete:{default:void 0},name:{default:void 0},id:{default:void 0},maxLength:{default:void 0},min:{default:void 0},max:{default:void 0},step:{default:void 0},size:{default:"md"},iconSize:{},shape:{default:"rounded"},desc:{default:""},numberOnly:{type:Boolean,default:!1},allowDecimal:{type:Boolean,default:!1},allowNegative:{type:Boolean,default:!1},decimals:{default:void 0},clearable:{type:Boolean,default:!1},showPasswordToggle:{type:Boolean,default:!1},searchAriaLabel:{default:"검색"}},emits:["update:modelValue","enter","search","clear"],setup(n,{expose:s,emit:a}){const e=n,u=a,f=i(),c=i(!1),b=i(!1),I=i(!1),ke=p(()=>e.type==="search"||e.type==="password"&&I.value?"text":e.type),F=p(()=>(e.clearable||e.type==="search")&&!!e.modelValue&&!e.disabled&&!e.readonly),X=p(()=>e.showPasswordToggle&&e.type==="password"&&!e.disabled),z=la(),Ce=p(()=>{const{class:l,style:t,...o}=z;return o}),Te=p(()=>z.class),Re=p(()=>z.style??void 0),Pe=ia(),V=p(()=>e.id||`ui-input-${Pe}`),j=p(()=>e.desc?`${V.value}-desc`:void 0),K=p(()=>e.errorMessage?`${V.value}-error`:void 0),P=p(()=>e.error||!!e.errorMessage),De=p(()=>K.value||j.value),Be=p(()=>{if(P.value)return"true";const l=z["aria-invalid"];if(l!=null)return typeof l=="boolean"||l==="true"||l==="false"||l==="grammar"||l==="spelling"?l:l?"true":"false"}),Ae=p(()=>{if(e.numberOnly)return e.allowDecimal||e.allowNegative?"decimal":"numeric"}),D=p(()=>{const l=e.decimals;if(l!==void 0&&Number.isInteger(l)&&l>=0)return l}),U=l=>{if(typeof e.modelValue=="number"){if(l===""||l==="-")return l;const t=parseFloat(l);if(!Number.isNaN(t))return t}return l},W=l=>{let t="0-9";e.allowDecimal&&(t+="."),e.allowNegative&&(t+="-");const o=new RegExp(`[^${t}]`,"g");let r=l.replace(o,"");if(e.allowNegative){const d=r.startsWith("-");r=r.replace(/-/g,""),d&&(r="-"+r)}if(e.allowDecimal){const d=r.indexOf(".");if(d!==-1){const y=r.slice(0,d);let h=r.slice(d+1).replace(/\./g,"");D.value!==void 0&&(h=h.slice(0,D.value)),r=h===""&&y===""?"":y+"."+h}}return r},He=l=>{const t=l.trim();if(t==="")return"";const o=W(t);if(o===""||o==="-")return o;let r=parseFloat(o);if(Number.isNaN(r))return o;const d=e.min!==void 0?Number(e.min):void 0,y=e.max!==void 0?Number(e.max):void 0,h=e.step!==void 0?Number(e.step):void 0;if(d!==void 0&&!Number.isNaN(d)&&(r=Math.max(r,d)),y!==void 0&&!Number.isNaN(y)&&(r=Math.min(r,y)),h!==void 0&&h>0&&!Number.isNaN(h)){const G=d!==void 0&&!Number.isNaN(d)?d:0;r=G+Math.round((r-G)/h)*h,d!==void 0&&!Number.isNaN(d)&&(r=Math.max(r,d)),y!==void 0&&!Number.isNaN(y)&&(r=Math.min(r,y));const Ye=(String(e.step).split(".")[1]||"").length,_e=(String(e.min??"").split(".")[1]||"").length,J=Math.max(Ye,_e,e.allowDecimal?2:0),Q=D.value,ea=Q!==void 0?Math.min(J,Q):J;r=Number(r.toFixed(ea))}return String(r)},Fe=()=>{c.value=!0},Xe=l=>{c.value=!1;const t=l.target;if(!e.numberOnly||e.min===void 0&&e.max===void 0&&e.step===void 0)return;const o=He(t.value);o!==t.value&&(t.value=o,u("update:modelValue",U(o)))},Z=l=>{if(e.numberOnly){const t=W(l.value);t!==l.value&&(l.value=t),u("update:modelValue",U(t))}else u("update:modelValue",U(l.value))},je=l=>{b.value||Z(l.target)},Ke=()=>{b.value=!0},We=l=>{b.value=!1,Z(l.target)},Ze=l=>{const t=l.target,o=U(t.value);u("enter",o),e.type==="search"&&u("search",o)},Ge=()=>{var l;e.disabled||u("search",U(((l=f.value)==null?void 0:l.value)??""))},Je=()=>{u("update:modelValue",""),u("clear"),Y(()=>{var l;return(l=f.value)==null?void 0:l.focus()})},Qe=()=>{I.value=!I.value,Y(()=>{var l;return(l=f.value)==null?void 0:l.focus()})};return s({focus:()=>{var l;return(l=f.value)==null?void 0:l.focus()},blur:()=>{var l;return(l=f.value)==null?void 0:l.blur()},el:f}),(l,t)=>(g(),v("div",{class:N(["ui-input-outer",[Te.value,{"has-desc":!!n.desc&&!n.errorMessage,"has-error":P.value,"has-label":!!(n.label||l.$slots.label)}]]),style:ra(Re.value)},[n.label||l.$slots.label?(g(),v("label",{key:0,for:V.value,class:N(["ui-input-label",{"is-hidden":n.labelHidden}])},[A(l.$slots,"label",{},()=>[sa(H(n.label),1)],!0),n.required?(g(),v("span",ca,"*")):w("",!0)],10,ua)):w("",!0),x("div",{class:N(["ui-input-wrap",[`size-${n.size}`,`shape-${n.shape}`,n.iconSize?`icon-size-${n.iconSize}`:null,{"is-disabled":n.disabled,"is-focused":c.value,"is-error":P.value,"has-icon-left":!!l.$slots["icon-left"],"has-icon-right":!!l.$slots["icon-right"]||n.type==="search"||F.value||X.value}]])},[l.$slots["icon-left"]?(g(),v("span",ma,[A(l.$slots,"icon-left",{},void 0,!0)])):w("",!0),x("input",na(Ce.value,{id:V.value,ref_key:"inputRef",ref:f,class:"ui-input",type:ke.value,role:n.type==="search"?"searchbox":void 0,inputmode:Ae.value,value:n.modelValue,placeholder:n.placeholder,disabled:n.disabled,readonly:n.readonly,required:n.required||void 0,autocomplete:n.autocomplete,name:n.name,maxlength:n.maxLength,"aria-describedby":De.value,"aria-invalid":Be.value,onInput:je,onCompositionstart:Ke,onCompositionend:We,onFocus:Fe,onBlur:Xe,onKeydown:ta(Ze,["enter"])}),null,16,fa),F.value?(g(),v("button",{key:1,type:"button",class:"ui-input-icon is-right is-clear","aria-label":"입력 삭제",onClick:Je},[...t[0]||(t[0]=[x("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"},[x("circle",{cx:"12",cy:"12",r:"10",fill:"currentColor"}),x("path",{d:"M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5",stroke:"#fff","stroke-width":"2.5","stroke-linecap":"round","stroke-linejoin":"round"})],-1)])])):w("",!0),n.type==="search"?(g(),v("button",{key:2,type:"button",class:"ui-input-icon is-right is-search",disabled:n.disabled,"aria-label":n.searchAriaLabel,onClick:Ge},[...t[1]||(t[1]=[x("i",{class:"icon-search"},null,-1)])],8,ha)):X.value?(g(),v("button",{key:3,type:"button",class:"ui-input-icon is-right is-password-toggle","aria-label":I.value?"비밀번호 숨기기":"비밀번호 표시",onClick:Qe},[x("i",{class:N(I.value?"icon-eye-off":"icon-eye")},null,2)],8,va)):l.$slots["icon-right"]?(g(),v("span",ga,[A(l.$slots,"icon-right",{},void 0,!0)])):w("",!0)],2),n.errorMessage?(g(),v("p",{key:1,id:K.value,class:"ui-input-error",role:"alert"},H(n.errorMessage),9,ya)):n.desc?(g(),v("p",{key:2,id:j.value,class:"ui-input-desc"},H(n.desc),9,ba)):w("",!0)],6))}}),m=oa(Oe,[["__scopeId","data-v-b4d1c6ce"]]);Oe.__docgenInfo={exportName:"default",displayName:"UiInput",description:"",tags:{},expose:[{name:"focus"},{name:"blur"},{name:"el"}],props:[{name:"modelValue",description:"v-model 양방향 바인딩 값",required:!1,type:{name:"union",elements:[{name:"string"},{name:"number"}]},defaultValue:{func:!1,value:"''"}},{name:"type",description:"input HTML type — `search`는 내부적으로 text + 우측 검색 아이콘 자동.\n`number`는 사용 금지 (한글 IME 깜빡임) → `numberOnly` prop 사용.",required:!1,type:{name:"union",elements:[{name:'"text"'},{name:'"search"'},{name:'"password"'},{name:'"email"'},{name:'"tel"'},{name:'"url"'}]},defaultValue:{func:!1,value:"'text'"}},{name:"label",description:"label 텍스트 — `<label for>` 자동 연결. label slot이 있으면 그것을 우선.\n`id` prop이 없어도 자동 생성된 id로 연결됨.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"labelHidden",description:`label 시각적 숨김 — DOM에는 있지만 CSS로 숨김. 스크린리더는 인지.
search input에서 placeholder만 노출하고 싶을 때.`,required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"error",description:'에러 상태 — input에 빨간 테두리 + `aria-invalid="true"` 자동.\n`errorMessage`가 있으면 별도 지정 안 해도 자동 true.',required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"errorMessage",description:"에러 메시지 — 비어있지 않으면 `error: true` 자동 + 빨간 텍스트로 표시.\ninput의 `aria-describedby`가 이 메시지로 연결 (desc보다 우선).",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"placeholder",description:"입력 영역 플레이스홀더 텍스트",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"disabled",description:"비활성화 — 입력 차단 + opacity 0.5",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",description:"읽기 전용 — 표시는 정상, 입력만 차단",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"required",description:"필수 입력 (HTML required)",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autocomplete",description:'autocomplete HTML 속성 (e.g., "email", "current-password", "off")',required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"name",description:"form submit 시 사용할 input name 속성",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"id",description:"label htmlFor와 연결할 input id 속성",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"maxLength",description:"입력 가능한 최대 글자 수 (HTML 표준 maxlength)",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"undefined"}},{name:"min",description:"최솟값 — `numberOnly=true` 필수. blur 시점에 자동 보정.\ntype=text 사용으로 HTML native 제약 없음.",required:!1,type:{name:"union",elements:[{name:"string"},{name:"number"}]},defaultValue:{func:!1,value:"undefined"}},{name:"max",description:"최댓값 — `numberOnly=true` 필수. blur 시점에 자동 보정.",required:!1,type:{name:"union",elements:[{name:"string"},{name:"number"}]},defaultValue:{func:!1,value:"undefined"}},{name:"step",description:"단위 — `numberOnly=true` 필수. blur 시 step 단위로 반올림.\n예: `step=0.1` → 0.05 입력 시 0.1로 보정.",required:!1,type:{name:"union",elements:[{name:"string"},{name:"number"}]},defaultValue:{func:!1,value:"undefined"}},{name:"size",description:"사이즈 — `sm`(28px) / `md`(32px·기본) / `lg`(40px) / `auth`(44px·로그인 전용)\nUiButton과 동일 토큰 사용 → 검색바에서 자동 정렬.",required:!1,type:{name:"InputSize"},defaultValue:{func:!1,value:"'md'"}},{name:"iconSize",description:"아이콘 사이즈 — 미지정 시 `size` 따라감, 명시 시 override (xs/sm/md/lg).\n슬롯 내 `<i>`에 `size-N` 클래스 안 붙였을 때만 적용.",required:!1,type:{name:"Size"}},{name:"shape",description:"모서리 모양 — `rounded`(기본 6px) / `pill`(완전 라운드 — 검색바·필터)",required:!1,type:{name:"union",elements:[{name:'"rounded"'},{name:'"pill"'}]},defaultValue:{func:!1,value:"'rounded'"}},{name:"desc",description:'입력 아래 설명 텍스트 — 별도 `<p class="hint">` 사용 금지, 이 prop 사용\ninput의 `aria-describedby`와 자동 연결.',required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"numberOnly",description:'숫자만 허용 — `type="number"` 사용 금지 정책 대신 사용 (한글 IME 깜빡임 방지).\n`min/max/step`은 이 prop이 true일 때만 동작.',required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"allowDecimal",description:"`numberOnly=true`일 때 소수점 허용 (예: 0.5)",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"allowNegative",description:"`numberOnly=true`일 때 음수 부호(-) 허용",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"decimals",description:'소수점 자릿수 제한 — `allowDecimal=true`일 때만 의미.\n입력 즉시 초과 자릿수 제거. 예: `decimals=2` → "0.123" 입력 시 "0.12"로 자동 보정.',required:!1,type:{name:"number"},defaultValue:{func:!1,value:"undefined"}},{name:"clearable",description:"입력값 삭제 버튼 — 값이 비어있지 않고 disabled/readonly 아닐 때 우측 X 표시.\n클릭 시 값 비움 + input re-focus + `clear` 이벤트 발생.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"showPasswordToggle",description:'비밀번호 표시/숨김 토글 — `type="password"`일 때만 동작.\n눈 아이콘 클릭으로 text↔password 전환.',required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"searchAriaLabel",description:'검색 버튼 aria-label (type="search"일 때만, 기본 "검색")',required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'검색'"}}],events:[{name:"update:modelValue",type:{names:["union"],elements:[{name:"string"},{name:"number"}]}},{name:"enter",type:{names:["union"],elements:[{name:"string"},{name:"number"}]}},{name:"search",type:{names:["union"],elements:[{name:"string"},{name:"number"}]}},{name:"clear"}],slots:[{name:"label"},{name:"icon-left"},{name:"icon-right"}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiInput.vue"]};const za={title:"Components/Form/UiInput",component:m,tags:["autodocs"],args:{"onUpdate:modelValue":B(),onEnter:B(),onSearch:B()},parameters:{docs:{description:{component:'\n## 핵심 props\n\n- **`modelValue`** — v-model 양방향 바인딩\n- **`type`** `text` | `search` | `password` | `email` | `tel` | `url`\n- **`label`** + **`labelHidden`** + **`required`** — `<label for>` 자동 연결 + 필수 표시(*) (v0.3.0)\n- **`error`** + **`errorMessage`** — 에러 상태 + aria-invalid 자동, 메시지 role=alert (v0.3.0)\n- **`size`** `sm`(28px) | `md`(32px·기본) | `lg`(40px) | `auth`(44px·로그인 전용) — 공용 토큰\n- **`iconSize`** `xs` | `sm` | `md` | `lg` — 미지정 시 size 따라감, 명시 시 override\n- **`shape`** `rounded`(기본 6px) | `pill`(완전 라운드, 검색바)\n- **`disabled`** / **`readonly`**\n- **`numberOnly`** + `allowDecimal` / `allowNegative` — 숫자 전용 (한글 IME 대응)\n- **`min`** / **`max`** / **`step`** — **`numberOnly=true` 필수**. blur 시점 자동 보정 (native type=text 사용 → HTML 제약 없음)\n- **`maxLength`** / **`placeholder`** / **`desc`**\n\n> **외부 메서드**: `inputRef.value.focus()` / `.blur()` / `.el`\n>\n> **이벤트**: `update:modelValue` / `enter` (Enter 키) / `search` (검색 아이콘 클릭)\n\n---\n\n## 디자인 토큰\n\nsize/shape는 `src/styles/tokens/_size.scss`, `_shape.scss` 공용 토큰 참조.\n`<UiInput size="md"> + <UiButton size="md">`가 검색바에서 height/font/padding 자동 정렬.\n\n---\n\n## 정책\n\n- `type="number"` 사용 금지 — 한글 IME 환경 자음 깜빡임 → **`numberOnly` prop** 사용\n- 설명 텍스트는 `<p class="hint">` 등 별도 태그 대신 **`desc` prop**\n- `auth` 사이즈는 로그인/회원가입 전용 (44px)\n- 슬롯 내 아이콘에 `size-N` 클래스 생략 시 size 토큰이 자동 적용\n\n---\n\n## 테스트 현황\n\n`npm test` 자동 테스트 (`src/components/ui/UiInput.test.ts`).\n\n- **동작 계약** — input emit / enter 이벤트\n- **숫자 정책** — numberOnly / allowDecimal / decimals / 다중 점 처리\n- **type / 상태** — search / password / disabled / desc\n- **shape & iconSize** — pill 클래스 적용, iconSize override\n- **size auth** — 로그인 폼 토큰 적용\n        '}}},argTypes:{type:{control:"inline-radio",options:["text","search","password","email","tel","url"]},size:{control:"inline-radio",options:pa,description:"sm(28px) / md(32px·기본) / lg(40px) / auth(44px·로그인) — 공용 토큰"},shape:{control:"inline-radio",options:["rounded","pill"],description:"rounded(기본 6px) / pill(완전 라운드, 검색바)"},iconSize:{control:"inline-radio",options:["(자동)",...da],mapping:{"(자동)":void 0},description:"아이콘 사이즈 — 미지정 시 size 따라감, 명시 시 override"},disabled:{control:"boolean"},readonly:{control:"boolean"},numberOnly:{control:"boolean"},allowDecimal:{control:"boolean"},allowNegative:{control:"boolean"},decimals:{control:"number",description:"allowDecimal=true 일 때 소수점 자릿수 제한"},placeholder:{control:"text"},desc:{control:"text"},label:{control:"text",description:"label 텍스트 — `<label for>` 자동 연결"},labelHidden:{control:"boolean",description:"label 시각 숨김 (스크린리더는 인지)"},error:{control:"boolean",description:"에러 상태 — 빨간 테두리 + aria-invalid"},errorMessage:{control:"text",description:"에러 메시지 — 비어있지 않으면 error 자동 true"},required:{control:"boolean",description:"필수 입력 — label 옆 * 표시"},clearable:{control:"boolean",description:"입력 삭제 X 버튼 (값이 있을 때 표시)"},showPasswordToggle:{control:"boolean",description:"비밀번호 표시/숨김 토글 (type=password일 때)"},maxLength:{control:"number"},autocomplete:{control:"select",options:["off","on","email","username","current-password","new-password","tel","street-address"],description:'autocomplete HTML 속성 (e.g., "email", "current-password", "off")'}}},_=["(없음)","plus","edit","trashcan","close","search","check","arrow-right","download","chevron-down","refresh"],$={argTypes:{iconLeft:{control:"select",options:_,description:"🧪 데모 전용 (실제 API 아님). 실제는 #icon-left slot 사용"},iconRight:{control:"select",options:_,description:"🧪 데모 전용 (실제 API 아님). type=search 면 자동 검색 아이콘"}},args:{placeholder:"값을 입력하세요",size:"md",shape:"rounded",iconLeft:"(없음)",iconRight:"(없음)",iconSize:"(자동)"},parameters:{docs:{source:{language:"html",transform:(n,s)=>{const a=s.args||{},e=['v-model="value"'];a.size&&a.size!=="md"&&e.push(`size="${a.size}"`),a.shape&&a.shape!=="rounded"&&e.push(`shape="${a.shape}"`),a.iconSize&&a.iconSize!=="(자동)"&&e.push(`icon-size="${a.iconSize}"`),a.type&&a.type!=="text"&&e.push(`type="${a.type}"`),a.placeholder&&e.push(`placeholder="${a.placeholder}"`),a.disabled&&e.push("disabled"),a.readonly&&e.push("readonly"),a.numberOnly&&e.push("number-only"),a.allowDecimal&&e.push("allow-decimal"),a.allowNegative&&e.push("allow-negative"),a.decimals!==void 0&&a.decimals!==null&&e.push(`:decimals="${a.decimals}"`),a.maxLength!==void 0&&a.maxLength!==null&&a.maxLength!==""&&e.push(`:max-length="${a.maxLength}"`),a.min!==void 0&&a.min!==null&&a.min!==""&&e.push(`:min="${a.min}"`),a.max!==void 0&&a.max!==null&&a.max!==""&&e.push(`:max="${a.max}"`),a.step!==void 0&&a.step!==null&&a.step!==""&&e.push(`:step="${a.step}"`),a.name&&e.push(`name="${a.name}"`),a.id&&e.push(`id="${a.id}"`),a.required&&e.push("required"),a.label&&e.push(`label="${a.label}"`),a.labelHidden&&e.push("label-hidden"),a.error&&e.push("error"),a.errorMessage&&e.push(`error-message="${a.errorMessage}"`),a.desc&&e.push(`desc="${a.desc}"`),a.autocomplete&&e.push(`autocomplete="${a.autocomplete}"`);const u=`<UiInput ${e.join(" ")}`,f=a.iconLeft&&a.iconLeft!=="(없음)",c=a.iconRight&&a.iconRight!=="(없음)"&&a.type!=="search";if(!f&&!c)return`${u} />`;const b=[];return f&&b.push(`  <template #icon-left>
    <i class="icon-${a.iconLeft}" />
  </template>`),c&&b.push(`  <template #icon-right>
    <i class="icon-${a.iconRight}" />
  </template>`),`${u}>
${b.join(`
`)}
</UiInput>`}}}},render:n=>({components:{UiInput:m},setup(){const s=i("");return{args:n,value:s}},template:`
      <div style="max-width: 320px;">
        <UiInput v-bind="args" v-model="value">
          <template v-if="args.iconLeft && args.iconLeft !== '(없음)'" #icon-left>
            <i :class="['icon-' + args.iconLeft]" />
          </template>
          <template v-if="args.iconRight && args.iconRight !== '(없음)' && args.type !== 'search'" #icon-right>
            <i :class="['icon-' + args.iconRight]" />
          </template>
        </UiInput>
      </div>
    `})},S={render:()=>({components:{UiInput:m},template:`
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiInput size="sm" placeholder="Small (28px)" />
        <UiInput size="md" placeholder="Medium (32px) — 기본" />
        <UiInput size="lg" placeholder="Large (40px)" />
        <UiInput size="auth" placeholder="Auth (44px) — 로그인 전용" />
      </div>
    `})},L={name:"모서리 모양 (shape)",render:()=>({components:{UiInput:m},template:`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #6f7a93;">rounded — 기본 6px</p>
          <UiInput shape="rounded" placeholder="이름을 입력하세요" />
        </div>
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #6f7a93;">pill — 완전 라운드 (검색바 등)</p>
          <UiInput shape="pill" type="search" placeholder="검색..." />
        </div>
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #6f7a93;">pill + icon-left</p>
          <UiInput shape="pill" placeholder="필터">
            <template #icon-left><i class="icon-search" /></template>
          </UiInput>
        </div>
      </div>
    `})},q={render:()=>({components:{UiInput:m},template:`
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiInput type="text" placeholder="text — 일반 텍스트" />
        <UiInput type="search" placeholder="search — 자동 검색 아이콘" />
        <UiInput type="password" placeholder="password — 비밀번호" />
        <UiInput type="email" placeholder="email — 이메일" />
        <UiInput type="tel" placeholder="tel — 전화번호" />
        <UiInput type="url" placeholder="url — https://..." />
      </div>
    `})},M={name:"Label 사용 (필수 표시 / 숨김)",render:()=>({components:{UiInput:m},template:`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput label="이메일" placeholder="example@anthropic.com" type="email" />
        <UiInput label="비밀번호" placeholder="6자 이상" type="password" required desc="6자 이상 영문/숫자" />
        <UiInput label-hidden label="검색" placeholder="검색어 입력 (label은 스크린리더에만)" type="search" />
      </div>
    `})},E={name:"에러 상태 (error / errorMessage)",render:()=>({components:{UiInput:m},template:`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput label="이메일" model-value="invalid@" error error-message="이메일 형식이 올바르지 않습니다." type="email" />
        <UiInput label="비밀번호" type="password" required error-message="필수 입력 항목입니다." />
        <UiInput label="이름" model-value="홍길동" error desc="error만 켜지면 빨간 테두리만 (메시지 없음)" />
      </div>
    `})},O={name:"숫자 전용 (numberOnly)",render:()=>({components:{UiInput:m},setup(){const n=i(""),s=i(""),a=i(""),e=i("");return{intValue:n,decimalValue:s,negativeValue:a,constrainedValue:e}},template:`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div>
          <UiInput v-model="intValue" number-only placeholder="정수만" />
        </div>
        <div>
          <UiInput v-model="decimalValue" number-only allow-decimal placeholder="소수 허용" desc="temperature 같은 0~1 값" />
        </div>
        <div>
          <UiInput v-model="negativeValue" number-only allow-negative placeholder="음수 허용" />
        </div>
        <div>
          <UiInput v-model="constrainedValue" number-only allow-decimal :min="0" :max="1" :step="0.1" placeholder="0~1, 0.1 단위" desc="blur 시 자동 보정" />
        </div>
        <div>
          <UiInput number-only allow-decimal :decimals="2" placeholder="소수점 2자리만 (decimals=2)" desc="입력 즉시 초과 자릿수 제거" />
        </div>
      </div>
    `})},k={name:"실전: 폼 검증 (실시간 에러)",render:()=>({components:{UiInput:m},setup(){const n=i(""),s=i(""),a=i(""),e=i("");return{email:n,emailError:s,validateEmail:c=>{c?c.includes("@")?s.value="":s.value="올바른 이메일 형식이 아닙니다.":s.value="이메일을 입력해주세요."},name:a,nameError:e,validateName:c=>{c?c.length<2?e.value="2자 이상 입력해주세요.":e.value="":e.value="이름을 입력해주세요."}}},template:`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput
          v-model="name"
          label="이름"
          required
          placeholder="홍길동"
          :error-message="nameError"
          @update:model-value="validateName"
        />
        <UiInput
          v-model="email"
          label="이메일"
          required
          type="email"
          placeholder="example@email.com"
          :error-message="emailError"
          @update:model-value="validateEmail"
        />
        <p style="margin-top: 4px; font-size: 12px; color: #6f7a93;">
          💡 입력하면서 실시간 검증 — errorMessage가 비어있지 않으면 자동으로 에러 스타일 적용
        </p>
      </div>
    `})},C={name:"입력 삭제 (clearable)",render:()=>({components:{UiInput:m},setup(){const n=i("삭제 가능한 텍스트"),s=i("검색어");return{text:n,search:s}},template:`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput v-model="text" label="일반 입력" clearable placeholder="입력 후 X 버튼 확인" />
        <UiInput v-model="search" label="검색 (clearable 무시)" clearable type="search" placeholder="type=search는 검색 아이콘 우선" />
        <UiInput model-value="비활성" label="disabled" clearable disabled />
        <p style="margin-top: 4px; font-size: 12px; color: #6f7a93;">
          💡 값이 있을 때만 X 표시. disabled/readonly일 때는 숨김.
        </p>
      </div>
    `})},T={name:"비밀번호 토글 (showPasswordToggle)",render:()=>({components:{UiInput:m},setup(){return{pw:i("mySecret123")}},template:`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput v-model="pw" label="비밀번호" type="password" show-password-toggle placeholder="비밀번호 입력" />
        <UiInput model-value="disabled" label="disabled 상태" type="password" show-password-toggle disabled />
        <p style="margin-top: 4px; font-size: 12px; color: #6f7a93;">
          💡 눈 아이콘 클릭으로 비밀번호 표시/숨김 토글. type="password"일 때만 동작.
        </p>
      </div>
    `})},R={name:"실전: 로그인 폼 (auth 사이즈)",render:()=>({components:{UiInput:m},setup(){const n=i(""),s=i("");return{id:n,pw:s}},template:`
      <form style="display: flex; flex-direction: column; gap: 12px; padding: 24px; background: #f4f7f9; border-radius: 8px; max-width: 360px;">
        <UiInput v-model="id" size="auth" placeholder="아이디" clearable />
        <UiInput v-model="pw" size="auth" type="password" placeholder="비밀번호" show-password-toggle />
      </form>
    `})};var ee,ae,le;$.parameters={...$.parameters,docs:{...(ee=$.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  argTypes: {
    iconLeft: {
      control: 'select',
      options: ICON_OPTIONS,
      description: '🧪 데모 전용 (실제 API 아님). 실제는 #icon-left slot 사용'
    },
    iconRight: {
      control: 'select',
      options: ICON_OPTIONS,
      description: '🧪 데모 전용 (실제 API 아님). type=search 면 자동 검색 아이콘'
    }
  } as never,
  args: {
    placeholder: '값을 입력하세요',
    size: 'md',
    shape: 'rounded',
    iconLeft: '(없음)',
    iconRight: '(없음)',
    iconSize: '(자동)'
  } as never,
  parameters: {
    docs: {
      source: {
        language: 'html',
        // Controls 값을 그대로 반영한 실제 사용 코드 동적 생성
        // - 실제 props는 기본값과 다를 때만 출력 (노이즈 제거)
        // - iconLeft / iconRight는 데모 전용 control → slot 패턴으로 변환
        transform: (_src: string, storyContext: {
          args: Record<string, unknown>;
        }) => {
          const a = storyContext.args || {};
          const attrs: string[] = ['v-model="value"'];
          if (a.size && a.size !== 'md') attrs.push(\`size="\${a.size}"\`);
          if (a.shape && a.shape !== 'rounded') attrs.push(\`shape="\${a.shape}"\`);
          if (a.iconSize && a.iconSize !== '(자동)') attrs.push(\`icon-size="\${a.iconSize}"\`);
          if (a.type && a.type !== 'text') attrs.push(\`type="\${a.type}"\`);
          if (a.placeholder) attrs.push(\`placeholder="\${a.placeholder}"\`);
          if (a.disabled) attrs.push('disabled');
          if (a.readonly) attrs.push('readonly');
          if (a.numberOnly) attrs.push('number-only');
          if (a.allowDecimal) attrs.push('allow-decimal');
          if (a.allowNegative) attrs.push('allow-negative');
          if (a.decimals !== undefined && a.decimals !== null) attrs.push(\`:decimals="\${a.decimals}"\`);
          if (a.maxLength !== undefined && a.maxLength !== null && a.maxLength !== '') attrs.push(\`:max-length="\${a.maxLength}"\`);
          if (a.min !== undefined && a.min !== null && a.min !== '') attrs.push(\`:min="\${a.min}"\`);
          if (a.max !== undefined && a.max !== null && a.max !== '') attrs.push(\`:max="\${a.max}"\`);
          if (a.step !== undefined && a.step !== null && a.step !== '') attrs.push(\`:step="\${a.step}"\`);
          if (a.name) attrs.push(\`name="\${a.name}"\`);
          if (a.id) attrs.push(\`id="\${a.id}"\`);
          if (a.required) attrs.push('required');
          if (a.label) attrs.push(\`label="\${a.label}"\`);
          if (a.labelHidden) attrs.push('label-hidden');
          if (a.error) attrs.push('error');
          if (a.errorMessage) attrs.push(\`error-message="\${a.errorMessage}"\`);
          if (a.desc) attrs.push(\`desc="\${a.desc}"\`);
          if (a.autocomplete) attrs.push(\`autocomplete="\${a.autocomplete}"\`);
          const head = \`<UiInput \${attrs.join(' ')}\`;
          const hasL = a.iconLeft && a.iconLeft !== '(없음)';
          // type=search이면 우측 아이콘 자동이므로 iconRight slot은 표시 안 함
          const hasR = a.iconRight && a.iconRight !== '(없음)' && a.type !== 'search';
          if (!hasL && !hasR) return \`\${head} />\`;
          const children: string[] = [];
          if (hasL) {
            children.push(\`  <template #icon-left>\\n    <i class="icon-\${a.iconLeft}" />\\n  </template>\`);
          }
          if (hasR) {
            children.push(\`  <template #icon-right>\\n    <i class="icon-\${a.iconRight}" />\\n  </template>\`);
          }
          return \`\${head}>\\n\${children.join('\\n')}\\n</UiInput>\`;
        }
      }
    }
  },
  render: (args: Record<string, unknown>) => ({
    components: {
      UiInput
    },
    setup() {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: \`
      <div style="max-width: 320px;">
        <UiInput v-bind="args" v-model="value">
          <template v-if="args.iconLeft && args.iconLeft !== '(없음)'" #icon-left>
            <i :class="['icon-' + args.iconLeft]" />
          </template>
          <template v-if="args.iconRight && args.iconRight !== '(없음)' && args.type !== 'search'" #icon-right>
            <i :class="['icon-' + args.iconRight]" />
          </template>
        </UiInput>
      </div>
    \`
  })
}`,...(le=(ae=$.parameters)==null?void 0:ae.docs)==null?void 0:le.source}}};var ne,te,re;S.parameters={...S.parameters,docs:{...(ne=S.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiInput
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiInput size="sm" placeholder="Small (28px)" />
        <UiInput size="md" placeholder="Medium (32px) — 기본" />
        <UiInput size="lg" placeholder="Large (40px)" />
        <UiInput size="auth" placeholder="Auth (44px) — 로그인 전용" />
      </div>
    \`
  })
}`,...(re=(te=S.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};var ie,se,oe;L.parameters={...L.parameters,docs:{...(ie=L.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  name: '모서리 모양 (shape)',
  render: () => ({
    components: {
      UiInput
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #6f7a93;">rounded — 기본 6px</p>
          <UiInput shape="rounded" placeholder="이름을 입력하세요" />
        </div>
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #6f7a93;">pill — 완전 라운드 (검색바 등)</p>
          <UiInput shape="pill" type="search" placeholder="검색..." />
        </div>
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #6f7a93;">pill + icon-left</p>
          <UiInput shape="pill" placeholder="필터">
            <template #icon-left><i class="icon-search" /></template>
          </UiInput>
        </div>
      </div>
    \`
  })
}`,...(oe=(se=L.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var de,pe,ue;q.parameters={...q.parameters,docs:{...(de=q.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiInput
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <UiInput type="text" placeholder="text — 일반 텍스트" />
        <UiInput type="search" placeholder="search — 자동 검색 아이콘" />
        <UiInput type="password" placeholder="password — 비밀번호" />
        <UiInput type="email" placeholder="email — 이메일" />
        <UiInput type="tel" placeholder="tel — 전화번호" />
        <UiInput type="url" placeholder="url — https://..." />
      </div>
    \`
  })
}`,...(ue=(pe=q.parameters)==null?void 0:pe.docs)==null?void 0:ue.source}}};var ce,me,fe;M.parameters={...M.parameters,docs:{...(ce=M.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  name: 'Label 사용 (필수 표시 / 숨김)',
  render: () => ({
    components: {
      UiInput
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput label="이메일" placeholder="example@anthropic.com" type="email" />
        <UiInput label="비밀번호" placeholder="6자 이상" type="password" required desc="6자 이상 영문/숫자" />
        <UiInput label-hidden label="검색" placeholder="검색어 입력 (label은 스크린리더에만)" type="search" />
      </div>
    \`
  })
}`,...(fe=(me=M.parameters)==null?void 0:me.docs)==null?void 0:fe.source}}};var he,ve,ge;E.parameters={...E.parameters,docs:{...(he=E.parameters)==null?void 0:he.docs,source:{originalSource:`{
  name: '에러 상태 (error / errorMessage)',
  render: () => ({
    components: {
      UiInput
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput label="이메일" model-value="invalid@" error error-message="이메일 형식이 올바르지 않습니다." type="email" />
        <UiInput label="비밀번호" type="password" required error-message="필수 입력 항목입니다." />
        <UiInput label="이름" model-value="홍길동" error desc="error만 켜지면 빨간 테두리만 (메시지 없음)" />
      </div>
    \`
  })
}`,...(ge=(ve=E.parameters)==null?void 0:ve.docs)==null?void 0:ge.source}}};var ye,be,xe;O.parameters={...O.parameters,docs:{...(ye=O.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  name: '숫자 전용 (numberOnly)',
  render: () => ({
    components: {
      UiInput
    },
    setup() {
      const intValue = ref('');
      const decimalValue = ref('');
      const negativeValue = ref('');
      const constrainedValue = ref('');
      return {
        intValue,
        decimalValue,
        negativeValue,
        constrainedValue
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div>
          <UiInput v-model="intValue" number-only placeholder="정수만" />
        </div>
        <div>
          <UiInput v-model="decimalValue" number-only allow-decimal placeholder="소수 허용" desc="temperature 같은 0~1 값" />
        </div>
        <div>
          <UiInput v-model="negativeValue" number-only allow-negative placeholder="음수 허용" />
        </div>
        <div>
          <UiInput v-model="constrainedValue" number-only allow-decimal :min="0" :max="1" :step="0.1" placeholder="0~1, 0.1 단위" desc="blur 시 자동 보정" />
        </div>
        <div>
          <UiInput number-only allow-decimal :decimals="2" placeholder="소수점 2자리만 (decimals=2)" desc="입력 즉시 초과 자릿수 제거" />
        </div>
      </div>
    \`
  })
}`,...(xe=(be=O.parameters)==null?void 0:be.docs)==null?void 0:xe.source}}};var we,Ie,Ue;k.parameters={...k.parameters,docs:{...(we=k.parameters)==null?void 0:we.docs,source:{originalSource:`{
  name: '실전: 폼 검증 (실시간 에러)',
  render: () => ({
    components: {
      UiInput
    },
    setup() {
      const email = ref('');
      const emailError = ref('');
      const name = ref('');
      const nameError = ref('');
      const validateEmail = (val: string) => {
        if (!val) {
          emailError.value = '이메일을 입력해주세요.';
        } else if (!val.includes('@')) {
          emailError.value = '올바른 이메일 형식이 아닙니다.';
        } else {
          emailError.value = '';
        }
      };
      const validateName = (val: string) => {
        if (!val) {
          nameError.value = '이름을 입력해주세요.';
        } else if (val.length < 2) {
          nameError.value = '2자 이상 입력해주세요.';
        } else {
          nameError.value = '';
        }
      };
      return {
        email,
        emailError,
        validateEmail,
        name,
        nameError,
        validateName
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput
          v-model="name"
          label="이름"
          required
          placeholder="홍길동"
          :error-message="nameError"
          @update:model-value="validateName"
        />
        <UiInput
          v-model="email"
          label="이메일"
          required
          type="email"
          placeholder="example@email.com"
          :error-message="emailError"
          @update:model-value="validateEmail"
        />
        <p style="margin-top: 4px; font-size: 12px; color: #6f7a93;">
          💡 입력하면서 실시간 검증 — errorMessage가 비어있지 않으면 자동으로 에러 스타일 적용
        </p>
      </div>
    \`
  })
}`,...(Ue=(Ie=k.parameters)==null?void 0:Ie.docs)==null?void 0:Ue.source}}};var ze,Ve,Ne;C.parameters={...C.parameters,docs:{...(ze=C.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  name: '입력 삭제 (clearable)',
  render: () => ({
    components: {
      UiInput
    },
    setup() {
      const text = ref('삭제 가능한 텍스트');
      const search = ref('검색어');
      return {
        text,
        search
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput v-model="text" label="일반 입력" clearable placeholder="입력 후 X 버튼 확인" />
        <UiInput v-model="search" label="검색 (clearable 무시)" clearable type="search" placeholder="type=search는 검색 아이콘 우선" />
        <UiInput model-value="비활성" label="disabled" clearable disabled />
        <p style="margin-top: 4px; font-size: 12px; color: #6f7a93;">
          💡 값이 있을 때만 X 표시. disabled/readonly일 때는 숨김.
        </p>
      </div>
    \`
  })
}`,...(Ne=(Ve=C.parameters)==null?void 0:Ve.docs)==null?void 0:Ne.source}}};var $e,Se,Le;T.parameters={...T.parameters,docs:{...($e=T.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  name: '비밀번호 토글 (showPasswordToggle)',
  render: () => ({
    components: {
      UiInput
    },
    setup() {
      const pw = ref('mySecret123');
      return {
        pw
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <UiInput v-model="pw" label="비밀번호" type="password" show-password-toggle placeholder="비밀번호 입력" />
        <UiInput model-value="disabled" label="disabled 상태" type="password" show-password-toggle disabled />
        <p style="margin-top: 4px; font-size: 12px; color: #6f7a93;">
          💡 눈 아이콘 클릭으로 비밀번호 표시/숨김 토글. type="password"일 때만 동작.
        </p>
      </div>
    \`
  })
}`,...(Le=(Se=T.parameters)==null?void 0:Se.docs)==null?void 0:Le.source}}};var qe,Me,Ee;R.parameters={...R.parameters,docs:{...(qe=R.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  name: '실전: 로그인 폼 (auth 사이즈)',
  render: () => ({
    components: {
      UiInput
    },
    setup() {
      const id = ref('');
      const pw = ref('');
      return {
        id,
        pw
      };
    },
    template: \`
      <form style="display: flex; flex-direction: column; gap: 12px; padding: 24px; background: #f4f7f9; border-radius: 8px; max-width: 360px;">
        <UiInput v-model="id" size="auth" placeholder="아이디" clearable />
        <UiInput v-model="pw" size="auth" type="password" placeholder="비밀번호" show-password-toggle />
      </form>
    \`
  })
}`,...(Ee=(Me=R.parameters)==null?void 0:Me.docs)==null?void 0:Ee.source}}};const Va=["Playground","AllSizes","AllShapes","Types","WithLabel","ErrorState","NumberOnly","FormValidation","Clearable","PasswordToggle","LoginForm"];export{L as AllShapes,S as AllSizes,C as Clearable,E as ErrorState,k as FormValidation,R as LoginForm,O as NumberOnly,T as PasswordToggle,$ as Playground,q as Types,M as WithLabel,Va as __namedExportsOrder,za as default};
