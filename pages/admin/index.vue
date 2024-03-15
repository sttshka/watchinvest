<template>
  <div class="overflow-hidden min-h-screen bg-gray-1 px-4 lg:px-0">
    <InnerPageHeader>
      <AppBreadcrumbs />
    </InnerPageHeader>
    <div class="w-full adaptive-container flex flex-col gap-10 py-10">
      <div class="flex gap-4">
        <AppButton
          :outline="currentTab.id !== tab.id"
          dark
          @click="currentTab = tab"
          v-for="tab in tabs"
          :key="tab.id"
          >{{ tab.name }}</AppButton
        >
      </div>

      <BrandsTab v-if="currentTab.id === 1" />
      <WatchesTab v-if="currentTab.id === 2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BrandsTab from "~/components/admin/BrandsTab.vue";
import WatchesTab from "~/components/admin/WatchesTab.vue";

definePageMeta({
  middleware: "admin",
});

const tabs = ref([
  {
    name: "Brands",
    id: 1,
  },
  {
    name: "Watches",
    id: 2,
  },
]);

const currentTab = ref(tabs.value[1]);
</script>

<style></style>
