<template>
  <div class="relative" ref="tooltip">
    <div @click="handleToggle">
      <slot name="trigger" />
    </div>
    <Transition>
      <template v-if="modelValue">
        <div
          class="absolute z-30"
          :class="{
            'right-0 top-full': removeStyles,
            'flex flex-col py-2 bg-white top-[calc(100%+6px)] left-0 right-0 w-full min-w-min text-secondary text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%] border-[1px] border-gray-1 shadow-expand':
              !removeStyles,
          }"
        >
          <slot name="content" />
          <div
            v-if="!removeStyles"
            class="absolute bottom-[calc(100%-6px)] left-0 right-0 flex justify-center z-0"
          >
            <div class="h-3 w-3 bg-white rotate-45"></div>
          </div>
        </div>
      </template>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

enum TooltipTypes {
  click = "click",
  hover = "hover",
}
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    type: TooltipTypes;
    removeStyles?: boolean;
  }>(),
  {
    type: TooltipTypes.click,
    removeStyles: false,
  }
);

const emit = defineEmits(["update:modelValue"]);

const tooltip = ref();

onClickOutside(tooltip, () => {
  emit("update:modelValue", false);
});

function handleToggle() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<style scoped></style>
