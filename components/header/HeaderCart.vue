<template>
  <NuxtLink
    to="/cart"
    class="transition-all text-white hover:text-primary fill-none relative"
  >
    <IconBag class="w-6 h-6 lg:w-8 lg:h-8" />
    <transition>
      <div
        v-if="cartStore.itemsCount"
        class="absolute top-0 right-0 -translate-y-1/3 translate-x-[8px] w-[20px] h-[20px] bg-primary rounded-full flex items-center justify-center shadow-dark"
      >
        <span class="text-[14px] translate-y-[1px] leading-[150%] text-white">
          {{ cartStore.itemsCount }}
        </span>
      </div>
    </transition>
  </NuxtLink>
</template>

<script setup lang="ts">
import IconBag from "../icons/IconBag.vue";
const cartStore = useCartStore();
</script>

<style scoped></style>
