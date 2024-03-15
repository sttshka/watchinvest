<template>
  <div class="app-card-feild flex flex-col relative">
    <div class="text-[12px] lg:text-[14px] text-gray-text">{{ title }}</div>
    <div class="text-[14px] lg:text-[15px] 2xl:text-[16px] text-secondary">
      <template v-if="value">
        {{ value }}
      </template>
      <template v-else>–</template>
    </div>

    <div
      v-if="canEdit"
      @click="emit('edit')"
      class="edit-button absolute h-8 w-8 lg:h-10 lg:w-10 bg-gray-1 rounded-full flex items-center justify-center right-0 cursor-pointer top-1/2 -translate-y-1/2 opacity-100 lg:opacity-0 transition-opacity duration-300"
    >
      <IconEdit class="w-1/2 h-1/2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconEdit from "../icons/IconEdit.vue";
defineProps<{
  title: string | null;
  value: string | null;
  canEdit?: boolean;
}>();

const emit = defineEmits<{
  edit: [];
}>();
</script>

<style scoped lang="postcss">
.app-card-feild:hover .edit-button {
  @apply opacity-100;
}
</style>
