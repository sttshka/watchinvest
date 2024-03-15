<template>
  <div class="w-full flex flex-col">
    <div class="flex gap-3 p-3">
      <div class="flex flex-1 flex-col gap-1" v-for="item in filter.items">
        <div>{{ item.title }}</div>
        <input
          v-model.trim="values[item.value]"
          type="number"
          class="bg-gray-1 w-full placeholder:text-gray-text h-10 p-3 outline-none selection:bg-primary selection:text-white"
          placeholder="100"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IFilter } from "~/types";

const props = defineProps<{
  filter: IFilter;
}>();

const searchStore = useNewSearchStore();

const values = reactive({
  from: "",
  to: "",
});

function applyCost() {
  props.filter.items.forEach((item) => {
    searchStore.handleSelect(props.filter, item, values[item.value]);
  });
}
</script>

<style scoped></style>
