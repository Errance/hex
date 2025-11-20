// Trigram constants and mappings

import { Localized } from "./types";

export type TrigramKey = 'heaven' | 'earth' | 'water' | 'fire' | 'thunder' | 'wind' | 'mountain' | 'lake';

export type TrigramDef = {
  symbol: string;
  name: Localized;
};

export const TRIGRAMS: Record<TrigramKey, TrigramDef> = {
  heaven: { symbol: "☰", name: { en: "Heaven", zh: "天" } },
  earth: { symbol: "☷", name: { en: "Earth", zh: "地" } },
  water: { symbol: "☵", name: { en: "Water", zh: "水" } },
  fire: { symbol: "☲", name: { en: "Fire", zh: "火" } },
  thunder: { symbol: "☳", name: { en: "Thunder", zh: "雷" } },
  wind: { symbol: "☴", name: { en: "Wind", zh: "风" } },
  mountain: { symbol: "☶", name: { en: "Mountain", zh: "山" } },
  lake: { symbol: "☱", name: { en: "Lake", zh: "泽" } },
};

// Mapping of Hexagram ID to its constituent Trigrams (Upper, Lower)
export const HEXAGRAM_TRIGRAMS: Record<number, { upper: TrigramKey, lower: TrigramKey }> = {
  1: { upper: "heaven", lower: "heaven" },
  2: { upper: "earth", lower: "earth" },
  3: { upper: "water", lower: "thunder" },
  4: { upper: "mountain", lower: "water" },
  5: { upper: "water", lower: "heaven" },
  6: { upper: "heaven", lower: "water" },
  7: { upper: "earth", lower: "water" },
  8: { upper: "water", lower: "earth" },
  9: { upper: "wind", lower: "heaven" },
  10: { upper: "heaven", lower: "lake" },
  11: { upper: "earth", lower: "heaven" },
  12: { upper: "heaven", lower: "earth" },
  13: { upper: "heaven", lower: "fire" },
  14: { upper: "fire", lower: "heaven" },
  15: { upper: "earth", lower: "mountain" },
  16: { upper: "thunder", lower: "earth" },
  17: { upper: "lake", lower: "thunder" },
  18: { upper: "mountain", lower: "wind" },
  19: { upper: "earth", lower: "lake" },
  20: { upper: "wind", lower: "earth" },
  21: { upper: "fire", lower: "thunder" },
  22: { upper: "mountain", lower: "fire" },
  23: { upper: "mountain", lower: "earth" },
  24: { upper: "earth", lower: "thunder" },
  25: { upper: "heaven", lower: "thunder" },
  26: { upper: "mountain", lower: "heaven" },
  27: { upper: "mountain", lower: "thunder" },
  28: { upper: "lake", lower: "wind" },
  29: { upper: "water", lower: "water" },
  30: { upper: "fire", lower: "fire" },
  31: { upper: "lake", lower: "mountain" },
  32: { upper: "thunder", lower: "wind" },
  33: { upper: "heaven", lower: "mountain" },
  34: { upper: "thunder", lower: "heaven" },
  35: { upper: "fire", lower: "earth" },
  36: { upper: "earth", lower: "fire" },
  37: { upper: "wind", lower: "fire" },
  38: { upper: "fire", lower: "lake" },
  39: { upper: "water", lower: "mountain" },
  40: { upper: "thunder", lower: "water" },
  41: { upper: "mountain", lower: "lake" },
  42: { upper: "wind", lower: "thunder" },
  43: { upper: "lake", lower: "heaven" },
  44: { upper: "heaven", lower: "wind" },
  45: { upper: "lake", lower: "earth" },
  46: { upper: "earth", lower: "wind" },
  47: { upper: "lake", lower: "water" },
  48: { upper: "water", lower: "wind" },
  49: { upper: "lake", lower: "fire" },
  50: { upper: "fire", lower: "wind" },
  51: { upper: "thunder", lower: "thunder" },
  52: { upper: "mountain", lower: "mountain" },
  53: { upper: "wind", lower: "mountain" },
  54: { upper: "thunder", lower: "lake" },
  55: { upper: "thunder", lower: "fire" },
  56: { upper: "fire", lower: "mountain" },
  57: { upper: "wind", lower: "wind" },
  58: { upper: "lake", lower: "lake" },
  59: { upper: "wind", lower: "water" },
  60: { upper: "water", lower: "lake" },
  61: { upper: "wind", lower: "lake" },
  62: { upper: "thunder", lower: "mountain" },
  63: { upper: "water", lower: "fire" },
  64: { upper: "fire", lower: "water" },
};

