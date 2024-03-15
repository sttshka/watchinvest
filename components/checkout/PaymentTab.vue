<template>
  <div class="flex flex-col gap-10">
    <div>Select a payment method:</div>
    <AppButton
      size="md"
      :outline="checkoutStore.payment !== 'crypto'"
      dark
      :class="['min-w-[348px]']"
      @click="setPayment('crypto')"
    >
      Cryptocurrency
    </AppButton>
  </div>
</template>

<script setup lang="ts">
const checkoutStore = useCheckoutStore();

const setPayment = (value) => {
  if (checkoutStore.payment === value) {
    checkoutStore.setPayment(null);
  } else {
    checkoutStore.setPayment(value);
  }
};
</script>

<style scoped></style>
