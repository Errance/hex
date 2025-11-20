import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonEN from './locales/en/common.json';
import commonZH from './locales/zh/common.json';
import hexagramsEN from './locales/en/hexagrams.json';
import hexagramsZH from './locales/zh/hexagrams.json';
import summariesEN from './locales/en/summaries.json';
import summariesZH from './locales/zh/summaries.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: commonEN,
    hexagrams: hexagramsEN,
    summaries: summariesEN,
  },
  zh: {
    common: commonZH,
    hexagrams: hexagramsZH,
    summaries: summariesZH,
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
  lng: 'en', // Always start with English for SSR consistency
  fallbackLng: 'en',
  supportedLngs: ['en', 'zh'],
  interpolation: {
    escapeValue: false,
  },
  detection: isClient ? {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
    lookupLocalStorage: 'hex-oracle-language',
  } : undefined,
});

export default i18n;

