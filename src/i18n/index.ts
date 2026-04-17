import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import ur from "./locales/ur";
import sv from "./locales/sv";

const stored = typeof window !== "undefined" ? localStorage.getItem("lwa-lang") : null;

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ur: { translation: ur },
    sv: { translation: sv },
  },
  lng: stored ?? "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
