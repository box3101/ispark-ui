<script setup lang="ts">
import type {DiagramItem} from './layout-library-model'
withDefaults(defineProps<{
 items:DiagramItem[]; headers?:string[]; subtitles?:string[];
 visuals?:('sequence'|'single'|'none')[];
}>(),{headers:()=>['비교 기준','대안 A','대안 B'],subtitles:()=>[],visuals:()=>[]})
</script>
<template>
 <table class="alternative-table" aria-label="동일 기준의 대안 비교">
  <colgroup><col class="criteria-column"/><col/><col/></colgroup>
  <thead><tr>
   <th scope="col" class="criteria-heading">{{headers[0]}}</th>
   <th v-for="i in 2" :key="i" scope="col" :class="['option-heading',`option-${i}`]">
    <div class="heading-content">
     <svg v-if="visuals[i-1]&&visuals[i-1]!=='none'" class="option-visual" viewBox="0 0 108 38" aria-hidden="true">
      <template v-if="visuals[i-1]==='sequence'"><rect x="1" y="8" width="22" height="22" rx="3"/><path d="M27 19h12m-5-5 5 5-5 5"/><rect x="43" y="8" width="22" height="22" rx="3"/><path d="M69 19h12m-5-5 5 5-5 5"/><rect x="84" y="8" width="22" height="22" rx="3"/></template>
      <rect v-else x="31" y="3" width="46" height="32" rx="4"/>
     </svg>
     <div><strong data-fit>{{headers[i]}}</strong><span v-if="subtitles[i-1]" data-fit>{{subtitles[i-1]}}</span></div>
    </div>
   </th>
  </tr></thead>
  <tbody><tr v-for="(item,i) in items" :key="i">
   <th scope="row" class="criterion"><div><span>{{String(i+1).padStart(2,'0')}}</span><strong data-fit>{{item.title}}</strong></div></th>
   <td class="option-cell option-1" :class="{'first-value':i===0}"><span data-fit>{{item.body}}</span></td>
   <td class="option-cell option-2" :class="{'first-value':i===0}"><span data-fit>{{item.detail}}</span></td>
  </tr></tbody>
 </table>
</template>
<style scoped>
.alternative-table,.alternative-table *{box-sizing:border-box}.alternative-table{width:calc(100% + 24px);height:100%;margin:0 -12px;border-collapse:separate;border-spacing:12px 0;table-layout:fixed;font-family:var(--presentation-font);color:var(--ds-navy900,#092e49)}.criteria-column{width:24%}.alternative-table th,.alternative-table td{vertical-align:middle;white-space:pre-line;word-break:keep-all}.alternative-table thead{height:27%}.alternative-table tbody tr{height:24.33%}
.criteria-heading{background:#e3ecf4;border-radius:8px;padding:16px;font-size:var(--type-heading,26px);font-weight:700}.option-1{--option-color:#0868d5;--option-tint:#eaf4ff}.option-2{--option-color:#007f88;--option-tint:#eaf8f7}.option-heading{background:var(--option-tint);border:1px solid #c9dceb;border-top:5px solid var(--option-color);border-radius:10px 10px 0 0;padding:12px 18px}.heading-content{display:flex;align-items:center;justify-content:center;gap:16px;text-align:left}.heading-content strong{display:block;font-size:var(--type-heading,26px);font-weight:700;line-height:1.3}.heading-content span{display:block;font-size:var(--type-label,18px);font-weight:400;margin-top:5px;line-height:1.35}.option-visual{width:74px;flex-shrink:0;color:var(--option-color);fill:color-mix(in srgb,var(--option-color) 25%,white);stroke:currentColor;stroke-width:1.7}.option-visual path{fill:none}
.criterion{background:#edf3f8;border-top:3px solid white;border-radius:8px;padding:16px 14px;text-align:left}.criterion>div{display:flex;align-items:center;gap:14px}.criterion>div>span{color:#6c8198;font-size:var(--type-label,18px);font-weight:500;padding-right:12px;border-right:1px solid #c9d7e4}.criterion strong{font-size:var(--type-body,24px);font-weight:700;line-height:1.3}.option-cell{background:#ffffffef;border-left:1px solid #c9dceb;border-right:1px solid #c9dceb;border-bottom:1px solid #d7e3ec;text-align:center;padding:16px 18px;font-size:var(--type-body,24px);line-height:1.4;font-weight:400}.first-value{color:var(--option-color);font-weight:700}.alternative-table tbody tr:last-child .option-cell{border-radius:0 0 10px 10px;border-bottom-color:#c9dceb}
</style>
