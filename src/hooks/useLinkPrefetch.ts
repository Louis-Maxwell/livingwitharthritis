import { useEffect } from "react";

const INTERNAL_PREFETCH_DELAY_MS = 120;

export function useLinkPrefetch() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const connection = (
      navigator as unknown as {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /^(slow-2g|2g)$/.test(connection.effectiveType)) {
      return;
    }

    const prefetched = new Set<string>();
    const timers = new Map<string, number>();

    const prefetch = (href: string) => {
      if (prefetched.has(href)) return;
      prefetched.add(href);
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      link.as = "document";
      document.head.appendChild(link);
    };

    const schedulePrefetch = (event: Event) => {
      const target = (event.target as HTMLElement | null)?.closest?.("a") as
        | HTMLAnchorElement
        | null;
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.hasAttribute("download") ||
        target.target === "_blank"
      ) {
        return;
      }

      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;

        const route = url.pathname + url.search;
        if (route === window.location.pathname || prefetched.has(route) || timers.has(route)) {
          return;
        }

        const timer = window.setTimeout(() => {
          timers.delete(route);
          prefetch(route);
        }, INTERNAL_PREFETCH_DELAY_MS);
        timers.set(route, timer);
      } catch {
        /* Ignore malformed URLs. */
      }
    };

    const cancelPrefetch = (event: Event) => {
      const target = (event.target as HTMLElement | null)?.closest?.("a") as
        | HTMLAnchorElement
        | null;
      const href = target?.getAttribute("href");
      if (!href) return;

      try {
        const url = new URL(href, window.location.origin);
        const route = url.pathname + url.search;
        const timer = timers.get(route);
        if (timer !== undefined) {
          window.clearTimeout(timer);
          timers.delete(route);
        }
      } catch {
        /* Ignore malformed URLs. */
      }
    };

    document.addEventListener("pointerover", schedulePrefetch, { passive: true });
    document.addEventListener("pointerout", cancelPrefetch, { passive: true });
    document.addEventListener("focusin", schedulePrefetch);

    return () => {
      document.removeEventListener("pointerover", schedulePrefetch);
      document.removeEventListener("pointerout", cancelPrefetch);
      document.removeEventListener("focusin", schedulePrefetch);
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);
}
