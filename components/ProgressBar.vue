<template>
  <div
    class="w-full h-[10px] bg-primary bg-opacity-[0.16] relative overflow-hidden"
  >
    <div class="absolute h-full pattern w-1/2" :class="progressClass"></div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ value: number }>(), {
  value: 0,
});

const progressClass = computed(() => {
  return `!w-[${props.value}%]`;
});
</script>

<style>
.pattern {
  background-color: #ab8330;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='https://www.w3.org/2000/svg'%3E%3Cg fill='%23bd9542' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
