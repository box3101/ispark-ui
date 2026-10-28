/** Export content overrides using the same registered Vue layouts as Storybook. */
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs'
import {resolve,dirname,join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {createServer} from 'vite'
import vue from '@vitejs/plugin-vue'
import {chromium} from 'playwright'
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..')
const input=resolve(process.argv[2]),out=resolve(process.argv[3])
const deck=JSON.parse(readFileSync(input,'utf8'))
if(!Array.isArray(deck.slides)||!deck.slides.length)throw Error('At least one slide is required')
const local=join(root,'presentation/pdf-system/local');mkdirSync(local,{recursive:true});mkdirSync(dirname(out),{recursive:true})
const htmlPath=join(local,'library-export.html')
const fontDir=process.env.PROPOSAL_FONT_DIR||join(root,'src/presentation/fonts')
let fonts=''
for(const [weight,name] of [[400,'Regular'],[500,'Medium'],[700,'Bold']]){
 const path=join(fontDir,`Pretendard-${name}.otf`)
 if(!existsSync(path))throw Error(`Missing font: ${path}`)
 for(const family of ['PresentationPretendard'])fonts+=`@font-face{font-family:${family};font-weight:${weight};src:url(data:font/otf;base64,${readFileSync(path).toString('base64')})}`
}
writeFileSync(htmlPath,`<!doctype html><html lang="ko"><meta charset="utf-8"><title>제안발표 검토본</title><style>body{margin:0;background:#dce6ee}.export-page{width:1040px;height:720px;margin:20px auto;background:white;break-after:page;overflow:hidden}.export-page:last-child{break-after:auto}@media print{@page{size:1040px 720px;margin:0}body{background:white}.export-page{margin:0}}</style><div id="app"></div><script type="module">
import {selectProcessVariant} from '/src/presentation/system/process-layout-rules.ts';import {createApp,h} from 'vue';import LayoutPreview from '/src/presentation/system/LayoutPreview.vue';import {layoutLibrary} from '/src/presentation/system/layout-library-model.ts';
const deck=${JSON.stringify(deck).replace(/</g,'\\u003c')};
let previousProcessVariant;
const entries=deck.slides.map((slide,index)=>{const base=layoutLibrary.find(e=>e.id===slide.layoutId);if(!base)throw Error('Unknown layout: '+slide.layoutId);const props={...base.props,...slide.props,page:index+1};if(props.data?.kind==='process'){props.data={...props.data};props.data.processVariant??=selectProcessVariant(props.data.items.length,previousProcessVariant,props.data.continuesProcess);previousProcessVariant=props.data.processVariant}else{previousProcessVariant=undefined}return {...base,props}});
createApp({render:()=>h('div',entries.map(entry=>h('div',{class:'export-page'},[h(LayoutPreview,{entry})])))}).mount('#app');
</script></html>`)
const server=await createServer({configFile:false,root,plugins:[vue()],optimizeDeps:{noDiscovery:true,include:[],entries:[]},server:{host:'127.0.0.1',port:0},logLevel:'error'})
let browser
try{
 await server.listen();const address=server.httpServer.address();const origin=`http://127.0.0.1:${address.port}`
 browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1100,height:800}})
 const runtimeErrors=[];page.on('pageerror',e=>runtimeErrors.push(e.message))
 await page.route('**/*',r=>r.request().url().startsWith(origin+'/')||r.request().url().startsWith('data:')?r.continue():r.abort())
 await page.goto(`${origin}/presentation/pdf-system/local/library-export.html`)
 await page.locator('.layout-preview').first().waitFor();await page.addStyleTag({content:fonts})
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));await new Promise(requestAnimationFrame)})
 const errors=await page.locator('.export-page').evaluateAll(slides=>slides.flatMap((slide,i)=>{
  const b=slide.getBoundingClientRect(),errors=[]
  for(const el of slide.querySelectorAll('[data-check],[data-fit]')){
   const r=el.getBoundingClientRect();if(!r.width||!r.height)continue
   if(r.left<b.left-1||r.right>b.right+1||r.bottom>b.bottom+1||(el.clientWidth>0&&el.scrollWidth>el.clientWidth+3))errors.push({page:i+1,text:el.textContent,kind:'bounds or horizontal overflow'})
  }
  for(const card of slide.querySelectorAll('.iv-card')){
   for(const [a,c] of [['.iv-category','.iv-headline'],['.iv-headline','.iv-body'],['.iv-body','.iv-outcome']]){
    if(card.querySelector(a).getBoundingClientRect().bottom>card.querySelector(c).getBoundingClientRect().top)errors.push({page:i+1,kind:'card text overlap',a,c})
   }
  }
  return errors
 }))
 if(errors.length||runtimeErrors.length)throw Error(JSON.stringify({errors,runtimeErrors}))
 const count=await page.locator('.export-page').count();if(count!==deck.slides.length)throw Error('Page count mismatch')
 const preview=out.replace(/\.pdf$/i,'-preview');mkdirSync(preview,{recursive:true})
 for(let i=0;i<count;i++)await page.locator('.export-page').nth(i).screenshot({path:join(preview,`${String(i+1).padStart(2,'0')}.png`)})
 await page.pdf({path:out,preferCSSPageSize:true,printBackground:true})
 writeFileSync(out.replace(/\.pdf$/i,'-qa.json'),JSON.stringify({pages:count,layouts:deck.slides.map(s=>s.layoutId),errors,runtimeErrors,renderer:'Existing Vue layout library; content overrides only'},null,2))
 console.log(`Exported ${count} pages: ${out}`)
}finally{await browser?.close();await server.close()}
