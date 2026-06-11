import{e as v}from"./index-CpO9RqPZ.js";import{e as A,p as F,g as o,j as a,u as t,T as I,o as M,A as E,q as H,t as d,k as r,n as O}from"./vue.esm-bundler-UBndlgVH.js";import{p as $,s as j,u as z,v as K,w as G}from"./index-yTw_IPk6.js";import{u as J,r as y,o as f}from"./useConfirm-8n4Tl6XL.js";import{_ as Q}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{U as l}from"./UiButton-Cb1n7GIR.js";import{U,o as p}from"./UiToast-UK3NPvz9.js";const R=["innerHTML"],W={class:"ui-confirm-actions"},q=A({__name:"UiConfirm",setup(n){const{confirmState:e}=J();function N(C){C||y(!1)}function g(){y(!1)}function V(){y(!0)}return(C,X)=>(M(),F(I,{to:"body"},[o(t(G),{open:t(e).open,"onUpdate:open":N},{default:a(()=>[o(t($),null,{default:a(()=>[o(t(j),{class:"ui-confirm-overlay"}),o(t(z),{class:"ui-confirm-content",onEscapeKeyDown:E(g,["prevent"])},{default:a(()=>[o(t(K),{class:"ui-confirm-title"},{default:a(()=>[H(d(t(e).title),1)]),_:1}),r("p",{class:"ui-confirm-message",innerHTML:t(e).message},null,8,R),r("div",W,[r("button",{type:"button",class:"ui-confirm-btn ui-confirm-btn--cancel",onClick:g},d(t(e).cancelText),1),r("button",{type:"button",class:O(["ui-confirm-btn",`ui-confirm-btn--${t(e).variant}`]),onClick:V},d(t(e).confirmText),3)])]),_:1})]),_:1})]),_:1},8,["open"])]))}}),i=Q(q,[["__scopeId","data-v-46e35320"]]);q.__docgenInfo={exportName:"default",displayName:"UiConfirm",description:"",tags:{},sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiConfirm.vue"]};const ae={title:"Components/Feedback/UiConfirm",component:i,tags:["autodocs"],parameters:{docs:{description:{component:`
\`UiConfirm\`은 모듈 싱글톤 기반 확인 다이얼로그. \`openConfirm()\`으로 어디서든 호출, \`Promise<boolean>\`을 반환.

## 사용

\`\`\`vue
<script setup>
import { UiConfirm, openConfirm, openToast } from 'ispark-ui'

async function onDelete() {
  const confirmed = await openConfirm({
    title: '삭제',
    message: '삭제하시겠습니까?',
  })
  if (!confirmed) return
  // 삭제 처리
  openToast({ message: '삭제되었습니다.', type: 'success' })
}
<\/script>

<template>
  <button @click="onDelete">삭제</button>
  <UiConfirm />  <!-- 앱 루트에 한 번 -->
</template>
\`\`\`

## API

- **\`title\`** 모달 제목 (기본: '확인')
- **\`message\`** 확인 메시지 (필수)
- **\`confirmText\`** 확인 버튼 텍스트 (기본: '확인')
- **\`cancelText\`** 취소 버튼 텍스트 (기본: '취소')
- **\`variant\`** \`'primary'\` | \`'danger'\` — 확인 버튼 색상 (기본: 'danger')
        `}}}},s={render:()=>({components:{UiButton:l,UiConfirm:i,UiToast:U},setup(){async function n(){await f({title:"삭제",message:`이 항목을 삭제하시겠습니까?
삭제된 항목은 복구할 수 없습니다.`})?p({message:"삭제되었습니다.",type:"success"}):p({message:"취소되었습니다.",type:"info"})}return{onDelete:n}},template:`
      <div>
        <UiButton variant="danger" @click="onDelete">삭제</UiButton>
        <UiConfirm />
        <UiToast />
      </div>
    `})},c={name:"Primary variant (저장)",render:()=>({components:{UiButton:l,UiConfirm:i,UiToast:U},setup(){async function n(){await f({title:"저장",message:"변경사항을 저장하시겠습니까?",variant:"primary",confirmText:"저장"})&&p({message:"저장되었습니다.",type:"success"})}return{onSave:n}},template:`
      <div>
        <UiButton variant="primary" @click="onSave">저장</UiButton>
        <UiConfirm />
        <UiToast />
      </div>
    `})},m={name:"커스텀 버튼 텍스트",render:()=>({components:{UiButton:l,UiConfirm:i,UiToast:U},setup(){async function n(){await f({title:"로그아웃",message:"로그아웃 하시겠습니까?",confirmText:"로그아웃",cancelText:"돌아가기",variant:"primary"})&&p({message:"로그아웃 되었습니다.",type:"info"})}return{onLogout:n}},template:`
      <div>
        <UiButton variant="secondary" @click="onLogout">로그아웃</UiButton>
        <UiConfirm />
        <UiToast />
      </div>
    `})},u={name:"자동 검증 (play)",render:()=>({components:{UiButton:l,UiConfirm:i},setup(){return f({title:"테스트",message:"자동으로 띄운 확인 다이얼로그"}),{}},template:"<UiConfirm />"}),play:async()=>{const n=document.querySelector(".ui-confirm-content");await v(n).toBeTruthy();const e=document.querySelector(".ui-confirm-title");await v(e==null?void 0:e.textContent).toBe("테스트")}};var T,B,_;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiButton,
      UiConfirm,
      UiToast
    },
    setup() {
      async function onDelete() {
        const confirmed = await openConfirm({
          title: '삭제',
          message: '이 항목을 삭제하시겠습니까?\\n삭제된 항목은 복구할 수 없습니다.'
        });
        if (confirmed) {
          openToast({
            message: '삭제되었습니다.',
            type: 'success'
          });
        } else {
          openToast({
            message: '취소되었습니다.',
            type: 'info'
          });
        }
      }
      return {
        onDelete
      };
    },
    template: \`
      <div>
        <UiButton variant="danger" @click="onDelete">삭제</UiButton>
        <UiConfirm />
        <UiToast />
      </div>
    \`
  })
}`,...(_=(B=s.parameters)==null?void 0:B.docs)==null?void 0:_.source}}};var x,k,S;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Primary variant (저장)',
  render: () => ({
    components: {
      UiButton,
      UiConfirm,
      UiToast
    },
    setup() {
      async function onSave() {
        const confirmed = await openConfirm({
          title: '저장',
          message: '변경사항을 저장하시겠습니까?',
          variant: 'primary',
          confirmText: '저장'
        });
        if (confirmed) {
          openToast({
            message: '저장되었습니다.',
            type: 'success'
          });
        }
      }
      return {
        onSave
      };
    },
    template: \`
      <div>
        <UiButton variant="primary" @click="onSave">저장</UiButton>
        <UiConfirm />
        <UiToast />
      </div>
    \`
  })
}`,...(S=(k=c.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var w,b,D;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: '커스텀 버튼 텍스트',
  render: () => ({
    components: {
      UiButton,
      UiConfirm,
      UiToast
    },
    setup() {
      async function onLogout() {
        const confirmed = await openConfirm({
          title: '로그아웃',
          message: '로그아웃 하시겠습니까?',
          confirmText: '로그아웃',
          cancelText: '돌아가기',
          variant: 'primary'
        });
        if (confirmed) {
          openToast({
            message: '로그아웃 되었습니다.',
            type: 'info'
          });
        }
      }
      return {
        onLogout
      };
    },
    template: \`
      <div>
        <UiButton variant="secondary" @click="onLogout">로그아웃</UiButton>
        <UiConfirm />
        <UiToast />
      </div>
    \`
  })
}`,...(D=(b=m.parameters)==null?void 0:b.docs)==null?void 0:D.source}}};var P,h,L;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: '자동 검증 (play)',
  render: () => ({
    components: {
      UiButton,
      UiConfirm
    },
    setup() {
      // 스토리 마운트 시 자동 호출
      openConfirm({
        title: '테스트',
        message: '자동으로 띄운 확인 다이얼로그'
      });
      return {};
    },
    template: '<UiConfirm />'
  }),
  play: async () => {
    // Teleport 대상은 body. document로 검사
    const dialog = document.querySelector('.ui-confirm-content');
    await expect(dialog).toBeTruthy();
    const title = document.querySelector('.ui-confirm-title');
    await expect(title?.textContent).toBe('테스트');
  }
}`,...(L=(h=u.parameters)==null?void 0:h.docs)==null?void 0:L.source}}};const re=["Playground","PrimaryVariant","CustomText","AutoFire"];export{u as AutoFire,m as CustomText,s as Playground,c as PrimaryVariant,re as __namedExportsOrder,ae as default};
