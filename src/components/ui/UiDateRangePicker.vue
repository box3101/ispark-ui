<template>
  <div class="ui-datepicker-wrap ui-daterangepicker-wrap" :class="{ 'ui-daterangepicker-wrap--separate': mode === 'separate' }">
    <template v-if="mode === 'separate'">
      <div class="ui-daterangepicker-fields">
        <div class="ui-daterangepicker-endpoint">
          <span class="ui-daterangepicker-label">시작일</span>
          <UiDatePicker :model-value="modelValue.start" :size="size" :locale="locale" :disabled="disabled" :clearable="clearable"
            :min-value="minValue" :max-value="startMax" trigger-label="시작일 선택" @update:model-value="onEndpoint('start', $event)">
            <template #header="{ close }">
<div v-if="effectivePresets.length" class="ui-daterangepicker-quick-actions ui-daterangepicker-header-actions">
                  <button v-for="preset in effectivePresets" :key="preset.label" type="button" class="ui-daterangepicker-preset"
                    :class="{ 'is-active': isPresetActive(preset) }" :disabled="disabled || isPresetDisabled(preset)" @click="onPreset(preset); close()">{{ preset.label }}</button>
                </div>
            </template>
            <template #footer="{ close, clear }">
              <div class="ui-daterangepicker-calendar-actions">
                <div v-if="clearable" class="ui-daterangepicker-reset-actions">
                  <button type="button" :disabled="disabled || !modelValue.start" @click="clear()">초기화</button>
                  <button type="button" :disabled="disabled || (!modelValue.start && !modelValue.end)" @click="onClear(); close()">전체 초기화</button>
                </div>
              </div>
            </template>
          </UiDatePicker>
        </div>
        <span class="ui-datepicker-range-sep" aria-hidden="true">~</span>
        <div class="ui-daterangepicker-endpoint">
          <span class="ui-daterangepicker-label">종료일</span>
          <UiDatePicker :model-value="modelValue.end" :size="size" :locale="locale" :disabled="disabled" :clearable="clearable"
            :min-value="endMin" :max-value="maxValue" trigger-label="종료일 선택" @update:model-value="onEndpoint('end', $event)">
            <template #header="{ close }">
<div v-if="effectivePresets.length" class="ui-daterangepicker-quick-actions ui-daterangepicker-header-actions">
                  <button v-for="preset in effectivePresets" :key="preset.label" type="button" class="ui-daterangepicker-preset"
                    :class="{ 'is-active': isPresetActive(preset) }" :disabled="disabled || isPresetDisabled(preset)" @click="onPreset(preset); close()">{{ preset.label }}</button>
                </div>
            </template>
            <template #footer="{ close, clear }">
              <div class="ui-daterangepicker-calendar-actions">
                <div v-if="clearable" class="ui-daterangepicker-reset-actions">
                  <button type="button" :disabled="disabled || !modelValue.end" @click="clear()">초기화</button>
                  <button type="button" :disabled="disabled || (!modelValue.start && !modelValue.end)" @click="onClear(); close()">전체 초기화</button>
                </div>
              </div>
            </template>
          </UiDatePicker>
        </div>
      </div>
      <p v-if="rangeError" class="ui-daterangepicker-error" role="alert">{{ rangeError }}</p>
    </template>
    <DateRangePickerRoot
      v-else
      v-model="internalRange"
      v-model:placeholder="calendarPlaceholder"
      v-model:open="isOpen"
      :number-of-months="isCompact ? 1 : 2"
      fixed-weeks
      @update:start-value="pendingStart = $event"
      :locale="locale"
      :disabled="disabled"
      :min-value="minValue"
      :max-value="maxValue"
    >
      <DateRangePickerAnchor as-child>
      <DateRangePickerField
        v-slot="{ segments }"
        class="ui-datepicker-field"
        :class="[`size-dp-${size}`, { 'is-disabled': disabled }]"
        @click="onFieldClick"
      >
        <!-- 시작일 segments -->
        <template
          v-for="item in segments.start"
          :key="`s-${item.part}`"
        >
          <DateRangePickerInput
            v-if="item.part === 'literal'"
            type="start"
            :part="item.part"
            class="ui-datepicker-literal"
          >
            {{ item.value }}
          </DateRangePickerInput>
          <DateRangePickerInput
            v-else
            type="start"
            :part="item.part"
            class="ui-datepicker-segment"
          >
            {{ item.value }}
          </DateRangePickerInput>
        </template>

        <span class="ui-datepicker-range-sep">~</span>

        <!-- 종료일 segments -->
        <template
          v-for="item in segments.end"
          :key="`e-${item.part}`"
        >
          <DateRangePickerInput
            v-if="item.part === 'literal'"
            type="end"
            :part="item.part"
            class="ui-datepicker-literal"
          >
            {{ item.value }}
          </DateRangePickerInput>
          <DateRangePickerInput
            v-else
            type="end"
            :part="item.part"
            class="ui-datepicker-segment"
          >
            {{ item.value }}
          </DateRangePickerInput>
        </template>

        <DateRangePickerTrigger
          class="ui-datepicker-trigger"
          aria-label="기간 선택"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" stroke-width="1.5" />
            <path d="M2 7h12" stroke="currentColor" stroke-width="1.5" />
            <path d="M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </DateRangePickerTrigger>
      </DateRangePickerField>
      </DateRangePickerAnchor>

      <DateRangePickerContent
        class="ui-datepicker-popover ui-daterangepicker-popover"
        :class="{ 'is-compact': isCompact }"
        :side-offset="8"
        align="start"
        :collision-padding="8"
      >
        <!-- 빠른 선택 프리셋 -->
        <div
          v-if="effectivePresets.length"
          class="ui-daterangepicker-presets"
        >
          <DateRangePickerClose
            v-for="preset in effectivePresets"
            :key="preset.label"
            class="ui-daterangepicker-preset"
            :class="{ 'is-active': isPresetActive(preset) }"
            :disabled="disabled || isPresetDisabled(preset)"
            @click="onPreset(preset)"
          >
            {{ preset.label }}
          </DateRangePickerClose>
        </div>

        <div class="ui-daterangepicker-guide" role="status">{{ pendingStart ? '② 종료일을 선택해 주세요' : '① 시작일을 선택해 주세요' }}<span v-if="pendingStart">시작일 {{ formatDate(pendingStart) }}</span></div>
        <DateRangePickerCalendar
          v-slot="{ weekDays, grid }"
          class="ui-datepicker-calendar"
        >
          <div class="ui-datepicker-header">
            <DateRangePickerPrev
              class="ui-datepicker-nav"
              aria-label="이전 달"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 4l-4 4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </DateRangePickerPrev>

            <div class="ui-datepicker-selects">
              <UiSelect
                class="ui-datepicker-select"
                :model-value="String(calendarPlaceholder?.year)"
                :options="yearSelectOptions"
                size="xs"
                @update:model-value="onYearSelect"
              />
              <UiSelect
                class="ui-datepicker-select"
                :model-value="String(calendarPlaceholder?.month)"
                :options="monthSelectOptions"
                size="xs"
                @update:model-value="onMonthSelect"
              />
            </div>
            <span v-if="!isCompact" class="ui-daterangepicker-next-label">{{ calendarPlaceholder.add({ months: 1 }).year }}년 {{ calendarPlaceholder.add({ months: 1 }).month }}월</span>

            <DateRangePickerNext
              class="ui-datepicker-nav"
              aria-label="다음 달"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </DateRangePickerNext>
          </div>

          <div class="ui-daterangepicker-months">
          <DateRangePickerGrid
            v-for="month in grid"
            :key="month.value.toString()"
          >
            <DateRangePickerGridHead>
              <DateRangePickerGridRow class="ui-datepicker-row">
                <DateRangePickerHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="ui-datepicker-head-cell"
                >
                  {{ day }}
                </DateRangePickerHeadCell>
              </DateRangePickerGridRow>
            </DateRangePickerGridHead>

            <DateRangePickerGridBody>
              <DateRangePickerGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`row-${index}`"
                class="ui-datepicker-row"
              >
                <DateRangePickerCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                  class="ui-datepicker-cell"
                >
                  <DateRangePickerCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="ui-datepicker-cell-trigger"
                  />
                </DateRangePickerCell>
              </DateRangePickerGridRow>
            </DateRangePickerGridBody>
          </DateRangePickerGrid>
          </div>
        </DateRangePickerCalendar>
        <div class="ui-daterangepicker-footer">
          <span aria-live="polite">{{ selectionLabel }}</span>
          <button v-if="clearable" type="button" :disabled="disabled || (!modelValue.start && !modelValue.end)" @click="onClear">초기화</button>
        </div>
      </DateRangePickerContent>
    </DateRangePickerRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, type Ref } from 'vue'
import {
  DateRangePickerCalendar,
  DateRangePickerAnchor,
  DateRangePickerCell,
  DateRangePickerCellTrigger,
  DateRangePickerClose,
  DateRangePickerContent,
  DateRangePickerField,
  DateRangePickerGrid,
  DateRangePickerGridBody,
  DateRangePickerGridHead,
  DateRangePickerGridRow,
  DateRangePickerHeadCell,
  DateRangePickerInput,
  DateRangePickerNext,
  DateRangePickerPrev,
  DateRangePickerRoot,
  DateRangePickerTrigger,
} from 'radix-vue'
import { CalendarDate, endOfMonth, type DateValue } from '@internationalized/date'
import UiSelect from './UiSelect.vue'
import UiDatePicker from './UiDatePicker.vue'

/** 시작일/종료일 쌍 — radix-vue DateRange와 동일 형태 */
export interface DateRange {
  start: DateValue | undefined
  end: DateValue | undefined
}

/** 빠른 선택 프리셋 — 날짜 계산은 사용하는 쪽에서 (오늘/이번주/이번달 등) */
export interface DateRangePreset {
  label: string
  start: DateValue
  end: DateValue
}

const props = withDefaults(
  defineProps<{
    modelValue?: DateRange
    /** 기본: 시작일/종료일 독립 달력. range는 기존 두 달 달력 */
    mode?: 'separate' | 'range'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    disabled?: boolean
    clearable?: boolean
    locale?: string
    minValue?: DateValue
    maxValue?: DateValue
    /** 팝오버 상단에 표시할 빠른 선택 프리셋 */
    presets?: DateRangePreset[]
  }>(),
  {
    modelValue: () => ({ start: undefined, end: undefined }),
    mode: 'separate',
    size: 'sm',
    disabled: false,
    clearable: true,
    locale: 'ko-KR',
    minValue: undefined,
    maxValue: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: DateRange]
}>()
const isOpen = ref(false)
const rangeError = ref('')
watch(() => props.modelValue, () => { rangeError.value = '' }, { deep: true })
const startMax = computed(() => {
  const end = props.modelValue.end
  return end && (!props.maxValue || end.compare(props.maxValue) < 0) ? end : props.maxValue
})
const endMin = computed(() => {
  const start = props.modelValue.start
  return start && (!props.minValue || start.compare(props.minValue) > 0) ? start : props.minValue
})
function onEndpoint(endpoint: 'start' | 'end', value: DateValue | undefined) {
  if (props.disabled) return
  const next = { ...props.modelValue, [endpoint]: value }
  if (value && ((props.minValue && value.compare(props.minValue) < 0) || (props.maxValue && value.compare(props.maxValue) > 0))) {
    rangeError.value = '선택 가능한 날짜 범위를 확인해 주세요.'
    return
  }
  if (next.start && next.end && next.start.compare(next.end) > 0) {
    rangeError.value = '종료일은 시작일과 같거나 이후여야 합니다.'
    return
  }
  rangeError.value = ''
  emit('update:modelValue', next)
}
const pendingStart = ref<DateValue>()
watch(isOpen, () => { pendingStart.value = undefined })
const isCompact = ref(false)
function updateViewport() { isCompact.value = window.innerWidth < 720 }
onMounted(() => { updateViewport(); window.addEventListener('resize', updateViewport) })
onBeforeUnmount(() => window.removeEventListener('resize', updateViewport))

const effectivePresets = computed<DateRangePreset[]>(() => {
  if (props.presets) return props.presets
  const now = new Date()
  const today = new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate())
  return [
    { label: '오늘', start: today, end: today },
    { label: '최근 7일', start: today.subtract({ days: 6 }), end: today },
    { label: '최근 30일', start: today.subtract({ days: 29 }), end: today },
    { label: '이번 달', start: today.set({ day: 1 }), end: endOfMonth(today) },
  ]
})
const isPresetDisabled = (preset: DateRangePreset) => Boolean(
  preset.start.compare(preset.end) > 0 ||
  (props.minValue && preset.start.compare(props.minValue) < 0) ||
  (props.maxValue && preset.end.compare(props.maxValue) > 0),
)
const formatDate = (date: DateValue) => `${date.year}. ${String(date.month).padStart(2, '0')}. ${String(date.day).padStart(2, '0')}.`
const selectionLabel = computed(() => {
  if (pendingStart.value) return `${formatDate(pendingStart.value)} — 종료일을 선택해 주세요.`
  const { start, end } = props.modelValue
  if (!start) return '시작일을 선택해 주세요.'
  if (!end) return `${formatDate(start)} — 종료일을 선택해 주세요.`
  return `${formatDate(start)} — ${formatDate(end)}`
})
function onClear() {
  if (props.disabled || !props.clearable) return
  emit('update:modelValue', { start: undefined, end: undefined })
  rangeError.value = ''
  isOpen.value = false
}

const internalRange = computed({
  get: () => props.modelValue,
  set: (val: DateRange) => {
    emit('update:modelValue', val)
    if (val.start && val.end) { pendingStart.value = undefined; isOpen.value = false }
  },
})

// 필드(날짜 세그먼트 영역) 클릭 시에도 달력 열기 — 트리거 버튼 클릭 프록시
const onFieldClick = (e: MouseEvent) => {
  if (props.disabled) return
  const target = e.target as HTMLElement
  // 트리거 버튼 자체 클릭이면 무시 (중복 방지)
  if (target.closest('.ui-datepicker-trigger')) return
  const field = e.currentTarget as HTMLElement
  const trigger = field.querySelector('.ui-datepicker-trigger') as HTMLElement | null
  trigger?.click()
}

// 프리셋 클릭 — 기간 적용 (팝오버는 DateRangePickerClose가 닫음)
const onPreset = (preset: DateRangePreset) => {
  if (props.disabled || isPresetDisabled(preset)) return
  emit('update:modelValue', { start: preset.start, end: preset.end })
  rangeError.value = ''
  calendarPlaceholder.value = new CalendarDate(preset.start.year, preset.start.month, 1)
}

// 현재 적용된 기간과 일치하는 프리셋 (활성 표시용)
const isPresetActive = (preset: DateRangePreset) => {
  const v = props.modelValue
  return !!v?.start && !!v?.end && v.start.compare(preset.start) === 0 && v.end.compare(preset.end) === 0
}

// 캘린더 placeholder (보고 있는 월)
const now = new Date()
const calendarPlaceholder = ref(new CalendarDate(now.getFullYear(), now.getMonth() + 1, 1)) as Ref<DateValue>

// 연도 옵션 (±10년) — UiDatePicker와 동일 패턴
const yearOptions = computed((): number[] => {
  const current = calendarPlaceholder.value?.year ?? now.getFullYear()
  const years: number[] = []
  for (let y = current - 10; y <= current + 10; y++) years.push(y)
  return years
})

const yearSelectOptions = computed(() =>
  yearOptions.value.map((y: number) => ({ label: String(y), value: String(y) })),
)

const monthSelectOptions = computed(() =>
  Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}월`, value: String(i + 1) })),
)

const onYearSelect = (val: string | number) => {
  const year = Number(val)
  const month = calendarPlaceholder.value?.month ?? 1
  calendarPlaceholder.value = new CalendarDate(year, month, 1)
}

const onMonthSelect = (val: string | number) => {
  const month = Number(val)
  const year = calendarPlaceholder.value?.year ?? now.getFullYear()
  calendarPlaceholder.value = new CalendarDate(year, month, 1)
}
</script>
