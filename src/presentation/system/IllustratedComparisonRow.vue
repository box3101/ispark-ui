<script setup lang="ts">
import ArtworkWindow from './ArtworkWindow.vue'
import IllustrationIcon from './IllustrationIcon.vue'
import {comparisonIllustrations} from './illustration-assets'
export interface IllustratedComparisonItem {label:string; current:string; result:string; detail:string; artwork:'data'|'system'|'performance'; iconSrc?:string}
defineProps<{item:IllustratedComparisonItem; number:number; atlas:string}>()
const marks={data:{x:1315,y:330,width:164,height:140},system:{x:1350,y:513,width:130,height:146},performance:{x:1320,y:699,width:160,height:151}}
</script>
<template>
 <tr class="ic-row">
  <th scope="row" class="ic-identity">
   <span class="ic-number">{{String(number).padStart(2,'0')}}</span>
   <img v-if="item.iconSrc" class="ic-icon" :src="item.iconSrc" alt="" />
   <IllustrationIcon v-else class="ic-icon ic-transparent-icon" :name="comparisonIllustrations[item.artwork]" />
   <span class="ic-label" data-check>{{item.label}}</span>
  </th>
  <td class="ic-current"><p data-check>{{item.current}}</p></td>
  <td class="ic-result">
   <span class="ic-arrow" aria-hidden="true" />
   <ArtworkWindow class="ic-watermark" :src="atlas" v-bind="marks[item.artwork]" :canvas-width="1536" :canvas-height="1024" />
   <div class="ic-result-copy"><h2 data-check>{{item.result}}</h2><p data-check>{{item.detail}}</p></div>
  </td>
 </tr>
</template>
