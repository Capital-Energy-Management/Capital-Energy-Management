// Convert all .otf fonts under public/fuentes to .woff and .woff2
// Usage: node tools/convert-fonts.mjs

import { promises as fs } from 'fs';
import path from 'path';
import * as FontEditor from 'fonteditor-core';
import ttf2woff2 from 'ttf2woff2';

const ROOT_DIR = process.cwd();
const FONTS_ROOT = path.join(ROOT_DIR, 'public', 'fuentes');

async function walk(dir, visitor) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, visitor);
    } else {
      await visitor(full);
    }
  }
}

async function convertOtfFile(filePath) {
  if (!filePath.toLowerCase().endsWith('.otf')) return;
  const buf = await fs.readFile(filePath);

  // Read font
  const font = FontEditor.Font.create(buf, {
    type: 'otf',
    subset: null,
    hinting: true,
    kerning: true,
    compound2simple: false,
    inflate: null,
    combinePath: false,
  });

  const outBase = filePath.slice(0, -4); // remove .otf

  // WOFF
  const woffBuf = font.write({
    type: 'woff',
    hinting: true,
    deflate: null,
  });
  await fs.writeFile(outBase + '.woff', Buffer.from(woffBuf));

  // WOFF2 (vía ttf -> woff2)
  try {
    const ttfBuf = font.write({ type: 'ttf', hinting: true });
    const w2 = ttf2woff2(Buffer.from(ttfBuf));
    await fs.writeFile(outBase + '.woff2', Buffer.from(w2));
  } catch (e) {
    console.warn('No se pudo generar WOFF2 para', path.basename(filePath), '-', e?.message || e);
  }

  console.log('Converted:', path.relative(FONTS_ROOT, filePath));
}

async function main() {
  try {
    await walk(FONTS_ROOT, convertOtfFile);
    console.log('Done converting OTF to WOFF/WOFF2.');
  } catch (err) {
    console.error('Font conversion failed:', err);
    process.exit(1);
  }
}

main();


