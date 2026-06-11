import{r as d}from"./vue.esm-bundler-UBndlgVH.js";import{U as l}from"./UiFileList-DacfxOd_.js";import"./UiIcon-CtolvBwL.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const b=[{id:1,filename:"출생증명서.pdf",path:"sample1.pdf",mimetype:"application/pdf"},{id:2,filename:"KakaoTalk_photo.jpg",path:"sample2.jpg",mimetype:"image/jpeg"},{id:3,filename:"체험단.txt",path:"sample3.txt",mimetype:"text/plain"}],O={title:"Components/Data/UiFileList",component:l,tags:["autodocs"],parameters:{docs:{description:{component:"\n파일 목록 표시 컴포넌트. 이미지 파일은 미리보기 썸네일, 일반 파일은 📎 아이콘으로 표시한다.\n\n## 사용 패턴\n- `UiFileUpload`와 함께 사용하여 파일 첨부 UI 구성\n- `getUrl` 함수로 파일 경로를 URL로 변환 (서버 환경에 따라 다름)\n- `deletable` 을 `false`로 설정하면 읽기 전용 목록\n\n## API\n- **Props**: `files` (필수), `getUrl` (필수), `deletable` (기본: true)\n- **Events**: `delete` — 삭제 버튼 클릭 시 해당 FileItem 전달\n        "}}},argTypes:{files:{description:"파일 목록 배열",table:{category:"Data",type:{summary:"FileItem[]"}},control:!1},getUrl:{description:"파일 경로를 URL로 변환하는 함수",table:{category:"Data",type:{summary:"(path: string) => string"}},control:!1},deletable:{description:"삭제 버튼 표시 여부",table:{category:"State",type:{summary:"boolean"},defaultValue:{summary:"true"}},control:"boolean"}}},n={render:()=>({components:{UiFileList:l},setup(){const e=d([...b]);return{files:e,getUrl:t=>`https://via.placeholder.com/400x200?text=${t}`,onDelete:t=>{e.value=e.value.filter(p=>p.id!==t.id)}}},template:`
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" @delete="onDelete" />
      </div>
    `})},s={render:()=>({components:{UiFileList:l},setup(){return{files:d([...b]),getUrl:o=>`https://via.placeholder.com/400x200?text=${o}`}},template:`
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" :deletable="false" />
      </div>
    `})},r={render:()=>({components:{UiFileList:l},setup(){return{getUrl:i=>i}},template:`
      <div style="max-width: 400px; padding: 16px; background: #f9fafb; border-radius: 8px;">
        <p style="font-size: 13px; color: #9ca3af;">파일이 없으면 아무것도 렌더하지 않습니다:</p>
        <UiFileList :files="[]" :get-url="getUrl" />
      </div>
    `})},a={render:()=>({components:{UiFileList:l},setup(){const e=d([{id:1,filename:"보고서_2026.pdf",path:"report.pdf",mimetype:"application/pdf"},{id:2,filename:"회의록.docx",path:"meeting.docx",mimetype:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"}]);return{files:e,getUrl:t=>`#${t}`,onDelete:t=>{e.value=e.value.filter(p=>p.id!==t.id)}}},template:`
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" @delete="onDelete" />
      </div>
    `})};var m,c,f;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiFileList
    },
    setup() {
      const files = ref([...sampleFiles]);
      const getUrl = (path: string) => \`https://via.placeholder.com/400x200?text=\${path}\`;
      const onDelete = (file: FileItem) => {
        files.value = files.value.filter(f => f.id !== file.id);
      };
      return {
        files,
        getUrl,
        onDelete
      };
    },
    template: \`
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" @delete="onDelete" />
      </div>
    \`
  })
}`,...(f=(c=n.parameters)==null?void 0:c.docs)==null?void 0:f.source}}};var u,g,U;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiFileList
    },
    setup() {
      const files = ref([...sampleFiles]);
      const getUrl = (path: string) => \`https://via.placeholder.com/400x200?text=\${path}\`;
      return {
        files,
        getUrl
      };
    },
    template: \`
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" :deletable="false" />
      </div>
    \`
  })
}`,...(U=(g=s.parameters)==null?void 0:g.docs)==null?void 0:U.source}}};var x,y,h;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiFileList
    },
    setup() {
      const getUrl = (path: string) => path;
      return {
        getUrl
      };
    },
    template: \`
      <div style="max-width: 400px; padding: 16px; background: #f9fafb; border-radius: 8px;">
        <p style="font-size: 13px; color: #9ca3af;">파일이 없으면 아무것도 렌더하지 않습니다:</p>
        <UiFileList :files="[]" :get-url="getUrl" />
      </div>
    \`
  })
}`,...(h=(y=r.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var v,F,D;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiFileList
    },
    setup() {
      const files = ref<FileItem[]>([{
        id: 1,
        filename: '보고서_2026.pdf',
        path: 'report.pdf',
        mimetype: 'application/pdf'
      }, {
        id: 2,
        filename: '회의록.docx',
        path: 'meeting.docx',
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }]);
      const getUrl = (path: string) => \`#\${path}\`;
      const onDelete = (file: FileItem) => {
        files.value = files.value.filter(f => f.id !== file.id);
      };
      return {
        files,
        getUrl,
        onDelete
      };
    },
    template: \`
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" @delete="onDelete" />
      </div>
    \`
  })
}`,...(D=(F=a.parameters)==null?void 0:F.docs)==null?void 0:D.source}}};const S=["Default","ReadOnly","Empty","TextFilesOnly"];export{n as Default,r as Empty,s as ReadOnly,a as TextFilesOnly,S as __namedExportsOrder,O as default};
