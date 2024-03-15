import { defineStore } from "pinia";
import { TResponseSingle } from "~/types";

interface IPaymentRequest {
  order_id: number;
  payerAddress: string;
  network: string;
  save_payment_method: boolean;
  investment_id: number;
  currency: number;
  payment_type: "purchase" | "investment";
}
interface IDeposit {
  depositAddress: string;
  network: string;
  id: number;
  payment_type: "purchase" | "investment";
  qrCode: string;
}

export const usePaymentsStore = defineStore("payments", () => {
  // input
  const orderId = ref<number | null>(null);
  const payerAddress = ref<string | null>(null);
  const network = ref<string | null>(null);

  // output
  const deposit = ref<IDeposit>();

  async function makeOrderPayment() {
    const body = {
      order_id: orderId.value,
      payerAddress: payerAddress.value,
      network: network.value,
      currency: 0,
      payment_type: "purchase",
    } as IPaymentRequest;

    const { data } = await useApiFetch<TResponseSingle<IDeposit>>("payments", {
      method: "POST",
      body,
    });
    if (data.value) {
      deposit.value = data.value.data;
    }
  }

  async function makeInvestmentPayment() {
    const body = {
      order_id: orderId.value,
      payerAddress: payerAddress.value,
      network: network.value,
      currency: 0,
      payment_type: "purchase",
    } as IPaymentRequest;

    const { data, error, pending } = await useApiFetch("payments", {
      method: "POST",
      body,
    });
  }
  return { orderId, deposit, makeOrderPayment, makeInvestmentPayment };
});
