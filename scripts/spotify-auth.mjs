import http from "node:http";
import { exec } from "node:child_process";
import { randomUUID } from "node:crypto";
import readline from "node:readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, r));

const PORT = 3000;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = "user-read-currently-playing user-read-playback-state";

async function main() {
  console.log("\n=== Spotify Now Playing — one-time setup ===\n");
  const clientId = (await ask("Paste your SPOTIFY_CLIENT_ID: ")).trim();
  const clientSecret = (await ask("Paste your SPOTIFY_CLIENT_SECRET: ")).trim();
  if (!clientId || !clientSecret) {
    console.error("Both values are required.");
    process.exit(1);
  }

  const state = randomUUID();
  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      state,
    });

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, REDIRECT_URI);
    if (url.pathname !== "/callback") {
      res.writeHead(404);
      res.end();
      return;
    }
    const code = url.searchParams.get("code");
    const err = url.searchParams.get("error");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h2>Done! You can close this tab.</h2>");

    server.close();
    if (err || !code) {
      console.error("\nAuthorization failed:", err || "no code received");
      process.exit(1);
    }

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });
    const data = await tokenRes.json();
    if (!data.refresh_token) {
      console.error("\nToken exchange failed:", JSON.stringify(data));
      process.exit(1);
    }

    console.log("\n================ COPY THESE TO VERCEL ================\n");
    console.log(`SPOTIFY_CLIENT_ID       = ${clientId}`);
    console.log(`SPOTIFY_CLIENT_SECRET   = ${clientSecret}`);
    console.log(`SPOTIFY_REFRESH_TOKEN   = ${data.refresh_token}`);
    console.log("\n======================================================\n");
    console.log("Add them in Vercel: Settings > Environment Variables,");
    console.log("then tell the assistant to redeploy.\n");
    rl.close();
  });

  server.listen(PORT, () => {
    console.log(`\nOpening Spotify login... (listening on port ${PORT})`);
    console.log("If nothing opens, open this URL manually:\n");
    console.log(authUrl + "\n");
    const platform = process.platform;
    const cmd =
      platform === "win32"
        ? `start "" "${authUrl}"`
        : platform === "darwin"
          ? `open "${authUrl}"`
          : `xdg-open "${authUrl}"`;
    exec(cmd);
  });
}

main();
