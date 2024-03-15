<template>
  <div
    class="flex items-center justify-center h-full w-full text-gray-1 border-[1px] border-gray-1 rounded-full hover:bg-secondary-hover transition-colors cursor-pointer bg-secondary bg-opacity-[0.8] backdrop-blur-[8px] p-[14px]"
  >
    <IconArrow
      class="w-[32px] h-[32px] lg:w-1/2 lg:h-1/2"
      :class="{
        'rotate-[0deg]': props.direction === Direction.right,
        'rotate-[180deg]': props.direction === Direction.left,
        'rotate-[-90deg]': props.direction === Direction.up,
        'rotate-[90deg]': props.direction === Direction.down,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import IconArrow from "~/components/icons/IconArrow.vue";

enum Direction {
  left = "left",
  right = "right",
  up = "up",
  down = "down",
}

const props = withDefaults(
  defineProps<{
    direction: Direction;
  }>(),
  {
    direction: Direction.right,
  }
);
</script>

<style scoped></style>
