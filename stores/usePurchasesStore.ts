import { defineStore } from "pinia";
import { Entity, TResponse } from "~/types";
import { IOrder } from "~/types";

export const usePurchasesStore = defineStore("purchases", () => {
  const loading = ref(false);

  const { data, pending } = useApiFetch<TResponse<IOrder>>(Entity.orders, {
    method: "GET",
  });

  const purchases = computed<IOrder[]>(() => {
    if (data.value) {
      return data.value.data.items;
    }
    return [];
  });

  return {
    purchases,
    data,
    loading: pending,
  };
});
