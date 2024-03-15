import { Entity } from "../types/index";
import { defineStore } from "pinia";
import { getProducts } from "../services/product";
import { IProduct, IWatch, IWatchResponse } from "~/types";

export const useJewelryStore = defineStore("jewelry", {
  state: () => ({
    jewelry: [],
    currentProduct: {} as IWatch,
    productsIsLoading: false,
    pagination: {
      total: 0 as number,
      limit: 8 as number,
      page: 1 as number,
    },
  }),
  actions: {
    async loadJewelry(entity: Entity, init: boolean) {
      const route = useRoute();

      const query = {
        // ...route.query,
        // limit: this.pagination.limit,
        // page:
        //   init && route.query.page ? route.query.page : this.pagination.page,
      };

      const { error, data: res } = await useApiFetch(entity, {
        method: "GET",
        query: { ...query },
      });

      if (error.value) {
        return error.value;
      } else if (res.value) {
        const resData = res.value.data;
        this.jewelry = resData.items;
        this.pagination.total = resData.total;
      }
    },

    async loadProduct(entity: Entity, id) {
      const { error, data: res } = await useApiFetch<IWatch>(
        `${entity}/${id}`,
        {
          method: "GET",
        }
      );
      if (error.value) {
        return error.value;
      } else if (res.value) {
        const resData = res.value.data as IWatch;
        this.currentProduct = resData;
      }
    },
    handleWatchItem(item: IWatch): IProduct {
      return {
        price: item.purchase_price,
        title: item.model_en,
        reference: item.reference_number,
        id: item.id,
        imageUrl: item.photos.length ? item.photos[0]?.filepath : null,
        brand: item.brand,
        investment: {
          price: item.investment_price,
          percent: 0,
        },
      };
    },
    handleWatchResponse(res: IWatchResponse): IProduct[] {
      return res.data.items.map((item) => {
        return {
          price: item.purchase_price,
          title: item.model_en,
          article: item.reference_number,
          id: item.id,
          imageUrl: item.photos.length ? item.photos[0]?.filepath : null,
          investment: {
            price: item.investment_price,
            percent: 0,
          },
        };
      });
    },
    handleWatchSearchQuery(query: {
      search: string;
      page: number;
      limit: number;
      condition: string;
      gender: string;
      cost: {
        from: number;
        to: number;
      };
      brand: number;
    }) {
      type TQuery = {
        brands_ids_in?: number[];
        collections_ids_in?: number[];
        genders_ids_in?: string;
        mechanism_type_in?: string[];
        body_material_ids_in?: number[];
        strap_material_ids_in?: number[];
        dial_color_ids_in?: number[];
        conditions_ids_in?: number[];
        purchase_price_lte?: number;
        purchase_price_gte?: number;
        investment_price_lte?: number;
        investment_price_gte?: number;
        is_best?: boolean;
        q?: string;
        page?: number;
        limit?: number;
      };

      return {
        genders_ids_in: query.gender as string,
        q: query.search,
        limit: query.limit,
        page: query.page,
        condition: query.condition,
      } as TQuery;
    },
    async getProducts(count: number) {
      this.productsIsLoading = true;
      this.products = await getProducts(count);
      this.productsIsLoading = false;
    },
  },
});
