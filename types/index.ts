export { type IProduct } from "./product";
export { type IBrand } from "./brand";
export {
  type IFilterItem,
  type IFilter,
  type ISelectedFilterMap,
  FilterType,
} from "./filter";
export type { IWatch, IWatchResponse } from "./watch";
export type { IJewelry } from "./jewelry";
export type { IAccessory } from "./accessory";
export type { IFavorite } from "./favorite";
export { Handbook, type IHandbookItem } from "./handbooks";
export { type TUser } from "./user";
export { type IOrder } from "./order";
export { type ICollection } from "./collection";

export interface ILanguage {
  name: string;
  slug: string;
}
export interface IMenuLink {
  to: string;
  icon?: string;
  admin?: boolean;
  title: {
    value_en: string;
    value_ru: string;
    value_es: string;
    value_cn: string;
  };
}

export enum Entity {
  watches = "watches",
  brands = "brands",
  jewelry = "jewelry",
  accessories = "accessories",
  collections = "collections",
  cart = "cart",
  enums = "enums",
  orders = "orders",
}

export type TResponse<T> = {
  status: boolean;
  data: {
    total: number;
    limit: number;
    page: number;
    items: T[];
  };
};
export type TResponseSingle<T> = {
  status: boolean;
  data: T;
};
