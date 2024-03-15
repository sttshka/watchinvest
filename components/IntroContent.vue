<template>
  <div
    class="flex flex-col items-center md:items-start gap-[24px] md:gap-[40px] px-[16px] md:px-0"
  >
    <div v-motion :initial="initial" :enter="ticketVisibleOnce">
      <BrandsTicker />
    </div>
    <div class="flex flex-col h-full gap-4">
      <div class="flex flex-col flex-1 gap-10">
        <div class="flex flex-col">
          <h1
            v-motion
            :initial="initial"
            :enter="titleVisibleOnce"
            class="font-normal text-5xl xl:text-[80px] 2xl:text-8xl !leading-[120%] text-white font-serif opacity-0"
            v-if="carouselStore.slides[carouselStore.current - 1]"
          >
            {{ carouselStore.slides[carouselStore.current - 1].title }}
            <!-- Discover <br />
            World's -->
            <!-- <span class="text-primary font-serif italic">Best Watches</span> -->
          </h1>
          <p
            v-motion
            :initial="initial"
            :enter="descriptionVisibleOnce"
            class="text-base xl:text-[17px] 2xl:text-xl text-gray-1 font-normal !leading-[150%] font-sans opacity-0"
            v-if="carouselStore.slides[carouselStore.current - 1]"
          >
            {{ carouselStore.slides[carouselStore.current - 1].description }}
          </p>
        </div>

        <div
          class="relative z-10 opacity-0 w-full"
          v-motion
          :initial="buttonInitial"
          :enter="buttonVisibleOnce"
        >
          <AppButton
            size="lg"
            to="/watches"
            color="primary"
            class="flex justify-center items-center flex-1 gap-[8px]"
          >
            <svg
              class="mb-[2px]"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="https://www.w3.org/2000/svg"
            >
              <path
                d="M16.9719 6.65372C16.9719 4.35957 15.1122 2.49979 12.818 2.49979C11.7133 2.4951 10.6522 2.93068 9.86936 3.7102C9.08653 4.48973 8.64647 5.54897 8.64648 6.65372"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="square"
              />
              <path
                d="M15.671 10.9832H15.627"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="square"
              />
              <path
                d="M10.0635 10.9832H10.0195"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="square"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.3719 6.86499L21.2605 21.5002H3.74023L4.62881 6.86499H20.3719Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>

            <span>Shop Now</span>
          </AppButton>
        </div>
      </div>

      <div class="hidden lg:flex gap-3 items-center mt-auto mb-4">
        <CarouselControlArrow
          direction="left"
          class="!p-[2px] !h-[36px] !w-[36px] lg:!h-[64px] lg:!w-[64px] relative md:translate-x-0"
          @click="carouselStore.handleSlideChange('prev')"
        />
        <CarouselControlArrow
          direction="right"
          class="!p-[2px] !h-[36px] !w-[36px] lg:!h-[64px] lg:!w-[64px] relative md:translate-x-0"
          @click="carouselStore.handleSlideChange('next')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BrandsTicker from "./carousel/BrandsTicker.vue";

import watch1 from "~/assets/images/watch1.png";
import watch2 from "~/assets/images/watch2.png";
import watch3 from "~/assets/images/watch3.png";

interface ISlide {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  brandTitle: string;
  brandDescription: string;
}

const carouselStore = useCarouselStore();

const initial = {
  opacity: 0,
  x: -100,
};

const ticketVisibleOnce = ref({
  opacity: 1,
  x: 0,
  transition: {
    duration: 300,
  },
});

const titleVisibleOnce = ref({
  opacity: 1,
  x: 0,
  transition: {
    duration: 300,
    delay: 200,
  },
});

const descriptionVisibleOnce = ref({
  opacity: 1,
  x: 0,
  transition: {
    duration: 300,
    delay: 400,
  },
});

const buttonInitial = {
  opacity: 0,
  y: 100,
};

const buttonVisibleOnce = ref({
  opacity: 1,
  y: 0,
  transition: {
    duration: 500,
    delay: 400,
  },
});
</script>

<style></style>
