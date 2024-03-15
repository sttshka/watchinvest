import { IMenuLink } from "./../types/index";
import { languages, menuLinks, topMenuLinks } from "~/handbooks";
import { defineStore } from "pinia";
import { ILanguage } from "~/types";

export const usePageStore = defineStore("page", {
  state: () => ({
    mobileMenuIsOpen: false,
    mobileFilterIsOpen: false,
    currentHoveredMenu: null,
    linkIsHovered: false,
    linksMenuMenuOpen: false,
    currentLanguage: { name: "English", slug: "en" } as ILanguage,
    languages,
    menuLinks,
    topMenuLinks: topMenuLinks as IMenuLink[],
    modal: {
      registration: false,
      authorization: false,
      recovery: false,
      recoveryDone: false,
      reset: false,
      resetDone: false,
      photoGallery: false,
      passwordConfirm: false,
    } as { [key: string]: boolean },
    navigateAfter: {
      favorite: true,
    },
  }),
  actions: {
    toggleModal(modal: string, value: boolean | null = null) {
      if (value != null) {
        this.modal[modal] = value;
      } else {
        this.modal[modal] = !this.modal[modal];
      }
    },
    closeModals() {
      this.modal = {
        registration: false,
        authorization: false,
        recovery: false,
        recoveryDone: false,
        reset: false,
        resetDone: false,
      };
    },
    toggleMobileFilter() {
      this.mobileFilterIsOpen = !this.mobileFilterIsOpen;
    },
    toggleMobileMenu(hardWriteValue: boolean | null = null) {
      if (hardWriteValue != null) {
        this.mobileMenuIsOpen = hardWriteValue;
      } else {
        this.mobileMenuIsOpen = !this.mobileMenuIsOpen;
      }
    },
    initCurrentLanguage() {
      const currentLanguage = localStorage.getItem("currentLanguage");
      if (currentLanguage) {
        const foundLanguage = languages.find(
          (language) => language.slug === currentLanguage
        );
        if (foundLanguage) {
          this.currentLanguage = foundLanguage;
          return;
        }
        this.currentLanguage = languages[0];
      }
    },
    changeLanguage(language: ILanguage) {
      this.currentLanguage = language;
      // add localstorage
      localStorage.setItem("currentLanguage", language.slug);
    },
  },
});
