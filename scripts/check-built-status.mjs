#!/usr/bin/env node
/**
 * Serve a built dist/ the way Vercel static hosting does (vercel.json
 * redirects first, then files, then 404.html with HTTP 404) and assert:
 *   - an unknown path is 404, noindex, and not the homepage
 *   - /shop is a 301 to /supplements, even if a stub file exists
 *   - / is 200
 *
 * `npx serve -s` is an SPA fallback and must not be used for this check.
 */
import { createServer, request as httpRequest } from "node:http";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { resolveHostRequest } from "./lib/host-routing.mjs";

export function filesInDist(distDir) {
  const files = new Set();
  if (!existsSync(distDir)) return files;
  const walk = (dir, prefix) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const rel = prefix ? `${prefix}/${name}` : name;
      if (statSync(full).isDirectory()) walk(full, rel);
      else files.add(rel);
    }
  };
  walk(distDir, "");
  return files;
}

export function startHostServer(distDir, config) {
  const files = filesInDist(distDir);
  const redirects = config.redirects ?? [];
  const trailingSlash = config.trailingSlash;
  const server = createServer((req, res) => {
    const url = new URL(req.url || "/", "http://127.0.0.1");
    const decision = resolveHostRequest({
      pathname: url.pathname,
      search: url.search,
      files,
      redirects,
      trailingSlash,
    });
    if (decision.location) {
      res.writeHead(decision.status, { Location: decision.location });
      res.end();
      return;
    }
    if (!decision.file) {
      res.writeHead(decision.status, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const body = readFileSync(join(distDir, decision.file));
    res.writeHead(decision.status, { "Content-Type": "text/html; charset=utf-8" });
    res.end(body);
  });
  return new Promise((done) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      done({ server, origin: `http://127.0.0.1:${port}` });
    });
  });
}

function titleOf(html) {
  return html.match(/<title>(.*?)<\/title>/is)?.[1]?.trim() ?? "";
}

/** Raw status and Location. fetch() hides both when redirect mode is manual. */
export function hostRequest(origin, path) {
  return new Promise((done, reject) => {
    const url = new URL(path, origin);
    const req = httpRequest(url, { method: "GET" }, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        done({
          status: res.statusCode ?? 0,
          location: res.headers.location || "",
          body: Buffer.concat(chunks).toString("utf8"),
        });
      });
    });
    req.on("error", reject);
    req.end();
  });
}

export async function checkBuiltSite(root) {
  const dist = join(root, "dist");
  const vercelPath = join(root, "vercel.json");
  const failures = [];
  if (!existsSync(dist) || !existsSync(join(dist, "index.html")) || !existsSync(join(dist, "404.html"))) {
    return ["dist/index.html and dist/404.html are required (run the production build first)"];
  }
  if (!existsSync(vercelPath)) return ["vercel.json is missing"];
  if (!existsSync(join(dist, "_redirects"))) return ["dist/_redirects is missing"];

  const config = JSON.parse(readFileSync(vercelPath, "utf8"));
  const redirects = readFileSync(join(dist, "_redirects"), "utf8");
  if (!redirects.includes("/* /404.html 404")) {
    failures.push("dist/_redirects is missing the unknown-route rule: /* /404.html 404");
  }
  if (!redirects.includes("/shop /supplements 301!")) {
    failures.push("dist/_redirects must force /shop → /supplements as 301! so the stub file cannot win");
  }

  const home = readFileSync(join(dist, "index.html"), "utf8");
  const homeTitle = titleOf(home);
  const { server, origin } = await startHostServer(dist, config);
  try {
    const unknown = await hostRequest(origin, "/this-page-definitely-does-not-exist-xyz-999");
    if (unknown.status !== 404) failures.push(`unknown route status ${unknown.status}, expected 404`);
    if (!/noindex,\s*nofollow/i.test(unknown.body)) {
      failures.push("unknown route body is missing noindex, nofollow");
    }
    if (!unknown.body.includes("Page not found")) {
      failures.push("unknown route body is missing the not-found title");
    }
    if (homeTitle && unknown.body.includes(homeTitle)) {
      failures.push("unknown route leaked the homepage title");
    }

    const shop = await hostRequest(origin, "/shop");
    if (shop.status !== 301) failures.push(`/shop status ${shop.status}, expected 301`);
    if (shop.location !== "/supplements") {
      failures.push(`/shop Location ${shop.location || "(none)"}, expected /supplements`);
    }

    const shopQuery = await hostRequest(origin, "/shop?ref=old");
    if (shopQuery.location !== "/supplements?ref=old") {
      failures.push(`/shop query was not kept on the 301 (got ${shopQuery.location})`);
    }

    const homeRes = await hostRequest(origin, "/");
    if (homeRes.status !== 200) failures.push(`homepage status ${homeRes.status}, expected 200`);
  } finally {
    await new Promise((done) => server.close(done));
  }
  return failures;
}

async function main() {
  const root = resolve(process.argv[2] || ".");
  const failures = await checkBuiltSite(root);
  if (failures.length) {
    for (const failure of failures) console.error(`✗ ${failure}`);
    process.exit(1);
  }
  console.log("✓ unknown route is HTTP 404 (noindex, not the homepage); /shop is 301 → /supplements");
}

const entry = process.argv[1] ? resolve(process.argv[1]) : "";
if (entry.endsWith("check-built-status.mjs")) {
  main();
}
