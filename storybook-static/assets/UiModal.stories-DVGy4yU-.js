import{w as h,u as v,s as p,e as c,f as F}from"./index-CpO9RqPZ.js";import{e as Ue,w as ke,p as g,j as y,u as m,o as r,g as q,l as f,v as Be,n as Me,f as x,s as T,q as W,t as Ce,k as b,r as s,c as ze}from"./vue.esm-bundler-UBndlgVH.js";import{p as Ee,s as Se,u as Oe,v as V,N as Re,w as Te}from"./index-yTw_IPk6.js";import{U as ge}from"./UiButton-Cb1n7GIR.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const We={key:0,class:"ui-modal-header"},Ve={class:"ui-modal-header-actions"},Fe=["aria-label"],qe={key:0,width:"18",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"},De={key:1,width:"18",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"},Ne={class:"ui-modal-body"},$e={key:2,class:"ui-modal-footer"},l=Ue({__name:"UiModal",props:{open:{type:Boolean,default:!1},title:{default:""},size:{default:"md"},showClose:{type:Boolean,default:!0},showOverlay:{type:Boolean,default:!0},showFullscreen:{type:Boolean,default:!1},closeOnOverlayClick:{type:Boolean,default:!0},closeOnEscape:{type:Boolean,default:!0},customClass:{default:""},maxWidth:{default:""}},emits:["update:open","close"],setup(e,{emit:t}){const n=e,u=t,i=o=>{u("update:open",o),o||u("close")},a=s(!1),fe=()=>{a.value=!a.value};ke(()=>n.open,o=>{o||(a.value=!1)});const be=o=>{n.closeOnEscape||o.preventDefault()},xe=o=>{n.closeOnOverlayClick||o.preventDefault()},he=o=>{n.closeOnOverlayClick||o.preventDefault()},we=ze(()=>a.value||!n.maxWidth?{}:{maxWidth:n.maxWidth});return(o,d)=>(r(),g(m(Te),{open:e.open,"onUpdate:open":i},{default:y(()=>[q(m(Ee),null,{default:y(()=>[e.showOverlay?(r(),g(m(Se),{key:0,class:"ui-modal-overlay"})):f("",!0),q(m(Oe),{class:Me(["ui-modal-content",[`size-${e.size}`,e.customClass,{"is-fullscreen":a.value}]]),style:Be(we.value),onEscapeKeyDown:be,onPointerDownOutside:xe,onInteractOutside:he},{default:y(()=>[o.$slots.header||e.title||e.showClose||e.showFullscreen?(r(),x("header",We,[T(o.$slots,"header",{},()=>[e.title?(r(),g(m(V),{key:0,class:"ui-modal-title"},{default:y(()=>[W(Ce(e.title),1)]),_:1})):(r(),g(m(V),{key:1,class:"ui-modal-sr-only"},{default:y(()=>[...d[0]||(d[0]=[W("모달",-1)])]),_:1})),b("div",Ve,[e.showFullscreen?(r(),x("button",{key:0,type:"button",class:"ui-modal-fullscreen-toggle","aria-label":a.value?"축소":"전체화면",onClick:fe},[a.value?(r(),x("svg",De,[...d[2]||(d[2]=[b("path",{d:"M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)])])):(r(),x("svg",qe,[...d[1]||(d[1]=[b("path",{d:"M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)])]))],8,Fe)):f("",!0),e.showClose?(r(),g(m(Re),{key:1,class:"ui-modal-close","aria-label":"닫기"},{default:y(()=>[...d[3]||(d[3]=[b("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"},[b("path",{d:"M6 6L18 18M18 6L6 18",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"})],-1)])]),_:1})):f("",!0)])])])):f("",!0),!o.$slots.header&&!e.title&&!e.showClose&&!e.showFullscreen?(r(),g(m(V),{key:1,class:"ui-modal-sr-only"},{default:y(()=>[...d[4]||(d[4]=[W("모달",-1)])]),_:1})):f("",!0),b("div",Ne,[T(o.$slots,"default")]),o.$slots.footer?(r(),x("footer",$e,[T(o.$slots,"footer")])):f("",!0)]),_:3},8,["class","style"])]),_:3})]),_:3},8,["open"]))}});l.__docgenInfo={exportName:"default",displayName:"UiModal",description:"",tags:{},props:[{name:"open",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"title",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"size",required:!1,type:{name:"union",elements:[{name:'"sm"'},{name:'"md"'},{name:'"lg"'},{name:'"xl"'}]},defaultValue:{func:!1,value:"'md'"}},{name:"showClose",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"showOverlay",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"showFullscreen",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"closeOnOverlayClick",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"closeOnEscape",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"customClass",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"maxWidth",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}}],events:[{name:"update:open",type:{names:["boolean"]}},{name:"close"}],slots:[{name:"header"},{name:"default"},{name:"footer"}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiModal.vue"]};const Le={title:"Components/Overlay/UiModal",component:l,tags:["autodocs"],args:{"onUpdate:open":F(),onClose:F()},argTypes:{size:{control:"inline-radio",options:["sm","md","lg","xl"],description:"sm(400) / md(560·기본) / lg(800) / xl(1080) — 반응형 min(px, calc(100vw - 40px))"},showClose:{control:"boolean",description:"우상단 X 버튼 표시 (default true)"},maxWidth:{control:"text",description:'예: "720px" — size 토큰 max-width override'},customClass:{control:"text",description:"추가 클래스명"},showOverlay:{control:"boolean",description:"오버레이 배경 표시 (default true)"},closeOnOverlayClick:{control:"boolean",description:"오버레이 클릭 시 닫기 (default true)"},closeOnEscape:{control:"boolean",description:"ESC 키 닫기 (default true)"},showFullscreen:{control:"boolean",description:"헤더에 전체화면 토글 버튼 표시 (default false)"}}},w={args:{size:"md"},render:e=>({components:{UiModal:l},setup:()=>{const t=s(!1);return{args:e,open:t,onUpdateOpen:i=>{var a;t.value=i,(a=e["onUpdate:open"])==null||a.call(e,i)},onClose:()=>{var i;(i=e.onClose)==null||i.call(e)}}},template:`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" :open="open" @update:open="onUpdateOpen" @close="onClose">
          <div>
            <h2 style="margin: 0 0 12px;">Default Modal</h2>
            <p>radix-vue Dialog 기반 빈 골격. ESC / overlay 클릭으로 닫힘 (radix 기본).</p>
          </div>
        </UiModal>
      </div>
    `}),play:async({canvasElement:e,args:t})=>{const u=h(e).getByRole("button",{name:"모달 열기"});await v.click(u);const i=await p.findByRole("dialog");await c(i).toBeTruthy(),await v.keyboard("{Escape}"),await c(t["onUpdate:open"]).toHaveBeenCalledWith(!1),await c(t.onClose).toHaveBeenCalled()}},U={name:"Trigger (preview)",render:()=>({components:{UiButton:ge},template:'<UiButton variant="primary">모달 열기</UiButton>'})},k={args:{title:"회원 정보",size:"md"},render:e=>({components:{UiModal:l},setup:()=>{const t=s(!1);return{args:e,open:t}},template:`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>title prop과 X 닫기 버튼이 헤더에 자동 배치.</p>
        </UiModal>
      </div>
    `}),play:async({canvasElement:e})=>{const t=h(e);await v.click(t.getByRole("button",{name:"모달 열기"}));const n=await p.findByRole("dialog");await c(n.textContent).toContain("회원 정보"),await c(p.getByRole("button",{name:"닫기"})).toBeTruthy()}},B={render:()=>({components:{UiModal:l},setup:()=>{const e=s("sm"),t=s(!1);return{size:e,open:t,openSize:u=>{e.value=u,t.value=!0}}},template:`
      <div style="display: flex; gap: 8px;">
        <button type="button" @click="openSize('sm')" style="padding: 6px 12px;">sm 400</button>
        <button type="button" @click="openSize('md')" style="padding: 6px 12px;">md 560</button>
        <button type="button" @click="openSize('lg')" style="padding: 6px 12px;">lg 800</button>
        <button type="button" @click="openSize('xl')" style="padding: 6px 12px;">xl 1080</button>
        <UiModal v-model:open="open" :size="size" :title="\`size = \${size}\`">
          <p>현재 사이즈: <strong>{{ size }}</strong></p>
          <p>모바일에서 max-width: calc(100vw - 40px) 로 자동 축소.</p>
        </UiModal>
      </div>
    `})},M={args:{title:"닫기 버튼 없음",showClose:!1},render:e=>({components:{UiModal:l},setup:()=>{const t=s(!1);return{args:e,open:t}},template:`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>showClose=false. ESC 또는 overlay 클릭으로만 닫힘.</p>
        </UiModal>
      </div>
    `})},C={args:{title:"저장하시겠습니까?",size:"sm"},render:e=>({components:{UiModal:l,UiButton:ge},setup:()=>{const t=s(!1);return{args:e,open:t}},template:`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          확인 모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p style="margin: 0;">변경사항이 즉시 반영됩니다.</p>
          <template #footer>
            <UiButton variant="secondary" size="lg" @click="open = false">취소</UiButton>
            <UiButton variant="primary" size="lg" @click="open = false">저장</UiButton>
          </template>
        </UiModal>
      </div>
    `}),play:async({canvasElement:e})=>{const t=h(e);await v.click(t.getByRole("button",{name:"확인 모달 열기"})),await p.findByRole("dialog"),await c(p.getByRole("button",{name:"저장"})).toBeTruthy(),await c(p.getByRole("button",{name:"취소"})).toBeTruthy()}},z={args:{title:"커스텀 max-width = 720px",maxWidth:"720px"},render:e=>({components:{UiModal:l},setup:()=>{const t=s(!1);return{args:e,open:t}},template:`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>maxWidth='720px' prop이 size 토큰을 override.</p>
        </UiModal>
      </div>
    `})},E={args:{title:"오버레이 없음",showOverlay:!1},render:e=>({components:{UiModal:l},setup:()=>{const t=s(!1);return{args:e,open:t}},template:`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>showOverlay=false. 배경 어두워지지 않음.</p>
        </UiModal>
      </div>
    `})},S={args:{title:"엄격 모드 — ESC/overlay 무시",closeOnEscape:!1,closeOnOverlayClick:!1},render:e=>({components:{UiModal:l},setup:()=>{const t=s(!1);return{args:e,open:t}},template:`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>ESC 키와 overlay 클릭 모두 무시. X 버튼만 닫기 가능. 작업 중 실수 방지용.</p>
        </UiModal>
      </div>
    `}),play:async({canvasElement:e,args:t})=>{const n=h(e);await v.click(n.getByRole("button",{name:"모달 열기"})),await p.findByRole("dialog"),await v.keyboard("{Escape}"),await c(p.queryByRole("dialog")).toBeTruthy();const i=t["onUpdate:open"].mock.calls.filter(([a])=>a===!1);await c(i.length).toBe(0)}},O={args:{title:"전체화면 토글 가능",size:"md",showFullscreen:!0},render:e=>({components:{UiModal:l},setup:()=>{const t=s(!1);return{args:e,open:t}},template:`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>헤더 우측 expand 아이콘 클릭으로 전체화면 토글. 닫으면 자동으로 원래 size 복귀.</p>
        </UiModal>
      </div>
    `}),play:async({canvasElement:e})=>{const t=h(e);await v.click(t.getByRole("button",{name:"모달 열기"})),await p.findByRole("dialog");const n=await p.findByRole("button",{name:"전체화면"});await v.click(n),await p.findByRole("button",{name:"축소"})}},R={args:{size:"md"},render:e=>({components:{UiModal:l},setup:()=>{const t=s(!1);return{args:e,open:t}},template:`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <template #header>
            <div style="display: flex; align-items: center; gap: 12px; padding: 16px 24px; border-bottom: 1px solid #eee;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #6366f1;"></div>
              <div style="flex: 1;">
                <div style="font-weight: 600;">커스텀 헤더</div>
                <div style="font-size: 12px; color: #888;">아바타 + 이름 형태</div>
              </div>
            </div>
          </template>
          <p style="margin: 0;">header slot 사용 시 title/showClose 자동 헤더 비활성.</p>
        </UiModal>
      </div>
    `})};var D,N,$;w.parameters={...w.parameters,docs:{...(D=w.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => ({
    components: {
      UiModal
    },
    setup: () => {
      const open = ref(false);
      // v-bind="args"의 onUpdate:open이 v-model:open과 충돌하지 않도록 명시적 핸들러로 통합.
      // Actions 패널과 play 함수의 spy 둘 다 동작하도록 args의 핸들러를 직접 호출.
      const onUpdateOpen = (v: boolean) => {
        open.value = v;
        (args['onUpdate:open'] as ((v: boolean) => void) | undefined)?.(v);
      };
      const onClose = () => {
        ;
        (args.onClose as (() => void) | undefined)?.();
      };
      return {
        args,
        open,
        onUpdateOpen,
        onClose
      };
    },
    template: \`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" :open="open" @update:open="onUpdateOpen" @close="onClose">
          <div>
            <h2 style="margin: 0 0 12px;">Default Modal</h2>
            <p>radix-vue Dialog 기반 빈 골격. ESC / overlay 클릭으로 닫힘 (radix 기본).</p>
          </div>
        </UiModal>
      </div>
    \`
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: '모달 열기'
    });
    await userEvent.click(trigger);
    // Portal 이라 screen 사용 — DialogContent에 role=dialog
    const dialog = await screen.findByRole('dialog');
    await expect(dialog).toBeTruthy();
    // trigger 클릭은 외부 ref 변경(@click="open = true")이라 모달에서 update:open emit 안 됨.
    // 모달의 update:open + close emit은 사용자가 모달을 "닫는" 액션(ESC/overlay/X) 시만 발생.
    await userEvent.keyboard('{Escape}');
    await expect(args['onUpdate:open']).toHaveBeenCalledWith(false);
    await expect(args.onClose).toHaveBeenCalled();
  }
}`,...($=(N=w.parameters)==null?void 0:N.docs)==null?void 0:$.source}}};var H,X,j;U.parameters={...U.parameters,docs:{...(H=U.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: 'Trigger (preview)',
  render: () => ({
    components: {
      UiButton
    },
    template: '<UiButton variant="primary">모달 열기</UiButton>'
  })
}`,...(j=(X=U.parameters)==null?void 0:X.docs)==null?void 0:j.source}}};var I,P,L;k.parameters={...k.parameters,docs:{...(I=k.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    title: '회원 정보',
    size: 'md'
  },
  render: args => ({
    components: {
      UiModal
    },
    setup: () => {
      const open = ref(false);
      return {
        args,
        open
      };
    },
    template: \`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>title prop과 X 닫기 버튼이 헤더에 자동 배치.</p>
        </UiModal>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: '모달 열기'
    }));
    const dialog = await screen.findByRole('dialog');
    await expect(dialog.textContent).toContain('회원 정보');
    // X 버튼 존재 확인 (aria-label='닫기')
    await expect(screen.getByRole('button', {
      name: '닫기'
    })).toBeTruthy();
  }
}`,...(L=(P=k.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var A,K,G;B.parameters={...B.parameters,docs:{...(A=B.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiModal
    },
    setup: () => {
      const size = ref<'sm' | 'md' | 'lg' | 'xl'>('sm');
      const open = ref(false);
      const openSize = (s: 'sm' | 'md' | 'lg' | 'xl') => {
        size.value = s;
        open.value = true;
      };
      return {
        size,
        open,
        openSize
      };
    },
    template: \`
      <div style="display: flex; gap: 8px;">
        <button type="button" @click="openSize('sm')" style="padding: 6px 12px;">sm 400</button>
        <button type="button" @click="openSize('md')" style="padding: 6px 12px;">md 560</button>
        <button type="button" @click="openSize('lg')" style="padding: 6px 12px;">lg 800</button>
        <button type="button" @click="openSize('xl')" style="padding: 6px 12px;">xl 1080</button>
        <UiModal v-model:open="open" :size="size" :title="\\\`size = \\\${size}\\\`">
          <p>현재 사이즈: <strong>{{ size }}</strong></p>
          <p>모바일에서 max-width: calc(100vw - 40px) 로 자동 축소.</p>
        </UiModal>
      </div>
    \`
  })
}`,...(G=(K=B.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};var J,Q,Y;M.parameters={...M.parameters,docs:{...(J=M.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    title: '닫기 버튼 없음',
    showClose: false
  },
  render: args => ({
    components: {
      UiModal
    },
    setup: () => {
      const open = ref(false);
      return {
        args,
        open
      };
    },
    template: \`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>showClose=false. ESC 또는 overlay 클릭으로만 닫힘.</p>
        </UiModal>
      </div>
    \`
  })
}`,...(Y=(Q=M.parameters)==null?void 0:Q.docs)==null?void 0:Y.source}}};var Z,_,ee;C.parameters={...C.parameters,docs:{...(Z=C.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    title: '저장하시겠습니까?',
    size: 'sm'
  },
  render: args => ({
    components: {
      UiModal,
      UiButton
    },
    setup: () => {
      const open = ref(false);
      return {
        args,
        open
      };
    },
    template: \`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          확인 모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p style="margin: 0;">변경사항이 즉시 반영됩니다.</p>
          <template #footer>
            <UiButton variant="secondary" size="lg" @click="open = false">취소</UiButton>
            <UiButton variant="primary" size="lg" @click="open = false">저장</UiButton>
          </template>
        </UiModal>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: '확인 모달 열기'
    }));
    await screen.findByRole('dialog');
    // footer의 저장 버튼 존재 확인
    await expect(screen.getByRole('button', {
      name: '저장'
    })).toBeTruthy();
    await expect(screen.getByRole('button', {
      name: '취소'
    })).toBeTruthy();
  }
}`,...(ee=(_=C.parameters)==null?void 0:_.docs)==null?void 0:ee.source}}};var te,oe,ne;z.parameters={...z.parameters,docs:{...(te=z.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    title: '커스텀 max-width = 720px',
    maxWidth: '720px'
  },
  render: args => ({
    components: {
      UiModal
    },
    setup: () => {
      const open = ref(false);
      return {
        args,
        open
      };
    },
    template: \`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>maxWidth='720px' prop이 size 토큰을 override.</p>
        </UiModal>
      </div>
    \`
  })
}`,...(ne=(oe=z.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var ae,se,le;E.parameters={...E.parameters,docs:{...(ae=E.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    title: '오버레이 없음',
    showOverlay: false
  },
  render: args => ({
    components: {
      UiModal
    },
    setup: () => {
      const open = ref(false);
      return {
        args,
        open
      };
    },
    template: \`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>showOverlay=false. 배경 어두워지지 않음.</p>
        </UiModal>
      </div>
    \`
  })
}`,...(le=(se=E.parameters)==null?void 0:se.docs)==null?void 0:le.source}}};var ie,re,pe;S.parameters={...S.parameters,docs:{...(ie=S.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    title: '엄격 모드 — ESC/overlay 무시',
    closeOnEscape: false,
    closeOnOverlayClick: false
  },
  render: args => ({
    components: {
      UiModal
    },
    setup: () => {
      const open = ref(false);
      return {
        args,
        open
      };
    },
    template: \`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>ESC 키와 overlay 클릭 모두 무시. X 버튼만 닫기 가능. 작업 중 실수 방지용.</p>
        </UiModal>
      </div>
    \`
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: '모달 열기'
    }));
    await screen.findByRole('dialog');
    // ESC 시도 — 닫히지 않아야
    await userEvent.keyboard('{Escape}');
    // dialog 여전히 존재
    await expect(screen.queryByRole('dialog')).toBeTruthy();
    // update:open(false) emit 안 됨
    const calls = (args['onUpdate:open'] as ReturnType<typeof fn>).mock.calls;
    const closeCalls = calls.filter(([v]: [boolean]) => v === false);
    await expect(closeCalls.length).toBe(0);
  }
}`,...(pe=(re=S.parameters)==null?void 0:re.docs)==null?void 0:pe.source}}};var de,ce,ue;O.parameters={...O.parameters,docs:{...(de=O.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    title: '전체화면 토글 가능',
    size: 'md',
    showFullscreen: true
  },
  render: args => ({
    components: {
      UiModal
    },
    setup: () => {
      const open = ref(false);
      return {
        args,
        open
      };
    },
    template: \`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <p>헤더 우측 expand 아이콘 클릭으로 전체화면 토글. 닫으면 자동으로 원래 size 복귀.</p>
        </UiModal>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: '모달 열기'
    }));
    await screen.findByRole('dialog');
    // 전체화면 토글 버튼 존재
    const expandBtn = await screen.findByRole('button', {
      name: '전체화면'
    });
    await userEvent.click(expandBtn);
    // 클릭 후 aria-label이 '축소'로 변경
    await screen.findByRole('button', {
      name: '축소'
    });
  }
}`,...(ue=(ce=O.parameters)==null?void 0:ce.docs)==null?void 0:ue.source}}};var me,ve,ye;R.parameters={...R.parameters,docs:{...(me=R.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => ({
    components: {
      UiModal
    },
    setup: () => {
      const open = ref(false);
      return {
        args,
        open
      };
    },
    template: \`
      <div>
        <button type="button" @click="open = true" style="padding: 8px 16px; cursor: pointer;">
          모달 열기
        </button>
        <UiModal v-bind="args" v-model:open="open">
          <template #header>
            <div style="display: flex; align-items: center; gap: 12px; padding: 16px 24px; border-bottom: 1px solid #eee;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #6366f1;"></div>
              <div style="flex: 1;">
                <div style="font-weight: 600;">커스텀 헤더</div>
                <div style="font-size: 12px; color: #888;">아바타 + 이름 형태</div>
              </div>
            </div>
          </template>
          <p style="margin: 0;">header slot 사용 시 title/showClose 자동 헤더 비활성.</p>
        </UiModal>
      </div>
    \`
  })
}`,...(ye=(ve=R.parameters)==null?void 0:ve.docs)==null?void 0:ye.source}}};const Ae=["Default","Trigger","WithTitle","Sizes","NoCloseButton","WithFooter","CustomMaxWidth","NoOverlay","StrictNoEscape","Fullscreen","CustomHeaderSlot"];export{R as CustomHeaderSlot,z as CustomMaxWidth,w as Default,O as Fullscreen,M as NoCloseButton,E as NoOverlay,B as Sizes,S as StrictNoEscape,U as Trigger,C as WithFooter,k as WithTitle,Ae as __namedExportsOrder,Le as default};
