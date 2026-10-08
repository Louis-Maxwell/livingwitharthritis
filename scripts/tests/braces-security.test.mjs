import { createRequire } from "node:module";
import assert from "node:assert/strict";
import test from "node:test";

const require = createRequire(import.meta.url);
const braces = require("../../vendor/braces");
const upstream = process.env.BRACES_UPSTREAM_PATH ? require(process.env.BRACES_UPSTREAM_PATH) : null;
const rejectsDepth = (error) => error instanceof SyntaxError && /maximum nesting depth/.test(error.message);

// Tests the public APIs actually used by micromatch/chokidar, not just the guard.
for (const api of ["parse", "compile", "expand", "stringify"]) {
  for (const [open, close] of [["{", "}"], ["(", ")"]]) {
    test(api + " rejects 4,000 nested " + open + " before recursive walking", () => {
      const pattern = open.repeat(4000) + "x" + close.repeat(4000);
      assert.throws(() => braces[api](pattern), rejectsDepth);
    });
  }
  test(api + " rejects mixed brace/parenthesis nesting", () => {
    assert.throws(() => braces[api]("{(".repeat(100) + "x" + ")}".repeat(100)), rejectsDepth);
  });
}
test("default compile and expansion entry points reject malicious patterns", () => {
  const pattern = "{".repeat(4000) + "x" + "}".repeat(4000);
  assert.throws(() => braces(pattern), rejectsDepth);
  assert.throws(() => braces(pattern, { expand: true }), rejectsDepth);
});
for (const api of ["compile", "expand", "stringify"]) {
  test(api + " also protects directly supplied deep ASTs", () => {
    let ast = { type: "text", value: "x", nodes: [] };
    for (let i = 0; i < 4000; i++) ast = { type: "root", nodes: [ast] };
    assert.throws(() => braces[api](ast), rejectsDepth);
  });
}
test("nesting cap cannot be disabled by options", () => {
  assert.throws(() => braces.compile("{".repeat(200) + "x" + "}".repeat(200), { maxDepth: Infinity }), rejectsDepth);
});
test("ordinary nested patterns remain supported", () => {
  assert.deepEqual(braces.expand("src/{lib,components}/{a,b}.{ts,tsx}"), [
    "src/lib/a.ts", "src/lib/a.tsx", "src/lib/b.ts", "src/lib/b.tsx",
    "src/components/a.ts", "src/components/a.tsx", "src/components/b.ts", "src/components/b.tsx",
  ]);
  assert.equal(braces.compile("src/*.{ts,tsx}"), "src/*.(ts|tsx)");
  assert.deepEqual(braces.expand("{1..3}"), ["1", "2", "3"]);
});
test("quoted and escaped braces stay literal", () => {
  assert.equal(braces.compile('"{{{{x}}}}"'), "{{{{x}}}}");
  assert.equal(braces.stringify(braces.parse("a/{b,c}/d")), "a/{b,c}/d");
});
test("all installed braces copies resolve to the patched fork", { skip: process.env.BRACES_SKIP_INSTALL_CHECK === "1" }, () => {
  // Resolve from the actual consumers. npm ls reports Bun's local alias
  // metadata as invalid even when its installed code is correct, so inspect
  // executable packages and their contents rather than npm's bookkeeping.
  const { readFileSync } = require("node:fs");
  const { dirname, join } = require("node:path");
  for (const consumer of [null, "micromatch", "chokidar"]) {
    const consumerRequire = consumer
      ? createRequire(require.resolve(consumer + "/package.json"))
      : require;
    const entry = consumerRequire.resolve("braces");
    const installedDir = dirname(entry);
    const metadata = JSON.parse(readFileSync(join(installedDir, "package.json"), "utf8"));
    assert.equal(metadata.name, "@living-with-arthritis/braces", consumer || "root");
    assert.equal(metadata.version, "3.0.3-lwa.1", consumer || "root");
    for (const file of ["index.js", "lib/parse.js", "lib/compile.js", "lib/expand.js", "lib/stringify.js", "lib/depth.js"]) {
      assert.equal(readFileSync(join(installedDir, file), "utf8"),
        readFileSync(new URL("../../vendor/braces/" + file, import.meta.url), "utf8"), consumer + ": " + file);
    }
    const installed = consumerRequire("braces");
    assert.throws(() => installed.compile("{".repeat(4000) + "x" + "}".repeat(4000)), rejectsDepth);
  }
});
test("optional differential compatibility check against upstream", { skip: !upstream }, () => {
  const patterns = ["src/*.{ts,tsx}", "a/{b,{c,d}}/e", "{1..5}", "{a..e}", "{01..05}", "\\{a,b\\}", '"{a,b}"', "foo/(a|b)/{x,y}", "{a,b", "a,b}", "{a,,b}", "**/*.{js,ts,tsx}", "{a..z..2}"];
  for (const pattern of patterns) {
    assert.deepEqual(braces(pattern), upstream(pattern), pattern);
    assert.deepEqual(braces.expand(pattern), upstream.expand(pattern), pattern);
    assert.equal(braces.stringify(braces.parse(pattern)), upstream.stringify(upstream.parse(pattern)), pattern);
  }
});
