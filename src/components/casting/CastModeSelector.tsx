"use client";

import { useI18n } from "@/lib/i18n/useI18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CastMethod } from "@/types/divination";

interface CastModeSelectorProps {
  selectedMethod: CastMethod;
  onSelectMethod: (method: CastMethod) => void;
  animationEnabled: boolean;
  onToggleAnimation: (enabled: boolean) => void;
}

export function CastModeSelector({
  selectedMethod,
  onSelectMethod,
  animationEnabled,
  onToggleAnimation,
}: CastModeSelectorProps) {
  const { t } = useI18n();
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">{t("cast.chooseMethod")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className={`p-4 cursor-pointer transition-all hover:border-primary ${
              selectedMethod === "coins-auto"
                ? "border-primary ring-2 ring-primary/20"
                : ""
            }`}
            onClick={() => onSelectMethod("coins-auto")}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚡</div>
              <div>
                <h4 className="font-semibold mb-1">{t("cast.autoMode.title")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("cast.autoMode.desc")}
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-4 cursor-pointer transition-all hover:border-primary ${
              selectedMethod === "coins-manual"
                ? "border-primary ring-2 ring-primary/20"
                : ""
            }`}
            onClick={() => onSelectMethod("coins-manual")}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">🎯</div>
              <div>
                <h4 className="font-semibold mb-1">{t("cast.manualMode.title")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("cast.manualMode.desc")}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
        <div>
          <h4 className="font-medium mb-1">{t("cast.animation.title")}</h4>
          <p className="text-sm text-muted-foreground">
            {animationEnabled ? t("cast.animation.enabled") : t("cast.animation.disabled")}
          </p>
        </div>
        <Button
          variant={animationEnabled ? "default" : "outline"}
          size="sm"
          onClick={() => onToggleAnimation(!animationEnabled)}
        >
          {animationEnabled ? t("cast.animation.btnEnabled") : t("cast.animation.btnDisabled")}
        </Button>
      </div>
    </div>
  );
}

