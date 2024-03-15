import { IBrand } from "~/types";
import { ref } from "vue";
const newBrands = ref<IBrand[]>([
  {
    title: "A. Lange & Sohne",
    imageUrl: "/brands/A.lance&sophie.svg",
    slug: "a-lange-sohne",
  },
  {
    title: "Audemars Piguet",
    imageUrl: "/brands/Audemars.svg",
    slug: "audemars-piguet",
  },
  {
    title: "BlancPain",
    imageUrl: "/brands/blancpain.svg",
    slug: "blancpain",
  },
  {
    title: "Brequet",
    imageUrl: "/brands/brequiet.svg",
    slug: "brequet",
  },
  {
    title: "Bvlgari",
    imageUrl: "/brands/bvlgari.svg",
    slug: "bvlgari",
  },
  {
    title: "Cartier",
    imageUrl: "/brands/cartier.svg",
    slug: "cartier",
  },
  {
    title: "Franck Muller",
    imageUrl: "/brands/frank-muller.svg",
    slug: "franck-muller",
  },
  {
    title: "Hublot",
    imageUrl: "/brands/hublot.svg",
    slug: "hublot",
  },
  {
    title: "Schaffhausen",
    imageUrl: "/brands/schaff.svg",
    slug: "schaffhausen",
  },
  {
    title: "Jarer-leCoultre",
    imageUrl: "brands/jaeger.svg",
    slug: "jarre",
  },
  {
    title: "L`EPEE",
    imageUrl: "/brands/leppe.svg",
    slug: "l-epee",
  },
  {
    title: "MBEF",
    imageUrl: "/brands/mbf.svg",
    slug: "mbef",
  },
  {
    title: "Patek Philippe",
    imageUrl: "/brands/patek.svg",
    slug: "patek",
  },
  {
    title: "Richard Mille",
    imageUrl: "/brands/richard.svg",
    slug: "richard-mille",
  },
  {
    title: "Rolex",
    imageUrl: "brands/rolex1.svg",
    slug: "rolex",
  },
  {
    title: "Ulsse Nardin",
    imageUrl: "/brands/nardin.svg",
    slug: "ulsse-nardin",
  },
  {
    title: "Vacheron Constantin",
    imageUrl: "/brands/constantin.svg",
    slug: "vacheron-constantin",
  },
]);

export const getBrands = async (count: number = 4): Promise<IBrand[]> => {
  return JSON.parse(JSON.stringify(newBrands.value)).splice(0, count);
};
