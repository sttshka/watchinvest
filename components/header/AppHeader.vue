<template>
  <header
    class="fixed z-[50] w-full border-b-[1px] border-gray-1 border-opacity-[0.08]"
    :class="{
      'bg-secondary bg-opacity-100': arrivedTop,
      'bg-transparent': arrivedTop && isTransparentPage,
      'bg-secondary bg-opacity-[0.88] backdrop-blur-[12px]': !arrivedTop,
    }"
  >
    <div
      class="w-full px-4 lg:px-0 mx-auto adaptive-container py-[18px] lg:py-2"
    >
      <div
        class="flex items-center lg:justify-between lg:py-[11px] lg:relative"
      >
        <nav class="hidden lg:flex text-white">
          <ul class="flex items-center gap-6">
            <li
              v-for="(link, i) in pageStore.topMenuLinks"
              @mouseenter="handleMenuHover(true, link)"
              @mouseleave="handleMenuHover(false, link)"
              class="text-white hover:text-primary transition-all cursor-pointer relative h-full"
            >
              <NuxtLink
                v-if="isNavItemVisible(link)"
                :to="`/${link.to}`"
                class="text-white hover:text-primary transition-all cursor-pointer flex items-center gap-[10px] lg:text-[15px] 2xl:text-base leading-[150%]"
              >
                <component
                  class="w-6 h-6 -mt-[2px] text-primary"
                  v-if="link.icon"
                  :is="getMenuLinkIcon(link.icon)"
                ></component>
                <span>{{ getLocalizedItem(link) }}</span>
              </NuxtLink>

              <Transition>
                <div
                  v-if="checkIsActive(link.to)"
                  class="bg-primary h-[2px] w-full rounded-full absolute lg:-bottom-[8px] xl:-bottom-[14px] 2xl:-bottom-[17px]"
                />
              </Transition>
            </li>
          </ul>
        </nav>

        <div
          class="flex flex-1 lg:absolute lg:left-1/2 translate-x-0 lg:-translate-x-1/2"
        >
          <NuxtLink to="/" class="">
            <HeaderLogo
              class="text-white hover:text-primary transition-colors w-[115px] lg:w-fit h-9 xl:h-8 2xl:h-10 duration-300"
            />
          </NuxtLink>
        </div>

        <div class="flex items-center flex-row gap-4 lg:gap-6">
          <AppTooltip
            class="hidden lg:block"
            type="click"
            v-model="languageTooltipIsOpen"
          >
            <template #trigger>
              <button
                class="flex items-center gap-2 transition-all text-white hover:text-primary"
              >
                <IconGlobe class="w-6 h-6 lg:h-8 lg:w-8" />
                <span class="hidden xl:inline-block">{{
                  pageStore.currentLanguage.name
                }}</span>
              </button>
            </template>
            <template #content>
              <div
                v-for="language in pageStore.languages"
                class="py-1 px-[20px] cursor-pointer hover:bg-gray-1 transition-colors duration-300"
                :class="{
                  'text-gray-text ':
                    language.slug === pageStore.currentLanguage.slug,
                }"
                @click="handleChangeLanguage(language)"
              >
                {{ language.name }}
              </div>
            </template>
          </AppTooltip>

          <HeaderCart />
          <HeaderFavorites />
          <AppProfile />
          <AppBurgerButton
            class="!w-6 !h-6 flex lg:hidden"
            v-model="pageStore.mobileMenuIsOpen"
            @toggle="pageStore.toggleMobileMenu"
          />
        </div>
      </div>
      <div
        class="hidden lg:flex justify-between items-center xl:py-[6px] 2xl:py-[9px]"
      >
        <nav>
          <ul class="flex items-center gap-6">
            <li v-for="link in pageStore.menuLinks" :key="link.to">
              <NuxtLink
                :to="`/${link.to}`"
                class="text-white hover:text-primary transition-all cursor-pointer"
              >
                {{ getLocalizedItem(link) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <div
          class="relative border-[1px] border-gray-text border-opacity-[0.08] text-gray-text lg:min-w-[198px] 2xl:min-w-[206px] h-[44px] flex items-center"
        >
          <IconSearch class="ml-[10px] !h-6 !w-6" />
          <input
            class="absolute left-0 top-0 pl-[50px] flex flex-1 h-full w-full lg:text-[12px] xl:text-[15px] 2xl:text-base placeholder:text-gray-text lg:placeholder:text-[12px] xl:placeholder:text-[15px] 2xl:placeholder:text-base outline-none bg-transparent"
            placeholder="Reference or name"
          />
        </div>
      </div>
    </div>
    <Transition>
      <div
        v-if="pageStore.linksMenuMenuOpen"
        @mouseenter="handleMenuHover(true)"
        @mouseleave="handleMenuHover(false)"
        class="absolute top-[calc(50%-2px)] w-full border-y-[1px] border-gray-1 border-opacity-[0.08] transition-all bg-secondary bg-opacity-[0.88] backdrop-blur-[12px]"
        :class="{
          '!bg-transparent': arrivedTop && isTransparentPage,
        }"
      >
        <div class="w-full mx-auto adaptive-container text-white py-10">
          <div class="grid grid-cols-6 gap-3">
            <template v-if="pageStore.currentHoveredMenu === 'watches'">
              <NuxtLink
                :to="`/brands/${brand.id}`"
                v-for="brand in searchStore.handbooks[Handbook.brands]"
                :key="brand.id"
                class="flex flex-col opacity-80 hover:opacity-100 transition-opacity duration-300"
              >
                {{ brand.title }}
              </NuxtLink>
            </template>
            <template v-if="pageStore.currentHoveredMenu === 'jewelry'">
              <NuxtLink
                v-for="jewelry in searchStore.handbooks[Handbook.jewelry_types]"
                :to="`/jewelry/${jewelry.id}`"
                :key="jewelry.id"
                class="flex flex-col opacity-80 hover:opacity-100 transition-opacity duration-300"
              >
                {{ getLocalizedHandbookItem(jewelry) }}
              </NuxtLink>
            </template>
            <template v-if="pageStore.currentHoveredMenu === 'accessories'">
              <NuxtLink
                v-for="accessory in searchStore.handbooks[
                  Handbook.accessories_types
                ]"
                :to="`/accessories/${accessory.id}`"
                :key="accessory.id"
                class="flex flex-col opacity-80 hover:opacity-100 transition-opacity duration-300"
              >
                {{ getLocalizedHandbookItem(accessory) }}
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </header>

  <ClientOnly>
    <Teleport to="body">
      <AppMobileMenu
        :links="[...pageStore.topMenuLinks, ...pageStore.menuLinks]"
      />
    </Teleport>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { Handbook, ILanguage, IMenuLink } from "~/types";
import AppBurgerButton from "../AppBurgerButton.vue";
import IconBag from "../icons/IconBag.vue";
import IconGlobe from "../icons/IconGlobe.vue";
import IconHeart from "../icons/IconHeart.vue";
import HeaderLogo from "./HeaderLogo.vue";
import AppMobileMenu from "~/components/AppMobileMenu.vue";
import AppTooltip from "~/components/AppTooltip.vue";
import IconCoin from "~/components/icons/IconCoin.vue";
import IconSearch from "~/components/icons/IconSearch.vue";
import AppProfile from "~/components/AppProfile.vue";
import HeaderCart from "./HeaderCart.vue";
import HeaderFavorites from "./HeaderFavorites.vue";

const pageStore = usePageStore();
const authStore = useAuthStore();
const searchStore = useNewSearchStore();

onMounted(() => {
  window.addEventListener("scroll", setScrollPosition, { passive: true });
  setScrollPosition();
});
onUnmounted(() => {
  window.removeEventListener("scroll", setScrollPosition);
});
const scrollPosition = ref(0);
const arrivedTop = computed(() => scrollPosition.value <= 10);
function setScrollPosition() {
  scrollPosition.value = window.scrollY;
}

const router = useRouter();
const route = useRoute();
function checkIsActive(to: string) {
  return router.currentRoute.value.name === to;
}

const languageTooltipIsOpen = ref<boolean>(false);

function handleChangeLanguage(language: ILanguage) {
  if (language.slug !== pageStore.currentLanguage.slug) {
    pageStore.changeLanguage(language);

    languageTooltipIsOpen.value = false;
  }
}

function getMenuLinkIcon(icon: string) {
  switch (icon) {
    case "IconCoin":
      return IconCoin;
  }

  return null;
}

function isNavItemVisible(link: IMenuLink): boolean {
  return !link.admin || (link.admin && authStore.userIsAdmin);
}

const isTransparentPage = computed(() => {
  return ["invest"].includes(router.currentRoute.value.name as string);
});

function handleMenuHover(value = false, item?: IMenuLink) {
  if (item?.to === "admin" || item?.to === "invest") {
    return null;
  }

  if (item && item.to) {
    pageStore.currentHoveredMenu = item.to;
  }

  if (value === false) {
    pageStore.linkIsHovered = false;
    // TODO: clear timeouts
    setTimeout(() => {
      if (!pageStore.linkIsHovered) {
        pageStore.linksMenuMenuOpen = false;
      }
    }, 300);

    return;
  }

  pageStore.linkIsHovered = true;
  pageStore.linksMenuMenuOpen = value;
}

const getLocalizedItem = (item) => {
  const languageSlug = pageStore.currentLanguage.slug;
  return item.title[`value_${languageSlug}`];
};

const getLocalizedHandbookItem = (item) => {
  const languageSlug = pageStore.currentLanguage.slug;
  return item[`value_${languageSlug}`];
};
</script>

<style></style>
