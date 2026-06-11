import{e as _,f as N,k as z,q as E,t as O,n as w,o as A,r as U}from"./vue.esm-bundler-UBndlgVH.js";import{_ as K}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{U as W}from"./UiFileList-DacfxOd_.js";import"./UiIcon-CtolvBwL.js";const H=["accept","disabled"],T=_({__name:"UiFileUpload",props:{loading:{type:Boolean,default:!1},accept:{default:void 0},label:{default:"+ 파일 추가"},disabled:{type:Boolean,default:!1}},emits:["upload"],setup(e,{emit:l}){const m=l;function f(u){var i;const o=u.target,a=(i=o.files)==null?void 0:i[0];a&&m("upload",a),o.value=""}return(u,o)=>(A(),N("label",{class:w(["ui-file-upload",{"ui-file-upload--disabled":e.disabled||e.loading}])},[z("input",{type:"file",hidden:"",accept:e.accept,disabled:e.disabled||e.loading,onChange:f},null,40,H),E(" "+O(e.loading?"업로드 중...":e.label),1)],2))}}),t=K(T,[["__scopeId","data-v-02f49779"]]);T.__docgenInfo={exportName:"default",displayName:"UiFileUpload",description:"",tags:{},props:[{name:"loading",description:"업로드 중 상태",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"accept",description:"허용 파일 형식 (예: 'image/*', '.pdf,.doc')",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"label",description:"버튼 라벨",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'+ 파일 추가'"}},{name:"disabled",description:"비활성화",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"upload",type:{names:["File"]},description:"파일 선택 시 원본 File 객체 전달"}],sourceFiles:["C:/clone-ispark-ui-20260526-231454/ispark-ui/src/components/ui/UiFileUpload.vue"]};const Q={title:"Components/Data/UiFileUpload",component:t,tags:["autodocs"],parameters:{docs:{description:{component:"\n파일 선택 버튼 컴포넌트. 파일 선택 시 `upload` 이벤트로 원본 `File` 객체를 전달한다.\n\n## 설계 원칙\n- **UI만 담당** — API 호출은 부모 컴포넌트가 처리\n- **UiFileList와 조합** — 파일 목록 표시 + 업로드 버튼을 함께 사용\n- 같은 파일 재선택 가능 (내부에서 input 초기화)\n\n## API\n- **Props**: `loading`, `accept`, `label`, `disabled`\n- **Events**: `upload` — 파일 선택 시 `File` 객체 전달\n        "}}},argTypes:{loading:{description:'업로드 진행 중 상태 — true이면 "업로드 중..." 표시 + 클릭 비활성',table:{category:"State",type:{summary:"boolean"},defaultValue:{summary:"false"}},control:"boolean"},accept:{description:"허용 파일 형식 (HTML input accept 속성)",table:{category:"Config",type:{summary:"string"},defaultValue:{summary:"undefined"}},control:"text"},label:{description:"버튼 라벨 텍스트",table:{category:"Content",type:{summary:"string"},defaultValue:{summary:"'+ 파일 추가'"}},control:"text"},disabled:{description:"비활성화",table:{category:"State",type:{summary:"boolean"},defaultValue:{summary:"false"}},control:"boolean"}}},n={args:{loading:!1,accept:void 0,label:"+ 파일 추가",disabled:!1},render:e=>({components:{UiFileUpload:t},setup:()=>({args:e}),template:'<UiFileUpload v-bind="args" />'})},s={render:()=>({components:{UiFileUpload:t},setup(){return{onUpload:l=>{alert(`선택된 파일: ${l.name} (${(l.size/1024).toFixed(1)}KB)`)}}},template:'<UiFileUpload @upload="onUpload" />'})},d={render:()=>({components:{UiFileUpload:t},template:'<UiFileUpload :loading="true" />'})},r={render:()=>({components:{UiFileUpload:t},template:'<UiFileUpload accept="image/*" label="+ 이미지 추가" />'})},p={render:()=>({components:{UiFileUpload:t},template:'<UiFileUpload :disabled="true" />'})},c={render:()=>({components:{UiFileList:W,UiFileUpload:t},setup(){const e=U([{id:1,filename:"보고서.pdf",path:"report.pdf",mimetype:"application/pdf"}]),l=U(!1);let m=2;return{files:e,loading:l,getUrl:a=>`#${a}`,onDelete:a=>{e.value=e.value.filter(i=>i.id!==a.id)},onUpload:a=>{l.value=!0,setTimeout(()=>{e.value.push({id:m++,filename:a.name,path:a.name,mimetype:a.type}),l.value=!1},1e3)}}},template:`
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" @delete="onDelete" />
        <UiFileUpload :loading="loading" @upload="onUpload" style="margin-top: 8px;" />
      </div>
    `})};var g,y,F;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    loading: false,
    accept: undefined,
    label: '+ 파일 추가',
    disabled: false
  },
  render: args => ({
    components: {
      UiFileUpload
    },
    setup: () => ({
      args
    }),
    template: '<UiFileUpload v-bind="args" />'
  })
}`,...(F=(y=n.parameters)==null?void 0:y.docs)==null?void 0:F.source}}};var b,v,x;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiFileUpload
    },
    setup() {
      const onUpload = (file: File) => {
        alert(\`선택된 파일: \${file.name} (\${(file.size / 1024).toFixed(1)}KB)\`);
      };
      return {
        onUpload
      };
    },
    template: '<UiFileUpload @upload="onUpload" />'
  })
}`,...(x=(v=s.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var h,D,I;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiFileUpload
    },
    template: '<UiFileUpload :loading="true" />'
  })
}`,...(I=(D=d.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var L,V,S;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiFileUpload
    },
    template: '<UiFileUpload accept="image/*" label="+ 이미지 추가" />'
  })
}`,...(S=(V=r.parameters)==null?void 0:V.docs)==null?void 0:S.source}}};var B,C,$;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiFileUpload
    },
    template: '<UiFileUpload :disabled="true" />'
  })
}`,...($=(C=p.parameters)==null?void 0:C.docs)==null?void 0:$.source}}};var k,q,P;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiFileList,
      UiFileUpload
    },
    setup() {
      const files = ref<FileItem[]>([{
        id: 1,
        filename: '보고서.pdf',
        path: 'report.pdf',
        mimetype: 'application/pdf'
      }]);
      const loading = ref(false);
      let nextId = 2;
      const getUrl = (path: string) => \`#\${path}\`;
      const onDelete = (file: FileItem) => {
        files.value = files.value.filter(f => f.id !== file.id);
      };
      const onUpload = (file: File) => {
        loading.value = true;
        // 업로드 시뮬레이션
        setTimeout(() => {
          files.value.push({
            id: nextId++,
            filename: file.name,
            path: file.name,
            mimetype: file.type
          });
          loading.value = false;
        }, 1000);
      };
      return {
        files,
        loading,
        getUrl,
        onDelete,
        onUpload
      };
    },
    template: \`
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" @delete="onDelete" />
        <UiFileUpload :loading="loading" @upload="onUpload" style="margin-top: 8px;" />
      </div>
    \`
  })
}`,...(P=(q=c.parameters)==null?void 0:q.docs)==null?void 0:P.source}}};const R=["Playground","Default","Loading","ImageOnly","Disabled","WithFileList"];export{s as Default,p as Disabled,r as ImageOnly,d as Loading,n as Playground,c as WithFileList,R as __namedExportsOrder,Q as default};
