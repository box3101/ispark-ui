<script setup lang="ts">
import {computed} from 'vue'
import {illustrationById,illustrationUrl,type IllustrationId} from './illustration-assets'
const props=withDefaults(defineProps<{name:IllustrationId;size?:number;decorative?:boolean}>(),{size:160,decorative:true})
const asset=computed(()=>{const a=illustrationById[props.name];if(!a)throw Error(`Unknown illustration: ${props.name}`);return a})
</script>
<template>
 <img class="proposal-illustration-icon" :src="illustrationUrl(asset.id)" :alt="decorative?'':asset.label" :width="size" :height="size" style="object-fit:contain;display:block" decoding="async" />
</template>
