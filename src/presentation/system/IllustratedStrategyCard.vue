<script setup lang="ts">
import ArtworkWindow from './ArtworkWindow.vue'
import {SemanticIcon} from './components'
import IllustrationIcon from './IllustrationIcon.vue'
import {strategyIllustrations} from './illustration-assets'
export interface IllustratedCardData {
  category:string; headline:string; body:string; outcome:string;
  artwork:'server'|'system'|'analytics'; outcomeIcon:string; iconSrc?:string
}
defineProps<{item:IllustratedCardData; number:number; atlas:string}>()
</script>
<template>
  <article class="iv-card">
    <ArtworkWindow class="iv-wave" :src="atlas" :x="65" :y="641" :width="438" :height="178" />
    <span class="iv-number" data-check>{{String(number).padStart(2,'0')}}</span>
    <span class="iv-number-rule" />
    <img v-if="item.iconSrc" class="iv-hero-icon" :src="item.iconSrc" alt="" />
    <IllustrationIcon v-else class="iv-hero-icon iv-transparent-icon" :name="strategyIllustrations[item.artwork]" />
    <h2 class="iv-category" data-check>{{item.category}}</h2>
    <h3 class="iv-headline" data-check>{{item.headline}}</h3>
    <p class="iv-body" data-check>{{item.body}}</p>
    <div class="iv-outcome"><SemanticIcon :concept="item.outcomeIcon" /><strong data-check>{{item.outcome}}</strong></div>
  </article>
</template>
