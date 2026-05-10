import React from "react"; // v18
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Auto-recover from stale code-split chunks after a new deploy.
// When index.html references chunk hashes that no longer exist on the CDN,
// dynamic imports throw "Failed to fetch dynamically imported module".
// We reload once (guarded by sessionStorage) to pick up the fresh manifest.
const RELOAD_KEY = "lovable:chunk-reloaded";
const isChunkLoadError = (msg: string) =>
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
    msg,
  );

const tryReload = (msg: string) => {
  if (!isChunkLoadError(msg)) return;
  if (sessionStorage.getItem(RELOAD_KEY)) return;
  sessionStorage.setItem(RELOAD_KEY, "1");
  window.location.reload();
};

window.addEventListener("error", (e) => tryReload(e.message || ""));
window.addEventListener("unhandledrejection", (e) => {
  const reason: any = e.reason;
  tryReload(typeof reason === "string" ? reason : reason?.message || "");
});

// Clear the guard once a successful load is in stable state.
window.addEventListener("load", () => {
  setTimeout(() => sessionStorage.removeItem(RELOAD_KEY), 5000);
});

createRoot(document.getElementById("root")!).render(<App />);
