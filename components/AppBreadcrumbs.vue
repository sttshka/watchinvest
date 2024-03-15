<template>
  <div
    class="flex items-center text-gray-text gap-3 !leading-[150%] h-full py-2 lg:pt-6 lg:pb-10"
  >
    <NuxtLink
      to="/"
      class="flex items-center gap-2 text-white hover:!text-primary transition-colors"
    >
      <IconHome
        class="flex items-center justify-center mt-[-4px] text-gray-text"
      />
      <div>Home</div>
    </NuxtLink>
    <NuxtLink
      v-for="(item, index) in items"
      :key="item.title"
      class="flex items-center gap-3 hover:text-primary transition-colors"
      :to="item.to"
    >
      <div class="text-gray-text">/</div>
      <div
        class="truncate"
        :class="
          index === items.length - 1
            ? 'text-gray-text hover:text-primary transition-colors'
            : 'text-white hover:text-primary transition-colors'
        "
      >
        {{ item.title }}
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import IconHome from "./icons/IconHome.vue";

interface IBreadcrumbItem {
  title: string;
  to: string;
}

defineProps<{
  items: IBreadcrumbItem[];
}>();
</script>

<style></style>
