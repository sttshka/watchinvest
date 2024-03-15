<template>
  <div
    class="min-h-screen bg-[url('/images/invest-bg.png')] bg-no-repeat bg-center bg-cover"
  >
    <div class="min-h-screen bg-gradient-to-b from-[#17171B00] to-[#17171B]">
      <InnerPageHeader transparent>
        <AppBreadcrumbs :items="breadcrumbs" />
      </InnerPageHeader>

      <div class="w-full adaptive-container flex flex-col px-4 lg:px-0">
        <div class="pb-10">
          <div
            class="font-normal text-5xl xl:text-[80px] 2xl:text-8xl !leading-[120%] font-serif text-white"
          >
            <span class="text-primary">Invest</span> in
            <br />
            Our<span class="text-primary">Business</span>
          </div>
          <div
            class="text-base lg:text-[20px] text-white !leading-[150%] max-w-[600px]"
          >
            Invest in our company to buy and profit from watches sold on our
            marketplace.
          </div>
        </div>

        <div class="w-full mt-16">
          <div class="range-slider w-full">
            <input
              v-model="sliderProgress"
              class="slider w-full outline-none"
              type="range"
              :min="minValue"
              :max="maxValue"
            />
            <div class="slider-thumb" :style="thumbStyles">
              <div>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24 0L0 24L24 48L48 24L24 0Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24 3L3 24L24 45L45 24L24 3Z"
                    fill="#BD9542"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24 3V24H3L24 45V24H45L24 3Z"
                    fill="url(#paint0_linear_678_23805)"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.5577 26.7109L24.0473 30.1618L27.9247 26.7109L24.0473 23.022L20.5577 26.7109ZM17.1187 26.0309L21.0466 24.586L15.4666 23.005L17.1187 26.0309ZM11.7578 16.5452L14.5225 21.492L12.1793 20.9821L13.275 29.3798L17.8099 27.6289L21.4849 34.0717H21.8221H22.1255L22.3784 37.4546H25.7837L25.8511 34.0717H25.9186H26.5086L30.7231 27.5949L34.8871 29.3798L35.6625 20.9821L33.353 21.475L36.2357 16.5452L27.0818 19.5031L24.0473 17.0212L21.0803 19.5031L11.7578 16.5452ZM24.0473 30.9268L22.8335 34.0717H25.2611L24.0473 30.9268ZM31.0434 26.0309L32.6955 23.005L27.1155 24.586L31.0434 26.0309Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_678_23805"
                      x1="24"
                      y1="3"
                      x2="24"
                      y2="45"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#AC832D" />
                      <stop offset="1" stop-color="#AC832D" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                class="absolute left-1/2 -translate-x-1/2 -top-full -translate-y-[10px] tooltip bg-secondary text-white py-[5px] px-[9px] border-[1px] border-primary flex justify-center items-center text-[20px]"
              >
                ${{ sliderProgressView }}
                <div
                  class="absolute bg-secondary border-b-[1px] border-r-[1px] border-primary h-[12px] w-[12px] top-[calc(100%+0.5px)] -translate-y-1/2 rotate-45"
                ></div>
              </div>
            </div>
            <div class="progress" :style="progressWidthStyles"></div>
          </div>
          <div
            class="flex items-center justify-between py-8 text-[20px] text-white"
          >
            <div>
              Min
              <span class="text-primary">${{ minValueView }}</span>
            </div>
            <div>
              Max
              <span class="text-primary">${{ maxValueView }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:grid grid-cols-3 gap-4">
          <div class="text-white">
            <div class="text-[14px] lg:text-16 2xl:text-[20px]">
              Your Profit Share
            </div>
            <div class="text-[16px]">
              You'll receive 50% of the company's profit from watch sales.
            </div>
          </div>
          <div class="flex justify-center items-center">
            <AppButton size="lg" class="!w-full !max-w-[224px]"
              >Invest Now</AppButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- divider -->
  <div class="divider h-8 bg-primary w-full"></div>
  <div class="bg-gray-1">
    <div
      class="w-full adaptive-container flex flex-col py-8 xl:py-14 2xl:py-20 px-4 xl:px-0"
    >
      <AppSuptitle title="process" />
      <AppTitle
        class="!text-2xl xl:!text-[40px] 2xl:!text-5xl !leading-[120%]"
        title="Our Investment Strategy"
      />

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div
          v-for="step in investSteps"
          class="bg-white p-10 flex flex-col gap-6 items-center text-center lg:items-start lg:text-left"
        >
          <div class="h-10 w-10 bg-gray-1 flex justify-center items-center">
            {{ step.id }}
          </div>
          <div class="font-medium text-[20px]">
            {{ step.title }}
          </div>
          <div>
            {{ step.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div
    class="min-h-screen w-full h-full bg-[url('/images/invest-video.png')] bg-no-repeat bg-center bg-cover relative"
  >
    <div
      class="w-full h-full bg-[#17171BA3] absolute flex items-center justify-center"
    >
      <div class="play-button">
        <div>
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="https://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_b_674_22807)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M32.5547 52V28L51.4519 40L32.5547 52Z"
                fill="white"
              />
              <rect
                x="0.5"
                y="0.5"
                width="79"
                height="79"
                rx="39.5"
                stroke="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_b_674_22807"
                x="-24"
                y="-24"
                width="128"
                height="128"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="12" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_674_22807"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_674_22807"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </div> -->
  <div class="min-h-screen w-full h-full">
    <iframe
      class="h-screen w-full"
      src="https://www.youtube-nocookie.com/embed/mB4hsVsjR8I?si=ic6LwOYML8i0BIsn&amp;controls=0"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    >
    </iframe>
  </div>
</template>

<script setup lang="ts">
import pattern from "assets/images/pattern.svg";
const minValue = ref(500000);
const maxValue = ref(50000000);
const sliderProgress = ref(12840000);

const breadcrumbs = ref([{ title: "Pull", to: "/invest" }]);

const minValueView = computed(() => minValue.value.toLocaleString());
const maxValueView = computed(() => maxValue.value.toLocaleString());
const sliderProgressView = computed(() =>
  sliderProgress.value.toLocaleString()
);

const thumbStyles = computed(() => {
  return {
    left: `${(sliderProgress.value / maxValue.value) * 100}%`,
  };
});
const progressWidthStyles = computed(() => {
  return {
    width: `${(sliderProgress.value / maxValue.value) * 100}%`,
  };
});

const investSteps = ref<
  {
    id: number;
    title: string;
    description: string;
  }[]
>([
  {
    id: 1,
    title: "Invest $100,000",
    description:
      "Start by investing $100,000 in our company. This initial investment is your entry ticket to our profitable watch marketplace venture.",
  },
  {
    id: 2,
    title: "Watches in Motion",
    description:
      "Your investment fuels our company's purchase of watches at $80 000 each. These watches are then set in motion on our marketplace, where they are sold for $120 000, marking the start of the journey.",
  },
  {
    id: 3,
    title: "Your First Harvest - $20,000",
    description:
      "As the watches sell, your investment grows. You'll receive $100,000 back from your initial investment, and, in addition, you'll pocket 50% of the profits, which amounts to $20,000, credited to your wallet.",
  },
  {
    id: 4,
    title: "Doubling and Beyond",
    description:
      "Your $100,000 is reinvested to double the opportunities for profit. With each reinvestment, your earnings multiply. The process remains the same, ensuring consistent and growing returns.",
  },
  {
    id: 5,
    title: "Withdraw After 3 Months",
    description:
      "You have the flexibility to request the withdrawal of your investment and accrued earnings after a 3-month lock-in period. Simply submit a withdrawal request, and your funds will be processed accordingly.",
  },
]);
</script>

<style scoped>
:root {
  --dark-teal: #001724;
  --light-gray: #8d8c8d;
  --green: #0aff14;
  --white: #ffffff;
}

.range-slider {
  position: relative;
  user-select: none;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  background-color: rgba(240, 240, 240, 0.08);
  cursor: pointer;
  user-select: none;
}

.slider::-webkit-slider-thumb,
.slider-thumb {
  width: 48px;
  height: 48px;
}

.slider::-webkit-slider-thumb {
  position: relative;
  -webkit-appearance: none;
  z-index: 20;
}

.slider::-webkit-slider-thumb:hover {
  position: relative;
  -webkit-appearance: none;
}

.slider-thumb {
  position: absolute;
  opacity: 0.9;
  top: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.slider-thumb:active {
  opacity: 1;
  cursor: pointer;
}

.progress {
  position: absolute;
  height: 12px;
  top: 50%;
  transform: translateY(-60%);
  background-size: 12px;
  background-color: #8d8c8d;
  background-image: url("/images/pattern.svg");
}
</style>
