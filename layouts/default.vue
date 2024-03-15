<template>
  <NuxtLoadingIndicator color="#bd9542" />
  <div
    ref="el"
    :class="{
      '!overflow-y-hidden': pageStore.mobileMenuIsOpen,
      'bg-secondary': !isTransparentPage,
      'bg-transparent': isTransparentPage,
    }"
  >
    <AppHeader />

    <slot />

    <AppFooter />
  </div>

  <AppAuthModals />
</template>

<script lang="ts" setup>
import AppHeader from "../components/header/AppHeader.vue";
import AppAuthModals from "../components/AppAuthModals.vue";
import AppFooter from "../components/AppFooter.vue";
import { Entity, Handbook } from "~/types";
import { isClient } from "@vueuse/core";
const pageStore = usePageStore();

pageStore.$onAction((action) => {
  if (action.name === "toggleModal") {
    if (action.args[1] === true) {
      document.body.classList.add("disabled-scroll");
    } else {
      document.body.classList.remove("disabled-scroll");
    }
  }

  if (action.name === "toggleMobileMenu") {
    if (pageStore.mobileMenuIsOpen) {
      document.body.classList.remove("disabled-scroll");
    } else {
      document.body.classList.add("disabled-scroll");
    }
  }
  if (action.name === "toggleMobileFilter") {
    if (pageStore.mobileFilterIsOpen) {
      document.body.classList.remove("disabled-scroll");
    } else {
      document.body.classList.add("disabled-scroll");
    }
  }
});

const router = useRouter();

router.beforeEach(() => {
  pageStore.toggleMobileMenu(false);
  pageStore.closeModals();
  document.body.classList.remove("disabled-scroll");
});

isClient && pageStore.initCurrentLanguage();

const isTransparentPage = computed(() => {
  return ["invest"].includes(router.currentRoute.value.name as string);
});

// search
const searchStore = useNewSearchStore();
await searchStore.loadHandbooks(Entity.enums, {
  handbooksToLoad: [
    Handbook.gender,
    Handbook.watch_mechanism_type,
    Handbook.watch_condition,
    Handbook.watch_completeness,
    Handbook.investment_type,
  ],
});

await searchStore.loadHandbooks(Entity.brands, {
  isRoot: true,
  query: {
    is_watches: true,
  },
});
await searchStore.loadHandbooks(Entity.collections, { isRoot: true });
await searchStore.loadHandbooks(Entity.watches, {
  handbooksToLoad: [
    Handbook.body_materials,
    Handbook.dial_colors,
    Handbook.strap_materials,
    Handbook.functions,
  ],
});
await searchStore.loadHandbooks(Entity.jewelry, {
  handbooksToLoad: [Handbook.jewelry_types],
});
await searchStore.loadHandbooks(Entity.accessories, {
  handbooksToLoad: [Handbook.accessories_types],
});
console.log(searchStore.handbooks);

// cart
const cartStore = useCartStore();

const favoritesStore = useFavoritesStore();
await favoritesStore.refresh();
</script>
