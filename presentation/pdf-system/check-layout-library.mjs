import {chromium} from 'playwright'
import {mkdirSync,writeFileSync} from 'node:fs'
const out='output/pdf/layout-library';mkdirSync(out,{recursive:true})
const browser=await chromium.launch({channel:'msedge',headless:true})
try{
 const page=await browser.newPage({viewport:{width:1440,height:1080},acceptDownloads:true})
 const errors=[];page.on('pageerror',e=>errors.push(e.message))
 const ready=()=>page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))})
 await page.goto('http://localhost:6006/iframe.html?id=presentation-layout-library--gallery&viewMode=story')
 await page.locator('.library-card').first().waitFor();await ready()
 const validator=await page.evaluate(async()=>{
  const {layoutLibrary,validateDiagram}=await import('/src/presentation/system/layout-library-model.ts')
  for(const entry of layoutLibrary.filter(e=>e.renderer==='diagram'))validateDiagram(entry.props.data)
  const schedule=structuredClone(layoutLibrary.find(e=>e.id==='delivery-schedule').props.data)
  const graph=structuredClone(layoutLibrary.find(e=>e.id==='system-architecture').props.data)
  const cases=[{...schedule,tracks:[{label:'오류',start:4,end:2,milestone:'완료'}]}, {...schedule,tracks:[{label:'오류',start:1,end:9,milestone:'완료'}]}, {...graph,connections:[{from:'missing',to:'db',label:'오류'}]}, {...graph,connections:[{from:'portal',to:'db',label:'계층 건너뜀'}]}]
  return cases.map(data=>{try{validateDiagram(data);return false}catch{return true}})
 })
 if(validator.some(result=>!result))throw Error('Invalid interval or graph accepted')
 if(await page.locator('.library-card').count()!==16)throw Error('Expected 16 layouts')
 await page.screenshot({path:`${out}/gallery.png`,fullPage:true})
 await page.getByRole('button',{name:'수행 방법',exact:true}).click()
 if(await page.locator('.library-card').count()!==3)throw Error('Category filtering failed')
 await page.getByRole('button',{name:'전체',exact:true}).click()
 await page.getByRole('searchbox').fill('간트')
 if(await page.locator('.library-card').count()!==1)throw Error('Search failed')
 await page.getByRole('button',{name:'수행 일정 · 간트 미리보기'}).click()
 await page.locator('dialog[open]').waitFor();await ready()
 await page.screenshot({path:`${out}/detail.png`})
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'예시 JSON 내려받기'}).click();const d=await download;await d.saveAs(`${out}/download.json`)
 if(d.suggestedFilename()!=='delivery-schedule.json')throw Error('JSON download failed')
 await page.keyboard.press('Escape');if(await page.locator('dialog[open]').count())throw Error('Escape did not close dialog')
 await page.getByRole('searchbox').fill('존재하지않는검색');if(await page.locator('.library-empty').count()!==1)throw Error('Missing empty state')
 await page.getByRole('button',{name:'전체 보기'}).click()
 await page.setViewportSize({width:390,height:844});await ready()
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile horizontal overflow')
 await page.screenshot({path:`${out}/mobile.png`})
 await page.setViewportSize({width:1100,height:800})
 await page.goto('http://localhost:6006/iframe.html?id=presentation-layout-library--all-slides&viewMode=story')
 await page.locator('.layout-preview').first().waitFor();await ready()
 const counts=await page.locator('.layout-preview').count();if(counts!==16)throw Error('Missing full slides')
 const findings=[]
 for(let i=0;i<counts;i++){
  const slide=page.locator('.layout-preview').nth(i),id=await slide.getAttribute('data-layout')
  await slide.screenshot({path:`${out}/${String(i+1).padStart(2,'0')}-${id}.png`})
  const issues=await slide.evaluate(root=>{
   const r=root.getBoundingClientRect(),bad=[]
   for(const el of root.querySelectorAll('[data-fit],[data-check]')){
    const b=el.getBoundingClientRect()
    if(b.width&&b.height&&(b.left<r.left-2||b.right>r.right+2||b.top<r.top-2||b.bottom>r.bottom+2||(el.clientWidth>0&&el.scrollWidth>el.clientWidth+3)||(['hidden','clip','auto','scroll'].includes(getComputedStyle(el).overflowY)&&el.clientHeight>0&&el.scrollHeight>el.clientHeight+3)))bad.push(el.textContent)
   }
   return bad
  })
  findings.push({id,issues})
 }
 await page.addStyleTag({content:'@media print{@page{size:1040px 720px;margin:0}html,body,#storybook-root{margin:0!important;padding:0!important;background:white!important}#storybook-root>div{display:block!important;padding:0!important}#storybook-root>div>div{height:720px!important;break-after:page;background:white}.layout-preview{width:1040px!important}}'})
 await page.pdf({path:`${out}/ISPark-Layout-Library-v1.pdf`,width:'1040px',height:'720px',printBackground:true,preferCSSPageSize:true})
 writeFileSync(`${out}/qa.json`,JSON.stringify({layouts:counts,findings,errors,checks:['category','search','download','escape','empty','mobile']},null,2))
 if(errors.length||findings.some(f=>f.issues.length))throw Error(JSON.stringify({errors,findings}))
 console.log('16 layouts: render, text bounds, search, filters, dialog, JSON download, mobile passed.')
}finally{await browser.close()}
