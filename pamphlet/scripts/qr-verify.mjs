import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import jsQR from "jsqr";
import { PNG } from "pngjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const file = process.argv[2] ?? resolve(root, "assets/qr.png");
const expected = process.argv[3] ?? "https://igoldiium.my";

const png = PNG.sync.read(readFileSync(file));
const found = jsQR.default
  ? jsQR.default(new Uint8ClampedArray(png.data), png.width, png.height)
  : jsQR(new Uint8ClampedArray(png.data), png.width, png.height);

console.log(`file     ${file}`);
console.log(`size     ${png.width}x${png.height}px`);
console.log(`decoded  ${found ? found.data : "UNREADABLE"}`);

if (!found) {
  console.error("\nX  QR could not be decoded at this resolution.");
  process.exit(1);
}
if (found.data !== expected) {
  console.error(`\nX  Expected ${expected} — got ${found.data}`);
  process.exit(1);
}
console.log("\nOK QR points at the right place.");
