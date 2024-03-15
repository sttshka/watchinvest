<template>
  <template v-if="error">
    <div
      class="min-h-screen text-red text-[32px] flex justify-center items-center"
    >
      Error
    </div>
  </template>
  <template v-else-if="item">
    <InnerPageHeader>
      <AppBreadcrumbs class="!w-[472px] truncate" :items="breadcrumbs" />
      <div class="flex justify-between py-3 xl:py-10">
        <!-- header-left -->
        <div
          class="flex flex-1 lg:flex-initial flex-col gap-3 xl:gap-4 2xl:gap-6"
        >
          <div class="grid grid-cols-3 gap-[12px] lg:gap-4">
            <div
              v-for="i in 3"
              class="w-full h-[100px] lg:!w-[96px] lg:!h-[96px] xl:!w-[120px] xl:!h-[120px] 2xl:!w-[146px] 2xl:!h-[146px] flex justify-center items-center overflow-clip bg-gray-3"
            >
              <NuxtImg
                v-if="item.photos[i - 1]"
                provider="customProvider"
                class="!object-cover items-center !object-center flex w-full h-full"
                :src="item.photos[i - 1].filepath"
              />
              <div
                v-else
                class="w-full h-[100px] lg:w-[96px] lg:h-[96px] xl:w-[120px] xl:h-[120px] 2xl:w-[146px] 2xl:h-[146px] bg-gray-3"
              ></div>
            </div>
          </div>
          <div class="flex items-center gap-4 w-full">
            <AppButton
              size="md"
              outline
              @click="pageStore.toggleModal('photoGallery', true)"
              class="!border-gray-1 !border-opacity-10 gap-2 flex items-center !text-primary hover:!text-secondary flex-1 !max-w-full"
            >
              <IconImage class="!w-6 !h-6" />
              <span class="text-white">All Photos</span>
            </AppButton>
            <AppButton
              size="md"
              outline
              class="!border-gray-1 !border-opacity-10 gap-2 flex items-center !text-primary hover:!text-secondary flex-1 !max-w-full"
            >
              <IconPlay class="!w-6 !h-6" />
              <span class="text-white">Video</span>
            </AppButton>
          </div>
        </div>

        <div
          class="hidden lg:flex xl:flex-auto justify-center items-center relative"
        >
          <div
            class="flex lg:w-[320px] lg:h-[320px] xl:w-[392px] xl:h-[392px] 2xl:w-[472px] 2xl:h-[472px] absolute top-0"
            v-if="item.photos.length"
          >
            <NuxtImg
              :src="item.photos[0].filepath"
              provider="customProvider"
              sizes="xl:10vw 2xl:100vw"
              format="webp"
              class="w-full h-full absolute top-0 mx-auto object-contain"
            />
          </div>
        </div>

        <!-- header-right -->
        <div
          class="hidden lg:flex flex-col justify-between lg:min-w-[320px] xl:min-w-[392px] 2xl:min-w-[472px]"
        >
          <div class="flex justify-between text-white">
            <div class="flex flex-col gap-2">
              <div
                class="xl:text-[24px] 2xl:text-[36px] !leading-[120%] font-medium"
              >
                150 BTC
              </div>
              <div
                class="text-primary xl:text-[17px] 2xl:text-[20px] !leading-[150%]"
              >
                <template v-if="item.purchase_price">
                  USD {{ Number(item.purchase_price).toLocaleString() }}
                </template>
                <template v-else>0</template>
              </div>
            </div>
            <div
              class="text-[14px] flex flex-col justify-center items-end gap-3 font-medium"
            >
              <button
                class="flex items-center gap-2 text-white hover:text-primary transition-colors"
              >
                <IconShare class="!w-6 !h-6" />
                <span>Share</span>
              </button>

              <button
                class="flex items-center gap-2 text-white text-[14px] !leading-[150%] hover:text-primary transition-colors fill-none"
                :class="{
                  '!text-primary fill-primary': item?.is_favorite,
                }"
                @click="toggleFavorite"
              >
                <IconHeart class="!w-6 !h-6" />
                <span v-if="!item?.is_favorite">Add to favorite</span>
                <span v-else>Remove from favorite</span>
              </button>
            </div>
          </div>
          <div class="flex items-center gap-4 w-full">
            <AppButton size="lg" class="h-[60px] flex-1 !max-w-full"
              >Buy now</AppButton
            >

            <AppButton
              size="lg"
              color="secondary"
              class="h-[60px] flex-1 !max-w-full"
              :disabled="
                cartStore.checkProductInCart(item.id, Entity.accessories)
              "
              :loading="cartStore.productsIsLoading"
              :to="
                cartStore.checkProductInCart(item.id, Entity.accessories)
                  ? '/cart'
                  : null
              "
              @click.once="handleAddToCart"
            >
              <template
                v-if="
                  !cartStore.checkProductInCart(item.id, Entity.accessories)
                "
                >Add to cart</template
              >
              <template v-else>Already in cart</template>
            </AppButton>
          </div>
        </div>

        <Teleport to="body">
          <div
            class="fixed lg:hidden left-0 right-0 bottom-0 flex flex-col gap-3 justify-between p-3 bg-secondary z-10"
          >
            <div class="flex justify-between text-white">
              <div class="flex flex-col gap-2">
                <div class="text-[18px] !leading-[120%]">150 BTC</div>
                <div class="text-primary xl:text-base !leading-[150%]">
                  $285 718.80
                </div>
              </div>
              <div
                class="text-[14px] flex flex-col justify-center items-end gap-2"
              >
                <button
                  class="flex items-center text-[14px] gap-2 text-white hover:text-primary"
                >
                  <IconShare class="!w-6 !h-6" />
                  <span>Share</span>
                </button>
                <button
                  class="flex items-center gap-2 text-white text-[14px] !leading-[150%] hover:text-primary transition-colors fill-none"
                  :class="{
                    '!text-primary fill-primary': item?.is_favorite,
                  }"
                  @click="toggleFavorite"
                >
                  <IconHeart class="!w-6 !h-6" />
                  <span v-if="!item?.is_favorite">Add to favorite</span>
                  <span v-else>Remove from favorite</span>
                </button>
              </div>
            </div>
            <div class="flex items-center gap-3 w-full">
              <AppButton size="lg" class="h-[60px] flex-1 !max-w-full"
                >Buy now</AppButton
              >
              <AppButton size="lg" outline class="h-[60px] flex-1 !max-w-full"
                >Add to cart</AppButton
              >
            </div>
          </div>
        </Teleport>
      </div>
    </InnerPageHeader>

    <div class="bg-white px-4 lg:px-0">
      <div
        class="w-full adaptive-container flex flex-col lg:flex-row justify-between py-4 lg:py-6 xl:py-8 2xl:py-10 relative gap-6"
      >
        <div class="lg:max-w-[320px] xl:max-w-[392px] 2xl:max-w-[472px] w-full">
          <div class="flex flex-col gap-3 lg:gap-4">
            <div
              class="text-[18px] xl:text-[24px] 2xl:text-[36px] text-secondary line-clamp-3 leading-[120%] font-medium"
            >
              <template v-if="item.name">
                {{ item.name.value_en }}
              </template>
              <template v-else>–</template>
            </div>

            <div
              class="text-secondary text-[12px] lg:text-[14px] leading-[150%]"
            >
              New · Year of production 2022 · Original box · Original papers
            </div>
          </div>

          <div
            class="h-[1px] w-full bg-secondary my-4 xl:my-6 2xl:my-8 opacity-[0.08]"
          />

          <div class="flex flex-col gap-2 lg:gap-3 xl:gap-4 2xl:gap-6">
            <div
              class="text-secondary text-14px :text-[17px] font-medium xl:text-[18px] 2xl:text-[28px] !leading-[120%]"
            >
              More About This Listing
            </div>
            <div class="flex flex-col gap-2 xl:gap-3 2xl:gap-4">
              <div
                class="flex text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%]"
              >
                <div class="flex-1">Brand</div>
                <NuxtLink
                  v-if="item.brand"
                  :to="`/brands/${item.brand.id}`"
                  class="flex-1 text-primary underline decoration-slice"
                >
                  {{ item.brand.title }}
                </NuxtLink>
                <div v-else class="flex-1 text-gray-text">–</div>
              </div>
              <div
                class="flex text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%]"
              >
                <div class="flex-1">Article</div>
                <div
                  v-if="item.article"
                  class="flex-1 text-primary underline decoration-slice"
                >
                  {{ item.article }}
                </div>
                <div v-else class="flex-1 text-gray-text">–</div>
              </div>
              <div
                class="flex text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%]"
              >
                <div class="flex-1">Type</div>
                <div
                  v-if="item.type"
                  class="flex-1 text-primary underline decoration-slice"
                >
                  {{ item.type.value_en }}
                </div>
                <div v-else class="flex-1 text-gray-text">–</div>
              </div>
              <div
                class="flex text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%]"
              >
                <div class="flex-1">Reference number</div>
                <div v-if="item.reference_number" class="flex-1 text-gray-text">
                  {{ item.reference_number }}
                </div>
                <div v-else class="flex-1 text-gray-text">–</div>
              </div>
              <div
                class="flex text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%]"
              >
                <div class="flex-1">Listing code</div>
                <div v-if="item.listing_code" class="flex-1 text-gray-text">
                  {{ item.listing_code }}
                </div>
                <div v-else class="flex-1 text-gray-text">–</div>
              </div>
              <div
                class="flex text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%]"
              >
                <div class="flex-1">Listing date</div>
                <div v-if="item.listing_date" class="flex-1 text-gray-text">
                  {{ useDateFormat(item.listing_date, "DD.MM.YYYY").value }}
                </div>
                <div v-else class="flex-1 text-gray-text">–</div>
              </div>
              <div
                class="flex text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%]"
              >
                <div class="flex-1">Location</div>
                <div v-if="item.location" class="flex-1 text-gray-text">
                  {{ item.location.country }}, {{ item.location.city }},
                  {{ item.location.address }}
                </div>
                <div v-else class="flex-1 text-gray-text">–</div>
              </div>
            </div>
          </div>

          <div
            class="h-[1px] w-full bg-secondary my-4 xl:my-6 2xl:my-8 opacity-[0.08]"
          />

          <div class="flex flex-col gap-2 xl:gap-4 2xl:gap-6">
            <div
              class="text-secondary text-[17px] font-medium xl:text-[18px] 2xl:text-[28px] !leading-[120%]"
            >
              Model Specifications
            </div>
            <div class="flex flex-col gap-2 xl:gap-3 2xl:gap-4">
              <div
                class="flex text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%]"
              >
                <div class="flex-1">Compound</div>
                <div v-if="item.compound_cn" class="flex-1 text-gray-text">
                  {{ item.compound_cn }}
                </div>
                <div v-else class="flex-1 text-gray-text">–</div>
              </div>
            </div>
          </div>

          <div
            class="h-[1px] w-full bg-secondary my-4 xl:my-6 2xl:my-8 opacity-[0.08]"
          />

          <div class="flex flex-col gap-2 xl:gap-4 2xl:gap-6">
            <div
              class="text-secondary text-[17px] font-medium xl:text-[18px] 2xl:text-[28px] !leading-[120%]"
            >
              Introduction
            </div>

            <div
              class="text-secondary text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%]"
              v-if="item.description_en"
            >
              Audemars Piguet Royal Oak double balance wheel mounts a movement
              of the highest manufacture with a new patented Dualbalance
              extremely complex structure that makes this timepiece precise and
              stable. Available with 18K rose gold case, sapphire crystal
              caseback, 41mm skeletonized dial and 18kt rose gold bracelet.
            </div>
            <div v-else class="flex-1 text-gray-text">–</div>
          </div>
        </div>
      </div>

      <div class="bg-gray-1 px-4 lg:px-0 hidden lg:block" v-if="false">
        <div
          class="w-full adaptive-container flex justify-between py-16 flex-col lg:gap-10 xl:gap-12 2xl:gap-14"
        >
          <div
            class="flex-1 text-[18px] lg:text-[24px] 2xl:text-[36px] text-secondary !leading-[120%] font-medium"
          >
            Similar Watches
          </div>

          <div class="flex flex-col gap-6">
            <ProductList
              :list="productStore.products"
              :loading="productStore.productsIsLoading"
            />
          </div>

          <div class="flex justify-center">
            <AppButton
              class="flex w-full gap-2 px-8 2xl:px-10 items-center justify-center"
              color="secondary"
              dark
              outline
            >
              <span>Watch More</span>
              <IconChevron class="w-4 h-4 -rotate-90" />
            </AppButton>
          </div>
        </div>
      </div>
    </div>

    <ClientOnly>
      <Teleport to="body">
        <AppModalGallery
          :photos="item.photos"
          @close="pageStore.toggleModal('photoGallery', false)"
        />
      </Teleport>
    </ClientOnly>
  </template>
</template>

<script setup lang="ts">
import IconPlay from "~/components/icons/IconPlay.vue";
import IconImage from "~/components/icons/IconImage.vue";
import IconShare from "~/components/icons/IconShare.vue";
import IconHeart from "~/components/icons/IconHeart.vue";
import IconChevron from "~/components/icons/IconChevron.vue";
import AppButton from "~/components/AppButton.vue";
import AppModalGallery from "~/components/AppModalGallery.vue";

import ProductList from "~/components/product/ProductList.vue";
import AppTable from "~/components/AppTable.vue";
import AppChart from "~/components/AppChart.vue";
import AppRetail from "~/components/AppRetail.vue";
import AppProductInvest from "~/components/AppProductInvest.vue";
import { Entity, IAccessory } from "~/types";
import { useDateFormat } from "@vueuse/core";

const route = useRoute();
const { id } = route.params;

const breadcrumbs = ref([
  {
    title: "Catalog",
    to: "/accessories",
  },
]);

const pageStore = usePageStore();
const searchStore = useNewSearchStore();
const item = ref<IAccessory>();
await handleLoadProduct();
modifyBreadcrumbs();

const cartStore = useCartStore();

async function handleAddToCart() {
  if (cartStore.checkProductInCart(item.value.id, Entity.accessories)) {
    return;
  }
  if (item.value) {
    await cartStore.addToCart(item.value.id, Entity.accessories);
  }
}

async function handleLoadProduct() {
  const res = await searchStore.loadProduct<IAccessory>(
    Entity.accessories,
    id as string
  );
  item.value = res.data.value?.data;
  console.log(item.value);
}
function modifyBreadcrumbs() {
  const newCrumbs = [
    {
      title: item.value?.brand.title,
      to: `/brands/${item.value?.brand.id}`,
    },
    {
      title: item.value?.name.value_en,
      to: `/accessories/${item.value?.id}`,
    },
  ];

  breadcrumbs.value.push(...newCrumbs);
}

const favoritesStore = useFavoritesStore();
async function toggleFavorite() {
  console.log("toggleFavorite");

  const data = {
    product_id: item.value?.id,
    product_type: Entity.accessories,
  };
  if (item.value) {
    if (item.value.is_favorite) {
      const result = await favoritesStore.removeFromFavorites(data);
      if (result) {
        item.value.is_favorite = false;
      }
    } else {
      const result = await favoritesStore.addToFavorites(data);
      if (result) {
        item.value.is_favorite = true;
      }
    }
  }
}
</script>

<style scoped></style>
