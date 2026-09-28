import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..", "..");

const SRC = resolve(ROOT, "public/IGOLD_LOGO.png");
const OUT = [
  resolve(ROOT, "public/branding"),
  resolve(ROOT, "pamphlet/assets"),
];

const NAVY = [8, 40, 72];
const GOLD = [248, 176, 80];
const CREAM = [244, 237, 220];

const lum = (r, g, b) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;
const L_NAVY = lum(...NAVY);
const L_GOLD = lum(...GOLD);

const clamp01 = n => (n < 0 ? 0 : n > 1 ? 1 : n);

function render(png, inkForNavy) {
  const out = new PNG({ width: png.width, height: png.height });
  let cleared = 0;

  for (let i = 0; i < png.data.length; i += 4) {
    const r = png.data[i];
    const g = png.data[i + 1];
    const b = png.data[i + 2];
    const L = lum(r, g, b);

    const isGold = r - b > 25;
    const t = isGold
      ? (1 - L) / (1 - L_GOLD)
      : (1 - L) / (1 - L_NAVY);

    const alpha = Math.round(clamp01(t) * 255);
    const ink = isGold ? GOLD : inkForNavy;

    out.data[i] = ink[0];
    out.data[i + 1] = ink[1];
    out.data[i + 2] = ink[2];
    out.data[i + 3] = alpha;
    if (alpha === 0) cleared++;
  }
  return { out, cleared };
}

const src = PNG.sync.read(readFileSync(SRC));
console.log(`source   ${src.width}x${src.height}px`);

for (const dir of OUT) mkdirSync(dir, { recursive: true });

const variants = [
  { file: "igold-logo.png", navy: NAVY },
  { file: "igold-logo-light.png", navy: CREAM },
];

for (const { file, navy } of variants) {
  const { out, cleared } = render(src, navy);
  for (const dir of OUT) {
    writeFileSync(resolve(dir, file), PNG.sync.write(out));
  }
  const pct = ((cleared / (src.width * src.height)) * 100).toFixed(1);
  console.log(`✓ ${file.padEnd(24)} navy=rgb(${navy})  ${pct}% made transparent`);
}

console.log(`\nwritten to:\n${OUT.map(d => `  ${d}`).join("\n")}`);
