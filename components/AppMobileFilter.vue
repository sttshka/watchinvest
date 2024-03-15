<template>
  <Transition>
    <div
      v-if="pageStore.mobileFilterIsOpen"
      class="fixed top-0 left-0 right-[-1px] h-full z-[100] bg-secondary bg-opacity-[0.88] lg:hidden"
    >
      <div
        class="flex flex-col absolute top-0 bottom-0 left-0 right-[60px] bg-gray-1 overflow-auto text-[14px] text-secondary"
      >
        <div
          class="p-3 flex justify-between items-center border-b-[1px] border-gray-1 bg-white"
        >
          <div class="text-[17px] font-bold">Filter</div>
          <button @click="pageStore.toggleMobileFilter()">
            <IconClose class="text-secondary h-[20px] w-[20px]" />
          </button>
        </div>

        <AppMobileFilterDropdown v-for="filter in filters" :filter="filter" />

        <AppButton
          class="mt-auto min-h-[64px]"
          @click="pageStore.toggleMobileFilter"
          >Apply</AppButton
        >
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { IFilter } from "~/types";
import IconClose from "./icons/IconClose.vue";
import AppMobileFilterDropdown from "./AppMobileFilterDropdown.vue";
import AppButton from "./AppButton.vue";

const pageStore = usePageStore();

defineProps<{
  filters: IFilter[];
}>();
</script>

<style scoped></style>
