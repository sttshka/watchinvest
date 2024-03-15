<template>
  <div class="flex flex-col">
    <div
      class="h-[34px] w-full p-2 flex gap-2 text-gray-text border-b-[1px] border-gray-1"
    >
      <IconSearch class="h-4 w-4" />
      <input
        placeholder="Search"
        class="flex h-full w-full outline-none selection:bg-primary selection:text-white"
        type="text"
      />
    </div>
    <div class="w-full flex flex-col p-3 gap-3">
      <AppCheckbox
        v-for="item in filter.items"
        :modelValue="searchStore.checkIsSelected(filter, item)"
        @update:modelValue="searchStore.handleSelect(filter, item, $event)"
      >
        {{ item.title }}
      </AppCheckbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconSearch from "./icons/IconSearch.vue";
import AppCheckbox from "./AppCheckbox.vue";
import { IFilter } from "~/types";

const searchStore = useNewSearchStore();

defineProps<{
  filter: IFilter;
}>();
</script>

<style scoped></style>
