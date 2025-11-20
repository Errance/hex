// Re-export from new hexagrams module for backward compatibility
// This file is kept for compatibility but should be considered deprecated
// Prefer importing directly from '@/content/hexagrams'

export { getHexagramView, getHexagramContent, preloadHexagram } from './hexagrams';
export type { HexagramView, HexagramContent, Lang } from './hexagrams/types';

// Alias for backward compatibility
export { getHexagramView as getHexagram } from './hexagrams';

