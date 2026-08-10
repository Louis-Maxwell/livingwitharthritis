import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import { createRequire } from "node:module";
import { componentTagger } from "lovable-tagger";
import Prerender from "@prerenderer/rollup-plugin";
import { visualizer } from "rollup-plugin-visualizer";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";
// @ts-expect-error - plain .mjs route list, no type declarations needed
import { PRERENDER_ROUTES } from "./scripts/prerender-routes.mjs";

// Prerender is ON by default for production builds so crawlers (Googlebot's
// non-JS pass, Bing, LLM scrapers) receive real HTML instead of an empty SPA
// shell. It is skipped automatically when no Chromium binary is available,
// and can be forced off with PRERENDER=0.
function chromiumAvailable() {
  if (process.env.PRERENDER === "0") return false;
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
    "[prerender] skipped — no Chromium binary found (or PRERENDER=0). " +
      "Production HTML will be an SPA shell for crawlers.",
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
          maxConcurrentRoutes: 4,
          headless: true,
          // Give useEffect-injected JSON-LD a moment after route mount
          renderAfterTime: 1500,
          // CRITICAL: without this, Puppeteer's default UA contains
          // "HeadlessChrome" (matched by index.html's bot-blocking regex)
          // and navigator.webdriver is always true under Puppeteer — both
          // trip the site's own bot-detection script, which then injects
          // <meta name="robots" content="noindex"> into the page BEFORE
          // it's captured as static HTML. That means every prerendered
          // page would ship to production already noindexed. This UA is
          // added to the `allow` list in index.html specifically so the
          // prerender process's own page loads are recognized as
          // legitimate and never get noindexed or miscounted as bots.
          userAgent: "Mozilla/5.0 (compatible; LWAPrerenderer/1.0; +https://livingwitharthritis.org.uk)",
        },
      }),
    ENABLE_ANALYZE &&
      visualizer({
        filename: "dist/stats.html",
        gzipSize: true,
        brotliSize: true,
        template: "treemap",
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
    modulePreload: {
      polyfill: false, // Modern browsers support modulepreload natively
    },
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