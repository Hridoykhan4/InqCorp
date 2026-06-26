// One-off image compressor. Resizes oversized images and re-encodes in place.
// Originals remain in git history if a result looks off. Run: node scripts/compress-images.mjs
import sharp from "sharp";
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOTS = ["src/assets", "public"];
const MAX_WIDTH = 1920;
const MIN_BYTES = 120 * 1024; // skip already-small files

let savedTotal = 0;

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function process(file) {
  const ext = extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return;

  const before = (await stat(file)).size;
  if (before < MIN_BYTES) return;

  const input = await readFile(file);
  let pipeline = sharp(input).resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, quality: 82, palette: true, effort: 8 });
  } else {
    pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
  }

  const out = await pipeline.toBuffer();
  if (out.length < before) {
    await writeFile(file, out);
    const saved = before - out.length;
    savedTotal += saved;
    console.log(
      `${(before / 1024).toFixed(0)}KB → ${(out.length / 1024).toFixed(0)}KB  ${file}`
    );
  }
}

for (const root of ROOTS) {
  for await (const file of walk(root)) {
    try {
      await process(file);
    } catch (err) {
      console.warn(`skip ${file}: ${err.message}`);
    }
  }
}

console.log(`\nTotal saved: ${(savedTotal / 1024 / 1024).toFixed(2)} MB`);
