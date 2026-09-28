import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../assets/shots");
const BASE = process.env.PAMPHLET_URL ?? "http://localhost:5173";

const DESKTOP = [
  { id: "hero", label: "hero" },
  { id: "kaifiat", label: "kaifiat" },
  { id: "wudu", label: "wudu" },
  { id: "niyyah", label: "niyyah" },
  { id: "janazah", label: "janazah" },
  { id: "kuiz", label: "quiz" },
  { id: "bacaan", label: "bacaan" },
];

const MOBILE = [
  "hero",
  "kaifiat",
  "wudu",
  "niyyah",
  "janazah",
  "kuiz",
  "bacaan",
  "rukun",
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function settle(page, ms = 1400) {
  await page.evaluate(() => window.scrollBy(0, 1));
  await sleep(ms);
}

async function shoot(browser, { viewport, dpr, ids, suffix, hideChrome }) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: dpr,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  page.on("console", m => {
    if (m.type() === "error")
      console.log(`  [console] ${m.text().slice(0, 120)}`);
  });

  console.log(`\n→ ${suffix} @ ${viewport.width}x${viewport.height} @${dpr}x`);
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await sleep(4200);

  if (hideChrome) {
    await page.addStyleTag({
      content:
        ".line-sidebar{display:none!important}.pill-nav-hidden-desktop{display:none!important}",
    });
  }

  for (const id of ids) {
    const el = page.locator(`#${id}`);
    const count = await el.count();
    if (!count) {
      console.log(`  ! #${id} not found — skipped`);
      continue;
    }
    await el.first().scrollIntoViewIfNeeded();
    await sleep(500);
    await page.evaluate(sel => {
      const node = document.querySelector(sel);
      if (node)
        window.scrollTo({
          top: node.getBoundingClientRect().top + window.scrollY - 8,
        });
    }, `#${id}`);
    await settle(page, 1600);
    const file = resolve(OUT, `${suffix}-${id}.png`);
    await page.screenshot({ path: file, clip: { x: 0, y: 0, ...viewport } });
    console.log(`  ✓ ${suffix}-${id}.png`);
  }

  await context.close();
}

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

await shoot(browser, {
  viewport: { width: 1440, height: 900 },
  dpr: 2,
  ids: DESKTOP.map(d => d.id),
  suffix: "desktop",
  hideChrome: true,
});

await shoot(browser, {
  viewport: { width: 390, height: 844 },
  dpr: 3,
  ids: MOBILE,
  suffix: "mobile",
  hideChrome: true,
});

await browser.close();
console.log(`\nScreenshots written to ${OUT}`);
