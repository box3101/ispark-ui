<script setup lang="ts">
import IllustrationIcon from './IllustrationIcon.vue'
import type {IllustrationId} from './illustration-assets'
defineProps<{items:{title:string;body?:string;icon?:IllustrationId}[];message:string;caption?:string}>()
</script>
<template>
 <main class="split-explanation">
  <aside class="split-feature">
   <div class="split-illustration"><svg viewBox="0 0 300 230" aria-hidden="true"><path d="M150 65 L70 165 L235 165 Z"/></svg><IllustrationIcon v-for="(item,i) in items.slice(0,3)" :key="i" :name="item.icon||'system-blocks'" :size="112" :class="`feature-icon-${i}`"/></div>
   <h2 data-fit>{{message}}</h2><p v-if="caption" data-fit>{{caption}}</p>
  </aside>
  <div class="split-rows" :style="{gridTemplateRows:`repeat(${items.length},minmax(0,1fr))`}"><article v-for="(item,i) in items" :key="i"><b>{{String(i+1).padStart(2,'0')}}</b><IllustrationIcon :name="item.icon||'system-blocks'" :size="88"/><div><h2 data-fit>{{item.title}}</h2><p data-fit>{{item.body}}</p></div></article></div>
 </main>
</template>
<style scoped>
.split-explanation{height:468px;display:grid;grid-template-columns:32% 1fr;gap:24px;position:relative;font-family:var(--presentation-font);color:#092e49}
.split-feature{border-radius:15px;background:linear-gradient(145deg,#124d74,#092e49);padding:18px 24px;color:white;min-width:0}
.split-illustration{height:255px;position:relative}.split-illustration svg{position:absolute;width:100%;height:100%;inset:0;overflow:visible}.split-illustration path{fill:none;stroke:#5abdf2;stroke-width:4;stroke-linejoin:round}.split-illustration img{position:absolute}.feature-icon-0{left:calc(50% - 56px);top:0}.feature-icon-1{left:-12px;top:112px}.feature-icon-2{right:-12px;top:112px}
.split-feature h2{font-size:var(--type-heading);line-height:1.45;white-space:pre-line;word-break:keep-all;margin:4px 0 20px}.split-feature p{border-top:1px solid #65a5c9;padding-top:15px;color:#b9def5;font-size:var(--type-label);line-height:1.5;margin:0}
.split-rows{display:grid;gap:15px;min-width:0}.split-rows article{display:flex;align-items:center;gap:15px;border:1px solid #b9d9ed;border-radius:14px;background:linear-gradient(140deg,white,#f2f9fd);padding:18px;box-shadow:0 6px 16px #092e4908;position:relative}.split-rows article:before{content:'';position:absolute;left:-25px;width:24px;border-top:1px solid #7ba7c0}.split-rows b{font-size:var(--type-step);color:#006fbd;font-variant-numeric:tabular-nums}.split-rows img{flex-shrink:0}.split-rows article>div{border-left:1px solid #bad9eb;padding-left:18px;min-width:0}.split-rows h2{font-size:var(--type-heading);color:#006fbd;margin:0 0 12px;line-height:1.3;word-break:keep-all}.split-rows p{font-size:var(--type-supporting);margin:0;line-height:1.5;word-break:keep-all}
</style>
