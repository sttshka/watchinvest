<template>
  <Vue3Marquee>
    <NuxtImg
      v-for="image in images"
      class="h-[32px] mr-[40px]"
      :src="image.imageUrl"
    />
  </Vue3Marquee>
</template>

<script setup lang="ts">
const images = ref([
  { imageUrl: "images/BrandImage1.svg" },
  { imageUrl: "images/BrandImage2.svg" },
  { imageUrl: "images/BrandImage3.svg" },
  { imageUrl: "images/BrandImage4.svg" },
  { imageUrl: "images/BrandImage1.svg" },
  { imageUrl: "images/BrandImage2.svg" },
]);
</script>

<style scoped></style>
