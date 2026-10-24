<script setup lang="ts">
import { computed } from 'vue'
import UiIcon from './UiIcon.vue'
const props = withDefaults(defineProps<{
  name: string
  variant?: 'hero' | 'diagram' | 'inline'
  tone?: 'navy' | 'blue' | 'orange' | 'teal'
  size?: number
  strokeWidth?: number
}>(), { variant: 'hero', tone: 'blue', size: 72, strokeWidth: 1.85 })
const glyphSize = computed(() => Math.round(props.size * (props.variant === 'hero' ? .48 : props.variant === 'diagram' ? .54 : .7)))
</script>
<template>
  <span class="proposal-icon" :class="['proposal-icon--'+variant, 'proposal-icon--'+tone]" :style="{ '--proposal-icon-size': size + 'px' }">
    <UiIcon :name="name" :size="glyphSize" :stroke-width="strokeWidth" />
  </span>
</template>
<style scoped>
.proposal-icon { display:inline-flex;align-items:center;justify-content:center;flex:none;width:var(--proposal-icon-size);height:var(--proposal-icon-size);box-sizing:border-box;color:#13577d; }
.proposal-icon--hero { border-radius:50%;background:linear-gradient(145deg,#f7fcff,#d6ebf9);border:1px solid #b6d5ea;box-shadow:0 3px 0 #fff inset,0 6px 16px #18456625; }
.proposal-icon--diagram { border-radius:18%;background:#e8f3f9;border:1px solid #bad5e5; }
.proposal-icon--inline { background:transparent; }
.proposal-icon--navy { color:#102e51;background-color:#edf2f6; }
.proposal-icon--orange { color:#bc5c20;background-image:linear-gradient(145deg,#fff9f0,#ffe5cf);border-color:#f3c7a5; }
.proposal-icon--teal { color:#087e87;background-image:linear-gradient(145deg,#f0fafa,#d4eff0);border-color:#a9d6d8; }
</style>
