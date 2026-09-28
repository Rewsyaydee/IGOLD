import { mkdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");

const VARIANTS = [
  { slug: "v1-manuscript", file: "v1.html", sheets: ["outside", "inside"] },
  { slug: "v2-daylight", file: "v2.html", sheets: ["outside", "inside"] },
  { slug: "v3-gilded", file: "v3.html", sheets: ["outside", "inside"] },
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function serve() {
  const server = createServer(async (req, res) => {
    try {
      const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
      const rel = url === "/" ? "/index.html" : url;
      const file = normalize(resolve(ROOT, `.${rel}`));
      if (!file.startsWith(ROOT)) {
        res.writeHead(403).end("forbidden");
        return;
      }
      const data = await readFile(file);
      res.writeHead(200, {
        "Content-Type":
          MIME[extname(file).toLowerCase()] ?? "application/octet-stream",
      });
      res.end(data);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  return new Promise(ok => server.listen(0, "127.0.0.1", () => ok(server)));
}

async function ready(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map(img =>
        img.complete
          ? Promise.resolve()
          : new Promise(r => {
              img.onload = img.onerror = r;
            }),
      ),
    );
  });
  await page.waitForTimeout(800);
}

const only = process.argv[2];
const list = only ? VARIANTS.filter(v => v.slug.includes(only)) : VARIANTS;
if (!list.length) {
  console.error(
    `No variant matches "${only}". Options: ${VARIANTS.map(v => v.slug).join(", ")}`,
  );
  process.exit(1);
}

mkdirSync(DIST, { recursive: true });

const server = await serve();
const { port } = server.address();
const base = `http://127.0.0.1:${port}`;
console.log(`serving ${base}\n`);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1300, height: 1000 },
  deviceScaleFactor: 2,
});

for (const { slug, file, sheets } of list) {
  try {
    await page.goto(`${base}/${file}`, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    await ready(page);

    const pdfPath = resolve(DIST, `${slug}.pdf`);
    await page.pdf({
      path: pdfPath,
      printBackground: true,
      preferCSSPageSize: true,
      width: "297mm",
      height: "210mm",
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    console.log(`✓ ${slug}.pdf`);

    const els = await page.locator(".sheet").all();
    for (let i = 0; i < els.length; i++) {
      const name = sheets[i] ?? String(i + 1);
      const p = resolve(DIST, `${slug}-${name}.png`);
      await els[i].screenshot({ path: p });
      console.log(`  ✓ ${slug}-${name}.png`);
    }
  } catch (err) {
    console.error(`✗ ${slug} failed: ${String(err).split("\n")[0]}`);
  }
}

await browser.close();
server.close();
console.log("\ndone.");
