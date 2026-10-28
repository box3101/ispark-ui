<script setup lang="ts">
import type {DiagramItem} from './layout-library-model'
withDefaults(defineProps<{items:DiagramItem[];headers?:string[]}>(),{headers:()=>['위험 요인','예상 영향','대응 방향']})
</script>
<template>
 <div class="risk-matrix" role="table" aria-label="위험별 영향과 대응 방향" :style="{'--risk-count':items.length}">
  <div class="risk-head" role="row">
   <div v-for="(header,i) in headers" :key="i" role="columnheader">
    <svg viewBox="0 0 32 32" aria-hidden="true"><template v-if="i===0"><path d="M16 4 30 28H2Z"/><path d="M16 12v7m0 4v1"/></template><template v-else-if="i===1"><ellipse cx="16" cy="23" rx="13" ry="5"/><path d="M8 15c-6 2-5 5 0 7m16-7c6 2 5 5 0 7M16 3c-6 7-6 12 0 12s6-5 0-12Z"/></template><template v-else><path d="m16 3 12 5v9c0 6-6 10-12 13C10 27 4 23 4 17V8Z"/><path d="m10 16 4 4 8-9"/></template></svg>
    <strong>{{header}}</strong>
   </div>
  </div>
  <div v-for="(item,i) in items" :key="i" class="risk-row" role="row">
   <div class="risk-name" role="rowheader"><span class="risk-number">{{String(i+1).padStart(2,'0')}}</span><strong data-fit>{{item.title}}</strong></div>
   <div class="risk-impact" role="cell"><span data-fit>{{item.body}}</span><span class="risk-arrow" aria-hidden="true">→</span></div>
   <div class="risk-response" role="cell"><span class="response-check" aria-hidden="true">✓</span><strong data-fit>{{item.detail}}</strong></div>
  </div>
 </div>
</template>
<style scoped>
.risk-matrix,.risk-matrix *{box-sizing:border-box}.risk-matrix{height:100%;display:grid;grid-template-rows:54px repeat(var(--risk-count),minmax(0,1fr));gap:12px;font-family:var(--presentation-font);color:var(--ds-navy900,#092e49)}.risk-head,.risk-row{display:grid;grid-template-columns:30% 29% 41%;min-width:0}.risk-head{border:1px solid #d1dfeb;border-radius:9px;background:#f5f9fded;align-items:center;padding:8px 0}.risk-head>div{display:flex;align-items:center;justify-content:center;gap:13px;font-size:var(--type-body,24px);line-height:1.3;padding:0 12px}.risk-head>div+div{border-left:1px solid #d1dfeb}.risk-head svg{width:28px;height:28px;fill:none;stroke:#3a5879;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}
.risk-row{border:1px solid #d6e1eb;border-radius:10px;background:#ffffffef;box-shadow:0 4px 12px #092e4906;position:relative;padding:5px 5px 5px 0}.risk-row:before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;border-radius:10px 0 0 10px;background:#f5a529}.risk-name{display:flex;align-items:center;gap:14px;padding:12px 15px;min-width:0}.risk-number{display:grid;place-items:center;flex-shrink:0;width:39px;height:39px;border-radius:50%;background:#fff0d7;color:#aa5b0a;font-size:var(--type-label,18px);font-weight:700}.risk-name strong{font-size:var(--type-supporting,20px);line-height:1.4;white-space:pre-line;word-break:keep-all}.risk-impact{position:relative;display:flex;align-items:center;justify-content:center;text-align:center;padding:12px;margin-right:36px;border-radius:8px;background:#eef6ff;min-width:0;font-size:var(--type-supporting,20px);line-height:1.4;white-space:pre-line;word-break:keep-all}.risk-arrow{position:absolute;right:-30px;top:50%;transform:translateY(-50%);font-size:var(--type-step,32px);line-height:1;color:#518fc6}.risk-response{display:flex;align-items:center;gap:14px;min-width:0;padding:12px 18px;background:#ecf9f6;border-radius:8px;color:#006d72}.risk-response strong{font-size:var(--type-supporting,20px);line-height:1.4;white-space:pre-line;word-break:keep-all}.response-check{width:32px;height:32px;flex-shrink:0;display:grid;place-items:center;border:2px solid currentColor;border-radius:50%;font-size:20px;font-weight:500}
</style>
