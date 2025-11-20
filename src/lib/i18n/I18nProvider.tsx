"use client";

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './config';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only detect and change language on the client side after hydration
    if (typeof window !== 'undefined' && !i18n.isInitialized) {
      i18n.changeLanguage(i18n.language);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

