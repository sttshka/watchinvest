export interface IWatchResponse {
  success: boolean;
  data: {
    total: number;
    limit: number;
    page: number;
    items: IWatch[];
  };
}

export interface IWatch {
  id: number;
  en: true;
  model: string;
  purchase_price: number;
  investment_price: number;
  currency: 0;
  reference: "string";
  water_resistance: 0;
  body_diameter: 0;
  mechanism_type_en: "nodata";
  mechanism_type_ru: "нет данных";
  mechanism_type_es: "sin datos";
  mechanism_type_cn: "没有数据";
  power_reserve: 0;
  caliber: 0;
  condition_en: "nodata";
  condition_ru: "нет данных";
  condition_es: "sin datos";
  condition_cn: "没有数据";
  watch_type: 0;
  current_nft_address: "string";
  contract_of_sale_nft: "string";
  token_id_nft: 0;
  metadata_nft: 0;
  holder_fees_percent_nft: 0;
  transfer_fee_percent_nft: 0;
  listing_bidding_cancellation_nft: 0;
  gender_en: "unisex";
  gender_ru: "унисекс";
  gender_es: "unisexo";
  gender_cn: "男女通用的";
  reference_number: "string";
  listing_code: "string";
  listing_date: "2023-11-01T12:34:22.037Z";
  location: 0;
  count: 0;
  is_best: false;
  brand: {
    title: {
      value_en: "";
      value_ru: "";
      value_es: "";
      value_cn: "";
    };
    description_en: "";
    description_ru: "";
    description_es: "";
    description_cn: "";
    id: 0;
    image: {
      filepath: "string";
      id: 0;
      url: "string";
      en: true;
      ctime: "2023-11-01T12:34:22.037Z";
      dtime: "2023-11-01T12:34:22.037Z";
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
  collection_id: 0;
  body_material: {
    name_en: "";
    name_ru: "";
    name_es: "";
    name_cn: "";
    id: 0;
  };
  strap_material: {
    name_en: "";
    name_ru: "";
    name_es: "";
    name_cn: "";
    id: 0;
  };
  dial_color: {
    name_en: "";
    name_ru: "";
    name_es: "";
    name_cn: "";
    id: 0;
  };
  functions: [];
  photos: {
    filepath: string;
    id: number;
    url: string;
    en: boolean;
    ctime: string;
    dtime: string;
  }[];
  is_favorite: boolean;
  ctime: "2023-11-01T12:34:22.037Z";
  atime: "2023-11-01T12:34:22.037Z";
  dtime: "2023-11-01T12:34:22.037Z";
}
