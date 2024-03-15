<template>
  <div v-if="!error">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 xl:gap-6 relative">
      <template v-if="list.length">
        <div
          v-for="(brand, index) in list"
          v-motion
          :initial="initial"
          :enter="getVisibleOnce(index)"
        >
          <BrandsListItem v-if="brand" :brand="brand" />
          <BrandDummie v-else />
        </div>
      </template>
      <template v-else>
        <BrandDummie v-for="i in 4" isAnimated />
      </template>
      <div
        v-if="loading"
        class="absolute w-full h-full bg-gray-3 bg-opacity-20 flex justify-center items-center"
      >
        <span
          class="animate-ping absolute inline-flex h-20 w-20 rounded-full bg-sky-400 bg-primary"
        />
      </div>
    </div>
  </div>
  <div v-else class="text-center text-xl">Error, please try again</div>
</template>

<script setup lang="ts">
import { IBrand } from "~/types";
import BrandsListItem from "./BrandsListItem.vue";
import BrandDummie from "./BrandDummie.vue";
import { getListFilledWithDummies } from "~/utils";

const props = withDefaults(
  defineProps<{
    list: IBrand[];
    loading?: boolean;
    error?: boolean;
  }>(),
  {
    list: () => [],
    loading: false,
  }
);

const listWithDummies = computed(() =>
  getListFilledWithDummies<IBrand>(props.list, 4)
);

// motion
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

<style lang="scss" scoped></style>
