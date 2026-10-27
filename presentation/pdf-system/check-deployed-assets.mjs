import {chromium} from 'playwright'
const base=(process.argv[2]||'http://127.0.0.1:6017/ispark-ui/').replace(/\/?$/,'/')
const browser=await chromium.launch({channel:'msedge',headless:true})
try{
 const page=await browser.newPage({viewport:{width:1400,height:1000}})
 const errors=[];page.on('pageerror',error=>errors.push(error.message))
 for(const [story,selector,count] of [
  ['presentation-asset-library--semantic-pairs','.proposal-illustration-icon',24],
  ['presentation-asset-library--gallery','.asset-card',25],
  ['presentation-layout-library--all-slides','.layout-preview',16],
 ]){
  await page.goto(`${base}iframe.html?id=${story}&viewMode=story`)
  await page.locator(selector).first().waitFor()
  if(await page.locator(selector).count()!==count)throw Error(`Missing entries: ${story}`)
  const result=await page.evaluate(async()=>{
   const images=[...document.images];await Promise.all(images.map(i=>i.decode().catch(()=>{})))
   const failed=images.filter(i=>!i.naturalWidth).map(i=>i.src)
   const extra=[...document.querySelectorAll('svg image,a[download]')].map(e=>e.getAttribute('href')).filter(Boolean)
   const urls=[...new Set([...images.map(i=>i.src),...extra].map(url=>new URL(url,location.href).href))]
   for(const url of urls){const response=await fetch(url);if(!response.ok)failed.push(`${response.status}: ${url}`)}
   return {images:images.length,urls,failed}
  })
  if(result.failed.length)throw Error(JSON.stringify(result.failed))
  if(result.urls.some(url=>url.includes('/presentation/')&&!url.startsWith(`${base}presentation/`)))throw Error('Asset escaped deployment base')
  console.log(`${story}: ${result.images} images and all SVG/download asset URLs loaded`)
 }
 if(errors.length)throw Error(errors.join('\n'))
}finally{await browser.close()}
