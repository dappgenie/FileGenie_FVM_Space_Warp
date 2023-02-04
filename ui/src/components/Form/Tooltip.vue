<script lang="ts" setup>
const showTooltip = ref(false)
const tooltip = ref<HTMLDivElement>()
onMounted(() => {
})

</script>

<template>
  <div relative>
    <span cursor-pointer @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
      <slot name="title">
        Hover
      </slot>
    </span>
    <div v-if="showTooltip" ref="tooltip" class="tooltipStyle">
    <!-- <div ref="tooltip" class="tooltipStyle"> -->
      <slot name="tooltip">
        This is a tooltip
        <!-- This charge includes estimated amounts the travel service provider (i.e. hotel, car rental company) pays for their taxes, and/or taxes that we pay, to taxing authorities on your booking (including but not limited to sales, occupancy, and value added tax). This amount may also include any amounts charged to us for resort fee, cleaning fees, and other fees. and/or a fee we. the hotel supplier and/or the website you booked on , retain as part of the compensation for our and/or their services. which varies based on factors such as location, the amount, and how you booked, For more details, please see the Terms & Conditions. -->
      </slot>
    </div>
  </div>
</template>

<style scoped lang="css">
.tooltipStyle {
  @apply absolute z-10 -bottom-15 left-0 p-4 background-secondary text-xs;
  @apply max-w-[400px];
}
</style>
