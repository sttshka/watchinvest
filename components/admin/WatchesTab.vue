<template>
  <WatchesCreate />
  <div class="w-full bg-gray-2 h-[1px] rounded-full"></div>
  <WatchesUpdateAndDelete />
</template>

<script setup lang="ts">
import WatchesUpdateAndDelete from "~/components/admin/watches/WatchesUpdateAndDelete.vue";
import WatchesCreate from "./watches/WatchesCreate.vue";
import { Entity, Handbook } from "~/types";

const searchStore = useNewSearchStore();

await searchStore.loadHandbooks(Entity.watches, {
  handbooksToLoad: [Handbook.watches],
  isRoot: true,
});
</script>

<style scoped></style>
