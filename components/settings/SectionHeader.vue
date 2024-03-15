<template>
  <div class="flex gap-3 items-center">
    <component :is="getMenuLinkIcon(icon)" class="w-6 h-6 2xl:w-8 2xl:h-8" />
    <span class="text-[16px] lg:text-[17px] 2xl:text-[20px] font-medium">{{
      title
    }}</span>
  </div>
</template>

<script setup lang="ts">
import IconLocation from "../icons/IconLocation.vue";
import IconPlasticCard from "../icons/IconPlasticCard.vue";
import IconProfileCircle from "../icons/IconProfileCircle.vue";
defineProps<{
  icon: any;
  title: string;
}>();

function getMenuLinkIcon(icon: string) {
  switch (icon) {
    case "IconProfileCircle":
      return IconProfileCircle;
    case "IconLocation":
      return IconLocation;
    case "IconPlasticCard":
      return IconPlasticCard;
  }
}
</script>

<style scoped></style>
