<script setup lang="ts">
import {computed} from 'vue'
const props=withDefaults(defineProps<{text?:string;highlight?:string;tone?:'marker'|'bold'|'inverse'}>(),{tone:'marker'})
const at=computed(()=>props.highlight?props.text?.indexOf(props.highlight)??-1:-1)
</script>
<template><span v-if="at<0">{{text}}</span><span v-else>{{text?.slice(0,at)}}<mark :class="tone">{{highlight}}</mark>{{text?.slice(at+(highlight?.length||0))}}</span></template>
<style scoped>mark{background:#fde3ca;color:#943e09;font-weight:var(--weight-bold);padding:1px 3px;border-radius:3px;box-decoration-break:clone;-webkit-box-decoration-break:clone}mark.bold{background:transparent;color:inherit;padding:0}mark.inverse{background:transparent;color:#fff;padding:0;border-bottom:2px solid #f58220;padding-bottom:3px}</style>
