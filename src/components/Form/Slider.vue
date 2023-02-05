<script lang="ts" setup>
import VueSlider from 'vue-slider-component'
import '~/assets/css/slider.css'

const props = defineProps<ISliderProps>()
const emit = defineEmits<ISliderEmits>()
interface ISliderProps {
  startValue: number
  endValue: number
}
interface ISliderEmits {
  (e: 'update:slider', value: any): void
}
const value = ref([0, 100])
const startValue = ref<number>(0)
const endValue = ref<number>(300)

const computeValue = (val: number[]) => {
  startValue.value = (val[0] * 3)
  endValue.value = (val[1] * 3)
}
const keyUp = () => {
  emit('update:slider', {
    min: startValue.value,
    max: endValue.value,
  })
}
 onMounted(() => {
  startValue.value = (props.startValue)
  endValue.value = (props.endValue)
  if ((props.startValue >= 0) && (props.endValue <= 300))
    value.value = [props.startValue / 3, props.endValue / 3]
})
</script>

<template>
  <div>
    <div class="flex justify-between my-2 text-xs">
      <span>${{startValue}}</span>
      <span>${{(endValue===300)? '300+' : endValue}}</span>
    </div>
    <vue-slider :tooltip="'none'" @change="computeValue($event)" @drag-end="keyUp()" v-model="value"/>
  </div>
</template>

<style scoped lang="css">
.slider-style{
  @apply  p-1 text-xs border border-color background-secondary;
}
</style>

