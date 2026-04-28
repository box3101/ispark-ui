<script setup lang="ts">
import UiButton from './components/ui/UiButton.vue'
</script>

<template>
  <main class="playground">
    <h1>ispark-ui · 디자인 시스템 플레이그라운드</h1>
    <p class="desc">실제 사용은 <code>npm run storybook</code>에서 확인하세요.</p>

    <section>
      <h2>UiButton — variant 4종</h2>
      <div class="row">
        <UiButton variant="primary">Primary</UiButton>
        <UiButton variant="secondary">Secondary</UiButton>
        <UiButton variant="ghost">Ghost</UiButton>
        <UiButton variant="danger">Danger</UiButton>
      </div>
    </section>

    <section>
      <h2>UiButton — size 3종</h2>
      <div class="row">
        <UiButton size="sm">Small (28px)</UiButton>
        <UiButton size="md">Medium (32px)</UiButton>
        <UiButton size="lg">Large (40px)</UiButton>
      </div>
    </section>

    <section>
      <h2>UiButton — 상태</h2>
      <div class="row">
        <UiButton variant="primary" loading>Loading</UiButton>
        <UiButton variant="primary" disabled>Disabled</UiButton>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.playground {
  max-width: 960px;
  margin: 40px auto;
  padding: 24px;
  font-family: system-ui, -apple-system, sans-serif;

  h1 {
    @include typo($body-xlarge-bold, $color-text-heading);
    margin-bottom: 8px;
  }

  .desc {
    @include typo($body-small, $color-text-muted);
    margin-bottom: 32px;

    code {
      padding: 2px 6px;
      background: #f4f7f9;
      border-radius: 4px;
      font-family: ui-monospace, monospace;
    }
  }

  section {
    margin-bottom: 32px;

    h2 {
      @include typo($body-large-bold, $color-text-heading);
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid $color-border;
    }
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }
}
</style>
