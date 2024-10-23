import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./languages/en/translation.json";
import translationFR from "./languages/fr/translation.json";

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  }
};

//i18N Initialization
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", //default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;