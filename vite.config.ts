import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import puppeteer from "puppeteer";
import { componentTagger } from "lovable-tagger";
import Prerender from "./scripts/vite-prerender.mjs";
import { visualizer } from "rollup-plugin-visualizer";
import { PRERENDER_ROUTES } from "./scripts/prerender-routes.mjs";

// PRERENDER=1 is an explicit contract: a requested prerender build must
// fail if Chromium is unavailable, rather than successfully publish a SPA shell.
// Plain Vite builds and PRERENDER=0 remain available for local development.
async function chromiumExecutable(): Promise<string | undefined> {
  if (process.env.PRERENDER !== "1") return undefined;
  try {
    const executable =
      process.env.PUPPETEER_EXECUTABLE_PATH || await puppeteer.executablePath();
    if (!executable) throw new Error("Chromium executable path is empty");
    fs.accessSync(executable, fs.constants.X_OK);
    return executable;
  } catch (cause) {
    throw new Error(
      "[prerender] PRERENDER=1 requires an executable Chromium browser. " +
        "Install Puppeteer's browser or set PUPPETEER_EXECUTABLE_PATH to a valid executable. " +
        "Refusing to emit a non-prerendered build.",
      { cause },
    );
  }
}

// Bundle analyzer is opt-in via ANALYZE=1 npm run build → dist/stats.html
const ENABLE_ANALYZE = process.env.ANALYZE === "1";



// The self-hosted Inter file is imported from CSS so Vite content-hashes it
// under /assets/*, which is the only path the live host actually caches
// (public/_headers is ignored; /fonts/*.woff2 is re-downloaded every visit).
// Preload stays low priority: the homepage LCP is text that appears only
// after the entry scripts run, and a high-priority 48KB font was sharing
// that bandwidth.
function preloadInterFont() {
  return {
    name: "preload-inter-font",
    transformIndexHtml: {
      order: "post" as const,
      handler(
        html: string,
        ctx: { bundle?: Record<string, { fileName?: string; type?: string }> },
      ) {
        const bundle = ctx.bundle;
        if (!bundle) return html;
        const font = Object.values(bundle).find(
          (item) =>
            item.type === "asset" &&
            typeof item.fileName === "string" &&
            item.fileName.includes("Inter") &&
            item.fileName.endsWith(".woff2"),
        );
        if (!font?.fileName) return html;
        const tag =
          `<link rel="preload" as="font" type="font/woff2" href="/${font.fileName}" crossorigin fetchpriority="low" />`;
        return html.replace("<!-- INTER_FONT_PRELOAD -->", tag);
      },
    },
  };
}

export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const PRERENDER_EXECUTABLE = await chromiumExecutable();
  const ENABLE_PRERENDER = Boolean(PRERENDER_EXECUTABLE);
  if (!ENABLE_PRERENDER) {
    console.warn(
      "[prerender] disabled — use PRERENDER=1 with Chromium installed for static page HTML.",
    );
  }
  return ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Lovable MCP backend plugin stays disabled — site is static + mailto only.
    mode === "development" && componentTagger(),
    ENABLE_PRERENDER &&
      mode === "production" &&
      Prerender({
        routes: PRERENDER_ROUTES,
        rendererOptions: {
          renderAfterDocumentEvent: "prerender-ready",
          // Keep prerender concurrency modest so Chromium stays stable.
          maxConcurrentRoutes: 2,
          // react-helmet-async flushes title/meta changes inside a
          // requestAnimationFrame. Chromium throttles rAF in backgrounded /
          // occluded renderers, so without these flags most prerendered
          // pages froze with the static index.html <title> and description
          // instead of their own — ~850 pages of duplicate titles.
          launchOptions: {
            executablePath: PRERENDER_EXECUTABLE,
            args: [
              "--disable-background-timer-throttling",
              "--disable-renderer-backgrounding",
              "--disable-backgrounding-occluded-windows",
              "--no-sandbox",
            ],
          },
        },
      }),

    ENABLE_ANALYZE &&
      visualizer({
        filename: "dist/stats.html",
        gzipSize: true,
        brotliSize: true,
        template: "treemap",
      }),
    preloadInterFont(),

  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
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
    // Preload a lazy chunk's dependencies in parallel with the chunk itself.
    // With preloading off, a route like /blog/:slug discovered its ~50 small
    // dependency chunks only after its own chunk had downloaded and run, a
    // request waterfall that delayed the article's first paint. Failed
    // preloads raise vite:preloadError, which chunkRecovery handles.
    modulePreload: { polyfill: false },
    // dist/.vite/manifest.json lets scripts/inject-canonicals.mjs preload a
    // route's own chunk from that route's static HTML (blog guides).
    manifest: true,
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
          // lucide-react and framer-motion are intentionally NOT listed (2026-09
          // perf pass). As static manualChunks they were one 80 KB icon chunk
          // holding every icon used anywhere, plus a 123 KB animation chunk,
          // both preloaded on every route including the homepage. Rollup now
          // tree-shakes icons per route and shares framer-motion only between
          // the lazy routes that actually animate.
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
  });
});
