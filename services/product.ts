import { type IProduct } from "~/types";
import { ref } from "vue";
const newProducts = ref<IProduct[]>([
  {
    id: 1234,
    title: "Audemars Piguet Royal Oak Selfwinding Chronograph",
    article: "Ref. 26240ST.OO.1320ST.01",
    price: 165_000,
    investment: {
      price: 148_000,
      percent: 12,
    },
    imageUrl: "watch1.png",
  },
  {
    id: 1235,
    title: "Royal Oak Perpetual Calendar",
    article: "Ref. 26579CS.OO.1225CS.01",
    price: 180_000,
    investment: {
      price: 152_000,
      percent: 67,
    },
    imageUrl: "watch2.png",
  },
  {
    id: 1236,
    title: "Audemars Piguet Royal Oak Selfwinding Chronograph",
    article: "Ref. 26240ST.OO.1320ST.01",
    price: 165_000,
    investment: {
      price: 148_000,
      percent: 67,
    },
    imageUrl: "watch3.png",
  },
  {
    id: 1237,
    title: "Royal Oak Selfwinding Flying Tourbillon",
    article: "Ref. 26730OR.OO.1320OR.01",
    price: 420_000,
    investment: {
      price: 370_000,
      percent: 52,
    },
    imageUrl: "watch1.png",
  },
  {
    id: 1236,
    title: "Audemars Piguet Royal Oak Selfwinding Chronograph",
    article: "Ref. 26240ST.OO.1320ST.01",
    price: 165_000,
    investment: {
      price: 148_000,
      percent: 67,
    },
    imageUrl: "watch3.png",
  },
  {
    id: 1237,
    title: "Royal Oak Selfwinding Flying Tourbillon",
    article: "Ref. 26730OR.OO.1320OR.01",
    price: 420_000,
    investment: {
      price: 370_000,
      percent: 52,
    },
    imageUrl: "watch1.png",
  },
  {
    id: 1234,
    title: "Audemars Piguet Royal Oak Selfwinding Chronograph",
    article: "Ref. 26240ST.OO.1320ST.01",
    price: 165_000,
    investment: {
      price: 148_000,
      percent: 12,
    },
    imageUrl: "watch1.png",
  },
  {
    id: 1235,
    title: "Royal Oak Perpetual Calendar",
    article: "Ref. 26579CS.OO.1225CS.01",
    price: 180_000,
    investment: {
      price: 152_000,
      percent: 67,
    },
    imageUrl: "watch2.png",
  },
]);

export const getProducts = async (count: number): Promise<IProduct[]> => {
  return JSON.parse(JSON.stringify(newProducts.value)).splice(0, count);
};
