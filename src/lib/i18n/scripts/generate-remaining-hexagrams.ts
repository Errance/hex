#!/usr/bin/env tsx
// Generate remaining 44 hexagrams (21-64) with basic structure

import fs from 'fs';
import path from 'path';
import { HEXAGRAM_TRIGRAMS, TRIGRAMS } from '../../../content/trigrams';

const OUTPUT_FILE = path.join(__dirname, '../../../content/hexagrams-full.ts');

// Hexagram names and basic info for 21-64
const hexagramInfo = [
  { id: 21, nameEn: "Shì Hé", nameZh: "噬嗑", pinyin: "Shì Hé", descEn: "Biting Through", descZh: "咬合突破" },
  { id: 22, nameEn: "Bì", nameZh: "贲", pinyin: "Bì", descEn: "Grace", descZh: "文饰优雅" },
  { id: 23, nameEn: "Bō", nameZh: "剥", pinyin: "Bō", descEn: "Splitting Apart", descZh: "剥落分离" },
  { id: 24, nameEn: "Fù", nameZh: "复", pinyin: "Fù", descEn: "Return", descZh: "复归返回" },
  { id: 25, nameEn: "Wú Wàng", nameZh: "无妄", pinyin: "Wú Wàng", descEn: "Innocence", descZh: "无妄真诚" },
  { id: 26, nameEn: "Dà Chù", nameZh: "大畜", pinyin: "Dà Chù", descEn: "Great Taming", descZh: "大畜积蓄" },
  { id: 27, nameEn: "Yí", nameZh: "颐", pinyin: "Yí", descEn: "Nourishment", descZh: "颐养滋养" },
  { id: 28, nameEn: "Dà Guò", nameZh: "大过", pinyin: "Dà Guò", descEn: "Great Exceeding", descZh: "大过超越" },
  { id: 29, nameEn: "Kǎn", nameZh: "坎", pinyin: "Kǎn", descEn: "The Abysmal Water", descZh: "坎陷危险" },
  { id: 30, nameEn: "Lí", nameZh: "离", pinyin: "Lí", descEn: "The Clinging Fire", descZh: "离附依附" },
  { id: 31, nameEn: "Xián", nameZh: "咸", pinyin: "Xián", descEn: "Influence", descZh: "感应交感" },
  { id: 32, nameEn: "Héng", nameZh: "恒", pinyin: "Héng", descEn: "Duration", descZh: "恒久持续" },
  { id: 33, nameEn: "Dùn", nameZh: "遁", pinyin: "Dùn", descEn: "Retreat", descZh: "遁退隐退" },
  { id: 34, nameEn: "Dà Zhuàng", nameZh: "大壮", pinyin: "Dà Zhuàng", descEn: "Great Power", descZh: "大壮强盛" },
  { id: 35, nameEn: "Jìn", nameZh: "晋", pinyin: "Jìn", descEn: "Progress", descZh: "晋升进步" },
  { id: 36, nameEn: "Míng Yí", nameZh: "明夷", pinyin: "Míng Yí", descEn: "Darkening of Light", descZh: "明夷光明受伤" },
  { id: 37, nameEn: "Jiā Rén", nameZh: "家人", pinyin: "Jiā Rén", descEn: "Family", descZh: "家人家庭" },
  { id: 38, nameEn: "Kuí", nameZh: "睽", pinyin: "Kuí", descEn: "Opposition", descZh: "睽乖背离" },
  { id: 39, nameEn: "Jiǎn", nameZh: "蹇", pinyin: "Jiǎn", descEn: "Obstruction", descZh: "蹇难阻碍" },
  { id: 40, nameEn: "Xiè", nameZh: "解", pinyin: "Xiè", descEn: "Deliverance", descZh: "解脱解除" },
  { id: 41, nameEn: "Sǔn", nameZh: "损", pinyin: "Sǔn", descEn: "Decrease", descZh: "损减损失" },
  { id: 42, nameEn: "Yì", nameZh: "益", pinyin: "Yì", descEn: "Increase", descZh: "益增加增" },
  { id: 43, nameEn: "Guài", nameZh: "夬", pinyin: "Guài", descEn: "Breakthrough", descZh: "夬决突破" },
  { id: 44, nameEn: "Gòu", nameZh: "姤", pinyin: "Gòu", descEn: "Coming to Meet", descZh: "姤遇相遇" },
  { id: 45, nameEn: "Cuì", nameZh: "萃", pinyin: "Cuì", descEn: "Gathering Together", descZh: "萃聚集" },
  { id: 46, nameEn: "Shēng", nameZh: "升", pinyin: "Shēng", descEn: "Pushing Upward", descZh: "升上升" },
  { id: 47, nameEn: "Kùn", nameZh: "困", pinyin: "Kùn", descEn: "Oppression", descZh: "困穷困" },
  { id: 48, nameEn: "Jǐng", nameZh: "井", pinyin: "Jǐng", descEn: "The Well", descZh: "井水井" },
  { id: 49, nameEn: "Gé", nameZh: "革", pinyin: "Gé", descEn: "Revolution", descZh: "革变革" },
  { id: 50, nameEn: "Dǐng", nameZh: "鼎", pinyin: "Dǐng", descEn: "The Cauldron", descZh: "鼎鼎器" },
  { id: 51, nameEn: "Zhèn", nameZh: "震", pinyin: "Zhèn", descEn: "Arousing Thunder", descZh: "震震动" },
  { id: 52, nameEn: "Gèn", nameZh: "艮", pinyin: "Gèn", descEn: "Keeping Still", descZh: "艮止静止" },
  { id: 53, nameEn: "Jiàn", nameZh: "渐", pinyin: "Jiàn", descEn: "Development", descZh: "渐进渐进" },
  { id: 54, nameEn: "Guī Mèi", nameZh: "归妹", pinyin: "Guī Mèi", descEn: "Marrying Maiden", descZh: "归妹出嫁" },
  { id: 55, nameEn: "Fēng", nameZh: "丰", pinyin: "Fēng", descEn: "Abundance", descZh: "丰丰盛" },
  { id: 56, nameEn: "Lǚ", nameZh: "旅", pinyin: "Lǚ", descEn: "The Wanderer", descZh: "旅旅行" },
  { id: 57, nameEn: "Xùn", nameZh: "巽", pinyin: "Xùn", descEn: "Gentle Wind", descZh: "巽顺巽逊" },
  { id: 58, nameEn: "Duì", nameZh: "兑", pinyin: "Duì", descEn: "Joyous Lake", descZh: "兑喜悦" },
  { id: 59, nameEn: "Huàn", nameZh: "涣", pinyin: "Huàn", descEn: "Dispersion", descZh: "涣散涣散" },
  { id: 60, nameEn: "Jié", nameZh: "节", pinyin: "Jié", descEn: "Limitation", descZh: "节制节制" },
  { id: 61, nameEn: "Zhōng Fú", nameZh: "中孚", pinyin: "Zhōng Fú", descEn: "Inner Truth", descZh: "中孚诚信" },
  { id: 62, nameEn: "Xiǎo Guò", nameZh: "小过", pinyin: "Xiǎo Guò", descEn: "Small Exceeding", descZh: "小过小过" },
  { id: 63, nameEn: "Jì Jì", nameZh: "既济", pinyin: "Jì Jì", descEn: "After Completion", descZh: "既济已成" },
  { id: 64, nameEn: "Wèi Jì", nameZh: "未济", pinyin: "Wèi Jì", descEn: "Before Completion", descZh: "未济未成" },
];

function generateHexagram(info: typeof hexagramInfo[0]): string {
  // Get trigram info
  const trigramIds = HEXAGRAM_TRIGRAMS[info.id];
  const upper = TRIGRAMS[trigramIds.upper];
  const lower = TRIGRAMS[trigramIds.lower];

  return `  {
    id: ${info.id},
    name: {
      en: "${info.nameEn}",
      zh: "${info.nameZh}"
    },
    nameZh: "${info.nameZh}",
    namePinyin: "${info.pinyin}",
    descriptionShort: {
      en: "${info.descEn}. (Detailed translation to be added)",
      zh: "${info.descZh}。（详细内容待补充）"
    },
    trigramUpper: {
      en: "${upper.name.en}",
      zh: "${upper.name.zh}"
    },
    trigramLower: {
      en: "${lower.name.en}",
      zh: "${lower.name.zh}"
    },
    symbolUpper: "${upper.symbol}",
    symbolLower: "${lower.symbol}",
    judgement: {
      en: "Judgement text for Hexagram ${info.id} to be added.",
      zh: "第${info.id}卦卦辞待补充。"
    },
    imageText: {
      en: "Image text for Hexagram ${info.id} to be added.",
      zh: "第${info.id}卦象辞待补充。"
    },
    lines: [
      {
        index: 1 as 1 | 2 | 3 | 4 | 5 | 6,
        text: {
          en: "Line 1 text to be added.",
          zh: "初爻爻辞待补充。"
        }
      },
      {
        index: 2 as 1 | 2 | 3 | 4 | 5 | 6,
        text: {
          en: "Line 2 text to be added.",
          zh: "二爻爻辞待补充。"
        }
      },
      {
        index: 3 as 1 | 2 | 3 | 4 | 5 | 6,
        text: {
          en: "Line 3 text to be added.",
          zh: "三爻爻辞待补充。"
        }
      },
      {
        index: 4 as 1 | 2 | 3 | 4 | 5 | 6,
        text: {
          en: "Line 4 text to be added.",
          zh: "四爻爻辞待补充。"
        }
      },
      {
        index: 5 as 1 | 2 | 3 | 4 | 5 | 6,
        text: {
          en: "Line 5 text to be added.",
          zh: "五爻爻辞待补充。"
        }
      },
      {
        index: 6 as 1 | 2 | 3 | 4 | 5 | 6,
        text: {
          en: "Line 6 text to be added.",
          zh: "上爻爻辞待补充。"
        }
      }
    ],
    initialSummary: {
      general: {
        en: "General interpretation for Hexagram ${info.id} to be added.",
        zh: "第${info.id}卦总体解读待补充。"
      },
      tone: "neutral" as "very_favorable" | "favorable" | "neutral" | "challenging"
    }
  }`;
}

async function generate() {
  console.log('📖 Reading existing hexagrams.ts...');
  
  let existingContent = fs.readFileSync(
    path.join(__dirname, '../../../content/hexagrams.ts'), 
    'utf-8'
  );
  
  // Find the closing bracket of the array
  const closingIndex = existingContent.lastIndexOf('];');
  
  if (closingIndex === -1) {
    throw new Error('Could not find closing bracket of hexagramContents array');
  }
  
  // Insert new hexagrams before the closing bracket
  let additionalHexagrams = '';
  
  for (const info of hexagramInfo) {
    additionalHexagrams += `,\n${generateHexagram(info)}\n`;
  }
  
  const newContent = 
    existingContent.slice(0, closingIndex) + 
    additionalHexagrams + 
    existingContent.slice(closingIndex);
  
  console.log('📝 Writing complete hexagrams file...');
  fs.writeFileSync(
    path.join(__dirname, '../../../content/hexagrams.ts'),
    newContent
  );
  
  console.log(`\n🎉 Generation complete!`);
  console.log(`  ✅ Added ${hexagramInfo.length} hexagrams (21-64)`);
  console.log(`  ✅ Total: 64 hexagrams`);
}

// Run
try {
  generate();
} catch (error) {
  console.error('❌ Generation failed:', error);
  process.exit(1);
}
