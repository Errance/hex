import { hexagramContents } from './hexagrams';
import type { HexagramView, HexagramContent } from './types';

/**
 * Get a flattened, language-specific view of a hexagram
 */
export function getHexagram(id: number, lang: 'en' | 'zh'): HexagramView | undefined {
  const content = hexagramContents.find(h => h.id === id);
  if (!content) return undefined;
  
  return transformToView(content, lang);
}

/**
 * Transform content to view model
 */
function transformToView(content: HexagramContent, lang: 'en' | 'zh'): HexagramView {
  return {
    id: content.id,
    name: content.name[lang],
    nameZh: content.nameZh,
    namePinyin: content.namePinyin,
    descriptionShort: content.descriptionShort[lang],
    
    trigramUpper: content.trigramUpper[lang],
    trigramLower: content.trigramLower[lang],
    symbolUpper: content.symbolUpper,
    symbolLower: content.symbolLower,
    
    judgement: content.judgement[lang],
    imageText: content.imageText[lang],
    lines: content.lines.map(line => ({
      index: line.index,
      text: line.text[lang],
      original: line.original
    })),
    summary: {
      general: content.initialSummary.general[lang],
      tone: content.initialSummary.tone,
      scenes: content.initialSummary.scenes ? {
        career: content.initialSummary.scenes.career?.[lang],
        love: content.initialSummary.scenes.love?.[lang],
        wealth: content.initialSummary.scenes.wealth?.[lang],
      } : undefined
    }
  };
}

/**
 * Get all hexagrams for a specific language
 */
export function getAllHexagrams(lang: 'en' | 'zh'): HexagramView[] {
  return hexagramContents.map(h => transformToView(h, lang));
}

