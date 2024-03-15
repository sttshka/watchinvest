import { Handbook } from "./handbooks";

export enum FilterType {
  brand = "brands_ids_in",
  collection = "collections_ids_in",
  cost = "cost",
  priceLte = "purchase_price_lte",
  priceGte = "purchase_price_gte",
  investmentLte = "investment_price_lte",
  investmentGte = "investment_price_gte",
  equipment = "equipment",
  gender = "genders_ids_in",
  mechanismType = "mechanism_type_ids_in",
  type = "type_in",
  bodyMaterial = "body_material_ids_in",
  strapMaterial = "strap_material_ids_in",
  condition = "conditions_ids_in",
  brandType = "brand_type",
  isWatches = "is_watches",
  isJewelry = "is_jewelry",
  isAccessories = "is_accessories",
}

export enum Condition {
  new = "new",
  unworn = "unworn",
  very_good = "very_good",
  good = "good",
  satisfactory = "satisfactory",
  withFlaws = "with_flaws",
  incompleteKit = "incomplete_kit",
}

export enum Gender {
  man = "man",
  woman = "woman",
  unisex = "unisex",
}

export type ISelectedFilterMap = Record<
  FilterType,
  Record<string, IFilterItem>
>;

export interface IFilterItem {
  code: string;
  value: string;
  title: string;
}

export interface IFilter {
  type: FilterType;
  title: string;
  items: IFilterItem[];
  handbook?: Handbook;
}
