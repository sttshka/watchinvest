<template>
  <div class="overflow-hidden min-h-screen bg-gray-1 pb-10">
    <InnerPageHeader>
      <AppBreadcrumbs :items="breadcrumbs" />
    </InnerPageHeader>
    <div class="adaptive-container lg:-mt-8 xl:-mt-10 relative z-10">
      <AppSearch @search="handleSearch" :filters="filters" />
      <div class="px-4 lg:px-0 flex items-center justify-between">
        <div class="text-gray-text text-base !leading-[150%] my-6">
          Showing {{ searchStore.pagination.total }} item
        </div>
        <AppSort />
      </div>
    </div>

    <div class="bg-gray-1 px-4 lg:px-0">
      <div class="w-full adaptive-container">
        <AppPagination
          v-if="!searchStore.isError && brands.length"
          v-model="searchStore.pagination.page"
          :page-count="
            brands.length < searchStore.pagination.limit &&
            brands.length % 8 !== 0
              ? searchStore.pagination.limit
              : brands.length
          "
          :total="searchStore.pagination.total"
          :divider="'…'"
          class="hidden lg:flex"
        />
        <BrandsList
          :list="brands"
          :loading="searchStore.isListLoading"
          :error="searchStore.isError"
          class="mt-3 xl:mt-8 mb-3 xl:mb-8"
        />

        <div
          class="flex justify-center items-center mb-3 xl:mb-8"
          v-if="
            !searchStore.isError && brands.length && brands.length % 4 === 0
          "
        >
          <AppButton size="md" class="min-w-[472px]">Show more</AppButton>
        </div>
        <AppPagination
          v-if="!searchStore.isError && brands.length"
          v-model="searchStore.pagination.page"
          :page-count="
            brands.length < searchStore.pagination.limit &&
            brands.length % 8 !== 0
              ? searchStore.pagination.limit
              : brands.length
          "
          :total="searchStore.pagination.total"
          :divider="'…'"
          class="hidden lg:flex"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppBreadcrumbs from "~/components/AppBreadcrumbs.vue";
import AppSort from "~/components/AppSort.vue";
import AppSearch from "~/components/AppSearch.vue";

import BrandsList from "~/components/brand/BrandsList.vue";
import { Entity, Handbook } from "~/types";
import { FilterType, IFilter, IBrand } from "~/types";

const route = useRoute();
const router = useRouter();

const filters = ref<IFilter[]>([
  {
    title: "Type",
    type: FilterType.brandType,
    items: [
      {
        title: "Watches",
        value: FilterType.isWatches,
        code: FilterType.brandType,
      },
      {
        title: "Jewelry",
        value: FilterType.isJewelry,
        code: FilterType.brandType,
      },
      {
        title: "Accessories",
        value: FilterType.isAccessories,
        code: FilterType.brandType,
      },
    ],
  },
]);

const searchStore = useNewSearchStore();
const brands = ref<IBrand[]>([]);
await handleSearch(true);
searchStore.initFiltersFromUrl();

async function handleSearch(isInit = false) {
  const extQuery = Object.entries(route.query).length
    ? {}
    : {
        [FilterType.isWatches]: true,
      };

  brands.value = [];
  const { items } = await searchStore.loadProducts<IBrand>(
    Entity.brands,
    isInit,
    extQuery
  );
  if (items) {
    brands.value = items;
  }
}

const breadcrumbs = ref([{ title: "Brands", to: "/brands" }]);

searchStore.pagination.page = +route.query.page || 1;

watch(
  searchStore.pagination,
  async (currentValue, previousValue) => {
    const page = currentValue.page;

    router.push({ query: { ...route.query, page } });

    await handleSearch();
  },
  {
    immediate: false,
  }
);
</script>

<style></style>
