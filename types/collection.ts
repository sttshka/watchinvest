export interface ICollection {
  title: {
    value_en: string;
    value_ru: string;
    value_es: string;
    value_cn: string;
  };
  description: {
    value_en: string;
    value_ru: string;
    value_es: string;
    value_cn: string;
  };
  purchase_price: string;
  investment_price: string;
  id: number;
  en: boolean;
  image: {
    filepath: string;
    id: number;
    url: string;
    en: boolean;
    ctime: string;
    dtime: null;
  };
  ctime: string;
  atime: string;
  dtime: null;
}
