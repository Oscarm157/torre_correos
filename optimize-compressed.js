/**
 * Script para optimizar las imágenes comprimidas nuevas
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SIZES = [320, 640, 1024, 1920];
const QUALITY = 85;
const INPUT_DIR = 'imagenes';
const OUTPUT_DIR = 'assets/images/gallery';

// Imágenes comprimidas a procesar
const images = [
  'torre_correos_ext_01_comprimido.webp',
  'torre_correos_ext_04_comprimido.webp',
  'torre_correos_int_06_comprimido.webp'
];

// Mapeo de nombres comprimidos a nombres finales
const nameMapping = {
  'torre_correos_ext_01_comprimido.webp': 'torre_correos_ext_01',
  'torre_correos_ext_04_comprimido.webp': 'torre_correos_ext_04',
  'torre_correos_int_06_comprimido.webp': 'torre_correos_int_06'
};

async function optimizeImage(imageName) {
  const inputPath = path.join(INPUT_DIR, imageName);
  const baseName = nameMapping[imageName];

  console.log(`\nProcesando: ${imageName} → ${baseName}`);

  const metadata = await sharp(inputPath).metadata();
  console.log(`  Dimensiones: ${metadata.width}x${metadata.height}`);
  console.log(`  Tamaño: ${(fs.statSync(inputPath).size / 1024).toFixed(2)} KB`);

  let totalSize = 0;

  // Crear versiones responsive
  for (const width of SIZES) {
    if (width > metadata.width) {
      console.log(`  ⏭️  Saltando ${width}w (mayor que original)`);
      continue;
    }

    const outputPath = path.join(OUTPUT_DIR, `${baseName}-${width}.webp`);

    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputSize = fs.statSync(outputPath).size;
    totalSize += outputSize;

    console.log(`  ✅ ${baseName}-${width}.webp (${(outputSize / 1024).toFixed(2)} KB)`);
  }

  // Copiar original al output con nombre correcto
  const originalOutput = path.join(OUTPUT_DIR, `${baseName}.webp`);
  fs.copyFileSync(inputPath, originalOutput);
  console.log(`  ✅ ${baseName}.webp (original copiado)`);

  console.log(`  💾 Total: ${(totalSize / 1024).toFixed(2)} KB`);
  return totalSize;
}

async function main() {
  console.log('🖼️  Optimización de imágenes comprimidas\n');
  console.log('Configuración:');
  console.log(`  - Tamaños: ${SIZES.join(', ')}px`);
  console.log(`  - Calidad: ${QUALITY}%`);

  let totalSize = 0;

  for (const img of images) {
    try {
      totalSize += await optimizeImage(img);
    } catch (error) {
      console.error(`❌ Error procesando ${img}:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✨ Optimización completada!');
  console.log(`Total generado: ${(totalSize / 1024).toFixed(2)} KB`);
}

main().catch(console.error);
