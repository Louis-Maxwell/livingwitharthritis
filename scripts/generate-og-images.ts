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
import { readdir, readFile, mkdir, stat } from "node:fs/promises";
import { writeFileAtomic } from "./lib/atomic-write.mjs";
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

function looksLikeSfntFont(buf: Uint8Array): boolean {
  if (buf.length < 4) return false;
  // TrueType 0x00010000, OpenType "OTTO", classic "true"/"typ1"
  const b0 = buf[0], b1 = buf[1], b2 = buf[2], b3 = buf[3];
  if (b0 === 0x00 && b1 === 0x01 && b2 === 0x00 && b3 === 0x00) return true;
  const sig = String.fromCharCode(b0, b1, b2, b3);
  return sig === "OTTO" || sig === "true" || sig === "typ1";
}

async function ensureFont(name: "regular" | "bold"): Promise<Uint8Array | null> {
  const path = join(CACHE_DIR, `${name}.ttf`);
  // Prefer a previously vendored/local cache file (not written from HTTP in this process).
  if (existsSync(path)) {
    const local = new Uint8Array(await readFile(path));
    if (looksLikeSfntFont(local)) return local;
  }
  try {
    // Hardcoded CDN URLs only. Keep bytes in memory for satori — never write
    // the HTTP response to the filesystem (CodeQL js/http-to-file-access).
    const res = await fetch(FONT_URLS[name]);
    if (!res.ok) throw new Error(`font fetch ${res.status}`);
    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    if (contentType && !/(font|octet-stream|sfnt|ttf)/.test(contentType)) {
      throw new Error(`unexpected content-type ${contentType}`);
    }
    const buf = new Uint8Array(await res.arrayBuffer());
    if (!looksLikeSfntFont(buf)) {
      throw new Error("downloaded bytes are not a recognized SFNT font");
    }
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

/** Brand red — matches --primary (hsl 354 85% 42%). */
const BRAND_RED = "#c61022";

/** Stick-figure brand mark (same geometry as src/components/SiteLogo.tsx). */
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 72" width="64" height="72" fill="none"><g stroke="${BRAND_RED}" stroke-width="7" stroke-linecap="round" fill="none"><path d="M32 30 L6 6"/><path d="M32 30 L58 6"/><path d="M32 28 L32 46"/><path d="M32 44 L18 68"/><path d="M32 44 L46 68"/></g><circle cx="32" cy="12" r="9" fill="${BRAND_RED}"/></svg>`;
const LOGO_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString("base64")}`;

function logoMark(height: number): unknown {
  return {
    type: "img",
    props: {
      src: LOGO_DATA_URI,
      width: Math.round((height * 64) / 72),
      height,
      style: { display: "block" },
    },
  };
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
            style: { display: "flex", alignItems: "center", gap: "20px" },
            children: [
              logoMark(64),
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "34px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    textTransform: "uppercase",
                    color: BRAND_RED,
                  },
                  children: "Living With Arthritis",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    marginLeft: "auto",
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#555555",
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
              borderTop: `2px solid ${BRAND_RED}`,
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

  // Default share cards must be real photos — never solid red stick-figure icons
  // (Facebook crops those to the red mark and fills Page Photos with it).
  const landingPhoto = join(OUT_DIR, "landing-share.png");
  for (const page of pages) {
    const out = join(OUT_DIR, `${page.slug}.png`);
    if ((page.slug === "home" || page.slug === "blog") && existsSync(landingPhoto)) {
      const { copyFile } = await import("node:fs/promises");
      await copyFile(landingPhoto, out);
      created++;
      console.log(`[og] ${page.slug}.png <- landing-share.png`);
      continue;
    }
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
      await writeFileAtomic(out, png);
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
