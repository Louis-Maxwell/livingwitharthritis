import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}", "worker/**/*.{test,spec}.ts", "scripts/__tests__/**/*.{test,spec}.{ts,mjs}"],
    environmentMatchGlobs: [
      ["worker/**", "node"],
      ["scripts/__tests__/**", "node"],
    ],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
