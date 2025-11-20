"use client";

import { useI18n } from "@/lib/i18n/useI18n";
import { Card } from "@/components/ui/card";
import type { HexagramView } from "@/content/hexagrams";
import type { LineCast } from "@/types/divination";

interface MovingLinesListProps {
  hexagram: HexagramView;
  lines: LineCast[];
}

export function MovingLinesList({ hexagram, lines }: MovingLinesListProps) {
  const { t, lang } = useI18n();
  const movingLines = lines.filter((line) => line.isMoving);

  if (movingLines.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t("reading.movingLinesCount", { count: movingLines.length })}
      </h3>
      <div className="space-y-4">
        {movingLines.map((line) => {
          const lineText = hexagram.lines.find((l) => l.index === line.index);
          return (
            <div key={line.index} className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold text-sm text-primary mb-1">
                {lang === 'zh' ? `第${line.index}爻` : `Line ${line.index}`}
              </h4>
              <p className="text-sm text-foreground">
                {lineText?.text || (lang === 'zh' ? '爻辞不可用' : 'Line text not available')}
              </p>
              {lineText?.original && (
                <p className="text-xs text-muted-foreground mt-1">
                  {lineText.original}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

