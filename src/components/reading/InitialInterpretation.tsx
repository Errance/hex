"use client";

import { useI18n } from "@/lib/i18n/useI18n";
import { Card } from "@/components/ui/card";
import type { HexagramView } from "@/content/hexagrams";

interface InitialInterpretationProps {
  summary: HexagramView['summary'];
}

export function InitialInterpretation({ summary }: InitialInterpretationProps) {
  const { t } = useI18n();
  
  const toneColors = {
    very_favorable: "text-green-500",
    favorable: "text-blue-500",
    neutral: "text-yellow-500",
    challenging: "text-orange-500",
  };

  return (
    <Card className="p-6 space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold">{t("interpretation.initial")}</h3>
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${toneColors[summary.tone]} bg-current/10`}
          >
            {t(`interpretation.tone.${summary.tone}`)}
          </span>
        </div>
        <p className="text-foreground leading-relaxed">{summary.general}</p>
      </div>

      {summary.scenes && (
        <div className="pt-4 border-t border-border space-y-3">
          {summary.scenes.career && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                {t("interpretation.scenes.career")}
              </h4>
              <p className="text-sm text-foreground">{summary.scenes.career}</p>
            </div>
          )}
          {summary.scenes.love && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                {t("interpretation.scenes.love")}
              </h4>
              <p className="text-sm text-foreground">{summary.scenes.love}</p>
            </div>
          )}
          {summary.scenes.wealth && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                {t("interpretation.scenes.wealth")}
              </h4>
              <p className="text-sm text-foreground">{summary.scenes.wealth}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

