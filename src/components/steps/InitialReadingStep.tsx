"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { HexagramDiagram } from "../reading/HexagramDiagram";
import { HexagramSummaryCard } from "../reading/HexagramSummaryCard";
import { MovingLinesList } from "../reading/MovingLinesList";
import { InitialInterpretation } from "../reading/InitialInterpretation";
import type { HexagramBase, HexagramInitialSummary } from "@/types/hexagram";
import type { LineCast } from "@/types/divination";

interface InitialReadingStepProps {
  hexagram: HexagramBase;
  summary: HexagramInitialSummary;
  lines: LineCast[];
  changingHexagram?: HexagramBase | null;
  onViewDetailed: () => void;
}

export function InitialReadingStep({
  hexagram,
  summary,
  lines,
  changingHexagram,
  onViewDetailed,
}: InitialReadingStepProps) {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold mb-2">{t("reading.initialTitle")}</h2>
        <p className="text-muted-foreground">
          {t("reading.initialSubtitle")}
        </p>
      </div>

      {/* Main Hexagram Diagram */}
      <div className="bg-card/50 rounded-lg border border-border">
        <HexagramDiagram hexagram={hexagram} lines={lines} />
      </div>

      {/* Hexagram Summary */}
      <HexagramSummaryCard hexagram={hexagram} />

      {/* Moving Lines (if any) */}
      <MovingLinesList hexagram={hexagram} lines={lines} />

      {/* Changing Hexagram Notice */}
      {changingHexagram && (
        <div className="p-4 bg-primary/10 border border-primary rounded-lg text-center">
          <p className="text-sm">
            <strong>{t("reading.transformsInto")}</strong>
          </p>
          <p className="text-lg font-semibold text-primary mt-1">
            {changingHexagram.name} {changingHexagram.nameZh && `(${changingHexagram.nameZh})`}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("reading.transformation")}
          </p>
        </div>
      )}

      {/* Initial Interpretation */}
      <InitialInterpretation summary={summary} />

      {/* CTA for Detailed Reading */}
      <div className="text-center pt-6 space-y-4">
        <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20">
          <h3 className="text-xl font-semibold mb-2">
            {t("reading.wantDeeper")}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t("reading.wantDeeperDesc")}
          </p>
          <Button
            size="lg"
            onClick={onViewDetailed}
            className="min-w-48"
          >
            {t("reading.viewDetailed")}
          </Button>
        </div>

        <Button
          variant="ghost"
          onClick={() => window.location.reload()}
        >
          {t("reading.startNew")}
        </Button>
      </div>
    </div>
  );
}

