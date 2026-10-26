import pptxgen from 'pptxgenjs'
import { readFileSync, mkdirSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
const dir = resolve(process.argv[2] || 'presentation/decks/jdc')
const out = resolve(process.argv[3] || join(dir, 'deck.pptx'))
const outline = JSON.parse(readFileSync(join(dir, 'outline.json'), 'utf8'))
const pptx = new pptxgen()
pptx.layout = 'LAYOUT_WIDE'
pptx.author = 'ISPark Presentation System'
pptx.subject = outline.topic
pptx.lang = 'ko-KR'
// presentation/tokens.ts 와 같은 값. pptxgenjs는 '#' 없는 hex를 받는다.
const C = {
  bg:'FFFFFF', navy900:'092E49', navy700:'124568',
  blue600:'006FBD', blue500:'0290D5', blue300:'76B1E1', blue100:'DFEDF6',
  taupe:'918976', accentText:'B85610', accent:'D9641A', accentLight:'F58220', accentBg:'FDE3CA',
  text:'1F2937', caption:'6B7684', border:'E5E8EB', white:'FFFFFF',
}
function text(slide,value,x,y,w,h,size=20,bold=false,color=C.navy900,options={}) {
  slide.addText(value,{x,y,w,h,fontFace:'Pretendard',fontSize:size,bold,color,margin:0,fit:'shrink',valign:'mid',...options})
}
function box(slide,x,y,w,h,color=C.white) {
  slide.addShape(pptx.ShapeType.rect,{x,y,w,h,line:{color},fill:{color}})
}
function header(slide,label) {
  text(slide,label,.65,.45,10.5,.26,12,true)
  box(slide,.65,.94,.48,.035,C.accent)
  text(slide,'JDC',11.7,.43,1,.35,16,true)
}
function footer(slide,index) {
  text(slide,'ISPark / DESIGN PREVIEW',.65,7,6,.24,11,true,C.blue600)
  text(slide,String(index).padStart(2,'0'),12.15,7,.5,.24,10,false,C.caption)
}
for (const [i,entry] of outline.pages.entries()) {
  const spec=JSON.parse(readFileSync(join(dir,'pages',String(i+1).padStart(2,'0')+'.json'),'utf8'))
  if (entry.title!==spec.title || entry.layout!==spec.layout) throw Error('Outline mismatch: '+(i+1))
  const slide=pptx.addSlide()
  slide.background={color:C.bg}
  if (spec.layout==='cover_split_image') {
    box(slide,9.2,0,4.133,7.5,C.navy700)
    header(slide,'JDC 인사포털 및 성과관리시스템 재구축 용역')
    text(slide,'제주 돌담,',.7,2.02,8.2,.8,42,true)
    text(slide,[{text:'다시 ',options:{color:C.accent,bold:true}},{text:'쌓을 때',options:{color:C.navy900,bold:true}}],.7,2.85,8.2,.9,42,true)
    text(slide,'평가자산은 검증해 잇고,',.7,4.25,8,.42,22)
    text(slide,'인사·성과는 새롭게',.7,4.73,8,.42,22)
  } else if (spec.layout==='section_minimal') {
    header(slide,'01 / 사업 이해와 재구축 방향')
    text(slide,'01',.7,1.9,4,1.6,108,false,C.accent)
    text(slide,spec.title,.7,4,11,1,40,true)
    text(slide,'사업 이해와 재구축 방향',.7,5.2,10,.5,23)
  } else if (spec.layout==='three_column_cards') {
    header(slide,'01-1 / 사업 이해와 재구축 방향')
    text(slide,'기술과 제도를 함께 바꾸고,',.7,1.22,12,.6,30,true)
    text(slide,'평가자산은 검증해 잇습니다.',.7,1.84,12,.6,30,true)
    const cards=spec.elements.filter(e=>e.kind==='pillar')
    if (cards.length!==3) throw Error('Exactly 3 pillars required')
    cards.forEach((card,n)=>{
      const x=.7+n*4.07,y=3.04,w=3.85,h=2.72
      slide.addShape(pptx.ShapeType.rect,{x,y,w,h,line:{color:C.border,width:1},fill:{color:C.white}})
      text(slide,'0'+(n+1),x+.24,y+.3,.8,.35,19,true,C.accent)
      text(slide,card.title,x+.24,y+1.02,w-.48,.65,21,true)
      text(slide,card.description,x+.24,y+1.83,w-.48,.65,14,false,C.caption,{valign:'top'})
    })
  } else throw Error('Unsupported layout: '+spec.layout)
  footer(slide,i+1)
}
mkdirSync(dirname(out),{recursive:true})
await pptx.writeFile({fileName:out})
console.log('Created:',out)
