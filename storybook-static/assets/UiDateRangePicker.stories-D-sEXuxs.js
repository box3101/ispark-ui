import{e as ce,r as k,f as m,g as d,j as t,u as n,c as h,o as l,n as me,F as v,m as D,p as g,q as x,t as w,k as u}from"./vue.esm-bundler-UBndlgVH.js";import{$ as o,n as pe,e as P,r as ve,i as ge,f as fe,Y as ke,q as De,j as xe,X as we,J as j,G as ye,Z as Re,U as he,Q as Pe,t as Ue}from"./index-yTw_IPk6.js";import{U as N}from"./UiSelect-0m-Wx2_9.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const be={class:"ui-datepicker-wrap"},Ve={class:"ui-datepicker-header"},ze={class:"ui-datepicker-selects"},f=ce({__name:"UiDateRangePicker",props:{modelValue:{default:()=>({start:void 0,end:void 0})},size:{default:"sm"},disabled:{type:Boolean,default:!1},locale:{default:"ko-KR"},minValue:{default:void 0},maxValue:{default:void 0}},emits:["update:modelValue"],setup(r,{emit:p}){const M=r,F=p,q=h({get:()=>M.modelValue,set:i=>F("update:modelValue",i)}),y=new Date,c=k(new o(y.getFullYear(),y.getMonth()+1,1)),le=h(()=>{var s;const i=((s=c.value)==null?void 0:s.year)??y.getFullYear(),a=[];for(let e=i-10;e<=i+10;e++)a.push(e);return a}),se=h(()=>le.value.map(i=>({label:String(i),value:String(i)}))),ie=h(()=>Array.from({length:12},(i,a)=>({label:`${a+1}월`,value:String(a+1)}))),de=i=>{var e;const a=Number(i),s=((e=c.value)==null?void 0:e.month)??1;c.value=new o(a,s,1)},oe=i=>{var e;const a=Number(i),s=((e=c.value)==null?void 0:e.year)??y.getFullYear();c.value=new o(s,a,1)};return(i,a)=>(l(),m("div",be,[d(n(Ue),{modelValue:q.value,"onUpdate:modelValue":a[0]||(a[0]=s=>q.value=s),placeholder:c.value,"onUpdate:placeholder":a[1]||(a[1]=s=>c.value=s),locale:r.locale,disabled:r.disabled,"min-value":r.minValue,"max-value":r.maxValue},{default:t(()=>[d(n(pe),{class:me(["ui-datepicker-field",[`size-dp-${r.size}`,{"is-disabled":r.disabled}]])},{default:t(({segments:s})=>[(l(!0),m(v,null,D(s.start,e=>(l(),m(v,{key:`s-${e.part}`},[e.part==="literal"?(l(),g(n(P),{key:0,type:"start",part:e.part,class:"ui-datepicker-literal"},{default:t(()=>[x(w(e.value),1)]),_:2},1032,["part"])):(l(),g(n(P),{key:1,type:"start",part:e.part,class:"ui-datepicker-segment"},{default:t(()=>[x(w(e.value),1)]),_:2},1032,["part"]))],64))),128)),a[3]||(a[3]=u("span",{class:"ui-datepicker-range-sep"},"~",-1)),(l(!0),m(v,null,D(s.end,e=>(l(),m(v,{key:`e-${e.part}`},[e.part==="literal"?(l(),g(n(P),{key:0,type:"end",part:e.part,class:"ui-datepicker-literal"},{default:t(()=>[x(w(e.value),1)]),_:2},1032,["part"])):(l(),g(n(P),{key:1,type:"end",part:e.part,class:"ui-datepicker-segment"},{default:t(()=>[x(w(e.value),1)]),_:2},1032,["part"]))],64))),128)),d(n(ve),{class:"ui-datepicker-trigger","aria-label":"기간 선택"},{default:t(()=>[...a[2]||(a[2]=[u("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true"},[u("rect",{x:"2",y:"3",width:"12",height:"11",rx:"2",stroke:"currentColor","stroke-width":"1.5"}),u("path",{d:"M2 7h12",stroke:"currentColor","stroke-width":"1.5"}),u("path",{d:"M5.5 1.5v3M10.5 1.5v3",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"})],-1)])]),_:1})]),_:1},8,["class"]),d(n(ge),{class:"ui-datepicker-popover","side-offset":4},{default:t(()=>[d(n(fe),{class:"ui-datepicker-calendar"},{default:t(({weekDays:s,grid:e})=>{var A,B;return[u("div",Ve,[d(n(ke),{class:"ui-datepicker-nav","aria-label":"이전 달"},{default:t(()=>[...a[4]||(a[4]=[u("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true"},[u("path",{d:"M10 4l-4 4 4 4",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)])]),_:1}),u("div",ze,[d(N,{class:"ui-datepicker-select","model-value":String((A=c.value)==null?void 0:A.year),options:se.value,size:"xs","onUpdate:modelValue":de},null,8,["model-value","options"]),d(N,{class:"ui-datepicker-select","model-value":String((B=c.value)==null?void 0:B.month),options:ie.value,size:"xs","onUpdate:modelValue":oe},null,8,["model-value","options"])]),d(n(De),{class:"ui-datepicker-nav","aria-label":"다음 달"},{default:t(()=>[...a[5]||(a[5]=[u("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true"},[u("path",{d:"M6 4l4 4-4 4",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)])]),_:1})]),(l(!0),m(v,null,D(e,_=>(l(),g(n(xe),{key:_.value.toString()},{default:t(()=>[d(n(we),null,{default:t(()=>[d(n(j),{class:"ui-datepicker-row"},{default:t(()=>[(l(!0),m(v,null,D(s,R=>(l(),g(n(ye),{key:R,class:"ui-datepicker-head-cell"},{default:t(()=>[x(w(R),1)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024),d(n(Re),null,{default:t(()=>[(l(!0),m(v,null,D(_.rows,(R,ue)=>(l(),g(n(j),{key:`row-${ue}`,class:"ui-datepicker-row"},{default:t(()=>[(l(!0),m(v,null,D(R,Y=>(l(),g(n(he),{key:Y.toString(),date:Y,class:"ui-datepicker-cell"},{default:t(()=>[d(n(Pe),{day:Y,month:_.value,class:"ui-datepicker-cell-trigger"},null,8,["day","month"])]),_:2},1032,["date"]))),128))]),_:2},1024))),128))]),_:2},1024)]),_:2},1024))),128))]}),_:1})]),_:1})]),_:1},8,["modelValue","placeholder","locale","disabled","min-value","max-value"])]))}});f.__docgenInfo={exportName:"default",displayName:"UiDateRangePicker",description:"",tags:{},props:[{name:"modelValue",required:!1,type:{name:"DateRange"},defaultValue:{func:!1,value:"() => ({ start: undefined, end: undefined })"}},{name:"size",required:!1,type:{name:"union",elements:[{name:'"xs"'},{name:'"sm"'},{name:'"md"'},{name:'"lg"'}]},defaultValue:{func:!1,value:"'sm'"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"locale",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'ko-KR'"}},{name:"minValue",required:!1,type:{name:"DateValue"},defaultValue:{func:!1,value:"undefined"}},{name:"maxValue",required:!1,type:{name:"DateValue"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"update:modelValue",type:{names:["DateRange"]}}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiDateRangePicker.vue"]};const Fe={title:"Components/Form/UiDateRangePicker",component:f,tags:["autodocs"],parameters:{docs:{description:{component:`
radix-vue \`DateRangePicker\` + \`@internationalized/date\` 기반. 시작일~종료일 범위 선택.

## API

\`\`\`ts
import { UiDateRangePicker, type DateRange } from 'ispark-ui'
import { CalendarDate } from '@internationalized/date'

const range = ref<DateRange>({
  start: new CalendarDate(2026, 5, 20),
  end: new CalendarDate(2026, 5, 27),
})
\`\`\`

\`\`\`vue
<UiDateRangePicker v-model="range" />
<UiDateRangePicker v-model="range" size="md" :min-value="..." :max-value="..." disabled />
\`\`\`

## 동작
- 한 줄 input field에 [시작 segments] ~ [종료 segments] 형태
- 트리거 클릭 → 단일 month 캘린더
- 첫 클릭 = 시작일, 두 번째 클릭 = 종료일 (사이 범위 자동 하이라이트)
        `}}},argTypes:{size:{control:"inline-radio",options:["xs","sm","md","lg"]},disabled:{control:"boolean"},locale:{control:"text",description:"기본 ko-KR"}}},$="padding: 0 20px 320px; max-width: 460px;",U={args:{size:"sm",disabled:!1},render:r=>({components:{UiDateRangePicker:f},setup:()=>{const p=k({start:void 0,end:void 0});return{args:r,value:p}},template:`<div style="${$}"><UiDateRangePicker v-bind="args" v-model="value" /></div>`})},b={render:()=>({components:{UiDateRangePicker:f},setup:()=>({value:k({start:new o(2026,5,20),end:new o(2026,5,27)})}),template:`<div style="${$}"><UiDateRangePicker v-model="value" /></div>`})},V={name:"사이즈 (xs/sm/md/lg)",render:()=>({components:{UiDateRangePicker:f},setup:()=>{const r=()=>k({start:new o(2026,5,20),end:new o(2026,5,27)});return{a:r(),b:r(),c:r(),d:r()}},template:`
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 0 20px 320px; max-width: 460px;">
        <UiDateRangePicker v-model="a" size="xs" />
        <UiDateRangePicker v-model="b" size="sm" />
        <UiDateRangePicker v-model="c" size="md" />
        <UiDateRangePicker v-model="d" size="lg" />
      </div>
    `})},z={render:()=>({components:{UiDateRangePicker:f},setup:()=>({value:k({start:new o(2026,5,20),end:new o(2026,5,27)})}),template:`<div style="${$}"><UiDateRangePicker v-model="value" disabled /></div>`})},S={name:"범위 제한 (min/max)",render:()=>({components:{UiDateRangePicker:f},setup:()=>{const r=k({start:void 0,end:void 0}),p=new Date,M=new o(p.getFullYear(),p.getMonth()+1,1),F=new o(p.getFullYear(),p.getMonth()+1,28);return{value:r,min:M,max:F}},template:`
      <div style="${$}">
        <p style="margin: 0 0 8px; font-size: 13px; color: #6f7a93;">이번 달 1~28일만 선택 가능</p>
        <UiDateRangePicker v-model="value" :min-value="min" :max-value="max" />
      </div>
    `})},C={name:"Showcase (preview)",render:()=>({components:{UiDateRangePicker:f},setup:()=>({value:k({start:new o(2026,5,20),end:new o(2026,5,27)})}),template:`
      <div style="display: flex; justify-content: center; align-items: center; padding: 16px;">
        <UiDateRangePicker v-model="value" size="sm" />
      </div>
    `}),parameters:{docs:{disable:!0}}};var W,O,K;U.parameters={...U.parameters,docs:{...(W=U.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    disabled: false
  },
  render: args => ({
    components: {
      UiDateRangePicker
    },
    setup: () => {
      const value = ref<DateRange>({
        start: undefined,
        end: undefined
      });
      return {
        args,
        value
      };
    },
    template: \`<div style="\${WRAP}"><UiDateRangePicker v-bind="args" v-model="value" /></div>\`
  })
}`,...(K=(O=U.parameters)==null?void 0:O.docs)==null?void 0:K.source}}};var E,G,I;b.parameters={...b.parameters,docs:{...(E=b.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiDateRangePicker
    },
    setup: () => {
      const value = ref<DateRange>({
        start: new CalendarDate(2026, 5, 20),
        end: new CalendarDate(2026, 5, 27)
      });
      return {
        value
      };
    },
    template: \`<div style="\${WRAP}"><UiDateRangePicker v-model="value" /></div>\`
  })
}`,...(I=(G=b.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};var J,Q,T;V.parameters={...V.parameters,docs:{...(J=V.parameters)==null?void 0:J.docs,source:{originalSource:`{
  name: '사이즈 (xs/sm/md/lg)',
  render: () => ({
    components: {
      UiDateRangePicker
    },
    setup: () => {
      const mk = () => ref<DateRange>({
        start: new CalendarDate(2026, 5, 20),
        end: new CalendarDate(2026, 5, 27)
      });
      return {
        a: mk(),
        b: mk(),
        c: mk(),
        d: mk()
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 0 20px 320px; max-width: 460px;">
        <UiDateRangePicker v-model="a" size="xs" />
        <UiDateRangePicker v-model="b" size="sm" />
        <UiDateRangePicker v-model="c" size="md" />
        <UiDateRangePicker v-model="d" size="lg" />
      </div>
    \`
  })
}`,...(T=(Q=V.parameters)==null?void 0:Q.docs)==null?void 0:T.source}}};var X,Z,L;z.parameters={...z.parameters,docs:{...(X=z.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiDateRangePicker
    },
    setup: () => ({
      value: ref<DateRange>({
        start: new CalendarDate(2026, 5, 20),
        end: new CalendarDate(2026, 5, 27)
      })
    }),
    template: \`<div style="\${WRAP}"><UiDateRangePicker v-model="value" disabled /></div>\`
  })
}`,...(L=(Z=z.parameters)==null?void 0:Z.docs)==null?void 0:L.source}}};var H,ee,ae;S.parameters={...S.parameters,docs:{...(H=S.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: '범위 제한 (min/max)',
  render: () => ({
    components: {
      UiDateRangePicker
    },
    setup: () => {
      const value = ref<DateRange>({
        start: undefined,
        end: undefined
      });
      const now = new Date();
      const min = new CalendarDate(now.getFullYear(), now.getMonth() + 1, 1);
      const max = new CalendarDate(now.getFullYear(), now.getMonth() + 1, 28);
      return {
        value,
        min,
        max
      };
    },
    template: \`
      <div style="\${WRAP}">
        <p style="margin: 0 0 8px; font-size: 13px; color: #6f7a93;">이번 달 1~28일만 선택 가능</p>
        <UiDateRangePicker v-model="value" :min-value="min" :max-value="max" />
      </div>
    \`
  })
}`,...(ae=(ee=S.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var ne,te,re;C.parameters={...C.parameters,docs:{...(ne=C.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  name: 'Showcase (preview)',
  render: () => ({
    components: {
      UiDateRangePicker
    },
    setup: () => ({
      value: ref<DateRange>({
        start: new CalendarDate(2026, 5, 20),
        end: new CalendarDate(2026, 5, 27)
      })
    }),
    template: \`
      <div style="display: flex; justify-content: center; align-items: center; padding: 16px;">
        <UiDateRangePicker v-model="value" size="sm" />
      </div>
    \`
  }),
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...(re=(te=C.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};const _e=["Playground","Default","AllSizes","Disabled","MinMax","Showcase"];export{V as AllSizes,b as Default,z as Disabled,S as MinMax,U as Playground,C as Showcase,_e as __namedExportsOrder,Fe as default};
