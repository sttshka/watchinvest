import { defineStore } from "pinia";
import watch1 from "~/assets/images/watch1.png";
import watch2 from "~/assets/images/watch2.png";
import watch3 from "~/assets/images/watch3.png";

export const useCarouselStore = defineStore("carousel", () => {
  interface ISlide {
    id?: number;
    imageUrl?: string;
    title: string;
    description: string;
    collectionTitle: string;
    collectionDescription: string;
    button: {
      title: string;
      to: string;
    };
    collectionButtons: { title: string; to: string }[];
  }

  const current = ref(0);

  const slides = ref<ISlide[]>([
    {
      title: "Exquisite Craftsmanship",
      description:
        "Discover the artistry and precision behind our luxury watch collection, where every timepiece is a testament to the mastery of horology. Each watch is meticulously handcrafted by our skilled artisans, with attention to the smallest details, resulting in a timeless piece that tells a story of tradition and excellence",
      button: {
        title: "Show now",
        to: "/catalog?collection=1",
      },
      collectionTitle: "Heritage Collection",
      collectionDescription:
        "The Heritage Collection is a tribute to the rich heritage of watchmaking, featuring designs and movements that pay homage to our long history. These watches embody centuries of watchmaking expertise, ensuring that you carry a piece of history on your wrist.",
      collectionButtons: [
        { title: "View collection", to: "/collections" },
        { title: "Invest in the collection", to: "/collections/invest" },
      ],
      imageUrl: watch1,
      id: 1,
    },
    {
      title: "Timeless Elegance",
      description:
        "Elevate your style with our timeless watches that never go out of fashion, a symbol of enduring elegance and sophistication. Our designers combine classic aesthetics with modern innovations to create watches that not only stand the test of time but also make a bold statement of your refined taste.",
      button: {
        title: "Show now",
        to: "/catalog?collection=1",
      },
      collectionTitle: "Royal Series",
      collectionDescription:
        "The Royal Series is a testament to opulence and grandeur. Crafted for those who demand the best, these watches showcase regal design and opulence, using the finest materials and craftsmanship to create a masterpiece of luxury.",
      collectionButtons: [
        { title: "View collection", to: "/collections" },
        { title: "Invest in the collection", to: "/collections/invest" },
      ],
      imageUrl: watch3,
      id: 2,
    },
    {
      title: "Innovative Technology",
      description:
        "Explore our innovative watches with cutting-edge features and functionality, redefining the future of timekeeping. Our engineers and designers work tirelessly to push the boundaries of what a watch can do, ensuring that you have access to the latest advancements without compromising on style",
      button: {
        title: "Show now",
        to: "/catalog?collection=1",
      },
      collectionTitle: "TechMaster Collection",
      collectionDescription:
        "The TechMaster Collection is a showcase of watches that seamlessly blend technology and luxury. These timepieces are not just about keeping time; they are about enhancing your lifestyle with the latest tech, making a bold statement in the world of modern watchmaking",
      collectionButtons: [
        { title: "View collection", to: "/collections" },
        { title: "Invest in the collection", to: "/collections/invest" },
      ],
      imageUrl: watch2,
      id: 3,
    },
    {
      title: "Limited Edition Luxur",
      description:
        "Own a piece of exclusivity with our limited edition luxury timepieces, a testimony to your unique and refined taste. Each limited edition watch is a masterpiece, created in limited quantities to ensure that you possess something truly exceptional and rare.",
      button: {
        title: "Show now",
        to: "/catalog?collection=1",
      },
      collectionTitle: "Exclusive Series",
      collectionDescription:
        "The Exclusive Series is a rare collection of watches designed for the discerning few. These watches represent the pinnacle of our craftsmanship and exclusivity, offering a level of luxury that is unparalleled.",
      collectionButtons: [
        { title: "View collection", to: "/collections" },
        { title: "Invest in the collection", to: "/collections/invest" },
      ],
      imageUrl: watch3,
      id: 4,
    },
    {
      title: "Dive into Adventure",
      description:
        "Unleash your adventurous spirit with our high-performance diving watches, built to withstand the depths and accompany you on thrilling underwater journeys. These watches are not just tools; they are reliable companions for those who seek adrenaline and adventure beneath the waves.",
      button: {
        title: "Show now",
        to: "/catalog?collection=1",
      },
      collectionTitle: "Explorer Series",
      collectionDescription:
        "The Explorer Series is a range of watches designed for underwater exploration. They embody the spirit of adventure and resilience, with features that make them reliable and durable companions for divers and adventurers.",
      collectionButtons: [
        { title: "View collection", to: "/collections" },
        { title: "Invest in the collection", to: "/collections/invest" },
      ],
      imageUrl: watch2,
      id: 5,
    },
    {
      title: "Timekeeping Precision",
      description:
        "Experience unparalleled accuracy with our Swiss-made watches, where precision is more than a promise; it's a legacy. Every Swiss Classic watch is a testament to Swiss watchmaking excellence, showcasing not only remarkable precision but also the timeless beauty of design.",
      collectionTitle: "Swiss Classic",
      button: {
        title: "Show now",
        to: "/catalog?collection=1",
      },
      collectionDescription:
        "The Swiss Classic collection represents our commitment to Swiss watchmaking tradition. These watches are crafted in Switzerland, the epicenter of horological craftsmanship, ensuring that you have a timepiece of exceptional precision and quality.",
      collectionButtons: [
        { title: "View collection", to: "/collections" },
        { title: "Invest in the collection", to: "/collections/invest" },
      ],
      imageUrl: watch3,
      id: 6,
    },
    {
      title: "Opulent Sophistication",
      description:
        "Indulge in luxury with our opulent collection of diamond-studded watches, where time becomes a dazzling expression of your opulence. Each diamond is carefully selected and set by our master jewelers, transforming your watch into a true masterpiece of elegance and extravagance.",
      collectionTitle: "Diamond Elegance",
      button: {
        title: "Show now",
        to: "/catalog?collection=1",
      },
      collectionDescription:
        "The Diamond Elegance collection is a celebration of opulence and sophistication. These watches are adorned with exquisite diamonds, creating a level of brilliance and luxury that is truly extraordinary.",
      collectionButtons: [
        { title: "View collection", to: "/collections" },
        { title: "Invest in the collection", to: "/collections/invest" },
      ],
      imageUrl: watch1,
      id: 7,
    },
    {
      title: "Handcrafted Perfection",
      description:
        "Each watch in our collection is a masterpiece of handcrafted perfection, where skilled artisans pour their passion and expertise into every detail. The result is a watch that not only keeps time but also tells a story of dedication and craftsmanship",
      collectionTitle: "Artisan Series",
      button: {
        title: "Show now",
        to: "/catalog?collection=1",
      },
      collectionDescription:
        "The Artisan Series is a collection of watches created by skilled artisans who pay attention to every detail. These timepieces are the embodiment of art and craftsmanship, where each watch is a unique work of art.",
      collectionButtons: [
        { title: "View collection", to: "/collections" },
        { title: "Invest in the collection", to: "/collections/invest" },
      ],
      imageUrl: watch2,
      id: 8,
    },
  ]);

  function handleSlideChange(direction: "next" | "prev") {}
  return { handleSlideChange, slides, current };
});
