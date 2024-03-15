import { TResponse, TResponseSingle } from "./../types/index";
import { handbooks as localHandbooks } from "~/utils/handbooks";
import {
  Entity,
  Handbook,
  IHandbookItem,
  IFilter,
  FilterType,
  IProduct,
  IFilterItem,
  ISelectedFilterMap,
} from "~/types";
import { defineStore } from "pinia";

export const useNewSearchStore = defineStore("new-search", () => {
  const searchRoute = useRoute();
  const searchRouter = useRouter();
  const routeQuery = computed(() => searchRoute.query);

  const handbooks = ref<Record<Handbook, IHandbookItem[]>>(
    {} as Record<Handbook, IHandbookItem[]>
  );
  // mechanism_types
  handbooks.value.mechanism_types_cn =
    localHandbooks.value[Handbook.mechanism_types_cn];
  handbooks.value.mechanism_types_en =
    localHandbooks.value[Handbook.mechanism_types_en];
  handbooks.value.mechanism_types_es =
    localHandbooks.value[Handbook.mechanism_types_es];
  handbooks.value.mechanism_types_ru =
    localHandbooks.value[Handbook.mechanism_types_ru];

  // conditions
  handbooks.value.conditions_cn = localHandbooks.value[Handbook.conditions_cn];
  handbooks.value.conditions_ru = localHandbooks.value[Handbook.conditions_ru];
  handbooks.value.conditions_en = localHandbooks.value[Handbook.conditions_en];
  handbooks.value.conditions_es = localHandbooks.value[Handbook.conditions_es];

  handbooks.value.genders_cn = localHandbooks.value[Handbook.genders_cn];
  handbooks.value.genders_en = localHandbooks.value[Handbook.genders_en];
  handbooks.value.genders_es = localHandbooks.value[Handbook.genders_es];
  handbooks.value.genders_ru = localHandbooks.value[Handbook.genders_ru];

  const searchString = ref<string>("");
  const pagination = ref({
    total: 0,
    limit: 8,
    page: 1,
  });
  const isListLoading = ref(false);
  const isError = ref(false);

  const filters = ref<IFilter[]>([]);
  const selectedFiltersMap = ref<ISelectedFilterMap>({} as ISelectedFilterMap);

  function initFiltersFromUrl() {
    Object.entries(routeQuery.value).forEach(([key, value]) => {
      const foundFilter = filters.value.find((f) => f.type === key);
      if (value && typeof value === "string" && foundFilter) {
        const items = value.split(",");

        items.forEach((item) => {
          // hand-written handbooks
          if (foundFilter.items.length) {
            const foundFilterItem = foundFilter.items.find(
              (i) => i.value === item
            );
            if (foundFilterItem) {
              handleSelect(foundFilter, foundFilterItem, value);
            }

            return;
          }
          // loaded handbooks
          if (foundFilter.handbook) {
            const foundFilterItem = handbooks.value[foundFilter.handbook].find(
              (i) => i.id == item
            );

            if (foundFilterItem) {
              handleSelect(
                foundFilter,
                {
                  title:
                    foundFilter.type === FilterType.brand
                      ? foundFilterItem.title_en
                      : foundFilterItem.name_en,
                  code: foundFilterItem.id,
                  value: foundFilterItem.id,
                },
                value
              );
            }
          }
        });
      }
      if (!foundFilter) {
        const foundFilter = filters.value.find((f) =>
          f.items.find((i) => i.value === key)
        );
        if (foundFilter) {
          const foundFilterItem = foundFilter.items.find(
            (i) => i.value === key
          );
          handleSelect(foundFilter, foundFilterItem, value);
        }
      }
    });
  }

  function handleSelect(
    filter: IFilter,
    item: IFilterItem,
    value: string
  ): void {
    if (!value) {
      if (filter.type === FilterType.cost) {
        const itemCode = item.code as FilterType;
        delete selectedFiltersMap.value[itemCode];
        return;
      }

      if (filter.type === FilterType.brandType) {
        const itemCode = item.value as FilterType;
        delete selectedFiltersMap.value[itemCode];
        return;
      }

      if (selectedFiltersMap.value && selectedFiltersMap.value[filter.type]) {
        delete selectedFiltersMap.value[filter.type][item.value];

        if (Object.keys(selectedFiltersMap.value[filter.type]).length === 0) {
          delete selectedFiltersMap.value[filter.type];
        }
      }
      return;
    }

    // for cost filter
    if (filter.type === FilterType.cost) {
      const itemCode = item.code as FilterType;
      selectedFiltersMap.value[itemCode] = {
        [value]: {
          code: item.code,
          value: value,
          title: item.title,
        },
      };

      return;
    }
    // for brand type
    if (filter.type === FilterType.brandType) {
      const itemValue = item.value as FilterType;
      selectedFiltersMap.value[itemValue] = {
        [value]: {
          code: item.code,
          value: value,
          title: item.title,
        },
      };
      return;
    }
    // other

    if (!selectedFiltersMap.value[filter.type]) {
      selectedFiltersMap.value[filter.type] = {};
    }

    selectedFiltersMap.value[filter.type][item.value] = {
      code: item.value,
      value: value,
      title: item.title,
    };
  }

  function handleRemove(filterType: FilterType, item: IFilterItem) {
    if (
      filterType === FilterType.priceGte ||
      filterType === FilterType.priceLte
    ) {
      const itemCode = item.code as FilterType;
      delete selectedFiltersMap.value[itemCode];
      return;
    }

    if (
      filterType === FilterType.isAccessories ||
      filterType === FilterType.isWatches ||
      filterType === FilterType.isJewelry
    ) {
      delete selectedFiltersMap.value[filterType];
      return;
    }

    delete selectedFiltersMap.value[filterType][item.code];

    if (Object.keys(selectedFiltersMap.value[filterType]).length === 0) {
      delete selectedFiltersMap.value[filterType];
    }
  }

  function handleRemoveAll() {
    // selectedFiltersMap.value = {} as ISelectedFilterMap;
    Object.keys(selectedFiltersMap.value).forEach((key: FilterType) => {
      delete selectedFiltersMap.value[key];
    });

    searchRouter.push({ query: {} });
  }

  function checkIsSelected(filter: IFilter, item: IFilterItem): boolean {
    if (filter.type === FilterType.cost) {
      const itemCode = item.code as FilterType;
      return selectedFiltersMap.value[itemCode] ? true : false;
    }

    if (filter.type === FilterType.brandType) {
      const itemCode = item.value as FilterType;
      return selectedFiltersMap.value[itemCode] ? true : false;
    }

    if (!selectedFiltersMap.value || !selectedFiltersMap.value[filter.type]) {
      return false;
    }
    return selectedFiltersMap.value[filter.type][item.value] ? true : false;
  }

  function getSelectedFilterItems(filter: IFilter) {
    return selectedFiltersMap.value[filter.type] ?? {};
  }

  async function loadHandbooks(
    entity: Entity,
    {
      handbooksToLoad = [],
      isRoot = false,
      query = {},
    }: { handbooksToLoad?: Handbook[]; isRoot?: boolean; query?: any }
  ) {
    const promises = [];

    if (isRoot) {
      promises.push(
        useApiFetch(entity, {
          method: "GET",
          query,
        })
      );
    } else {
      for (const handbook of handbooksToLoad) {
        if (
          handbook === Handbook.accessories_types ||
          handbook === Handbook.jewelry_types
        ) {
          promises.push(useApiFetch(`${entity}/types/`, { method: "GET" }));
        } else if (handbook === Handbook.watches) {
          promises.push(
            useApiFetch(handbook, {
              method: "GET",
              query: {
                limit: 9999,
              },
            })
          );
        } else if (handbook === Handbook.brands) {
          promises.push(
            useApiFetch(handbook, {
              method: "GET",
              query: {
                is_watches: true,
              },
            })
          );
        } else {
          console.log(entity, handbook);

          promises.push(
            useApiFetch(`${entity}/${handbook}/`, { method: "GET" })
          );
        }
      }
    }
    console.log({ promises });

    const responses = await Promise.all(promises);

    responses.forEach((res, index) => {
      if (res.data.value) {
        const resData = res.data.value.data;
        const handbookItems = resData.items;
        if (isRoot || entity === Entity.enums) {
          handbooks.value[entity] = handbookItems as IHandbookItem[];
        } else {
          handbooks.value[handbooksToLoad[index]] =
            handbookItems as IHandbookItem[];
        }
      }
    });
    return responses;
  }

  function getHandbookItems(handbook: Handbook): IHandbookItem[] {
    return handbooks.value[handbook] ?? [];
  }

  async function loadProducts<T>(
    entity: Entity,
    init: boolean,
    extQuery: any = {}
  ) {
    if (init) {
      pagination.value = {
        total: 0,
        limit: 24,
        page: 1,
      };
    }
    isError.value = false;
    isListLoading.value = true;
    const query = {
      ...searchRoute.query,
      limit: pagination.value.limit,
      page:
        init && searchRoute.query.page
          ? searchRoute.query.page
          : pagination.value.page,

      ...extQuery,
    };

    const { error, pending, data } = await useApiFetch<TResponse<T>>(entity, {
      method: "GET",
      query: { ...query },
    });

    if (error.value) {
      isError.value = true;
    }

    const resData = data.value?.data;
    const items = resData?.items;
    pagination.value.total = resData?.total;

    isListLoading.value = false;
    return {
      items: items as T[],
    };
  }

  async function loadProduct<T>(entity: Entity, id: string) {
    return await useApiFetch<TResponseSingle<T>>(`${entity}/${id}`, {
      method: "GET",
    });
  }

  return {
    searchString,
    pagination,
    filters,
    selectedFiltersMap,
    handbooks,
    isListLoading,
    isError,
    initFiltersFromUrl,
    checkIsSelected,
    getSelectedFilterItems,
    handleSelect,
    handleRemove,
    handleRemoveAll,
    loadHandbooks,
    getHandbookItems,
    loadProducts,
    loadProduct,
  };
});
