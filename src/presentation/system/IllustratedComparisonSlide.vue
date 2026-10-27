<script setup lang="ts">
import {presentationAssetUrl} from './asset-url'

import {computed,watchEffect} from 'vue'
import IllustratedComparisonRow,{type IllustratedComparisonItem} from './IllustratedComparisonRow.vue'
import {slideTokens} from './tokens'
import './illustrated-strategy.css'
import './illustrated-comparison.css'
const props=withDefaults(defineProps<{
 width?:number;section:string;title:string;emphasis:string;subtitle:string;rows:IllustratedComparisonItem[];
 source:string;page?:number;takeaway:string;takeawayLabel?:string;headers?:[string,string,string];
 background?:string;atlas?:string;theme?:{navy?:string;blue?:string;light?:string;accent?:string}
}>(),{width:1040,page:4,takeawayLabel:'재구축 목표',headers:()=>['연결 대상','현재','재구축 결과'],background:'/presentation/illustrated/jeju-background.png',atlas:'/presentation/illustrated/comparison-atlas.png'})
const colors=computed(()=>({'--ic-navy':props.theme?.navy||slideTokens.colors.navy900,'--ic-blue':props.theme?.blue||slideTokens.colors.blue600,'--ic-light':props.theme?.light||slideTokens.colors.blue100,'--ic-accent':props.theme?.accent||slideTokens.colors.orange500}))
watchEffect(()=>{if(props.rows.length!==3)throw Error('Illustrated comparison requires three rows; split additional content into another slide.');if(!Number.isFinite(props.width)||props.width<=0)throw Error('Width must be positive.')})
</script>
<template>
 <div class="ic-viewport" :style="{width:`${width}px`,height:`${width*1024/1536}px`}">
  <section class="ic-slide" :style="{...colors,transform:`scale(${width/1536})`}">
   <img v-if="background" class="ic-background" :src="presentationAssetUrl(background)" alt=""/><div class="ic-wash" />
   <header class="ic-heading"><p class="ic-section" data-check>{{section}}</p><h1 data-check>{{title}} <em>{{emphasis}}</em></h1><p class="ic-subtitle" data-check>{{subtitle}}</p></header>
   <table class="ic-table" aria-label="현재와 재구축 결과 비교">
    <colgroup><col style="width:29%"/><col style="width:32%"/><col style="width:39%"/></colgroup>
    <thead><tr><th v-for="header in headers" :key="header" scope="col" data-check>{{header}}</th></tr></thead>
    <tbody><IllustratedComparisonRow v-for="(row,i) in rows" :key="i" :item="row" :number="i+1" :atlas="atlas" /></tbody>
   </table>
   <aside class="ic-takeaway"><span data-check>{{takeawayLabel}}</span><strong data-check>{{takeaway}}</strong></aside>
   <footer class="ic-footer"><span>{{source}}</span><span>{{String(page).padStart(2,'0')}}</span></footer>
  </section>
 </div>
</template>
