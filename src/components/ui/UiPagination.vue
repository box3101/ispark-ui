<template>
  <div
    class="ui-pagination"
    role="navigation"
    aria-label="페이지네이션"
  >
    <p
      v-if="showTotal"
      class="ui-pagination-total"
    >
      총 <strong class="ui-pagination-point">{{ totalCount }}</strong>{{ totalLabel }}
    </p>

    <div class="ui-pagination-controls">
      <button
        v-if="showFirstLast"
        type="button"
        class="ui-pagination-btn ui-pagination-btn--edge"
        :disabled="modelValue <= 1"
        aria-label="처음 페이지"
        @click="onPageChange(1)"
      >
        <span aria-hidden="true">«</span>
      </button>
      <button
        type="button"
        class="ui-pagination-btn"
        :disabled="modelValue <= 1"
        aria-label="이전 페이지"
        @click="onPageChange(modelValue - 1)"
      >
        {{ prevLabel }}
      </button>

      <div class="ui-pagination-pages">
        <template
          v-for="(item, idx) in pageItems"
          :key="idx"
        >
          <span
            v-if="item === '...'"
            class="ui-pagination-ellipsis"
            aria-hidden="true"
          >…</span>
          <button
            v-else
            type="button"
            class="ui-pagination-page"
            :class="{ 'is-active': item === modelValue }"
            :aria-current="item === modelValue ? 'page' : undefined"
            :aria-label="`${item} 페이지`"
            @click="onPageChange(item as number)"
          >
            {{ item }}
          </button>
        </template>
      </div>

      <button
        type="button"
        class="ui-pagination-btn"
        :disabled="modelValue >= totalPages"
        aria-label="다음 페이지"
        @click="onPageChange(modelValue + 1)"
      >
        {{ nextLabel }}
      </button>
      <button
        v-if="showFirstLast"
        type="button"
        class="ui-pagination-btn ui-pagination-btn--edge"
        :disabled="modelValue >= totalPages"
        aria-label="마지막 페이지"
        @click="onPageChange(totalPages)"
      >
        <span aria-hidden="true">»</span>
      </button>
    </div>

    <span
      v-if="showRange"
      class="ui-pagination-range"
      aria-live="polite"
    >{{ pageStart }}-{{ pageEnd }} / {{ totalCount }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** 현재 페이지 (1-indexed). v-model */
  modelValue: number
  /** 전체 항목 수 */
  totalCount: number
  /** 페이지당 항목 수. 기본 10 */
  pageSize?: number
  /** 총 N{label} — 예: '개', '건', '명' */
  totalLabel?: string
  /** 이전/다음 버튼 라벨 */
  prevLabel?: string
  nextLabel?: string
  /** 좌측 '총 N개' 표시. 기본 true */
  showTotal?: boolean
  /** 우측 'n-m / total' 표시. 기본 true */
  showRange?: boolean
  /** 양 끝 처음/마지막 페이지 «/» 버튼 표시. 페이지 많은 케이스 권장. 기본 false */
  showFirstLast?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  totalLabel: '개',
  prevLabel: '이전',
  nextLabel: '다음',
  showTotal: true,
  showRange: true,
  showFirstLast: false,
})

const emit = defineEmits<{
  'update:modelValue': [page: number]
  change: [page: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalCount / props.pageSize)))
const pageStart = computed(() => (props.totalCount === 0 ? 0 : (props.modelValue - 1) * props.pageSize + 1))
const pageEnd = computed(() => Math.min(props.modelValue * props.pageSize, props.totalCount))

// 페이지 번호 + 말줄임('...') 자동 생성
//  - 총 7페이지 이하: 전체 표시
//  - 그 이상: [1, ..., cur-1, cur, cur+1, ..., total]
const pageItems = computed<Array<number | string>>(() => {
  const total = totalPages.value
  const cur = props.modelValue

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const items: Array<number | string> = [1]
  if (cur > 4) items.push('...')

  const start = Math.max(2, cur - 1)
  const end = Math.min(total - 1, cur + 1)
  for (let i = start; i <= end; i++) items.push(i)

  if (cur < total - 3) items.push('...')
  items.push(total)
  return items
})

const onPageChange = (page: number) => {
  const clamped = Math.max(1, Math.min(page, totalPages.value))
  if (clamped !== props.modelValue) {
    emit('update:modelValue', clamped)
    emit('change', clamped)
  }
}
</script>

<style lang="scss" scoped>
.ui-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  flex-wrap: wrap;
}

.ui-pagination-total {
  @include typo($body-small);
  color: $color-text-primary;
  margin: 0;
}

.ui-pagination-point {
  color: var(--color-primary);
  font-weight: 600;
}

.ui-pagination-controls {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.ui-pagination-pages {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin: 0 4px;
}

.ui-pagination-btn,
.ui-pagination-page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid $color-border;
  border-radius: $border-radius-base;
  background: var(--color-bg-elevated);
  @include typo($body-small);
  color: $color-text-primary;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;

  // hover는 active 아닌 경우에만 primary border/text로 (active hover invisible 방지)
  &:hover:not(:disabled):not(.is-active) {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

// 이전/다음/처음·끝 버튼 — border 없는 텍스트형 (페이지 번호 버튼은 border 유지)
// border-width(1px)는 투명으로 남겨 페이지 번호 버튼과 높이·정렬을 맞춤
.ui-pagination-btn {
  border-color: transparent;
  background: transparent;

  &:hover:not(:disabled):not(.is-active) {
    border-color: transparent;
    background: var(--color-primary-bg);
    color: var(--color-primary);
  }
}

// edge(« ») 버튼은 살짝 좁고 텍스트 톤 다운
.ui-pagination-btn--edge {
  min-width: 32px;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
}

.ui-pagination-page {
  min-width: 32px;
  padding: 0;

  &.is-active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: #fff;
    font-weight: 600;
  }

  // active 상태에서 hover — 흰색 텍스트 유지, 배경만 살짝 더 진하게 (invisible fix)
  &.is-active:hover:not(:disabled) {
    background: var(--color-primary-hover, var(--color-primary));
    border-color: var(--color-primary-hover, var(--color-primary));
    color: #fff;
  }
}

.ui-pagination-ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 32px;
  @include typo($body-small);
  color: $color-text-muted;
  user-select: none;
}

.ui-pagination-range {
  @include typo($body-xsmall);
  color: $color-text-muted;
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .ui-pagination-btn,
  .ui-pagination-page {
    transition: none;
  }
}
</style>
