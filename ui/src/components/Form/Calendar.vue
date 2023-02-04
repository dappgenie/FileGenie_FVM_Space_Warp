<script lang="ts" setup>
import { format } from 'date-fns'
import type {
  IDay,
  IUseCalendarOptions,
} from '~/composables/calendar'
import {
  useCalendar,
} from '~/composables/calendar'

interface ICalendarProps {
  options?: IUseCalendarOptions
  id?: string
  name?: string
  modelValue?: Date[]
  buttonProps?: any
}
const props = defineProps<ICalendarProps>()

const emit = defineEmits<ICalendarEmits>()

interface ICalendarEmits {
  (e: 'update:modelValue', value: Date[]): void
  (e: 'submit', value: Date[]): void
}
const { width } = useWindowSize()

/* -------------------------------------------------------------------------- */
/*                               CALENDAR UTILS                               */
/* -------------------------------------------------------------------------- */

const { months, next, prev, select, selected, setTime, setSelected } = useCalendar({
  preselect: props.modelValue,
  mode: 'range',
  monthsToShow: 2,
  ...(props.options || {}),
})
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const selectDate = (date: Date) => {
  select(date)
}
const updateTime = (position: number, time: Date) => {
  setTime(position, time)
}

watch(selected, (value) => {
  emit('update:modelValue', value)
}, { deep: true })

const submit = () => {
  emit('submit', selected.value)
}

/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */

const getDayClasses = (day: IDay) => {
  return {
    'weekend': day.isWeekend,
    'in-range': day.isInRange,
    'start-of-range': day.isStartOfRange,
    'end-of-range': day.isEndOfRange,
    'selected': day.isSelected,
    'today': day.isToday,
    'disabled': day.isDisabled,
    'other-month': !day.isSameMonth,
  }
}
</script>

<template>
  <div :id="id" :name="name" class="calendar-container">
    <div :id="`${id}-calendar`" :name="`${name}-calendar`" class="calendar">
      <div v-for="(month, midx) in (width > 768) ? months : months.slice(0, 1)" class="calendar-month">
        <div :id="`${id}-calendar-header`" :name="`${name}-calendar-header`" class="calendar-header">
          <button
            v-if="(midx === 0)" v-bind="buttonProps" :id="`${id}-calendar-header-prev`"
            class="calendar-header-icon" :name="`${name}-calendar-header-prev`" @click="prev"
          >
            <div text-primary m-auto i-mdi:chevron-left />
          </button>
          <button
            v-bind="buttonProps" :id="`${id}-calendar-header-item`" class="calendar-header-item"
            :name="`${name}-calendar-header-item`"
          >
            {{ month.name }} {{ month.year }}
          </button>
          <button
            v-if="((midx === ((width > 768) ? ((props.options?.monthsToShow ?? 1) - 1) : 0)))" v-bind="buttonProps"
            :id="`${id}-calendar-header-next`" class="calendar-header-icon" :name="`${name}-calendar-header-next`"
            @click="next"
          >
            <div text-primary i-mdi:chevron-right />
          </button>
        </div>
        <div :id="`${id}-calendar-week-days`" class="calendar-week-days" :name="`${name}-calendar-week-days`">
          <div
            v-for="day in weekDays" :id="`${id}-calendar-week-day-${day}`"
            :name="`${name}-calendar-week-day-${day}`" class="calendar-week-day"
          >
            {{ day }}
          </div>
        </div>
        <div :id="`${id}-calendar-days`" :name="`${name}-calendar-days`" class="calendar-days">
          <div
            v-for="day in month.days" :id="`${id}-calendar-day-${day.dayId}`"
            :name="`${name}-calendar-day-${day.dayId}`" :class="getDayClasses(day)" class="calendar-day"
          >
            <button
              v-bind="buttonProps" :id="`${id}-calendar-day-${day.dayId}-text`" :name="`${name}-calendar-day-${day.dayId}-text`"
              class="calendar-day-text" @click="selectDate(day.date)"
            >
              {{ format(day.date, "dd") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.calendar-container {
  @apply background space-y-3 p-2 lg:p-4 rounded-lg shadow-lg flex flex-col;

}

.calendar {
  @apply flex flex-col md:flex-row  space-x-0 md:space-x-4;
}

.calendar .calendar-month {
  @apply rounded-lg background-secondary p-2 md:p-4;
}

.calendar-header {
  @apply flex space-x-1 items-center;
  @apply p-1;
}

.calendar-header .calendar-header-item {
  @apply text-xs font-semibold py-1 px-2 text-center flex-1 rounded;
  @apply text-gray-600 hover:bg-gray-300;
  @apply dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:bg-opacity-50;
}

.calendar-header .calendar-header-icon {
  @apply flex-none w-8 h-8 p-1 rounded;
  @apply fill-gray-600 hover:bg-gray-300;
  @apply dark:fill-gray-200 dark:hover:bg-gray-900 dark:hover:bg-opacity-50;
}

.calendar-week-days {
  @apply grid grid-cols-7;
}

.calendar-week-days .calendar-week-day {
  @apply font-bold uppercase tracking-widest p-2 text-center;
  @apply text-gray-500;
  font-size: 0.6rem;
}

.calendar-days {
  @apply grid grid-cols-7;
}

.calendar-days .calendar-day {
  @apply flex items-center justify-center p-1 relative;
}

.calendar-day-text {
  @apply text-[10px] md:text-xs flex items-center justify-center p-1  w-8 h-8 cursor-pointer rounded-full;
  @apply text-gray-700 hover:bg-gray-300;
  @apply dark:text-gray-100 dark:hover:bg-gray-900;
}

.other-month .calendar-day-text {
  @apply text-gray-200 dark:text-gray-500;
}

.today .calendar-day-text {
  @apply font-bold border border-gray-400 dark:border-gray-600;
}

.in-range .calendar-day-text {
  @apply font-bold text-gray-800 dark:text-gray-100 relative z-10;
}

.end-of-range .calendar-day-text {
  @apply font-bold text-gray-800 dark:text-gray-100 relative z-10;
}

.calendar-day-text {
  @apply font-bold text-gray-800 dark:text-gray-100 relative z-10;
}

.start-of-range .calendar-day-text {
  @apply bg-secondary;
}

.end-of-range .calendar-day-text {
  @apply bg-secondary;
}

.selected .calendar-day-text {
  /* @apply bg-secondary text-color-primary; */
  @apply bg-secondary text-white;
}

.in-range:not(.start-of-range)::before {
  content: '';
  z-index: 0;
  height: calc(100% - 8px);
  @apply absolute block left-0 w-1/2 top-1;
  @apply bg-gray-500 bg-opacity-30;
}

.end-of-range:not(.start-of-range)::before {
  content: '';
  z-index: 0;
  height: calc(100% - 8px);
  @apply absolute block left-0 w-1/2 top-1;
  @apply bg-gray-500 bg-opacity-30;
}

.in-range:not(.end-of-range)::after {
  content: '';
  z-index: 0;
  height: calc(100% - 8px);
  @apply absolute block right-0 w-1/2 top-1;
  @apply bg-gray-500 bg-opacity-30;
}

.start-of-range:not(.end-of-range)::after {
  content: '';
  z-index: 0;
  height: calc(100% - 8px);
  @apply absolute block right-0 w-1/2 top-1;
  @apply bg-gray-500 bg-opacity-30;
}
</style>
