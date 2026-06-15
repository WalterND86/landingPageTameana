import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fontsDir = path.join(__dirname, '..', 'fonts');
if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir);

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Only Latin subset (U+0000-00FF) covers all Spanish characters
const LATIN_HINT = 'U+0000-00FF';

function fetchText(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

function extractFontFaces(css) {
  const blocks = [];
  const regex = /@font-face\s*\{([^}]+)\}/g;
  let m;
  while ((m = regex.exec(css)) !== null) {
    const block = m[1];
    const unicodeMatch = block.match(/unicode-range:\s*([^;]+)/);
    const srcMatch = block.match(/src:\s*url\(([^)]+\.woff2)\)/);
    const familyMatch = block.match(/font-family:\s*'([^']+)'/);
    const styleMatch = block.match(/font-style:\s*(\w+)/);
    const weightMatch = block.match(/font-weight:\s*([\d\s]+)/);
    if (srcMatch && unicodeMatch && unicodeMatch[1].trim().startsWith('U+0000')) {
      blocks.push({
        family: familyMatch ? familyMatch[1] : '',
        style: styleMatch ? styleMatch[1] : 'normal',
        weight: weightMatch ? weightMatch[1].trim() : '400',
        url: srcMatch[1],
        unicodeRange: unicodeMatch[1].trim(),
      });
    }
  }
  return blocks;
}

const googleFontsUrl = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500&family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap';

console.log('Fetching Google Fonts CSS...');
const css = await fetchText(googleFontsUrl, { 'User-Agent': UA });
const fontFaces = extractFontFaces(css);
console.log(`Found ${fontFaces.length} Latin font faces to download.`);

const fontCssLines = [];
for (const f of fontFaces) {
  const filename = `${f.family.toLowerCase().replace(/\s/g,'-')}-${f.style}-${f.weight.replace(/\s/g,'')}.woff2`;
  const dest = path.join(fontsDir, filename);
  process.stdout.write(`  Downloading ${filename}...`);
  await downloadFile(f.url, dest);
  const size = fs.statSync(dest).size;
  console.log(` ${Math.round(size/1024)}KB`);
  fontCssLines.push(`@font-face {`);
  fontCssLines.push(`  font-family: '${f.family}';`);
  fontCssLines.push(`  font-style: ${f.style};`);
  fontCssLines.push(`  font-weight: ${f.weight};`);
  fontCssLines.push(`  font-display: swap;`);
  fontCssLines.push(`  src: url('../fonts/${filename}') format('woff2');`);
  fontCssLines.push(`  unicode-range: ${f.unicodeRange};`);
  fontCssLines.push(`}`);
}

const fontsCssPath = path.join(__dirname, '..', 'css', 'fonts.css');
fs.writeFileSync(fontsCssPath, fontCssLines.join('\n') + '\n');
console.log(`\ncss/fonts.css written with ${fontFaces.length} @font-face rules.`);
console.log('Total font files in fonts/:', fs.readdirSync(fontsDir).length);
