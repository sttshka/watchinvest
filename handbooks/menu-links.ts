import IconCoin from "~/components/icons/IconCoin.vue";
import { IMenuLink } from "~/types";

export const menuLinks = <IMenuLink[]>[
  {
    title: {
      value_en: "Price Chart",
      value_ru: "График цен",
      value_es: "Gráfico de precios",
      value_cn: "价格图表",
    },
    to: "",
  },
  {
    title: {
      value_en: "Investments",
      value_ru: "Инвестиции",
      value_es: "Inversiones",
      value_cn: "投资",
    },
    to: "",
  },
  {
    title: {
      value_en: "Buyer Protection",
      value_ru: "Защита покупателя",
      value_es: "Protección al comprador",
      value_cn: "买家保护",
    },
    to: "",
  },
  {
    title: {
      value_en: "News",
      value_ru: "Новости",
      value_es: "Noticias",
      value_cn: "新闻",
    },
    to: "",
  },
  {
    title: {
      value_en: "About",
      value_ru: "О нас",
      value_es: "Nosotros",
      value_cn: "关于我们",
    },
    to: "",
  },
  {
    title: {
      value_en: "Faq",
      value_ru: "Faq",
      value_es: "Faq",
      value_cn: "Faq",
    },
    to: "",
  },
  {
    title: {
      value_en: "Contacts",
      value_ru: "Контакты",
      value_es: "Contactos",
      value_cn: "联系人",
    },
    to: "",
  },
];

export const topMenuLinks = <IMenuLink[]>[
  {
    title: {
      value_en: "Watches",
      value_ru: "Часы",
      value_es: "Relojes",
      value_cn: "手表",
    },
    to: "watches",
  },
  {
    title: {
      value_en: "Jewelry",
      value_ru: "Ювелирные изделия",
      value_es: "Joyería",
      value_cn: "珠宝",
    },
    to: "jewelry",
  },
  {
    title: {
      value_en: "Accessories",
      value_ru: "Аксессуары",
      value_es: "Accesorios",
      value_cn: "配件",
    },
    to: "accessories",
  },
  {
    title: {
      value_en: "Pull",
      value_ru: "Pull",
      value_es: "Invertir",
      value_cn: "投资",
    },
    to: "invest",
    icon: "IconCoin",
  },
  {
    title: {
      value_en: "Admin-panel",
      value_ru: "Админ-панель",
      value_es: "Panel de administración",
      value_cn: "管理员面板",
    },
    to: "admin",
    admin: true,
  },
];
