import {createSSRApp,h,reactive} from 'vue'
import {renderToString} from '@vue/server-renderer'
import {presentationLayouts,presentationLayoutById,checkSlideContent,withFixedContent,presentationCanvas} from './catalog'
import PresentationSlide from './PresentationSlide.vue'
import {setPresentationAssetBase,presentationAssetUrl} from '../system/asset-url'

describe('public presentation catalog',()=>{
  it('uses one 1040×720 canvas for every public layout',()=>{
    expect(presentationCanvas).toEqual({width:1040,height:720})
    for(const layout of presentationLayouts)expect(layout.canvas).toEqual({width:1040,height:720})
  })
  it('accepts every bundled sample',()=>{
    for(const layout of presentationLayouts)expect(checkSlideContent(layout.id,layout.sample)).toEqual([])
  })
  it('reports issues instead of throwing',()=>{
    expect(checkSlideContent('unknown',{})).toEqual(['지원하지 않는 레이아웃입니다: unknown'])
    const tooMany=structuredClone(presentationLayoutById['parallel-message-cards'].sample) as {data:{items:unknown[]}}
    tooMany.data.items.push(tooMany.data.items[0])
    expect(checkSlideContent('parallel-message-cards',tooMany).join()).toContain('3–3개')
    const longTitle=structuredClone(presentationLayoutById['focus-process'].sample) as {data:{title:string}}
    longTitle.data.title='가'.repeat(49)
    expect(checkSlideContent('focus-process',longTitle).join()).toContain('48자 이내')
  })
  it('fills fixed layout values without mutating the source',()=>{
    const content={data:{title:'제목',items:[]}}
    expect((withFixedContent('focus-process',content).data as {kind:string}).kind).toBe('process')
    expect('kind' in content.data).toBe(false)
  })
  it('accepts Vue reactive content',()=>{
    const content=reactive(structuredClone(presentationLayoutById['focus-process'].sample))
    expect(checkSlideContent('focus-process',content)).toEqual([])
  })
  it('renders issue list for invalid content during SSR',async()=>{
    const html=await renderToString(createSSRApp({render:()=>h(PresentationSlide,{layoutId:'focus-process',content:{data:{title:'',items:[]}}})}))
    expect(html).toContain('장표를 그릴 수 없습니다')
  })
  it('resolves assets under a consumer-configured base',()=>{
    setPresentationAssetBase('/vendor/ispark/')
    expect(presentationAssetUrl('/presentation/illustrated/icons/quality.png')).toBe('/vendor/ispark/presentation/illustrated/icons/quality.png')
    setPresentationAssetBase(undefined)
  })
})
