"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DetailedInterpretation } from "../reading/DetailedInterpretation";
import type { AiInterpretation, InterpretRequest } from "@/types/divination";
import type { HexagramBase, HexagramInitialSummary } from "@/types/hexagram";

interface DetailedReadingStepProps {
  hexagram: HexagramBase;
  summary: HexagramInitialSummary;
  changingHexagramId?: number | null;
  movingLines: number[];
  onSaveReading: (question: string, interpretation: AiInterpretation) => void;
}

export function DetailedReadingStep({
  hexagram,
  summary,
  changingHexagramId,
  movingLines,
  onSaveReading,
}: DetailedReadingStepProps) {
  const { t, i18n } = useTranslation();
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<AiInterpretation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError(t("auth.emailRequired"));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload: InterpretRequest = {
        hexagramId: hexagram.id,
        changingHexagramId,
        movingLines,
        question: question.trim(),
        language: i18n.language, // Add language to API request
        context: {
          baseHexagram: {
            name: hexagram.name,
            nameZh: hexagram.nameZh,
            descriptionShort: hexagram.descriptionShort,
            judgement: hexagram.judgement,
            imageText: hexagram.imageText,
            lines: hexagram.lines,
          },
          initialSummary: summary.general.summary,
        },
      };

      const response = await fetch("/api/ai/interpret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to get interpretation");
      }

      setInterpretation(result.data);
      onSaveReading(question, result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold mb-2">{t("reading.detailedTitle")}</h2>
        <p className="text-muted-foreground">
          {t("reading.detailedSubtitle")}
        </p>
      </div>

      {!interpretation ? (
        <div className="space-y-6">
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-start gap-3 mb-4">
              <div className="text-3xl">🔮</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{t("reading.yourHexagram")}</h3>
                <p className="text-sm text-muted-foreground">
                  {hexagram.name} {hexagram.nameZh && `(${hexagram.nameZh})`}
                  {movingLines.length > 0 && ` • ${movingLines.length} ${t("reading.movingLines")}`}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("reading.questionLabel")}
              </label>
              <Textarea
                placeholder={t("reading.questionPlaceholder")}
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  setError(null);
                }}
                className="min-h-32 resize-none"
                disabled={isLoading}
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {t("reading.questionHint")}
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading || !question.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <span className="animate-pulse">{t("reading.consulting")}</span>
                </>
              ) : (
                t("reading.askOracle")
              )}
            </Button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-primary/10 border border-primary rounded-lg">
            <h3 className="font-semibold mb-2">{t("reading.yourQuestion")}</h3>
            <p className="text-sm text-muted-foreground">{question}</p>
          </div>

          <DetailedInterpretation interpretation={interpretation} />

          <div className="flex justify-center gap-4 pt-6">
            <Button
              variant="outline"
              onClick={() => {
                setQuestion("");
                setInterpretation(null);
                setError(null);
              }}
            >
              {t("reading.askAnother")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.location.href = "/history"}
            >
              {t("reading.viewHistory")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

