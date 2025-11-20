// Type-safe i18n hook with auto-completion

import { useTranslation } from 'react-i18next';
import type { TranslationKey, Language } from './generated/types';

export function useI18n() {
  const { t: rawT, i18n } = useTranslation();
  
  // Type-safe translation function
  const t = (key: TranslationKey, params?: Record<string, any>) => {
    return rawT(key, params);
  };
  
  // Current language
  const lang = i18n.language as Language;
  
  // Change language
  const setLang = (newLang: Language) => {
    i18n.changeLanguage(newLang);
  };
  
  return {
    t,        // Type-safe translation function
    lang,     // Current language ('en' | 'zh')
    setLang,  // Change language function
  };
}

