// src/store/useAppStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type CastMethod,
  type DivinationRecord,
  type HexagramCastResult,
  type LineCast,
  type AiInterpretation,
} from "@/types/divination";

export type AppStep = "intro" | "cast" | "reading-initial" | "reading-detailed";

type AppState = {
  currentStep: AppStep;
  // casting settings
  castMethod: CastMethod;
  animationEnabled: boolean;
  // current cast in progress or finished
  currentCast?: HexagramCastResult;
  // history
  history: DivinationRecord[];
  // actions
  setStep: (step: AppStep) => void;
  setCastMethod: (method: CastMethod) => void;
  setAnimationEnabled: (enabled: boolean) => void;
  startNewCast: (method: CastMethod) => void;
  appendLine: (line: LineCast) => void;
  setCastResult: (result: HexagramCastResult) => void;
  saveRecord: (record: DivinationRecord) => void;
  updateRecordAi: (id: string, ai: AiInterpretation) => void;
  resetToIntro: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentStep: "intro",
      castMethod: "coins-auto",
      animationEnabled: true,
      currentCast: undefined,
      history: [],

      setStep: (step) => set({ currentStep: step }),
      
      setCastMethod: (method) => set({ castMethod: method }),
      
      setAnimationEnabled: (enabled) => set({ animationEnabled: enabled }),
      
      startNewCast: (method) => {
        const now = new Date().toISOString();
        const cast: HexagramCastResult = {
          id: crypto.randomUUID(),
          createdAt: now,
          method,
          lines: [],
          baseHexagramId: 0,
          changingHexagramId: null,
        };
        set({
          currentCast: cast,
          currentStep: "cast",
          castMethod: method,
        });
      },
      
      appendLine: (line) => {
        const current = get().currentCast;
        if (!current) return;
        
        // Avoid duplicate indexes
        const existingIndex = current.lines.findIndex(
          (l) => l.index === line.index
        );
        let updatedLines = [...current.lines];
        if (existingIndex >= 0) {
          updatedLines[existingIndex] = line;
        } else {
          updatedLines = [...updatedLines, line];
        }
        
        set({
          currentCast: {
            ...current,
            lines: updatedLines.sort((a, b) => a.index - b.index),
          },
        });
      },
      
      setCastResult: (result) => {
        set({
          currentCast: result,
          currentStep: "reading-initial",
        });
      },
      
      saveRecord: (record) => {
        const history = get().history;
        // Avoid duplicates by id
        const existingIndex = history.findIndex((r) => r.id === record.id);
        let newHistory = [...history];
        if (existingIndex >= 0) {
          newHistory[existingIndex] = record;
        } else {
          newHistory = [record, ...history];
        }
        set({ history: newHistory });
      },
      
      updateRecordAi: (id, ai) => {
        const history = get().history;
        const newHistory = history.map((record) =>
          record.id === id
            ? {
                ...record,
                aiInterpretation: ai,
              }
            : record
        );
        set({ history: newHistory });
      },
      
      resetToIntro: () => {
        set({
          currentStep: "intro",
          currentCast: undefined,
        });
      },
    }),
    {
      name: "hex-oracle-app",
      partialize: (state) => ({
        // Only persist history, not current cast or step
        history: state.history,
      }),
    }
  )
);

