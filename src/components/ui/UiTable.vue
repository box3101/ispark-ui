<template>
  <div class="ui-table-shell">
  <div
    ref="wrapRef"
    class="ui-table-wrap"
    :class="[{ 'is-scrollable': !!maxHeight, 'is-borderless': !bordered, 'is-overflowing': isOverflowing, 'is-scrolled-x': canScrollLeft }, size === 'sm' ? 'is-sm' : '']"
    :style="maxHeight ? { maxHeight } : undefined"
    @scroll="onWrapScroll"
  >
    <table ref="tableRef" class="ui-table" :style="resizedTableWidth ? { width: resizedTableWidth, minWidth: resizedTableWidth } : { minWidth: tableMinWidth }">
      <colgroup>
        <col
          v-for="col in visibleColumns"
          :key="col.key"
          :style="{ width: resizable && columnWidths[col.key] ? `${columnWidths[col.key]}px` : col.width }"
        />
      </colgroup>

      <thead :class="{ 'is-sticky': stickyHeader }">
        <tr>
          <th
            v-for="(col, idx) in visibleColumns"
            :key="col.key"
            :class="{ 'is-last': idx === visibleColumns.length - 1, 'is-sortable': isColumnSortable(col), 'is-pinned': col.sticky === 'left' }"
            :style="{ textAlign: col.headerAlign || 'center', ...pinnedStyle(col) }"
            :aria-sort="getAriaSort(col)"
          >
            <slot
              :name="`header-${col.key}`"
              :column="col"
              :is-sortable="isColumnSortable(col)"
              :sort-order="getSortOrder(col.key)"
              :on-sort="() => onSortColumn(col)"
            >
              <!-- 필터 드롭다운 -->
              <div v-if="isColumnFilterable(col)" class="ui-table-filter">
                <span class="ui-table-filter-label">{{ col.label }}</span>
                <UiSelect
                  :model-value="getFilterValue(col.key)"
                  :options="col.filterOptions!"
                  size="xs"
                  @change="(val: string | number) => onFilterChange(col, val)"
                />
              </div>
              <!-- 정렬 버튼 -->
              <button
                v-else-if="isColumnSortable(col)"
                type="button"
                class="ui-table-sort-btn"
                :style="{ justifyContent: col.headerAlign === 'left' ? 'flex-start' : col.headerAlign === 'right' ? 'flex-end' : 'center' }"
                @click="onSortColumn(col)"
              >
                <span>{{ col.label }}</span>
                <svg
                  class="ui-table-sort-mark"
                  aria-hidden="true"
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  :class="{
                    'is-active': !!getSortOrder(col.key),
                    'is-desc': getSortOrder(col.key) === 'desc',
                  }"
                >
                  <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <template v-else>
                {{ col.label }}
              </template>
            </slot>
            <span v-if="resizable" class="ui-table-resizer" role="separator" tabindex="0"
              aria-orientation="vertical" :aria-label="`${col.label} 열 너비 조절`"
              :aria-valuemin="resizeMinimum" :aria-valuenow="columnWidths[col.key]"
              @pointerdown.stop.prevent="startColumnResize($event, col.key)"
              @pointermove.stop="moveColumnResize"
              @pointerup.stop="endColumnResize"
              @pointercancel.stop="endColumnResize"
              @lostpointercapture="endColumnResize"
              @click.stop.prevent
              @keydown.stop="resizeColumnByKey($event, col.key)"
            />
          </th>
        </tr>
      </thead>

      <!-- 빈 상태 — #empty 슬롯 우선, 기본은 UiEmpty 컴포넌트 사용 -->
      <tbody v-if="!data || data.length === 0">
        <tr>
          <td
            :colspan="visibleColumns.length"
            class="ui-table-empty"
          >
            <slot name="empty">
              <UiEmpty
                :icon="emptyIcon"
                :title="emptyText"
                :description="emptyDescription"
              >
                <template v-if="$slots['empty-action']" #default><slot name="empty-action" /></template>
              </UiEmpty>
            </slot>
          </td>
        </tr>
      </tbody>

      <!-- 드래그 재정렬 모드 — vuedraggable(지연 로드)로 tbody 렌더 -->
      <component
        :is="DraggableComp"
        v-else-if="draggable"
        v-model="dragModel"
        tag="tbody"
        :item-key="itemKey"
        :handle="dragHandle"
        :animation="dragAnimation"
        @end="onReorderEnd"
      >
        <template #item="{ element: row, index: rowIdx }">
          <tr
            class="ui-table-drag-row"
            :class="{ 'has-drag-handle': !!dragHandle }"
          >
            <td
              v-for="(col, colIdx) in visibleColumns"
              :key="col.key"
              :class="{ 'is-last': colIdx === visibleColumns.length - 1, 'is-pinned': col.sticky === 'left' }"
              :style="{ textAlign: col.align || 'center', ...pinnedStyle(col) }"
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
        </template>
      </component>

      <!-- 데이터 행 — clickable일 때 키보드(Enter/Space)도 지원 (button 역할) -->
      <tbody v-else>
        <tr
          v-for="(row, rowIdx) in displayedData"
          :key="rowIdx"
          :class="{ 'is-clickable': clickable, 'is-selected': isRowSelected(row) }"
          :tabindex="clickable ? 0 : undefined"
          :role="clickable ? 'button' : undefined"
          :aria-pressed="clickable && isRowSelected(row) ? 'true' : undefined"
          @click="clickable && onRowClick(row, rowIdx)"
          @keydown="clickable && onRowKeydown($event, row, rowIdx)"
        >
          <td
            v-for="(col, colIdx) in visibleColumns"
            :key="col.key"
            :class="{ 'is-last': colIdx === visibleColumns.length - 1, 'is-pinned': col.sticky === 'left' }"
            :style="{ textAlign: col.align || 'center', ...pinnedStyle(col) }"
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
  <div v-if="canScrollRight && !scrollHintDismissed" class="ui-table-edge edge-right">
    <button type="button" aria-label="오른쪽 열 보기" @click="scrollColumns(1)">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="m6 4 4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
  </div>
</template>

<script setup lang="ts" generic="TRow extends Record<string, unknown> = Record<string, unknown>">
import { ref, computed, watch, nextTick, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import type { Ref } from 'vue'
import UiEmpty from './UiEmpty.vue'
import UiSelect from './UiSelect.vue'

// 필터 옵션 타입
export interface TableFilterOption {
  label: string
  value: string
}

// 테이블 컬럼 정의 (라이브러리 외부에서도 import 가능)
export interface TableColumn {
  key: string
  label: string
  width?: string
  /** 가로 스크롤 시 왼쪽에 고정. 여러 열 지정 가능. */
  sticky?: 'left'
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  sortable?: boolean
  sortType?: 'auto' | 'string' | 'number' | 'date'
  /** 컬럼 헤더에 필터 드롭다운 표시 */
  filterable?: boolean
  /** 필터 옵션 목록 — 첫 번째 항목(value='')을 '전체'로 사용 */
  filterOptions?: TableFilterOption[]
  /** 뷰포트가 이 px 이하일 때 칼럼 숨김 */
  hideBelow?: number
}

// 라이브러리 사용자에게도 export — rollupTypes 단계에서 default export가 참조하므로 public 필요
export interface UiTableProps<TRow extends Record<string, unknown> = Record<string, unknown>> {
  columns: TableColumn[]
  data: TRow[]
  stickyHeader?: boolean
  maxHeight?: string
  /** 빈 상태 텍스트 — UiEmpty의 title로 전달 */
  emptyText?: string
  /** 빈 상태 아이콘 (예: 'icon-search') — UiEmpty의 icon으로 전달 */
  emptyIcon?: string
  /** 빈 상태 보조 설명 — UiEmpty의 description으로 전달 */
  emptyDescription?: string
  clickable?: boolean
  /** 테이블 크기: 'md'(기본) | 'sm'(컴팩트) */
  size?: 'md' | 'sm'
  /**
   * 선택 행 강조용: `row[selectedRowKey] === selectedRowValue` 일 때 `is-selected` 적용.
   * Controlled 모드 활성화 조건: `selectedRowKey`가 truthy + `selectedRowValue !== undefined`.
   * `0`, `''`, `false` 같은 falsy 값도 정상 선택 가능 (=== 비교).
   */
  selectedRowKey?: string
  selectedRowValue?: unknown
  /** 컬럼 세로 구분선 표시 여부 (기본: true) */
  bordered?: boolean
  /** 헤더 오른쪽 경계를 드래그해 열 너비 조절 */
  resizable?: boolean
  /** 열 리사이즈 최소 너비(px) */
  minColumnWidth?: number
  /**
   * 드래그 재정렬 모드 — 활성 시 정렬/필터 UI 비활성, 행 순서를 `v-model:data`로 반영.
   * (vuedraggable 지연 로드 — 이 모드일 때만 번들 로드)
   */
  draggable?: boolean
  /** draggable 모드 행 고유키 (기본 'id') */
  itemKey?: string
  /** draggable 핸들 셀렉터 (예: '.drag-handle') — 미지정 시 행 전체 드래그 */
  dragHandle?: string
  /** draggable 애니메이션 ms (기본 200) */
  dragAnimation?: number
}

const props = withDefaults(defineProps<UiTableProps<TRow>>(), {
  stickyHeader: false,
  maxHeight: undefined,
  emptyText: '데이터가 없습니다.',
  emptyIcon: undefined,
  emptyDescription: undefined,
  clickable: false,
  size: 'md',
  selectedRowKey: undefined,
  selectedRowValue: undefined,
  bordered: true,
  resizable: false,
  minColumnWidth: 64,
  draggable: false,
  itemKey: 'id',
  dragHandle: undefined,
  dragAnimation: 200,
})

// ===== 가로 스크롤 힌트 =====
const wrapRef = ref<HTMLElement | null>(null)
const isOverflowing = ref(false)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const scrollHintDismissed = ref(false)
let previousScrollLeft = 0
const pinnedOffsets = ref<Record<string, number>>({})
const pinnedWidth = ref(0)

function measurePinnedColumns() {
  const cells = tableRef.value?.tHead?.rows[0]?.cells
  if (!cells) return
  let left = 0
  const offsets: Record<string, number> = {}
  visibleColumns.value.forEach((col, index) => {
    if (col.sticky !== 'left') return
    offsets[col.key] = left
    left += cells[index].getBoundingClientRect().width
  })
  pinnedOffsets.value = offsets
  pinnedWidth.value = left
}
function pinnedStyle(col: TableColumn) {
  return col.sticky === 'left' ? { left: `${pinnedOffsets.value[col.key] ?? 0}px` } : {}
}

function checkOverflow() {
  if (!wrapRef.value) return
  const { scrollWidth, clientWidth, scrollLeft } = wrapRef.value
  isOverflowing.value = scrollWidth > clientWidth + 1
  canScrollLeft.value = isOverflowing.value && scrollLeft > 1
  canScrollRight.value = isOverflowing.value && scrollLeft + clientWidth < scrollWidth - 1
  measurePinnedColumns()
}

function onWrapScroll() {
  const left = wrapRef.value?.scrollLeft ?? 0
  if (Math.abs(left - previousScrollLeft) > 0.5) scrollHintDismissed.value = true
  previousScrollLeft = left
  checkOverflow()
}

function scrollColumns(direction: number) {
  const wrap = wrapRef.value
  if (!wrap) return
  wrap.scrollBy({ left: direction * Math.max(80, (wrap.clientWidth - pinnedWidth.value) * 0.7),
    behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

let resizeObserver: ResizeObserver | null = null

// ===== 반응형 칼럼 숨김 =====
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 9999)

let resizeTimer: ReturnType<typeof setTimeout> | null = null
function onResize() {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    windowWidth.value = window.innerWidth
  }, 150)
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  // 가로 스크롤 감지
  if (wrapRef.value) {
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        checkOverflow()
      })
      resizeObserver.observe(wrapRef.value)
      if (tableRef.value) resizeObserver.observe(tableRef.value)
    }
    checkOverflow()
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeObserver?.disconnect()
})

const visibleColumns = computed(() =>
  props.columns.filter(col => !col.hideBelow || windowWidth.value > col.hideBelow),
)

const tableRef = ref<HTMLTableElement | null>(null)
watch(() => [props.columns, props.data, ...visibleColumns.value.map(col => `${col.key}:${col.width}:${col.sticky}`)], () => nextTick(checkOverflow), { deep: true })
const columnWidths = ref<Record<string, number>>({})
const resizeMinimum = computed(() => Math.max(24, Number.isFinite(props.minColumnWidth) ? props.minColumnWidth : 64))
let columnDrag: { key: string; x: number; width: number; pointerId: number } | null = null
const resizedTableWidth = computed(() => props.resizable && visibleColumns.value.length && visibleColumns.value.every(col => columnWidths.value[col.key])
  ? `${visibleColumns.value.reduce((sum, col) => sum + columnWidths.value[col.key], 0)}px` : undefined)

function measureColumns() {
  const cells = tableRef.value?.tHead?.rows[0]?.cells
  if (!cells) return
  columnWidths.value = Object.fromEntries(visibleColumns.value.map((col, index) =>
    [col.key, Math.max(resizeMinimum.value, cells[index].getBoundingClientRect().width)]))
}
function setColumnWidth(key: string, width: number) {
  columnWidths.value = { ...columnWidths.value, [key]: Math.max(resizeMinimum.value, Math.round(width)) }
  nextTick(checkOverflow)
}
function startColumnResize(event: PointerEvent, key: string) {
  if (event.button !== 0 || !props.resizable) return
  measureColumns()
  columnDrag = { key, x: event.clientX, width: columnWidths.value[key], pointerId: event.pointerId }
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}
function moveColumnResize(event: PointerEvent) {
  if (!columnDrag || columnDrag.pointerId !== event.pointerId) return
  setColumnWidth(columnDrag.key, columnDrag.width + event.clientX - columnDrag.x)
}
function endColumnResize() { columnDrag = null }
function resizeColumnByKey(event: KeyboardEvent, key: string) {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return
  event.preventDefault()
  measureColumns()
  setColumnWidth(key, columnWidths.value[key] + (event.key === 'ArrowRight' ? 10 : -10))
}
watch(() => [props.columns, props.resizable, props.minColumnWidth, ...visibleColumns.value.map(col => col.key)], () => {
  endColumnResize()
  columnWidths.value = {}
})

// 컬럼 width 합계 → table min-width (px 단위 컬럼만 합산)
const tableMinWidth = computed(() => {
  let total = 0
  let hasWidth = false
  for (const col of visibleColumns.value) {
    if (col.width) {
      const px = /^\d+(\.\d+)?px$/.test(col.width) ? parseFloat(col.width) : NaN
      if (!isNaN(px)) { total += px; hasWidth = true }
    }
  }
  // width 지정 컬럼이 있으면 min-width 설정, 없으면 auto
  return hasWidth && total > 0 ? `${total}px` : undefined
})

// 선택 행 추적 — 두 가지 모드
//   1) Controlled: selectedRowKey + selectedRowValue 둘 다 값 있음 → 부모가 관리
//   2) Uncontrolled: 둘 중 하나라도 비면 → 컴포넌트가 마지막 클릭 행 자체 추적
//      (clickable=true + 행 클릭 시 자동 is-selected)
const internalSelectedRow = ref<TRow | null>(null) as Ref<TRow | null>

const hasControlledSelection = computed(
  // selectedRowValue=0, '', false도 정상 controlled로 인식 — undefined만 uncontrolled
  () => !!props.selectedRowKey && props.selectedRowValue !== undefined,
)

const isRowSelected = (row: TRow) => {
  if (hasControlledSelection.value) {
    return row[props.selectedRowKey!] === props.selectedRowValue
  }
  return props.clickable && internalSelectedRow.value === row
}

type SortOrder = 'asc' | 'desc' | ''
const sortState = ref<{ key: string; order: SortOrder }>({ key: '', order: '' })

// draggable 모드에선 정렬 비활성 (정렬된 뷰 재정렬 모순 방지)
const isColumnSortable = (col: TableColumn) => !props.draggable && col.sortable === true

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
  // 1) 필터링
  let rows = [...props.data]
  const filters = filterState.value
  for (const [key, val] of Object.entries(filters)) {
    if (val) rows = rows.filter((row) => String(row[key]) === val)
  }

  // 2) 정렬
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
  'row-click': [row: TRow, index: number]
  'filter-change': [filters: Record<string, string>]
  'update:data': [rows: TRow[]]
  'reorder-end': []
}>()

// ===== 드래그 재정렬 (draggable 모드) — vuedraggable 지연 로드 =====
// draggable=true일 때만 import되어 비드래그 사용자 번들에서 격리됨
const DraggableComp = defineAsyncComponent(() => import('vuedraggable'))
const dragModel = computed<TRow[]>({
  get: () => props.data,
  set: (rows) => emit('update:data', rows),
})
const onReorderEnd = () => emit('reorder-end')

// ===== 필터 =====
const filterState = ref<Record<string, string>>({}) as Ref<Record<string, string>>

// draggable 모드에선 필터 비활성
const isColumnFilterable = (col: TableColumn) =>
  !props.draggable && col.filterable === true && col.filterOptions && col.filterOptions.length > 0

const getFilterValue = (key: string) => filterState.value[key] ?? ''

const onFilterChange = (col: TableColumn, val: string | number) => {
  const v = String(val)
  if (v === '') {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete filterState.value[col.key]
  } else {
    filterState.value[col.key] = v
  }
  // 새 객체로 emit (외부에서 watch 가능)
  emit('filter-change', { ...filterState.value })
}

// 키보드 활성화 — Enter/Space로 row-click 발생 (Space는 페이지 스크롤 방지)
const onRowKeydown = (e: KeyboardEvent, row: TRow, index: number) => {
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
    e.preventDefault()
    onRowClick(row, index)
  }
}

const onRowClick = (row: TRow, index: number) => {
  // Uncontrolled 모드에서만 내부 selection 업데이트
  if (!hasControlledSelection.value) {
    internalSelectedRow.value = row
  }
  emit('row-click', row, index)
}

// data가 새로 주입되면 (reference 변경) uncontrolled selection 리셋 + overflow 재체크
watch(
  () => props.data,
  () => {
    if (!hasControlledSelection.value) internalSelectedRow.value = null
    // 데이터 변경 후 DOM 업데이트 뒤 overflow 재체크
    nextTick(checkOverflow)
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

.ui-table-shell { position: relative; width: 100%; min-width: 0; }
.ui-table-edge {
  position: absolute;
  top: 0;
  bottom: 8px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 5;
  &.edge-right { right: 0; background: linear-gradient(to right, transparent, var(--color-bg-elevated)); }
  &.edge-left { background: linear-gradient(to left, transparent, var(--color-bg-elevated)); }
  button {
    box-sizing: border-box;
    pointer-events: auto;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 1px solid $color-border;
    border-radius: 50%;
    background: var(--color-bg-elevated);
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.12);
    color: $color-text-secondary;
    font-size: 22px;
    line-height: 1;
    svg { display: block; flex-shrink: 0; }
    cursor: pointer;
    &:hover { color: var(--color-primary); border-color: var(--color-primary); }
    &:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
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
      z-index: 4;
    }

    th {
      position: relative;
      height: 44px;
      padding: 0 12px;
      background: $color-background;
      @include typo($body-medium-bold);
      font-weight: 600;
      color: $color-text-dark;
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
        background: rgba(var(--color-primary-rgb, 59, 130, 246), 0.07);
      }

      &.is-clickable {
        td {
          cursor: pointer;
        }

        // 키보드 포커스 시 행 강조 — Button/Select와 동일한 outline ring 패턴
        &:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: -2px;
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
      height: 44px;
      padding: 8px 12px;
      background: var(--color-bg-elevated);
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

}

.ui-table-resizer {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 100%;
  cursor: col-resize;
  touch-action: none;
  user-select: none;
  z-index: 1;
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 2px;
    background: transparent;
  }
  &:hover::after, &:focus-visible::after { background: var(--color-primary); }
  &:focus-visible { outline: 2px solid var(--color-primary); outline-offset: -2px; }
}

.ui-table-sort-btn {
  width: 100%;
  min-height: 36px;
  font: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  border-radius: 4px;
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
  }
}

.ui-table-sort-mark {
  flex-shrink: 0;
  color: $color-text-disabled;

  &.is-active {
    color: $color-primary;
  }

  &.is-desc {
    transform: rotate(180deg);
  }
}

// 필터
.ui-table-filter {
  display: flex;
  align-items: center;
  gap: 4px;
}
.ui-table-filter-label {
  white-space: nowrap;
  font-size: inherit;
}

// 빈 상태
.ui-table tbody td.ui-table-empty {
  height: 180px;
  text-align: center !important;
  color: $color-text-disabled;
  @include typo($body-medium);
}

// ===== 드래그 재정렬 (draggable 모드) =====
// 핸들 미지정 시에만 행 전체가 드래그 대상 → grab 커서.
// 핸들(dragHandle) 지정 시엔 커서를 행에 주지 않음 (핸들 요소가 소비 측에서 grab 처리)
.ui-table-drag-row:not(.has-drag-handle) {
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

// SortableJS가 드래그 중 원본 행에 부여하는 전역 클래스
:deep(.sortable-ghost) {
  opacity: 0.4;
}

:deep(.sortable-drag) {
  cursor: grabbing;
}

// ===== borderless (세로 구분선 제거) =====
.ui-table-wrap.is-borderless {
  .ui-table {
    thead th {
      padding: 0 16px;
      border-right: none;
    }

    tbody td {
      padding: 0 16px;
      border-right: none;
    }

    // 호버 강화 — 세로선 없을 때 행 구분을 위해 bordered(0.07)보다 한 단계 강하게
    tbody tr.is-clickable:hover td {
      background: rgba(var(--color-primary-rgb, 59, 130, 246), 0.09);
    }
  }
}

// ===== 가로 스크롤 힌트 =====


// ===== sm 사이즈 (컴팩트) =====
.ui-table-wrap.is-sm {
  .ui-table {
    thead th {
      height: auto;
      padding: 6px 12px;
      @include typo($body-medium-bold);
      font-weight: 500;
      color: $color-text-primary;
      background: $color-background;
      border-right-color: $color-border;
    }

    tbody td {
      height: 28px;
      padding: 0 12px;
      @include typo($body-medium);
      color: $color-text-primary;
      border-bottom-color: $color-border-light;

      &:not(:last-of-type) {
        border-right-color: $color-border-light;
      }
    }
  }

  // 헤더/바디 상하 구분선
  .ui-table thead th {
    border-top: 1px solid $color-border;
    border-bottom: 1px solid $color-border;
  }

  // sm + borderless 조합
  &.is-borderless .ui-table {
    thead th {
      padding: 6px 12px;
      border-right: none;
    }

    tbody td {
      border-right: none;
    }
  }
}
.ui-table-wrap .ui-table thead th[aria-sort='ascending'],
.ui-table-wrap .ui-table thead th[aria-sort='descending'] {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 8%, var(--color-bg-elevated));
}
.ui-table-wrap .ui-table .is-pinned {
  position: sticky;
  z-index: 2;
  border-right: 1px solid $color-border;
}
.ui-table-wrap .ui-table thead th.is-pinned { z-index: 3; }
.ui-table-wrap.is-scrolled-x .ui-table .is-pinned {
  box-shadow: 3px 0 5px -3px rgba(15, 23, 42, 0.22);
}
.ui-table-wrap .ui-table tr.is-clickable:hover td.is-pinned {
  background: color-mix(in srgb, var(--color-primary) 7%, var(--color-bg-elevated));
}
.ui-table-wrap .ui-table tr.is-selected td.is-pinned {
  background: color-mix(in srgb, var(--color-primary) 8%, var(--color-bg-elevated));
}
.ui-table-wrap .ui-table tr.is-selected:hover td.is-pinned {
  background: color-mix(in srgb, var(--color-primary) 12%, var(--color-bg-elevated));
}
</style>
