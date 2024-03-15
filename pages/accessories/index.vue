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
          v-if="!searchStore.isError && accessories.length"
          v-model="searchStore.pagination.page"
          :page-count="
            accessories.length < searchStore.pagination.limit &&
            accessories.length % 8 !== 0
              ? searchStore.pagination.limit
              : accessories.length
          "
          :total="searchStore.pagination.total"
          :divider="'…'"
          class="hidden lg:flex"
        />

        <AccessoriesList
          :entity="Entity.accessories"
          :list="accessories"
          :loading="searchStore.isListLoading"
          :error="searchStore.isError"
          class="mt-3 mb-3 xl:my-8"
        />

        <div
          class="flex justify-center items-center mb-3 xl:mb-8"
          v-if="
            !searchStore.isError &&
            accessories.length &&
            accessories.length % 4 === 0
          "
        >
          <AppButton size="md" class="min-w-[472px]">Show more</AppButton>
        </div>

        <AppPagination
          v-if="!searchStore.isError && accessories.length"
          v-model="searchStore.pagination.page"
          :page-count="
            accessories.length < searchStore.pagination.limit &&
            accessories.length % 8 !== 0
              ? searchStore.pagination.limit
              : accessories.length
          "
          :total="searchStore.pagination.total"
          :divider="'…'"
          class="hidden lg:flex"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from "~/components/AppButton.vue";
import AppPagination from "~/components/AppPagination.vue";
import AccessoriesList from "~/components/accessories/AccessoriesList.vue";
import AppBreadcrumbs from "~/components/AppBreadcrumbs.vue";
import AppSearch from "~/components/AppSearch.vue";
import { IFilter, FilterType, Handbook, Entity, IAccessory } from "~/types";
import AppSort from "~/components/AppSort.vue";

const route = useRoute();
const router = useRouter();

const breadcrumbs = ref([{ title: "Catalog", to: "/jewelry" }]);

const filters = ref<IFilter[]>([
  {
    title: "Brand",
    type: FilterType.brand,
    items: [],
    handbook: Handbook.brands,
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
    type: FilterType.type,
    items: [],
    handbook: Handbook.accessories_types,
  },
]);

const searchStore = useNewSearchStore();

const accessories = ref<IAccessory[]>([]);
await handleSearch(true);
async function handleSearch(isInit = false) {
  const { items } = await searchStore.loadProducts<IAccessory>(
    Entity.accessories,
    isInit
  );
  if (items) {
    accessories.value = items;
  }
}

// Pagination
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

<style scoped></style>
