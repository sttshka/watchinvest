<template>
  <div
    class="text-white w-full h-full min-h-screen relative adaptive-container"
  >
    <div class="flex items-start gap-6 w-full h-full pt-[112px] lg:pt-[20vh]">
      <BrandsTicker
        class="!absolute top-[112px] lg:top-[20vh] left-0 lg:!w-1/2 z-[10]"
      />
      <div
        class="w-full h-full lg:w-fit lg:h-fit absolute lg:right-0 lg:left-0 lg:bottom-0 flex gap-3 justify-between lg:justify-start items-center mb-4 z-[10]"
      >
        <CarouselControlArrow
          direction="left"
          class="!p-[2px] !h-[40px] !w-[40px] lg:!h-[64px] lg:!w-[64px] relative md:translate-x-0 left-4 lg:left-0"
          @click="carouselStore.handleSlideChange('prev')"
        />
        <CarouselControlArrow
          direction="right"
          class="!p-[2px] !h-[40px] !w-[40px] lg:!h-[64px] lg:!w-[64px] relative md:translate-x-0 right-4 lg:right-0"
          @click="carouselStore.handleSlideChange('next')"
        />
      </div>

      <Swiper
        :allowTouchMove="false"
        :centeredSlides="true"
        :loop="true"
        ref="mySwiper"
        :watchSlidesProgress="true"
        class="!overflow-y-visible w-full !relative"
      >
        <SwiperSlide
          v-for="i in 4"
          class="!flex gap-6 flex-col lg:flex-row w-full px-4 lg:px-0"
        >
          <div class="flex flex-col w-full lg:w-1/2 mt-[82px] gap-10">
            <div>
              <div
                class="font-normal text-5xl xl:text-[80px] 2xl:text-8xl !leading-[120%] text-white font-serif"
              >
                Discover <br />
                World's
                <span class="text-primary font-serif italic">Best Watches</span>
              </div>
              <div
                class="text-base xl:text-[17px] 2xl:text-xl text-gray-1 font-normal !leading-[150%] font-sans"
              >
                Explore our curated collection of top timepieces from around the
                world. Elevate your wristwear with the finest watches,
                handpicked for connoisseurs like you.
              </div>
            </div>
            <div class="relative z-10 w-full">
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
          <div class="w-full lg:w-1/2">
            <div class="lg:-mt-[51px] relative">
              <NuxtImg src="/images/for-slider.png" />
              <div
                class="absolute -bottom-[50px] lg:-bottom-[100px] right-0 text-[48px] lg:text-[80px] 2xl:text-[96px] !leading-[120%] font-serif text-white opacity-[0.16]"
              >
                {{ currentSlideIndex }}
              </div>
            </div>
            <div>
              <div
                class="text-primary text-[24px] lg:text-[32px] xl:text-[40px] 2xl:text-[48px] font-serif italic font-normal !leading-[120%] mb-[8px] mt-[40px] ml-[-10px] md:ml-0"
              >
                “<span class="text-white">Sleek Sophistication</span>”
              </div>
              <div
                class="text-white text-[14px] lg:text-[15px] 2xl:text-[16px] font-thin !leading-[160%] mb-[32px] font-sf lg:ml-[20px]"
              >
                Introducing 'Timeless Glamour' – a collection of watches that
                exude timeless elegance and sophistication. Elevate your style
                with these exquisite timepieces, where classic design meets
                modern luxury. Explore 'Timeless Glamour' and make a statement
                of enduring elegance.
              </div>

              <div
                class="mb-4 flex flex-1 flex-col lg:flex-row gap-[24px] lg:ml-[20px]"
              >
                <AppButton
                  color="primary"
                  size="md"
                  class="flex gap-[8px] items-center"
                >
                  View collection
                </AppButton>
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
        </SwiperSlide>
      </Swiper>
    </div>
    <div
      class="h-screen w-screen absolute bottom-16 lg:-right-[30vw] lg:bottom-[10vh] justify-center items-center"
    >
      <AppWave class="!top-0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import BrandsTicker from "./carousel/BrandsTicker.vue";
import CarouselControlArrow from "./carousel/CarouselControlArrow.vue";
import AppWave from "./AppWave.vue";

const carouselStore = useCarouselStore();
const mySwiper = ref();

const currentSlideIndex = computed(() => {
  if (mySwiper.value?.$el.swiper.realIndex + 1 < 10) {
    return "0" + (mySwiper.value?.$el.swiper.realIndex + 1);
  }
  return mySwiper.value?.$el.swiper.realIndex + 1 || null;
});

watch(currentSlideIndex, (val) => {
  carouselStore.current = Number(val);
});

const currentRealSlideIndex = computed(
  () => mySwiper.value?.$el.swiper.realIndex
);

carouselStore.$onAction(({ name, args, after, onError }) => {
  if (name === "handleSlideChange") {
    if (args[0] === "prev") {
      mySwiper.value.$el.swiper.slidePrev();
    }
    if (args[0] === "next") {
      mySwiper.value.$el.swiper.slideNext();
    }
  }
});
</script>

<style scoped></style>
