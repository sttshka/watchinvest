<template>
  <div class="min-h-screen min-w-screen flex overflow-clip">
    <div class="w-full h-full adaptive-container">
      <section
        class="flex justify-between h-full w-full flex-col md:flex-row gap-[24px] pt-[120px] lg:pt-[200px] 2xl:pt-[260px]"
      >
        <!-- <IntroContent class="w-full md:w-1/2" />

        <MainCarousel class="w-full md:w-1/2" /> -->
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IntroContent from "./IntroContent.vue";
import MainCarousel from "./carousel/MainCarousel.vue";
</script>

<style></style>
