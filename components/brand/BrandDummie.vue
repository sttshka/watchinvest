<template>
  <div
    class="h-[100px] lg:h-[180px] w-full bg-white xl:p-8 2xl:p-10 flex items-center justify-center"
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
