/** PDF-first proposal renderer. Input is local JSON; no external requests. */
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
import {routeLayouts} from './route-layouts.mjs';
const here=dirname(fileURLToPath(import.meta.url));
const input=resolve(process.argv[2]||join(here,'guide.json'));
const output=resolve(process.argv[3]||'output/pdf/Proposal-Design-System-v0.1.pdf');
const deck=JSON.parse(readFileSync(input,'utf8'));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tokens=readFileSync(join(here,'../tokens.ts'),'utf8').split('colors: {')[1].split('},')[0];
const palette=Object.fromEntries([...tokens.matchAll(/(\w+):\s*'(#[\dA-Fa-f]{6})'/g)].map(m=>[m[1],m[2]]));
if(Object.keys(palette).length!==15)throw Error('tokens.ts palette format changed; update parser before rendering');
const cssVars=Object.entries(palette).map(([k,v])=>`--${k}:${v}`).join(';');
const fontDir=process.env.PROPOSAL_FONT_DIR||join(process.env.LOCALAPPDATA||'','Microsoft/Windows/Fonts');
const font=(weight)=>{const p=join(fontDir,`Pretendard-${weight}.otf`);if(!existsSync(p))throw Error(`Missing font: ${p}. Set PROPOSAL_FONT_DIR.`);return pathToFileURL(p).href};
let css=readFileSync(join(here,'theme.css'),'utf8').replace('__FONT_REGULAR__',font('Regular')).replace('__FONT_BOLD__',font('Bold'));
if(deck.designProfile==='route')css+='\n'+readFileSync(join(here,'route-theme.css'),'utf8');
const cell=s=>`<td>${esc(s)}</td>`;
const table=(s,cls)=>`<table class="${cls}"><thead><tr>${s.headers.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${s.rows.map(row=>`<tr>${row.map(cell).join('')}</tr>`).join('')}</tbody></table>`;
function backdrop(s){
 if(!s.backgroundAsset)return '';
 if(!['cover','section','agenda','pillars','comparison','process','timeline','hierarchy','trace','closing'].includes(s.layout))throw Error('Photo background unsupported for this layout');
 const asset=resolve(dirname(input),s.backgroundAsset);
 if(!/\.(png|jpe?g|webp)$/i.test(asset)||!existsSync(asset))throw Error('Missing local background image');
 return `<img class="photo-background" src="${esc(pathToFileURL(asset).href)}" alt=""><div class="photo-wash"></div>`;
}
const layouts={
 cover:s=>`<h1>${esc(s.title)}</h1><p class="lead">${esc(s.subtitle)}</p><p class="cover-end">${esc(s.end)}</p>`,
 section:s=>`<div class="section-no">${esc(s.number)}</div><h1>${esc(s.title)}</h1><p class="lead">${esc(s.subtitle)}</p>`,
 agenda:s=>`<div class="agenda">${s.items.map((x,i)=>`<div class="agenda-row"><b>${String(i+1).padStart(2,'0')}</b><div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div></div>`).join('')}</div>`,
 pillars:s=>`<div class="body columns">${s.items.map((x,i)=>`<div class="col"><div class="num">0${i+1}</div><h2>${esc(x[0])}</h2><p>${esc(x[1])}</p></div>`).join('')}</div>`,
 comparison:s=>`<div class="body">${table(s,'comparison')}</div>`,
 process:s=>`<div class="body process">${s.items.map((x,i)=>`<div class="step"><div class="num">0${i+1}</div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p><small>${esc(x[2])}</small></div>`).join('')}</div>`,
 hierarchy:s=>`<div class="body hierarchy"><div>${s.items.map((x,i)=>`<div class="layer"><b>0${i+1}</b><div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div></div>`).join('')}</div><div class="side-note">${s.notes.map(x=>`<h3>${esc(x[0])}</h3><p>${esc(x[1])}</p>`).join('<hr>')}</div></div>`,
 timeline:s=>`<div class="timeline"><div></div>${Array.from({length:8},(_,i)=>`<div class="month">M${i+1}</div>`).join('')}${s.tracks.map((t,i)=>`<div class="label" style="grid-row:${i+2};grid-column:1">${esc(t.label)}</div><div class="bar ${i%2?'secondary':''}" style="grid-row:${i+2};grid-column:${t.start+1}/span ${t.end-t.start+1}">${esc(t.text)}</div>`).join('')}</div>`,
 trace:s=>`<div class="body">${table(s,'trace')}</div>`,
 closing:s=>`<div class="commitments">${s.items.map((x,i)=>`<div class="commitment"><b>0${i+1}</b><p>${esc(x)}</p></div>`).join('')}</div>`,
 rules:s=>`<div class="body guide-rows">${s.items.map(x=>`<div class="row"><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div>`).join('')}</div>`,
 swatches:s=>`<div class="body swatches">${s.items.map(x=>{if(!palette[x[0]])throw Error('Unknown token');return `<div class="swatch"><div class="paint" style="background:var(--${x[0]})"></div><h3>${esc(x[1])}</h3><p>${palette[x[0]]}<br>${esc(x[2])}</p></div>`}).join('')}</div>`,
 specs:s=>`<div class="body">${table(s,'spec-table')}</div>`,
 sources:s=>`<div class="links">${s.items.map(x=>{const u=new URL(x[1]);if(u.protocol!=='https:')throw Error('HTTPS source required');return `<a href="${esc(u.href)}">${esc(x[0])}</a><p>${esc(x[2])}</p>`}).join('')}</div>`,
};
if(deck.designProfile==='route')Object.assign(layouts,routeLayouts(esc));
function validate(s,i){
 if(!layouts[s.layout])throw Error(`Page ${i+1}: unknown layout`);
 if(typeof s.title!=='string'||!s.title.trim())throw Error(`Page ${i+1}: title required`);
 if(s.title.length>80)throw Error(`Page ${i+1}: split the long title`);
 if(!s.source)throw Error(`Page ${i+1}: provenance required`);
 if(s.layout==='pillars'&&s.items.length!==3)throw Error('pillars needs 3 items');
 if(s.layout==='process'&&s.items.length!==4)throw Error('process needs 4 items');
 if(s.layout==='timeline')for(const t of s.tracks)if(!Number.isInteger(t.start)||!Number.isInteger(t.end)||t.start<1||t.end>8||t.start>t.end)throw Error('Invalid timeline interval');
 for(const key of ['color','fill','style','css','x','y'])if(key in s)throw Error(`Page ${i+1}: free-form styling forbidden`);
}
deck.slides.forEach(validate);
const html=`<!doctype html><html lang="ko"><meta charset="utf-8"><title>${esc(deck.title)}</title><style>:root{${cssVars}}${css}</style><body class="${deck.designProfile === 'route' ? 'profile-route' : ''}">${deck.slides.map((s,i)=>`<section class="slide ${["cover","section","closing"].includes(s.layout)?s.layout:"layout-"+s.layout} ${s.backgroundAsset?'has-background':''}">${backdrop(s)}<div class="eyebrow">${esc(s.kicker||deck.title)}</div>${!['cover','section'].includes(s.layout)?`<h1>${esc(s.title)}</h1>${s.subtitle?`<p class="lead">${esc(s.subtitle)}</p>`:''}`:''}${layouts[s.layout](s)}${s.takeaway?`<div class="takeaway">${esc(s.takeaway)}</div>`:''}<footer class="footer"><span>${esc(s.source)}</span><span>${String(i+1).padStart(2,'0')}</span></footer></section>`).join('')}</body></html>`;
mkdirSync(dirname(output),{recursive:true});
const htmlPath=output.replace(/\.pdf$/i,'.html');writeFileSync(htmlPath,html);
const browser=await chromium.launch({headless:true,...(process.env.PROPOSAL_BROWSER_PATH?{executablePath:process.env.PROPOSAL_BROWSER_PATH}:process.platform==='win32'?{channel:'msedge'}:{})});
try{
 const page=await browser.newPage({viewport:{width:1100,height:790},deviceScaleFactor:1});
 await page.route('**/*',route=>route.request().url().startsWith('file:')?route.continue():route.abort());
 await page.goto(pathToFileURL(htmlPath).href);await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>Promise.all([...document.images].map(img=>img.decode())));
 const errors=await page.evaluate(()=>{
 const errors=[];document.querySelectorAll('.slide').forEach((s,i)=>{
 const box=s.getBoundingClientRect(),foot=s.querySelector('.footer').getBoundingClientRect();
 for(const e of s.querySelectorAll('h1,h2,h3,p,td,th,.bar,.takeaway,.eyebrow')){
 const r=e.getBoundingClientRect();if(r.right>box.right-30||r.left<box.left||r.bottom>foot.top-8)errors.push({page:i+1,text:e.textContent.slice(0,70),issue:'bounds'});
 if(e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+2)errors.push({page:i+1,text:e.textContent.slice(0,70),issue:'overflow'});
 }
 const t=s.querySelector('.takeaway');if(t){const tr=t.getBoundingClientRect();for(const e of s.querySelectorAll('.body,.timeline,.commitments,.agenda'))if(e.getBoundingClientRect().bottom>tr.top-12)errors.push({page:i+1,issue:'takeaway collision'});}
 });return errors;});
 if(errors.length)throw Error(JSON.stringify(errors,null,2));
 await page.emulateMedia({media:'print'});await page.pdf({path:output,preferCSSPageSize:true,printBackground:true});
 const preview=output.replace(/\.pdf$/i,'-preview');mkdirSync(preview,{recursive:true});
 const slides=page.locator('.slide');for(let i=0;i<deck.slides.length;i++)await slides.nth(i).screenshot({path:join(preview,`${String(i+1).padStart(2,'0')}.png`)});
 writeFileSync(output.replace(/\.pdf$/i,'-qa.json'),JSON.stringify({pages:deck.slides.length,boundsErrors:errors,input,fonts:'Pretendard Regular/Bold',canvasPt:[780,540],reviewStatus:deck.status||'design-review'},null,2));
 console.log(`Built ${deck.slides.length} pages: ${output}`);
}finally{await browser.close()}
