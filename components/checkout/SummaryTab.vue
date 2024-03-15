<template>
  <div class="flex flex-col gap-10">
    <div>Your order:</div>

    <div class="flex flex-col gap-4 flex-1 h-full">
      <!-- <pre>
        {{ checkoutStore.productsList }}
      </pre> -->
      <div
        v-for="item in checkoutStore.productsList"
        :key="item.id"
        class="p-4 border-[1px] border-gray-1 flex flex-col gap-4"
      >
        <div class="flex items-center justify-between">
          <div
            class="text-gray-text flex items-center gap-4 justify-end flex-1"
          >
            <div class="flex items-center gap-1">
              <IconInfo class="h-[20px] w-[20px]" />
              <span class="text-[12px] lg:text-[14px]"
                >Goods from foreign boutiques may be subject to duties.</span
              >
            </div>
          </div>
        </div>
        <div class="h-[1px] w-full bg-gray-1"></div>
        <div class="flex gap-6 flex-1 flex-row">
          <NuxtImg
            v-if="item.product.photos.length"
            provider="customProvider"
            class="w-[72px] h-[72px] lg:w-[120px] lg:h-[120px] 2xl:w-[160px] 2xl:h-[160px] object-contain"
            :src="item.product.photos[0].filepath"
          />
          <div
            v-else
            class="w-[72px] h-[72px] lg:w-[120px] lg:h-[120px] 2xl:w-[160px] 2xl:h-[160px] bg-gray-1"
          />
          <div class="flex gap-4 lg:gap-6 flex-1 flex-col lg:flex-row">
            <div class="flex flex-1 flex-col">
              <div class="font-medium text-secondary text-base !leading-[150%]">
                {{ item.product.title }}
              </div>
              <div
                class="line-clamp-2 text-secondary text-[14px] !leading-[150%]"
              >
                {{ item.product.description }}
              </div>
              <div class="text-gray-text text-[14px] !leading-[150%]">
                {{ item.product.reference }}
              </div>
            </div>
            <div class="flex flex-1 lg:justify-end">
              <div class="text-right">
                USD
                <span class="font-medium">{{
                  Number(item.product.purchase_price).toLocaleString()
                }}</span>
              </div>
            </div>
            <div class="flex flex-col justify-between flex-1">
              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <div class="text-[14px]">Size</div>
                  <div class="flex items-center gap-2">
                    <div class="font-medium">{{ item.product.size }}</div>
                  </div>
                </div>
                <!-- <div class="flex items-center gap-2">
                  <div class="text-[14px]">Quantity</div>
                  <div class="flex items-center gap-2">
                    <div class="font-medium">x{{ item.product.quantity }}</div>
                  </div>
                </div> -->
                <div class="flex text-[14px]">
                  <span>
                    Estimated delivery date:
                    <span class="font-medium">
                      <!-- {{
                        item.product.date
                      }} -->
                      {{ getDate() }}
                    </span>
                  </span>
                </div>
                <div class="text-primary text-[14px]">It's free.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "@vueuse/core";

import IconInfo from "~/components/icons/IconInfo.vue";

const checkoutStore = useCheckoutStore();

const getDate = () => {
  const date = new Date();
  const from = date.setDate(date.getDate() + 5);
  const to = date.setDate(date.getDate() + 7);

  return (
    "from " +
    formatDate(new Date(from), "DD MMM.", { locales: "en-US" }) +
    " to " +
    formatDate(new Date(to), "DD MMM.", { locales: "en-US" })
  );
};

// const cartItems = ref([
//   {
//     id: 1,
//     shipping: 1,
//     imageUrl: "/images/watch1.png",
//     title: "Audemars Piguet Royal Oak Double Balance Wheel Openworked",
//     description:
//       "Audemars Piguet Royal Oak double balance wheel mounts a movement of the highest manufacture with a new patented Dualbalance extremely complex structure that makes this timepiece precise and stable. Available with 18K rose gold case, sapphire crystal caseback, 41mm skeletonized dial and 18kt rose gold bracelet.",
//     reference: "15407OR.OO.1220OR.01",
//     price: 100000,
//     size: 37,
//     quantity: 1,
//     date: "from 26 Oct. to 31 Oct",
//   },
//   {
//     id: 2,
//     shipping: 1,
//     imageUrl: "/images/watch2.png",
//     title: "Audemars Piguet",
//     description:
//       "Dualbalance extremely complex structure that makes this timepiece precise and stable. Available with 18K rose gold case, sapphire crystal caseback, 41mm skeletonized dial and 18kt rose gold bracelet. Audemars Piguet Royal Oak double balance wheel mounts a movement of the highest manufacture with a new patented",
//     reference: "15407OR.OO.1220OR.01",
//     price: 140000,
//     size: 11,
//     quantity: 3,
//     date: "from 26 Oct. to 31 Oct.",
//   },
// ]);
</script>

<style scoped></style>
