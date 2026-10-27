<script setup lang="ts">
/** A reusable window into a text-free artwork atlas; no screenshot text is used. */
withDefaults(defineProps<{src:string; x:number; y:number; width:number; height:number; label?:string; canvasWidth?:number; canvasHeight?:number}>(),{canvasWidth:1510,canvasHeight:1042})
</script>
<template>
  <svg :viewBox="`${x} ${y} ${width} ${height}`" preserveAspectRatio="xMidYMid meet" :role="label?'img':undefined" :aria-label="label" :aria-hidden="label?undefined:true" style="display:block;overflow:hidden">
    <image :href="src" :width="canvasWidth" :height="canvasHeight" preserveAspectRatio="none" />
  </svg>
</template>
