<template>
  <div class="bg-white">
    <InnerPageHeader class="!h-fit p-0">
      <AppBreadcrumbs
        class="!pb-0 !pt-3"
        :items="breadcrumbs"
      />
    </InnerPageHeader>

    <div class="py-10">
      <div class="adaptive-container px-4 lg:px-0">
        <!-- {{ cartStore.selectedProducts }} -->
        <!-- <pre>{{ checkoutStore.productsList }}</pre> -->
        <div
          class="flex flex-col lg:flex-row flex-wrap justify-between mt-5 items-start relative gap-6"
        >
          <div class="flex flex-col gap-10 flex-1 h-full w-full lg:w-3/4">
            <CheckoutTabs v-model:model-value="activeTab" />
          </div>
          <aside
            class="lg:sticky bottom-0 top-[200px] col-span-3 h-fit w-full lg:w-1/4 justify-center flex flex-col gap-4"
          >
            <div
              class="border-[1px] border-gray-1 p-6 flex flex-col gap-6 text-secondary"
            >
              <div class="text-[20px] font-medium !leading-[120%]">
                Order amount
              </div>

              <div class="flex flex-col gap-4">
                <div
                  v-for="(item, i) in checkoutStore.productsList"
                  :key="i"
                  class="flex gap-2 items-center"
                >
                  <!-- <pre>{{ item.product }}</pre> -->
                  <div class="flex flex-col gap-1 flex-1">
                    <div class="line-clamp-1">
                      {{ item.product.model || item.product.article }}
                      <!-- Audemars Piguet Royal Oak Double Balance Wheel Openworked -->
                    </div>
                    <div>
                      USD

                      <span class="font-medium">
                        <template v-if="item.product.purchase_price">
                          {{
                            Number(
                              item.product.purchase_price *
                                (item?.quantity || 1)
                            ).toLocaleString()
                          }}
                        </template>
                        <template v-else>0</template>
                      </span>
                    </div>
                  </div>

                  <NuxtImg
                    v-if="item.product.photos.length"
                    provider="customProvider"
                    :src="item.product.photos[0].filepath"
                    class="w-10 h-10 object-contain"
                  />
                  <div
                    v-else
                    class="w-10 h-10 bg-gray-1"
                  />
                </div>
              </div>

              <div class="bg-gray-1 h-[1px] w-full"></div>

              <div class="flex flex-col gap-4">
                <div class="flex justify-between items-center">
                  <div>Subtotal</div>
                  <div>
                    USD {{ Number(cartStore.subtotal).toLocaleString() }}
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div>Delivery</div>
                  <div>$ {{ Number(cartStore.delivery).toLocaleString() }}</div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="flex gap-2 items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="https://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.00977 10.1328H20.497"
                        stroke="#17171B"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                      <path
                        d="M16.3574 13.7461H16.3659"
                        stroke="#17171B"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                      <path
                        d="M12.2539 13.7461H12.2625"
                        stroke="#17171B"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                      <path
                        d="M8.14062 13.7461H8.14918"
                        stroke="#17171B"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                      <path
                        d="M16.3574 17.3418H16.3659"
                        stroke="#17171B"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                      <path
                        d="M12.2539 17.3418H12.2625"
                        stroke="#17171B"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                      <path
                        d="M8.14062 17.3418H8.14918"
                        stroke="#17171B"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                      <path
                        d="M15.9902 3.28516V6.32914"
                        stroke="#17171B"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                      <path
                        d="M8.51758 3.28516V6.32914"
                        stroke="#17171B"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20.5758 4.74609H3.92578V21.7854H20.5758V4.74609Z"
                        stroke="#17171B"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                    </svg>

                    <span>Delivery time</span>
                  </div>
                  <div>5-7 days</div>
                </div>
              </div>
              <div class="bg-gray-1 h-[1px] w-full"></div>
              <div class="flex justify-between items-center text-[20px]">
                <div>Total</div>
                <div>
                  USD
                  <span class="font-medium">{{
                    Number(cartStore.total).toLocaleString()
                  }}</span>
                </div>
              </div>
              <AppButton
                dark
                size="lg"
                class="min-w-full"
                :to="activeTab === 3 ? '/payment' : null"
                :disabled="isButtonDisabled"
                @click="nextStep()"
              >
                <span v-if="activeTab === 3">Pay</span>
                <span v-else>Continue</span>
              </AppButton>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckoutTabs from "~/components/checkout/CheckoutTabs.vue";

const activeTab = ref(1);
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();

const isButtonDisabled = computed(() => {
  if (activeTab.value === 1 && !checkoutStore.isDeliveryFilled) {
    return true;
  }

  if (activeTab.value === 2 && !checkoutStore.isPaymentFilled) {
    return true;
  }

  return false;
});

const nextStep = () => {
  if (isButtonDisabled.value) {
    return false;
  }

  activeTab.value++;
};
</script>

<style lang="scss" scoped></style>
