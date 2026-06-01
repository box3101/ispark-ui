import{f as O}from"./index-CpO9RqPZ.js";import{e as le,r as _,w as C,p,j as r,u as i,o as l,f as y,v as se,g as M,s as k,n as h,q as de,t as H,l as I,k as V,F as ue,m as pe,c as q}from"./vue.esm-bundler-UBndlgVH.js";import{x as T,y as ce,C as me,F as ge,H as fe,L as ve}from"./index-yTw_IPk6.js";import{U as d}from"./UiButton-Cb1n7GIR.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const be={class:"ui-dropdown-content-list"},Ue={class:"ui-dropdown-item-label"},a=le({__name:"UiDropdownMenu",props:{items:{},title:{default:""},open:{type:Boolean,default:void 0},side:{default:"bottom"},align:{default:"end"},sideOffset:{default:5},collisionPadding:{default:8},openOnHover:{type:Boolean,default:!1},hoverCloseDelay:{default:300},contentClass:{default:""}},emits:["select","update:open"],setup(e,{emit:B}){const n=e,ee=q(()=>n.openOnHover?0:n.sideOffset),ne=q(()=>{if(!n.openOnHover)return{};const t=`${n.sideOffset+4}px`;return{display:"inline-block",[{top:"paddingTop",bottom:"paddingBottom",left:"paddingLeft",right:"paddingRight"}[n.side]]:t}}),S=B,s=_(n.open??!1);let u=null;const w=()=>{u&&(clearTimeout(u),u=null)},x=()=>{w(),u=setTimeout(()=>{s.value=!1},n.hoverCloseDelay)},te=()=>{n.openOnHover&&(w(),s.value=!0)},oe=()=>{n.openOnHover&&x()},ae=()=>{n.openOnHover&&w()},re=()=>{n.openOnHover&&x()},ie=t=>{t.disabled||S("select",t.value)};return C(()=>n.open,t=>{t!==void 0&&(s.value=t)},{immediate:!0}),C(s,t=>S("update:open",t)),(t,D)=>(l(),p(i(ve),{open:s.value,"onUpdate:open":D[0]||(D[0]=o=>s.value=o),modal:!1},{default:r(()=>[e.openOnHover?(l(),y("div",{key:0,class:"ui-dropdown-hover-wrap",style:se(ne.value),onMouseenter:te,onMouseleave:oe},[M(i(T),{"as-child":""},{default:r(()=>[k(t.$slots,"trigger")]),_:3})],36)):(l(),p(i(T),{key:1,"as-child":""},{default:r(()=>[k(t.$slots,"trigger")]),_:3})),M(i(ce),null,{default:r(()=>[M(i(me),{class:h(["ui-dropdown-content",{"ui-dropdown-content--titled":!!e.title},e.contentClass||void 0]),side:e.side,"side-offset":ee.value,align:e.align,"collision-padding":e.collisionPadding,onMouseenter:ae,onMouseleave:re},{default:r(()=>[e.title?(l(),p(i(ge),{key:0,class:"ui-dropdown-title"},{default:r(()=>[de(H(e.title),1)]),_:1})):I("",!0),V("div",be,[(l(!0),y(ue,null,pe(e.items,o=>(l(),p(i(fe),{key:o.value,class:h(["ui-dropdown-item",{"is-danger":o.color==="danger"}]),disabled:o.disabled,onSelect:we=>ie(o)},{default:r(()=>[o.icon?(l(),y("i",{key:0,class:h([o.icon,"size-16"]),"aria-hidden":"true"},null,2)):I("",!0),V("span",Ue,H(o.label),1)]),_:2},1032,["class","disabled","onSelect"]))),128))])]),_:1},8,["class","side","side-offset","align","collision-padding"])]),_:1})]),_:3},8,["open"]))}});a.__docgenInfo={exportName:"default",displayName:"UiDropdownMenu",description:"",tags:{},props:[{name:"items",required:!0,type:{name:"Array",elements:[{name:"DropdownMenuItemDef"}]}},{name:"title",description:"상단 비클릭 라벨 (DropdownMenuLabel) — 구역 안내용",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"open",description:"제어 모드: v-model:open",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"undefined"}},{name:"side",required:!1,type:{name:"union",elements:[{name:'"top"'},{name:'"bottom"'},{name:'"left"'},{name:'"right"'}]},defaultValue:{func:!1,value:"'bottom'"}},{name:"align",required:!1,type:{name:"union",elements:[{name:'"start"'},{name:'"center"'},{name:'"end"'}]},defaultValue:{func:!1,value:"'end'"}},{name:"sideOffset",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"5"}},{name:"collisionPadding",description:"뷰포트 경계 최소 여백 (flip 기준)",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"8"}},{name:"openOnHover",description:"트리거 hover 시 자동 오픈",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"hoverCloseDelay",description:"hover 해제 후 닫힘 지연 ms. 너무 짧으면 trigger→content 이동 중 깜빡임 발생. 기본 300",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"300"}},{name:"contentClass",description:"포털 콘텐츠에 추가 클래스 (글로벌 SCSS override 진입점)",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}}],events:[{name:"select",type:{names:["string"]}},{name:"update:open",type:{names:["boolean"]}}],slots:[{name:"trigger"}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiDropdownMenu.vue"]};const Se={title:"Components/Overlay/UiDropdownMenu",component:a,tags:["autodocs"],args:{onSelect:O(),"onUpdate:open":O()},parameters:{layout:"centered",docs:{description:{component:"\nispark-ui 표준 드롭다운 메뉴 — radix-vue `DropdownMenu` 프리미티브 래핑. 카드/행의 액션 트리거, 사이드바 메뉴, 컨텍스트 메뉴 등에 사용.\n\n## API\n- **`items`** `DropdownMenuItemDef[]` — 메뉴 항목 배열 (`{ label, value, icon?, color?, disabled? }`)\n- **`title`** `string` — 상단 비클릭 라벨 (구역 안내)\n- **`open`** `boolean` — v-model:open으로 외부 제어\n- **`side`** / **`align`** / **`sideOffset`** / **`collisionPadding`** — radix 포지셔닝\n- **`openOnHover`** + **`hoverCloseDelay`** — hover로 자동 오픈/닫기\n- **`contentClass`** — 포털 콘텐츠에 추가 클래스 (글로벌 SCSS override 진입점)\n\n## DropdownMenuItemDef\n```ts\ninterface DropdownMenuItemDef {\n  label: string\n  value: string                       // @select payload\n  icon?: string                       // 'icon-edit' 등 ispark-ui 아이콘 클래스\n  color?: 'default' | 'danger'        // danger는 빨강\n  disabled?: boolean\n}\n```\n\n## 슬롯\n- **trigger** (필수) — 트리거 영역. radix의 `as-child` 패턴으로 wrap\n\n## 이벤트\n- `select` — `(value: string)`. 메뉴 항목 클릭 시 payload는 `item.value`\n- `update:open` — v-model:open\n\n## 접근성\n- radix-vue 처리: role=menu / aria-orientation / 화살표 키 / Home/End / Esc / 포커스 트랩 / typeahead\n- `disabled` 항목은 `data-disabled` 자동 + 키보드 skip\n- `prefers-reduced-motion: reduce` 시 진입/퇴장 애니메이션 정지\n        "}}},argTypes:{side:{control:"inline-radio",options:["top","right","bottom","left"]},align:{control:"inline-radio",options:["start","center","end"]},sideOffset:{control:{type:"number",min:0,max:20}},collisionPadding:{control:{type:"number",min:0,max:30}},openOnHover:{control:"boolean"},hoverCloseDelay:{control:{type:"number",min:0,max:1e3,step:50}}}},U=[{label:"편집",value:"edit",icon:"icon-edit"},{label:"복사",value:"copy",icon:"icon-check"},{label:"다운로드",value:"download",icon:"icon-download"},{label:"삭제",value:"delete",icon:"icon-trashcan",color:"danger"}],c={args:{items:U,side:"bottom",align:"end",sideOffset:5,openOnHover:!1},render:e=>({components:{UiDropdownMenu:a,UiButton:d},setup:()=>({args:e}),template:`
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="outline">메뉴 열기 ▾</UiButton>
        </template>
      </UiDropdownMenu>
    `})},m={args:{items:U},render:e=>({components:{UiDropdownMenu:a,UiButton:d},setup:()=>({args:e}),template:`
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="outline">⋯</UiButton>
        </template>
      </UiDropdownMenu>
    `})},g={args:{title:"계정",items:[{label:"프로필 설정",value:"profile",icon:"icon-edit"},{label:"비밀번호 변경",value:"pwd",icon:"icon-check"},{label:"로그아웃",value:"logout",icon:"icon-close",color:"danger"}],align:"start"},render:e=>({components:{UiDropdownMenu:a,UiButton:d},setup:()=>({args:e}),template:`
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="ghost">👤 사용자</UiButton>
        </template>
      </UiDropdownMenu>
    `})},f={args:{items:[{label:"편집",value:"edit",icon:"icon-edit"},{label:"복사 (잠금)",value:"copy",icon:"icon-check",disabled:!0},{label:"내보내기",value:"export",icon:"icon-download"},{label:"삭제",value:"delete",icon:"icon-trashcan",color:"danger"}]},render:e=>({components:{UiDropdownMenu:a,UiButton:d},setup:()=>({args:e}),template:`
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="outline">액션</UiButton>
        </template>
      </UiDropdownMenu>
    `})},v={args:{items:U,openOnHover:!0,hoverCloseDelay:300,side:"right",align:"start"},render:e=>({components:{UiDropdownMenu:a,UiButton:d},setup:()=>({args:e}),template:`
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="ghost">📁 폴더 (호버)</UiButton>
        </template>
      </UiDropdownMenu>
    `})},b={render:()=>({components:{UiDropdownMenu:a,UiButton:d},setup:()=>{const e=_(null);return{items:U,lastSelect:e,onSelect:n=>{e.value=n}}},template:`
      <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px;">
        <UiDropdownMenu :items="items" @select="onSelect">
          <template #trigger>
            <UiButton variant="primary">메뉴 ▾</UiButton>
          </template>
        </UiDropdownMenu>
        <div style="padding: 10px 14px; background: #f4f7f9; border-radius: 6px; font-size: 13px; color: #4d5462;">
          <strong>마지막 선택:</strong>
          <span v-if="lastSelect" style="margin-left: 8px; color: #3c69db;">{{ lastSelect }}</span>
          <span v-else style="margin-left: 8px; color: #6f7a93;">(아직 없음)</span>
        </div>
      </div>
    `})};var L,P,E;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    items: baseItems,
    side: 'bottom',
    align: 'end',
    sideOffset: 5,
    openOnHover: false
  },
  render: args => ({
    components: {
      UiDropdownMenu,
      UiButton
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="outline">메뉴 열기 ▾</UiButton>
        </template>
      </UiDropdownMenu>
    \`
  })
}`,...(E=(P=c.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};var N,z,F;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    items: baseItems
  },
  render: args => ({
    components: {
      UiDropdownMenu,
      UiButton
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="outline">⋯</UiButton>
        </template>
      </UiDropdownMenu>
    \`
  })
}`,...(F=(z=m.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};var W,$,A;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    title: '계정',
    items: [{
      label: '프로필 설정',
      value: 'profile',
      icon: 'icon-edit'
    }, {
      label: '비밀번호 변경',
      value: 'pwd',
      icon: 'icon-check'
    }, {
      label: '로그아웃',
      value: 'logout',
      icon: 'icon-close',
      color: 'danger'
    }],
    align: 'start'
  },
  render: args => ({
    components: {
      UiDropdownMenu,
      UiButton
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="ghost">👤 사용자</UiButton>
        </template>
      </UiDropdownMenu>
    \`
  })
}`,...(A=($=g.parameters)==null?void 0:$.docs)==null?void 0:A.source}}};var j,R,G;f.parameters={...f.parameters,docs:{...(j=f.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    items: [{
      label: '편집',
      value: 'edit',
      icon: 'icon-edit'
    }, {
      label: '복사 (잠금)',
      value: 'copy',
      icon: 'icon-check',
      disabled: true
    }, {
      label: '내보내기',
      value: 'export',
      icon: 'icon-download'
    }, {
      label: '삭제',
      value: 'delete',
      icon: 'icon-trashcan',
      color: 'danger'
    }]
  },
  render: args => ({
    components: {
      UiDropdownMenu,
      UiButton
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="outline">액션</UiButton>
        </template>
      </UiDropdownMenu>
    \`
  })
}`,...(G=(R=f.parameters)==null?void 0:R.docs)==null?void 0:G.source}}};var J,K,Q;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    items: baseItems,
    openOnHover: true,
    hoverCloseDelay: 300,
    side: 'right',
    align: 'start'
  },
  render: args => ({
    components: {
      UiDropdownMenu,
      UiButton
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiDropdownMenu v-bind="args">
        <template #trigger>
          <UiButton variant="ghost">📁 폴더 (호버)</UiButton>
        </template>
      </UiDropdownMenu>
    \`
  })
}`,...(Q=(K=v.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Y,Z;b.parameters={...b.parameters,docs:{...(X=b.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiDropdownMenu,
      UiButton
    },
    setup: () => {
      const lastSelect = ref<string | null>(null);
      const onSelect = (value: string) => {
        lastSelect.value = value;
      };
      return {
        items: baseItems,
        lastSelect,
        onSelect
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px;">
        <UiDropdownMenu :items="items" @select="onSelect">
          <template #trigger>
            <UiButton variant="primary">메뉴 ▾</UiButton>
          </template>
        </UiDropdownMenu>
        <div style="padding: 10px 14px; background: #f4f7f9; border-radius: 6px; font-size: 13px; color: #4d5462;">
          <strong>마지막 선택:</strong>
          <span v-if="lastSelect" style="margin-left: 8px; color: #3c69db;">{{ lastSelect }}</span>
          <span v-else style="margin-left: 8px; color: #6f7a93;">(아직 없음)</span>
        </div>
      </div>
    \`
  })
}`,...(Z=(Y=b.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const xe=["Playground","Default","WithTitle","WithDisabledItem","OpenOnHover","SelectionLive"];export{m as Default,v as OpenOnHover,c as Playground,b as SelectionLive,f as WithDisabledItem,g as WithTitle,xe as __namedExportsOrder,Se as default};
