"use client";

import { useI18n } from "@/lib/i18n/useI18n";
import type { LineCast } from "@/types/divination";

interface LineProgressProps {
  lines: LineCast[];
  totalLines?: number;
}

export function LineProgress({ lines, totalLines = 6 }: LineProgressProps) {
  const { t, lang } = useI18n();
  
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm font-medium">
          <span>{t("cast.progress")}</span>
          <span className="text-primary">{lines.length} / {totalLines}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {lang === 'zh' ? '━━━ 阳爻 (实线) / ━ ━ 阴爻 (断线)' : '━━━ Yang (solid) / ━ ━ Yin (broken)'}
        </p>
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
                <div className="relative flex-1 h-10 rounded-md border-2 border-primary bg-card flex items-center justify-center shadow-sm">
                  {line.lineType === "yang" ? (
                    <div className="h-2 w-full bg-primary mx-3 rounded" />
                  ) : (
                    <div className="flex gap-3 w-full px-3">
                      <div className="h-2 flex-1 bg-primary rounded" />
                      <div className="h-2 flex-1 bg-primary rounded" />
                    </div>
                  )}
                  
                  {line.isMoving && (
                    <span className="absolute right-2 text-sm text-primary animate-pulse">
                      ⚬
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex-1 h-10 rounded-md border-2 border-dashed border-muted bg-muted/10" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

