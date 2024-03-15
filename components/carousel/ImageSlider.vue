<template>
  <div class="relative ml-[-16px] mr-[-16px] sm:m-0 sm:pt-[50px] md:pt-0">
    <swiper
      ref="mySwiper"
      effect="coverflow"
      :allowTouchMove="false"
      :centeredSlides="true"
      :loop="true"
      :slidesPerView="3"
      :watchSlidesProgress="true"
      :coverflowEffect="{
        rotate: 0,
        stretch: 1,
        scale: 1,
        depth: 65,
        modifier: 6,
        slideShadows: false,
      }"
      :keyboard="{
        enabled: true,
      }"
      :mousewheel="{
        thresholdDelta: 70,
      }"
      :initialSlide="currentSlide"
      :modules="modules"
      class="h-[285px] xl:h-[260px] 2xl:h-[442px] w-full !overflow-visible"
    >
      <swiper-slide
        v-slot="{ isActive, isPrev, isNext }"
        class="!flex flex-col justify-center items-center h-full"
        v-for="(photo, i) in carouselStore.slides"
      >
        <picture>
          <img
            class="select-none brightness-50 transition-all !w-full xl:scale-[1.125] 2xl:scale-[1.25] pointer-events-none"
            :class="{
              '!brightness-100 !scale-[1.1] xl:!scale-[1.3] 2xl:!scale-[1.6]':
                isPrev || isActive || isNext,
              '!scale-0': !slideIsVisible(photo.id),
            }"
            :src="photo.imageUrl"
            alt=""
          />
        </picture>
      </swiper-slide>
    </swiper>
    <div
      class="absolute bottom-[-100px] right-0 text-[96px] !leading-[120%] font-serif text-white opacity-[0.16]"
    >
      {{ currentSlideIndex }}
    </div>
    <div
      class="absolute top-1/2 left-0 right-0 flex lg:hidden justify-between items-center"
    >
      <CarouselControlArrow
        direction="left"
        class="!p-[2px] !h-[36px] !w-[36px] lg:!h-[64px] lg:!w-[64px] relative z-40 translate-x-[16px] md:translate-x-0 translate-y-[-30px]"
        @click="carouselStore.handleSlideChange('prev')"
      />
      <CarouselControlArrow
        direction="right"
        class="!p-[2px] !h-[36px] !w-[36px] lg:!h-[64px] lg:!w-[64px] relative z-40 translate-x-[-16px] md:translate-x-0 translate-y-[-30px]"
        @click="carouselStore.handleSlideChange('next')"
      />
    </div>

    <AppWave />
  </div>
</template>

<script setup lang="ts">
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import CarouselControlArrow from "./CarouselControlArrow.vue";
import AppWave from "~/components/AppWave.vue";

import watch1 from "~/assets/images/watch1.png";
import watch2 from "~/assets/images/watch2.png";
import watch3 from "~/assets/images/watch3.png";

import "swiper/css";
import "swiper/css/effect-cards";

const mySwiper = ref();
const modules = [EffectCoverflow];

interface ISlide {
  id: number;
  imageUrl: string;
}
const photos = ref<ISlide[]>([
  {
    id: 1,
    imageUrl: watch1,
  },
  {
    id: 2,
    imageUrl: watch2,
  },
  {
    id: 3,
    imageUrl: watch3,
  },
  {
    id: 4,
    imageUrl: watch3,
  },
  {
    id: 5,
    imageUrl: watch2,
  },
  {
    id: 6,
    imageUrl: watch3,
  },
  {
    id: 7,
    imageUrl: watch2,
  },
  {
    id: 8,
    imageUrl: watch3,
  },
]);

const currentSlide = ref(0);

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

const visibleSlidesIndexes = computed(() => {
  return photos.value.filter((_, i) => {
    if (
      i >= currentRealSlideIndex.value - 2 &&
      i <= currentRealSlideIndex.value + 2
    ) {
      return true;
    }

    // for start and prev

    if (currentRealSlideIndex.value == 0) {
      return i === photos.value.length - 1 || i === photos.value.length - 2;
    }
    if (currentRealSlideIndex.value == 1) {
      return i === photos.value.length - 1;
    }

    // for prev and next
    if (currentRealSlideIndex.value == photos.value.length - 1) {
      return i === 0 || i === 1;
    }
    if (currentRealSlideIndex.value == photos.value.length - 2) {
      return i === 0;
    }
  });
});

const carouselStore = useCarouselStore();
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

// function handleSlideChange(direction: string) {
//   if (direction === "left") {
//     mySwiper.value.$el.swiper.slidePrev();
//   } else if (direction === "right") {
//     mySwiper.value.$el.swiper.slideNext();
//   }
// }

const slideIsVisible = (photoId: number) => {
  return visibleSlidesIndexes.value.find((i) => i.id === photoId);
};
</script>
