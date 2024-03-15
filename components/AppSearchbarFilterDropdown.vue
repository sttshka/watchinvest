<template>
  <div class="h-full relative" ref="desctopDropdown">
    <button
      class="cursor-pointer bg-gray-1 py-[1px] pr-[1px] h-full"
      @click="isOpen = !isOpen"
    >
      <div
        class="flex gap-2 items-center justify-center text-secondary bg-white hover:bg-gray-1 h-full lg:px-[6.2px] xl:px-[10.66px] 2xl:px-[15.5px]"
        :class="{
          '!bg-gray-1': isOpen,
        }"
      >
        <div
          class="lg:text-[14px] xl:text-[15px] 2xl:text-base !leading-[150%] truncate flex"
        >
          {{ filter.title }}
        </div>

        <div class="w-6 h-6">
          <div
            class="bg-primary rounded-full flex justify-center items-center mt-[-1px]"
            v-if="selectedFiltersLength > 0"
          >
            <span
              class="text-white w-6 h-6 text-base pt-[2px] !leading-[140%]"
              >{{ selectedFiltersLength }}</span
            >
          </div>
          <IconChevron
            v-else
            class="h-[20px] w-[20px] text-primary transition-transform"
            :class="{
              'rotate-180': isOpen,
            }"
          />
        </div>
      </div>
    </button>
    <Transition>
      <div
        v-if="isOpen"
        class="absolute top-[calc(100%-1px)] left-[-1px] z-10 shadow-expand"
      >
        <component :is="getFilterComponent(filter)" :filter="filter" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { type IFilter, FilterType } from "~/types";
import IconChevron from "./icons/IconChevron.vue";

const props = defineProps<{
  filter: IFilter;
}>();

const isOpen = ref(false);

const desctopDropdown = ref();
onClickOutside(desctopDropdown, () => {
  isOpen.value = false;
});

import CostFilter from "./AppCostFilter.vue";
import AppFilterItemWithSearch from "./AppFilterItemWithSearch.vue";

const getFilterComponent = (filter: IFilter) => {
  return filter.type === FilterType.cost ? CostFilter : AppFilterItemWithSearch;
};

const searchStore = useNewSearchStore();
const selectedFilters = computed(() =>
  searchStore.getSelectedFilterItems(props.filter)
);
const selectedFiltersLength = computed(
  () => Object.values(selectedFilters.value).length
);
</script>

<style scoped></style>
