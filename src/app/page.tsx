"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/useAppStore";
import { useAuthStore } from "@/store/useAuthStore";
import { IntroStep } from "@/components/steps/IntroStep";
import { CastStep } from "@/components/steps/CastStep";
import { InitialReadingStep } from "@/components/steps/InitialReadingStep";
import { DetailedReadingStep } from "@/components/steps/DetailedReadingStep";
import { MockLoginModal } from "@/components/auth/MockLoginModal";
import { getHexagramByIdI18n, getHexagramSummaryI18n } from "@/lib/i18n/hexagram-i18n-utils";
import { getMovingLineIndices } from "@/lib/casting";
import type { LineCast, AiInterpretation } from "@/types/divination";

export default function HomePage() {
  const { i18n } = useTranslation();
  const {
    currentStep,
    castMethod,
    animationEnabled,
    currentCast,
    setStep,
    setCastMethod,
    setAnimationEnabled,
    startNewCast,
    setCastResult,
    saveRecord,
    updateRecordAi,
  } = useAppStore();

  const { isAuthenticated, login } = useAuthStore();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [completedCastLines, setCompletedCastLines] = useState<LineCast[]>([]);
  const [baseHexagramId, setBaseHexagramId] = useState<number | null>(null);
  const [changingHexagramId, setChangingHexagramId] = useState<number | null>(null);

  const handleBeginCasting = () => {
    startNewCast(castMethod);
  };

  const handleCastComplete = (
    hexagramId: number,
    changingId: number | null,
    lines: LineCast[]
  ) => {
    setBaseHexagramId(hexagramId);
    setChangingHexagramId(changingId);
    setCompletedCastLines(lines);

    // Save cast result
    setCastResult({
      id: currentCast?.id || crypto.randomUUID(),
      createdAt: currentCast?.createdAt || new Date().toISOString(),
      method: castMethod,
      lines,
      baseHexagramId: hexagramId,
      changingHexagramId: changingId,
    });
  };

  const handleViewDetailed = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      setStep("reading-detailed");
    }
  };

  const handleLogin = (email: string) => {
    login(email);
    setShowLoginModal(false);
    setStep("reading-detailed");
  };

  const handleSaveReading = (question: string, interpretation: AiInterpretation) => {
    if (!currentCast) return;

    // Create or update record
    const record = {
      id: currentCast.id,
      createdAt: currentCast.createdAt,
      question,
      castResult: currentCast,
      aiInterpretation: interpretation,
    };

    saveRecord(record);
    updateRecordAi(record.id, interpretation);
  };

  // Get hexagram data for current reading with i18n support
  const hexagram = baseHexagramId ? getHexagramByIdI18n(baseHexagramId, i18n.language) : null;
  const summary = baseHexagramId ? getHexagramSummaryI18n(baseHexagramId, i18n.language) : null;
  const changingHexagram = changingHexagramId ? getHexagramByIdI18n(changingHexagramId, i18n.language) : null;
  const movingLines = completedCastLines.length > 0 ? getMovingLineIndices(completedCastLines) : [];

  return (
    <>
      {currentStep === "intro" && (
        <IntroStep onBegin={handleBeginCasting} />
      )}

      {currentStep === "cast" && (
        <CastStep
          method={castMethod}
          animationEnabled={animationEnabled}
          onMethodChange={setCastMethod}
          onAnimationToggle={setAnimationEnabled}
          onComplete={handleCastComplete}
        />
      )}

      {currentStep === "reading-initial" && hexagram && summary && (
        <InitialReadingStep
          hexagram={hexagram}
          summary={summary}
          lines={completedCastLines}
          changingHexagram={changingHexagram}
          onViewDetailed={handleViewDetailed}
        />
      )}

      {currentStep === "reading-detailed" && hexagram && summary && (
        <DetailedReadingStep
          hexagram={hexagram}
          summary={summary}
          changingHexagramId={changingHexagramId}
          movingLines={movingLines}
          onSaveReading={handleSaveReading}
        />
      )}

      <MockLoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
