<template>
  <template v-if="error">
    <div
      class="min-h-screen text-red text-[32px] flex justify-center items-center"
    >
      Error
    </div>
  </template>

  <div v-else class="overflow-hidden min-h-screen bg-gray-1 pb-10">
    <InnerPageHeader>
      <AppBreadcrumbs :items="breadcrumbs" />
      <div
        v-if="brand"
        class="text-white text-[32px] md:text-[40px] lg:text-[48px] xl:text-[60px] 2xl:text-[64px] !leading-[120%] font-serif"
      >
        {{ brand.title_en }}
      </div>
    </InnerPageHeader>
    <div class="adaptive-container z-10 px-4 lg:px-0">
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
          v-if="!searchStore.isError && brandProducts.length"
          v-model="searchStore.pagination.page"
          :page-count="searchStore.pagination.limit"
          :total="searchStore.pagination.total"
          :divider="'…'"
          class="hidden lg:flex"
        />

        <ProductList
          :list="brandProducts"
          :loading="searchStore.isListLoading"
          :error="searchStore.isError"
          class="my-3 xl:my-8"
        />

        <div
          class="flex justify-center items-center mb-3 xl:mb-8"
          v-if="!searchStore.isError && brandProducts.length"
        >
          <AppButton size="md" class="min-w-[472px]">Show more</AppButton>
        </div>

        <AppPagination
          v-if="!searchStore.isError && brandProducts.length"
          v-model="searchStore.pagination.page"
          :page-count="searchStore.pagination.limit"
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
import ProductList from "~/components/product/ProductList.vue";
import { Entity, FilterType, IBrand, IWatch } from "~/types";

const route = useRoute();
const breadcrumbs = ref([{ title: "Brands", to: "/brands" }]);
const { id } = route.params;

const searchStore = useNewSearchStore();
const { data, error, pending } = await searchStore.loadProduct<IBrand>(
  Entity.brands,
  id as string
);
const brand = computed(() => data.value?.data as IBrand);
const { items: brandProducts } = await searchStore.loadProducts<IWatch>(
  Entity.watches,
  false,
  {
    [FilterType.brand]: id,
  }
);

modifyBreadcrumbs();

function modifyBreadcrumbs() {
  if (brand.value) {
    const newCrumbs = [
      {
        title: brand.value.title_en,
        to: `/brands/${brand.value.id}`,
      },
    ];

    breadcrumbs.value.push(...newCrumbs);
  }
}
</script>

<style></style>
