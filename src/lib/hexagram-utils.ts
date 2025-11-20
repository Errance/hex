// src/lib/hexagram-utils.ts

import type { HexagramBase, HexagramInitialSummary } from "@/types/hexagram";
import type { LineCast } from "@/types/divination";
import { hexagrams } from "@/data/hexagrams";
import { hexagramSummaries } from "@/data/hexagram-summaries";

/**
 * Get hexagram data by ID
 */
export function getHexagramById(id: number): HexagramBase | undefined {
  return hexagrams.find((h) => h.id === id);
}

/**
 * Get hexagram initial summary by ID
 */
export function getHexagramSummary(
  id: number
): HexagramInitialSummary | undefined {
  return hexagramSummaries.find((s) => s.hexagramId === id);
}

/**
 * Get moving lines with their text
 */
export function getMovingLinesWithText(
  lines: LineCast[],
  hexagram: HexagramBase
): Array<{ index: number; text: string; original?: string }> {
  return lines
    .filter((line) => line.isMoving)
    .map((line) => {
      const lineText = hexagram.lines.find((l) => l.index === line.index);
      return {
        index: line.index,
        text: lineText?.text || "",
        original: lineText?.original,
      };
    });
}

