import {chromium} from 'playwright';
import {mkdirSync,writeFileSync} from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});
mkdirSync('output/pdf/illustrated',{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:1550,height:1100},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const name of ['reference-match','reused-content']){
  await page.goto(`http://localhost:6006/iframe.html?id=presentation-illustrated-strategy--${name}&viewMode=story`);
  await page.locator('.iv-slide').waitFor({timeout:30000});
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(x=>x.decode()));document.querySelector('.iv-slide').style.transform='none';const v=document.querySelector('.iv-viewport');v.style.width='1510px';v.style.height='1042px';});
  const report=await page.evaluate(()=>{
   const nodes=[...document.querySelectorAll('[data-check]')];
   return {textCount:nodes.length,overflow:nodes.filter(n=>n.scrollWidth>n.clientWidth+2||n.scrollHeight>n.clientHeight+2).map(n=>({text:n.textContent,width:n.clientWidth,scroll:n.scrollWidth})),cards:document.querySelectorAll('.iv-card').length};
  });
  console.log(name,JSON.stringify(report));
  await page.locator('.iv-slide').screenshot({path:`output/pdf/illustrated/${name}.png`});
  writeFileSync(`output/pdf/illustrated/${name}-qa.json`,JSON.stringify(report,null,2));
  if(report.overflow.length)errors.push(`${name}: text overflow`);
 }
 if(errors.length)throw Error(errors.join('\n'));
}finally{await browser.close()}
