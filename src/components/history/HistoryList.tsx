"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/useI18n";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DivinationRecord } from "@/types/divination";
import { getHexagramView } from "@/content/hexagrams";
import type { HexagramView } from "@/content/hexagrams";

interface HistoryListProps {
  records: DivinationRecord[];
  onSelectRecord: (record: DivinationRecord) => void;
}

export function HistoryList({ records, onSelectRecord }: HistoryListProps) {
  const { t, lang } = useI18n();
  const [hexagrams, setHexagrams] = useState<Map<number, HexagramView>>(new Map());

  // Preload hexagrams for all records
  useEffect(() => {
    const loadHexagrams = async () => {
      const newHexagrams = new Map<number, HexagramView>();
      for (const record of records) {
        const id = record.castResult.baseHexagramId;
        if (!newHexagrams.has(id)) {
          const hex = await getHexagramView(id, lang);
          if (hex) newHexagrams.set(id, hex);
        }
      }
      setHexagrams(newHexagrams);
    };
    loadHexagrams();
  }, [records, lang]);
  
  if (records.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📜</div>
        <h3 className="text-xl font-semibold mb-2">{t("history.empty.title")}</h3>
        <p className="text-muted-foreground mb-6">
          {t("history.empty.desc")}
        </p>
        <Button onClick={() => window.location.href = "/"}>
          {t("history.empty.button")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => {
        const hexagram = hexagrams.get(record.castResult.baseHexagramId);
        const date = new Date(record.createdAt);
        const hasAi = !!record.aiInterpretation;

        return (
          <Card
            key={record.id}
            className="p-6 cursor-pointer hover:border-primary transition-all"
            onClick={() => onSelectRecord(record)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{hexagram?.symbolUpper || "☯"}</span>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {hexagram?.name || "Unknown"}{" "}
                      {lang === 'en' && hexagram?.nameZh && (
                        <span className="text-muted-foreground">
                          {hexagram.nameZh}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {record.question && (
                  <p className="text-sm text-foreground line-clamp-2">
                    {record.question.length > 100
                      ? `${record.question.substring(0, 100)}...`
                      : record.question}
                  </p>
                )}

                <div className="flex items-center gap-2">
                  {hasAi && (
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                      {t("history.aiInterpreted")}
                    </span>
                  )}
                  {record.castResult.changingHexagramId && (
                    <span className="text-xs px-2 py-1 bg-accent/10 text-accent-foreground rounded">
                      {t("history.movingLinesLabel")}
                    </span>
                  )}
                </div>
              </div>

              <Button variant="ghost" size="sm">
                {t("history.view")} →
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

