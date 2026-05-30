import { useEffect } from "react";

/**
 * useLinkPrefetch
 *
 * Global hover/focus prefetch for internal anchor links.
 * Adds <link rel="prefetch"> for the target route so navigation feels
 * instant on the next click — directly attacks low pages-per-visit
 * (current baseline 1.17) by removing perceived nav latency.
 *
 *  - Prefetches each href at most once per session
 *  - Skips external links, hash-only links, and downloads
 *  - Respects `prefers-reduced-data` (Save-Data) and slow-2g
 */
export function useLinkPrefetch() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /^(slow-2g|2g)$/.test(conn.effectiveType)) return;

    const seen = new Set<string>();

    const prefetch = (href: string) => {
      if (seen.has(href)) return;
      seen.add(href);
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      link.as = "document";
      document.head.appendChild(link);
    };

    const handler = (e: Event) => {
      const target = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (target.hasAttribute("download")) return;
      if (target.target === "_blank") return;

      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname) return;
        prefetch(url.pathname + url.search);
      } catch {
        /* invalid url — ignore */
      }
    };

    document.addEventListener("mouseover", handler, { passive: true });
    document.addEventListener("focusin", handler);

    // Idle pre-warm of top destinations (from analytics) so the second
    // click feels instant. Skips the current page.
    const TOP_ROUTES = ["/about", "/diet", "/exercises", "/arthritis-flare-ups"];
    const warm = () => {
      TOP_ROUTES.forEach((p) => {
        if (p !== window.location.pathname) prefetch(p);
      });
    };
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    const warmId = ric ? ric(warm, { timeout: 3000 }) : window.setTimeout(warm, 2500);

    return () => {
      document.removeEventListener("mouseover", handler);
      document.removeEventListener("focusin", handler);
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (cic && ric) cic(warmId as number);
      else window.clearTimeout(warmId as number);
    };
  }, []);
}
