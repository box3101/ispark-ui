<script setup lang="ts">
import IllustrationIcon from './IllustrationIcon.vue'
import type {DiagramItem} from './layout-library-model'
defineProps<{items:DiagramItem[]}>()
</script>
<template>
 <div class="delivery-organization" aria-label="책임자와 세 수행팀의 보고 관계">
  <article class="organization-leader">
   <IllustrationIcon :name="items[0].icon||'staffing'" :size="94"/>
   <div><h2 data-fit>{{items[0].title}}</h2><p data-fit>{{items[0].body}}</p></div>
  </article>
  <svg class="organization-connectors" viewBox="0 0 944 38" preserveAspectRatio="none" aria-hidden="true"><path d="M472 0 V18 M149.33 38 V18 H794.67 V38 M472 18 V38"/><circle cx="472" cy="2" r="4"/><circle v-for="x in [149.33,472,794.67]" :key="x" :cx="x" cy="36" r="4"/></svg>
  <div class="organization-teams">
   <article v-for="(team,i) in items.slice(1)" :key="i" class="organization-team">
    <span class="organization-number">{{String(i+1).padStart(2,'0')}}</span>
    <IllustrationIcon :name="team.icon||'organization'" :size="78"/>
    <h2 data-fit>{{team.title}}</h2>
    <ul><li v-for="(role,j) in team.body.split('\n')" :key="j"><span aria-hidden="true" class="role-mark">✓</span><span data-fit>{{role}}</span></li></ul>
   </article>
  </div>
 </div>
</template>
<style scoped>
.delivery-organization{height:100%;display:grid;grid-template-rows:106px 38px minmax(0,1fr);font-family:var(--presentation-font);color:var(--ds-navy900);font-synthesis:none}
.organization-leader{justify-self:center;display:flex;align-items:center;gap:20px;min-width:440px;max-width:700px;padding:6px 30px;border:1px solid #5faddc;border-radius:14px;background:radial-gradient(ellipse at 100% 130%,#176b9a 0,transparent 60%),linear-gradient(130deg,#124568,#092e49);box-shadow:0 6px 14px #092e4915;color:white}
.organization-leader>div{border-left:1px solid #83b4d1;padding-left:24px;min-width:0}.organization-leader h2{margin:0;font-size:var(--type-heading);line-height:1.3;font-weight:var(--weight-bold)}.organization-leader p{margin:10px 0 0;font-size:var(--type-supporting);line-height:1.4}
.organization-connectors{width:100%;height:38px;overflow:visible;position:relative;z-index:2}.organization-connectors path{fill:none;stroke:var(--ds-blue600);stroke-width:1.8;vector-effect:non-scaling-stroke}.organization-connectors circle{fill:white;stroke:var(--ds-blue600);stroke-width:2;vector-effect:non-scaling-stroke}
.organization-teams{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.organization-team{position:relative;border:1px solid #89bee3;border-radius:12px;padding:12px 22px 16px;background:radial-gradient(ellipse at 100% 135%,#d9f1fc 0 32%,transparent 33%),radial-gradient(ellipse at 0 135%,#ecf7fd 0 42%,transparent 43%),#fff;box-shadow:0 5px 16px #092e490a;min-width:0}
.organization-number{position:absolute;top:17px;left:18px;color:var(--ds-blue600);font-size:var(--type-label);font-weight:var(--weight-bold);font-variant-numeric:tabular-nums;border-bottom:2px solid #a3d5f1;padding-bottom:4px}.organization-team>img{margin:0 auto 5px}.organization-team h2{font-size:var(--type-body);font-weight:var(--weight-bold);line-height:1.3;text-align:center;margin:0 0 12px;word-break:keep-all}.organization-team ul{padding:10px 0 0;margin:0;list-style:none;border-top:1px solid #c7e2f3;display:grid;gap:6px}.organization-team li{display:flex;gap:10px;align-items:baseline;font-size:var(--type-supporting);line-height:1.4;word-break:keep-all}.role-mark{font-size:var(--type-detail);color:var(--ds-blue600);flex-shrink:0}
</style>
