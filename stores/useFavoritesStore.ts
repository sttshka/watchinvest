import { defineStore } from "pinia";
import { IFavorite, TResponse, TResponseSingle } from "~/types";

export const useFavoritesStore = defineStore("favorites", () => {
  const auth = useAuthStore();
  const page = usePageStore();

  function handleLoginedAction(cb: () => void) {
    if (auth.isLoggedIn) {
      return cb();
    } else {
      page.toggleModal("authorization", true);
    }
  }

  const { data, pending, error, refresh, execute } = useApiFetch<
    TResponse<IFavorite>
  >("favorites", {
    method: "GET",
  });

  const favorites = computed<IFavorite[]>(() => {
    if (data.value) {
      return data.value.data.items;
    }
    return [];
  });

  const favoirtesCounter = computed(() => {
    if (favorites.value.length > 9) {
      return "+9";
    }
    return favorites.value.length ?? null;
  });

  async function addToFavorites(data) {
    if (auth.isLoggedIn) {
      const { error, data: res } = await useApiFetch<
        TResponseSingle<IFavorite>
      >("favorites", {
        method: "POST",
        body: data,
      });
      if (error.value) {
        return false;
      } else if (res.value) {
        await execute();
        return true;
      }
    } else {
      page.toggleModal("authorization", true);
    }
  }

  async function removeFromFavorites({ product_id, product_type }) {
    const { error, data: res } = await useApiFetch<TResponseSingle<IFavorite>>(
      `favorites/${product_id}?product_type=${product_type}`,
      {
        method: "DELETE",
      }
    );
    if (error.value) {
      return false;
    } else if (res.value) {
      await execute();
      return true;
    }
  }
  return {
    favorites,
    favoirtesCounter,
    loading: pending.value,
    refresh,
    execute,
    addToFavorites,
    removeFromFavorites,
  };
});
