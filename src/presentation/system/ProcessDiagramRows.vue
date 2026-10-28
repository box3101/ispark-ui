<script setup lang="ts">
import IllustrationIcon from './IllustrationIcon.vue'
import type {DiagramItem} from './layout-library-model'
withDefaults(defineProps<{items:DiagramItem[];highlightLast?:boolean;outputLabel?:string}>(),{highlightLast:true,outputLabel:'주요 산출물'})
</script>
<template>
 <div class="process-rows" :class="{'is-dense':items.length>4}" :style="{'--row-count':items.length}">
  <div class="row-head"><span>단계</span><span>실행 내용</span><span>{{outputLabel}}</span></div>
  <ol><li v-for="(item,i) in items" :key="i" :class="{'is-final':highlightLast&&i===items.length-1}">
   <span class="row-number">{{String(i+1).padStart(2,'0')}}</span>
   <div class="row-identity"><IllustrationIcon v-if="item.icon" :name="item.icon" :size="items.length>4?42:56"/><div><small v-if="item.stageLabel" data-fit>{{item.stageLabel}}</small><h2 data-fit>{{item.title}}</h2></div></div>
   <p data-fit>{{item.body}}</p><div class="row-output"><strong data-fit>{{item.detail}}</strong></div>
  </li></ol>
 </div>
</template>
<style scoped>
.process-rows{height:100%;display:grid;grid-template-rows:28px minmax(0,1fr);gap:8px;font-family:var(--presentation-font);color:var(--ds-navy900,#092e49);padding-left:18px;box-sizing:border-box}.process-rows *{box-sizing:border-box}
.row-head{display:grid;grid-template-columns:36% 34% 30%;font-size:var(--type-micro);color:#59738c;font-weight:var(--weight-medium);align-items:center}.row-head span{padding-left:24px}
ol{list-style:none;padding:0;margin:0;display:grid;grid-template-rows:repeat(var(--row-count),minmax(0,1fr));gap:12px;position:relative}ol:before{content:'';position:absolute;left:-1.5px;top:calc(50% / var(--row-count));bottom:calc(50% / var(--row-count));width:3px;background:var(--ds-blue600,#006fbd);border-radius:2px;z-index:1;pointer-events:none}
li{position:relative;display:grid;grid-template-columns:36% 34% 30%;align-items:center;border:1px solid #bad9ed;border-radius:12px;background:linear-gradient(135deg,#fff,#f8fcff);box-shadow:0 3px 9px #092e4908;min-height:0}
.row-number{position:absolute;left:-18px;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:50%;background:var(--ds-blue600,#006fbd);color:white;border:1px solid white;display:grid;place-items:center;font-size:var(--type-detail);font-weight:var(--weight-bold);font-variant-numeric:tabular-nums;z-index:2}
.row-identity{display:flex;align-items:center;gap:12px;padding:6px 14px 6px 28px;min-width:0}.row-identity img{flex-shrink:0}.row-identity>div{min-width:0}h2{font-size:var(--type-supporting);font-weight:var(--weight-bold);line-height:1.3;margin:0;word-break:keep-all}small{font-size:var(--type-source);color:#59738c;display:block;margin-bottom:3px}
p{font-size:var(--type-label);line-height:1.4;white-space:pre-line;word-break:keep-all;margin:0;padding:0 18px;border-left:1px solid #c9dfed;min-width:0}.row-output{align-self:stretch;margin:5px;padding:8px 14px;display:flex;align-items:center;background:#eaf6fe;border-radius:9px;min-width:0}.row-output strong{font-size:var(--type-label);line-height:1.4;color:var(--ds-blue600,#006fbd);word-break:keep-all;white-space:pre-line}
.is-final{background:linear-gradient(135deg,#073e6c,#06283f);color:white;border-color:#007ec2}.is-final small{color:#c5e3f6}.is-final p{border-color:#658da8}.is-final .row-output{background:transparent}.is-final .row-output strong{color:#ffbf57}
.is-dense ol{gap:8px}.is-dense h2,.is-dense p,.is-dense .row-output strong{font-size:var(--type-detail)}.is-dense small{display:none}.is-dense .row-identity{padding-top:3px;padding-bottom:3px}
</style>
