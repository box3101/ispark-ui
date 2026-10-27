import {createSSRApp,h} from 'vue'
import {renderToString} from '@vue/server-renderer'
import {ComparisonDiagram,TraceabilityTable,TimelineDiagram,SlideCanvas,SemanticIcon,SlideTitle} from './components'
import {comparisonExample,traceExample} from './examples'
import {slideTokens} from './tokens'
import {contrastRatio} from '../../../presentation/contrast'

describe('presentation component contracts',()=>{
 it('rejects excess content instead of silently shrinking the comparison',async()=>{
  await expect(renderToString(createSSRApp({render:()=>h(ComparisonDiagram,{rows:[...comparisonExample,comparisonExample[0]]})}))).rejects.toThrow('split the slide')
 })
 it('keeps row headers and column headers in a semantic table',async()=>{
  const html=await renderToString(createSSRApp({render:()=>h(TraceabilityTable,{rows:traceExample})}))
  expect(html).toContain('<table');expect(html.match(/scope="row"/g)).toHaveLength(3);expect(html.match(/scope="col"/g)).toHaveLength(3)
 })
 it('requires evidence provenance and rejects invalid timeline bounds',async()=>{
  await expect(renderToString(createSSRApp({render:()=>h(SlideCanvas,{source:'',page:1})}))).rejects.toThrow('source')
  await expect(renderToString(createSSRApp({render:()=>h(TimelineDiagram,{tracks:[{label:'개발',start:7,end:4,text:'개발'}]})}))).rejects.toThrow('month interval')
 })
 it('escapes incoming text and fails unknown icon concepts',async()=>{
  const html=await renderToString(createSSRApp({render:()=>h(SlideTitle,{text:'<script>alert(1)</script>'})}))
  expect(html).not.toContain('<script>');expect(html).toContain('&lt;script&gt;')
  await expect(renderToString(createSSRApp({render:()=>h(SemanticIcon,{concept:'unknown'})}))).rejects.toThrow('Unknown semantic icon')
 })
 it('keeps the projection body floor and fixed role contrast',()=>{
  expect(slideTokens.type.body*.75).toBe(18)
  const c=slideTokens.colors
  for(const [fg,bg] of [[c.navy900,c.white],[c.gray900,c.white],[c.navy900,c.blue100],[c.white,c.navy900]])expect(contrastRatio(fg,bg)).toBeGreaterThanOrEqual(4.5)
 })
})
