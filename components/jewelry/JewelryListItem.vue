<template>
  <div
    class="bg-white relative p-3 xl:p-6 2xl:p-9 flex flex-col gap-8 border-[2px] border-white hover:border-primary transition-colors duration-500 ease-in-out h-full w-full"
  >
    <button
      class="absolute right-[2px] top-[2px] xl:right-2 xl:top-2 2xl:right-4 2xl:top-4 cursor-pointer text-gray-1 hover:text-primary transition-colors duration-500 ease-in-out"
      @click="toggleFavorite"
      :class="{
        'text-primary': product.is_favorite,
      }"
    >
      <IconFavorite class="h-8 w-8" />
    </button>

    <NuxtLink :to="`/${entity}/${product.id}`">
      <div
        class="absolute bg-primary text-white left-[2px] top-[2px] lg:top-2 lg:left-2 2xl:top-4 2xl:left-4 px-1 py-[1px] lg:px-2 lg:py-1 text-[12px] lg:text-[14px]"
        v-if="product.label"
      >
        {{ getLocalizedValue(product.label) }}
      </div>

      <NuxtImg
        v-if="product.photos && product.photos.length"
        provider="customProvider"
        class="object-contain w-full h-[100px] md:h-[120px] lg:h-[141px] xl:h-[171px] 2xl:h-[202px]"
        :src="product.photos[0].filepath"
        :alt="product.article_en"
      />
      <div
        v-else
        class="w-full h-[100px] md:h-[120px] lg:h-[141px] xl:h-[171px] 2xl:h-[202px] bg-gray-1"
      ></div>
    </NuxtLink>

    <NuxtLink
      :to="`/${entity}/${product.id}`"
      class="flex flex-col flex-1 gap-2 lg:gap-4"
    >
      <div
        class="text-[17px] xl:text-lg 2xl:text-[28px] line-clamp-2 !leading-[120%] font-medium hover:text-primary transition-colors duration-500 ease-in-out"
      >
        <span>{{ product?.brand?.title }}</span>
        <br />
        <span>{{ product.article }}</span>
      </div>

      <div class="mt-auto flex flex-col gap-2 flex-1">
        <div class="flex flex-1 items-center">
          <div
            class="text-gray-text text-[14px] xl:text-[15px] 2xl:text-base !leading-[150%]"
          >
            <template v-if="product.reference_number">{{
              product.reference_number
            }}</template>
            <template v-else>–</template>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-gray-text text-[12px] lg:text-sm !leading-[150%]"
            >Price</span
          >
          <span
            class="text-primary text-base xl:text-xl 2xl:text-xl font-medium"
          >
            <template v-if="product.purchase_price">
              USD {{ Number(product.purchase_price).toLocaleString() }}
            </template>
            <template v-else>–</template>
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import IconFavorite from "~/components/icons/IconFavorite.vue";
import { Entity, IJewelry } from "~/types";
import { getLocalizedValue } from "~/utils";

const props = withDefaults(
  defineProps<{
    entity: Entity;
    reserved: boolean;
    product: IJewelry;
  }>(),
  {
    reserved: true,
  }
);

const favoritesStore = useFavoritesStore();

async function toggleFavorite() {
  const data = {
    product_id: props.product.id,
    product_type: props.entity,
  };
  if (props.product.is_favorite) {
    const result = await favoritesStore.removeFromFavorites(data);
    if (result) {
      props.product.is_favorite = false;
    }
  } else {
    const result = await favoritesStore.addToFavorites(data);
    if (result) {
      props.product.is_favorite = true;
    }
  }
}
</script>

<style scoped></style>
