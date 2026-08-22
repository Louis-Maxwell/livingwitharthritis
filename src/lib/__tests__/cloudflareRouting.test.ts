/// <reference types="node" />
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { BLOG_SLUG_REDIRECTS } from "@/data/blogRedirects";
import {
  cacheControlFor,
  normalisePath,
  redirectTarget,
  shouldServeSpaShell,
} from "../../../cloudflare/routing";

describe("Cloudflare routing", () => {
  it("enforces every documented blog redirect at the edge", () => {
    for (const [source, destination] of Object.entries(BLOG_SLUG_REDIRECTS)) {
      expect(redirectTarget(`/blog/${source}`)).toBe(`/blog/${destination}`);
    }
  });

  it("normalises duplicate and trailing slashes", () => {
    expect(normalisePath("/blog//example///")).toBe("/blog/example");
    expect(normalisePath("/")).toBe("/");
  });

  it("serves the SPA shell only for known private client routes", () => {
    expect(shouldServeSpaShell("/auth")).toBe(true);
    expect(shouldServeSpaShell("/admin/appointments")).toBe(true);
    expect(shouldServeSpaShell("/unsubscribe")).toBe(true);
    expect(shouldServeSpaShell("/definitely-not-a-real-page")).toBe(false);
    expect(shouldServeSpaShell("/blog/missing-article")).toBe(false);
  });

  it("applies immutable caching only to long-lived assets", () => {
    expect(cacheControlFor("/assets/app-a1b2c3.js", "text/javascript")).toBe(
      "public, max-age=31536000, immutable",
    );
    expect(cacheControlFor("/blog", "text/html")).toBe(
      "public, max-age=0, must-revalidate",
    );
    expect(cacheControlFor("/sitemap.xml", "application/xml")).toBe(
      "public, max-age=86400",
    );
  });

  it("ships a Worker static-assets config and a real 404 document", () => {
    const root = process.cwd();
    const config = JSON.parse(
      readFileSync(resolve(root, "wrangler.jsonc"), "utf8"),
    );

    expect(config.name).toBe("living-with-arthritis");
    expect(config.assets.directory).toBe("./dist");
    expect(config.assets.not_found_handling).toBe("none");
    expect(config.assets.run_worker_first).toContain("/*");
    expect(config.assets.run_worker_first).toContain("!/assets/*");
    expect(existsSync(resolve(root, "public/404.html"))).toBe(true);
  });
});
