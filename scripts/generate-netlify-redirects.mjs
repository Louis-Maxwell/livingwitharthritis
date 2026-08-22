#!/usr/bin/env node
/**
 * Writes public/_redirects from src/data/blogRedirects.ts.
 * Netlify applies these as real HTTP 301s before the SPA runs, which
 * Lovable's catch-all 200 hosting cannot do.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { buildRedirectsFile, parseBlogRedirects } from "./netlify-redirects.mjs";

const source = readFileSync("src/data/blogRedirects.ts", "utf8");
const pairs = parseBlogRedirects(source);
writeFileSync("public/_redirects", buildRedirectsFile(pairs));
console.log(`Wrote public/_redirects (${pairs.length} blog 301s)`);
