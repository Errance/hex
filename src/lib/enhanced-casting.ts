// src/lib/enhanced-casting.ts

import type { CoinValue, ClickEntropyData } from "@/types/divination";
import { 
  calculateStemsBranches, 
  getBrowserFingerprint, 
  mixEntropy,
  randomToCoinValue 
} from "./entropy";

/**
 * Options for enhanced coin rolling
 */
export type EnhancedRollOptions = {
  lineIndex: number;                    // Which line (1-6)
  bitcoinHash: string | null;           // Bitcoin block hash (may be null if API failed)
  clickData?: ClickEntropyData;         // Click data (manual mode only)
};

/**
 * Roll 3 coins with enhanced entropy sources
 * 
 * Entropy sources (in priority order):
 * 1. crypto.getRandomValues() - Cryptographic random (main source)
 * 2. performance.now() - High-precision timestamp
 * 3. Bitcoin block hash - Blockchain data
 * 4. Stems & Branches (天干地支) - Traditional calendar
 * 5. Browser fingerprint - Device characteristics
 * 6. Click data - User interaction (manual mode only)
 */
export async function rollCoinsEnhanced(
  options: EnhancedRollOptions
): Promise<[CoinValue, CoinValue, CoinValue]> {
  const { lineIndex, bitcoinHash, clickData } = options;

  // Collect all entropy sources
  const baseEntropy = {
    // Core random sources
    crypto1: crypto.getRandomValues(new Uint32Array(1))[0],
    crypto2: crypto.getRandomValues(new Uint32Array(1))[0],
    crypto3: crypto.getRandomValues(new Uint32Array(1))[0],
    timestamp: performance.now(),
    
    // Line context
    lineIndex,
    
    // External/environmental sources
    bitcoin: bitcoinHash || 'fallback',
    celestial: calculateStemsBranches(),
    fingerprint: getBrowserFingerprint(),
    
    // User interaction (if available)
    click: clickData || null,
  };

  // Generate 3 random values for 3 coins
  const random1 = await mixEntropy({ ...baseEntropy, coin: 1 });
  const random2 = await mixEntropy({ ...baseEntropy, coin: 2 });
  const random3 = await mixEntropy({ ...baseEntropy, coin: 3 });

  // Convert to coin values
  const coin1 = randomToCoinValue(random1);
  const coin2 = randomToCoinValue(random2);
  const coin3 = randomToCoinValue(random3);

  return [coin1, coin2, coin3];
}

/**
 * Backward compatible wrapper
 * Uses enhanced entropy but with simpler interface
 */
export async function rollCoinsEnhancedSimple(
  lineIndex: number,
  bitcoinHash: string | null
): Promise<[CoinValue, CoinValue, CoinValue]> {
  return rollCoinsEnhanced({ lineIndex, bitcoinHash });
}

