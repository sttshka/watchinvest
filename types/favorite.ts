import { Entity, IAccessory, IJewelry, IWatch } from "../types";

export type IFavorite = {
  id: number;
  user_id: number;
  product_type: Entity.watches;
  ctime: string;
  product: IWatch | IJewelry | IAccessory;
};
