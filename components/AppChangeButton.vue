<template>
  <div class="flex items-center gap-2">
    <div class="font-medium" v-if="mode === 'view'">{{ modelValue }}</div>
    <div class="font-medium" v-if="mode === 'edit'">
      <input
        ref="input"
        type="number"
        inputmode="numeric"
        pattern="\d*"
        class="bg-gray-1 pl-2 pr-1 py-1 -my-1 max-w-[100px] outline-none"
        v-model.number="localValue"
      />
    </div>

    <button
      v-if="mode === 'view'"
      class="flex items-center gap-1"
      @click="toggleMode('edit')"
    >
      <IconEdit class="h-4 w-4" />
      <span class="text-[14px] !leading-[150%] underline">Change</span>
    </button>
    <button
      v-if="mode === 'edit'"
      class="flex items-center gap-1"
      @click="toggleMode('view')"
    >
      <span class="text-[14px] !leading-[150%] underline">Save</span>
    </button>
    <button
      v-if="mode === 'edit'"
      class="flex items-center gap-1"
      @click="mode = 'view'"
    >
      <span class="text-[14px] !leading-[150%] underline">Cancel</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";
import IconEdit from "~/components/icons/IconEdit.vue";
import IconClose from "./icons/IconClose.vue";
const props = defineProps<{
  modelValue: string | number;
}>();

const emit = defineEmits<{
  "update:modelValue": [string | number];
}>();

const mode = ref<"edit" | "view">("view");
const input = ref<HTMLInputElement | null>(null);
const localValue = ref<string | number>(props.modelValue);

const { enter, escape } = useMagicKeys();
watch(enter, (v) => {
  if (v) {
    handleSave();
  }
});
watch(escape, (v) => {
  if (v) {
    mode.value = "view";
  }
});

function toggleMode(modeValue: "edit" | "view") {
  if (modeValue === "edit") {
    localValue.value = props.modelValue;
    mode.value = modeValue;
  }
  if (modeValue === "view") {
    handleSave();
  }
}
function handleSave() {
  if (localValue.value !== props.modelValue) {
    emit("update:modelValue", localValue.value);
  }
  mode.value = "view";
}
</script>

<style scoped></style>
