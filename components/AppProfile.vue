<template>
  <template v-if="auth.isLoggedIn">
    <AppTooltip type="click" v-model="isOpen" remove-styles class="z-10">
      <template #trigger>
        <button
          class="text-primary hover:text-primary-hover transition-colors duration-300 flex items-center gap-1"
        >
          <NuxtImg
            v-if="auth.user?.avatar?.filepath"
            provider="customProvider"
            class="inline object-cover h-6 w-6 lg:h-8 lg:w-8 rounded-full"
            :src="auth.user?.avatar?.filepath"
            alt="Profile image"
          />
          <div
            v-else
            class="text-base lg:text-[17px] 2xl:text-[20px] leading-[150%] flex items-center justify-center h-6 w-6 lg:h-8 lg:w-8 rounded-full bg-current"
          >
            <span class="mt-[3px] text-white">
              {{ userFirstLetter }}
            </span>
          </div>
          <IconChevron class="h-4 w-4" />
        </button>
      </template>

      <template #content>
        <div
          class="bg-white border-[1px] border-gray-1 mt-2 flex flex-col items-start"
        >
          <div class="flex items-center gap-2 py-2 px-3 cursor-default">
            <IconProfileCircle class="w-[20px] h-[20px] text-secondary" />
            <div>secre.t.argaryen@gmail.com</div>
          </div>
          <div
            class="flex items-center gap-2 py-2 px-3 hover:bg-primary hover:text-white hover:cursor-pointer w-full text-secondary transition-colors"
            v-for="link in menuLinks"
            @click="linkAction(link)"
          >
            <div class="w-[20px] h-[20px]">
              <component :is="link.icon" />
            </div>
            <div>{{ link.title }}</div>
          </div>
          <!-- <div class="py-2 px-4 text-right">{{ user?.email }}</div>
          <div class="flex flex-col">
            <NuxtLink
              v-for="link in menuLinks"
              to="/settings?tab=my-purchases"
              class="py-2 px-4 text-right hover:bg-gray-1 flex-1 flex"
            >
              {{ link.title }}
            </NuxtLink>
            <NuxtLink
              to="/settings?tab=my-purchases"
              class="py-2 px-4 text-right hover:bg-gray-1"
            >
              Purchases
            </NuxtLink>
            <NuxtLink
              to="/settings?tab=profile"
              class="py-2 px-4 text-right hover:bg-gray-1"
            >
              Settings
            </NuxtLink>
            <NuxtLink
              to="/settings?tab=favorites"
              class="py-2 px-4 text-right hover:bg-gray-1"
            >
              Favorite
            </NuxtLink>
            <button
              class="py-2 px-4 text-right hover:bg-gray-1"
              @click="auth.logout"
            >
              Logout
            </button>
          </div> -->
        </div>
      </template>
    </AppTooltip>
  </template>

  <button
    v-else
    @click="pageStore.toggleModal('authorization', true)"
    class="flex items-center gap-2 transition-all text-white hover:text-primary"
  >
    <IconProfile class="w-6 h-6 lg:h-8 lg:w-8" />
    <span class="hidden xl:inline-block">Sign In</span>
  </button>
</template>

<script setup lang="ts">
import IconBag from "./icons/IconBag.vue";
import IconChevron from "./icons/IconChevron.vue";
import IconHeart from "./icons/IconHeart.vue";
import IconLogout from "./icons/IconLogout.vue";
import IconProfile from "./icons/IconProfile.vue";
import IconProfileCircle from "./icons/IconProfileCircle.vue";
import IconSettings from "./icons/IconSettings.vue";

const route = useRoute();
const pageStore = usePageStore();
const auth = useAuthStore();

const user = computed(() => auth.user);
const userFirstLetter = computed(() => {
  return user.value?.email.toUpperCase().split("")[0];
});

const isOpen = ref(false);

interface IMenuLink {
  title: string;
  to?: string;
  icon: any;
  action?: () => {};
}

const menuLinks = ref<IMenuLink[]>([
  {
    title: "Purchases",
    to: "/settings?tab=my-purchases",
    icon: IconBag,
  },
  {
    title: "Settings",
    to: "/settings?tab=profile",
    icon: IconSettings,
  },
  {
    title: "Logout",
    action: async () => {
      if (route.name === "settings") {
        navigateTo("/");
      }
      await auth.logout();
      isOpen.value = false;
    },
    icon: IconLogout,
  },
]);

function linkAction(link: IMenuLink) {
  if (link.to) {
    navigateTo(link.to);
    return;
  }

  if (link.action) {
    link.action();
    return;
  }
}
</script>

<style scoped></style>
