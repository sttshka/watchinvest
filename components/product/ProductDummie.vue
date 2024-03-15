<template>
  <div
    class="h-full w-full bg-white relative p-3 xl:p-6 2xl:p-9 flex flex-col gap-8 2xl:min-h-[528px]"
    :class="{
      'animate-pulse': isAnimated,
    }"
  ></div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    isAnimated?: boolean;
  }>(),
  {
    isAnimated: false,
  }
);
</script>

<style scoped></style>
