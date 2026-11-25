#!/usr/bin/env node
import { readFileSync } from 'node:fs'
const spec=JSON.parse(readFileSync(new URL('./jdc-golden-v2.json',import.meta.url),'utf8'))
const findings=[]
for(const slide of spec.slides) {
  for(const [name,z] of Object.entries(slide.zones)) {
    if(z.length!==4 || z.some(n=>!Number.isFinite(n)||n<0||n>1) || z[0]+z[2]>1.001 || z[1]+z[3]>1.001)
      findings.push(slide.id+': invalid zone '+name)
  }
  if(!slide.required?.length) findings.push(slide.id+': missing required items')
}
if(spec.canvas.ratio!=='16:9') findings.push('Canvas ratio mismatch')
console.log(JSON.stringify({passed:!findings.length,slides:spec.slides.length,findings},null,2))
if(findings.length) process.exitCode=1
