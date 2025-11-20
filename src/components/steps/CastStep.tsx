"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CastModeSelector } from "../casting/CastModeSelector";
import { CoinAnimation } from "../casting/CoinAnimation";
import { LineProgress } from "../casting/LineProgress";
import type { CastMethod, CoinValue, LineCast, ClickEntropyData } from "@/types/divination";
import { calculateLine, linesToHexagramId, calculateChangingHexagram } from "@/lib/casting";
import { rollCoinsEnhanced } from "@/lib/enhanced-casting";
import { getCachedBitcoinBlockHash } from "@/lib/bitcoin-api";

interface CastStepProps {
  method: CastMethod;
  animationEnabled: boolean;
  onMethodChange: (method: CastMethod) => void;
  onAnimationToggle: (enabled: boolean) => void;
  onComplete: (hexagramId: number, changingHexagramId: number | null, lines: LineCast[]) => void;
}

export function CastStep({
  method,
  animationEnabled,
  onMethodChange,
  onAnimationToggle,
  onComplete,
}: CastStepProps) {
  const { t } = useTranslation();
  const [isCasting, setIsCasting] = useState(false);
  const [currentCoins, setCurrentCoins] = useState<[CoinValue, CoinValue, CoinValue]>([2, 2, 2]);
  const [lines, setLines] = useState<LineCast[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bitcoinHash, setBitcoinHash] = useState<string | null>(null);
  const [isLoadingBitcoin, setIsLoadingBitcoin] = useState(true);
  
  // Ref to store button element for click position tracking
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Preload Bitcoin block hash on component mount
  useEffect(() => {
    const loadBitcoinHash = async () => {
      setIsLoadingBitcoin(true);
      const hash = await getCachedBitcoinBlockHash();
      setBitcoinHash(hash);
      setIsLoadingBitcoin(false);
      
      if (hash) {
        console.log('Bitcoin entropy loaded successfully');
      } else {
        console.warn('Bitcoin entropy unavailable, using fallback');
      }
    };
    
    loadBitcoinHash();
  }, []);

  const performCast = async (
    lineIndex: 1 | 2 | 3 | 4 | 5 | 6,
    clickData?: ClickEntropyData
  ) => {
    // Use enhanced random generation
    const coins = await rollCoinsEnhanced({
      lineIndex,
      bitcoinHash,
      clickData,
    });
    
    const line = calculateLine(lineIndex, coins);
    
    setCurrentCoins(coins);
    setLines((prev) => [...prev, line]);
  };

  const handleAutoCast = async () => {
    setIsCasting(true);
    setLines([]);

    for (let i = 1; i <= 6; i++) {
      const lineIndex = i as 1 | 2 | 3 | 4 | 5 | 6;
      
      if (animationEnabled) {
        setIsAnimating(true);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      
      // Auto mode: no click data, relies on crypto + bitcoin + celestial entropy
      await performCast(lineIndex);
      
      if (animationEnabled) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setIsAnimating(false);
        await new Promise((resolve) => setTimeout(resolve, 300));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    setIsCasting(false);
  };

  const handleManualCast = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (lines.length >= 6) return;
    
    setIsAnimating(true);
    const lineIndex = (lines.length + 1) as 1 | 2 | 3 | 4 | 5 | 6;
    
    // Collect click entropy data for manual mode
    const clickData: ClickEntropyData = {
      x: event.clientX,
      y: event.clientY,
      timestamp: performance.now(),
    };
    
    if (animationEnabled) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    
    await performCast(lineIndex, clickData);
    
    if (animationEnabled) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
    
    setIsAnimating(false);
  };

  useEffect(() => {
    if (lines.length === 6) {
      // All lines cast, calculate hexagram
      const baseHexagramId = linesToHexagramId(lines);
      const changingHexagramId = calculateChangingHexagram(lines);
      
      // Small delay before transitioning
      setTimeout(() => {
        onComplete(baseHexagramId, changingHexagramId, lines);
      }, 500);
    }
  }, [lines, onComplete]);

  const canStartCast = !isCasting && lines.length === 0;
  const isManualInProgress = method === "coins-manual" && lines.length > 0 && lines.length < 6;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold mb-2">{t("cast.title")}</h2>
        <p className="text-muted-foreground">
          {t("cast.subtitle")}
        </p>
      </div>

      {lines.length === 0 && (
        <CastModeSelector
          selectedMethod={method}
          onSelectMethod={onMethodChange}
          animationEnabled={animationEnabled}
          onToggleAnimation={onAnimationToggle}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coin Animation Area */}
        <div className="flex flex-col items-center justify-center p-8 bg-card/50 rounded-lg border border-border min-h-[300px]">
          {lines.length > 0 ? (
            <CoinAnimation coins={currentCoins} isAnimating={isAnimating} />
          ) : (
            <div className="text-center text-muted-foreground">
              <div className="text-6xl mb-4">🪙</div>
              <p>{t("cast.coinsPlaceholder")}</p>
            </div>
          )}
        </div>

        {/* Progress Area */}
        <div className="flex flex-col items-center justify-center p-8 bg-card/50 rounded-lg border border-border">
          {lines.length > 0 ? (
            <LineProgress lines={lines} />
          ) : (
            <div className="text-center text-muted-foreground">
              <div className="text-6xl mb-4">☰</div>
              <p>{t("cast.hexagramPlaceholder")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center">
        {canStartCast && method === "coins-auto" && (
          <Button
            ref={buttonRef}
            size="lg"
            onClick={handleAutoCast}
            disabled={isCasting || isLoadingBitcoin}
            className="min-w-48"
          >
            {isLoadingBitcoin 
              ? "Loading..."
              : isCasting 
                ? t("cast.casting") 
                : t("cast.castAllButton")}
          </Button>
        )}

        {canStartCast && method === "coins-manual" && (
          <Button
            ref={buttonRef}
            size="lg"
            onClick={handleManualCast}
            disabled={isLoadingBitcoin}
            className="min-w-48"
          >
            {isLoadingBitcoin ? "Loading..." : t("cast.shakeFirst")}
          </Button>
        )}

        {isManualInProgress && (
          <Button
            ref={buttonRef}
            size="lg"
            onClick={handleManualCast}
            disabled={isAnimating}
            className="min-w-48"
          >
            {isAnimating ? t("cast.shaking") : t("cast.shakeLine", { line: lines.length + 1 })}
          </Button>
        )}

        {lines.length === 6 && (
          <div className="text-center">
            <p className="text-lg text-primary animate-pulse">
              {t("cast.complete")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

