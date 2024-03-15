<template>
  <div class="flex flex-col border-b-[1px] border-gray-1 bg-white">
    <div
      class="p-3 flex items-center justify-between"
      :class="{
        'bg-gray-1': isOpen,
      }"
      @click="isOpen = !isOpen"
    >
      <div>{{ filter.title }}</div>

      <div class="w-6 h-6">
        <div
          class="bg-primary rounded-full w-6 h-6 flex justify-center items-center"
          v-if="selectedFiltersLength > 0"
        >
          <span class="text-white text-[14px] !leading-[140%] mt-1">{{
            selectedFiltersLength
          }}</span>
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
    <div v-if="isOpen">
      <component :is="getFilterComponent(filter)" :filter="filter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterType, IFilter } from "~/types";
import IconChevron from "./icons/IconChevron.vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps<{
  filter: IFilter;
}>();

const searchStore = useNewSearchStore();
const selectedFilters = computed(() =>
  searchStore.getSelectedFilterItems(props.filter)
);
const selectedFiltersLength = computed(
  () => Object.values(selectedFilters.value).length
);

const isOpen = ref(false);
const el = ref();
onClickOutside(el, () => {
  isOpen.value = false;
});

const CostMobileFilter = resolveComponent("AppCostMobileFilter");
const GenderMobileFilter = resolveComponent("AppGenderMobileFilter");
const ConditionMobileFilter = resolveComponent("AppConditionMobileFilter");

const getFilterComponent = (filter: IFilter) => {
  switch (filter.type) {
    case FilterType.cost:
      return CostMobileFilter;
    case FilterType.gender:
      return GenderMobileFilter;
    case FilterType.condition:
      return ConditionMobileFilter;
  }
  return "div";
};
</script>

<style scoped></style>
