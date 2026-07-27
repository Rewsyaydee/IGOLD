import { chromium } from "playwright";

const BASE = "https://preview-igold-solat-3fc08cad.viktor.space";
const OUT = "/tmp/igold_qa";

async function shoot(page: any, name: string, full = false) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  console.log("shot:", name);
}

async function run() {
  const browser = await chromium.launch({
    args: ["--use-gl=swiftshader", "--disable-dev-shm-usage", "--no-sandbox", "--autoplay-policy=no-user-gesture-required"],
  });

  const errors: string[] = [];
  const requests: string[] = [];

  // ---------- DESKTOP ----------
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on("console", (m: any) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e: any) => errors.push("PAGEERROR: " + e.message));
  page.on("request", (r: any) => requests.push(r.url()));

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3500); // preloader
  await shoot(page, "01-desktop-hero");

  // scroll through sections
  await page.evaluate(() => document.getElementById("about")?.scrollIntoView());
  await page.waitForTimeout(1200); await shoot(page, "02-desktop-about");
  await page.evaluate(() => document.getElementById("syarat")?.scrollIntoView());
  await page.waitForTimeout(1200); await shoot(page, "03-desktop-syarat");
  await page.evaluate(() => document.getElementById("kaifiat")?.scrollIntoView());
  await page.waitForTimeout(1500); await shoot(page, "04-desktop-kaifiat");
  await page.evaluate(() => document.getElementById("explorer")?.scrollIntoView());
  await page.waitForTimeout(1800); await shoot(page, "05-desktop-explorer");

  // interact with explorer: click 6th thumb (sujud)
  const thumbs = page.locator(".pex-thumb");
  const tcount = await thumbs.count();
  console.log("posture thumbs:", tcount);
  if (tcount >= 6) { await thumbs.nth(5).click(); await page.waitForTimeout(1200); await shoot(page, "06-desktop-explorer-sujud"); }

  await page.evaluate(() => document.getElementById("bacaan")?.scrollIntoView());
  await page.waitForTimeout(1200); await shoot(page, "07-desktop-bacaan");
  await page.evaluate(() => document.getElementById("kuiz")?.scrollIntoView());
  await page.waitForTimeout(1200); await shoot(page, "08-desktop-quiz");
  await page.evaluate(() => document.getElementById("hubungi")?.scrollIntoView());
  await page.waitForTimeout(1200); await shoot(page, "09-desktop-contact");

  // language toggle BM
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  const bm = page.locator('button:has-text("BM")').first();
  if (await bm.count()) { await bm.click(); await page.waitForTimeout(800); await shoot(page, "10-desktop-hero-BM"); }

  // ---------- MOBILE ----------
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const mp = await mctx.newPage();
  mp.on("console", (m: any) => { if (m.type() === "error") errors.push("MOBILE: " + m.text()); });
  mp.on("pageerror", (e: any) => errors.push("MOBILE PAGEERROR: " + e.message));
  await mp.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await mp.waitForTimeout(3500);
  await shoot(mp, "11-mobile-hero");
  await mp.evaluate(() => document.getElementById("explorer")?.scrollIntoView());
  await mp.waitForTimeout(1800); await shoot(mp, "12-mobile-explorer");
  await mp.evaluate(() => document.getElementById("kaifiat")?.scrollIntoView());
  await mp.waitForTimeout(1500); await shoot(mp, "13-mobile-kaifiat");

  // three.js check
  const threeReqs = requests.filter(u => /three/i.test(u));
  console.log("THREE requests:", threeReqs.length, threeReqs.slice(0, 3));

  await browser.close();

  console.log("\n=== CONSOLE ERRORS (" + errors.length + ") ===");
  errors.slice(0, 30).forEach(e => console.log(" -", e));
  console.log("=== QA DONE ===");
}

run().catch(e => { console.error("QA FAIL:", e); process.exit(1); });
