<script setup lang="ts">
import {computed,ref,onMounted,onBeforeUnmount,type Component} from 'vue'
import SectionCoverSlide from '../system/SectionCoverSlide.vue'
import ProposalDiagramSlide from '../system/ProposalDiagramSlide.vue'
import {presentationLayoutById,checkSlideContent,withFixedContent,presentationCanvas} from './catalog'
import '../system/system.css'

/**
 * 공개 발표 장표. 1040×720 캔버스를 컨테이너 폭에 맞춰 축소·확대해 그린다.
 * 내용 검사에 실패하면 장표 대신 문제 목록을 보여준다(렌더 중 오류를 던지지 않는다).
 */
const props=withDefaults(defineProps<{
  layoutId:string; content:Record<string,unknown>;
  /** 발주처 강조색 (#RRGGBB) */
  accentColor?:string;
  /** 하단 페이지 번호 */
  page?:number;
  /** false면 내부 클릭을 막는다(썸네일용) */
  interactive?:boolean;
}>(),{page:1,interactive:true})

const accent=computed(()=>/^#[0-9a-f]{6}$/i.test(props.accentColor??'')?props.accentColor:undefined)
// Renderer props are checked by checkSlideContent before this dynamic boundary.
const renderers:Record<string,Component>={'section-cover':SectionCoverSlide,diagram:ProposalDiagramSlide}
const layout=computed(()=>presentationLayoutById[props.layoutId])
const issues=computed(()=>checkSlideContent(props.layoutId,props.content))
const renderer=computed(()=>layout.value?renderers[layout.value.renderer as keyof typeof renderers]:undefined)
const height=computed(()=>layout.value?.canvas.height??presentationCanvas.height)
const bound=computed(()=>{
  const content=withFixedContent(props.layoutId,props.content)
  // 출처를 비우면 라이브러리 예시 문구가 대신 표시되므로 빈 문자열을 명시한다
  if(layout.value?.renderer==='diagram')return {source:'',...content,page:props.page}
  return {...content,height:height.value}
})

const host=ref<HTMLElement>(),width=ref<number>(presentationCanvas.width)
let observer:ResizeObserver|undefined
onMounted(()=>{observer=new ResizeObserver(([entry])=>{width.value=entry.contentRect.width});if(host.value)observer.observe(host.value)})
onBeforeUnmount(()=>observer?.disconnect())
</script>

<template>
 <div ref="host" class="presentation-slide" :style="{'--presentation-accent':accent,'--cover-gradient-mid':accent ? 'color-mix(in srgb, var(--presentation-accent), #031328 55%)' : undefined,aspectRatio:`${presentationCanvas.width}/${height}`}" :data-layout="layoutId">
  <div v-if="renderer&&!issues.length" class="presentation-slide-canvas" :class="{'is-static':!interactive}" :style="{width:`${presentationCanvas.width}px`,height:`${height}px`,transform:`scale(${width/presentationCanvas.width})`}">
   <component :is="renderer" v-bind="bound"/>
  </div>
  <div v-else class="presentation-slide-issues" role="alert">
   <strong>장표를 그릴 수 없습니다</strong>
   <ul><li v-for="issue in issues" :key="issue">{{issue}}</li></ul>
  </div>
 </div>
</template>

<style scoped>
.presentation-slide{position:relative;width:100%;overflow:hidden;background:#fff;container-type:inline-size}
.presentation-slide-canvas{position:absolute;left:0;top:0;transform-origin:top left}
.presentation-slide-canvas.is-static{pointer-events:none}
.presentation-slide-issues{position:absolute;inset:0;overflow:auto;padding:16px 20px;background:#fff7f0;color:#8a3b00;font-size:13px;line-height:1.5}
.presentation-slide-issues ul{margin:8px 0 0;padding-left:18px}
</style>
