#!/usr/bin/env tsx
/**
 * 验证所有文件引用和映射的一致性
 */

import * as fs from 'fs';
import * as path from 'path';
import { HEXAGRAM_META } from '../src/content/hexagrams/meta';

const ALL_DIR = path.join(__dirname, '..', 'src/content/hexagrams/all');
const LOADER_FILE = path.join(__dirname, '..', 'src/content/hexagrams/loader.ts');

async function main() {
  console.log('🔍 开始验证文件引用和映射...\n');

  let errors = 0;
  let warnings = 0;

  // 1. 验证所有文件是否存在
  console.log('📁 检查1: 验证物理文件是否存在');
  for (const meta of HEXAGRAM_META) {
    const fileName = `${meta.slug}.ts`;
    const filePath = path.join(ALL_DIR, fileName);
    
    if (!fs.existsSync(filePath)) {
      console.error(`  ❌ 文件不存在: ${fileName} (ID: ${meta.id}, ${meta.nameZh})`);
      errors++;
    }
  }
  
  if (errors === 0) {
    console.log(`  ✅ 所有 ${HEXAGRAM_META.length} 个文件都存在\n`);
  } else {
    console.log(`  ❌ 发现 ${errors} 个缺失文件\n`);
  }

  // 2. 验证 loader.ts 中的映射
  console.log('📝 检查2: 验证 loader.ts 映射');
  const loaderContent = fs.readFileSync(LOADER_FILE, 'utf-8');
  
  for (const meta of HEXAGRAM_META) {
    const expectedImport = `${meta.id}: () => import('./all/${meta.slug}')`;
    
    if (!loaderContent.includes(expectedImport)) {
      console.error(`  ❌ Loader映射错误: ID ${meta.id} (${meta.nameZh})`);
      console.error(`     期望: ${expectedImport}`);
      errors++;
    }
  }
  
  if (errors === 0) {
    console.log(`  ✅ Loader映射完全正确\n`);
  } else {
    console.log(`  ❌ 发现 ${errors} 个映射错误\n`);
  }

  // 3. 检查是否有孤立文件（存在但未在meta中）
  console.log('🗂️  检查3: 检查孤立文件');
  const actualFiles = fs.readdirSync(ALL_DIR).filter(f => f.endsWith('.ts'));
  const metaSlugs = new Set(HEXAGRAM_META.map(m => `${m.slug}.ts`));
  
  for (const file of actualFiles) {
    if (!metaSlugs.has(file)) {
      console.warn(`  ⚠️  孤立文件（未在meta中）: ${file}`);
      warnings++;
    }
  }
  
  if (warnings === 0) {
    console.log(`  ✅ 没有孤立文件\n`);
  } else {
    console.log(`  ⚠️  发现 ${warnings} 个孤立文件\n`);
  }

  // 4. 验证文件内容的ID是否匹配
  console.log('🔢 检查4: 验证文件内容的ID');
  let contentErrors = 0;
  
  for (const meta of HEXAGRAM_META) {
    const fileName = `${meta.slug}.ts`;
    const filePath = path.join(ALL_DIR, fileName);
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // 检查文件中的 "id": X 是否匹配
      const idMatch = content.match(/"id":\s*(\d+)/);
      if (idMatch) {
        const fileId = parseInt(idMatch[1]);
        if (fileId !== meta.id) {
          console.error(`  ❌ ID不匹配: ${fileName} (文件中=${fileId}, meta中=${meta.id})`);
          contentErrors++;
        }
      } else {
        console.error(`  ❌ 无法读取ID: ${fileName}`);
        contentErrors++;
      }
    }
  }
  
  if (contentErrors === 0) {
    console.log(`  ✅ 所有文件ID匹配\n`);
  } else {
    console.log(`  ❌ 发现 ${contentErrors} 个ID不匹配\n`);
    errors += contentErrors;
  }

  // 5. 检查重名问题
  console.log('🔤 检查5: 检查重名问题');
  const slugCount = new Map<string, number[]>();
  
  for (const meta of HEXAGRAM_META) {
    if (!slugCount.has(meta.slug)) {
      slugCount.set(meta.slug, []);
    }
    slugCount.get(meta.slug)!.push(meta.id);
  }
  
  let duplicates = 0;
  for (const [slug, ids] of slugCount.entries()) {
    if (ids.length > 1) {
      console.error(`  ❌ 重名slug: ${slug} 被以下ID使用: ${ids.join(', ')}`);
      duplicates++;
    }
  }
  
  if (duplicates === 0) {
    console.log(`  ✅ 没有重名问题\n`);
  } else {
    console.log(`  ❌ 发现 ${duplicates} 个重名slug\n`);
    errors += duplicates;
  }

  // 总结
  console.log('='.repeat(60));
  if (errors === 0 && warnings === 0) {
    console.log('✨ 所有检查通过！文件引用和映射完全正确！');
  } else {
    console.log(`⚠️  发现 ${errors} 个错误和 ${warnings} 个警告`);
    if (errors > 0) {
      console.log('❌ 需要修复错误才能正常使用');
      process.exit(1);
    }
  }
  console.log('='.repeat(60));
}

main().catch(error => {
  console.error('❌ 验证过程出错:', error);
  process.exit(1);
});

