<template>
  <div class="flex lg:grid grid-cols-3 gap-4">
    <div
      v-for="(tab, i) in tabs"
      :key="i"
      class="flex gap-3 p-4 items-center border-gray-1 border-[1px] transition-colors"
      :class="{
        'bg-gray-1 text-primary flex-1': tab.id <= currentTab.id,
        'text-gray-1 cursor-pointer': tab.id !== currentTab.id,
      }"
      @click="handleSelectTab(tab.id)"
    >
      <div
        class="bg-current h-8 w-8 flex items-center justify-center rounded-full font-medium text-base !leading-[150%] pt-[2px]"
      >
        <span
          class="text-gray-text transition-colors"
          :class="{
            'text-white': tab.id <= currentTab.id,
          }"
          >{{ tab.id }}</span
        >
      </div>
      <div
        class="text-secondary"
        :class="{
          'hidden lg:block': tab.id !== currentTab.id,
        }"
      >
        {{ tab.title }}
      </div>
    </div>
  </div>

  <component :is="currentTab.component" />
</template>

<script setup lang="ts">
import DeliveryTab from "./DeliveryTab.vue";
import PaymentTab from "./PaymentTab.vue";
import SummaryTab from "./SummaryTab.vue";

const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const checkoutStore = useCheckoutStore();

const tabs = ref<{ id: number; title: string; component: any }[]>([
  {
    id: 1,
    title: "Delivery",
    component: DeliveryTab,
  },
  {
    id: 2,
    title: "Payment",
    component: PaymentTab,
  },
  {
    id: 3,
    title: "Your order",
    component: SummaryTab,
  },
]);

const currentTab = computed(() => {
  return tabs.value.find((t) => t.id === props.modelValue) || tabs.value[0];
});

function handleSelectTab(tabID: number) {
  if ((tabID === 2 || tabID === 3) && !checkoutStore.isDeliveryFilled) {
    return false;
  } else if (tabID === 3 && !checkoutStore.isPaymentFilled) {
    return false;
  }

  emit("update:modelValue", tabID);
}
</script>

<style scoped></style>
