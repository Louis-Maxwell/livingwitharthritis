import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import mergeDefault, { merge } from "ts-deepmerge";
import { merge as upstreamMerge } from "ts-deepmerge-upstream";
import Prerender from "@prerenderer/rollup-plugin";

const requireFromTest = createRequire(import.meta.url);

describe("ts-deepmerge 8 compatibility entry points", () => {
  it("uses the unchanged upstream function for both ESM exports", () => {
    expect(mergeDefault).toBe(merge);
    expect(merge).toBe(upstreamMerge);
  });

  it("uses the unchanged upstream function for both CommonJS exports", () => {
    const adapter = requireFromTest("ts-deepmerge");
    const upstream = requireFromTest("ts-deepmerge-upstream");
    expect(adapter.__esModule).toBe(true);
    expect(adapter.default).toBe(adapter.merge);
    expect(adapter.merge).toBe(upstream.merge);
  });

  it("preserves withOptions behavior and restores normal array options", () => {
    const left = { values: [1, 2], nested: { left: true } };
    const right = { values: [2, 3], nested: { right: true } };
    expect(mergeDefault.withOptions({ mergeArrays: false }, left, right)).toEqual({
      values: [2, 3], nested: { left: true, right: true },
    });
    expect(merge(left, right).values).toEqual([1, 2, 3]);
    expect(left).toEqual({ values: [1, 2], nested: { left: true } });
    expect(right).toEqual({ values: [2, 3], nested: { right: true } });
  });

  it.each([
    "__proto__", "constructor", "prototype", "toString", "valueOf",
    "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString",
  ])("keeps upstream reserved-key filtering for %s", (key) => {
    const payload = JSON.parse(JSON.stringify({ safe: true, [key]: { compatPollution: true } }));
    const result = merge({}, payload);
    expect(Object.prototype.hasOwnProperty.call(result, key)).toBe(false);
    expect(result.safe).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(Object.prototype, "compatPollution")).toBe(false);
  });

  it("keeps reserved-key filtering when creating a new nested object", () => {
    const payload = JSON.parse('{"nested":{"safe":1,"__proto__":{"compatPollution":true},"constructor":{"prototype":{"compatPollution":true}}}}');
    expect(merge({}, payload)).toEqual({ nested: { safe: 1 } });
    expect(Object.prototype.hasOwnProperty.call(Object.prototype, "compatPollution")).toBe(false);
  });

  it.each([
    "@prerenderer/rollup-plugin", "@prerenderer/prerenderer", "@prerenderer/renderer-puppeteer",
  ])("provides the legacy API to %s without changing the upstream runtime", (consumer) => {
    const consumerRequire = createRequire(requireFromTest.resolve(consumer));
    const adapter = consumerRequire("ts-deepmerge");
    const adapterRequire = createRequire(consumerRequire.resolve("ts-deepmerge"));
    expect(adapter.default).toBe(adapterRequire("ts-deepmerge-upstream").merge);
    expect(typeof adapter.default.withOptions).toBe("function");
    const upstreamRoot = resolve(dirname(adapterRequire.resolve("ts-deepmerge-upstream")), "..");
    const metadata = JSON.parse(readFileSync(resolve(upstreamRoot, "package.json"), "utf8")) as { version: string };
    expect(metadata.version).toBe("8.0.0");
  });

  it("constructs the unchanged prerender plugin without a default-export crash", () => {
    const plugin = Prerender({ routes: ["/"], renderer: "@prerenderer/renderer-puppeteer" });
    expect(plugin).toBeTruthy();
    expect(typeof plugin.generateBundle.handler).toBe("function");
  });
});
