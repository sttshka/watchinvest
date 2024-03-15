<template>
  <div
    class="flex flex-col px-4 lg:p-0 opacity-0"
    v-motion
    :initial="initial"
    :enter="visibleOnce"
  >
    <ImageSlider />

    <div>
      <div ref="swiperContent">
        <h5
          class="text-primary text-[24px] lg:text-[32px] xl:text-[40px] 2xl:text-[48px] font-serif italic font-normal !leading-[120%] mb-[8px] mt-[40px] ml-[-10px] md:ml-0"
        >
          “<span v-if="carouselStore.slides[carouselStore.current - 1]"  class="text-white">{{ 
              (carouselStore.slides[carouselStore.current - 1])
                .collectionTitle
            }}</span>”
        </h5>
        <p
          class="text-white text-[14px] lg:text-[15px] 2xl:text-[16px] font-thin !leading-[160%] mb-[32px] font-sf lg:ml-[20px]"
        >
          <!-- {{ carouselStore.current - 1 }} -->
          <div v-if="carouselStore.slides[carouselStore.current - 1]">
            {{
              (carouselStore.slides[carouselStore.current - 1])
                .collectionDescription
            }}
          </div>
          <!-- {{ carouselStore.slides[carouselStore.current - 1].collectionDescription }} -->
        </p>
        <div
          class="mb-4 flex flex-1 flex-col lg:flex-row gap-[24px] lg:ml-[20px]"
        >
          <div
            v-motion
            :initial="{ opacity: 0, x: 100 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 300 } }"
          >
            <AppButton
              color="primary"
              size="md"
              class="flex gap-[8px] items-center"
            >
              View collection
            </AppButton>
          </div>
          <div
            v-motion
            :initial="{ opacity: 0, x: 100 }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: { duration: 300, delay: 300 },
            }"
          >
            <AppButton
              color="secondary"
              size="md"
              class="flex gap-[8px] items-center"
            >
              Invest in the collection
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageSlider from "./ImageSlider.vue";

const carouselStore = useCarouselStore();

const initial = {
  opacity: 0,
  x: 100,
};

const visibleOnce = ref({
  opacity: 1,
  x: 0,
  transition: {
    duration: 500,
  },
});
</script>
