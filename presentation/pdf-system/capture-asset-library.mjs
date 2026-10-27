import {chromium} from 'playwright';
import {mkdirSync,writeFileSync} from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});
const dir='output/pdf/asset-library';mkdirSync(dir,{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:1350,height:1100},acceptDownloads:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:6006/iframe.html?id=presentation-asset-library--gallery&viewMode=story');
 await page.locator('.asset-card').first().waitFor();
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))});
 if(await page.locator('.asset-card').count()!==25)throw Error('Expected 25 assets');
 const coverage=await page.evaluate(async()=>{
  const m=await import('/src/presentation/system/illustration-assets.ts');
  return {count:m.illustrationCoverage.length,missing:m.illustrationCoverage.filter(c=>!c.illustration||!m.illustrationById[c.illustration])};
 });
 if(coverage.count!==24||coverage.missing.length)throw Error('Semantic coverage incomplete');
 await page.locator('.asset-library').screenshot({path:`${dir}/gallery.png`});
 await page.locator('select').selectOption('dark');
 await page.locator('.asset-grid').screenshot({path:`${dir}/dark.png`});
 for(let start=0;start<25;start+=9){
  await page.evaluate(start=>document.querySelectorAll('.asset-card').forEach((el,i)=>el.style.display=i>=start&&i<start+9?'':'none'),start);
  await page.locator('.asset-grid').screenshot({path:`${dir}/dark-group-${1+Math.floor(start/9)}.png`});
 }
 await page.evaluate(()=>document.querySelectorAll('.asset-card').forEach(el=>el.style.display=''));
 await page.locator('input[type=search]').fill('data-migration');
 if(await page.locator('.asset-card').count()!==1)throw Error('Search failed');
 const download=page.waitForEvent('download');await page.locator('.asset-card a').click();
 if((await download).suggestedFilename()!=='data-migration.png')throw Error('Wrong download');
 for(const variant of ['illustrated','flat']){
  await page.goto(`http://localhost:6006/iframe.html?id=presentation-visual-icon--${variant}&viewMode=story`);
  await page.locator(variant==='flat'?'.ds-icon':'.proposal-illustration-icon').waitFor();
 }
 await page.goto('http://localhost:6006/iframe.html?id=presentation-asset-library--semantic-pairs&viewMode=story');
 await page.locator('.proposal-illustration-icon').first().waitFor();
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))});
 if(await page.locator('.proposal-illustration-icon').count()!==24||await page.locator('.ds-icon').count()!==24)throw Error('24 semantic pairs did not render');
 await page.screenshot({path:`${dir}/semantic-pairs.png`,fullPage:true});
 if(errors.length)throw Error(errors.join('\n'));
 writeFileSync(`${dir}/ui-qa.json`,JSON.stringify({assets:25,coverage,search:'passed',download:'passed',variants:['flat','illustrated'],runtimeErrors:errors},null,2));
 console.log('25 assets, all 24 concepts, search, PNG download and both semantic variants passed.');
}finally{await browser.close()}
