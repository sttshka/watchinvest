<template>
  <h2
    v-motion
    :initial="initial"
    :visibleOnce="visibleOnce"
    class="flex justify-center items-center font-sans uppercase text-primary text-[14px] xl:text-[15px] 2x:text-base lg:text-base text-center mb-4 gap-3 !leading-[120%] tracking-[0.64px]"
  >
    <IconStar class="w-[22px] h-[22px]" />
    <span>{{ title }}</span>
    <IconStar class="w-[22px] h-[22px]" />
  </h2>
</template>

<script setup lang="ts">
import IconStar from "./icons/IconStar.vue";

defineProps<{
  title: string;
}>();

// motion
const initial = {
  opacity: 0,
  y: 100,
};
const visibleOnce = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 500,
  },
};
</script>

<style scoped></style>
