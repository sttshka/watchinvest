<template>
  <div>
    <div
      ref="select"
      :class="[
        'h-16 w-full border-[1px] border-gray-2 px-[20px] py-4 relative transition-colors',
        { 'border-primary': isShowOptions },
      ]"
    >
      <div
        class="absolute bg-white w-fit px-1 -ml-1 -top-3 transition-colors"
        :class="{
          'text-primary': isShowOptions,
        }"
      >
        {{ title ?? "Input" }}
        <span
          v-if="required"
          class="text-red"
        >
          *
        </span>
      </div>

      <div
        class="w-full h-full flex gap-2 items-center justify-between"
        @click="isShowOptions = true"
      >
        <p :class="selectedItem ? '' : 'text-gray-2'">
          {{ selectedItem ? selectedItem.value : "--Nothing selected--" }}
        </p>

        <button
          :class="[
            'w-[24px] h-[24px] transition',
            { 'rotate-180': isShowOptions },
          ]"
          @click.prevent.stop="isShowOptions = !isShowOptions"
        >
          <IconChevron />
        </button>
      </div>

      <div
        v-show="isShowOptions"
        class="absolute top-100 left-0 right-0 top-full z-50 bg-white border-[1px] border-gray-2 mt-1 mh-48 overflow-hidden overflow-y-scroll shadow-md"
      >
        <ul class="py-1">
          <li
            v-for="(item, i) in data"
            :key="i"
            @click="handleClick(item)"
            class="px-3 py-2 cursor-pointer hover:bg-gray-200"
          >
            {{ item.value }}
          </li>

          <li
            v-if="!data.length"
            class="px-3 py-4 cursor-pointer hover:bg-gray-200 text-center"
          >
            No data
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

import IconChevron from "@/components/icons/IconChevron";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Object,
    default: null,
  },
  title: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["select"]);

const select = ref(null);
const isShowOptions = ref(false);

const selectedItem = computed(() => {
  return props.data.find((item) => item.id === props.value?.id);
});

const handleClick = (item) => {
  emits("select", item);
  isShowOptions.value = false;
};

onClickOutside(select, () => {
  isShowOptions.value = false;
});
</script>

<style scoped></style>
