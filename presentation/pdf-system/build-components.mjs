/** Shared Vue components -> SSR HTML -> Chromium PDF. No alternate PDF layouts. */
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,dirname,join} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {createServer} from 'vite';
import vue from '@vitejs/plugin-vue';
import {chromium} from 'playwright';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const guide=process.argv[2]==='--guide';
const input=guide?null:resolve(process.argv[2]||'presentation/pdf-system/local/jdc-components.json');
const out=resolve(process.argv[3]||(guide?'output/pdf/Presentation-Component-System-v0.3.pdf':'output/pdf/JDC-Design-Review-v0.3.pdf'));
const server=await createServer({configFile:false,root,plugins:[vue()],optimizeDeps:{noDiscovery:true,include:[],entries:[]},server:{middlewareMode:true,hmr:false,ws:false},appType:'custom',logLevel:'error'});
let rendered;
try{
 const mod=await server.ssrLoadModule('/src/presentation/system/ssr.ts');
 if(guide)rendered=await mod.renderGuide();
 else{
 const deck=JSON.parse(readFileSync(input,'utf8'));
 for(const s of deck.slides)if(s.backgroundAsset){const p=resolve(dirname(input),s.backgroundAsset);if(!existsSync(p))throw Error(`Missing image: ${p}`);s.backgroundAsset=pathToFileURL(p).href;}
 rendered=await mod.renderDeck(deck.slides);
 }
}finally{await server.close()}
const fontDir=process.env.PROPOSAL_FONT_DIR||join(process.env.LOCALAPPDATA||'','Microsoft/Windows/Fonts');
const font=weight=>{const p=join(fontDir,`Pretendard-${weight}.otf`);if(!existsSync(p))throw Error(`Missing font: ${p}`);return pathToFileURL(p).href};
const css=readFileSync(join(root,'src/presentation/system/system.css'),'utf8');
const fonts=`@font-face{font-family:Proposal;src:url('${font('Regular')}');font-weight:400}@font-face{font-family:Proposal;src:url('${font('Bold')}');font-weight:700}`;
mkdirSync(dirname(out),{recursive:true});
const htmlPath=out.replace(/\.pdf$/i,'.html');
writeFileSync(htmlPath,`<!doctype html><html lang="ko"><meta charset="utf-8"><title>Presentation components v0.3</title><style>${fonts}${css}body{margin:0;background:#e5e8eb}.ds-slide{margin:20px auto}</style>${rendered}</html>`);
const browser=await chromium.launch({headless:true,...(process.env.PROPOSAL_BROWSER_PATH?{executablePath:process.env.PROPOSAL_BROWSER_PATH}:process.platform==='win32'?{channel:'msedge'}:{})});
try{
 const page=await browser.newPage({viewport:{width:1100,height:780},deviceScaleFactor:1});
 await page.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
 await page.goto(pathToFileURL(htmlPath).href);await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
 const errors=await page.evaluate(()=>{
  const errors=[];
  document.querySelectorAll('.ds-slide').forEach((slide,i)=>{
   const bounds=slide.getBoundingClientRect(),footer=slide.querySelector('.ds-footer').getBoundingClientRect();
   const takeaway=slide.querySelector('.ds-takeaway');
   const main=slide.querySelector('.ds-main').getBoundingClientRect();
   const limit=takeaway?takeaway.getBoundingClientRect().top-14:footer.top-16;
   if(main.bottom>limit)errors.push({page:i+1,kind:'content/footer collision',bottom:main.bottom-bounds.top,limit:limit-bounds.top});
   for(const el of slide.querySelectorAll('[data-fit]')){
    if(!el.getClientRects().length)continue;
    const b=el.getBoundingClientRect();
    if(b.left<bounds.left+20||b.right>bounds.right-20||b.bottom>bounds.bottom-10)errors.push({page:i+1,kind:'bounds',text:el.textContent.slice(0,55)});
    if(el.scrollWidth>el.clientWidth+2||el.scrollHeight>el.clientHeight+2)errors.push({page:i+1,kind:'overflow',text:el.textContent.slice(0,55)});
   }
  });return errors;
 });
 if(errors.length)throw Error(JSON.stringify(errors,null,2));
 await page.emulateMedia({media:'print'});
 await page.pdf({path:out,preferCSSPageSize:true,printBackground:true});
 const dir=out.replace(/\.pdf$/i,'-preview');mkdirSync(dir,{recursive:true});
 const slides=page.locator('.ds-slide'),count=await slides.count();
 for(let i=0;i<count;i++)await slides.nth(i).screenshot({path:join(dir,`${String(i+1).padStart(2,'0')}.png`)});
 writeFileSync(join(dir,'index.html'),`<!doctype html><html lang="ko"><meta charset="utf-8"><title>v0.3 미리보기</title><style>body{background:#e5e8eb;margin:30px;font-family:Arial}main{display:grid;grid-template-columns:1fr 1fr;gap:24px}img{width:100%}figure{margin:0}</style><h1>발표 컴포넌트 시스템 v0.3</h1><main>${Array.from({length:count},(_,i)=>`<figure><a href="${String(i+1).padStart(2,'0')}.png"><img alt="${i+1}번 장표" src="${String(i+1).padStart(2,'0')}.png"></a><figcaption>${i+1}</figcaption></figure>`).join('')}</main></html>`);
 writeFileSync(out.replace(/\.pdf$/i,'-qa.json'),JSON.stringify({pages:count,errors,renderer:'Vue SSR shared with Storybook',canvasPt:[780,540],input,review:'not a submission-ready deck'},null,2));
 console.log(`Built ${count} component pages: ${out}`);
}finally{await browser.close()}
