import{e as ce,r as i,w as fe,y as pe,B as me,p as ve,g as m,j as $,C as R,T as we,o as u,f as d,l as c,D as T,v as ye,n as y,s as C,k as h,t as he,c as Ue}from"./vue.esm-bundler-UBndlgVH.js";import{U as S}from"./UiIcon-CtolvBwL.js";import{o as ge}from"./useConfirm-8n4Tl6XL.js";import{_ as be}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{U as z}from"./UiButton-Cb1n7GIR.js";const De={key:1,class:"ui-drawer-header"},ke={class:"ui-drawer-title"},Be={class:"ui-drawer-header-actions"},xe=["aria-label"],Ee={class:"ui-drawer-body"},We={key:2,class:"ui-drawer-footer"},Ce="ui-drawer-preset:",M='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',J=ce({__name:"UiDrawer",props:{open:{type:Boolean,default:!1},title:{default:""},width:{default:"420px"},minWidth:{default:"320px"},maxWidth:{default:"100vw"},position:{default:"right"},overlay:{type:Boolean,default:!0},closeOnOverlayClick:{type:Boolean,default:!0},closeOnEscape:{type:Boolean,default:!0},resizable:{type:Boolean,default:!0},showResize:{type:Boolean,default:!0},showFullscreen:{type:Boolean,default:!0},persistKey:{}},emits:["update:open"],setup(n,{emit:Q}){const a=n,Y=Q,o=i(null),f=i(null),k=i(!1),v=i(!1);function B(){const e=a.persistKey||a.title;return e?Ce+e:null}function O(){const e=B();if(!e)return"default";try{const t=localStorage.getItem(e);if(t==="half"||t==="full")return t}catch{}return"default"}const r=i(O()),x=i(!1);let p=null;function E(){v.value=window.innerWidth<=640}const Z={default:null,half:"50vw",full:"100vw"},ee=Ue(()=>{if(v.value)return{width:"100%",maxWidth:"100vw"};const e=Z[r.value];return e?{width:e,maxWidth:"100vw"}:{width:f.value?`${f.value}px`:a.width,maxWidth:a.maxWidth?`min(${a.maxWidth}, 100vw)`:"100vw"}});function q(e){r.value=r.value===e?"default":e,f.value=null;const t=B();if(t)try{r.value==="default"?localStorage.removeItem(t):localStorage.setItem(t,r.value)}catch{}}function W(){Y("update:open",!1)}async function L(){return x.value?ge({title:"변경사항 확인",message:"수정 중인 내용이 있습니다. 닫으시겠습니까?",confirmText:"닫기",cancelText:"취소",variant:"danger"}):!0}async function te(){a.closeOnOverlayClick&&await L()&&W()}async function ne(){a.closeOnEscape&&await L()&&W()}function w(){x.value=!0}function ae(){var e,t;(e=o.value)==null||e.addEventListener("input",w,!0),(t=o.value)==null||t.addEventListener("change",w,!0)}function oe(){var e,t;(e=o.value)==null||e.removeEventListener("input",w,!0),(t=o.value)==null||t.removeEventListener("change",w,!0)}function re(e){if(!o.value)return;const t=Array.from(o.value.querySelectorAll(M));if(t.length===0)return;const l=t[0],s=t[t.length-1];e.shiftKey?(document.activeElement===l||document.activeElement===o.value)&&(e.preventDefault(),s.focus()):document.activeElement===s&&(e.preventDefault(),l.focus())}fe(()=>a.open,e=>{e?(x.value=!1,r.value=O(),p=document.activeElement,document.body.style.overflow="hidden",requestAnimationFrame(()=>{var l,s;ae();const t=(l=o.value)==null?void 0:l.querySelector(M);t?t.focus():(s=o.value)==null||s.focus()})):(oe(),document.body.style.overflow="",f.value=null,B()||(r.value="default"),requestAnimationFrame(()=>{p==null||p.focus(),p=null}))});function le(e){var I;e.preventDefault(),k.value=!0;const t=e.clientX,l=((I=o.value)==null?void 0:I.offsetWidth)||parseInt(a.width);function s(F){const ie=a.position==="right"?t-F.clientX:F.clientX-t,se=l+ie,ue=parseInt(a.minWidth),de=window.innerWidth*(parseInt(a.maxWidth)/100||.8);f.value=Math.max(ue,Math.min(de,se))}function V(){k.value=!1,document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",V)}document.addEventListener("mousemove",s),document.addEventListener("mouseup",V)}return pe(()=>{E(),window.addEventListener("resize",E)}),me(()=>{document.body.style.overflow="",window.removeEventListener("resize",E)}),(e,t)=>(u(),ve(we,{to:"body"},[m(R,{name:"ui-drawer-overlay"},{default:$(()=>[n.open&&n.overlay?(u(),d("div",{key:0,class:"ui-drawer-overlay",onClick:te})):c("",!0)]),_:1}),m(R,{name:`ui-drawer-slide-${n.position}`},{default:$(()=>[n.open?(u(),d("aside",{key:0,ref_key:"drawerRef",ref:o,class:y(["ui-drawer",[`position-${n.position}`]]),style:ye(ee.value),role:"dialog","aria-modal":"true",tabindex:"-1",onKeydown:[T(ne,["escape"]),T(re,["tab"])]},[n.resizable?(u(),d("div",{key:0,class:y(["ui-drawer-resize-handle",{"is-dragging":k.value}]),onMousedown:le},null,34)):c("",!0),e.$slots.header||n.title?(u(),d("header",De,[C(e.$slots,"header",{},()=>[h("h3",ke,he(n.title),1)],!0),h("div",Be,[n.showFullscreen&&!v.value?(u(),d("button",{key:0,class:y(["ui-drawer-action-btn",{"is-active":r.value==="full"}]),"aria-label":r.value==="full"?"축소":"전체화면",onClick:t[0]||(t[0]=l=>q("full"))},[m(S,{name:r.value==="full"?"minimize":"maximize",size:16},null,8,["name"])],10,xe)):c("",!0),n.showResize&&!v.value?(u(),d("button",{key:1,class:y(["ui-drawer-action-btn",{"is-active":r.value==="half"}]),"aria-label":"1/2 너비",onClick:t[1]||(t[1]=l=>q("half"))},[m(S,{name:"panel-right",size:16})],2)):c("",!0),h("button",{class:"ui-drawer-close","aria-label":"닫기",onClick:W},[m(S,{name:"x",size:18})])])])):c("",!0),h("div",Ee,[C(e.$slots,"default",{},void 0,!0)]),e.$slots.footer?(u(),d("footer",We,[C(e.$slots,"footer",{},void 0,!0)])):c("",!0)],38)):c("",!0)]),_:3},8,["name"])]))}}),D=be(J,[["__scopeId","data-v-8e56c21e"]]);J.__docgenInfo={exportName:"default",displayName:"UiDrawer",description:"",tags:{},props:[{name:"open",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"title",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"width",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'420px'"}},{name:"minWidth",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'320px'"}},{name:"maxWidth",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'100vw'"}},{name:"position",required:!1,type:{name:"union",elements:[{name:'"right"'},{name:'"left"'}]},defaultValue:{func:!1,value:"'right'"}},{name:"overlay",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"closeOnOverlayClick",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"closeOnEscape",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"resizable",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"showResize",description:"1/2 프리셋 크기 버튼 표시",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"showFullscreen",description:"전체화면 버튼 표시",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"persistKey",description:"localStorage 저장 키 — 미지정 시 title 자동 사용",required:!1,type:{name:"string"}}],events:[{name:"update:open",type:{names:["boolean"]}}],slots:[{name:"header"},{name:"default"},{name:"footer"}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiDrawer.vue"]};const Ve={title:"Components/Overlay/UiDrawer",component:D,parameters:{docs:{description:{component:"# UiDrawer\r\n\n오른쪽(또는 왼쪽)에서 슬라이드로 열리는 사이드 패널.\r\n노션 스타일 상세 보기, 설정 패널 등에 사용.\r\n\n## Props\r\n\n- **`open`** `boolean` — v-model로 열림/닫힘 제어\r\n- **`title`** `string` — 헤더 제목\r\n- **`width`** `string` — 기본 너비 (default: `420px`)\r\n- **`minWidth`** `string` — 최소 너비 (default: `320px`)\r\n- **`maxWidth`** `string` — 최대 너비 (default: `80vw`)\r\n- **`position`** `'right' | 'left'` — 방향 (default: `right`)\r\n- **`overlay`** `boolean` — 배경 오버레이 (default: `true`)\r\n- **`resizable`** `boolean` — 드래그 리사이즈 (default: `true`)\r\n- **`closeOnOverlayClick`** `boolean` — 오버레이 클릭으로 닫기 (default: `true`)\r\n- **`closeOnEscape`** `boolean` — ESC 키로 닫기 (default: `true`)\r\n\n## Slots\r\n\n- **`default`** — 본문 콘텐츠\r\n- **`header`** — 커스텀 헤더\r\n- **`footer`** — 푸터 (액션 버튼 등)"}}}},U={render:()=>({components:{UiDrawer:D,UiButton:z},setup(){return{open:i(!1)}},template:`
      <div>
        <UiButton @click="open = true">Drawer 열기</UiButton>
        <UiDrawer v-model:open="open" title="이슈 상세">
          <p>Drawer 본문 내용입니다.</p>
        </UiDrawer>
      </div>
    `})},g={render:()=>({components:{UiDrawer:D,UiButton:z},setup(){return{open:i(!1)}},template:`
      <div>
        <UiButton @click="open = true">Drawer 열기</UiButton>
        <UiDrawer v-model:open="open" title="이슈 편집">
          <p>폼 내용</p>
          <template #footer>
            <div style="display:flex;justify-content:flex-end;gap:8px">
              <UiButton variant="ghost" @click="open = false">취소</UiButton>
              <UiButton variant="primary" @click="open = false">저장</UiButton>
            </div>
          </template>
        </UiDrawer>
      </div>
    `})},b={render:()=>({components:{UiDrawer:D,UiButton:z},setup(){return{open:i(!1)}},template:`
      <div>
        <UiButton @click="open = true">왼쪽 Drawer</UiButton>
        <UiDrawer v-model:open="open" title="설정" position="left">
          <p>왼쪽에서 열립니다.</p>
        </UiDrawer>
      </div>
    `})};var K,P,A;U.parameters={...U.parameters,docs:{...(K=U.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiDrawer,
      UiButton
    },
    setup() {
      const open = ref(false);
      return {
        open
      };
    },
    template: \`
      <div>
        <UiButton @click="open = true">Drawer 열기</UiButton>
        <UiDrawer v-model:open="open" title="이슈 상세">
          <p>Drawer 본문 내용입니다.</p>
        </UiDrawer>
      </div>
    \`
  })
}`,...(A=(P=U.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};var N,X,_;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiDrawer,
      UiButton
    },
    setup() {
      const open = ref(false);
      return {
        open
      };
    },
    template: \`
      <div>
        <UiButton @click="open = true">Drawer 열기</UiButton>
        <UiDrawer v-model:open="open" title="이슈 편집">
          <p>폼 내용</p>
          <template #footer>
            <div style="display:flex;justify-content:flex-end;gap:8px">
              <UiButton variant="ghost" @click="open = false">취소</UiButton>
              <UiButton variant="primary" @click="open = false">저장</UiButton>
            </div>
          </template>
        </UiDrawer>
      </div>
    \`
  })
}`,...(_=(X=g.parameters)==null?void 0:X.docs)==null?void 0:_.source}}};var j,G,H;b.parameters={...b.parameters,docs:{...(j=b.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiDrawer,
      UiButton
    },
    setup() {
      const open = ref(false);
      return {
        open
      };
    },
    template: \`
      <div>
        <UiButton @click="open = true">왼쪽 Drawer</UiButton>
        <UiDrawer v-model:open="open" title="설정" position="left">
          <p>왼쪽에서 열립니다.</p>
        </UiDrawer>
      </div>
    \`
  })
}`,...(H=(G=b.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const Ie=["Default","WithFooter","LeftPosition"];export{U as Default,b as LeftPosition,g as WithFooter,Ie as __namedExportsOrder,Ve as default};
