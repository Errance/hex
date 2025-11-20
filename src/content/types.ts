// Content layer types for I Ching hexagram data
// This is knowledge base, not i18n translations

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
 * Helper to get localized value based on language
 */
export function getLocalized<T>(
  localized: Localized<T>,
  lang: 'en' | 'zh'
): T {
  return localized[lang];
}

