<template>
  <div
    class="flex flex-col gap-2 lg:gap-4 2xl:gap-6 text-[14px] lg:text-[15px] 2xl:text-base"
  >
    <div class="flex flex-col gap-2">
      <div class="flex-1">Retail price</div>
      <div class="flex-1 text-primary 2xl:text-[28px]">${{Number(price).toLocaleString()}}</div>
      <div class="h-[1px] w-full bg-gray-1 mt-2 lg:mt-4"></div>
    </div>
<!--    <div class="flex flex-col gap-2">-->
<!--      <div class="flex-1">Average price on Chrono24</div>-->
<!--      <div class="flex-1 text-primary 2xl:text-[28px]">$260 000</div>-->
<!--      <div class="h-[1px] w-full bg-gray-1 mt-2 lg:mt-4"></div>-->
<!--    </div>-->
    <div class="flex flex-col gap-2">
      <div class="flex-1">Market range</div>
      <div class="flex-1 text-primary 2xl:text-[28px]">{{ priceRange }}</div>
      <div class="h-[1px] w-full bg-gray-1 mt-2 lg:mt-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{price: string,secondPrice: string}>()

const priceRange = computed(() => {
 return '$' + Number(Math.max(+props.price, +props.secondPrice)).toLocaleString() + ' - ' + '$' + Number(Math.min(+props.price, +props.secondPrice)).toLocaleString()
})
</script>

<style scoped>

</style>
