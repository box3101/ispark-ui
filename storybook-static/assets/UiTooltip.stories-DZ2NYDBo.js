import{e as N,p as m,u as n,o as U,j as i,g as a,s as f,v as $,n as R,q as E,t as F,l as H}from"./vue.esm-bundler-UBndlgVH.js";import{a6 as P,a7 as j,a8 as I,a9 as L,aa as G,ab as W}from"./index-yTw_IPk6.js";import{U as o}from"./UiButton-Cb1n7GIR.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const e=N({__name:"UiTooltip",props:{content:{default:""},contentClass:{default:""},fontSize:{default:""},side:{default:"top"},sideOffset:{default:6},align:{default:"center"},delayDuration:{default:200},showArrow:{type:Boolean,default:!0}},setup(t){return(c,J)=>(U(),m(n(W),{"delay-duration":t.delayDuration},{default:i(()=>[a(n(P),null,{default:i(()=>[a(n(j),{"as-child":""},{default:i(()=>[f(c.$slots,"default")]),_:3}),a(n(I),null,{default:i(()=>[a(n(L),{class:R(["ui-tooltip-content",t.contentClass]),style:$(t.fontSize?{fontSize:t.fontSize}:void 0),side:t.side,"side-offset":t.sideOffset,align:t.align},{default:i(()=>[f(c.$slots,"content",{},()=>[E(F(t.content),1)]),t.showArrow?(U(),m(n(G),{key:0,class:"ui-tooltip-arrow"})):H("",!0)]),_:3},8,["class","style","side","side-offset","align"])]),_:3})]),_:3})]),_:3},8,["delay-duration"]))}});e.__docgenInfo={exportName:"default",displayName:"UiTooltip",description:"",tags:{},props:[{name:"content",description:"툴팁 본문 텍스트. content 슬롯 지정 시 무시",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"contentClass",description:"radix portal 콘텐츠 박스 추가 클래스 (페이지별 스타일 오버라이드)",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"fontSize",description:"본문 글자 크기 (예: '11px'). 비우면 SCSS 기본($font-size-xs)",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"side",required:!1,type:{name:"union",elements:[{name:'"top"'},{name:'"right"'},{name:'"bottom"'},{name:'"left"'}]},defaultValue:{func:!1,value:"'top'"}},{name:"sideOffset",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"6"}},{name:"align",required:!1,type:{name:"union",elements:[{name:'"start"'},{name:'"center"'},{name:'"end"'}]},defaultValue:{func:!1,value:"'center'"}},{name:"delayDuration",description:"hover 후 표시 지연 (ms). 기본 200",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"200"}},{name:"showArrow",description:"화살표 표시 (기본 true)",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],slots:[{name:"default"},{name:"content"}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiTooltip.vue"]};const Y={title:"Components/Overlay/UiTooltip",component:e,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"\nispark-ui 표준 툴팁 — radix-vue `Tooltip` 프리미티브 래핑. 접근성/포커스/ESC 닫기/포지셔닝 위임.\n\n## 언제 사용하나\n- 아이콘 버튼의 의미 안내 (icon-only)\n- 짧은 부가 설명 (긴 글은 모달/패널 사용)\n- 비활성 요소의 비활성 사유 안내\n\n## API\n- **`content`** `string` — 본문 텍스트. `#content` 슬롯 지정 시 무시\n- **`side`** `'top' | 'right' | 'bottom' | 'left'` — 표시 위치 (기본 top). 공간 부족 시 radix 자동 flip\n- **`sideOffset`** `number` — trigger와의 간격 (기본 6px)\n- **`align`** `'start' | 'center' | 'end'` — 정렬 (기본 center)\n- **`delayDuration`** `number` — hover 표시 지연 ms (기본 200)\n- **`showArrow`** `boolean` — 화살표 표시 (기본 true)\n- **`fontSize`** `string` — 본문 글자 크기 override (예: `'11px'`)\n- **`contentClass`** `string` — radix portal 박스에 추가 클래스 (페이지 스타일 override)\n\n## 슬롯\n- **default** — trigger 영역 (호버 대상). `as-child` 패턴 — 자식 1개를 그대로 trigger로\n- **content** — 본문 커스텀. 텍스트만 필요하면 `content` prop 사용\n\n## 접근성\n- radix-vue가 처리: role=\"tooltip\" + aria-describedby + 포커스 시 표시 + ESC 닫기\n- `prefers-reduced-motion: reduce` 시 fade-in 정지\n\n## 디자인 토큰\n- 배경: `$color-text-dark` (#5c6677) — 짙은 회색 토속\n- z-index: `$z-toast` (500) — 모달 위에 표시 가능\n        "}}},argTypes:{side:{control:"inline-radio",options:["top","right","bottom","left"]},align:{control:"inline-radio",options:["start","center","end"]},delayDuration:{control:{type:"number",min:0,max:1e3,step:50}},sideOffset:{control:{type:"number",min:0,max:20}},showArrow:{control:"boolean"}}},r={args:{content:"저장하지 않은 변경 사항이 있습니다.",side:"top",align:"center",sideOffset:6,delayDuration:200,showArrow:!0},render:t=>({components:{UiTooltip:e,UiButton:o},setup:()=>({args:t}),template:`
      <UiTooltip v-bind="args">
        <UiButton variant="primary">호버 해보세요</UiButton>
      </UiTooltip>
    `})},l={args:{content:"편집하기"},render:t=>({components:{UiTooltip:e,UiButton:o},setup:()=>({args:t}),template:`
      <UiTooltip v-bind="args">
        <UiButton variant="ghost" icon-only aria-label="편집">✏️</UiButton>
      </UiTooltip>
    `})},s={render:()=>({components:{UiTooltip:e,UiButton:o},template:`
      <div style="display: grid; grid-template-columns: repeat(2, auto); gap: 60px; padding: 40px;">
        <UiTooltip content="top 방향" side="top">
          <UiButton variant="outline">Top</UiButton>
        </UiTooltip>
        <UiTooltip content="right 방향" side="right">
          <UiButton variant="outline">Right</UiButton>
        </UiTooltip>
        <UiTooltip content="bottom 방향" side="bottom">
          <UiButton variant="outline">Bottom</UiButton>
        </UiTooltip>
        <UiTooltip content="left 방향" side="left">
          <UiButton variant="outline">Left</UiButton>
        </UiTooltip>
      </div>
    `})},p={render:()=>({components:{UiTooltip:e,UiButton:o},template:`
      <UiTooltip side="right">
        <UiButton variant="primary">상세 안내</UiButton>
        <template #content>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">📝 변경 사항</div>
            <div style="font-size: 11px; opacity: 0.9; line-height: 1.6;">
              저장 시 자동 백업이 생성됩니다.<br/>
              <span style="color: #fbbf24;">⚠ 충돌 시 수동 병합 필요</span>
            </div>
          </div>
        </template>
      </UiTooltip>
    `})},d={render:()=>({components:{UiTooltip:e,UiButton:o},template:`
      <UiTooltip content="관리자 권한이 필요합니다." side="top">
        <span style="display: inline-block;">
          <UiButton variant="primary" disabled>삭제</UiButton>
        </span>
      </UiTooltip>
    `})},u={render:()=>({components:{UiTooltip:e,UiButton:o},template:`
      <div style="display: flex; gap: 16px; padding: 40px;">
        <UiTooltip content="즉시 표시" :delay-duration="0">
          <UiButton variant="outline">delay 0ms</UiButton>
        </UiTooltip>
        <UiTooltip content="기본 200ms" :delay-duration="200">
          <UiButton variant="outline">delay 200ms</UiButton>
        </UiTooltip>
        <UiTooltip content="긴 호버 후 표시" :delay-duration="800">
          <UiButton variant="outline">delay 800ms</UiButton>
        </UiTooltip>
      </div>
    `})};var g,y,T;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    content: '저장하지 않은 변경 사항이 있습니다.',
    side: 'top',
    align: 'center',
    sideOffset: 6,
    delayDuration: 200,
    showArrow: true
  },
  render: args => ({
    components: {
      UiTooltip,
      UiButton
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiTooltip v-bind="args">
        <UiButton variant="primary">호버 해보세요</UiButton>
      </UiTooltip>
    \`
  })
}`,...(T=(y=r.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var v,B,b;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    content: '편집하기'
  },
  render: args => ({
    components: {
      UiTooltip,
      UiButton
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiTooltip v-bind="args">
        <UiButton variant="ghost" icon-only aria-label="편집">✏️</UiButton>
      </UiTooltip>
    \`
  })
}`,...(b=(B=l.parameters)==null?void 0:B.docs)==null?void 0:b.source}}};var h,x,S;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiTooltip,
      UiButton
    },
    template: \`
      <div style="display: grid; grid-template-columns: repeat(2, auto); gap: 60px; padding: 40px;">
        <UiTooltip content="top 방향" side="top">
          <UiButton variant="outline">Top</UiButton>
        </UiTooltip>
        <UiTooltip content="right 방향" side="right">
          <UiButton variant="outline">Right</UiButton>
        </UiTooltip>
        <UiTooltip content="bottom 방향" side="bottom">
          <UiButton variant="outline">Bottom</UiButton>
        </UiTooltip>
        <UiTooltip content="left 방향" side="left">
          <UiButton variant="outline">Left</UiButton>
        </UiTooltip>
      </div>
    \`
  })
}`,...(S=(x=s.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var w,C,D;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiTooltip,
      UiButton
    },
    template: \`
      <UiTooltip side="right">
        <UiButton variant="primary">상세 안내</UiButton>
        <template #content>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">📝 변경 사항</div>
            <div style="font-size: 11px; opacity: 0.9; line-height: 1.6;">
              저장 시 자동 백업이 생성됩니다.<br/>
              <span style="color: #fbbf24;">⚠ 충돌 시 수동 병합 필요</span>
            </div>
          </div>
        </template>
      </UiTooltip>
    \`
  })
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var z,V,q;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiTooltip,
      UiButton
    },
    template: \`
      <UiTooltip content="관리자 권한이 필요합니다." side="top">
        <span style="display: inline-block;">
          <UiButton variant="primary" disabled>삭제</UiButton>
        </span>
      </UiTooltip>
    \`
  })
}`,...(q=(V=d.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var k,O,A;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiTooltip,
      UiButton
    },
    template: \`
      <div style="display: flex; gap: 16px; padding: 40px;">
        <UiTooltip content="즉시 표시" :delay-duration="0">
          <UiButton variant="outline">delay 0ms</UiButton>
        </UiTooltip>
        <UiTooltip content="기본 200ms" :delay-duration="200">
          <UiButton variant="outline">delay 200ms</UiButton>
        </UiTooltip>
        <UiTooltip content="긴 호버 후 표시" :delay-duration="800">
          <UiButton variant="outline">delay 800ms</UiButton>
        </UiTooltip>
      </div>
    \`
  })
}`,...(A=(O=u.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};const Z=["Playground","Default","FourSides","RichContent","DisabledHint","DelayVariants"];export{l as Default,u as DelayVariants,d as DisabledHint,s as FourSides,r as Playground,p as RichContent,Z as __namedExportsOrder,Y as default};
