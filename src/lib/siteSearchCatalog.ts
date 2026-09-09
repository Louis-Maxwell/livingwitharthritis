import blogList from "@/data/blogList.json";
import contentStats from "@/data/contentStats.generated.json";
import { GUIDE_REGISTRY } from "@/lib/guideRegistry";
import {
  mapBlogCategoryToTopic,
  type SearchCatalogItem,
} from "@/lib/siteSearchFilters";

const HUB_PAGES: SearchCatalogItem[] = [
  {
    id: "hub-guides",
    title: "Arthritis guides hub",
    href: "/guides",
    excerpt: "Browse UK arthritis guides on benefits, exercise, diet, pain relief and NHS care.",
    topic: "Guides & hubs",
    wordCount: 900,
    keywords: ["guides", "hub", "PIP", "exercise", "diet"],
  },
  {
    id: "hub-diet",
    title: "Diet & nutrition hub",
    href: "/diet",
    excerpt: "Anti-inflammatory eating patterns and foods that may ease joint symptoms.",
    topic: "Guides & hubs",
    wordCount: 1100,
    keywords: ["diet", "nutrition", "mediterranean", "inflammation"],
  },
  {
    id: "hub-about",
    title: "About Living With Arthritis UK",
    href: "/about",
    excerpt: "Who we are, our mission, and how we produce clinician-reviewed guidance.",
    topic: "Guides & hubs",
    wordCount: 1000,
    keywords: ["about", "charity", "mission"],
  },
  {
    id: "hub-benefits-pip",
    title: "Benefits & PIP hub",
    href: "/benefits-pip",
    excerpt: "Start here for Personal Independence Payment and related UK arthritis benefits.",
    topic: "Finances & Benefits",
    wordCount: 850,
    keywords: ["PIP", "benefits", "disability", "DLA"],
  },
  {
    id: "hub-exercises",
    title: "Exercise hub",
    href: "/exercises",
    excerpt: "Joint-friendly exercise guides including tai chi, walking and strength work.",
    topic: "Guides & hubs",
    wordCount: 1000,
    keywords: ["exercise", "movement", "tai chi"],
  },
  {
    id: "hub-library",
    title: "Health library",
    href: "/library",
    excerpt: "Plain-English library of conditions, medications, supplements and treatments.",
    topic: "Guides & hubs",
    wordCount: 800,
    keywords: ["library", "medications", "conditions"],
  },
  {
    id: "hub-blog",
    title: "Blog",
    href: "/blog",
    excerpt: "Evidence-based arthritis articles written for people in the UK.",
    topic: "Guides & hubs",
    wordCount: 700,
    keywords: ["blog", "articles"],
  },
];

const WORD_BY_SLUG = new Map(
  (blogArticles as Array<{ slug: string; content?: string }>).map((a) => [
    a.slug,
    countWords(a.content),
  ]),
);

const BLOG_ITEMS: SearchCatalogItem[] = (
  blogList as Array<{
    slug: string;
    title: string;
    excerpt?: string;
    category?: string;
    keywords?: string | null;
  }>
).map((a) => ({
  id: `blog-${a.slug}`,
  title: a.title,
  href: `/blog/${a.slug}`,
  excerpt: a.excerpt || "",
  topic: mapBlogCategoryToTopic(a.category),
  wordCount: WORD_BY_SLUG.get(a.slug) || 0,
  keywords: [
    a.category || "",
    ...(typeof a.keywords === "string"
      ? a.keywords.split(/[,;]/).map((k) => k.trim()).filter(Boolean)
      : []),
  ],
}));

const GUIDE_ITEMS: SearchCatalogItem[] = GUIDE_REGISTRY.map((g) => ({
  id: `guide-${g.path}`,
  title: g.title,
  href: g.path,
  excerpt: g.description,
  topic: g.cluster === "support" && g.path.includes("benefits")
    ? "Finances & Benefits"
    : g.cluster === "lifestyle"
      ? "Nutrition"
      : g.cluster === "msk"
        ? "Exercise"
        : g.cluster === "medication" || g.cluster === "surgery"
          ? "Treatment"
          : "Guides & hubs",
  wordCount: 1200,
  keywords: [g.cluster, g.title],
}));

/** Static catalog used by /search — no network, no Supabase. */
export function getSiteSearchCatalog(): SearchCatalogItem[] {
  const seen = new Set<string>();
  const out: SearchCatalogItem[] = [];
  for (const item of [...HUB_PAGES, ...GUIDE_ITEMS, ...BLOG_ITEMS]) {
    if (seen.has(item.href)) continue;
    seen.add(item.href);
    out.push(item);
  }
  return out;
}
