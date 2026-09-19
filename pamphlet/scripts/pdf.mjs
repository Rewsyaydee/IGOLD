import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, extname, normalize } from "node:path";
import { mkdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");

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
      const file = normalize(resolve(ROOT, "." + rel));
      if (!file.startsWith(ROOT)) {
        res.writeHead(403).end("forbidden");
        return;
      }
      const data = await readFile(file);
      res.writeHead(200, { "Content-Type": MIME[extname(file).toLowerCase()] ?? "application/octet-stream" });
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
        img.complete ? Promise.resolve() : new Promise(r => { img.onload = img.onerror = r; }),
      ),
    );
  });
  await page.waitForTimeout(700);
}

mkdirSync(DIST, { recursive: true });

const server = await serve();
const { port } = server.address();
const url = `http://127.0.0.1:${port}/index.html`;
console.log(`serving ${url}`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2 });

await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await ready(page);

const pdfPath = resolve(DIST, "igold-pamphlet.pdf");
await page.pdf({
  path: pdfPath,
  printBackground: true,
  preferCSSPageSize: true,
  width: "297mm",
  height: "210mm",
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
console.log(`✓ ${pdfPath}`);

await page.setViewportSize({ width: 1300, height: 1000 });
await ready(page);
const sheets = await page.locator(".sheet").all();
const names = ["outside", "inside"];
for (let i = 0; i < sheets.length; i++) {
  const p = resolve(DIST, `preview-${names[i] ?? i + 1}.png`);
  await sheets[i].screenshot({ path: p });
  console.log(`✓ ${p}`);
}

await browser.close();
server.close();
