import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const ENV_PATH = resolve(ROOT, ".env");
const TOKENS_PATH = resolve(ROOT, ".tokens.json");
const PDF_PATH = resolve(ROOT, "dist/igold-pamphlet.pdf");

const API = "https://api.canva.com/rest/v1";
const TOKEN_URL = `${API}/oauth/token`;

async function loadEnv() {
  const raw = await readFile(ENV_PATH, "utf8").catch(() => {
    console.error(`Missing ${ENV_PATH}`);
    process.exit(1);
  });
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

async function accessToken(env) {
  const tokens = JSON.parse(await readFile(TOKENS_PATH, "utf8").catch(() => {
    console.error(`Missing ${TOKENS_PATH} — run: npm run canva:auth`);
    process.exit(1);
  }));

  const valid = tokens.expires_at && Date.now() < tokens.expires_at - 60000;
  if (valid) return tokens.access_token;

  console.log("Access token expired — refreshing…");
  const basic = Buffer.from(`${env.CANVA_CLIENT_ID}:${env.CANVA_CLIENT_SECRET}`).toString("base64");
  const resp = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: tokens.refresh_token,
    }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    console.error("Refresh failed:", data);
    process.exit(1);
  }
  const record = {
    ...data,
    obtained_at: Date.now(),
    expires_at: Date.now() + (data.expires_in ?? 0) * 1000,
  };
  await writeFile(TOKENS_PATH, JSON.stringify(record, null, 2), "utf8");
  return record.access_token;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const env = await loadEnv();
  const token = await accessToken(env);
  const auth = { Authorization: `Bearer ${token}` };

  if (process.argv.includes("--capabilities")) {
    const r = await fetch(`${API}/users/me/capabilities`, { headers: auth });
    console.log(`capabilities (${r.status}):`);
    console.log(JSON.stringify(await r.json(), null, 2));
    return;
  }

  const pdf = await readFile(PDF_PATH).catch(() => {
    console.error(`Missing ${PDF_PATH} — run: npm run pdf`);
    process.exit(1);
  });
  console.log(`Uploading ${(pdf.length / 1024).toFixed(0)} KB → Canva…`);

  const metadata = JSON.stringify({
    title_base64: Buffer.from("IGOLD — Prayer Guide Pamphlet").toString("base64"),
    mime_type: "application/pdf",
  });

  const createResp = await fetch(`${API}/imports`, {
    method: "POST",
    headers: {
      ...auth,
      "Content-Type": "application/octet-stream",
      "Import-Metadata": metadata,
    },
    body: pdf,
  });

  const created = await createResp.json();
  if (!createResp.ok) {
    console.error(`Import failed (${createResp.status}):`);
    console.error(JSON.stringify(created, null, 2));
    process.exit(1);
  }

  const jobId = created.job.id;
  console.log(`Job ${jobId} — ${created.job.status}`);

  for (let i = 0; i < 60; i++) {
    await sleep(2000);
    const r = await fetch(`${API}/imports/${jobId}`, { headers: auth });
    const data = await r.json();
    const job = data.job;

    if (job.status === "success") {
      const design = job.result?.designs?.[0];
      console.log("\n✓ Imported successfully\n");
      console.log(`  Design ID : ${design?.id}`);
      console.log(`  Edit URL  : ${design?.urls?.edit_url}`);
      console.log(`  View URL  : ${design?.urls?.view_url}`);
      console.log("\nEdit URL is valid for 30 days.\n");
      return;
    }

    if (job.status === "failed") {
      console.error("\nImport failed:");
      console.error(JSON.stringify(job.error, null, 2));
      process.exit(1);
    }

    process.stdout.write(".");
  }

  console.error("\nTimed out waiting for the import job.");
  process.exit(1);
}

await main();
