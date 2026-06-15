import sharp from 'sharp';

const SRC = 'Referencias Personales para Página Tameana/Encuentros Imagenes';

const jobs = [
  { in: `${SRC}/IMG_0887.jpg`,     base: 'assets/red-solar-cuarzo-sol', w: 1200 },
  { in: `${SRC}/IMG_8667 (1).JPG`, base: 'assets/luna-nueva-margarita',  w: 1400 },
];

for (const j of jobs) {
  const img = sharp(j.in).rotate().resize({ width: j.w, withoutEnlargement: true });
  await img.clone().webp({ quality: 70 }).toFile(`${j.base}.webp`);
  await img.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${j.base}.jpg`);
  console.log('OK', j.base);
}
