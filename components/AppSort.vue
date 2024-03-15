<template>
  <AppTooltip type="click" v-model="sortTypeTooltipIsOpen">
    <template #trigger>
      <button class="text-gray-text flex gap-1 items-center">
        <IconSort class="h-6 w-6" />
        <div
          class="text-gray-text text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%] flex gap-[2px]"
        >
          <span>Sort by</span>
          <span class="text-secondary underline decoration-dashed">{{
            currentSortType.title
          }}</span>
        </div>
      </button>
    </template>
    <template #content>
      <div
        v-for="sortType in sortTypes"
        class="py-1 px-[20px] cursor-pointer hover:bg-gray-1 transition-colors relative z-10"
        :class="{
          'text-gray-text ': sortType.value === currentSortType.value,
        }"
        @click="handleSelectType(sortType)"
      >
        {{ sortType.title }}
      </div>
    </template>
  </AppTooltip>
</template>

<script setup lang="ts">
import IconSort from "./icons/IconSort.vue";

interface TSortType {
  title: string;
  value: string;
}
const sortTypes = ref<TSortType[]>([
  { title: "Popularity", value: "popularity" },
  { title: "Price", value: "price" },
  { title: "Rating", value: "rating" },
  { title: "Mewness", value: "mewness" },
]);
const currentSortType = ref<TSortType>(sortTypes.value[0]);
const sortTypeTooltipIsOpen = ref<boolean>(false);

function handleSelectType(sortType: TSortType) {
  if (sortType.value !== currentSortType.value.value) {
    currentSortType.value = sortType;
  }
  sortTypeTooltipIsOpen.value = false;
}
</script>

<style scoped></style>
