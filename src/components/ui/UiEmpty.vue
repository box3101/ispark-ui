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

/*
  빈 상태는 "비활성 정보"가 아니라 그 순간 사용자가 읽어야 하는
  유일한 내용이다. 전에는 title 이 $body-small(12px), desc 가
  $body-xsmall(10px) 이라 본문($font-size-base 14px)보다 작았고,
  두 줄 모두 색이 #6f7a93 으로 같아 제목과 설명이 구분되지 않았다.
  ($color-text-disabled 와 $color-text-muted 는 현재 같은 값이다)

  크기로 위계를, 색으로 주/보조를 나눈다.
*/
.ui-empty-title {
  @include typo($body-large-bold);
  color: $color-text-primary;
}

.ui-empty-desc {
  @include typo($body-medium);
  color: $color-text-secondary;
}

.ui-empty-action {
  margin-top: 4px;
}
</style>
