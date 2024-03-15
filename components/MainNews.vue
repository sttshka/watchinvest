<template>
  <section
    class="w-full adaptive-container py-8 xl:py-14 2xl:py-20 px-4 xl:px-0"
  >
    <AppSuptitle title="about us" />
    <AppTitle
      class="!text-2xl xl:!text-[40px] 2xl:!text-5xl !leading-[120%]"
      title="We are more than just a Online Store"
    />

    <AppNews />
  </section>
</template>

<script lang="ts" setup>
import AppNews from "./AppNews.vue";
import AppTitle from "./AppTitle.vue";
import AppSuptitle from "./AppSuptitle.vue";
</script>

<style></style>
