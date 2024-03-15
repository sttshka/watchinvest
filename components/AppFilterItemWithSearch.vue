<template>
  <div class="bg-white w-full border-[1px] border-gray-1 flex flex-col">
    <div
      class="h-[36px] w-full p-2 flex gap-2 text-gray-text border-b-[1px] border-gray-1"
    >
      <IconSearch class="h-[20px] w-[20px]" />
      <input
        v-model="searchString"
        placeholder="Search"
        class="flex h-full w-full outline-none selection:bg-primary selection:text-white"
        type="text"
      />
    </div>
    <div
      class="w-full flex flex-col p-3 gap-3 max-h-[200px] overflow-y-auto overflow-x-hidden"
    >
      <template v-if="filter.type === FilterType.brandType">
        <AppCheckbox
          v-for="item in filteredFilterItems"
          :modelValue="searchStore.checkIsSelected(filter, item)"
          @update:modelValue="searchStore.handleSelect(filter, item, $event)"
        >
          {{ item.title }}
        </AppCheckbox>
      </template>
      <template v-else-if="filter.handbook">
        <AppCheckbox
          v-for="item in filteredHandbookItems"
          :modelValue="
            searchStore.checkIsSelected(filter, {
              title:
                filter.handbook === Handbook.brands ||
                filter.handbook === Handbook.collections
                  ? item.title_en
                  : item.value_en,
              code: item.id,
              value: item.id,
            })
          "
          @update:modelValue="
            searchStore.handleSelect(
              filter,
              {
                title:
                  filter.handbook === Handbook.brands ||
                  filter.handbook === Handbook.collections
                    ? item.title.value_en || item.title
                    : item.value_en,
                code: item.id,
                value: item.id,
              },
              $event
            )
          "
        >
          <template v-if="filter.handbook === Handbook.brands">
            {{ item.title }}
          </template>
          <template v-else-if="item.value_en">
            {{ item.value_en }}
          </template>
          <template v-else>
            {{ getHandbookItemTitle(item) }}
          </template>
        </AppCheckbox>
      </template>
      <template v-else>
        <AppCheckbox
          v-for="item in filteredFilterItems"
          :modelValue="searchStore.checkIsSelected(filter, item)"
          @update:modelValue="searchStore.handleSelect(filter, item, $event)"
        >
          {{ item.title }}
        </AppCheckbox>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconSearch from "./icons/IconSearch.vue";
import AppCheckbox from "./AppCheckbox.vue";
import { IFilter, Handbook, FilterType } from "~/types";

const props = defineProps<{
  filter: IFilter;
}>();

const searchStore = useNewSearchStore();
const pageStore = usePageStore();
const searchString = ref("");

const filteredHandbookItems = computed(() => {
  const name = props.filter.handbook === "brands" ? "title_en" : "name_en";
  return searchStore
    .getHandbookItems(props.filter.handbook as Handbook)
    .filter((item) =>
      name.toLocaleLowerCase().includes(searchString.value.toLocaleLowerCase())
    );
});
const filteredFilterItems = computed(() => {
  return props.filter.items.filter((item) =>
    item.title
      .toLocaleLowerCase()
      .includes(searchString.value.toLocaleLowerCase())
  );
});

const getHandbookItemTitle = (item) => {
  const languageSlug = pageStore.currentLanguage.slug;
  return item.title[`value_${languageSlug}`];
};
</script>

<style scoped></style>
