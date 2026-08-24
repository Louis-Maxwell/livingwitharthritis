import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import { createRequire } from "node:module";
import { componentTagger } from "lovable-tagger";
import Prerender from "@prerenderer/rollup-plugin";
import { visualizer } from "rollup-plugin-visualizer";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";
// @ts-expect-error - plain .mjs route list, no type declarations needed
import { PRERENDER_ROUTES } from "./scripts/prerender-routes.mjs";

// Prerender is ON by default for production builds so crawlers (Googlebot's
// non-JS pass, Bing, LLM scrapers) receive real HTML instead of an empty SPA
// shell. It is skipped automatically when no Chromium binary is available,
// and can be forced off with PRERENDER=0.
//
// IMPORTANT: prerendering ~1,000 routes through headless Chromium takes far
// longer than the hosted publish build's time limit, which made `npm run
// build` (what publishing runs) hang until it was killed. It is therefore
// OPT-IN via PRERENDER=1 (`npm run build:prerender`, CI, local audits) and
// never runs during a plain production/publish build.
function chromiumAvailable() {
  if (process.env.PRERENDER !== "1") return false;
  try {
    const req = createRequire(import.meta.url);
    const puppeteer = req("puppeteer");
    const exe =
      process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath();
    return Boolean(exe) && fs.existsSync(exe);
  } catch {
    return false;
  }
}

const ENABLE_PRERENDER = chromiumAvailable();
if (!ENABLE_PRERENDER) {
  console.warn(
    "[prerender] skipped — set PRERENDER=1 (npm run build:prerender) with a " +
      "Chromium binary available to generate static HTML for crawlers.",
  );
}


// Bundle analyzer is opt-in via ANALYZE=1 npm run build → dist/stats.html
const ENABLE_ANALYZE = process.env.ANALYZE === "1";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    mcpPlugin(),
    react(),
    mode === "development" && componentTagger(),
    ENABLE_PRERENDER &&
      mode === "production" &&
      Prerender({
        routes: PRERENDER_ROUTES,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          renderAfterDocumentEvent: "prerender-ready",
          // Dynamic blog/city routes query Supabase while rendering. Keeping
          // concurrency low avoids API throttling that otherwise freezes a
          // random subset of snapshots on their loading skeleton.
          maxConcurrentRoutes: 2,
          headless: true,
          // react-helmet-async flushes title/meta changes inside a
          // requestAnimationFrame. Chromium throttles rAF in backgrounded /
          // occluded renderers, so without these flags most prerendered
          // pages froze with the static index.html <title> and description
          // instead of their own — ~850 pages of duplicate titles.
          launchOptions: {
            args: [
              "--disable-background-timer-throttling",
              "--disable-renderer-backgrounding",
              "--disable-backgrounding-occluded-windows",
              "--no-sandbox",
            ],
          },
          // The renderer does not reliably apply this UA before the
          // document's inline scripts run, so it is only the first of
          // three defences against self-noindexing (see below).
          userAgent: "Mozilla/5.0 (compatible; LWAPrerenderer/1.0; +https://livingwitharthritis.org.uk)",
          // Defence 2: injected via evaluateOnNewDocument, so it exists
          // BEFORE index.html's bot-detection script executes. That script
          // bails out entirely when it sees this flag, so it can never
          // append <meta name="robots" content="noindex"> into the HTML we
          // are about to ship as static files.
          inject: { prerender: true },
          injectProperty: "__PRERENDER_INJECTED__",
        },
        // Defence 3: strip any noindex/nofollow robots meta that still made
        // it into the snapshot. Shipping one on every prerendered page would
        // de-index the whole site.
        postProcess(renderedRoute: { html: string; route: string }) {
          renderedRoute.html = renderedRoute.html.replace(
            /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["'][^>]*>/gi,
            "",
          );
        },
      }),

    ENABLE_ANALYZE &&
      visualizer({
        filename: "dist/stats.html",
        gzipSize: true,
        brotliSize: true,
        template: "treemap",
      }),

    mode === "production" &&
      sentryVitePlugin({
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: ["./dist/**"],
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
    // html2canvas/canvg are only ever reached via jsPDF's own dynamic
    // import() inside its .html() plugin path (never called here — see
    // src/lib/generatePdf.ts) and are already excluded from the production
    // bundle by that code-split boundary. Excluding them from dev-server
    // dependency pre-bundling too avoids scanning/pre-bundling ~440KB of
    // unused code on every cold dev-server start.
    exclude: ["html2canvas", "canvg"],
  },
  build: {
    target: "es2020",
    cssMinify: true,
    minify: "esbuild",
    modulePreload: false, // Disable automatic modulepreload to avoid unnecessarily downloading supabase chunk (55KB gzip) on every page when it's only used on lazy-loaded /auth/* and /admin/* routes
    // Previous config: modulePreload: { polyfill: false } generated modulepreload links for chunks like supabase-CgLacNy3.js (207KB, 55.34KB gzip) which were not needed on the homepage critical path. See 2026-08-15 perf audit.
    rollupOptions: {
      output: {
        manualChunks: {
          // Only pre-bundle libs that the homepage entry actually needs synchronously.
          // framer-motion is intentionally excluded so Rollup can route-split it with
          // whatever lazy chunk first imports it — keeps unused JS off the LCP critical path.
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
          helmet: ["react-helmet-async"],
          // forms / ui-extra intentionally NOT listed: static manualChunks
          // entries are modulepreloaded from the root index.html on every
          // route, including the homepage, which renders no form, tabs or
          // accordion. Rollup route-splits them onto the pages that use them.
          "ui-core": ["@radix-ui/react-tooltip"],
          // Isolate the Supabase client (~40 KiB gzipped) into its own chunk so it
          // only loads when a route/hook that touches the API is reached. Cuts
          // first-paint JS by ~34 KiB on the homepage per PSI.
          supabase: ["@supabase/supabase-js"],
          // Deduplicate lucide icons across all routes (~15 KB saved per route
          // that imports icons, significant on the 78 exercise/condition pages).
          "lucide-icons": ["lucide-react"],
          // Bundle animation libs into a single shared chunk so every lazy
          // route that needs them shares one cached file instead of
          // duplicating the code inside each route chunk.
          "framer-motion": ["framer-motion"],
          // recharts intentionally NOT listed here (was previously, in error —
          // see 2026-07-24 PageSpeed fix). Static manualChunks entries get
          // eagerly modulepreloaded from the root index.html regardless of
          // whether the entry point actually uses them. recharts (~391 KB,
          // ~113 KB gzipped) was being preloaded on every single page,
          // including the homepage, which never renders a chart. Letting
          // Rollup route-split it naturally means only pages that actually
          // import recharts (e.g. admin dashboards) pay that cost.
        },
      },
    },
  },
}));