import { TResponse, ICollection } from "~/types";
export const useCollectionsStore = defineStore("collections", () => {
  const { data, refresh, pending } =
    useApiFetch<TResponse<ICollection>>("collections");

  const collections = computed(() => {
    if (data.value) {
      return data.value.data.items;
    }
    return [];
  });

  const isProcessing = ref(false);
  const isLoading = computed(() => {
    return pending.value || isProcessing.value;
  });

  const editCollection = async (collection: ICollection) => {
    isProcessing.value = true;
    const { data } = await useApiFetch<TResponse<ICollection>>(
      `collections/${collection.id}`,
      {
        method: "POST",
        body: collection,
      }
    );
    if (data.value) {
      refresh();
    }
    isProcessing.value = false;
  };

  return {
    collections,
    isLoading,
    refresh,
    editCollection,
  };
});
