import React from "react"; // v18
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Auto-recover from stale code-split chunks after a new deploy.
// When index.html references chunk hashes that no longer exist on the CDN,
// dynamic imports throw "Failed to fetch dynamically imported module".
// We reload once (guarded by sessionStorage) to pick up the fresh manifest.
const RELOAD_KEY = "lovable:chunk-reloaded-at";
const RELOAD_COOLDOWN_MS = 10_000; // allow another reload after 10s, scoped per URL
const isChunkLoadError = (msg: string) =>
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
    msg,
  );

const tryReload = (msg: string) => {
  if (!isChunkLoadError(msg)) return;
  try {
    const key = `${RELOAD_KEY}:${window.location.pathname}`;
    const last = Number(sessionStorage.getItem(key) || 0);
    if (Date.now() - last < RELOAD_COOLDOWN_MS) return;
    sessionStorage.setItem(key, String(Date.now()));
  } catch {
    // sessionStorage may be unavailable; reload anyway
  }
  window.location.reload();
};

window.addEventListener("error", (e) => tryReload(e.message || ""));
window.addEventListener("unhandledrejection", (e) => {
  const reason: any = e.reason;
  tryReload(typeof reason === "string" ? reason : reason?.message || "");
});

createRoot(document.getElementById("root")!).render(<App />);
