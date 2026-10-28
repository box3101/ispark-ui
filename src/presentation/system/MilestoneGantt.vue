<script setup lang="ts">
import IllustrationIcon from './IllustrationIcon.vue'
import type {IllustrationId} from './illustration-assets'
defineProps<{months:string[];tracks:{label:string;start:number;end:number;milestone:string;icon?:IllustrationId}[]}>()
const icons:Record<string,IllustrationId>={분석:'analytics-review',설계:'workflow-design',구현:'system-blocks',검증:'quality'}
</script>
<template>
 <div class="milestone-gantt" role="table" aria-label="단계별 수행 일정" :style="{'--months':months.length,'--tracks':tracks.length}">
  <div class="gantt-head" role="row"><span role="columnheader" class="work-heading">주요 작업</span><div class="gantt-months"><strong v-for="month in months" :key="month" role="columnheader">{{month}}</strong></div></div>
  <div v-for="(track,i) in tracks" :key="i" class="gantt-row" role="row">
   <div class="gantt-stage" role="rowheader"><IllustrationIcon :name="track.icon||icons[track.label]||'schedule'" :size="52"/><div><small>{{String(i+1).padStart(2,'0')}}</small><h2 data-fit>{{track.label}}</h2></div></div>
   <div class="gantt-lane" role="cell" :aria-label="`${months[track.start-1]}부터 ${months[track.end-1]}까지, ${track.milestone}`">
    <div class="gantt-grid" aria-hidden="true"><span v-for="month in months" :key="month"/></div>
    <div class="gantt-duration" :style="{left:`${(track.start-1)/months.length*100}%`,width:`${(track.end-track.start+1)/months.length*100}%`}"><span data-fit>{{track.milestone}}</span><i class="gantt-end" aria-hidden="true"/></div>
   </div>
  </div>
 </div>
</template>
<style scoped>
.milestone-gantt{height:100%;display:grid;grid-template-rows:48px repeat(var(--tracks),minmax(0,1fr));font-family:var(--presentation-font);color:var(--ds-navy900);padding-right:10px}
.gantt-head,.gantt-row{display:grid;grid-template-columns:166px minmax(0,1fr)}
.gantt-head{gap:0}.work-heading{font-size:var(--type-detail);align-self:center;padding-left:12px;color:#526c7e;font-weight:var(--weight-medium)}
.gantt-months{display:grid;grid-template-columns:repeat(var(--months),minmax(0,1fr));gap:2px}
.gantt-months strong{display:grid;place-items:center;background:linear-gradient(#edf9ff,#e0f0fa);border-radius:10px 10px 0 0;font-size:var(--type-supporting);font-weight:var(--weight-bold)}
.gantt-row{background:#fffffff2;border-bottom:1px solid #dce8f2;border-left:1px solid #dce8f2;border-right:1px solid #dce8f2;min-height:0}.gantt-row:nth-child(2){border-top:1px solid #dce8f2;border-radius:8px 0 0 0}.gantt-row:last-child{border-radius:0 0 8px 8px}
.gantt-stage{display:flex;align-items:center;gap:10px;padding:7px 10px;border-right:1px solid #dce8f2;min-width:0}.gantt-stage img{flex-shrink:0}.gantt-stage small{font-size:var(--type-micro);color:var(--ds-blue600);font-weight:var(--weight-bold);font-variant-numeric:tabular-nums}.gantt-stage h2{font-size:var(--type-body);line-height:1.2;margin:2px 0 0;font-weight:var(--weight-bold);word-break:keep-all}
.gantt-lane{position:relative;min-width:0}.gantt-grid{position:absolute;inset:0;display:grid;grid-template-columns:repeat(var(--months),1fr)}.gantt-grid span+span{border-left:1px dashed #cce0ef}
.gantt-duration{position:absolute;top:50%;height:34px;transform:translateY(-50%);border-radius:8px;background:linear-gradient(90deg,var(--ds-blue600),#48acfa);box-shadow:0 4px 9px #0070c01a;display:flex;align-items:center;justify-content:center;color:white;padding:0 12px;font-size:var(--type-detail);font-weight:var(--weight-bold);white-space:nowrap}
.gantt-duration:after{content:'';position:absolute;right:0;top:100%;height:13px;border-right:1px dashed #285b7c}.gantt-end{position:absolute;right:-7px;top:10px;width:14px;height:14px;transform:rotate(45deg);background:var(--ds-orange500,#f58220);border:2px solid white;box-shadow:1px 2px 4px #092e4920;z-index:1}
</style>
