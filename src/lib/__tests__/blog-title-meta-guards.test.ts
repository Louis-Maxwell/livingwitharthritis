import { describe, expect, it } from "vitest";
import blogArticles from "@/data/blogArticles.json";
import blogList from "@/data/blogList.json";
import {
  getPublishedBlogList,
  getStaticBlogArticles,
  mergePreferStatic,
  type StaticBlogArticle,
} from "@/lib/staticBlogCatalog";

const CHARITY_ONLY =
  /^(Living With Arthritis(\s+UK)?(\s*[|\-–—:]\s*(Charity(\s*\d+)?)?)?)$/i;

type Row = {
  slug?: string;
  title?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  is_published?: boolean;
};

function loadMerged(): Row[] {
  const legacy = (blogArticles as Row[]).filter(
    (r) => r?.slug && r.is_published !== false,
  );
  return mergePreferStatic(
    getStaticBlogArticles() as StaticBlogArticle[],
    legacy as StaticBlogArticle[],
  ) as Row[];
}

describe("blog title / meta description guards", () => {
  const merged = loadMerged();
  const list = getPublishedBlogList();

  it("flags titles that are only the charity name", () => {
    const bad: string[] = [];
    for (const row of merged) {
      const primary = String(row.meta_title || row.title || "").trim();
      const display = String(row.title || "").trim();
      if (!primary || CHARITY_ONLY.test(primary) || CHARITY_ONLY.test(display)) {
        bad.push(`${row.slug}: ${primary || "(empty)"}`);
      }
    }
    expect(bad, bad.slice(0, 15).join("\n")).toEqual([]);
  });

  it("flags empty meta_description on every published catalog row", () => {
    const bad: string[] = [];
    for (const row of merged) {
      if (!String(row.meta_description || "").trim()) {
        bad.push(`${row.slug}: empty meta_description`);
      }
    }
    for (const row of blogList as Row[]) {
      if (!row?.slug) continue;
      if (!String(row.meta_description || "").trim()) {
        bad.push(`blogList:${row.slug}: empty meta_description`);
      }
    }
    for (const row of list) {
      if (!String(row.title || "").trim() || CHARITY_ONLY.test(String(row.title || "").trim())) {
        bad.push(`list:${row.slug}: charity/empty title`);
      }
    }
    expect(bad, bad.slice(0, 15).join("\n")).toEqual([]);
  });

  it("keeps meta_description in a usable SERP length band when present", () => {
    const bad: string[] = [];
    for (const row of merged) {
      const md = String(row.meta_description || "").trim();
      if (!md) continue;
      if (md.length < 120 || md.length > 165) {
        bad.push(`${row.slug}: meta_description length ${md.length}`);
      }
      if (/\.\.\.$|…$/.test(md)) {
        bad.push(`${row.slug}: meta_description ends with ellipsis`);
      }
    }
    expect(bad, bad.slice(0, 15).join("\n")).toEqual([]);
  });
});
