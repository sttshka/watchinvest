<template>
  <NuxtLink
    :to="`/brands/${brand.id}`"
    class="h-[100px] lg:h-[180px] bg-white flex flex-col gap-10 items-center justify-center !bg-no-repeat bg-center bg-cover border-[2px] border-white hover:border-primary transition-colors duration-500 ease-in-out"
  >
    <NuxtImg
      provider="customProvider"
      class="h-full"
      quality="80"
      :src="brand.image.filepath"
      :alt="brand.title"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import { IBrand } from "~/types";

defineProps<{
  brand: IBrand;
}>();
</script>

<style scoped></style>
