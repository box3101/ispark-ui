<script setup lang="ts">
import {ref,onMounted,onBeforeUnmount} from 'vue'
import ChapterHeaderSlide from '../layouts/ChapterHeaderSlide.vue'
import SectionCoverSlide from './SectionCoverSlide.vue'
import DetailedProposalSlide from './DetailedProposalSlide.vue'
import CourseAgendaSlide from './CourseAgendaSlide.vue'
import IllustratedStrategySlide from './IllustratedStrategySlide.vue'
import IllustratedComparisonSlide from './IllustratedComparisonSlide.vue'
import ProposalDiagramSlide from './ProposalDiagramSlide.vue'
import type {LayoutEntry} from './layout-library-model'
import './system.css'
const props=defineProps<{entry:LayoutEntry}>()
const host=ref<HTMLElement>(),width=ref(1040)
let observer:ResizeObserver|undefined
onMounted(()=>{observer=new ResizeObserver(([e])=>{width.value=e.contentRect.width});if(host.value)observer.observe(host.value)})
onBeforeUnmount(()=>observer?.disconnect())
const components={chapter:ChapterHeaderSlide,detailed:DetailedProposalSlide,agenda:CourseAgendaSlide,strategy:IllustratedStrategySlide,comparison:IllustratedComparisonSlide,diagram:ProposalDiagramSlide,'section-cover':SectionCoverSlide}
</script>
<template><div ref="host" class="layout-preview" :style="{aspectRatio:`1040/${props.entry.height}`}" :data-layout="entry.id"><div class="layout-preview-canvas" :style="{width:'1040px',height:`${entry.height}px`,transform:`scale(${width/1040})`}"><component :is="components[entry.renderer]" v-bind="entry.props as any"/></div></div></template>
<style scoped>.layout-preview{position:relative;width:100%;overflow:hidden;background:white}.layout-preview-canvas{position:absolute;left:0;top:0;transform-origin:top left;pointer-events:none}</style>
