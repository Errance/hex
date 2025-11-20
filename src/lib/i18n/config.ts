import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import generated translation files
import commonEN from './generated/en/common.json';
import commonZH from './generated/zh/common.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: commonEN,
  },
  zh: {
    common: commonZH,
  },
} as const;

// Only use language detector on client side
const isClient = typeof window !== 'undefined';

const i18nInstance = i18n.use(initReactI18next);

if (isClient) {
  i18nInstance.use(LanguageDetector);
}

i18nInstance.init({
  resources,
  defaultNS,
  lng: undefined, // Let the detector decide on client side
  fallbackLng: 'en',
  supportedLngs: ['en', 'zh'],
  interpolation: {
    escapeValue: false,
  },
  detection: isClient ? {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
    lookupLocalStorage: 'hex-oracle-language',
  } : undefined,
});

export default i18n;

