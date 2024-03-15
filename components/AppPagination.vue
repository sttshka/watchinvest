<template>
  <div class="flex justify-center items-center gap-2">
    <button
      :disabled="!canGoFirstOrPrev"
      @click="onClickPrev"
      :class="{
        'bg-gray-1 h-8 w-8 flex items-center justify-center': substrate,
      }"
    >
      <IconChevron
        class="h-[20px] w-[20px] rotate-90 cursor-pointer hover:text-primary transition-colors duration-300 select-none"
        :class="{
          'cursor-not-allowed text-gray-text hover:text-gray-text':
            !canGoFirstOrPrev,
        }"
      />
    </button>

    <button
      v-for="(page, index) of displayedPages"
      :key="`${page}-${index}`"
      class="h-8 w-8 flex items-center justify-center !leading-[150%] text-secondary hover:bg-gray-2 hover:bg-opacity-50 cursor-pointer transition-all duration-300 select-none"
      :class="{
        '!bg-primary !text-white': currentPage === page,
        'bg-gray-1 h-8 w-8 flex items-center justify-center': substrate,
      }"
      @click="() => onClickPage(page)"
    >
      {{ page }}
    </button>

    <button
      :disabled="!canGoLastOrNext"
      @click="onClickNext"
      :class="{
        'bg-gray-1 h-8 w-8 flex items-center justify-center': substrate,
      }"
    >
      <IconChevron
        class="h-[20px] w-[20px] -rotate-90 cursor-pointer hover:text-primary transition-colors duration-300 select-none"
        :class="{
          'cursor-not-allowed text-gray-text hover:text-gray-text':
            !canGoLastOrNext,
        }"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconChevron from "./icons/IconChevron.vue";

const props = defineProps<{
  modelValue: number;
  total: number;
  max: number;
  pageCount: number;
  divider: "…";
  substrate?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const currentPage = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const pages = computed(() =>
  Array.from(
    { length: Math.ceil(props.total / props.pageCount) },
    (_, i) => i + 1
  )
);

const displayedPages = computed(() => {
  const totalPages = pages.value.length;
  const current = currentPage.value;
  const maxDisplayedPages = Math.max(props.max, 5);

  const r = Math.floor((Math.min(maxDisplayedPages, totalPages) - 5) / 2);
  const r1 = current - r;
  const r2 = current + r;

  const beforeWrapped = r1 - 1 > 1;
  const afterWrapped = r2 + 1 < totalPages;

  const items: Array<number | string> = [];

  if (totalPages <= maxDisplayedPages) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
    return items;
  }

  items.push(1);

  if (beforeWrapped) items.push(props.divider);

  if (!afterWrapped) {
    const addedItems = current + r + 2 - totalPages;
    for (let i = current - r - addedItems; i <= current - r - 1; i++) {
      items.push(i);
    }
  }

  for (let i = Math.max(2, r1); i <= Math.min(totalPages, r2); i++) {
    items.push(i);
  }

  if (!beforeWrapped) {
    const addedItems = 1 - (current - r - 2);
    for (let i = current + r + 1; i <= current + r + addedItems; i++) {
      items.push(i);
    }
  }

  if (afterWrapped) items.push(props.divider);

  if (r2 < totalPages) {
    items.push(totalPages);
  }

  // Replace divider by number on start edge case [1, '…', 3, ...]
  if (items.length >= 3 && items[1] === props.divider && items[2] === 3) {
    items[1] = 2;
  }

  // Replace divider by number on end edge case [..., 48, '…', 50]
  if (
    items.length >= 3 &&
    items[items.length - 2] === props.divider &&
    items[items.length - 1] === items.length
  ) {
    items[items.length - 2] = items.length - 1;
  }

  return items;
});

const canGoFirstOrPrev = computed(() => currentPage.value > 1);
const canGoLastOrNext = computed(() => currentPage.value < pages.value.length);

function onClickFirst() {
  if (!canGoFirstOrPrev.value) {
    return;
  }

  currentPage.value = 1;
}

function onClickLast() {
  if (!canGoLastOrNext.value) {
    return;
  }

  currentPage.value = pages.value.length;
}

function onClickPage(page: number | string) {
  if (typeof page === "string") {
    return;
  }

  currentPage.value = page;
}

function onClickPrev() {
  if (!canGoFirstOrPrev.value) {
    return;
  }

  currentPage.value--;
}

function onClickNext() {
  if (!canGoLastOrNext.value) {
    return;
  }

  currentPage.value++;
}
</script>

<style scoped></style>
