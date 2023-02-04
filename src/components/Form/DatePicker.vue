<script lang="ts" setup>
import { format } from 'date-fns'
import { addDays } from '~/utils/factories/formatDate';
import { DAYS, MONTHS } from '~/utils/constants';

interface IDatePickerProps {
  modelValue?: Date[]
  placeholder?: string
  single?: boolean
  name?: string
  id?: string
  type?: 'single' | 'multi' | 'normal'
}
const props = defineProps<IDatePickerProps>()
const emit = defineEmits<IDatePickerEmits>()
const { placeholder = 'Select Date' } = props

interface IDatePickerEmits {
  (e: 'update:modelValue', value: Date[]): void
}
/**
 * States
 */
const { dateRange } = storeToRefs(useSearchStore())

const date = new Date()
const startDate = computed(() => (dateRange.value)? dateRange.value.start_date : addDays(date, 14))
const endDate = computed(() =>(dateRange.value.end_date)?? addDays(date, 15))

const FormatedStartDate = computed(()=> format(startDate.value, 'dd/MM/yyyy'))
const FormatedEndDate = computed(()=>format(endDate.value, 'dd/MM/yyyy'))
const FormatedStartDate2 = ref<any[]>([startDate.value.getDate(), DAYS[startDate.value.getDay()], MONTHS[startDate.value.getMonth()]])
const FormatedEndDate2 = ref<any[]>([endDate.value.getDate(), DAYS[endDate.value.getDay()], MONTHS[endDate.value.getMonth()]])
const isOpen = ref<boolean>(false)
const startValue = ref(FormatedStartDate.value)
const endValue = ref(FormatedEndDate.value)
const startValue2 = ref<any[]>([new Date().getDate(), DAYS[new Date().getDay()], MONTHS[new Date().getMonth()]])
// const startValue2 = ref<any[]>(['Start Date'])
const endValue2 = ref<any[]>([new Date().getDate(), DAYS[new Date().getDay()], MONTHS[new Date().getMonth()]])
// const endValue2 = ref<any[]>(['End Date'])
// const dateValue = ref(FormatedStartDate + FormatedEndDate)
const dateValue = ref((`${startValue.value} - ${endValue.value}`))
const handleUpdate = (value: Date[]) => {
  dateRange.value.start_date = value?.[0]
  dateRange.value.end_date = value?.[1]
  localStorage.setItem('date', JSON.stringify(dateRange.value))
  startValue.value = value?.[0] ? format(value[0], 'dd/MM/yyyy') : placeholder
  endValue.value = value?.[1] ? format(value[1], 'dd/MM/yyyy') : placeholder
  startValue2.value = [value[0]?.getDate(), DAYS[value[0]?.getDay()], MONTHS[value[0]?.getMonth()]]
  endValue2.value = [value[1]?.getDate(), DAYS[value[1]?.getDay()], MONTHS[value[1]?.getMonth()]]

  dateValue.value = (startValue.value === 'Select Date' && endValue.value === 'Select Date') ? startValue.value : (props.single ? startValue.value : (value.length === 2) ? (`${startValue.value} - ${endValue.value}`) : 'Select Date')
  emit('update:modelValue', value)
}
onMounted(()=>{
  const getDate = (localStorage.getItem('date'))?JSON.parse(localStorage.getItem('date') || ''):null
  if(getDate)
    dateRange.value = {
      start_date: new Date(getDate.start_date),
      end_date: new Date(getDate.end_date)
    }
  else
    dateRange.value = {
      start_date: addDays( date, 14),
      end_date: addDays(date, 15)
    }
  if(dateRange.value) handleUpdate([dateRange.value.start_date, dateRange.value.end_date])
})
</script>

<template>
  <!-- {{ startDate }} -->
  <div :id="id" :name="name">
    <Dropdown
      id="form-datepicker-dropdown" parent-class="w-full" :close-on-select="false"
      name="form-datepicker-dropdown"
      position="center"
      :omit-min-width="true"
    >
      <template v-slot="{ events }">
        <div v-if="type === 'multi'" flex gap-x-6 w-full>
          <div class="style-1">
            <div class="style-2">
              Check-in
            </div>
            <div class="style-3">
              <div text-blue mr-2 i-mdi:calendar-month />
              <button
              v-on="events"
                :id="`${id}-date-picker-trigger`" type="button" class="date-picker-trigger w-full text-left"
                :name="`${name}-date-picker-trigger`" @click="isOpen = true"
              >
                <div text-sm :class="{ 'has-value': !!modelValue }" class="date-picker-trigger-text">
                  {{ startValue }}
                </div>
              </button>
            </div>
          </div>
          <div class=" style-1 ">
            <div class="style-2">
              Check-out
            </div>
            <div class="style-3">
              <div text-blue mr-2 i-mdi:calendar-month />
              <button
              v-on="events"
                :id="`${id}-date-picker-trigger`" type="button" class="date-picker-trigger w-full text-left"
                :name="`${name}-date-picker-trigger`" @click="isOpen = true"
              >
                <div text-sm :class="{ 'has-value': !!modelValue }" class="date-picker-trigger-text">
                  {{ endValue }}
                </div>
              </button>
            </div>
          </div>
        </div>
        <FormInputGroup v-if="type === 'single'" :is-label="true">
          <template #label>
            Check-in - Check-out
          </template>
          <template #left>
            <div text-blue i-mdi:calendar-month />
          </template>
          <button
            :id="`${id}-date-picker-trigger`" type="button" class="date-picker-trigger w-full text-left"
            :name="`${name}-date-picker-trigger`" @click="isOpen = true" v-on="events"
          >
            <div :class="{ 'has-value': !!modelValue }" class="date-picker-trigger-text">
              {{ dateValue }}
            </div>
          </button>
        </FormInputGroup>

        <!-- normal -->
        <div v-if="type === 'normal'" class="style-4">
          <div class="style-5">
            <div class="style-6">
              Check-in
            </div>
            <div flex justify-center items-center>
              <button
                :id="`${id}-date-picker-trigger`" type="button" class="date-picker-trigger w-full text-left"
                :name="`${name}-date-picker-trigger`" @click="isOpen = true" v-on="events"
              >
                <div flex justify-start>
                  <div :class="{ 'has-value': !!modelValue }" class="date-picker-trigger-text pe-2 text-[39px]">
                    {{ FormatedStartDate2[0] }}
                  </div>
                  <div flex-col justify-start flex justify-center>
                    <div class="text-[10px]">
                      {{ FormatedStartDate2[1] }}
                    </div>
                    <div class="text-[10px]">
                      {{ FormatedStartDate2[2] }}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div class=" w-fit border-blue ">
            <div class="style-6">
              Check-out
            </div>
            <div flex justify-center items-center>
              <button
                :id="`${id}-date-picker-trigger`" type="button" class="date-picker-trigger w-full text-left"
                :name="`${name}-date-picker-trigger`" @click="isOpen = true" v-on="events"
              >
                <div flex justify-start>
                  <div :class="{ 'has-value': !!modelValue }" class="date-picker-trigger-text  pe-2 text-[39px]">
                    {{ FormatedEndDate2[0] }}
                  </div>
                  <div flex-col justify-start flex justify-center>
                    <div class="text-[10px]">
                      {{ FormatedEndDate2[1] }}
                    </div>
                    <div class="text-[10px]">
                      {{ FormatedEndDate2[2] }}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- normal end -->
      </template>
      <template #content="{ attributes }">
        <FormCalendar
          :id="`${id}-date-picker-calendar`"
          v-bind="attributes"
          :options="{ monthsToShow: single ? 1 : 2, mode: single ? 'single' : 'range' }" :model-value="modelValue" :name="`${id}-date-picker-calendar`"
          @update:modelValue="handleUpdate" @submit="isOpen = false"
        />
      </template>
      <template #searchMobile>
        <FormCalendar
          :id="`${id}-date-picker-calendar`"
          :options="{ monthsToShow: single ? 1 : 2, mode: single ? 'single' : 'range' }" :model-value="modelValue" :name="`${id}-date-picker-calendar`"
          @update:modelValue="handleUpdate" @submit="isOpen = false"
        />
      </template>
    </Dropdown>
  </div>
</template>

<style lang="css" scoped>
.style-1{
  @apply border-r-1   w-full border-blue;
}
.style-2{
  @apply text-xs text-primary font-medium;
}
.style-3{
  @apply flex justify-start items-center;
}
.style-4{
  @apply flex w-full justify-center items-center gap-x-16 md:gap-x-28;
}
.style-5{
  @apply w-fit flex-col justify-center border-blue;
}
.style-6{
  @apply style-6;
}
</style>
