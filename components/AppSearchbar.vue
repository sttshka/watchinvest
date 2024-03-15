<template>
  <div class="hidden lg:flex bg-white p-2 flex-col gap-2">
    <!-- <pre>{{ searchStore.selectedFiltersMap }}</pre> -->
    <!-- <pre>{{ searchStore.handbooks }}</pre> -->

    <div class="flex lg:h-12 xl:h-16">
      <!-- search field -->
      <div
        class="p-[1px] bg-gray-1 w-full flex-1"
        :class="{
          'h-full': filters.length === 0,
          'lg:w-[160px] xl:w-[223px] 2xl:w-[335px]': filters.length > 0,
        }"
      >
        <div class="h-full flex items-center text-gray-text bg-white relative">
          <IconSearch class="ml-4 !h-6 !w-6" />
          <input
            v-model="searchValue"
            @submit.prevent="handleSearch"
            class="absolute left-0 pl-[58px] flex flex-1 h-full w-full lg:text-[12px] xl:text-[15px] 2xl:text-base placeholder:text-gray-text lg:placeholder:text-[12px] xl:placeholder:text-[15px] 2xl:placeholder:text-base outline-none bg-transparent"
            placeholder="Reference or name"
          />
        </div>
      </div>
      <!-- filters -->
      <div class="flex items-center h-full">
        <AppSearchbarFilterDropdown
          :filter="filter"
          v-for="filter in filters"
        />
      </div>
      <!-- apply filter button -->
      <div class="border-y-[1px] border-r-[1px] border-gray-1">
        <AppButton
          size="lg"
          class="px-[16px] xl:px-4 2xl:px-10 !h-full"
          @click="handleSearch"
        >
          Search
        </AppButton>
      </div>
    </div>

    <AppSearchbarFilter :filters="filters" />
  </div>

  <div class="flex lg:hidden bg-white p-4 flex-1">
    <div class="flex flex-1 h-[45px] p-[1px] bg-gray-1">
      <div
        class="text-gray-text flex items-center gap-2 h-full w-full bg-white p-3"
      >
        <IconSearch class="!h-6 !w-6" />
        <input
          class="flex flex-1 placeholder:text-gray-text lg:placeholder:text-[12px] xl:placeholder:text-[15px] 2xl:placeholder:text-base outline-none lg:h-[20px] xl:h-[23px] 2xl:h-6 w-full"
          placeholder="Reference or name"
        />
      </div>
    </div>
    <div class="flex h-[45px]">
      <div class="py-[1px] bg-gray-1 flex">
        <AppButton class="h-full text-[14px] px-[24px] flex-1"
          >Search</AppButton
        >
      </div>
      <div class="p-[1px] bg-gray-1 flex items-center justify-center relative">
        <AppButton
          class="h-full text-[14px] !p-[12.5px]"
          @click="pageStore.toggleMobileFilter()"
        >
          <IconFilter class="h-[20px] w-[20px]" />

          <div
            v-if="selectedItems.length"
            class="absolute h-[6px] w-[6px] bg-current rounded-full top-[6px] right-[6px]"
          />
        </AppButton>
      </div>
    </div>
  </div>

  <ClientOnly>
    <Teleport to="body">
      <AppMobileFilter :filters="filters" />
    </Teleport>
  </ClientOnly>
</template>

<script lang="ts" setup>
import IconSearch from "./icons/IconSearch.vue";
import IconFilter from "./icons/IconFilter.vue";
import AppButton from "./AppButton.vue";
import { IFilter } from "~/types";
import AppSearchbarFilter from "./AppSearchbarFilter.vue";
import AppSearchbarFilterDropdown from "./AppSearchbarFilterDropdown.vue";
import AppMobileFilter from "./AppMobileFilter.vue";

const props = withDefaults(
  defineProps<{
    filters: IFilter[];
  }>(),
  {
    filters: () => [],
  }
);

const emit = defineEmits<{
  search: [];
}>();

const route = useRoute();
const router = useRouter();
const pageStore = usePageStore();
const searchStore = useNewSearchStore();
searchStore.filters = props.filters;
// searchStore.initFiltersFromUrl();

const selectedItems = computed(() => {
  const map = new Map();
  Object.entries(searchStore.selectedFiltersMap).forEach(([key, value]) => {
    map.set(key, value);
  });
  return Array.from(map);
});

const searchValue = ref<string>(route.query.q as string);

watch(
  searchStore.selectedFiltersMap,
  (currentValue, previousValue) => {
    const newQuery = ref<Record<string, string>>({});

    Object.entries(currentValue).forEach(([key, value]) => {
      newQuery.value[key] = Object.keys(value).join(",");
    });
    if (searchValue.value) {
      newQuery.value.q = searchValue.value;
    }

    router.push({ query: { ...newQuery.value } });
  },
  {
    immediate: false,
    deep: true,
  }
);

watch(searchValue, (currentValue, previousValue) => {
  if (currentValue !== previousValue) {
    router.push({ query: { ...route.query, q: currentValue } });
  }
  if (currentValue === "") {
    const newQuery = { ...route.query };
    delete newQuery.q;
    router.push(newQuery);
  }
});

async function handleSearch() {
  emit("search");
}
</script>

<style></style>
