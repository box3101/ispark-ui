<script setup lang="ts">
import {computed,ref,watch} from 'vue'
import {presentationAssetUrl} from './asset-url'

export interface SectionCoverChapter {id:string;title:string}
const props=withDefaults(defineProps<{
  chapters:SectionCoverChapter[]; activeId:string; title:string; emphasis?:string;
  description?:string; background?:string; backgroundPosition?:string;
  eyebrow?:string; footer?:string; height?:number;
}>(),{emphasis:'',description:'',background:'',backgroundPosition:'center',eyebrow:'CHAPTER',footer:'',height:585})
const current=computed(()=>Math.max(0,props.chapters.findIndex(chapter=>chapter.id===props.activeId)))
const number=computed(()=>String(current.value+1).padStart(2,'0'))
const failed=ref(false)
watch(()=>props.background,()=>{failed.value=false})
const hasImage=computed(()=>Boolean(props.background)&&!failed.value)
</script>

<template>
 <section class="section-cover" :class="{'has-image':hasImage}" :style="{height:`${height}px`}" aria-label="장별 표지">
  <img v-if="hasImage" class="background" :src="presentationAssetUrl(background)" :style="{objectPosition:backgroundPosition}" alt="" @error="failed=true"/>
  <div v-if="hasImage" class="image-shade"/>
  <div v-else class="geometry" aria-hidden="true"><span/><span/><span/></div>
  <span v-if="!hasImage" class="watermark" aria-hidden="true">{{number}}</span>
  <header><p>{{eyebrow}} {{number}}</p><h2>{{chapters[current]?.title}}</h2></header>
  <main>
   <h1 data-fit>{{title}}<span v-if="emphasis">{{emphasis}}</span></h1>
   <p v-if="description" class="description" data-fit>{{description}}</p>
  </main>
  <ol v-if="chapters.length" class="chapter-progress" aria-label="발표 목차와 현재 장">
   <li v-for="(chapter,index) in chapters" :key="chapter.id" :class="{active:index===current,complete:index<current}" :aria-current="index===current?'step':undefined">
    <span class="connector" aria-hidden="true"/>
    <span class="node"><span v-if="index===current">{{number}}</span></span>
    <span class="chapter-name">{{chapter.title}}</span>
   </li>
  </ol>
  <footer><span>{{footer}}</span><span>{{number}}</span></footer>
 </section>
</template>

<style scoped>
.section-cover,.section-cover *{box-sizing:border-box}
.section-cover{position:relative;width:1040px;height:585px;overflow:hidden;font-family:var(--presentation-font);color:#f5f9ff;background:radial-gradient(ellipse at 100% -10%,#287bfa 0%,#124da9 23%,transparent 58%),linear-gradient(118deg,#031328,#061d41 70%,#082b62);print-color-adjust:exact;-webkit-print-color-adjust:exact}
.background,.image-shade,.geometry{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.background{object-fit:cover}.image-shade{background:linear-gradient(90deg,#031328ef 0%,#031328c9 46%,#03132838 100%),linear-gradient(0deg,#031328e6,transparent 55%)}
.geometry span{position:absolute;right:-80px;width:640px;height:270px;transform:skewY(-28deg);background:linear-gradient(100deg,#67a7ff08,#77baff18);border-top:1px solid #77baff16}.geometry span:nth-child(1){top:95px}.geometry span:nth-child(2){top:300px;right:-260px}.geometry span:nth-child(3){top:490px;right:160px;background:#03132835}
.watermark{position:absolute;right:18px;top:28px;font-size:var(--type-display);line-height:1;font-weight:var(--weight-bold);letter-spacing:-24px;color:#8dc9ff16;user-select:none}
header,main,.chapter-progress,footer{position:absolute;z-index:1}header{top:40px;left:56px;right:56px}header p{margin:0 0 8px;color:#ff963e;font-size:var(--type-micro);letter-spacing:3px;font-weight:var(--weight-bold)}header h2{margin:0;font-size:var(--type-supporting);font-weight:var(--weight-medium);line-height:1.4}
main{top:166px;left:56px;right:56px}h1{max-width:850px;margin:0;font-size:var(--type-metric);line-height:1.3;letter-spacing:-1.5px;font-weight:var(--weight-bold);white-space:pre-line;overflow-wrap:anywhere}h1 span{display:block;color:#a5dfff}.description{max-width:780px;margin:35px 0 0;font-size:var(--type-supporting);line-height:1.55;font-weight:var(--weight-regular);letter-spacing:-.3px;color:#b4cde4;white-space:pre-line;overflow-wrap:anywhere}
.chapter-progress{bottom:57px;left:42px;right:42px;display:flex;margin:0;padding:0;list-style:none}.chapter-progress li{position:relative;flex:1;min-width:0;display:flex;align-items:center;flex-direction:column;gap:12px;color:#7399bd}.connector{position:absolute;left:-50%;right:50%;top:18px;height:1px;background:#4a769e}.chapter-progress li:first-child .connector{display:none}.active .connector,.complete .connector{background:#64c3ff}.node{position:relative;display:grid;place-items:center;width:16px;height:16px;margin:11px 0;border:1.5px solid #5885af;background:#071f3e;border-radius:50%;font-size:var(--type-micro);font-weight:var(--weight-bold);color:white}.complete .node{background:#65bded;border-color:#65bded}.active .node{width:38px;height:38px;margin:0;border:2px solid #fff0db;background:#ff8730;box-shadow:0 0 0 3px #ffab5b26}.chapter-name{text-align:center;max-width:100%;padding:0 5px;font-size:var(--type-micro);line-height:1.35;word-break:keep-all}.active .chapter-name{color:#ffab58;font-weight:var(--weight-bold)}footer{bottom:16px;left:56px;right:40px;display:flex;justify-content:space-between;font-size:var(--type-source);letter-spacing:2px;color:#6289ae}
</style>
<style scoped>
.node{z-index:1}
</style>
