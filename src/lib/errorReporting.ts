import { hasAnalyticsConsent } from "./analyticsPrivacy";
/**
 * Error reporting: the one module that sends error telemetry.
 *
 * Provider: Google Analytics 4 `exception` events through the site's existing,
 * consent-gated gtag (free; no extra vendor). Nothing is sent until a visitor
 * accepts analytics cookies, because gtag only exists after consent.
 *
 * Swapping providers (Sentry, Bugsnag, a self-hosted endpoint) means replacing
 * `sendToProvider` below; callers only use `reportError` / `reportFormFailure`.
 *
 * Scope: this is a static single-page site with no server of its own, so
 * everything captured here happens in the visitor's browser:
 *   - uncaught script errors and unhandled promise rejections
 *   - React render crashes (ErrorBoundary)
 *   - failed fetch calls (network errors and non-2xx responses)
 *   - form submissions that did not reach the charity inbox
 *   - stale-deploy chunk load failures
 * Third-party services (FormSubmit, Stripe Checkout, Google) keep their own
 * logs; there is no backend log to collect.
 */
import { isChunkLoadError } from "@/lib/chunkRecovery";

export type ErrorKind =
  | "js_error"
  | "unhandled_rejection"
  | "react_render"
  | "fetch_failed"
  | "form_submit_failed"
  | "chunk_load";

export interface ErrorReport {
  kind: ErrorKind;
  /** Short, PII-free description (GA4 truncates parameter values at 100 characters). */
  description: string;
  /** True when the visitor was left without a working page. */
  fatal: boolean;
  /** Extra low-cardinality detail, e.g. the form name or request host. */
  source?: string;
}

type Gtag = (command: "event", name: string, params: Record<string, unknown>) => void;

const MAX_REPORTS_PER_PAGE = 20;
const GA4_VALUE_LIMIT = 100;

let sentCount = 0;
const seen = new Set<string>();

/** Removes things that could identify a person before anything leaves the browser. */
export function scrub(text: string): string {
  return text
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, "[email]")
    .replace(/\b(?:\+?\d[\d\s-]{8,}\d)\b/g, "[number]")
    .replace(/([?#])[^\s"')]*/g, "$1…")
    .replace(/\s+/g, " ")
    .trim();
}

function describe(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error) ?? String(error);
  } catch {
    return String(error);
  }
}

function sendToProvider(report: ErrorReport): void {
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function" || !hasAnalyticsConsent()) return;
  gtag("event", "exception", {
    description: report.kind, // raw exception text may contain sensitive user input
    fatal: report.fatal,
    error_kind: report.kind,
    error_source: (report.source ?? "").slice(0, GA4_VALUE_LIMIT),
    page_path: window.location.pathname.slice(0, GA4_VALUE_LIMIT),
  });
}

/** Sends one error report (deduplicated and rate-limited per page load). */
export function reportError(
  kind: ErrorKind,
  error: unknown,
  options: { fatal?: boolean; source?: string } = {},
): void {
  try {
    if (typeof window === "undefined") return;
    const description = scrub(describe(error)) || kind;
    const key = `${kind}|${description}|${options.source ?? ""}`;
    if (seen.has(key) || sentCount >= MAX_REPORTS_PER_PAGE) return;
    seen.add(key);
    sentCount++;
    const report: ErrorReport = {
      kind,
      description,
      fatal: options.fatal ?? false,
      source: options.source ? scrub(options.source) : undefined,
    };
    if (import.meta.env.DEV) console.warn("[error-report]", report);
    sendToProvider(report);
  } catch {
    // Reporting must never break the page.
  }
}

/** A form submission that did not reach the charity (network, HTTP error, timeout). */
export function reportFormFailure(form: string, reason: string): void {
  reportError("form_submit_failed", reason, { source: form });
}

function requestInfo(input: RequestInfo | URL, init?: RequestInit): { method: string; url: URL | null } {
  const method = (init?.method || (input instanceof Request ? input.method : "GET")).toUpperCase();
  try {
    const raw = input instanceof Request ? input.url : String(input);
    return { method, url: new URL(raw, window.location.href) };
  } catch {
    return { method, url: null };
  }
}

// Analytics beacons failing (ad blockers, offline) are not site errors.
const IGNORED_HOSTS = /(?:google-analytics\.com|googletagmanager\.com|doubleclick\.net|evarist\.ai)$/i;

function shouldReportRequest(method: string, url: URL | null): boolean {
  // HEAD requests are existence probes (e.g. optional audio files); a miss is expected.
  if (method === "HEAD") return false;
  if (url && IGNORED_HOSTS.test(url.hostname)) return false;
  return true;
}

function isAbort(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

let installed = false;

/** Global listeners plus a fetch wrapper. Call once, as early as possible. */
export function installErrorReporting(): void {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event) => {
    // Resource load errors (img/script tags) have no `error`; chunk failures
    // are reported separately by chunk recovery.
    if (!(event instanceof ErrorEvent) || (!event.error && !event.message)) return;
    // Cross-origin scripts only expose "Script error." with no detail.
    if (!event.error && /^Script error\.?$/i.test(event.message)) return;
    const cause = event.error ?? event.message;
    reportError(isChunkLoadError(cause) ? "chunk_load" : "js_error", cause, {
      source: event.filename ? scrub(event.filename.replace(window.location.origin, "")) : undefined,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    if (isAbort(event.reason)) return;
    reportError(isChunkLoadError(event.reason) ? "chunk_load" : "unhandled_rejection", event.reason);
  });

  window.addEventListener("vite:preloadError", (event) => {
    reportError("chunk_load", (event as Event & { payload?: unknown }).payload ?? "preload failed");
  });

  if (typeof window.fetch !== "function") return;
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const { method, url } = requestInfo(input, init);
    const target = url ? `${method} ${url.host}${url.pathname}` : method;
    try {
      const response = await originalFetch(input, init);
      if (!response.ok && shouldReportRequest(method, url)) {
        reportError("fetch_failed", `HTTP ${response.status} ${target}`, { source: url?.host });
      }
      return response;
    } catch (error) {
      if (!isAbort(error) && shouldReportRequest(method, url)) {
        reportError("fetch_failed", `Network error ${target}`, { source: url?.host });
      }
      throw error;
    }
  };
}

/** Test helper: clears per-page dedupe state. */
export function resetErrorReportingForTests(): void {
  sentCount = 0;
  seen.clear();
}
