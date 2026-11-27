<script setup lang="ts">
import IllustrationIcon from './IllustrationIcon.vue'
import ProcessDiagramRows from './ProcessDiagramRows.vue'
import {inject} from 'vue'
import {illustrationStyleKey} from './illustration-style'
import goal from './pictograms/goal.svg'
import evaluation from './pictograms/evaluation.svg'
import department from './pictograms/department.svg'
import individual from './pictograms/individual.svg'
import solidGoal from './pictograms/solid/flag.svg'
import solidEvaluation from './pictograms/solid/clipboard-text.svg'
import solidDepartment from './pictograms/solid/users-three.svg'
import solidIndividual from './pictograms/solid/identification-card.svg'
const pictograms={goal,evaluation,department,individual,solidGoal,solidEvaluation,solidDepartment,solidIndividual}
const iconStyle=inject(illustrationStyleKey,undefined)
import type {DiagramItem} from './layout-library-model'
withDefaults(defineProps<{items:DiagramItem[];variant?:'cards'|'rows';highlightLast?:boolean;outputLabel?:string;reverseLabel?:string}>(),{variant:'cards',highlightLast:true,outputLabel:'주요 산출물'})
</script>
<template>
 <ProcessDiagramRows v-if="variant==='rows'" :items="items" :highlight-last="highlightLast" :output-label="outputLabel"/>
 <div v-else class="process-flow" :class="{'has-reverse':reverseLabel}">
 <div class="process-cards" :style="{gridTemplateColumns:`repeat(${items.length},minmax(0,1fr))`}">
  <article v-for="(item,i) in items" :key="i" class="process-card" :class="{'is-final':highlightLast&&i===items.length-1}">
   <header><span class="step-number">{{String(i+1).padStart(2,'0')}}</span><span v-if="item.stageLabel" class="stage-label" data-fit>{{item.stageLabel}}</span></header>
   <div class="icon-slot"><img v-if="item.pictogram && iconStyle==='flat'" class="card-pictogram" :src="pictograms[item.pictogram]" width="90" height="90" alt=""/><IllustrationIcon v-else-if="item.icon" :name="item.icon" :size="90"/></div>
   <h2 data-fit>{{item.title}}</h2><p class="step-body" data-fit>{{item.body}}</p>
   <div v-if="item.detail" class="step-output"><small>{{outputLabel}}</small><strong data-fit>{{item.detail}}</strong></div>
   <span v-if="i<items.length-1" class="step-arrow" :class="{'to-final':highlightLast&&i===items.length-2}" aria-hidden="true">→</span>
  </article>
 </div>
 <div v-if="reverseLabel" class="reverse-route"><span>{{reverseLabel}}</span></div>
 </div>
</template>
<style scoped>
.process-cards,.process-cards *{box-sizing:border-box}.process-cards{height:100%;display:grid;gap:24px;font-family:var(--presentation-font, Pretendard,sans-serif);color:var(--ds-navy900,#092e49)}
.process-card{position:relative;display:flex;flex-direction:column;align-items:stretch;min-width:0;padding:14px 12px 0;border:1px solid #b8d9eb;border-radius:14px;background:var(--ds-white,#fff);box-shadow:0 6px 18px #092e4907;text-align:center}
header{display:flex;align-items:center;gap:12px;text-align:left;min-height:32px}.step-number{display:grid;place-items:center;width:32px;height:32px;flex-shrink:0;border-radius:50%;background:var(--ds-blue600,#006fbd);color:white;font-size:var(--type-detail,16px);font-weight:700}.stage-label{padding-left:10px;border-left:1px solid #bdd6e8;font-size:var(--type-source,12px);font-weight:500;letter-spacing:.3px;color:#59738c}
.icon-slot{position:relative;height:82px;flex-shrink:0;display:grid;place-items:center;margin:6px 0}.process-card h2{font-size:var(--type-heading,26px);font-weight:700;line-height:1.3;margin:0;white-space:pre-line;word-break:keep-all}.step-body{font-size:var(--type-supporting,20px);line-height:1.5;white-space:pre-line;word-break:keep-all;margin:12px 0 14px}
.step-output{margin:auto -12px 0;padding:12px 10px 16px;background:#eaf5fc9c;border-radius:0 0 13px 13px;position:relative}.step-output:before{content:'';position:absolute;top:0;left:12px;right:12px;border-top:1px solid #c4ddec}.step-output small{display:block;font-size:var(--type-source,12px);color:#58748a;margin-bottom:6px}.step-output strong{display:block;font-size:var(--type-label,18px);line-height:1.35;word-break:keep-all}
.is-final{--flat-icon-color:#e0effa;background:linear-gradient(145deg,#073e6c,#06283f);border-color:#007ec2;color:white}.is-final .stage-label{color:#e0effa;border-color:#608ca9}.is-final .step-output{background:#05263c80}.is-final .step-output:before{border-color:#87b1cb80}.is-final .step-output small{color:#d8e9f5}.is-final .step-output strong{color:#ffbf57}.step-arrow{position:absolute;right:-24px;top:47%;width:24px;color:var(--ds-blue600,#006fbd);font-size:var(--type-step,32px);line-height:1;z-index:2}.step-arrow.to-final{color:#ee9b19}

.icon-slot :deep(.proposal-illustration-icon),.icon-slot .card-pictogram{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:90px;height:90px;object-fit:contain}
/* Direction connectors belong to the diagram, not interactive controls. */
.process-flow{height:100%;display:flex;flex-direction:column;gap:12px}
.process-cards{flex:1;min-height:0;height:auto}
.step-arrow{top:47%;height:18px;font-size:0;background:currentColor;clip-path:polygon(0 40%,62% 40%,62% 0,100% 50%,62% 100%,62% 60%,0 60%)}
.step-arrow.to-final{color:var(--ds-orange500,#d9641a)}
.has-reverse .icon-slot{height:78px;margin:2px 0 4px}
.has-reverse .step-body{margin:8px 0 12px}
.reverse-route{position:relative;flex:0 0 28px;margin:0 9%;display:grid;place-items:center;color:var(--ds-orange700,#b85610);font:700 var(--type-detail,16px) var(--presentation-font,Pretendard,sans-serif)}
.reverse-route:before{content:'';position:absolute;left:0;right:0;border-top:2px solid currentColor}
.reverse-route:after{content:'';position:absolute;left:0;width:9px;height:9px;border-left:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg)}
.reverse-route span{position:relative;padding:0 14px;background:var(--ds-white,#fff)}
</style>
