export interface IJewelry {
  id: number;
  en: boolean;
  type_id: number;
  type: {
    id: number;
    name_en: string;
    name_ru: string;
    name_es: string;
    name_cn: string;
  };
  weight: number;
  jsize: number;
  inserts_count: number;
  jcount: number;
  article_ru: string;
  article_en: string;
  article_es: string;
  article_cn: string;
  brand_id: number;
  is_favorite: boolean;
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
    description_cn: "";
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
  carat: number;
  len: number;
  width: number;
  height: number;
  gender_en: "unisex";
  gender_ru: "унисекс";
  gender_es: "unisexo";
  gender_cn: "男女通用的";
  color_id: number;
  material_id: number;
  is_best: boolean;
  photos: {
    filepath: string;
    id: number;
    url: string;
    en: boolean;
    ctime: string;
    dtime: string;
  }[];
  ctime: string;
  atime: string;
  dtime: string;
}
