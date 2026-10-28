<script setup lang="ts">
import IllustrationIcon from './IllustrationIcon.vue'
import ProcessDiagramRows from './ProcessDiagramRows.vue'
import type {DiagramItem} from './layout-library-model'
withDefaults(defineProps<{items:DiagramItem[];variant?:'cards'|'rows';highlightLast?:boolean;outputLabel?:string}>(),{variant:'cards',highlightLast:true,outputLabel:'주요 산출물'})
</script>
<template>
 <ProcessDiagramRows v-if="variant==='rows'" :items="items" :highlight-last="highlightLast" :output-label="outputLabel"/>
 <div v-else class="process-cards" :style="{gridTemplateColumns:`repeat(${items.length},minmax(0,1fr))`}">
  <article v-for="(item,i) in items" :key="i" class="process-card" :class="{'is-final':highlightLast&&i===items.length-1}">
   <header><span class="step-number">{{String(i+1).padStart(2,'0')}}</span><span v-if="item.stageLabel" class="stage-label" data-fit>{{item.stageLabel}}</span></header>
   <div class="icon-slot"><IllustrationIcon v-if="item.icon" :name="item.icon" :size="90"/></div>
   <h2 data-fit>{{item.title}}</h2><p class="step-body" data-fit>{{item.body}}</p>
   <div v-if="item.detail" class="step-output"><small>{{outputLabel}}</small><strong data-fit>{{item.detail}}</strong></div>
   <span v-if="i<items.length-1" class="step-arrow" :class="{'to-final':highlightLast&&i===items.length-2}" aria-hidden="true">→</span>
  </article>
 </div>
</template>
<style scoped>
.process-cards,.process-cards *{box-sizing:border-box}.process-cards{height:100%;display:grid;gap:24px;font-family:var(--presentation-font, Pretendard,sans-serif);color:var(--ds-navy900,#092e49)}
.process-card{position:relative;display:flex;flex-direction:column;align-items:stretch;min-width:0;padding:14px 12px 0;border:1px solid #b8d9eb;border-radius:14px;background:linear-gradient(155deg,#fff 65%,#f4faff);box-shadow:0 6px 18px #092e4907;text-align:center}
header{display:flex;align-items:center;gap:12px;text-align:left;min-height:32px}.step-number{display:grid;place-items:center;width:32px;height:32px;flex-shrink:0;border-radius:50%;background:var(--ds-blue600,#006fbd);color:white;font-size:var(--type-detail,16px);font-weight:700}.stage-label{padding-left:10px;border-left:1px solid #bdd6e8;font-size:var(--type-source,12px);font-weight:500;letter-spacing:.3px;color:#59738c}
.icon-slot{height:98px;display:grid;place-items:center;margin:6px 0}.process-card h2{font-size:var(--type-heading,26px);font-weight:700;line-height:1.3;margin:0;white-space:pre-line;word-break:keep-all}.step-body{font-size:var(--type-supporting,20px);line-height:1.5;white-space:pre-line;word-break:keep-all;margin:12px 0 14px}
.step-output{margin:auto -12px 0;padding:12px 10px 16px;background:#eaf5fc9c;border-radius:0 0 13px 13px;position:relative}.step-output:before{content:'';position:absolute;top:0;left:12px;right:12px;border-top:1px solid #c4ddec}.step-output small{display:block;font-size:var(--type-source,12px);color:#58748a;margin-bottom:6px}.step-output strong{display:block;font-size:var(--type-label,18px);line-height:1.35;word-break:keep-all}
.is-final{background:linear-gradient(145deg,#073e6c,#06283f);border-color:#007ec2;color:white}.is-final .stage-label{color:#e0effa;border-color:#608ca9}.is-final .step-output{background:#05263c80}.is-final .step-output:before{border-color:#87b1cb80}.is-final .step-output small{color:#d8e9f5}.is-final .step-output strong{color:#ffbf57}.step-arrow{position:absolute;right:-24px;top:47%;width:24px;color:var(--ds-blue600,#006fbd);font-size:var(--type-step,32px);line-height:1;z-index:2}.step-arrow.to-final{color:#ee9b19}
</style>
