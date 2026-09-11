<script setup lang="ts">
import { computed, ref } from 'vue'
import UiTab from './components/ui/UiTab.vue'
import UiButton from './components/ui/UiButton.vue'
import UiBadge from './components/ui/UiBadge.vue'
import components from './introduction-components.json'
import packageInfo from '../package.json'

const category = ref('all')
const tabs = ['all', 'form', 'display', 'feedback', 'overlay', 'navigation', 'data'].map(value => ({
  value, label: value === 'all' ? '전체' : value[0].toUpperCase() + value.slice(1),
}))
const featured = ['UiButton', 'UiInput', 'UiSelect', 'UiBadge', 'UiAccordion', 'UiDatePicker', 'UiFileUpload', 'UiDropdownMenu', 'UiTab']
const rank = (name: string) => featured.includes(name) ? featured.indexOf(name) : featured.length
const ordered = [...components].sort((a, b) => rank(a.name) - rank(b.name))
const visible = computed(() => ordered.filter(item => category.value === 'all' || item.category === category.value))
</script>

<template>
  <header class="ispark-catalog-header">
    <div class="ispark-catalog-brand">
      <h1>ispark-ui</h1>
      <UiBadge variant="primary" size="sm">v{{ packageInfo.version }}</UiBadge>
      <p>Vue 3 컴포넌트 라이브러리</p>
    </div>
    <div class="ispark-catalog-actions">
      <UiButton as="a" href="./?path=/docs/get-started-install--docs" target="_top" variant="primary" size="md">설치 및 사용법</UiButton>
      <UiButton as="a" href="https://github.com/box3101/ispark-ui" target="_blank" variant="outline" size="md">GitHub ↗</UiButton>
    </div>
  </header>
  <UiTab v-model="category" :tabs="tabs" align="left" size="lg" aria-label="컴포넌트 카테고리" class="ispark-catalog-tabs" />
  <section aria-label="컴포넌트 목록">
    <div class="ispark-catalog-heading">
      <h2>Components <UiBadge size="sm">{{ visible.length }}</UiBadge></h2>
      <p>컴포넌트를 선택하면 사용 예제와 API 문서로 이동합니다.</p>
    </div>
    <div class="ispark-grid">
      <a v-for="item in visible" :key="item.name" target="_top" class="ispark-card" :href="item.href">
        <div class="ispark-card__demo">
          <iframe class="ispark-card__frame" tabindex="-1" aria-hidden="true" loading="lazy" :title="`${item.name} preview`" :src="item.preview" />
          <div class="ispark-card__shield" />
        </div>
        <div class="ispark-card__meta">
          <strong>{{ item.name.replace(/^Ui/, '') }}</strong>
          <span>{{ item.description }}</span>
        </div>
      </a>
    </div>
  </section>
</template>
