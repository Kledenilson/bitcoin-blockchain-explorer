import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

i18n
  .use(LanguageDetector) // Detecta automaticamente o idioma do navegador
  .use(initReactI18next) // Inicializa o i18next com o React
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    fallbackLng: "en", // Idioma padrão caso o idioma detectado não esteja configurado
    interpolation: {
      escapeValue: false, // React já trata a segurança de XSS
    },
  });

export default i18n;
