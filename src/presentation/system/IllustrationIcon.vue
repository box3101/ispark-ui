<script setup lang="ts">
import {computed,inject} from 'vue'
import ProposalIcon from '../ProposalIcon.vue'
import {illustrationStyleKey} from './illustration-style'
import {illustrationById,illustrationUrl,type IllustrationId} from './illustration-assets'
const props=withDefaults(defineProps<{name:IllustrationId;size?:number;decorative?:boolean}>(),{size:160,decorative:true})
const iconStyle=inject(illustrationStyleKey,undefined)
const asset=computed(()=>{const a=illustrationById[props.name];if(!a)throw Error(`Unknown illustration: ${props.name}`);return a})
</script>
<template>
 <span v-if="iconStyle==='flat'" class="proposal-flat-icon" :style="{width:size+'px',height:size+'px'}" :role="decorative?undefined:'img'" :aria-hidden="decorative?true:undefined" :aria-label="decorative?undefined:asset.label">
  <ProposalIcon :concept="asset.concept" variant="inline" :size="Math.round(size * 0.5)"/>
 </span>
 <img v-else class="proposal-illustration-icon" :src="illustrationUrl(asset.id)" :alt="decorative?'':asset.label" :width="size" :height="size" style="object-fit:contain;display:block" decoding="async" />
</template>

<style scoped>
.proposal-flat-icon{display:inline-grid;place-items:center;flex-shrink:0;color:var(--flat-icon-color,var(--ds-blue600,#006fbd))}
</style>
