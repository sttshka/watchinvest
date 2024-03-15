<template>
  <section
    class="bg-secondary rounded-[8px] py-8 xl:py-14 2xl:py-20 mt-[-34px] xl:mt-[-60px] 2xl:mt-[-85px]"
  >
    <div class="w-full adaptive-container px-[16px] md:px-0">
      <AppSuptitle title="Acquisition" />

      <AppTitle
        class="!text-2xl xl:!text-[40px] 2xl:!text-5xl !leading-[120%] text-white"
        title="Find Your Perfect Watch"
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 text-white gap-10">
        <div
          class="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-6 max-w-[500px] lg:max-w-full"
          v-for="(step, i) in steps"
        >
          <div>
            <component
              :is="step.icon"
              class="flex flex-1 w-10 h-10 lg:w-14 lg:h-14 items-center justify-center"
            ></component>
          </div>
          <div class="flex flex-col gap-4">
            <div
              class="text-[17px] lg:text-[18px] 2xl:text-[28px] leading-[120%] text-white font-medium"
            >
              {{ step.title }}
            </div>
            <div
              class="text-base lg:text-[17px] 2xl:text-[20px] leading-[150%] text-white opacity-60"
            >
              {{ step.description }}
            </div>
          </div>
        </div>
        <!-- <div
          v-for="(step, i) in steps"
          v-motion
          :initial="initial"
          :visibleOnce="getVisibleOnce(i)"
          class="flex flex-col items-center gap-2 lg:gap-2 xl:gap-4"
        >
          <div
            class="text-[17px] lg:text-lg 2xl:text-[28px] !leading-[120%] font-medium"
          >
            {{ step.title }}
          </div>
          <div class="flex justify-center items-center w-full relative">
            <div
              class="text-[17px] 2xl:text-xl font-medium pt-[2px] text-center !leading-[150%] w-8 h-8 bg-primary flex flex-col justify-center items-center rounded-full gap-[10px] relative z-20"
            >
              {{ step.number }}
            </div>
            <div
              class="lined lg:w-[calc(100%+24px)] lg:after:w-1/2 lg:before:w-1/2"
              :class="{
                first: step.number === 1,
                last: step.number === 4,
              }"
            ></div>
          </div>
          <div
            class="!leading-[150%] text-base 2xl:text-xl text-center max-w-[234px] lg:max-w-full font-normal text-gray-1"
          >
            {{ step.description }}
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import AppTitle from "./AppTitle.vue";
import AppSuptitle from "./AppSuptitle.vue";
import IconBag from "./icons/IconBag.vue";
import IconPay from "./icons/IconPay.vue";
import IconDelivery from "./icons/IconDelivery.vue";
import IconWatch from "./icons/IconWatch.vue";

const steps = [
  {
    number: 1,
    title: "Choose",
    description:
      "Our wide selection of luxury watches is sure to have the perfect timepiece for you.",
    icon: IconBag,
  },
  {
    number: 2,
    title: "Pay",
    description:
      "We offer a variety of payment options to make your purchase easy and convenient.",
    icon: IconPay,
  },
  {
    number: 3,
    title: "Delivery",
    description: "Your watch will be shipped to you in a secure package.",
    icon: IconDelivery,
  },
  {
    number: 4,
    title: "Enjoy",
    description:
      "Wear your new watch with pride, knowing that it is made with the finest materials and craftsmanship.",
    icon: IconWatch,
  },
];

const initial = {
  opacity: 0,
  y: -100,
};

const visibleOnce = ref({
  opacity: 1,
  y: 0,
  transition: {
    duration: 1000,
  },
});
const getVisibleOnce = (i: number) => {
  return {
    ...visibleOnce.value,
    transition: {
      ...visibleOnce.value.transition,
      delay: 100 * i,
    },
  };
};
</script>

<style scoped>
.lined {
  position: absolute;
}
.lined::before,
.lined::after {
  right: 0;
  left: 0;
  height: 1px;
  background: #f0f0f014;
  display: block;
  content: "";
  position: absolute;
  z-index: 10;
}

.lined::after {
  transform: translateX(100%);
}

.lined.first::before,
.lined.last::after {
  display: none;
}
</style>
