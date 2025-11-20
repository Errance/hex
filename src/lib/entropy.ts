// src/lib/entropy.ts

/**
 * Entropy sources and mixing utilities
 */

/**
 * Calculate Heavenly Stems and Earthly Branches (天干地支)
 * Traditional Chinese calendar system used in I Ching
 */
export function calculateStemsBranches(date: Date = new Date()): string {
  const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

  // Calculate year stems and branches (since 1900)
  const year = date.getFullYear();
  const yearOffset = (year - 1900) % 60;
  const yearStem = heavenlyStems[yearOffset % 10];
  const yearBranch = earthlyBranches[yearOffset % 12];
  const zodiac = zodiacAnimals[yearOffset % 12];

  // Calculate month branches
  const month = date.getMonth() + 1;
  const monthBranch = earthlyBranches[(month + 1) % 12];

  // Calculate day
  const day = date.getDate();

  // Calculate hour (时辰) - each covers 2 hours
  const hour = date.getHours();
  const hourBranch = earthlyBranches[Math.floor((hour + 1) % 24 / 2)];

  return `${yearStem}${yearBranch}年(${zodiac})${monthBranch}月${day}日${hourBranch}时`;
}

/**
 * Get browser fingerprint
 * Collects various browser/system characteristics
 */
export function getBrowserFingerprint(): string {
  if (typeof window === 'undefined') {
    return 'server-side';
  }

  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    languages: navigator.languages?.join(',') || '',
    platform: navigator.platform,
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: (navigator as any).deviceMemory || 0,
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  };

  return JSON.stringify(fingerprint);
}

/**
 * Mix multiple entropy sources using SHA-256
 * Returns a random number between 0 and 1
 */
export async function mixEntropy(sources: Record<string, any>): Promise<number> {
  // Convert sources to string
  const entropyString = JSON.stringify(sources, null, 0);
  
  // Hash with SHA-256
  const encoder = new TextEncoder();
  const data = encoder.encode(entropyString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert to number between 0 and 1
  const hashArray = new Uint8Array(hashBuffer);
  const dataView = new DataView(hashArray.buffer);
  const randomInt = dataView.getUint32(0, false); // Big-endian
  
  return randomInt / 0xFFFFFFFF; // Normalize to [0, 1)
}

/**
 * Generate multiple random numbers from mixed entropy
 * Each call uses a different nonce to ensure independence
 */
export async function generateRandomSequence(
  baseEntropy: Record<string, any>,
  count: number
): Promise<number[]> {
  const results: number[] = [];
  
  for (let i = 0; i < count; i++) {
    const entropy = {
      ...baseEntropy,
      nonce: i,
      timestamp: performance.now(), // High-precision timestamp changes each iteration
    };
    const randomValue = await mixEntropy(entropy);
    results.push(randomValue);
  }
  
  return results;
}

/**
 * Convert random number [0, 1) to coin value (2 or 3)
 */
export function randomToCoinValue(random: number): 2 | 3 {
  return random < 0.5 ? 2 : 3;
}

