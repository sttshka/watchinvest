<template>
  <button
    class="flex gap-1 items-center px-2 py-1 cursor-pointer border-none lg:text-[14px] xl:text-[15px] 2xl:text-base !leading-[150%]"
    :class="outline ? ' bg-gray-1 text-gray-text' : 'bg-primary text-white'"
  >
    <slot />
    <IconClose class="w-4 h-4" />
  </button>
</template>

<script setup lang="ts">
import IconClose from "./icons/IconClose.vue";

defineProps<{
  outline?: boolean;
}>();
</script>

<style scoped></style>
