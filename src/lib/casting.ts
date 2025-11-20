// src/lib/casting.ts

import type { CoinValue, LineCast, LineType } from "@/types/divination";

/**
 * Roll 3 coins: 2 = tails, 3 = heads
 * Standard three-coin method
 */
export function rollCoins(): [CoinValue, CoinValue, CoinValue] {
  const roll = (): CoinValue => (Math.random() < 0.5 ? 2 : 3);
  return [roll(), roll(), roll()];
}

/**
 * Calculate line type and moving status from coin sum
 * 6 = old yin (moving) → becomes yang
 * 7 = young yang (static)
 * 8 = young yin (static)
 * 9 = old yang (moving) → becomes yin
 */
export function calculateLine(
  index: 1 | 2 | 3 | 4 | 5 | 6,
  coins: [CoinValue, CoinValue, CoinValue]
): LineCast {
  const sum = (coins[0] + coins[1] + coins[2]) as 6 | 7 | 8 | 9;
  
  let lineType: LineType;
  let isMoving: boolean;

  switch (sum) {
    case 6:
      lineType = "yin";
      isMoving = true;
      break;
    case 7:
      lineType = "yang";
      isMoving = false;
      break;
    case 8:
      lineType = "yin";
      isMoving = false;
      break;
    case 9:
      lineType = "yang";
      isMoving = true;
      break;
  }

  return {
    index,
    coins,
    sum,
    lineType,
    isMoving,
  };
}

/**
 * Convert 6 lines to hexagram ID (1-64)
 * Lines are ordered from bottom (1) to top (6)
 * Lower trigram = lines 1-3, Upper trigram = lines 4-6
 */
export function linesToHexagramId(lines: LineCast[]): number {
  // Sort lines from bottom to top
  const sortedLines = [...lines].sort((a, b) => a.index - b.index);
  
  // Convert to binary string: yang=1, yin=0
  const binary = sortedLines
    .map((line) => (line.lineType === "yang" ? "1" : "0"))
    .join("");

  // Map binary to King Wen sequence (1-64)
  // This is the traditional I Ching ordering
  const kingWenMap: Record<string, number> = {
    "111111": 1,  // ䷀ Qián (Heaven)
    "000000": 2,  // ䷁ Kūn (Earth)
    "010001": 3,  // ䷂ Zhūn (Difficulty at Beginning)
    "100010": 4,  // ䷃ Mēng (Youthful Folly)
    "010111": 5,  // ䷄ Xū (Waiting)
    "111010": 6,  // ䷅ Sòng (Conflict)
    "000010": 7,  // ䷆ Shī (Army)
    "010000": 8,  // ䷇ Bǐ (Holding Together)
    "110111": 9,  // ䷈ Xiǎo Chù (Small Taming)
    "111011": 10, // ䷉ Lǚ (Treading)
    "000111": 11, // ䷊ Tài (Peace)
    "111000": 12, // ䷋ Pǐ (Standstill)
    "111101": 13, // ䷌ Tóng Rén (Fellowship)
    "101111": 14, // ䷍ Dà Yǒu (Great Possession)
    "000100": 15, // ䷎ Qiān (Modesty)
    "001000": 16, // ䷏ Yù (Enthusiasm)
    "011001": 17, // ䷐ Suí (Following)
    "100110": 18, // ䷑ Gǔ (Work on the Decayed)
    "000011": 19, // ䷒ Lín (Approach)
    "110000": 20, // ䷓ Guān (Contemplation)
    "101001": 21, // ䷔ Shì Hé (Biting Through)
    "100101": 22, // ䷕ Bì (Grace)
    "100000": 23, // ䷖ Bō (Splitting Apart)
    "000001": 24, // ䷗ Fù (Return)
    "111001": 25, // ䷘ Wú Wàng (Innocence)
    "100111": 26, // ䷙ Dà Chù (Great Taming)
    "100001": 27, // ䷚ Yí (Nourishment)
    "011110": 28, // ䷛ Dà Guò (Great Exceeding)
    "010010": 29, // ䷜ Kǎn (Abysmal Water)
    "101101": 30, // ䷝ Lí (Clinging Fire)
    "011100": 31, // ䷞ Xián (Influence)
    "001110": 32, // ䷟ Héng (Duration)
    "111100": 33, // ䷠ Dùn (Retreat)
    "001111": 34, // ䷡ Dà Zhuàng (Great Power)
    "101000": 35, // ䷢ Jìn (Progress)
    "000101": 36, // ䷣ Míng Yí (Darkening of Light)
    "110101": 37, // ䷤ Jiā Rén (Family)
    "101011": 38, // ䷥ Kuí (Opposition)
    "010100": 39, // ䷦ Jiǎn (Obstruction)
    "001010": 40, // ䷧ Xiè (Deliverance)
    "100011": 41, // ䷨ Sǔn (Decrease)
    "110001": 42, // ䷩ Yì (Increase)
    "011111": 43, // ䷪ Guài (Breakthrough)
    "111110": 44, // ䷫ Gòu (Coming to Meet)
    "011000": 45, // ䷬ Cuì (Gathering Together)
    "000110": 46, // ䷭ Shēng (Pushing Upward)
    "011010": 47, // ䷮ Kùn (Oppression)
    "010110": 48, // ䷯ Jǐng (The Well)
    "011101": 49, // ䷰ Gé (Revolution)
    "101110": 50, // ䷱ Dǐng (The Cauldron)
    "001001": 51, // ䷲ Zhèn (Arousing Thunder)
    "100100": 52, // ䷳ Gèn (Keeping Still)
    "110100": 53, // ䷴ Jiàn (Development)
    "001011": 54, // ䷵ Guī Mèi (Marrying Maiden)
    "001101": 55, // ䷶ Fēng (Abundance)
    "101100": 56, // ䷷ Lǚ (The Wanderer)
    "110110": 57, // ䷸ Xùn (Gentle Wind)
    "011011": 58, // ䷹ Duì (Joyous Lake)
    "110010": 59, // ䷺ Huàn (Dispersion)
    "010011": 60, // ䷻ Jié (Limitation)
    "110011": 61, // ䷼ Zhōng Fú (Inner Truth)
    "001100": 62, // ䷽ Xiǎo Guò (Small Exceeding)
    "010101": 63, // ䷾ Jì Jì (After Completion)
    "101010": 64, // ䷿ Wèi Jì (Before Completion)
  };

  return kingWenMap[binary] || 1; // Default to Qián if not found
}

/**
 * Calculate changing hexagram based on moving lines
 * Moving lines change: yin→yang, yang→yin
 */
export function calculateChangingHexagram(lines: LineCast[]): number | null {
  const hasMovingLines = lines.some((line) => line.isMoving);
  if (!hasMovingLines) return null;

  // Create transformed lines
  const transformedLines = lines.map((line) => ({
    ...line,
    lineType: line.isMoving
      ? line.lineType === "yang"
        ? ("yin" as LineType)
        : ("yang" as LineType)
      : line.lineType,
  }));

  return linesToHexagramId(transformedLines);
}

/**
 * Get moving line indices
 */
export function getMovingLineIndices(lines: LineCast[]): number[] {
  return lines.filter((line) => line.isMoving).map((line) => line.index);
}

