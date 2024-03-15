<template>
  <div class="flex flex-col justify-center items-center py-9">
    <AppCard class="w-screen lg:w-[390px] 2xl:w-[472px]">
      <template #header>
        <div class="flex flex-col gap-1">
          <div class="text-gray-text text-[15px] lg:text-[16px]">
            Сумма к выплате
          </div>
          <div class="text-[17px] lg:text-[20px] flex items-center gap-[6px]">
            <span class="font-medium">
              {{ cartStore.total.toLocaleString() }}
            </span>
            <span>USD</span>
          </div>
        </div>
      </template>
      <template #content>
        <div
          v-if="stage === 1"
          class="flex flex-col gap-3 p-6"
        >
          <div class="text-gray-text">Выберите криптовалюту:</div>
          <ul class="flex flex-col gap-2">
            <li
              v-for="(item, i) in firstStep"
              :key="i"
              class="p-4 border-[1px] border-gray-1 flex items-center gap-3 hover:bg-gray-1 cursor-pointer"
              @click="handleNextStep(item, 1)"
            >
              <component :is="item.icon" />

              <div
                class="text-secondary font-medium flex-1 text-[15px] lg:text-[16px]"
              >
                {{ item.title }}
              </div>
              <IconCehevron class="h-[20px] w-[20px] -rotate-90" />
            </li>
          </ul>
        </div>
        <div
          v-if="stage === 2"
          class="flex flex-col gap-3 p-6"
        >
          <div class="text-gray-text">Select a Network:</div>
          <ul
            class="flex flex-col gap-2"
            v-if="chain"
          >
            <li
              v-for="(item, i) in secondStep[chain]"
              :key="i"
              class="p-4 border-[1px] border-gray-1 flex items-center gap-3 hover:bg-gray-1 cursor-pointer"
              @click="handleNextStep(item, 2)"
            >
              <component :is="item.icon" />

              <div
                class="text-secondary font-medium flex-1 text-[15px] lg:text-[16px]"
              >
                {{ item.title }}
              </div>
              <IconCehevron class="h-[20px] w-[20px] -rotate-90" />
            </li>
          </ul>
        </div>
        <div v-if="stage === 3">
          <div class="flex flex-col gap-3 p-6">
            <AppInput
              v-model:model-value="address"
              title="Введите свой кошелек для проверки"
              :error-message="addressError"
            />

            <AppButton
              v-if="!paymentResult"
              size="md"
              class="w-full !max-w-full"
              :loading="isLoading"
              @click="submit()"
              >
              Проверить кошелек
            </AppButton>

            <div
              v-else
              class="flex flex-col"
            >
              <p class="text-gray-text text-[15px] lg:text-[16px]">
                Отсканируйте QR-код для оплаты в платежном приложении:
              </p>
              <pre
                class="leading-none text-center flex items-center justify-center"
              >
                {{ paymentResult.qrCode }}
              </pre>
            </div>

            <button
              v-if="!paymentResult"
              type="button"
              class="text-secondary text-[14px] text-center underline cursor-pointer"
              @click.prevent="cancelOrder()"
            >
              Отмена
            </button>
            <button
              v-else
              type="button"
              class="text-secondary text-[14px] text-center underline cursor-pointer"
              @click.prevent="cancelOrder()"
            >
              Отмена и возврат
            </button>
          </div>

          <div
            v-if="paymentResult"
            :class="{'!bg-pink' : isTimerStop}"
            class="p-6 bg-warning flex items-center justify-center gap-2"
          >
            <svg
              v-if="!isTimerStop"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M5.85547 18.0026L7.57666 16.2804M18.5833 18.0026L16.8622 16.2804M6.62767 6.04688L7.57666 6.99584"
                stroke="#BD9542"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.2226 4.35938V5.07715M12.2226 20.6428V18.2084M21.2225 11.6428H18.7883M3.78125 11.6428H5.65695"
                stroke="#BD9542"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p class="text-primary text-xl font-medium">
              {{ findinTranzaction }}
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <button
          v-if="stage === 1 || stage === 2"
          type="button"
          class="text-secondary text-[14px] text-center underline cursor-pointer"
          @click.prevent="cancelOrder()"
        >
          Отмена
        </button>

        <div
          v-if="stage === 3"
          class="text-gray-text text-[14px] flex flex-col justify-center items-center gap-3"
        >
          <div>Оставшееся время:</div>
          <div class="text-secondary text-[20px] font-medium">
            {{ currentTimeFormat }}
          </div>
        </div>
      </template>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import AppInput from "~/components/ui/AppInput.vue";
import IconCehevron from "~/components/icons/IconChevron.vue";
import Ethereum from "~/components/icons/currencies/ethereum.vue";
import Tether from "~/components/icons/currencies/tether.vue";
import AppCard from "~/components/settings/AppCard.vue";
import AppButton from "~/components/AppButton.vue";

const paymentStore = usePaymentsStore();
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const nuxtApp = useNuxtApp();
const isTimerStop = ref(false);
const findinTranzaction = ref('Обнаружение транзакции')

definePageMeta({
  layout: "payment",
});

const stage = ref(1);
const chain = ref<string>();
const network = ref<string>();
const address = ref("");
const addressError = ref("");
const isLoading = ref(false);
const orderId = ref(null);
const paymentResult = ref(null);
const currentTime = ref(5 * 60);
const timer = ref(null);

const firstStep = ref([
  {
    title: "Tether (USDT)",
    value: "usdt",
    icon: Tether,
  },
]);

const secondStep = ref({
  usdt: [
    {
      title: "USDT TRC20 Network",
      value: "trc20",
      icon: Tether,
    },
    {
      title: "USDT ERC20 Network",
      value: "erc20",
      icon: Ethereum,
    },
  ],
});

watch(
  () => address.value,
  () => {
    addressError.value = "";
  }
);

watch(
  () => currentTime.value,
  (time) => {
    if (time === 0) {
      stopTimer();
    }
  }
);

const currentTimeFormat = computed(() => {
  return new Date(currentTime.value * 1000).toISOString().substring(11, 19);
});

function handleNextStep(item: any, currentStep: number) {
  if (currentStep === 1) {
    chain.value = item.value;
  }
  if (currentStep === 2) {
    network.value = item.value;

    startTimer();
  }

  stage.value++;
}

const submit = async () => {
  isLoading.value = true;
  const value = address.value;

  if (network.value === "trc20" && !validateTrc(value)) {
    addressError.value = "Please enter a valid address";
    isLoading.value = false;
    return;
  } else if (network.value === "erc20" && !validateErc(value)) {
    addressError.value = "Please enter a valid address";
    isLoading.value = false;
    return;
  }

  const walletData = {
    chain: network.value,
    address: value,
  };

  const wallet = await useApiFetch("wallets", {
    method: "POST",
    body: walletData,
  });

  if (wallet?.error?.value?.data) {
    addressError.value = wallet?.error.value.data.error;
    isLoading.value = false;
    return;
  }

  const products = {};

  for (const key in cartStore.selectedProducts) {
    products[key] = cartStore.selectedProducts[key].map((item) => {
      return {
        product_id: item.productId,
      };
    });
  }

  const orderData = {
    products: products,
    cost: cartStore.subtotal,
    wallet_data: walletData,
  };

  // if () {
  //   orderData.delivery_type = 'delivery'
  //   // orderData.delivery_address_id = null;
  // }

  if (checkoutStore.deliveryOffice) {
    orderData.delivery_type = "self_delivery";
    orderData.self_delivery_address_id = checkoutStore.deliveryOffice.id;
  }


  const order = await useApiFetch("orders", {
    method: "POST",
    body: orderData,
  });

  if (order?.error?.value?.data) {
    addressError.value = order.error.value.data.error;
    isLoading.value = false;
    return;
  }

  orderId.value = order?.data?.value?.data?.id || null;

  const paymentData = {
    order_id: orderId.value,
    payerAddress: value,
    network: network.value,
    // currency: 0,
    payment_type: "purchase", // "purchase" || "investment"
  };

  const payment = await useApiFetch("payments", {
    method: "POST",
    body: paymentData,
  });

  isLoading.value = false;

  if (payment?.error?.value?.data) {
    addressError.value = payment.error.value.data.error;
    isLoading.value = false;
    return;
  }

  paymentResult.value = payment?.data?.value?.data || null;
};

const validateTrc = (value: string) => {
  return value[0] === "T" && value.length === 34;
};

const validateErc = (value: string) => {
  return /^(0x)?[0-9a-f]{40}$/i.test(value);
};

const startTimer = () => {
  timer.value = setInterval(() => {
    currentTime.value--;

  }, 1000);

};

const stopTimer = () => {
  clearTimeout(timer.value);
  isTimerStop.value = true
  cancelOrder()
};

const cancelOrder = async () => {
  findinTranzaction.value = 'отменет'
  if (orderId.value) {
    await useApiFetch(`orders/${orderId.value}`, {
      method: "POST",
      body: {
        status: "canceled",
      },
    });

    return navigateTo("/", {
      replace: true,
    });
  }

  navigateTo("/checkout", {
    replace: true,
  });
};
onBeforeUnmount(() => {
  stopTimer()
})

</script>

<style scoped></style>
