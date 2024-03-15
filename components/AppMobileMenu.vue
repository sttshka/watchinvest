<template>
  <Transition>
    <nav
      v-if="pageStore.mobileMenuIsOpen"
      aria-label="Burger menu elements"
      class="flex flex-col w-full lg:hidden fixed bg-secondary bg-opacity-80 backdrop-blur-md z-[51] left-0 right-0 top-[72px] bottom-0 transition-all overflow-y-auto"
    >
      <ul class="border-t-[1px] border-gray-1 border-opacity-[0.08] text-white">
        <li
          v-for="link in links"
          class="px-6 py-4 border-b-[1px] border-gray-1 border-opacity-[0.08]"
          :class="{
            'text-primary': checkIsActive(link.to),
          }"
        >
          <NuxtLink :to="`/${link.to}`" class="flex items-center gap-3">
            <div
              v-if="checkIsActive(link.to)"
              class="h-[2px] w-4 bg-primary rounded-full"
            />
            <div class="flex items-center gap-[10px]">
              <component
                class="w-6 h-6 text-primary"
                v-if="link.icon"
                :is="getMenuLinkIcon(link.icon)"
              />
              <span>{{ link.title }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <AppDropdown v-model="languageMenuIsOpen">
        <template #trigger>
          <button class="flex items-center gap-3">
            <IconGlobe class="w-6 h-6" />
            <span>{{ pageStore.currentLanguage.name }}</span>
          </button>
        </template>

        <template #content>
          <ul>
            <li
              v-for="language in pageStore.languages"
              class="py-2 pl-[60px] pr-6 text-white"
              :class="{
                '!text-gray-text':
                  language.slug === pageStore.currentLanguage.slug,
              }"
              @click="handleChangeLanguage(language)"
            >
              {{ language.name }}
            </li>
          </ul>
        </template>
      </AppDropdown>
    </nav>
  </Transition>
</template>

<script setup lang="ts">
import IconGlobe from "./icons/IconGlobe.vue";
import AppDropdown from "./AppDropdown.vue";
import IconCoin from "./icons/IconCoin.vue";

import { ILanguage, IMenuLink } from "~/types";

defineProps<{
  links: IMenuLink[];
}>();

const pageStore = usePageStore();
const languageMenuIsOpen = ref<boolean>(false);

function handleChangeLanguage(language: ILanguage) {
  if (language.slug !== pageStore.currentLanguage.slug) {
    pageStore.changeLanguage(language);

    languageMenuIsOpen.value = false;
  }
}

const router = useRouter();
function checkIsActive(to: string) {
  return router.currentRoute.value.name === to;
}

function getMenuLinkIcon(icon: string) {
  switch (icon) {
    case "IconCoin":
      return IconCoin;
  }

  return null;
}
</script>

<style scoped></style>
