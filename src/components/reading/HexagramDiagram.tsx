"use client";

import { useI18n } from "@/lib/i18n/useI18n";
import type { HexagramView } from "@/content/hexagrams";
import type { LineCast } from "@/types/divination";

interface HexagramDiagramProps {
  hexagram: HexagramView;
  lines: LineCast[];
}

export function HexagramDiagram({ hexagram, lines }: HexagramDiagramProps) {
  const { t } = useI18n();
  // Sort lines from bottom (1) to top (6)
  const sortedLines = [...lines].sort((a, b) => a.index - b.index);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Hexagram name and symbols */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-4xl">{hexagram.symbolUpper}</span>
          <div>
            <h2 className="text-3xl font-serif font-bold">{hexagram.name}</h2>
            {hexagram.nameZh && (
              <p className="text-xl text-muted-foreground">{hexagram.nameZh}</p>
            )}
          </div>
          <span className="text-4xl">{hexagram.symbolLower}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {hexagram.trigramUpper} {t("hexagram.over")} {hexagram.trigramLower}
        </p>
      </div>

      {/* Visual hexagram lines */}
      <div className="flex flex-col-reverse gap-3 w-64">
        {sortedLines.map((line) => (
          <div key={line.index} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-4">
              {line.index}
            </span>
            
            <div className="flex-1 flex items-center justify-center h-3 relative">
              {line.lineType === "yang" ? (
                <div className="h-2 w-full bg-primary rounded-full shadow-md" />
              ) : (
                <div className="flex gap-3 w-full">
                  <div className="h-2 flex-1 bg-primary rounded-full shadow-md" />
                  <div className="h-2 flex-1 bg-primary rounded-full shadow-md" />
                </div>
              )}
              
              {line.isMoving && (
                <div className="absolute -right-8">
                  <span className="text-primary text-lg">●</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {lines.some((l) => l.isMoving) && (
        <p className="text-xs text-muted-foreground">
          ● {t("hexagram.movingLinesLabel")}
        </p>
      )}
    </div>
  );
}

