<template>
  <div
    class="ui-table-wrap"
    :class="[{ 'is-scrollable': !!maxHeight }, size === 'sm' ? 'is-sm' : '']"
    :style="maxHeight ? { maxHeight } : undefined"
  >
    <table class="ui-table">
      <colgroup>
        <col
          v-for="col in columns"
          :key="col.key"
          :style="col.width ? { width: col.width } : undefined"
        />
      </colgroup>

      <thead :class="{ 'is-sticky': stickyHeader }">
        <tr>
          <th
            v-for="(col, idx) in columns"
            :key="col.key"
            :class="{ 'is-last': idx === columns.length - 1, 'is-sortable': isColumnSortable(col) }"
            :style="{ textAlign: col.headerAlign || 'center' }"
            :aria-sort="getAriaSort(col)"
          >
            <slot
              :name="`header-${col.key}`"
              :column="col"
              :is-sortable="isColumnSortable(col)"
              :sort-order="getSortOrder(col.key)"
              :on-sort="() => onSortColumn(col)"
            >
              <button
                v-if="isColumnSortable(col)"
                type="button"
                class="ui-table-sort-btn"
                @click="onSortColumn(col)"
              >
                <span>{{ col.label }}</span>
                <span
                  class="ui-table-sort-mark"
                  aria-hidden="true"
                  :class="{
                    'is-active': !!getSortOrder(col.key),
                    'is-desc': getSortOrder(col.key) === 'desc',
                  }"
                  >▲</span
                >
              </button>
              <template v-else>
                {{ col.label }}
              </template>
            </slot>
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- 빈 상태 -->
        <tr v-if="!data || data.length === 0">
          <td
            :colspan="columns.length"
            class="ui-table-empty"
          >
            {{ emptyText }}
          </td>
        </tr>

        <!-- 데이터 행 -->
        <tr
          v-for="(row, rowIdx) in displayedData"
          v-else
          :key="rowIdx"
          :class="{ 'is-clickable': clickable, 'is-selected': isRowSelected(row) }"
          @click="clickable && onRowClick(row, rowIdx)"
        >
          <td
            v-for="(col, colIdx) in columns"
            :key="col.key"
            :class="{ 'is-last': colIdx === columns.length - 1 }"
            :style="{ textAlign: col.align || 'center' }"
          >
            <slot
              :name="`cell-${col.key}`"
              :row="row"
              :value="row[col.key]"
              :index="rowIdx"
            >
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// 테이블 컬럼 정의 (라이브러리 외부에서도 import 가능)
export interface TableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  sortable?: boolean
  sortType?: 'auto' | 'string' | 'number' | 'date'
}

interface Props {
  columns: TableColumn[]
  data: Record<string, any>[]
  stickyHeader?: boolean
  maxHeight?: string
  emptyText?: string
  clickable?: boolean
  /** 테이블 크기: 'md'(기본) | 'sm'(컴팩트) */
  size?: 'md' | 'sm'
  /** 선택 행 강조용: row[selectedRowKey] === selectedRowValue 일 때 is-selected 클래스 적용 */
  selectedRowKey?: string
  selectedRowValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  stickyHeader: false,
  maxHeight: undefined,
  emptyText: '데이터가 없습니다.',
  clickable: false,
  size: 'md',
  selectedRowKey: undefined,
  selectedRowValue: undefined,
})

// 선택 행 추적 — 두 가지 모드
//   1) Controlled: selectedRowKey + selectedRowValue 둘 다 값 있음 → 부모가 관리
//   2) Uncontrolled: 둘 중 하나라도 비면 → 컴포넌트가 마지막 클릭 행 자체 추적
//      (clickable=true + 행 클릭 시 자동 is-selected)
const internalSelectedRow = ref<Record<string, any> | null>(null)

const hasControlledSelection = computed(
  () => !!props.selectedRowKey && !!props.selectedRowValue,
)

const isRowSelected = (row: Record<string, any>) => {
  if (hasControlledSelection.value) {
    return row[props.selectedRowKey!] === props.selectedRowValue
  }
  return props.clickable && internalSelectedRow.value === row
}

type SortOrder = 'asc' | 'desc' | ''
const sortState = ref<{ key: string; order: SortOrder }>({ key: '', order: '' })

const isColumnSortable = (col: TableColumn) => col.sortable === true

const getSortOrder = (key: string): SortOrder => (sortState.value.key === key ? sortState.value.order : '')

// WAI-ARIA aria-sort: sortable 컬럼은 'ascending' | 'descending' | 'none', 비정렬 컬럼은 undefined (속성 미렌더)
const getAriaSort = (col: TableColumn): 'ascending' | 'descending' | 'none' | undefined => {
  if (!isColumnSortable(col)) return undefined
  const order = getSortOrder(col.key)
  if (order === 'asc') return 'ascending'
  if (order === 'desc') return 'descending'
  return 'none'
}

const onSortColumn = (col: TableColumn) => {
  if (!isColumnSortable(col)) return
  if (sortState.value.key !== col.key) {
    sortState.value = { key: col.key, order: 'asc' }
    return
  }
  if (sortState.value.order === 'asc') {
    sortState.value.order = 'desc'
    return
  }
  sortState.value = { key: '', order: '' }
}

const getComparableValue = (value: unknown, sortType: TableColumn['sortType']) => {
  const raw = value ?? ''
  if (sortType === 'string') return String(raw)
  if (sortType === 'number') {
    const num = Number(String(raw).replaceAll(',', ''))
    return Number.isNaN(num) ? Number.NEGATIVE_INFINITY : num
  }
  if (sortType === 'date') {
    const ts = Date.parse(String(raw))
    return Number.isNaN(ts) ? Number.NEGATIVE_INFINITY : ts
  }
  const maybeNum = Number(String(raw).replaceAll(',', ''))
  if (!Number.isNaN(maybeNum)) return maybeNum
  const maybeDate = Date.parse(String(raw))
  if (!Number.isNaN(maybeDate)) return maybeDate
  return String(raw)
}

const displayedData = computed(() => {
  const rows = [...props.data]
  const { key, order } = sortState.value
  if (!key || !order) return rows
  const col = props.columns.find((item) => item.key === key)
  if (!col) return rows

  return rows.sort((a, b) => {
    const va = getComparableValue(a[key], col.sortType ?? 'auto')
    const vb = getComparableValue(b[key], col.sortType ?? 'auto')
    const direction = order === 'asc' ? 1 : -1

    if (typeof va === 'string' && typeof vb === 'string') {
      return direction * va.localeCompare(vb, 'ko')
    }
    if (va === vb) return 0
    return direction * (va > vb ? 1 : -1)
  })
})

watch(
  () => props.columns,
  (columns) => {
    const key = sortState.value.key
    if (!key) return
    const target = columns.find((col) => col.key === key)
    if (!target || !isColumnSortable(target)) sortState.value = { key: '', order: '' }
  },
  { deep: true },
)

const emit = defineEmits<{
  'row-click': [row: Record<string, any>, index: number]
}>()

const onRowClick = (row: Record<string, any>, index: number) => {
  // Uncontrolled 모드에서만 내부 selection 업데이트
  if (!hasControlledSelection.value) {
    internalSelectedRow.value = row
  }
  emit('row-click', row, index)
}

// data가 새로 주입되면 (reference 변경) uncontrolled selection 리셋
watch(
  () => props.data,
  () => {
    if (!hasControlledSelection.value) internalSelectedRow.value = null
  },
)
</script>

<style lang="scss" scoped>
// 스크롤바 인라인 정의 — ispark-ui의 _mixins.scss `custom-scrollbar`가
// 변수 의존을 외부 모듈로 풀지 못해 빌드 실패. 다른 컴포넌트(UiButton 등)도
// desktop-hover를 인라인 정의하는 패턴과 동일.
@mixin ui-table-scrollbar($width: 4px) {
  &::-webkit-scrollbar {
    width: #{$width};
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 12px 0;
  }
  &::-webkit-scrollbar-thumb {
    background: $color-border;
    border-radius: $border-radius-100;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: $color-text-disabled;
  }
}

.ui-table-wrap {
  width: 100%;
  overflow: auto;
  border-radius: 0;
  @include ui-table-scrollbar;
}

.ui-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;

  // 헤더
  thead {
    &.is-sticky {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    th {
      height: 42px;
      padding: 0 12px;
      background: $color-background;
      @include typo($body-medium-bold);
      color: $color-text-muted;
      white-space: nowrap;
      vertical-align: middle;

      // 컬럼 구분선 (마지막 제외)
      &:not(.is-last) {
        border-right: 1px solid $color-border;
      }
    }
  }

  // 바디
  tbody {
    tr {
      transition: background-color 0.15s;

      // hover 배경은 clickable 행에만 — 단순 view 테이블은 hover 효과 없음.
      // row-click이 clickable=true일 때만 발생하는 것과 시맨틱 일치.
      // selected 행(primary 0.08)과 같은 색조 0.04로 톤 일관성 확보.
      &.is-clickable:hover td {
        background: rgba(var(--color-primary-rgb, 59, 130, 246), 0.04);
      }

      &.is-clickable {
        td {
          cursor: pointer;
        }

        td:first-child {
          cursor: default;
        }
      }

      &.is-selected td {
        background: rgba(var(--color-primary-rgb, 59, 130, 246), 0.08);
      }

      &.is-selected:hover td {
        background: rgba(var(--color-primary-rgb, 59, 130, 246), 0.12);
      }
    }

    td {
      height: 42px;
      padding: 0 12px;
      background: #fff;
      border-bottom: 1px solid $color-border-light;
      @include typo($body-medium);
      color: $color-text-primary;
      vertical-align: middle;

      // 컬럼 구분선 (마지막 제외)
      &:not(:last-of-type) {
        border-right: 1px solid $color-border-light;
      }
    }
  }

  // 첫 번째 셀(체크박스 등) 가운데 정렬
  th:first-child,
  td:first-child {
    text-align: center;
    vertical-align: middle;
  }
}

.ui-table-sort-btn {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.ui-table-sort-mark {
  font-size: 10px;
  color: $color-text-disabled;

  &.is-active {
    color: $color-primary;
  }

  &.is-desc {
    transform: rotate(180deg);
  }
}

// 빈 상태
.ui-table-empty {
  height: 120px;
  text-align: center !important;
  color: $color-text-disabled;
  @include typo($body-medium);
}

// ===== sm 사이즈 (컴팩트) =====
.ui-table-wrap.is-sm {
  .ui-table {
    thead th {
      height: auto;
      padding: 6px 8px;
      @include typo($body-medium-bold);
      font-weight: 500;
      color: #4d5462;
      background: #f4f7f9;
      border-right-color: #dce4e9;
    }

    tbody td {
      height: 28px;
      padding: 0 12px;
      @include typo($body-medium);
      color: #4d5462;
      border-bottom-color: #ecf0f3;

      &:not(:last-of-type) {
        border-right-color: #ecf0f3;
      }
    }
  }

  // 헤더/바디 상하 구분선
  .ui-table thead th {
    border-top: 1px solid #dce4e9;
    border-bottom: 1px solid #dce4e9;
  }
}
</style>
