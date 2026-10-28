<script setup lang="ts">
import IllustrationIcon from './IllustrationIcon.vue'
import type {IllustrationId} from './illustration-assets'
import {computed} from 'vue'
interface TraceRow {title:string;body:string;detail?:string;highlight?:string;icon?:IllustrationId}
const props=withDefaults(defineProps<{rows:TraceRow[];variant?:'flow'|'cards';headers?:string[];accent?:string}>(),{variant:'flow',headers:()=>['요구사항','설계 반영','검증 방법']})
const split=(row:TraceRow)=>{const t=row.detail||'',i=row.highlight?t.indexOf(row.highlight):-1;return i<0?[t,'','']:[t.slice(0,i),row.highlight!,t.slice(i+row.highlight!.length)]}
const entries=computed(()=>props.rows.map(row=>({...row,parts:split(row)})))
const columnIcons:IllustrationId[]=['deliverable','workflow-design','quality']
</script>
<template>
 <div class="trace-diagram" :class="`trace-${variant}`" :style="{'--trace-row-count':entries.length,...(accent?{'--trace-accent':accent}:{})}">
  <div v-if="variant==='flow'" class="trace-head"><div v-for="(header,i) in headers" :key="header"><IllustrationIcon :name="columnIcons[i]||'quality'" :size="44"/><strong>{{header}}</strong></div></div>
  <article v-for="(row,i) in entries" :key="i" class="trace-row">
   <div class="trace-identity"><IllustrationIcon :name="row.icon||(['deliverable','data-migration','people'] as IllustrationId[])[i%3]" :size="variant==='flow'?70:60"/><div><span class="trace-number">{{String(i+1).padStart(2,'0')}}</span><h2 data-fit>{{row.title}}</h2></div></div>
   <span v-if="variant==='flow'" class="trace-arrow" aria-hidden="true">→</span>
   <div class="trace-design"><IllustrationIcon v-if="variant==='flow'" :name="(['workflow-design','system-blocks','organization'] as IllustrationId[])[i%3]" :size="62"/><small v-if="variant==='cards'">{{headers[1]}}</small><p data-fit>{{row.body}}</p></div>
   <span v-if="variant==='flow'" class="trace-arrow" aria-hidden="true">→</span>
   <div class="trace-verification"><IllustrationIcon v-if="variant==='flow'" :name="(['analytics-review','verified','quality'] as IllustrationId[])[i%3]" :size="62"/><small v-if="variant==='cards'">{{headers[2]}}</small><p data-fit><span>{{row.parts[0]}}<strong class="trace-emphasis">{{row.parts[1]}}</strong>{{row.parts[2]}}</span></p></div>
  </article>
 </div>
</template>
<style scoped>
.trace-diagram{height:100%;font-family:inherit;color:var(--ds-text-heading,var(--ds-navy900,#092e49));--trace-border:var(--ds-blue100,#dfedf6);--trace-link:var(--ds-blue600,#006fbd)}.trace-diagram *{box-sizing:border-box}.trace-head{height:64px;display:grid;grid-template-columns:29% 35% 36%;border-bottom:1px solid var(--trace-border);align-items:center}.trace-head>div{display:flex;align-items:center;gap:12px;font-size:var(--type-body)}.trace-head>div:nth-child(2){padding-left:14px}.trace-head>div:last-child{padding-left:20px}.trace-row{display:grid;align-items:center;gap:12px;min-height:96px}.trace-flow .trace-row{grid-template-columns:23% 3% 29% 3% 1fr;border-bottom:1px solid var(--trace-border);padding:12px 0}.trace-identity>div{display:flex;align-items:center;gap:14px}.trace-number{font-size:var(--type-detail);font-weight:var(--weight-bold);color:var(--trace-link);flex-shrink:0}.trace-flow .trace-number{width:38px;height:38px;display:grid;place-items:center;border-radius:50%;color:white;background:var(--trace-link)}.trace-identity h2{font-size:var(--type-body);line-height:1.3;margin:0!important;word-break:keep-all}.trace-arrow{color:var(--trace-link);font-size:var(--type-heading);text-align:center}.trace-design,.trace-verification{min-width:0}.trace-design p,.trace-verification p{margin:0!important;font-size:var(--type-supporting);line-height:1.45;word-break:keep-all;white-space:pre-line}.trace-flow .trace-design{border:1px solid #b9d9ed;border-radius:10px;padding:16px 14px;background:white}.trace-flow .trace-verification{background:#eef7fc;border-radius:10px;padding:16px 12px}.trace-verification p{display:flex;align-items:center;gap:9px}.trace-check{width:24px;height:24px;border:2px solid var(--trace-link);border-radius:50%;font-size:var(--type-detail);color:var(--trace-link);display:grid;place-items:center;flex-shrink:0}.trace-emphasis{color:var(--trace-accent,var(--ds-text-emphasis,var(--ds-orange700,#b85610)));font-weight:var(--weight-bold)}.trace-cards{display:grid;grid-template-rows:repeat(3,1fr);gap:14px}.trace-cards .trace-row{grid-template-columns:26% 37% 1fr;gap:22px;background:#fffffff5;border:1px solid #b9d9ed;border-radius:12px;overflow:hidden;box-shadow:0 5px 12px #092e4908}.trace-cards .trace-identity{height:100%;display:flex;align-items:center;gap:8px;background:var(--ds-navy900,#092e49);color:white;padding:14px}.trace-cards .trace-identity>div{display:block}.trace-cards .trace-number{color:#b7d9f0;display:block;margin-bottom:8px}.trace-cards .trace-identity h2{font-size:var(--type-supporting)}.trace-cards .trace-verification{border-left:1px solid var(--trace-border);padding:0 14px 0 22px}.trace-cards small{display:block;color:var(--trace-link);font-size:var(--type-micro);font-weight:var(--weight-bold);margin-bottom:10px}.trace-cards .trace-design p,.trace-cards .trace-verification p{font-size:var(--type-supporting)}
</style>
<style scoped>
.trace-flow{height:366px;grid-template-rows:70px repeat(var(--trace-row-count),minmax(0,1fr));gap:10px}
.trace-flow .trace-head{height:70px;grid-template-columns:repeat(3,1fr);gap:30px;border:0}
.trace-flow .trace-head>div{padding:0 12px;font-size:var(--type-body);border-bottom:2px solid #b9d9ed;height:100%}
.trace-flow .trace-row{grid-template-columns:minmax(0,1fr) 20px minmax(0,1fr) 20px minmax(0,1fr);gap:5px;padding:0;border:0}
.trace-flow .trace-identity,.trace-flow .trace-design,.trace-flow .trace-verification{position:relative;height:100%;display:flex;align-items:center;gap:8px;padding:12px;background:linear-gradient(135deg,#f8fcff,#eaf3fc);border:1px solid #e0edf7;border-radius:12px;min-width:0}
.trace-flow .trace-identity>div{display:block}.trace-flow .trace-number{position:absolute;top:6px;left:6px;width:24px;height:24px;font-size:var(--type-source)}
.trace-flow .trace-identity h2{font-size:var(--type-supporting);color:var(--trace-link)}
.trace-flow .trace-design p,.trace-flow .trace-verification p{font-size:var(--type-label);font-weight:var(--weight-bold);color:var(--ds-navy900,#092e49)}
.trace-flow .proposal-illustration-icon{flex-shrink:0}.trace-flow .trace-emphasis{color:var(--trace-accent,var(--trace-link))}
.trace-flow .trace-arrow{font-size:var(--type-heading)}
</style>
<style scoped>
.trace-flow{display:grid;grid-template-rows:64px repeat(var(--trace-row-count),minmax(0,1fr))}
.trace-flow .trace-row{min-height:0;padding:4px 0}
.trace-flow .trace-design,.trace-flow .trace-verification{padding:8px 12px}
.trace-flow .trace-design p,.trace-flow .trace-verification p{font-size:var(--type-label);line-height:1.35}
</style>
