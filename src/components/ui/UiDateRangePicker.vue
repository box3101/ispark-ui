<template>
  <div class="ui-datepicker-wrap">
    <DateRangePickerRoot
      v-model="internalRange"
      v-model:placeholder="calendarPlaceholder"
      :locale="locale"
      :disabled="disabled"
      :min-value="minValue"
      :max-value="maxValue"
    >
      <DateRangePickerField
        v-slot="{ segments }"
        class="ui-datepicker-field"
        :class="[`size-dp-${size}`, { 'is-disabled': disabled }]"
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

      <DateRangePickerContent
        class="ui-datepicker-popover"
        :side-offset="4"
      >
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

            <DateRangePickerNext
              class="ui-datepicker-nav"
              aria-label="다음 달"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </DateRangePickerNext>
          </div>

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
        </DateRangePickerCalendar>
      </DateRangePickerContent>
    </DateRangePickerRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import {
  DateRangePickerCalendar,
  DateRangePickerCell,
  DateRangePickerCellTrigger,
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
import { CalendarDate, type DateValue } from '@internationalized/date'
import UiSelect from './UiSelect.vue'

/** 시작일/종료일 쌍 — radix-vue DateRange와 동일 형태 */
export interface DateRange {
  start: DateValue | undefined
  end: DateValue | undefined
}

interface Props {
  modelValue?: DateRange
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  locale?: string
  minValue?: DateValue
  maxValue?: DateValue
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ start: undefined, end: undefined }),
  size: 'sm',
  disabled: false,
  locale: 'ko-KR',
  minValue: undefined,
  maxValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: DateRange]
}>()

const internalRange = computed({
  get: () => props.modelValue,
  set: (val: DateRange) => emit('update:modelValue', val),
})

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
