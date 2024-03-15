<template>
  <div class="hidden md:grid grid-cols-2 xl:grid-cols-4 gap-[24px]">
    <div
      v-for="i in 6"
      v-motion
      :initial="initial"
      :visibleOnce="getVisibleOnce(i)"
      class="border-[2px] border-transparent hover:border-primary transition-colors cursor-pointer duration-500"
    >
      <div
        class="h-full md:h-[232px] bg-cover bg-center w-full bg-[url('~/assets/images/news-cover.png')]"
      ></div>
      <div class="p-[24px] md:p-[32px] bg-white">
        <div
          class="text-[18px] xl-text-[24px] 2xl:text-[28px] !leading-[120%] mb-2 xl:mb-3 2xl:mb-4"
        >
          Choose your own personalized watch
        </div>
        <div
          class="text-[15px] md:text-[16px] text-gray-text line-clamp-6 mb-[24px] !leading-[120%]"
        >
          Lorem ipsum dolor sit amet consectetur. Quisque semper sed ut massa
          diam. Dictum nulla netus aliquam cursus. Pellentesque justo nunc sed
          hendrerit scelerisque tristique diam. Et magna morbi turpis in arcu
          ullamcorper. Pellentesque cursus tincidunt fames vitae accumsan odio.
        </div>
        <AppButton size="md" class="!max-w-full" dark>Learn More</AppButton>
      </div>
    </div>
  </div>
  <div class="flex md:hidden">
    <Swiper
      :slidesPerView="1.2"
      :spaceBetween="16"
      class="mySwiper w-full flex"
    >
      <SwiperSlide v-for="i in 6" :key="i">
        <div class="w-full">
          <div
            class="h-[218px] bg-cover bg-center w-full bg-[url('~/assets/images/news-cover.png')]"
          ></div>
          <div class="p-[16px] bg-white">
            <div class="text-[17px] !leading-[120%] mb-[8px]">
              Choose your own personalized watch
            </div>
            <div
              class="text-gray-text text-[14px] line-clamp-6 mb-[16px] !leading-[120%]"
            >
              Lorem ipsum dolor sit amet consectetur. Quisque semper sed ut
              massa diam. Dictum nulla netus aliquam cursus. Pellentesque justo
              nunc sed hendrerit scelerisque tristique diam. Et magna morbi
              turpis in arcu ullamcorper. Pellentesque cursus tincidunt fames
              vitae accumsan odio.
            </div>
            <AppButton size="md" class="!max-w-full" dark>Learn More</AppButton>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";

const initial = {
  opacity: 0,
  y: 50,
};

const visibleOnce = ref({
  opacity: 1,
  y: 0,
  transition: {
    duration: 400,
  },
});
const getVisibleOnce = (i: number) => {
  return {
    ...visibleOnce.value,
    transition: {
      ...visibleOnce.value.transition,
      delay: 40 * i,
    },
  };
};
</script>

<style scoped></style>
