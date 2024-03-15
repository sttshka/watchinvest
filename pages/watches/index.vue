<template>
  <div class="overflow-hidden min-h-screen h-full bg-gray-1 pb-10">
    <InnerPageHeader>
      <AppBreadcrumbs :items="breadcrumbs" />
    </InnerPageHeader>
    <div class="adaptive-container lg:-mt-8 xl:-mt-10 relative z-10">
      <AppSearch @search="handleSearch" :filters="filters" />
      <div class="px-4 lg:px-0 flex items-center justify-between">
        <div class="text-gray-text text-base !leading-[150%] my-6">
          Showing {{ watches.length }} item
        </div>
        <AppSort />
      </div>
    </div>
    <div class="bg-gray-1 px-4 lg:px-0">
      <div class="w-full adaptive-container">
        <AppPagination
          v-if="!searchStore.isError && watches.length"
          v-model="searchStore.pagination.page"
          :page-count="
            watches.length < searchStore.pagination.limit &&
            watches.length % 8 !== 0
              ? searchStore.pagination.limit
              : watches.length
          "
          :total="searchStore.pagination.total"
          :divider="'…'"
          :max="7"
          class="hidden lg:flex"
        />

        <ProductList
          :entity="Entity.watches"
          :list="watches"
          :loading="searchStore.isListLoading"
          :error="searchStore.isError"
          class="mt-3 mb-3 xl:my-8"
        />

        <div
          class="flex justify-center items-center mb-3 xl:mb-8"
          v-if="
            !searchStore.isError && watches.length && watches.length % 4 === 0
          "
        >
          <AppButton size="md" class="min-w-[472px]" @click="handleLoadMore"
            >Show more</AppButton
          >
        </div>

        <AppPagination
          v-if="!searchStore.isError && watches.length"
          v-model="searchStore.pagination.page"
          :page-count="
            watches.length < searchStore.pagination.limit &&
            watches.length % 8 !== 0
              ? searchStore.pagination.limit
              : watches.length
          "
          :total="searchStore.pagination.total"
          :divider="'…'"
          :max="7"
          class="hidden lg:flex"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from "~/components/AppButton.vue";
import AppPagination from "~/components/AppPagination.vue";
import ProductList from "~/components/product/ProductList.vue";
import AppBreadcrumbs from "~/components/AppBreadcrumbs.vue";
import AppSearch from "~/components/AppSearch.vue";
import { IFilter, FilterType, Handbook, Entity } from "~/types";
import AppSort from "~/components/AppSort.vue";
import { Condition } from "~/types/filter";
import { IWatch } from "~/types";
const searchStore = useNewSearchStore();

const breadcrumbs = ref([{ title: "Catalog", to: "/watches" }]);

const filters = ref<IFilter[]>([
  {
    title: "Brand",
    type: FilterType.brand,
    items: [],
    handbook: Handbook.brands,
  },
  {
    title: "Collection",
    type: FilterType.collection,
    items: [],
    handbook: Handbook.collections,
  },
  {
    title: "Cost",
    type: FilterType.cost,
    items: [
      {
        title: "From",
        value: "from",
        code: FilterType.priceGte,
      },
      {
        title: "To",
        value: "to",
        code: FilterType.priceLte,
      },
    ],
  },
  {
    title: "Equipment",
    type: FilterType.equipment,
    items: [],
    handbook: Handbook.watch_completeness,
  },
  {
    title: "Gender",
    type: FilterType.gender,
    items: [
      { title: "Man", value: "man", code: FilterType.gender },
      { title: "Woman", value: "woman", code: FilterType.gender },
      { title: "Unisex", value: "unisex", code: FilterType.gender },
    ],
  },
  {
    title: "Type",
    type: FilterType.mechanismType,
    items: [
      {
        title: "Auto winding",
        value: "auto_winding",
        code: FilterType.mechanismType,
      },
      { title: "Quartz", value: "quartz", code: FilterType.mechanismType },
      {
        title: "Mechanical",
        value: "mechanical",
        code: FilterType.mechanismType,
      },
    ],
  },
  {
    title: "Body material",
    type: FilterType.bodyMaterial,
    items: [],
    handbook: Handbook.body_materials,
  },
  {
    title: "Condition",
    type: FilterType.condition,
    handbook: Handbook.watch_condition,
    items: [],
    // items: [
    //   { title: "New", value: Condition.new, code: FilterType.condition },
    //   { title: "Unworn", value: Condition.unworn, code: FilterType.condition },
    //   {
    //     title: "Very good",
    //     value: Condition.very_good,
    //     code: FilterType.condition,
    //   },
    //   { title: "Good", value: Condition.good, code: FilterType.condition },
    //   {
    //     title: "Satisfactory",
    //     value: Condition.satisfactory,
    //     code: FilterType.condition,
    //   },
    //   {
    //     title: "With Flaws",
    //     value: Condition.withFlaws,
    //     code: FilterType.condition,
    //   },
    //   {
    //     title: "Incomplete kit",
    //     value: Condition.incompleteKit,
    //     code: FilterType.condition,
    //   },
    // ],
  },
]);

const watches = ref<IWatch[]>([]);
await handleSearch(true);
searchStore.initFiltersFromUrl();

async function handleSearch(isInit = false) {
  const { items } = await searchStore.loadProducts<IWatch>(
    Entity.watches,
    isInit
  );
  if (items) {
    watches.value = items;
  }
}

async function handleLoadMore() {
  const { items } = await searchStore.loadProducts<IWatch>(
    Entity.watches,
    false,
    {
      page: searchStore.pagination.page + 1,
    }
  );
  if (items) {
    watches.value = [...watches.value, ...items];
  }
}

const router = useRouter();
const route = useRoute();
searchStore.pagination.page = +route.query.page || 1;
// watch(
//   searchStore.pagination,
//   async (currentValue, previousValue) => {
//     const page = currentValue.page;

//     router.push({ query: { ...route.query, page } });

//     await handleSearch();
//   },
//   {
//     immediate: false,
//   }
// );
</script>

<style scoped></style>
