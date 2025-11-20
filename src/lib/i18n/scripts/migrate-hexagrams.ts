#!/usr/bin/env tsx
// Migrate hexagrams from old i18n structure to new bilingual content structure

import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.join(__dirname, '../../..');
const OLD_EN_HEXAGRAMS = path.join(ROOT_DIR, 'lib/i18n/locales/en/hexagrams.json');
const OLD_ZH_HEXAGRAMS = path.join(ROOT_DIR, 'lib/i18n/locales/zh/hexagrams.json');
const OLD_EN_SUMMARIES = path.join(ROOT_DIR, 'lib/i18n/locales/en/summaries.json');
const OLD_ZH_SUMMARIES = path.join(ROOT_DIR, 'lib/i18n/locales/zh/summaries.json');
const OUTPUT_FILE = path.join(ROOT_DIR, 'content/hexagrams.ts');

type OldHexagram = {
  id: number;
  name: string;
  nameZh: string;
  descriptionShort: string;
  trigramUpper: string;
  trigramLower: string;
  symbolUpper: string;
  symbolLower: string;
  judgement: string;
  imageText: string;
  lines: Array<{
    index: number;
    text: string;
    original?: string;
  }>;
};

type OldSummary = {
  hexagramId: number;
  general: {
    summary: string;
    tone: string;
  };
  scenes?: {
    love?: string;
    career?: string;
    wealth?: string;
    health?: string;
  };
};

function getPinyin(nameZh: string): string {
  const pinyinMap: Record<string, string> = {
    '乾': 'Qián', '坤': 'Kūn', '屯': 'Zhūn', '蒙': 'Méng', '需': 'Xū', '讼': 'Sòng',
    '师': 'Shī', '比': 'Bǐ', '小畜': 'Xiǎo Chù', '履': 'Lǚ', '泰': 'Tài', '否': 'Pǐ',
    '同人': 'Tóng Rén', '大有': 'Dà Yǒu', '谦': 'Qiān', '豫': 'Yù', '随': 'Suí', '蛊': 'Gǔ',
    '临': 'Lín', '观': 'Guān', '噬嗑': 'Shì Hé', '贲': 'Bì', '剥': 'Bō', '复': 'Fù',
    '无妄': 'Wú Wàng', '大畜': 'Dà Chù', '颐': 'Yí', '大过': 'Dà Guò', '坎': 'Kǎn', '离': 'Lí',
    '咸': 'Xián', '恒': 'Héng', '遁': 'Dùn', '大壮': 'Dà Zhuàng', '晋': 'Jìn', '明夷': 'Míng Yí',
    '家人': 'Jiā Rén', '睽': 'Kuí', '蹇': 'Jiǎn', '解': 'Xiè', '损': 'Sǔn', '益': 'Yì',
    '夬': 'Guài', '姤': 'Gòu', '萃': 'Cuì', '升': 'Shēng', '困': 'Kùn', '井': 'Jǐng',
    '革': 'Gé', '鼎': 'Dǐng', '震': 'Zhèn', '艮': 'Gèn', '渐': 'Jiàn', '归妹': 'Guī Mèi',
    '丰': 'Fēng', '旅': 'Lǚ', '巽': 'Xùn', '兑': 'Duì', '涣': 'Huàn', '节': 'Jié',
    '中孚': 'Zhōng Fú', '小过': 'Xiǎo Guò', '既济': 'Jì Jì', '未济': 'Wèi Jì'
  };
  return pinyinMap[nameZh] || nameZh;
}

function escapeString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

async function migrate() {
  console.log('📖 Reading old hexagram data...');
  
  const enData = JSON.parse(fs.readFileSync(OLD_EN_HEXAGRAMS, 'utf-8'));
  const zhData = JSON.parse(fs.readFileSync(OLD_ZH_HEXAGRAMS, 'utf-8'));
  const enSummaries = JSON.parse(fs.readFileSync(OLD_EN_SUMMARIES, 'utf-8'));
  const zhSummaries = JSON.parse(fs.readFileSync(OLD_ZH_SUMMARIES, 'utf-8'));
  
  const enHexagrams: OldHexagram[] = enData.hexagrams;
  const zhHexagrams: OldHexagram[] = zhData.hexagrams;
  const enSummaryMap = new Map<number, OldSummary>();
  const zhSummaryMap = new Map<number, OldSummary>();
  
  enSummaries.summaries.forEach((s: OldSummary) => enSummaryMap.set(s.hexagramId, s));
  zhSummaries.summaries.forEach((s: OldSummary) => zhSummaryMap.set(s.hexagramId, s));
  
  console.log(`✅ Loaded ${enHexagrams.length} hexagrams`);
  
  // Generate TypeScript content
  let output = `// Bilingual I Ching hexagram content
// This is knowledge base, not i18n translations
// Auto-generated from old i18n data

import type { HexagramContent } from './types';

export const hexagramContents: HexagramContent[] = [\n`;
  
  for (let i = 0; i < enHexagrams.length; i++) {
    const enHex = enHexagrams[i];
    const zhHex = zhHexagrams[i];
    let enSum = enSummaryMap.get(enHex.id);
    let zhSum = zhSummaryMap.get(zhHex.id);
    
    if (!enHex || !zhHex) {
      console.warn(`⚠️  Missing hexagram data for ${i + 1}`);
      continue;
    }
    
    // Generate default summaries if missing
    if (!enSum) {
      enSum = {
        hexagramId: enHex.id,
        general: {
          summary: enHex.descriptionShort,
          tone: "neutral"
        },
        scenes: {}
      };
    }
    
    if (!zhSum) {
      zhSum = {
        hexagramId: zhHex.id,
        general: {
          summary: zhHex.descriptionShort,
          tone: "neutral"
        },
        scenes: {}
      };
    }
    
    const pinyin = getPinyin(zhHex.nameZh);
    
    output += `  {\n`;
    output += `    id: ${enHex.id},\n`;
    output += `    name: {\n`;
    output += `      en: "${escapeString(enHex.name)}",\n`;
    output += `      zh: "${escapeString(zhHex.name)}"\n`;
    output += `    },\n`;
    output += `    nameZh: "${escapeString(enHex.nameZh)}",\n`;
    output += `    namePinyin: "${pinyin}",\n`;
    output += `    descriptionShort: {\n`;
    output += `      en: "${escapeString(enHex.descriptionShort)}",\n`;
    output += `      zh: "${escapeString(zhHex.descriptionShort)}"\n`;
    output += `    },\n`;
    output += `    judgement: {\n`;
    output += `      en: "${escapeString(enHex.judgement)}",\n`;
    output += `      zh: "${escapeString(zhHex.judgement)}"\n`;
    output += `    },\n`;
    output += `    imageText: {\n`;
    output += `      en: "${escapeString(enHex.imageText)}",\n`;
    output += `      zh: "${escapeString(zhHex.imageText)}"\n`;
    output += `    },\n`;
    output += `    lines: [\n`;
    
    for (let j = 0; j < enHex.lines.length; j++) {
      const enLine = enHex.lines[j];
      const zhLine = zhHex.lines[j];
      
      output += `      {\n`;
      output += `        index: ${enLine.index} as 1 | 2 | 3 | 4 | 5 | 6,\n`;
      output += `        text: {\n`;
      output += `          en: "${escapeString(enLine.text)}",\n`;
      output += `          zh: "${escapeString(zhLine.text)}"\n`;
      output += `        }`;
      if (enLine.original) {
        output += `,\n        original: "${escapeString(enLine.original)}"`;
      }
      output += `\n      }`;
      if (j < enHex.lines.length - 1) output += ',';
      output += `\n`;
    }
    
    output += `    ],\n`;
    output += `    initialSummary: {\n`;
    output += `      general: {\n`;
    output += `        en: "${escapeString(enSum.general.summary)}",\n`;
    output += `        zh: "${escapeString(zhSum.general.summary)}"\n`;
    output += `      },\n`;
    output += `      tone: "${enSum.general.tone}" as "very_favorable" | "favorable" | "neutral" | "challenging"`;
    
    if (enSum.scenes || zhSum.scenes) {
      output += `,\n      scenes: {\n`;
      
      if (enSum.scenes?.career || zhSum.scenes?.career) {
        output += `        career: {\n`;
        output += `          en: "${escapeString(enSum.scenes?.career || '')}",\n`;
        output += `          zh: "${escapeString(zhSum.scenes?.career || '')}"\n`;
        output += `        }`;
        if (enSum.scenes?.love || zhSum.scenes?.love || enSum.scenes?.wealth || zhSum.scenes?.wealth) {
          output += ',';
        }
        output += `\n`;
      }
      
      if (enSum.scenes?.love || zhSum.scenes?.love) {
        output += `        love: {\n`;
        output += `          en: "${escapeString(enSum.scenes?.love || '')}",\n`;
        output += `          zh: "${escapeString(zhSum.scenes?.love || '')}"\n`;
        output += `        }`;
        if (enSum.scenes?.wealth || zhSum.scenes?.wealth) {
          output += ',';
        }
        output += `\n`;
      }
      
      if (enSum.scenes?.wealth || zhSum.scenes?.wealth) {
        output += `        wealth: {\n`;
        output += `          en: "${escapeString(enSum.scenes?.wealth || '')}",\n`;
        output += `          zh: "${escapeString(zhSum.scenes?.wealth || '')}"\n`;
        output += `        }\n`;
      }
      
      output += `      }`;
    }
    
    output += `\n    }\n`;
    output += `  }`;
    
    if (i < enHexagrams.length - 1) output += ',';
    output += `\n`;
  }
  
  output += `];\n\n`;
  output += `/**
 * Get hexagram by ID
 */
export function getHexagramById(id: number): HexagramContent | undefined {
  return hexagramContents.find(h => h.id === id);
}

/**
 * Get all hexagrams
 */
export function getAllHexagrams(): HexagramContent[] {
  return hexagramContents;
}
`;
  
  // Write output
  console.log('📝 Writing new hexagrams.ts...');
  fs.writeFileSync(OUTPUT_FILE, output);
  
  console.log(`\n🎉 Migration complete!`);
  console.log(`  ✅ Generated ${enHexagrams.length} hexagrams`);
  console.log(`  ✅ Output: ${OUTPUT_FILE}`);
}

// Run
try {
  migrate();
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}

