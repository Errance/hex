"use client";

import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import type { HexagramBase } from "@/types/hexagram";

interface HexagramSummaryCardProps {
  hexagram: HexagramBase;
}

export function HexagramSummaryCard({ hexagram }: HexagramSummaryCardProps) {
  const { t } = useTranslation();
  
  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">
          {t("reading.description")}
        </h3>
        <p className="text-foreground">{hexagram.descriptionShort}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">
          {t("reading.judgment")}
        </h3>
        <p className="text-foreground italic">{hexagram.judgement}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">
          {t("reading.image")}
        </h3>
        <p className="text-foreground italic">{hexagram.imageText}</p>
      </div>
    </Card>
  );
}

