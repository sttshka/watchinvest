<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <div class="text-[36px] font-medium leading-[120%]">
        Инвестиции в компанию
      </div>
      <div class="text-secondary leading-[150%]">
        Пользователь получает 50% от прибыли компании. Инвестиции можно забрать
        не ранее чем через 3 месяца.
      </div>
    </div>

    <AppCard>
      <template #content>
        <!-- tabs -->
        <div class="pt-2">
          <ul class="flex gap-6 items-center pt-6 px-6">
            <li
              v-for="tab in tabs"
              class="flex flex-col relative transition-colors cursor-pointer text-gray-text text-base !leading-[150%]"
              :class="{
                'text-secondary cursor-default ': currentTab.id === tab.id,
              }"
              @click="selectTab(tab)"
            >
              <div class="flex items-center gap-2">
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

        <template v-if="currentTab.id === 1">
          <div class="grid grid-cols-4 bg-gray-1 bg-opacity-[0.40] p-2">
            <div class="text-gray-text text-[14px] px-2">Сумма инвестиции</div>
            <div class="text-gray-text text-[14px] px-2">Время инвестиции</div>
            <div class="text-gray-text text-[14px] px-2">Полученный доход</div>
            <div class="text-gray-text text-[14px] px-2">Детали инвестиции</div>
          </div>

          <div class="flex flex-col">
            <div
              class="grid grid-cols-4 px-2 py-4 border-b-[1px] border-gray-1 last:border-none"
              v-for="i in 8"
            >
              <div class="flex gap-2 px-2">
                <GreenDollar class="h-[18px] w-[18px] mt-[2px]" />
                <div class="flex flex-col gap-[2px]">
                  <div class="text-[14px] text-secondary font-medium">
                    3,999
                  </div>
                  <div class="text-[14px] text-secondary">USD</div>
                </div>
              </div>
              <div class="flex flex-col gap-[2px] px-2">
                <div class="text-[14px] text-secondary">2023-11-01</div>
                <div class="text-[14px] text-secondary">14:30:00</div>
              </div>
              <div class="flex gap-2 px-2">
                <GreenDollar class="h-[18px] w-[18px] mt-[2px]" />
                <div class="flex flex-col gap-[2px]">
                  <div class="text-[14px] text-secondary font-medium">
                    3,999
                  </div>
                  <div class="text-[14px] text-secondary">USD</div>
                </div>
              </div>
              <div class="px-2 text-[14px] text-secondary flex items-center">
                Нет деталей
              </div>
            </div>
          </div>
        </template>
        <template v-if="currentTab.id === 2">
          <div class="grid grid-cols-8 bg-gray-1 bg-opacity-[0.40] p-2">
            <div class="text-gray-text text-[14px] px-2">Товар</div>
            <div class="text-gray-text text-[14px] px-2">Цена инвестиции</div>
            <div class="text-gray-text text-[14px] px-2">Цена продажи</div>
            <div class="text-gray-text text-[14px] px-2">Выставление</div>
            <div class="text-gray-text text-[14px] px-2">Продажа</div>
            <div class="text-gray-text text-[14px] px-2">Статус</div>
            <div class="text-gray-text text-[14px] px-2">Маржа</div>
            <div class="text-gray-text text-[14px] px-2">Профит</div>
          </div>

          <div class="flex flex-col">
            <div
              class="grid grid-cols-8 px-2 py-4 relative w-full border-b-[1px] border-gray-1 last:border-none"
              v-for="i in 8"
            >
              <div class="px-2 text-[14px] underline text-secondary">
                Patek Philippe Calatrava
              </div>
              <div class="flex gap-2 px-2">
                <GreenDollar class="h-[18px] w-[18px] mt-[2px]" />
                <div class="flex flex-col gap-[2px]">
                  <div class="text-[14px] text-secondary font-medium">
                    3,999
                  </div>
                  <div class="text-[14px] text-secondary">USD</div>
                </div>
              </div>
              <div class="flex gap-2 px-2">
                <GreenDollar class="h-[18px] w-[18px] mt-[2px]" />
                <div class="flex flex-col gap-[2px]">
                  <div class="text-[14px] text-secondary font-medium">
                    3,999
                  </div>
                  <div class="text-[14px] text-secondary">USD</div>
                </div>
              </div>
              <div class="flex flex-col gap-[2px] px-2">
                <div class="text-[14px] text-secondary">2023-11-01</div>
                <div class="text-[14px] text-secondary">14:30:00</div>
              </div>
              <div class="flex flex-col gap-[2px] px-2">
                <div class="text-[14px] text-secondary">2023-11-01</div>
                <div class="text-[14px] text-secondary">14:30:00</div>
              </div>
              <div class="px-2 text-[14px] flex items-center">
                <div class="bg-gray-2 text-gray-text bg-opacity-40 py-1 px-2">
                  Продано
                </div>
              </div>
              <div class="flex gap-2 px-2 z-10">
                <GreenDollar class="h-[18px] w-[18px] mt-[2px]" />
                <div class="flex flex-col gap-[2px]">
                  <div class="text-[14px] text-secondary font-medium">
                    3,999
                  </div>
                  <div class="text-[14px] text-secondary">USD</div>
                </div>
              </div>
              <div class="flex gap-2 px-2 z-10">
                <GreenDollar class="h-[18px] w-[18px] mt-[2px]" />
                <div class="flex flex-col gap-[2px]">
                  <div class="text-[14px] text-green font-medium">3,999</div>
                  <div class="text-[14px] text-secondary">USD</div>
                </div>
              </div>
              <div
                class="w-1/4 h-full absolute right-0 bg-gradient-to-l from-[#D7EDD9] z-0"
              ></div>
            </div>
          </div>
        </template>

        <!-- content -->
      </template>
      <template #footer>
        <div class="max-w-fit">
          <AppPagination
            :model-value="1"
            :page-count="2"
            :max="7"
            :total="10"
            :divider="'…'"
            substrate
            class="hidden lg:flex"
          />
        </div>
      </template>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import GreenDollar from "../icons/GreenDollar.vue";
import AppCard from "./AppCard.vue";

interface ITab {
  id: number;
  tilte: string;
  active: boolean;
}

const tabs = ref<ITab[]>([
  {
    id: 1,
    tilte: "История инвестиций",
    active: false,
  },
  {
    id: 2,
    tilte: "Расход инвестиций",
    active: false,
  },
]);

const currentTab = ref<ITab>(tabs.value[0]);

function selectTab(tabItem: ITab) {
  currentTab.value = tabItem;
}
</script>

<style scoped></style>
