"use client";

import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-lg">{t("footer.trigrams")}</span>
        </div>
        <p suppressHydrationWarning>{t("footer.text")}</p>
      </div>
    </footer>
  );
}

