<template>
  <h2
    v-motion
    :initial="initial"
    :visibleOnce="visibleOnce"
    class="font-serif text-[32px] xl:text-[60px] 2xl:text-[64px] text-center mb-4 xl:mb-12 2xl:mb-14 !leading-[120%] m-0 opacity-0"
  >
    {{ title }}
  </h2>
</template>

<script setup lang="ts">
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
    duration: 300,
    delay: 100,
  },
};
</script>

<style scoped></style>
