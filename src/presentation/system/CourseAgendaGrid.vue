<script setup lang="ts">
import {computed} from 'vue'
import {assertCount,assertText} from './tokens'
export interface CourseAgendaItem { section: string; title: string; description: string }
const props=defineProps<{items: CourseAgendaItem[]}>()
const checked=computed(()=>{
  assertCount('CourseAgendaGrid',props.items,3,8)
  props.items.forEach((x)=>{
    assertText('course section',x.section,12)
    assertText('course title',x.title,24)
    assertText('course description',x.description,45)
  })
  return props.items
})
</script>
<template>
  <ol class="ds-course-grid" :class="{'has-odd-end':checked.length%2===1}">
    <li v-for="(item,i) in checked" :key="i" class="ds-course-item">
      <span class="ds-course-index" aria-hidden="true">{{ String(i+1).padStart(2,'0') }}</span>
      <div class="ds-course-content">
        <p class="ds-course-section" data-fit="label">{{ item.section }}</p>
        <h2 data-fit="heading">{{ item.title }}</h2>
        <p class="ds-course-description" data-fit="supporting">{{ item.description }}</p>
      </div>
    </li>
  </ol>
</template>
