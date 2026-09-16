/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("BlogPost hook order", () => {
  it("runs hooks before any early return in the page component", () => {
    const src = readFileSync(resolve(process.cwd(), "src/pages/BlogPost.tsx"), "utf8");
    const start = src.indexOf("const BlogPost = () => {");
    expect(start).toBeGreaterThan(0);
    const body = src.slice(start);
    const firstEarlyReturn = body.search(/\n\s+if\s*\((redirectTo|isLoading|!article)\)/);
    expect(firstEarlyReturn).toBeGreaterThan(0);
    const before = body.slice(0, firstEarlyReturn);
    const after = body.slice(firstEarlyReturn, body.indexOf("\n};", firstEarlyReturn));
    expect(before).toMatch(/useParams/);
    expect(before).toMatch(/useBlogArticle/);
    expect(before).toMatch(/useBlogViews/);
    expect(before).toMatch(/useEffect/);
    expect(after).not.toMatch(/\n\s+use(Params|BlogArticle|BlogViews|Effect|Memo|State|Callback|Ref)\b/);
  });
});
