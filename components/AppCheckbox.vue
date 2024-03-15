<template>
  <label
    class="text-secondary text-[14px] leading-[150%] flex items-center justify-start gap-3 cursor-pointer"
    @click="emit('update:modelValue', !modelValue)"
  >
    <div>
      <IconCheck v-if="modelValue" class="h-6 w-6" />
      <div v-else class="h-6 w-6 bg-gray-1"></div>
    </div>
    <span><slot /></span>
  </label>
</template>

<script setup lang="ts">
import IconCheck from "~/components/icons/IconCheck.vue";
const emit = defineEmits<{
  "update:modelValue": [boolean];
}>();
defineProps<{
  modelValue: boolean;
}>();
</script>

<style scoped></style>
