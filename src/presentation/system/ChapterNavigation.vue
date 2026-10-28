<script setup lang="ts">
import {computed,watchEffect} from 'vue'
import {slideTokens} from './tokens'

export interface ChapterItem {id:string;number:string;label:string}
export interface ChapterNavigationTheme {active:string;inactive:string;heading:string;divider:string}
const props=withDefaults(defineProps<{
  items:ChapterItem[]; activeId:string; variant?:'full'|'compact';
  theme?:Partial<ChapterNavigationTheme>; ariaLabel?:string
}>(),{variant:'full',ariaLabel:'발표 목차와 현재 위치'})
const current=computed(()=>props.items.find(item=>item.id===props.activeId))
const colors=computed(()=>({
 '--chapter-active':props.theme?.active||`var(--ds-text-emphasis, ${slideTokens.colors.orange700})`,
 '--chapter-inactive':props.theme?.inactive||'var(--ds-text-muted, #6B7684)',
 '--chapter-heading':props.theme?.heading||`var(--ds-text-heading, ${slideTokens.colors.navy900})`,
 '--chapter-divider':props.theme?.divider||`var(--ds-border-subtle, ${slideTokens.colors.blue100})`,
}))
watchEffect(()=>{
 if(props.items.length<2||props.items.length>7)throw Error('ChapterNavigation: 2–7 chapters required')
 if(new Set(props.items.map(i=>i.id)).size!==props.items.length)throw Error('ChapterNavigation: chapter IDs must be unique')
 if(!current.value)throw Error('ChapterNavigation: activeId must match a chapter')
 if(props.items.some(i=>!i.id.trim()||!i.number.trim()||!i.label.trim()))throw Error('ChapterNavigation: id, number and label are required')
})
</script>
<template>
 <div class="chapter-navigation" :class="`chapter-navigation--${variant}`" :style="colors">
  <div v-if="variant==='compact'" class="chapter-current" aria-hidden="true">{{current?.number}} / {{current?.label}}</div>
  <nav :aria-label="ariaLabel"><ol>
   <li v-for="item in items" :key="item.id" :class="{'is-current':item.id===activeId}" :aria-current="item.id===activeId?'step':undefined">
    <span class="chapter-number">{{item.number}}</span><span class="chapter-label">{{item.label}}</span>
   </li>
  </ol></nav>
 </div>
</template>
<style scoped>
.chapter-navigation{font-family:var(--ds-font-family,var(--presentation-font));color:var(--chapter-inactive);border-bottom:1px solid var(--chapter-divider);padding:0 0 14px;box-sizing:border-box;width:100%;container-type:inline-size}
nav{min-width:0}ol{list-style:none;padding:0;margin:0;display:flex;justify-content:space-between;align-items:center;gap:14px}li{position:relative;display:flex;align-items:baseline;justify-content:center;gap:9px;flex:1;min-width:0;font-size:var(--type-label);line-height:1.4;font-weight:var(--weight-regular)}li+li:before{content:'›';position:absolute;left:-10px;top:0;color:var(--chapter-inactive);font-weight:var(--weight-regular)}.chapter-number{flex-shrink:0;font-variant-numeric:tabular-nums}.chapter-label{word-break:keep-all;overflow-wrap:anywhere}.is-current{color:var(--chapter-active);font-weight:var(--weight-bold)}.chapter-current{color:var(--chapter-heading);font-size:var(--type-supporting);font-weight:var(--weight-bold);line-height:1.4;flex:0 1 30%;word-break:keep-all}
.chapter-navigation--compact{display:flex;align-items:center;gap:24px}.chapter-navigation--compact nav{flex:1}.chapter-navigation--compact ol{gap:12px}.chapter-navigation--compact li{font-size:var(--type-source);gap:5px}.chapter-navigation--compact li+li:before{left:-9px}
@media(max-width:600px){.chapter-navigation--compact{flex-wrap:wrap}.chapter-navigation--compact .chapter-current{flex-basis:100%}.chapter-navigation--compact nav{flex-basis:100%}}
@media print{.chapter-navigation{break-inside:avoid;print-color-adjust:exact;-webkit-print-color-adjust:exact}}
</style>
