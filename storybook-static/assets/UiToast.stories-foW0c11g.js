import{e as C}from"./index-CpO9RqPZ.js";import{U as e,o as n,c as F}from"./UiToast-UK3NPvz9.js";import{U as u}from"./UiButton-Cb1n7GIR.js";import"./vue.esm-bundler-UBndlgVH.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const E={title:"Components/Feedback/UiToast",component:e,tags:["autodocs"],parameters:{docs:{description:{component:"\n`UiToast`는 모듈 싱글톤 기반 알림. `openToast()`로 어디서든 호출.\n\n## 사용\n\n```vue\n<script setup>\nimport { UiToast, openToast } from 'ispark-ui'\n<\/script>\n\n<template>\n  <button @click=\"openToast({ message: '저장됨', type: 'success' })\">저장</button>\n  <UiToast />  <!-- 앱 루트에 한 번 -->\n</template>\n```\n\n## API\n\n- **`type`** `success` | `error` | `warning` | `info` — 좌측 컬러 보더 + 아이콘\n- **`duration`** ms — 기본 2500. `0`이면 자동 닫기 안 함 (수동 close)\n- **`placement`** `top-center`(기본) | `top-right` | `bottom-center` | `bottom-right` — placement별 독립 stack\n- 최대 동시 표시 5개 (placement별). 초과 시 가장 오래된 toast 제거.\n        "}}}},P=(t,o="info",m="top-center",M)=>n({message:t,type:o,placement:m,duration:M}),r={render:()=>({components:{UiButton:u,UiToast:e},setup:()=>({fire:P}),template:`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiButton variant="primary" @click="fire('저장되었습니다', 'success')">success</UiButton>
        <UiButton variant="ghost" @click="fire('새 메시지', 'info')">info</UiButton>
        <UiButton variant="secondary" @click="fire('확인이 필요합니다', 'warning')">warning</UiButton>
        <UiButton variant="danger" @click="fire('저장 실패', 'error')">error</UiButton>
        <UiToast />
      </div>
    `})},a={name:"위치 (placement)",render:()=>({components:{UiButton:u,UiToast:e},setup:()=>({fire:P}),template:`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiButton variant="primary" @click="fire('top-center', 'info', 'top-center')">top-center</UiButton>
        <UiButton variant="primary" @click="fire('top-right', 'info', 'top-right')">top-right</UiButton>
        <UiButton variant="primary" @click="fire('bottom-center', 'info', 'bottom-center')">bottom-center</UiButton>
        <UiButton variant="primary" @click="fire('bottom-right', 'info', 'bottom-right')">bottom-right</UiButton>
        <UiToast />
      </div>
    `})},i={name:"동시 5개 (overflow)",render:()=>({components:{UiButton:u,UiToast:e},setup(){return{spamSix:()=>{for(let o=1;o<=6;o++)n({message:`토스트 ${o}/6`,type:"info",duration:8e3})}}},template:`
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; color: #6f7a93;">
          6개 빠르게 띄우면 첫 번째가 자동 제거되어 5개만 남습니다.
        </p>
        <UiButton variant="primary" @click="spamSix">6개 빠르게 띄우기</UiButton>
        <UiToast />
      </div>
    `})},s={name:"수동 닫기 (duration 0)",render:()=>({components:{UiButton:u,UiToast:e},setup(){let t=0;return{open:()=>{t=n({message:"자동 닫기 안 함. X 또는 아래 버튼으로 닫기.",type:"warning",duration:0})},closeLast:()=>{t&&F(t)}}},template:`
      <div style="display: flex; gap: 8px;">
        <UiButton variant="primary" @click="open">duration=0 띄우기</UiButton>
        <UiButton variant="secondary" @click="closeLast">마지막 토스트 닫기</UiButton>
        <UiToast />
      </div>
    `})},c={name:"자동 검증 (play)",render:()=>({components:{UiToast:e},setup(){return n({message:"자동으로 띄운 토스트",type:"success",duration:5e3}),{}},template:"<UiToast />"}),play:async()=>{const t=document.querySelector(".ui-toast.type-success");await C(t).toBeTruthy()}},p={name:"Showcase (preview)",render:()=>({components:{UiToast:e},setup(){return n({message:"저장되었습니다",type:"success",duration:0}),{}},template:"<UiToast />"}),parameters:{docs:{disable:!0}}};var l,d,U;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiButton,
      UiToast
    },
    setup: () => ({
      fire
    }),
    template: \`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiButton variant="primary" @click="fire('저장되었습니다', 'success')">success</UiButton>
        <UiButton variant="ghost" @click="fire('새 메시지', 'info')">info</UiButton>
        <UiButton variant="secondary" @click="fire('확인이 필요합니다', 'warning')">warning</UiButton>
        <UiButton variant="danger" @click="fire('저장 실패', 'error')">error</UiButton>
        <UiToast />
      </div>
    \`
  })
}`,...(U=(d=r.parameters)==null?void 0:d.docs)==null?void 0:U.source}}};var f,y,g;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: '위치 (placement)',
  render: () => ({
    components: {
      UiButton,
      UiToast
    },
    setup: () => ({
      fire
    }),
    template: \`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <UiButton variant="primary" @click="fire('top-center', 'info', 'top-center')">top-center</UiButton>
        <UiButton variant="primary" @click="fire('top-right', 'info', 'top-right')">top-right</UiButton>
        <UiButton variant="primary" @click="fire('bottom-center', 'info', 'bottom-center')">bottom-center</UiButton>
        <UiButton variant="primary" @click="fire('bottom-right', 'info', 'bottom-right')">bottom-right</UiButton>
        <UiToast />
      </div>
    \`
  })
}`,...(g=(y=a.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var B,v,T;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: '동시 5개 (overflow)',
  render: () => ({
    components: {
      UiButton,
      UiToast
    },
    setup() {
      const spamSix = () => {
        for (let i = 1; i <= 6; i++) {
          openToast({
            message: \`토스트 \${i}/6\`,
            type: 'info',
            duration: 8000
          });
        }
      };
      return {
        spamSix
      };
    },
    template: \`
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; color: #6f7a93;">
          6개 빠르게 띄우면 첫 번째가 자동 제거되어 5개만 남습니다.
        </p>
        <UiButton variant="primary" @click="spamSix">6개 빠르게 띄우기</UiButton>
        <UiToast />
      </div>
    \`
  })
}`,...(T=(v=i.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var x,k,w;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: '수동 닫기 (duration 0)',
  render: () => ({
    components: {
      UiButton,
      UiToast
    },
    setup() {
      let lastId = 0;
      const open = () => {
        lastId = openToast({
          message: '자동 닫기 안 함. X 또는 아래 버튼으로 닫기.',
          type: 'warning',
          duration: 0
        });
      };
      const closeLast = () => {
        if (lastId) closeToast(lastId);
      };
      return {
        open,
        closeLast
      };
    },
    template: \`
      <div style="display: flex; gap: 8px;">
        <UiButton variant="primary" @click="open">duration=0 띄우기</UiButton>
        <UiButton variant="secondary" @click="closeLast">마지막 토스트 닫기</UiButton>
        <UiToast />
      </div>
    \`
  })
}`,...(w=(k=s.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var h,b,S;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: '자동 검증 (play)',
  render: () => ({
    components: {
      UiToast
    },
    setup() {
      openToast({
        message: '자동으로 띄운 토스트',
        type: 'success',
        duration: 5000
      });
      return {};
    },
    template: '<UiToast />'
  }),
  play: async () => {
    // Teleport 대상은 body. screen 대신 document로 검사
    const toast = document.querySelector('.ui-toast.type-success');
    await expect(toast).toBeTruthy();
  }
}`,...(S=(b=c.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var I,L,A;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'Showcase (preview)',
  render: () => ({
    components: {
      UiToast
    },
    setup() {
      // 카드 안에 항상 보이도록 영구 (duration 0 = 자동 닫기 안 함)
      openToast({
        message: '저장되었습니다',
        type: 'success',
        duration: 0
      });
      return {};
    },
    template: '<UiToast />'
  }),
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...(A=(L=p.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};const O=["Playground","AllPlacements","Multiple","ManualClose","AutoFire","Showcase"];export{a as AllPlacements,c as AutoFire,s as ManualClose,i as Multiple,r as Playground,p as Showcase,O as __namedExportsOrder,E as default};
