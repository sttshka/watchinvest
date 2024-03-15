<template>
  <Transition>
    <div
      ref="modal"
      v-if="modelValue"
      class="fixed left-0 right-0 bottom-0 top-0 z-[100] flex justify-center items-center bg-secondary bg-opacity-[0.88] w-full px-4 lg:px-0"
    >
      <div
        class="w-full lg:max-w-[392px] 2xl:max-w-[477px] bg-white border-[1px] border-gray-1 p-10 relative"
      >
        <slot />

        <button @click="emit('close')">
          <IconClose class="h-8 w-8 text-gray-text absolute top-4 right-4" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";
import IconClose from "./icons/IconClose.vue";

const emit = defineEmits(["close"]);
defineProps<{
  modelValue: boolean;
}>();

const modal = ref<HTMLElement>();

const { escape } = useMagicKeys();
watch(escape, (v) => {
  if (v) {
    emit("close");
  }
});
</script>

<style scoped></style>
