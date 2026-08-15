import React from "react"; // v18
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { initWebVitals } from "./lib/web-vitals.ts";
import "./index.css";

// Initialize Sentry for error tracking
const initializeSentry = () => {
  if (!import.meta.env.VITE_SENTRY_DSN) {
    console.warn(
      "[Sentry] DSN not configured. Error tracking disabled. Set VITE_SENTRY_DSN to enable.",
    );
    return;
  }

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: import.meta.env.MODE === "production" ? 0.1 : 1.0,
    integrations: [
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    replaySessionSampleRate: import.meta.env.MODE === "production" ? 0.1 : 1.0,
    replayOnErrorSampleRate: 1.0,
    allowUrls: [/https?:\/\/(www\.)?livingwitharthritis\.org\.uk/],
  });
};

initializeSentry();

// Initialize Core Web Vitals tracking (captures LCP, FCP, CLS, INP, TTFB)
initWebVitals();

const AppCrashFallback = (
  <div className="min-h-screen flex items-center justify-center bg-background p-6">
    <div className="text-center max-w-md space-y-4">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Something went wrong
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        We're sorry — an unexpected error stopped this page from loading.
        Refreshing usually fixes it. If it keeps happening, our{" "}
        <a href="/chat" className="text-primary underline">
          help &amp; support team
        </a>{" "}
        can help.
      </p>
      <a
        href="/"
        className="inline-block px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
      >
        Go to homepage
      </a>
    </div>
  </div>
);

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
  const reason: unknown = e.reason;
  const message =
    typeof reason === "string"
      ? reason
      : reason instanceof Error
        ? reason.message
        : "";
  tryReload(message);
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={AppCrashFallback}>
    <App />
  </ErrorBoundary>,
);
