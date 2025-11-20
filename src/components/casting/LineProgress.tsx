"use client";

import { useTranslation } from "react-i18next";
import type { LineCast } from "@/types/divination";

interface LineProgressProps {
  lines: LineCast[];
  totalLines?: number;
}

export function LineProgress({ lines, totalLines = 6 }: LineProgressProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{t("cast.progress")}</span>
        <span>{lines.length} / {totalLines}</span>
      </div>
      
      <div className="flex flex-col gap-2">
        {Array.from({ length: totalLines }, (_, i) => {
          const lineIndex = (totalLines - i) as 1 | 2 | 3 | 4 | 5 | 6; // Display from top (6) to bottom (1)
          const line = lines.find((l) => l.index === lineIndex);
          
          return (
            <div key={lineIndex} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-6">
                {lineIndex}
              </span>
              
              {line ? (
                <div className="flex-1 h-8 rounded border-2 border-primary bg-card flex items-center justify-center">
                  {line.lineType === "yang" ? (
                    <div className="h-1 w-full bg-primary mx-2 rounded-full" />
                  ) : (
                    <div className="flex gap-2 w-full px-2">
                      <div className="h-1 flex-1 bg-primary rounded-full" />
                      <div className="h-1 flex-1 bg-primary rounded-full" />
                    </div>
                  )}
                  
                  {line.isMoving && (
                    <span className="absolute text-xs text-primary ml-auto mr-2">
                      ●
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex-1 h-8 rounded border border-muted bg-muted/20" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

