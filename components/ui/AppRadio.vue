<template>
  <div
    class="flex items-center gap-2 cursor-pointer"
    :class="{
      '!cursor-default': modelValue,
    }"
    @click="emit('update:modelValue', true)"
  >
    <div
      class="w-6 h-6 bg-gray-1 rounded-full flex items-center justify-center"
      :class="{
        'bg-primary': modelValue,
      }"
    >
      <Transition>
        <div
          class="w-[14px] h-[14px] bg-white rounded-full"
          v-if="modelValue"
        ></div>
      </Transition>
    </div>
    <div class="text-[14px]">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  modelValue: boolean;
}>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>

<style scoped></style>
