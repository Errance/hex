"use client";

import { useI18n } from "@/lib/i18n/useI18n";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { t, lang, setLang } = useI18n();

  const toggleLanguage = () => {
    const newLang = lang === "zh" ? "en" : "zh";
    setLang(newLang);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="text-xs min-w-16"
      title={t("common.languageSwitch")}
    >
      {lang === "zh" ? "EN" : "中文"}
    </Button>
  );
}

