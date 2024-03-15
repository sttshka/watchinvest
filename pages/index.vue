<template>
  <div class="min-h-screen h-full relative">
    <div class="overflow-clip">
      <MainHero />
    </div>

    <div class="divider h-8 bg-primary w-full"></div>

    <div class="bg-gray-1 flex flex-col">
      <AppNotification />

      <MainCatalog />

      <MainBrands />

      <MainBanners />

      <MainParadigm />

      <MainNews />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
</script>
