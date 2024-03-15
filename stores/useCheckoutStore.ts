import { defineStore } from "pinia";
import paymentVue from "~/layouts/payment.vue";
import { Entity, IAccessory, IJewelry, IWatch } from "~/types";

export const useCheckoutStore = defineStore("checkout", () => {
  const cart = useCartStore();

  const deliveryForm = reactive({
    country: "",
    city: "",
    contact: "",
  });
  const deliveryOffice = ref(null);
  const payment = ref(null);

  const isDeliveryFormFilled = computed(() => {
    return (
      !!deliveryForm.country && !!deliveryForm.city && !!deliveryForm.contact
    );
  });

  const isDeliveryOfficeFilled = computed(() => {
    return !!deliveryOffice.value && !!deliveryForm.contact;
  });

  const isDeliveryFilled = computed(() => {
    return isDeliveryFormFilled.value || isDeliveryOfficeFilled.value ;
  });

  const isPaymentFilled = computed(() => {
    return !!payment.value;
  });

  const productsList = computed(() => {
    return [
      ...cart.productCart.products.watches.filter((product) =>
        cart.checkIsSelected(product.product.id, Entity.watches)
      ),
      ...cart.productCart.products.accessories.filter((product) =>
        cart.checkIsSelected(product.product.id, Entity.accessories)
      ),
      ...cart.productCart.products.jewelry.filter((product) =>
        cart.checkIsSelected(product.product.id, Entity.jewelry)
      ),
    ];
  });

  const setDeliveryForm = (key: string, value: string) => {
    deliveryForm[key] = value;
  };

  const setDeliveryOffice = (value) => {
    deliveryOffice.value = value;
  };

  const setPayment = (value) => {
    payment.value = value;
  };

  return {
    productsList,
    deliveryForm,
    deliveryOffice,
    payment,
    isDeliveryFilled,
    isPaymentFilled,
    setDeliveryForm,
    setDeliveryOffice,
    setPayment,
  };
});
