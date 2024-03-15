export interface IProduct {
  title: string;
  reference: string;
  price: number;
  investment: {
    price: number;
    percent: number;
  };
  brand?: any;
  imageUrl: string | null;
  id: number;
}
