"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="text-2xl">☯</div>
        <div>
          <h1 className="text-xl font-serif font-bold" suppressHydrationWarning>
            {t("app.title")}
          </h1>
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            {t("app.subtitle")}
          </p>
        </div>
      </Link>

        <nav className="flex items-center gap-3">
        <Link
          href="/history"
          className="text-sm hover:text-primary transition-colors"
          suppressHydrationWarning
        >
          {t("nav.history")}
        </Link>
          <LanguageToggle />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

