<template>
  <AppSearchbar
    @search="$emit('search')"
    class="flex flex-1"
    :filters="filters"
  />
</template>

<script lang="ts" setup>
import { IFilter } from "~/types";
import AppSearchbar from "./AppSearchbar.vue";

withDefaults(
  defineProps<{
    filters: IFilter[];
  }>(),
  {
    filters: () => [],
  }
);
</script>

<style></style>
