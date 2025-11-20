"use client";

import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import type { AiInterpretation } from "@/types/divination";

interface DetailedInterpretationProps {
  interpretation: AiInterpretation;
}

export function DetailedInterpretation({
  interpretation,
}: DetailedInterpretationProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      {/* Summary TL;DR */}
      <Card className="p-6 bg-primary/5 border-primary">
        <h3 className="text-lg font-semibold mb-3 text-primary">{t("interpretation.summary")}</h3>
        <p className="text-foreground leading-relaxed">{interpretation.summary}</p>
      </Card>

      {/* Main Reading */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{t("interpretation.detailedReading")}</h3>
        <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
          {interpretation.mainReading}
        </div>
      </Card>

      {/* Risks */}
      <Card className="p-6 bg-destructive/5 border-destructive/30">
        <h3 className="text-lg font-semibold mb-3 text-destructive">
          {t("interpretation.risks")}
        </h3>
        <div className="text-foreground whitespace-pre-wrap">
          {interpretation.risks}
        </div>
      </Card>

      {/* Guidance */}
      <Card className="p-6 bg-accent/5">
        <h3 className="text-lg font-semibold mb-4">{t("interpretation.guidance")}</h3>
        <div className="text-foreground whitespace-pre-wrap space-y-2">
          {interpretation.guidance}
        </div>
      </Card>
    </div>
  );
}

