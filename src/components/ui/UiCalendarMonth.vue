<script lang="ts">
/** 막대 위치 — 단일/여러 날 일정의 시작·중간·끝 */
export type CalendarEventSpan = 'single' | 'start' | 'middle' | 'end'

/** 캘린더 일정(정규화 모델). end 없으면 단일일, 있으면 여러 날 막대로 표시 */
export interface CalendarMonthEvent {
  /** 고유 id — 여러 소스를 합칠 땐 'todo-5'처럼 충돌 없는 값 권장 */
  id: string | number
  /** 시작일 'YYYY-MM-DD' */
  start: string
  /** 종료일 'YYYY-MM-DD' (없거나 start보다 빠르면 단일일 취급) */
  end?: string | null
  /** 막대 라벨 */
  title: string
  /** 막대 색 (기본 var(--color-primary)) */
  color?: string
  /** 하루종일 여부 (표시는 consumer 자유, meta로 전달) */
  allDay?: boolean
  /** 도메인 데이터 passthrough — #event 슬롯에서 활용 */
  meta?: unknown
}
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  /** 표시할 연도 */
  year: number
  /** 표시할 월 (1-12) */
  month: number
  /** 일정 목록 */
  events?: CalendarMonthEvent[]
  /** 선택된 날짜 'YYYY-MM-DD' */
  selectedDate?: string
  /** 오늘 날짜 'YYYY-MM-DD' — 미지정 시 실제 오늘 (테스트/스토리에서 주입) */
  today?: string
  /** 한 칸에 표시할 최대 레인 수 (초과분은 +N) */
  maxLanes?: number
  /** 좌우 스와이프로 월 전환 */
  swipeable?: boolean
  /** 요일 헤더 표시 */
  showWeekdays?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  events: () => [],
  selectedDate: undefined,
  today: undefined,
  maxLanes: 3,
  swipeable: true,
  showWeekdays: true,
})

const emit = defineEmits<{
  'update:year': [year: number]
  'update:month': [month: number]
  'change-month': [value: { year: number; month: number }]
  'select-date': [date: string]
  'select-event': [event: CalendarMonthEvent]
}>()

// ===== 날짜 유틸 (문자열·UTC 기준 — 타임존 영향 없음) =====
function pad(n: number): string {
  return String(n).padStart(2, '0')
}
function ymd(y: number, m: number, d: number): string {
  return `${y}-${pad(m)}-${pad(d)}`
}
function addDaysStr(dateStr: string, n: number): string {
  const d = new Date(dateStr + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

const weekdayNames = ['일', '월', '화', '수', '목', '금', '토']

const todayStr = computed(() => {
  if (props.today) return props.today
  const d = new Date()
  return ymd(d.getFullYear(), d.getMonth() + 1, d.getDate())
})

// ===== 6주 × 7일 그리드 (일요일 시작) =====
interface DayInfo { day: number; dateStr: string; isOtherMonth: boolean; dow: number }

const calendarDays = computed<DayInfo[]>(() => {
  const { year, month } = props
  const firstDow = new Date(year, month - 1, 1).getDay() // 일=0
  const daysInMonth = new Date(year, month, 0).getDate()
  const prevDays = new Date(year, month - 1, 0).getDate()
  const days: DayInfo[] = []

  for (let i = firstDow - 1; i >= 0; i--) {
    const d = prevDays - i
    const m = month - 1 < 1 ? 12 : month - 1
    const y = month - 1 < 1 ? year - 1 : year
    days.push({ day: d, dateStr: ymd(y, m, d), isOtherMonth: true, dow: (firstDow - 1 - i + 7) % 7 })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, dateStr: ymd(year, month, d), isOtherMonth: false, dow: (firstDow + d - 1) % 7 })
  }
  for (let d = 1; days.length < 42; d++) {
    const m = month + 1 > 12 ? 1 : month + 1
    const y = month + 1 > 12 ? year + 1 : year
    days.push({ day: d, dateStr: ymd(y, m, d), isOtherMonth: true, dow: days.length % 7 })
  }
  return days
})

// ===== 일정 → 날짜별 occurrence(막대 조각) 전개 =====
interface Occ { event: CalendarMonthEvent; span: CalendarEventSpan }

const occByDate = computed(() => {
  const map = new Map<string, Occ[]>()
  const days = calendarDays.value
  const gridStart = days[0].dateStr
  const gridEnd = days[days.length - 1].dateStr

  for (const ev of props.events) {
    const start = ev.start
    let end = ev.end && ev.end >= start ? ev.end : start
    const isMulti = end > start
    // 보이는 범위로 클램프
    const visStart = start < gridStart ? gridStart : start
    const visEnd = end > gridEnd ? gridEnd : end
    if (visStart > visEnd) continue

    let cur = visStart
    for (let i = 0; i < 42 && cur <= visEnd; i++) {
      let span: CalendarEventSpan
      if (!isMulti) span = 'single'
      else if (cur === start) span = 'start'
      else if (cur === end) span = 'end'
      else span = 'middle'
      const list = map.get(cur) || []
      list.push({ event: ev, span })
      map.set(cur, list)
      cur = addDaysStr(cur, 1)
    }
  }
  return map
})

// ===== 주 단위 레인 배치 (같은 일정 = 모든 날 같은 줄 → 가로 연속 막대) =====
interface DayLayout { lanes: (Occ | null)[]; hidden: number; count: number }
const emptyLayout: DayLayout = { lanes: [], hidden: 0, count: 0 }

const dayLayouts = computed(() => {
  const result = new Map<string, DayLayout>()
  const days = calendarDays.value
  const occ = occByDate.value
  const isRange = (o: Occ) => o.span !== 'single'

  for (let w = 0; w < 6; w++) {
    const week = days.slice(w * 7, w * 7 + 7)

    // 1) 여러 날 세그먼트 수집 (id로 묶어 칸 범위 파악)
    interface Seg { colStart: number; colEnd: number; perCol: Map<number, Occ>; lane: number }
    const segs = new Map<string, Seg>()
    week.forEach((d, col) => {
      for (const o of occ.get(d.dateStr) || []) {
        if (!isRange(o)) continue
        const key = String(o.event.id)
        let s = segs.get(key)
        if (!s) { s = { colStart: col, colEnd: col, perCol: new Map(), lane: -1 }; segs.set(key, s) }
        s.colStart = Math.min(s.colStart, col)
        s.colEnd = Math.max(s.colEnd, col)
        s.perCol.set(col, o)
      }
    })

    // 2) 그리디 레인 배정 (시작 칸 빠른 순, 긴 막대 우선)
    const segList = [...segs.values()].sort(
      (a, b) => a.colStart - b.colStart || (b.colEnd - b.colStart) - (a.colEnd - a.colStart),
    )
    const laneRanges: Array<Array<[number, number]>> = []
    for (const seg of segList) {
      let lane = 0
      while (true) {
        const ranges = laneRanges[lane] || []
        const overlap = ranges.some(([s, e]) => seg.colStart <= e && seg.colEnd >= s)
        if (!overlap) {
          seg.lane = lane
          ;(laneRanges[lane] ||= []).push([seg.colStart, seg.colEnd])
          break
        }
        lane++
      }
    }

    // 3) 칸별 레인 구성: 여러 날은 고정 레인, 단일은 남는 레인에 채움
    week.forEach((d, col) => {
      const dayOccs = occ.get(d.dateStr) || []
      const lanes: (Occ | null)[] = []
      for (const seg of segList) {
        if (col < seg.colStart || col > seg.colEnd) continue
        const o = seg.perCol.get(col)
        if (o) lanes[seg.lane] = o
      }
      for (const o of dayOccs) {
        if (isRange(o)) continue
        let idx = 0
        while (lanes[idx]) idx++
        lanes[idx] = o
      }
      for (let i = 0; i < lanes.length; i++) if (lanes[i] === undefined) lanes[i] = null
      const visible = lanes.slice(0, props.maxLanes).filter(Boolean).length
      result.set(d.dateStr, { lanes, hidden: dayOccs.length - visible, count: dayOccs.length })
    })
  }
  return result
})

function layoutOf(dateStr: string): DayLayout {
  return dayLayouts.value.get(dateStr) || emptyLayout
}

// ===== 막대 렌더 헬퍼 =====
function isRangeSpan(span: CalendarEventSpan): boolean {
  return span !== 'single'
}
function barStyle(o: Occ) {
  const color = o.event.color || 'var(--color-primary)'
  if (isRangeSpan(o.span)) return { background: color, color: '#fff', borderLeftColor: 'transparent' }
  return { borderLeftColor: color }
}
function barClass(o: Occ) {
  if (!isRangeSpan(o.span)) return 'ui-calendar-month__bar--single'
  return ['ui-calendar-month__bar--range', `ui-calendar-month__bar--${o.span}`]
}
// 제목은 단일·시작, 또는 주 시작(일요일=연속 막대 이어받는 칸)에만
function showTitle(o: Occ, dow: number): boolean {
  if (!isRangeSpan(o.span)) return true
  return o.span === 'start' || dow === 0
}

function onSelectDate(dateStr: string) {
  emit('select-date', dateStr)
}
function onSelectEvent(o: Occ, e: Event) {
  e.stopPropagation()
  emit('select-event', o.event)
}

// ===== 월 전환 =====
function goMonth(delta: number) {
  let y = props.year
  let m = props.month + delta
  if (m < 1) { y--; m = 12 } else if (m > 12) { y++; m = 1 }
  emit('update:year', y)
  emit('update:month', m)
  emit('change-month', { year: y, month: m })
}

// ===== 스와이프 (좌=다음달, 우=이전달) =====
const dragX = ref(0)
const isDragging = ref(false)
const isAnimating = ref(false)
const slideDirection = ref<'left' | 'right' | null>(null)
let startX = 0
let startY = 0
let locked = false

function onPointerDown(e: PointerEvent) {
  if (!props.swipeable || isAnimating.value) return
  isDragging.value = true
  locked = false
  startX = e.clientX
  startY = e.clientY
  dragX.value = 0
}
function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  if (!locked && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
    locked = true
    if (Math.abs(dy) > Math.abs(dx)) {
      isDragging.value = false
      dragX.value = 0
      return
    }
  }
  if (locked) dragX.value = dx
}
function onPointerUp() {
  if (!isDragging.value) return
  isDragging.value = false
  const threshold = 80
  if (Math.abs(dragX.value) > threshold) {
    slideDirection.value = dragX.value < 0 ? 'left' : 'right'
    isAnimating.value = true
    setTimeout(() => goMonth(slideDirection.value === 'left' ? 1 : -1), 200)
  } else {
    dragX.value = 0
  }
}

// year/month 변경 시 슬라이드 인
watch([() => props.year, () => props.month], () => {
  if (isAnimating.value) {
    const dir = slideDirection.value
    dragX.value = dir === 'left' ? 300 : -300
    slideDirection.value = null
    isAnimating.value = false
    requestAnimationFrame(() => requestAnimationFrame(() => { dragX.value = 0 }))
  }
})

const gridStyle = computed(() => {
  if (isAnimating.value) {
    const target = slideDirection.value === 'left' ? -100 : 100
    return { transform: `translateX(${target}%)`, transition: 'transform 0.2s ease-out', opacity: '0.3' }
  }
  if (dragX.value !== 0 && !isDragging.value) {
    return { transform: 'translateX(0)', transition: 'transform 0.25s ease-out' }
  }
  if (isDragging.value) {
    return { transform: `translateX(${dragX.value}px)`, transition: 'none' }
  }
  return {}
})
</script>

<template>
  <div
    class="ui-calendar-month"
    role="grid"
    aria-label="월간 캘린더"
    :style="{ touchAction: swipeable ? 'pan-y' : 'auto' }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <div
      v-if="showWeekdays"
      class="ui-calendar-month__weekdays"
      role="row"
    >
      <div
        v-for="(name, i) in weekdayNames"
        :key="name"
        class="ui-calendar-month__weekday"
        :class="{
          'is-sunday': i === 0,
          'is-saturday': i === 6,
        }"
        role="columnheader"
      >
        {{ name }}
      </div>
    </div>

    <div
      class="ui-calendar-month__grid"
      :style="gridStyle"
    >
      <button
        v-for="(d, i) in calendarDays"
        :key="i"
        type="button"
        class="ui-calendar-month__cell"
        :data-date="d.dateStr"
        :class="{
          'is-today': d.dateStr === todayStr,
          'is-selected': d.dateStr === selectedDate,
          'is-other': d.isOtherMonth,
          'is-sunday': d.dow === 0,
          'is-saturday': d.dow === 6,
        }"
        role="gridcell"
        :aria-label="`${d.day}일${layoutOf(d.dateStr).count ? `, 일정 ${layoutOf(d.dateStr).count}건` : ''}`"
        @click="onSelectDate(d.dateStr)"
      >
        <span class="ui-calendar-month__date">{{ d.day }}</span>

        <div
          v-if="layoutOf(d.dateStr).count"
          class="ui-calendar-month__bars"
        >
          <template
            v-for="(o, li) in layoutOf(d.dateStr).lanes.slice(0, maxLanes)"
            :key="li"
          >
            <div
              v-if="o"
              class="ui-calendar-month__bar"
              :class="barClass(o)"
              :style="barStyle(o)"
              @click="onSelectEvent(o, $event)"
            >
              <slot
                name="event"
                :event="o.event"
                :span="o.span"
              >
                <span
                  v-if="showTitle(o, d.dow)"
                  class="ui-calendar-month__bar-title"
                >{{ o.event.title }}</span>
              </slot>
            </div>
            <!-- 여러 날 일정이 지나가는 빈 레인 — 높이만 유지 -->
            <div
              v-else
              class="ui-calendar-month__bar ui-calendar-month__bar--empty"
            ></div>
          </template>

          <span
            v-if="layoutOf(d.dateStr).hidden > 0"
            class="ui-calendar-month__more"
          >+{{ layoutOf(d.dateStr).hidden }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-calendar-month {
  overflow: hidden;
  user-select: none;
  width: 100%;
}

.ui-calendar-month__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 4px;
}
.ui-calendar-month__weekday {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted, #6b7280);
  padding: 8px 0;
  background: var(--color-surface, #f3f4f6);
  border-bottom: 1px solid var(--color-border, #e5e7eb);
  &.is-sunday { color: var(--color-danger, #ef4444); }
  &.is-saturday { color: var(--color-primary, #3b82f6); }
}

.ui-calendar-month__grid {
  // 행(주) 간격만 유지, 열 간격은 0 → 여러 날 막대가 칸 사이에서 끊기지 않고 가로 연속
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 6px 0;
  will-change: transform;
}

.ui-calendar-month__cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 2px 10px;
  min-height: 72px;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  overflow: hidden;
  min-width: 0;
  &:hover { background: var(--color-background, #f9fafb); }
  &.is-selected { background: var(--color-primary-bg, #eff6ff); }
  &.is-other { opacity: 0.4; }
  &.is-sunday .ui-calendar-month__date { color: var(--color-danger, #ef4444); }
  &.is-saturday .ui-calendar-month__date { color: var(--color-primary, #3b82f6); }
  &.is-other.is-sunday .ui-calendar-month__date,
  &.is-other.is-saturday .ui-calendar-month__date { color: inherit; }
  // today는 마지막에 → 요일 색보다 우선
  &.is-today .ui-calendar-month__date {
    background: var(--color-primary, #3b82f6);
    color: #fff !important;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.ui-calendar-month__date {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary, #374151);
  line-height: 1;
}

.ui-calendar-month__bars {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  padding: 0 2px;
  margin-top: 2px;
  min-width: 0;
  overflow: visible;
}
.ui-calendar-month__bar {
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 15px;
  box-sizing: border-box;
  border-left: 3px solid var(--color-primary, #3b82f6);
  padding: 1px 3px;
  border-radius: 0 2px 2px 0;
  background: rgba(0, 0, 0, 0.03);
}
// 여러 날 일정이 지나가는 빈 레인 (투명, 높이만 유지)
.ui-calendar-month__bar--empty {
  border-left: none;
  background: transparent;
}
.ui-calendar-month__bar-title {
  font-size: 10px;
  color: var(--color-text-secondary, #4b5563);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}
// 여러 날 막대 — 칸 좌우 끝까지 채워 가로로 이어지게 (양끝만 둥글게)
.ui-calendar-month__bar--range {
  border-left: none;
  padding: 1px 4px;
  border-radius: 0;
  margin: 0 -4px; // 칸 경계까지 full-bleed → 옆 칸 막대와 연결
  .ui-calendar-month__bar-title { color: #fff; font-weight: 500; }
}
.ui-calendar-month__bar--start { border-radius: 3px 0 0 3px; }
.ui-calendar-month__bar--end { border-radius: 0 3px 3px 0; }
.ui-calendar-month__bar--single { border-radius: 0 2px 2px 0; }

.ui-calendar-month__more {
  font-size: 9px;
  color: var(--color-text-muted, #9ca3af);
  line-height: 1;
  text-align: left;
  padding-left: 6px;
  margin-top: 1px;
}

@media (max-width: 768px) {
  .ui-calendar-month__weekday { font-size: 11px; padding: 6px 0; }
  .ui-calendar-month__cell { min-height: 60px; padding: 4px 1px 8px; }
  .ui-calendar-month__date { font-size: 11px; }
  .ui-calendar-month__bar { padding: 0 2px; border-left-width: 2px; }
  .ui-calendar-month__bar-title { font-size: 9px; line-height: 1.4; }
  .ui-calendar-month__bars { padding: 0 1px; }
}
</style>
