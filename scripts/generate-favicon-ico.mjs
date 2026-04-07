import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const svgPath = path.join(root, 'public', 'favicon.svg');
const builderIco = path.join(root, '..', 'builder', 'public', 'favicon.ico');

const svg = fs.readFileSync(svgPath);
const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
const png16 = await sharp(svg).resize(16, 16).png().toBuffer();
const ico = await toIco([png16, png32]);

fs.writeFileSync(path.join(root, 'public', 'favicon.ico'), ico);
fs.writeFileSync(builderIco, ico);
