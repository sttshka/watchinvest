<template>
  <Transition>
    <div v-if="selectedItems.length">
      <div class="flex gap-1 items-center flex-wrap">
        <AppSearchbarFilterItem
          v-for="item in selectedItems"
          @click="searchStore.handleRemove(item.filterType, item)"
        >
          <div
            v-if="
              item.filterType === FilterType.priceGte ||
              item.filterType === FilterType.priceLte
            "
            class="flex items-center gap-1"
          >
            <span>{{ item.title }}</span>
            <span>{{ item.value }}</span>
          </div>
          <template v-else class="flex-nowrap whitespace-nowrap">
            {{ item.title }}
          </template>
        </AppSearchbarFilterItem>
        <AppSearchbarFilterItem
          :outline="true"
          @click="searchStore.handleRemoveAll()"
        >
          Clear All
        </AppSearchbarFilterItem>
      </div>

      <!-- <pre>items:{{ items }}</pre> -->
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { FilterType, IFilter } from "~/types";
import AppSearchbarFilterItem from "./AppSearchbarFilterItem.vue";

const searchStore = useNewSearchStore();
const selectedItems = computed(() => {
  const list = [];
  Object.entries(searchStore.selectedFiltersMap).forEach(([key, value]) => {
    const items = Object.values(value).map((i) => ({
      filterType: key,
      code: i.code,
      value: i.value,
      title: i.title,
    }));
    list.push(...items);
  });

  return list;
});
</script>

<style scoped></style>
