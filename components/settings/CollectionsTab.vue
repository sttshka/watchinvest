<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between">
      <div class="text-[36px] font-medium">Коллекция часов</div>
      <AppButton
        size="md"
        dark
        class="flex gap-3 text-base font-medium !min-w-fit"
        @click="createCollection"
      >
        <span
          ><svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="https://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1103_11336)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.25892 6.25322H6.25322V6.25892L0 6.25894V7.7468L6.25322 7.74678L6.2532 14H7.74106L7.74108 7.74678H7.74678V7.74108L14 7.74106V6.2532L7.74678 6.25322L7.7468 0H6.25894L6.25892 6.25322Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_1103_11336">
                <rect width="14" height="14" fill="currentColor" />
              </clipPath>
            </defs>
          </svg>
        </span>
        <span>Создать коллекцию</span>
      </AppButton>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <AppCard v-for="collection in collectionsStore.collections">
        <template #content>
          <div class="flex flex-col p-6 gap-6">
            <div>
              <div class="font-medium text-[20px] text-secondary">
                {{ getLocalizedValue(collection.title) }}
              </div>
              <div class="text-gray-text text-[16px]">
                {{ getLocalizedValue(collection.description) }}
              </div>
            </div>
            <div class="flex gap-2">
              <NuxtImg
                v-if="collection.image"
                provider="customProvider"
                class="h-20 w-20"
                :src="collection.image.filepath"
              />
              <div v-else class="w-20 h-20 bg-gray-1"></div>
            </div>

            <IconEdit
              @click="editCollection(collection)"
              class="w-6 h-6 absolute top-6 right-6 hover:text-primary transition-colors cursor-pointer"
            />
          </div>
        </template>
      </AppCard>
    </div>
  </div>

  <ClientOnly>
    <Teleport to="body">
      <AppModal v-model="editIsOpen" @close="editIsOpen = false">
        <EditCollection
          @close="editIsOpen = false"
          :loading="collectionsStore.isLoading"
          :collection="selectedCollection"
        />
      </AppModal>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import IconEdit from "../icons/IconEdit.vue";
import AppCard from "./AppCard.vue";
import { ICollection } from "~/types";
import { getLocalizedValue } from "~/utils";
import EditCollection from "./modals/EditCollection.vue";

const collectionsStore = useCollectionsStore();

const editIsOpen = ref(false);
const selectedCollection = ref<ICollection>();
function editCollection(collection: ICollection) {
  console.log("editCollection");

  editIsOpen.value = true;
  selectedCollection.value = collection;
}
</script>

<style scoped></style>
