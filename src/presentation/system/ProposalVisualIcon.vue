<script setup lang="ts">
import {computed} from 'vue'
import {SemanticIcon} from './components'
import IllustrationIcon from './IllustrationIcon.vue'
import {defaultIllustrationByConcept,type IllustrationId} from './illustration-assets'
const props=withDefaults(defineProps<{concept:string;variant?:'flat'|'illustrated';illustration?:IllustrationId;size?:number}>(),{variant:'flat',size:160})
const selected=computed(()=>{
 if(props.variant==='flat')return undefined
 const id=props.illustration||defaultIllustrationByConcept[props.concept]
 if(!id)throw Error(`No illustrated asset for ${props.concept}; choose flat or provide an illustration.`)
 return id
})
</script>
<template>
 <IllustrationIcon v-if="selected" :name="selected" :size="size" :decorative="false" />
 <SemanticIcon v-else :concept="concept" />
</template>
