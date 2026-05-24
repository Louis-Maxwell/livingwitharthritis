import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Prerender from "@prerenderer/rollup-plugin";
// @ts-expect-error - plain .mjs route list, no type declarations needed
import { PRERENDER_ROUTES } from "./scripts/prerender-routes.mjs";

// Prerender is opt-in via PRERENDER=1 to avoid running headless Chromium
// in environments where it isn't available (e.g. Lovable's auto-build).
// Run locally with: PRERENDER=1 npm run build
const ENABLE_PRERENDER = process.env.PRERENDER === "1";

export default defineConfig(({ mode }) => ({
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
          headless: "new",
          // Give useEffect-injected JSON-LD a moment after route mount
          renderAfterTime: 1500,
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
          // framer-motion and @supabase/supabase-js are intentionally excluded so Rollup
          // can route-split them with whatever lazy chunk first imports them — keeps
          // ~60 KB of unused JS off the LCP critical path.
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
          helmet: ["react-helmet-async"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          "ui-core": ["@radix-ui/react-dialog", "@radix-ui/react-tooltip"],
          "ui-extra": ["@radix-ui/react-tabs", "@radix-ui/react-accordion"],
        },
      },
    },
  },
}));