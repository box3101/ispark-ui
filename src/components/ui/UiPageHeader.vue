<script setup lang="ts">
import UiBadge from './UiBadge.vue'

withDefaults(defineProps<{
  title: string
  description?: string
  count?: number | string
  /** 문서의 제목 계층에 맞춰 지정 */
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>(), { heading: 'h1' })
</script>

<template>
  <div class="ui-page-header">
    <div class="ui-page-header-main">
      <div class="ui-page-header-title-row">
        <component :is="heading" class="ui-page-header-title">{{ title }}</component>
        <UiBadge v-if="count !== undefined" variant="primary" shape="pill">{{ count }}</UiBadge>
        <slot name="badge" />
      </div>
      <div v-if="description || $slots.description || $slots.meta" class="ui-page-header-details">
        <p v-if="description || $slots.description" class="ui-page-header-description"><slot name="description">{{ description }}</slot></p>
        <div v-if="$slots.meta" class="ui-page-header-meta"><slot name="meta" /></div>
      </div>
    </div>
    <div v-if="$slots.actions" class="ui-page-header-actions"><slot name="actions" /></div>
  </div>
</template>

<style scoped lang="scss">
.ui-page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px 24px;
  width: 100%;
  font-family: inherit;
}
.ui-page-header-main { flex: 1 1 240px; min-width: 0; }
.ui-page-header-title-row { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
.ui-page-header .ui-page-header-title {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.025em;
  color: $color-text-heading;
  overflow-wrap: anywhere;
}
.ui-page-header-details { display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px 12px; margin-top: 6px; }
.ui-page-header .ui-page-header-description {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: $color-text-secondary;
  overflow-wrap: anywhere;
}
.ui-page-header-meta { min-width: 0; font-size: 12px; color: $color-text-secondary; overflow-wrap: anywhere; }
.ui-page-header-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
</style>
