// src/types/divination.ts

import type { HexagramBase } from "./hexagram";

export type CastMethod = "coins-auto" | "coins-manual";

export type CoinValue = 2 | 3; // tails / heads

export type LineType = "yin" | "yang";

export type LineCast = {
  index: 1 | 2 | 3 | 4 | 5 | 6; // bottom to top
  coins: [CoinValue, CoinValue, CoinValue];
  sum: 6 | 7 | 8 | 9;
  lineType: LineType;
  isMoving: boolean; // 6 or 9
};

export type HexagramCastResult = {
  id: string;
  createdAt: string;
  method: CastMethod;
  lines: LineCast[];
  baseHexagramId: number;
  changingHexagramId?: number | null;
};

export type AiInterpretation = {
  summary: string;
  mainReading: string;
  risks: string;
  guidance: string;
  rawText?: string;
};

export type DivinationRecord = {
  id: string;
  createdAt: string;
  question: string;
  castResult: HexagramCastResult;
  aiInterpretation?: AiInterpretation;
};

// Payload sent from frontend to /api/ai/interpret
export type InterpretRequest = {
  hexagramId: number;
  changingHexagramId?: number | null;
  movingLines: number[];
  question: string;
  language?: string; // 'en' or 'zh'
  context: {
    baseHexagram: Pick<
      HexagramBase,
      "name" | "nameZh" | "descriptionShort" | "judgement" | "imageText" | "lines"
    >;
    initialSummary: string;
  };
};

export type InterpretResponse =
  | { success: true; data: AiInterpretation }
  | { success: false; error: string };

