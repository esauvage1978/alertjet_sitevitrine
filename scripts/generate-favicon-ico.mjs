import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const builderRoot = path.join(root, '..', 'builder');

const vitrineSvg = path.join(root, 'public', 'favicon.svg');
const builderSvg = path.join(builderRoot, 'public', 'favicon.svg');

async function svgToIco(svgAbsolutePath) {
  const svg = fs.readFileSync(svgAbsolutePath);
  const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
  const png16 = await sharp(svg).resize(16, 16).png().toBuffer();
  return toIco([png16, png32]);
}

const vitrineIco = await svgToIco(vitrineSvg);
fs.writeFileSync(path.join(root, 'public', 'favicon.ico'), vitrineIco);

const builderIco = await svgToIco(builderSvg);
fs.writeFileSync(path.join(builderRoot, 'public', 'favicon.ico'), builderIco);
