import { lazy, type ComponentType, type LazyExoticComponent } from "react";

/**
 * Stale-deploy recovery.
 *
 * Every publish gives JS/CSS chunks new content-hashed filenames and the old
 * files disappear from the host. A visitor whose tab (or CDN edge) still holds
 * the previous index.html then asks for chunk URLs that no longer exist, and
 * the dynamic import rejects. Without handling, React unmounts and the visitor
 * sees a blank screen.
 *
 * Recovery strategy:
 *  1. `lazyWithRetry` retries a failed dynamic import (transient network blip).
 *  2. If it still fails and the error looks like a missing chunk, reload the
 *     page ONCE (guarded in sessionStorage) with a cache-busting query so the
 *     browser and CDN hand back the fresh index.html.
 *  3. If the reload already happened recently, stop and let the ErrorBoundary
 *     show a friendly "Reload" fallback instead of looping.
 */

const RELOAD_KEY = "lwa:stale-reload-at";
/** Only one automatic reload per tab in this window. */
export const RELOAD_WINDOW_MS = 5 * 60_000;
/** Query param used to bust edge caches on the recovery reload. */
export const RELOAD_PARAM = "_r";

const CHUNK_ERROR_PATTERNS = [
  /Failed to fetch dynamically imported module/i,
  /error loading dynamically imported module/i,
  /Importing a module script failed/i,
  /Unable to preload CSS/i,
  /Loading (CSS )?chunk [\w-]+ failed/i,
  /is not a valid JavaScript MIME type/i,
  /Expected a JavaScript(-or-Wasm)? module script/i,
];

export function isChunkLoadError(error: unknown): boolean {
  const message =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? `${error.name}: ${error.message}`
        : error && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "";
  if (!message) return false;
  return CHUNK_ERROR_PATTERNS.some((re) => re.test(message));
}

function readLastReload(): number {
  try {
    return Number(window.sessionStorage.getItem(RELOAD_KEY) || 0);
  } catch {
    return 0;
  }
}

/** True when an automatic recovery reload is still allowed for this tab. */
export function canAutoReload(now: number = Date.now()): boolean {
  return now - readLastReload() > RELOAD_WINDOW_MS;
}

/**
 * Reload once with a cache-busting param. Returns false (and does nothing)
 * when a recovery reload already happened within RELOAD_WINDOW_MS, so callers
 * can fall back to showing an error UI.
 */
export function reloadOnce(): boolean {
  if (typeof window === "undefined") return false;
  if (!canAutoReload()) return false;
  try {
    window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Without storage there is no loop guard, so never auto-reload; the
    // ErrorBoundary fallback offers a manual Reload button instead.
    return false;
  }
  const url = new URL(window.location.href);
  url.searchParams.set(RELOAD_PARAM, Date.now().toString(36));
  window.location.replace(url.toString());
  return true;
}

/** Remove the cache-busting param after a recovery reload so URLs stay clean. */
export function stripReloadParam(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (!url.searchParams.has(RELOAD_PARAM)) return;
  url.searchParams.delete(RELOAD_PARAM);
  window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry a dynamic import a couple of times before giving up. Chunk-missing
 * failures after the retries trigger one recovery reload; anything else is
 * rethrown so the nearest ErrorBoundary can render its fallback.
 */
export async function importWithRetry<T>(
  factory: () => Promise<T>,
  retries = 2,
  baseDelayMs = 400,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await factory();
    } catch (error) {
      lastError = error;
      if (attempt < retries) await wait(baseDelayMs * (attempt + 1));
    }
  }
  if (isChunkLoadError(lastError) && reloadOnce()) {
    // Keep Suspense pending while the page navigates away.
    return new Promise<T>(() => {});
  }
  throw lastError;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(() => importWithRetry(factory));
}

/**
 * Global listeners: Vite's `vite:preloadError` (fired when a modulepreload or
 * CSS preload for a lazy chunk fails) plus uncaught chunk errors.
 */
export function installChunkRecovery(): void {
  if (typeof window === "undefined") return;
  stripReloadParam();
  window.addEventListener("vite:preloadError", (event) => {
    if (reloadOnce()) event.preventDefault();
  });
  window.addEventListener("unhandledrejection", (event) => {
    if (isChunkLoadError(event.reason)) reloadOnce();
  });
  window.addEventListener("error", (event) => {
    if (isChunkLoadError(event.error ?? event.message)) reloadOnce();
  });
}

/**
 * This site has never shipped a service worker, but a stale registration
 * (from a previous build tool, a browser extension test, or an old host) would
 * serve cached HTML pointing at deleted chunks. Unregister anything found and
 * drop its caches so the network is always the source of truth.
 */
export function removeStaleServiceWorkers(): void {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      if (registrations.length === 0) return;
      registrations.forEach((registration) => registration.unregister());
      if ("caches" in window) {
        caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
      }
    })
    .catch(() => {
      // Service worker API blocked (e.g. some privacy modes) — nothing to clean.
    });
}
