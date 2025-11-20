"use client";

import { useI18n } from "@/lib/i18n/useI18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface IntroStepProps {
  onBegin: () => void;
}

export function IntroStep({ onBegin }: IntroStepProps) {
  const { t } = useI18n();

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="text-6xl mb-4">☯</div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold" suppressHydrationWarning>
          {t("intro.title")}
        </h1>
        <p className="text-xl text-muted-foreground" suppressHydrationWarning>
          {t("intro.subtitle")}
        </p>
      </div>

      <Card className="p-8 text-left space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold" suppressHydrationWarning>
            {t("intro.howItWorks")}
          </h2>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <span suppressHydrationWarning>
                <strong className="text-foreground">{t("intro.step1.title")}</strong>{" "}
                {t("intro.step1.desc")}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <span suppressHydrationWarning>
                <strong className="text-foreground">{t("intro.step2.title")}</strong>{" "}
                {t("intro.step2.desc")}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <span suppressHydrationWarning>
                <strong className="text-foreground">{t("intro.step3.title")}</strong>{" "}
                {t("intro.step3.desc")}
              </span>
            </li>
          </ol>
        </div>

        <div className="pt-6">
          <Button
            size="lg"
            onClick={onBegin}
            className="w-full text-lg h-14"
            suppressHydrationWarning
          >
            {t("intro.beginButton")}
          </Button>
        </div>
      </Card>

      <p className="text-sm text-muted-foreground" suppressHydrationWarning>
        {t("intro.description")}<br />
        {t("intro.description2")}
      </p>
    </div>
  );
}

