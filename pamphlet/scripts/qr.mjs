import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, "../assets/qr.png");
const url = process.argv[2] ?? "https://igoldiium.my";

if (existsSync(out) && !process.argv.includes("--force")) {
  console.log(`qr.png already exists — keeping it (use --force to overwrite)`);
  console.log(`  ${out}`);
  process.exit(0);
}

await QRCode.toFile(out, url, {
  errorCorrectionLevel: "H",
  margin: 2,
  width: 1200,
  color: { dark: "#183226", light: "#ffffff" },
});

console.log(`QR written for ${url}`);
console.log(`  ${out}`);
