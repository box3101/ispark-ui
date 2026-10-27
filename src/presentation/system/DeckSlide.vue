<script setup lang="ts">
import { SlideCanvas, SlideHeader, SectionLabel, ComparisonDiagram, TraceabilityTable, ProcessDiagram, StrategyGroup, TimelineDiagram, HierarchyDiagram, AgendaList, StepBadge } from './components'
import type { ComparisonRow, TraceRow, ProcessItem, StrategyItem, Track } from './components'
import CourseAgendaSlide from './CourseAgendaSlide.vue'
import type {CourseAgendaItem} from './CourseAgendaGrid.vue'
export interface DeckSlideSpec {
  layout: string; title: string; kicker: string; source: string; subtitle?: string; backgroundAsset?: string; takeaway?: string; profile?: 'proposal'|'enterprise'|'scenic'
  coverIntro?: string; end?: string; number?: string; items?: string[][]; commitments?: string[]
  comparisonRows?: ComparisonRow[]; traceRows?: TraceRow[]; processItems?: ProcessItem[]; strategyItems?: StrategyItem[]; tracks?: Track[]
  agendaVariant?: 'editorial'|'course'; courses?: CourseAgendaItem[]
}
const props=defineProps<{slide: DeckSlideSpec; page: number}>()
const supported=['cover','agenda','pillars','comparison','section','process','timeline','hierarchy','trace','closing']
if(!supported.includes(props.slide.layout))throw new Error(`Unsupported slide layout: ${props.slide.layout}`)
</script>
<template>
  <CourseAgendaSlide v-if="slide.layout==='agenda' && slide.agendaVariant==='course'" :title="slide.title" :section-label="slide.kicker" :items="slide.courses || []" :source="slide.source" :page="page" :background="slide.backgroundAsset" />
  <SlideCanvas v-else :profile="slide.profile" :background="slide.backgroundAsset" :source="slide.source" :page="page" :takeaway="slide.takeaway" :kind="slide.layout" :tone="slide.layout==='cover'?'dark':slide.layout==='agenda'?'split':'light'">
    <template #header>
      <SectionLabel v-if="['cover','section'].includes(slide.layout)" :text="slide.kicker" />
      <SlideHeader v-else :section="slide.kicker" :title="slide.title" :subtitle="slide.subtitle" />
      <div v-if="slide.layout==='agenda'" class="ds-agenda-counter">07<small>COURSE GUIDE</small></div>
    </template>
    <template v-if="slide.layout==='cover'">
      <p class="ds-cover-intro" data-fit="body">{{ slide.coverIntro }}</p>
      <h1 class="ds-display" data-fit="display">{{ slide.title.split('\n')[0] }}<br><em>{{ slide.title.split('\n').slice(1).join('\n') }}</em></h1>
      <p class="ds-cover-copy" data-fit="body">{{ slide.subtitle }}</p>
      <p class="ds-cover-end" data-fit="label">{{ slide.end }}</p>
    </template>
    <AgendaList v-else-if="slide.layout==='agenda'" :items="slide.items || []" />
    <StrategyGroup v-else-if="slide.layout==='pillars'" :items="slide.strategyItems || []" />
    <ComparisonDiagram v-else-if="slide.layout==='comparison'" :rows="slide.comparisonRows || []" />
    <template v-else-if="slide.layout==='section'">
      <div class="ds-section-number">{{ slide.number }}</div>
      <h1 class="ds-section-title" data-fit="display">{{ slide.title }}</h1>
      <p class="ds-section-copy" data-fit="body">{{ slide.subtitle }}</p>
      <div class="ds-course-map"><span>시점</span><b>→</b><span class="active">1코스</span><b>→</b><span>2코스</span><b>→</b><span>3코스</span><b>→</b><span>4코스</span><b>→</b><span>5코스</span><b>→</b><span>종점</span></div>
    </template>
    <ProcessDiagram v-else-if="slide.layout==='process'" :items="slide.processItems || []" />
    <TimelineDiagram v-else-if="slide.layout==='timeline'" :tracks="slide.tracks || []" />
    <HierarchyDiagram v-else-if="slide.layout==='hierarchy'" :items="slide.items || []" />
    <TraceabilityTable v-else-if="slide.layout==='trace'" :rows="slide.traceRows || []" />
    <template v-else-if="slide.layout==='closing'"><div v-for="(text,i) in slide.commitments" :key="text" class="ds-commitment"><StepBadge :number="i+1" /><p data-fit="body">{{ text }}</p></div></template>
  </SlideCanvas>
</template>
