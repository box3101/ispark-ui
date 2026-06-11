import{w as E,e as t}from"./index-CpO9RqPZ.js";import{U as e}from"./UiBadge-Co7Yw1JZ.js";import"./vue.esm-bundler-UBndlgVH.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const D={title:"Components/Display/UiBadge",component:e,tags:["autodocs"],parameters:{docs:{description:{component:"\n짧은 라벨/상태 표시 컴포넌트. 시맨틱 5종 variant + 동적 `colorHex`로 도메인 특수 색까지 커버.\n\n## 시맨틱 variant 5종\n- **`default`** — 중립/카테고리 표기 (회색)\n- **`primary`** — 정보/일반 강조 (테마 primary 색)\n- **`success`** — 정상/완료 (초록)\n- **`warning`** — 점검/주의 (주황)\n- **`danger`** — 에러/위험 (빨강)\n\n도메인 특수 색(브랜드/카테고리별 컬러칩 등)은 시맨틱 대신 `colorHex` prop 사용.\n\n## API\n- **`variant`** `BadgeVariant` — 5종 시맨틱. 기본 `default`\n- **`size`** `'xs' | 'sm' | 'md' | 'lg'` — 20 / 22 / 24 / 26px. 기본 `sm`\n- **`iconOnly`** `boolean` — 텍스트 미렌더, 정사각형. `#icon-left` 또는 `#icon-right` 슬롯과 조합\n- **`colorHex`** `string` — 6/3자리 hex(`#22c55e` 등). variant 색 무시하고 동적 컬러 (text + light tint bg)\n- **`bgAlpha`** `number` — `colorHex` 사용 시 배경 투명도. 기본 `0.12`\n- **Slots** — `default`(텍스트) / `icon-left`, `icon-right`(아이콘, aria-hidden 자동)\n\n## 디자인 패턴\n- light tint (배경 12% 투명) + 짙은 텍스트 — 채도 낮은 UI 톤과 부조화 방지\n- selected row(0.08), hover(0.04)와 alpha 단계 일관\n        "}}},argTypes:{variant:{control:"inline-radio",options:["default","primary","success","warning","danger"],description:"시맨틱 variant. 도메인 특수 색은 colorHex 사용.",table:{category:"Appearance",type:{summary:"'default' | 'primary' | 'success' | 'warning' | 'danger'"},defaultValue:{summary:"'default'"}}},size:{control:"inline-radio",options:["xs","sm","md","lg"],description:"xs(20px) / sm(22px·기본) / md(24px) / lg(26px)",table:{category:"Appearance",type:{summary:"'xs' | 'sm' | 'md' | 'lg'"},defaultValue:{summary:"'sm'"}}},iconOnly:{control:"boolean",description:"아이콘 only 모드 — 정사각형, 텍스트 미렌더. icon-left/icon-right 슬롯과 조합.",table:{category:"Appearance",type:{summary:"boolean"},defaultValue:{summary:"false"}}},colorHex:{control:"color",description:"6/3자리 hex. variant 무시하고 동적 컬러 적용 (text + light tint bg).",table:{category:"Custom Color",type:{summary:"string"}}},bgAlpha:{control:{type:"number",min:0,max:1,step:.02},description:"colorHex 사용 시 배경 투명도. 0~1.",table:{category:"Custom Color",type:{summary:"number"},defaultValue:{summary:"0.12"}}}}},r={args:{variant:"success",size:"sm",iconOnly:!1},render:a=>({components:{UiBadge:e},setup:()=>({args:a}),template:'<UiBadge v-bind="args">정상</UiBadge>'})},n={render:()=>({components:{UiBadge:e},template:`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiBadge variant="default">기본</UiBadge>
        <UiBadge variant="primary">정보</UiBadge>
        <UiBadge variant="success">정상</UiBadge>
        <UiBadge variant="warning">점검</UiBadge>
        <UiBadge variant="danger">오류</UiBadge>
      </div>
    `}),play:async({canvasElement:a})=>{const i=E(a);await t(i.getByText("기본")).toBeTruthy(),await t(i.getByText("정상")).toBeTruthy(),await t(i.getByText("오류")).toBeTruthy()}},s={render:()=>({components:{UiBadge:e},template:`
      <div style="display: flex; gap: 8px; align-items: center;">
        <UiBadge variant="primary" size="xs">xs (20)</UiBadge>
        <UiBadge variant="primary" size="sm">sm (22)</UiBadge>
        <UiBadge variant="primary" size="md">md (24)</UiBadge>
        <UiBadge variant="primary" size="lg">lg (26)</UiBadge>
      </div>
    `})},o={render:()=>({components:{UiBadge:e},template:`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiBadge variant="success">
          <template #icon-left><i class="icon-check size-12" /></template>
          완료
        </UiBadge>
        <UiBadge variant="warning">
          <template #icon-left><i class="icon-refresh size-12" /></template>
          진행 중
        </UiBadge>
        <UiBadge variant="danger">
          <template #icon-right><i class="icon-close size-12" /></template>
          실패
        </UiBadge>
      </div>
    `})},c={render:()=>({components:{UiBadge:e},template:`
      <div style="display: flex; gap: 8px; align-items: center;">
        <UiBadge variant="success" icon-only size="sm">
          <template #icon-left><i class="icon-check size-12" /></template>
        </UiBadge>
        <UiBadge variant="danger" icon-only size="md">
          <template #icon-left><i class="icon-close size-12" /></template>
        </UiBadge>
        <UiBadge variant="primary" icon-only size="lg">
          <template #icon-left><i class="icon-plus size-12" /></template>
        </UiBadge>
      </div>
    `})},l={render:()=>({components:{UiBadge:e},template:`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiBadge color-hex="#4589e0">data-line</UiBadge>
        <UiBadge color-hex="#ac5e00">basic-chat</UiBadge>
        <UiBadge color-hex="#8f4fdf">manual-ai</UiBadge>
        <UiBadge color-hex="#0d8a5b">category</UiBadge>
        <UiBadge color-hex="#dd6b20" :bg-alpha="0.18">강조 (alpha 0.18)</UiBadge>
      </div>
    `}),play:async({canvasElement:a})=>{var p;const g=((p=E(a).getByText("data-line").closest(".ui-badge"))==null?void 0:p.getAttribute("style"))??"";await t(g.toLowerCase()).toContain("color: #4589e0"),await t(g.toLowerCase()).toContain("rgba(69, 137, 224")}},d={args:{variant:"success",colorHex:"not-a-color"},render:a=>({components:{UiBadge:e},setup:()=>({args:a}),template:'<UiBadge v-bind="args">잘못된 hex → success로 폴백</UiBadge>'})};var m,B,y;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    size: 'sm',
    iconOnly: false
  },
  render: args => ({
    components: {
      UiBadge
    },
    setup: () => ({
      args
    }),
    template: '<UiBadge v-bind="args">정상</UiBadge>'
  })
}`,...(y=(B=r.parameters)==null?void 0:B.docs)==null?void 0:y.source}}};var U,u,x;n.parameters={...n.parameters,docs:{...(U=n.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiBadge
    },
    template: \`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiBadge variant="default">기본</UiBadge>
        <UiBadge variant="primary">정보</UiBadge>
        <UiBadge variant="success">정상</UiBadge>
        <UiBadge variant="warning">점검</UiBadge>
        <UiBadge variant="danger">오류</UiBadge>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('기본')).toBeTruthy();
    await expect(canvas.getByText('정상')).toBeTruthy();
    await expect(canvas.getByText('오류')).toBeTruthy();
  }
}`,...(x=(u=n.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var v,f,h;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiBadge
    },
    template: \`
      <div style="display: flex; gap: 8px; align-items: center;">
        <UiBadge variant="primary" size="xs">xs (20)</UiBadge>
        <UiBadge variant="primary" size="sm">sm (22)</UiBadge>
        <UiBadge variant="primary" size="md">md (24)</UiBadge>
        <UiBadge variant="primary" size="lg">lg (26)</UiBadge>
      </div>
    \`
  })
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var b,w,z;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiBadge
    },
    template: \`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiBadge variant="success">
          <template #icon-left><i class="icon-check size-12" /></template>
          완료
        </UiBadge>
        <UiBadge variant="warning">
          <template #icon-left><i class="icon-refresh size-12" /></template>
          진행 중
        </UiBadge>
        <UiBadge variant="danger">
          <template #icon-right><i class="icon-close size-12" /></template>
          실패
        </UiBadge>
      </div>
    \`
  })
}`,...(z=(w=o.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var C,A,T;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiBadge
    },
    template: \`
      <div style="display: flex; gap: 8px; align-items: center;">
        <UiBadge variant="success" icon-only size="sm">
          <template #icon-left><i class="icon-check size-12" /></template>
        </UiBadge>
        <UiBadge variant="danger" icon-only size="md">
          <template #icon-left><i class="icon-close size-12" /></template>
        </UiBadge>
        <UiBadge variant="primary" icon-only size="lg">
          <template #icon-left><i class="icon-plus size-12" /></template>
        </UiBadge>
      </div>
    \`
  })
}`,...(T=(A=c.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var H,S,I;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiBadge
    },
    template: \`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiBadge color-hex="#4589e0">data-line</UiBadge>
        <UiBadge color-hex="#ac5e00">basic-chat</UiBadge>
        <UiBadge color-hex="#8f4fdf">manual-ai</UiBadge>
        <UiBadge color-hex="#0d8a5b">category</UiBadge>
        <UiBadge color-hex="#dd6b20" :bg-alpha="0.18">강조 (alpha 0.18)</UiBadge>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // colorHex 적용 검증 — inline style에 color 적용됨
    const badge = canvas.getByText('data-line');
    const styleAttr = badge.closest('.ui-badge')?.getAttribute('style') ?? '';
    await expect(styleAttr.toLowerCase()).toContain('color: #4589e0');
    await expect(styleAttr.toLowerCase()).toContain('rgba(69, 137, 224');
  }
}`,...(I=(S=l.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var O,V,k;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    colorHex: 'not-a-color'
  },
  render: args => ({
    components: {
      UiBadge
    },
    setup: () => ({
      args
    }),
    template: '<UiBadge v-bind="args">잘못된 hex → success로 폴백</UiBadge>'
  })
}`,...(k=(V=d.parameters)==null?void 0:V.docs)==null?void 0:k.source}}};const j=["Playground","AllVariants","AllSizes","WithIcon","IconOnly","CustomColorHex","InvalidHexFallback"];export{s as AllSizes,n as AllVariants,l as CustomColorHex,c as IconOnly,d as InvalidHexFallback,r as Playground,o as WithIcon,j as __namedExportsOrder,D as default};
