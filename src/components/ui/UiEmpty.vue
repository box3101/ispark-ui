<template>
  <!--
    a11y: role="status" + aria-live="polite"
    데이터가 비동기로 비워질 때(검색·필터 결과 변경 등) 스크린리더가 "조회 결과 없음"을 polite하게 announce.
    polite는 사용자 작업을 끊지 않고 대기 큐에 들어감.
  -->
  <div
    class="ui-empty"
    role="status"
    aria-live="polite"
  >
    <!-- 아이콘 — 장식용이므로 aria-hidden -->
    <i
      v-if="icon"
      :class="[icon, 'size-24']"
      class="ui-empty-icon"
      aria-hidden="true"
    />

    <!-- 메인 텍스트 -->
    <p class="ui-empty-title">{{ title }}</p>

    <!-- 보조 설명 -->
    <p
      v-if="description"
      class="ui-empty-desc"
    >
      {{ description }}
    </p>

    <!-- 커스텀 액션 (버튼 등) -->
    <div
      v-if="$slots.default"
      class="ui-empty-action"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /** 아이콘 클래스명 (예: 'icon-search') */
  icon?: string
  /** 메인 텍스트 */
  title?: string
  /** 보조 설명 */
  description?: string
}

withDefaults(defineProps<Props>(), {
  icon: undefined,
  title: '데이터가 없습니다.',
  description: undefined,
})
</script>

<style lang="scss" scoped>
.ui-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px 0;
  width: 100%;
}

.ui-empty-icon {
  color: $color-text-disabled;
  opacity: 0.5;
}

.ui-empty-title {
  @include typo($body-small);
  color: $color-text-disabled;
}

.ui-empty-desc {
  @include typo($body-xsmall);
  color: $color-text-muted;
}

.ui-empty-action {
  margin-top: 4px;
}
</style>
