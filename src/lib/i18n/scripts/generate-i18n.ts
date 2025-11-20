#!/usr/bin/env tsx
// Generate i18n JSON files and TypeScript types from translations.csv

import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const ROOT_DIR = path.join(__dirname, '..');
const CSV_PATH = path.join(ROOT_DIR, 'translations.csv');
const GENERATED_DIR = path.join(ROOT_DIR, 'generated');

type TranslationRow = {
  key: string;
  en: string;
  zh: string;
  context?: string;
  category?: string;
};

/**
 * Set nested value in object using dot notation
 */
function setNestedValue(obj: any, keyPath: string, value: string) {
  const keys = keyPath.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
}

/**
 * Main generate function
 */
function generate() {
  console.log('📖 Reading translations.csv...');
  
  // Read and parse CSV
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const { data, errors } = Papa.parse<TranslationRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
  });
  
  if (errors.length > 0) {
    console.error('❌ CSV parsing errors:', errors);
    process.exit(1);
  }
  
  console.log(`✅ Parsed ${data.length} translation keys`);
  
  // Build translation objects
  const en: any = {};
  const zh: any = {};
  const keys: string[] = [];
  
  data.forEach((row) => {
    if (!row.key || !row.en || !row.zh) {
      console.warn(`⚠️  Skipping incomplete row: ${JSON.stringify(row)}`);
      return;
    }
    
    setNestedValue(en, row.key, row.en);
    setNestedValue(zh, row.key, row.zh);
    keys.push(row.key);
  });
  
  // Ensure generated directory exists
  const enDir = path.join(GENERATED_DIR, 'en');
  const zhDir = path.join(GENERATED_DIR, 'zh');
  
  [GENERATED_DIR, enDir, zhDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Write JSON files
  console.log('📝 Writing JSON files...');
  
  fs.writeFileSync(
    path.join(enDir, 'common.json'),
    JSON.stringify(en, null, 2) + '\n'
  );
  console.log('  ✅ generated/en/common.json');
  
  fs.writeFileSync(
    path.join(zhDir, 'common.json'),
    JSON.stringify(zh, null, 2) + '\n'
  );
  console.log('  ✅ generated/zh/common.json');
  
  // Generate TypeScript types
  console.log('📝 Generating TypeScript types...');
  
  const typeContent = `// Auto-generated from translations.csv
// Do not edit manually - run 'npm run i18n:generate' to regenerate

export type TranslationKey =
${keys.map(key => `  | '${key}'`).join('\n')};

export type Language = 'en' | 'zh';
`;
  
  fs.writeFileSync(
    path.join(GENERATED_DIR, 'types.ts'),
    typeContent
  );
  console.log('  ✅ generated/types.ts');
  
  console.log(`\n🎉 Generated ${keys.length} translation keys successfully!`);
  console.log(`\n📦 Files created:`);
  console.log(`  - generated/en/common.json (${Object.keys(en).length} root keys)`);
  console.log(`  - generated/zh/common.json (${Object.keys(zh).length} root keys)`);
  console.log(`  - generated/types.ts (${keys.length} keys)`);
}

// Run
try {
  generate();
} catch (error) {
  console.error('❌ Generation failed:', error);
  process.exit(1);
}

