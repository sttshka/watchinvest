<template>
  <div
    class="flex flex-col border-b-[1px] border-gray-1 border-opacity-[0.08] w-full"
  >
    <div
      class="text-white p-3 flex items-center justify-between px-6 py-[16px] border-b-[1px] border-gray-1 border-opacity-[0.08]"
      :class="{
        'bg-gray-1 bg-opacity-[0.08]': modelValue,
      }"
      @click="emit('update:modelValue', !modelValue)"
    >
      <slot name="trigger" />

      <div class="w-6 h-6">
        <IconChevron
          class="h-[20px] w-[20px] text-white transition-transform"
          :class="{
            'rotate-180': modelValue,
          }"
        />
      </div>
    </div>
    <Transition>
      <div v-if="modelValue">
        <div class="w-full bg-gray-1 bg-opacity-[0.08]">
          <slot name="content" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import IconChevron from "./icons/IconChevron.vue";

defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
