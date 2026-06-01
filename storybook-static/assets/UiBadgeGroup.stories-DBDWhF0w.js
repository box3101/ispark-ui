import{e as z,f as T,s as h,v as C,n as L,c as k,o as q}from"./vue.esm-bundler-UBndlgVH.js";import{_ as W}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{U as n}from"./UiBadge-Co7Yw1JZ.js";const D=["aria-label"],x=z({__name:"UiBadgeGroup",props:{gap:{default:8},direction:{default:"row"},wrap:{type:Boolean,default:!0},ariaLabel:{default:void 0}},setup(a){const g=a,V=k(()=>typeof g.gap=="number"?`${g.gap}px`:g.gap);return(_,$)=>(q(),T("div",{class:L(["ui-badge-group",[`direction-${a.direction}`,{"is-wrap":a.wrap}]]),style:C({gap:V.value}),role:"group","aria-label":a.ariaLabel},[h(_.$slots,"default",{},void 0,!0)],14,D))}}),e=W(x,[["__scopeId","data-v-2d4e43b6"]]);x.__docgenInfo={exportName:"default",displayName:"UiBadgeGroup",description:"",tags:{},props:[{name:"gap",description:"badge 사이 간격 — number는 px, string은 그대로 (예: '8px', '0.5rem'). 기본 8",required:!1,type:{name:"union",elements:[{name:"number"},{name:"string"}]},defaultValue:{func:!1,value:"8"}},{name:"direction",description:"배치 방향. 기본 'row'",required:!1,type:{name:"union",elements:[{name:'"row"'},{name:'"column"'}]},defaultValue:{func:!1,value:"'row'"}},{name:"wrap",description:"한 줄을 넘으면 다음 줄로 wrap. 기본 true",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"ariaLabel",description:"그룹 라벨 (스크린리더용). 예: '상태', '카테고리'",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}}],slots:[{name:"default"}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiBadgeGroup.vue"]};const J={title:"Components/Display/UiBadgeGroup",component:e,tags:["autodocs"],parameters:{docs:{description:{component:`
여러 \`UiBadge\`를 묶는 wrapper. \`gap\` prop으로 badge 사이 간격 제어.

- **gap**: number(px) 또는 string ('8px', '0.5rem' 등)
- **direction**: 'row'(기본) / 'column'
- **wrap**: 한 줄 넘으면 wrap (기본 true)
- **ariaLabel**: 그룹 스크린리더 라벨 (예: '상태 라벨 그룹')
        `}}},argTypes:{gap:{control:{type:"number",min:0,max:24,step:1},description:"badge 사이 간격 — number는 px, string은 그대로 사용",table:{defaultValue:{summary:"8"}}},direction:{control:"inline-radio",options:["row","column"],table:{defaultValue:{summary:"'row'"}}},wrap:{control:"boolean",table:{defaultValue:{summary:"true"}}},ariaLabel:{control:"text",description:"스크린리더용 그룹 라벨"}}},r={args:{gap:8},render:a=>({components:{UiBadgeGroup:e,UiBadge:n},setup:()=>({args:a}),template:`
      <UiBadgeGroup v-bind="args" aria-label="상태 라벨 그룹">
        <UiBadge variant="success">완료</UiBadge>
        <UiBadge variant="warning">대기</UiBadge>
        <UiBadge variant="danger">실패</UiBadge>
        <UiBadge variant="info">정보</UiBadge>
      </UiBadgeGroup>
    `})},i={name:"좁은 간격 (gap=4)",args:{gap:4},render:a=>({components:{UiBadgeGroup:e,UiBadge:n},setup:()=>({args:a}),template:`
      <UiBadgeGroup v-bind="args">
        <UiBadge variant="primary">Vue 3</UiBadge>
        <UiBadge variant="primary">TypeScript</UiBadge>
        <UiBadge variant="primary">Vite</UiBadge>
        <UiBadge variant="primary">Pinia</UiBadge>
      </UiBadgeGroup>
    `})},d={name:"넓은 간격 (gap=16)",args:{gap:16},render:a=>({components:{UiBadgeGroup:e,UiBadge:n},setup:()=>({args:a}),template:`
      <UiBadgeGroup v-bind="args">
        <UiBadge variant="success" size="md">활성</UiBadge>
        <UiBadge variant="default" size="md">보관</UiBadge>
        <UiBadge variant="warning" size="md">검토중</UiBadge>
      </UiBadgeGroup>
    `})},t={name:"세로 배치 (column)",args:{gap:6,direction:"column"},render:a=>({components:{UiBadgeGroup:e,UiBadge:n},setup:()=>({args:a}),template:`
      <UiBadgeGroup v-bind="args">
        <UiBadge variant="success">완료 12건</UiBadge>
        <UiBadge variant="warning">진행중 3건</UiBadge>
        <UiBadge variant="danger">실패 1건</UiBadge>
      </UiBadgeGroup>
    `})},o={name:"자동 줄바꿈 (wrap)",args:{gap:8},render:a=>({components:{UiBadgeGroup:e,UiBadge:n},setup:()=>({args:a}),template:`
      <div style="max-width: 280px;">
        <UiBadgeGroup v-bind="args">
          <UiBadge variant="info">JavaScript</UiBadge>
          <UiBadge variant="info">TypeScript</UiBadge>
          <UiBadge variant="info">Vue</UiBadge>
          <UiBadge variant="info">React</UiBadge>
          <UiBadge variant="info">Svelte</UiBadge>
          <UiBadge variant="info">Solid</UiBadge>
          <UiBadge variant="info">Angular</UiBadge>
        </UiBadgeGroup>
      </div>
    `})};var s,p,u;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    gap: 8
  },
  render: args => ({
    components: {
      UiBadgeGroup,
      UiBadge
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiBadgeGroup v-bind="args" aria-label="상태 라벨 그룹">
        <UiBadge variant="success">완료</UiBadge>
        <UiBadge variant="warning">대기</UiBadge>
        <UiBadge variant="danger">실패</UiBadge>
        <UiBadge variant="info">정보</UiBadge>
      </UiBadgeGroup>
    \`
  })
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,B,c;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: '좁은 간격 (gap=4)',
  args: {
    gap: 4
  },
  render: args => ({
    components: {
      UiBadgeGroup,
      UiBadge
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiBadgeGroup v-bind="args">
        <UiBadge variant="primary">Vue 3</UiBadge>
        <UiBadge variant="primary">TypeScript</UiBadge>
        <UiBadge variant="primary">Vite</UiBadge>
        <UiBadge variant="primary">Pinia</UiBadge>
      </UiBadgeGroup>
    \`
  })
}`,...(c=(B=i.parameters)==null?void 0:B.docs)==null?void 0:c.source}}};var U,l,v;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: '넓은 간격 (gap=16)',
  args: {
    gap: 16
  },
  render: args => ({
    components: {
      UiBadgeGroup,
      UiBadge
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiBadgeGroup v-bind="args">
        <UiBadge variant="success" size="md">활성</UiBadge>
        <UiBadge variant="default" size="md">보관</UiBadge>
        <UiBadge variant="warning" size="md">검토중</UiBadge>
      </UiBadgeGroup>
    \`
  })
}`,...(v=(l=d.parameters)==null?void 0:l.docs)==null?void 0:v.source}}};var f,b,G;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: '세로 배치 (column)',
  args: {
    gap: 6,
    direction: 'column'
  },
  render: args => ({
    components: {
      UiBadgeGroup,
      UiBadge
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiBadgeGroup v-bind="args">
        <UiBadge variant="success">완료 12건</UiBadge>
        <UiBadge variant="warning">진행중 3건</UiBadge>
        <UiBadge variant="danger">실패 1건</UiBadge>
      </UiBadgeGroup>
    \`
  })
}`,...(G=(b=t.parameters)==null?void 0:b.docs)==null?void 0:G.source}}};var y,w,S;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: '자동 줄바꿈 (wrap)',
  args: {
    gap: 8
  },
  render: args => ({
    components: {
      UiBadgeGroup,
      UiBadge
    },
    setup: () => ({
      args
    }),
    template: \`
      <div style="max-width: 280px;">
        <UiBadgeGroup v-bind="args">
          <UiBadge variant="info">JavaScript</UiBadge>
          <UiBadge variant="info">TypeScript</UiBadge>
          <UiBadge variant="info">Vue</UiBadge>
          <UiBadge variant="info">React</UiBadge>
          <UiBadge variant="info">Svelte</UiBadge>
          <UiBadge variant="info">Solid</UiBadge>
          <UiBadge variant="info">Angular</UiBadge>
        </UiBadgeGroup>
      </div>
    \`
  })
}`,...(S=(w=o.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};const N=["Default","TightGap","WideGap","Column","Wrap"];export{t as Column,r as Default,i as TightGap,d as WideGap,o as Wrap,N as __namedExportsOrder,J as default};
