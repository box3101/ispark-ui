<script setup lang="ts">
withDefaults(defineProps<{labels?:string[];active:number}>(),{labels:()=>['시점','1코스','2코스','3코스','4코스','5코스','종점']})
</script>
<template><ol class="course-position" aria-label="현재 코스"><li v-for="(label,i) in labels" :key="label" :class="{active:i===active}" :aria-current="i===active?'step':undefined"><span>{{label}}</span></li></ol></template>
<style scoped>.course-position{display:flex;align-items:center;list-style:none;margin:0;padding:0;gap:4px;font-family:var(--presentation-font)}.course-position li{display:flex;align-items:center;gap:4px;color:#5a6e7d;font-size:var(--type-source);white-space:nowrap}.course-position li+li:before{content:'›';color:#8ca2b1}.course-position span{padding:5px 6px;border-radius:12px}.course-position .active span{background:#fde3ca;color:#943e09;font-weight:var(--weight-bold);box-shadow:inset 0 0 0 1px #f5bd8f}</style>
