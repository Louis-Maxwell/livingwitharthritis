#!/usr/bin/env node
/**
 * Single lockfile guard for CI.
 *
 * Truth for GitHub Actions: package-lock.json + `npm ci`.
 * bun.lock may exist for local/Lovable tooling, but CI must not treat it as
 * the install source of truth. Missing package-lock.json fails the job.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const npmLock = join(root, "package-lock.json");
const bunLock = join(root, "bun.lock");
const bunLockb = join(root, "bun.lockb");

const hasNpm = existsSync(npmLock);
const hasBun = existsSync(bunLock) || existsSync(bunLockb);

if (!hasNpm) {
  console.error(
    "FAIL: package-lock.json is missing. CI installs with `npm ci` only — commit package-lock.json.",
  );
  process.exit(1);
}

console.log("OK: package-lock.json present (CI truth = npm ci).");
if (hasBun) {
  console.log(
    "NOTE: bun.lock/bun.lockb also present. Allowed for local/Lovable, but keep-green and most workflows use npm ci — do not delete package-lock or switch CI to bun-only without updating all workflows.",
  );
}
process.exit(0);
