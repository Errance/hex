// i18n-aware hexagram utilities

import type { HexagramBase, HexagramInitialSummary } from "@/types/hexagram";
import hexagramsEN from "./locales/en/hexagrams.json";
import hexagramsZH from "./locales/zh/hexagrams.json";
import summariesEN from "./locales/en/summaries.json";
import summariesZH from "./locales/zh/summaries.json";

// For backward compatibility, also import the original data
import { hexagrams as hexagramsOriginal } from "@/data/hexagrams";
import { hexagramSummaries as summariesOriginal } from "@/data/hexagram-summaries";

/**
 * Get hexagram data by ID with i18n support
 */
export function getHexagramByIdI18n(
  id: number,
  language: string = "en"
): HexagramBase | undefined {
  // Use JSON translation files for en/zh
  if (language === "zh") {
    const hexagram = hexagramsZH.hexagrams.find((h) => h.id === id);
    if (hexagram) return hexagram as HexagramBase;
  }
  
  if (language === "en") {
    const hexagram = hexagramsEN.hexagrams.find((h) => h.id === id);
    if (hexagram) return hexagram as HexagramBase;
  }

  // Fallback to original data (has all 64 hexagrams)
  return hexagramsOriginal.find((h) => h.id === id);
}

/**
 * Get hexagram initial summary with i18n support
 */
export function getHexagramSummaryI18n(
  id: number,
  language: string = "en"
): HexagramInitialSummary | undefined {
  // Use JSON translation files for en/zh
  if (language === "zh") {
    const summary = summariesZH.summaries.find((s) => s.hexagramId === id);
    if (summary) return summary as HexagramInitialSummary;
  }
  
  if (language === "en") {
    const summary = summariesEN.summaries.find((s) => s.hexagramId === id);
    if (summary) return summary as HexagramInitialSummary;
  }

  // Fallback to original data (has all 64 summaries)
  return summariesOriginal.find((s) => s.hexagramId === id);
}

/**
 * Get all hexagrams for a language
 */
export function getAllHexagramsI18n(language: string = "en"): HexagramBase[] {
  if (language === "zh") {
    // Merge with original data for complete set
    const zhHexagrams = hexagramsZH.hexagrams as HexagramBase[];
    const zhIds = new Set(zhHexagrams.map(h => h.id));
    const remaining = hexagramsOriginal.filter(h => !zhIds.has(h.id));
    return [...zhHexagrams, ...remaining];
  }
  
  if (language === "en") {
    const enHexagrams = hexagramsEN.hexagrams as HexagramBase[];
    const enIds = new Set(enHexagrams.map(h => h.id));
    const remaining = hexagramsOriginal.filter(h => !enIds.has(h.id));
    return [...enHexagrams, ...remaining];
  }

  return hexagramsOriginal;
}

