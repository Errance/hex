"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<"zen" | "fengshui">("zen");

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("hex-oracle-theme") as "zen" | "fengshui" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "zen");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "zen" ? "fengshui" : "zen";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("hex-oracle-theme", newTheme);
  };
  
  const getThemeLabel = () => {
    if (i18n.language === "zh") {
      return theme === "zen" ? "禅道" : "风水";
    }
    return theme === "zen" ? "禅 Zen" : "风水 Fengshui";
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="text-xs"
    >
      {getThemeLabel()}
    </Button>
  );
}

