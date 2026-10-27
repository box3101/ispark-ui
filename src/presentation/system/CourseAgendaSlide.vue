<script setup lang="ts">
import {SlideCanvas,SlideHeader} from './components'
import CourseAgendaGrid, {type CourseAgendaItem} from './CourseAgendaGrid.vue'
withDefaults(defineProps<{
  title: string; items: CourseAgendaItem[]; source: string; page: number;
  background?: string; sectionLabel?: string; countLabel?: string; showCount?: boolean
}>(),{sectionLabel:'코스 안내',countLabel:'COURSE GUIDE',showCount:true})
</script>
<template>
  <SlideCanvas kind="course-agenda" tone="split" :background="background" :source="source" :page="page">
    <template #header>
      <SlideHeader :section="sectionLabel" :title="title" />
      <div v-if="showCount" class="ds-course-count" aria-label="전체 항목 수">
        <strong data-fit="count">{{ String(items.length).padStart(2,'0') }}</strong>
        <span data-fit="label">{{ countLabel }}</span>
      </div>
    </template>
    <CourseAgendaGrid :items="items" />
  </SlideCanvas>
</template>
