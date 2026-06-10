/**
 * Convierte y redimensiona imágenes de assets/ a WebP optimizado.
 * Cada imagen tiene un perfil de tamaño máximo según su uso en el diseño.
 * Conserva los originales JPG/PNG como fallback.
 * Uso: node scripts/convert-images.mjs
 */

import sharp from 'sharp';
import { readdirSync, existsSync, statSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'assets');

// Perfiles por imagen: maxWidth/maxHeight (respeta aspect ratio), quality WebP
const profiles = {
  // Hero backgrounds: se muestran full-viewport. Max 2000px (cubre retina 1920)
  'portada-gotas-naturaleza': { maxWidth: 2000, maxHeight: 2000, quality: 80 },
  'cuarzos-atardecer':        { maxWidth: 2000, maxHeight: 2000, quality: 80 },
  'cuarzo-luz-arcoiris':      { maxWidth: 2000, maxHeight: 2000, quality: 80 },
  'cuarzo-cielo':             { maxWidth: 2000, maxHeight: 2000, quality: 80 },
  'diente-leon-luz':          { maxWidth: 2000, maxHeight: 2000, quality: 80 },
  // Imágenes de contenido: máx ~600px display → 1400px para retina
  'tameana-geometria-sagrada':{ maxWidth: 1400, maxHeight: 1400, quality: 82 },
  'july-piramides-giza':      { maxWidth: 1400, maxHeight: 1400, quality: 82 },
  // Mariposa decorativa flotante: ~280px display → 600px para retina
  'mariposa-transformacion':  { maxWidth: 600,  maxHeight: 600,  quality: 80 },
  // Logo SVG-like: se muestra a ~190px alto en footer, ~48px en nav
  'logo-vivir-en-presencia':  { maxWidth: 600,  maxHeight: 600,  quality: 88 },
};

const files = readdirSync(assetsDir).filter(f => {
  const ext = extname(f).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
});

console.log(`\nConvirtiendo ${files.length} imágenes a WebP (con redimensionado)...\n`);

let totalOriginal = 0;
let totalWebP = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  const name = basename(file, ext);
  const src  = join(assetsDir, file);
  const dest = join(assetsDir, name + '.webp');

  const originalSize = statSync(src).size;
  totalOriginal += originalSize;

  const profile = profiles[name] || { maxWidth: 1600, maxHeight: 1600, quality: 82 };
  const meta = await sharp(src).metadata();

  // Eliminar WebP anterior si existe para regenerar con resize
  if (existsSync(dest)) unlinkSync(dest);

  await sharp(src)
    .resize(profile.maxWidth, profile.maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: profile.quality })
    .toFile(dest);

  const webpSize = statSync(dest).size;
  totalWebP += webpSize;
  const savings = Math.round((1 - webpSize / originalSize) * 100);

  // Get final dimensions
  const outMeta = await sharp(dest).metadata();
  console.log(`  ✓ ${file} (${meta.width}×${meta.height}) → ${name}.webp (${outMeta.width}×${outMeta.height})  ${formatBytes(originalSize)} → ${formatBytes(webpSize)}  (-${savings}%)`);
}

const totalSavings = Math.round((1 - totalWebP / totalOriginal) * 100);
console.log(`\nTotal original: ${formatBytes(totalOriginal)}`);
console.log(`Total WebP:     ${formatBytes(totalWebP)}`);
console.log(`Ahorro total:   ${formatBytes(totalOriginal - totalWebP)} (-${totalSavings}%)\n`);

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
