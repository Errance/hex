"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/useI18n";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { t } = useI18n();
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
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="text-xs"
    >
      {t(theme === "zen" ? "theme.zen" : "theme.fengshui")}
    </Button>
  );
}

