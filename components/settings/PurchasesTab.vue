<template>
  <div class="flex flex-col gap-4 lg:gap-6">
    <div class="flex justify-between">
      <div
        class="text-[18px] lg:text-[24px] 2xl:text-[36px] font-medium text-secondary"
      >
        Мои покупки
      </div>
    </div>

    <PurchasesLoader v-if="purchasesStore.loading" />

    <template v-else>
      <div v-if="purchasesStore.purchases.length" class="flex flex-col gap-3">
        <AppCard v-for="item in purchasesStore.purchases">
          <template #content>
            <div
              class="flex flex-col lg:flex-row p-6 gap-3 cursor-pointer relative"
              @click="item.open = !item.open"
            >
              <div class="flex flex-1 flex-col gap-1">
                <div
                  class="flex gap-1 text-gray-text text-[12px] lg:text-[14px]"
                >
                  <span>No. {{ item.id }}</span>
                  <span
                    >dated
                    {{ useDateFormat(item.ctime, "DD.MM.YYYY").value }}</span
                  >
                </div>
                <div
                  class="text-[14px] font-medium capitalize"
                  :class="{
                    'text-primary': item.status === 'reserved',
                    'text-red': item.status === 'canceled',
                    'text-green': item.status === 'done',
                  }"
                >
                  {{ item.status }}
                </div>
              </div>
              <div
                class="flex flex-col lg:flex-row flex-1 lg:justify-between lg:items-center gap-3"
              >
                <div class="flex flex-col gap-1 text-[12px] lg:text-[14px]">
                  <div class="text-gray-text">Order amount</div>
                  <div class="text-secondary">
                    USD
                    <span class="font-medium">{{
                      item.cost.toLocaleString()
                    }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center">
                    <div
                      v-for="i in getSimpleProductsList(item.products)"
                      class="h-[46px] w-[46px] flex justify-center items-center"
                    >
                      <NuxtImg
                        provider="customProvider"
                        :src="i.product.photos[0].filepath"
                        class="object-contain w-full h-full"
                      />
                    </div>
                    <div
                      v-if="getMergedProducts(item.products).length > 2"
                      class="h-[46px] w-[46px] bg-gray-1 flex justify-center items-center text-gray-text"
                    >
                      +{{ getMergedProducts(item.products).length - 2 }}
                    </div>
                  </div>

                  <IconChevron
                    class="w-6 h-6 text-gray-text cursor-pointer absolute top-4 right-4 lg:static"
                    :class="{
                      'rotate-180': item.open,
                    }"
                  />
                </div>
              </div>
            </div>
          </template>
          <template v-if="item.open" #footer>
            <div class="flex flex-col lg:flex-row gap-4 -m-4 lg:-m-6">
              <div
                class="w-full lg:w-1/3 border-b-[1px] lg:border-r-[1px] border-gray-1 flex flex-col p-4 lg:p-6 gap-6 text-secondary"
              >
                <div class="text-[20px] font-medium !leading-[120%]">
                  Order details
                </div>
                <div class="flex flex-col gap-4">
                  <div class="flex justify-between items-center">
                    <div>Subtotal</div>
                    <div>USD {{ item.cost }}</div>
                  </div>
                  <div class="flex justify-between items-center">
                    <div>Delivery</div>
                    <div>${{ item.delivery_cost }}</div>
                  </div>
                  <div class="flex justify-between items-center">
                    <div>Delivery time</div>
                    <div>{{ item.delivery_time }} days</div>
                  </div>
                  <div class="flex justify-between items-center">
                    <div>Total</div>
                    <div>
                      USD
                      <span class="font-medium">{{
                        Number(item.cost) + Number(item.delivery_cost)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul
                class="w-full lg:w-2/6 flex flex-col p-4 lg:p-6 gap-3 flex-1 overflow-auto max-h-[248px]"
              >
                <NuxtLink
                  :to="`/${Entity.watches}/${i.product.id}`"
                  v-for="i in item.products[Entity.watches]"
                  class="flex items-center gap-2"
                >
                  <NuxtImg
                    provider="customProvider"
                    :src="i.product.photos[0].filepath"
                    class="object-contain w-[56px] h-[56px]"
                  />
                  <div class="flex flex-col gap-1">
                    <div class="text-secondary text-[14px]">
                      {{ i.product.model }}
                    </div>
                    <div class="text-[14px]">
                      USD
                      <span class="font-medium">{{
                        i.product.purchase_price
                      }}</span>
                    </div>
                  </div>
                </NuxtLink>
                <NuxtLink
                  :to="`/${Entity.accessories}/${i.product.id}`"
                  v-for="i in item.products[Entity.accessories]"
                  class="flex items-center gap-2"
                >
                  <NuxtImg
                    provider="customProvider"
                    :src="i.product.photos[0].filepath"
                    class="object-contain w-[56px] h-[56px]"
                  />
                  <div class="flex flex-col gap-1">
                    <div class="text-secondary text-[14px]">
                      {{ i.product.name.value_en }}
                    </div>
                    <div class="text-[14px]">
                      USD
                      <span class="font-medium">{{
                        i.product.purchase_price
                      }}</span>
                    </div>
                  </div>
                </NuxtLink>
                <NuxtLink
                  :to="`/${Entity.jewelry}/${i.product.id}`"
                  v-for="i in item.products[Entity.jewelry]"
                  class="flex items-center gap-2"
                >
                  <NuxtImg
                    provider="customProvider"
                    :src="i.product.photos[0].filepath"
                    class="object-contain w-[56px] h-[56px]"
                  />
                  <div class="flex flex-col gap-1">
                    <div class="text-secondary text-[14px]">
                      {{ i.product.article }}
                    </div>
                    <div class="text-[14px]">
                      USD
                      <span class="font-medium">{{
                        i.product.purchase_price
                      }}</span>
                    </div>
                  </div>
                </NuxtLink>
              </ul>
            </div>
          </template>
        </AppCard>
      </div>
      <div v-else>
        <div class="flex flex-col gap-4 p-4 bg-white">
          <div class="text-secondary">
            There is currently nothing in your purchases.
          </div>
          <div class="flex gap-3">
            <NuxtLink
              class="text-primary hover:text-primary-hover underline"
              to="/watches"
              >Watches</NuxtLink
            >
            <NuxtLink
              class="text-primary hover:text-primary-hover underline"
              to="/jewelry"
              >Jewelry</NuxtLink
            >
            <NuxtLink
              class="text-primary hover:text-primary-hover underline"
              to="/accessories"
              >Accessories</NuxtLink
            >
          </div>
          <AppButton to="/watches" size="md" class="w-full" dark
            >Go shopping</AppButton
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Entity } from "~/types";
import AppCard from "./AppCard.vue";
import IconChevron from "../icons/IconChevron.vue";
import PurchasesLoader from "./PurchasesLoader.vue";
import { useDateFormat } from "@vueuse/core";

const purchasesStore = usePurchasesStore();

function getMergedProducts(products: any) {
  return [
    ...products[Entity.watches],
    ...products[Entity.jewelry],
    ...products[Entity.accessories],
  ];
}

function getSimpleProductsList(products: any) {
  const merged = getMergedProducts(products);
  const list = [];

  for (const key in merged) {
    if (list.length >= 2) {
      break;
    }

    list.push(merged[key]);
  }
  return list;
}
</script>

<style scoped></style>
