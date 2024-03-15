<template>
  <div v-if="!error">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 xl:gap-6 relative">
      <template v-if="list.length">
        <div
          v-for="(product, index) in list"
          v-motion
          :initial="initial"
          :enter="getVisibleOnce(index)"
        >
          <JewelryListItem :entity="entity" v-if="product" :product="product" />
        </div>
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
import JewelryListItem from "./JewelryListItem.vue";
import { Entity, IJewelry } from "~/types";

defineProps<{
  entity: Entity;
  list: IJewelry[];
  loading?: boolean;
  error: boolean;
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
