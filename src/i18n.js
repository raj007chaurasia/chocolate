import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";
import zh from "./locales/zh/translation.json";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  zh: { translation: zh },
};

i18n
  .use(
    new LanguageDetector(null, {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "appLang",
      caches: ["localStorage"],
    })
  )
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "hi", "zh"],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
