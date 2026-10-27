import {chromium} from 'playwright';
import {mkdirSync,writeFileSync} from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});
const dir='output/pdf/illustrated-comparison';mkdirSync(dir,{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:1570,height:1070}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const name of ['jdc','other-rfp']){
  await page.goto(`http://localhost:6006/iframe.html?id=presentation-illustrated-comparison--${name}&viewMode=story`);
  await page.locator('.ic-slide').waitFor({timeout:30000});
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));await Promise.all([...document.querySelectorAll('svg image')].map(async i=>{const img=new Image();img.src=i.getAttribute('href');await img.decode()}));document.querySelector('.ic-slide').style.transform='none';Object.assign(document.querySelector('.ic-viewport').style,{width:'1536px',height:'1024px'});});
  const report=await page.evaluate(()=>{
   const nodes=[...document.querySelectorAll('[data-check]')];
   const overflow=nodes.filter(n=>n.scrollWidth>n.clientWidth+2||n.scrollHeight>n.clientHeight+2).map(n=>n.textContent);
   const slide=document.querySelector('.ic-slide'),table=document.querySelector('.ic-table').getBoundingClientRect(),bar=document.querySelector('.ic-takeaway').getBoundingClientRect();
   return{overflow,collision:table.bottom>bar.top-8,rows:slide.querySelectorAll('.ic-row').length,headers:slide.querySelectorAll('th[scope=col]').length,colors:['--ic-navy','--ic-blue','--ic-light','--ic-accent'].map(k=>getComputedStyle(slide).getPropertyValue(k))};
  });
  await page.locator('.ic-slide').screenshot({path:`${dir}/${name}.png`});
  writeFileSync(`${dir}/${name}-qa.json`,JSON.stringify(report,null,2));console.log(name,JSON.stringify(report));
  if(report.overflow.length||report.collision||report.rows!==3||report.headers!==3)errors.push(`${name}: layout validation failed`);
 }
 if(errors.length)throw Error(errors.join('\n'));
}finally{await browser.close()}
