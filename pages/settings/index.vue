<template>
  <div class="bg-gray-1 min-h-screen flex flex-col">
    <InnerPageHeader class="!h-fit p-0">
      <AppBreadcrumbs class="!pb-0 !pt-3" :items="breadcrumbs" />
    </InnerPageHeader>

    <div class="adaptive-container px-4 lg:px-0 flex flex-1 w-full">
      <div class="flex gap-6 py-10 w-full">
        <aside class="h-full w-full lg:w-1/4 hidden lg:flex">
          <ul class="w-full">
            <li
              v-for="tab in tabs"
              :key="tab.name"
              class="p-4 cursor-pointer text-secondary border-l-[2px] border-transparent flex items-center gap-4 !leading-[150%]"
              :class="{
                '!bg-white !border-primary ':
                  currentTab === tab.name && tab.name !== 'investor',
                'hover:bg-gray-2': tab.name !== 'investor',
                'bg-primary text-white': tab.name === 'investor',
              }"
              @click="handleSelectTab(tab.name)"
            >
              <component
                class="h-6 w-6 fill-transparent"
                :is="tab.icon"
              ></component>
              <div class="flex justify-between items-center flex-1">
                <span class="text-base">
                  {{ tab.title }}
                </span>
                <span v-if="tab.name === 'investor'" class="text-[14px]"
                  >На проверке</span
                >
              </div>
            </li>
          </ul>
        </aside>
        <div class="h-full w-full lg:w-3/4" v-if="getInnerComponent">
          <component :is="getInnerComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileTab from "~/components/settings/ProfileTab.vue";
import CollectionsTab from "~/components/settings/CollectionsTab.vue";
import PayHistoryTab from "~/components/settings/PayHistoryTab.vue";
import CompanyInvestmentTab from "~/components/settings/CompanyInvestmentTab.vue";
import ProductInvestmentTab from "~/components/settings/ProductInvestmentTab.vue";
import PurchasesTab from "~/components/settings/PurchasesTab.vue";
import MyWatchesTab from "~/components/settings/MyWatchesTab.vue";
import FavoritesTab from "~/components/settings/FavoritesTab.vue";
import IconBag from "~/components/icons/IconBag.vue";
import IconHeart from "~/components/icons/IconHeart.vue";
import IconWatchRounded from "~/components/icons/IconWatchRounded.vue";
import IconWatchCollection from "~/components/icons/IconWatchCollection.vue";
import IconCompany from "~/components/icons/IconCompany.vue";
import IconCube from "~/components/icons/IconCube.vue";
import IconPaymentHistory from "~/components/icons/IconPaymentHistory.vue";
import IconSettings from "~/components/icons/IconSettings.vue";
import IconTicket from "~/components/icons/IconTicket.vue";

definePageMeta({
  middleware: "is-logined",
});

const route = useRoute();
const router = useRouter();

const breadcrumbs = ref([]);
const currentTab = computed(() => {
  const { tab } = route.query;
  return tab ?? "profile";
});
const profileTab = shallowRef(ProfileTab);
const collectionsTab = shallowRef(CollectionsTab);
const purchasesTab = shallowRef(PurchasesTab);
const payHistoryTabTab = shallowRef(PayHistoryTab);
const companyInvestmentTab = shallowRef(CompanyInvestmentTab);
const productInvestmentTab = shallowRef(ProductInvestmentTab);
const myWatchesTab = shallowRef(MyWatchesTab);
const favoritesTab = shallowRef(FavoritesTab);

interface ITab {
  title: string;
  name: string;
  icon: any;
  component: any;
}

const tabs = ref<ITab[]>([
  {
    title: "Мои покупки",
    name: "my-purchases",
    icon: IconBag,
    component: purchasesTab,
  },
  {
    title: "Избранное",
    name: "favorites",
    icon: IconHeart,
    component: favoritesTab,
  },
  {
    title: "Мои часы NFT",
    name: "my-watches-nft",
    component: myWatchesTab,
    icon: IconWatchRounded,
  },
  {
    title: "Коллекции часов",
    name: "collections",
    component: collectionsTab,
    icon: IconWatchCollection,
  },
  {
    title: "Инвестиции в компанию",
    name: "company-investments",
    component: companyInvestmentTab,
    icon: IconCompany,
  },
  {
    title: "Инвестиции в продукт",
    name: "products-investments",
    component: productInvestmentTab,
    icon: IconCube,
  },
  {
    title: "История платежей",
    name: "pay-history",
    component: payHistoryTabTab,
    icon: IconPaymentHistory,
  },
  {
    title: "Настройки",
    name: "profile",
    component: profileTab,
    icon: IconSettings,
  },
  {
    title: "Стать инвестором",
    name: "investor",
    icon: IconTicket,
  },
]);

const getInnerComponent = computed(() => {
  const foundTab = tabs.value.find((tab) => tab.name === currentTab.value);
  if (foundTab) {
    return foundTab.component;
  }
  return null;
});

function handleSelectTab(tabName: string) {
  router.push({ query: { tab: tabName } });
  // currentTab.value = tabName;
}
</script>

<style scoped></style>
