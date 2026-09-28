import { exec } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const ENV_PATH = resolve(ROOT, ".env");
const TOKENS_PATH = resolve(ROOT, ".tokens.json");

const AUTH_URL = "https://www.canva.com/api/oauth/authorize";
const TOKEN_URL = "https://api.canva.com/rest/v1/oauth/token";
const SCOPES = ["design:content:write", "design:meta:read"];

async function loadEnv() {
  let raw;
  try {
    raw = await readFile(ENV_PATH, "utf8");
  } catch {
    console.error(
      `\n  Missing ${ENV_PATH}\n  Copy .env.example to .env and fill it in.\n`,
    );
    process.exit(1);
  }
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

function b64url(buf) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const env = await loadEnv();
const clientId = env.CANVA_CLIENT_ID;
const clientSecret = env.CANVA_CLIENT_SECRET;
const redirectUri =
  env.CANVA_REDIRECT_URI ?? "http://127.0.0.1:3001/oauth/redirect";

if (!clientId || !clientSecret) {
  console.error(
    "CANVA_CLIENT_ID and CANVA_CLIENT_SECRET must be set in pamphlet/.env",
  );
  process.exit(1);
}

const port = Number(new URL(redirectUri).port || 3001);
const codeVerifier = b64url(randomBytes(96));
const codeChallenge = b64url(
  createHash("sha256").update(codeVerifier).digest(),
);
const state = b64url(randomBytes(32));

const authUrl =
  `${AUTH_URL}?code_challenge=${codeChallenge}` +
  `&code_challenge_method=s256` +
  `&scope=${encodeURIComponent(SCOPES.join(" "))}` +
  `&response_type=code` +
  `&client_id=${encodeURIComponent(clientId)}` +
  `&state=${state}` +
  `&redirect_uri=${encodeURIComponent(redirectUri)}`;

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${port}`);
  if (url.pathname !== new URL(redirectUri).pathname) {
    res.writeHead(404).end("not found");
    return;
  }

  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end(`<h2>Authorization failed</h2><p>${error}</p>`);
    console.error(`\nAuthorization failed: ${error}`);
    server.close();
    process.exit(1);
  }

  if (returnedState !== state) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end(`<h2>State mismatch</h2><p>Possible CSRF. Aborted.</p>`);
    console.error("\nState mismatch — aborted.");
    server.close();
    process.exit(1);
  }

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      code_verifier: codeVerifier,
      redirect_uri: redirectUri,
    });

    const resp = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(JSON.stringify(data));

    const record = {
      ...data,
      obtained_at: Date.now(),
      expires_at: Date.now() + (data.expires_in ?? 0) * 1000,
    };
    await writeFile(TOKENS_PATH, JSON.stringify(record, null, 2), "utf8");

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h2 style="font-family:sans-serif">IGOLD — Canva connected</h2>
      <p style="font-family:sans-serif">You can close this tab and return to the terminal.</p>`);

    console.log("\n✓ Authorized. Tokens saved to pamphlet/.tokens.json");
    console.log(`  Scope: ${data.scope ?? "(none reported)"}`);
    console.log(
      `  Expires in: ${Math.round((data.expires_in ?? 0) / 60)} minutes\n`,
    );
    server.close();
    process.exit(0);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end(`<h2>Token exchange failed</h2><pre>${String(err)}</pre>`);
    console.error("\nToken exchange failed:", err);
    server.close();
    process.exit(1);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`\nListening on ${redirectUri}`);
  console.log("\nOpen this URL in your browser to authorize:\n");
  console.log(`${authUrl}\n`);
  if (process.platform === "win32") exec(`start "" "${authUrl}"`);
});

setTimeout(() => {
  console.error("\nTimed out after 5 minutes waiting for authorization.");
  server.close();
  process.exit(1);
}, 300000);
