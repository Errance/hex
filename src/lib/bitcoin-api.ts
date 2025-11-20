// src/lib/bitcoin-api.ts

/**
 * Bitcoin API integration for entropy source
 * Fetches latest block hash from multiple sources with race condition
 */

const BITCOIN_API_SOURCES = [
  'https://mempool.space/api/blocks/tip/hash',
  'https://blockchain.info/q/latesthash',
  'https://blockstream.info/api/blocks/tip/hash',
];

const TIMEOUT_MS = 5000; // 5 second timeout

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(url: string, timeoutMs: number): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    return text.trim();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Get latest Bitcoin block hash
 * Uses Promise.race() to get the fastest response from multiple sources
 * Returns null if all sources fail or timeout
 */
export async function getLatestBitcoinBlockHash(): Promise<string | null> {
  try {
    // Race all sources
    const promises = BITCOIN_API_SOURCES.map(url => 
      fetchWithTimeout(url, TIMEOUT_MS)
        .catch(err => {
          console.warn(`Bitcoin API ${url} failed:`, err.message);
          return null;
        })
    );

    // Wait for the first successful response
    const results = await Promise.all(promises);
    
    // Find first non-null result
    const hash = results.find(result => result !== null);
    
    if (hash) {
      console.log('Bitcoin block hash obtained:', hash.substring(0, 8) + '...');
      return hash;
    }

    console.warn('All Bitcoin APIs failed or timed out');
    return null;
  } catch (error) {
    console.error('Unexpected error fetching Bitcoin hash:', error);
    return null;
  }
}

/**
 * Cache for Bitcoin block hash (valid for ~10 minutes)
 */
let cachedHash: { hash: string; timestamp: number } | null = null;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Get Bitcoin block hash with caching
 * Bitcoin blocks are mined ~every 10 minutes, so caching is reasonable
 */
export async function getCachedBitcoinBlockHash(): Promise<string | null> {
  const now = Date.now();
  
  // Return cached hash if still valid
  if (cachedHash && (now - cachedHash.timestamp) < CACHE_DURATION_MS) {
    return cachedHash.hash;
  }

  // Fetch new hash
  const hash = await getLatestBitcoinBlockHash();
  
  if (hash) {
    cachedHash = { hash, timestamp: now };
  }

  return hash;
}

