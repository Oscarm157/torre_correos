/**
 * Script para optimizar imágenes de Torre Correos
 *
 * Instalación:
 * npm install sharp
 *
 * Ejecución:
 * node optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración
const SIZES = [320, 640, 1024, 1920];
const QUALITY = 85;
const INPUT_DIR = 'imagenes';
const OUTPUT_DIR = 'assets/images/gallery';

// Crear directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Imágenes a procesar
const images = [
  'Torre+Correos+-+Facade.webp',
  'torre_correos_ext_01.webp',
  'torre_correos_ext_04.webp',
  'torre_correos_int_01.webp',
  'torre_correos_int_02.webp',
  'torre_correos_int_04.webp',
  'torre_correos_int_06.webp'
];

async function optimizeImage(imageName) {
  const inputPath = path.join(INPUT_DIR, imageName);
  const baseName = path.parse(imageName).name;

  console.log(`\nProcesando: ${imageName}`);

  // Obtener dimensiones originales
  const metadata = await sharp(inputPath).metadata();
  console.log(`  Dimensiones originales: ${metadata.width}x${metadata.height}`);
  console.log(`  Tamaño original: ${(fs.statSync(inputPath).size / 1024 / 1024).toFixed(2)} MB`);

  let totalSaved = 0;

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
    totalSaved += outputSize;

    console.log(`  ✅ Creado ${baseName}-${width}.webp (${(outputSize / 1024).toFixed(2)} KB)`);
  }

  console.log(`  💾 Total para ${baseName}: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);

  return totalSaved;
}

async function main() {
  console.log('🖼️  Optimización de imágenes Torre Correos\n');
  console.log('Configuración:');
  console.log(`  - Tamaños: ${SIZES.join(', ')}px`);
  console.log(`  - Calidad: ${QUALITY}%`);
  console.log(`  - Formato: WebP`);

  let originalTotal = 0;
  let optimizedTotal = 0;

  // Calcular tamaño total original
  for (const img of images) {
    originalTotal += fs.statSync(path.join(INPUT_DIR, img)).size;
  }

  // Procesar cada imagen
  for (const img of images) {
    try {
      optimizedTotal += await optimizeImage(img);
    } catch (error) {
      console.error(`❌ Error procesando ${img}:`, error.message);
    }
  }

  // Resumen final
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN');
  console.log('='.repeat(50));
  console.log(`Tamaño original total: ${(originalTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Tamaño optimizado total: ${(optimizedTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Reducción: ${(((originalTotal - optimizedTotal) / originalTotal) * 100).toFixed(1)}%`);
  console.log(`Ahorro: ${((originalTotal - optimizedTotal) / 1024 / 1024).toFixed(2)} MB`);
  console.log('\n✨ Optimización completada!');
}

main().catch(console.error);
