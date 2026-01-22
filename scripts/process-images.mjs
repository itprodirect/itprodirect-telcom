/**
 * Image Processing Script
 * - Strips EXIF metadata
 * - Resizes to max 1200x1200 (preserving aspect ratio)
 * - Converts to optimized JPEG
 * - Organizes into product folders
 */

import sharp from 'sharp';
import { readdir, mkdir, rename } from 'fs/promises';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

// Image mapping: original filename -> { product SKU, output name }
const IMAGE_MAP = {
  // Meraki PoE Injector (MA-INJ-4)
  'IMG_79BA10F1-A7D8-45A1-BCED-F10DA1F0AEA8.JPEG': { sku: 'MA-INJ-4', name: 'main.jpg' },
  'IMG_B193986D-E696-45E9-896E-E8FC2CDCFEEA.JPEG': { sku: 'MA-INJ-4', name: 'label.jpg' },

  // PowerBeam AC Gen2 (PBE-5AC-Gen2-US)
  'IMG_EC61B9A1-CE91-4733-85FC-2BB1AF667415.JPEG': { sku: 'PBE-5AC-Gen2-US', name: 'main.jpg' },
  'IMG_35ACBBB9-AF01-499C-828C-2904AFA387FE.JPEG': { sku: 'PBE-5AC-Gen2-US', name: 'label.jpg' },
  'IMG_900AE9AE-EAD0-487C-86E5-DB464CB6AD93.JPEG': { sku: 'PBE-5AC-Gen2-US', name: 'back.jpg' },

  // airMAX Sector (AM-5G20-90) - Note: SKU is uppercase
  'IMG_F5A4B47F-61E8-4EE6-B065-52639BA4FD3A.JPEG': { sku: 'AM-5G20-90', name: 'main.jpg' },
  'IMG_C056CFD8-3BB7-42C9-9AFF-F30ACAA377D5.JPEG': { sku: 'AM-5G20-90', name: 'box.jpg' },
  'IMG_5A14B6CA-59E6-490C-9C92-D14982300545.JPEG': { sku: 'AM-5G20-90', name: 'unit.jpg' },

  // RocketM5 (RocketM5-US)
  'IMG_0C933A40-B67A-41D6-A3CD-108ED6436081.JPEG': { sku: 'RocketM5-US', name: 'main.jpg' },
  'IMG_B617DFA3-220F-414B-B3A7-BF1651DD6060.JPEG': { sku: 'RocketM5-US', name: 'carton.jpg' },
  'IMG_55353E29-0AAA-480E-A96D-8EF4E8709B3D.JPEG': { sku: 'RocketM5-US', name: 'boxes.jpg' },
  'IMG_C02E1B79-98BD-4820-89D4-EBCC5A597FCA.JPEG': { sku: 'RocketM5-US', name: 'bulk.jpg' },

  // Rocket Prism 5AC Gen2 (RP-5AC-Gen2-US)
  'IMG_961FEADA-3227-4175-BABA-3BB178BA7E3D.JPEG': { sku: 'RP-5AC-Gen2-US', name: 'main.jpg' },
  'IMG_BBD55BDF-995F-43B7-9484-AE6AB4352C4E.JPEG': { sku: 'RP-5AC-Gen2-US', name: 'label.jpg' },
  'IMG_358610AD-9A93-4CEC-8985-3CA04CD38BCB.JPEG': { sku: 'RP-5AC-Gen2-US', name: 'boxes.jpg' },
  'IMG_D19D628D-2AF6-4303-A559-5E19595C41EE.JPEG': { sku: 'RP-5AC-Gen2-US', name: 'front.jpg' },
  'IMG_3C1BFA6B-C94C-49B3-B303-5EC88B25ACCF.JPEG': { sku: 'RP-5AC-Gen2-US', name: 'side.jpg' },
  'IMG_F3E569FD-1E19-45D5-AD07-47255F4608C6.JPEG': { sku: 'RP-5AC-Gen2-US', name: 'inventory.jpg' },
};

// Sensitive images to move
const SENSITIVE_IMAGES = [
  'IMG_AFD416BC-A1FF-4838-A93F-F777E5B85A7B.JPEG', // Has address
  'IMG_3EDCB5FA-4711-418F-B3E5-664878CB4934.JPEG', // Has person
];

async function processImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 85,
        mozjpeg: true,
      })
      .toFile(outputPath);

    console.log(`✓ Processed: ${basename(inputPath)} -> ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed: ${basename(inputPath)} - ${error.message}`);
    return false;
  }
}

async function main() {
  const sourceDir = join(ROOT, 'assets', 'original');
  const outputBase = join(ROOT, 'public', 'images', 'products');
  const sensitiveDir = join(ROOT, 'assets', 'sensitive');

  console.log('Starting image processing...\n');

  // Ensure directories exist
  for (const sku of ['RocketM5-US', 'RP-5AC-Gen2-US', 'AM-5G20-90', 'PBE-5AC-Gen2-US', 'MA-INJ-4']) {
    await mkdir(join(outputBase, sku), { recursive: true });
  }
  await mkdir(sensitiveDir, { recursive: true });

  // Move sensitive images
  console.log('Moving sensitive images...');
  for (const filename of SENSITIVE_IMAGES) {
    const src = join(sourceDir, filename);
    const dest = join(sensitiveDir, filename);
    try {
      await rename(src, dest);
      console.log(`✓ Moved to sensitive: ${filename}`);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`✗ Failed to move: ${filename} - ${error.message}`);
      }
    }
  }

  // Process product images
  console.log('\nProcessing product images...');
  let processed = 0;
  let failed = 0;

  for (const [filename, { sku, name }] of Object.entries(IMAGE_MAP)) {
    const inputPath = join(sourceDir, filename);
    const outputPath = join(outputBase, sku, name);

    const success = await processImage(inputPath, outputPath);
    if (success) {
      processed++;
    } else {
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Processing complete!`);
  console.log(`  Processed: ${processed}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Sensitive moved: ${SENSITIVE_IMAGES.length}`);
  console.log(`========================================\n`);
}

main().catch(console.error);
