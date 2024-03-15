export { handbooks } from "./handbooks";

export const getListFilledWithDummies = <T>(list: T[], cols: number) => {
  if (list.length % cols === 0) {
    return list;
  }
  const dummies = Array(cols - (list.length % cols)).fill(null);

  return [...list, ...dummies];
};

export const getLocalizedValue = (field: any) => {
  const pageStore = usePageStore();
  const languageSlug = pageStore.currentLanguage.slug;
  return field[`value_${languageSlug}`];
};
