import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import {
  SKIP_VERCEL_SOURCES,
  VERCEL_REDIRECT_LIMIT,
  buildVercelConfig,
  forcePermanentRedirects,
  resolveHostRequest,
  serializeVercelConfig,
} from "../lib/host-routing.mjs";
import { checkBuiltSite, hostRequest, startHostServer } from "../check-built-status.mjs";

const ROOT = resolve(".");

test("permanent redirects are forced in the built _redirects file", () => {
  const forced = forcePermanentRedirects(
    "/shop /supplements 301\n/about /about 200\n/shop /supplements 301!\n/* /404.html 404\n",
  );
  assert.match(forced, /\/shop \/supplements 301!/);
  assert.doesNotMatch(forced, /301!!/);
  assert.match(forced, /\/about \/about 200/);
  assert.match(forced, /\/\* \/404.html 404/);
});

test("vercel.json is the redirect map, with no SPA rewrite and no locale splat", () => {
  const committed = JSON.parse(readFileSync(join(ROOT, "vercel.json"), "utf8"));
  const expected = buildVercelConfig(readFileSync(join(ROOT, "public/_redirects"), "utf8"));
  assert.equal(serializeVercelConfig(committed), serializeVercelConfig(expected));
  assert.equal(committed.trailingSlash, false);
  assert.equal(committed.rewrites, undefined);
  assert.equal(committed.routes, undefined);
  assert.equal(committed.functions, undefined);
  assert.ok(committed.redirects.length <= VERCEL_REDIRECT_LIMIT);
  assert.ok(
    committed.redirects.every((rule) => rule.statusCode === 301 && rule.destination.startsWith("/")),
  );
  const shop = committed.redirects.find((rule) => rule.source === "/shop");
  assert.deepEqual(shop, { source: "/shop", destination: "/supplements", statusCode: 301 });
  for (const source of SKIP_VERCEL_SOURCES) {
    const asVercel = `${source.slice(0, -1)}:path*`;
    assert.equal(
      committed.redirects.some((rule) => rule.source === asVercel),
      false,
      asVercel,
    );
  }
  assert.equal(
    committed.redirects.some((rule) => rule.source === "/es/conditions/osteoarthritis"),
    false,
  );
  assert.ok(committed.redirects.some((rule) => rule.source === "/product/:path*" && rule.destination === "/supplements"));
});

test("redirects win over a stub file and unknown paths are a real 404", async () => {
  const root = mkdtempSync(join(tmpdir(), "lwa-status-"));
  try {
    const dist = join(root, "dist");
    mkdirSync(join(dist, "shop"), { recursive: true });
    mkdirSync(join(dist, "about"), { recursive: true });
    writeFileSync(
      join(dist, "index.html"),
      "<!doctype html><title>Living With Arthritis: Pain Relief &amp; Flare-Up Help</title><h1>Home</h1>",
    );
    writeFileSync(
      join(dist, "404.html"),
      '<!doctype html><title>Page not found | Living With Arthritis</title><meta name="robots" content="noindex, nofollow" /><h1>We could not find that page</h1>',
    );
    writeFileSync(
      join(dist, "shop/index.html"),
      "<!doctype html><title>Moved permanently</title><h1>This URL has permanently moved</h1>",
    );
    writeFileSync(join(dist, "about/index.html"), "<!doctype html><title>About</title><h1>About</h1>");
    writeFileSync(
      join(dist, "_redirects"),
      "/shop /supplements 301!\n/about-us /about 301!\n/* /404.html 404\n",
    );
    const config = buildVercelConfig("/shop /supplements 301\n/about-us /about 301\n/product/* /supplements 301\n");
    writeFileSync(join(root, "vercel.json"), serializeVercelConfig(config));

    const files = new Set(["index.html", "404.html", "shop/index.html", "about/index.html"]);
    assert.equal(
      resolveHostRequest({ pathname: "/shop", files, redirects: config.redirects, trailingSlash: false }).status,
      301,
    );

    const failures = await checkBuiltSite(root);
    assert.deepEqual(failures, []);

    const { server, origin } = await startHostServer(dist, config);
    try {
      const product = await hostRequest(origin, "/product/glucosamine-old");
      assert.equal(product.status, 301);
      assert.equal(product.location, "/supplements");
      const about = await hostRequest(origin, "/about");
      assert.equal(about.status, 200);
      assert.match(about.body, /<title>About<\/title>/);
      const slashed = await hostRequest(origin, "/shop/");
      assert.equal(slashed.status, 308);
      assert.equal(slashed.location, "/shop");
    } finally {
      await new Promise((done) => server.close(done));
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
