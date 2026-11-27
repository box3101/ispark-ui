import {layoutLibrary,validateDiagram,type LayoutEntry,type DiagramData} from '../system/layout-library-model'
import {illustrationAssets} from '../system/illustration-assets'
import {slideTokens} from '../system/tokens'

/**
 * 소비 앱(제안서 작성 앱 등)에 공개하는 발표 레이아웃 목록.
 * - id는 Storybook 레이아웃 갤러리 id를 그대로 공개 키로 쓴다.
 * - content는 렌더러 컴포넌트 props 그대로다. 필드 경로(path)는 content 기준 점 표기다.
 * - 같은 필드 정의를 편집 폼·AI 입력·검사에 함께 쓴다.
 */
export const PRESENTATION_SCHEMA_VERSION=1
export const presentationCanvas=slideTokens.canvas

export type FieldType='text'|'textarea'|'icon'|'boolean'|'list'
export interface FieldSpec {
  path:string; label:string; type:FieldType;
  required?:boolean; maxLength?:number;
  minItems?:number; maxItems?:number;
  /** list 항목의 하위 필드. path는 항목 기준 */
  fields?:FieldSpec[];
  /** AI·편집자에게 보여줄 작성 기준 */
  hint?:string;
}
export interface PresentationLayout {
  id:string; name:string; group:LayoutEntry['group']; relation:string; purpose:string;
  capacity:string; rules:string[];
  renderer:LayoutEntry['renderer'];
  canvas:{width:number;height:number};
  schemaVersion:number;
  fields:FieldSpec[];
  /** 디자인 검토용 예시. 실제 RFP 근거가 아니다 */
  sample:Record<string,unknown>;
}

export const illustrationIds=illustrationAssets.map(asset=>asset.id)

const source:FieldSpec={path:'source',label:'출처 문구',type:'text',maxLength:130,hint:'근거 문서·페이지. 비우면 출처를 표시하지 않습니다.'}
const heading=(sectionMax=30):FieldSpec[]=>[
  {path:'data.section',label:'상단 라벨',type:'text',maxLength:sectionMax,hint:'장 번호 / 장 이름'},
  {path:'data.title',label:'제목',type:'text',required:true,maxLength:48},
  {path:'data.subtitle',label:'부제',type:'text',maxLength:60},
  {path:'data.takeaway',label:'하단 핵심 문장',type:'text',maxLength:45},
  {path:'data.takeawayHighlight',label:'하단 강조 구절',type:'text',maxLength:20,hint:'하단 핵심 문장 안에 그대로 들어 있는 구절'},
]

const fromLibrary=(id:string)=>{
  const entry=layoutLibrary.find(e=>e.id===id)
  if(!entry)throw new Error(`레이아웃을 찾을 수 없습니다: ${id}`)
  return entry
}
const define=(id:string,fields:FieldSpec[]):PresentationLayout=>{
  const e=fromLibrary(id)
  return {id:e.id,name:e.name,group:e.group,relation:e.relation,purpose:e.purpose,capacity:e.capacity,rules:e.rules,renderer:e.renderer,canvas:{width:presentationCanvas.width,height:e.height},schemaVersion:PRESENTATION_SCHEMA_VERSION,fields,sample:structuredClone(e.props)}
}

export const presentationLayouts:PresentationLayout[]=[
  define('section-cover',[
    {path:'chapters',label:'발표 목차',type:'list',required:true,minItems:3,maxItems:7,hint:'덱의 대목차에서 자동으로 채웁니다.',fields:[{path:'id',label:'장 ID',type:'text',required:true},{path:'title',label:'장 이름',type:'text',required:true,maxLength:14}]},
    {path:'activeId',label:'현재 장 ID',type:'text',required:true},
    {path:'title',label:'핵심 문구',type:'text',required:true,maxLength:24},
    {path:'emphasis',label:'강조 문구',type:'text',maxLength:24},
    {path:'description',label:'설명',type:'textarea',maxLength:70,hint:'두 줄 이내'},
    {path:'footer',label:'하단 문구',type:'text',maxLength:40},
  ]),
  define('parallel-message-cards',[
    ...heading(),
    {path:'data.criteriaLabel',label:'하단 라벨',type:'text',maxLength:10},
    {path:'data.items',label:'항목',type:'list',required:true,minItems:3,maxItems:3,fields:[
      {path:'title',label:'항목명',type:'text',required:true,maxLength:20},
      {path:'category',label:'분류',type:'text',maxLength:10},
      {path:'detail',label:'핵심 문구',type:'textarea',required:true,maxLength:35,hint:'두 줄 이내'},
      {path:'body',label:'설명',type:'textarea',required:true,maxLength:60},
      {path:'outcome',label:'하단 문구',type:'text',maxLength:20},
      {path:'icon',label:'아이콘',type:'icon'},
    ]},
    source,
  ]),
  define('focus-process',[
    ...heading(),
    {path:'data.highlightLast',label:'마지막 단계 강조',type:'boolean',hint:'마지막 단계가 실제 최종 판단·승인일 때만'},
    {path:'data.items',label:'단계',type:'list',required:true,minItems:3,maxItems:4,fields:[
      {path:'title',label:'단계명',type:'text',required:true,maxLength:20},
      {path:'stageLabel',label:'단계 라벨',type:'text',maxLength:12},
      {path:'body',label:'본문',type:'textarea',required:true,maxLength:60},
      {path:'detail',label:'산출물',type:'text',maxLength:35},
      {path:'icon',label:'아이콘',type:'icon'},
    ]},
    source,
  ]),
]

/** 레이아웃마다 바뀌지 않는 값. 저장·AI 결과에 없어도 렌더 전에 채운다 */
const fixedContent:Record<string,Record<string,unknown>>={
  'parallel-message-cards':{data:{kind:'evidence'}},
  'focus-process':{data:{kind:'process',processVariant:'cards'}},
}
/** 고정값을 채운 사본을 돌려준다. 원본은 바꾸지 않는다 */
export function withFixedContent(layoutId:string,content:Record<string,unknown>):Record<string,unknown>{
  // Vue 반응형 Proxy도 받을 수 있도록 JSON 복사(장표 내용은 순수 데이터)
  const copy=JSON.parse(JSON.stringify(content)) as Record<string,unknown>,fixed=fixedContent[layoutId]
  if(fixed?.data)copy.data={...(copy.data as object??{}),...(fixed.data as object)}
  return copy
}

export const presentationLayoutById=Object.fromEntries(presentationLayouts.map(l=>[l.id,l])) as Record<string,PresentationLayout>

export function getPath(target:unknown,path:string):unknown{
  return path.split('.').reduce<unknown>((value,key)=>value==null?undefined:(value as Record<string,unknown>)[key],target)
}

function checkFields(fields:FieldSpec[],target:unknown,prefix:string,issues:string[]){
  for(const field of fields){
    const value=getPath(target,field.path),label=prefix+field.label
    if(field.type==='list'){
      const list=Array.isArray(value)?value:[]
      if(field.required&&!list.length){issues.push(`${label}이(가) 필요합니다.`);continue}
      if(field.minItems!=null&&list.length<field.minItems||field.maxItems!=null&&list.length>field.maxItems)issues.push(`${label}은(는) ${field.minItems??0}–${field.maxItems??'∞'}개가 필요합니다. 현재 ${list.length}개`)
      list.forEach((item,i)=>checkFields(field.fields??[],item,`${label} ${i+1} · `,issues))
      continue
    }
    if(field.type==='boolean'){if(value!=null&&typeof value!=='boolean')issues.push(`${label} 값이 올바르지 않습니다.`);continue}
    if(value==null||value===''){if(field.required)issues.push(`${label}을(를) 입력하세요.`);continue}
    if(typeof value!=='string'){issues.push(`${label}은(는) 문자열이어야 합니다.`);continue}
    if(field.required&&!value.trim())issues.push(`${label}을(를) 입력하세요.`)
    if(field.maxLength&&value.length>field.maxLength)issues.push(`${label}은(는) ${field.maxLength}자 이내로 작성하세요. 현재 ${value.length}자`)
    if(field.type==='icon'&&!illustrationIds.includes(value as never))issues.push(`${label}: 등록되지 않은 아이콘입니다 (${value}).`)
  }
}

/** 렌더 전에 호출한다. 문제가 없으면 빈 배열. 오류를 던지지 않는다. */
export function checkSlideContent(layoutId:string,content:unknown):string[]{
  const layout=presentationLayoutById[layoutId]
  if(!layout)return [`지원하지 않는 레이아웃입니다: ${layoutId}`]
  if(!content||typeof content!=='object')return ['장표 내용이 없습니다.']
  const issues:string[]=[]
  content=withFixedContent(layoutId,content as Record<string,unknown>)
  checkFields(layout.fields,content,'',issues)
  if(layout.id==='section-cover'){
    const c=content as {chapters?:{id:string}[];activeId?:string}
    if(c.chapters?.length&&!c.chapters.some(ch=>ch.id===c.activeId))issues.push('현재 장 ID가 발표 목차에 없습니다.')
  }
  if(layout.renderer==='diagram'&&!issues.length){
    try{validateDiagram((content as {data:DiagramData}).data)}catch(error){issues.push(error instanceof Error?error.message:String(error))}
  }
  return issues
}
