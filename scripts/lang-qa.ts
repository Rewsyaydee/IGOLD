import { chromium } from "playwright";

const BASE = "https://preview-igold-solat-3fc08cad.viktor.space";
const OUT = "/work/temp/igold_qa";

async function main() {
  const browser = await chromium.launch({
    args: ["--use-gl=swiftshader", "--disable-dev-shm-usage", "--no-sandbox", "--autoplay-policy=no-user-gesture-required"],
  });
  const page = await browser.newPage({ viewport: { width: 1360, height: 900 } });
  const errors: string[] = [];
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", e => errors.push("PAGEERROR: " + e.message));

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500); // preloader

  // default language should be EN
  const heroLine1 = await page.locator(".hero-line").first().innerText();
  console.log("HERO line1 (default):", JSON.stringify(heroLine1));

  // find toggle buttons
  const enBtn = page.getByRole("button", { name: "EN", exact: true }).first();
  const bmBtn = page.getByRole("button", { name: "BM", exact: true }).first();
  console.log("EN toggle visible:", await enBtn.isVisible(), "| BM toggle visible:", await bmBtn.isVisible());

  await page.screenshot({ path: `${OUT}_en_hero.png` });

  // switch to BM
  await bmBtn.click();
  await page.waitForTimeout(600);
  const heroLine1Bm = await page.locator(".hero-line").first().innerText();
  console.log("HERO line1 (after BM):", JSON.stringify(heroLine1Bm));

  // reload -> should persist BM
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const heroAfterReload = await page.locator(".hero-line").first().innerText();
  console.log("HERO line1 (after reload, expect BM):", JSON.stringify(heroAfterReload));
  const htmlLang = await page.evaluate(() => document.documentElement.lang);
  console.log("html lang attr:", htmlLang);

  // back to EN for rest of checks
  await page.getByRole("button", { name: "EN", exact: true }).first().click();
  await page.waitForTimeout(500);

  // Syarat hover cards
  await page.locator("#syarat").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const syaratCards = await page.locator("#syarat .hover-card").count();
  console.log("Syarat cards:", syaratCards);
  const firstSyarat = page.locator("#syarat .hover-card").first();
  await firstSyarat.click();
  await page.waitForTimeout(600);
  const syaratExpanded = await firstSyarat.getAttribute("aria-expanded");
  console.log("Syarat first card aria-expanded after tap:", syaratExpanded);
  await page.screenshot({ path: `${OUT}_syarat.png` });

  // Rukun cards
  await page.locator("#rukun").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const rukunCards = await page.locator("#rukun .hover-card").count();
  console.log("Rukun cards:", rukunCards);
  await page.locator("#rukun .hover-card").first().hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}_rukun.png` });

  // Kaifiat video
  await page.locator("#kaifiat").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const vid = page.locator("#kaifiat video").first();
  const vidState = await vid.evaluate((v: any) => ({ readyState: v.readyState, paused: v.paused })).catch(() => null);
  console.log("Kaifiat video:", JSON.stringify(vidState));

  // Bacaan cards + pending badges
  await page.locator("#bacaan").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const bacaanCards = await page.locator("#bacaan article").count();
  const pendingBadges = await page.locator("#bacaan article :text('Pending ustaz review')").count();
  console.log("Bacaan cards:", bacaanCards, "| pending badges:", pendingBadges);
  await page.screenshot({ path: `${OUT}_bacaan.png` });

  // Quiz EN
  await page.locator("#kuiz").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const quizQ = await page.locator("#kuiz h3").first().innerText();
  console.log("Quiz Q1 (EN expected):", JSON.stringify(quizQ));
  await page.screenshot({ path: `${OUT}_quiz.png` });

  console.log("\nCONSOLE ERRORS:", errors.length);
  errors.slice(0, 12).forEach(e => console.log("  -", e));

  await browser.close();
}
main().catch(e => { console.error(e); process.exit(1); });
