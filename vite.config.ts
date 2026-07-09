import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Prerender from "@prerenderer/rollup-plugin";
import { visualizer } from "rollup-plugin-visualizer";
// @ts-expect-error - plain .mjs route list, no type declarations needed
import { PRERENDER_ROUTES } from "./scripts/prerender-routes.mjs";

// Prerender is opt-in via PRERENDER=1 to avoid running headless Chromium
// in environments where it isn't available (e.g. Lovable's auto-build).
// Run locally with: PRERENDER=1 npm run build
const ENABLE_PRERENDER = process.env.PRERENDER === "1";
// Bundle analyzer is opt-in via ANALYZE=1 npm run build → dist/stats.html
const ENABLE_ANALYZE = process.env.ANALYZE === "1";

export default defineConfig(({ mode }): any => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
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
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          "ui-core": ["@radix-ui/react-dialog", "@radix-ui/react-tooltip"],
          "ui-extra": ["@radix-ui/react-tabs", "@radix-ui/react-accordion"],
          // Isolate the Supabase client (~40 KiB gzipped) into its own chunk so it
          // only loads when a route/hook that touches the API is reached. Cuts
          // first-paint JS by ~34 KiB on the homepage per PSI.
          supabase: ["@supabase/supabase-js"],
          // Deduplicate lucide icons across all routes (~15 KB saved per route
          // that imports icons, significant on the 78 exercise/condition pages).
          "lucide-icons": ["lucide-react"],
          // Bundle animation + chart libs into single shared chunks so every
          // lazy route that needs them shares one cached file instead of
          // duplicating the code inside each route chunk.
          "framer-motion": ["framer-motion"],
          "recharts": ["recharts"],
        },
      },
    },
  },
}));