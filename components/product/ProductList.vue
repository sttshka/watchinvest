<template>
  <div v-if="!error">
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-3 xl:gap-6 relative"
      :class="{
        '!grid-cols-3': cols === 3,
      }"
    >
      <template v-if="list.length">
        <div
          v-for="(product, index) in list"
          v-motion
          :initial="initial"
          :enter="getVisibleOnce(index)"
        >
          <ProductItem :entity="entity" v-if="product" :product="product" />
          <ProductDummie class="hidden lg:flex" v-else />
        </div>
      </template>
      <template v-else>
        <ProductDummie v-for="i in 4" class="hidden lg:flex" />
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

<script setup lang="ts" generic="T">
import ProductItem from "./ProductListItem.vue";
import ProductDummie from "./ProductDummie.vue";
import { Entity } from "~/types";

defineProps<{
  entity: Entity;
  list: T[];
  loading?: boolean;
  error: boolean;
  cols?: number;
}>();

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
