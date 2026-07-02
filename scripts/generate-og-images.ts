/**
 * Build-time OG image generator.
 *
 * Renders 1200x630 branded PNGs for blog posts + guide + condition pages using
 * satori + @resvg/resvg-js and writes them to public/og/<slug>.png.
 *
 * - Idempotent: skips existing files unless --force is passed.
 * - Fails soft: any per-page error is logged and skipped; overall exit stays 0
 *   so a network hiccup on the font fetch doesn't break `bun run build`.
 *
 * Runs before Vite build via `prebuild`.
 */
import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const ROOT = resolve(process.cwd());
const OUT_DIR = join(ROOT, "public", "og");
const CACHE_DIR = join(ROOT, "node_modules", ".cache", "og-fonts");
const FORCE = process.argv.includes("--force");

const FONT_URLS = {
  regular:
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf",
  bold: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf",
};

async function ensureFont(name: "regular" | "bold"): Promise<Uint8Array | null> {
  const path = join(CACHE_DIR, `${name}.ttf`);
  if (existsSync(path)) return new Uint8Array(await readFile(path));
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    const res = await fetch(FONT_URLS[name]);
    if (!res.ok) throw new Error(`font fetch ${res.status}`);
    const buf = new Uint8Array(await res.arrayBuffer());
    await writeFile(path, buf);
    return buf;
  } catch (err) {
    console.warn(`[og] font fetch failed (${name}):`, (err as Error).message);
    return null;
  }
}

type OgPage = { slug: string; title: string; category: string };

/** Collect target pages from filesystem (conditions + guides) + a fixed blog list. */
async function collectPages(): Promise<OgPage[]> {
  const pages: OgPage[] = [];

  async function readDirPages(dir: string, category: string) {
    if (!existsSync(dir)) return;
    for (const entry of await readdir(dir)) {
      if (!entry.endsWith(".tsx")) continue;
      const name = entry.replace(/\.tsx$/, "");
      // Slugify: CamelCase -> kebab-case
      const slug = name
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();
      // Human-readable title from filename
      const title = name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
      pages.push({ slug: `${category.toLowerCase()}-${slug}`, title, category });
    }
  }

  await readDirPages(join(ROOT, "src", "pages", "conditions"), "Conditions");
  await readDirPages(join(ROOT, "src", "pages", "guides"), "Guides");

  // Homepage / hubs
  pages.push({ slug: "home", title: "Living With Arthritis UK", category: "UK Charity" });
  pages.push({ slug: "diet-hub", title: "Diet & Nutrition Hub", category: "Guides" });
  pages.push({ slug: "exercise-hub", title: "Exercise Hub", category: "Guides" });
  pages.push({ slug: "blog", title: "Arthritis Blog", category: "Articles" });

  return pages;
}

function template(page: OgPage): unknown {
  return {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        backgroundColor: "#ffffff",
        backgroundImage:
          "linear-gradient(135deg, #ffffff 0%, #fff5f5 55%, #ffe8ea 100%)",
        fontFamily: "Inter",
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: "12px" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#c1121f",
                  },
                  children: page.category,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#111111",
              maxWidth: "1050px",
            },
            children: page.title,
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "2px solid #c1121f",
              paddingTop: "24px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { fontSize: "28px", fontWeight: 700, color: "#111111" },
                  children: "Living With Arthritis UK",
                },
              },
              {
                type: "div",
                props: {
                  style: { fontSize: "22px", color: "#555555" },
                  children: "livingwitharthritis.org.uk",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const [regular, bold] = await Promise.all([ensureFont("regular"), ensureFont("bold")]);
  if (!regular || !bold) {
    console.warn("[og] skipping OG image generation (font unavailable).");
    return;
  }

  const pages = await collectPages();
  let created = 0;
  let skipped = 0;

  for (const page of pages) {
    const out = join(OUT_DIR, `${page.slug}.png`);
    if (!FORCE && existsSync(out)) {
      skipped++;
      continue;
    }
    try {
      const svg = await satori(template(page) as never, {
        width: 1200,
        height: 630,
        fonts: [
          { name: "Inter", data: regular, weight: 400, style: "normal" },
          { name: "Inter", data: bold, weight: 700, style: "normal" },
        ],
      });
      const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } })
        .render()
        .asPng();
      await writeFile(out, png);
      created++;
    } catch (err) {
      console.warn(`[og] failed ${page.slug}:`, (err as Error).message);
    }
  }

  console.log(`[og] created=${created} skipped=${skipped} total=${pages.length}`);
}

main().catch((err) => {
  console.warn("[og] generator crashed (build continues):", err);
});
