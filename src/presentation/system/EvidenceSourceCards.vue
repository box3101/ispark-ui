<script setup lang="ts">
import IllustrationIcon from './IllustrationIcon.vue'
import type {DiagramItem} from './layout-library-model'
withDefaults(defineProps<{items:DiagramItem[];criteriaLabel?:string}>(),{criteriaLabel:'핵심 포인트'})
const colors=['#0064c8','#007b83','#5946b5']
</script>
<template>
 <div class="source-cards" :style="{gridTemplateColumns:`repeat(${items.length},minmax(0,1fr))`}">
  <article v-for="(item,i) in items" :key="i" class="source-card" :style="{'--source-accent':item.accent||colors[i%colors.length]}">
   <span class="index" aria-hidden="true">{{String(i+1).padStart(2,'0')}}</span>
   <header><span v-if="item.category" class="category" data-fit>{{item.category}}</span><IllustrationIcon v-if="item.icon" :name="item.icon" :size="64"/></header>
   <h2 data-fit>{{item.title}}</h2>
   <strong v-if="item.detail" class="key-message" data-fit>{{item.detail}}</strong>
   <p class="source-body" data-fit>{{item.body}}</p>
   <div v-if="item.outcome||item.question" class="criteria"><small>{{item.footerLabel||criteriaLabel}}</small><p data-fit>{{item.outcome||item.question}}</p></div>
  </article>
 </div>
</template>
<style scoped>
.source-cards,.source-cards *{box-sizing:border-box}.source-cards{display:grid;gap:24px;height:100%;font-family:var(--presentation-font);color:var(--ds-navy900,#092e49)}
.source-card{position:relative;min-width:0;display:flex;flex-direction:column;border:1px solid #d8e3ec;border-radius:12px;background:#fffffffa;box-shadow:0 5px 15px #092e4908;padding:16px 18px 14px;overflow:hidden}.source-card:before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:var(--source-accent)}
header{display:flex;align-items:center;justify-content:space-between;height:54px;flex-shrink:0;margin-bottom:6px}header>div{display:flex;align-items:flex-start;flex-direction:column;gap:5px}.category{display:inline-block;padding:4px 12px;border-radius:20px;background:color-mix(in srgb,var(--source-accent) 10%,white);color:var(--source-accent);font-size:var(--type-micro,14px);line-height:1.3;font-weight:700}.index{font-size:var(--type-source,12px);color:#6e7e8e;font-weight:500}
.source-card h2{font-size:var(--type-body,24px);line-height:1.25;margin:0 0 8px;font-weight:700;word-break:keep-all;white-space:pre-line}.key-message{font-size:calc(var(--type-step,32px) - 2px);line-height:1.15;letter-spacing:-.7px;color:var(--source-accent);font-weight:700;white-space:pre-line;word-break:keep-all;min-height:69px}
.source-body{border-top:1px solid #d4e0e9;margin:12px 0;padding-top:12px;font-size:var(--type-label,18px);line-height:1.5;white-space:pre-line;word-break:keep-all}.criteria{margin-top:auto;padding:10px 12px;background:color-mix(in srgb,var(--source-accent) 6%,white);border-radius:8px}.criteria small{display:block;color:var(--source-accent);font-size:var(--type-source,12px);font-weight:500;margin-bottom:4px}.criteria p{font-size:var(--type-detail,16px);line-height:1.4;margin:0;word-break:keep-all}
</style>
<style scoped>
.source-card{background:linear-gradient(145deg,#fff 60%,color-mix(in srgb,var(--source-accent) 3%,white));box-shadow:0 5px 18px #092e4908}
.index{position:absolute;right:14px;top:9px;font-size:76px;line-height:1;color:var(--source-accent);opacity:.07;font-weight:700;pointer-events:none}
header{position:relative;height:62px;align-items:center;margin-bottom:4px}.category{padding:0 0 6px;border-radius:0;background:none;border-bottom:1px solid color-mix(in srgb,var(--source-accent) 35%,white);font-size:var(--type-detail,16px);max-width:65%;min-width:40%}
.source-body{margin-bottom:12px}.criteria{margin: auto -18px -14px;padding:0;border-radius:0;background:none}.criteria small{margin:0;padding:7px 18px;background:color-mix(in srgb,var(--source-accent) 9%,white);font-size:var(--type-source,12px)}.criteria p{display:flex;align-items:center;justify-content:center;min-height:48px;margin:0;padding:10px 12px;background:var(--source-accent);color:white;font-size:var(--type-label,18px);font-weight:700;line-height:1.35;text-align:center;white-space:pre-line}
</style>
