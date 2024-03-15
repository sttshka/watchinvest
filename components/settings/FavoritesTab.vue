<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-4">
      <div class="text-[36px] font-medium">Избранное</div>

      <FavoritesLoader v-if="favoritesStore.loading" />
      <template v-else>
        <div
          class="flex flex-col gap-4 p-4 bg-white"
          v-if="!favoritesStore.favorites.length"
        >
          <div class="text-secondary">
            There is currently nothing in your purchases.
          </div>
          <div class="flex gap-3">
            <NuxtLink
              class="text-primary hover:text-primary-hover underline"
              to="/watches"
              >Watches</NuxtLink
            >
            <NuxtLink
              class="text-primary hover:text-primary-hover underline"
              to="/jewelry"
              >Jewelry</NuxtLink
            >
            <NuxtLink
              class="text-primary hover:text-primary-hover underline"
              to="/accessories"
              >Accessories</NuxtLink
            >
          </div>
          <AppButton to="/watches" size="md" class="w-full" dark
            >Go shopping</AppButton
          >
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-3 xl:gap-6">
          <div v-for="item in favoritesStore.favorites" :key="item.id">
            <component
              :is="getComponent(item)"
              :entity="item.product_type"
              :reserved="false"
              :product="item.product"
              class="min-h-[500px]"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Entity } from "~/types";
import ProductListItem from "../product/ProductListItem.vue";
import JewelryListItem from "../jewelry/JewelryListItem.vue";
import AccessoriesListItem from "../accessories/AccessoriesListItem.vue";
import FavoritesLoader from "./FavoritesLoader.vue";

const getComponent = (item: { product_type: Entity }) => {
  switch (item.product_type) {
    case Entity.watches:
      return ProductListItem;
    case Entity.jewelry:
      return JewelryListItem;
    case Entity.accessories:
      return AccessoriesListItem;
    default:
      return ProductListItem;
  }
};

const favoritesStore = useFavoritesStore();
</script>

<style scoped></style>
