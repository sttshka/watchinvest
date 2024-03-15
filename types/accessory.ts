export interface IAccessory {
  id: number;
  en: boolean;
  name_en: string;
  name_ru: string;
  name_es: string;
  name_cn: string;
  article: string;
  compound_en: string;
  compound_ru: string;
  compound_es: string;
  compound_cn: string;
  brand_id: number;
  type_id: number;
  is_best: boolean;
  photos: {
    filepath: string;
    id: number;
    url: string;
    en: boolean;
    ctime: string;
    dtime: string;
  }[];
  brand: {
    title: {
      value_en: "";
      value_ru: "";
      value_es: "";
      value_cn: "";
    };
    description_en: string;
    description_ru: string;
    description_es: string;
    description_cn: string;
    id: number;
    image: {
      filepath: string;
      id: number;
      url: string;
      en: boolean;
      ctime: string;
      dtime: string;
    };
  };
  is_favorite: boolean;
  label: {
    value_en: string;
    value_ru: string;
    value_es: string;
    value_cn: string;
    t: string;
    id: number;
    en: boolean;
    ctime: "2023-11-16T11:47:55.061984";
    atime: null;
    dtime: null;
  };
  type: {
    id: number;
    name_en: string;
    name_es: string;
    name_ru: string;
    name_cn: string;
  };
  purchase_price: number;
  investment_price: number;
  currency: number;
}
