<script setup lang="ts">
import {presentationAssetUrl} from './asset-url'

import {watchEffect} from 'vue'
import IllustratedStrategyCard, {type IllustratedCardData} from './IllustratedStrategyCard.vue'
import './illustrated-strategy.css'
const props=withDefaults(defineProps<{
  width?:number; section:string; titleBefore:string; titleEmphasis:string; titleAfter:string;
  subtitle:string; items:IllustratedCardData[]; takeaway:string; takeawayLabel?:string;
  source:string; page?:number; background?:string; atlas?:string; showConnectors?:boolean
}>(),{
  width:1040,page:3,takeawayLabel:'핵심 방향',showConnectors:true,
  background:'/presentation/illustrated/jeju-background.png',atlas:'/presentation/illustrated/artwork-atlas.png',
})
watchEffect(()=>{
  if(props.items.length!==3)throw new Error('IllustratedStrategySlide requires exactly three cards. Split additional content into another slide.')
  if(props.width<=0 || !Number.isFinite(props.width))throw new Error('Slide width must be positive.')
})
</script>
<template>
  <div class="iv-viewport" :style="{width:`${width}px`,height:`${width*1042/1510}px`}">
    <section class="iv-slide" :style="{transform:`scale(${width/1510})`}" aria-label="사업 이해 발표 장표">
      <img class="iv-background" :src="presentationAssetUrl(background)" alt="" />
      <div class="iv-background-wash" aria-hidden="true" />
      <header class="iv-header">
        <p class="iv-section" data-check>{{section}}</p>
        <h1 data-check>{{titleBefore}} <em>{{titleEmphasis}}</em>{{titleAfter}}</h1>
        <p class="iv-subtitle" data-check>{{subtitle}}</p>
      </header>
      <main class="iv-cards">
        <IllustratedStrategyCard v-for="(item,i) in items" :key="i" :item="item" :number="i+1" :atlas="atlas" />
      </main>
      <svg v-if="showConnectors" class="iv-connectors" viewBox="0 0 1510 1042" aria-hidden="true">
        <defs>
          <linearGradient id="iv-orange" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ff9b34" stop-opacity="0"/><stop offset=".55" stop-color="#ff8a21"/><stop offset="1" stop-color="#ff9b34" stop-opacity="0"/></linearGradient>
          <linearGradient id="iv-cyan" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#34c9eb" stop-opacity="0"/><stop offset=".55" stop-color="#12b7e6"/><stop offset="1" stop-color="#34c9eb" stop-opacity="0"/></linearGradient>
        </defs>
        <g v-for="(x,i) in [522,990]" :key="x">
          <path :d="`M${x-35} 427 C${x-25} 480 ${x-40} 492 ${x+4} 518 C${x+40} 550 ${x+3} 576 ${x-14} 594 L${x-20} 637`" fill="none" :stroke="i?'url(#iv-cyan)':'url(#iv-orange)'" stroke-width="9"/>
          <circle :cx="x" cy="546" r="27" fill="white" :stroke="i?'#bdeefd':'#ffead5'" stroke-width="2"/>
          <path :d="`M${x-8} 546 h17 m-8 -9 9 9 -9 9`" fill="none" stroke="#092e49" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
      <aside class="iv-takeaway"><span data-check>{{takeawayLabel}}</span><strong data-check>{{takeaway}}</strong></aside>
      <footer class="iv-footer"><span data-check>{{source}}</span><span>{{String(page).padStart(2,'0')}}</span></footer>
    </section>
  </div>
</template>
