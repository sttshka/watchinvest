export enum Handbook {
  body_materials = "body_materials",
  strap_materials = "strap_materials",
  dial_colors = "dial_colors",
  functions = "functions",
  brands = "brands",
  watches = "watches",
  accessories_types = "accessories_types",
  jewelry_types = "jewerly_types",
  mechanism_types_en = "mechanism_types_en",
  watch_mechanism_type = "watch_mechanism_type",
  watch_condition = "watch_condition",
  watch_completeness = "watch_completeness",
  investment_type = "investment_type",
  mechanism_types_ru = "mechanism_types_ru",
  mechanism_types_es = "mechanism_types_es",
  mechanism_types_cn = "mechanism_types_cn",
  conditions = "conditions",
  conditions_ru = "conditions_ru",
  conditions_es = "conditions_es",
  conditions_en = "conditions_en",
  conditions_cn = "conditions_cn",
  collections = "collections",
  genders = "genders",
  gender = "gender",
  genders_es = "genders_es",
  genders_en = "genders_en",
  genders_ru = "genders_ru",
  genders_cn = "genders_cn",
}

export interface IHandbookItem {
  name_en: string;
  name_ru: string;
  name_es: string;
  name_cn: string;
  id: number;
}
