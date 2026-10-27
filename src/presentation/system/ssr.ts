import {createSSRApp, h} from 'vue'
import {renderToString} from '@vue/server-renderer'
import DeckSlide, {type DeckSlideSpec} from './DeckSlide.vue'
import SystemGuide from './SystemGuide.vue'
export async function renderDeck(slides: DeckSlideSpec[]) {
  if(!slides.length)throw new Error('Deck is empty')
  return renderToString(createSSRApp({render:()=>h('div',slides.map((slide,i)=>h(DeckSlide,{slide,page:i+1})))}))
}
export async function renderGuide(){return renderToString(createSSRApp(SystemGuide))}
