import { Entity } from "../types";
export interface IOrder {
  id: number;
  en: boolean;
  products: {
    [Entity.jewelry]: { product_id: number; quantity: number }[];
    [Entity.watches]: { product_id: number; quantity: number }[];
    [Entity.accessories]: { product_id: number; quantity: number }[];
  };
  cost: string;
  user_id: number;
  status: string;
  delivery_cost: string;
  delivery_type: string;
  delivery_address: any;
  delivery_time: string;
  lang: string;
  wallet_data: {
    chain: string;
    address: "";
  };
}
