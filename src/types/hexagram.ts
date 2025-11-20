// src/types/hexagram.ts

export type LineText = {
  index: 1 | 2 | 3 | 4 | 5 | 6; // 1 = bottom line
  text: string;                 // English paraphrase of the line text
  original?: string;            // Optional Chinese source text
};

export type HexagramBase = {
  id: number;                 // 1-64
  name: string;               // "Qián", "Kūn", etc.
  nameZh?: string;            // "乾", "坤"
  descriptionShort: string;   // One-sentence gist
  trigramUpper: string;       // "Heaven", "Earth", "Water", etc.
  trigramLower: string;
  symbolUpper: string;        // "☰"
  symbolLower: string;
  judgement: string;          // Paraphrased judgment text
  imageText: string;          // Paraphrased Image text
  lines: LineText[];          // Length = 6
};

export type HexagramTone =
  | "very_favorable"
  | "favorable"
  | "neutral"
  | "challenging";

export type HexagramInitialSummary = {
  hexagramId: number;
  general: {
    tone: HexagramTone;
    summary: string; // 2-3 sentence general reading in English
  };
  scenes?: {
    love?: string;
    career?: string;
    wealth?: string;
    health?: string;
  };
};

