import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');

// Image configurations for optimization
const imageConfigs = [
  // Hero images - full width on desktop, smaller on mobile
  {
    src: 'hero.jpg',
    outputs: [
      { suffix: '', width: 1920, quality: 80, format: 'webp' },
      { suffix: '-mobile', width: 768, quality: 80, format: 'webp' },
      { suffix: '', width: 1920, quality: 85, format: 'jpeg' }, // fallback
    ],
  },
  {
    src: 'hero2.jpg',
    outputs: [
      { suffix: '', width: 1920, quality: 80, format: 'webp' },
      { suffix: '-mobile', width: 768, quality: 80, format: 'webp' },
      { suffix: '', width: 1920, quality: 85, format: 'jpeg' }, // fallback
    ],
  },
  // About image - portrait orientation
  {
    src: 'about.jpg',
    outputs: [
      { suffix: '', width: 1200, quality: 80, format: 'webp' },
      { suffix: '-mobile', width: 600, quality: 80, format: 'webp' },
      { suffix: '', width: 1200, quality: 85, format: 'jpeg' }, // fallback
    ],
  },
  // Logo - smaller file, optimize for quality
  {
    src: 'logo.png',
    outputs: [
      { suffix: '', width: 400, quality: 90, format: 'webp' },
      { suffix: '', width: 400, format: 'png' }, // fallback
    ],
  },
];

async function generateBlurPlaceholder(inputPath) {
  try {
    const buffer = await sharp(inputPath)
      .resize(10, 10, { fit: 'inside' })
      .blur()
      .toBuffer();
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.warn(`Could not generate blur placeholder for ${inputPath}`);
    return null;
  }
}

async function optimizeImage(config) {
  const inputPath = path.join(PUBLIC_DIR, config.src);

  // Check if source file exists
  try {
    await fs.access(inputPath);
  } catch {
    console.warn(`Source file not found: ${inputPath}, skipping...`);
    return;
  }

  const results = [];

  for (const output of config.outputs) {
    const ext = output.format === 'jpeg' ? 'jpg' : output.format;
    const baseName = path.basename(config.src, path.extname(config.src));
    const outputName = `${baseName}${output.suffix}.${ext}`;
    const outputPath = path.join(OPTIMIZED_DIR, outputName);

    try {
      let pipeline = sharp(inputPath).resize(output.width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });

      if (output.format === 'webp') {
        pipeline = pipeline.webp({ quality: output.quality, effort: 6 });
      } else if (output.format === 'jpeg') {
        pipeline = pipeline.jpeg({
          quality: output.quality,
          progressive: true,
          mozjpeg: true,
        });
      } else if (output.format === 'png') {
        pipeline = pipeline.png({ compressionLevel: 9, palette: true });
      }

      const info = await pipeline.toFile(outputPath);
      const originalStats = await fs.stat(inputPath);
      const savings = ((1 - info.size / originalStats.size) * 100).toFixed(1);

      console.log(
        `  ${outputName}: ${(info.size / 1024).toFixed(1)}KB (${savings}% smaller)`
      );
      results.push({ name: outputName, size: info.size });
    } catch (error) {
      console.error(`Error processing ${outputName}:`, error.message);
    }
  }

  return results;
}

async function main() {
  console.log('Starting image optimization...\n');

  // Create optimized directory if it doesn't exist
  await fs.mkdir(OPTIMIZED_DIR, { recursive: true });

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const config of imageConfigs) {
    const inputPath = path.join(PUBLIC_DIR, config.src);

    try {
      const stats = await fs.stat(inputPath);
      totalOriginalSize += stats.size;
      console.log(`Processing ${config.src} (${(stats.size / 1024).toFixed(1)}KB):`);
    } catch {
      console.log(`Skipping ${config.src} (not found)`);
      continue;
    }

    const results = await optimizeImage(config);
    if (results) {
      // Count only the primary outputs (WebP versions) for size comparison
      const webpResults = results.filter((r) => r.name.endsWith('.webp') && !r.name.includes('-mobile'));
      webpResults.forEach((r) => (totalOptimizedSize += r.size));
    }
    console.log('');
  }

  // Generate blur placeholders data file
  console.log('Generating blur placeholders...');
  const blurData = {};
  for (const config of imageConfigs) {
    const inputPath = path.join(PUBLIC_DIR, config.src);
    try {
      await fs.access(inputPath);
      const placeholder = await generateBlurPlaceholder(inputPath);
      if (placeholder) {
        const baseName = path.basename(config.src, path.extname(config.src));
        blurData[baseName] = placeholder;
      }
    } catch {
      // Skip if file doesn't exist
    }
  }

  // Save blur data as JSON
  const blurDataPath = path.join(OPTIMIZED_DIR, 'blur-data.json');
  await fs.writeFile(blurDataPath, JSON.stringify(blurData, null, 2));
  console.log(`Blur placeholders saved to: blur-data.json\n`);

  // Summary
  const savings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
  console.log('='.repeat(50));
  console.log('Optimization Summary:');
  console.log(`  Original total: ${(totalOriginalSize / 1024).toFixed(1)}KB`);
  console.log(`  Optimized total (WebP): ${(totalOptimizedSize / 1024).toFixed(1)}KB`);
  console.log(`  Savings: ${savings}%`);
  console.log('='.repeat(50));
}

main().catch(console.error);
