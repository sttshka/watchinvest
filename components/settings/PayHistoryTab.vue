<template>
  <div class="flex flex-col gap-4 lg:gap-6">
    <div
      class="text-[18px] lg:text-[24px] 2xl:text-[36px] font-medium text-secondary"
    >
      История платежей
    </div>

    <AppCard>
      <template #content>
        <div class="bg-white">
          <!-- tabs -->
          <div class="pt-2">
            <ul
              class="flex gap-4 lg:gap-6 items-center pt-4 lg:pt-6 px-4 lg:px-6"
            >
              <li
                v-for="tab in tabs"
                class="flex flex-col relative transition-colors cursor-pointer text-gray-text"
                :class="{
                  'text-secondary cursor-default': currentTab.id === tab.id,
                }"
                @click="selectTab(tab)"
              >
                <div class="flex items-center gap-2 font-medium">
                  <div>{{ tab.tilte }}</div>
                </div>
                <transition>
                  <div
                    v-if="currentTab.id === tab.id"
                    class="h-[2px] w-full absolute mt-[9px] top-full bg-primary"
                  ></div>
                </transition>
              </li>
            </ul>
          </div>

          <div class="bg-gray-1 h-[1px] mt-[11px]"></div>
          <!-- content -->
          <div class="p-4 lg:p-6">
            <ul class="flex flex-col">
              <div class="text-[12px] lg:text-[14px] text-gray-text">Today</div>
              <li
                v-for="item in payments"
                class="flex items-center gap-3 py-4 border-b-[1px] border-gray-1 last:border-none"
              >
                <div
                  class="h-[48px] w-[48px] flex items-center justify-center rounded-full"
                  :class="{
                    'bg-warning': true,
                  }"
                >
                  icon
                </div>
                <div class="flex flex-col gap-[2px] flex-1">
                  <div
                    class="font-medium text-secondary flex gap-2 items-center"
                  >
                    <span class="text-[14px] lg:text-[15px] 2xl:text-[16px]">{{
                      item.title
                    }}</span
                    ><span
                      v-if="item.status && item.statusTitle"
                      class="text-[12px] lg:text-[14px] px-[6px] py-[2px] rounded-[4px] text-white flex justify-center items-center"
                      :class="{
                        'bg-primary': item.status === PaymentStatus.process,
                        'bg-green': item.status === PaymentStatus.done,
                        'bg-red': item.status === PaymentStatus.canceled,
                      }"
                      >{{ item.statusTitle }}</span
                    >
                  </div>
                  <div class="text-gray-text text-[12px] lg:text-[14px]">
                    {{ item.model }}
                  </div>
                </div>
                <div class="flex flex-col gap-[2px] items-end">
                  <div
                    class="font-medium flex items-center gap-0 text-[14px] lg:text-[15px] 2xl:text-[16px]"
                    :class="{
                      'text-green': item.priceIndicator,
                      'text-red': !item.priceIndicator,
                    }"
                  >
                    <span v-if="!item.priceIndicator">-</span>
                    <span v-else>+</span>
                    ${{ item.price.toLocaleString() }}
                  </div>
                  <div class="text-gray-text text-[14px]">
                    {{ item.date }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="lg:max-w-fit">
          <AppPagination
            :model-value="1"
            :page-count="2"
            :max="7"
            :total="10"
            :divider="'…'"
            substrate
          />
        </div>
      </template>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import AppCard from "./AppCard.vue";

enum PaymentStatus {
  done = "done",
  canceled = "canceled",
  process = "process",
}

const payments = ref<
  {
    title: string;
    model: string;
    price: number;
    priceIndicator: boolean;
    date: string;
    status?: PaymentStatus;
    statusTitle?: string;
  }[]
>([
  {
    status: PaymentStatus.process,
    title: "Купить",
    price: 245_000,
    priceIndicator: false,
    statusTitle: "В процессе",
    model: "Royal Oak Double Balance Wheel Openworked",
    date: "2023-07-05, 16:47",
  },
  {
    title: "Инвестиционный доход",
    price: 245_000,
    priceIndicator: true,
    model: "Patek Philippe Aquanaut 5168",
    date: "2023-07-05, 16:47",
  },
  {
    status: PaymentStatus.canceled,
    price: 2_450,
    priceIndicator: true,
    title: "Купить",
    statusTitle: "Отменен",
    model: "Patek Philippe Aquanaut 5168",
    date: "2023-07-05, 16:47",
  },
]);

interface ITab {
  id: number;
  tilte: string;
  active: boolean;
}

const tabs = ref<ITab[]>([
  {
    id: 1,
    tilte: "Все",
    active: false,
  },
  {
    id: 2,
    tilte: "Криптовалюта",
    active: false,
  },
  {
    id: 3,
    tilte: "Фиат",
    active: false,
  },
]);

const currentTab = ref<ITab>(tabs.value[0]);

function selectTab(tabItem: ITab) {
  currentTab.value = tabItem;
}
</script>

<style scoped></style>
