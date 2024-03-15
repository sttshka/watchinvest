<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-4">
      <div class="text-[36px] font-medium">Мои часы NFT</div>

      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:gap-6 relative"
      >
        <div class="bg-white flex flex-col h-full" v-for="product in products">
          <div class="p-4">
            <NuxtImg
              provider="customProvider"
              class="h-[216px] w-[216px]"
              :src="product.photos[0].filepath"
            />
            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-1">
                <div class="text-[14px] text-gray-text">
                  Ref. {{ product.ref ?? "no referense" }}
                </div>
                <div
                  class="text-base text-secondary !leading-[150%] font-medium"
                >
                  <div>{{ product.brand }}</div>
                  <div>{{ product.model }}</div>
                </div>
                <div>2023 • New</div>
              </div>
              <div class="flex flex-col gap-1">
                <div class="text-gray-text text-[14px]">Комплект</div>
                <div
                  class="text-base text-secondary !leading-[150%] font-medium"
                >
                  Коробка, документы
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <div class="text-gray-text text-[14px]">Цена</div>
                <div
                  class="text-base text-secondary !leading-[150%] font-medium"
                >
                  USD {{ product.price }}
                </div>
              </div>
            </div>
          </div>
          <button
            @click="openModal(product)"
            class="p-2 flex items-center justify-center gap-[6px] border-t-[1px] border-t-gray-1 font-medium"
          >
            <IconUpload class="h-4 w-4 -translate-y-[2px]" />
            <span>Вывести</span>
          </button>

          <!-- <pre>{{ product }}</pre> -->
        </div>
        <!-- <ProductListItem
          v-for="product in products"
          :entity="Entity.watches"
          :key="product.id"
          :product="product"
        /> -->
      </div>
    </div>
  </div>
  <ClientOnly>
    <Teleport to="body">
      <AppModal v-model="modalIsOpen" @close="modalIsOpen = false">
        <form
          @submit.prevent="submitForm"
          class="flex flex-col gap-10 h-full w-full"
        >
          <div class="text-[28px] !leading-[120%]">
            <span>Вывести NFT</span>
          </div>

          <div class="text-secondary flex flex-col gap-8">
            <AppInput
              v-model="form.address"
              placeholder="Введите адрес"
              type="text"
              title="Адрес"
            />
            <AppInput
              v-model="form.id"
              placeholder="Введите id"
              type="text"
              title="ID"
            />
          </div>
        </form>
      </AppModal>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { TResponse } from "~/types";
import IconChevron from "../icons/IconChevron.vue";
import IconUpload from "../icons/IconUpload.vue";
import AppInput from "~/components/ui/AppInput.vue";

interface INFT {
  brand: string;
  model: string;
  condition: string;
  price: string;
  year_watch: string;
  completeness: string;
  id: number;
  user_id: number;
  photos: [
    {
      filepath: string;
      id: number;
      url: string;
      en: boolean;
      ctime: string;
      dtime: string;
    },
  ];
  ctime: string;
  atime: string;
}

const { data } = useApiFetch<TResponse<INFT>>("user_watches", {
  method: "GET",
});

const products = computed<INFT[]>(() => {
  if (data.value) {
    return data.value.data.items;
  }
  return [];
});

const modalIsOpen = ref(false);
const form = ref<{ address: string; id: string }>({
  address: "",
  id: "",
});

function openModal() {
  modalIsOpen.value = true;
}
function submitForm() {}
</script>

<style scoped></style>
