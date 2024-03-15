import { FilterType, Handbook, IHandbookItem } from "~/types";
import { Condition } from "~/types/filter";

export const handbooks = ref<Record<Handbook, IHandbookItem[]>>({
  [Handbook.mechanism_types_en]: [
    {
      title: "No data",
      value: "nodata",
    },
    {
      title: "Auto winding",
      value: "auto_winding",
    },
    { title: "Quartz", value: "quartz" },
    {
      title: "Mechanical",
      value: "mechanical",
    },
  ],
  [Handbook.mechanism_types_ru]: [
    {
      title: "Нет данных",
      value: "нет данных",
    },
    {
      title: "Автоподзавод",
      value: "автоподзавод",
    },
    { title: "Кварцевые", value: "кварцевые" },
    {
      title: "Механические",
      value: "механические",
    },
  ],
  [Handbook.mechanism_types_cn]: [
    {
      title: "没有数据",
      value: "没有数据",
    },
    {
      title: "自动绕线",
      value: "自动绕线",
    },
    { title: "石英,石英", value: "石英,石英" },
    {
      title: "机械设备",
      value: "机械设备",
    },
  ],
  [Handbook.mechanism_types_es]: [
    {
      title: "sin datos",
      value: "sin datos",
    },
    {
      title: "cuerda automática",
      value: "cuerda automática",
    },
    { title: "de cuarzo", value: "de cuarzo" },
    {
      title: "mecánicos",
      value: "mecánicos",
    },
  ],
  [Handbook.conditions_cn]: [
    { title: "没有数据", value: "没有数据" },
    { title: "新的", value: "新的" },
    { title: "脱脩脟茅脕麓陆脱", value: "脱脩脟茅脕麓陆脱" },
    {
      title: "非常好",
      value: "非常好",
    },
    { title: "好", value: "好" },
    {
      title: "满意",
      value: "满意",
    },
    {
      title: "有瑕疵",
      value: "有瑕疵",
    },
    {
      title: "不完整的设备",
      value: "不完整的设备",
    },
  ],
  [Handbook.conditions_ru]: [
    { title: "Нет данных", value: "нет данных" },
    { title: "Новые", value: "новые" },
    { title: "Неношеные", value: "неношеные" },
    {
      title: "Очень хорошее",
      value: "очень хорошее",
    },
    { title: "Хорошее", value: "хорошее" },
    {
      title: "Удовлетворительное",
      value: "удовлетворительное",
    },
    {
      title: "С изъянами",
      value: "с изъянами",
    },
    {
      title: "Неполная комплектация",
      value: "неполная комплектация",
    },
  ],
  [Handbook.conditions_es]: [
    { title: "Sin datos", value: "sin datos" },
    { title: "Nuevos", value: "nuevos" },
    { title: "Sin usar", value: "sin usar" },
    {
      title: "Muy bueno'",
      value: "muy bueno",
    },
    { title: "Lo bueno", value: "lo bueno" },
    {
      title: "Satisfactorio",
      value: "satisfactorio",
    },
    {
      title: "Con defectos",
      value: "con defectos",
    },
    {
      title: "Paquete incompleto",
      value: "paquete incompleto",
    },
  ],
  [Handbook.conditions_en]: [
    { title: "New", value: Condition.new },
    { title: "Unworn", value: Condition.unworn },
    {
      title: "Very good",
      value: Condition.very_good,
    },
    { title: "Good", value: Condition.good },
    {
      title: "Satisfactory",
      value: Condition.satisfactory,
    },
    {
      title: "With Flaws",
      value: Condition.withFlaws,
    },
    {
      title: "Incomplete kit",
      value: Condition.incompleteKit,
    },
  ],
  [Handbook.genders_en]: [
    { title: "Man", value: "man" },
    { title: "Woman", value: "woman" },
    { title: "Unisex", value: "unisex" },
  ],
  [Handbook.genders_ru]: [
    { title: "Мужчина", value: "мужчина" },
    { title: "Женщина", value: "женщина" },
    { title: "Унисекс", value: "унисекс" },
  ],
  [Handbook.genders_es]: [
    { title: "Hombre", value: "hombre" },
    { title: "Mujer", value: "mujer" },
    { title: "Unisexo", value: "unisexo" },
  ],
  [Handbook.genders_cn]: [
    { title: "男人", value: "男人" },
    { title: "女士", value: "女士" },
    { title: "男女通用的", value: "男女通用的" },
  ],
});
