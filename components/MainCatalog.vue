<template>
  <section
    class="w-full adaptive-container py-8 xl:py-14 2xl:py-16 px-4 xl:px-0"
  >
    <AppTitle title="The Best Choice" />
    <ProductList
      :entity="Entity.watches"
      :list="watches"
      :loading="false"
      :error="searchStore.isError"
      class="mt-3 mb-3 xl:my-8"
    />

    <div
      class="flex justify-center mt-4 xl:mt-9 2xl:mt-14 opacity-0"
      v-motion
      :initial="initial"
      :visibleOnce="visibleOnce"
    >
      <AppButton
        class="flex w-full gap-2 px-8 2xl:px-10 items-center justify-center"
        to="/watches"
        color="secondary"
        dark
        outline
      >
        <span>Watch More</span>
        <IconChevron class="w-4 h-4 -rotate-90" />
      </AppButton>
    </div>
  </section>
</template>

<script lang="ts" setup>
import AppTitle from "./AppTitle.vue";
import AppButton from "./AppButton.vue";
import IconChevron from "./icons/IconChevron.vue";
import ProductList from "./product/ProductList.vue";
import { Entity, IWatch } from "~/types";

// const watchesStore = useWatchesStore();
// await watchesStore.loadProducts(Entity.watches, false);
// await useAsyncData("main-watches", async () => {});

const searchStore = useNewSearchStore();
const watches = ref<IWatch[]>([]);
await handleSearch(true);

async function handleSearch(isInit = false) {
  const { items } = await searchStore.loadProducts<IWatch>(
    Entity.watches,
    isInit
  );
  if (items) {
    watches.value = items;
  }
}

const initial = {
  opacity: 0,
  y: 50,
};

const visibleOnce = ref({
  opacity: 1,
  y: 0,
  transition: {
    duration: 400,
  },
});
const getVisibleOnce = (i: number) => {
  return {
    ...visibleOnce.value,
    transition: {
      ...visibleOnce.value.transition,
      delay: 40 * i,
    },
  };
};
</script>

<style></style>
