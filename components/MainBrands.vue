<template>
  <section
    class="w-full adaptive-container mb-8 xl:mb-14 2xl:mb-16 px-4 xl:px-0"
  >
    <AppSuptitle title="Brands" />

    <AppTitle
      class="!text-2xl xl:!text-[40px] 2xl:!text-5xl !leading-[120%]"
      title="The Brand Gallery"
    />

    <BrandsList :list="brands" :loading="false" :error="searchStore.isError" />

    <div
      class="flex justify-center mt-4 xl:mt-9 2xl:mt-14 opacity-0"
      v-motion
      :initial="initial"
      :visibleOnce="visibleOnce"
    >
      <AppButton
        class="flex w-full gap-2 px-8 2xl:px-10 items-center justify-center"
        to="/brands"
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
import AppButton from "./AppButton.vue";
import IconChevron from "./icons/IconChevron.vue";
import BrandsList from "./brand/BrandsList.vue";
import { IBrand, FilterType, Entity } from "~/types";

const searchStore = useNewSearchStore();
const brands = ref<IBrand[]>([]);
await handleSearch(true);

async function handleSearch(isInit = false) {
  const extQuery = {
    [FilterType.isWatches]: true,
  };

  const { items } = await searchStore.loadProducts<IBrand>(
    Entity.brands,
    isInit,
    extQuery
  );
  if (items) {
    brands.value = items;
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
