<template>
  <Transition>
    <div
      v-show="pageStore.modal.photoGallery"
      class="fixed left-0 right-0 bottom-0 top-0 bg-secondary bg-opacity-[0.88] z-[100]"
      @click.self="emit('close')"
    >
      <button
        @click="emit('close')"
        class="text-white hover:text-primary transition-colors right-1 top-1 absolute"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            d="M8 8L24 24"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24 8L8 24"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="w-full h-full adaptive-container flex flex-col py-10">
        <div class="flex flex-1 w-full h-full flex-col gap-6">
          <swiper
            ref="mySwiper"
            :loop="true"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            class="flex w-full !h-5/6"
          >
            <swiper-slide v-for="photo in photos">
              <NuxtImg
                provider="customProvider"
                class="flex flex-col w-full h-full object-contain"
                :src="photo.filepath"
              />
            </swiper-slide>

            <div
              class="absolute top-1/2 left-0 right-0 flex justify-between items-center"
            >
              <CarouselControlArrow
                direction="left"
                class="!p-[2px] !h-[36px] !w-[36px] lg:!h-[64px] lg:!w-[64px] relative z-40 translate-x-[16px] md:translate-x-0 translate-y-[-30px]"
                @click="handleSlideChange('left')"
              />
              <CarouselControlArrow
                direction="right"
                class="!p-[2px] !h-[36px] !w-[36px] lg:!h-[64px] lg:!w-[64px] relative z-40 translate-x-[-16px] md:translate-x-0 translate-y-[-30px]"
                @click="handleSlideChange('right')"
              />
            </div>
          </swiper>
          <swiper
            @swiper="setThumbsSwiper"
            :loop="true"
            :slidesPerView="3"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            :wrapperClass="'flex !gap-3 lg:gap-6'"
            class="bottom-swiper w-full max-w-[460px] h-[140px] !px-10 xl:!px-4"
          >
            <swiper-slide
              v-for="photo in photos"
              class="!flex !justify-center !items-center !h-[100px] !w-[100px] lg:!h-[130px] lg:!w-[130px] overflow-clip border-[2px] border-transparent"
            >
              <NuxtImg
                provider="customProvider"
                :src="photo.filepath"
                class="!h-[100px] !w-[100px] lg:!h-[130px] lg:!w-[130px] object-cover object-center"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

defineProps<{
  photos: {
    filepath: string;
    id: number;
    url: string;
    en: boolean;
    ctime: string;
    dtime: string;
  }[];
}>();

const images = [
  {
    id: 1,
    imageUrl: "/gallery/gallery1.jpeg",
  },
  {
    id: 2,
    imageUrl: "/gallery/gallery2.jpeg",
  },
  {
    id: 3,
    imageUrl: "/gallery/gallery3.jpeg",
  },
];

// Import Swiper styles
import "swiper/css";

import "swiper/css/free-mode";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Thumbs } from "swiper/modules";
import { useMagicKeys } from "@vueuse/core";

const emit = defineEmits(["close"]);

const { escape } = useMagicKeys();
watch(escape, (v) => {
  if (v) {
    emit("close");
  }
});

const thumbsSwiper = ref(null);
const modules = [FreeMode, Thumbs];

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const pageStore = usePageStore();

const mySwiper = ref(null);

function handleSlideChange(direction: string) {
  if (direction === "left") {
    mySwiper.value.$el.swiper.slidePrev();
  } else if (direction === "right") {
    mySwiper.value.$el.swiper.slideNext();
  }
}
</script>

<style scoped>
.bottom-swiper .swiper-slide-thumb-active {
  border: 2px solid #bd9542;
  opacity: 1;
}
</style>
