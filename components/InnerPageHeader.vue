<template>
  <div class="w-full">
    <div
      class="px-4 lg:px-0 pt-[72px] lg:pt-[120px] 2xl:pt-[140px] lg:pb-6 relative"
      :class="transparent ? 'bg-transparent' : 'bg-secondary'"
    >
      <div class="adaptive-container lg:relative">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  transparent?: boolean;
}>();
</script>
