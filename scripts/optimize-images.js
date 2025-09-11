#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BACKUP_DIR = path.join(PUBLIC_DIR, 'original-images');

// Create backup directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputPath, backupPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    // Create backup
    fs.copyFileSync(inputPath, backupPath);
    
    // Convert to WebP with quality optimization
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   Size: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
    
    // Remove original PNG
    fs.unlinkSync(inputPath);
    
    return { originalSize, newSize, savings: parseFloat(savings) };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function findAndOptimizePNGs(directory) {
  const files = fs.readdirSync(directory);
  const results = [];
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'original-images') {
      // Recursively process subdirectories
      const subResults = await findAndOptimizePNGs(filePath);
      results.push(...subResults);
    } else if (file.toLowerCase().endsWith('.png')) {
      const fileSize = stat.size;
      
      // Only optimize PNGs larger than 100KB
      if (fileSize > 100 * 1024) {
        const outputPath = filePath.replace(/\.png$/i, '.webp');
        const backupPath = path.join(BACKUP_DIR, file);
        
        const result = await optimizeImage(filePath, outputPath, backupPath);
        if (result) {
          results.push(result);
        }
      } else {
        console.log(`⏭️  Skipping ${file} (${(fileSize / 1024).toFixed(1)}KB - too small)`);
      }
    }
  }
  
  return results;
}

async function main() {
  console.log('🖼️  Starting image optimization...');
  console.log(`📁 Processing directory: ${PUBLIC_DIR}`);
  console.log(`💾 Backups will be saved to: ${BACKUP_DIR}`);
  console.log('');
  
  const results = await findAndOptimizePNGs(PUBLIC_DIR);
  
  if (results.length > 0) {
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
    const totalSavings = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);
    
    console.log('');
    console.log('📊 Optimization Summary:');
    console.log(`   Files processed: ${results.length}`);
    console.log(`   Total size before: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Total size after: ${(totalNew / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Total savings: ${totalSavings}%`);
    console.log('');
    console.log('⚠️  Remember to update image references from .png to .webp in your code!');
  } else {
    console.log('ℹ️  No large PNG files found to optimize.');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, findAndOptimizePNGs };
