"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/useAppStore";
import { HistoryList } from "@/components/history/HistoryList";
import { HexagramDiagram } from "@/components/reading/HexagramDiagram";
import { HexagramSummaryCard } from "@/components/reading/HexagramSummaryCard";
import { InitialInterpretation } from "@/components/reading/InitialInterpretation";
import { DetailedInterpretation } from "@/components/reading/DetailedInterpretation";
import { MovingLinesList } from "@/components/reading/MovingLinesList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getHexagramById, getHexagramSummary } from "@/lib/hexagram-utils";
import type { DivinationRecord } from "@/types/divination";

export default function HistoryPage() {
  const { t } = useTranslation();
  const { history } = useAppStore();
  const [selectedRecord, setSelectedRecord] = useState<DivinationRecord | null>(null);

  const handleSelectRecord = (record: DivinationRecord) => {
    setSelectedRecord(record);
  };

  const handleCloseDetail = () => {
    setSelectedRecord(null);
  };

  const hexagram = selectedRecord
    ? getHexagramById(selectedRecord.castResult.baseHexagramId)
    : null;
  const summary = selectedRecord
    ? getHexagramSummary(selectedRecord.castResult.baseHexagramId)
    : null;
  const changingHexagram = selectedRecord?.castResult.changingHexagramId
    ? getHexagramById(selectedRecord.castResult.changingHexagramId)
    : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">{t("history.title")}</h1>
        <p className="text-muted-foreground">
          {t("history.subtitle")}
        </p>
      </div>

      <HistoryList records={history} onSelectRecord={handleSelectRecord} />

      {/* Detail Dialog */}
      <Dialog open={!!selectedRecord} onOpenChange={handleCloseDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedRecord && hexagram && summary && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">
                  {t("history.readingFrom", { date: new Date(selectedRecord.createdAt).toLocaleString() })}
                </DialogTitle>
              </DialogHeader>

              {/* Question */}
              {selectedRecord.question && (
                <div className="p-4 bg-primary/10 border border-primary rounded-lg">
                  <h3 className="font-semibold mb-2">{t("reading.yourQuestion")}</h3>
                  <p className="text-sm">{selectedRecord.question}</p>
                </div>
              )}

              {/* Hexagram Diagram */}
              <div className="bg-card/50 rounded-lg border">
                <HexagramDiagram
                  hexagram={hexagram}
                  lines={selectedRecord.castResult.lines}
                />
              </div>

              {/* Changing Hexagram Notice */}
              {changingHexagram && (
                <div className="p-4 bg-primary/10 border border-primary rounded-lg text-center">
                  <p className="text-sm">
                    <strong>Transforms into:</strong>
                  </p>
                  <p className="text-lg font-semibold text-primary mt-1">
                    {changingHexagram.name}{" "}
                    {changingHexagram.nameZh && `(${changingHexagram.nameZh})`}
                  </p>
                </div>
              )}

              {/* Summary Card */}
              <HexagramSummaryCard hexagram={hexagram} />

              {/* Moving Lines */}
              <MovingLinesList
                hexagram={hexagram}
                lines={selectedRecord.castResult.lines}
              />

              {/* Initial Interpretation */}
              <InitialInterpretation summary={summary} />

              {/* AI Interpretation */}
              {selectedRecord.aiInterpretation && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {t("interpretation.personalized")}
                  </h3>
                  <DetailedInterpretation
                    interpretation={selectedRecord.aiInterpretation}
                  />
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button onClick={handleCloseDetail}>{t("history.close")}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

