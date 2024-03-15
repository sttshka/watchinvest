<template>
  <section
    class="bg-white py-8 xl:py-14 2xl:py-20 px-4 lg:px-0 mb-8 xl:mb-14 2xl:mb-20"
  >
    <div class="adaptive-container">
      <AppSuptitle title="collections" />

      <AppTitle
        class="!text-2xl xl:!text-[40px] 2xl:!text-5xl !leading-[120%]"
        title="Dive into Our Treasury"
      />

      <AppBanners />
    </div>
  </section>
</template>

<script setup lang="ts">
import AppTitle from "./AppTitle.vue";
import AppSuptitle from "./AppSuptitle.vue";
import AppBanners from "./AppBanners.vue";
</script>

<style scoped></style>
