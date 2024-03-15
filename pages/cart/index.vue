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
        <div
          v-if="cartStore.cartIsEmpty"
          class="flex justify-center items-center h-full min-h-[calc(100vh/1.5)]"
        >
          <div class="border-[1px] border-gray-1 p-6 flex flex-col gap-6">
            <div class="flex flex-col gap-4 items-center justify-center">
              <NuxtImg
                class="h-[180px] w-[180px]"
                src="/images/ShoppingBag.svg"
              />
              <div class="flex flex-col gap-2 text-secondary items-center">
                <div class="font-medium text-[36px] !leading-[120%]">
                  Shopping Bag
                </div>
                <div class="text-base !leading-[150%]">
                  There is nothing in your basket at the moment.
                </div>
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
            </div>
            <AppButton
              to="/watches"
              size="md"
              class="w-full !max-w-full"
              dark
              >Go shopping</AppButton
            >
          </div>
        </div>
        <div
          v-else
          class="flex flex-wrap justify-between mt-5 items-start relative gap-6"
        >
          <div class="flex flex-col gap-10 flex-1 h-full w-3/4">
            <div class="flex flex-col gap-4 flex-1 h-full relative">
              <!-- Watches -->
              <div
                v-for="item in cartStore.productCart.products[Entity.watches]"
                :key="item.product.id"
                class="p-4 border-[1px] border-gray-1 flex flex-col gap-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-[10px]">
                    <AppCheckbox
                      :model-value="
                        cartStore.checkIsSelected(
                          item.product.id,
                          Entity.watches
                        )
                      "
                      @update:model-value="
                        cartStore.toggleSelectProduct(
                          item.product.id,
                          Entity.watches
                        )
                      "
                      class="h-6 w-6"
                    />
                    <div class="font-medium">Shipping From: 🇪🇸</div>
                  </div>
                  <div class="text-gray-text flex items-center gap-4">
                    <div class="flex items-center gap-1">
                      <IconInfo class="h-[20px] w-[20px]" />
                      <span>
                        Goods from foreign boutiques may be subject to duties.
                      </span>
                    </div>
                    <button
                      @click="
                        cartStore.fullRemoveFromCart(
                          item.product.id,
                          Entity.watches
                        )
                      "
                    >
                      <IconClose
                        class="h-6 w-6 cursor-pointer hover:text-red transition-colors"
                      />
                    </button>
                  </div>
                </div>
                <div class="h-[1px] w-full bg-gray-1"></div>
                <div class="flex gap-6 flex-1">
                  <NuxtImg
                    v-if="item.product.photos.length"
                    provider="customProvider"
                    class="w-[160px] h-[160px] object-contain"
                    :src="item.product.photos[0].filepath"
                  />
                  <div
                    v-else
                    class="w-[160px] h-[160px] bg-gray-1"
                  />
                  <div class="flex flex-1 flex-col">
                    <NuxtLink
                      :to="`/watches/${item.product.id}`"
                      class="font-medium text-secondary text-base !leading-[150%] hover:text-primary transition-colors"
                    >
                      {{ item.product.model }}
                    </NuxtLink>
                    <div
                      class="line-clamp-2 text-secondary text-[14px] !leading-[150%]"
                    >
                      {{ item.product.description }}
                    </div>
                    <div class="text-gray-text text-[14px] !leading-[150%]">
                      {{ item.product.reference }}
                    </div>
                  </div>
                  <div class="flex flex-1 justify-end">
                    <div class="text-right">
                      USD
                      <span class="font-medium">
                        <template v-if="item.product.purchase_price">
                          {{
                            Number(item.product.purchase_price).toLocaleString()
                          }}
                        </template>
                        <template v-else>0</template>
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col justify-between flex-1">
                    <div class="flex flex-col gap-3">
                      <!-- <div class="flex items-center justify-between">
                        <div class="text-[14px]">Size</div>
                        <AppChangeButton v-model="item.size" />
                      </div> -->
                      <!-- <div class="flex items-center justify-between">
                        <div class="text-[14px]">Quantity</div>
                      </div> -->
                    </div>
                    <button
                      class="flex items-center gap-2 text-secondary font-medium text-[14px] !leading-[150%] hover:text-primary transition-colors fill-none"
                      :class="{
                        '!text-primary fill-primary': item.product.is_favorite,
                      }"
                      @click="toggleFavorite(item.product, Entity.watches)"
                    >
                      <IconHeart class="!w-6 !h-6" />
                      <span v-if="!item.product.is_favorite"
                        >Add to favorite</span
                      >
                      <span v-else>Remove from favorite</span>
                    </button>
                  </div>
                </div>
              </div>
              <!-- Jewelry -->
              <div
                v-for="item in cartStore.productCart.products[Entity.jewelry]"
                :key="item.product.id"
                class="p-4 border-[1px] border-gray-1 flex flex-col gap-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-[10px]">
                    <AppCheckbox
                      :model-value="
                        cartStore.checkIsSelected(
                          item.product.id,
                          Entity.jewelry
                        )
                      "
                      @update:model-value="
                        cartStore.toggleSelectProduct(
                          item.product.id,
                          Entity.jewelry
                        )
                      "
                      class="h-6 w-6"
                    />
                    <div class="font-medium">Shipping From: 🇪🇸</div>
                  </div>
                  <div class="text-gray-text flex items-center gap-4">
                    <div class="flex items-center gap-1">
                      <IconInfo class="h-[20px] w-[20px]" />
                      <span>
                        Goods from foreign boutiques may be subject to duties.
                      </span>
                    </div>
                    <button
                      @click="
                        cartStore.fullRemoveFromCart(
                          item.product.id,
                          Entity.jewelry
                        )
                      "
                    >
                      <IconClose
                        class="h-6 w-6 cursor-pointer hover:text-red transition-colors"
                      />
                    </button>
                  </div>
                </div>
                <div class="h-[1px] w-full bg-gray-1"></div>
                <div class="flex gap-6 flex-1">
                  <NuxtImg
                    v-if="item.product.photos.length"
                    provider="customProvider"
                    class="w-[160px] h-[160px] object-contain"
                    :src="item.product.photos[0].filepath"
                  />
                  <div
                    class="w-[160px] h-[160px] bg-gray-1"
                    v-else
                  ></div>
                  <div class="flex flex-1 flex-col">
                    <NuxtLink
                      :to="`/jewelry/${item.product.id}`"
                      class="font-medium text-secondary text-base !leading-[150%] hover:text-primary transition-colors"
                    >
                      {{ item.product.article }}
                    </NuxtLink>
                    <div
                      class="line-clamp-2 text-secondary text-[14px] !leading-[150%]"
                    >
                      {{ item.product.description }}
                    </div>
                    <div class="text-gray-text text-[14px] !leading-[150%]">
                      {{ item.product.reference }}
                    </div>
                  </div>
                  <div class="flex flex-1 justify-end">
                    <div class="text-right">
                      USD

                      <span class="font-medium">
                        <template v-if="item.product.purchase_price">
                          {{
                            Number(item.product.purchase_price).toLocaleString()
                          }}
                        </template>
                        <template v-else>0</template>
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col justify-between flex-1">
                    <div class="flex flex-col gap-3">
                      <!-- <div class="flex items-center justify-between">
                        <div class="text-[14px]">Size</div>
                        <AppChangeButton v-model="item.size" />
                      </div> -->
                      <!-- <div class="flex items-center justify-between">
                        <div class="text-[14px]">Quantity</div>
                      </div> -->
                    </div>

                    <button
                      class="flex items-center gap-2 text-secondary font-medium text-[14px] !leading-[150%] hover:text-primary transition-colors fill-none"
                      :class="{
                        '!text-primary fill-primary': item.product.is_favorite,
                      }"
                      @click="toggleFavorite(item.product, Entity.jewelry)"
                    >
                      <IconHeart class="!w-6 !h-6" />
                      <span v-if="!item.product.is_favorite"
                        >Add to favorite</span
                      >
                      <span v-else>Remove from favorite</span>
                    </button>
                  </div>
                </div>
              </div>
              <!-- Accessories -->
              <div
                v-for="item in cartStore.productCart.products[
                  Entity.accessories
                ]"
                :key="item.product.id"
                class="p-4 border-[1px] border-gray-1 flex flex-col gap-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-[10px]">
                    <AppCheckbox
                      :model-value="
                        cartStore.checkIsSelected(
                          item.product.id,
                          Entity.accessories
                        )
                      "
                      @update:model-value="
                        cartStore.toggleSelectProduct(
                          item.product.id,
                          Entity.accessories
                        )
                      "
                      class="h-6 w-6"
                    />
                    <div class="font-medium">Shipping From: 🇪🇸</div>
                  </div>
                  <div class="text-gray-text flex items-center gap-4">
                    <div class="flex items-center gap-1">
                      <IconInfo class="h-[20px] w-[20px]" />
                      <span>
                        Goods from foreign boutiques may be subject to duties.
                      </span>
                    </div>
                    <button
                      @click="
                        cartStore.fullRemoveFromCart(
                          item.product.id,
                          Entity.accessories
                        )
                      "
                    >
                      <IconClose
                        class="h-6 w-6 cursor-pointer hover:text-red transition-colors"
                      />
                    </button>
                  </div>
                </div>
                <div class="h-[1px] w-full bg-gray-1"></div>
                <div class="flex gap-6 flex-1">
                  <NuxtImg
                    v-if="item.product.photos.length"
                    provider="customProvider"
                    class="w-[160px] h-[160px] object-contain"
                    :src="item.product.photos[0].filepath"
                  />
                  <div
                    class="w-[160px] h-[160px] bg-gray-1"
                    v-else
                  ></div>
                  <div class="flex flex-1 flex-col">
                    <NuxtLink
                      :to="`/accessories/${item.product.id}`"
                      class="font-medium text-secondary text-base !leading-[150%] hover:text-primary transition-colors"
                    >
                      {{ item.product.article }}
                    </NuxtLink>
                    <div
                      class="line-clamp-2 text-secondary text-[14px] !leading-[150%]"
                    >
                      {{ item.product.description }}
                    </div>
                    <div class="text-gray-text text-[14px] !leading-[150%]">
                      {{ item.product.reference }}
                    </div>
                  </div>
                  <div class="flex flex-1 justify-end">
                    <div class="text-right">
                      USD

                      <span class="font-medium">
                        <template v-if="item.product.purchase_price">
                          {{
                            Number(item.product.purchase_price).toLocaleString()
                          }}
                        </template>
                        <template v-else>0</template>
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col justify-between flex-1">
                    <div class="flex flex-col gap-3">
                      <!-- <div class="flex items-center justify-between">
                        <div class="text-[14px]">Size</div>
                        <AppChangeButton v-model="item.size" />
                      </div> -->
                      <!-- <div class="flex items-center justify-between">
                        <div class="text-[14px]">Quantity</div>
                      </div> -->
                    </div>

                    <button
                      class="flex items-center gap-2 text-secondary font-medium text-[14px] !leading-[150%] hover:text-primary transition-colors fill-none"
                      :class="{
                        '!text-primary fill-primary': item.product.is_favorite,
                      }"
                      @click="toggleFavorite(item.product, Entity.accessories)"
                    >
                      <IconHeart class="!w-6 !h-6" />
                      <span v-if="!item.product.is_favorite"
                        >Add to favorite</span
                      >
                      <span v-else>Remove from favorite</span>
                    </button>
                  </div>
                </div>
              </div>

              <AppLoadingOverlay v-if="cartStore.productsIsLoading" />
            </div>

            <div class="bg-gray-1 p-6 flex gap-3 items-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
              >
                <rect
                  width="40"
                  height="40"
                  rx="20"
                  fill="#BD9542"
                />
                <path
                  d="M19.9922 24V20"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.9922 16.2051H20.0017"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20 29.25C25.1086 29.25 29.25 25.1086 29.25 20V20C29.25 14.8914 25.1086 10.75 20 10.75V10.75C14.8914 10.75 10.75 14.8914 10.75 20V20C10.75 25.1086 14.8914 29.25 20 29.25V29.25Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              <div class="text-[14px] flex flex-col gap-2">
                <div class="font-medium">
                  Important information for customers from Kazakhstan
                </div>
                <div class="flex flex-col gap-1">
                  <div>
                    Goods from overseas boutiques may be subject to duties.
                    Check with local customs authorities to find out the
                    duty-free limit for your country or region.
                  </div>
                  <div>
                    Delivery takes 3-7 working days. You will receive an SMS
                    from the courier service asking you to provide your passport
                    details and TIN for customs clearance.
                  </div>
                  <div>
                    If you have ordered several items from different boutiques,
                    they will be sent in separate parcels.
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-6">
              <div class="p-6 border-[1px] border-gray-1">
                <div class="flex flex-col gap-8 items-center">
                  <svg
                    width="64"
                    height="49"
                    viewBox="0 0 64 49"
                    fill="none"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <rect
                      y="36.5"
                      width="64"
                      height="12"
                      fill="#F0F0F0"
                    />
                    <path
                      d="M12 6.5V42.5H52V6.5H12Z"
                      stroke="#17171B"
                      stroke-width="3"
                      stroke-linecap="square"
                    />
                    <path
                      d="M43.6126 18.2031L32.0846 27.5712L20.5547 18.2031"
                      stroke="#17171B"
                      stroke-width="3"
                      stroke-linecap="square"
                    />
                  </svg>

                  <div class="flex flex-col items-center gap-2">
                    <div class="font-medium">Free of charge refund</div>
                    <div class="text-[14px] text-center">
                      The courier will arrive at a convenient time and pick up
                      the parcel from the
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-6 border-[1px] border-gray-1">
                <div class="flex flex-col gap-8 items-center">
                  <svg
                    width="64"
                    height="49"
                    viewBox="0 0 64 49"
                    fill="none"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <rect
                      y="36.5"
                      width="64"
                      height="12"
                      fill="#F0F0F0"
                    />
                    <path
                      d="M32.5008 6L36.6544 18.7832H50.0954L39.2214 26.6836L43.3748 39.4668L32.5008 31.5664L21.6268 39.4668L25.7803 26.6836L14.9062 18.7832H28.3472L32.5008 6Z"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                  </svg>

                  <div class="flex flex-col items-center gap-2">
                    <div class="font-medium">
                      Rated 4.7/5 and 25,000+ reviews
                    </div>
                    <div class="text-[14px] text-center">
                      Only original products from the best brands - we can be
                      trusted
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-6 border-[1px] border-gray-1">
                <div class="flex flex-col gap-8 items-center">
                  <svg
                    width="64"
                    height="48"
                    viewBox="0 0 64 48"
                    fill="none"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <rect
                      y="36"
                      width="64"
                      height="12"
                      fill="#F0F0F0"
                    />
                    <path
                      d="M32.4998 29.6368C39.0126 29.62 44.5502 32.6104 46.5856 39.0474C42.4828 41.5484 37.6536 42.5118 32.4998 42.4992C27.3461 42.5118 22.5168 41.5484 18.4141 39.0474C20.4519 32.6034 25.9801 29.62 32.4998 29.6368Z"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="square"
                    />
                    <path
                      d="M41.3391 14.3395C41.3391 19.2214 37.3815 23.1788 32.4995 23.1788C27.6177 23.1788 23.6602 19.2214 23.6602 14.3395C23.6602 9.45756 27.6177 5.5 32.4995 5.5C37.3815 5.5 41.3391 9.45756 41.3391 14.3395Z"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="square"
                    />
                  </svg>

                  <div class="flex flex-col items-center gap-2">
                    <div class="font-medium">Don't want to register?</div>
                    <div class="text-[14px] text-center">
                      You don't need to create an account to make a purchase:
                      proceed to checkout as a guest
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside
            class="sticky bottom-0 top-[200px] col-span-3 h-fit w-1/4 justify-center flex flex-col gap-4"
          >
            <div
              class="border-[1px] border-gray-1 p-6 flex flex-col gap-6 text-secondary"
            >
              <div class="text-[20px] font-medium !leading-[120%]">
                Order amount
              </div>
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
                :to="cartStore.selectedProductsIsEmpty ? null : '/checkout'"
                :disabled="cartStore.selectedProductsIsEmpty"
                >Go To Checkout</AppButton
              >
            </div>

            <div class="p-6 bg-gray-1 flex gap-4 items-center break-words">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
              >
                <rect
                  width="40"
                  height="40"
                  rx="20"
                  fill="#BD9542"
                />
                <path
                  d="M19.3797 24.3826C20.2009 24.262 21.0367 24.3846 21.8657 24.3641C23.7892 24.3184 25.2954 22.6926 26.7597 21.5902C27.5079 21.0268 28.5548 21.1018 29.2165 21.7653C29.9501 22.5028 29.9501 23.6976 29.2165 24.4342C27.6354 26.0221 26.2382 27.4942 24.0957 28.327C21.1223 29.4839 18.363 28.9235 15.3516 28.327C14.186 28.0974 13.1128 28.0828 11.9336 28.0828"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.3787 24.3465H21.0026C22.1614 24.3465 23.0984 23.5137 23.0984 22.3539C23.0984 21.3907 22.4455 20.6201 21.5115 20.3856C20.1746 20.0499 18.8407 19.7872 17.4455 19.8213C15.2339 19.8748 13.6869 21.1065 11.9336 22.2799"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28.4033 21.2123L28.3878 14.6944C28.3829 12.3164 27.226 10.9942 24.8471 11L17.3387 11.0166C14.9666 11.0214 13.8565 12.3505 13.8613 14.7284L13.8769 20.9943"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23.1355 11L23.1472 16.4165L21.14 15.7617L19.1211 16.4282L19.1152 11.0175"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <div>Delivery is made by hand-to-hand courier.</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppCheckbox from "~/components/AppCheckbox.vue";
import IconInfo from "~/components/icons/IconInfo.vue";
import IconClose from "~/components/icons/IconClose.vue";
import IconHeart from "~/components/icons/IconHeart.vue";
import AppChangeButton from "~/components/AppChangeButton.vue";
import AppLoadingOverlay from "~/components/ui/AppLoadingOverlay.vue";
import { Entity } from "~/types";

const breadcrumbs = ref([
  {
    title: "Shopping Cart",
    to: "/cart",
  },
]);

const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

async function toggleFavorite(item: any, entity: Entity) {
  const data = {
    product_id: item.id,
    product_type: entity,
  };

  if (item.is_favorite) {
    const result = await favoritesStore.removeFromFavorites(data);
    if (result) {
      item.is_favorite = false;
    }
  } else {
    const result = await favoritesStore.addToFavorites(data);
    if (result) {
      item.is_favorite = true;
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 25%;
  height: 25vh;
  min-height: 200px;
  overflow: auto;
  position: -webkit-sticky;
  position: sticky;
  top: 5%;
}

.main {
  width: 60%;
  height: 200vh;
  min-height: 1000px;
  display: flex;
  flex-direction: column;
}

.main,
.sidebar {
  border-radius: 10px;
  padding: 15px;
}

.wrapper {
  display: flex;
  justify-content: space-between;
}

body {
  padding: 3%;
  font-size: 20px;
  box-sizing: border-box;
  font-family: Lato, sans-serif;
}

code,
pre {
  background-color: #ccc;
  padding: 0 3px;
  border-radius: 5px;
}

.bottom {
  justify-self: bottom;
}
</style>
