<script setup lang="ts">
import {computed} from 'vue'
import IllustrationIcon from './IllustrationIcon.vue'
import type {DiagramItem} from './layout-library-model'
const props=withDefaults(defineProps<{items:DiagramItem[];primaryIndex?:number;accent?:string}>(),{primaryIndex:2})
const primary=computed(()=>props.items[props.primaryIndex]??props.items[2])
const supporting=computed(()=>props.items.filter(item=>item!==primary.value))
// Only a real percentage creates a progress arc; counts never imply completion.
const percentage=computed(()=>{
 const match=primary.value?.value?.trim().match(/^(\d+(?:\.\d+)?)\s*%$/)
 if(!match)return null
 const value=Number(match[1]);return value<=100?value:null
})
const parts=(value='')=>{const match=value.match(/^([\d,.]+)\s*(.*)$/);return match?{number:match[1],unit:match[2]}:{number:value,unit:''}}
</script>
<template>
 <div class="metrics-dashboard" :style="{'--metric-accent':accent||'var(--ds-blue600)'}">
  <article class="metric-hero" :class="{'has-ring':percentage!==null}">
   <svg v-if="percentage!==null" class="metric-ring" viewBox="0 0 360 360" role="img" :aria-label="`${primary.title} ${primary.value}`">
    <circle cx="180" cy="180" r="151" fill="none" stroke="#e2f1fa" stroke-width="28"/>
    <circle class="metric-arc" cx="180" cy="180" r="151" fill="none" stroke-width="28" pathLength="100" :stroke-dasharray="`${percentage} ${100-percentage}`" transform="rotate(-90 180 180)"/>
   </svg>
   <div class="metric-hero-copy">
    <div class="metric-number" data-fit>{{parts(primary.value).number}}<span>{{parts(primary.value).unit}}</span></div>
    <h2 data-fit>{{primary.title}}</h2><p data-fit>{{primary.body}}</p>
   </div>
  </article>
  <div class="metric-support">
   <article v-for="(item,index) in supporting" :key="index" class="metric-card">
    <IllustrationIcon :name="item.icon||(index===0?'deliverable':'verified')" :size="108"/>
    <div class="metric-copy"><h2 data-fit>{{item.title}}</h2><div class="metric-number" data-fit>{{parts(item.value).number}}<span>{{parts(item.value).unit}}</span></div><p data-fit>{{item.body}}</p></div>
   </article>
  </div>
 </div>
</template>
<style scoped>
.metrics-dashboard{display:grid;grid-template-columns:1.08fr 1fr;gap:18px;height:100%;font-family:var(--presentation-font);font-synthesis:none;color:var(--ds-navy900)}
.metric-hero,.metric-card{border:1px solid #bad7e9;border-radius:14px;background:linear-gradient(145deg,#fff 55%,#eef7fc);box-shadow:0 5px 15px #092e4906}
.metric-hero{position:relative;display:grid;place-items:center;min-width:0}
.metric-ring{position:absolute;width:350px;height:350px;inset:0;margin:auto;max-height:100%;max-width:100%}.metric-arc{stroke:var(--metric-accent)}
.metric-hero-copy{text-align:center;position:relative;max-width:310px}.has-ring .metric-hero-copy{max-width:255px}
.metric-number{font-size:var(--type-display);font-weight:var(--weight-bold);line-height:1.1;letter-spacing:-2px;font-variant-numeric:lining-nums tabular-nums;color:var(--metric-accent)}
.metric-hero .metric-number{font-size:calc(var(--type-metric)*2);color:var(--ds-navy900)}
.metric-number span{font-size:var(--type-heading);letter-spacing:0;margin-left:5px}.metric-hero .metric-number span{font-size:var(--type-title)}
.metrics-dashboard h2{margin:0;font-size:var(--type-heading);line-height:1.3;font-weight:var(--weight-bold);word-break:keep-all}
.metric-hero h2{margin-top:9px}.metrics-dashboard p{margin:10px 0 0;font-size:var(--type-detail);line-height:1.45;color:#526c7e;word-break:keep-all}
.metric-support{display:grid;grid-template-rows:1fr 1fr;gap:18px;min-width:0}.metric-card{display:flex;align-items:center;gap:18px;padding:20px;min-width:0}.metric-copy{border-left:1px solid #d2e4ef;padding-left:20px;flex:1;min-width:0}.metric-card h2{font-size:var(--type-body);margin-bottom:8px}.metric-card .proposal-illustration-icon{flex-shrink:0}
</style>
