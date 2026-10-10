import React from "react"; // v18
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { afterPageLoad } from "./lib/afterPageLoad";
import { installErrorReporting } from "./lib/errorReporting";
import { installChunkRecovery, removeStaleServiceWorkers } from "./lib/chunkRecovery.ts";
import "./index.css";
import { installDonateClickTracker } from "./lib/donateClickTracker";
installDonateClickTracker();

// Error reporting first, so failures during start-up are captured too.
// Stale-deploy recovery must be installed before any lazy chunk is requested.
installErrorReporting();
installChunkRecovery();
removeStaleServiceWorkers();

// Core Web Vitals (LCP, FCP, CLS, INP, TTFB). Loaded after first paint; the
// library uses buffered PerformanceObservers so early entries are not lost.
afterPageLoad(() => {
  import("./lib/web-vitals.ts").then((m) => m.initWebVitals()).catch(() => {});
}, 5000);


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
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-block px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          Reload page
        </button>
        <a
          href="/"
          className="inline-block px-5 py-2.5 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-colors"
        >
          Go to homepage
        </a>
      </div>
    </div>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={AppCrashFallback}>
    <App />
  </ErrorBoundary>,
);
