<template>
  <button
    class="transition-all text-white hover:text-primary fill-none relative"
    @click="handleFavoritesClick"
  >
    <IconHeart class="w-6 h-6 lg:w-8 lg:h-8" />
    <transition>
      <div
        v-if="favoritesStore.favoirtesCounter"
        class="absolute top-0 right-0 -translate-y-1/3 translate-x-[8px] w-[20px] h-[20px] bg-primary rounded-full flex items-center justify-center shadow-dark"
      >
        <span class="text-[14px] translate-y-[1px] leading-[150%] text-white">{{
          favoritesStore.favoirtesCounter
        }}</span>
      </div>
    </transition>
  </button>
</template>

<script setup lang="ts">
import IconHeart from "../icons/IconHeart.vue";
const favoritesStore = useFavoritesStore();
const auth = useAuthStore();
const page = usePageStore();
function handleFavoritesClick() {
  if (!auth.isLoggedIn) {
    page.toggleModal("authorization", true);
    page.navigateAfter.favorite = true;
    // page.modalActionAfterFn = () => {
    //   navigateTo("/settings?tab=favorites", { replace: true });
    //   page.modalActionAfterFn = () => {};
    // };
    return;
  }

  navigateTo("/settings?tab=favorites", { replace: true });
}
</script>

<style scoped></style>
