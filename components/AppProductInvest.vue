<template>
  <div
    class="-mx-4 lg:mx-0 p-4 2xl:p-6 flex-col lg:flex-row flex lg:items-center gap-4 bg-secondary"
  >
    <div class="text-white flex flex-col flex-1 gap-[2px]">
      <span v-if="price" class="2xl:text-[28px] leading-[120%]"
        >USD {{ Number(price).toLocaleString() }}</span
      >
      <span v-else class="2xl:text-[28px] leading-[120%]">0</span>
      <span class="2xl:text-[14px] leading-[150%]">Investment price</span>
    </div>
    <NuxtLink
      to="/invest"
    > <AppButton size="lg" class="w-full !max-w-full lg:!max-w-fit">
      Invest in this watch
    </AppButton>
    </NuxtLink
    >

  </div>
</template>

<script setup lang="ts">
import AppButton from "./AppButton.vue";
defineProps<{
  price: number;
}>();
</script>

<style scoped></style>
