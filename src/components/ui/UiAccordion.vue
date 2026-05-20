<template>
  <AccordionRoot
    class="ui-accordion"
    :class="[`size-${size}`, { 'is-disabled': disabled }]"
    :type="type as any"
    :model-value="modelValue as any"
    :default-value="defaultValue as any"
    :collapsible="collapsible"
    :disabled="disabled"
    @update:model-value="onUpdate"
  >
    <!-- 기본: items prop으로 렌더 -->
    <template v-if="items?.length">
      <AccordionItem
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        class="ui-accordion-item"
      >
        <AccordionHeader class="ui-accordion-header">
          <AccordionTrigger class="ui-accordion-trigger">
            <span class="ui-accordion-title">
              <slot
                name="header"
                :item="item"
              >{{ item.title }}</slot>
            </span>
            <svg
              class="ui-accordion-chevron"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="ui-accordion-content">
          <div class="ui-accordion-content-inner">
            <slot
              name="content"
              :item="item"
            >{{ item.content }}</slot>
          </div>
        </AccordionContent>
      </AccordionItem>
    </template>

    <!-- 슬롯으로 완전 커스텀 (items 미사용 시) -->
    <slot v-else />
  </AccordionRoot>
</template>

<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'radix-vue'

export interface AccordionItemDef {
  /** 고유 식별자 — v-model 값과 매칭 */
  value: string
  /** 헤더에 표시할 제목 */
  title: string
  /** 펼쳤을 때 보일 내용 (텍스트). 더 복잡한 콘텐츠는 #content 슬롯 사용 */
  content?: string
  /** 비활성 — 클릭/키보드 차단 */
  disabled?: boolean
}

interface Props {
  /** items 배열로 간단하게 렌더 (없으면 기본 슬롯 사용) */
  items?: AccordionItemDef[]
  /** single: 하나만 열림 / multiple: 여러 개 동시 열림 */
  type?: 'single' | 'multiple'
  /** v-model — single이면 string, multiple이면 string[] */
  modelValue?: string | string[]
  /** 초기 열림 상태 (uncontrolled) */
  defaultValue?: string | string[]
  /** single 모드에서 열린 항목 다시 클릭 시 닫을 수 있는지 */
  collapsible?: boolean
  /** 전체 비활성 */
  disabled?: boolean
  /** 크기 — sm / md(기본) / lg */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  type: 'single',
  modelValue: undefined,
  defaultValue: undefined,
  collapsible: true,
  disabled: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[] | undefined]
  change: [value: string | string[] | undefined]
}>()

const onUpdate = (val: string | string[] | undefined) => {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style lang="scss" scoped>
.ui-accordion {
  width: 100%;
  border-top: 1px solid $color-border;
}

.ui-accordion-item {
  border-bottom: 1px solid $color-border;
}

.ui-accordion-header {
  display: flex;
  margin: 0;
}

.ui-accordion-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-sm;
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  color: $color-text-dark;
  transition: color $transition-fast, background $transition-fast;
  outline: none;

  // ===== size =====
  .ui-accordion.size-sm & {
    padding: 10px 12px;
    @include typo($body-small);
  }
  .ui-accordion.size-md & {
    padding: 14px 16px;
    @include typo($body-medium);
  }
  .ui-accordion.size-lg & {
    padding: 18px 20px;
    @include typo($body-large);
  }

  &:hover:not(:disabled) {
    color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
    border-radius: $border-radius-sm;
  }

  &[data-state='open'] {
    color: var(--color-primary);
    font-weight: $font-weight-bold;

    .ui-accordion-chevron {
      transform: rotate(180deg);
    }
  }

  &[data-disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.ui-accordion-title {
  flex: 1;
  min-width: 0;
}

.ui-accordion-chevron {
  flex-shrink: 0;
  color: $color-text-muted;
  transition: transform $transition-base;

  .ui-accordion-trigger[data-state='open'] & {
    color: var(--color-primary);
  }
}

// radix-vue가 콘텐츠 높이를 --radix-accordion-content-height에 주입
.ui-accordion-content {
  overflow: hidden;
  color: $color-text-secondary;

  &[data-state='open'] {
    animation: ui-accordion-slide-down $transition-base ease-out;
  }
  &[data-state='closed'] {
    animation: ui-accordion-slide-up $transition-base ease-out;
  }
}

.ui-accordion-content-inner {
  // size별 가로 패딩은 trigger와 통일, 세로는 조금 더 좁게
  .ui-accordion.size-sm & {
    padding: 0 12px 12px;
    @include typo($body-small);
  }
  .ui-accordion.size-md & {
    padding: 0 16px 16px;
    @include typo($body-medium);
  }
  .ui-accordion.size-lg & {
    padding: 0 20px 20px;
    @include typo($body-large);
  }
}

@keyframes ui-accordion-slide-down {
  from { height: 0; }
  to   { height: var(--radix-accordion-content-height); }
}
@keyframes ui-accordion-slide-up {
  from { height: var(--radix-accordion-content-height); }
  to   { height: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-accordion-content[data-state='open'],
  .ui-accordion-content[data-state='closed'] {
    animation: none;
  }
  .ui-accordion-chevron {
    transition: none;
  }
}
</style>
