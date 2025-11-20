// Content layer types for I Ching hexagram data
// This is knowledge base, not i18n translations

/**
 * Language code
 */
export type Lang = 'en' | 'zh';

/**
 * Scene key for scene-specific advice
 */
export type SceneKey = 'love' | 'career' | 'wealth' | 'health';

/**
 * Localized content with both English and Chinese versions
 */
export type Localized<T = string> = {
  en: T;
  zh: T;
};

/**
 * Line text with localized interpretation
 */
export type LineText = {
  index: 1 | 2 | 3 | 4 | 5 | 6;
  text: Localized;
  original?: string; // Original Chinese text (optional)
};

/**
 * Hexagram tone/nature
 */
export type HexagramTone = 
  | 'very_favorable' 
  | 'favorable' 
  | 'neutral' 
  | 'challenging';

/**
 * Complete hexagram content with bilingual data
 */
export type HexagramContent = {
  id: number;
  name: Localized;              // "Qián (The Creative)" / "乾（创造）"
  nameZh: string;                // Chinese name: "乾"
  namePinyin: string;            // Pinyin: "Qián"
  descriptionShort: Localized;   // Short description
  
  // Visual / Structural info
  trigramUpper: Localized;      // { en: "Heaven", zh: "天" }
  trigramLower: Localized;
  symbolUpper: string;          // "☰"
  symbolLower: string;

  judgement: Localized;          // 卦辞 (Judgment)
  imageText: Localized;          // 象辞 (Image)
  lines: LineText[];             // 6 lines with interpretations
  initialSummary: {
    general: Localized;
    tone: HexagramTone;
    scenes?: {
      love?: Localized;
      career?: Localized;
      wealth?: Localized;
      health?: Localized;
    };
  };
};

/**
 * View model for consuming components (flattened structure)
 */
export type HexagramView = {
  id: number;
  name: string;
  nameZh: string;
  namePinyin: string;
  descriptionShort: string;
  
  trigramUpper: string;
  trigramLower: string;
  symbolUpper: string;
  symbolLower: string;
  
  judgement: string;
  imageText: string;
  lines: Array<{
    index: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
    original?: string;
  }>;
  summary: {
    general: string;
    tone: HexagramTone;
    scenes?: {
      love?: string;
      career?: string;
      wealth?: string;
      health?: string;
    };
  };
};

/**
 * Helper to get localized value based on language
 */
export function getLocalized<T>(
  localized: Localized<T>,
  lang: Lang
): T {
  return localized[lang];
}

