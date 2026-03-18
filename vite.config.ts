import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
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
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          motion: ["framer-motion"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-tabs", "@radix-ui/react-accordion", "@radix-ui/react-tooltip"],
          query: ["@tanstack/react-query"],
          supabase: ["@supabase/supabase-js"],
          helmet: ["react-helmet-async"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          // NOTE: recharts and react-markdown are NOT in manualChunks
          // so they only load with their lazy-loaded consumers
        },
      },
    },
  },
}));