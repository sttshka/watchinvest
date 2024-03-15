import { defineStore } from "pinia";
import { Entity, IAccessory, IJewelry, IWatch } from "~/types";

type ICartMutation = {
  product_id: number;
  product_type: Entity.accessories | Entity.jewelry | Entity.watches;
};

type ICartProduct<T> = {
  quantity: number;
  product: T;
};

interface ICartRespone {
  status: boolean;
  data: ICart;
}

interface ICart {
  id?: number;
  user_id?: number;
  products: {
    [Entity.jewelry]: ICartProduct<IJewelry>[];
    [Entity.accessories]: ICartProduct<IAccessory>[];
    [Entity.watches]: ICartProduct<IWatch>[];
  };
}

export const useCartStore = defineStore("cart", () => {
  // new format

  const { data, pending, refresh } = useApiFetch<ICartRespone>("cart/", {
    method: "GET",
    onResponse ({ response }) {
      const products = response?._data?.data?.products || null

      if (products && Object.keys(products).length) {
        for (const key in products) {
          products[key].forEach(item => {
            selectedProducts.value[key].push({
              productId: item.product.id,
              entity: key,
            })
          })
        }
      }
    }
  });

  const productCart = computed<ICart>(() => {
    if (data.value) {
      return data.value.data;
    }
    return {
      products: {
        [Entity.jewelry]: [],
        [Entity.watches]: [],
        [Entity.accessories]: [],
      },
    };
  });
  const processing = ref(false);
  const productsIsLoading = computed(() => pending.value || processing.value);

  const selectedProducts = ref<{
    [Entity.jewelry]: { productId: number; entity: Entity }[];
    [Entity.accessories]: { productId: number; entity: Entity }[];
    [Entity.watches]: { productId: number; entity: Entity }[];
  }>({
    [Entity.jewelry]: [],
    [Entity.accessories]: [],
    [Entity.watches]: [],
  });

  const selectedProductsIsEmpty = computed(() => {
    return (
      selectedProducts.value[Entity.jewelry].length === 0 &&
      selectedProducts.value[Entity.accessories].length === 0 &&
      selectedProducts.value[Entity.watches].length === 0
    );
  });

  const subtotal = computed(() => {
    let total = 0;

    // jewelry
    productCart.value.products[Entity.jewelry].forEach((item) => {
      if (checkIsSelected(item.product.id, Entity.jewelry)) {
        total += item.product.purchase_price * (item?.quantity || 1);
      }
    });
    // watches
    productCart.value.products[Entity.watches].forEach((item) => {
      if (checkIsSelected(item.product.id, Entity.watches)) {
        total += item.product.purchase_price * (item?.quantity || 1);
      }
    });
    // accessories
    productCart.value.products[Entity.accessories].forEach((item) => {
      if (checkIsSelected(item.product.id, Entity.accessories)) {
        total += item.product.purchase_price * (item?.quantity || 1);
      }
    });
    return total;
  });

  const delivery = computed(() => {
    return 1000;
  });

  const total = computed(() => {
    return subtotal.value + delivery.value;
  });

  const cartIsEmpty = computed(() => {
    return (
      productCart.value.products[Entity.jewelry].length === 0 &&
      productCart.value.products[Entity.watches].length === 0 &&
      productCart.value.products[Entity.accessories].length === 0
    );
  });

  const itemsCount = computed(() => {
    return (
      productCart.value.products[Entity.jewelry].length +
      productCart.value.products[Entity.watches].length +
      productCart.value.products[Entity.accessories].length
    );
  });

  function checkIsSelected(productId: number, entity: Entity) {
    if (selectedProducts.value && selectedProducts.value[entity]) {
      const foundItem = selectedProducts.value[entity].find(
        (product) => product.productId === productId
      );
      return !!foundItem;
    }
  }

  function toggleSelectProduct(productId: number, entity: Entity) {
    if (selectedProducts.value && selectedProducts.value[entity]) {
      const foundItem = selectedProducts.value[entity].find(
        (product) => product.productId === productId
      );
      if (foundItem) {
        selectedProducts.value[entity] = selectedProducts.value[entity].filter(
          (product) => product.productId !== productId
        );
      } else {
        selectedProducts.value[entity].push({ productId, entity });
      }
    }
  }

  function checkProductInCart(productId: number, entity: Entity) {
    const foundItem = productCart.value.products[entity].find(
      (product) => product.product.id === productId
    );
    return !!foundItem;
  }

  async function addToCart(productId: number, entity: Entity) {
    const { data } = await useApiFetch<ICartRespone>("cart/", {
      method: "POST",
      body: {
        product_id: productId,
        product_type: entity,
      } as ICartMutation,
    });
    if (data.value) {
      await refresh();
    }
  }

  async function removeFromCart(productId: number, entity: Entity) {
    const { data } = await useApiFetch<ICartRespone>("cart/remove", {
      method: "POST",
      body: {
        product_id: productId,
        product_type: entity,
      } as ICartMutation,
    });

    if (data.value) {
      await refresh();
    }
  }

  async function fullRemoveFromCart(productId: number, entity: Entity) {
    const { data } = await useApiFetch<ICartRespone>("cart/full_remove", {
      method: "POST",
      body: {
        product_id: productId,
        product_type: entity,
      } as ICartMutation,
    });
    if (data.value) {
      await refresh();
    }
  }

  async function updateQuantity(
    productId: number,
    quantity: { old: number; new: number },
    entity: Entity
  ) {
    processing.value = true;
    if (quantity.new === quantity.old) return;

    if (quantity.new - quantity.old > 0) {
      for (let i = 0; i < quantity.new - quantity.old; i++) {
        await addToCart(productId, entity);
      }
    }
    if (quantity.new - quantity.old < 0) {
      for (let i = 0; i < quantity.old - quantity.new; i++) {
        await removeFromCart(productId, entity);
      }
    }
    processing.value = false;
  }

  return {
    productsIsLoading,
    productCart,
    cartIsEmpty,
    itemsCount,
    subtotal,
    delivery,
    total,
    selectedProducts,
    selectedProductsIsEmpty,
    toggleSelectProduct,
    checkIsSelected,
    checkProductInCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    fullRemoveFromCart,
  };
});
